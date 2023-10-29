import React, { useEffect, useState } from "react";
import notesStore from "../stores/noteStore";
import axios from "axios";

const NoteBody = () => {
  const store = notesStore();
  //console.log(store.individualNoteId)
  const [Note, setNote] = useState(null);
  useEffect(() => {
    const findNote = async () => {
      const note = await axios.get(`/notes/${store.individualNoteId}`);
      setNote(note.data.note);
    };
    findNote();
  }, [store]);
  //console.log(Note);

  return (
    <div>
      {Note !== null ? (
        <div className="flex justify-center h-full w-full relative">
          <div className=" p-3">
          <div className="text-3xl font-bold">{Note.title}</div>
          <div className="left-3 absolute mx-5 md:mx-32">{Note.body}</div>
          </div>
        </div>
      ) : (
        <>Loading....</>
      )}
    </div>
  );
};

export default NoteBody;
