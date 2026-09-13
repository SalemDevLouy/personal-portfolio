import type { Metadata } from "next";
import Providers from "./components/Providers";

export const metadata: Metadata = {
  title: "Admin Panel | Salem Dev Portfolio",
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Providers>{children}</Providers>;
}