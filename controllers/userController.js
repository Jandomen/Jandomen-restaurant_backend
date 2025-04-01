import bcrypt from "bcryptjs";           
import jwt from "jsonwebtoken";          
import User from "../models/User.js";   

export const registrarUsuario = async (req, res) => {
  const { nombre, email, password } = req.body;

  const usuarioExistente = await User.findOne({ email });
  if (usuarioExistente) {
    console.error("❌ Error al registrar el usuario: correo ya registrado");
    return res.status(400).json({ message: "❌ El correo ya está registrado" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const usuario = new User({
      nombre,
      email,
      password: hashedPassword,
    });

    await usuario.save();

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("✅ Usuario registrado:", usuario);
    res.status(201).json({
      message: "✅ Usuario registrado con éxito",
      token,
      usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email },
    });
  } catch (error) {
    console.error("❌ Error al registrar el usuario:", error);
    res.status(500).json({ message: "❌ Error al registrar el usuario", error: error.message });
  }
};


export const autenticarUsuario = async (req, res) => {
  const { email, password } = req.body;

  const usuario = await User.findOne({ email });
  if (!usuario) {
    console.error("❌ Error al autenticar el usuario: usuario no encontrado");
    return res.status(400).json({ message: "❌ Credenciales inválidas" });
  }

  const esCorrecto = await bcrypt.compare(password, usuario.password);
  if (!esCorrecto) {
    console.error("❌ Error al autenticar el usuario: contraseña incorrecta");
    return res.status(400).json({ message: "❌ Credenciales inválidas" });
  }

  const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
    expiresIn: "1h", 
  });
  console.log("✅ Usuario autenticado:", usuario);
  res.json({
    message: "✅ Usuario autenticado con éxito",
    token,
    usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email },
  });
};

export const obtenerPerfil = async (req, res) => {
  try {
    const usuario = await User.findById(req.user.id).select("-password");
    if (!usuario) {
      console.error("❌ Error al obtener el perfil del usuario: usuario no encontrado");
      return res.status(404).json({ message: "❌ Usuario no encontrado" });
    }
    console.log("✅ Perfil del usuario obtenido:", usuario);
    res.json(usuario);
  } catch (error) {
    console.error("❌ Error al obtener el perfil del usuario:", error);
    res.status(500).json({ message: "❌ Error al obtener el perfil del usuario", error: error.message });
  }
};
