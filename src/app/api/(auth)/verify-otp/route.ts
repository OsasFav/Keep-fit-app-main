import connect from "@/lib/db";
import OtpModel, { OtpType } from "@/lib/models/otp";
import { createResponse } from "@/utils/req";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, otp } = body;
    if (!email || !otp) {
      return createResponse(
        "Enter your email and one time password",
        false,
        {},
        400
      );
    }
    if (otp.length !== 6) {
      return createResponse("OTP must be 6 digitis", false, {}, 400);
    }
    await connect();

    // const user = (await OtpModel.findOne({ email }).lean()) as OtpType | null;
    const user: any = await OtpModel.findOne({ email }).lean();


    if (!user) {
      return createResponse("User not found", false, {}, 400);
    } else {
      const currentDate = new Date();
      if (currentDate.getTime() > Number(new Date(user.expiry))) {
        await OtpModel.deleteMany({ email });
        return createResponse("OTP Expired. Request for OTP", false, {}, 400);
      }
      if (otp !== user.code) {
        return createResponse("OTP doesn't match.", false, {}, 400);
      }
      

      return createResponse("OTP Verified", true, {}, 200);
    }
  } catch (error) {
    return createResponse("Error sending code", false, {}, 500);
  }
};
