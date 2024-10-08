import omit from 'lodash.omit';
import { nanoid } from 'nanoid';

import { create } from '~stores/zustand';

import { ErrorStore } from './useError.types';

export const useError = create<ErrorStore>((set) => ({
  addError: (error): string => {
    const id = nanoid();

    set((state) => ({
      errors: { ...state.errors, [id]: { message: error.message } },
    }));

    return id;
  },

  errors: {},

  removeError: (idToRemove: string): void => {
    set((state) => {
      const errors = omit(state.errors, idToRemove);
      return { errors };
    });
  },
}));
