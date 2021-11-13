const express = require('express');
const app = express();

const mongoose = require('mongoose');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');

const Person = require('./models/person');

const cors = require('cors');
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


app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type Person {
            _id: ID!,
            first_name: String!
            last_name: String!
            dob: String!
            phone_number: String!
            notes: String
        }
        input PersonInput {
            first_name: String!
            last_name: String!
            dob: String!
            phone_number: String!
            notes: String
        }
        type RootQuery {
            people: [Person!]!
        }
        type RootMutation {
            addPerson(personInput: PersonInput): Person
        }
        schema {
            query: RootQuery,
            mutation: RootMutation
        }
    `),
    rootValue: {
        people: () => {
            return Person.find().then(people => {
                console.log(people);
                return people.map(person => {
                    return {...person._doc, _id: person.id}
                })
            }).catch(err => {
                console.log(err)
                throw err;
            })
        },
        addPerson: (args) => {
        
            const person = new Person({
                first_name: args.personInput.first_name,
                last_name: args.personInput.last_name,
                dob: new Date(args.personInput.dob),
                phone_number: args.personInput.phone_number,
                notes: args.personInput.notes
            });

            return person.save().then( res => {
                console.log(res);
                return {...res._doc, _id: res._doc._id.toString()};
            }).catch( err => {
                console.log(err);
                throw err;
            });
            
        }
    },
    graphiql: true
}))
app.get('/', (req, res) => {
    res.send("BACKEND LOADED")
});

app.listen(7777, () => {
    console.log("Server on port 7777");
});

