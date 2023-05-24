export const extent = Object.assign;

export const isObject = (value) => {  
    return value !== null && typeof value === 'object';
}

export const hasChanged = (val, newValue) => {
    return !Object.is(val, newValue);
}

export const hasOwn = (val, key) => Object.prototype.hasOwnProperty.call(val, key);

export const camelize = (str: string) => {
    str.replace(/-(\w)/g, (_, c:string) => {
        return c ? c.toUpperCase() : "";
    })
}

export const capitalize:(string) => string = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const toHandlerKey = (str: string) => {
    return str ? "on" + capitalize(str) : "";
}