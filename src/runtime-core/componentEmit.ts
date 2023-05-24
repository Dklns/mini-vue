import { camelize, toHandlerKey } from "../shared/index";

export function emit(instance, event, ...args) {
    console.log("emit", event);

    const {props} = instance;

    const handlerName = toHandlerKey(camelize(event) as any);

    const handler = props[handlerName];
    handler && handler(...args);
}