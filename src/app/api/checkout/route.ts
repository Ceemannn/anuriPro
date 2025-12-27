import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// Package pricing configuration (amounts in pence)
const packages = {
  basic: {
    name: 'Basic Package',
    price: 29000, // £290.00
    description: 'Ideal for small parties, booklaunch, private events. 1-30 guests, 1 bartender, 2 Anuri signature mocktails and classics.',
  },
  standard: {
    name: 'Standard Package',
    price: 39000, // £390.00
    description: 'Ideal for weddings, private events, parties. 31-80 guests, 1 bartender per 30 guests, Welcome wine, 4 Anuri signature mocktails.',
  },
  premium: {
    name: 'Premium Package',
    price: 68250, // £682.50
    description: 'Ideal for weddings, luxurious dinners. 81+ guests, 1 bartender per 30 guests, All Anuri Signature mocktails, Custom mocktail creation.',
  },
}

interface CheckoutData {
  mixName?: string
  ingredients?: string[]
  totalCalories?: number
  packageType?: 'basic' | 'standard' | 'premium'
  customerEmail?: string
}

export async function POST(request: NextRequest) {
  try {
    const data: CheckoutData = await request.json()

    // Handle package checkout (from email links)
    if (data.packageType && packages[data.packageType]) {
      const pkg = packages[data.packageType]
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'gbp',
              product_data: {
                name: pkg.name,
                description: pkg.description,
              },
              unit_amount: pkg.price,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://anurigroup.com'}/order-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://anurigroup.com'}/services`,
        customer_email: data.customerEmail || undefined,
        metadata: {
          packageType: data.packageType,
          packageName: pkg.name,
        },
      })

      return NextResponse.json({ url: session.url })
    }

    // Handle custom mix checkout (from mix builder)
    if (!data.mixName || !data.ingredients || data.ingredients.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const ingredientsList = data.ingredients.join(', ')
    const description = `Custom Mix: ${data.mixName} - Ingredients: ${ingredientsList} (${data.totalCalories} calories)`

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: data.mixName || 'Custom Mix',
              description: description,
            },
            unit_amount: 2500, // £25.00 in pence - adjust this to your actual price
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://anurigroup.com'}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://anurigroup.com'}/ingredients`,
      metadata: {
        mixName: data.mixName,
        ingredients: ingredientsList,
        totalCalories: data.totalCalories?.toString() || '0',
      },
    })

    return NextResponse.json({ url: session.url })

  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session. Please try again later.' },
      { status: 500 }
    )
  }
}

// GET handler for email checkout links
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const packageType = searchParams.get('package') as 'basic' | 'standard' | 'premium' | null
    const customerEmail = searchParams.get('email') || undefined

    if (!packageType || !packages[packageType]) {
      return NextResponse.redirect(new URL('/services', process.env.NEXT_PUBLIC_BASE_URL || 'https://anurigroup.com'))
    }

    const pkg = packages[packageType]

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: pkg.name,
              description: pkg.description,
            },
            unit_amount: pkg.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://anurigroup.com'}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://anurigroup.com'}/services`,
      customer_email: customerEmail,
      metadata: {
        packageType: packageType,
        packageName: pkg.name,
      },
    })

    // Redirect directly to Stripe checkout
    return NextResponse.redirect(session.url!)

  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.redirect(new URL('/services', process.env.NEXT_PUBLIC_BASE_URL || 'https://anurigroup.com'))
  }
}
