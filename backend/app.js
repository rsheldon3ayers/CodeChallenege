const express = require('express');
const app = express();

const mongoose = require('mongoose');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');

require('dotenv').config();

const URL = process.env.DATABASE_URL;
mongoose.connect(URL, {
    useNewUrlParser: true
})
.then(() => {
        console.log('CONNECTED TO MONGODB');
})
.catch((err) => console.log(err))

//Setting Graphql
const schema = buildSchema(`
type Query {
    name: String
}`);

const rootValue = {
    name: () => {
        return "No Idea Whats Happening"
    }
}

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    rootValue
}))
app.get('/', (req, res) => {
    res.send("BACKEND LOADED")
});

app.listen(7777, () => {
    console.log("Server on port 7777");
});

