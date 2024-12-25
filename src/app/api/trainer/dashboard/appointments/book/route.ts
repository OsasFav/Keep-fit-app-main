import connect from "@/lib/db";
import User from "@/lib/models/user";
import { createResponse } from "@/utils/req";
import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import Trainer from "@/lib/models/trainer";
import Appointment from "@/lib/models/appointment";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    await connect();

    const decodedTokenHeader = req.headers.get("x-decoded-token");
    if (!decodedTokenHeader) {
      return createResponse("Unauthorized", false, {}, 401);
    }

    const decodedToken = JSON.parse(decodedTokenHeader);
    const userId = decodedToken.userId;

    const user = await User.findOne({ _id: new ObjectId(userId) });
    const trainer = await Trainer.findOne({
      _id: new ObjectId(body.trainer_id),
    });

    if (!user) {
      return createResponse("User not found", false, {}, 404);
    }

    const result = new Appointment({
      ...body,
      order_id: Math.floor(100000 + Math.random() * 900000),
      status: "scheduled",
      user_id: new ObjectId(userId),
      first_name: user?.first_name,
      last_name: user?.last_name,
      phone_number: user?.phone_number,
      trainer: {
        // id: body.trainer_id,
        id: new ObjectId(body.trainer_id), 
        first_name: trainer.first_name,
        last_name: trainer.last_name,
      },
    });

    try {
      await result.save();
      return createResponse(
        "Appointment booked successfully, Check your mail!.",
        true,
        result,
        201
      );
    } catch (error) {
      console.log(error);
      return createResponse("Error creating appointment", false, {}, 400);
    }
  } catch (error) {
    console.log(error);
    return createResponse("Error creating appointment", false, {}, 500);
  }
};
