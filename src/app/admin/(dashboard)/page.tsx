"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  FaAward,
  FaGraduationCap,
  FaFolderOpen,
  FaStar,
  FaTools,
  FaChartLine,
} from "react-icons/fa";
import { adminFetch } from "@/lib/api-client";
import Link from "next/link";

type StatsData = {
  education: number;
  certifications: number;
  projects: number;
  skills: number;
  services: number;
};

const STATS_CONFIG = [
  {
    key: "education" as keyof StatsData,
    label: "Education",
    icon: FaGraduationCap,
    color: "#6200ff",
    href: "/admin/education",
  },
  {
    key: "certifications" as keyof StatsData,
    label: "Certifications",
    icon: FaAward,
    color: "#a273ff",
    href: "/admin/certifications",
  },
  {
    key: "projects" as keyof StatsData,
    label: "Projects",
    icon: FaFolderOpen,
    color: "#00d4ff",
    href: "/admin/projects",
  },
  {
    key: "skills" as keyof StatsData,
    label: "Skills",
    icon: FaStar,
    color: "#ffa726",
    href: "/admin/skills",
  },
  {
    key: "services" as keyof StatsData,
    label: "Services",
    icon: FaTools,
    color: "#66bb6a",
    href: "/admin/services",
  },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await Promise.all([
          adminFetch<{ items: any[] }>("/api/admin/education"),
          adminFetch<{ items: any[] }>("/api/admin/certifications"),
          adminFetch<{ items: any[] }>("/api/admin/projects"),
          adminFetch<{ items: any[] }>("/api/admin/skills"),
          adminFetch<{ items: any[] }>("/api/admin/services"),
        ]);

        setStats({
          education: data[0].items.length,
          certifications: data[1].items.length,
          projects: data[2].items.length,
          skills: data[3].items.length,
          services: data[4].items.length,
        });
      } catch (e) {
        console.error("Failed to load stats:", e);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const total = stats
    ? Object.values(stats).reduce((sum, val) => sum + val, 0)
    : 0;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
            fontSize: { xs: "1.75rem", sm: "2rem" },
            letterSpacing: "-0.02em",
          }}
        >
          Dashboard
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontSize: { xs: ".9rem", sm: "1rem" } }}
        >
          Welcome back! Here's an overview of your portfolio content.
        </Typography>
      </Box>

      {/* Total Items Card */}
      <Paper
        sx={{
          mb: { xs: 3, sm: 4 },
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          border: "1px solid #6200ff44",
          bgcolor: "#6200ff11",
          background: "linear-gradient(135deg, #6200ff11 0%, #6200ff05 100%)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: "#a273ff",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 1,
                fontSize: ".75rem",
              }}
            >
              Total Items
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.5rem", sm: "3rem" },
                color: "#a273ff",
                lineHeight: 1.2,
              }}
            >
              {loading ? (
                <CircularProgress size={40} sx={{ color: "#a273ff" }} />
              ) : (
                total
              )}
            </Typography>
          </Box>
          <Box
            sx={{
              width: { xs: 60, sm: 80 },
              height: { xs: 60, sm: 80 },
              borderRadius: "50%",
              bgcolor: "#6200ff22",
              border: "2px solid #6200ff44",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaChartLine size={isMobile ? 28 : 36} color="#a273ff" />
          </Box>
        </Box>
      </Paper>

      {/* Stats Grid */}
      <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
        {STATS_CONFIG.map((config) => {
          const Icon = config.icon;
          const count = stats?.[config.key] ?? 0;

          return (
            <Grid item xs={6} sm={6} md={4} key={config.key}>
              <Card
                component={Link}
                href={config.href}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  border: "1px solid #ffffff14",
                  bgcolor: "#ffffff05",
                  transition: "all 0.3s ease",
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 8px 24px ${config.color}33`,
                    borderColor: `${config.color}66`,
                    bgcolor: `${config.color}08`,
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: 2, sm: 2.5, md: 3 },
                    "&:last-child": { pb: { xs: 2, sm: 2.5, md: 3 } },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 40, sm: 48 },
                        height: { xs: 40, sm: 48 },
                        borderRadius: 2,
                        bgcolor: `${config.color}22`,
                        border: `1px solid ${config.color}44`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={isMobile ? 18 : 22} color={config.color} />
                    </Box>
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: "2rem", sm: "2.5rem" },
                      mb: 0.5,
                      color: config.color,
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: config.color }} />
                    ) : (
                      count
                    )}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 600,
                      fontSize: { xs: ".85rem", sm: ".9rem" },
                    }}
                  >
                    {config.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Quick Links */}
      <Box sx={{ mt: { xs: 3, sm: 4 } }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: "1.1rem", sm: "1.25rem" },
          }}
        >
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          {STATS_CONFIG.slice(0, 3).map((config) => (
            <Grid item xs={12} sm={4} key={`link-${config.key}`}>
              <Card
                component={Link}
                href={config.href}
                sx={{
                  borderRadius: 2,
                  border: "1px solid #ffffff14",
                  bgcolor: "#ffffff05",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "#ffffff0a",
                    borderColor: config.color,
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 2,
                    "&:last-child": { pb: 2 },
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 1.5,
                      bgcolor: `${config.color}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <config.icon size={16} color={config.color} />
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: ".9rem", sm: ".95rem" },
                    }}
                  >
                    Manage {config.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
