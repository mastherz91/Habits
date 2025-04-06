var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../modelo/User');
const jwt = require('jsonwebtoken');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/register', async (req, res) => {

  try {
    const { username, password } = req.body;

    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error en el registro" });
  }
});


router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Verificar si el usuario existe
    console.log(req.body);
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }
    // Generar un token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    // Configurar la cookie
    res.cookie('habitToken', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    });
    // Enviar la respuesta al cliente
    res.status(200).json({ message: 'Usuario autenticado correctamente', token });
  } catch (error) {
    res.status(500).json({ error: "Error de Login" });
  }
});


module.exports = router;
