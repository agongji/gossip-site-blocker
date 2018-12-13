describe("BlockState", () => {
    function createTarget(url: string, contains: boolean) {
        return {
            contains(keyword: string): boolean {
                return contains;
            },

            getUrl(): string {
                return url;
            },
        };
    }

    function createEmptySites() {
        return {
            matches(urlArg: string): BlockedSite | undefined {
                return undefined;
            },
        };
    }

    function createSites(blockType: string, url: string) {
        return {
            matches(urlArg: string): BlockedSite | undefined {
                return new BlockedSite({block_type: blockType, url});
            },
        };
    }

    function createBannedWord(keyword: string, blockType: BlockType) {
        return {
            blockType, keyword,
        };
    }

    const idnOption: IAutoBlockIDNOption = {
        enabled: true,
    };

    it("block by URL", () => {
        const target = createTarget("http://example.com/foo/bar", false);
        const sites = createSites("soft", "example.com");

        const blockState = new BlockState(target, sites, [], idnOption);
        expect(blockState.getReason()!.getType()).toBe(BlockReasonType.URL);
        expect(blockState.getReason()!.getWord()).toBe("example.com");
        expect(blockState.getState()).toBe("soft");
    });

    it("block by URL exactly", () => {
        const target = createTarget("http://example.com", false);
        const sites = createSites("soft", "example.com");

        const blockState = new BlockState(target, sites, [], idnOption);
        expect(blockState.getReason()!.getType()).toBe(BlockReasonType.URL_EXACTLY);
        expect(blockState.getReason()!.getWord()).toBe("example.com");
        expect(blockState.getState()).toBe("soft");
    });

    it("block by word", () => {
        const target = createTarget("http://example.com", true);
        const bannedList = [createBannedWord("evil", BlockType.SOFT)];

        const blockState = new BlockState(target, createEmptySites(), bannedList, idnOption);
        expect(blockState.getReason()!.getType()).toBe(BlockReasonType.WORD);
        expect(blockState.getReason()!.getWord()).toBe("evil");
        expect(blockState.getState()).toBe("soft");
    });
});
