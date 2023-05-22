export function createComponentInstance(vnode) {

    const component = {
        vnode,
        type: vnode.type
    }

    return component;
}

export function setupComponent(instance) {
    // TODO
    // initProps()
    // initSlots()

    setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
    const Component = instance.vnode.type;

    const {setup} = Component;

    if(!setup) {
        // 可能返回函数或者对象
        const setupResult = setup();

        handleSetupResult(instance, setupResult);
    }
}

function handleSetupResult(instance, setupResult: any) {
    // TODO
    // 当 setupResult 是函数类型时

    if(typeof setupResult === 'object') {
        instance.setupState = setupResult;
    }

    finishComponentSetup(instance);
}

function finishComponentSetup(instance: any) {
    const Component = instance.type;

    instance.render = Component.render;
    
}

