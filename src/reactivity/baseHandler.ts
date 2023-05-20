import {track, trigger} from './effect';
import { ReactiveFlags, reactive, readonly } from './reactive';
import { isObject } from './shared';

const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true);

function createGetter(isReadonly = false) {
    return function (target,key) {
        const res = Reflect.get(target, key);

        if(key === ReactiveFlags.IS_REACTIVE) {
            return !isReadonly;
        } else if(key === ReactiveFlags.IS_READONLY) {
            return isReadonly;
        }

        if(isObject(res)) {
            return isReadonly ? readonly(res) : reactive(res); 
        }

        if(!isReadonly) {
            track(target, key);
        }

        return res;
    }
}

function createSetter() {
    return function(target,key,value) {
        const res = Reflect.set(target,key,value);

        // 触发依赖
        trigger(target, key);
        return res;
    }
}

export const mutableHandlers = {
    get,
    set,
}

export const readonlyHandlers = {
    get: readonlyGet,
    set: (target, key, value) => {
        console.warn(`key:${key} set 失败 因为 target readonly`, target);
        return true
    }
}