import connect from "@/lib/db";
import Trainer from "@/lib/models/trainer";
import { createResponse } from "@/utils/req";
import { NextRequest } from "next/server";

interface UserWithoutPassword {
  first_name: string;
  last_name: string;
  location: string;
  rating: string;
  total: string;
  email: string;
  training_type: string;
  image: string;
  sex: string;
  _id: string;
  phone_number: string;
}

export const GET = async (req: NextRequest) => {
  try {
    await connect();

    const decodedTokenHeader = req.headers.get("x-decoded-token");
    if (!decodedTokenHeader) {
      return createResponse("Unauthorized", false, {}, 401);
    }

    const data = await Trainer.find({});
    const response: UserWithoutPassword[] = [];

    await data.forEach((element) => {
      const { password, ...res } = element.toObject();
      response.push(res);
    });
    return createResponse("Trainers fetched successfully", true, response, 200);
  } catch (error) {
    // console.error("GET Handler: Error", error);
    return createResponse("Error retrieving user", false, {}, 500);
  }
};
