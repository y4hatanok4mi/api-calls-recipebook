const express = require ('express');
const serverless = require ('serverless-http');
const router = require ('./routes/author');
const mongoose = require ('mongoose');
const cors = require ('cors');


const app = express();

const dbCloudUrl= 'mongodb+srv://recipetry:qwr1234@recipes.pxbfhwm.mongodb.net/';
const dbLocalUrl = 'mongodb://localhost:27017/api-calls';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose
    .connect(dbCloudUrl || dbLocalUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) =>console.error('Failed to connect to MongoDB',error))

    const PORT = 4001; 
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

app.use('/.netlify/functions/api',router) 
module.exports.handler = serverless(app);
 