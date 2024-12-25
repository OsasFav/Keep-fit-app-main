"use client"

import assets from "@/assets"
import Image from "next/image"
import React, { ReactNode, useEffect, useState } from "react"
import { FaLocationDot } from "react-icons/fa6"
// import { LuUser } from "react-icons/lu"
import { IoIosArrowDown } from "react-icons/io"
import { FormInput } from "@/styles/styledComponents"
import { IoSearch } from "react-icons/io5"
import Link from "next/link"
import { ROUTE } from "@/lib/route"
import { FiLogOut } from "react-icons/fi"
import { getInitials, logOutAction } from "@/utils/reusables"
import { getAllTrainers, getProfile, getWithExpiry } from "@/utils/req"
import { usePathname, useRouter } from "next/navigation"
import { useQuery } from "react-query"
import GetUserLocation from "@/components/getLocation"

type Props = {
  children: ReactNode
}

export default function GeneralLayout({ children }: Props) {
  const [show, setShow] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const [search, setSearch] = useState("")
  const [trainersSearch, setTrainersSearch] = useState([])
  const jwtToken = getWithExpiry("jwtToken")
  const location = usePathname()
  const { data: trainers } = useQuery("trainers", () => getAllTrainers(""))

  const router = useRouter()

  useEffect(() => {
    if (
      location &&
      (location.includes("/login") || location.includes("/register"))
    ) {
      localStorage.removeItem("lastVisitedRoute")
    } else if (location) {
      localStorage.setItem("lastVisitedRoute", location)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  const { data, isSuccess, isLoading } = useQuery("profile", () =>
    getProfile(location)
  )

  useEffect(() => {
    if (!jwtToken) {
      router.push(ROUTE.login)
    }
  }, [jwtToken, router])

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase() // Ensures case-insensitive search
    setSearch(searchText)

    const filteredTrainers = trainers?.data.filter(
      (eachTrainer) =>
        eachTrainer.first_name.toLowerCase().includes(searchText) ||
        eachTrainer.last_name.toLowerCase().includes(searchText) ||
        eachTrainer.location.toLowerCase().includes(searchText)
    )

    setTrainersSearch(filteredTrainers)
    setOpenSearch(true)
  }

  const gotoPage = (trainer) => {
    router.push(`/dashboard/trainer/${trainer?._id}`)
    setOpenSearch(false)
  }

  return (
    <div>
      <section className="border-b">
        <nav className="container py-4 justify-between items-center relative z-10 ">
          <Link
            href={location === ROUTE.dashboard ? "/" : ROUTE.dashboard}
            className="items-center gap-6 w-full"
          >
            <Image width={40} src={assets.logo} alt="" />
            {/* <div className='items-center gap-2 text-[13px]'>
              <FaLocationDot size={20} className='text-primary' />
              <div className='items-center gap-1'>
                <GetUserLocation />
                <IoIosArrowDown size={16} />
              </div>
            </div> */}
          </Link>
          {/* <ul className="items-center gap-8 text-lg">
         
          </ul> */}
          <div className="items-center w-full gap-5 justify-end">
            <div className="relative ">
              <FormInput className="max-w-[320px] w-full">
                <div className="!bg-[#f2f2f2] items-center input-div !w-full gap-1.5">
                  <IoSearch />
                  <input value={search} onChange={handleSearch} type="search" />
                </div>
              </FormInput>
              {openSearch && (
                <div className="w-80 py-2 space-y-1 absolute top-9 right-4 z-50 shadow rounded-md border border-gray-100 bg-white ">
                  {trainersSearch.length ? (
                    trainersSearch.map((trainer, index) => (
                      <div
                        onClick={() => gotoPage(trainer)}
                        className="hover:bg-gray-100 cursor-pointer px-4 py-2"
                        key={index}
                      >
                        <p className="text-base font-medium">
                          {trainer?.["first_name"] +
                            " " +
                            trainer?.["last_name"]}{" "}
                        </p>
                        <p className="text-xs">{trainer?.["location"]} </p>
                      </div>
                    ))
                  ) : (
                    <div className="items-center justify-center flex-col gap-4 ">
                      <Image className="w-20" src={assets.nodata} alt="" />
                      <p className="text-xl font-semibold">No data</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="relative">
              <div
                onMouseLeave={() => setShow(false)}
                onMouseEnter={() => setShow(true)}
                className="bg-primary text-white rounded-full h-10 w-10 items-center justify-center"
              >
                {/* <LuUser size={24} /> */}
              </div>
              <div
                onMouseLeave={() => setShow(false)}
                onMouseEnter={() => setShow(true)}
                className={`${
                  show
                    ? "visible opacity-100 top-11"
                    : "invisible opacity-0 top-full"
                }   duration-500 absolute  right-0 z-50 bg-white border border-primary rounded-2xl w-72 text-sm shadow `}
              >
                <Link
                  href={ROUTE.profile}
                  className="px-3 py-4 items-center gap-2 hover:bg-primary hover:bg-opacity-20 duration-500 rounded-t-2xl cursor-pointer"
                >
                  <div className="bg-primary h-10 w-10 items-center justify-center text-lg text-white font-semibold rounded-full">
                    {getInitials(
                      `${data?.["data"]?.first_name} ${data?.["data"]?.last_name}`
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-medium">{`${data?.["data"]?.first_name} ${data?.["data"]?.last_name}`}</p>
                    <p className="text-xs">{data?.["data"]?.email}</p>
                  </div>
                </Link>
                <div
                  onClick={() => logOutAction()}
                  className="items-center gap-2 text-red-500 px-3 py-3  border-t hover:bg-primary hover:bg-opacity-20 duration-500 rounded-b-2xl cursor-pointer"
                >
                  <FiLogOut /> Logout
                </div>
              </div>
            </div>
          </div>
        </nav>
      </section>
      <main className="bg-[#F3F4F6] min-h-dvh py-10">
        <div className="container">
          <div className="px-4 lg:px-6  py-14 bg-white border border-[#CDCDCD] rounded-2xl">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
