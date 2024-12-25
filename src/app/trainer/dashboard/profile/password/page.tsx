import ProfileLayout from '@/app/(trainee)/dashboard/profile/layout'
import UpdatePassword from '@/app/(trainee)/dashboard/profile/password/page'
import React from 'react'

type Props = {}

export default function ChangePassword({}: Props) {
  return (
    <ProfileLayout><UpdatePassword /></ProfileLayout>
  )
}