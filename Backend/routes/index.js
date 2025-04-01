var express = require('express');
var router = express.Router();
const Habit = require('../modelo/Habit');
const { verify } = require('jsonwebtoken');
const { mongo, default: mongoose } = require('mongoose');


const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401).json({ error: 'Token no proporcionado' });
  try {

    const tokrnWithoutBearer = token.replace('Bearer ', '');
  } catch (error) {
    return res.sendStatus(403).json({ error: 'Token inválido' });
    req.user = verify;
    next();
  }
}




/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', function (req, res, next) {
  res.json({ "status": "success", "message": "Hello, World" });
});

// Ruta para crear un nuevo hábito
router.post('/habits', authenticateToken, async function (req, res, next) {
  const { name, description, category, frequency, duration } = req.body;
  let userId = req.user._id && req.user.userId ? req.user._id : req.user.status(500).json({ error: 'Error retriving habits' });
  userId = new mongoose.Types.ObjectId(userId);
  const habit = new Habit({ name, description, category, frequency, duration, userId });
  await habit.save()
    .then(() => {
      res.status(201).json({ message: 'Habit created successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Ruta para obtener todos los hábitos
router.get('/habits', authenticateToken, async function (req, res, next) {
  try {
    let userId = req.user._id && req.user.userId ? req.user._id : req.user.status(500).json({ error: 'Error retriving habits' });
    const habits = await Habit.find({ 'userId': new mongoose.Types.ObjectId(userId) });
    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ruta para actualizar habito 
router.patch('/habits/:id', authenticateToken, async function (req, res, next) {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    habit.lastDone = new Date();

    if (timeDifferenceInHours(habit.lastUpdate, habit.lastDone) < 24) {
      habit.days = timeDifferenceInDays(habit.lastDone, habit.startedaAt);
      habit.lastUpdate = new Date();
      await habit.save();
      res.status(200).json({ message: 'Habit updated successfully' });
    } else {
      habit.days = 1;
      habit.lastUpdate = new Date();
      await habit.save();
      res.status(200).json({ message: 'Habit restarted' });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const timeDifferenceInHours = (date1, date2) => {
  const differenceMs = Math.abs(date1 - date2);
  return Math.floor(differenceMs / (1000 * 60 * 60));
}

// Restar en dias 

const timeDifferenceInDays = (date1, date2) => {
  const differenceMs = Math.abs(date1 - date2);
  return Math.floor(differenceMs / (1000 * 60 * 60 * 24));
}

module.exports = router;