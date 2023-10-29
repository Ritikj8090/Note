import {create} from "zustand";
import axios from "axios";

const notesStore = create((set) => ({
  notes: null,

  individualNoteId: null,

  createForm: {
    title: "",
    body: "",
    color: "",
  },

  updateForm: {
    _id: null,
    title: "",
    body: "",
    color: "",
  },

  NoteId: (id) => {
    set({individualNoteId: id})
  },

  fetchNotes: async () => {
    // Fetch the notes
    const res = await axios.get("/notes");

    // Set to state
    //console.log(res.data.notes)
    set({ notes: res.data.notes });
  },

  updateCreateFormField: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        createForm: {
          ...state.createForm,
          [name]: value,
        },
      };
    });
  },

  createNote: async (e) => {

    const { createForm, notes } = notesStore.getState();
    const res = await axios.post("/notes", createForm);

    set({
      notes: [...notes, res.data.note],
      createForm: {
        title: "",
        body: "",
        color:"",
      },
    });
  },

  deleteNote: async (_id) => {
    // Delete the note
    const res = await axios.delete(`/notes/${_id}`);
    const { notes } = notesStore.getState();

    // Update state
    const newNotes = notes.filter((note) => {
      return note._id !== _id;
    });

    set({ notes: newNotes });
  },

  handleUpdateFieldChange: (e) => {
    const { value, name } = e.target;

    set((state) => {
      return {
        updateForm: {
          ...state.updateForm,
          [name]: value,
        },
      };
    });
  },

  toggleUpdate: ({ _id, title, body, color }) => {
    set({
      updateForm: {
        title,
        body,
        color,
        _id,
      },
    });
  },

  updateNote: async (e) => {

    const {
      updateForm: { title, body, color, _id },
      notes,
    } = notesStore.getState();

    // Send the update request
    const res = await axios.put(`/notes/${_id}`, {
      title,
      body,
      color,
    });

    // Update state
    const newNotes = [...notes];
    const noteIndex = notes.findIndex((note) => {
      return note._id === _id;
    });
    newNotes[noteIndex] = res.data.note;

    set({
      notes: newNotes,
      updateForm: {
        _id: null,
        title: "",
        body: "",
        color: '',
      },
    });
  },
}));

export default notesStore;