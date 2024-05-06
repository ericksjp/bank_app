"use client";

import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function Sidebar({ user }: SiderbarProps) {
  const pathName = usePathname();

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="flex mb-12 cursor-pointer items-center gap-2">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="IAGM logo"
            className="size-[24px] max-xl:size-14"
          ></Image>
          <h1 className="sidebar-logo">IAGM</h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive =
            pathName === item.route || pathName.startsWith(item.route);

          return (
            <Link
              key={item.label}
              href={item.route}
              className={`sidebar-link ${isActive ? "bg-bank-gradient" : ""} }`}
            >
              <div className="relative size-6">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={isActive ? "brightness-[3] invert-0" : ""}
                />
              </div>
              <p className={`sidebar-label ${isActive ? "!text-white" : ""}`}>
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>

      <Footer user={user} type="desktop" />
    </section>
  );
}
