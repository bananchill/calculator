import LeasingApiModule from "@/apis/helperApiModule/leazing/LeasingApiModule";

export default class ApiPack {
    install(_app) {
        _app.use(new LeasingApiModule())
    }
}
