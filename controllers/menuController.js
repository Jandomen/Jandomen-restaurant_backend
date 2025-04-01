import Menu from "../models/Menu.js";

export const obtenerMenu = async (req, res) => {
  try {
    const menu = await Menu.find();
    console.log("✅ Menú obtenido:", menu);
    res.json(menu);
  } catch (error) {
    console.error("❌ Error al obtener el menú:", error);
    res.status(500).json({ message: "Error al obtener el menú", error: error.message });
  }
};

export const agregarPlatillo = async (req, res) => {
  const { nombre, precio, imagen } = req.body;

  if (!nombre || !precio) {
    console.error("❌ Error al agregar el platillo: nombre o precio faltante");
    return res.status(400).json({ message: "El nombre y el precio son obligatorios." });
  }

  try {
    const nuevoPlatillo = new Menu({ nombre, precio, imagen });
    await nuevoPlatillo.save();
    console.log("✅ Platillo agregado:", nuevoPlatillo);
    res.status(201).json({ message: "Platillo agregado con éxito", nuevoPlatillo });
  } catch (error) {
    console.error("❌ Error al agregar el platillo:", error);
    res.status(500).json({ message: "Error al agregar el platillo", error: error.message });
  }
};

export const actualizarPlatillo = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, imagen } = req.body;

  try {
    const platillo = await Menu.findById(id);
    if (!platillo) {
      console.error("❌ Error al actualizar el platillo: platillo no encontrado");
      return res.status(404).json({ message: "Platillo no encontrado" });
    }

    platillo.nombre = nombre || platillo.nombre;
    platillo.precio = precio || platillo.precio;
    platillo.imagen = imagen || platillo.imagen;

    await platillo.save();
    console.log("✅  Platillo actualizado:", platillo);
    res.json({ message: "Platillo actualizado", platillo });
  } catch (error) {
    console.error("❌ Error al actualizar el platillo:", error);
    res.status(500).json({ message: "Error al actualizar el platillo", error: error.message });
  }
};

export const eliminarPlatillo = async (req, res) => {
  const { id } = req.params;

  try {
    const platillo = await Menu.findById(id);
    if (!platillo) {
      console.error("❌ Error al eliminar el platillo: platillo no encontrado");
      return res.status(404).json({ message: "Platillo no encontrado" });
    }

    await platillo.remove();
    console.log("✅  Platillo eliminado:", platillo);
    res.json({ message: "Platillo eliminado con éxito" });
  } catch (error) {
    console.error("❌ Error al eliminar el platillo:", error);
    res.status(500).json({ message: "Error al eliminar el platillo", error: error.message });
  }
};
