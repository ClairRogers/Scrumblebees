export default class Comment {
  constructor(data) {
    this._id = data._id
    this.postId = data.postId
    this.text = data.text
    this.createdAt = data.createdAt
    this.name = data.name
    this.subComments = data.subComments
    // this.subId = !data.subId || data.subId || data.subComments[0]._id
    // this.subName = !data.subName || data.subName || data.subComments[0].name
    // this.subText = !data.subText || data.subText || data.subComments[0].text
    // this.subCreatedAt = !data.subCreatedAt || data.subCreatedAt || data.subComments[0].createdAt
  }
  getTemplate() {
    let template = `
    <p><u>${this.name}</u></p>
     <p><u>${this.text}</u></p>
     <p><u>${this.createdAt}</u></p>
     <button onclick="app.controllers.beeController.deleteComment('${this._id}')">Delete Comment</button>
     <hr>`
    this.subComments.forEach(subCom => {
      template += `
      <p><u>${subCom.name}</u></p>
     <p><u>${subCom.text}</u></p>
     <p><u>${subCom.createdAt}</u></p>
    `
    })
    return template
  }
}