require('dotenv').config();
require('./db/index');

const express = require('express');
const app = express();


const cors = require('cors');
var corsOptions = {
    credentials: true, 
    origin: ['http://localhost:3000'],
}
app.use(cors(corsOptions));


app.use(express.json({limit:'30mb'}));


const router = require('./routes');
app.use(router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port} 🔥`); 
});