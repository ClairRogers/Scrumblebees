let mongoose = require("mongoose")
// const connectionString = <username>:<password>@den1.mongo1.gear.host:27001/<server name>
let connectionString = 'mongodb://scrumblebees:scrumblebees!@den1.mongo1.gear.host:27001/scrumblebees'
let connection = mongoose.connection

mongoose.connect(connectionString, {
  useNewUrlParser: true
})

connection.on('error', err => {
  console.log('err')
})

connection.once("open", () => {
  console.log('Successfully connected to the database!!!!!!!!!')
})