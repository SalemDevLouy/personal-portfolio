"use client";
import { Suspense, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }
    router.push(params.get("callbackUrl") || "/admin/education");
    router.refresh();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, sm: 3 },
        bgcolor: "#0a0d1a",
        backgroundImage: "radial-gradient(circle at 50% 0%, #6200ff15 0%, transparent 50%)",
      }}
    >
      <Paper
        sx={{
          p: { xs: 3, sm: 4, md: 5 },
          width: "100%",
          maxWidth: 440,
          borderRadius: { xs: 3, sm: 4 },
          border: "1px solid #ffffff1f",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        }}
        elevation={0}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 3,
              bgcolor: "#6200ff22",
              border: "1px solid #6200ff44",
              mb: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: "2rem",
                fontWeight: 800,
                background: "linear-gradient(135deg, #a273ff 0%, #6200ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              A
            </Typography>
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 0.5,
              fontSize: { xs: "1.4rem", sm: "1.5rem" },
              letterSpacing: "-0.01em",
            }}
          >
            Admin Login
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: { xs: ".9rem", sm: ".95rem" },
            }}
          >
            Sign in to manage your portfolio content
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={submit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, sm: 2.5 },
          }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
            fullWidth
            InputProps={{
              sx: {
                fontSize: { xs: ".95rem", sm: "1rem" },
                minHeight: 48,
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            fullWidth
            InputProps={{
              sx: {
                fontSize: { xs: ".95rem", sm: "1rem" },
                minHeight: 48,
              },
            }}
          />
          {error && (
            <Alert
              severity="error"
              sx={{
                fontSize: { xs: ".85rem", sm: ".875rem" },
              }}
            >
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
            sx={{
              minHeight: { xs: 48, sm: 52 },
              borderRadius: 2,
              textTransform: "none",
              fontSize: { xs: ".95rem", sm: "1rem" },
              fontWeight: 600,
              mt: 1,
            }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </Box>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Link
            href="/"
            style={{
              color: "#9e9eff",
              fontSize: ".9rem",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            ← Back to website
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}