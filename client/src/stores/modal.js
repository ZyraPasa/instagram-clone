import { writable } from "svelte/store";
const modal = { title: "", content: "", isOpen: false };
export const ModalStore = writable(modal);
