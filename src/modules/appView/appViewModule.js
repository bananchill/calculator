import App from "./part/App"

export default class {
    name = 'top-level'

    configure(_app) {
        _app.appView = App;
        _app.mountNode= '#app'
    }
}
