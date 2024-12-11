

export class BaseClass {

    _eventCallbacks = {};

    constructor() {

    }

    AddEventListener(eventType, callback) {
        if(typeof callback !== "function") return;
        if(this._eventCallbacks[eventType] === undefined) {
            this._eventCallbacks[eventType] = [];
        }

        this._eventCallbacks[eventType].push(callback);
    }

    DispatchEvent(eventType, instance = this) {
        if(this._eventCallbacks[eventType] === undefined) return;
        
        this._eventCallbacks[eventType].forEach(callback => {
            callback(instance);
        })
    }
}