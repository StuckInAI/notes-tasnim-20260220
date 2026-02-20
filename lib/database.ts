import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Note } from '@/types/note';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the SQLite database connection
export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_URL || './notes.db',
  synchronize: true, // Automatically create database schema on startup
  logging: false,
  entities: [Note],
  migrations: [],
  subscribers: [],
});

// Function to initialize database connection
export async function initializeDatabase() {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}