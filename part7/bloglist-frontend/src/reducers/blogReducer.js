import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE_BLOG':
      const like_id = action.data.id
      const blogToLike = state.find(a => a.id === like_id)
      const likedBlog = {
        ...blogToLike,
        likes: blogToLike.likes+1
      }
      return state.map(blog =>
        blog.id !== like_id ? blog : likedBlog
      )
    case 'DELETE_BLOG':
      const delete_id = action.data.id
      return state.filter(blog => blog.id !== delete_id)
    case 'ADD_COMMENTS':
      const blogIdToComment = action.data.id
      const blogToComment = state.find(b => b.id === blogIdToComment)
      const commentedBlog = {
        ...blogToComment,
        comments: blogToComment.comments.concat(action.data.comments)
      }
      return state.map(blog =>
        blog.id !== blogIdToComment ? blog : commentedBlog
      )
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const updateBlog = (id ,content) => {
  return async dispatch => {
    await blogService.update(id, content)
    dispatch({
      type: 'LIKE_BLOG',
      data: { id },
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.deleteOne(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: { id },
    })
  }
}

export const createComment = (id ,comment) => {
  const comments = [comment]
  return async dispatch => {
    await blogService.addNewComments(id, comments)
    dispatch({
      type: 'ADD_COMMENTS',
      data: { id, comments },
    })
  }
}

export default blogReducer