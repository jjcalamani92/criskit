// @ts-nocheck
import { writable } from 'svelte/store';

export const localStore = (key, initial) => {
  const toString = (value) => JSON.stringify(value, null, 2);
  const toObj = (value) => JSON.parse(value);

  const storedValue = localStorage.getItem(key);
  const initialValue = storedValue ? toObj(storedValue) : initial;

  const store = writable(initialValue);

  store.subscribe((value) => {
    localStorage.setItem(key, toString(value));
  });

  return store;
};