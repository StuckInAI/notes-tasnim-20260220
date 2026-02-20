import 'reflect-metadata'
import { initializeDatabase } from './database'
import { Note } from '@/types/note'

export async function getNotes(): Promise<Note[]> {
  try {
    const dataSource = await initializeDatabase()
    const noteRepository = dataSource.getRepository(Note)
    
    const notes = await noteRepository.find({
      order: {
        updatedAt: 'DESC'
      }
    })
    
    return notes
  } catch (error) {
    console.error('Error fetching notes:', error)
    return []
  }
}

export async function getNoteById(id: string): Promise<Note | null> {
  try {
    const dataSource = await initializeDatabase()
    const noteRepository = dataSource.getRepository(Note)
    
    const note = await noteRepository.findOneBy({ id })
    return note
  } catch (error) {
    console.error('Error fetching note:', error)
    return null
  }
}

export async function createNote(title: string, content: string): Promise<Note> {
  const dataSource = await initializeDatabase()
  const noteRepository = dataSource.getRepository(Note)
  
  const note = new Note()
  note.title = title
  note.content = content
  note.createdAt = new Date()
  note.updatedAt = new Date()
  
  await noteRepository.save(note)
  return note
}

export async function updateNote(id: string, title: string, content: string): Promise<Note | null> {
  try {
    const dataSource = await initializeDatabase()
    const noteRepository = dataSource.getRepository(Note)
    
    const note = await noteRepository.findOneBy({ id })
    
    if (!note) {
      return null
    }
    
    note.title = title
    note.content = content
    note.updatedAt = new Date()
    
    await noteRepository.save(note)
    return note
  } catch (error) {
    console.error('Error updating note:', error)
    return null
  }
}

export async function deleteNote(id: string): Promise<boolean> {
  try {
    const dataSource = await initializeDatabase()
    const noteRepository = dataSource.getRepository(Note)
    
    const result = await noteRepository.delete(id)
    return (result.affected || 0) > 0
  } catch (error) {
    console.error('Error deleting note:', error)
    return false
  }
}
