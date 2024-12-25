"use client"

import GoBack from '@/components/backBtn'
import { FormInput } from '@/styles/styledComponents'
import { FormEvent, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { getInitials } from '@/utils/reusables'
import toaster from '@/ui/toast'
import api from '@/utils/api'
import CircleLoader from '@/ui/btnLoader'
import { getProfile } from '@/utils/req'
import { usePathname } from 'next/navigation'

type Props = {}

export default function Profile({ }: Props) {
  const location = usePathname()
  // if(location){
  //   const { data, isSuccess, isLoading, refetch } = useQuery("profile", getProfile);
  // }
  // location ?
  // const { data, isSuccess, isLoading, refetch } = useQuery("profile", getProfile);
  const { data, isSuccess, isLoading, refetch } = useQuery("profile", () =>getProfile(location));

  const [fields, setFields] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    // sex: ""
  })
  useEffect(() => {
    if (isSuccess) {
      const { first_name, last_name, email, phone_number } = data?.data
      setFields({
        first_name, last_name, email, phone_number
      })
    }
  }, [data, isSuccess])

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { first_name, last_name } = fields
    if (!first_name || !last_name) {
      toaster("First name and Last name cannot be empty", "error")
    }
    else mutate()
  }

  const { isLoading: isUpdateLoading, mutate } = useMutation(
    async () => {
      return await api.put(location?.includes("trainer") ? "trainer/dashboard/profile" : "dashboard/profile", fields);
    }, {
    onSuccess: (res: any) => {
      if (res.status === "success") {
        refetch()
        toaster(res.message, "success")
      }
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
    <div className=' space-y-6'>
      <h4 className='text-4xl font-semibold '>Personal Information</h4>
      <div className='items-center gap-2'>
        <div className='bg-primary h-10 w-10 items-center justify-center text-lg text-white font-semibold rounded-full'>{getInitials(`${data?.['data']?.first_name} ${data?.['data']?.last_name}`)}</div>

        <div>
          <p className='text-xl font-semibold'>{`${data?.['data']?.first_name ?? ""} ${data?.['data']?.last_name ?? ""}`}</p>
          <p className='text-sm capitalize'>{data?.['data']?.type}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="my-6 space-y-6">
        <div className='grid gap-6 grid-cols-1 md:grid-cols-2'>

          <FormInput>
            <label htmlFor="">First name</label>
            <input type="text" required name='first_name' value={fields?.first_name} onChange={handleChange} />
          </FormInput>

          <FormInput>
            <label htmlFor="">Last name</label>
            <input type="text" required name='last_name' value={fields?.last_name} onChange={handleChange} />
          </FormInput>
        </div>
        {/* <FormInput>
          <label htmlFor="">Sex</label>
          <input type="text" disabled className='capitalize' name='sex' value={fields.sex} onChange={handleChange} />
        </FormInput> */}
        <FormInput>
          <label htmlFor="">Email</label>
          <input type="email" required name='email' value={fields.email} onChange={handleChange} />
        </FormInput>
        <FormInput>
          <label htmlFor="">Phone number</label>
          <input type="tel" required name='phone_number' value={fields.phone_number} onChange={handleChange} />
        </FormInput>

        <button type='submit' className='w-full max-w-64' disabled={isLoading || isUpdateLoading}>
          {isLoading|| isUpdateLoading ? <CircleLoader /> : "Save changes"}
        </button>
      </form>
    </div>
  )
}