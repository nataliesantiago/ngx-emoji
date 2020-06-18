import { ChangeDetectorRef, EventEmitter, OnChanges } from '@angular/core';
import { Emoji, EmojiData, EmojiService } from 'cs-ngx-emoji/ngx-emoji';
export declare class PreviewComponent implements OnChanges {
    ref: ChangeDetectorRef;
    private emojiService;
    title?: string;
    emoji: any;
    idleEmoji: any;
    i18n: any;
    emojiIsNative?: Emoji['isNative'];
    emojiSkin?: Emoji['skin'];
    emojiSize?: Emoji['size'];
    emojiSet?: Emoji['set'];
    emojiSheetSize?: Emoji['sheetSize'];
    emojiBackgroundImageFn?: Emoji['backgroundImageFn'];
    skinChange: EventEmitter<number>;
    emojiData: Partial<EmojiData>;
    listedEmoticons?: string[];
    constructor(ref: ChangeDetectorRef, emojiService: EmojiService);
    ngOnChanges(): void;
}
