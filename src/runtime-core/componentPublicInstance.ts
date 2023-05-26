import { hasOwn } from "../shared/index";

const publicPropertiesMap = {
    $el: (i) => i.vnode.el,
    $slots: (i) => i.slots
}

export const PublicInstanceProxyHandlers = {
    get({_: instance}, key) {
        const { setupState, props } = instance;

        if(hasOwn(props, key)) {
            return props[key];
        } else if(hasOwn(setupState, key)) {
            return setupState[key];
        }

        const publicGetter = publicPropertiesMap[key];
        if(publicGetter) {
            return publicGetter(instance);
        }
    } 
}