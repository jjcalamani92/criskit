import { browser } from "$app/environment";
import { writable } from "svelte/store";

const defaultValue = 'summer';
const initialValue = browser ? window.localStorage.getItem('theme') ?? defaultValue : defaultValue;
 
export const theme = writable(initialValue);
 
theme.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('theme', value);
  }
});
 