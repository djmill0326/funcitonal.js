export const array_iter = (input, offset=0, reverse=false) => {
    // evil branchless, probably slower than just branching
    const factor = reverse * 2 - 1;
    const x = reverse ? input.length - offset - 1 : offset;
    let index = 0;
    return () => {
        return input[x - index++ * factor];
    }
};

export const kv_iter = (input, offset=0, reverse=false) => array_iter(Object.keys(input).map(key => ({ key, value: input[key] })), offset, reverse);

export const rev = (f) => (input, offset=0) => f(input, offset, true);

export const map = (next, f=x=>x, proto=[]) => {
    for (let x; x = next(); proto.push(f(x)));
    return proto;
};

export const lazy = (next, f=x=>x) => async () => {
    const promise = new Promise((resolve, reject) => {
        const x = next();
        if (x) resolve(f(x));
        else reject("iterator failed to yield");
    });
    return await promise;
};

export const lazy_run = async (lazy, on_next=()=>{}, on_finish=()=>{}, init=()=>({})) => {
    const data = init();
    const promise = new Promise(async (resolve) => {
        let x = true;
        while(x) {
            x = await lazy().catch(x => on_finish(x, data));
            x ? on_next(x, data) : null;
        }
        resolve(data);
    });
    return await promise;
};

export const lazy_collect = async (lazy, accumulator=(x, data) => data.arr.push(x)) => lazy_run(lazy, accumulator, ()=>{}, ()=>({ arr: [] })).then(x => x.arr);
