import NoteForm from '@/components/NoteForm'
import { getNoteById } from '@/lib/noteService'
import { notFound } from 'next/navigation'

export default async function NoteDetailPage({ params }: { params: { id: string } }) {
  const note = await getNoteById(params.id)
  
  if (!note) {
    notFound()
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Edit Note</h2>
      <NoteForm note={note} />
    </div>
  )
}
