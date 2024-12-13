import { Client, Databases, Storage, Account } from "react-native-appwrite";

export const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("674b11a0000e39b3d48f")
  .setPlatform("com.g6.FeelTok");

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);
