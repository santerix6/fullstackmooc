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
const favoriteBlog = (array) => {
  if(array.length === 0){
    return 0
  } else {
    var favo = 0
    var favoindex = 0
    for(var i = 0;i < array.length; i++){
      if(array[i].likes > favo){
        favo = array[i].likes
        favoindex = i
      }
    }
    return array[favoindex]
  }
  var favo = 0
  var favoindex = 0
  for(var i = 0;i < array.length; i++){
    if(array[i].likes > favo){
      favo = array[i].likes
      favoindex = i
    }
  }
  return array[favoindex]
}
module.exports = {
  dummy, totalLikes, favoriteBlog
}
