import React from 'react'
import SideBar from './widgets/SideBar'
import ChatList from './widgets/ChatList'

const App = () => {

    
  return (
    <div style={{display:'flex'}}>
      <SideBar/>
      <ChatList/>
    </div>
  )
}

export default App
