const _ = require('lodash')

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
  if (blogs.length===0)
    return {}

  let maxLike = -1
  let theFavoriteBlog = {}
  blogs.forEach(blog => {
    if (maxLike < blog.likes) {
      maxLike = blog.likes
      theFavoriteBlog = blog
    }
  })

  return {
    title: theFavoriteBlog.title,
    author: theFavoriteBlog.author,
    likes: theFavoriteBlog.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0)
    return {}
  let countAuthors = _.countBy(blogs, 'author')

  let authorCounts = []
  for (author in countAuthors) {
    authorCounts.push(
      {
        author: author,
        blogs: countAuthors[author]
      }
    )
  }

  return _.orderBy(authorCounts, 'blogs', 'desc')[0]
}

const mostLike = (blogs) => {
  if (blogs.length === 0)
    return {}
  let groupBlogs = _.groupBy(blogs, 'author')

  let authorLikes = []
  for (author in groupBlogs) {
    authorLikes.push(
      {
        author: author,
        likes: totalLikes(groupBlogs[author])
      }
    )
  }

  return _.orderBy(authorLikes, 'likes', 'desc')[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLike
}