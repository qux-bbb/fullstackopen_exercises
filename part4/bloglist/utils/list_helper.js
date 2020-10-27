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
  let authorNums = _.countBy(blogs, 'author')

  let maxNum = -1
  let theAuthor = ''
  for (author in authorNums) {
    if (maxNum < authorNums[author]) {
      maxNum = authorNums[author]
      theAuthor = author
    }
  }

  return {
    author: theAuthor,
    blogs: authorNums[theAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}