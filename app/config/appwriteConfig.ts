import { Client, Databases, Storage, Account } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') 
  .setProject('674b11a0000e39b3d48f'); 

const databases = new Databases(client); 
const storage = new Storage(client); 
const account = new Account(client); 

export { client, databases, storage, account }; 
