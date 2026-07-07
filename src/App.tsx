import Hero from './components/Hero.tsx'
import Highlights from './components/Highlights.tsx'
import CiLab from './components/CiLab.tsx'
import Spotlight from './components/Spotlight.tsx'
import Projects from './components/Projects.tsx'
import About from './components/About.tsx'
import Footer from './components/Footer.tsx'
import ThemeToggle from './components/ThemeToggle.tsx'

export default function App() {
  return (
    <>
      <ThemeToggle />
      <Hero />
      <main>
        <Highlights />
        <CiLab />
        <Spotlight />
        <Projects />
        <About />
      </main>
      <Footer />
    </>
  )
}
