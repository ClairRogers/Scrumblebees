export default class Comment {
  constructor(data) {
    this._id = data._id
    this.postId = data.postId
    this.text = data.text
    this.createdAt = data.createdAt
    this.date = formatDate()
    this.time = formatTime()
    this.name = data.name
    this.subComments = data.subComments
    this.value = data.value
    this.subId = !data.subId || data.subId || data.subComments[0]._id
    this.subName = !data.subName || data.subName || data.subComments[0].name
    this.subText = !data.subText || data.subText || data.subComments[0].text
    this.subCreatedAt = !data.subCreatedAt || data.subCreatedAt || data.subComments[0].createdAt

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
    let template =
      `<div class="card commentwidth">
        <div class="card-body">
          <div class="row no-gutters">
            <div class="col-md-11">
              <h5 class="card-title">${this.name}</h5>
              <p class="card-text">${this.text}</p>
              <p class="card-text"><small class="text-muted">${this.date} ${this.time}</small></p>
              <button class="btn btn-warning" onclick="app.controllers.beeController.deleteComment('${this._id}')">Delete
          Comment</button>
              <button class="btn btn-warning"
                onclick="app.controllers.beeController.showSubForm('${this._id}')">Reply</button>
              </div>
                <div class="col-md-1 votes">
                  <h2 onclick="app.controllers.beeController.votesComment('${this._id}', 'plus')"><i
                    class="fas fa-chevron-up text-dark"></i></h2>
                  <h3>${this.value}</h3>
                  <h2 onclick="app.controllers.beeController.votesComment('${this._id}', 'minus')"><i
                    class="fas fa-chevron-down text-dark"></i></h2>
                </div>
      </div>
<form id="${this._id}" hidden="true" onsubmit="app.controllers.beeController.subComment(event,'${this._id}')">
                <input type="text" name="text">
                  <button class="btn btn-info" type="submit">Submit</button>
        </form>
            </div>
          </div>
        </div>`
    // `
    // <button onclick="app.controllers.beeController.votesComment('${this._id}', 'plus')">+</button><h3>${this.value}</h3><button onclick="app.controllers.beeController.votesComment('${this._id}', 'minus')">-</button>
    // <p><u>${this.name}</u></p>
    //  <p><u>${this.text}</u></p>
    //  <p><u>${this.createdAt}</u></p>
    //  <button onclick="app.controllers.beeController.deleteComment('${this._id}')">Delete Comment</button>
    //  <hr>`
    this.subComments.forEach(subCom => {
      //   template += `
      //   <p><u>${subCom.name}</u></p>
      //  <p><u>${subCom.text}</u></p>
      //  <p><u>${subCom.formatDate} ${formatTime}</u></p>
      // `
      template += `
      <div class="card w-50">
  <div class="card-body">
    <h5 class="card-title">${subCom.name}</h5>
    <p class="card-text">${subCom.text}</p>
    <p class="card-text"><small class="text-muted">${subCom.date} ${subCom.time}</small></p>
  </div>
</div>
      `
    })
    return template
  }
}