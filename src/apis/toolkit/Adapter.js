/* eslint max-classes-per-file: ["error", 3] */

import Stopwatch from "@/infrastructure/toolkit/stopwatch";

class FetchApiError extends Error {
    constructor(_message) {
        super(_message)
        this.name = 'FetchApiError'
    }
}


export default class Adapter {
    static instance;
    name = 'adapter'

    #pLog = null

    constructor(log) {
        this.#pLog = log
        Adapter.getInstance()
        return this
    }

    static getInstance() {
        if (!Adapter.instance) {
            Adapter.instance = this
        }
        return Adapter.instance
    }

    requestJsonAsync(_data, _request, _operationDescription) {
        return this.requestAsync(_data, _request, _response => _response.json(), _operationDescription);
    }

    async requestAsync(_data, _request, _resolvePayloadAsync, _operationDescription) {
        const stopwatch = Stopwatch.start()
        const log = this.#pLog
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        const {
            method,
        } = _request

        log.i(`**${method}** ${_operationDescription}  ...`);
        let response;

        let request = {..._request};
        request.headers = {'Content-Type': 'application/json'}
        request.body = JSON.stringify(_data)

        try {
            console.log(process.env.VUE_APP_URL,
                request)
            response = await window.fetch(proxyUrl + process.env.VUE_APP_URL,
                request
            )

            console.log(response)

        } catch (_e) {
            const msg = `Fail: ${_operationDescription} ${stopwatch.getDiff()} ms: ${_e}`
            log.w(msg);
            throw new FetchApiError(msg)
        }


        if (!response.ok) {
            const msg = `${method} '${_operationDescription}' failed, status ${response.status} / ${response.statusText}`;
            log.w(msg);
            throw new FetchApiError(`Error: ${msg}`)
        }

        if (_resolvePayloadAsync === null)
            return response.ok;

        log.i(`${_operationDescription} ${stopwatch.getDiff()} start parsing ms`)
        const data = await _resolvePayloadAsync(response)
        log.i(`Success: ${_operationDescription} ${stopwatch.getDiff()} parsed ms`)

        return data
    }

}
