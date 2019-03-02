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

  makeComment(comment, id) {
    let Comment = comment.target
    let newComment = {
      postId: id

    }
  }

  deletePost(id) {
    _bs.deletePost(id)
  }

  deleteComment(id) {
    _bs.deleteComment(id)
  }

  showEditForm(id) {
    document.getElementById(id).hidden = false
  }


  editPost(event) {
    event.preventDefault();
    let data = {
      id: event.target.id,
      text: event.target.text.value
    }
    _bs.editPost(data)
  }
}