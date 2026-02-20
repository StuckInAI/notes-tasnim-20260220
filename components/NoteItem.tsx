import { Note } from '@/types/note'
import { format } from 'date-fns'
import Link from 'next/link'

type NoteItemProps = {
  note: Note
}

export default function NoteItem({ note }: NoteItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 truncate">{note.title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {format(new Date(note.updatedAt), 'MMM d, yyyy HH:mm')}
          </p>
        </div>
        <div className="flex space-x-2">
          <Link 
            href={`/notes/${note.id}`}
            className="text-primary-600 hover:text-primary-800 text-sm font-medium"
          >
            Edit
          </Link>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4 line-clamp-3">{note.content}</p>
      
      <div className="text-xs text-gray-400">
        Created: {format(new Date(note.createdAt), 'MMM d, yyyy')}
      </div>
    </div>
  )
}
