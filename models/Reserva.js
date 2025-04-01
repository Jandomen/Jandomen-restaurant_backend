import mongoose from "mongoose";

const reservaSchema = mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
  personas: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("Reserva", reservaSchema);
