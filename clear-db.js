import { createClient } from '@vercel/kv';
import dotenv from 'dotenv';

dotenv.config();

const kv = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

async function wipeDatabase() {
  try {
    console.log('🧹 Initiating total database wipe...');
    
    // This command deletes ALL keys in the KV database
    await kv.flushall();
    
    console.log('✅ Database completely cleared! It is now empty.');
  } catch (error) {
    console.error('❌ Failed to clear database:', error);
  }
}

wipeDatabase();