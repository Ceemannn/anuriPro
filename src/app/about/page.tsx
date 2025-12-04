'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Target, Eye, Heart, Award, Users, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const team = [
  {
    name: "Odera Uzodinma",
    role: "Founder & Head Mixologist",
    bio: "With years of experience in premium cocktail crafting, Odera founded Añuri to bring artisanal wine mixing to every celebration.",
    image: "🍷"
  },
  {
    name: "Marcus Chen",
    role: "Creative Director",
    bio: "Marcus brings a unique artistic vision to every event, ensuring each experience is visually stunning and memorable.",
    image: "🎨"
  },
  {
    name: "Sofia Williams",
    role: "Health & Wellness Advisor",
    bio: "As a certified nutritionist, Sofia helps clients enjoy their beverages mindfully while tracking calories and wellness.",
    image: "💚"
  }
]

const values = [
  { icon: Heart, title: "Passion", desc: "Every drink is crafted with love and dedication" },
  { icon: Award, title: "Quality", desc: "Only the finest ingredients make it to your glass" },
  { icon: Users, title: "Connection", desc: "Creating moments that bring people together" },
  { icon: Sparkles, title: "Innovation", desc: "Constantly exploring new flavors and techniques" },
]

const founder = team[0]

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate sections on scroll
    gsap.utils.toArray('.animate-section').forEach((section: any) => {
      gsap.fromTo(section,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          }
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative px-6 py-20 text-center">
        <div className="container mx-auto max-w-4xl">
          <span className="text-wine-primary text-sm uppercase tracking-widest">Our Story</span>
          <h1 className="font-serif text-5xl md:text-7xl text-wine-cream mt-4 mb-6">
            About <span className="text-wine-gradient">Añuri</span>
          </h1>
          <p className="text-wine-cream/70 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Born from a passion for exceptional beverages and unforgettable experiences, 
            Añuri brings the art of wine mixing to your most cherished celebrations.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-10 animate-float">🍇</div>
        <div className="absolute bottom-10 right-10 text-5xl opacity-10 animate-float" style={{ animationDelay: '1s' }}>🍷</div>
      </section>

      {/* Mission & Vision */}
      <section className="px-6 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="animate-section glass p-8 md:p-12">
              <div className="w-16 h-16 rounded-full bg-wine-primary/20 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-wine-primary" />
              </div>
              <h2 className="font-serif text-3xl text-wine-cream mb-4">Our Mission</h2>
              <p className="text-wine-cream/70 leading-relaxed text-lg">
                &ldquo;Crafting unique mocktails and cocktails that spark joy and connection.&rdquo;
              </p>
              <p className="text-wine-cream/60 mt-4">
                We believe every gathering deserves exceptional beverages that bring people together, 
                creating memories that last long after the last sip.
              </p>
            </div>

            {/* Vision */}
            <div className="animate-section glass p-8 md:p-12">
              <div className="w-16 h-16 rounded-full bg-wine-primary/20 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-wine-primary" />
              </div>
              <h2 className="font-serif text-3xl text-wine-cream mb-4">Our Vision</h2>
              <p className="text-wine-cream/70 leading-relaxed text-lg">
                &ldquo;To make every sip a story.&rdquo;
              </p>
              <p className="text-wine-cream/60 mt-4">
                We envision a world where every event, big or small, is elevated by the perfect drink — 
                crafted with care, served with style, and enjoyed mindfully.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="px-6 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-section">
            <h2 className="font-serif text-4xl text-wine-cream mb-4">Our Values</h2>
            <p className="text-wine-cream/60 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div key={i} className="animate-section glass p-6 text-center hover:shadow-glass-hover transition-all duration-300">
                <div className="w-14 h-14 mx-auto rounded-full bg-wine-primary/20 flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-wine-primary" />
                </div>
                <h3 className="font-serif text-xl text-wine-cream mb-2">{value.title}</h3>
                <p className="text-wine-cream/60 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Highlight */}
      <section className="px-6 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="animate-section glass-light p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-serif text-4xl text-wine-cream mb-4">
                  Events We Serve
                </h2>
                <p className="text-wine-cream/70 mb-6">
                  From intimate gatherings to grand celebrations, we bring the perfect blend to every occasion.
                </p>
                <ul className="space-y-3">
                  {['Weddings & Receptions', 'Corporate Events', 'Private Parties', 'Birthday Celebrations', 'Custom Orders'].map((service, i) => (
                    <li key={i} className="flex items-center gap-3 text-wine-cream/80">
                      <span className="w-2 h-2 rounded-full bg-wine-primary" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative flex justify-center">
                <div className="relative w-full max-w-md rounded-glass overflow-hidden shadow-2xl border border-white/10">
                  <Image
                    src="/about/events-collage.jpg"
                    alt="Guests enjoying weddings, birthdays, corporate events, and wine gifting"
                    width={1024}
                    height={576}
                    className="w-full h-auto object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="px-6 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-section">
            <h2 className="font-serif text-4xl text-wine-cream mb-4">Meet the Founder</h2>
            <p className="text-wine-cream/60 max-w-2xl mx-auto">
              The vision and story behind Añuri
            </p>
          </div>

          <div className="animate-section glass p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
            {/* Founder photo */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm rounded-glass overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src="/about/founder-odera.jpg"
                  alt="Portrait of Odera Uzodinma, Founder of Añuri"
                  width={800}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Founder details & story */}
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-2xl md:text-3xl text-wine-cream mb-1">{founder.name}</h3>
                <p className="text-wine-primary text-sm uppercase tracking-wider mb-3">{founder.role}</p>
                <p className="text-wine-cream/70 text-sm md:text-base">{founder.bio}</p>
              </div>

              <div className="space-y-3 text-wine-cream/65 text-sm md:text-base leading-relaxed">
                <p>
                  Añuri began as a passion project in Odera&apos;s small kitchen, where late-night
                  experiments turned simple ingredients into memorable experiences for friends and family.
                </p>
                <p>
                  What started as handcrafted drinks for intimate gatherings quickly grew into a
                  full-service experience brand, built on the belief that every event deserves a
                  signature story in a glass. Today, Añuri blends creativity, craftsmanship, and
                  hospitality to bring that same feeling to weddings, corporate events, and celebrations
                  across the UK.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16">
        <div className="container mx-auto max-w-4xl">
          <div className="animate-section text-center glass p-12">
            <h2 className="font-serif text-4xl text-wine-cream mb-4">
              Ready to Create Something Special?
            </h2>
            <p className="text-wine-cream/60 mb-8 max-w-2xl mx-auto">
              Let us bring the art of wine mixing to your next event.
            </p>
            <a href="/contact" className="wine-btn inline-block">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
