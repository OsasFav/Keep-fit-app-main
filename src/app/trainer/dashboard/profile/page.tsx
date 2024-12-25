import ProfileLayout from '@/app/(trainee)/dashboard/profile/layout'
import Profile from '@/app/(trainee)/dashboard/profile/page'
import React from 'react'

type Props = {}

export default function TrainerProfile({}: Props) {
  return (
    <ProfileLayout><Profile /></ProfileLayout>
  )
}