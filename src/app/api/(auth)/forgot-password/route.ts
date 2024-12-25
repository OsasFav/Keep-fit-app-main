// import sendEmail from "@/helpers/sendmail";
import connect from "@/lib/db";
import OtpModel from "@/lib/models/otp";
import User, { UserType } from "@/lib/models/user";
import {  createResponse } from "@/utils/req";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email } = body;
    if (!email) {
      return createResponse("Enter your email", false, {}, 400);
    }
    await connect();

    const user: UserType | null = await User.findOne({ email }).lean();
    if (!user) {
      return createResponse("User not found", false, {}, 400);
    } else {
      // Generate otp
      // Send otp to mail
      // Save otp and user_id to db
      const otp = Math.floor(100000 + Math.random() * 900000);

      const currentDate = new Date();
      currentDate.setMinutes(currentDate.getMinutes() + 5);
      const date = currentDate.toDateString();
      const time = currentDate.toTimeString();
      await OtpModel.create({  code: otp, email, expiry: currentDate.toISOString()  })
      const successText = `Hello ${user?.first_name},

    This is your OTP: ${otp}
    
    Expiry: ${date + ", " + time}.
    
    Should you have any questions or concerns regarding this login activity, please contact our support team or send a mail support@keepfit.com for further assistance.
    
    Best regards,
    KeepFit Booking.
      `;
      // await sendEmail({
      //   to: user.email,
      //   subject: "Reset Password",
      //   text: successText,
      //   html: "",
      // });
      return createResponse("Message sent to mail", true, {user_id: user?._id}, 200);
    }
  } catch (error) {
    console.log(error)
    return createResponse("Error sending code", false, {}, 500);
  }
};
