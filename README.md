# Unrelated Vue file causes an infinite loop while linting another Vue file

Linting [`src/limited.vue`](src/limited.vue) hangs due to [`src/hang-cause.vue`](src/hang-cause.vue). Test this using `yarn run lint:hang`.

The strange thing however, is that linting [`src/hang-cause.vue`](src/hang-cause.vue) does not hang. Test this using `yarn run lint:cause`.

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
