// load evn variables
if(process.env.NODE_ENV != 'production'){
    require("dotenv").config();
}

//importing
const express = require('express')
const cors = require("cors")
const cookieParser = require("cookie-parser")
const connectToDb = require("./config/connectToDb")
const notesController = require("./controllers/notesController")
const userController = require("./controllers/userController")
const requireAuth = require("./middleware/requireAuth")


// create express app
const app = express()

//configure an express app
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: true,
    credentials: true
}));

//connect to DB
connectToDb();

//routing

// fetch single notes
app.get('/notes/:id', requireAuth, notesController.fetchSingleNote)

// fetch all notes
app.get('/notes', requireAuth, notesController.fetchAllNotes)

//creating a note
app.post('/notes', requireAuth, notesController.createNote)

//updating
app.put('/notes/:id', requireAuth, notesController.updateNote)

//deleting
app.delete("/notes/:id", requireAuth, notesController.deleteNote)

//authentication
app.post("/signup", userController.signup)
app.post("/login", userController.login)
app.get("/logout", userController.logout)
app.get('/check-auth',  requireAuth, userController.checkAuth)

//start our server
app.listen(process.env.PORT)
