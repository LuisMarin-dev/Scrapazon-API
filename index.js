const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

const generateScrapeUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/', (request, res) => {
    res.send('Welcome to Scrapazon API');
});

// GET Product Details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { api_key} = req.query;

    try {
        const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);

        // PARSE THE DATA JSON
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});


// GET Product Reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { api_key} = req.query;

    try {
        const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);

        // PARSE THE DATA JSON
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// GET Product Offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { api_key} = req.query;

    try {
        const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);

        // PARSE THE DATA JSON
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// GET Product Search Results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { api_key} = req.query;

    try {
        const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`);

        // PARSE THE DATA JSON
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));