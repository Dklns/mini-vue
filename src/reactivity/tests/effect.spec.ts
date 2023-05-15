import {reactive} from '../reactive';
import { effect, stop } from '../effect';

describe("effect", () => {
    it("happy path", () => {
        const user = reactive({
            age: 10
        });

        let nextAge;
        effect(() => {
            nextAge = user.age + 1;
        })

        expect(nextAge).toBe(11);

        // update
        user.age++;
        expect(nextAge).toBe(12);
    });

    it("runner", () => {
        let foo = 10;

        const runner = effect(() => {
            foo++;
            return 'bar'
        })

        expect(foo).toBe(11);

        const r = runner();
        expect(foo).toBe(12);
        expect(r).toBe("bar");
    });

    it("scheduler", () => {
        /*
            effect 可以接受第二个参数，这个参数是一个配置对象，
            其中一个为函数的属性 scheduler ，在第一次调用 effect 时不会调用该函数，
            当响应式对象更新时，不再调用 _fn 而是 scheduler
        */
        let dummy;
        let run: any;
        const scheduler = jest.fn(() => {
            run  = runner;
        })

        const obj = reactive({foo: 1});
        const runner = effect(() => {
            dummy = obj.foo
        }, {scheduler});

        // 第一次调用 effect 不会调用 scheduler
        expect(scheduler).not.toHaveBeenCalled();
        expect(dummy).toBe(1);

        // 没有调用 effect._fn
        obj.foo++;
        expect(scheduler).toHaveBeenCalledTimes(1); // 被调用一次
        expect(dummy).toBe(1); // 没有改变

        run();
        expect(dummy).toBe(2); // 改变了
    });

    it("stop", () => {
        let dummy;
        const obj = reactive({prop: 1});
        const runner = effect(() => {
            dummy = obj.prop;
        });

        obj.prop = 2;
        expect(dummy).toBe(2);
        stop(runner);
        obj.prop = 3;
        expect(dummy).toBe(2);

        runner();
        expect(dummy).toBe(3);
    });

    it("onStop", () => {
        const obj = reactive({
            foo: 1
        });
        const onStop = jest.fn();
        let dummy;
        const runner = effect(() => {
            dummy = obj.foo;
        }, {
            onStop
        });

        stop(runner);
        expect(onStop).toBeCalledTimes(1);
    })
})