import {createDecorator} from 'vue-class-component';
import Vue from 'vue';
import _ from 'lodash';
import {CustomComponentOptions} from '../types';

export const SetInitFields = (
  {seeFieldsOnConsoleLog}: {seeFieldsOnConsoleLog?: boolean} = {
    seeFieldsOnConsoleLog: false,
  },
) => (target: Vue, key: string) => {
  createDecorator((options: CustomComponentOptions) => {
    const origin = options.created;
    options.created = function wrapper() {
      const cloneData = _.cloneDeep(this.$data);
      this.initFields = cloneData;

      if (seeFieldsOnConsoleLog) console.log(cloneData);
      return origin;
    };
  })(target, key);
};

export const InjectInitFields = (
  {exceptFields}: {exceptFields: string[]} = {exceptFields: []},
) => (target: Vue, key: string) => {
  createDecorator((options: CustomComponentOptions, key) => {
    if (!options.methods) return;

    const originalMethod = options.methods[key];

    options.methods[key] = function wrapperMethod() {
      const target = Object.entries(this.initFields || []);

      for (const [name, value] of target) {
        if (~exceptFields.indexOf(name)) continue;

        this[name] = _.cloneDeep(value);
      }

      return originalMethod.apply(this);
    };
  })(target, key);
};
