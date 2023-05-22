import { render } from "./renderer";
import { createVNode } from "./vnode";

export function createApp(rootComponent) {

    return {
        mount(rootContainer) {
            // 先 vnode
            // component -> vnode
            // 后续再根据 vnode 做处理

            const vnode = createVNode(rootComponent);

            render(vnode, rootContainer);
        }
    }
}

