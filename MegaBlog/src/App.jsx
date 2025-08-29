import { useState , useEffect } from 'react'
import './App.css'
import { useDispatch } from "react-redux"
import authServices from './appwriter/Auth';
import { Login,Logout } from "./features/authSlice";
import { Footer, Header } from './components';

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL);
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    authServices.getcurrentuser()
    .then(userData => {
      if(userData){
        dispatch(Login(userData))
        console.log(userData);
      }else{
        dispatch(Logout())
      }
    })
    .catch(err  => console.log(err))
    .finally(() => setLoading(false))
    
    
  }, [])
  

  return !loading ? (
    <>
    <Header />
     <h1 className=' underline text-amber-700'>Hello World!</h1>
    <Footer />

    </>
  ): null
}
 
export default App
