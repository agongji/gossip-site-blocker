import BlockedSiteOption from './blocked_site_option';

/**
 * URL field
 */
export class BlockedSiteUrlField {
    public element: HTMLInputElement;

    /**
     *
     * @param {BlockedSiteOption} mediator
     * @param {string} url
     */
    constructor(mediator: BlockedSiteOption, url: string) {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('size', '100');
        this.element = input;

        this.setUrl(url);
    }

    public getElement(): Element {
        return this.element;
    }

    public value(): string | null {
        return this.element.getAttribute('data-value');
    }

    public getInputValue(): string {
        return this.element.value;
    }

    public toHard(): void {
        // do nothing
    }

    public toSoft(): void {
        // do nothing
    }

    public setUrl(url: string): void {
        this.element.setAttribute('data-value', url);
        this.element.value = url;
    }
}
