"use client"

import assets from "@/assets"
import Modal from "@/components/modal"
import Skeleton from "@/components/skeleton"
import {
  FormInput,
  HeadingWithUnderline,
  returnColor,
  Table,
  UserDets,
} from "@/styles/styledComponents"
import toaster from "@/ui/toast"
import api from "@/utils/api"
import { getProfile } from "@/utils/req"
// import { getTrainerProfile } from '@/utils/req'
import { convertDate, errorHandler } from "@/utils/reusables"
import Image from "next/image"
import { usePathname } from "next/navigation"
import React, { useState, useEffect } from "react"
import { IoIosArrowForward } from "react-icons/io"
import { useMutation, useQuery } from "react-query"
import styled from "styled-components"

type Props = {}
interface UserTypes {
  first_name?: string
  last_name?: string
  phone_number?: string
  address?: string
  num_of_participants?: string
  training_type?: string
  scheduled_date?: string
  message?: string
  status?: string
  _id?: string
}

export default function TrainerDashboard({}: Props) {
  const location = usePathname()
  const {
    data: profile,
    isLoading,
    refetch,
  } = useQuery("profile", () => getProfile(location))
  const appointmentsCount = [
    { name: "Scheduled", count: profile?.["data"].counts?.scheduled },
    { name: "Accepted", count: profile?.["data"].counts?.accepted },
    { name: "Completed", count: profile?.["data"].counts?.completed },
    { name: "Cancelled", count: profile?.["data"].counts?.cancelled },
  ]
  const rows = (colCount: any) =>
    Array.from({ length: 6 }).map((_, i) => (
      <tr key={i} className="">
        {Array.from({ length: colCount }).map((_: any, j: any) => (
          <td key={j}>
            <Skeleton width="w-full p-2" />
          </td>
        ))}
      </tr>
    ))

  const [isOpen, setIsOpen] = useState(false)
  const [userInfo, setUserInfo] = useState<UserTypes>({})
  const [fields, setFields] = useState({
    status: "",
    uid: "",
    reason: "",
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFields({
      ...fields,
      [name]: value,
      uid: userInfo?._id ?? "",
    })
  }

  const showUser = (details: UserTypes) => {
    setIsOpen(true)
    setUserInfo(details)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    mutate()
  }

  const { isLoading: isSubmitLoading, mutate } = useMutation(
    async () => {
      return await api.post("trainer/dashboard/appointments", fields)
    },
    {
      onSuccess: (res: any) => {
        if (res.status === "success") {
          toaster(res["message"], "success")
          setFields({
            status: "",
            uid: "",
            reason: "",
          })
          refetch()
          setIsOpen(false)
        } else toaster(res["message"], "error")
      },
      onError: (res) => {
        errorHandler(res)
      },
    }
  )

  return (
    <div className="space-y-8 overflow-x-auto">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {appointmentsCount.map((counts) => (
          <div
            key={counts.name}
            className="bg-[#f3f4f6] rounded-md px-4 py-2.5 border"
          >
            <p className="text-gray-500 mb-6">{counts.name}</p>
            {isLoading ? (
              <Skeleton className="w-full p-3" />
            ) : (
              <h4 className="text-2xl font-semibold">{counts.count}</h4>
            )}
          </div>
        ))}
      </div>

      <Table>
        <thead>
          <tr className="uppercase">
            <th>Order ID</th>
            <th>Timestamp</th>
            <th>Customer</th>
            <th>Address</th>
            <th>Training</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            rows(7)
          ) : !profile?.["data"].appointments ? (
            <tr>
              <td colSpan={7}>
                <div className="items-center justify-center flex-col gap-4 py-16">
                  <Image src={assets.nodata} alt="" />
                  <p className="text-xl font-semibold">No data</p>
                </div>
              </td>
            </tr>
          ) : (
            profile?.["data"].appointments
              .reverse()
              .map((detail: any, i: number) => {
                return (
                  <tr onClick={() => showUser(detail)} key={i}>
                    <td className="font-semibold">{detail.order_id}</td>
                    <td>{convertDate(detail.createdAt)}</td>
                    <td>{`${detail.first_name} ${detail.last_name}`}</td>
                    <td>{detail.address}</td>
                    <td>{detail.training_type}</td>
                    <td>
                      <span
                        className="rounded-md px-2 py-1.5 text-xs font-semibold capitalize"
                        style={{
                          backgroundColor: `${returnColor(detail.status).bg}`,
                          color: `${returnColor(detail.status).text}`,
                        }}
                      >
                        {detail.status}
                      </span>
                    </td>
                    <td>
                      <IoIosArrowForward />
                    </td>
                  </tr>
                )
              })
          )}
        </tbody>
      </Table>

      <Modal
        heading={"Heading text"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isFullScreen={true}
        className="p-6"
      >
        <form onSubmit={handleSubmit}>
          <HeadingWithUnderline className="text-2xl font-semibold !mb-14">
            Training Information
          </HeadingWithUnderline>
          <div className="space-y-6">
            <UserDets>
              <label>Full name</label>
              <p>{`${userInfo?.first_name} ${userInfo?.last_name}`}</p>
            </UserDets>
            <UserDets>
              <label>Phone number</label>
              <p>{userInfo?.phone_number}</p>
            </UserDets>
            <UserDets>
              <label>Address</label>
              <p>{userInfo?.address}</p>
            </UserDets>
            <UserDets>
              <label>Number of participants</label>
              <p>{userInfo?.num_of_participants}</p>
            </UserDets>
            <UserDets>
              <label>Type of training</label>
              <p>{userInfo?.training_type}</p>
            </UserDets>
            <UserDets>
              <label>Scheduled date</label>
              <p>{convertDate(userInfo?.scheduled_date ?? "")}</p>
            </UserDets>
            {userInfo?.message && (
              <UserDets>
                <label>Message</label>
                <p>{userInfo?.message}</p>
              </UserDets>
            )}
            {userInfo?.status === "scheduled" ? (
              <FormInput>
                <label>Status</label>
                <select
                  name="status"
                  value={fields.status}
                  onChange={handleChange}
                >
                  <option value="" hidden>
                    {" "}
                    -- Please select --
                  </option>
                  <option value="accepted">Accept</option>
                  <option value="cancelled">Decline</option>
                </select>
              </FormInput>
            ) : (
              <UserDets>
                <label>Status</label>
                <p
                  className="capitalize p-2 rounded-md"
                  style={{
                    backgroundColor: returnColor(userInfo?.status ?? "").bg,
                    color: returnColor(userInfo?.status ?? "").text,
                  }}
                >
                  {userInfo?.status}
                </p>
              </UserDets>
            )}
            {fields?.status === "cancelled" && (
              <FormInput>
                <label>Reason</label>
                <input
                  type="text"
                  value={fields.reason}
                  name="reason"
                  onChange={handleChange}
                  required
                />
              </FormInput>
            )}
          </div>
          {userInfo?.status === "scheduled" && (
            <button className="w-full mt-8" disabled={isSubmitLoading}>
              Submit
            </button>
          )}
        </form>
      </Modal>
    </div>
  )
}
