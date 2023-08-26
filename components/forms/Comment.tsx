interface CommentProps {
  threadId: string
  currentUserImage: string
  currentUserId: string
}

export default function Comment({
  threadId,
  currentUserImage,
  currentUserId,
}: CommentProps) {
  return (
    <div>
      <h1 className='text-white'>Comment</h1>
    </div>
  )
}
