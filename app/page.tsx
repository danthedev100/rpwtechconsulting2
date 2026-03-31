import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { WhyRPW } from '@/components/WhyRPW'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <WhyRPW />
    </main>
  )
}
