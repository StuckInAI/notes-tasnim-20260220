import { initializeDatabase } from '@/lib/database';
import NoteList from '@/components/NoteList';
import Link from 'next/link';

export default async function Home() {
  await initializeDatabase();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">All Notes</h2>
        <Link
          href="/notes/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          + New Note
        </Link>
      </div>
      <NoteList />
    </div>
  );
}