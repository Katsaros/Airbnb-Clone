(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/source_files/es2015_translate_plugin", ["require", "exports", "@angular/localize/src/tools/src/source_file_utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeEs2015TranslatePlugin = void 0;
    var source_file_utils_1 = require("@angular/localize/src/tools/src/source_file_utils");
    function makeEs2015TranslatePlugin(diagnostics, translations, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.missingTranslation, missingTranslation = _c === void 0 ? 'error' : _c, _d = _b.localizeName, localizeName = _d === void 0 ? '$localize' : _d;
        return {
            visitor: {
                TaggedTemplateExpression: function (path) {
                    try {
                        var tag = path.get('tag');
                        if (source_file_utils_1.isLocalize(tag, localizeName)) {
                            var messageParts = source_file_utils_1.unwrapMessagePartsFromTemplateLiteral(path.node.quasi.quasis);
                            var translated = source_file_utils_1.translate(diagnostics, translations, messageParts, path.node.quasi.expressions, missingTranslation);
                            path.replaceWith(source_file_utils_1.buildLocalizeReplacement(translated[0], translated[1]));
                        }
                    }
                    catch (e) {
                        if (source_file_utils_1.isBabelParseError(e)) {
                            // If we get a BabelParseError here then something went wrong with Babel itself
                            // since there must be something wrong with the structure of the AST generated
                            // by Babel parsing a TaggedTemplateExpression.
                            throw source_file_utils_1.buildCodeFrameError(path, e);
                        }
                    }
                }
            }
        };
    }
    exports.makeEs2015TranslatePlugin = makeEs2015TranslatePlugin;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXMyMDE1X3RyYW5zbGF0ZV9wbHVnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sb2NhbGl6ZS9zcmMvdG9vbHMvc3JjL3RyYW5zbGF0ZS9zb3VyY2VfZmlsZXMvZXMyMDE1X3RyYW5zbGF0ZV9wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBYUEsdUZBQStMO0lBRS9MLFNBQWdCLHlCQUF5QixDQUNyQyxXQUF3QixFQUFFLFlBQWdELEVBQzFFLEVBQXVGO1lBQXZGLHFCQUFxRixFQUFFLEtBQUEsRUFBdEYsMEJBQTRCLEVBQTVCLGtCQUFrQixtQkFBRyxPQUFPLEtBQUEsRUFBRSxvQkFBMEIsRUFBMUIsWUFBWSxtQkFBRyxXQUFXLEtBQUE7UUFFM0QsT0FBTztZQUNMLE9BQU8sRUFBRTtnQkFDUCx3QkFBd0IsRUFBeEIsVUFBeUIsSUFBd0M7b0JBQy9ELElBQUk7d0JBQ0YsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDNUIsSUFBSSw4QkFBVSxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsRUFBRTs0QkFDakMsSUFBTSxZQUFZLEdBQUcseURBQXFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQ25GLElBQU0sVUFBVSxHQUFHLDZCQUFTLENBQ3hCLFdBQVcsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFDcEUsa0JBQWtCLENBQUMsQ0FBQzs0QkFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyw0Q0FBd0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDMUU7cUJBQ0Y7b0JBQUMsT0FBTyxDQUFDLEVBQUU7d0JBQ1YsSUFBSSxxQ0FBaUIsQ0FBQyxDQUFDLENBQUMsRUFBRTs0QkFDeEIsK0VBQStFOzRCQUMvRSw4RUFBOEU7NEJBQzlFLCtDQUErQzs0QkFDL0MsTUFBTSx1Q0FBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7eUJBQ3BDO3FCQUNGO2dCQUNILENBQUM7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDO0lBM0JELDhEQTJCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHvJtVBhcnNlZFRyYW5zbGF0aW9ufSBmcm9tICdAYW5ndWxhci9sb2NhbGl6ZSc7XG5pbXBvcnQge05vZGVQYXRoLCBQbHVnaW5PYmp9IGZyb20gJ0BiYWJlbC9jb3JlJztcbmltcG9ydCB7VGFnZ2VkVGVtcGxhdGVFeHByZXNzaW9ufSBmcm9tICdAYmFiZWwvdHlwZXMnO1xuXG5pbXBvcnQge0RpYWdub3N0aWNzfSBmcm9tICcuLi8uLi9kaWFnbm9zdGljcyc7XG5cbmltcG9ydCB7YnVpbGRDb2RlRnJhbWVFcnJvciwgYnVpbGRMb2NhbGl6ZVJlcGxhY2VtZW50LCBpc0JhYmVsUGFyc2VFcnJvciwgaXNMb2NhbGl6ZSwgdHJhbnNsYXRlLCBUcmFuc2xhdGVQbHVnaW5PcHRpb25zLCB1bndyYXBNZXNzYWdlUGFydHNGcm9tVGVtcGxhdGVMaXRlcmFsfSBmcm9tICcuLi8uLi9zb3VyY2VfZmlsZV91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlRXMyMDE1VHJhbnNsYXRlUGx1Z2luKFxuICAgIGRpYWdub3N0aWNzOiBEaWFnbm9zdGljcywgdHJhbnNsYXRpb25zOiBSZWNvcmQ8c3RyaW5nLCDJtVBhcnNlZFRyYW5zbGF0aW9uPixcbiAgICB7bWlzc2luZ1RyYW5zbGF0aW9uID0gJ2Vycm9yJywgbG9jYWxpemVOYW1lID0gJyRsb2NhbGl6ZSd9OiBUcmFuc2xhdGVQbHVnaW5PcHRpb25zID0ge30pOlxuICAgIFBsdWdpbk9iaiB7XG4gIHJldHVybiB7XG4gICAgdmlzaXRvcjoge1xuICAgICAgVGFnZ2VkVGVtcGxhdGVFeHByZXNzaW9uKHBhdGg6IE5vZGVQYXRoPFRhZ2dlZFRlbXBsYXRlRXhwcmVzc2lvbj4pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCB0YWcgPSBwYXRoLmdldCgndGFnJyk7XG4gICAgICAgICAgaWYgKGlzTG9jYWxpemUodGFnLCBsb2NhbGl6ZU5hbWUpKSB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlUGFydHMgPSB1bndyYXBNZXNzYWdlUGFydHNGcm9tVGVtcGxhdGVMaXRlcmFsKHBhdGgubm9kZS5xdWFzaS5xdWFzaXMpO1xuICAgICAgICAgICAgY29uc3QgdHJhbnNsYXRlZCA9IHRyYW5zbGF0ZShcbiAgICAgICAgICAgICAgICBkaWFnbm9zdGljcywgdHJhbnNsYXRpb25zLCBtZXNzYWdlUGFydHMsIHBhdGgubm9kZS5xdWFzaS5leHByZXNzaW9ucyxcbiAgICAgICAgICAgICAgICBtaXNzaW5nVHJhbnNsYXRpb24pO1xuICAgICAgICAgICAgcGF0aC5yZXBsYWNlV2l0aChidWlsZExvY2FsaXplUmVwbGFjZW1lbnQodHJhbnNsYXRlZFswXSwgdHJhbnNsYXRlZFsxXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGlmIChpc0JhYmVsUGFyc2VFcnJvcihlKSkge1xuICAgICAgICAgICAgLy8gSWYgd2UgZ2V0IGEgQmFiZWxQYXJzZUVycm9yIGhlcmUgdGhlbiBzb21ldGhpbmcgd2VudCB3cm9uZyB3aXRoIEJhYmVsIGl0c2VsZlxuICAgICAgICAgICAgLy8gc2luY2UgdGhlcmUgbXVzdCBiZSBzb21ldGhpbmcgd3Jvbmcgd2l0aCB0aGUgc3RydWN0dXJlIG9mIHRoZSBBU1QgZ2VuZXJhdGVkXG4gICAgICAgICAgICAvLyBieSBCYWJlbCBwYXJzaW5nIGEgVGFnZ2VkVGVtcGxhdGVFeHByZXNzaW9uLlxuICAgICAgICAgICAgdGhyb3cgYnVpbGRDb2RlRnJhbWVFcnJvcihwYXRoLCBlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG4iXX0=