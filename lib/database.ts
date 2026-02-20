import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Note } from '@/types/note'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_URL || './notes.db',
  entities: [Note],
  synchronize: true,
  logging: false,
})

let initialized = false

export async function initializeDatabase() {
  if (!initialized) {
    await AppDataSource.initialize()
    initialized = true
    console.log('Database initialized')
  }
  return AppDataSource
}
