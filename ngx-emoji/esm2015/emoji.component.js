import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { DEFAULT_BACKGROUNDFN, EmojiService } from './emoji.service';
let EmojiComponent = class EmojiComponent {
    constructor(emojiService) {
        this.emojiService = emojiService;
        this.skin = 1;
        this.set = 'apple';
        this.sheetSize = 64;
        /** Renders the native unicode emoji */
        this.isNative = false;
        this.forceSize = false;
        this.tooltip = false;
        this.size = 24;
        this.emoji = '';
        this.hideObsolete = false;
        this.SHEET_COLUMNS = 52;
        this.emojiOver = new EventEmitter();
        this.emojiLeave = new EventEmitter();
        this.emojiClick = new EventEmitter();
        this.title = '';
        this.label = '';
        this.custom = false;
        this.isVisible = true;
        // TODO: replace 4.0.3 w/ dynamic get verison from emoji-datasource in package.json
        this.backgroundImageFn = DEFAULT_BACKGROUNDFN;
    }
    ngOnChanges() {
        if (!this.emoji) {
            return (this.isVisible = false);
        }
        const data = this.getData();
        if (!data) {
            return (this.isVisible = false);
        }
        // const children = this.children;
        this.unified = data.native || null;
        if (data.custom) {
            this.custom = data.custom;
        }
        if (!data.unified && !data.custom) {
            return (this.isVisible = false);
        }
        if (this.tooltip) {
            this.title = data.shortNames[0];
        }
        if (data.obsoletedBy && this.hideObsolete) {
            return (this.isVisible = false);
        }
        this.label = [data.native]
            .concat(data.shortNames)
            .filter(Boolean)
            .join(', ');
        if (this.isNative && data.unified && data.native) {
            // hide older emoji before the split into gendered emoji
            this.style = { fontSize: `${this.size}px` };
            if (this.forceSize) {
                this.style.display = 'inline-block';
                this.style.width = `${this.size}px`;
                this.style.height = `${this.size}px`;
                this.style['word-break'] = 'keep-all';
            }
        }
        else if (data.custom) {
            this.style = {
                width: `${this.size}px`,
                height: `${this.size}px`,
                display: 'inline-block',
            };
            if (data.spriteUrl && this.sheetRows && this.sheetColumns) {
                this.style = Object.assign({}, this.style, { backgroundImage: `url(${data.spriteUrl})`, backgroundSize: `${100 * this.sheetColumns}% ${100 *
                        this.sheetRows}%`, backgroundPosition: this.emojiService.getSpritePosition(data.sheet, this.sheetColumns) });
            }
            else {
                this.style = Object.assign({}, this.style, { backgroundImage: `url(${data.imageUrl})`, backgroundSize: 'contain' });
            }
        }
        else {
            if (data.hidden.length && data.hidden.includes(this.set)) {
                if (this.fallback) {
                    this.style = { fontSize: `${this.size}px` };
                    this.unified = this.fallback(data, this);
                }
                else {
                    return (this.isVisible = false);
                }
            }
            else {
                this.style = this.emojiService.emojiSpriteStyles(data.sheet, this.set, this.size, this.sheetSize, this.backgroundImageFn, this.SHEET_COLUMNS);
            }
        }
        return (this.isVisible = true);
    }
    getData() {
        return this.emojiService.getData(this.emoji, this.skin, this.set);
    }
    getSanitizedData() {
        return this.emojiService.getSanitizedData(this.emoji, this.skin, this.set);
    }
    handleClick($event) {
        const emoji = this.getSanitizedData();
        this.emojiClick.emit({ emoji, $event });
    }
    handleOver($event) {
        const emoji = this.getSanitizedData();
        this.emojiOver.emit({ emoji, $event });
    }
    handleLeave($event) {
        const emoji = this.getSanitizedData();
        this.emojiLeave.emit({ emoji, $event });
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], EmojiComponent.prototype, "skin", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], EmojiComponent.prototype, "set", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], EmojiComponent.prototype, "sheetSize", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], EmojiComponent.prototype, "isNative", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], EmojiComponent.prototype, "forceSize", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], EmojiComponent.prototype, "tooltip", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], EmojiComponent.prototype, "size", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], EmojiComponent.prototype, "emoji", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], EmojiComponent.prototype, "fallback", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], EmojiComponent.prototype, "hideObsolete", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], EmojiComponent.prototype, "SHEET_COLUMNS", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], EmojiComponent.prototype, "sheetRows", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], EmojiComponent.prototype, "sheetColumns", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], EmojiComponent.prototype, "emojiOver", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], EmojiComponent.prototype, "emojiLeave", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], EmojiComponent.prototype, "emojiClick", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], EmojiComponent.prototype, "backgroundImageFn", void 0);
EmojiComponent = tslib_1.__decorate([
    Component({
        selector: 'ngx-emoji',
        template: `
  <button *ngIf="isVisible"
    type="button"
    (click)="handleClick($event)"
    (mouseenter)="handleOver($event)"
    (mouseleave)="handleLeave($event)"
    [title]="title"
    [attr.aria-label]="label"
    class="emoji-mart-emoji"
    [class.emoji-mart-emoji-native]="isNative"
    [class.emoji-mart-emoji-custom]="custom">
    <span [ngStyle]="style">
      <ng-template [ngIf]="isNative">{{ unified }}</ng-template>
      <ng-content></ng-content>
    </span>
  </button>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        preserveWhitespaces: false
    }),
    tslib_1.__metadata("design:paramtypes", [EmojiService])
], EmojiComponent);
export { EmojiComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1vamkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGN0cmwvbmd4LWVtb2ppLW1hcnQvbmd4LWVtb2ppLyIsInNvdXJjZXMiOlsiZW1vamkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFxRHJFLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUEyQnpCLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBMUJyQyxTQUFJLEdBQWtCLENBQUMsQ0FBQztRQUN4QixRQUFHLEdBQWlCLE9BQU8sQ0FBQztRQUM1QixjQUFTLEdBQXVCLEVBQUUsQ0FBQztRQUM1Qyx1Q0FBdUM7UUFDOUIsYUFBUSxHQUFzQixLQUFLLENBQUM7UUFDcEMsY0FBUyxHQUF1QixLQUFLLENBQUM7UUFDdEMsWUFBTyxHQUFxQixLQUFLLENBQUM7UUFDbEMsU0FBSSxHQUFrQixFQUFFLENBQUM7UUFDekIsVUFBSyxHQUFtQixFQUFFLENBQUM7UUFFM0IsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFHbEIsY0FBUyxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ25ELGVBQVUsR0FBd0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyRCxlQUFVLEdBQXdCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFL0QsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLFVBQUssR0FBRyxFQUFFLENBQUM7UUFFWCxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixtRkFBbUY7UUFDMUUsc0JBQWlCLEdBQStCLG9CQUFv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O0lBQVIsS0FBSyxFQUFFOztpREFBb0I7QUFDbkI7SUFBUixLQUFLLEVBQUU7O29EQUF1QjtBQUNyQjtJQUFULE1BQU0sRUFBRTs7aURBQW9EO0FBQ25EO0lBQVQsTUFBTSxFQUFFOztrREFBc0Q7QUFDckQ7SUFBVCxNQUFNLEVBQUU7O2tEQUFzRDtBQVF0RDtJQUFSLEtBQUssRUFBRTs7eURBQXNFO0FBekJuRSxjQUFjO0lBdEIxQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsV0FBVztRQUNyQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQlQ7UUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtRQUMvQyxtQkFBbUIsRUFBRSxLQUFLO0tBQzNCLENBQUM7NkNBNEJrQyxZQUFZO0dBM0JuQyxjQUFjLENBb0kxQjtTQXBJWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBFbW9qaURhdGEgfSBmcm9tICcuL2RhdGEvZGF0YS5pbnRlcmZhY2VzJztcbmltcG9ydCB7IERFRkFVTFRfQkFDS0dST1VOREZOLCBFbW9qaVNlcnZpY2UgfSBmcm9tICcuL2Vtb2ppLnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEVtb2ppIHtcbiAgLyoqIFJlbmRlcnMgdGhlIG5hdGl2ZSB1bmljb2RlIGVtb2ppICovXG4gIGlzTmF0aXZlOiBib29sZWFuO1xuICBmb3JjZVNpemU6IGJvb2xlYW47XG4gIHRvb2x0aXA6IGJvb2xlYW47XG4gIHNraW46IDEgfCAyIHwgMyB8IDQgfCA1IHwgNjtcbiAgc2hlZXRTaXplOiAxNiB8IDIwIHwgMzIgfCA2NDtcbiAgc2V0OlxuICAgIHwgJ2FwcGxlJ1xuICAgIHwgJ2dvb2dsZSdcbiAgICB8ICd0d2l0dGVyJ1xuICAgIHwgJ2Vtb2ppb25lJ1xuICAgIHwgJ21lc3NlbmdlcidcbiAgICB8ICdmYWNlYm9vaydcbiAgICB8ICcnO1xuICBzaXplOiBudW1iZXI7XG4gIGVtb2ppOiBzdHJpbmcgfCBFbW9qaURhdGE7XG4gIGJhY2tncm91bmRJbWFnZUZuOiAoc2V0OiBzdHJpbmcsIHNoZWV0U2l6ZTogbnVtYmVyKSA9PiBzdHJpbmc7XG4gIGZhbGxiYWNrPzogKGRhdGE6IGFueSwgcHJvcHM6IGFueSkgPT4gc3RyaW5nO1xuICBlbW9qaU92ZXI6IEV2ZW50RW1pdHRlcjxFbW9qaUV2ZW50PjtcbiAgZW1vamlMZWF2ZTogRXZlbnRFbWl0dGVyPEVtb2ppRXZlbnQ+O1xuICBlbW9qaUNsaWNrOiBFdmVudEVtaXR0ZXI8RW1vamlFdmVudD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW1vamlFdmVudCB7XG4gIGVtb2ppOiBFbW9qaURhdGE7XG4gICRldmVudDogRXZlbnQ7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1lbW9qaScsXG4gIHRlbXBsYXRlOiBgXG4gIDxidXR0b24gKm5nSWY9XCJpc1Zpc2libGVcIlxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQpXCJcbiAgICAobW91c2VlbnRlcik9XCJoYW5kbGVPdmVyKCRldmVudClcIlxuICAgIChtb3VzZWxlYXZlKT1cImhhbmRsZUxlYXZlKCRldmVudClcIlxuICAgIFt0aXRsZV09XCJ0aXRsZVwiXG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJsYWJlbFwiXG4gICAgY2xhc3M9XCJlbW9qaS1tYXJ0LWVtb2ppXCJcbiAgICBbY2xhc3MuZW1vamktbWFydC1lbW9qaS1uYXRpdmVdPVwiaXNOYXRpdmVcIlxuICAgIFtjbGFzcy5lbW9qaS1tYXJ0LWVtb2ppLWN1c3RvbV09XCJjdXN0b21cIj5cbiAgICA8c3BhbiBbbmdTdHlsZV09XCJzdHlsZVwiPlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImlzTmF0aXZlXCI+e3sgdW5pZmllZCB9fTwvbmctdGVtcGxhdGU+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9zcGFuPlxuICA8L2J1dHRvbj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxufSlcbmV4cG9ydCBjbGFzcyBFbW9qaUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgRW1vamkge1xuICBASW5wdXQoKSBza2luOiBFbW9qaVsnc2tpbiddID0gMTtcbiAgQElucHV0KCkgc2V0OiBFbW9qaVsnc2V0J10gPSAnYXBwbGUnO1xuICBASW5wdXQoKSBzaGVldFNpemU6IEVtb2ppWydzaGVldFNpemUnXSA9IDY0O1xuICAvKiogUmVuZGVycyB0aGUgbmF0aXZlIHVuaWNvZGUgZW1vamkgKi9cbiAgQElucHV0KCkgaXNOYXRpdmU6IEVtb2ppWydpc05hdGl2ZSddID0gZmFsc2U7XG4gIEBJbnB1dCgpIGZvcmNlU2l6ZTogRW1vamlbJ2ZvcmNlU2l6ZSddID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRvb2x0aXA6IEVtb2ppWyd0b29sdGlwJ10gPSBmYWxzZTtcbiAgQElucHV0KCkgc2l6ZTogRW1vamlbJ3NpemUnXSA9IDI0O1xuICBASW5wdXQoKSBlbW9qaTogRW1vamlbJ2Vtb2ppJ10gPSAnJztcbiAgQElucHV0KCkgZmFsbGJhY2s/OiBFbW9qaVsnZmFsbGJhY2snXTtcbiAgQElucHV0KCkgaGlkZU9ic29sZXRlID0gZmFsc2U7XG4gIEBJbnB1dCgpIFNIRUVUX0NPTFVNTlMgPSA1MjtcbiAgQElucHV0KCkgc2hlZXRSb3dzPzogbnVtYmVyO1xuICBASW5wdXQoKSBzaGVldENvbHVtbnM/OiBudW1iZXI7XG4gIEBPdXRwdXQoKSBlbW9qaU92ZXI6IEVtb2ppWydlbW9qaU92ZXInXSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGVtb2ppTGVhdmU6IEVtb2ppWydlbW9qaUxlYXZlJ10gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBlbW9qaUNsaWNrOiBFbW9qaVsnZW1vamlDbGljayddID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBzdHlsZTogYW55O1xuICB0aXRsZSA9ICcnO1xuICBsYWJlbCA9ICcnO1xuICB1bmlmaWVkPzogc3RyaW5nIHwgbnVsbDtcbiAgY3VzdG9tID0gZmFsc2U7XG4gIGlzVmlzaWJsZSA9IHRydWU7XG4gIC8vIFRPRE86IHJlcGxhY2UgNC4wLjMgdy8gZHluYW1pYyBnZXQgdmVyaXNvbiBmcm9tIGVtb2ppLWRhdGFzb3VyY2UgaW4gcGFja2FnZS5qc29uXG4gIEBJbnB1dCgpIGJhY2tncm91bmRJbWFnZUZuOiBFbW9qaVsnYmFja2dyb3VuZEltYWdlRm4nXSA9IERFRkFVTFRfQkFDS0dST1VOREZOO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZW1vamlTZXJ2aWNlOiBFbW9qaVNlcnZpY2UpIHt9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgaWYgKCF0aGlzLmVtb2ppKSB7XG4gICAgICByZXR1cm4gKHRoaXMuaXNWaXNpYmxlID0gZmFsc2UpO1xuICAgIH1cbiAgICBjb25zdCBkYXRhID0gdGhpcy5nZXREYXRhKCk7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICByZXR1cm4gKHRoaXMuaXNWaXNpYmxlID0gZmFsc2UpO1xuICAgIH1cbiAgICAvLyBjb25zdCBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW47XG4gICAgdGhpcy51bmlmaWVkID0gZGF0YS5uYXRpdmUgfHwgbnVsbDtcbiAgICBpZiAoZGF0YS5jdXN0b20pIHtcbiAgICAgIHRoaXMuY3VzdG9tID0gZGF0YS5jdXN0b207XG4gICAgfVxuICAgIGlmICghZGF0YS51bmlmaWVkICYmICFkYXRhLmN1c3RvbSkge1xuICAgICAgcmV0dXJuICh0aGlzLmlzVmlzaWJsZSA9IGZhbHNlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMudG9vbHRpcCkge1xuICAgICAgdGhpcy50aXRsZSA9IGRhdGEuc2hvcnROYW1lc1swXTtcbiAgICB9XG4gICAgaWYgKGRhdGEub2Jzb2xldGVkQnkgJiYgdGhpcy5oaWRlT2Jzb2xldGUpIHtcbiAgICAgIHJldHVybiAodGhpcy5pc1Zpc2libGUgPSBmYWxzZSk7XG4gICAgfVxuXG4gICAgdGhpcy5sYWJlbCA9IFtkYXRhLm5hdGl2ZV1cbiAgICAgIC5jb25jYXQoZGF0YS5zaG9ydE5hbWVzKVxuICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgLmpvaW4oJywgJyk7XG5cbiAgICBpZiAodGhpcy5pc05hdGl2ZSAmJiBkYXRhLnVuaWZpZWQgJiYgZGF0YS5uYXRpdmUpIHtcbiAgICAgIC8vIGhpZGUgb2xkZXIgZW1vamkgYmVmb3JlIHRoZSBzcGxpdCBpbnRvIGdlbmRlcmVkIGVtb2ppXG4gICAgICB0aGlzLnN0eWxlID0geyBmb250U2l6ZTogYCR7dGhpcy5zaXplfXB4YCB9O1xuXG4gICAgICBpZiAodGhpcy5mb3JjZVNpemUpIHtcbiAgICAgICAgdGhpcy5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG4gICAgICAgIHRoaXMuc3R5bGUud2lkdGggPSBgJHt0aGlzLnNpemV9cHhgO1xuICAgICAgICB0aGlzLnN0eWxlLmhlaWdodCA9IGAke3RoaXMuc2l6ZX1weGA7XG4gICAgICAgIHRoaXMuc3R5bGVbJ3dvcmQtYnJlYWsnXSA9ICdrZWVwLWFsbCc7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChkYXRhLmN1c3RvbSkge1xuICAgICAgdGhpcy5zdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6IGAke3RoaXMuc2l6ZX1weGAsXG4gICAgICAgIGhlaWdodDogYCR7dGhpcy5zaXplfXB4YCxcbiAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICB9O1xuICAgICAgaWYgKGRhdGEuc3ByaXRlVXJsICYmIHRoaXMuc2hlZXRSb3dzICYmIHRoaXMuc2hlZXRDb2x1bW5zKSB7XG4gICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgLi4udGhpcy5zdHlsZSxcbiAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtkYXRhLnNwcml0ZVVybH0pYCxcbiAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogYCR7MTAwICogdGhpcy5zaGVldENvbHVtbnN9JSAkezEwMCAqXG4gICAgICAgICAgICB0aGlzLnNoZWV0Um93c30lYCxcbiAgICAgICAgICBiYWNrZ3JvdW5kUG9zaXRpb246IHRoaXMuZW1vamlTZXJ2aWNlLmdldFNwcml0ZVBvc2l0aW9uKGRhdGEuc2hlZXQsIHRoaXMuc2hlZXRDb2x1bW5zKSxcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgLi4udGhpcy5zdHlsZSxcbiAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtkYXRhLmltYWdlVXJsfSlgLFxuICAgICAgICAgIGJhY2tncm91bmRTaXplOiAnY29udGFpbicsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChkYXRhLmhpZGRlbi5sZW5ndGggJiYgZGF0YS5oaWRkZW4uaW5jbHVkZXModGhpcy5zZXQpKSB7XG4gICAgICAgIGlmICh0aGlzLmZhbGxiYWNrKSB7XG4gICAgICAgICAgdGhpcy5zdHlsZSA9IHsgZm9udFNpemU6IGAke3RoaXMuc2l6ZX1weGAgfTtcbiAgICAgICAgICB0aGlzLnVuaWZpZWQgPSB0aGlzLmZhbGxiYWNrKGRhdGEsIHRoaXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiAodGhpcy5pc1Zpc2libGUgPSBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3R5bGUgPSB0aGlzLmVtb2ppU2VydmljZS5lbW9qaVNwcml0ZVN0eWxlcyhcbiAgICAgICAgICBkYXRhLnNoZWV0LFxuICAgICAgICAgIHRoaXMuc2V0LFxuICAgICAgICAgIHRoaXMuc2l6ZSxcbiAgICAgICAgICB0aGlzLnNoZWV0U2l6ZSxcbiAgICAgICAgICB0aGlzLmJhY2tncm91bmRJbWFnZUZuLFxuICAgICAgICAgIHRoaXMuU0hFRVRfQ09MVU1OUyxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICh0aGlzLmlzVmlzaWJsZSA9IHRydWUpO1xuICB9XG5cbiAgZ2V0RGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbW9qaVNlcnZpY2UuZ2V0RGF0YSh0aGlzLmVtb2ppLCB0aGlzLnNraW4sIHRoaXMuc2V0KTtcbiAgfVxuXG4gIGdldFNhbml0aXplZERhdGEoKTogRW1vamlEYXRhIHtcbiAgICByZXR1cm4gdGhpcy5lbW9qaVNlcnZpY2UuZ2V0U2FuaXRpemVkRGF0YSh0aGlzLmVtb2ppLCB0aGlzLnNraW4sIHRoaXMuc2V0KSBhcyBFbW9qaURhdGE7XG4gIH1cblxuICBoYW5kbGVDbGljaygkZXZlbnQ6IEV2ZW50KSB7XG4gICAgY29uc3QgZW1vamkgPSB0aGlzLmdldFNhbml0aXplZERhdGEoKTtcbiAgICB0aGlzLmVtb2ppQ2xpY2suZW1pdCh7IGVtb2ppLCAkZXZlbnQgfSk7XG4gIH1cblxuICBoYW5kbGVPdmVyKCRldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCBlbW9qaSA9IHRoaXMuZ2V0U2FuaXRpemVkRGF0YSgpO1xuICAgIHRoaXMuZW1vamlPdmVyLmVtaXQoeyBlbW9qaSwgJGV2ZW50IH0pO1xuICB9XG5cbiAgaGFuZGxlTGVhdmUoJGV2ZW50OiBFdmVudCkge1xuICAgIGNvbnN0IGVtb2ppID0gdGhpcy5nZXRTYW5pdGl6ZWREYXRhKCk7XG4gICAgdGhpcy5lbW9qaUxlYXZlLmVtaXQoeyBlbW9qaSwgJGV2ZW50IH0pO1xuICB9XG59XG4iXX0=