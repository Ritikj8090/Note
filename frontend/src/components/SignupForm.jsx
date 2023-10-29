import React from 'react'
import authStore from '../stores/authStore'
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const store = authStore();
    const navigate = useNavigate()

    const handleSignup = async(e) => {
      e.preventDefault()
      await store.Signup();

      navigate('/')
    }

  return (
    <div className="flex items-center justify-center h-screen">
        <div>
          <div className="text-3xl flex items-center justify-center">
          
        Signup
          </div>
          <form onSubmit={handleSignup}>
            <input className="border-2 flex  h-full my-2 rounded-xl p-3 w-full"
          placeholder="Body..." onChange={store.updateSignupForm} value={store.SignupForm.email} type="email" name='email' />
            <input className="border-2 flex  h-full my-2 rounded-xl p-3 w-full"
          placeholder="Body..." onChange={store.updateSignupForm} value={store.SignupForm.password} type="password" name='password' />
            <button type='submit' className="border-2 flex w-full h-full rounded-xl p-3 items-center justify-center font-bold bg-purple-400">Sign up</button>
        </form>
        </div>
    </div>
  )
}

export default SignupForm