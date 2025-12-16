'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Mail, Phone, MapPin, Send, Instagram, MessageCircle, Calendar, Users, CheckCircle } from 'lucide-react'

const eventTypes = [
  'Wedding',
  'Corporate Event',
  'Birthday Party',
  'Private Party',
  'Custom Order',
  'Other'
]

export default function ContactPage() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    message: '',
    savedMix: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dateError, setDateError] = useState<string | null>(null)

  // Load savedMix from URL params (from Order button on mix builder)
  useEffect(() => {
    const savedMixParam = searchParams.get('savedMix')
    if (savedMixParam) {
      setFormData(prev => ({
        ...prev,
        savedMix: decodeURIComponent(savedMixParam)
      }))
    }
  }, [searchParams])

  const todayMin = (() => {
    const now = new Date()
    const yyyy = now.getFullYear()
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  })()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
      }

      setIsSubmitted(true)
      
      // Reset form after showing success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          eventDate: '',
          guestCount: '',
          message: '',
          savedMix: ''
        })
        setIsSubmitted(false)
      }, 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target.name === 'eventDate') {
      const value = e.target.value
      if (!value) {
        setDateError(null)
      } else {
        const selected = new Date(`${value}T00:00:00`)
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (selected < today) {
          setDateError('Please choose a future date.')
          setFormData(prev => ({
            ...prev,
            eventDate: ''
          }))
          return
        }
        if (selected.getDay() === 0) {
          setDateError('We do not work on Sundays. Please choose another date.')
          setFormData(prev => ({
            ...prev,
            eventDate: ''
          }))
          return
        }
        setDateError(null)
      }
    }

    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (isSubmitted) {
    return (
      <div className="pt-24 pb-20 px-6 min-h-screen flex items-center justify-center">
        <div className="glass p-12 text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="font-serif text-3xl text-wine-cream mb-4">Message Sent!</h2>
          <p className="text-wine-cream/60">
            Thank you for reaching out. We&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-wine-primary text-sm uppercase tracking-widest">Get in Touch</span>
          <h1 className="font-serif text-5xl md:text-6xl text-wine-cream mt-4 mb-4">
            Contact <span className="text-wine-gradient">Us</span>
          </h1>
          <p className="text-wine-cream/60 max-w-2xl mx-auto">
            Ready to create something special? Let&apos;s discuss your event.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Info Cards */}
            <div className="glass p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-wine-primary/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-wine-primary" />
                </div>
                <div>
                  <h3 className="text-wine-cream font-medium mb-1">Visit Us</h3>
                  <p className="text-wine-cream/60 text-sm">
                    376 Lees Road, Oldham, Greater Manchester, UK
                  </p>
                </div>
              </div>
            </div>

            <div className="glass p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-wine-primary/20 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-wine-primary" />
                </div>
                <div>
                  <h3 className="text-wine-cream font-medium mb-1">Call Us</h3>
                  <a href="tel:+447407025981" className="text-wine-cream/60 text-sm hover:text-wine-primary transition-colors">
                    +44 740-702-5981
                  </a>
                </div>
              </div>
            </div>

            <div className="glass p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-wine-primary/20 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-wine-primary" />
                </div>
                <div>
                  <h3 className="text-wine-cream font-medium mb-1">Email Us</h3>
                  <a href="mailto:hello@anuri.com" className="text-wine-cream/60 text-sm hover:text-wine-primary transition-colors">
                    contact@anurigroup.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass p-6">
              <h3 className="text-wine-cream font-medium mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/anurigroup?igsh=M21id3lpb3JndHV2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-wine-accent/30 flex items-center justify-center text-wine-cream hover:bg-wine-primary/30 hover:text-wine-primary transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/+447407025981"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-wine-accent/30 flex items-center justify-center text-wine-cream hover:bg-wine-primary/30 hover:text-wine-primary transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a
                  href="mailto:contact@anurigroup.com"
                  className="w-12 h-12 rounded-full bg-wine-accent/30 flex items-center justify-center text-wine-cream hover:bg-wine-primary/30 hover:text-wine-primary transition-all"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="glass p-6 aspect-video flex items-center justify-center">
              <div className="text-center text-wine-cream/40">
                <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Interactive Map</p>
                <p className="text-xs">(Coming Soon)</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="glass p-8">
              <h2 className="font-serif text-2xl text-wine-cream mb-6">Book an Event</h2>
              
              {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-glass text-red-300 text-sm">
                  {error}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="text-wine-cream/80 text-sm block mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-wine-accent/20 border border-wine-accent/30 rounded-glass px-4 py-3 text-wine-cream placeholder:text-wine-cream/40 focus:outline-none focus:border-wine-primary transition-colors"
                    placeholder="John Smith"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-wine-cream/80 text-sm block mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-wine-accent/20 border border-wine-accent/30 rounded-glass px-4 py-3 text-wine-cream placeholder:text-wine-cream/40 focus:outline-none focus:border-wine-primary transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-wine-cream/80 text-sm block mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-wine-accent/20 border border-wine-accent/30 rounded-glass px-4 py-3 text-wine-cream placeholder:text-wine-cream/40 focus:outline-none focus:border-wine-primary transition-colors"
                    placeholder="+1 (234) 567-890"
                  />
                </div>

                {/* Event Type */}
                <div>
                  <label className="text-wine-cream/80 text-sm block mb-2">
                    Event Type *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-wine-cream/40" />
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      required
                      className="w-full bg-wine-accent/20 border border-wine-accent/30 rounded-glass pl-12 pr-4 py-3 text-wine-cream appearance-none focus:outline-none focus:border-wine-primary transition-colors"
                    >
                      <option value="" className="bg-wine-dark">Select event type</option>
                      {eventTypes.map(type => (
                        <option key={type} value={type} className="bg-wine-dark">{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Guest Count */}
                <div>
                  <label className="text-wine-cream/80 text-sm block mb-2">
                    Guest Count
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-wine-cream/40" />
                    <input
                      type="number"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleChange}
                      min="1"
                      className="w-full bg-wine-accent/20 border border-wine-accent/30 rounded-glass pl-12 pr-4 py-3 text-wine-cream placeholder:text-wine-cream/40 focus:outline-none focus:border-wine-primary transition-colors"
                      placeholder="50"
                    />
                  </div>
                </div>

                {/* Event Date */}
                <div>
                  <label className="text-wine-cream/80 text-sm block mb-2">Event Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-wine-cream/40" />
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      min={todayMin}
                      className="w-full bg-wine-accent/20 border border-wine-accent/30 rounded-glass pl-12 pr-4 py-3 text-wine-cream focus:outline-none focus:border-wine-primary transition-colors"
                    />
                  </div>
                  {dateError && (
                    <p className="mt-2 text-xs text-red-300">{dateError}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="mt-6">
                <label className="text-wine-cream/80 text-sm block mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-wine-accent/20 border border-wine-accent/30 rounded-glass px-4 py-3 text-wine-cream placeholder:text-wine-cream/40 focus:outline-none focus:border-wine-primary transition-colors resize-none"
                  placeholder="Tell us about your event, any special requirements, drink preferences..."
                />
              </div>

              {/* Saved Mix */}
              <div className="mt-6">
                <label className="text-wine-cream/80 text-sm block mb-2">Attach Saved Mix (Optional)</label>
                <input
                  type="text"
                  name="savedMix"
                  value={formData.savedMix}
                  onChange={handleChange}
                  className="w-full bg-wine-accent/20 border border-wine-accent/30 rounded-glass px-4 py-3 text-wine-cream placeholder:text-wine-cream/40 focus:outline-none focus:border-wine-primary transition-colors"
                  placeholder="Enter your saved mix name or ID"
                />
                <p className="text-wine-cream/40 text-xs mt-2">
                  Created a custom mix? Let us know so we can include it in your event!
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="wine-btn w-full mt-8 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-wine-cream/40 text-xs text-center mt-4">
                We typically respond within 24 hours
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
