import { useEffect } from "react";

import Notes from "../components/Notes";
import UpdateForm from "../components/UpdateForm";
import CreateForm from "../components/CreateForm";
import notesStore from "../stores/noteStore";

const NotesPage = () => {
  const store = notesStore();
  // Use effect
  useEffect(() => {
    store.fetchNotes();
  }, []);
  return (
    <div>
      <Notes />
    </div>
  );
};

export default NotesPage;
