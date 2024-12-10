import { Client, Databases, Storage } from 'appwrite';

// Initialize the Appwrite Client
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')  
  .setProject('674b11a0000e39b3d48f');  

// Initialize Databases and Storage services
const databases = new Databases(client);
const storage = new Storage(client);

export { client, databases, storage };
