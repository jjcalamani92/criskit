import { writable } from 'svelte/store';


function createUI() {
	const { subscribe, set, update } = writable(false);

	return {
		subscribe,
		toggle: () => update((n) => !n),
		close: () => set(false)
	};
}

export const cart = createUI();
export const form = createUI();
export const formAdd = createUI();
export const formUpdate = createUI();
export const modal = createUI();
export const menu = createUI();
export const search = createUI();
export const quickviews = createUI();
export const menuMobile = createUI();

