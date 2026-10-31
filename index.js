import express from 'express'
import { MongoClient } from 'mongodb';



const app = express()
const port = 8000;


const client = new MongoClient("mongodb://studioSpace:pftRY63swPCkvIcs@ac-xz0dulr-shard-00-00.vmdfl6j.mongodb.net:27017,ac-xz0dulr-shard-00-01.vmdfl6j.mongodb.net:27017,ac-xz0dulr-shard-00-02.vmdfl6j.mongodb.net:27017/?ssl=true&replicaSet=atlas-14jg0v-shard-0&authSource=admin");

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

connectToMongoDB()


//http://localhost:8000/
app.get('/', (req, res) => {
  res.send('Hello server !')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})