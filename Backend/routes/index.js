var express = require('express');
var router = express.Router();
const Habit = require('../modelo/Habit');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', function (req, res, next) {
  res.json({ "status": "success", "message": "Hello, World" });
});

// Ruta para crear un nuevo hábito
router.post('/habits', async function (req, res, next) {
  const { name, description, category, frequency, duration } = req.body;
  const habit = new Habit({ name, description, category, frequency, duration });
  await habit.save()
    .then(() => {
      res.status(201).json({ message: 'Habit created successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Ruta para obtener todos los hábitos
router.get('/habits', async function (req, res, next) {
  try {
    const habits = await Habit.find();
    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ruta para actualizar habito 
router.patch('/habits/:id', async function (req, res, next) {
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