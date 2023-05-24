import { h } from "../../lib/guide-mini-vue.esm.js";
import Foo from './Foo.js';

window.self = null;
export const App = {
    render() {
        window.self = this;
        return h(
            "div",
            {
                id: "root",
                class: ['hard', 'red'],
                onClick() {
                    console.log('click');
                },
                onMouseenter() {
                    console.log('enter');
                }
            },
            // [
            //     h("p", {class: ["red"]}, "hi"),
            //     h("p", {class: ["blue"]}, "mini-vue")
            // ]
            [h("div", {}, "hello " + this.msg), h(Foo, { count: 1 })]
        )
    },

    setup() {

        return {
            msg: "mini-vue lll"
        };
    }
}