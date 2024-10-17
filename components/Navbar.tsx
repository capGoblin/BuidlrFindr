"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import ConnectButton from "@/components/ConnectButton";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-3xl font-extrabold bg-gradient-to-r from-green-400 to-blue-200 bg-clip-text text-transparent hover:from-green-300 hover:to-blue-100 transition-all duration-300">
                BuidlAlliance
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/profile">
              <User className="w-5 h-5 mr-1" />
              Your Profile
            </NavLink>
            <ConnectButton />
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/profile">
              <User className="w-5 h-5 mr-2" />
              Your Profile
            </MobileNavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-white border-opacity-20">
            <div className="px-2">
              <ConnectButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="px-4 py-2 rounded-md text-sm font-medium bg-white bg-opacity-10 hover:bg-opacity-20 hover:text-green-400 transition-all duration-300 flex items-center"
  >
    {children}
  </Link>
);

const MobileNavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white hover:bg-opacity-20 hover:text-green-400 transition-colors duration-300 flex items-center"
  >
    {children}
  </Link>
);
