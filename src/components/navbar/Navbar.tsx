import Link from "next/link";
import React from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/actions/userAction";

async function Navbar() {
  const user = await currentUser();

  if (user) await syncUser();
  return (
    <nav className="sticky top-0 z-50 w-full border-b to-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center justify-center">
            <Link
              href={"/"}
              className="font-mono text-xl font-bold tracking-wider text-primary"
            >
              Social ❄️
            </Link>
          </div>
          <DesktopNavbar />
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
