import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Prologue from './components/Prologue'
import CaseSimulator from './components/CaseSimulator'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Prologue />
        <CaseSimulator />
      </main>
    </>
  )
}
