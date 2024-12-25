import connect from "@/lib/db";
import { createResponse } from "@/utils/req";
import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import Appointment from "@/lib/models/appointment";

export const GET = async (req: NextRequest) => {
  try {
    await connect();

    const decodedTokenHeader = req.headers.get("x-decoded-token");
    if (!decodedTokenHeader) {
      return createResponse("Unauthorized", false, {}, 401);
    }

    const decodedToken = JSON.parse(decodedTokenHeader);
    const userId = decodedToken.userId;
    try {
      const appointments = await Appointment.find({
        user_id: new ObjectId(userId),
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
      return createResponse("All appointments fetched.", true, { counts: statusCounts, appointments}, 200);
    } catch (error) {
      console.log(error);
      return createResponse("Error getting appointments", false, {}, 500);
    }
  } catch (error) {
    console.log(error);
    return createResponse("Error getting appointments", false, {}, 500);
  }
};