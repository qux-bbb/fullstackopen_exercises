const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  let maxLike = -1
  let theFavoriteBlog = {}
  blogs.forEach(blog => {
    if (maxLike < blog.likes) {
      maxLike = blog.likes
      theFavoriteBlog = blog
    }
  })

  if (theFavoriteBlog)
    return {
      title: theFavoriteBlog.title,
      author: theFavoriteBlog.author,
      likes: theFavoriteBlog.likes
    }
  else
    return {}
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}