require('dotenv').config();
require('./db/index');

const express = require('express');
const cors = require('cors');


const app = express();
app.use(express.json());

app.use(cors(
    {
        origin: ['https://scalar-deployment-6w9d.vercel.app'],
        credentials: true,
    }
));



const router = require('./routes');
app.use(router);

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port} 🔥`); 
});