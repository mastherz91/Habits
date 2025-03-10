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

module.exports = router;