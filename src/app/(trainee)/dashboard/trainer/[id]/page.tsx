/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client"

import assets from "@/assets"
import GoBack from "@/components/backBtn"
import { FormInput } from "@/styles/styledComponents"
import Image from "next/image"
import React, { useEffect, useMemo, useState } from "react"
import DatePicker from "react-datepicker"
// import { setHours, setMinutes } from 'react-datepicker/dist/date_utils'
import { setMinutes, setHours } from "date-fns"

import "react-datepicker/dist/react-datepicker.css"
import { fitnessTrainingTypes } from "@/utils/reusables"
import CircleLoader from "@/ui/btnLoader"
import { useParams } from "next/navigation"
import { Trainer } from "@/components/eachPerson"
import { useMutation, useQuery } from "react-query"
import { getAllTrainers } from "@/utils/req"
import api from "@/utils/api"
import toaster from "@/ui/toast"
import { policies } from "@/data/policies"

type Props = {}

export default function EachTrainer({}: Props) {
  const [fields, setFields] = useState({
    num_of_participants: "",
    training_type: "",
    address: "",
    scheduled_date: "",
    booking_hours: "",
    message: "",
    trainer_id: "",
  })
  const params = useParams()
  const {
    data,
    isSuccess,
    isLoading: isEachFetching,
  } = useQuery(["trainers", params?.id], () => getAllTrainers(params?.id))
  const [trainer, setTrainer] = useState<Trainer>({
    first_name: "",
    _id: "",
    last_name: "",
    location: "",
    rating: "",
    total: "",
    pricing: "",
    training_type: [],
    image: "",
    phone_number: "",
    sex: "",
    email: "",
  })
  // const [timestamps, setTimestamps] = useState(["2024-07-14T10:00:00.000Z"])
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFields({ ...fields, [name]: value })
  }
  const [startDate, setStartDate] = useState<Date | null>(
    setHours(setMinutes(new Date(), 0), new Date().getHours() + 2)
  )

  // Convert timestamps to Date objects
  // const unavailableTimes = timestamps.map((timestamp) => new Date(timestamp));

  const filterTime = (time) => {
    const currentDate = new Date()
    const threeHoursAhead = new Date(currentDate.getTime() + 1 * 60 * 60 * 1000)

    const hours = time.getHours()
    const minutes = time.getMinutes()

    // Check if the time is within the allowed range
    const isWithinTimeRange = hours >= 6 && hours < 21

    // Check if the time is at least 3 hours ahead of the current time
    const isAtLeastThreeHoursAhead = time.getTime() >= threeHoursAhead.getTime()

    // Check if the time is not in the list of unavailable times
    // const isTimeAvailable = !unavailableTimes.some((unavailableTime) => {
    //   return (
    //     time.getFullYear() === unavailableTime.getFullYear() &&
    //     time.getMonth() === unavailableTime.getMonth() &&
    //     time.getDate() === unavailableTime.getDate() &&
    //     hours === unavailableTime.getHours() &&
    //     minutes === unavailableTime.getMinutes()
    //   );
    // });

    return isWithinTimeRange && isAtLeastThreeHoursAhead
  }

  const isDateInFuture = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today
  }

  useEffect(() => {
    if (isSuccess) {
      setTrainer(data?.data)
      console.log(data?.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const trainerId = Array.isArray(params?.id)
    ? params.id.join("")
    : params?.id ?? ""

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setFields({
      ...fields,
      scheduled_date:
        startDate instanceof Date ? startDate.toISOString() : startDate || "", // Convert Date to string or set to empty string if null
      // scheduled_date: startDate || "", // Keep startDate as is if it's a Date, or set to empty string if null
      trainer_id: trainerId,
    })
    setTimeout(() => {
      mutate()
    }, 500)
  }

  const { isLoading, mutate, isError, error } = useMutation(
    async () => {
      return await api.post("trainer/dashboard/appointments/book", fields)
    },
    {
      onSuccess: (res: any) => {
        if (res.status === "success") {
          setFields({
            ...fields,
            num_of_participants: "",
            training_type: "",
            address: "",
            scheduled_date: "",
            message: "",
            trainer_id: "",
          })
          toaster(res.message, "success")
        } else {
          toaster(
            res.message || "Something went wrong, please try again.",
            "error"
          )
        }
      },
      onError: (error: any) => {
        const err = error.response
        toaster(
          err.data.message || "Something went wrong, please try again.",
          "error"
        )
      },
    }
  )

  const randomCancellationValue = useMemo(
    () => getValue(policies.cancellation),
    [policies.cancellation]
  )
  const randomHealthValue = useMemo(
    () => getValue(policies.health),
    [policies.health]
  )
  const randomEquipmentValue = useMemo(
    () => getValue(policies.equipment),
    [policies.equipment]
  )

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])
  function getValue(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
  }

  return (
    <div>
      <GoBack />
      <div className="space-y-2 mb-6">
        <h2 className="text-4xl font-semibold">{`${trainer?.first_name} ${trainer?.last_name}`}</h2>
        <p className="text-gray-600 text-xl">
          Pricing per hour:{" "}
          <b className="text-black"> &euro; {trainer?.pricing}</b>
        </p>
        <small className="uppercase text-primary font-medium items-center gap-5 flex-wrap">
          {trainer?.training_type.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </small>
      </div>
      <div className="flex gap-6">
        <div className="relative w-1/3">
          <h5 className="text-2xl font-semibold mb-6">Policies</h5>
          {isMounted && (
            <ol className="list-disc space-y-2 leading-7 pl-5">
              <span className="font-semibold block text-lg">Cancellation</span>
              <li className="ml-4">{randomCancellationValue || ""}</li>
              <span className="font-semibold block text-lg !mt-4">
                Group policy
              </span>
              <li className="ml-4">
                Extra charges apply for group of 3 trainees and more.
              </li>
              <span className="font-semibold block text-lg !mt-4">Health</span>
              <li className="ml-4">{randomHealthValue || ""}</li>
              <span className="font-semibold block text-lg !mt-4">
                Special Request
              </span>
              <li className="ml-4">
                Any special request (e.g change time, add extra time, etc) is
                subject to availability.
              </li>
              <span className="font-semibold block text-lg !mt-4">
                Equipnment
              </span>
              <li className="ml-4">{randomEquipmentValue || ""}</li>
            </ol>
          )}

          {/* <img className='rounded h-96 object-cover' src={`https://xsgames.co/randomusers/assets/avatars/${trainer?.sex}/${(params?.id)}.jpg`} alt="each trainer" /> */}
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-2/3 flex flex-col justify-between items-start"
        >
          <div className="space-y-6 w-full  max-w-lg">
            <h5 className="text-2xl font-semibold mb-6">Book a session</h5>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              <FormInput>
                <label htmlFor="">Number of participants</label>
                <input
                  type="text"
                  name="num_of_participants"
                  value={fields?.num_of_participants}
                  onChange={handleChange}
                  required
                />
              </FormInput>
              <FormInput>
                <label htmlFor="">Training type</label>
                <select
                  name="training_type"
                  value={fields?.training_type}
                  onChange={handleChange}
                  required
                >
                  <option value="" hidden>
                    {" "}
                    -- Please select --
                  </option>
                  {/* {fitnessTrainingTypes.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))} */}
                  {trainer?.training_type.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </FormInput>
            </div>
            <FormInput>
              <label htmlFor="">Address</label>
              <input
                type="text"
                name="address"
                value={fields?.address}
                onChange={handleChange}
                required
              />
            </FormInput>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              <FormInput>
                <label htmlFor="">Schedule date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  minDate={new Date()}
                  filterDate={isDateInFuture}
                  filterTime={filterTime}
                  dateFormat="Pp"
                />
              </FormInput>
              <FormInput>
                <label htmlFor="">Number of Hours</label>
                <input
                  type="number"
                  name="booking_hours"
                  value={fields?.booking_hours}
                  onChange={handleChange}
                  required
                />
                {fields?.booking_hours && (
                  <span className="text-sm mt-1 pl-3">
                    Total amount:{" "}
                    <b>
                      {Number(fields?.booking_hours || 8) *
                        Number(trainer.pricing)}{" "}
                      euros
                    </b>
                  </span>
                )}
              </FormInput>
            </div>

            <FormInput>
              <label htmlFor="">Additional message</label>
              <textarea
                name="message"
                value={fields?.message}
                onChange={handleChange}
                required
                rows={6}
              ></textarea>
            </FormInput>
          </div>

          <button
            type="submit"
            className="w-full max-w-64 mt-12"
            disabled={isLoading || isEachFetching}
          >
            {isLoading || isEachFetching ? (
              <CircleLoader />
            ) : (
              "Book an Appointment"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
