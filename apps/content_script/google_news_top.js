class GoogleNewsTop {
    constructor(element) {
        const anchor = element.querySelector("a");
        if (anchor === null) {
            this.valid = false;
            this.ignoreExplicitly = false;
            return;
        }
        let href = anchor.getAttribute("href");
        // firefox, coccoc, ...
        if (href.startsWith("/url?")) {
            const matchData = href.match("&url=(.*)&");
            if (matchData !== null) {
                href = matchData[0];
            }
        }
        const h3 = element.querySelector("h3");
        // ignore if no h3(ex. Google Translate)
        if (h3 === null) {
            this.valid = false;
            this.ignoreExplicitly = true;
            return;
        }
        const title = h3.textContent ? h3.textContent : "";
        const st = element.querySelector(".st");
        const contents = st ? st.textContent : "";
        this.valid = true;
        this.ignoreExplicitly = false;
        this.url = href;
        this.element = element;
        this.title = title;
        this.contents = contents;
        // "YYYY/MM/DD" text.
        this.operationInsertPoint = element.querySelector("span.fwzPFf");
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
        return "block-google-news-top";
    }
}
//# sourceMappingURL=google_news_top.js.map