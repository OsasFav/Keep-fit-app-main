"use client"

import { useRouter } from "next/navigation"
import { FaArrowLeft } from "react-icons/fa6"
type Props = {}

export default function GoBack({}: Props) {
  const router = useRouter()
  return (
    <div
      onClick={() => router.back()}
      className="items-center !mb-4 gap-2 cursor-pointer text-md font-bold opacity-60 hover:opacity-100 hover:underline"
    >
      <FaArrowLeft />
      Back
    </div>
  )
}
