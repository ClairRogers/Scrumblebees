import BeeService from "./beeService.js"

let _bs = new BeeService()

function drawComments() {
  let comments = _bs.comments
  let template = ''
  comments.forEach(c => {
    template += c.getTemplate()
  })
  document.getElementById('comments-' + _bs.PostId).innerHTML = template
}

function drawSearches() {
  let searches = _bs.searches
  let template = ''
  searches.forEach(s => {
    template += s.getTemplate()
  })
  if (template == '') {
    document.getElementById('posts').innerHTML = `<h1 class="text-center mt-5">OOPS! Nothing Here!</h1>`
  } else {
    document.getElementById('posts').innerHTML = template
  }
}

function drawPosts() {
  let posts = _bs.posts
  let template = ''
  posts.forEach(p => {
    template += p.getTemplate()
  })
  document.getElementById('posts').innerHTML = template
}

export default class BeeController {
  constructor() {
    _bs.getPosts()
    _bs.addSubscribers("posts", drawPosts)
    _bs.addSubscribers("comments", drawComments)
    _bs.addSubscribers("searches", drawSearches)
  }

  getComments(id) {
    _bs.getComments(id)
  }

  makeNewPost(event) {
    event.preventDefault()
    let form = event.target
    let newPost = {
      name: form.name.value,
      title: form.title.value,
      text: form.buzz.value,
      imgUrl: form.image.value
    }
    _bs.makePost(newPost)
  }

  mostUp() {
    _bs.mostUp()
  }

  mostDown() {
    _bs.mostDown()
  }

  makeComment(event, id) {
    event.preventDefault()
    let form = event.target
    let newComment = {
      postId: id,
      name: form.name.value,
      text: form.comment.value,
      value: 0
    }
    _bs.makeComment(newComment)
  }

  deletePost(id) {
    _bs.deletePost(id)
  }

  redrawPosts() {
    drawPosts()
  }

  deleteComment(id) {
    _bs.deleteComment(id)
  }

  showEditForm(id) {
    document.getElementById(id).hidden = false
  }

  showSubForm(id) {
    document.getElementById("sub-" + id).hidden = false
  }

  subComment(event, id) {
    event.preventDefault()
    let subComment = event.target
    let commentId = id
    let data = {
      name: subComment.name.value,
      text: subComment.text.value
    }
    _bs.subComment(data, commentId)
  }

  editPost(event, _id) {
    event.preventDefault();
    let oldId = _id
    let data = {
      id: event.target.id,
      text: event.target.text.value
    }
    _bs.editPost(data, oldId)
  }
  votes(id, str) {
    _bs.votes(id, str)
  }

  votesComment(id, str) {
    _bs.votesComment(id, str)
  }

  search(event) {
    event.preventDefault();
    let data = event.target.search.value
    _bs.search(data)
  }

}