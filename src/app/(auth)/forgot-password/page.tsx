"use client"

import { ROUTE } from '@/lib/route'
import { FormInput } from '@/styles/styledComponents'
import CircleLoader from '@/ui/btnLoader'
import toaster from '@/ui/toast'
import api, { auth } from '@/utils/api'
import Link from 'next/link'
import React, { useState } from 'react'
import { HiArrowLeft } from 'react-icons/hi2'
import { LuKey, LuMail } from "react-icons/lu";
import { useMutation } from 'react-query'


type Props = {}

export default function ForgotPassword({ }: Props) {
  const [step, setStep] = useState(1)
  const [value, setValue] = useState("")
  const handleSubmit = (e: any) => {
    e.preventDefault()
    if(value) mutate()
  }

  const { isLoading, mutate, isError, error } = useMutation(async () => {
    return await api.post(auth("forgot-password"), { email: value });
  }, {
    onSuccess: (res: any) => {
      if (res.success) { setStep(2);  toaster(res.message, "success") }
      else {
        toaster(res.message || "Something went wrong, please try again.", "error");
      }
    },
    onError: (error: any) => {
      const err = error.response;
      toaster(err.data.message || "Something went wrong, please try again.", "error");
    },
  });

  return (
    <div className='max-w-[400px] mx-auto px-5 space-y-8 py-24'>
      <div className='items-center justify-center flex-col gap-3'>
        <div className='w-14 h-14 border-[#F5F5FF] border-[10px] rounded-full bg-[#F3F4F6] grid place-items-center mb-3'>
          {step === 1 ? <LuKey color='#D1563B' size={24} /> : <LuMail color='#D1563B' size={24} />}
        </div>
        <h3 className='text-[#101828] font-semibold text-3xl'>{step === 1 ? "Forgot password?" : "Check your email"}</h3>
        {
          <p className='text-[#667085] text-center'>{step === 1 ? "No worries, we’ll send you reset instructions." : <>We sent a password reset link to <span className='font-medium'>{value}</span></>} </p>
        }
      </div>
      {
        step === 1 &&
        <form onSubmit={handleSubmit} className='space-y-6'>
          <FormInput>
            <label htmlFor="">Email</label>
            <input type="email"  required
              value={value} onChange={e => setValue(e.target.value)} />
          </FormInput>
          <button type='submit' className='w-full' disabled={isLoading}>
          {isLoading ? <CircleLoader /> : "Reset password"}

           </button>
        </form>
      }
      {
        step !== 1 &&
        <a href= "mailto: name@email.com">
        <button type='button' className='w-full'>
          
          Open email app</button>
        </a>
      }
      {
        step !== 1 &&
        <p className='text-sm text-[#667085] text-center'>Didn’t receive the email? <span className='text-primary cursor-pointer' onClick={() => mutate()}>Click to resend</span></p>
      }

      <Link href={ROUTE.login} className='text-sm cursor-pointer items-center justify-center gap-2 text-[#667085]'>
        <HiArrowLeft size={18} fill='#667085' />
        Back to log in
      </Link>

      <p></p>

    </div>
  )
}