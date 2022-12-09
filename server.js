// sk_test_51M8bTIHk8AyJfOFBpC3ypSGRAfjlfA9J6DZcPYJYEIZfMskzP6fHbEJmjXSGFa4pAQLG71m2Czf4mJ86KGIqZcjc00dFCsAUUV
// Coffee: price_1MCBubHk8AyJfOFB014bauNA
// Sunglasses: price_1MCBxqHk8AyJfOFBbunZhiUR
// Camera: price_1MCBzLHk8AyJfOFBg2ZbEAxC

const express = require('express');
var cors = require('cors');
const stripe = require('stripe')('sk_test_51M8bTIHk8AyJfOFBpC3ypSGRAfjlfA9J6DZcPYJYEIZfMskzP6fHbEJmjXSGFa4pAQLG71m2Czf4mJ86KGIqZcjc00dFCsAUUV');


const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post('/checkout', async (req, res) => {
    /*
    req.body.items
    [
        {
            id: 1,
            quantity: 3
        }
    ]

    stripe wants
    [
        {
            price: 1,
            quantity: 3
        }
    ]
    */
    const items = req.body.items;
    let lineItems =[];
    items.forEach((item) => {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));
});

app.listen(4000, () => console.log('listening on Port 4000!'))