"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetOverlay,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "./Footer";

export default function MobileNavbar({ user }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const func = () => {
      if (window.innerWidth > 768) setOpen(false);
    };

    window.addEventListener("resize", func);

    return () => window.removeEventListener("resize", func);
  }, []);

  return (
    <section>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="right" className="border-none bg-white w-fit">
          <Link
            href="/"
            className="cursor-pointer flex items-center gap-3 w-fit"
          >
            <Image
              src="/icons/logo.svg"
              height={30}
              width={30}
              alt="IAGM logo"
            />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
              IAGM
            </h1>
          </Link>

          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((item) => {
                  const isActive = pathName === item.route;

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        key={item.label}
                        href={item.route}
                        className={`mobilenav-sheet_close w-full ${isActive ? "bg-bank-gradient" : ""} }`}
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                          className={isActive ? "brightness-[3] invert-0" : ""}
                        />
                        <p
                          className={`text-16 font-semibold text-black-2 ${isActive ? "!text-white" : ""}`}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetClose>

            <Footer user={user} type="mobile" />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}
