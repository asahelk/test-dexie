import { writable } from 'svelte/store';
import type { StartStopNotifier, Updater, Writable } from 'svelte/store';
import { browser } from '$app/environment';

export const persistStore = <T>(
	key: string,
	initial: T,
	start?: StartStopNotifier<T>,
	onChange?: (value: T) => void
) => {
	function update(updater: Updater<T>) {
		store.update((current) => {
			const newValue = updater(current);
			if (newValue !== current) onChange?.(newValue);

			return newValue;
		});
	}

	function reset() {
		update(() => initial);
	}

	function hasChanged(value: T) {
		return JSON.stringify(value) != JSON.stringify(initial);
	}

	if (!browser) return { ...writable(initial, start), reset, hasChanged };

	let data = initial;

	const items = window.localStorage.getItem(key);
	data = items && browser ? (JSON.parse(items) ?? initial) : initial;

	const store: Writable<T> = writable(data, (set, update) => {
		start?.(set, update);

		const unsubscribe = store.subscribe((value) => {
			localStorage.setItem(key, JSON.stringify(value));
		});
		return unsubscribe;
	});

	return { ...store, reset, hasChanged };
};

const STORAGE_NAME = 'feed-items';

export const pokemonFeedItems = persistStore(STORAGE_NAME, {});
