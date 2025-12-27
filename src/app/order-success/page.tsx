'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Wine, ArrowRight } from 'lucide-react'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    // You can verify the session with Stripe here if needed
    if (sessionId) {
      setIsVerified(true)
    }
  }, [sessionId])

  return (
    <div className="pt-24 pb-20 px-6 min-h-screen flex items-center justify-center">
      <div className="container mx-auto max-w-2xl">
        <div className="glass p-12 text-center">
          {/* Success Icon */}
          <div className="relative inline-flex items-center justify-center mb-8">
            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
            <div className="relative bg-green-500/20 rounded-full p-6">
              <CheckCircle className="w-16 h-16 text-green-400" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="font-serif text-4xl md:text-5xl text-wine-cream mb-4">
            Order Confirmed! 🎉
          </h1>
          <p className="text-wine-cream/70 text-lg mb-8 max-w-md mx-auto">
            Thank you for your order! Your custom mix is being prepared with care. 
            We&apos;ll send you a confirmation email shortly.
          </p>

          {/* Order Details */}
          <div className="bg-wine-accent/20 rounded-glass p-6 mb-8">
            <div className="flex items-center justify-center gap-2 text-wine-primary mb-2">
              <Wine className="w-5 h-5" />
              <span className="font-serif text-lg">What&apos;s Next?</span>
            </div>
            <p className="text-wine-cream/60 text-sm">
              Our team will reach out to you within 24 hours to confirm your order details 
              and arrange delivery or pickup.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ingredients"
              className="wine-btn flex items-center justify-center gap-2"
            >
              <Wine className="w-4 h-4" />
              Create Another Mix
            </Link>
            <Link
              href="/"
              className="py-3 px-6 rounded-glass border border-wine-cream/20 text-wine-cream/70 hover:bg-wine-cream/5 transition-colors flex items-center justify-center gap-2"
            >
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
