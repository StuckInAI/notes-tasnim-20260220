import { initializeDatabase } from '@/lib/database';
import { AppDataSource } from '@/lib/database';
import { Note } from '@/types/note';
import NoteForm from '@/components/NoteForm';
import Link from 'next/link';

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await initializeDatabase();
  const id = parseInt((await params).id);
  const noteRepository = AppDataSource.getRepository(Note);
  
  let note: Note | null = null;
  if (!isNaN(id) && id !== 0) {
    note = await noteRepository.findOneBy({ id });
  }

  return (
    <div>
      <div className="mb-6">
        <Link 
          href="/" 
          className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block"
        >
          ← Back to all notes
        </Link>
        <h2 className="text-2xl font-semibold text-gray-800">
          {note ? `Edit Note: ${note.title}` : 'Create New Note'}
        </h2>
      </div>
      <NoteForm note={note} />
    </div>
  );
}