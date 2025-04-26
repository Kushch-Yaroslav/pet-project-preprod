export const targets: Set<HTMLElement> = new Set<HTMLElement>();

export function register(el: HTMLElement) {
    targets.add(el);
}

export function unregister(el: HTMLElement) {
    targets.delete(el);
}