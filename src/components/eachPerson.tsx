/* eslint-disable @next/next/no-img-element */
import assets from '@/assets'
import Image from 'next/image'
import React from 'react'
import { IoMdStar } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";
import Link from 'next/link';

export interface Trainer {
  first_name: string
  last_name: string
  location: string
  rating: string
  pricing: string
  total: string
  email: string
  training_type: string[]
  image: string
  sex: string
  _id: string
  phone_number: string
}
type Props = {
  trainer: Trainer;
  i: number
}

export default function EachPerson({ trainer, i }: Props) {

  return (
    <Link href={`/dashboard/trainer/${trainer?._id}`} className='hover:shadow-md rounded-2xl p-2 cursor-pointer duration-500 border border-gray-100'>
      <div className='relative'>
        <img className='rounded-t-xl h-52 object-cover w-full' src={`https://xsgames.co/randomusers/assets/avatars/male/${i}.jpg`} alt={`${trainer?.first_name} ${trainer?.last_name}`} />
      </div>
      <div className='px-2 pt-4 pb-2 '>
        <div className='flex justify-between items-start'>
          <div className=''>
            <h4 className='text-xl font-semibold'>{`${trainer?.first_name} ${trainer?.last_name}`}</h4>
            <p className='text-gray-600 text-sm mb-6'>{trainer?.location}.</p>
          </div>
          <div className=' items-center gap-1'>
            <span className='items-center font-medium text-[15px]'>{trainer?.rating} <IoMdStar size={16} className='text-yellow-400' /></span>
            <span className='text-xs'>({trainer?.total})</span>
          </div>
        </div>
        <div className='items-center justify-between'>
          <small className='uppercase text-primary font-medium text-xs items-center gap-1'>
            {/* {
     trainer?.training_type.map((type) => (
        <span key={type}>{type}</span>
      ))
  } */}
            { trainer?.training_type[0]}  <span className='text-base font-semibold'> {trainer?.training_type.length > 1 && `+ ${trainer?.training_type.length - 1}`}</span>
          </small>
          <span className='items-center gap-1 text-sm'>Book appointment <FaArrowRight /></span>
        </div>
      </div>
    </Link>
  )
}