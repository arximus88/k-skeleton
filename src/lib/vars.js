import dotenv from 'dotenv';
dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI;
export const DETA_PROJECT_KEY = process.env.DETA_PROJECT_KEY;

// import { env } from '$env/dynamic/private';
// import dotenv from 'dotenv';
// dotenv.config();

// export const MONGODB_URI = process.env.MONGODB_URI;

// export const DETA_PROJECT_KEY = env.DETA_PROJECT_KEY;
