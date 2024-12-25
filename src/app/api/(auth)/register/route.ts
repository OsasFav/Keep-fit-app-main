import connect from "@/lib/db";
import User from "@/lib/models/user";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
// import { v4 as uuidv4 } from "uuid";
import { ObjectId } from "mongodb";
import { createResponse, generateToken, hashPassword } from "@/utils/req";
import { validatePassword } from "@/utils/reusables";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, first_name, sex, last_name, phone_number } = body;
    if (
      !email ||
      !first_name ||
      !last_name ||
      !phone_number ||
      !body.password ||
      !body.confirm_password
    ) {
      return createResponse(
        "Some field(s) are missing, input all fields",
        false,
        {},
        400
      );
    }

    // if(password !== confirm_password){
    //   return createResponse("Password and confirm password doesn't match", false, {}, 400);
    // }
    if (!validatePassword(body.password, body.confirm_password).valid) {
      return createResponse(
        validatePassword(body.password, body.confirm_password).message,
        false,
        {},
        400
      );
    }

    await connect();

    const existingUser = await User.findOne({
      email: email,
      phone_number: phone_number,
    });
    if (existingUser) {
      return createResponse("User already exist", false, {}, 400);
    }

    const { password, confirm_password, ...res } = body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      ...res,
      password: hashedPassword,
    });

    try {
      await user.save();
      const user_id = (user._id as ObjectId).toString();
      const access_token = generateToken(user_id);
      return createResponse(
        "User created successfully, Welcome to KeepFit!.",
        true,
        { access_token, ...res },
        201
      );
    } catch (error) {
      console.log(error);
      return createResponse("Error creating user", false, {}, 400);
    }
  } catch (error) {
    return createResponse("Error creating user", false, {}, 500);
  }
};
