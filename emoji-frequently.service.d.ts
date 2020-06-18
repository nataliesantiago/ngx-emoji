import { EmojiData } from 'cs-ngx-emoji/ngx-emoji';
export declare class EmojiFrequentlyService {
    NAMESPACE: string;
    frequently: {
        [key: string]: number;
    } | null;
    defaults: {
        [key: string]: number;
    };
    initialized: boolean;
    DEFAULTS: string[];
    init(): void;
    add(emoji: EmojiData): void;
    get(perLine: number, totalLines: number): any[];
}
