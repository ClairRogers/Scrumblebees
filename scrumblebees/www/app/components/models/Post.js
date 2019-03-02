export default class Post {
  constructor(data) {
    this._id = data._id
    this.title = data.title
    this.name = data.name
    this.text = data.text || 'No text provided'
    this.imgUrl = data.imgUrl || 'http://gentlebees.co/wp-content/uploads/2014/12/Gentle-Bee-logo.png'
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt

  }
  getTemplate() {
    return `
    <img class="img-fluid" src="${this.imgUrl}" />
    <h1>${this.name}</h1>
    <p>${this.text}</p>
     <form onsubmit="app.controllers.beeController.makeComment(event, ${this._id})">
     <input type="name" name="name">
        <input type="text" name="comment">
          <button class="btn btn-primary" type="submit">Submit</button>
            </form>
    <button onclick="app.controllers.beeController.getComments('${this._id}')">View Comments</button>
    <button onclick="app.controllers.beeController.deletePost('${this._id}')">Delete Post</button>
    <button onclick="app.controllers.beeController.showEditForm('${this._id}')"><i class="far fa-edit"></i></button>
    <form hidden id="${this._id}" onsubmit="app.controllers.beeController.editPost(event)">
                    <input type="text" name="text">
                    <button class="btn btn-info" type="submit">Submit</button>
                </form>
    <div id="comments-${this._id}"></div>

    `
  }
}