
const express = require('express');
const Joi = require('joi');
const app = express();
const categories = require('./routes/categories');

app.use(express.json());
 
app.use('/api/categories', categories);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening port: ${port} ....`));

