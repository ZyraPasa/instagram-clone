import { writable } from "svelte/store";
const alert = { text: "", type: "", icon: "", isOpen: false };

export const AlertStore = writable(alert);
