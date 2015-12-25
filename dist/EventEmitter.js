/**
 * @module EventEmitter
 * @description A dead simple EventEmitter class designed for client-side applications. It can be used by itself or as a base class. This implementation omits namespaced events and wildcards for speed and simplicity. It does transmit the event target with the event, though, which is useful.
 * @example
// A simple implementation.
var ee = new EventEmitter();
var handler = function (e) {
    alert(e.data.message);
};
ee.on('error', handler);
ee.emit('error', { message: 'Refrigerator unable to connect to Facebook' });
ee.off('error', handler);

 * @example
// A slightly more complicated implementation using EventEmitter as a base class.
function Carousel () {
    EventEmitter.call(this);

    this.index = 0;

    this.slideCount = 3;

}

Carousel.EVENT = {
    ADVANCED: 'advanced'
};

Object.assign(Carousel.prototype, EventEmitter.prototype, {
    constructor: Carousel,

    advance: function () {
        this.index = (this.index + 1) % this.slideCount;
        this.emit(Carousel.EVENT.ADVANCED, { newIndex: this.index });
    }

});


var carousel = new Carousel();
carousel.on(Carousel.EVENT.ADVANCED, function (e) {
    console.log(e.data.newIndex + 1, 'of', e.target.slideCount);
});
carousel.advance(); // logs `2 of 3`
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.EventEmitter = factory();
    }
}(this, function (require) {
    'use strict';


    /**
     * @class
     * @alias module:EventEmitter
     */
    function EventEmitter () {

        /**
         * A dictionary of bindings.
         * @type {Object.<string, Function[]>}
         */
        this._bindings = {};

    }
    var proto = EventEmitter.prototype;


    /**
     * Binds a callback to an event type. When the event type is emitted (using [.emit]{@link module:EventEmitter#emit}), the callback will be invoked.
     *
     * @method on
     * @memberof module:EventEmitter
     * @instance
     * @param  {string}   type     - The type of the event, e.g. `'removed'`.
     * @param  {Function} callback - The function to invoke when the event type is emitted.
     */
    proto.on = function (type, callback) {
        if (callback instanceof Function === false) {
            throw new Error('Callback is wrong type. Expected Function and got ' + typeof callback);
        }
        var bindings = this._bindings[type];
        if (bindings === undefined) {
            bindings = [];
            this._bindings[type] = bindings;
        }
        bindings.push(callback);
    };


    /**
     * Unbinds a callback from an event type. The callback will no longer be invoked when the event type is emitted.
     *
     * @method off
     * @memberof module:EventEmitter
     * @instance
     * @param  {string}   type     - The type of the event, e.g. `'removed'`.
     * @param  {Function} callback - The function to invoke when the event type is emitted.
     */
    proto.off = function (type, callback) {
        var bindings = this._bindings[type];
        if (bindings === undefined) {
            return;
        }
        var index = bindings.indexOf(callback);
        if (index === -1) {
            return;
        }
        bindings.splice(index, 1);
        if (bindings.length === 0) {
            delete this._bindings[type];
        }
    };


    /**
     * Emits an event thus invoking all functions bound to the event type passing in the EventEmitter.Event instance in as the only argument.
     *
     * @method emit
     * @memberof module:EventEmitter
     * @instance
     * @param  {string} type   - The event type.
     * @param  {*}      [data] - Optional. Any additional data to pass along with the event being emitted.
     */
    proto.emit = function (type, data) {
        var bindings = this._bindings[type];
        if (bindings === undefined) {
            return;
        }
        var i;
        var l = bindings.length;
        var e = new EventEmitter.Event(type, this, data);
        for (i = 0; i < l; i++) {
            bindings[i](e);
        }
    };


    /**
     * @class Event
     * @classdesc Defines the structure of an event.
     * @property {string}       type    - The event type.
     * @property {EventEmitter} target  - The instance responsible for emitting the event. Useful when using EventEmitter as a base class.
     * @property {*}            data    - Any additional data to pass along with the event.
     */
    EventEmitter.Event = function Event (type, target, data) {

        this.type = type;

        this.target = target;

        this.data = data;

    }


    return EventEmitter;
}));
