import { isObject } from "../shared/index";
import { ShapeFlags } from "../shared/shapeFlags";
import { createComponentInstance, setupComponent } from "./component";
import { Fragment, Text } from "./vnode";

export function render(vnode, container) {
    // patch

    patch(vnode, container);
}

function patch(vnode, container) {
    // TODO
    const { type, shapeFlag } = vnode;

    // Fragment -> 只渲染 children
    switch (type) {
        case Fragment:
            processFragment(vnode, container)
            break;
        case Text:
            processText(vnode, container);
            break;
        default:
            // 判断 vnode 是 element 还是 component
            if (shapeFlag & ShapeFlags.ELEMENT) {
                processElement(vnode, container);
            } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
                processComponent(vnode, container);
            }
            break;
    }

}

function processComponent(vnode: any, container: any) {
    mountComponent(vnode, container);
}

function mountComponent(vnode: any, container) {
    const instance = createComponentInstance(vnode);

    setupComponent(instance);
    setupRenderEffect(instance, container);
}

function setupRenderEffect(instance: any, container) {
    const { proxy } = instance;
    const subTree = instance.render.call(proxy);

    patch(subTree, container);

    instance.vnode.el = subTree.el;
}

function processElement(vnode: any, container: any) {
    mountElement(vnode, container);
}

function mountElement(vnode: any, container: any) {
    const el = (vnode.el = document.createElement(vnode.type));


    const { children, props, shapeFlag } = vnode;

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
        el.textContent = children;
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        mountChildren(vnode, el);
    }

    const isOn = (key) => /^on[A-Z]/.test(key);

    for (let key in props) {
        const value = props[key];

        if (isOn(key)) {
            const event = key.substring(2).toLowerCase();
            el.addEventListener(event, value);
        } else {
            el.setAttribute(key, value);
        }
    }

    container.append(el);
}

function mountChildren(vnode, container) {
    vnode.children.forEach(v => {
        patch(v, container);
    })
}

function processFragment(vnode: any, container: any) {
    mountChildren(vnode, container);
}

function processText(vnode: any, container: any) {
    const { children } = vnode;
    const textNode = (vnode.el = document.createTextNode(children));
    container.append(textNode);
}

