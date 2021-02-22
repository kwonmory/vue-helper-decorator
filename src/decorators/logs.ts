import { ComponentOptions } from 'vue';
import { createDecorator } from 'vue-class-component';

export const ApplyLogAtMethods = (
  { exceptMethods }: { exceptMethods: string[] } = { exceptMethods: [] },
) => (target: Vue, key: string) => {
  createDecorator((options: ComponentOptions<Vue>) => {
    if (!options.methods) return;

    for (const methodName of Object.keys(options.methods)) {
      if (~exceptMethods.indexOf(methodName)) continue;

      const originalMethod = options.methods[methodName];

      options.methods[methodName] = function (...args) {
        const seed = Math.abs(Math.floor(Math.random() * 1000));

        console.log(
          `%cInvoke[${seed}] Component: ${options.name} - Method: ${methodName}`,
          'color: blue; font-weight: 600',
        );
        console.log(`- [${seed}]Parameters:`, args);

        const startTime = new Date().getTime();
        const result = originalMethod.apply(this, args);

        console.log(`- [${seed}]returns:`, result);
        console.log(
          `- [${seed}]runtime: ${(new Date().getTime() - startTime) / 1000}초`,
        );

        return result;
      };
    }
  })(target, key);
};
