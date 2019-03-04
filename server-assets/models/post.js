let mongoose = require('mongoose')
let Comment = require('./comment')
let Schema = mongoose.Schema


let post = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: false },
  text: { type: String, require: true },
  imgUrl: { type: String, required: false },
  value: { type: Number, required: true, default: 0 }
}, {
    timestamps: true
  })

post.pre("remove", function (next) {
  Comment.remove({ post: this._id })
    .then(() => next())
    .catch(err => next(err))
})

module.exports = mongoose.model("Post", post)