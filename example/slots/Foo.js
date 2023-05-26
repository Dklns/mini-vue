import { h, renderSlots } from "../../lib/guide-mini-vue.esm.js"

const foo = {
    setup() {
        return {};
    },
    render() {
        const foo = h("p", {}, "foo");
        const key = 'klns'

        return h("div", {},
            [
                renderSlots(this.$slots, "header", { key }),
                foo,
                renderSlots(this.$slots, "body")
            ]);
    }
}

export default foo;