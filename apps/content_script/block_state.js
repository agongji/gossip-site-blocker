var BlockType;
(function (BlockType) {
    BlockType[BlockType["URL_EXACTLY"] = 0] = "URL_EXACTLY";
    BlockType[BlockType["URL"] = 1] = "URL";
    BlockType[BlockType["WORD"] = 2] = "WORD";
    BlockType[BlockType["IDN"] = 3] = "IDN";
})(BlockType || (BlockType = {}));
class BlockState {
    constructor(blockable, blockedSites, bannedWords, idnOption) {
        const blockedSite = blockedSites.matches(blockable.getUrl());
        const banned = bannedWords.find((bannedWord) => {
            const keyword = bannedWord.keyword;
            return blockable.contains(keyword);
        });
        if (blockedSite) {
            this.state = blockedSite.getState();
            if (DOMUtils.removeProtocol(blockable.getUrl()) === blockedSite.url) {
                this.blockReason = new BlockReason(BlockType.URL_EXACTLY, blockedSite.url);
            }
            else {
                this.blockReason = new BlockReason(BlockType.URL, blockedSite.url);
            }
            return;
        }
        else if (banned) {
            this.state = "soft";
            this.blockReason = new BlockReason(BlockType.WORD, banned.keyword);
            return;
        }
        // check IDN
        const enabled = idnOption.enabled;
        if (enabled) {
            const url = blockable.getUrl();
            const hostname = DOMUtils.getHostName(url);
            if (hostname.startsWith("xn--") || hostname.includes(".xn--")) {
                this.state = "soft";
                this.blockReason = new BlockReason(BlockType.IDN, chrome.i18n.getMessage("IDN"));
                return;
            }
        }
        this.state = "none";
        this.blockReason = null;
    }
    getReason() {
        return this.blockReason;
    }
    getState() {
        return this.state;
    }
}
//# sourceMappingURL=block_state.js.map