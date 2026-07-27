"use client";

import Link from "next/link";

import { Box, Stack, Typography } from "@mui/material";
import { GlassCard } from "src/components/common/glass-card";
import { StatItem } from "./stat-item";
import { FeatureCard } from "./feature-card";

type Props = {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  isAddAccount?: boolean;
  footerText: string;
  footerLinkText: string;
  footerLink: string;
};

export function AuthShell({
  children,
  title,
  subtitle,
  isAddAccount,
  footerText,
  footerLinkText,
  footerLink,
}: Props) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          lg: "1.2fr 1fr",
        },
      }}>
      {/* Brand Side */}
      <Box
        sx={{
          display: {
            xs: "none",
            lg: "flex",
          },
          flexDirection: "column",
          justifyContent: "center",
          px: 10,
          position: "relative",
          overflow: "hidden",
        }}>
        <Box
          sx={(theme) => ({
            position: "absolute",
            inset: 0,
            pointerEvents: "none",

            background:
              theme.palette.mode === "dark"
                ? `
          radial-gradient(circle at 12% 12%, rgba(212,166,58,.18), transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(80,120,255,.08), transparent 35%)
        `
                : `
          radial-gradient(circle at 12% 12%, rgba(255,224,140,.55), transparent 38%),
          radial-gradient(circle at 90% 80%, rgba(120,180,255,.12), transparent 35%)
        `,
          })}
        />

        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              fontSize: 64,
              fontWeight: 900,
              lineHeight: 1,
              background: "linear-gradient(135deg,#D4A63A,#F4D06F)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            PineUp
          </Typography>

          <Typography
            sx={{
              color: "primary.main",
              mt: 1,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}>
            A premium social platform
            <br />
            built for creators,
            <br />
            professionals and ambitious
            <br />
            communities.
          </Typography>

          <Stack spacing={2} sx={{ mt: 5 }}>
            <FeatureCard
              title="Premium Community"
              text="Connect with ambitious creators and professionals."
            />

            <FeatureCard
              title="Meaningful Content"
              text="Discover conversations that actually matter."
            />

            <FeatureCard
              title="Built For Growth"
              text="Share ideas, build your audience and grow your influence."
            />
          </Stack>

          <Stack direction="row" spacing={6} sx={{ mt: 5 }}>
            <StatItem value="10K+" label="Creators" />

            <StatItem value="50K+" label="Posts" />

            <StatItem value="120+" label="Communities" />
          </Stack>
        </Box>

        <Typography
          variant="h5"
          sx={{
            maxWidth: 520,
            lineHeight: 1.7,
            color: "text.secondary",
            fontWeight: 500,
          }}>
          Join a community where meaningful conversations, authentic
          connections, and quality content come first.
        </Typography>
      </Box>

      {/* Form Side */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}>
        <GlassCard
          sx={(theme) => ({
            width: "100%",
            maxWidth: 560,
            p: 5,
            backdropFilter: "blur(20px)",

            background:
              theme.palette.mode === "dark"
                ? "rgba(26,31,39,.92)"
                : "rgba(255,255,255,.92)",

            border: "1px solid",

            borderColor:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,.06)"
                : "rgba(17,24,39,.08)",

            boxShadow:
              theme.palette.mode === "dark"
                ? "0 30px 80px rgba(0,0,0,.40)"
                : "0 30px 80px rgba(15,23,42,.10)",
          })}>
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "text.primary",
                }}>
                {title}
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: "text.secondary",
                  lineHeight: 1.7,
                }}>
                {subtitle}
              </Typography>
            </Box>

            {isAddAccount && (
              <Box
                sx={(theme) => ({
                  p: 2,
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "primary.main",

                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(212,166,58,.08)"
                      : "rgba(212,166,58,.12)",
                })}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "primary.main",
                    mb: 0.5,
                  }}>
                  Adding another account
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.6,
                  }}>
                  Your current account will remain signed in and available from
                  the account switcher.
                </Typography>
              </Box>
            )}

            {children}

            <Typography
              sx={{
                textAlign: "center",
                color: "text.secondary",
                lineHeight: 1.8,
              }}>
              {footerText}{" "}
              <Typography
                component={Link}
                href={footerLink}
                sx={{
                  display: "inline",
                  color: "primary.main",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: ".25s",

                  "&:hover": {
                    color: "primary.light",
                    textDecoration: "underline",
                    textUnderlineOffset: 4,
                  },
                }}>
                {footerLinkText}
              </Typography>
            </Typography>
          </Stack>
        </GlassCard>
      </Box>
    </Box>
  );
}
