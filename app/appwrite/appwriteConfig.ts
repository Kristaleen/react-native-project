import { Client, Databases, Storage, Account, ID } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') 
  .setProject('674b11a0000e39b3d48f'); 

const databases = new Databases(client); 
const storage = new Storage(client); 
const account = new Account(client); 

export { client, databases, storage, account }; 

interface ImageFile {
  uri: string;
  name: string;
  type: string;
}

interface UploadResult {
  fileId: string;
  fileUrl: string;
}

export async function uploadImage(file: ImageFile): Promise<UploadResult | null> {
  try {
    // Convert the URI to a Blob object
    const response = await fetch(file.uri);
    if (!response.ok) throw new Error('Failed to fetch image data');
    
    const blob = await response.blob();
    
    // Create a File object with a unique name
    const uniqueFileName = `${Date.now()}_${ID.unique()}_${file.name}`;
    const fileObject = new File([blob], uniqueFileName, { type: file.type });

    // Upload file to Appwrite storage
    const result = await storage.createFile(
      '6751dc3c000511b022fb',
      ID.unique(),
      fileObject
    );

    return {
      fileId: result.$id,
      fileUrl: `https://cloud.appwrite.io/v1/storage/buckets/6751dc3c000511b022fb/files/${result.$id}/view`
    };
  } catch (error) {
    console.error('Upload error:', error);
    return null;
  }
}
