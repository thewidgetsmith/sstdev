import Stripe from 'stripe'
import handler from '../utils/handler'
import { calculateCost } from '../utils/billing'

export const main = handler(async (event) => {
  const { storage, source } = JSON.parse(event.body)
  const amount = calculateCost(storage)
  const description = 'Scratch charge'

  // Load our secret key from the environment variables
  const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY || '',
    {
      apiVersion: '2022-08-01'
    }
  )

  await stripe.charges.create({
    amount,
    description,
    source,
    currency: 'usd'
  })

  return { status: true }
})
