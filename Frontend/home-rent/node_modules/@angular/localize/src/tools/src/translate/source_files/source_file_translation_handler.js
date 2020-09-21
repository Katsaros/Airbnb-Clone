(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/source_files/source_file_translation_handler", ["require", "exports", "tslib", "@angular/compiler-cli/src/ngtsc/file_system", "@babel/core", "@angular/localize/src/tools/src/translate/source_files/es2015_translate_plugin", "@angular/localize/src/tools/src/translate/source_files/es5_translate_plugin", "@angular/localize/src/tools/src/translate/source_files/locale_plugin"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SourceFileTranslationHandler = void 0;
    var tslib_1 = require("tslib");
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
    var core_1 = require("@babel/core");
    var es2015_translate_plugin_1 = require("@angular/localize/src/tools/src/translate/source_files/es2015_translate_plugin");
    var es5_translate_plugin_1 = require("@angular/localize/src/tools/src/translate/source_files/es5_translate_plugin");
    var locale_plugin_1 = require("@angular/localize/src/tools/src/translate/source_files/locale_plugin");
    /**
     * Translate a file by inlining all messages tagged by `$localize` with the appropriate translated
     * message.
     */
    var SourceFileTranslationHandler = /** @class */ (function () {
        function SourceFileTranslationHandler(fs, translationOptions) {
            if (translationOptions === void 0) { translationOptions = {}; }
            this.fs = fs;
            this.translationOptions = translationOptions;
            this.sourceLocaleOptions = tslib_1.__assign(tslib_1.__assign({}, this.translationOptions), { missingTranslation: 'ignore' });
        }
        SourceFileTranslationHandler.prototype.canTranslate = function (relativeFilePath, _contents) {
            return this.fs.extname(relativeFilePath) === '.js';
        };
        SourceFileTranslationHandler.prototype.translate = function (diagnostics, sourceRoot, relativeFilePath, contents, outputPathFn, translations, sourceLocale) {
            var e_1, _a, e_2, _b;
            var sourceCode = contents.toString('utf8');
            // A short-circuit check to avoid parsing the file into an AST if it does not contain any
            // `$localize` identifiers.
            if (!sourceCode.includes('$localize')) {
                try {
                    for (var translations_1 = tslib_1.__values(translations), translations_1_1 = translations_1.next(); !translations_1_1.done; translations_1_1 = translations_1.next()) {
                        var translation = translations_1_1.value;
                        this.writeSourceFile(diagnostics, outputPathFn, translation.locale, relativeFilePath, contents);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (translations_1_1 && !translations_1_1.done && (_a = translations_1.return)) _a.call(translations_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                if (sourceLocale !== undefined) {
                    this.writeSourceFile(diagnostics, outputPathFn, sourceLocale, relativeFilePath, contents);
                }
            }
            else {
                var ast = core_1.parseSync(sourceCode, { sourceRoot: sourceRoot, filename: relativeFilePath });
                if (!ast) {
                    diagnostics.error("Unable to parse source file: " + this.fs.join(sourceRoot, relativeFilePath));
                    return;
                }
                try {
                    // Output a translated copy of the file for each locale.
                    for (var translations_2 = tslib_1.__values(translations), translations_2_1 = translations_2.next(); !translations_2_1.done; translations_2_1 = translations_2.next()) {
                        var translationBundle = translations_2_1.value;
                        this.translateFile(diagnostics, ast, translationBundle, sourceRoot, relativeFilePath, outputPathFn, this.translationOptions);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (translations_2_1 && !translations_2_1.done && (_b = translations_2.return)) _b.call(translations_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                if (sourceLocale !== undefined) {
                    // Also output a copy of the file for the source locale.
                    // There will be no translations - by definition - so we "ignore" `missingTranslations`.
                    this.translateFile(diagnostics, ast, { locale: sourceLocale, translations: {} }, sourceRoot, relativeFilePath, outputPathFn, this.sourceLocaleOptions);
                }
            }
        };
        SourceFileTranslationHandler.prototype.translateFile = function (diagnostics, ast, translationBundle, sourceRoot, filename, outputPathFn, options) {
            var translated = core_1.transformFromAstSync(ast, undefined, {
                compact: true,
                generatorOpts: { minified: true },
                plugins: [
                    locale_plugin_1.makeLocalePlugin(translationBundle.locale),
                    es2015_translate_plugin_1.makeEs2015TranslatePlugin(diagnostics, translationBundle.translations, options),
                    es5_translate_plugin_1.makeEs5TranslatePlugin(diagnostics, translationBundle.translations, options),
                ],
                filename: filename,
            });
            if (translated && translated.code) {
                this.writeSourceFile(diagnostics, outputPathFn, translationBundle.locale, filename, translated.code);
                var outputPath = file_system_1.absoluteFrom(outputPathFn(translationBundle.locale, filename));
                this.fs.ensureDir(this.fs.dirname(outputPath));
                this.fs.writeFile(outputPath, translated.code);
            }
            else {
                diagnostics.error("Unable to translate source file: " + this.fs.join(sourceRoot, filename));
                return;
            }
        };
        SourceFileTranslationHandler.prototype.writeSourceFile = function (diagnostics, outputPathFn, locale, relativeFilePath, contents) {
            try {
                var outputPath = file_system_1.absoluteFrom(outputPathFn(locale, relativeFilePath));
                this.fs.ensureDir(this.fs.dirname(outputPath));
                this.fs.writeFile(outputPath, contents);
            }
            catch (e) {
                diagnostics.error(e.message);
            }
        };
        return SourceFileTranslationHandler;
    }());
    exports.SourceFileTranslationHandler = SourceFileTranslationHandler;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlX2ZpbGVfdHJhbnNsYXRpb25faGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2xvY2FsaXplL3NyYy90b29scy9zcmMvdHJhbnNsYXRlL3NvdXJjZV9maWxlcy9zb3VyY2VfZmlsZV90cmFuc2xhdGlvbl9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFBQTs7Ozs7O09BTUc7SUFDSCwyRUFBa0g7SUFDbEgsb0NBQTREO0lBUTVELDBIQUFvRTtJQUNwRSxvSEFBOEQ7SUFDOUQsc0dBQWlEO0lBRWpEOzs7T0FHRztJQUNIO1FBR0Usc0NBQW9CLEVBQWMsRUFBVSxrQkFBK0M7WUFBL0MsbUNBQUEsRUFBQSx1QkFBK0M7WUFBdkUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtZQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBNkI7WUFGbkYsd0JBQW1CLHlDQUNNLElBQUksQ0FBQyxrQkFBa0IsS0FBRSxrQkFBa0IsRUFBRSxRQUFRLElBQUU7UUFDTSxDQUFDO1FBRS9GLG1EQUFZLEdBQVosVUFBYSxnQkFBNEMsRUFBRSxTQUFpQjtZQUMxRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssS0FBSyxDQUFDO1FBQ3JELENBQUM7UUFFRCxnREFBUyxHQUFULFVBQ0ksV0FBd0IsRUFBRSxVQUEwQixFQUFFLGdCQUE2QixFQUNuRixRQUFnQixFQUFFLFlBQTBCLEVBQUUsWUFBaUMsRUFDL0UsWUFBcUI7O1lBQ3ZCLElBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0MseUZBQXlGO1lBQ3pGLDJCQUEyQjtZQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTs7b0JBQ3JDLEtBQTBCLElBQUEsaUJBQUEsaUJB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QyxDQUFDO2FBQ2hEO2lCQUFNO2dCQUNMLFdBQVcsQ0FBQyxLQUFLLENBQUMsc0NBQW9DLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUcsQ0FBQyxDQUFDO2dCQUM1RixPQUFPO2FBQ1I7UUFDSCxDQUFDO1FBRU8sc0RBQWUsR0FBdkIsVUFDSSxXQUF3QixFQUFFLFlBQTBCLEVBQUUsTUFBYyxFQUNwRSxnQkFBNkIsRUFBRSxRQUF1QjtZQUN4RCxJQUFJO2dCQUNGLElBQU0sVUFBVSxHQUFHLDBCQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hFLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUN6QztZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzlCO1FBQ0gsQ0FBQztRQUNILG1DQUFDO0lBQUQsQ0FBQyxBQXBGRCxJQW9GQztJQXBGWSxvRUFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7YWJzb2x1dGVGcm9tLCBBYnNvbHV0ZUZzUGF0aCwgRmlsZVN5c3RlbSwgUGF0aFNlZ21lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvZmlsZV9zeXN0ZW0nO1xuaW1wb3J0IHtwYXJzZVN5bmMsIHRyYW5zZm9ybUZyb21Bc3RTeW5jfSBmcm9tICdAYmFiZWwvY29yZSc7XG5pbXBvcnQge0ZpbGUsIFByb2dyYW19IGZyb20gJ0BiYWJlbC90eXBlcyc7XG5cbmltcG9ydCB7RGlhZ25vc3RpY3N9IGZyb20gJy4uLy4uL2RpYWdub3N0aWNzJztcbmltcG9ydCB7VHJhbnNsYXRlUGx1Z2luT3B0aW9uc30gZnJvbSAnLi4vLi4vc291cmNlX2ZpbGVfdXRpbHMnO1xuaW1wb3J0IHtPdXRwdXRQYXRoRm59IGZyb20gJy4uL291dHB1dF9wYXRoJztcbmltcG9ydCB7VHJhbnNsYXRpb25CdW5kbGUsIFRyYW5zbGF0aW9uSGFuZGxlcn0gZnJvbSAnLi4vdHJhbnNsYXRvcic7XG5cbmltcG9ydCB7bWFrZUVzMjAxNVRyYW5zbGF0ZVBsdWdpbn0gZnJvbSAnLi9lczIwMTVfdHJhbnNsYXRlX3BsdWdpbic7XG5pbXBvcnQge21ha2VFczVUcmFuc2xhdGVQbHVnaW59IGZyb20gJy4vZXM1X3RyYW5zbGF0ZV9wbHVnaW4nO1xuaW1wb3J0IHttYWtlTG9jYWxlUGx1Z2lufSBmcm9tICcuL2xvY2FsZV9wbHVnaW4nO1xuXG4vKipcbiAqIFRyYW5zbGF0ZSBhIGZpbGUgYnkgaW5saW5pbmcgYWxsIG1lc3NhZ2VzIHRhZ2dlZCBieSBgJGxvY2FsaXplYCB3aXRoIHRoZSBhcHByb3ByaWF0ZSB0cmFuc2xhdGVkXG4gKiBtZXNzYWdlLlxuICovXG5leHBvcnQgY2xhc3MgU291cmNlRmlsZVRyYW5zbGF0aW9uSGFuZGxlciBpbXBsZW1lbnRzIFRyYW5zbGF0aW9uSGFuZGxlciB7XG4gIHByaXZhdGUgc291cmNlTG9jYWxlT3B0aW9uczpcbiAgICAgIFRyYW5zbGF0ZVBsdWdpbk9wdGlvbnMgPSB7Li4udGhpcy50cmFuc2xhdGlvbk9wdGlvbnMsIG1pc3NpbmdUcmFuc2xhdGlvbjogJ2lnbm9yZSd9O1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZzOiBGaWxlU3lzdGVtLCBwcml2YXRlIHRyYW5zbGF0aW9uT3B0aW9uczogVHJhbnNsYXRlUGx1Z2luT3B0aW9ucyA9IHt9KSB7fVxuXG4gIGNhblRyYW5zbGF0ZShyZWxhdGl2ZUZpbGVQYXRoOiBQYXRoU2VnbWVudHxBYnNvbHV0ZUZzUGF0aCwgX2NvbnRlbnRzOiBCdWZmZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5mcy5leHRuYW1lKHJlbGF0aXZlRmlsZVBhdGgpID09PSAnLmpzJztcbiAgfVxuXG4gIHRyYW5zbGF0ZShcbiAgICAgIGRpYWdub3N0aWNzOiBEaWFnbm9zdGljcywgc291cmNlUm9vdDogQWJzb2x1dGVGc1BhdGgsIHJlbGF0aXZlRmlsZVBhdGg6IFBhdGhTZWdtZW50LFxuICAgICAgY29udGVudHM6IEJ1ZmZlciwgb3V0cHV0UGF0aEZuOiBPdXRwdXRQYXRoRm4sIHRyYW5zbGF0aW9uczogVHJhbnNsYXRpb25CdW5kbGVbXSxcbiAgICAgIHNvdXJjZUxvY2FsZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHNvdXJjZUNvZGUgPSBjb250ZW50cy50b1N0cmluZygndXRmOCcpO1xuICAgIC8vIEEgc2hvcnQtY2lyY3VpdCBjaGVjayB0byBhdm9pZCBwYXJzaW5nIHRoZSBmaWxlIGludG8gYW4gQVNUIGlmIGl0IGRvZXMgbm90IGNvbnRhaW4gYW55XG4gICAgLy8gYCRsb2NhbGl6ZWAgaWRlbnRpZmllcnMuXG4gICAgaWYgKCFzb3VyY2VDb2RlLmluY2x1ZGVzKCckbG9jYWxpemUnKSkge1xuICAgICAgZm9yIChjb25zdCB0cmFuc2xhdGlvbiBvZiB0cmFuc2xhdGlvbnMpIHtcbiAgICAgICAgdGhpcy53cml0ZVNvdXJjZUZpbGUoXG4gICAgICAgICAgICBkaWFnbm9zdGljcywgb3V0cHV0UGF0aEZuLCB0cmFuc2xhdGlvbi5sb2NhbGUsIHJlbGF0aXZlRmlsZVBhdGgsIGNvbnRlbnRzKTtcbiAgICAgIH1cbiAgICAgIGlmIChzb3VyY2VMb2NhbGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLndyaXRlU291cmNlRmlsZShkaWFnbm9zdGljcywgb3V0cHV0UGF0aEZuLCBzb3VyY2VMb2NhbGUsIHJlbGF0aXZlRmlsZVBhdGgsIGNvbnRlbnRzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYXN0ID0gcGFyc2VTeW5jKHNvdXJjZUNvZGUsIHtzb3VyY2VSb290LCBmaWxlbmFtZTogcmVsYXRpdmVGaWxlUGF0aH0pO1xuICAgICAgaWYgKCFhc3QpIHtcbiAgICAgICAgZGlhZ25vc3RpY3MuZXJyb3IoXG4gICAgICAgICAgICBgVW5hYmxlIHRvIHBhcnNlIHNvdXJjZSBmaWxlOiAke3RoaXMuZnMuam9pbihzb3VyY2VSb290LCByZWxhdGl2ZUZpbGVQYXRoKX1gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gT3V0cHV0IGEgdHJhbnNsYXRlZCBjb3B5IG9mIHRoZSBmaWxlIGZvciBlYWNoIGxvY2FsZS5cbiAgICAgIGZvciAoY29uc3QgdHJhbnNsYXRpb25CdW5kbGUgb2YgdHJhbnNsYXRpb25zKSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlRmlsZShcbiAgICAgICAgICAgIGRpYWdub3N0aWNzLCBhc3QsIHRyYW5zbGF0aW9uQnVuZGxlLCBzb3VyY2VSb290LCByZWxhdGl2ZUZpbGVQYXRoLCBvdXRwdXRQYXRoRm4sXG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0aW9uT3B0aW9ucyk7XG4gICAgICB9XG4gICAgICBpZiAoc291cmNlTG9jYWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gQWxzbyBvdXRwdXQgYSBjb3B5IG9mIHRoZSBmaWxlIGZvciB0aGUgc291cmNlIGxvY2FsZS5cbiAgICAgICAgLy8gVGhlcmUgd2lsbCBiZSBubyB0cmFuc2xhdGlvbnMgLSBieSBkZWZpbml0aW9uIC0gc28gd2UgXCJpZ25vcmVcIiBgbWlzc2luZ1RyYW5zbGF0aW9uc2AuXG4gICAgICAgIHRoaXMudHJhbnNsYXRlRmlsZShcbiAgICAgICAgICAgIGRpYWdub3N0aWNzLCBhc3QsIHtsb2NhbGU6IHNvdXJjZUxvY2FsZSwgdHJhbnNsYXRpb25zOiB7fX0sIHNvdXJjZVJvb3QsXG4gICAgICAgICAgICByZWxhdGl2ZUZpbGVQYXRoLCBvdXRwdXRQYXRoRm4sIHRoaXMuc291cmNlTG9jYWxlT3B0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0cmFuc2xhdGVGaWxlKFxuICAgICAgZGlhZ25vc3RpY3M6IERpYWdub3N0aWNzLCBhc3Q6IEZpbGV8UHJvZ3JhbSwgdHJhbnNsYXRpb25CdW5kbGU6IFRyYW5zbGF0aW9uQnVuZGxlLFxuICAgICAgc291cmNlUm9vdDogQWJzb2x1dGVGc1BhdGgsIGZpbGVuYW1lOiBQYXRoU2VnbWVudCwgb3V0cHV0UGF0aEZuOiBPdXRwdXRQYXRoRm4sXG4gICAgICBvcHRpb25zOiBUcmFuc2xhdGVQbHVnaW5PcHRpb25zKSB7XG4gICAgY29uc3QgdHJhbnNsYXRlZCA9IHRyYW5zZm9ybUZyb21Bc3RTeW5jKGFzdCwgdW5kZWZpbmVkLCB7XG4gICAgICBjb21wYWN0OiB0cnVlLFxuICAgICAgZ2VuZXJhdG9yT3B0czoge21pbmlmaWVkOiB0cnVlfSxcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgbWFrZUxvY2FsZVBsdWdpbih0cmFuc2xhdGlvbkJ1bmRsZS5sb2NhbGUpLFxuICAgICAgICBtYWtlRXMyMDE1VHJhbnNsYXRlUGx1Z2luKGRpYWdub3N0aWNzLCB0cmFuc2xhdGlvbkJ1bmRsZS50cmFuc2xhdGlvbnMsIG9wdGlvbnMpLFxuICAgICAgICBtYWtlRXM1VHJhbnNsYXRlUGx1Z2luKGRpYWdub3N0aWNzLCB0cmFuc2xhdGlvbkJ1bmRsZS50cmFuc2xhdGlvbnMsIG9wdGlvbnMpLFxuICAgICAgXSxcbiAgICAgIGZpbGVuYW1lLFxuICAgIH0pO1xuICAgIGlmICh0cmFuc2xhdGVkICYmIHRyYW5zbGF0ZWQuY29kZSkge1xuICAgICAgdGhpcy53cml0ZVNvdXJjZUZpbGUoXG4gICAgICAgICAgZGlhZ25vc3RpY3MsIG91dHB1dFBhdGhGbiwgdHJhbnNsYXRpb25CdW5kbGUubG9jYWxlLCBmaWxlbmFtZSwgdHJhbnNsYXRlZC5jb2RlKTtcbiAgICAgIGNvbnN0IG91dHB1dFBhdGggPSBhYnNvbHV0ZUZyb20ob3V0cHV0UGF0aEZuKHRyYW5zbGF0aW9uQnVuZGxlLmxvY2FsZSwgZmlsZW5hbWUpKTtcbiAgICAgIHRoaXMuZnMuZW5zdXJlRGlyKHRoaXMuZnMuZGlybmFtZShvdXRwdXRQYXRoKSk7XG4gICAgICB0aGlzLmZzLndyaXRlRmlsZShvdXRwdXRQYXRoLCB0cmFuc2xhdGVkLmNvZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaWFnbm9zdGljcy5lcnJvcihgVW5hYmxlIHRvIHRyYW5zbGF0ZSBzb3VyY2UgZmlsZTogJHt0aGlzLmZzLmpvaW4oc291cmNlUm9vdCwgZmlsZW5hbWUpfWApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgd3JpdGVTb3VyY2VGaWxlKFxuICAgICAgZGlhZ25vc3RpY3M6IERpYWdub3N0aWNzLCBvdXRwdXRQYXRoRm46IE91dHB1dFBhdGhGbiwgbG9jYWxlOiBzdHJpbmcsXG4gICAgICByZWxhdGl2ZUZpbGVQYXRoOiBQYXRoU2VnbWVudCwgY29udGVudHM6IHN0cmluZ3xCdWZmZXIpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgb3V0cHV0UGF0aCA9IGFic29sdXRlRnJvbShvdXRwdXRQYXRoRm4obG9jYWxlLCByZWxhdGl2ZUZpbGVQYXRoKSk7XG4gICAgICB0aGlzLmZzLmVuc3VyZURpcih0aGlzLmZzLmRpcm5hbWUob3V0cHV0UGF0aCkpO1xuICAgICAgdGhpcy5mcy53cml0ZUZpbGUob3V0cHV0UGF0aCwgY29udGVudHMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGRpYWdub3N0aWNzLmVycm9yKGUubWVzc2FnZSk7XG4gICAgfVxuICB9XG59XG4iXX0=