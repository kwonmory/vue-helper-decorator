import Vue from 'vue';
import Component from 'vue-class-component';
import { ApplyLogAtMethods } from '../../src/decorators/logs';

describe('ApplayLogAtMethods', () => {
  context('when exceptMethods parameter is given', () => {
    @Component
    class Sample extends Vue {
      @ApplyLogAtMethods({ exceptMethods: ['method1', 'method2'] })
      method1() {
        return 'sample1';
      }

      method2() {
        return 'sample2';
      }

      method3(a: number, b: number, c: number) {
        return `${a}-${b}-${c}`;
      }
    }

    it('returns method return value', () => {
      const component = new Sample();
      const methods = component.$options.methods as SampleMethodsType;

      expect(methods.method1()).toBe('sample1');
      expect(methods.method2()).toBe('sample2');
      expect(methods.method3(1, 2, 3)).toBe('1-2-3');
    });

    it('calls console.log when method3 called', () => {
      console.log = jest.fn();
      const component = new Sample();
      const methods = component.$options.methods as SampleMethodsType;

      expect(methods.method3(1, 2, 3)).toBe('1-2-3');
      expect(console.log).toHaveBeenCalled();
    });

    it('not calls console.log when method1 called, because expect method1, 2', () => {
      console.log = jest.fn();
      const component = new Sample();
      const methods = component.$options.methods as SampleMethodsType;

      expect(methods.method1()).toBe('sample1');
      expect(methods.method2()).toBe('sample2');

      expect(console.log).not.toHaveBeenCalled();
    });
  });

  context('when exceptMethods parameter is not given', () => {
    @Component
    class Sample extends Vue {
      @ApplyLogAtMethods()
      method1() {
        return 'sample1';
      }

      method2() {
        return 'sample2';
      }

      method3(a: number, b: number, c: number) {
        return `${a}-${b}-${c}`;
      }
    }

    it('returns method return value', () => {
      console.log = jest.fn();
      const component = new Sample();
      const methods = component.$options.methods as SampleMethodsType;

      expect(methods.method1()).toBe('sample1');
      expect(methods.method2()).toBe('sample2');
      expect(methods.method3(1, 2, 3)).toBe('1-2-3');

      expect(console.log).toHaveBeenCalled();
    });

    it('calls console.log about all methods', () => {
      const component = new Sample();
      const methods = component.$options.methods as { [x: string]: any };

      for (const method of Object.keys(methods)) {
        console.log = jest.fn();
        expect(console.log).not.toBeCalled();
        methods[method]();
        expect(console.log).toBeCalled();
      }
    });
  });
});

type SampleMethodsType = {
  method1: () => string;
  method2: () => string;
  method3: (a: number, b: number, c: number) => string;
};
