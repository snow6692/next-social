"use client";

import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import {
  useAuth,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <div className="flex items-center space-x-2 md:hidden">
      {isLoaded ? (
        <UserButton />
      ) : (
        <div className="size-8 animate-pulse rounded-full bg-black" />
      )}

      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="mt-6 flex flex-col space-y-4">
            <Button
              onClick={() => setShowMobileMenu(false)}
              variant="ghost"
              className="flex items-center justify-start gap-3"
              asChild
            >
              <Link href="/">
                <HomeIcon className="h-4 w-4" />
                Home
              </Link>
            </Button>

            {isSignedIn ? (
              <>
                <Button
                  onClick={() => setShowMobileMenu(false)}
                  variant="ghost"
                  className="flex items-center justify-start gap-3"
                  asChild
                >
                  <Link href="/notifications">
                    <BellIcon className="h-4 w-4" />
                    Notifications
                  </Link>
                </Button>
                <Button
                  onClick={() => setShowMobileMenu(false)}
                  variant="ghost"
                  className="flex items-center justify-start gap-3"
                  asChild
                >
                  <Link href="/profile">
                    <UserIcon className="h-4 w-4" />
                    Profile
                  </Link>
                </Button>
                <SignOutButton>
                  <Button
                    onClick={() => setShowMobileMenu(false)}
                    variant="ghost"
                    className="flex w-full items-center justify-start gap-3"
                  >
                    <LogOutIcon className="h-4 w-4" />
                    Logout
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Sign In
                </Button>
              </SignInButton>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;
