'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Wine, Sparkles, ChevronDown, ArrowRight, Star, Calendar, Users, Utensils } from 'lucide-react'
import InteractiveBottle from '@/components/InteractiveBottle'
import MixOfTheWeek from '@/components/MixOfTheWeek'
import WineFactsMarquee from '@/components/WineFactsMarquee'

gsap.registerPlugin(ScrollTrigger)

const wineFacts = [
  {
    front: "Did you know?",
    back: "Red wine contains antioxidants that may benefit heart health.",
    icon: <Wine className="w-10 h-10 text-wine-primary" />,
  },
  {
    front: "Fun Fact",
    back: "Mocktails can be just as aromatic as cocktails — it's all in the garnish.",
    icon: <Sparkles className="w-10 h-10 text-wine-primary" />,
  },
  {
    front: "History",
    back: "The world's oldest wine dates back to 7000 BC!",
    icon: <Calendar className="w-10 h-10 text-wine-primary" />,
  },
  {
    front: "Wellness",
    back: "A glass of wine contains about 125 calories — enjoy mindfully!",
    icon: <Star className="w-10 h-10 text-wine-primary" />,
  },
]

const services = [
  { icon: Calendar, title: "Weddings", desc: "Make your special day unforgettable" },
  { icon: Users, title: "Corporate Events", desc: "Professional mixology services" },
  { icon: Sparkles, title: "Private Parties", desc: "Exclusive cocktail experiences" },
  { icon: Utensils, title: "Custom Orders", desc: "Tailored drinks for any occasion" },
]

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    // Hero animations
    const heroTl = gsap.timeline()
    heroTl
      .fromTo('.hero-title', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
      )
      .fromTo('.hero-tagline',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo('.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.hero-scroll',
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      )

    // Floating grapes animation
    gsap.to('.floating-grape', {
      y: -20,
      rotation: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.5
    })

    // Scroll-triggered section animations
    sectionRefs.current.forEach((section) => {
      if (!section) return
      
      gsap.fromTo(section.querySelectorAll('.animate-in'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    // Parallax effect for decorative elements
    gsap.to('.parallax-element', {
      y: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el)
    }
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6"
      >
        {/* Decorative grapes
        <div className="floating-grape absolute top-20 left-10 text-6xl opacity-20 select-none">🍇</div>
        <div className="floating-grape absolute top-40 right-20 text-4xl opacity-15 select-none">🍇</div>
        <div className="floating-grape absolute bottom-40 left-1/4 text-5xl opacity-10 select-none">🍇</div> */}
        
        {/* Interactive Wine Bottle */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block parallax-element">
          <InteractiveBottle />
        </div>

        <div className="text-center max-w-4xl mx-auto relative z-10">
          {/* Logo/Icon */}
          <div className="hero-cta mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
            <Sparkles className="w-4 h-4 text-wine-primary" />
            <span className="text-wine-cream/80 text-sm">Premium Cocktail & Mocktail Mixing Experience</span>
          </div>

          {/* Main Title */}
          <h1 className="hero-title font-serif text-6xl md:text-8xl lg:text-9xl text-wine-cream mb-6 tracking-tight">
            <span className="text-wine-gradient">Añuri</span>
          </h1>

          {/* Tagline */}
          <p className="hero-tagline text-xl md:text-2xl text-wine-cream/70 mb-10 font-light tracking-wide">
            Where art meets flavor in every pour.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/ingredients" className="wine-btn text-lg px-8 py-4 flex items-center gap-2 group">
              <Wine className="w-5 h-5" />
              Start Mixing
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/services" 
              className="px-8 py-4 text-wine-cream/80 border border-wine-cream/20 rounded-glass hover:bg-wine-cream/5 transition-colors flex items-center gap-2"
            >
              Explore Services
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-wine-cream/50 text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5 text-wine-cream/50" />
        </div>
      </section>

      {/* Mix of the Week Section */}
      <section ref={addToRefs} className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-in">
            <h2 className="font-serif text-4xl md:text-5xl text-wine-cream mb-4">
              Mix of the Week
            </h2>
            <p className="text-wine-cream/60 max-w-2xl mx-auto">
              Discover our featured blend, crafted with passion and precision
            </p>
          </div>
          <MixOfTheWeek />
        </div>
      </section>

      {/* Did You Know Section */}
      <section ref={addToRefs} className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-in">
            <h2 className="font-serif text-4xl md:text-5xl text-wine-cream mb-4">
              Did You Know?
            </h2>
            <p className="text-wine-cream/60">
              Hover over the cards to discover fascinating wine facts
            </p>
          </div>
        </div>

        {/* Marquee extends full width */}
        <div className="animate-in">
          <WineFactsMarquee facts={wineFacts} />
        </div>

        {/* Decorative wine splash */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-wine-primary/10 rounded-full blur-3xl" />
      </section>

      {/* Services Preview */}
      <section ref={addToRefs} className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-in">
            <h2 className="font-serif text-4xl md:text-5xl text-wine-cream mb-4">
              Our Services
            </h2>
            <p className="text-wine-cream/60 max-w-2xl mx-auto">
              From intimate gatherings to grand celebrations, we bring the perfect blend to every occasion
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="animate-in glass p-6 text-center group hover:shadow-glass-hover transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-wine-primary/20 flex items-center justify-center group-hover:bg-wine-primary/30 transition-colors">
                  <service.icon className="w-8 h-8 text-wine-primary" />
                </div>
                <h3 className="font-serif text-xl text-wine-cream mb-2">{service.title}</h3>
                <p className="text-wine-cream/60 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 animate-in">
            <Link href="/services" className="wine-btn inline-flex items-center gap-2">
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={addToRefs} className="py-20 px-6 relative">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-in">
            <h2 className="font-serif text-4xl md:text-5xl text-wine-cream mb-4">
              What People Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Sarah Mitchell", role: "Wedding Client", text: "Añuri made our wedding reception absolutely magical. The custom cocktails were a huge hit!" },
              { name: "James Chen", role: "Corporate Event Manager", text: "Professional, creative, and always on point. They've become our go-to for company events." },
              { name: "Elena Rodriguez", role: "Private Party Host", text: "The mixologists are true artists. Every drink was a conversation starter!" },
            ].map((testimonial, index) => (
              <div key={index} className="animate-in glass p-6 relative">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-wine-primary fill-wine-primary" />
                  ))}
                </div>
                <p className="text-wine-cream/80 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-wine-primary/30 flex items-center justify-center">
                    <span className="text-wine-cream font-serif">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-wine-cream font-medium text-sm">{testimonial.name}</p>
                    <p className="text-wine-cream/50 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={addToRefs} className="py-20 px-6">
        <div className="container mx-auto">
          <div className="glass-light p-12 md:p-16 text-center relative overflow-hidden animate-in">
            <div className="relative z-10">
              <h2 className="font-serif text-4xl md:text-5xl text-wine-cream mb-4">
                Ready to Create Your Perfect Mix?
              </h2>
              <p className="text-wine-cream/70 mb-8 max-w-2xl mx-auto">
                Whether you&apos;re planning an event or just curious about our craft, we&apos;d love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/ingredients" className="wine-btn text-lg px-8 py-4 flex items-center gap-2">
                  <Wine className="w-5 h-5" />
                  Try Mix Builder
                </Link>
                <Link href="/contact" className="px-8 py-4 text-wine-cream border border-wine-cream/30 rounded-glass hover:bg-wine-cream/10 transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-wine-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-wine-secondary/20 rounded-full blur-3xl" />
          </div>
        </div>
      </section>
    </div>
  )
}
