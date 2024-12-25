import connect from "@/lib/db";
import Appointment from "@/lib/models/appointment";
import Trainer from "@/lib/models/trainer";
import { createResponse } from "@/utils/req";
import { ObjectId } from "mongodb"; 
import { NextRequest } from "next/server";


export const GET = async (req: NextRequest) => {
  try {
    await connect();

    const decodedTokenHeader = req.headers.get("x-decoded-token");
    if (!decodedTokenHeader) {
      return createResponse("Unauthorized", false, {}, 401);
    }

    const decodedToken = JSON.parse(decodedTokenHeader);

    const userId = decodedToken.userId;
    const data = await Trainer.findOne({
      _id: new ObjectId(userId),
    });

    const appointments = await Appointment.find({
      "trainer.id": new ObjectId(userId),
    }).lean();

    const statusCounts = appointments.reverse().reduce(
      (counts, appointment) => {
        if (appointment.status === 'completed') {
          counts.completed += 1;
        } else if (appointment.status === 'cancelled') {
          counts.cancelled += 1;
        } else if (appointment.status === 'accepted') {
          counts.accepted += 1;
        } else if (appointment.status === 'scheduled') {
          counts.scheduled += 1;
        }
        return counts;
      },
      { completed: 0, cancelled: 0, scheduled: 0, accepted: 0 }
    );
    if (!data) {
      return createResponse("User not found", false, {}, 404);
    }

    const { password, ...res } = data.toObject();
    return createResponse("Details fetched successfully", true, {...res, counts: statusCounts, appointments}, 200);
  } catch (error) {
    return createResponse("Error retrieving user", false, {}, 500);
  }
};
export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    await connect();

    const decodedTokenHeader = req.headers.get("x-decoded-token");
    if (!decodedTokenHeader) {
      return createResponse("Unauthorized", false, {}, 401);
    }

    const decodedToken = JSON.parse(decodedTokenHeader);
    const userId = decodedToken.userId;

    const data = await Trainer.findOne({
      _id: new ObjectId(userId),
    });

    if (!data) {
      return createResponse("User not found", false, {}, 404);
    }

    const result = await Trainer.updateOne(
      { _id: new ObjectId(userId) },
      { $set: body }
    );

    if (result.matchedCount === 0) {
      return createResponse("No document matched the provided query.", false, {}, 404);
    }

    if (result.modifiedCount === 0) {
      return createResponse("No documents were modified.", false, {}, 404);
    }

    return createResponse("User updated successfully", true, body, 200);
  } catch (error) {
    return createResponse("Error updating user", false, {}, 500);
  }
};
