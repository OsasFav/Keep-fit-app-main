// This page is to a schema for what each collection on the database would look like

import {Schema, model, models} from "mongoose"
// export interface UserType {
//   _id?: string,
//   email?: string
//   first_name: string,
//   last_name: string,
//   phone_number: string,
//   type?: string,
//   isVerified: boolean,
//   password: string,
//   sex: string
// }

const TrainerSchema = new Schema({
  email: {type: String, required: true, unique: true},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  phone_number: {type: String, required: true, unique: true},
  location: {type: String, required: false},
  training_type: {type: Array, required: true},
  type: {type: String, required: true},
  isVerified: {type: Boolean, required: false},
  sex: {type: String, required: false},
  rating: {type: String, required: true},
  total: {type: String, required: true},
  pricing: {type: String, required: true},
  // user_id: {type: String, required: true},
  password: {type: String},
  
}, {timestamps: true})

const Trainer = models.Trainer || model("Trainer", TrainerSchema)

export default Trainer