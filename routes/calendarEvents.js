var express = require('express');
var router = express.Router();
const CalendarController = require("../controllers/calendarEvents")

router.get("/", CalendarController.Index);
router.post("/create", CalendarController.Create);
router.post("/delete/:id", CalendarController.Delete);

module.exports = router;