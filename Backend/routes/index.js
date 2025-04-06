const express = require('express');
const router = express.Router();
const Habit = require('../modelo/Habit');
const { verify } = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');

// Middleware para autenticar token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  try {
    const decoded = verify(token, "Programacion Avanzada"); // Usa la misma clave que usaste al firmar
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido' });
  }
};

// Ruta GET de prueba
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/hello', (req, res) => {
  res.json({ status: "success", message: "Hello, World" });
});

// Ruta para crear un nuevo hábito
router.post('/habits', authenticateToken, async (req, res) => {
  console.log("REQ BODY:", req.body);
  console.log("REQ USER:", req.user);
  try {
    const { name, description, category, frequency, duration } = req.body;
    const userId = req.user.userId;

    const habit = new Habit({
      name, //  nombre del hábito
      description,
      category,
      frequency,
      duration,
      userId: new mongoose.Types.ObjectId(userId),
      startedaAt: new Date(),
      lastUpdate: new Date(),
      days: 1,
      user: req.user.userId,
    });

    await habit.save();
    res.status(201).json(habit); //  Retorna el hábito creado
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener todos los hábitos del usuario autenticado
router.get('/habits', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const habits = await Habit.find({ user: userId });
    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para marcar un hábito como hecho
router.patch('/habits/:id', authenticateToken, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    const now = new Date();
    const hoursDiff = timeDifferenceInHours(habit.lastUpdate, now);

    if (hoursDiff < 24) {
      habit.days = timeDifferenceInDays(now, habit.startedaAt);
      habit.lastUpdate = now;
      habit.lastDone = now;
      await habit.save();
      res.status(200).json({ message: 'Habit updated successfully' });
    } else {
      habit.days = 1;
      habit.startedaAt = now;
      habit.lastUpdate = now;
      habit.lastDone = now;
      await habit.save();
      res.status(200).json({ message: 'Habit restarted' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Función para calcular diferencia en horas
const timeDifferenceInHours = (date1, date2) => {
  const diffMs = Math.abs(date1 - date2);
  return Math.floor(diffMs / (1000 * 60 * 60));
};

// Función para calcular diferencia en días
const timeDifferenceInDays = (date1, date2) => {
  const diffMs = Math.abs(date1 - date2);
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
};

module.exports = router;
