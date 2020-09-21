(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/translation_files/message_serialization/message_serializer", ["require", "exports", "tslib", "@angular/compiler", "@angular/localize/src/tools/src/translate/translation_files/base_visitor", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_parse_error", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageSerializer = void 0;
    var tslib_1 = require("tslib");
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var compiler_1 = require("@angular/compiler");
    var base_visitor_1 = require("@angular/localize/src/tools/src/translate/translation_files/base_visitor");
    var translation_parse_error_1 = require("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_parse_error");
    var translation_utils_1 = require("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_utils");
    /**
     * This visitor will walk over a set of XML nodes, which represent an i18n message, and serialize
     * them into a message object of type `T`.
     * The type of the serialized message is controlled by the
     */
    var MessageSerializer = /** @class */ (function (_super) {
        tslib_1.__extends(MessageSerializer, _super);
        function MessageSerializer(renderer, config) {
            var _this = _super.call(this) || this;
            _this.renderer = renderer;
            _this.config = config;
            return _this;
        }
        MessageSerializer.prototype.serialize = function (nodes) {
            this.renderer.startRender();
            compiler_1.visitAll(this, nodes);
            this.renderer.endRender();
            return this.renderer.message;
        };
        MessageSerializer.prototype.visitElement = function (element) {
            if (this.config.placeholder && element.name === this.config.placeholder.elementName) {
                var name = translation_utils_1.getAttrOrThrow(element, this.config.placeholder.nameAttribute);
                var body = this.config.placeholder.bodyAttribute &&
                    translation_utils_1.getAttribute(element, this.config.placeholder.bodyAttribute);
                this.visitPlaceholder(name, body);
            }
            else if (this.config.placeholderContainer &&
                element.name === this.config.placeholderContainer.elementName) {
                var start = translation_utils_1.getAttrOrThrow(element, this.config.placeholderContainer.startAttribute);
                var end = translation_utils_1.getAttrOrThrow(element, this.config.placeholderContainer.endAttribute);
                this.visitPlaceholderContainer(start, element.children, end);
            }
            else if (this.config.inlineElements.indexOf(element.name) !== -1) {
                compiler_1.visitAll(this, element.children);
            }
            else {
                throw new translation_parse_error_1.TranslationParseError(element.sourceSpan, "Invalid element found in message.");
            }
        };
        MessageSerializer.prototype.visitText = function (text) {
            this.renderer.text(text.value);
        };
        MessageSerializer.prototype.visitExpansion = function (expansion) {
            this.renderer.startIcu();
            this.renderer.text(expansion.switchValue + ", " + expansion.type + ",");
            compiler_1.visitAll(this, expansion.cases);
            this.renderer.endIcu();
        };
        MessageSerializer.prototype.visitExpansionCase = function (expansionCase) {
            this.renderer.text(" " + expansionCase.value + " {");
            this.renderer.startContainer();
            compiler_1.visitAll(this, expansionCase.expression);
            this.renderer.closeContainer();
            this.renderer.text("}");
        };
        MessageSerializer.prototype.visitContainedNodes = function (nodes) {
            var length = nodes.length;
            var index = 0;
            while (index < length) {
                if (!this.isPlaceholderContainer(nodes[index])) {
                    var startOfContainedNodes = index;
                    while (index < length - 1) {
                        index++;
                        if (this.isPlaceholderContainer(nodes[index])) {
                            break;
                        }
                    }
                    if (index - startOfContainedNodes > 1) {
                        // Only create a container if there are two or more contained Nodes in a row
                        this.renderer.startContainer();
                        compiler_1.visitAll(this, nodes.slice(startOfContainedNodes, index - 1));
                        this.renderer.closeContainer();
                    }
                }
                if (index < length) {
                    nodes[index].visit(this, undefined);
                }
                index++;
            }
        };
        MessageSerializer.prototype.visitPlaceholder = function (name, body) {
            this.renderer.placeholder(name, body);
        };
        MessageSerializer.prototype.visitPlaceholderContainer = function (startName, children, closeName) {
            this.renderer.startPlaceholder(startName);
            this.visitContainedNodes(children);
            this.renderer.closePlaceholder(closeName);
        };
        MessageSerializer.prototype.isPlaceholderContainer = function (node) {
            return node instanceof compiler_1.Element && node.name === this.config.placeholderContainer.elementName;
        };
        return MessageSerializer;
    }(base_visitor_1.BaseVisitor));
    exports.MessageSerializer = MessageSerializer;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZV9zZXJpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbG9jYWxpemUvc3JjL3Rvb2xzL3NyYy90cmFuc2xhdGUvdHJhbnNsYXRpb25fZmlsZXMvbWVzc2FnZV9zZXJpYWxpemF0aW9uL21lc3NhZ2Vfc2VyaWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBQUE7Ozs7OztPQU1HO0lBQ0gsOENBQTBGO0lBRTFGLHlHQUE0QztJQUM1QyxtSkFBcUY7SUFDckYsdUlBQXNGO0lBVXRGOzs7O09BSUc7SUFDSDtRQUEwQyw2Q0FBVztRQUNuRCwyQkFBb0IsUUFBNEIsRUFBVSxNQUErQjtZQUF6RixZQUNFLGlCQUFPLFNBQ1I7WUFGbUIsY0FBUSxHQUFSLFFBQVEsQ0FBb0I7WUFBVSxZQUFNLEdBQU4sTUFBTSxDQUF5Qjs7UUFFekYsQ0FBQztRQUVELHFDQUFTLEdBQVQsVUFBVSxLQUFhO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDNUIsbUJBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUMxQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQy9CLENBQUM7UUFFRCx3Q0FBWSxHQUFaLFVBQWEsT0FBZ0I7WUFDM0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRTtnQkFDbkYsSUFBTSxJQUFJLEdBQUcsa0NBQWMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzVFLElBQU0sSUFBSSxHQUFH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SUF6RlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0VsZW1lbnQsIEV4cGFuc2lvbiwgRXhwYW5zaW9uQ2FzZSwgTm9kZSwgVGV4dCwgdmlzaXRBbGx9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyJztcblxuaW1wb3J0IHtCYXNlVmlzaXRvcn0gZnJvbSAnLi4vYmFzZV92aXNpdG9yJztcbmltcG9ydCB7VHJhbnNsYXRpb25QYXJzZUVycm9yfSBmcm9tICcuLi90cmFuc2xhdGlvbl9wYXJzZXJzL3RyYW5zbGF0aW9uX3BhcnNlX2Vycm9yJztcbmltcG9ydCB7Z2V0QXR0cmlidXRlLCBnZXRBdHRyT3JUaHJvd30gZnJvbSAnLi4vdHJhbnNsYXRpb25fcGFyc2Vycy90cmFuc2xhdGlvbl91dGlscyc7XG5cbmltcG9ydCB7TWVzc2FnZVJlbmRlcmVyfSBmcm9tICcuL21lc3NhZ2VfcmVuZGVyZXInO1xuXG5pbnRlcmZhY2UgTWVzc2FnZVNlcmlhbGl6ZXJDb25maWcge1xuICBpbmxpbmVFbGVtZW50czogc3RyaW5nW107XG4gIHBsYWNlaG9sZGVyPzoge2VsZW1lbnROYW1lOiBzdHJpbmc7IG5hbWVBdHRyaWJ1dGU6IHN0cmluZzsgYm9keUF0dHJpYnV0ZT86IHN0cmluZzt9O1xuICBwbGFjZWhvbGRlckNvbnRhaW5lcj86IHtlbGVtZW50TmFtZTogc3RyaW5nOyBzdGFydEF0dHJpYnV0ZTogc3RyaW5nOyBlbmRBdHRyaWJ1dGU6IHN0cmluZzt9O1xufVxuXG4vKipcbiAqIFRoaXMgdmlzaXRvciB3aWxsIHdhbGsgb3ZlciBhIHNldCBvZiBYTUwgbm9kZXMsIHdoaWNoIHJlcHJlc2VudCBhbiBpMThuIG1lc3NhZ2UsIGFuZCBzZXJpYWxpemVcbiAqIHRoZW0gaW50byBhIG1lc3NhZ2Ugb2JqZWN0IG9mIHR5cGUgYFRgLlxuICogVGhlIHR5cGUgb2YgdGhlIHNlcmlhbGl6ZWQgbWVzc2FnZSBpcyBjb250cm9sbGVkIGJ5IHRoZVxuICovXG5leHBvcnQgY2xhc3MgTWVzc2FnZVNlcmlhbGl6ZXI8VD4gZXh0ZW5kcyBCYXNlVmlzaXRvciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IE1lc3NhZ2VSZW5kZXJlcjxUPiwgcHJpdmF0ZSBjb25maWc6IE1lc3NhZ2VTZXJpYWxpemVyQ29uZmlnKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHNlcmlhbGl6ZShub2RlczogTm9kZVtdKTogVCB7XG4gICAgdGhpcy5yZW5kZXJlci5zdGFydFJlbmRlcigpO1xuICAgIHZpc2l0QWxsKHRoaXMsIG5vZGVzKTtcbiAgICB0aGlzLnJlbmRlcmVyLmVuZFJlbmRlcigpO1xuICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLm1lc3NhZ2U7XG4gIH1cblxuICB2aXNpdEVsZW1lbnQoZWxlbWVudDogRWxlbWVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbmZpZy5wbGFjZWhvbGRlciAmJiBlbGVtZW50Lm5hbWUgPT09IHRoaXMuY29uZmlnLnBsYWNlaG9sZGVyLmVsZW1lbnROYW1lKSB7XG4gICAgICBjb25zdCBuYW1lID0gZ2V0QXR0ck9yVGhyb3coZWxlbWVudCwgdGhpcy5jb25maWcucGxhY2Vob2xkZXIubmFtZUF0dHJpYnV0ZSk7XG4gICAgICBjb25zdCBib2R5ID0gdGhpcy5jb25maWcucGxhY2Vob2xkZXIuYm9keUF0dHJpYnV0ZSAmJlxuICAgICAgICAgIGdldEF0dHJpYnV0ZShlbGVtZW50LCB0aGlzLmNvbmZpZy5wbGFjZWhvbGRlci5ib2R5QXR0cmlidXRlKTtcbiAgICAgIHRoaXMudmlzaXRQbGFjZWhvbGRlcihuYW1lLCBib2R5KTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgICB0aGlzLmNvbmZpZy5wbGFjZWhvbGRlckNvbnRhaW5lciAmJlxuICAgICAgICBlbGVtZW50Lm5hbWUgPT09IHRoaXMuY29uZmlnLnBsYWNlaG9sZGVyQ29udGFpbmVyLmVsZW1lbnROYW1lKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGdldEF0dHJPclRocm93KGVsZW1lbnQsIHRoaXMuY29uZmlnLnBsYWNlaG9sZGVyQ29udGFpbmVyLnN0YXJ0QXR0cmlidXRlKTtcbiAgICAgIGNvbnN0IGVuZCA9IGdldEF0dHJPclRocm93KGVsZW1lbnQsIHRoaXMuY29uZmlnLnBsYWNlaG9sZGVyQ29udGFpbmVyLmVuZEF0dHJpYnV0ZSk7XG4gICAgICB0aGlzLnZpc2l0UGxhY2Vob2xkZXJDb250YWluZXIoc3RhcnQsIGVsZW1lbnQuY2hpbGRyZW4sIGVuZCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5pbmxpbmVFbGVtZW50cy5pbmRleE9mKGVsZW1lbnQubmFtZSkgIT09IC0xKSB7XG4gICAgICB2aXNpdEFsbCh0aGlzLCBlbGVtZW50LmNoaWxkcmVuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFRyYW5zbGF0aW9uUGFyc2VFcnJvcihlbGVtZW50LnNvdXJjZVNwYW4sIGBJbnZhbGlkIGVsZW1lbnQgZm91bmQgaW4gbWVzc2FnZS5gKTtcbiAgICB9XG4gIH1cblxuICB2aXNpdFRleHQodGV4dDogVGV4dCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIudGV4dCh0ZXh0LnZhbHVlKTtcbiAgfVxuXG4gIHZpc2l0RXhwYW5zaW9uKGV4cGFuc2lvbjogRXhwYW5zaW9uKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zdGFydEljdSgpO1xuICAgIHRoaXMucmVuZGVyZXIudGV4dChgJHtleHBhbnNpb24uc3dpdGNoVmFsdWV9LCAke2V4cGFuc2lvbi50eXBlfSxgKTtcbiAgICB2aXNpdEFsbCh0aGlzLCBleHBhbnNpb24uY2FzZXMpO1xuICAgIHRoaXMucmVuZGVyZXIuZW5kSWN1KCk7XG4gIH1cblxuICB2aXNpdEV4cGFuc2lvbkNhc2UoZXhwYW5zaW9uQ2FzZTogRXhwYW5zaW9uQ2FzZSk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIudGV4dChgICR7ZXhwYW5zaW9uQ2FzZS52YWx1ZX0ge2ApO1xuICAgIHRoaXMucmVuZGVyZXIuc3RhcnRDb250YWluZXIoKTtcbiAgICB2aXNpdEFsbCh0aGlzLCBleHBhbnNpb25DYXNlLmV4cHJlc3Npb24pO1xuICAgIHRoaXMucmVuZGVyZXIuY2xvc2VDb250YWluZXIoKTtcbiAgICB0aGlzLnJlbmRlcmVyLnRleHQoYH1gKTtcbiAgfVxuXG4gIHZpc2l0Q29udGFpbmVkTm9kZXMobm9kZXM6IE5vZGVbXSk6IHZvaWQge1xuICAgIGNvbnN0IGxlbmd0aCA9IG5vZGVzLmxlbmd0aDtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIHdoaWxlIChpbmRleCA8IGxlbmd0aCkge1xuICAgICAgaWYgKCF0aGlzLmlzUGxhY2Vob2xkZXJDb250YWluZXIobm9kZXNbaW5kZXhdKSkge1xuICAgICAgICBjb25zdCBzdGFydE9mQ29udGFpbmVkTm9kZXMgPSBpbmRleDtcbiAgICAgICAgd2hpbGUgKGluZGV4IDwgbGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgaWYgKHRoaXMuaXNQbGFjZWhvbGRlckNvbnRhaW5lcihub2Rlc1tpbmRleF0pKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4IC0gc3RhcnRPZkNvbnRhaW5lZE5vZGVzID4gMSkge1xuICAgICAgICAgIC8vIE9ubHkgY3JlYXRlIGEgY29udGFpbmVyIGlmIHRoZXJlIGFyZSB0d28gb3IgbW9yZSBjb250YWluZWQgTm9kZXMgaW4gYSByb3dcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnN0YXJ0Q29udGFpbmVyKCk7XG4gICAgICAgICAgdmlzaXRBbGwodGhpcywgbm9kZXMuc2xpY2Uoc3RhcnRPZkNvbnRhaW5lZE5vZGVzLCBpbmRleCAtIDEpKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmNsb3NlQ29udGFpbmVyKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICBub2Rlc1tpbmRleF0udmlzaXQodGhpcywgdW5kZWZpbmVkKTtcbiAgICAgIH1cbiAgICAgIGluZGV4Kys7XG4gICAgfVxuICB9XG5cbiAgdmlzaXRQbGFjZWhvbGRlcihuYW1lOiBzdHJpbmcsIGJvZHk6IHN0cmluZ3x1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnBsYWNlaG9sZGVyKG5hbWUsIGJvZHkpO1xuICB9XG5cbiAgdmlzaXRQbGFjZWhvbGRlckNvbnRhaW5lcihzdGFydE5hbWU6IHN0cmluZywgY2hpbGRyZW46IE5vZGVbXSwgY2xvc2VOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnN0YXJ0UGxhY2Vob2xkZXIoc3RhcnROYW1lKTtcbiAgICB0aGlzLnZpc2l0Q29udGFpbmVkTm9kZXMoY2hpbGRyZW4pO1xuICAgIHRoaXMucmVuZGVyZXIuY2xvc2VQbGFjZWhvbGRlcihjbG9zZU5hbWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1BsYWNlaG9sZGVyQ29udGFpbmVyKG5vZGU6IE5vZGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQgJiYgbm9kZS5uYW1lID09PSB0aGlzLmNvbmZpZy5wbGFjZWhvbGRlckNvbnRhaW5lciEuZWxlbWVudE5hbWU7XG4gIH1cbn1cbiJdfQ==