import { createClient } from '@vercel/kv';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const kv = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

async function seedSubmissions() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'submissions', 'mock.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const mockData = JSON.parse(rawData);

    // Format the data to perfectly match what the API and UI expect
    const formattedSubmissions = mockData.map(item => ({
      ...item,
      id: item.id || `mem_${Math.random().toString(36).substr(2, 9)}`,
      submittedAt: item.submittedAt || new Date().toISOString(),
      // CRITICAL: Force status to "approved" (overwrites "active" from your JSON)
      status: "approved", 
      group: item.group || "Veterans",
      lastUpdated: item.lastUpdated || new Date().toISOString()
    }));

    console.log(`🚀 Pushing ${formattedSubmissions.length} submissions to KV...`);

    // Push the array to the "submissions" key
    await kv.set("submissions", formattedSubmissions);

    console.log('🎉 Data synced! Refresh your site.');
  } catch (error) {
    console.error('❌ Sync failed:', error);
  }
}

seedSubmissions();