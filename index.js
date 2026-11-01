import express from 'express'
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config'
import cors from 'cors'

const app = express()
const port = 8000;

app.use(cors());
app.use(express.json());
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

const mongoClient= await  connectToMongoDB();
const db = mongoClient.db('studio-space');
const studioCollection = db.collection('studio')


app.post('/add-studio', async(req,res) => {
    const data = req.body
    const result = await studioCollection.insertOne(data);
    console.log(data);
    console.log(result)
    
     res.send(result)
})

app.get('/studios', async(req,res) => {
    
    const result = await studioCollection.find().toArray();
    console.log(result)
    
     res.send(result)
})


app.get('/studio/:id', async(req,res) => {
    const {id} = req.params
    const result = await studioCollection.findOne({_id: new ObjectId(id)})
     res.send(result)
})

//http://localhost:8000/add-studio
app.get('/', (req, res) => {
  res.send('Hello server !')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})