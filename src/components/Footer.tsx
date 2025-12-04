'use client'

import Link from 'next/link'
import { Wine, Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react'

const footerLinks = {
  explore: [
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/ingredients', label: 'Mix Builder' },
    { href: '/health', label: 'Health Tools' },
  ],
  services: [
    { href: '/services#weddings', label: 'Weddings' },
    { href: '/services#corporate', label: 'Corporate Events' },
    { href: '/services#private', label: 'Private Parties' },
    { href: '/services#custom', label: 'Custom Orders' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative glass-dark mt-20 overflow-hidden">
      {/* Decorative wine wave */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-wine-secondary via-wine-primary to-wine-secondary" />
      
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Wine className="w-8 h-8 text-wine-primary" />
              <span className="font-serif text-2xl text-wine-cream tracking-wider">
                Añuri
              </span>
            </Link>
            <p className="text-wine-cream/60 text-sm leading-relaxed">
              Where art meets flavor in every pour. Crafting unique mocktails and cocktails 
              that spark joy and connection.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/anurigroup?igsh=M21id3lpb3JndHV2"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-glass bg-wine-accent/30 text-wine-cream hover:bg-wine-primary/30 hover:text-wine-primary transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@anurigroup.com"
                className="p-2 rounded-glass bg-wine-accent/30 text-wine-cream hover:bg-wine-primary/30 hover:text-wine-primary transition-all"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="tel:+447407025981"
                className="p-2 rounded-glass bg-wine-accent/30 text-wine-cream hover:bg-wine-primary/30 hover:text-wine-primary transition-all"
                aria-label="Phone"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-serif text-lg text-wine-cream mb-6">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-wine-cream/60 hover:text-wine-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg text-wine-cream mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-wine-cream/60 hover:text-wine-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg text-wine-cream mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-wine-cream/60 text-sm">
                <MapPin className="w-5 h-5 text-wine-primary shrink-0 mt-0.5" />
                <span>376 Lees Road, Oldham, Greater Manchester, UK</span>
              </li>
              <li className="flex items-center gap-3 text-wine-cream/60 text-sm">
                <Phone className="w-5 h-5 text-wine-primary shrink-0" />
                <a href="tel:+447407025981" className="hover:text-wine-primary transition-colors">
                  +44 740 702 5981
                </a>
              </li>
              <li className="flex items-center gap-3 text-wine-cream/60 text-sm">
                <Mail className="w-5 h-5 text-wine-primary shrink-0" />
                <a href="mailto:contact@anuri.com" className="hover:text-wine-primary transition-colors">
                  contact@anurigroup.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-wine-accent/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-wine-cream/40 text-sm">
            © {new Date().getFullYear()} Añuri. All rights reserved.
          </p>
          <p className="text-wine-cream/40 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-wine-primary" /> for wine lovers
          </p>
        </div>
      </div>

      {/* Decorative grapes
      <div className="absolute -bottom-10 -right-10 text-8xl opacity-10 select-none pointer-events-none">
        🍇
      </div> */}
    </footer>
  )
}
