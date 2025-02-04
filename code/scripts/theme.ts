/*
Author: Kaspar Etter (https://kasparetter.com/)
Work: Explained from First Principles (https://ef1p.com/)
License: CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)
*/

import { getItem, setItem } from '../utility/storage';

document.getElementById('theme')?.remove();

// Declared in the HTML head.
declare const themes: {
    dark: string;
    light: string;
};

type Theme = keyof typeof themes;

let theme: Theme = 'dark';
let setByUser: boolean = true;

function setStylesheetSource(): void {
    const themeElement = document.getElementById('theme') as HTMLLinkElement | null;
    if (themeElement) {
        themeElement.href = themes[theme];
    }
}

function setTogglerText(): void {
    const togglerElement = document.getElementById('theme-toggler-text') as HTMLSpanElement | null;
    if (togglerElement) {
        togglerElement.textContent = theme === 'dark' ? 'Light' : 'Dark';
    }
}

function listener(event: MediaQueryListEvent): void {
    setTheme(event.matches ? 'light' : 'dark', false);
}

const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

function setTheme(newTheme: Theme | null, newSetByUser = true, siteLoaded = true): void {
    // Support on Safari and Edge is relatively new: https://caniuse.com/mdn-api_mediaquerylistevent
    if (!setByUser && newSetByUser && typeof mediaQuery.removeEventListener !== 'undefined') {
        mediaQuery.removeEventListener('change', listener);
    }
    if (newTheme !== null) {
        theme = newTheme;
        setByUser = newSetByUser;
    } else {
        if (setByUser && typeof mediaQuery.addEventListener !== 'undefined') {
            mediaQuery.addEventListener('change', listener);
        }
        theme = mediaQuery.matches ? 'light' : 'dark';
        setByUser = false;
    }
    if (siteLoaded) {
        setStylesheetSource();
        setTogglerText();
    }
}

setTheme(getItem('theme', setTheme), true, false);
document.write('<link rel="stylesheet" id="theme" href="' + themes[theme] + '"/>');

document.addEventListener('DOMContentLoaded', () => {
    setTogglerText();
    const toggler = document.getElementById('theme-toggler');
    if (toggler) {
        toggler.onclick = () => setItem('theme', theme === 'dark' ? 'light' : 'dark');
    }
});
