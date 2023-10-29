const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

async function signup(req, res){
    try {
        // get email and password off req body
    const {email, password} = req.body;

    //hasing password
    const hashedPassword = bcrypt.hashSync(password, 8);

    //create a user with the data
    await User.create({email, password: hashedPassword});

    // response
    res.sendStatus(200);
    } catch (error) {
        console.groupCollapsed(error)
    }
}
async function login(req, res){
    try {
        const {email ,password} = req.body

    //find the user
    const user = await User.findOne({email})
    if(!user)
        return res.sendStatus(401);

    //matching password
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if(!passwordMatch)
        return res.sendStatus(401);

    //creating jwt token
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30
    const token = jwt.sign({sub: user._id, exp}, process.env.SECRET)

    //set cookies
    res.cookie("Authorization", token, {
        expires: new Date(exp),
        httpOnly: true,
        sameSize: 'lax',
        secure: process.env.NODE_ENV === 'production'
    })

    //response
    res.sendStatus(200);
    } catch (error) {
        console.log(error)
    }
}
function logout(req, res){
    try {
        res.clearCookie("Authorization")
    res.sendStatus(200)
    } catch (error) {
        console.log(error)
    }
}

function checkAuth(req, res){
    try {
        console.log(req.user)
    res.sendStatus(200)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {signup, login, logout, checkAuth}