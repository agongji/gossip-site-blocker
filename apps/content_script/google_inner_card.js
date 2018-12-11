class GoogleInnerCard {
    constructor(element) {
        const anchorList = element.getElementsByTagName("a");
        const urlList = [];
        for (const anchor of anchorList) {
            const ping = anchor.getAttribute("ping");
            const href = anchor.getAttribute("href");
            if (href === null) {
                continue;
            }
            if (ping === null) {
                continue;
            }
            urlList.push(href);
        }
        // ignore if no anchor.
        if (urlList.length === 0) {
            this.valid = false;
            return;
        }
        const heading = element.querySelector("[role=heading]");
        if (heading) {
            this.title = heading.textContent;
        }
        this.valid = true;
        this.url = urlList[0];
        this.element = element;
    }
    canBlock() {
        return this.valid;
    }
    getUrl() {
        return this.url;
    }
    getElement() {
        return this.element;
    }
    getOperationInsertPoint() {
        const div = this.element.querySelector("div");
        if (div !== null) {
            return div;
        }
        else {
            return this.element;
        }
    }
    deleteElement() {
        this.element.parentElement.removeChild(this.element);
    }
    contains(keyword) {
        return this.title !== "" && this.title.includes(keyword);
    }
    getPosition() {
        return "relative";
    }
    getCssClass() {
        return "block-google-inner-card";
    }
}
//# sourceMappingURL=google_inner_card.js.map