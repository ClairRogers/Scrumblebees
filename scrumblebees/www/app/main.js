import BeeController from "./components/beeController.js"


class App {
  constructor() {
    this.controllers = {
      beeController: new BeeController()
    }
  }
}

window['app'] = new App()