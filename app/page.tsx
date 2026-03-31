import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { WhyRPW } from '@/components/WhyRPW'
import { About } from '@/components/About'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <WhyRPW />
      <About />
    </main>
  )
}
