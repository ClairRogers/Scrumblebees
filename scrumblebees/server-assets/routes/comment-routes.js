let router = require('express').Router()
let Comment = require("../models/comment")
let Post = require("../models/post")

router.get('/:postId', (req, res, next) => {
  Comment.find({ postId: req.params.postId })
    .then(comments => res.status(200).send(comments))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Comment.create(req.body)
    .then(comment => res.status(201).send(comment))
    .catch(next)
})

//updating subComments on a comment
router.put('/:id/sub-comments', (req, res, next) => {
  Comment.findById(req.params.id)
    .then(comment => {
      //if req.body._id exists then you are trying to delete a subComment
      //else you are creating a sub comment
      if (!req.body._id) {
        //create it
        comment.subComments.push(req.body)
      } else {
        //delete it
        let index = comment.subComments.indexOf(req.body._id)
        if (index != -1) {
          comment.subComments.splice(index, 1)
        }
      }
      return comment.save()
    })
    .then(() => res.send("Comment was buzzed"))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Comment.findOneAndDelete({ _id: req.params.id })
    .then(oldData => {
      res.status(200).send({ message: 'Successfully deleted comment', postId: oldData.postId })
    })
    .catch(err => {
      res.status(500).send({ Error: err })
    })
})

module.exports = router