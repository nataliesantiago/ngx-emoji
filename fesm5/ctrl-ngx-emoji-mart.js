import { __decorate, __metadata, __values, __assign, __spread } from 'tslib';
import { Input, Output, Component, ChangeDetectionStrategy, EventEmitter, defineInjectable, Injectable, ViewChild, ElementRef, ChangeDetectorRef, inject, ViewChildren, QueryList, NgModule } from '@angular/core';
import { EmojiService, categories as categories$1, EmojiModule } from 'cs-ngx-emoji/ngx-emoji';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

var AnchorsComponent = /** @class */ (function () {
    function AnchorsComponent() {
        this.categories = [];
        this.icons = {};
        this.anchorClick = new EventEmitter();
    }
    AnchorsComponent.prototype.trackByFn = function (idx, cat) {
        return cat.id;
    };
    AnchorsComponent.prototype.handleClick = function ($event, index) {
        this.anchorClick.emit({
            category: this.categories[index],
            index: index,
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AnchorsComponent.prototype, "categories", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AnchorsComponent.prototype, "color", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AnchorsComponent.prototype, "selected", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AnchorsComponent.prototype, "i18n", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AnchorsComponent.prototype, "icons", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AnchorsComponent.prototype, "anchorClick", void 0);
    AnchorsComponent = __decorate([
        Component({
            selector: 'emoji-mart-anchors',
            template: "\n  <div class=\"emoji-mart-anchors\">\n    <ng-template ngFor let-category [ngForOf]=\"categories\" let-idx=\"index\" [ngForTrackBy]=\"trackByFn\">\n      <span\n        *ngIf=\"category.anchor !== false\"\n        [attr.title]=\"i18n.categories[category.id]\"\n        (click)=\"this.handleClick($event, idx)\"\n        class=\"emoji-mart-anchor\"\n        [class.emoji-mart-anchor-selected]=\"category.name === selected\"\n        [style.color]=\"category.name === selected ? color : null\"\n      >\n        <div>\n          <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\n            <path [attr.d]=\"icons[category.id]\" />\n          </svg>\n        </div>\n        <span class=\"emoji-mart-anchor-bar\" [style.background-color]=\"color\"></span>\n      </span>\n    </ng-template>\n  </div>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            preserveWhitespaces: false
        })
    ], AnchorsComponent);
    return AnchorsComponent;
}());

var EmojiFrequentlyService = /** @class */ (function () {
    function EmojiFrequentlyService() {
        this.NAMESPACE = 'emoji-mart';
        this.frequently = null;
        this.defaults = {};
        this.initialized = false;
        this.DEFAULTS = [
            '+1',
            'grinning',
            'kissing_heart',
            'heart_eyes',
            'laughing',
            'stuck_out_tongue_winking_eye',
            'sweat_smile',
            'joy',
            'scream',
            'disappointed',
            'unamused',
            'weary',
            'sob',
            'sunglasses',
            'heart',
            'poop',
        ];
    }
    EmojiFrequentlyService.prototype.init = function () {
        this.frequently = JSON.parse(localStorage.getItem(this.NAMESPACE + ".frequently") || 'null');
        this.initialized = true;
    };
    EmojiFrequentlyService.prototype.add = function (emoji) {
        if (!this.initialized) {
            this.init();
        }
        if (!this.frequently) {
            this.frequently = this.defaults;
        }
        if (!this.frequently[emoji.id]) {
            this.frequently[emoji.id] = 0;
        }
        this.frequently[emoji.id] += 1;
        localStorage.setItem(this.NAMESPACE + ".last", emoji.id);
        localStorage.setItem(this.NAMESPACE + ".frequently", JSON.stringify(this.frequently));
    };
    EmojiFrequentlyService.prototype.get = function (perLine, totalLines) {
        var _this = this;
        if (!this.initialized) {
            this.init();
        }
        if (this.frequently === null) {
            this.defaults = {};
            var result = [];
            for (var i = 0; i < perLine; i++) {
                this.defaults[this.DEFAULTS[i]] = perLine - i;
                result.push(this.DEFAULTS[i]);
            }
            return result;
        }
        var quantity = perLine * totalLines;
        var frequentlyKeys = Object.keys(this.frequently);
        var sorted = frequentlyKeys
            .sort(function (a, b) { return _this.frequently[a] - _this.frequently[b]; })
            .reverse();
        var sliced = sorted.slice(0, quantity);
        var last = localStorage.getItem(this.NAMESPACE + ".last");
        if (last && !sliced.includes(last)) {
            sliced.pop();
            sliced.push(last);
        }
        return sliced;
    };
    EmojiFrequentlyService.ngInjectableDef = defineInjectable({ factory: function EmojiFrequentlyService_Factory() { return new EmojiFrequentlyService(); }, token: EmojiFrequentlyService, providedIn: "root" });
    EmojiFrequentlyService = __decorate([
        Injectable({ providedIn: 'root' })
    ], EmojiFrequentlyService);
    return EmojiFrequentlyService;
}());

var CategoryComponent = /** @class */ (function () {
    function CategoryComponent(ref, emojiService, frequently) {
        this.ref = ref;
        this.emojiService = emojiService;
        this.frequently = frequently;
        this.hasStickyPosition = true;
        this.name = '';
        this.perLine = 9;
        this.totalFrequentLines = 4;
        this.recent = [];
        this.custom = [];
        this.hideObsolete = true;
        this.emojiOver = new EventEmitter();
        this.emojiLeave = new EventEmitter();
        this.emojiClick = new EventEmitter();
        this.containerStyles = {};
        this.labelStyles = {};
        this.labelSpanStyles = {};
        this.margin = 0;
        this.minMargin = 0;
        this.maxMargin = 0;
        this.top = 0;
    }
    CategoryComponent.prototype.ngOnInit = function () {
        this.emojis = this.getEmojis();
        if (!this.emojis) {
            this.containerStyles = { display: 'none' };
        }
        if (!this.hasStickyPosition) {
            this.labelStyles = { height: 28 };
            // this.labelSpanStyles = { position: 'absolute' };
        }
    };
    CategoryComponent.prototype.memoizeSize = function () {
        var parent = this.container.nativeElement.parentNode.parentNode;
        var _a = this.container.nativeElement.getBoundingClientRect(), top = _a.top, height = _a.height;
        var parentTop = parent.getBoundingClientRect().top;
        var labelHeight = this.label.nativeElement.getBoundingClientRect().height;
        this.top = top - parentTop + parent.scrollTop;
        if (height === 0) {
            this.maxMargin = 0;
        }
        else {
            this.maxMargin = height - labelHeight;
        }
    };
    CategoryComponent.prototype.handleScroll = function (scrollTop) {
        var margin = scrollTop - this.top;
        margin = margin < this.minMargin ? this.minMargin : margin;
        margin = margin > this.maxMargin ? this.maxMargin : margin;
        if (margin === this.margin) {
            return false;
        }
        if (!this.hasStickyPosition) {
            this.label.nativeElement.style.top = margin + "px";
        }
        this.margin = margin;
        return true;
    };
    CategoryComponent.prototype.getEmojis = function () {
        var _this = this;
        if (this.name === 'Recent') {
            var frequentlyUsed = this.recent || this.frequently.get(this.perLine, this.totalFrequentLines);
            if (!frequentlyUsed || !frequentlyUsed.length) {
                frequentlyUsed = this.frequently.get(this.perLine, this.totalFrequentLines);
            }
            if (frequentlyUsed.length) {
                this.emojis = frequentlyUsed
                    .map(function (id) {
                    var emoji = _this.custom.filter(function (e) { return e.id === id; })[0];
                    if (emoji) {
                        return emoji;
                    }
                    return id;
                })
                    .filter(function (id) { return !!_this.emojiService.getData(id); });
            }
            if ((!this.emojis || this.emojis.length === 0) && frequentlyUsed.length > 0) {
                return null;
            }
        }
        if (this.emojis) {
            this.emojis = this.emojis.slice(0);
        }
        return this.emojis;
    };
    CategoryComponent.prototype.updateDisplay = function (display) {
        this.containerStyles.display = display;
        this.getEmojis();
        this.ref.detectChanges();
    };
    CategoryComponent.prototype.trackById = function (index, item) {
        return item;
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CategoryComponent.prototype, "emojis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CategoryComponent.prototype, "hasStickyPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CategoryComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CategoryComponent.prototype, "perLine", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CategoryComponent.prototype, "totalFrequentLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CategoryComponent.prototype, "recent", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CategoryComponent.prototype, "custom", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CategoryComponent.prototype, "i18n", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CategoryComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CategoryComponent.prototype, "hideObsolete", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CategoryComponent.prototype, "notFoundEmoji", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CategoryComponent.prototype, "emojiIsNative", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CategoryComponent.prototype, "emojiSkin", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CategoryComponent.prototype, "emojiSize", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CategoryComponent.prototype, "emojiSet", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CategoryComponent.prototype, "emojiSheetSize", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CategoryComponent.prototype, "emojiForceSize", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CategoryComponent.prototype, "emojiTooltip", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CategoryComponent.prototype, "emojiBackgroundImageFn", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CategoryComponent.prototype, "emojiOver", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CategoryComponent.prototype, "emojiLeave", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CategoryComponent.prototype, "emojiClick", void 0);
    __decorate([
        ViewChild('container'),
        __metadata("design:type", ElementRef)
    ], CategoryComponent.prototype, "container", void 0);
    __decorate([
        ViewChild('label'),
        __metadata("design:type", ElementRef)
    ], CategoryComponent.prototype, "label", void 0);
    CategoryComponent = __decorate([
        Component({
            selector: 'emoji-category',
            template: "\n  <section #container class=\"emoji-mart-category\"\n    [attr.aria-label]=\"i18n.categories[id]\"\n    [class.emoji-mart-no-results]=\"emojis && !emojis.length\"\n    [ngStyle]=\"containerStyles\">\n    <div class=\"emoji-mart-category-label\"\n      [ngStyle]=\"labelStyles\"\n      [attr.data-name]=\"name\">\n      <!-- already labeled by the section aria-label -->\n      <span #label [ngStyle]=\"labelSpanStyles\" aria-hidden=\"true\">\n        {{ i18n.categories[id] }}\n      </span>\n    </div>\n\n    <ng-template [ngIf]=\"emojis\">\n      <ngx-emoji\n        *ngFor=\"let emoji of emojis; trackBy: trackById\"\n        [emoji]=\"emoji\"\n        [size]=\"emojiSize\"\n        [skin]=\"emojiSkin\"\n        [isNative]=\"emojiIsNative\"\n        [set]=\"emojiSet\"\n        [sheetSize]=\"emojiSheetSize\"\n        [forceSize]=\"emojiForceSize\"\n        [tooltip]=\"emojiTooltip\"\n        [backgroundImageFn]=\"emojiBackgroundImageFn\"\n        [hideObsolete]=\"hideObsolete\"\n        (emojiOver)=\"emojiOver.emit($event)\"\n        (emojiLeave)=\"emojiLeave.emit($event)\"\n        (emojiClick)=\"emojiClick.emit($event)\"\n      ></ngx-emoji>\n    </ng-template>\n\n    <div *ngIf=\"emojis && !emojis.length\">\n      <div>\n        <ngx-emoji\n          [emoji]=\"notFoundEmoji\"\n          size=\"38\"\n          [skin]=\"emojiSkin\"\n          [isNative]=\"emojiIsNative\"\n          [set]=\"emojiSet\"\n          [sheetSize]=\"emojiSheetSize\"\n          [forceSize]=\"emojiForceSize\"\n          [tooltip]=\"emojiTooltip\"\n          [backgroundImageFn]=\"emojiBackgroundImageFn\"\n        ></ngx-emoji>\n      </div>\n\n      <div class=\"emoji-mart-no-results-label\">\n        {{ i18n.notfound }}\n      </div>\n    </div>\n\n  </section>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            preserveWhitespaces: false
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            EmojiService,
            EmojiFrequentlyService])
    ], CategoryComponent);
    return CategoryComponent;
}());

function uniq(arr) {
    return arr.reduce(function (acc, item) {
        if (!acc.includes(item)) {
            acc.push(item);
        }
        return acc;
    }, []);
}
function intersect(a, b) {
    var uniqA = uniq(a);
    var uniqB = uniq(b);
    return uniqA.filter(function (item) { return uniqB.indexOf(item) >= 0; });
}
// https://github.com/sonicdoe/measure-scrollbar
function measureScrollbar() {
    if (typeof document === 'undefined') {
        return 0;
    }
    var div = document.createElement('div');
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.overflow = 'scroll';
    div.style.position = 'absolute';
    div.style.top = '-9999px';
    document.body.appendChild(div);
    var scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return scrollbarWidth;
}

var EmojiSearch = /** @class */ (function () {
    function EmojiSearch(emojiService) {
        var e_1, _a;
        var _this = this;
        this.emojiService = emojiService;
        this.originalPool = {};
        this.index = {};
        this.emojisList = {};
        this.emoticonsList = {};
        this.emojiSearch = {};
        var _loop_1 = function (emojiData) {
            var shortNames = emojiData.shortNames, emoticons = emojiData.emoticons;
            var id = shortNames[0];
            emoticons.forEach(function (emoticon) {
                if (_this.emoticonsList[emoticon]) {
                    return;
                }
                _this.emoticonsList[emoticon] = id;
            });
            this_1.emojisList[id] = this_1.emojiService.getSanitizedData(id);
            this_1.originalPool[id] = emojiData;
        };
        var this_1 = this;
        try {
            for (var _b = __values(this.emojiService.emojis), _c = _b.next(); !_c.done; _c = _b.next()) {
                var emojiData = _c.value;
                _loop_1(emojiData);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    EmojiSearch.prototype.addCustomToPool = function (custom, pool) {
        var _this = this;
        custom.forEach(function (emoji) {
            var emojiId = emoji.id || emoji.shortNames[0];
            if (emojiId && !pool[emojiId]) {
                pool[emojiId] = _this.emojiService.getData(emoji);
                _this.emojisList[emojiId] = _this.emojiService.getSanitizedData(emoji);
            }
        });
    };
    EmojiSearch.prototype.search = function (value, emojisToShowFilter, maxResults, include, exclude, custom) {
        var _this = this;
        if (maxResults === void 0) { maxResults = 75; }
        if (include === void 0) { include = []; }
        if (exclude === void 0) { exclude = []; }
        if (custom === void 0) { custom = []; }
        this.addCustomToPool(custom, this.originalPool);
        var results;
        var pool = this.originalPool;
        if (value.length) {
            if (value === '-' || value === '-1') {
                return [this.emojisList['-1']];
            }
            if (value === '+' || value === '+1') {
                return [this.emojisList['+1']];
            }
            var values = value.toLowerCase().split(/[\s|,|\-|_]+/);
            var allResults = [];
            if (values.length > 2) {
                values = [values[0], values[1]];
            }
            if (include.length || exclude.length) {
                pool = {};
                categories$1.forEach(function (category) {
                    var isIncluded = include && include.length
                        ? include.indexOf(category.id) > -1
                        : true;
                    var isExcluded = exclude && exclude.length
                        ? exclude.indexOf(category.id) > -1
                        : false;
                    if (!isIncluded || isExcluded) {
                        return;
                    }
                    category.emojis.forEach(function (emojiId) { return (pool[emojiId] = _this.emojiService.names[emojiId]); });
                });
                if (custom.length) {
                    var customIsIncluded = include && include.length ? include.indexOf('custom') > -1 : true;
                    var customIsExcluded = exclude && exclude.length ? exclude.indexOf('custom') > -1 : false;
                    if (customIsIncluded && !customIsExcluded) {
                        this.addCustomToPool(custom, pool);
                    }
                }
            }
            allResults = values
                .map(function (v) {
                var aPool = pool;
                var aIndex = _this.index;
                var length = 0;
                var _loop_2 = function (charIndex) {
                    var e_2, _a;
                    var char = v[charIndex];
                    length++;
                    if (!aIndex[char]) {
                        aIndex[char] = {};
                    }
                    aIndex = aIndex[char];
                    if (!aIndex.results) {
                        var scores_1 = {};
                        aIndex.results = [];
                        aIndex.pool = {};
                        try {
                            for (var _b = __values(Object.keys(aPool)), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var id = _c.value;
                                var emoji = aPool[id];
                                if (!_this.emojiSearch[id]) {
                                    _this.emojiSearch[id] = _this.buildSearch(emoji.short_names, emoji.name, emoji.keywords, emoji.emoticons);
                                }
                                var query = _this.emojiSearch[id];
                                var sub = v.substr(0, length);
                                var subIndex = query.indexOf(sub);
                                if (subIndex !== -1) {
                                    var score = subIndex + 1;
                                    if (sub === id) {
                                        score = 0;
                                    }
                                    aIndex.results.push(_this.emojisList[id]);
                                    aIndex.pool[id] = emoji;
                                    scores_1[id] = score;
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        aIndex.results.sort(function (a, b) {
                            var aScore = scores_1[a.id];
                            var bScore = scores_1[b.id];
                            return aScore - bScore;
                        });
                    }
                    aPool = aIndex.pool;
                };
                // tslint:disable-next-line: prefer-for-of
                for (var charIndex = 0; charIndex < v.length; charIndex++) {
                    _loop_2(charIndex);
                }
                return aIndex.results;
            })
                .filter(function (a) { return a; });
            if (allResults.length > 1) {
                results = intersect.apply(null, allResults);
            }
            else if (allResults.length) {
                results = allResults[0];
            }
            else {
                results = [];
            }
        }
        if (results) {
            if (emojisToShowFilter) {
                results = results.filter(function (result) {
                    return emojisToShowFilter(_this.emojiService.names[result.id]);
                });
            }
            if (results && results.length > maxResults) {
                results = results.slice(0, maxResults);
            }
        }
        return results || null;
    };
    EmojiSearch.prototype.buildSearch = function (shortNames, name, keywords, emoticons) {
        var search = [];
        var addToSearch = function (strings, split) {
            if (!strings) {
                return;
            }
            (Array.isArray(strings) ? strings : [strings]).forEach(function (str) {
                (split ? str.split(/[-|_|\s]+/) : [str]).forEach(function (s) {
                    s = s.toLowerCase();
                    if (!search.includes(s)) {
                        search.push(s);
                    }
                });
            });
        };
        addToSearch(shortNames, true);
        addToSearch(name, true);
        addToSearch(keywords, false);
        addToSearch(emoticons, false);
        return search.join(',');
    };
    EmojiSearch.ngInjectableDef = defineInjectable({ factory: function EmojiSearch_Factory() { return new EmojiSearch(inject(EmojiService)); }, token: EmojiSearch, providedIn: "root" });
    EmojiSearch = __decorate([
        Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [EmojiService])
    ], EmojiSearch);
    return EmojiSearch;
}());

var PreviewComponent = /** @class */ (function () {
    function PreviewComponent(ref, emojiService) {
        this.ref = ref;
        this.emojiService = emojiService;
        this.skinChange = new EventEmitter();
        this.emojiData = {};
    }
    PreviewComponent.prototype.ngOnChanges = function () {
        if (!this.emoji) {
            return;
        }
        this.emojiData = this.emojiService.getData(this.emoji, this.emojiSkin, this.emojiSet);
        var knownEmoticons = [];
        var listedEmoticons = [];
        var emoitcons = this.emojiData.emoticons || [];
        emoitcons.forEach(function (emoticon) {
            if (knownEmoticons.indexOf(emoticon.toLowerCase()) >= 0) {
                return;
            }
            knownEmoticons.push(emoticon.toLowerCase());
            listedEmoticons.push(emoticon);
        });
        this.listedEmoticons = listedEmoticons;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PreviewComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PreviewComponent.prototype, "emoji", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PreviewComponent.prototype, "idleEmoji", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PreviewComponent.prototype, "i18n", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PreviewComponent.prototype, "emojiIsNative", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PreviewComponent.prototype, "emojiSkin", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PreviewComponent.prototype, "emojiSize", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PreviewComponent.prototype, "emojiSet", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PreviewComponent.prototype, "emojiSheetSize", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PreviewComponent.prototype, "emojiBackgroundImageFn", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PreviewComponent.prototype, "skinChange", void 0);
    PreviewComponent = __decorate([
        Component({
            selector: 'emoji-preview',
            template: "\n  <div class=\"emoji-mart-preview\" *ngIf=\"emoji && emojiData\">\n    <div class=\"emoji-mart-preview-emoji\">\n      <ngx-emoji\n        [emoji]=\"emoji\"\n        [size]=\"38\"\n        [isNative]=\"emojiIsNative\"\n        [skin]=\"emojiSkin\"\n        [size]=\"emojiSize\"\n        [set]=\"emojiSet\"\n        [sheetSize]=\"emojiSheetSize\"\n        [backgroundImageFn]=\"emojiBackgroundImageFn\"\n      ></ngx-emoji>\n    </div>\n\n    <div class=\"emoji-mart-preview-data\">\n      <div class=\"emoji-mart-preview-name\">{{ emojiData.name }}</div>\n      <div class=\"emoji-mart-preview-shortnames\">\n        <span class=\"emoji-mart-preview-shortname\" *ngFor=\"let short_name of emojiData.shortNames\">\n          :{{ short_name }}:\n        </span>\n      </div>\n      <div class=\"emoji-mart-preview-emoticons\">\n        <span class=\"emoji-mart-preview-emoticon\" *ngFor=\"let emoticon of listedEmoticons\">\n          {{ emoticon }}\n        </span>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"emoji-mart-preview\" *ngIf=\"!emoji\">\n    <div class=\"emoji-mart-preview-emoji\">\n      <ngx-emoji *ngIf=\"idleEmoji && idleEmoji.length\"\n        [isNative]=\"emojiIsNative\"\n        [skin]=\"emojiSkin\"\n        [set]=\"emojiSet\"\n        [emoji]=\"idleEmoji\"\n        [backgroundImageFn]=\"emojiBackgroundImageFn\"\n        [size]=\"38\"\n      ></ngx-emoji>\n    </div>\n\n    <div class=\"emoji-mart-preview-data\">\n      <span class=\"emoji-mart-title-label\">{{ title }}</span>\n    </div>\n\n    <div class=\"emoji-mart-preview-skins\">\n      <emoji-skins [skin]=\"emojiSkin\" (changeSkin)=\"skinChange.emit($event)\" [i18n]=\"i18n\">\n      </emoji-skins>\n    </div>\n  </div>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            preserveWhitespaces: false
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            EmojiService])
    ], PreviewComponent);
    return PreviewComponent;
}());

var id = 0;
var SearchComponent = /** @class */ (function () {
    function SearchComponent(emojiSearch) {
        this.emojiSearch = emojiSearch;
        this.maxResults = 75;
        this.autoFocus = false;
        this.include = [];
        this.exclude = [];
        this.custom = [];
        this.searchResults = new EventEmitter();
        this.enterKey = new EventEmitter();
        this.isSearching = false;
        this.query = '';
        this.inputId = "emoji-mart-search-" + ++id;
    }
    SearchComponent.prototype.ngOnInit = function () {
        this.icon = this.icons.search;
    };
    SearchComponent.prototype.ngAfterViewInit = function () {
        if (this.autoFocus) {
            this.inputRef.nativeElement.focus();
        }
    };
    SearchComponent.prototype.clear = function () {
        this.query = '';
        this.handleSearch('');
        this.inputRef.nativeElement.focus();
    };
    SearchComponent.prototype.handleEnterKey = function ($event) {
        if (!this.query) {
            return;
        }
        this.enterKey.emit($event);
        $event.preventDefault();
    };
    SearchComponent.prototype.handleSearch = function (value) {
        if (value === '') {
            this.icon = this.icons.search;
            this.isSearching = false;
        }
        else {
            this.icon = this.icons.delete;
            this.isSearching = true;
        }
        var emojis = this.emojiSearch.search(this.query, this.emojisToShowFilter, this.maxResults, this.include, this.exclude, this.custom);
        this.searchResults.emit(emojis);
    };
    SearchComponent.prototype.handleChange = function () {
        this.handleSearch(this.query);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SearchComponent.prototype, "maxResults", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SearchComponent.prototype, "autoFocus", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SearchComponent.prototype, "i18n", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], SearchComponent.prototype, "include", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], SearchComponent.prototype, "exclude", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], SearchComponent.prototype, "custom", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SearchComponent.prototype, "icons", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], SearchComponent.prototype, "emojisToShowFilter", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SearchComponent.prototype, "searchResults", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SearchComponent.prototype, "enterKey", void 0);
    __decorate([
        ViewChild('inputRef'),
        __metadata("design:type", ElementRef)
    ], SearchComponent.prototype, "inputRef", void 0);
    SearchComponent = __decorate([
        Component({
            selector: 'emoji-search',
            template: "\n    <div class=\"emoji-mart-search\">\n      <input\n        [id]=\"inputId\"\n        #inputRef\n        type=\"search\"\n        (keyup.enter)=\"handleEnterKey($event)\"\n        [placeholder]=\"i18n.search\"\n        [autofocus]=\"autoFocus\"\n        [(ngModel)]=\"query\"\n        (ngModelChange)=\"handleChange()\"\n      />\n      <!--\n      Use a <label> in addition to the placeholder for accessibility, but place it off-screen\n      http://www.maxability.co.in/2016/01/placeholder-attribute-and-why-it-is-not-accessible/\n      -->\n      <label class=\"emoji-mart-sr-only\" [htmlFor]=\"inputId\">\n        {{ i18n.search }}\n      </label>\n      <button\n        type=\"button\"\n        class=\"emoji-mart-search-icon\"\n        (click)=\"clear()\"\n        (keyup.enter)=\"clear()\"\n        [disabled]=\"!isSearching\"\n        [attr.aria-label]=\"i18n.clear\"\n      >\n        <svg\n          xmlns=\"http://www.w3.org/2000/svg\"\n          viewBox=\"0 0 20 20\"\n          width=\"13\"\n          height=\"13\"\n          opacity=\"0.5\"\n        >\n          <path [attr.d]=\"icon\" />\n        </svg>\n      </button>\n    </div>\n  ",
            preserveWhitespaces: false
        }),
        __metadata("design:paramtypes", [EmojiSearch])
    ], SearchComponent);
    return SearchComponent;
}());

/* tslint:disable max-line-length */
var categories = {
    activity: "M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24m10 11h-5c.3-2.5 1.3-4.8 2-6.1a10 10 0 0 1 3 6.1m-9 0V2a10 10 0 0 1 4.4 1.6A18 18 0 0 0 15 11h-2zm-2 0H9a18 18 0 0 0-2.4-7.4A10 10 0 0 1 11 2.1V11zm0 2v9a10 10 0 0 1-4.4-1.6A18 18 0 0 0 9 13h2zm4 0a18 18 0 0 0 2.4 7.4 10 10 0 0 1-4.4 1.5V13h2zM5 4.9c.7 1.3 1.7 3.6 2 6.1H2a10 10 0 0 1 3-6.1M2 13h5c-.3 2.5-1.3 4.8-2 6.1A10 10 0 0 1 2 13m17 6.1c-.7-1.3-1.7-3.6-2-6.1h5a10 10 0 0 1-3 6.1",
    custom: "M10 1h3v21h-3zm10.186 4l1.5 2.598L3.5 18.098 2 15.5zM2 7.598L3.5 5l18.186 10.5-1.5 2.598z",
    flags: "M0 0l6 24h2L2 0zm21 5h-4l-1-4H4l3 12h3l1 4h13L21 5zM6.6 3h7.8l2 8H8.6l-2-8zm8.8 10l-2.9 1.9-.4-1.9h3.3zm3.6 0l-1.5-6h2l2 8H16l3-2z",
    foods: "M17 5c-1.8 0-2.9.4-3.7 1 .5-1.3 1.8-3 4.7-3a1 1 0 0 0 0-2c-3 0-4.6 1.3-5.5 2.5l-.2.2c-.6-1.9-1.5-3.7-3-3.7C8.5 0 7.7.3 7 1c-2 1.5-1.7 2.9-.5 4C3.6 5.2 0 7.4 0 13c0 4.6 5 11 9 11 2 0 2.4-.5 3-1 .6.5 1 1 3 1 4 0 9-6.4 9-11 0-6-4-8-7-8M8.2 2.5c.7-.5 1-.5 1-.5.4.2 1 1.4 1.4 3-1.6-.6-2.8-1.3-3-1.8l.6-.7M15 22c-1 0-1.2-.1-1.6-.4l-.1-.2a2 2 0 0 0-2.6 0l-.1.2c-.4.3-.5.4-1.6.4-2.8 0-7-5.4-7-9 0-6 4.5-6 5-6 2 0 2.5.4 3.4 1.2l.3.3a2 2 0 0 0 2.6 0l.3-.3c1-.8 1.5-1.2 3.4-1.2.5 0 5 .1 5 6 0 3.6-4.2 9-7 9",
    nature: "M15.5 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m10.43-8h-.02c-.97 0-2.14.79-3.02 1.5A13.88 13.88 0 0 0 12 .99c-1.28 0-2.62.13-3.87.51C7.24.8 6.07 0 5.09 0h-.02C3.35 0 .07 2.67 0 7.03c-.04 2.47.28 4.23 1.04 5 .26.27.88.69 1.3.9.19 3.17.92 5.23 2.53 6.37.9.64 2.19.95 3.2 1.1-.03.2-.07.4-.07.6 0 1.77 2.35 3 4 3s4-1.23 4-3c0-.2-.04-.4-.07-.59 2.57-.38 5.43-1.87 5.92-7.58.4-.22.89-.57 1.1-.8.77-.76 1.09-2.52 1.05-5C23.93 2.67 20.65 0 18.93 0M3.23 9.13c-.24.29-.84 1.16-.9 1.24A9.67 9.67 0 0 1 2 7.08c.05-3.28 2.48-4.97 3.1-5.03.25.02.72.27 1.26.65A7.95 7.95 0 0 0 4 7.82c-.14.55-.4.86-.79 1.31M12 22c-.9 0-1.95-.7-2-1 0-.65.47-1.24 1-1.6v.6a1 1 0 1 0 2 0v-.6c.52.36 1 .95 1 1.6-.05.3-1.1 1-2 1m3-3.48v.02a4.75 4.75 0 0 0-1.26-1.02c1.09-.52 2.24-1.33 2.24-2.22 0-1.84-1.78-2.2-3.98-2.2s-3.98.36-3.98 2.2c0 .89 1.15 1.7 2.24 2.22A4.8 4.8 0 0 0 9 18.54v-.03a6.1 6.1 0 0 1-2.97-.84c-1.3-.92-1.84-3.04-1.86-6.48l.03-.04c.5-.82 1.49-1.45 1.8-3.1C6 6 7.36 4.42 8.36 3.53c1.01-.35 2.2-.53 3.59-.53 1.45 0 2.68.2 3.73.57 1 .9 2.32 2.46 2.32 4.48.31 1.65 1.3 2.27 1.8 3.1l.1.18c-.06 5.97-1.95 7.01-4.9 7.19m6.63-8.2l-.11-.2a7.59 7.59 0 0 0-.74-.98 3.02 3.02 0 0 1-.79-1.32 7.93 7.93 0 0 0-2.35-5.12c.53-.38 1-.63 1.26-.65.64.07 3.05 1.77 3.1 5.03.02 1.81-.35 3.22-.37 3.24",
    objects: "M12 0a9 9 0 0 0-5 16.5V21s2 3 5 3 5-3 5-3v-4.5A9 9 0 0 0 12 0zm0 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14zM9 17.5a9 9 0 0 0 6 0v.8a7 7 0 0 1-3 .7 7 7 0 0 1-3-.7v-.8zm.2 3a8.9 8.9 0 0 0 2.8.5c1 0 1.9-.2 2.8-.5-.6.7-1.6 1.5-2.8 1.5-1.1 0-2.1-.8-2.8-1.5zm5.5-8.1c-.8 0-1.1-.8-1.5-1.8-.5-1-.7-1.5-1.2-1.5s-.8.5-1.3 1.5c-.4 1-.8 1.8-1.6 1.8h-.3c-.5-.2-.8-.7-1.3-1.8l-.2-1A3 3 0 0 0 7 9a1 1 0 0 1 0-2c1.7 0 2 1.4 2.2 2.1.5-1 1.3-2 2.8-2 1.5 0 2.3 1.1 2.7 2.1.2-.8.6-2.2 2.3-2.2a1 1 0 1 1 0 2c-.2 0-.3.5-.3.7a6.5 6.5 0 0 1-.3 1c-.5 1-.8 1.7-1.7 1.7",
    people: "M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24m0 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20M8 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4m8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-.8 8c-.7 1.2-1.8 2-3.3 2-1.5 0-2.7-.8-3.4-2H15m3-2H6a6 6 0 1 0 12 0",
    places: "M6.5 12a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5m0 3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5m11-3a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5m0 3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5m5-5.5l-1-.4-.1-.1h.6c.6 0 1-.4 1-1 0-1-.9-2-2-2h-.6l-.8-1.7A3 3 0 0 0 16.8 2H7.2a3 3 0 0 0-2.8 2.3L3.6 6H3a2 2 0 0 0-2 2c0 .6.4 1 1 1h.6v.1l-1 .4a2 2 0 0 0-1.4 2l.7 7.6a1 1 0 0 0 1 .9H3v1c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-1h6v1c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-1h1.1a1 1 0 0 0 1-.9l.7-7.5a2 2 0 0 0-1.3-2.1M6.3 4.9c.1-.5.5-.9 1-.9h9.5c.4 0 .8.4 1 .9L19.2 9H4.7l1.6-4.1zM7 21H5v-1h2v1zm12 0h-2v-1h2v1zm2.2-3H2.8l-.7-6.6.9-.4h18l.9.4-.7 6.6z",
    recent: "M13 4h-2v7H9v2h2v2h2v-2h4v-2h-4zm-1-4a12 12 0 1 0 0 24 12 12 0 0 0 0-24m0 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20",
    symbols: "M0 0h11v2H0zm4 11h3V6h4V4H0v2h4zm11.5 6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m0-2.99a.5.5 0 0 1 0 .99c-.28 0-.5-.22-.5-.5s.22-.49.5-.49m6 5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5m0 2.99a.5.5 0 0 1-.5-.5.5.5 0 0 1 1 .01.5.5 0 0 1-.5.49m.5-9l-9 9 1.51 1.5 9-9zm-5-2c2.2 0 4-1.12 4-2.5V2s.98-.16 1.5.95C23 4.05 23 6 23 6s1-1.12 1-3.13C24-.02 21 0 21 0h-2v6.35A5.85 5.85 0 0 0 17 6c-2.2 0-4 1.12-4 2.5s1.8 2.5 4 2.5m-6.7 9.48L8.82 18.9a47.54 47.54 0 0 1-1.44 1.13c-.3-.3-.99-1.02-2.04-2.19.9-.83 1.47-1.46 1.72-1.89s.38-.87.38-1.33c0-.6-.27-1.18-.82-1.76-.54-.58-1.33-.87-2.35-.87-1 0-1.79.29-2.34.87-.56.6-.83 1.18-.83 1.79 0 .81.42 1.75 1.25 2.8a6.57 6.57 0 0 0-1.8 1.79 3.46 3.46 0 0 0-.51 1.83c0 .86.3 1.56.92 2.1a3.5 3.5 0 0 0 2.42.83c1.17 0 2.44-.38 3.81-1.14L8.23 24h2.82l-2.09-2.38 1.34-1.14zM3.56 14.1a1.02 1.02 0 0 1 .73-.28c.31 0 .56.08.75.25a.85.85 0 0 1 .28.66c0 .52-.42 1.11-1.26 1.78-.53-.65-.8-1.23-.8-1.74a.9.9 0 0 1 .3-.67m.18 7.9c-.43 0-.78-.12-1.06-.35-.28-.23-.41-.49-.41-.76 0-.6.5-1.3 1.52-2.09a31.23 31.23 0 0 0 2.25 2.44c-.92.5-1.69.76-2.3.76",
};
var search = {
    search: "M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z",
    delete: "M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z",
};

var I18N = {
    search: 'Search',
    emojilist: 'List of emoji',
    notfound: 'No Emoji Found',
    clear: 'Clear',
    categories: {
        search: 'Search Results',
        recent: 'Frequently Used',
        people: 'Smileys & People',
        nature: 'Animals & Nature',
        foods: 'Food & Drink',
        activity: 'Activity',
        places: 'Travel & Places',
        objects: 'Objects',
        symbols: 'Symbols',
        flags: 'Flags',
        custom: 'Custom',
    },
    skintones: {
        1: 'Default Skin Tone',
        2: 'Light Skin Tone',
        3: 'Medium-Light Skin Tone',
        4: 'Medium Skin Tone',
        5: 'Medium-Dark Skin Tone',
        6: 'Dark Skin Tone',
    },
};
var PickerComponent = /** @class */ (function () {
    function PickerComponent(ref, frequently) {
        var _this = this;
        this.ref = ref;
        this.frequently = frequently;
        this.perLine = 9;
        this.totalFrequentLines = 4;
        this.i18n = {};
        this.style = {};
        this.title = 'Emoji Mart™';
        this.emoji = 'department_store';
        this.color = '#ae65c5';
        this.hideObsolete = true;
        /** all categories shown */
        this.categories = [];
        /** used to temporarily draw categories */
        this.activeCategories = [];
        this.set = 'apple';
        this.skin = 1;
        /** Renders the native unicode emoji */
        this.isNative = false;
        this.emojiSize = 24;
        this.sheetSize = 64;
        this.showPreview = true;
        this.emojiTooltip = false;
        this.autoFocus = false;
        this.custom = [];
        this.hideRecent = true;
        this.notFoundEmoji = 'sleuth_or_spy';
        this.categoriesIcons = categories;
        this.searchIcons = search;
        this.showSingleCategory = false;
        this.emojiClick = new EventEmitter();
        this.emojiSelect = new EventEmitter();
        this.skinChange = new EventEmitter();
        this.scrollHeight = 0;
        this.clientHeight = 0;
        this.firstRender = true;
        this.NAMESPACE = 'emoji-mart';
        this.measureScrollbar = 0;
        this.RECENT_CATEGORY = {
            id: 'recent',
            name: 'Recent',
            emojis: null,
        };
        this.SEARCH_CATEGORY = {
            id: 'search',
            name: 'Search',
            emojis: null,
            anchor: false,
        };
        this.CUSTOM_CATEGORY = {
            id: 'custom',
            name: 'Custom',
            emojis: [],
        };
        this.backgroundImageFn = function (set, sheetSize) {
            return "https://unpkg.com/emoji-datasource-" + _this.set + "@4.0.4/img/" + _this.set + "/sheets-256/" + _this.sheetSize + ".png";
        };
    }
    PickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        var e_1, _a;
        // measure scroll
        this.measureScrollbar = measureScrollbar();
        this.i18n = __assign({}, I18N, this.i18n);
        this.i18n.categories = __assign({}, I18N.categories, this.i18n.categories);
        this.skin =
            JSON.parse(localStorage.getItem(this.NAMESPACE + ".skin") || 'null') ||
                this.skin;
        var allCategories = __spread(categories$1);
        if (this.custom.length > 0) {
            this.CUSTOM_CATEGORY.emojis = this.custom.map(function (emoji) {
                return __assign({}, emoji, { 
                    // `<Category />` expects emoji to have an `id`.
                    id: emoji.shortNames[0], custom: true });
            });
            allCategories.push(this.CUSTOM_CATEGORY);
        }
        if (this.include !== undefined) {
            allCategories.sort(function (a, b) {
                if (_this.include.indexOf(a.id) > _this.include.indexOf(b.id)) {
                    return 1;
                }
                return -1;
            });
        }
        try {
            for (var allCategories_1 = __values(allCategories), allCategories_1_1 = allCategories_1.next(); !allCategories_1_1.done; allCategories_1_1 = allCategories_1.next()) {
                var category = allCategories_1_1.value;
                var isIncluded = this.include && this.include.length
                    ? this.include.indexOf(category.id) > -1
                    : true;
                var isExcluded = this.exclude && this.exclude.length
                    ? this.exclude.indexOf(category.id) > -1
                    : false;
                if (!isIncluded || isExcluded) {
                    continue;
                }
                if (this.emojisToShowFilter) {
                    var newEmojis = [];
                    var emojis = category.emojis;
                    // tslint:disable-next-line: prefer-for-of
                    for (var emojiIndex = 0; emojiIndex < emojis.length; emojiIndex++) {
                        var emoji = emojis[emojiIndex];
                        if (this.emojisToShowFilter(emoji)) {
                            newEmojis.push(emoji);
                        }
                    }
                    if (newEmojis.length) {
                        var newCategory = {
                            emojis: newEmojis,
                            name: category.name,
                            id: category.id,
                        };
                        this.categories.push(newCategory);
                    }
                }
                else {
                    this.categories.push(category);
                }
                this.categoriesIcons = __assign({}, categories, this.categoriesIcons);
                this.searchIcons = __assign({}, search, this.searchIcons);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (allCategories_1_1 && !allCategories_1_1.done && (_a = allCategories_1.return)) _a.call(allCategories_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var includeRecent = this.include && this.include.length
            ? this.include.indexOf(this.RECENT_CATEGORY.id) > -1
            : true;
        var excludeRecent = this.exclude && this.exclude.length
            ? this.exclude.indexOf(this.RECENT_CATEGORY.id) > -1
            : false;
        if (includeRecent && !excludeRecent) {
            this.hideRecent = false;
            this.categories.unshift(this.RECENT_CATEGORY);
        }
        if (this.categories[0]) {
            this.categories[0].first = true;
        }
        this.categories.unshift(this.SEARCH_CATEGORY);
        this.selected = this.categories.filter(function (category) { return category.first; })[0].name;
        var categoriesToLoadFirst = 3;
        this.setActiveCategories(this.activeCategories = this.categories.slice(0, categoriesToLoadFirst));
        // Trim last active category
        var lastActiveCategoryEmojis = this.categories[categoriesToLoadFirst - 1].emojis.slice();
        this.categories[categoriesToLoadFirst - 1].emojis = lastActiveCategoryEmojis.slice(0, 60);
        this.ref.markForCheck();
        setTimeout(function () {
            // Restore last category
            _this.categories[categoriesToLoadFirst - 1].emojis = lastActiveCategoryEmojis;
            _this.setActiveCategories(_this.categories);
            _this.ref.markForCheck();
            setTimeout(function () { return _this.updateCategoriesSize(); });
        });
    };
    PickerComponent.prototype.setActiveCategories = function (categoriesToMakeActive) {
        var _this = this;
        if (this.showSingleCategory) {
            this.activeCategories = categoriesToMakeActive.filter(function (x) { return x.name === _this.selected; });
        }
        else {
            this.activeCategories = categoriesToMakeActive;
        }
    };
    PickerComponent.prototype.updateCategoriesSize = function () {
        this.categoryRefs.forEach(function (component) { return component.memoizeSize(); });
        if (this.scrollRef) {
            var target = this.scrollRef.nativeElement;
            this.scrollHeight = target.scrollHeight;
            this.clientHeight = target.clientHeight;
        }
    };
    PickerComponent.prototype.handleAnchorClick = function ($event) {
        this.updateCategoriesSize();
        this.selected = $event.category.name;
        this.setActiveCategories(this.categories);
        if (this.SEARCH_CATEGORY.emojis) {
            this.handleSearch(null);
            this.searchRef.clear();
            this.handleAnchorClick($event);
            return;
        }
        var component = this.categoryRefs.find(function (n) { return n.id === $event.category.id; });
        if (component) {
            var top_1 = component.top;
            if ($event.category.first) {
                top_1 = 0;
            }
            else {
                top_1 += 1;
            }
            this.scrollRef.nativeElement.scrollTop = top_1;
        }
        this.selected = $event.category.name;
        this.nextScroll = $event.category.name;
    };
    PickerComponent.prototype.categoryTrack = function (index, item) {
        return item.id;
    };
    PickerComponent.prototype.handleScroll = function () {
        var e_2, _a;
        if (this.nextScroll) {
            this.selected = this.nextScroll;
            this.nextScroll = undefined;
            return;
        }
        if (!this.scrollRef) {
            return;
        }
        if (this.showSingleCategory) {
            return;
        }
        var activeCategory = null;
        if (this.SEARCH_CATEGORY.emojis) {
            activeCategory = this.SEARCH_CATEGORY;
        }
        else {
            var target = this.scrollRef.nativeElement;
            // check scroll is not at bottom
            if (target.scrollTop === 0) {
                // hit the TOP
                activeCategory = this.categories.find(function (n) { return n.first === true; });
            }
            else if (target.scrollHeight - target.scrollTop === this.clientHeight) {
                // scrolled to bottom activate last category
                activeCategory = this.categories[this.categories.length - 1];
            }
            else {
                var _loop_1 = function (category) {
                    var component = this_1.categoryRefs.find(function (n) { return n.id === category.id; });
                    var active = component.handleScroll(target.scrollTop);
                    if (active) {
                        activeCategory = category;
                    }
                };
                var this_1 = this;
                try {
                    // scrolling
                    for (var _b = __values(this.categories), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var category = _c.value;
                        _loop_1(category);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            this.scrollTop = target.scrollTop;
        }
        if (activeCategory) {
            this.selected = activeCategory.name;
        }
    };
    PickerComponent.prototype.handleSearch = function ($emojis) {
        var e_3, _a;
        this.SEARCH_CATEGORY.emojis = $emojis;
        try {
            for (var _b = __values(this.categoryRefs.toArray()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var component = _c.value;
                if (component.name === 'Search') {
                    component.emojis = $emojis;
                    component.updateDisplay($emojis ? 'block' : 'none');
                }
                else {
                    component.updateDisplay($emojis ? 'none' : 'block');
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this.scrollRef.nativeElement.scrollTop = 0;
        this.handleScroll();
    };
    PickerComponent.prototype.handleEnterKey = function ($event, emoji) {
        if (!emoji) {
            if (this.SEARCH_CATEGORY.emojis !== null && this.SEARCH_CATEGORY.emojis.length) {
                emoji = this.SEARCH_CATEGORY.emojis[0];
                if (emoji) {
                    this.emojiSelect.emit({ $event: $event, emoji: emoji });
                }
                else {
                    return;
                }
            }
        }
        if (!this.hideRecent && !this.recent) {
            this.frequently.add(emoji);
        }
        var component = this.categoryRefs.toArray()[1];
        if (component) {
            component.getEmojis();
            component.ref.markForCheck();
        }
    };
    PickerComponent.prototype.handleEmojiOver = function ($event) {
        if (!this.showPreview || !this.previewRef) {
            return;
        }
        var emojiData = this.CUSTOM_CATEGORY.emojis.find(function (customEmoji) { return customEmoji.id === $event.emoji.id; });
        if (emojiData) {
            $event.emoji = __assign({}, emojiData);
        }
        this.previewEmoji = $event.emoji;
        clearTimeout(this.leaveTimeout);
    };
    PickerComponent.prototype.handleEmojiLeave = function () {
        var _this = this;
        if (!this.showPreview || !this.previewRef) {
            return;
        }
        this.leaveTimeout = setTimeout(function () {
            _this.previewEmoji = null;
            _this.previewRef.ref.markForCheck();
        }, 16);
    };
    PickerComponent.prototype.handleEmojiClick = function ($event) {
        this.emojiClick.emit($event);
        this.emojiSelect.emit($event);
        this.handleEnterKey($event.$event, $event.emoji);
    };
    PickerComponent.prototype.handleSkinChange = function (skin) {
        this.skin = skin;
        localStorage.setItem(this.NAMESPACE + ".skin", String(skin));
        this.skinChange.emit(skin);
    };
    PickerComponent.prototype.getWidth = function () {
        if (this.style.width) {
            return this.style.width;
        }
        return this.perLine * (this.emojiSize + 12) + 12 + 2 + this.measureScrollbar + 'px';
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "perLine", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "totalFrequentLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "i18n", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "style", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "emoji", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "color", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "hideObsolete", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PickerComponent.prototype, "categories", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PickerComponent.prototype, "activeCategories", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "set", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "skin", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "isNative", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "emojiSize", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "sheetSize", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], PickerComponent.prototype, "emojisToShowFilter", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "showPreview", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "emojiTooltip", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "autoFocus", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PickerComponent.prototype, "custom", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "hideRecent", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PickerComponent.prototype, "include", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PickerComponent.prototype, "exclude", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "notFoundEmoji", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "categoriesIcons", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "searchIcons", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "showSingleCategory", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "emojiClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "emojiSelect", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "skinChange", void 0);
    __decorate([
        ViewChild('scrollRef'),
        __metadata("design:type", ElementRef)
    ], PickerComponent.prototype, "scrollRef", void 0);
    __decorate([
        ViewChild('previewRef'),
        __metadata("design:type", PreviewComponent)
    ], PickerComponent.prototype, "previewRef", void 0);
    __decorate([
        ViewChild('searchRef'),
        __metadata("design:type", SearchComponent)
    ], PickerComponent.prototype, "searchRef", void 0);
    __decorate([
        ViewChildren('categoryRef'),
        __metadata("design:type", QueryList)
    ], PickerComponent.prototype, "categoryRefs", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "backgroundImageFn", void 0);
    PickerComponent = __decorate([
        Component({
            selector: 'emoji-mart',
            template: "<div class=\"emoji-mart\"\n  [style.width]=\"getWidth()\"\n  [ngStyle]=\"style\">\n  <div class=\"emoji-mart-bar\">\n    <emoji-mart-anchors\n      [categories]=\"categories\"\n      (anchorClick)=\"handleAnchorClick($event)\"\n      [color]=\"color\"\n      [selected]=\"selected\"\n      [i18n]=\"i18n\"\n      [icons]=\"categoriesIcons\"\n    ></emoji-mart-anchors>\n  </div>\n  <emoji-search\n    #searchRef\n    [i18n]=\"i18n\"\n    (searchResults)=\"handleSearch($event)\"\n    (enterKey)=\"handleEnterKey($event)\"\n    [include]=\"include\"\n    [exclude]=\"exclude\"\n    [custom]=\"custom\"\n    [autoFocus]=\"autoFocus\"\n    [icons]=\"searchIcons\"\n    [emojisToShowFilter]=\"emojisToShowFilter\"\n  ></emoji-search>\n  <section #scrollRef class=\"emoji-mart-scroll\" (scroll)=\"handleScroll()\" [attr.aria-label]=\"i18n.emojilist\">\n    <emoji-category\n      *ngFor=\"let category of activeCategories; let idx = index; trackBy: categoryTrack\"\n      #categoryRef\n      [id]=\"category.id\"\n      [name]=\"category.name\"\n      [emojis]=\"category.emojis\"\n      [perLine]=\"perLine\"\n      [totalFrequentLines]=\"totalFrequentLines\"\n      [hasStickyPosition]=\"isNative\"\n      [i18n]=\"i18n\"\n      [hideObsolete]=\"hideObsolete\"\n      [notFoundEmoji]=\"notFoundEmoji\"\n      [custom]=\"category.id == RECENT_CATEGORY.id ? CUSTOM_CATEGORY.emojis : undefined\"\n      [recent]=\"category.id == RECENT_CATEGORY.id ? recent : undefined\"\n      [emojiIsNative]=\"isNative\"\n      [emojiSkin]=\"skin\"\n      [emojiSize]=\"emojiSize\"\n      [emojiSet]=\"set\"\n      [emojiSheetSize]=\"sheetSize\"\n      [emojiForceSize]=\"isNative\"\n      [emojiTooltip]=\"emojiTooltip\"\n      [emojiBackgroundImageFn]=\"backgroundImageFn\"\n      (emojiOver)=\"handleEmojiOver($event)\"\n      (emojiLeave)=\"handleEmojiLeave()\"\n      (emojiClick)=\"handleEmojiClick($event)\"\n    ></emoji-category>\n  </section>\n  <div class=\"emoji-mart-bar\" *ngIf=\"showPreview\">\n    <emoji-preview\n      #previewRef\n      [title]=\"title\"\n      [emoji]=\"previewEmoji\"\n      [idleEmoji]=\"emoji\"\n      [emojiIsNative]=\"isNative\"\n      [emojiSize]=\"38\"\n      [emojiSkin]=\"skin\"\n      [emojiSet]=\"set\"\n      [i18n]=\"i18n\"\n      [emojiSheetSize]=\"sheetSize\"\n      [emojiBackgroundImageFn]=\"backgroundImageFn\"\n      (skinChange)=\"handleSkinChange($event)\"\n    ></emoji-preview>\n  </div>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            preserveWhitespaces: false
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            EmojiFrequentlyService])
    ], PickerComponent);
    return PickerComponent;
}());

var SkinComponent = /** @class */ (function () {
    function SkinComponent() {
        this.changeSkin = new EventEmitter();
        this.opened = false;
        this.skinTones = [1, 2, 3, 4, 5, 6];
    }
    SkinComponent.prototype.toggleOpen = function () {
        this.opened = !this.opened;
    };
    SkinComponent.prototype.isSelected = function (skinTone) {
        return skinTone === this.skin;
    };
    SkinComponent.prototype.isVisible = function (skinTone) {
        return this.opened || this.isSelected(skinTone);
    };
    SkinComponent.prototype.pressed = function (skinTone) {
        return this.opened ? !!this.isSelected(skinTone) : '';
    };
    SkinComponent.prototype.tabIndex = function (skinTone) {
        return this.isVisible(skinTone) ? '0' : '';
    };
    SkinComponent.prototype.expanded = function (skinTone) {
        return this.isSelected(skinTone) ? this.opened : '';
    };
    SkinComponent.prototype.handleClick = function (skin) {
        if (!this.opened) {
            this.opened = true;
            return;
        }
        this.opened = false;
        if (skin !== this.skin) {
            this.changeSkin.emit(skin);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SkinComponent.prototype, "skin", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SkinComponent.prototype, "i18n", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SkinComponent.prototype, "changeSkin", void 0);
    SkinComponent = __decorate([
        Component({
            selector: 'emoji-skins',
            template: "\n    <section\n      class=\"emoji-mart-skin-swatches\"\n      [class.emoji-mart-skin-swatches-opened]=\"opened\"\n    >\n      <span\n        *ngFor=\"let skinTone of skinTones\"\n        class=\"emoji-mart-skin-swatch\"\n        [class.emoji-mart-skin-swatch-selected]=\"skinTone === skin\"\n      >\n        <span\n          (click)=\"this.handleClick(skinTone)\"\n          (keyup.enter)=\"handleClick(skinTone)\"\n          (keyup.space)=\"handleClick(skinTone)\"\n          class=\"emoji-mart-skin emoji-mart-skin-tone-{{ skinTone }}\"\n          role=\"button\"\n          [tabIndex]=\"tabIndex(skinTone)\"\n          [attr.aria-hidden]=\"!isVisible(skinTone)\"\n          [attr.aria-pressed]=\"pressed(skinTone)\"\n          [attr.aria-haspopup]=\"!!isSelected(skinTone)\"\n          [attr.aria-expanded]=\"expanded(skinTone)\"\n          [attr.aria-label]=\"i18n.skintones[skinTone]\"\n          [title]=\"i18n.skintones[skinTone]\"\n        ></span>\n      </span>\n    </section>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            preserveWhitespaces: false
        })
    ], SkinComponent);
    return SkinComponent;
}());

var components = [
    PickerComponent,
    AnchorsComponent,
    CategoryComponent,
    SearchComponent,
    PreviewComponent,
    SkinComponent,
];
var PickerModule = /** @class */ (function () {
    function PickerModule() {
    }
    PickerModule = __decorate([
        NgModule({
            imports: [CommonModule, FormsModule, EmojiModule],
            exports: components,
            declarations: components,
        })
    ], PickerModule);
    return PickerModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { AnchorsComponent, CategoryComponent, EmojiFrequentlyService, EmojiSearch, PickerComponent, PickerModule, PreviewComponent, SearchComponent, SkinComponent };
//# sourceMappingURL=ctrl-ngx-emoji-mart.js.map
