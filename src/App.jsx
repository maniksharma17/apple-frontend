import Hero from "./components/Hero"
import Highlights from "./components/Highlights"
import Navbar from "./components/Navbar" 
import Model from "./components/Model"
import Features from "./components/Features"
import HowItWorks from "./components/HowItWorks"
import Footer from "./components/Footer"

function App() {
  return (
    <main className="bg-black">
      <div className="flex justify-center py-2 text-xs text-gray font-semibold">
        <p>
          DEVELOPED BY {' '}
          <span className="underline text-blue">MANIK SHARMA
          </span>
        </p>
      </div>
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  )
}

export default App
