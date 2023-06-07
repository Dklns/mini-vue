import { h, createTextVNode } from "../../lib/guide-mini-vue.esm.js";
import Foo from './Foo.js';

export const App = {
    render() {
        const foo = h(Foo, {},
            {
                header: ({ key }) => [
                    h("p", {}, "123" + key),
                    createTextVNode("你好呀")
                ],
                body: () => h("p", {}, "456")
            });

        return h("div", {}, [h("p", {}, "app"), foo])
    },

    setup() {
        return {}
    }
}