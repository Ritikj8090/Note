import React, { useEffect } from 'react'
import authStore from '../stores/authStore'
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
    const navigate = useNavigate()
    const store = authStore();
    useEffect(() => {
        store.logout();
        navigate('/login')
    })
  return (
    <div></div>
  )
}

export default LogoutPage