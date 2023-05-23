import { isObject } from "../shared/index";
import { createComponentInstance, setupComponent } from "./component";

export function render(vnode, container) {
    // patch

    patch(vnode, container);
}

function patch(vnode, container) {
    // TODO
    // 判断 vnode 是 element 还是 component
    if(typeof vnode.type === 'string') {
        processElement(vnode, container);
    } else if(isObject(vnode.type)) {
        processComponent(vnode, container);
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
    const {proxy} = instance;
    const subTree = instance.render.call(proxy);

    patch(subTree, container);

    instance.vnode.el = subTree.el;
}

function processElement(vnode: any, container: any) {
    mountElement(vnode, container);
}

function mountElement(vnode: any, container: any) {
    const el = (vnode.el = document.createElement(vnode.type));


    const { children, props } = vnode;

    if(typeof children === 'string') {
        el.textContent = children;
    } else if(Array.isArray(children)) {
        mountChildren(vnode, el);
    }

    for(let key in props) {
        const value = props[key];
        el.setAttribute(key, value);
    }

    container.append(el);
}

function mountChildren(vnode, container) {
    vnode.children.forEach(v => {
        patch(v, container);
    })
}

