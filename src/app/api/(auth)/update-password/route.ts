import connect from "@/lib/db";
import OtpModel, { OtpType } from "@/lib/models/otp";
import User from "@/lib/models/user";
import { createResponse, hashPassword } from "@/utils/req";
import { validatePassword } from "@/utils/reusables";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

export const PATCH = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { password, confirm_password, user_id } = body;
    if (!password || !confirm_password) {
      return createResponse(
        "Enter your password and confirm password",
        false, {},  400
      );
    }
    if (!validatePassword(body.password, body.confirm_password).valid) {
      return createResponse(
        validatePassword(body.password, body.confirm_password).message,
        false,
        {},
        400
      );
    }
    await connect();

    if(!Types.ObjectId.isValid(user_id)){
      return createResponse("Invalid User ID", false, {}, 400);
    }

    await User.findOneAndUpdate(
      { _id: new ObjectId(user_id) },
      {password: await hashPassword(password)} ,
    );
    return createResponse("Password has been updated successfully", true, {}, 200);

  } catch (error) {
    console.log(error)
    return createResponse("Error sending code", false, {}, 500);
  }
};
