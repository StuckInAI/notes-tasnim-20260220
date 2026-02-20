import NoteList from '@/components/NoteList'
import { getNotes } from '@/lib/noteService'

export default async function NotesPage() {
  const notes = await getNotes()

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">All Notes</h2>
        <p className="text-gray-600">View and manage all your notes in one place.</p>
      </div>
      
      <NoteList notes={notes} />
    </div>
  )
}
