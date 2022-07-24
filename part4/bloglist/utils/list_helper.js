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
  mostBlogs,
}

