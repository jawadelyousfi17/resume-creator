import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { useUser } from "./userContext";

const Navbar = () => {
  const user = useUser();

  return (
    <nav className="flex justify-between items-center h-18 px-4 bg-background sticky top-0 z-50 w-full backdrop-blur-md">
      <div>
        <img src="/icons/logo.svg" className="h-10" alt="" />
      </div>

      <div className="flex items-center gap-4">
        <Link href="/" className="font-light">
          <span>Resume template</span>
        </Link>
        <Link href="/" className="font-light">
          <span>Brows jobs</span>
        </Link>
        <Link href="/" className="font-light">
          <span>Resources</span>
        </Link>
        <div className="w-px h-5 bg-foreground/10 mx-4">{""}</div>

        {user && (
          <Link href="/app/resumes" className="text-primary font-light">
            <span>My Account</span>
          </Link>
        )}

        {!user && (
          <>
            <Link href="/" className="text-primary font-light">
              <span>Sign in</span>
            </Link>

            <Link href="/" className="text-primary font-light">
              <Button>Create my resume</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
