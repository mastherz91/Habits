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

    if (!username || !password) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET || 'secretkey');
    res.status(201).json({ message: 'Usuario creado', token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'secretkey');
    res.status(200).json({ message: 'Usuario autenticado', token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
