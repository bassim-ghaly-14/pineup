"use client";

import { usePathname } from "next/navigation";

import { Box } from "@mui/material";

import { Navbar } from "@/components/layout/navbar/navbar";
import { MobileNav } from "@/components/layout/mobile-nav/mobile-nav";
import { Sidebar } from "@/components/layout/sidebar/sidebar";
import { RightSidebar } from "@/components/layout/right-sidebar/right-sidebar";


export function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();

  const isPublic =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");


  if (isPublic) {
    return children;
  }


  return (
    <>
      <Navbar />

      <Box
        component="main"
        sx={{
          maxWidth:1440,
          mx:"auto",
          width:"100%",
          px:{
            xs:2,
            md:3,
            lg:4,
          },
          py:3,
          pb:{
            xs:12,
            lg:3,
          },
        }}
      >

        <Box
          sx={{
            display:"grid",
            gridTemplateColumns:{
              xs:"1fr",
              lg:"260px minmax(0,720px) 320px",
            },
            gap:4,
            alignItems:"start",
          }}
        >

          <Box
            sx={{
              display:{
                xs:"none",
                lg:"block",
              },
            }}
          >
            <Sidebar/>
          </Box>


          <Box sx={{minWidth:0}}>
            {children}
          </Box>


          <Box
            sx={{
              display:{
                xs:"none",
                xl:"block",
              },
            }}
          >
            <RightSidebar/>
          </Box>


        </Box>

      </Box>


      <MobileNav/>

    </>
  );
}