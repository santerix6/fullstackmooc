const dummy = (blogs) => {
  return 1
}
const totalLikes = (array) => {
  if(array.length === 0){
    return 0
  } else {
    return array.reduce((total, curr) => {
      return total + curr.likes
    }, 0)
  }

}
module.exports = {
  dummy, totalLikes
}
