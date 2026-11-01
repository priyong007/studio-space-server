import express from 'express'
import { MongoClient } from 'mongodb';
import 'dotenv/config'


const app = express()
const port = 8000;


const client = new MongoClient(process.env.MONGODB_URL);

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


app.post('/add-studio', (req,res) => {
    console.log('api called')
     res.send({message: 'api working'})
})

//http://localhost:8000/add-studio
app.get('/', (req, res) => {
  res.send('Hello server !')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})