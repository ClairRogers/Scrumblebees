let mongoose = require('mongoose')
let Comment = require('./comment')
let Schema = mongoose.Schema


let post = new Schema({
  name: { type: String, required: false },
  comment: { type: String, require: true },
  imgUrl: { type: String, required: false }
})

post.pre("remove", function (next) {
  Comment.remove({ post: this._id })
    .then(() => next())
    .catch(err => next(err))
})

module.exports = mongoose.model("Post", post)