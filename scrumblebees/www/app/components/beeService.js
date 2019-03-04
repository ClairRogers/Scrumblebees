import Comment from "./models/Comment.js";
import Post from "./models/Post.js";


// @ts-ignore
let api = axios.create({
  baseURL: "/api/"
})

let _state = {
  posts: [],
  comments: [],
  targetPostId: '',
  searches: []
}

let _subscribers = {
  posts: [],
  comments: [],
  targetPostId: [],
  searches: []
}

function setState(prop, val) {
  _state[prop] = val
  _subscribers[prop].forEach(fn => fn())
}


export default class BeeService {
  subComment(data, commentId) {
    api.put(`/comments/${commentId}/sub-comments`, data)
      .then(res => {
        this.getComments(_state.targetPostId, true)
      })
  }

  addSubscribers(prop, fn) {
    _subscribers[prop].push(fn)
  }

  get posts() {
    return _state.posts.map(p => new Post(p))
  }
  get searches() {
    return _state.searches.map(s => new Post(s))
  }

  get comments() {
    return _state.comments.map(c => new Comment(c))
  }

  get PostId() {
    return _state.targetPostId
  }

  mostUp() {
    let posts = _state.posts
    let postValues = posts.map(v => {
      return v
    })
    let highest = 0
    postValues.sort((a, b) => {
      let val = a.value - b.value
      if (val > 0) {
        return -1
      }
      else if (val < 0) {
        return 1
      }
      return 0
    })
    setState('posts', postValues)
  }

  mostDown() {
    let posts = _state.posts
    let postValues = posts.map(v => {
      return v
    })
    let highest = 0
    postValues.sort((a, b) => {
      let val = a.value - b.value
      if (val > 0) {
        return 1
      }
      else if (val < 0) {
        return -1
      }
      return 0
    })
    setState('posts', postValues)
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

  makeComment(newComment) {
    api.post('comments/', newComment)
      .then(res => {
        console.log(res.data)
        this.getComments(newComment.postId, true)
      })
  }

  getComments(id, viewing) {
    if (document.getElementById("comments-" + id).getAttribute('hidden') || viewing) {
      api.get("comments/" + id)
        .then(res => {
          let data = res.data.map(c => new Comment(c))
          setState('targetPostId', id)
          setState("comments", data)
        })
      document.getElementById("comments-" + id).removeAttribute('hidden')
    }
    else if (!viewing) {
      document.getElementById("comments-" + id).setAttribute('hidden', true)
    }
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
        this.getComments(res.data.postId, true)
      })
  }

  editPost(newData, oldId) {
    api.put(('posts/' + newData.id), newData)
      .then(res => {
        console.log(res.data)
        document.getElementById('old-' + oldId).innerText = res.data.text
      })
  }

  votes(id, str) {
    let post = _state.posts.find(p => p._id == id)
    if (str == 'plus') {
      if (post) {
        post.value++
      }
    } else {
      if (post) {
        post.value--
      }
    }
    // this.editPost(post)
    api.put(('posts/' + id), post)
      .then(res => {
        this.getPosts()
      })
  }

  votesComment(id, str) {
    let comment = _state.comments.find(c => c._id == id)
    if (str == 'plus') {
      if (comment) {
        comment.value++
      }
    } else {
      if (comment) {
        comment.value--
      }
    }
    //let postId = comment.postId
    api.put(('comments/' + id), comment)
      .then(res => {
        this.getComments(_state.targetPostId, true)
      })
  }

  search(query) {
    let arr = _state.posts
    let searches = []
    for (let i = 0; i < arr.length; i++) {
      let values = Object.values(arr[i]).filter(v => typeof v == 'string')
      values.forEach(v => {
        v.toLowerCase().includes(query.toLowerCase()) && !searches.includes(arr[i]) ? searches.push(arr[i]) : ''
      })
    }
    setState('searches', searches)
  }
}
// && _state.comments