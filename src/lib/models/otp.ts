// This page is to a schema for what each collection on the database would look like

import {Schema, model, models} from "mongoose"
export interface OtpType {
  email: string
  code: string
  expiry: string
}

const OtpSchema = new Schema<OtpType>({
  email: {type: String, required: true, unique: true},
  code: {type: String, required: true},
  expiry: {type: String, required: true},
}, {timestamps: true})

const OtpModel = models.Otp<OtpType> || model("Otp", OtpSchema)

export default OtpModel