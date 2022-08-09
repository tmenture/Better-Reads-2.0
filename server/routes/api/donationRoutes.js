const cors = require("cors");
const express = require("express");
const stripe = require("stripe")("sk_test_51LUOIkDGthnbVTIg1aa7x1SklhdiwtIOYU8WrkIKb30KCjpEeoQbie1bwGDnEuQjq96v8RsmGyWLeI3nZltZDBTz00CusFdo1F");
const uuid = require("uuid/v4");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/checkout", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`
      },
      {
        idempotency_key
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

app.listen(3001);
