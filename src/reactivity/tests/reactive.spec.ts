import {reactive, isReactive, readonly, isReadonly} from '../reactive.ts';

describe("reactive", () => {
    it('happy path', () => {
        const original = { foo: 1 };
        const observed = reactive(original);
        const wrapped = readonly(original);

        expect(observed).not.toBe(original);
        expect(observed.foo).toBe(1);
        expect(isReactive(observed)).toBe(true);
        expect(isReactive(original)).toBe(false);
        expect(isReadonly(wrapped)).toBe(true);
    });

    test("nested reactive", () => {
        const original = {
            nested: {
                foo: 1
            },
            array: [{bar: 2}],
        }
        const observed = reactive(original);
        expect(isReactive(observed.nested)).toBe(true);
        expect(isReactive(observed.array)).toBe(true);
        expect(isReactive(observed.array[0])).toBe(true);
    })
})