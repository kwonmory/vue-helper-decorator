import Vue from 'vue';
import Component from 'vue-class-component';
import { InjectInitFields, SetInitFields } from '../../src/decorators/fields';

describe('SetInitFields', () => {
  context('when seeFieldsOnConsoleLog parameter is given', () => {
    @Component
    class Sample extends Vue {
      @SetInitFields({ seeFieldsOnConsoleLog: true })
      field1 = 'first';

      field2 = 0;

      created = () => {};

      changeFields() {
        this.field1 = 'changed';
        this.field2 = 1;
      }
    }

    it('have fields', () => {
      const component = new Sample();

      expect(component.field1).toBe('first');
      expect(component.field2).toBe(0);

      component.changeFields();
      expect(component.field1).toBe('changed');
      expect(component.field2).toBe(1);
    });

    it('have init fields', () => {
      const component = new Sample();

      component.changeFields();

      const fields = component.initFields as SampleFieldsType;

      expect(fields.field1).toBe('first');
      expect(fields.field2).toBe(0);
    });

    it('calls console.log about init fields', () => {
      console.log = jest.fn();
      new Sample();

      expect(console.log).toBeCalled();
    });
  });

  context('when seeFieldsOnConsoleLog parameter is not given', () => {
    @Component
    class Sample extends Vue {
      @SetInitFields()
      field1 = 'first';

      field2 = 0;

      created = () => {};

      changeFields() {
        this.field1 = 'changed';
        this.field2 = 1;
      }
    }

    it('not calls console.log about init fields', () => {
      console.log = jest.fn();
      new Sample();

      expect(console.log).not.toBeCalled();
    });
  });
});

describe('InjectInitFields', () => {
  context('when exceptFields parameter is given', () => {
    @Component
    class Sample extends Vue {
      @SetInitFields()
      field1 = 'first';

      field2 = 0;

      created = () => {};

      changeFields() {
        this.field1 = 'changed';
        this.field2 = 1;
      }

      @InjectInitFields({ exceptFields: ['field2'] })
      cleanFields() {
        return 'inited fields';
      }
    }

    it('initialize fields except field2', () => {
      const component = new Sample();

      expect(component.field1).toBe('first');
      expect(component.field2).toBe(0);

      component.changeFields();

      expect(component.field1).toBe('changed');
      expect(component.field2).toBe(1);

      expect(component.cleanFields()).toBe('inited fields');

      expect(component.field1).toBe('first');
      expect(component.field2).toBe(1);
    });
  });

  context('when exceptFields parameter is not given', () => {
    @Component
    class Sample extends Vue {
      @SetInitFields()
      field1 = 'first';

      field2 = 0;

      created = () => {};

      changeFields() {
        this.field1 = 'changed';
        this.field2 = 1;
      }

      @InjectInitFields()
      cleanFields() {
        return 'inited fields';
      }
    }

    it('initialize all fields', () => {
      const component = new Sample();

      expect(component.field1).toBe('first');
      expect(component.field2).toBe(0);

      component.changeFields();

      expect(component.field1).toBe('changed');
      expect(component.field2).toBe(1);

      expect(component.cleanFields()).toBe('inited fields');

      expect(component.field1).toBe('first');
      expect(component.field2).toBe(0);
    });
  });
});

type SampleFieldsType = {
  field1: string;
  field2: number;
};
