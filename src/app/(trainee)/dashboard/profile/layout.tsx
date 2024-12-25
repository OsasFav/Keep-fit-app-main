"use client"

import GoBack from "@/components/backBtn"
import { ROUTE } from "@/lib/route"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default function ProfileLayout({ children }: Props) {
  const location = usePathname()
  const lists = [
    {
      title: "Personal Information",
      route: location?.includes("trainer")
        ? "/trainer/dashboard/profile"
        : ROUTE.profile,
    },
    {
      title: "Password",
      route: location?.includes("trainer")
        ? "/trainer/dashboard/profile/password"
        : ROUTE.updatePassword,
    },
    // { title: "Sessions", route: location?.includes("trainer") ? "/trainer/dashboard/profile" : "/dashboard/profile/sessions" },
  ]
  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <div className="lg:max-w-64 w-full gap-6 flex lg:flex-col flex-row items-start">
        {lists.map((item) => (
          <Link
            href={item.route}
            className={`${
              location === item.route
                ? "font-semibold text-primary border-primary"
                : "font-medium border-transparent "
            } text-xl cursor-pointer border-b-2`}
            key={item.title}
          >
            {item.title}
          </Link>
        ))}
      </div>
      <div className="max-w-2xl w-full">
        <GoBack />
        {children}
      </div>
    </div>
  )
}
