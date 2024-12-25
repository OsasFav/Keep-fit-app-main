"use client"

import assets from "@/assets"
import GoBack from "@/components/backBtn"
import Modal from "@/components/modal"
import Skeleton from "@/components/skeleton"
import {
  FormInput,
  HeadingWithUnderline,
  returnColor,
  Table,
  UserDets,
} from "@/styles/styledComponents"
import api from "@/utils/api"
import { getAllReqs } from "@/utils/req"
import { convertDate } from "@/utils/reusables"
import Image from "next/image"
import React, { useState } from "react"
import { IoIosArrowForward } from "react-icons/io"
import { useQuery } from "react-query"
type Props = {}
interface Trainer {
  first_name?: string
  last_name?: string
}
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
  order_id?: string
  trainer?: Trainer
  _id?: string
}

export default function History({}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const { data, isSuccess, isLoading } = useQuery("allHistory", getAllReqs)
  const [userInfo, setUserInfo] = useState<UserTypes>({})

  const showUser = (details: UserTypes) => {
    setIsOpen(true)
    setUserInfo(details)
  }

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

  return (
    <div className="">
      <div>
        <GoBack />
        <h4 className="text-4xl font-semibold mb-7">History</h4>
        <Table>
          <thead className="">
            <tr className="uppercase">
              <th>Order ID</th>
              <th>Timestamp</th>
              <th>Trainer</th>
              <th>Address</th>
              <th>Training</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              rows(7)
            ) : !data?.data ? (
              <tr>
                <td colSpan={7}>
                  <div className="items-center justify-center flex-col gap-4 py-16">
                    <Image src={assets.nodata} alt="" />
                    <p className="text-xl font-semibold">No data</p>
                  </div>
                </td>
              </tr>
            ) : (
              data?.data?.appointments.map((detail, i) => {
                return (
                  <tr onClick={() => showUser(detail)} key={i}>
                    <td className="font-semibold">{detail.order_id}</td>
                    <td>{convertDate(detail.createdAt)}</td>
                    <td>{`${detail.trainer.first_name} ${detail.trainer.last_name}`}</td>
                    <td>{detail.address}</td>
                    <td>{detail.training_type}</td>
                    <td>
                      {" "}
                      <span
                        className="rounded-md px-2 py-1.5 text-sm font-semibold capitalize"
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
      </div>

      <Modal
        heading={"Heading text"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isFullScreen={true}
        className="p-6"
      >
        <div>
          <HeadingWithUnderline className="text-2xl font-semibold !mb-14">
            Training Information
          </HeadingWithUnderline>
          <div className="space-y-6">
            <UserDets>
              <label>Order ID</label>
              <p>{userInfo?.order_id}</p>
            </UserDets>
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
            <UserDets>
              <label>Trainer</label>
              <p>{`${userInfo?.trainer?.first_name} ${userInfo?.trainer?.last_name}`}</p>
            </UserDets>
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
          </div>
        </div>
      </Modal>
    </div>
  )
}
