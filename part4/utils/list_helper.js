const dummy = () => {
    return 1
  }

const totalLikes = list => list.reduce((total, current) => total += current.likes, 0)

const favoriteBlog = (list) => {
    const sorted = list.sort((a,b) => {
        return a.likes > b.likes ? 1 : -1
    })

    return sorted[sorted.length-1]
}

const mostBlogs = (list) => {

    const counted = []

    list.forEach(element => {
        if(counted.find((el) => el.author === element.author)) {
            const index = counted.findIndex(a => a.author === element.author)
            counted[index].blogs++
        } else {
            counted.push({
                author: element.author,
                blogs: 1
            })
        }
    });

    return counted.sort((a,b) => a.blogs > b.blogs ? 1 : -1)[counted.length-1]

}

const mostLikes = (list) => {

    const counted = []

    list.forEach(element => {
        if(counted.find((el) => el.author === element.author)) {
            const index = counted.findIndex(a => a.author === element.author)
            counted[index].likes += element.likes
        } else {
            counted.push({
                author: element.author,
                likes: element.likes
            })
        }
    });

    return counted.sort((a,b) => a.likes > b.likes ? 1 : -1)[counted.length-1]

}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }