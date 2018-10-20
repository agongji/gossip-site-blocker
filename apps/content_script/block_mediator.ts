class BlockMediator {
    private readonly url: string;
    private blockReason: BlockReason | null;
    private readonly blockTarget: BlockTarget;

    private readonly operationDiv: HTMLDivElement;
    private readonly hideAnchor: HideAnchor;
    private readonly unhideAnchor: UnhideAnchor;
    private readonly blockAnchor: BlockAnchor;

    private readonly defaultBlockType: string;
    private blockDialog: BlockDialog;

    constructor(g: IBlockable, blockState: BlockState, defaultBlockType: string) {
        const operationDiv = document.createElement("div");
        operationDiv.classList.add("block-anchor");

        const blockTarget = new BlockTarget(this, g.getElement(), g.getUrl(), blockState.getState());

        const hideAnchor = new HideAnchor(this, operationDiv);
        const blockAnchor = new BlockAnchor(this, operationDiv);
        const unhideAnchor = new UnhideAnchor(this, operationDiv);

        this.url = g.getUrl();
        this.blockReason = blockState.getReason();
        this.blockTarget = blockTarget;
        this.blockAnchor = blockAnchor;
        this.operationDiv = operationDiv;
        this.unhideAnchor = unhideAnchor;
        this.hideAnchor = hideAnchor;
        this.defaultBlockType = defaultBlockType;

        // insert anchor after target.
        DOMUtils.insertAfter(blockTarget.getDOMElement(), this.operationDiv);

        switch (blockState.getState()) {
            case "none":
                this.none();
                break;

            case "soft":
                this.hide();
                break;
        }
    }

    public setWrappable(width: string) {
        this.operationDiv.style.width = width;
        this.operationDiv.style.whiteSpace = "normal";
    }

    public none() {
        this.blockAnchor.none();
        this.blockTarget.none();
        this.unhideAnchor.none();
        this.hideAnchor.none();
    }

    public hide() {
        this.blockAnchor.hide();
        this.blockTarget.hide();
        this.unhideAnchor.hide(this.blockReason!.getWord());
        this.hideAnchor.hide();
    }

    public unhide() {
        this.blockAnchor.unhide(this.blockReason!);
        this.blockTarget.unhide();
        this.unhideAnchor.unhide();
        this.hideAnchor.unhide();
    }

    public async block(url: string, blockType: string) {
        await BlockedSitesRepository.add(url, blockType);
        if (blockType === "hard") {
            this.blockTarget.remove();
            this.operationDiv.parentElement!.removeChild(this.operationDiv);
            return;
        }

        this.blockReason = new BlockReason(BlockType.URL, url);

        this.blockAnchor.block();
        this.blockTarget.block(url);
        this.unhideAnchor.block(url);
        this.hideAnchor.block();
    }

    public showBlockDialog() {
        // show dialog.
        this.blockDialog = new BlockDialog(this, this.url, this.defaultBlockType);
    }

    public async blockPage(url: string, blockType: string) {
        await this.block(url, blockType);
    }
}
