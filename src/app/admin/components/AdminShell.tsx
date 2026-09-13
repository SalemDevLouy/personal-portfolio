"use client";
import type { ReactNode } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  FaAward,
  FaBars,
  FaCog,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaFolderOpen,
  FaSignOutAlt,
  FaStar,
  FaTools,
} from "react-icons/fa";
import { useState } from "react";

const NAV = [
  { label: "Education", href: "/admin/education", icon: <FaGraduationCap size={15} /> },
  { label: "Certifications", href: "/admin/certifications", icon: <FaAward size={15} /> },
  { label: "Projects", href: "/admin/projects", icon: <FaFolderOpen size={15} /> },
  { label: "Skills", href: "/admin/skills", icon: <FaStar size={15} /> },
  { label: "Services", href: "/admin/services", icon: <FaTools size={15} /> },
  { label: "Settings", href: "/admin/settings", icon: <FaCog size={15} /> },
];

const DRAWER_WIDTH = 260;

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = NAV.find((n) => pathname === n.href);

  const drawerPaper = {
    width: { xs: "85%", sm: 280, md: DRAWER_WIDTH },
    maxWidth: { xs: 320, sm: 280 },
    boxSizing: "border-box",
    bgcolor: "#0c1021",
    color: "#fff",
    borderRight: "1px solid #ffffff1f",
  } as const;

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar sx={{ py: 2 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2, fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
            Admin Panel
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.6, fontSize: { xs: ".7rem", sm: ".75rem" } }}>
            Portfolio content
          </Typography>
        </Box>
      </Toolbar>
      <Divider sx={{ borderColor: "#ffffff1f" }} />
      <List sx={{ px: { xs: 1.5, sm: 2 }, py: 1.5, flex: 1, overflow: "auto" }}>
        {NAV.map((item) => {
          const selected = pathname === item.href;
          return (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
              <Link
                href={item.href}
                style={{ textDecoration: "none", width: "100%", color: "inherit" }}
                onClick={() => setMobileOpen(false)}
              >
                <ListItemButton
                  selected={selected}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    minHeight: 48,
                    "&.Mui-selected": {
                      bgcolor: "#6200ff33",
                      "&:hover": { bgcolor: "#6200ff44" },
                    },
                    "&:hover": { bgcolor: "#ffffff0d" },
                  }}
                >
                  <ListItemIcon
                    sx={{ minWidth: { xs: 40, sm: 36 }, color: selected ? "#a273ff" : "#ffffffaa" }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: selected ? 700 : 500,
                      fontSize: { xs: ".95rem", sm: ".9rem" },
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
      <Divider sx={{ borderColor: "#ffffff1f" }} />
      <Box sx={{ p: { xs: 2, sm: 2 } }}>
        {session?.user?.email && (
          <Chip
            label={session.user.email}
            size="small"
            sx={{
              maxWidth: "100%",
              mb: 1.5,
              bgcolor: "#ffffff14",
              fontSize: { xs: ".75rem", sm: ".8rem" },
              "& .MuiChip-label": {
                overflow: "hidden",
                textOverflow: "ellipsis",
                px: 1.5,
              },
            }}
          />
        )}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <Button
            size="small"
            variant="outlined"
            component={Link}
            href="/"
            startIcon={<FaExternalLinkAlt size={11} />}
            fullWidth
            sx={{
              textTransform: "none",
              minHeight: 38,
              fontSize: { xs: ".85rem", sm: ".875rem" },
            }}
          >
            View Site
          </Button>
          <Button
            size="small"
            color="error"
            variant="outlined"
            startIcon={<FaSignOutAlt size={12} />}
            onClick={() => signOut({ callbackUrl: "/" })}
            fullWidth
            sx={{
              textTransform: "none",
              minHeight: 38,
              fontSize: { xs: ".85rem", sm: ".875rem" },
            }}
          >
            Sign Out
          </Button>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": drawerPaper,
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": drawerPaper,
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flex: 1, minWidth: 0, bgcolor: "#0a0d1a" }}>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            bgcolor: "#0c1021ee",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid #ffffff14",
          }}
        >
          <Toolbar sx={{ gap: 1.5, minHeight: { xs: 56, sm: 64 } }}>
            <IconButton
              color="inherit"
              edge="start"
              aria-label="Open navigation"
              onClick={() => setMobileOpen(true)}
              sx={{
                display: { md: "none" },
                mr: 0.5,
                bgcolor: "#ffffff0a",
                "&:hover": { bgcolor: "#ffffff14" },
              }}
            >
              <FaBars size={16} />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
                letterSpacing: "-0.01em",
              }}
            >
              {active?.label ?? "Dashboard"}
            </Typography>
          </Toolbar>
        </Box>
        <Box
          sx={{
            p: { xs: 2, sm: 2.5, md: 3 },
            maxWidth: 1200,
            mx: "auto",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}