"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ROUTE } from '@/lib/route'
import { fitnessTrainingTypes, validatePassword } from '@/utils/reusables'
import api from '@/utils/api'
import { useMutation } from 'react-query'
import { setWithExpiry } from '@/utils/req'
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import toaster from '@/ui/toast'
import { FormInput } from '@/styles/styledComponents'
import CircleLoader from '@/ui/btnLoader'
import assets from '@/assets'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Trainer } from '@/components/eachPerson'

const animatedComponents = makeAnimated();
interface Option {
  value: string;
  label: string;
}

export interface TrainerTypes {
  first_name: string
  last_name: string
  location: string
  email: string
  training_type: string | string[]
  pricing: string
  // sex: string
  phone_number: string
  type: string,
  password: string, 
  confirm_password: string
}


export default function Signup() {

  const router = useRouter()
  const location = usePathname()
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [isTrainer, setIsTrainer] = useState("trainee")
  const [fields, setFields] = useState<TrainerTypes>({
    email: "", phone_number: "", type: isTrainer,pricing: "",
    location: "", training_type: [], first_name: "", last_name: "", password: "", confirm_password: ""
  })
  const [isOpenPassword, toggleIsOpenPassword] = useState(false)
  const [isOpenConfirmPassword, toggleIsOpenConfirmPassword] = useState(false)
  const [isPassword, setIsPassword] = useState("")

  useEffect(() => {
    if (location) {
      if (location === "/trainer/register") {
        setIsTrainer("trainer")
        setFields({ ...fields, type: "trainer" })
      }
      else {
        setIsTrainer("trainee")
        setFields({ ...fields, type: "trainee" })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])



  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFields({ ...fields, [name]: value })
  }


  const handleSubmit = (e: any) => {
    e.preventDefault()
    setIsPassword("")
    if (fields) {
      const { email, first_name, last_name, password, confirm_password } = fields
      if (!email || !first_name || !last_name || !password || !confirm_password) {
        toaster("Kindly fill in all field(s)", "error")
      }
      else if (!validatePassword(password, confirm_password).valid) {
        setIsPassword(validatePassword(password, confirm_password).message)
        toaster(validatePassword(password, confirm_password).message, "error")
      }
      else {
        if (isTrainer === "trainer") {
          setFields({
            ...fields,
            training_type: selectedOptions.map((type: Option) => type?.value)
          })
        }
        setTimeout(() => {
          mutate()
        }, 500);
      }
    }

  }

  const { isLoading, mutate } = useMutation(async () => {
    return await api.post(location ?? "/register", fields);
  }, {
    onSuccess: (res: any) => {
      if (res.status === "success") {
        toaster(res.message, "success")
        // setWithExpiry("jwtToken", res.data.access_token, 30 * 60 * 1000);
        if (isTrainer === "trainee") {
          router.push(ROUTE.login)
        }
        else {
          router.push(ROUTE.trainerLogin)
        }
      } else {
        toaster(res.message || "Something went wrong, please try again.", "error");
      }
    },
    onError: (error: any) => {
      const err = error.response;
      toaster(err?.data?.message || "Something went wrong, please try again.", "error");
    },
  });


  const handleSelectChange = (selected) => {
    if (selected.length <= 4) {
      setSelectedOptions(selected);
    } else {
      toaster("You can only select up to 4 options", "error");
    }
  };

  return (
    <div className="items-center justify-center min-h-dvh  h-full w-full md:flex-row bg-[#F3F4F6]  ">
      <div className="max-w-xl mx-auto w-full rounded-2xl px-4 flex flex-col py-12 md:py-4">
        <Link href={ROUTE.index} className="block mx-auto mb-6">
          <Image src={assets.logo} className="w-12 md:w-16" alt="" />
        </Link>
        <form onSubmit={handleSubmit} className="bg-white px-4 lg:px-6 py-8 border-[#CDCDCD] border rounded-xl mb-6 md:mb-14 space-y-8" >
          <div>
            <h2 className={`text-2xl lg:text-[32px] lg:leading-[44px] font-semibold text-[#101828] font-livvic tracking-tight mb-2`}>Sign Up</h2>
            <p className="text-sm lg:text-base text-[#667085]">Let’s get you started</p>
          </div>

          <div className='space-y-6'>
            <div className='space-y-4'>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput>
                  <label htmlFor="">First Name</label>
                  <input type="text" name='first_name' value={fields?.first_name} onChange={handleChange} required />
                </FormInput>
                <FormInput>
                  <label htmlFor="">Last Name</label>
                  <input type="text" name='last_name' value={fields?.last_name} onChange={handleChange} required />
                </FormInput>
              </div>

              <FormInput>
                <label htmlFor="">Email</label>
                <input type="email" name='email' value={fields?.email} onChange={handleChange} required />
              </FormInput>
              <FormInput>
                <label htmlFor="">Phone number</label>
                <input type="tel" name='phone_number' value={fields?.phone_number} onChange={handleChange} required />
              </FormInput>
              {
                isTrainer === "trainer" &&
                <>

                  <FormInput>
                    <label htmlFor="">Training type</label>

                    <Select
                      value={selectedOptions}
                      onChange={handleSelectChange}

                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      options={fitnessTrainingTypes.map(option => ({ value: option, label: option }))}
                    />
                  </FormInput>
                  <FormInput className=''>
                    <label htmlFor="">Pricing per hour</label>
                    <div className="input-div items-center gap-3">
<span className='opacity-75'>&euro;</span>
                    <input type="number" name='pricing' value={fields?.pricing} onChange={handleChange} required />
                    </div>
                  </FormInput>
                </>
              }
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput>
                  <label htmlFor="">Password</label>
                  <div className={`input-div items-center  ${isPassword ? "!border-red-600" : ""}`}>
                    <input type={isOpenPassword ? "text" : "password"} name='password' value={fields?.password} onChange={handleChange} required />
                    <div onClick={() => toggleIsOpenPassword(e => !e)} className="cursor-pointer text-xl text-gray-400">
                      {
                        isOpenPassword ? <RxEyeOpen /> : <RxEyeClosed />
                      }
                    </div>
                  </div>
                </FormInput>
                <FormInput>
                  <label htmlFor="">Confirm Password</label>
                  <div className={`input-div items-center  ${isPassword ? "!border-red-600" : ""}`}>
                    <input type={isOpenConfirmPassword ? "text" : "password"} name='confirm_password' value={fields?.confirm_password} onChange={handleChange} required />
                    <div onClick={() => toggleIsOpenConfirmPassword(e => !e)} className="cursor-pointer text-xl text-gray-400">
                      {
                        isOpenConfirmPassword ? <RxEyeOpen /> : <RxEyeClosed />
                      }
                    </div>
                  </div>
                  <span className="text-[14px] text-red-700">{isPassword ?? null}</span>

                </FormInput>
              </div>
            </div>

            <div className='space-y-1'>
              <button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <CircleLoader /> : "Submit"}
              </button>
              <Link href={location?.includes("/trainer") ? "/trainer/login" : ROUTE.login} className=' text-sm block text-center text-[#667085] font-normal'>Already have an account? {" "}
                <span className=' text-primary font-medium'>Sign In</span> </Link>
            </div>

          </div>




        </form>
      </div>
    </div>
  )
}