import LoginPage from "../pages/LoginPage";
import NotesPage from "../pages/NotesPage";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import NavBar from "./NavBar";
import RequireAuth from "./RequireAuth";
import SignupPage from "../pages/SignupPage";
import LogoutPage from "../pages/LogoutPage";
import Create from "../pages/Create";
import Update from "../pages/Update";
import NoteBody from "../pages/NoteBody";
import notesStore from "../stores/noteStore";

function App() {
  const store = notesStore();
  return (
    <div>
      <BrowserRouter >
      <NavBar />
      <Routes>
        <Route path="/" element={<RequireAuth><NotesPage /></RequireAuth>}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignupPage />}/>
        <Route path="/logout" element={<LogoutPage />}/>
        <Route path="/create" element={<Create />}/>
        <Route path="/update" element={<Update />}/>
        <Route path="/note/" element={<NoteBody />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
