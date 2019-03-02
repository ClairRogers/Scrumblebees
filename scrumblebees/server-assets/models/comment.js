let mongoose = require('mongoose')
let Subcomment = require('./comment')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let name = "Comment"

//once a subComment is created then it will have an _id property
let subComment = new Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  value: { type: Number, required: true, default: 0 }
}, {
    timestamps: true
  })


let schema = new Schema({
  postId: { type: String, required: true },
  name: { type: String, required: true },
  text: { type: String, required: true },
  value: { type: Number, required: true, default: 0 },
  subComments: [subComment]
}, {
    timestamps: true
  })


module.exports = mongoose.model(name, schema)