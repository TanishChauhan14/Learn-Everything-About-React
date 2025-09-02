import { useState , useEffect } from 'react'
import './App.css'
import { useDispatch } from "react-redux"
import authServices from './appwriter/Auth';
import { login,logout } from "./features/authSlice";
import { Header , Footer } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL);
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    authServices.getcurrentuser()
    .then(userData => {
      if(userData){
        dispatch(login(userData))
        console.log(userData);
      }else{
        dispatch(logout())
      }
    })
    .catch(err  => console.log(err))
    .finally(() => setLoading(false))
    
    
  }, [])
  

  return !loading ? (
    <>
    <Header />
     <Outlet />
    <Footer />

    </>
  ): null
}
 
export default App;
