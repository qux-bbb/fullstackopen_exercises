import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
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
    <Form onSubmit={addComment}>
      <Form.Group>
        <Form.Control
          value={newComment} onChange={handleCommentChange}
        />
        <Button variant='primary'  type='submit'>
          add comment
        </Button>
      </Form.Group>
    </Form>
  )
}

export default CommentForm