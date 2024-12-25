// This page is to a schema for what each collection on the database would look like

import {Schema, model, models} from "mongoose"
export interface UserType {
  _id?: string,
  email?: string
  first_name: string,
  last_name: string,
  phone_number: string,
  type?: string,
  isVerified: boolean,
  password: string,
  // sex: string
}

const UserSchema = new Schema<UserType>({
  email: {type: String, required: true, unique: true},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  phone_number: {type: String, required: true, unique: true},
  type: {type: String, required: true},
  isVerified: {type: Boolean, required: false},
  // sex: {type: String, required: true},
  // user_id: {type: String, required: true},
  password: {type: String},
  
}, {timestamps: true})

const User = models.User<UserType> || model("User", UserSchema)

export default User