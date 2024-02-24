# functional.js
- easy to use (debatable)
- supports async/await
- supports lazy eval
- might be efficient ;)

## supported functions
- `array_iter(input, offset=0, reverse=false) -> next()` - converts any JS array into an iterator
- `kv_iter(input, offset=0, reverse=false) -> next()` - converts any JS hashmap/object into a `[key, value]` iterator
- `rev(f) -> f(input, offset=0) -> next()` - turns any iterator supporting the functionality into its reversed equivalent
- `lazy(next, f=x=>x) -> async next()` - turns any iterator `next()` function into its `async` equivalent
- `lazy_run(executor, on_next=()=>{}, on_finish=()=>{}, init=()=>({})) -> async resolve()`
- - runs a lazy `executor` until complete with additional args to support `lazy_collect`
- `lazy_collect(lazy, accumulator=(x, data) => data.arr.push(x)) -> async collect()`
- - should be self-explanatory. uses `lazy_run`'s data object (`data.arr`) to accumulate

More features coming soon!
