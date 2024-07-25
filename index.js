const express = require('express');
const cors = require('cors');
const fetch = require('cross-fetch');

const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());

// For homePage API
app.get('/api/homePage', async (req, res) => {
    const { lat, lng } = req.query;

    const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`;

    await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('An error occurred');
        });
});


// For Menu API
app.get('/api/menu', async (req, res) => {
    const { 'page-type': page_type, 'complete-menu': complete_menu, lat, lng, submitAction, restaurantId } = req.query;
    
    const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`;


    await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'

        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('An error occurred');
        });
});


// // For categoryPage API
app.get('/api/categoryPage', async (req, res) => {
  const { lat, lng, collectionId, searchContext } = req.query;

  const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&collection=${collectionId}&tags=layout_CCS_${searchContext}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`;

  await fetch(url, {
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
  })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          res.json(data);
      })
      .catch(error => {
          console.error(error);
          res.status(500).send('An error occurred');
      });
});

// For suggested places based on search
app.get('/api/suggestedPlaces', async (req, res) => {
  const { value } = req.query;

  const url = `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${value}&types=`;
  console.log(url);

  await fetch(url, {
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
  })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          res.json(data);
      })
      .catch(error => {
          console.error(error);
          res.status(500).send('An error occurred');
      });
});

// For place Information

app.get('/api/locationInfo', async (req, res) => {
  const { placeId } = req.query;

  const url = `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${placeId}`;
  console.log(url);
  console.log(url);

  await fetch(url, {
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
  })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          res.json(data);
      })
      .catch(error => {
          console.error(error);
          res.status(500).send('An error occurred');
      });
});




app.get('/', (req, res) => {
    res.json({ "test": "Welcome to dineDash! - Order Now and get your food " });
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});