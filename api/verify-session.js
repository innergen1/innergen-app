import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ verified: false, error: "Missing session_id" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.status(402).json({ verified: false, error: "Payment not completed" });
    }

    const tier = session.metadata?.tier || "spark";
    const customerName = session.customer_details?.name || "InnerGen Member";
    const customerEmail = session.customer_details?.email || null;

    return res.status(200).json({
      verified: true,
      tier,
      customerName,
      customerEmail,
      sessionId: session.id,
    });

  } catch (err) {
    console.error("verify-session error:", err.message);
    return res.status(400).json({ verified: false, error: "Invalid or expired session" });
  }
}
