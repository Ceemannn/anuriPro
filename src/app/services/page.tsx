'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Heart, Briefcase, PartyPopper, Gift, Sparkles, ArrowRight, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 'weddings',
    icon: Heart,
    title: 'Weddings',
    tagline: 'Make your special day unforgettable',
    description: 'From intimate ceremonies to grand receptions, we craft bespoke cocktail and mocktail menus that complement your love story.',
    features: ['Custom cocktail menu design', 'On-site professional mixologists', 'Elegant bar setup & decor', 'Non-alcoholic options for all guests', 'Signature drink creation'],
    image: '/services/weddings.jpg',
    color: 'from-pink-500/20 to-rose-500/20',
  },
  {
    id: 'corporate',
    icon: Briefcase,
    title: 'Corporate Events',
    tagline: 'Professional mixology for business',
    description: 'Elevate your corporate gatherings with sophisticated beverage services that leave a lasting impression on clients and colleagues.',
    features: ['Brand-themed cocktails', 'Professional service staff', 'Team building cocktail workshops', 'Conference & meeting refreshments', 'Executive lounge setups'],
    image: '/services/corporate.jpg',
    color: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    id: 'birthdays',
    icon: PartyPopper,
    title: 'Birthday Parties',
    tagline: 'Celebrate in style',
    description: 'Make birthdays memorable with fun, creative drinks tailored to the guest of honor\'s preferences and party theme.',
    features: ['Age-appropriate mocktails', 'Theme-based drink designs', 'Interactive mixing stations', 'Party favor cocktail kits', 'Custom garnish bars'],
    image: '/services/birthdays.jpg',
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    id: 'custom',
    icon: Gift,
    title: 'Custom Orders',
    tagline: 'Tailored to your vision',
    description: 'Have a unique event in mind? We work with you to create completely customized beverage experiences for any occasion.',
    features: ['Personalized menu consultation', 'Unique flavor combinations', 'Special dietary accommodations', 'Branded drink accessories', 'Event planning support'],
    image: '/services/custom.jpg',
    color: 'from-amber-500/20 to-orange-500/20',
  },
]

const packages = [
  {
    name: 'Basic',
    price: '£3.3/drink',
    description: 'Ideal for small parties, booklaunch, private events',
    features: ['£290 (including VAT)' ,'1-30 guests', '1 bartender', 'No welcome wine', 'Self service station', '2 Anuri signature mocktails and classics', 'No custom mocktail creation', 'Fresh garnishes', 'No unlimited drinks'],
    popular: false,
  },
  {
    name: 'Standard',
    price: '£4.9/drink',
    description: 'Ideal for weddings, private events, parties',
    features: ['£390 (including VAT)', '31-80 guests', '1 bartender per 30 guests', 'Welcome wine', 'Self service station', '4 Anuri signature mocktails and classics', 'No custom mocktail creation', 'Premium garnishes (edible flowers)', 'Plus £150 for unlimited drinks'],
    popular: true,
  },
  {
    name: 'Premium',
    price: '£6.8/drink',
    description: 'Ideal for weddings, luxurious dinners',
    features: ['£682.5 (including VAT)', '>81 guests', '1 bartender per 30 guests', 'Welcome wine', 'Self service station', 'All Anuri Signature mocktails and classics', 'Custom mocktail creation using only seasonal fruits upon clients requests', 'Premium garnishes (e.g edible flowers)', 'Plus £200 for unlimited drinks'],
    popular: false,
  },
]

export default function ServicesPage() {
  useEffect(() => {
    gsap.utils.toArray('.service-card').forEach((card: any, i) => {
      gsap.fromTo(card,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
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
      {/* Hero */}
      <section className="px-6 py-20 text-center">
        <div className="container mx-auto max-w-4xl">
          <span className="text-wine-primary text-sm uppercase tracking-widest">What We Offer</span>
          <h1 className="font-serif text-5xl md:text-7xl text-wine-cream mt-4 mb-6">
            Our <span className="text-wine-gradient">Services</span>
          </h1>
          <p className="text-wine-cream/60 text-lg max-w-2xl mx-auto">
            From weddings to corporate events, we bring exceptional beverage experiences to every celebration.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`service-card grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Image/Icon side */}
                <div className={`relative ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div
                    className={`relative aspect-square rounded-glass glass overflow-hidden bg-gradient-to-br ${service.color}`}
                  >
                    {/* Service photo */}
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Subtle overlay for readability and depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-wine-primary/20 flex items-center justify-center">
                    <service.icon className="w-10 h-10 text-wine-primary" />
                  </div>
                </div>

                {/* Content side */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div>
                    <span className="text-wine-primary text-sm uppercase tracking-widest">{service.tagline}</span>
                    <h2 className="font-serif text-4xl text-wine-cream mt-2">{service.title}</h2>
                  </div>
                  <p className="text-wine-cream/70 text-lg">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-wine-cream/70">
                        <Check className="w-5 h-5 text-wine-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href={`/contact?service=${service.id}`}
                    className="wine-btn inline-flex items-center gap-2"
                  >
                    Book This Service
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="px-6 py-20 mt-12">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-wine-primary text-sm uppercase tracking-widest">Pricing</span>
            <h2 className="font-serif text-4xl md:text-5xl text-wine-cream mt-4 mb-4">
              Event Packages
            </h2>
            <p className="text-wine-cream/60 max-w-2xl mx-auto">
              Choose a package that fits your event, or contact us for a custom quote.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <div 
                key={i} 
                className={`glass p-8 relative ${pkg.popular ? 'ring-2 ring-wine-primary' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-wine-primary text-white text-sm rounded-full flex items-center gap-1">
                    <Sparkles className="w-4 h-4" /> Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="font-serif text-2xl text-wine-cream mb-2">{pkg.name}</h3>
                  <p className="text-wine-primary text-3xl font-bold">{pkg.price}</p>
                  <p className="text-wine-cream/50 text-sm mt-2">{pkg.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-wine-cream/70 text-sm">
                      <Check className="w-4 h-4 text-wine-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/contact"
                  className={`block text-center py-3 rounded-glass transition-all ${
                    pkg.popular 
                      ? 'wine-btn' 
                      : 'border border-wine-cream/20 text-wine-cream hover:bg-wine-cream/5'
                  }`}
                >
                  Get Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-12">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-light p-12 text-center">
            <h2 className="font-serif text-4xl text-wine-cream mb-4">
              Ready to Plan Your Event?
            </h2>
            <p className="text-wine-cream/60 mb-8 max-w-2xl mx-auto">
              Let&apos;s create something extraordinary together. Contact us for a personalized consultation.
            </p>
            <Link href="/contact" className="wine-btn inline-flex items-center gap-2 text-lg px-8 py-4">
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
