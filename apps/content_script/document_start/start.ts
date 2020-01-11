/* global BannedWordRepository, BlockedSitesRepository, blockGoogleElement, blockGoogleInnerCard,
   blockGoogleTopNews, Logger, OptionRepository, RegExpRepository */

interface IOptions {
    blockedSites: BlockedSites;
    bannedWords: IBannedWord[];
    regexpList: IRegExpItem[];
    idnOption: IAutoBlockIDNOption;
    defaultBlockType: string;
    menuPosition: MenuPosition;
    bannedWordOption: IBannedWordOption;
}

let gsbOptions: IOptions | null = null;

// add observer
const observer = new MutationObserver((mutations) => {
    const params = (new URL(document.location.href)).searchParams;
    const isGoogleNews = params.get('tbm') === 'nws';

    mutations.forEach((mutation) => {
        for (const node of mutation.addedNodes) {
            if (node instanceof Element) {
                const isGoogleNewsCardSection = node.matches('div.card-section');
                const isGoogleNewsTop = node.matches('div.gG0TJc');

                if (isGoogleNewsCardSection && isGoogleNews) {
                    if (gsbOptions !== null) {
                        tryBlockGoogleNewsCardSection(node, gsbOptions);
                    } else {
                        pendingsGoogleNewsCardSection.push(node);
                    }
                } else if (isGoogleNewsTop && isGoogleNews) {
                    if (gsbOptions !== null) {
                        tryBlockGoogleNewsTop(node, gsbOptions);
                    } else {
                        pendingsGoogleNewsTop.push(node);
                    }
                } else if (node.classList.contains('g') && !isGoogleNews) {
                    if (gsbOptions !== null) {
                        tryBlockGoogleElement(node, gsbOptions);
                    } else {
                        pendingsGoogle.push(node);
                    }
                } else if (node.nodeName.toLowerCase() === 'g-inner-card') {
                    if (gsbOptions !== null) {
                        tryBlockGoogleInnerCard(node, gsbOptions);
                    } else {
                        pendingsInnerCard.push(node);
                    }
                } else if (node.classList.contains('dbsr')) {
                    if (gsbOptions !== null) {
                        tryBlockGoogleTopNews(node, gsbOptions);
                    } else {
                        pendingsTopNews.push(node);
                    }
                }
            }
        }
    });
});

const pendingsGoogle: Element[] = [];
const pendingsInnerCard: Element[] = [];
const pendingsTopNews: Element[] = [];
const pendingsGoogleNewsCardSection: Element[] = [];
const pendingsGoogleNewsTop: Element[] = [];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const blockReasons: BlockReason[] = [];
const config = { childList: true, subtree: true };
observer.observe(document.documentElement, config);

(async (): Promise<void> => {
    const blockedSites: BlockedSites = await BlockedSitesRepository.load();
    const bannedWords: IBannedWord[] = await BannedWordRepository.load();
    const regexpList: IRegExpItem[] = await RegExpRepository.load();
    const idnOption = await OptionRepository.getAutoBlockIDNOption();
    const defaultBlockType: string = await OptionRepository.defaultBlockType();
    const menuPosition: MenuPosition = await OptionRepository.menuPosition();
    const bannedWordOption: IBannedWordOption = await OptionRepository.getBannedWordOption();
    Logger.debug('autoBlockIDNOption:', idnOption);

    gsbOptions = {
        blockedSites,
        bannedWords,
        regexpList,
        idnOption,
        defaultBlockType,
        menuPosition,
        bannedWordOption,
    };

    for (const node of pendingsGoogle) {
        tryBlockGoogleElement(node, gsbOptions);
    }

    for (const node of pendingsInnerCard) {
        tryBlockGoogleInnerCard(node, gsbOptions);
    }

    for (const node of pendingsTopNews) {
        tryBlockGoogleTopNews(node, gsbOptions);
    }

    for (const node of pendingsGoogleNewsCardSection) {
        tryBlockGoogleNewsCardSection(node, gsbOptions);
    }

    for (const node of pendingsGoogleNewsTop) {
        tryBlockGoogleNewsTop(node, gsbOptions);
    }
})();

const subObserverList: MutationObserver[] = [];

type IBlockFunction = (g1: Element, options: IOptions) => boolean;

function blockClosure(node: Element, options: IOptions, blockFunc: IBlockFunction): () => void {
    let completed = false;
    return (): void => {
        if (completed) {
            return;
        }

        completed = blockFunc(node, options);
    };
}

function tryBlockElement(node: Element, options: IOptions, blockFunction: IBlockFunction): void {
    // first, try block.
    const completed = blockFunction(node, options);
    if (completed) {
        return;
    }

    // if failed, add observer for retry.
    const block = blockClosure(node, options, blockFunction);
    const subObserver = new MutationObserver(() => {
        block();
    });

    subObserver.observe(node, { childList: true, subtree: true });
    subObserverList.push(subObserver);
}

function tryBlockGoogleElement(node: Element, options: IOptions): void {
    tryBlockElement(node, options, blockGoogleElement);
}

function tryBlockGoogleInnerCard(node: Element, options: IOptions): void {
    tryBlockElement(node, options, blockGoogleInnerCard);
}

function tryBlockGoogleTopNews(node: Element, options: IOptions): void {
    tryBlockElement(node, options, blockGoogleTopNews);
}

function tryBlockGoogleNewsCardSection(node: Element, options: IOptions) {
    tryBlockElement(node, options, blockGoogleNewsCardSection);
}

function tryBlockGoogleNewsTop(node: Element, options: IOptions) {
    tryBlockElement(node, options, blockGoogleNewsTop);
}

document.addEventListener('DOMContentLoaded', () => {
    // clear sub-observer
    for (const subObserver of subObserverList) {
        subObserver.disconnect();
    }
});
