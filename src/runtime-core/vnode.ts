import { ShapeFlags } from "../shared/shapeFlags";

export function createVNode(type, props?, children?) {

    const vnode = {
        type,
        props: props || {},
        children,
        shapeFlag: getShapeFlag(type),
        el: null,
    }

    // 增加 children flag
    if( typeof children === 'string') {
        vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN;
    } else if(Array.isArray(children)) {
        vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN;
    }

    // children 是否为 slot
    if(vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        if(typeof children === 'object') {
            vnode.shapeFlag |= ShapeFlags.SLOT_CHILDREN;
        }
    }

    return vnode;
}

function getShapeFlag(type) {
    return typeof type === 'string' 
    ? ShapeFlags.ELEMENT
    : ShapeFlags.STATEFUL_COMPONENT;
}