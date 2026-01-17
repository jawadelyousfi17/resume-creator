"use client";

import { signUp } from "@/actions/auth/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [state, formAction, isPending] = useActionState(signUp, null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.message) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <main className="bg-foreground/10 h-full p-8">
      <div className="flex border p-8 items-center justify-center gap-6 bg-background w-fit mx-auto rounded-2xl">
        <div className="flex flex-1 flex-col gap-4 items-start   max-w-md md:min-w-sm">
          <img src="/icons/logo.svg" className="h-10" alt="" />
          <div className="space-y-0.5">
            <h1 className="font-bold text-lg">Sign up </h1>
            <p className="text-foreground/50 text-sm font-light">
              Enter details to create an account
            </p>
          </div>

          <div className="gap-2 flex flex-col w-full items-center justify-center">
            <Button className="space-x-2 shadow-none w-full bg-red-600 text-white flex items-center justify-between">
              <img
                src="/icons/google-small.png"
                className="h-5 brightness-2000"
                alt=""
              />
              Sign in with google
              <div></div>
            </Button>
            <Button className="space-x-2 shadow-none w-full bg-blue-600 text-white flex items-center justify-between ">
              <img
                src="/icons/linkedin-app-white-icon.webp"
                className="h-5"
                alt=""
              />
              Sign in with LinkedIn
              <div></div>
            </Button>
          </div>

          {/* <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div> */}

          {/* <div className="flex flex-col gap-2 w-full">
            <form action={formAction}>
              <div className="flex flex-col gap-0.5">
                <label className="text-sm text-foreground/50 font-light">
                  Full name
                </label>
                <Input
                  name="name"
                  placeholder="Your name"
                  className="shadow-none bg-secondary border-0"
                />
              </div>

              <div className="flex flex-col gap-0.5">
                <label className="text-sm text-foreground/50 font-light">
                  Email
                </label>
                <Input
                  name="email"
                  placeholder="Your email name@example.com"
                  className="shadow-none bg-secondary border-0"
                />
              </div>

              <div className="flex flex-col gap-0.5">
                <label className="text-sm text-foreground/50 font-light">
                  Password
                </label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="shadow-none bg-secondary border-0"
                />
              </div>

              <Button className="mt-2" disabled={isPending}>
                {isPending ? (
                  <>
                    <Spinner /> Sign Up
                  </>
                ) : (
                  <>Sign up</>
                )}
              </Button>
            </form>
          </div>
          <div className="text-sm font-light text-center">
            Already have an account ?{" "}
            <Link className="text-primary font-semibold" href="/login">
              Log in
            </Link>
          </div> */}
        </div>
        {/* 
        <div className="flex items-center bg-amber-200">
          <img src="/images/retro-illustration.png" className="max-w-sm" alt="" />
        </div> */}
      </div>
    </main>
  );
};

export default page;
