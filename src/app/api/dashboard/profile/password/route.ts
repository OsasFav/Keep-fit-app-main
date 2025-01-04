import connect from "@/lib/db";
import User, { UserType } from "@/lib/models/user";
import { comparePasswords, createResponse, hashPassword } from "@/utils/req";
import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import { validatePassword } from "@/utils/reusables";
import { Types } from "mongoose";
import Trainer from "@/lib/models/trainer";

export const PATCH = async (req: NextRequest) => {
  try {
    const body = await req.json();
    await connect();

    const decodedTokenHeader = req.headers.get("x-decoded-token");
    if (!decodedTokenHeader) {
      return createResponse("Unauthorized", false, {}, 401);
    }

    const decodedToken = JSON.parse(decodedTokenHeader);
    const userId = decodedToken.userId;

    const { current_password, confirm_new_password, new_password } = body;
    if (!current_password || !confirm_new_password || !new_password) {
      return createResponse(
        "Enter your password and confirm password",
        false,
        {},
        400
      );
    }
    if (!validatePassword(body.new_password, body.confirm_new_password).valid) {
      return createResponse(
        validatePassword(body.new_password, body.confirm_new_password).message,
        false,
        {},
        400
      );
    }

    if (!Types.ObjectId.isValid(userId)) {
      return createResponse("Invalid User ID", false, {}, 400);
    }
    var user;
    if (body.isTrainer) {
      user = await Trainer.findOne({ _id: new ObjectId(userId) });
    } else user = await User.findOne({ _id: new ObjectId(userId) });
    // console.log(user, current_password, user?.password);
    const isPasswordValid = await comparePasswords(
      current_password,
      user?.password
    );
    if (!isPasswordValid) {
      return createResponse(
        "Incorrect password, check and try again",
        false,
        {},
        400
      );
    } else {
    if (body.isTrainer) {
      await Trainer.updateMany(
        { _id: new ObjectId(userId) },
        { password: await hashPassword(new_password) }
      );
    }
    else await User.updateMany(
      { _id: new ObjectId(userId) },
      { password: await hashPassword(new_password) }
    );
  
      return createResponse(
        "Password has been updated successfully",
        true,
        {},
        200
      );
    }
  } catch (error) {
    return createResponse("Error updating user", false, {}, 500);
  }
};
