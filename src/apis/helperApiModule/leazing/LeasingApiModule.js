/* eslint max-classes-per-file: ["error", 2] */

import Adapter from "@/apis/toolkit/Adapter";

class LeasingApiImpl {
    name = 'leazing';

    #p_Adapter = null;
    #p_auth = null;
    #p_Log = null;


    constructor(_log) {
        this.#p_Log = _log;
    }

    set log(_log) {
        this.#p_Log = _log;
    }

    init() {
        const log = this.#p_Log;
        log.i(`using friendsApiModule`)
        this.#p_Adapter = new Adapter(log)
    }

    async sendDataAsync(_data) {
        return await this.#p_Adapter.requestJsonAsync(
            _data,
            {
                method: 'Post',
            }, 'send leasing');
    }
}

export default class LeasingApiModule {
    name = 'leazing-api';

    #pLog = null;

    set log(_log) {
        this.#pLog = _log;
    }

    install(_app) {
        _app.interfaces.register('leasingApi', () => {
            const api = new LeasingApiImpl(this.#pLog, _app.adapter);
            api.init();
            return api;
        });

    }
}
