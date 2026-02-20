import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/database';
import { AppDataSource } from '@/lib/database';
import { Note } from '@/types/note';

export async function GET() {
  try {
    await initializeDatabase();
    const noteRepository = AppDataSource.getRepository(Note);
    const notes = await noteRepository.find({
      order: { updatedAt: 'DESC' },
    });
    return NextResponse.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await initializeDatabase();
    const noteRepository = AppDataSource.getRepository(Note);
    const body = await request.json();
    
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const note = noteRepository.create({
      title: body.title.trim(),
      content: body.content.trim(),
    });

    const savedNote = await noteRepository.save(note);
    return NextResponse.json(savedNote, { status: 201 });
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}