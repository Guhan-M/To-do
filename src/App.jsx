import React from 'react'
import Dashboard from './components/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
function App() {
  let [user,setUser]=useState([
    {
      id:1,
      title:"wakeup",
      des:"wakeup morning",
      status:"completed"
    },
    {
      id:2,
      title:"Going school",
      des:"wakeup morning",
      status:"completed"
    },
    {
      id:3,
      title:"Going clg",
      des:"wakeup morning",
      status:"completed"
    }
])
  return <>
  <Dashboard user={user} setUser={setUser}/>
  </>
}

export default App