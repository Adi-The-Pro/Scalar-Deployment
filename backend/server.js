require('dotenv').config();
require('./db/index');

const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors(corsOptions));
app.use(cors(
    {
        origin: ['http://localhost:3000'],
        methods : ["POST","GET"],
        credentials: true
    }
));

app.use(express.json());


const router = require('./routes');
app.use(router);

app.get('/', (req,res) => {
    console.log("Hello");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port} 🔥`); 
});