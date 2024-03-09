require('dotenv').config();
require('./db/index');

const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors(
    {
        origin: ['https://scalar-deployment-6w9d.vercel.app'],
        credentials: true
    }
));

app.use(express.json());


const router = require('./routes');
app.use(router);

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port} 🔥`); 
});