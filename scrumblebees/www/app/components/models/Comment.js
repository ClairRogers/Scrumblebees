export default class Comment {
  constructor(data) {
    this._id = data._id
    this.text = data.text
    this.time = data.time
    this.name = data.name
  }
  getTemplate() {
    return `
    <h1>${this.text}</h1>
    `
  }
}