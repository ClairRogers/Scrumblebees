export default class Post {
  constructor(data) {
    this._id = data._id
    this.title = data.title
    this.name = data.name
    this.text = data.text || 'No text provided'
    this.imgUrl = data.imgUrl || 'http://gentlebees.co/wp-content/uploads/2014/12/Gentle-Bee-logo.png'
    this.createdAt = data.createdAt
    this.date = formatDate()
    this.time = formatTime()
    this.updatedAt = data.updatedAt
    this.value = data.value


    function formatDate() {
      let newArr = data.createdAt.split('')
      for (let i = 0; i < 8; i++) {
        newArr.pop()
      }
      newArr[10] = " "
      let output = newArr.join('').split(' ')
      return output[0]

    }

    function formatTime() {
      let newArr = data.createdAt.split('')
      for (let i = 0; i < 8; i++) {
        newArr.pop()
      }
      newArr[10] = " "
      let output = newArr.join('').split(' ')
      let time = output[1].split(':')
      let hours = Number(time[0])
      let minutes = time[1]
      console.log(hours)
      console.log(minutes)
      if (hours <= 12) {
        return hours.toString() + ':' + minutes + 'am'
      }
      else if (hours > 12) {
        return (hours - 12).toString() + ':' + minutes + 'pm'
      }
    }
  }

  getTemplate() {
    // return `
    // <img class="img-fluid" src="${this.imgUrl}" />
    // <h1>${this.name}</h1>
    // <p>${this.text}</p>
    // <p>${this.formatTime}</p>
    // <button onclick="app.controllers.beeController.votes('${this._id}', 'plus')">+</button><h3>${this.value}</h3><button onclick="app.controllers.beeController.votes('${this._id}', 'minus')">-</button>
    //  <form onsubmit="app.controllers.beeController.makeComment(event, '${this._id}')">
    //  <input type="name" name="name" placeholder="username">
    //     <input type="text" name="comment" placeholder="comment">
    //       <button class="btn btn-primary" type="submit">Submit</button>
    //         </form>
    // <button onclick="app.controllers.beeController.getComments('${this._id}')">View Comments</button>
    // <button onclick="app.controllers.beeController.deletePost('${this._id}')">Delete Post</button>
    // <button onclick="app.controllers.beeController.showEditForm('${this._id}')"><i class="far fa-edit"></i></button>
    // <form hidden id="${this._id}" onsubmit="app.controllers.beeController.editPost(event)">
    //                 <input type="text" name="text">
    //                 <button class="btn btn-info" type="submit">Submit</button>
    //             </form>
    // <div id="comments-${this._id}" hidden></div>
    // `




    //   return `< div class="card mb-3" >
    //       <div class="row no-gutters">
    //         <div class="col-md-4"
    //           <img src="${this.imgUrl}" class="card-img" alt="...">
    //         </div>
    //           <div class="col-md-8">
    //             <div class="card-body">
    //               <h5 class="card-title">${this.name}</h5>
    //               <p class="card-text">${this.text}</p>
    //               <button onclick="app.controllers.beeController.votes('${this._id}', 'plus')">+</button><h3>${this.value}</h3><button onclick="app.controllers.beeController.votes('${this._id}', 'minus')">-</button>
    //               <p class="card-text"><small class="text-muted">${this.date} at ${this.time}</small></p>
    //               <button onclick="app.controllers.beeController.getComments('${this._id}')">View Comments</button>
    //   <button onclick="app.controllers.beeController.deletePost('${this._id}')">Delete Post</button>
    //   <button onclick="app.controllers.beeController.showEditForm('${this._id}')"><i class="far fa-edit"></i></button>
    //             </div>
    //           </div>
    //         </div>
    //         <form onsubmit="app.controllers.beeController.makeComment(event, '${this._id}')">
    // <input type="name" name="name" placeholder="username">
    //   <input type="text" name="comment" placeholder="comment">
    //     <button class="btn btn-primary" type="submit">Submit</button>
    //            </form>
    //            <form hidden id="${this._id}" onsubmit="app.controllers.beeController.editPost(event)">
    //                   <input type="text" name="text">
    //                  <button class="btn btn-info" type="submit">Submit</button>
    //                </form>
    //       </div>
    //       <div id="comments-${this._id}" hidden></div>
    //       `


    return `
    <div class="card mb-3">
      <div class="row no-gutters">
      <div class="col-md-4">
        <img src="${this.imgUrl}" class="card-img" alt="...">
      </div>
      <div class="col-md-7">
        <div class="card-body">
          <h4 class="card-title">${this.title}</h4>
          <h5>by ${this.name}</h5>
          <p class="card-text" id="old-${this.id}">${this.text}</p>
          <p class="card-text"><small class="text-muted">${this.date} ${this.time}</small></p>
          <button class="btn btn-warning" onclick="app.controllers.beeController.getComments('${this._id}')">View Comments</button>
       <button class="btn btn-warning" onclick="app.controllers.beeController.deletePost('${this._id}')">Delete Post</button>
       <button class="btn btn-warning" onclick="app.controllers.beeController.showEditForm('${this._id}')"><i class="far fa-edit"></i></button>
       <form hidden class="mt-2" id="${this._id}" onsubmit="app.controllers.beeController.editPost(event,'${this._id}')">
                       <input type="text" name="text">
                      <button class="btn btn-warning" type="submit">Submit</button>
                    </form>
        </div>
        </div>
        <div class="col-md-1 votes">
        <h2 onclick="app.controllers.beeController.votes('${this._id}', 'plus')"><i class="fas fa-chevron-up text-dark"></i></h2>
        <h3>${this.value}</h3>
        <h2 onclick="app.controllers.beeController.votes('${this._id}', 'minus')"><i class="fas fa-chevron-down text-dark"></i></h2>
        </div>
      </div>
    </div> 
    <div id="comments-${this._id}" class="commentalign" hidden="true">
    
    </div>
    <form class="text-center mb-5" onsubmit="app.controllers.beeController.makeComment(event, '${this._id}')">
    <p>Add a Comment: </p>
     <input type="name" name="name" placeholder="username">
        <input type="text" name="comment" placeholder="comment">
          <button class="btn btn-warning" type="submit">Submit</button>
            </form>
            `
  }
}



