"use client";

import Link from "next/link";
import { StatItem } from "./stat-item";
import { FeatureCard } from "./feature-card";
import {
  Box,
  Stack,
  Typography,
  Card,
} from "@mui/material";

type Props = {
  children: React.ReactNode;

  title: string;

  subtitle: string;

  footerText: string;

  footerLinkText: string;

  footerLink: string;
};

export function AuthShell({
  children,
  title,
  subtitle,
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
      }}
    >

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
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            bgcolor: "primary.main",
            filter: "blur(180px)",
            opacity: 0.15,
            top: -100,
            left: -100,
          }}
        />

        <Box sx={{ mb: 4 }}>
            <Typography
                sx={{
                fontSize: 64,
                fontWeight: 900,
                lineHeight: 1,
                background:
                    "linear-gradient(135deg,#D4A63A,#F4D06F)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor:
                    "transparent",
                }}
            >
                PineUp
            </Typography>

            <Typography
                sx={{
                color: "primary.main",
                mt: 1,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: "uppercase",
                }}
            >
                A premium social platform
                built for creators,
                professionals and ambitious
                communities.
            </Typography>

            <Stack
            spacing={2}
            sx={{ mt: 5 }}
            >
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
                text="Share ideas, build audience and grow influence."
            />
            </Stack>

            <Stack
            direction="row"
            spacing={6}
            sx={{ mt: 5 }}
            >
            <StatItem
                value="10K+"
                label="Creators"
            />

            <StatItem
                value="50K+"
                label="Posts"
            />

            <StatItem
                value="120+"
                label="Communities"
            />
            </Stack>
        </Box>

        <Typography
          variant="h5"
          color="text.secondary"
          sx={{
            maxWidth: 520,
            lineHeight: 1.6,
          }}
        >
          A premium social platform
          built for creators,
          professionals and ambitious
          communities.
        </Typography>
      </Box>

      {/* Form Side */}
      <Box
        sx={{
          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          p: 3,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 560,
            p: 5,
            backdropFilter: "blur(20px)",
            background:
            "rgba(26,31,39,0.92)",
            border:
            "1px solid rgba(255,255,255,0.06)",
            boxShadow:
            "0 30px 80px rgba(0,0,0,0.4)",}}
        >
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                }}
              >
                {title}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                {subtitle}
              </Typography>
            </Box>

            {children}

            <Typography sx={{textAlign:"center", color:"text.secondary"}}
            >
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
                }}
              >
                {footerLinkText}
              </Typography>
            </Typography>

          </Stack>
        </Card>
      </Box>
    </Box>
  );
}