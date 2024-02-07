import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let client;

if (!process.env.MONGODB_URI) {
    throw new Error("Add Mongo URI to .env.local");
}

client = new MongoClient(uri);

export default client;
