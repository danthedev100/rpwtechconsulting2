import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { StandardsStrip } from '@/components/StandardsStrip'
import { Services } from '@/components/Services'
import { Approach } from '@/components/Approach'
import { Sectors } from '@/components/Sectors'
import { WhyRPW } from '@/components/WhyRPW'
import { About } from '@/components/About'
import { FAQ } from '@/components/FAQ'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { BackToTop } from '@/components/BackToTop'
import { JsonLd } from '@/components/JsonLd'
import { FAQS } from '@/lib/faq'

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <Nav />
      <main id="main">
        <Hero />
        <StandardsStrip />
        <Services />
        <Approach />
        <Sectors />
        <WhyRPW />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
