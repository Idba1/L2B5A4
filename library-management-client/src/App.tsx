// import { Button } from "@/components/ui/button"
import { Outlet } from "react-router"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <>
        <Navbar></Navbar>
        <div className="mt-16">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </>
    </div>
  )
}

export default App