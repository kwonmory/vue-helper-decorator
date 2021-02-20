import Vue, { ComponentOptions } from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    [x: string]: unknown;
    created: () => void;
    initFields?: object;
  }
}

export interface CustomComponentOptions extends ComponentOptions<Vue> {
  $data?: object;
  initFields?: object;
}