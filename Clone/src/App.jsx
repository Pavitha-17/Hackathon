import {React,useState} from 'react'
import SideBar from './widgets/SideBar'
import ChatList from './widgets/ChatList'

const App = () => {
const [clicked,setClicked] = useState(false);
console.log(clicked);

  return (
    <div style={{display:'flex'}}>
      <SideBar clicked={clicked} setClicked={setClicked}/>
      <ChatList clicked={clicked}/>
    </div>
  )
}

export default App
