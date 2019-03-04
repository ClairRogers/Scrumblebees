let express = require('express')
let bodyParser = require('body-parser')
let server = express()

require('./server-assets/db/gearhost-config')

server.use(express.static(__dirname + "/www"))

//middleware
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

//routes
let commentRoutes = require('./server-assets/routes/comment-routes')
let postRoutes = require('./server-assets/routes/post-routes')
server.use('/api/comments', commentRoutes)
server.use('/api/posts', postRoutes)

//catchall
server.use('*', (req, res, next) => {
  res.status(404).send('no matchcing routes')
})

server.use('*', (error, req, res, next) => {
  res.status(error.status || 400).send(error)
})

//server
server.listen(3000, () => { console.log("serving") })