// utils/env.server.ts
import { config } from 'dotenv';

config(); // Load environment variables from .env file

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
export const OPENAI_CHAT_URL = process.env.OPENAI_CHAT_URL 
