/* global ChromeStorage, Logger, MenuPosition */

interface IOptionRepository {
    isDeveloperMode(): Promise<boolean>;

    setDeveloperMode(mode: boolean): Promise<void>;

    getBannedWordOption(): Promise<IBannedWordOption>;

    setShowBlockedByWordInfo(mode: boolean): Promise<void>;

    getAutoBlockIDNOption(): Promise<IAutoBlockIDNOption>;

    setAutoBlockIDNOption(autoBlockIDN: IAutoBlockIDNOption): Promise<void>;

    defaultBlockType(): Promise<string>;

    setDefaultBlockType(type: string): Promise<void>;

    menuPosition(): Promise<MenuPosition>;

    setMenuPosition(position: string): Promise<void>;

    blockGoogleNews(): Promise<boolean>;

    setBlockGoogleNews(mode: boolean): Promise<void>;
}

interface IDefaultBlockTypeOption {
    defaultBlockType: string;
}

interface IDeveloperOption {
    developerMode: boolean;
}

interface IBannedWordOptionStorage {
    bannedWord: IBannedWordOption;
}

interface IBannedWordOption {
    showInfo: boolean;
}

interface IAutoBlockIDNOptionStorage {
    autoBlockIDN: IAutoBlockIDNOption;
}

interface IAutoBlockIDNOption {
    enabled: boolean;
}

interface IMenuPositionOption {
    menuPosition: string;
}

interface IBlockGoogleNewsStorage {
    blockGoogleNews: IBlockGoogleNews;
}

interface IBlockGoogleNews {
    enabled: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OptionRepository: IOptionRepository = {
    async isDeveloperMode(): Promise<boolean> {
        const items = await ChromeStorage.get({ developerMode: false }) as IDeveloperOption;
        return items.developerMode;
    },

    async setDeveloperMode(mode: boolean): Promise<void> {
        await ChromeStorage.set({ developerMode: mode });

        Logger.log("set 'developerMode' to =>", mode);
    },

    async getBannedWordOption(): Promise<IBannedWordOption> {
        const bannedWordDefault = { showInfo: false };
        const items: IBannedWordOptionStorage = await ChromeStorage.get(
            { bannedWord: bannedWordDefault },
        );
        return items.bannedWord;
    },

    async setShowBlockedByWordInfo(showBlockInfo: boolean): Promise<void> {
        const values: IBannedWordOption = { showInfo: showBlockInfo };
        await ChromeStorage.set({ bannedWord: values });

        Logger.debug("set 'bannedWord' to =>", values);
    },

    async getAutoBlockIDNOption(): Promise<IAutoBlockIDNOption> {
        const autoBlockIDNDefault = { enabled: false };
        const items: IAutoBlockIDNOptionStorage = await ChromeStorage.get(
            { autoBlockIDN: autoBlockIDNDefault },
        ) as IAutoBlockIDNOptionStorage;
        return items.autoBlockIDN;
    },

    async setAutoBlockIDNOption(autoBlockIDN: IAutoBlockIDNOption): Promise<void> {
        await ChromeStorage.set({ autoBlockIDN });

        Logger.debug("set 'autoBlockIDN' to =>", autoBlockIDN);
    },

    async defaultBlockType(): Promise<string> {
        const items = await ChromeStorage.load({ defaultBlockType: 'soft' }) as IDefaultBlockTypeOption;
        return items.defaultBlockType;
    },

    async setDefaultBlockType(type: string): Promise<void> {
        await ChromeStorage.save({ defaultBlockType: type });

        Logger.log("set 'defaultBlockType' to =>", type);
    },

    async menuPosition(): Promise<MenuPosition> {
        const items = await ChromeStorage.load({ menuPosition: 'default' }) as IMenuPositionOption;
        const { menuPosition } = items;

        switch (menuPosition) {
        case MenuPosition.COMPACT:
            return MenuPosition.COMPACT;
        case MenuPosition.DEFAULT:
        default:
            return MenuPosition.DEFAULT;
        }
    },

    async setMenuPosition(position: string): Promise<void> {
        await ChromeStorage.save({ menuPosition: position });

        Logger.debug("set 'menuPosition' to =>", position);
    },

    async blockGoogleNews(): Promise<boolean> {
        const blockGoogleNewsDefault = {enabled: false};
        const items = await ChromeStorage.get({blockGoogleNews: blockGoogleNewsDefault}) as IBlockGoogleNewsStorage;
        return items.blockGoogleNews.enabled;
    },

    async setBlockGoogleNews(mode: boolean): Promise<void> {
        const blockGoogleNews: IBlockGoogleNews = {enabled: mode};
        await ChromeStorage.save({blockGoogleNews});

        Logger.log("set 'blockGoogleNews' to =>", blockGoogleNews);
    },
};
