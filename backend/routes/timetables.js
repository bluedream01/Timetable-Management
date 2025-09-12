const express = require('express');
const router = express.Router();
const Timetable = require('../models/Timetable');

// Create new timetable
router.post('/', async (req, res) => {
  const timetable = new Timetable(req.body);
  await timetable.save();
  res.json(timetable);
});

// Get all timetables
router.get('/', async (req, res) => {
  const timetables = await Timetable.find();
  res.json(timetables);
});

// Get timetable by department
router.get('/:department', async (req, res) => {
  const timetables = await Timetable.find({ department: req.params.department });
  res.json(timetables);
});

router.get('/faculty/:facultyName', async (req, res) => {
  try {
    const { facultyName } = req.params;

    // Find all timetables where this faculty exists
    const timetables = await Timetable.find({
      'schedule.monday.faculty': facultyName, 
      // Note: this only checks Monday; we'll filter below
    });

    // Filter slots per day
    const facultySchedules = timetables.map(tt => {
      const filteredSchedule = {};
      for (const day in tt.schedule) {
        filteredSchedule[day] = tt.schedule[day].filter(slot => slot.faculty === facultyName);
      }
      return {
        timetableName: tt.name,
        department: tt.department,
        schedule: filteredSchedule
      };
    });

    res.json(facultySchedules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
