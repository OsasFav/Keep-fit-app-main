"use client"

import EachPerson from '@/components/eachPerson'
import Skeleton from '@/components/skeleton';
import { ROUTE } from '@/lib/route';
import CircleLoader from '@/ui/btnLoader';
import { getAllTrainers, getProfile } from '@/utils/req';
import Link from 'next/link';
import React from 'react'
import { useQuery } from 'react-query';

type Props = {}
export default function Dashboard({ }: Props) {
  const { data } = useQuery("profile", getProfile);
  const { data: trainers, isSuccess, isLoading } = useQuery("trainers", () => getAllTrainers(""));

  return (
    <div>
      <div className='items-center justify-between'>
        <div>
          <h1 className='text-5xl font-bold capitalize'>Welcome, {data?.['data']?.first_name}</h1>
          <p className='text-xl font-medium mt-3'>Explore some of our trainers</p>
        </div>
        <Link href={ROUTE.history}>
          <button>See history</button>
        </Link>
      </div>

      {
        !isSuccess ?
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12'>
            {
              Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className='hover:shadow-md rounded-2xl p-2 cursor-pointer duration-500 border border-gray-100 '>
                  <div className='relative'>
                    <Skeleton className='rounded-t-xl h-52 w-full' />
                  </div>
                  <div className='px-2 pt-4 pb-2 '>
                    <div className='flex justify-between items-start gap-8'>
                      <div className='w-full'>
                        <Skeleton className='py-3 !w-full block mb-2' />
                        <Skeleton className='mb-10 w-[90%]' />
                      </div>
                      <div className=' items-center gap-1'>
                        <Skeleton className='py-2 w-16' />
                      </div>
                    </div>
                    <div className='items-center justify-between gap-8'>
                      <Skeleton className='w-32 py-1.5' />
                      <Skeleton className='w-32 py-1.5' />
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

          :

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12'>
            {
              trainers && trainers?.["data"].map((trainer, j) => <EachPerson trainer={trainer} i={j} key={j} />)
            }
          </div>
      }
    </div>
  )
}