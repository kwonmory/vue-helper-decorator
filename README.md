# Vue Helper Decorator

This library fully depends on [vue-class-component](https://github.com/vuejs/vue-class-component), inspired by [vue-propery-decorator](https://github.com/kaorun343/vue-property-decorator).

It library is for gabia Inc.

## Install

```bash
npm i vue-helper-decorator
```

## Decorator List

- @SetInitFields()
  - This saves the fields(Initial Values) to the `this`.
- @InjectInitFields()
  - Initialize fields to initial values.
- @ApplyLogAtMethods()
  - Add log function to methods in component.

## Usage

`SetInitFields` and `InjectInitFields` are decorators that help inialize field them with intial field values.

### @SetInitFields

```ts
import Vue from 'vue';

export default class SampleComponent extends Vue {
    @SetInitFields()
    
    name: string = 'himan'
    //... hooks
    //... fields
    //... methods
    //... etc
}
```

- **If you use the `@SetInitFields()`, the initial fields are stored in `this.initFields`.**

- All fields are saved by default.

```js
import Vue from 'vue';

export default class SampleComponent extends Vue {
    @SetInitFields({ seeFieldsOnConsoleLog: true })
    
    name: string = 'himan'
    //... hooks
    //... fields
    //... methods
    .//.. etc
}
```

You will see initial fields in `this`. (Use `console.log` in `mounted()`)

Or,

Make `seeFieldsOnConsoleLog` parameter is `true`

you will see inistal fields on `browser console`.

### @InjectInitFields

```js
import Vue from 'vue';

export default class SampleComponent extends Vue {
    @SetInitFields({ seeFieldsOnConsoleLog: true })
    
    //... hooks
    //... fields

    @InjectInitFields()
    initFields() {
        // ... someting
    }
    //... etc
}
```

- `@InjectInitFields()` should always be used with `@SetInitFields()`.

- Use `@InjectInitFields()` in `method`.

- **When the method is called, fields are initialized.**

```js
import Vue from 'vue';

export default class SampleComponent extends Vue {
    @SetInitFields({ seeFieldsOnConsoleLog: true })
    
    ... hooks
    data: string = 'hi';
    num: number = 10;

    @InjectInitFields({ exceptFields: ['num']})
    initFields() {
        // ... someting
    }
    ... etc
}
```

- Also, Field targets can be exclueded.

- In the following example, Only the rest of the `num field` is initialized.

## ApplyLogAtMethods

This is adds a log function to the methods.

```js
import Vue from 'vue';

export default class SampleComponent extends Vue {
    @ApplyLogAtMethods()
    
    ... hooks
    data: string = 'hi';
    num: number = 10;

    initFields() {
        // ... someting
    }
    ... etc
}
```

- **For all methods in the component, you can see the log when called. (console tap in developer tools)**

you can see next:

- Invoked method name
- Invoked component name
- Invoked method's parameters
- Invoked method's return values
- Invoked method's runtime

```js
import Vue from 'vue';

export default class SampleComponent extends Vue {
    @ApplyLogAtMethods({ exceptMethods: ['initFields'] })
    
    ... hooks
    data: string = 'hi';
    num: number = 10;

    initFields() {
        // ... someting
    }

    test() {

    }
    ... etc
}
```

Also, Method targets can be exclueded.

In the following example, Only the rest of `the initFields method` is initialized.

## License

MIT
