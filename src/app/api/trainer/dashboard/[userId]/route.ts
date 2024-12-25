import connect from "@/lib/db";
import Trainer from "@/lib/models/trainer";
import { createResponse } from "@/utils/req";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";
import { NextRequest } from "next/server";


export const GET = async (req: NextRequest) => {
  const path = req.nextUrl.pathname.split("/");
  const userId = path[path.length - 1];
  if (!userId) {
    return createResponse("Supply ID!", false, {}, 401);
  }
  try {
    await connect();

    const decodedTokenHeader = req.headers.get("x-decoded-token");
    if (!decodedTokenHeader) {
      return createResponse("Unauthorized", false, {}, 401);
    }
    if (!Types.ObjectId.isValid(userId)) {
      return createResponse("Invalid User ID", false, {}, 400);
    }
    const data = await Trainer.findOne({
      _id: new ObjectId(userId),
    });
    if (!data) {
      return createResponse("User not found", false, {}, 400);
    }
    const { password, ...res } = data.toObject();

    return createResponse("Trainers fetched successfully", true, res, 200);
  } catch (error) {
    // console.error("GET Handler: Error", error);
    return createResponse("Error retrieving user", false, {}, 500);
  }
};
