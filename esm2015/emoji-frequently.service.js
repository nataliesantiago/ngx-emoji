import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
let EmojiFrequentlyService = class EmojiFrequentlyService {
    constructor() {
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
    init() {
        this.frequently = JSON.parse(localStorage.getItem(`${this.NAMESPACE}.frequently`) || 'null');
        this.initialized = true;
    }
    add(emoji) {
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
        localStorage.setItem(`${this.NAMESPACE}.last`, emoji.id);
        localStorage.setItem(`${this.NAMESPACE}.frequently`, JSON.stringify(this.frequently));
    }
    get(perLine, totalLines) {
        if (!this.initialized) {
            this.init();
        }
        if (this.frequently === null) {
            this.defaults = {};
            const result = [];
            for (let i = 0; i < perLine; i++) {
                this.defaults[this.DEFAULTS[i]] = perLine - i;
                result.push(this.DEFAULTS[i]);
            }
            return result;
        }
        const quantity = perLine * totalLines;
        const frequentlyKeys = Object.keys(this.frequently);
        const sorted = frequentlyKeys
            .sort((a, b) => this.frequently[a] - this.frequently[b])
            .reverse();
        const sliced = sorted.slice(0, quantity);
        const last = localStorage.getItem(`${this.NAMESPACE}.last`);
        if (last && !sliced.includes(last)) {
            sliced.pop();
            sliced.push(last);
        }
        return sliced;
    }
};
EmojiFrequentlyService.ngInjectableDef = i0.defineInjectable({ factory: function EmojiFrequentlyService_Factory() { return new EmojiFrequentlyService(); }, token: EmojiFrequentlyService, providedIn: "root" });
EmojiFrequentlyService = tslib_1.__decorate([
    Injectable({ providedIn: 'root' })
], EmojiFrequentlyService);
export { EmojiFrequentlyService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1vamktZnJlcXVlbnRseS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGN0cmwvbmd4LWVtb2ppLW1hcnQvIiwic291cmNlcyI6WyJlbW9qaS1mcmVxdWVudGx5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSzNDLElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXNCO0lBRG5DO1FBRUUsY0FBUyxHQUFHLFlBQVksQ0FBQztRQUN6QixlQUFVLEdBQXFDLElBQUksQ0FBQztRQUNwRCxhQUFRLEdBQThCLEVBQUUsQ0FBQztRQUN6QyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixhQUFRLEdBQUc7WUFDVCxJQUFJO1lBQ0osVUFBVTtZQUNWLGVBQWU7WUFDZixZQUFZO1lBQ1osVUFBVTtZQUNWLDhCQUE4QjtZQUM5QixhQUFhO1lBQ2IsS0FBSztZQUNMLFFBQVE7WUFDUixjQUFjO1lBQ2QsVUFBVTtZQUNWLE9BQU87WUFDUCxLQUFLO1lBQ0wsWUFBWTtZQUNaLE9BQU87WUFDUCxNQUFNO1NBQ1AsQ0FBQztLQW9ESDtJQWxEQyxJQUFJO1FBQ0YsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxhQUFhLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQztRQUM3RixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBQ0QsR0FBRyxDQUFDLEtBQWdCO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNiO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMvQjtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUvQixZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6RCxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUNELEdBQUcsQ0FBQyxPQUFlLEVBQUUsVUFBa0I7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2I7UUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFO1lBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ25CLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUVsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDO2dCQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMvQjtZQUNELE9BQU8sTUFBTSxDQUFDO1NBQ2Y7UUFFRCxNQUFNLFFBQVEsR0FBRyxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQ3RDLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXBELE1BQU0sTUFBTSxHQUFHLGNBQWM7YUFDMUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3ZELE9BQU8sRUFBRSxDQUFDO1FBQ2IsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFekMsTUFBTSxJQUFJLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLE9BQU8sQ0FBQyxDQUFDO1FBRTVELElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNsQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25CO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQUNGLENBQUE7O0FBMUVZLHNCQUFzQjtJQURsQyxVQUFVLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUM7R0FDdEIsc0JBQXNCLENBMEVsQztTQTFFWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEVtb2ppRGF0YSB9IGZyb20gJ0BjdHJsL25neC1lbW9qaS1tYXJ0L25neC1lbW9qaSc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgRW1vamlGcmVxdWVudGx5U2VydmljZSB7XG4gIE5BTUVTUEFDRSA9ICdlbW9qaS1tYXJ0JztcbiAgZnJlcXVlbnRseTogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfSB8IG51bGwgPSBudWxsO1xuICBkZWZhdWx0czogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfSA9IHt9O1xuICBpbml0aWFsaXplZCA9IGZhbHNlO1xuICBERUZBVUxUUyA9IFtcbiAgICAnKzEnLFxuICAgICdncmlubmluZycsXG4gICAgJ2tpc3NpbmdfaGVhcnQnLFxuICAgICdoZWFydF9leWVzJyxcbiAgICAnbGF1Z2hpbmcnLFxuICAgICdzdHVja19vdXRfdG9uZ3VlX3dpbmtpbmdfZXllJyxcbiAgICAnc3dlYXRfc21pbGUnLFxuICAgICdqb3knLFxuICAgICdzY3JlYW0nLFxuICAgICdkaXNhcHBvaW50ZWQnLFxuICAgICd1bmFtdXNlZCcsXG4gICAgJ3dlYXJ5JyxcbiAgICAnc29iJyxcbiAgICAnc3VuZ2xhc3NlcycsXG4gICAgJ2hlYXJ0JyxcbiAgICAncG9vcCcsXG4gIF07XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmZyZXF1ZW50bHkgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke3RoaXMuTkFNRVNQQUNFfS5mcmVxdWVudGx5YCkgfHwgJ251bGwnKTtcbiAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuICBhZGQoZW1vamk6IEVtb2ppRGF0YSkge1xuICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIGlmICghdGhpcy5mcmVxdWVudGx5KSB7XG4gICAgICB0aGlzLmZyZXF1ZW50bHkgPSB0aGlzLmRlZmF1bHRzO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuZnJlcXVlbnRseVtlbW9qaS5pZF0pIHtcbiAgICAgIHRoaXMuZnJlcXVlbnRseVtlbW9qaS5pZF0gPSAwO1xuICAgIH1cbiAgICB0aGlzLmZyZXF1ZW50bHlbZW1vamkuaWRdICs9IDE7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgJHt0aGlzLk5BTUVTUEFDRX0ubGFzdGAsIGVtb2ppLmlkKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgJHt0aGlzLk5BTUVTUEFDRX0uZnJlcXVlbnRseWAsIEpTT04uc3RyaW5naWZ5KHRoaXMuZnJlcXVlbnRseSkpO1xuICB9XG4gIGdldChwZXJMaW5lOiBudW1iZXIsIHRvdGFsTGluZXM6IG51bWJlcikge1xuICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmZyZXF1ZW50bHkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuZGVmYXVsdHMgPSB7fTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBlckxpbmU7IGkrKykge1xuICAgICAgICB0aGlzLmRlZmF1bHRzW3RoaXMuREVGQVVMVFNbaV1dID0gcGVyTGluZSAtIGk7XG4gICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuREVGQVVMVFNbaV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCBxdWFudGl0eSA9IHBlckxpbmUgKiB0b3RhbExpbmVzO1xuICAgIGNvbnN0IGZyZXF1ZW50bHlLZXlzID0gT2JqZWN0LmtleXModGhpcy5mcmVxdWVudGx5KTtcblxuICAgIGNvbnN0IHNvcnRlZCA9IGZyZXF1ZW50bHlLZXlzXG4gICAgICAuc29ydCgoYSwgYikgPT4gdGhpcy5mcmVxdWVudGx5W2FdIC0gdGhpcy5mcmVxdWVudGx5W2JdKVxuICAgICAgLnJldmVyc2UoKTtcbiAgICBjb25zdCBzbGljZWQgPSBzb3J0ZWQuc2xpY2UoMCwgcXVhbnRpdHkpO1xuXG4gICAgY29uc3QgbGFzdCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke3RoaXMuTkFNRVNQQUNFfS5sYXN0YCk7XG5cbiAgICBpZiAobGFzdCAmJiAhc2xpY2VkLmluY2x1ZGVzKGxhc3QpKSB7XG4gICAgICBzbGljZWQucG9wKCk7XG4gICAgICBzbGljZWQucHVzaChsYXN0KTtcbiAgICB9XG4gICAgcmV0dXJuIHNsaWNlZDtcbiAgfVxufVxuIl19