# Implementation Plan

## Overview

Add a password-protected admin dashboard to this Next.js 14 portfolio that manages the landing page's education path, certifications, projects (including rich project details), tech skills, services, and site/social links — with all data persisted in MongoDB Atlas (via the already-installed `mongodb` driver) and all uploaded images stored on Cloudinary — and refactor the existing hardcoded landing-page sections to render from the database through public read-only API endpoints, falling back to the current hardcoded content when the API/database is unreachable.

The project is `portfolio` (Next.js 14.2.1 App Router, React 18, TypeScript strict, MUI v5, GSAP, Swiper 11, react-icons). Auth is **NextAuth v4 with a Credentials provider** (user selection), with bcryptjs-hashed single admin credentials seeded into MongoDB. Admin routes are `/api/admin/**` (server-side session-guarded) plus a `/admin/**` UI (MUI, matching the portfolio's design language). Public sections remain single-page clients; each section fetches its collection from `/api/public/<resource>` and keeps the existing hardcoded arrays as fallback constants so the site never blanks out.

Decision notes:
- DB layer uses the existing `mongodb` driver (not mongoose) — zero new DB deps, already in `package.json`.
- `Credentials` + JWT session strategy (required combination in NextAuth v4).
- Small single-admin model; password hash lives in DB (`admins`), seeded from env vars.
- The existing education timeline keeps all entries (including the current `type: "certificate"` ones); certifications are additionally surfaced as a new section/admin collection seeded from those same certificate entries — non-destructive, both are admin-manageable.
- Images: admin uploads via Cloudinary server-side SDK; rendered with `next/image` (add `res.cloudinary.com` to `images.domains`).

## Types

New shared interfaces in `src/types/index.ts` (all extend a base with `_id?: string`, `createdAt?`, `updatedAt?`, serialized from MongoDB `ObjectId`):

```ts
export type ResourceBase = {
  _id?: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
};

export type Education = ResourceBase & {
  year: string;          // e.g. "2021-2022"
  title: string;         // e.g. "Bachelor's Degree in Web Development"
  institution: string;   // e.g. "University of Djelfa"
  description: string;
  type: "university" | "degree" | "certificate" | "ongoing";
  status: "completed" | "in-progress";
};

export type Certification = ResourceBase & {
  title: string;
  issuer: string;         // e.g. "Udemy"
  date: string;            // e.g. "2024"
  imageUrl: string;        // Cloudinary secure_url
  credentialUrl?: string;  // verification / certificate link
};

export type Project = ResourceBase & {
  title: string;
  tagline?: string;
  description: string;      // "project details"
  coverImage: string;       // Cloudinary URL or local /img/...
  images: string[];         // gallery of Cloudinary URLs
  techStack: string[];      // skill names / tags
  features: string[];
  demoUrl?: string;
  repoUrl?: string;
  client?: string;
  year?: string;
  featured: boolean;
};

export type Skill = ResourceBase & {
  name: string;      // e.g. "React"
  icon: string;      // key into lib/data/skills-icons mapping, e.g. "FaReact"
  color: string;     // hex, e.g. "#61dbfb"
  category: "Frontend" | "Backend" | "Database" | "DevOps" | "Testing" | "Tools";
};

export type Service = ResourceBase & {
  title: string;         // e.g. "Full-Stack Web Development"
  miniTitle: string;     // e.g. "Enterprise Web Platforms"
  description: string;
  perks: string[];       // rendered as check-list items in PricingCard
};

export type SocialLinks = {
  github: string;
  linkedin: string;
  whatsapp: string;
  telegram: string;
  instagram: string;
  facebook: string;
  email: string;
  cv: string;
};

export type Settings = {
  _id?: string;
  email: string;          // footer + contact "mailto" address
  socials: SocialLinks;
  updatedAt?: string;
};

export type AdminUser = {
  _id?: string;
  email: string;
  passwordHash: string;   // bcryptjs hash
  name: string;
  createdAt?: string;
};

export type ApiListResponse<T> = { items: T[] };
export type ApiDetailResponse<T> = { item: T };
export type ApiErrorResponse = { error: string };
## Files

### New files

Core libs & config:
- `src/lib/mongodb.ts` — serverless-safe `MongoClient` singleton (`connectToDatabase()`) + `getCollection(name)` helper. Handles `global._mongoClientPromise` caching, waits for connection, times out fast.
- `src/lib/cloudinary.ts` — Cloudinary v2 config + `uploadToCloudinary(buffer: Buffer, folder: string): Promise<{ secure_url: string; public_id: string }>` using `upload_stream` (promise wrapper).
- `src/lib/auth.ts` — `authOptions: NextAuthOptions`: Credentials provider (`authorize` finds admin by email in `admins`, compares with `bcryptjs.compare`), JWT session strategy, callbacks embed/session-expose user `id`+`name`. Exports `authOptions` and an `isAdminSession(session)` guard helper for API routes.
- `src/types/index.ts` — all interfaces in [Types](#types).
- `src/lib/data/fallback.ts` — consolidated fallback constants moved from components: `fallbackEducation`, `fallbackCertifications`, `fallbackProjects`, `fallbackSkills`, `fallbackServices`, `fallbackSettings` (from today's hardcoded arrays in `Education.tsx`, `ProjectSwiper.tsx`, `Skills.tsx`, `Services.tsx`, `SMicons.tsx` + icons in `public/img/socielmedia/`).
- `src/lib/data/skills-icons.tsx` — `getSkillIcon(name: string, color: string): ReactNode` mapping to the same `react-icons/fa` + `react-icons/si` components used in `Skills.tsx`; exports `SKILL_ICON_KEYS` and `SKILL_CATEGORIES`.
- `src/lib/api-client.ts` — `adminFetch<T>(path, init?)` (JSON fetch, redirects to `/admin/login` on 401) and `uploadImage(file: File)` for the admin UI.
- `src/middleware.ts` — NextAuth `withAuth` guarding `/admin/:path*` (redirect to `/admin/login`) and `/api/admin/:path*` (401); matcher does not touch `/api/auth/*` or `/api/public/*`.
- `next-auth.d.ts` (project root) — module augmentation for `Session.user` and `JWT` (`id?: string`).
- `.env.example` — env var template.

Auth wiring:
- `src/app/api/auth/[...nextauth]/route.ts` — `NextAuth(authOptions)` GET/POST handlers (App Router form).
Public API routes (Node runtime, `force-dynamic`, `_id` serialized to string, sorted by `order`):
- `src/app/api/public/education/route.ts` — GET `{ items: Education[] }`
- `src/app/api/public/certifications/route.ts` — GET `{ items: Certification[] }`
- `src/app/api/public/projects/route.ts` — GET `{ items: Project[] }`
- `src/app/api/public/skills/route.ts` — GET `{ items: Skill[] }`
- `src/app/api/public/services/route.ts` — GET `{ items: Service[] }`
- `src/app/api/public/settings/route.ts` — GET `{ item: Settings | null }` (singleton)

Admin API routes (every handler begins with a server-side session guard — `getServerSession(authOptions)`, else 401; inputs validated by a shared helper before writes):
- `src/app/api/admin/education/route.ts` — GET list, POST create
- `src/app/api/admin/education/[id]/route.ts` — GET, PUT, DELETE
- `src/app/api/admin/certifications/route.ts` + `[id]/route.ts` — same CRUD pattern
- `src/app/api/admin/projects/route.ts` + `[id]/route.ts` — same CRUD pattern
- `src/app/api/admin/skills/route.ts` + `[id]/route.ts` — same CRUD pattern
- `src/app/api/admin/services/route.ts` + `[id]/route.ts` — same CRUD pattern
- `src/app/api/admin/settings/route.ts` — GET singleton, PUT upsert (`email` + `socials`)
- `src/app/api/admin/upload/route.ts` — POST `multipart/form-data` (`file`, `folder`), session-guarded, validates image type + size ≤ 5 MB, uploads via `lib/cloudinary`, returns `{ secure_url, public_id }`

Admin UI (MUI v5, dark palette matching the portfolio `#0c1021`):
- `src/app/admin/layout.tsx` — server layout wrapping children in `SessionProvider` (via `components/admin/Providers`).
- `src/app/admin/components/Providers.tsx` — `"use client"` `SessionProvider` + MUI `ThemeProvider`.
- `src/app/admin/(dashboard)/layout.tsx` — guarded dashboard shell with persistent `Sidebar` (Education, Certifications, Projects, Skills, Services, Settings, View Site, Sign Out) + content area. Route group keeps `/admin/login` outside the shell.
- `src/app/admin/login/page.tsx` — centered login card (email + password) using `signIn("credentials", { redirect: false })`; error banner; redirects to `/admin/education` on success.
- `src/app/admin/(dashboard)/page.tsx` — redirects to `/admin/education`.
- `src/app/admin/(dashboard)/education/page.tsx`
- `src/app/admin/(dashboard)/certifications/page.tsx`
- `src/app/admin/(dashboard)/projects/page.tsx`
- `src/app/admin/(dashboard)/skills/page.tsx`
- `src/app/admin/(dashboard)/services/page.tsx`
- `src/app/admin/(dashboard)/settings/page.tsx`

Admin UI building blocks:
- `src/app/admin/components/AdminShell.tsx` — sidebar + topbar layout (includes "Sign Out" via `signOut()`).
- `src/app/admin/components/ResourceTable.tsx` — generic data table: columns config per resource, row actions (Edit, Move Up / Move Down via `order` swap, Delete with confirm dialog). Uses private `GET` list + collection from props.
- `src/app/admin/components/ResourceDialog.tsx` — generic create/edit dialog driven by a field-schema prop (TextField, Select, color picker, multiline, and a dynamic string-array editor for `perks` / `features` / `techStack` / `images`).
- `src/app/admin/components/ImageUploader.tsx` — image select → `uploadImage(file)` → Cloudinary preview + URL field.
- `src/app/admin/components/SettingsForm.tsx` — form for `email` + the 8 `socials` links with URL/`mailto:` validation.
New public landing components:
- `src/app/Components/Certifications/Certifications.tsx` — client section: grid of certification cards (image, title, issuer, date, credential link), GSAP staggered animation consistent with existing sections, uses `useSectionData`.
- `src/app/Components/ProjectDetails/ProjectDetailsModal.tsx` — client MUI `Dialog` showing a project's description, gallery, features, tech stack, demo/repo buttons; opened from project cards.

Data-fetching hook:
- `src/hooks/useSectionData.ts` — `useSectionData<T>(endpoint, fallback): { data: T[]; loading: boolean }`; one-shot fetch of `/api/public/<endpoint>`, uses fallback on error/empty so the site never blanks.

Seed:
- `scripts/seed.mjs` — plain Node + `mongodb` driver: connects via `MONGODB_URI`, upserts admin user from `ADMIN_EMAIL`/`ADMIN_PASSWORD` (bcryptjs hash), upserts `settings` (from current `SMicons.tsx`), and seeds `education`, `certifications` (extracted from today's `type: "certificate"` education entries), `projects`, `skills`, `services` from current hardcoded content — only into empty collections. Idempotent.

### Modified files
- `package.json` — new dependencies + `"seed"` script (see [Dependencies](#dependencies)).
- `src/app/page.tsx` — import and render `<Certifications/>` between Education and Portfolio.
- `src/app/Components/Education/Education.tsx` — replace inline `educationSteps` with `useSectionData<Education>("/api/public/education", fallbackEducation)`; re-run existing GSAP animation once data is ready (`useEffect` keyed on `data.length`).
- `src/app/Components/Education/EduCard.tsx` — import shared `Education` type; drop the local duplicate `EducationStep` type (prop contract unchanged).
- `src/app/Components/Portfolio/ProjectSwiper.tsx` — replace inline array with `useSectionData<Project>("/api/public/projects", fallbackProjects)`; add a "Details" action opening `ProjectDetailsModal`; keep View Live Demo / View Repo buttons.
- `src/app/Components/Skills/Skills.tsx` — replace inline `skills` array with `useSectionData<Skill>(...)`; render icons via `getSkillIcon(skill.icon, skill.color)`; optional category filter chips; keep current chip styling.
- `src/app/Components/Services/Services.tsx` — replace hardcoded `PricingCard`s with `useSectionData<Service>(...)` mapped to `PricingCard` (`miniTitle`, `title`, `text=description`, `perks`).
- `src/app/Components/SMicons/SMicons.tsx` — fetch `settings`; render social rows (GitHub, LinkedIn, WhatsApp, Telegram, Instagram, Facebook, Email, CV), skipping empty URLs; fallback `fallbackSettings.socials`.
- `src/app/Components/Footer/Footer.tsx` — fetch `settings` for the mailto address (fallback `fallbackSettings.email`).
- `next.config.mjs` — add `'res.cloudinary.com'` to `images.domains`.
- `src/app/Components/Contact/Contact.tsx` — non-blocking: use settings email as placeholder/prefill where relevant; behavior otherwise unchanged.
- `docs/updates.md` — mark completed items (informational; file is git-ignored).

### Unchanged (out of scope)
`Hero.tsx`, `About.tsx`, `Testimonials.tsx`, `Navbar.tsx`, `FullscreenCover.tsx`, `Btn*`, `ReviewSection*`, `api/send-email/route.ts`, `src/Styles/*`.

### Delete / move
None — all existing behavior preserved (`EduSwiper.tsx` is already commented out and stays).
## Functions

New functions:
- `connectToDatabase(): Promise<MongoClient>` — `src/lib/mongodb.ts`. Global-cached singleton connection (guarded against serverless cold starts); throws after 10s connect timeout. Called by every API route.
- `getCollection<T>(name: string): Promise<Collection<T & Document>>` — `src/lib/mongodb.ts`. Wrapper over `connectToDatabase().db(process.env.MONGODB_DB ?? "portfolio").collection(name)`.
- `serializeDoc<T>(doc): T` — `src/lib/mongodb.ts` (or `src/lib/serialize.ts`). Converts `_id: ObjectId` and `Date` fields → strings for JSON responses.
- `validateResource<R>(body, schema)` — `src/lib/validate.ts`. Field-by-field coercion + required/type/URL checks per collection write path; returns `{ ok: true, value } | { ok: false, errors }`. Keeps deps minimal (no zod).
- `authOptions: NextAuthOptions` — `src/lib/auth.ts`. Credentials provider `authorize(credentials)`: fetch `admins` by email, `bcryptjs.compare(credentials.password, doc.passwordHash)`, return `{ id, email, name }` or `null`; JWT strategy; `jwt` callback adds `id`, `session` callback exposes user fields.
- `isAdminSession(session: Session | null)` — `src/lib/auth.ts`. Returns whether a valid admin session exists; used as the API-route guard.
- `uploadToCloudinary(buffer: Buffer, folder: string): Promise<{ secure_url: string; public_id: string }>` — `src/lib/cloudinary.ts`. `cloudinary.v2.uploader.upload_stream` wrapped in a Promise; default folder `portfolio`.
- `getSkillIcon(name: string, color: string): ReactNode` — `src/lib/data/skills-icons.tsx`. Maps an icon key (e.g. `FaReact`, `SiMongodb`) to the matching `react-icons` component with stored color; falls back to `FaCode`.
- `adminFetch<T>(path: string, init?: RequestInit): Promise<T>` — `src/lib/api-client.ts`. JSON fetch, unwraps `{error}` bodies, redirects to `/admin/login` on 401.
- `uploadImage(file: File): Promise<{ secure_url: string }>` — `src/lib/api-client.ts`. `FormData` POST to `/api/admin/upload`.
- `useSectionData<T>(endpoint: string, fallback: T[]): { data: T[]; loading: boolean }` — `src/hooks/useSectionData.ts`. Fetch-on-mount; stale-safe setState; fallback on failure; no polling.
- CRUD handlers per resource — `src/app/api/admin/<resource>/route.ts` + `[id]/route.ts`: `GET list` (find sorted by `order`, serialize, `{ items }`); `POST create` (validate, `insertOne` with `order: max+1` + timestamps); `GET one`; `PUT` (validate + `updateOne`); `DELETE` (count > 0 → delete, else 404; invalid id → 400).
- Settings handlers — `src/app/api/admin/settings/route.ts`: `GET` singleton (first doc or fallback shape), `PUT` upsert.
- Upload handler — `src/app/api/admin/upload/route.ts`: parse `formData()`, MIME check (`image/jpeg|png|webp|gif`), size ≤ 5 MB, buffer → `uploadToCloudinary`.

Modified functions (data-source swaps, same names/render trees):
- `Education` section: `educationSteps` module constant replaced by `useSectionData`; GSAP `animateEducation()` re-run in a `useEffect` keyed on loaded data (currently `useEffect(..., [])`).
- `ProjectSwiper`, `Skills`, `Services`, `SMicons`, `Footer` bodies: fetch + map fetched items; Skills renders icons via `getSkillIcon`.
- `index` (page.tsx): render `<Certifications/>`.

Removed functions: none. Local `EducationStep` type in `EduCard.tsx` is replaced by the shared `Education` type (identical shape; call sites unchanged).
## Classes / UI Components

New React components (function components throughout; no class inheritance in this codebase):
- `Certifications` — `src/app/Components/Certifications/Certifications.tsx`. Renders `Certification[]` cards; GSAP stagger; uses `useSectionData`.
- `ProjectDetailsModal` — `src/app/Components/ProjectDetails/ProjectDetailsModal.tsx`. Props `{ project: Project | null; open: boolean; onClose(): void }`; MUI `Dialog` with image gallery, description, features, tech stack, demo/repo links.
- `Providers` — `src/app/admin/components/Providers.tsx`. Client boundary: `SessionProvider` (next-auth/react) + MUI `ThemeProvider` (dark, `#0c1021`).
- `AdminShell` — `src/app/admin/components/AdminShell.tsx`. Sidebar (`Drawer`/`List`: Education, Certifications, Projects, Skills, Services, Settings, View Site, Sign Out) + content header.
- `ResourceTable` — `src/app/admin/components/ResourceTable.tsx`. Props `{ columns: Column[]; items: any[]; onEdit(row); onDelete(row); onMove(row, dir) }`. Presentational only.
- `ResourceDialog` — `src/app/admin/components/ResourceDialog.tsx`. Props `{ open; title; fields: FieldSchema[]; initialValues; onSubmit(values); onClose() }`. Renders MUI `TextField`/`Select`/color input/string-array editor per schema (incl. `ImageUploader` for image fields).
- `ImageUploader` — `src/app/admin/components/ImageUploader.tsx`. Props `{ value; onChange(url); folder? }`. Upload → Cloudinary preview + clear.
- `SettingsForm` — `src/app/admin/components/SettingsForm.tsx`. Local state snapshot of `Settings`; URL/`mailto:` validation per field; save via `adminFetch`.

Modified components: the landing sections named under Files — component names/render trees unchanged, data flows switch to the hook + API.

## Dependencies

Add to `package.json` dependencies:
- `next-auth@^4.24.11` — Credentials provider + `getServerSession` (server) + `next-auth/react` (client).
- `bcryptjs@^2.4.3` — password hashing in `authorize`; add `@types/bcryptjs` to devDependencies.
- `cloudinary@^2.5.1` — server-side image upload SDK.
- `@mui/x-data-grid@^7.x` — admin CRUD tables (MUI v5 / React 18 compatible).

Unchanged: `mongodb@^6.6.2` driver is already installed and used directly (no mongoose). No zod — `lib/validate.ts` covers payload validation.

Env vars (in `.env.example`, then `.env.local` for dev / Vercel project for prod):
- `MONGODB_URI` (Atlas), optional `MONGODB_DB` (default `portfolio`)
- `NEXTAUTH_SECRET` (`openssl rand -base64 32`), `NEXTAUTH_URL` (dev: `http://localhost:3000`)
- `ADMIN_EMAIL`, `ADMIN_NAME`, `ADMIN_PASSWORD` — consumed only by `scripts/seed.mjs`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- Existing vars remain: `NEXT_PUBLIC_EMAILJS_*`, `SMTP_*`, `EMAIL_TO`, `NEXT_PUBLIC_CONFIG`.

npm scripts: add `"seed": "node --env-file=.env.local scripts/seed.mjs"`.
## Testing

No test framework exists in the repo (no jest/vitest configured); validation is via lint + type-check/build + manual QA, matching how the project is already run (`npm run dev`, `npm run build`).

Automated validation (required before handoff):
- `npm run lint` — next/core-web-vitals; must pass with no new errors (project already has `no-dupe-keys` off).
- `npm run build` — strict TS + Next build; catches type errors across the new types, libs, API routes, and components. All new pages/routes must be included in the build output.
- `node --check` / dry-run of `scripts/seed.mjs` locally against a scratch database to confirm idempotency.

Manual QA checklist (with a real `MONGODB_URI` + Cloudinary creds in `.env.local`):
1. `npm run seed` → admin user, settings, and all 6 collections seeded only when collections are empty; re-running doesn't duplicate.
2. Login flow: correct credentials → `/admin/education`; wrong password → inline error; unauthenticated `/admin/*` → redirected to `/admin/login`; `/api/admin/*` without session → 401.
3. Education CRUD: create/edit/delete + reorder (Move Up/Down updates `order`); changes appear on `/` education timeline after refresh; animation still plays after async load.
4. Certifications: add one with a Cloudinary-uploaded image (`ImageUploader`), credential link; new section on the landing page renders it.
5. Projects: add/edit project with `coverImage`, `images` gallery, `features`, `techStack`, links; card shows details modal; demo/repo buttons open correct URLs.
6. Skills: add a skill with an icon key + color; chip renders with the react-icons icon; invalid key falls back to `FaCode`.
7. Services: create/service edit updates `PricingCard` rendering (title, miniTitle, perks list).
8. Settings: change `email` + social URLs; footer mailto and `SMicons` reflect updates; empty URL hides that icon.
9. Upload route: valid image → returns `secure_url` (visible in Cloudinary console, `portfolio/` folder); oversized/unsupported file → 400, no partial upload.
10. Resilience: with `MONGODB_URI` removed, `/` still renders each section with fallback data and the API returns 500s (not crashes).

## Implementation Order

1. **Deps & env** — install `next-auth`, `bcryptjs`, `cloudinary`, `@mui/x-data-grid`, `@types/bcryptjs`; create `.env.example`; note vars for `.env.local`.
2. **Types & libs** — `src/types/index.ts`, then `lib/mongodb.ts`, `lib/cloudinary.ts`, `lib/validate.ts`, `lib/data/fallback.ts`, `lib/data/skills-icons.tsx`, `lib/api-client.ts`, `hooks/useSectionData.ts` (pure helpers; no UI yet).
3. **Auth plumbing** — `lib/auth.ts` (authOptions), `app/api/auth/[...nextauth]/route.ts`, `next-auth.d.ts`, `middleware.ts`. Verify login endpoint responds.
4. **Seed** — `scripts/seed.mjs` + `package.json` "seed" script; run locally, verify idempotent inserts.
5. **Public API** — the six `/api/public/*` routes; smoke-test responses mirror the current hardcoded content.
6. **Admin API** — CRUD routes for the 5 collections + `settings` + `upload`; each guarded by `isAdminSession`.
7. **Admin UI** — `Providers` + `admin/layout.tsx` → `login/page.tsx` → `(dashboard)/layout.tsx` (AdminShell) → `ResourceTable`/`ResourceDialog`/`ImageUploader` → the 6 section pages → `SettingsForm`.
8. **Landing page refactor** — migrate `Education` (+`EduCard`), add `Certifications`, `ProjectSwiper` (+`ProjectDetailsModal`), `Skills`, `Services`, `SMicons`, `Footer` to `useSectionData`/settings; update `page.tsx`; GSAP effects re-keyed to loaded data.
9. **Config polish** — `next.config.mjs` cloudinary domain; `docs/updates.md` check-off (optional).
10. **Validate** — `npm run lint`, `npm run build`, then the full manual QA checklist above against `.env.local`.
