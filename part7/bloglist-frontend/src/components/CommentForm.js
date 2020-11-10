import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogReducer'

const CommentForm = ({id}) => {
  const dispatch = useDispatch()
  const [newComment, setNewComment] = useState('')

  const handleCommentChange = (event) => {
    setNewComment(event.target.value)
  }

  const addComment = (event) => {
    event.preventDefault()
    if (newComment)
      dispatch(createComment(id, newComment))
  }

  return (
    <div>
      <form onSubmit={addComment}>
      <input value={newComment} onChange={handleCommentChange} />
        <button type="submit" value="Submit">add comment</button>
      </form>
    </div>
  )
}

export default CommentForm