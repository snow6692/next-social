import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

function UnAuthenticatedSidebar() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-center text-xl">Welcome back </CardTitle>
        <CardDescription className="mb-4 text-center">
          Login for more
        </CardDescription>
        <CardFooter>
          <Button
            asChild
            className="mt-10 w-full transition-all duration-300 hover:rounded-xl"
          >
            <SignInButton mode="modal">Sign in</SignInButton>
          </Button>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}

export default UnAuthenticatedSidebar;
