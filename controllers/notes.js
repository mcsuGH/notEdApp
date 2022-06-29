const Note = require("../models/note");

const NotesController = {
  Index: (req, res) => {
    Note.find({ userId: req.params.userId, hidden: false }).exec((err, notes) => {
      if (err) {
        throw err;
      }
      let reverseOrder = notes.reverse();
      res.json({
        notes: reverseOrder,
      });
    });
  },

  Create: (req, res) => {
    const noteInfo = req.body;
    const note = new Note(noteInfo);
    note.save((err) => {
      if (err) {
        throw err;
      }
      res.send(note);
    })
  }
}

module.exports = NotesController;
