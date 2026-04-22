import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Pricing Plans
const PLANS = {
  starter: {
    name: 'Starter',
    price: 499, // $4.99 in cents
    credits: 30,
    priceId: 'price_starter', // Will be replaced with real Stripe Price ID
  },
  pro: {
    name: 'Pro',
    price: 1199, // $11.99 in cents
    credits: 90,
    priceId: 'price_pro',
  },
  elite: {
    name: 'Elite',
    price: 2499, // $24.99 in cents
    credits: 180,
    priceId: 'price_elite',
  },
};

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { plan } = await req.json();
    const selectedPlan = PLANS[plan as keyof typeof PLANS];

    if (!selectedPlan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `VidFlow ${selectedPlan.name} Plan`,
              description: `${selectedPlan.credits} Credits - AI Video Generation`,
              images: [],
            },
            unit_amount: selectedPlan.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        plan,
        credits: selectedPlan.credits.toString(),
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true&plan=${plan}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/#pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
