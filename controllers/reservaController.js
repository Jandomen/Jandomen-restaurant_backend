import Reserva from "../models/Reserva.js";

export const crearReserva = async (req, res) => {
  try {
    const reserva = new Reserva(req.body);
    await reserva.save();
    console.log("✅  Reserva creada:", reserva);
    res.status(201).json({ message: "✅ Reserva creada", reserva });
  } catch (error) {
    console.error("❌ Error al crear la reserva:", error);
    res.status(500).json({ message: "❌ Error al crear la reserva" });
  }
};

export const obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find();
    console.log("✅ Reservas obtenidas:", reservas);
    res.json(reservas);
  } catch (error) {
    console.error("❌ Error al obtener reservas: ", error);
    res.status(500).json({ message: "❌ Error al obtener reservas" });
  }
};
