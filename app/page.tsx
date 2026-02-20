import NoteList from '@/components/NoteList'
import { getNotes } from '@/lib/noteService'

export default async function Home() {
  const notes = await getNotes()

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Notes</h2>
        <p className="text-gray-600">Your simple notes management system. Create, view, edit, and delete notes with ease.</p>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Notes</h3>
        <NoteList notes={notes} />
      </div>
      
      {notes.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500 mb-4">No notes yet. Create your first note!</p>
          <a 
            href="/notes/new" 
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
          >
            Create First Note
          </a>
        </div>
      )}
    </div>
  )
}
