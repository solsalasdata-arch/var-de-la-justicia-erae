import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Prologue from './components/Prologue'
import CaseSimulator from './components/CaseSimulator'
import Erae from './components/Erae'
import Authors from './components/Authors'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Prologue />
        <CaseSimulator />
        <Erae />
        <Authors />
      </main>
      <Footer />
    </>
  )
}
