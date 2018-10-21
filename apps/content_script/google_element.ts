class GoogleElement implements IBlockable {
    public valid: boolean;
    public url: string;
    public element: Element;
    private readonly title: string | null;
    private readonly contents: string;

    constructor(element: Element) {
        const classList = element.classList;

        // ignore if any element has class=g
        let parent = element.parentElement;
        while (true) {
            // when root element
            if (parent === null) {
                break;
            }

            if (parent.classList.contains("g")) {
                this.valid = false;
                return;
            }

            parent = parent.parentElement;
        }

        // ignore right pane
        if (classList.contains("rhsvw")) {
            this.valid = false;
            return;
        }

        const anchorList: NodeListOf<HTMLAnchorElement> = element.getElementsByTagName("a");

        const urlList: string[] = [];
        for (const anchor of anchorList) {
            const ping = anchor.getAttribute("ping");
            const href = anchor.getAttribute("href");

            if (href === null) {
                continue;
            }

            if (!href.startsWith("https://books.google") && ping === null) {
                continue;
            }

            urlList.push(href);
        }

        // ignore if no anchor.
        if (urlList.length === 0) {
            this.valid = false;
            return;
        }

        const h3 = element.querySelector("h3");

        // ignore if no h3(ex. Google Translate)
        if (h3 === null) {
            this.valid = false;
            return;
        }

        const title = h3.textContent;
        const st: HTMLSpanElement | null = element.querySelector(".st");
        const contents = st ? st.textContent! : "";

        this.valid = true;
        this.url = urlList[0];
        this.element = element;
        this.title = title;
        this.contents = contents;
    }

    public canBlock() {
        return this.valid;
    }

    public contains(keyword: string): boolean {
        if (this.title && this.title.includes(keyword)) {
            return true;
        }

        return this.contents !== "" && this.contents.includes(keyword);
    }

    public getUrl(): string {
        return this.url;
    }

    public getElement(): Element {
        return this.element;
    }

    public deleteElement() {
        this.element.parentElement!.removeChild(this.element);
    }
}
