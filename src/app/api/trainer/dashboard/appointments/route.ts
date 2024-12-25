import connect from "@/lib/db";
import { createResponse } from "@/utils/req";
import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import Appointment from "@/lib/models/appointment";
// import sendEmail from "@/helpers/sendmail";
import User from "@/lib/models/user";

const formattedDate = (date) => {
  return new Date(date).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

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
        "trainer.id": new ObjectId(userId),
      }).lean();
      // console.log(appointments);
      return createResponse("All appoints fetched.", true, appointments, 200);
    } catch (error) {
      console.log(error);
      return createResponse("Error getting appointments", false, {}, 500);
    }
  } catch (error) {
    console.log(error);
    return createResponse("Error getting appointments", false, {}, 500);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { uid, status, reason } = body;

    if (!uid || !status) {
      return createResponse("Missing uuid or status", false, {}, 400);
    }
    if(status === "cancelled" && !reason){
      return createResponse("Kindly enter a reason for cancelling", false, {}, 400);
    }
    await connect();

    const decodedTokenHeader = req.headers.get("x-decoded-token");
    if (!decodedTokenHeader) {
      return createResponse("Unauthorized", false, {}, 401);
    }

    const appointment = await Appointment.findById(uid);

    const user = await User.findOne({ _id: appointment.user_id });
    if (appointment) {
      var text, subject;
      if (status === "accepted") {
        subject = "Training Confirmation with KeepFit";
        text = `Hello ${appointment?.first_name + " " + appointment.last_name},
<br/><br/>
We're pleased to inform you that your training session on <b>${formattedDate(
          appointment?.scheduled_date
        )}</b> with <b>${
          appointment.trainer.first_name + " " + appointment.trainer.last_name
        }</b> has been confirmed!
<br/><br/>

Please make sure to clear your schedule and be prepared for the session. The trainer has outlined the following terms for the training:
<br/>
<ol style="padding-left: 24px;"">
<li>Cancellations are not allowed within 4 hours of the request.</li>
<li>Please adhere to the prescribed training limits.</li>
</ol><br/>
If you have any questions or concerns, feel free to reach out to our support team or email us at support@keepfit.com.
<br/><br/><br/>

Best regards,<br/>
KeepFit Booking.
              `;
      } else {
        subject = "Training Session Declined";
        text = `Hello ${appointment?.first_name + " " + appointment.last_name},
<br/><br/>
  <p>We regret to inform you that your training session on ${formattedDate(
    appointment?.scheduled_date
  )} with <b>${
          appointment.trainer.first_name + " " + appointment.trainer.last_name
        }</b> has been <b>declined</b> due to ${reason}.</p>
<br/><br/>
  <p>We apologize for any inconvenience this may cause. Please feel free to reschedule or choose another trainer at your convenience.</p>


If you have any questions or concerns, feel free to reach out to our support team or email us at support@keepfit.com.
<br/><br/><br/>

Best regards,<br/>
KeepFit Booking.
              `;
      }
      // await sendEmail({
      //   to: user.email,
      //   subject,
      //   html: text,
      // });
      const updateAppointment = await Appointment.findByIdAndUpdate(
        uid,
        { $set: { status } },
        { new: true, runValidators: true }
      ).lean();

      if (!updateAppointment) {
        return createResponse("Appointment not found", false, {}, 404);
      }

      return createResponse("Appointment status updated!", true, {}, 200);
    } else return createResponse("Appointment not found", true, {}, 404);
  } catch (error) {
    console.log(error);
    return createResponse("Error getting appointments", false, {}, 500);
  }
};
