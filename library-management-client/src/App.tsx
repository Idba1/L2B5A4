import { Outlet } from "react-router"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1 mt-16">
        <div className="max-w-7xl mx-auto w-full px-4 py-6">
          <Outlet />
        </div>
      </main>

      {/* Sticky Footer */}
      <Footer />
    </div>
  )
}

export default App
