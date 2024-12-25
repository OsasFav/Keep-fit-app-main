"use client"

import { FormEvent, useState } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { useMutation } from "react-query";

import React from 'react'
import toaster from "@/ui/toast";
import api from "@/utils/api";
import { setWithExpiry } from "@/utils/req";
import { ROUTE } from "@/lib/route";
import { errorHandler } from "@/utils/reusables";
import Link from "next/link";
import assets from "@/assets";
import Image from "next/image";
import { FormInput } from "@/styles/styledComponents";
import { usePathname, useRouter } from "next/navigation";
import CircleLoader from "@/ui/btnLoader";

type Props = {}

export default function Login({ }: Props) {
  const [isOpen, togglePassword] = useState(false)
  const router = useRouter()
  const location = usePathname()

  const [fields, setFields] = useState({
    email: "",
    password: "",
    isTrainer: location?.includes("/trainer")
  })

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setFields({ ...fields, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (fields.email && fields.password) {
      // setError
      mutate()
    } else toaster("Fill in all your details", "error")

  }


  const { isLoading, mutate, isError, error } = useMutation(
    async () => {
      return await api.post("login", fields)
    },
    {
      onSuccess: (res: any) => {
        const { access_token } = res.data;
        setWithExpiry("jwtToken", access_token, 30 * 60 * 1000);
        toaster(res['message'], "success")
        setFields({
          email: "",
          password: "",
          isTrainer: false
        })

        // const lastVisitedRoute = localStorage.getItem('lastVisitedRoute');

        router.push(location?.includes("/trainer") ? ROUTE.trainerDashboard : ROUTE.dashboard)
      },
      onError: (res) => { errorHandler(res) }
    }
  );


  return (
    <div className="items-center justify-center min-h-screen h-full w-full md:flex-row bg-[#F3F4F6] ">
      <div className="max-w-lg mx-auto w-full rounded-2xl p-4 flex flex-col">
        <Link href={ROUTE.index} className="block mx-auto mb-6">
          <Image src={assets.logo} className="w-16" alt="" />
        </Link>

        <form onSubmit={handleSubmit} className="bg-white px-6 py-8 border-[#CDCDCD] border rounded-xl mb-6 md:mb-14 space-y-8">
          <div>
            <h2 className={`text-2xl lg:text-[32px] lg:leading-[44px] font-semibold text-[#101828] font-livvic tracking-tight mb-2 `}>Welcome back{fields.isTrainer && ", Trainer"}</h2>
            <p className="text-[#667085]">Login to your account</p>
          </div>
          <div className="flex flex-col gap-7">
            <FormInput>
              <label htmlFor="email">Email address</label>
              <input required type="email" name="email"
                className={isError ? "!border-red-600" : ""}
                value={fields.email} onChange={handleChange} />
            </FormInput>

            <FormInput>
              <label htmlFor="password">Password</label>

              <div className={`input-div flex items-center gap-3 ${isError ? "!border-red-600" : ""}`}>
                <input required type={isOpen ? "text" : "password"} name="password"
                  value={fields.password}
                  onChange={handleChange} autoComplete="on" />
                <div onClick={() => togglePassword(e => !e)} className="cursor-pointer text-xl text-gray-400">
                  {
                    isOpen ? <RxEyeOpen /> : <RxEyeClosed />
                  }
                </div>
              </div>
              {/* {isError && <p className="text-red-500">{error?.['response'].data.message}</p>} */}
            </FormInput>
            {/* <div className="-mt-6 text-sm text-right">
              <Link href={ROUTE.forgotPassword} className="text-primary font-medium">Retrieve password</Link>
            </div> */}
          </div>
          <div>

            {
              <button type="submit" className="mt-12 w-full" disabled={isLoading}>{
                isLoading ? <CircleLoader /> : "Continue"
              }</button>
            }
            <p className="text-center text-sm mt-1">Don&apos;t have an account? <Link href={location?.includes("/trainer") ? "/trainer/register" : ROUTE.createAccount} className="text-primary ">Sign up</Link></p>
          </div>

        </form>
      </div>
    </div>
  )
}