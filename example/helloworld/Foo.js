import { h } from "../../lib/guide-mini-vue.esm.js"

const foo = {
    setup(props) {
        // props.count

        console.log(props);

        // 3. props is readonly
        props.count++;
    },
    render() {
        return h('div', {}, "foo: " + this.count);
    }
}

export default foo;