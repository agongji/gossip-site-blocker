class GoogleNewsCardSection {
    constructor(element) {
        const anchor = element.querySelector("a.RTNUJf");
        let href = anchor.getAttribute("href");
        // firefox, coccoc, ...
        if (href.startsWith("/url?")) {
            const matchData = href.match("&url=(.*)&");
            if (matchData !== null) {
                href = matchData[0];
            }
        }
        const title = anchor.textContent ? anchor.textContent : "";
        const st = element.querySelector(".st");
        const contents = st ? st.textContent : "";
        this.valid = true;
        this.ignoreExplicitly = false;
        this.url = href;
        this.element = element;
        this.title = title;
        this.contents = contents;
        // operation insert point
        const actionMenu = this.element.querySelector(".action-menu");
        if (actionMenu !== null) {
            this.operationInsertPoint = actionMenu;
        }
        else {
            this.operationInsertPoint = element.querySelector("a");
        }
    }
    isIgnoreable() {
        return this.ignoreExplicitly;
    }
    canBlock() {
        return this.valid;
    }
    contains(keyword) {
        if (this.title.includes(keyword)) {
            return true;
        }
        return this.contents !== "" && this.contents.includes(keyword);
    }
    containsInTitle(keyword) {
        return this.title.includes(keyword);
    }
    getUrl() {
        return this.url;
    }
    getElement() {
        return this.element;
    }
    getOperationInsertPoint() {
        return this.operationInsertPoint;
    }
    deleteElement() {
        this.element.parentElement.removeChild(this.element);
    }
    getPosition() {
        return "absolute";
    }
    getCssClass() {
        return "block-google-news-card-section";
    }
}
//# sourceMappingURL=google_news_card_section.js.map