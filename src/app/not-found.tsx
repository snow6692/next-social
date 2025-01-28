import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center font-mono">
      <h2 className="text-3xl">Could not found the request resource</h2>
      <div className="">
        <Link
          className="text-xl text-primary underline underline-offset-4"
          href={"/"}
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
