import React, { useContext } from 'react'
import Sidebar from './components/sidebar/Sidebar';
import SplitScreen from './components/design/SplitScreen';
import Main from './components/main/Main';
import Login from './components/Login/login';
import { Context } from './context/Context';

const App = () => {

  const {currentUser} =useContext(Context)
  if(!currentUser){
    return <Login/>
  }
 
  

  return (
    <div className="font-Poppins">
       <SplitScreen left={Sidebar} right={Main } />
    </div>
  )
}

export default App
