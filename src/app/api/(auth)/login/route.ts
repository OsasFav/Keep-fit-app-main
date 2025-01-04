import connect from "@/lib/db";
import Trainer from "@/lib/models/trainer";
import User, { UserType } from "@/lib/models/user";
import { comparePasswords, createResponse, generateToken } from "@/utils/req";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, password, isTrainer } = body;
    
    if (!email || !password) {
      return createResponse(
        "Some field(s) are missing, input all fields",
        false,
        {},
        400
      );
    }
    await connect();

    const user= isTrainer
    ? await Trainer.findOne({ email })
    : await User.findOne({ email });

    console.log(user);
    

    if (!user) {
      return createResponse("User not found", false, {}, 400);
    } else {
      const isPasswordValid = await comparePasswords(password, user?.password);
      if (!isPasswordValid) {
        return createResponse(
          "Incorrect password, check and try again",
          false,
          {},
          400
        );
      } else {
        const { password, ...userWithoutPassword } = user || {};
        const user_id = (user?._id as unknown as ObjectId).toString();
        const access_token = await generateToken(user_id);

        const currentDate = new Date();
        const date = currentDate.toDateString();
        const time = currentDate.toTimeString();

        const successText = `Hello ${user?.first_name},

        We are pleased to inform you that a successful login was detected on your email account. Your account was accessed 
        at ${date + ", " + time}.
    
        If you initiated this login, no further action is required. However, if you did not authorize this login or believe it to be suspicious, please take immediate action to secure your account.
    
        Should you have any questions or concerns regarding this login activity, please contact our support team or send a mail support@keepfit.com for further assistance.
    
        Best regards,
        KeepFit Booking.
        `;
        // !isTrainer &&
        //   (await sendEmail({
        //     to: user.email,
        //     subject: "Successful Login",
        //     text: successText,
        //     html: "",
        //   }));
        return createResponse(
          "Login successfully",
          true,
          { ...userWithoutPassword, access_token },
          200
        );
      }
    }
  } catch (error) {
    console.log(error);
    return createResponse("Error logging in user", false, {}, 500);
  }
};
