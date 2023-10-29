import notesStore from "../stores/noteStore";
import Note from "./Note";

export default function Notes() {
  const store = notesStore();

  return (
    <div className="h-full w-full">
      <h2 className="flex items-center justify-center p-4 text-5xl font-bold">Your Notes</h2>
      <div className="flex flex-wrap mx-5 gap-3">
      {store.notes &&
        store.notes.map((note) => {
          return <Note note={note} key={note._id} />;
        })}
      </div>
    </div>
  );
}