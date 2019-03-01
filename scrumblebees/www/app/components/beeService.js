import Comment from "./models/Comment.js";
import Post from "./models/Post.js";


let api = axios.create({
  baseURL: "/api/"
})

let _state = {
  posts: [],
  comments: []
}

let _subscribers = {
  posts: [],
  comments: []
}

function setState(prop, val) {
  _state[prop] = val
  _subscribers[prop].forEach(fn => fn())
}


export default class BeeService {
  addSubscribers(prop, fn) {
    _subscribers[prop].push(fn)
  }


  getPosts() {
    api.get("posts")
  }
}