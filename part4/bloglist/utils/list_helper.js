const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  const summer = (sum, item) => {
    return sum + item
  }

  const likes = blogs.map(blogs => blogs.likes)

  return likes.reduce(summer, 0)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const idxOfMax = likes.indexOf(Math.max(...likes))
  const favorite = blogs[idxOfMax]

  return favorite === undefined
    ? {
      'title': undefined,
      'author': undefined,
      'likes': undefined
    }
    : {
      'title': favorite.title,
      'author': favorite.author,
      'likes': favorite.likes
    }
}

const mostBlogs = (blogs) => {
  const numberOfBlogs = _.countBy(blogs.map(blog => blog.author))
  const maxi = _.max(Object.values(numberOfBlogs))
  const idxOfMax = Object.values(numberOfBlogs).indexOf(maxi)
  const maxBlogger = Object.keys(numberOfBlogs)[idxOfMax]

  return {
    'author': maxBlogger,
    'blogs': maxi
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}

