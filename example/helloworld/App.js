import { h } from "../../lib/guide-mini-vue.esm.js";
import Foo from './Foo.js';

export const App = {
    render() {
        return h('div', {}, [
            h("div", {}, "hello " + this.msg),
            h(Foo, {
                onAdd(a, b) {
                    console.log('onAdd', a, b);
                }
            })
        ])
    },

    setup() {

        return {
            msg: "mini-vue lll"
        };
    }
}