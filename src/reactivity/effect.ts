import { extent } from "./shared";
let activeEffect;
let shouldTrack;

class ReactiveEffect {
    private _fn:any;
    public scheduler:Function | undefined;
    onStop?:() => void;
    deps = [];
    active = true;
    
    constructor(fn, scheduler?) {
        this._fn = fn;
        this.scheduler = scheduler;
    }

    run() {

        if(!this.active) {
            return this._fn();
        }

        shouldTrack = true;
        activeEffect = this;

        const result = this._fn();

        // 重置 shouldTrack
        shouldTrack = false;

        return result;
    }

    stop() {
        if(this.active) {
            cleanUpEffect(this);
            if(this.onStop) this.onStop();
            this.active = false;
        }
    }
}

function cleanUpEffect(effect) {
    effect.deps.forEach((dep:any) => {
        dep.delete(effect);
    })
    effect.deps.length = 0;
}

const targetMap = new Map();
export function track(target, key) {
    if(!isTracking()) return;

    let depsMap = targetMap.get(target);
    if(!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }

    let dep = depsMap.get(key);
    
    if(!dep) {
        dep = new Set();
        depsMap.set(key, dep);
    }

    if(dep.has(activeEffect)) return;
    
    activeEffect.deps.push(dep);
    dep.add(activeEffect);
}

function isTracking() {
    return shouldTrack && activeEffect !== undefined;
}

export function trigger(target, key) {
    let depsMap = targetMap.get(target);
    let dep = depsMap.get(key);

    for(const effect of dep) {
        if(effect.scheduler) {
            effect.scheduler();
        } else {
            effect.run();
        }
    }
}

export function effect(fn, options:any = {}) {
    const scheduler = options.scheduler;
    const _effect = new ReactiveEffect(fn, scheduler);
    extent(_effect, options);

    _effect.run();

    const runner:any =  _effect.run.bind(_effect);
    runner.effect = _effect;

    return runner;
}

export function stop(runner) {
    runner.effect.stop();
}