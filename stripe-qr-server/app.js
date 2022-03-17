require("dotenv").config();
const express = require("express");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const cors = require("cors");
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use("/stripe", express.raw({ type: "*/*" }));

app.get('/', (req,res) => {
  res.send({
      "name": "Pratik sharma", 
      "id": "1", 
      "transactionId": "sldkfmdsf", 
  })
})

app.get('/products', async (req,res) => {
  const products = await stripe.products.list({
    active: true, 
    limit: 2, 
  })
  return res.json(products.data);
})

app.get('/config', (req, res) => {
  res.json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  })
})


app.get('/get-checkout-session', async (req, res) => {
    const {id} = req.query;

    const session = await stripe.checkout.sessions.retrieve(
      id,
      {expand: ['payment_intent']}
    )
    res.json(session);
})


app.post('/create-checkout-session', async (req, res) => {

  const { token, quantity} = req.query
  
  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.DOMAIN}/success?session_id=${id}&token=${token}`, 
    cancel_url: `${process.env.DOMAIN}/cancel`, 
    payment_method_types: ['card'],
    line_items: [{
      price: process.env.PRICE_BLACK_COFFEE,
      quantity: quantity,
    }], 
    mode: 'payment'
  })

  res.json({id: session.id})
})

app.post("/donate", async (req, res) => {
    try {
      // Getting data from client
      let { amount, name } = req.body;
      // Simple validation
      if (!amount || !name)
        return res.status(400).json({ message: "All fields are required" });
      amount = parseInt(amount);
      // Initiate payment
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: "INR",
        payment_method_types: ["card"],
        metadata: { name },
      });
      // Extracting the client secret 
      const clientSecret = paymentIntent.client_secret;
      // Sending the client secret as response
      res.json({ message: "Payment initiated", clientSecret });
    } catch (err) {
      // Catch any error and send error 500 to client
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

app.post("/stripe", async (req, res) => {
    // Get the signature from the headers
    const sig = req.headers["stripe-signature"];
    let event;
    try {
      // Check if the event is sent from Stripe or a third party
      // And parse the event
      event = await stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      // Handle what happens if the event is not from Stripe
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
    // Event when a payment is initiated
    if (event.type === "payment_intent.created") {
      console.log(`${event.data.object.metadata.name} initated payment!`);
    }
    // Event when a payment is succeeded
    if (event.type === "payment_intent.succeeded") {
      console.log(`${event.data.object.metadata.name} succeeded payment!`);
      // fulfilment
    }
    res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));