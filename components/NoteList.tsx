import NoteItem from './NoteItem'
import { Note } from '@/types/note'

type NoteListProps = {
  notes: Note[]
}

export default function NoteList({ notes }: NoteListProps) {
  if (notes.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  )
}
