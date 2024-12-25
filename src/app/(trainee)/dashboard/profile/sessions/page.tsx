"use client"

import Skeleton from '@/components/skeleton';
import { getAllReqs } from '@/utils/req';
import React from 'react'
import { useQuery } from 'react-query';

type Props = {}

export default function Sessions({}: Props) {
  const { data:profile, isSuccess, isLoading } = useQuery("allHistory", getAllReqs);

  const appointmentsCount = [
    { name: "Scheduled", count: profile?.['data'].counts?.scheduled },
    { name: "Accepted", count: profile?.['data'].counts?.accepted },
    { name: "Completed", count: profile?.['data'].counts?.completed },
    { name: "Cancelled", count: profile?.['data'].counts?.cancelled },
  ]
  return (
    <div>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2'>
        {
          appointmentsCount.map(counts => (
            <div key={counts.name} className='bg-[#f3f4f6] rounded-md px-4 py-2.5 border'>
              <p className='text-gray-500 mb-6'>{counts.name}</p>
              {isLoading ? <Skeleton className='w-full p-3' /> :
                <h4 className='text-2xl font-semibold'>{counts.count}</h4>}
            </div>
          ))
        }
      </div>
    </div>
  )
}