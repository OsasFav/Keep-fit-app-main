"use client"

import { FormInput } from '@/styles/styledComponents'
import toaster from '@/ui/toast';
import api from '@/utils/api';
import { errorHandler } from '@/utils/reusables';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';
import { useMutation } from 'react-query';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { ImWarning } from 'react-icons/im'
import CircleLoader from '@/ui/btnLoader';
import { usePathname } from 'next/navigation';


type Props = {}
interface Errors {
  password?: string;
  confirm_new_password?: string;
}

export default function UpdatePassword({ }: Props) {

  const location = usePathname()
  const [isOpenCurrent, setIsOpenCurrent] = useState(false)
  const [isOpenPin, setIsOpenPin] = useState(false)
  const [isOpenConfirm, setIsOpenConfirm] = useState(false)



  const validate = (values: { new_password: string, confirm_new_password: string }) => {
    const errors: Errors = {};
    if (!values.new_password) {
      errors['password'] = 'Password cannot be empty!';
    } else if (values.new_password.length < 8) {
      errors['password'] = 'Password must be 8 characters or more!';
    } else if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/i.test(values.new_password)) {
      errors['password'] = "Password must contain one digit, one lowercase letter, one uppercase letter, one special character, and no space"
    }

    if (!values.confirm_new_password) {
      errors['confirm_new_password'] = 'Confirm your password!';
    } else if (values.confirm_new_password !== values.new_password) {
      errors['confirm_new_password'] = 'Passwords do not match!';
    }

    return errors;
  }

  const formik = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    },
    validate,
    onSubmit: () => {
      ResetPassword()
    }
  })



  const { isLoading, mutate: ResetPassword } = useMutation(
    async () => {
      return await api.patch(`dashboard/profile/password`, {
        ...formik.values,
        isTrainer: location?.includes("/trainer")
      })
    },
    {
      onSuccess: (res) => {
        if (res['code'] === 200) {
          formik.resetForm()
          toaster(res['message'], "success")
        }
      },
      onError: (res) => errorHandler(res)
    }
  );

  return (
    <div >
      <h4 className='text-4xl font-semibold mb-6'>Update password</h4>
      <form className="space-y-5" onSubmit={formik.handleSubmit}>
        <div className="">
          <FormInput >
            <label className="block font-medium text-gray-500">
              Old password
            </label>
            <div className={`input-div items-center  `}>


              <input
                type={isOpenCurrent ? "text" : "password"}
                name="current_password"
                value={formik.values.current_password}
                onChange={formik.handleChange}

              />
              <div onClick={() => setIsOpenCurrent(e => !e)} className="cursor-pointer text-xl text-gray-400">
                {
                  isOpenCurrent ? <RxEyeOpen /> : <RxEyeClosed />
                }
              </div>
            </div>
          </FormInput>
          {formik.errors.current_password && typeof formik.errors.current_password === 'string' && (
            <p className='mt-2  text-xs text-[#F97066] -bottom-6 items-center gap-1.5'>
              <ImWarning /> {formik.errors.current_password}
            </p>)}
        </div>
        <div className="w-full border-y py-5 border-[#E4E7EC]">
          <FormInput className="w-full">
            <label className="block font-medium text-gray-500">
              New password
            </label>
            <div className={`input-div items-center `}>
              <input
                type={isOpenPin ? "text" : "password"}
                name="new_password"
                value={formik.values.new_password}
                onChange={formik.handleChange}
              />
              <div onClick={() => setIsOpenPin(e => !e)} className="cursor-pointer text-xl text-gray-400">
                {
                  isOpenPin ? <RxEyeOpen /> : <RxEyeClosed />
                }
              </div>
            </div>
          </FormInput>
          {formik.errors.new_password && typeof formik.errors.new_password === 'string' && (
            <p className='mt-2  text-xs text-[#F97066] -bottom-6 items-center gap-1.5'>
              <ImWarning /> {formik.errors.new_password}
            </p>)}
        </div>
        <div className="w-full">
          <FormInput className="w-full">
            <label className="block font-medium text-gray-500">
              Confirm password
            </label>
            <div className={`input-div items-center `}>
              <input
                type={isOpenConfirm ? "text" : "password"}
                name="confirm_new_password"
                value={formik.values.confirm_new_password}
                onChange={formik.handleChange}
              />
              <div onClick={() => setIsOpenConfirm(e => !e)} className="cursor-pointer text-xl text-gray-400">
                {
                  isOpenConfirm ? <RxEyeOpen /> : <RxEyeClosed />
                }
              </div>
            </div>
          </FormInput>
          {formik.errors.confirm_new_password && typeof formik.errors.confirm_new_password === 'string' && (
            <p className='mt-2  text-xs text-[#F97066] -bottom-6 items-center gap-1.5'>
              <ImWarning /> {formik.errors.confirm_new_password}
            </p>)}
        </div>

        <button type="submit" className="mt-12 w-full max-w-64" >{
          isLoading ? <CircleLoader /> : "Update password"
        }</button>
      </form>
    </div>
  )
}