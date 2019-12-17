interpolate(to, from, duration)

we could makkeeach attribute use a custom interpolation

such as

```
interpolate({x : config({duration : 1000, value: 20})})
```

In react spring, it wont rerender your component like in a render props method. Instead it delegates it to some wrapper like `<animated.circle>`. From there it can choose whether to animate it by setting the attribute directly, or setting it via css. I suspect it uses css transforms since it owns the component so it has access to the element id. Setting via css has some advantages for it bypasses react rendering cycle.

This code will render only once. The component that actually rerenders is `animated.circle`.

```
const props = useSpring({ cx: 300, r: 100, from: { cx: 0, r: 30 } });

return <animated.circle	cx={props.cx} cy={20}	r={props.r}	/>

```
