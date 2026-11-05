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
const studioCollection = db.collection('studio');
const listCollection = db.collection('myList')
const bookCollection = db.collection('myBook')


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


app.get('/studios/:id', async(req,res) => {
    const {id} = req.params
    const result = await studioCollection.findOne({_id: new ObjectId(id)})
     res.send(result)
})

app.post('/listing', async(req,res) => {
    const data = req.body
    const result = await listCollection.insertOne(data);
    
     res.send(result)
})

app.post('/booking', async(req,res) => {
    const data = req.body
    const result = await bookCollection.insertOne(data);
    console.log(data);
    console.log(result)
    
     res.send(result)
})


app.get('/my-listing/:email', async(req,res) => {
    const {email} = req.params;
    console.log("Received ID:", email);
    const result = await listCollection.find({ email }).toArray();
    
})

app.get('/my-booking/:email', async(req,res) => {
    const {email} = req.params;
    console.log("Received ID:", email);
    const result = await bookCollection.find({ email }).toArray();
    console.log(result)
     res.send(result)
})

app.delete('/my-listing/:id', async(req,res) => {
    const {id} = req.params
    const result = await listCollection.deleteOne({_id: new ObjectId(id)})
     res.send(result)
})

//http://localhost:8000/my-listing/
app.get('/', (req, res) => {
  res.send('Hello server !')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})