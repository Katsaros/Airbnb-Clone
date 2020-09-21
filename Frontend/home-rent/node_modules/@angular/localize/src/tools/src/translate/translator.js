(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/translator", ["require", "exports", "tslib"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Translator = void 0;
    var tslib_1 = require("tslib");
    /**
     * Translate each file (e.g. source file or static asset) using the given `TranslationHandler`s.
     * The file will be translated by the first handler that returns true for `canTranslate()`.
     */
    var Translator = /** @class */ (function () {
        function Translator(fs, resourceHandlers, diagnostics) {
            this.fs = fs;
            this.resourceHandlers = resourceHandlers;
            this.diagnostics = diagnostics;
        }
        Translator.prototype.translateFiles = function (inputPaths, rootPath, outputPathFn, translations, sourceLocale) {
            var _this = this;
            inputPaths.forEach(function (inputPath) {
                var e_1, _a;
                var absInputPath = _this.fs.resolve(rootPath, inputPath);
                var contents = _this.fs.readFileBuffer(absInputPath);
                var relativePath = _this.fs.relative(rootPath, absInputPath);
                try {
                    for (var _b = tslib_1.__values(_this.resourceHandlers), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var resourceHandler = _c.value;
                        if (resourceHandler.canTranslate(relativePath, contents)) {
                            return resourceHandler.translate(_this.diagnostics, rootPath, relativePath, contents, outputPathFn, translations, sourceLocale);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                _this.diagnostics.error("Unable to handle resource file: " + inputPath);
            });
        };
        return Translator;
    }());
    exports.Translator = Translator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2xvY2FsaXplL3NyYy90b29scy9zcmMvdHJhbnNsYXRlL3RyYW5zbGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQTREQTs7O09BR0c7SUFDSDtRQUNFLG9CQUNZLEVBQWMsRUFBVSxnQkFBc0MsRUFDOUQsV0FBd0I7WUFEeEIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtZQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBc0I7WUFDOUQsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBRyxDQUFDO1FBRXhDLG1DQUFjLEdBQWQsVUFDSSxVQUF5QixFQUFFLFFBQXdCLEVBQUUsWUFBMEIsRUFDL0UsWUFBaUMsRUFBRSxZQUFxQjtZQUY1RCxpQkFnQkM7WUFiQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsU0FBUzs7Z0JBQzFCLElBQU0sWUFBWSxHQUFHLEtBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDMUQsSUFBTSxRQUFRLEdBQUcsS0FBSSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3RELElBQU0sWUFBWSxHQUFHLEtBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQzs7b0JBQzlELEtBQThCLElBQUEsS0FBQSxpQkFBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUEsZ0JBQUEsNEJBQUU7d0JBQWhELElBQU0sZUFBZSxXQUFBO3dCQUN4QixJQUFJLGVBQWUsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxFQUFFOzRCQUN4RCxPQUFPLGVBQWUsQ0FBQyxTQUFTLENBQzVCLEtBQUksQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFDOUUsWUFBWSxDQUFDLENBQUM7eUJBQ25CO3FCQUNGOzs7Ozs7Ozs7Z0JBQ0QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMscUNBQW1DLFNBQVcsQ0FBQyxDQUFDO1lBQ3pFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNILGlCQUFDO0lBQUQsQ0FBQyxBQXRCRCxJQXNCQztJQXRCWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtBYnNvbHV0ZUZzUGF0aCwgRmlsZVN5c3RlbSwgUGF0aFNlZ21lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvZmlsZV9zeXN0ZW0nO1xuaW1wb3J0IHvJtU1lc3NhZ2VJZCwgybVQYXJzZWRUcmFuc2xhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvbG9jYWxpemUnO1xuXG5pbXBvcnQge0RpYWdub3N0aWNzfSBmcm9tICcuLi9kaWFnbm9zdGljcyc7XG5cbmltcG9ydCB7T3V0cHV0UGF0aEZufSBmcm9tICcuL291dHB1dF9wYXRoJztcblxuLyoqXG4gKiBBbiBvYmplY3QgdGhhdCBob2xkcyBpbmZvcm1hdGlvbiB0byBiZSB1c2VkIHRvIHRyYW5zbGF0ZSBmaWxlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcmFuc2xhdGlvbkJ1bmRsZSB7XG4gIGxvY2FsZTogc3RyaW5nO1xuICB0cmFuc2xhdGlvbnM6IFJlY29yZDzJtU1lc3NhZ2VJZCwgybVQYXJzZWRUcmFuc2xhdGlvbj47XG4gIGRpYWdub3N0aWNzPzogRGlhZ25vc3RpY3M7XG59XG5cbi8qKlxuICogSW1wbGVtZW50IHRoaXMgaW50ZXJmYWNlIHRvIHByb3ZpZGUgYSBjbGFzcyB0aGF0IGNhbiBoYW5kbGUgdHJhbnNsYXRpb24gZm9yIHRoZSBnaXZlbiByZXNvdXJjZSBpblxuICogYW4gYXBwcm9wcmlhdGUgbWFubmVyLlxuICpcbiAqIEZvciBleGFtcGxlLCBzb3VyY2UgY29kZSBmaWxlcyB3aWxsIG5lZWQgdG8gYmUgdHJhbnNmb3JtZWQgaWYgdGhleSBjb250YWluIGAkbG9jYWxpemVgIHRhZ2dlZFxuICogdGVtcGxhdGUgc3RyaW5ncywgd2hpbGUgbW9zdCBzdGF0aWMgYXNzZXRzIHdpbGwganVzdCBuZWVkIHRvIGJlIGNvcGllZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcmFuc2xhdGlvbkhhbmRsZXIge1xuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBmaWxlIGNhbiBiZSB0cmFuc2xhdGVkIGJ5IHRoaXMgaGFuZGxlci5cbiAgICpcbiAgICogQHBhcmFtIHJlbGF0aXZlRmlsZVBhdGggQSByZWxhdGl2ZSBwYXRoIGZyb20gdGhlIHNvdXJjZVJvb3QgdG8gdGhlIHJlc291cmNlIGZpbGUgdG8gaGFuZGxlLlxuICAgKiBAcGFyYW0gY29udGVudHMgVGhlIGNvbnRlbnRzIG9mIHRoZSBmaWxlIHRvIGhhbmRsZS5cbiAgICovXG4gIGNhblRyYW5zbGF0ZShyZWxhdGl2ZUZpbGVQYXRoOiBQYXRoU2VnbWVudHxBYnNvbHV0ZUZzUGF0aCwgY29udGVudHM6IEJ1ZmZlcik6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRyYW5zbGF0ZSB0aGUgZmlsZSBhdCBgcmVsYXRpdmVGaWxlUGF0aGAgY29udGFpbmluZyBgY29udGVudHNgLCB1c2luZyB0aGUgZ2l2ZW4gYHRyYW5zbGF0aW9uc2AsXG4gICAqIGFuZCB3cml0ZSB0aGUgdHJhbnNsYXRlZCBjb250ZW50IHRvIHRoZSBwYXRoIGNvbXB1dGVkIGJ5IGNhbGxpbmcgYG91dHB1dFBhdGhGbigpYC5cbiAgICpcbiAgICogQHBhcmFtIGRpYWdub3N0aWNzIEFuIG9iamVjdCBmb3IgY29sbGVjdGluZyB0cmFuc2xhdGlvbiBkaWFnbm9zdGljIG1lc3NhZ2VzLlxuICAgKiBAcGFyYW0gc291cmNlUm9vdCBBbiBhYnNvbHV0ZSBwYXRoIHRvIHRoZSByb290IG9mIHRoZSBmaWxlcyBiZWluZyB0cmFuc2xhdGVkLlxuICAgKiBAcGFyYW0gcmVsYXRpdmVGaWxlUGF0aCBBIHJlbGF0aXZlIHBhdGggZnJvbSB0aGUgc291cmNlUm9vdCB0byB0aGUgZmlsZSB0byB0cmFuc2xhdGUuXG4gICAqIEBwYXJhbSBjb250ZW50cyBUaGUgY29udGVudHMgb2YgdGhlIGZpbGUgdG8gdHJhbnNsYXRlLlxuICAgKiBAcGFyYW0gb3V0cHV0UGF0aEZuIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIGFic29sdXRlIHBhdGggd2hlcmUgdGhlIG91dHB1dCBmaWxlIHNob3VsZCBiZVxuICAgKiB3cml0dGVuLlxuICAgKiBAcGFyYW0gdHJhbnNsYXRpb25zIEEgY29sbGVjdGlvbiBvZiB0cmFuc2xhdGlvbnMgdG8gYXBwbHkgdG8gdGhpcyBmaWxlLlxuICAgKiBAcGFyYW0gc291cmNlTG9jYWxlIFRoZSBsb2NhbGUgb2YgdGhlIG9yaWdpbmFsIGFwcGxpY2F0aW9uIHNvdXJjZS4gSWYgcHJvdmlkZWQgdGhlbiBhblxuICAgKiBhZGRpdGlvbmFsIGNvcHkgb2YgdGhlIGFwcGxpY2F0aW9uIGlzIGNyZWF0ZWQgdW5kZXIgdGhpcyBsb2NhbGUganVzdCB3aXRoIHRoZSBgJGxvY2FsaXplYCBjYWxsc1xuICAgKiBzdHJpcHBlZCBvdXQuXG4gICAqL1xuICB0cmFuc2xhdGUoXG4gICAgICBkaWFnbm9zdGljczogRGlhZ25vc3RpY3MsIHNvdXJjZVJvb3Q6IEFic29sdXRlRnNQYXRoLFxuICAgICAgcmVsYXRpdmVGaWxlUGF0aDogUGF0aFNlZ21lbnR8QWJzb2x1dGVGc1BhdGgsIGNvbnRlbnRzOiBCdWZmZXIsIG91dHB1dFBhdGhGbjogT3V0cHV0UGF0aEZuLFxuICAgICAgdHJhbnNsYXRpb25zOiBUcmFuc2xhdGlvbkJ1bmRsZVtdLCBzb3VyY2VMb2NhbGU/OiBzdHJpbmcpOiB2b2lkO1xufVxuXG4vKipcbiAqIFRyYW5zbGF0ZSBlYWNoIGZpbGUgKGUuZy4gc291cmNlIGZpbGUgb3Igc3RhdGljIGFzc2V0KSB1c2luZyB0aGUgZ2l2ZW4gYFRyYW5zbGF0aW9uSGFuZGxlcmBzLlxuICogVGhlIGZpbGUgd2lsbCBiZSB0cmFuc2xhdGVkIGJ5IHRoZSBmaXJzdCBoYW5kbGVyIHRoYXQgcmV0dXJucyB0cnVlIGZvciBgY2FuVHJhbnNsYXRlKClgLlxuICovXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBmczogRmlsZVN5c3RlbSwgcHJpdmF0ZSByZXNvdXJjZUhhbmRsZXJzOiBUcmFuc2xhdGlvbkhhbmRsZXJbXSxcbiAgICAgIHByaXZhdGUgZGlhZ25vc3RpY3M6IERpYWdub3N0aWNzKSB7fVxuXG4gIHRyYW5zbGF0ZUZpbGVzKFxuICAgICAgaW5wdXRQYXRoczogUGF0aFNlZ21lbnRbXSwgcm9vdFBhdGg6IEFic29sdXRlRnNQYXRoLCBvdXRwdXRQYXRoRm46IE91dHB1dFBhdGhGbixcbiAgICAgIHRyYW5zbGF0aW9uczogVHJhbnNsYXRpb25CdW5kbGVbXSwgc291cmNlTG9jYWxlPzogc3RyaW5nKTogdm9pZCB7XG4gICAgaW5wdXRQYXRocy5mb3JFYWNoKGlucHV0UGF0aCA9PiB7XG4gICAgICBjb25zdCBhYnNJbnB1dFBhdGggPSB0aGlzLmZzLnJlc29sdmUocm9vdFBhdGgsIGlucHV0UGF0aCk7XG4gICAgICBjb25zdCBjb250ZW50cyA9IHRoaXMuZnMucmVhZEZpbGVCdWZmZXIoYWJzSW5wdXRQYXRoKTtcbiAgICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IHRoaXMuZnMucmVsYXRpdmUocm9vdFBhdGgsIGFic0lucHV0UGF0aCk7XG4gICAgICBmb3IgKGNvbnN0IHJlc291cmNlSGFuZGxlciBvZiB0aGlzLnJlc291cmNlSGFuZGxlcnMpIHtcbiAgICAgICAgaWYgKHJlc291cmNlSGFuZGxlci5jYW5UcmFuc2xhdGUocmVsYXRpdmVQYXRoLCBjb250ZW50cykpIHtcbiAgICAgICAgICByZXR1cm4gcmVzb3VyY2VIYW5kbGVyLnRyYW5zbGF0ZShcbiAgICAgICAgICAgICAgdGhpcy5kaWFnbm9zdGljcywgcm9vdFBhdGgsIHJlbGF0aXZlUGF0aCwgY29udGVudHMsIG91dHB1dFBhdGhGbiwgdHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgICBzb3VyY2VMb2NhbGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmRpYWdub3N0aWNzLmVycm9yKGBVbmFibGUgdG8gaGFuZGxlIHJlc291cmNlIGZpbGU6ICR7aW5wdXRQYXRofWApO1xuICAgIH0pO1xuICB9XG59XG4iXX0=