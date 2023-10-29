import { useNavigate } from "react-router-dom";
import notesStore from "../stores/noteStore";
import deletesvg from "../delete.svg"
import updatesvg from "../update.svg"
import { useState } from "react";


export default function Note({ note }) {
  const navigate = useNavigate();
  const store = notesStore()

  const handleSubmit = () => {
    store.toggleUpdate(note);
    navigate("/update");
  };

  // Function to split the text into an array of rows with a maximum of 50 words each
  const splitTextIntoRows = (text, maxWordsPerRow) => {
    const words = text.split(' ');
    const rows = [];
    let currentRow = [];
    let currentWordCount = 0;

    words.forEach((word) => {
      if (currentWordCount + 1 <= maxWordsPerRow) {
        currentRow.push(word);
        currentWordCount += 1;
      } else {
        rows.push(currentRow.join(' '));
        currentRow = [word];
        currentWordCount = 1;
      }
    });

    if (currentRow.length > 0) {
      rows.push(currentRow.join(' '));
    }

    return rows;
  };

  // Get the rows of text
  const textRows = splitTextIntoRows(note.body.charAt(0).toUpperCase() + note.body.slice(1), 50);
  const title = note.title.charAt(0).toUpperCase() + note.title.slice(1)

  
  const date = note.date
  const DateTime = {
    year: date?.substring(10, 15),
    month: date?.substring(4, 8),
    day: date?.substring(8, 10),
    time: date?.substring(15, 21)
  }
  
  const handleNote = (id) => {
    store.NoteId(id)
    navigate('/note') 
  }
 
  
  return (
    <div
      key={note._id}
      className={`${note.color} h-[300px] w-[300px] rounded-3xl p-5 flex flex-col relative cursor-pointer`}
      
    >
      <div className="flex-grow" onClick={() => handleNote(note._id)}>
        <div className="flex items-center justify-center text-2xl font-semibold mb-3 title">{title}</div>
        <div className="body-text">{textRows.map((row, index) => (
            <div key={index}>{row}</div>
          ))}</div>
      </div>
      <div className="flex justify-between">
        <div>{DateTime.time} {DateTime.day}-{DateTime.month}-{DateTime.year}</div>
        <div className="flex gap-5">
          <img className="cursor-pointer" src={deletesvg} alt="delete" height={20} width={20} onClick={() => store.deleteNote(note._id)}/>
          <img className="cursor-pointer" src={updatesvg} alt="delete" height={20} width={20} onClick={handleSubmit}/>

      </div>
      </div>
    </div>
  );
}
/*
<div
      key={note._id}
      className="flex-col border-2 border-black m-2 w-[250px] h-[200px] p-3 "
    >
      <h3 className="text-3xl font-semibold tracking-wide flex items-center justify-center">
        {note.title}
      </h3>
      <p>{note.body}</p>

      <button
        className="border-2 p-1 rounded-xl bg-purple-400 font-bold"
        onClick={() => store.deleteNote(note._id)}
      >
        Delete note
      </button>
      <button
        className="border-2 p-1 rounded-xl bg-purple-400 font-bold"
        onClick={handleSubmit}
      >
        Update note
      </button>
    </div> */
