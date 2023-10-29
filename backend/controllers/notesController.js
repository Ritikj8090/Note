const Note = require("../models/note");

const fetchSingleNote = async (req, res) => {
  try {
    //get the id
    const noteId = req.params.id;
    //find note
    const note = await Note.findOne({_id:noteId, user: req.user._id});

    //response
    res.json({ note });
  } catch (error) {
    console.log(error);
  }
};

const fetchAllNotes = async (req, res) => {
  try {
    //find note
    const notes = await Note.find({user: req.user._id });

    //response
    res.json({ notes });
  } catch (error) {
    console.log(error);
  }
};

const createNote = async (req, res) => {
  try {
    const { title, body, color } = req.body;

    const note = await Note.create({
      title: title,
      body: body,
      date: String( new Date()),
      color: color,
      user: req.user._id,
    });
    res.json({ note });
  } catch (error) {
    console.log(error);
  }
};

const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, body, color } = req.body;

    await Note.findOneAndUpdate(
      { _id: noteId, user: req.user._id },
      { title, body, color }
    );
    //find updated note
    const note = await Note.findById(noteId);
    res.json({ note });
  } catch (error) {
    console.log(error);
  }
};

const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    await Note.deleteOne({ _id: noteId, user: req.user._id });
    res.json({ success: "RECORD DELETED" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  fetchSingleNote,
  fetchAllNotes,
  createNote,
  updateNote,
  deleteNote,
};
