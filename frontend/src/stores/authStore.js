import {create} from 'zustand'
import axios from 'axios';


const authStore = create((set) => ({
    loggedIn: null,
    LoginForm:{
        email: "",
        password: "",
    },
    updateLoginForm: (e) => {
        const {name, value} = e.target

        set((state) => {
            return {
                LoginForm: {
                    ...state.LoginForm,
                    [name]:value,
                }
            }
        })
    },
    login: async (e) => {
        try {
        const {LoginForm} = authStore.getState();
        const res = await axios.post('/login', LoginForm)
        console.log(res)
        set({
            loggedIn: true,
            SignupForm: {
                email:"",
                password:"", 
            }
        })
        } catch (error) {
            console.log(error)
        }
    },
    checkAuth: async () => {
        try {
            await axios.get("/check-auth");
            set({loggedIn: true})
        } catch (error) {
            set({loggedIn: false})
        }
    },
    SignupForm:{
        email:'',
        password:''
    },
    updateSignupForm: (e) => {
        const {name, value} = e.target

        set((state) => {
            return {
                SignupForm: {
                    ...state.SignupForm,
                    [name]:value,
                }
            }
        })
    },
    Signup: async() => {
        try {
            const {SignupForm } = authStore.getState()
        await axios.post("/signup", SignupForm)

        set({
            SignupForm: {
                email:"",
                password:"", 
            }
        })
        } catch (error) {
            console.log(error)
        }
    },
    logout: async() => {
        await axios.get('/logout')
        set({loggedIn : false})
    }
}))

export default authStore