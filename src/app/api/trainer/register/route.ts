import connect from "@/lib/db";
import Trainer from "@/lib/models/trainer";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { createResponse, generateToken } from "@/utils/req";
import { validatePassword } from "@/utils/reusables";

async function generateSingleRating() {
  const rating = (Math.random() * 4 + 1).toFixed(2);
  const total = Math.round(Math.random() * 1000 + 1);
  return { rating, total };
}

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, first_name,pricing, last_name, phone_number, training_type } = body;

    // Check if any required fields are missing
    if (
      !email ||
      !first_name ||
      !last_name ||
      !phone_number ||
      !body.password ||
      !body.confirm_password ||
      training_type.length === 0
    ) {
      return createResponse(
        "Some field(s) are missing, input all fields",
        false,
        {},
        400
      );
    }

    // Validate the password
    const passwordValidation = validatePassword(body.password, body.confirm_password);
    if (!passwordValidation.valid) {
      return createResponse(passwordValidation.message, false, {}, 400);
    }

    await connect();

    // Check if a user with the same email or phone number exists
    const existingUser = await Trainer.findOne({
      $or: [{ email }, { phone_number }],
    });

    // Return error if email already exists
    if (existingUser) {
      if (existingUser.email === email) {
        return createResponse("Email already exists", false, {}, 400);
      }
      if (existingUser.phone_number === phone_number) {
        return createResponse("Phone number already exists", false, {}, 400);
      }
    }

    const { password, confirm_password, ...res } = body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a random rating for the trainer
    const { rating, total } = await generateSingleRating();

    // Create new user
    const user = new Trainer({
      ...res,
      rating,
      pricing,
      total,
      password: hashedPassword,
    });

    try {
      await user.save();
      const user_id = (user._id as ObjectId).toString();
      const access_token = await generateToken(user_id);

      return createResponse(
        "User created successfully, Welcome to KeepFit!.",
        true,
        { access_token, ...res },
        201
      );
    } catch (error) {
      console.error("Error saving user:", error);
      return createResponse("Error creating user", false, {}, 400);
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return createResponse("Error creating user", false, {}, 500);
  }
};
