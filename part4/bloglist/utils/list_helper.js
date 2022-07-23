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

module.exports = {
  dummy,
  totalLikes,
}
