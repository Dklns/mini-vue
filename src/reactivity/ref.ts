import { trackEffects, triggerEffects, isTracking } from "./effect";
import { reactive } from "./reactive";
import { hasChanged, isObject } from "../shared";

class RefImpl {
    private _value: any;
    public dep;
    private _raw: any;
    public __v_isRef =  true;

    constructor(value) {
        this._raw = value;
        this._value = convert(value);
        this.dep = new Set();
    }

    get value() {
        trackRefValue(this);

        return this._value;
    }

    set value(newValue) {
        // 对比前后新旧值是否改变
        // 当 value 是一个对象时，会被 reactive，但是对比时应该使用
        // raw 来对比
        if(hasChanged(this._raw, newValue)) {
            this._raw = newValue;
            this._value = convert(newValue);
            triggerEffects(this.dep);
        }
    }
}

function trackRefValue(ref) {
    if(isTracking()) {
        trackEffects(ref.dep);
    }
}

function convert(value) {
    return isObject(value) ? reactive(value) : value;
}

export function ref(value) {
    return new RefImpl(value);
}

export function isRef(value) {
    return !!value.__v_isRef;
}

export function unRef(ref) {
    return isRef(ref) ? ref.value : ref;
}

export function proxyRefs(objectWithRefs) {
    return new Proxy(objectWithRefs, {
        get(target, value) {
            return unRef(Reflect.get(target,value));
        },
        set(target, key, value) {
            if(isRef(target[key]) && !isRef(value)) {
                return target[key].value = value;
            } else {
                return Reflect.set(target, key, value);
            }
        }
    })
}