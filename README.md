<a name="module_EventEmitter"></a>
## EventEmitter
A simple EventEmitter class designed for client-side applications. It can be used by itself or as a base class.

**Example**  
```js
// A simple implementation.
var ee = new EventEmitter();
var handler = function (e) { alert(e.data.message); };
ee.on('error', handler);
ee.emit('error', { message: 'Refrigerator unable to connect to Facebook' });
ee.off('error', handler);
```
**Example**  
```js
// A slightly more complicated implementation.
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
```

* [EventEmitter](#module_EventEmitter)
    * [EventEmitter](#exp_module_EventEmitter--EventEmitter) ⏏
        * _instance_
            * [._bindings](#module_EventEmitter--EventEmitter+_bindings) : <code>Object.&lt;string, Array.&lt;function()&gt;&gt;</code>
            * [.on(type, callback)](#module_EventEmitter--EventEmitter+on)
            * [.off(type, callback)](#module_EventEmitter--EventEmitter+off)
            * [.emit(type, [data])](#module_EventEmitter--EventEmitter+emit)
        * _inner_
            * [~Event](#module_EventEmitter--EventEmitter..Event)

<a name="exp_module_EventEmitter--EventEmitter"></a>
### EventEmitter ⏏
**Kind**: Exported class  
<a name="module_EventEmitter--EventEmitter+_bindings"></a>
#### eventEmitter._bindings : <code>Object.&lt;string, Array.&lt;function()&gt;&gt;</code>
A dictionary of bindings.

**Kind**: instance property of <code>[EventEmitter](#exp_module_EventEmitter--EventEmitter)</code>  
<a name="module_EventEmitter--EventEmitter+on"></a>
#### eventEmitter.on(type, callback)
Binds a callback to an event type. When the event type is emitted (using [.emit](#module_EventEmitter--EventEmitter+emit)), the callback will be invoked.

**Kind**: instance method of <code>[EventEmitter](#exp_module_EventEmitter--EventEmitter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of the event, e.g. `'removed'`. |
| callback | <code>function</code> | The function to invoke when the event type is emitted. |

<a name="module_EventEmitter--EventEmitter+off"></a>
#### eventEmitter.off(type, callback)
Unbinds a callback from an event type. The callback will no longer be invoked when the event type is emitted.

**Kind**: instance method of <code>[EventEmitter](#exp_module_EventEmitter--EventEmitter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of the event, e.g. `'removed'`. |
| callback | <code>function</code> | The function to invoke when the event type is emitted. |

<a name="module_EventEmitter--EventEmitter+emit"></a>
#### eventEmitter.emit(type, [data])
Emits an event thus invoking all functions bound to the event type passing in the EventEmitter.Event instance in as the only argument.

**Kind**: instance method of <code>[EventEmitter](#exp_module_EventEmitter--EventEmitter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The event type. |
| [data] | <code>\*</code> | Optional. Any additional data to pass along with the event being emitted. |

<a name="module_EventEmitter--EventEmitter..Event"></a>
#### EventEmitter~Event
Defines the structure of an event.

**Kind**: inner class of <code>[EventEmitter](#exp_module_EventEmitter--EventEmitter)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The event type. |
| target | <code>EventEmitter</code> | The instance responsible for emitting the event. Useful when using EventEmitter as a base class. |
| data | <code>\*</code> | Any additional data to pass along with the event. |

