import Comment from "./models/Comment.js";
import Post from "./models/Post.js";


// @ts-ignore
let api = axios.create({
  baseURL: "/api/"
})

let _state = {
  posts: [],
  comments: [],
  targetPostId: ''
}

let _subscribers = {
  posts: [],
  comments: [],
  targetPostId: []

}

function setState(prop, val) {
  _state[prop] = val
  _subscribers[prop].forEach(fn => fn())
}


export default class BeeService {

  addSubscribers(prop, fn) {
    _subscribers[prop].push(fn)
  }

  get posts() {
    return _state.posts.map(p => new Post(p))
  }

  get comments() {
    return _state.comments.map(c => new Comment(c))
  }

  get PostId() {
    return _state.targetPostId
  }

  getPosts() {
    api.get("posts/")
      .then(res => {
        let data = res.data.map(p => new Post(p))
        setState('posts', data)
      })
  }

  makePost(newPost) {
    event.preventDefault();
    api.post('posts', newPost)
      .then(res => {
        this.getPosts()
      })
  }

  getComments(id) {
    api.get("comments/" + id)
      .then(res => {
        let data = res.data.map(c => new Comment(c))
        setState('targetPostId', id)
        setState("comments", data)

      })
  }
  deletePost(id) {
    api.delete('posts/' + id)
      .then(res => {
        this.getPosts()
      })

  }

  deleteComment(id) {
    api.delete('comments/' + id)
      .then(res => {
        console.log(res)
        setState('targetPostId', res.data.postId)
        this.getComments(res.data.postId)
      })
  }

  editPost(newData) {
    api.put(('posts/' + newData.id), newData)
      .then(res => {
        this.getPosts()
      })
  }
}