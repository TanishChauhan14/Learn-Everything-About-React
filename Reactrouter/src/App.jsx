import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Home from "./components/Home/Home"
import Aboutus from "./components/About/Aboutus"
import Contact from "./components/Contact/Contact"
import User from "./components/User/User"
import Github, { Githubloader } from "./components/Github/Github"


const App = () => {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout />,
      children : [
        {
          path:"",
          element:<Home />
        },
        {
          path:"about",
          element:<Aboutus />
        },
        {
          path:"contact",
          element: <Contact />
        },
        {
          path:"user/:userid",
          element: <User />
        },
        {
          path:"github",
          element: <Github />,
          loader: Githubloader
        }]
    

  }])

  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
