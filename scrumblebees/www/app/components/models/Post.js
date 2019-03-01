export default class Post {
  constructor(data) {
    this._id = data._id
    this.title = data.title
    this.name = data.name
    this.text = data.text
    this.imgUrl = data.imgUrl
    this.time = data.time
  }
  getTemplate() {
    return `
    <h1>${this.name}</h1>
    <p>${this.text}</p>
    `
  }
}