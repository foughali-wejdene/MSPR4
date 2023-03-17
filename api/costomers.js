const express = require('express');
const axios = require('axios');
const qr = require('qrcode'); // https://www.npmjs.com/package/qrcode
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// https://app.elasticemail.com/ is used for smtp config email
let transporter = nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 2525,
  auth: {
    user: "contact@2tcorp.org",
    pass: "8C94B704D6EBE7797B63E182EDF0615871A0"
  }
});

// endpoint pour la liste des clients
app.get('/customers', async (req, res) => {
  try {
    // appel de l'API pour récupérer la liste des clients
    const response = await axios.get('https://615f5fb4f7254d0017068109.mockapi.io/api/v1/customers');
    const customers = response.data;

    // réponse en JSON
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});


// endpoint pour un client
app.get('/customers/:customerId', async (req, res) => {
  try {
    // appel de l'API pour récupérer la liste des clients
    const response = await axios.get(`https://615f5fb4f7254d0017068109.mockapi.io/api/v1/customers/${customerId}`);
    const customers = response.data;

    // réponse en JSON
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// endpoint pour la liste des produits
app.get('/products', async (req, res) => {
  try {
    // appel de l'API pour récupérer la liste des clients
    const response = await axios.get('https://615f5fb4f7254d0017068109.mockapi.io/api/v1/products');
    const products = response.data;

    // réponse en JSON
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});


// endpoint pour la liste des produits
app.get('/products/:productId', async (req, res) => {
  try {
    // appel de l'API pour récupérer la liste des clients
    const response = await axios.get(`https://615f5fb4f7254d0017068109.mockapi.io/api/v1/products/${productId}`);
    const product = response.data;

    // réponse en JSON
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});


// endpoint pour la liste des clients
app.post('/login', async (req, res) => {
  try {
    let email = req.body.email;
    const response = await axios.get('https://615f5fb4f7254d0017068109.mockapi.io/api/v1/customers');
    const customers = response.data;
    let found = false;
    customers.forEach(client => {
        if (client.email == email) {
          let strData = JSON.stringify(client);
          var opts = {
            errorCorrectionLevel: 'H',
            type: 'image/jpeg',
            quality: 0.3,
            margin: 1,
            color: {
              dark:"#000000",
              light:"#FFF"
            }
          }

          qr.toDataURL(strData, opts, function (err, url) {
              if(err) return console.log("error occurred !!", err);

              var mailOptions = {
                from: 'mouafogatien@gmail.com',
                to: `${client.email}, clarencekamga2@gmail.com`, // Enverra un mail a l'utilisateur puis a un mail fixe (moi)
                subject: 'Email de confirmation',
                html: `<h2>Confirmez votre authentification sur PayeTonKawa</h2>
                <p>Merci de <strong>scanner le QR Code</strong> Suivant pour vous authentifier</p>
                <p><img alt="QR Code" src="${url}" width="200px" height="200px" /></p>
                <p><br/></p>
                <p>Si <em>vous ne parvenez pas a scanner le QR Code</em>, Merci de Saisir le <strong>Code</strong> suivant pour vous authentifier:</p>
                <p>${String(client.id).padStart(6, '0')}</p>`
              };

              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            }
          );
          found = true;
          res.json(client);
        }
    });

    if (!found) {
      res.status(404).send('No Client found');
    }
  } catch (error) {
    console.error(error);
    res.status(400).send('Bad request');
  }
});

// endpoint pour la liste des commandes d'un client
app.get('/customers/:customerId/orders', async (req, res) => {
  try {
    // appel de l'API pour récupérer la liste des commandes du client
    const customerId = req.params.customerId;
    const response = await axios.get(`https://615f5fb4f7254d0017068109.mockapi.io/api/v1/customers/${customerId}/orders`);
    const orders = response.data;
    // réponse en JSON
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// endpoint pour la liste de produits d'une commande
app.get('/customers/:customerId/orders/:orderId/products', async (req, res) => {
  try {
    // appel de l'API pour récupérer la liste de produits de la commande
    const customerId = req.params.customerId;
    const orderId = req.params.orderId;
    const response = await axios.get(`https://615f5fb4f7254d0017068109.mockapi.io/api/v1/customers/${customerId}/orders/${orderId}/products`);
    const products = response.data;
    // réponse en JSON
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
