import {writable} from 'svelte/store';

export const isMobile = writable(false);
export const treeStore = writable([{
    href: "/",
    icon: "ion-home",
    name: "home"
}]);

export const notification = writable(true);