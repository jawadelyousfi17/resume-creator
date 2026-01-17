import Link from "next/link";
import React from "react";
import { Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className=" bg-muted/30 pt-16 pb-8 mt-20 border-t border-border/40 ">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <img src="/icons/logo.svg" className="h-8" alt="Logo" />
              <span className="font-semibold text-xl tracking-tight">

              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs leading-relaxed">
              Create your professional resume in minutes. our AI-powered
              platform helps you land your dream job faster.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-background border hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-background border hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-background border hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-6">Product</h3>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Resume Templates
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Cover Letters
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  AI Job Search
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-6">Company</h3>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-6">Resources</h3>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Resume Examples
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Career Advice
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Resume.io Clone. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
