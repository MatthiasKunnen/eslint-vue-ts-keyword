# Unrelated Vue file causes an infinite loop while linting another Vue file

Linting [`src/limited.vue`](src/limited.vue) hangs due to [`src/hang-cause.vue`](src/hang-cause.vue). Test this using `yarn run lint:hang`.

The strange thing however, is that linting [`src/hang-cause.vue`](src/hang-cause.vue) does not hang. Test this using `yarn run lint:cause`.

**My thoughts**  
I believe the problem is that typescript-estree:createWatchProgram parses all files that are mentioned in the tsconfig's include property which makes it attempt to parse the <template> tags which causes the infinite loop. This despite the parser being set to `<template>: espree`. Now the question is if this can be avoided.

## Failing code
The problem occurs in very specific circumstances. Examples of code that causes the issue:

```vue
<template>
    <div style="display: none"
         static
         class=""
    >
    </div>
</template>
```

```vue
<template>
  <div data-test="
        static
        class">
  </div>
</template>
```

## Succeeding code
The following examples do not cause infinite loops.

```vue
<template>
  <div style="display: none"
       static class="">
  </div>
</template>
```

```vue
<template>
  <div
      static
      class="">
  </div>
</template>
```

```vue
<template>
  <div
      static
  >
  </div>
</template>
```

## Error
Eslint eventually fails with `FATAL ERROR: invalid array length Allocation failed - JavaScript heap out of memory`.
See [`error.log`](error.log).
