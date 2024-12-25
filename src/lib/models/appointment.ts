// This page is to a schema for what each collection on the database would look like

import {Schema, model, models} from "mongoose"


const AppointmentSchema = new Schema({
  user_id: {type: String, required: true, unique: true},
  num_of_participants: {type: String, required: true},
  training_type: {type: String, required: true},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  phone_number: {type: String, required: true},
  address: {type: String, required: true},
  scheduled_date: {type: String, required: true},
  message: {type: String, required: false},
  trainer: {type: Object, required: true},
  order_id: {type: String, required: true},
  status: {type: String, required: true}
}, {timestamps: true})

const Appointment = models.Appointment || model("Appointment", AppointmentSchema)

export default Appointment