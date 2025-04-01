import mongoose from "mongoose";

const menuSchema = mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String }
});

export default mongoose.model("Menu", menuSchema);
