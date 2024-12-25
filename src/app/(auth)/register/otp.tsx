import React, { FormEvent, useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { useMutation } from 'react-query';
import api, { auth } from '@/utils/api';
import { errorHandler } from '@/utils/reusables';
import { ROUTE } from '@/lib/route';
import { useRouter } from 'next/navigation';
import toaster from '@/ui/toast';
import CircleLoader from '@/ui/btnLoader';



export default function OTPRegister() {

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(59);
  const [otp, setOtp] = useState("")
  const [error, setError] = useState(false)
  // const [errMsg, setErrMsg] = useState("")
  const email = sessionStorage.getItem("email")
  const router = useRouter()

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          clearInterval(intervalId);
        }
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [minutes, seconds]);

  const handleChange = (e: any) => {
    setOtp(e);
    setError(false)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault()
    if (otp === "") {
      toaster("OTP field cannot be empty", "error");
    }
    else if (otp.length !== 6) {
      toaster("OTP must be 6 digits", "error")
    }
    else {
      verifyOTP()
    }
  }

  useEffect(() => {
    if (otp.length === 6) {
      verifyOTP()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp])



  const { isLoading, mutate: verifyOTP } = useMutation(
    async () => {
      return await api.post("verify-otp", {
        email, otp,
      })
    },
    {
      onSuccess: (res: any) => {
        // const onboarding_status = sessionStorage.getItem("onboarding_status")

        if (res.message == "Phone number verified successfully") {
          // setStep(step + 1)

          // loginSuccess(onboarding_status)
          toaster("Registration Successful", "success")
          router.push(ROUTE.dashboard);


          // const lastVisitedRoute = localStorage.getItem('lastVisitedRoute');

          // if (onboarding_status == "Pending") {
          //   navigate(ROUTE.createAccountBVN);
          // } 
        }
        else {
          toaster(res.message, "success")
        }
      },
      onError: (error) => {
        // const err = error.response;
        errorHandler(error)
        // toaster(err.data.message || "Something went wrong, please try again.", "error");

      }
    }
  );


  const { isLoading: isResendLoading, mutate: Resend } = useMutation(
    async () => {
      return await api.post(auth("send-otp"), { email })
    },
    {
      onSuccess: (res: any) => {
        if (res.message === "OTP sent successfully") {
          setMinutes(3)
          setSeconds(59)
          toaster("A One Time Password has been resent to the provided phone number.", "success")
        }
      },
      onError: (res: any) => {
        const err = res.response.data;
        toaster(err.message || "Something went wrong, please try again.", "error");
      }
    }
  );

  return (
    <form onSubmit={handleSubmit} className="">
      <h2 className={`text-2xl lg:text-[32px] lg:leading-[44px] font-semibold text-[#101828] font-livvic tracking-tight mb-3`}>Please check your phone</h2>
      <p className="text-sm leading-5 mb-8 text-[#667085]">We&apos;ve sent a code to <span className='text-[#1F2937] font-semibold'>{email ?? ""}</span></p>

      <div className='space-y-6'>
        <div>
          <div className='mb-4 space-y-4'>
            <OTPInput
              value={otp}
              onChange={handleChange}
              numInputs={6}
              inputStyle={"border border-[0.88px] p-[7px] rounded-md block text-[#001F3F] text-[42px] leading-[52.5px] tracking-tight shadow-sm !w-12 lg:!w-14 h-12 lg:h-14"}
              containerStyle={"grid gap-2"}
              renderInput={(props) => <input {...props} />}
            />
          </div>
          <p className='text-[#667085] text-center text-sm'>


            {minutes === 0 && seconds === 0
              ? <span className='inline-flex items-center font-bold ml-2 text-primary cursor-pointer hover:opacity-50' onClick={() => Resend()}>            Didn&apos;t get a code? <span className='border-b text-[#1F2937] border-[#1F2937]'>Click to resend.</span></span>
              : <span className='font-bold ml-2 text-primary'> {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
            }
          </p>
        </div>
        <div>

          <button disabled={isResendLoading || isLoading} type="submit" className="w-full mb-3">
            {isLoading || isResendLoading ? <CircleLoader /> : "Verify"}
          </button>
          <button type='button' className='outlined border !border-[#D0D5DD] !text-[#344054] w-full'>
            Cancel
          </button>
        </div>
      </div>

    </form>
  )
}