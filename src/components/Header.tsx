'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Wine, Moon, Sun } from 'lucide-react'
import gsap from 'gsap'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/health', label: 'Health' },
  { href: '/services', label: 'Services' },
  { href: '/ingredients', label: 'Mix Builder' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.mobile-nav-link',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.3, ease: 'power2.out' }
      )
    }
  }, [isOpen])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-dark py-3 shadow-glass'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Wine className="w-8 h-8 text-wine-primary transition-transform group-hover:rotate-12" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-wine-cream rounded-full animate-pulse" />
            </div>
            <span className="font-serif text-2xl text-wine-cream tracking-wider">
              Añuri
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-wine-cream/80 hover:text-wine-primary transition-colors text-sm uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-glass bg-wine-accent/30 text-wine-cream hover:bg-wine-primary/20 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* CTA Button */}
            <Link
              href="/ingredients"
              className="hidden md:block wine-btn text-sm"
            >
              Start Mixing
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-wine-cream hover:text-wine-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 glass-dark overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="mobile-nav-link text-wine-cream/80 hover:text-wine-primary transition-colors text-lg py-2 border-b border-wine-accent/20"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/ingredients"
              onClick={() => setIsOpen(false)}
              className="wine-btn text-center mt-4"
            >
              Start Mixing
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
