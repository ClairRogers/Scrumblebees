let router = require('express').Router()
let Posts = require('../models/post')

//get all
router.get('', (req, res, next) => {
  Posts.find({})
    .then(p => {
      res.send(p)
    })
    .catch(err => {
      res.status(500).send({ Error: err })
    })
})

//create
router.post('', (req, res, next) => {
  Posts.create(req.body)
    .then(p => res.send(p))
    .catch(err => {
      res.status(500).send({ Error: err })
    })
})

//by ID
router.get('/:id', (req, res, next) => {
  Posts.findById(req.params.id)
    .then(p => res.send(p))
    .catch(err => res.status(400).send(err))
})

//update
router.put('/:id', (req, res, next) => {
  Posts.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(p => {
      res.status(200).send(p)
    })
    .catch(err => {
      res.status(500).send({ Error: err })
    })
})

//delete
router.delete('/:id', (req, res, next) => {
  Posts.findOneAndDelete({ _id: req.params.id })
    .then(oldData => {
      res.status(200).send('Successfully deleted post')
    })
    .catch(err => {
      res.status(500).send({ Error: err })
    })
})

module.exports = router