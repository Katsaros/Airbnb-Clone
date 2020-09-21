(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/source_files/es5_translate_plugin", ["require", "exports", "@angular/localize/src/tools/src/source_file_utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeEs5TranslatePlugin = void 0;
    var source_file_utils_1 = require("@angular/localize/src/tools/src/source_file_utils");
    function makeEs5TranslatePlugin(diagnostics, translations, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.missingTranslation, missingTranslation = _c === void 0 ? 'error' : _c, _d = _b.localizeName, localizeName = _d === void 0 ? '$localize' : _d;
        return {
            visitor: {
                CallExpression: function (callPath) {
                    try {
                        var calleePath = callPath.get('callee');
                        if (source_file_utils_1.isLocalize(calleePath, localizeName)) {
                            var messageParts = source_file_utils_1.unwrapMessagePartsFromLocalizeCall(callPath);
                            var expressions = source_file_utils_1.unwrapSubstitutionsFromLocalizeCall(callPath.node);
                            var translated = source_file_utils_1.translate(diagnostics, translations, messageParts, expressions, missingTranslation);
                            callPath.replaceWith(source_file_utils_1.buildLocalizeReplacement(translated[0], translated[1]));
                        }
                    }
                    catch (e) {
                        if (source_file_utils_1.isBabelParseError(e)) {
                            diagnostics.error(source_file_utils_1.buildCodeFrameError(callPath, e));
                        }
                    }
                }
            }
        };
    }
    exports.makeEs5TranslatePlugin = makeEs5TranslatePlugin;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXM1X3RyYW5zbGF0ZV9wbHVnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sb2NhbGl6ZS9zcmMvdG9vbHMvc3JjL3RyYW5zbGF0ZS9zb3VyY2VfZmlsZXMvZXM1X3RyYW5zbGF0ZV9wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBYUEsdUZBQWlPO0lBRWpPLFNBQWdCLHNCQUFzQixDQUNsQyxXQUF3QixFQUFFLFlBQWdELEVBQzFFLEVBQXVGO1lBQXZGLHFCQUFxRixFQUFFLEtBQUEsRUFBdEYsMEJBQTRCLEVBQTVCLGtCQUFrQixtQkFBRyxPQUFPLEtBQUEsRUFBRSxvQkFBMEIsRUFBMUIsWUFBWSxtQkFBRyxXQUFXLEtBQUE7UUFFM0QsT0FBTztZQUNMLE9BQU8sRUFBRTtnQkFDUCxjQUFjLEVBQWQsVUFBZSxRQUFrQztvQkFDL0MsSUFBSTt3QkFDRixJQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUMxQyxJQUFJLDhCQUFVLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxFQUFFOzRCQUN4QyxJQUFNLFlBQVksR0FBRyxzREFBa0MsQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFDbEUsSUFBTSxXQUFXLEdBQUcsdURBQW1DLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUN2RSxJQUFNLFVBQVUsR0FDWiw2QkFBUyxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDOzRCQUN4RixRQUFRLENBQUMsV0FBVyxDQUFDLDRDQUF3QixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUM5RTtxQkFDRjtvQkFBQyxPQUFPLENBQUMsRUFBRTt3QkFDVixJQUFJLHFDQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFOzRCQUN4QixXQUFXLENBQUMsS0FBSyxDQUFDLHVDQUFtQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUNyRDtxQkFDRjtnQkFDSCxDQUFDO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQztJQXhCRCx3REF3QkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7ybVQYXJzZWRUcmFuc2xhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvbG9jYWxpemUnO1xuaW1wb3J0IHtOb2RlUGF0aCwgUGx1Z2luT2JqfSBmcm9tICdAYmFiZWwvY29yZSc7XG5pbXBvcnQge0NhbGxFeHByZXNzaW9ufSBmcm9tICdAYmFiZWwvdHlwZXMnO1xuXG5pbXBvcnQge0RpYWdub3N0aWNzfSBmcm9tICcuLi8uLi9kaWFnbm9zdGljcyc7XG5cbmltcG9ydCB7YnVpbGRDb2RlRnJhbWVFcnJvciwgYnVpbGRMb2NhbGl6ZVJlcGxhY2VtZW50LCBpc0JhYmVsUGFyc2VFcnJvciwgaXNMb2NhbGl6ZSwgdHJhbnNsYXRlLCBUcmFuc2xhdGVQbHVnaW5PcHRpb25zLCB1bndyYXBNZXNzYWdlUGFydHNGcm9tTG9jYWxpemVDYWxsLCB1bndyYXBTdWJzdGl0dXRpb25zRnJvbUxvY2FsaXplQ2FsbH0gZnJvbSAnLi4vLi4vc291cmNlX2ZpbGVfdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUVzNVRyYW5zbGF0ZVBsdWdpbihcbiAgICBkaWFnbm9zdGljczogRGlhZ25vc3RpY3MsIHRyYW5zbGF0aW9uczogUmVjb3JkPHN0cmluZywgybVQYXJzZWRUcmFuc2xhdGlvbj4sXG4gICAge21pc3NpbmdUcmFuc2xhdGlvbiA9ICdlcnJvcicsIGxvY2FsaXplTmFtZSA9ICckbG9jYWxpemUnfTogVHJhbnNsYXRlUGx1Z2luT3B0aW9ucyA9IHt9KTpcbiAgICBQbHVnaW5PYmoge1xuICByZXR1cm4ge1xuICAgIHZpc2l0b3I6IHtcbiAgICAgIENhbGxFeHByZXNzaW9uKGNhbGxQYXRoOiBOb2RlUGF0aDxDYWxsRXhwcmVzc2lvbj4pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBjYWxsZWVQYXRoID0gY2FsbFBhdGguZ2V0KCdjYWxsZWUnKTtcbiAgICAgICAgICBpZiAoaXNMb2NhbGl6ZShjYWxsZWVQYXRoLCBsb2NhbGl6ZU5hbWUpKSB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlUGFydHMgPSB1bndyYXBNZXNzYWdlUGFydHNGcm9tTG9jYWxpemVDYWxsKGNhbGxQYXRoKTtcbiAgICAgICAgICAgIGNvbnN0IGV4cHJlc3Npb25zID0gdW53cmFwU3Vic3RpdHV0aW9uc0Zyb21Mb2NhbGl6ZUNhbGwoY2FsbFBhdGgubm9kZSk7XG4gICAgICAgICAgICBjb25zdCB0cmFuc2xhdGVkID1cbiAgICAgICAgICAgICAgICB0cmFuc2xhdGUoZGlhZ25vc3RpY3MsIHRyYW5zbGF0aW9ucywgbWVzc2FnZVBhcnRzLCBleHByZXNzaW9ucywgbWlzc2luZ1RyYW5zbGF0aW9uKTtcbiAgICAgICAgICAgIGNhbGxQYXRoLnJlcGxhY2VXaXRoKGJ1aWxkTG9jYWxpemVSZXBsYWNlbWVudCh0cmFuc2xhdGVkWzBdLCB0cmFuc2xhdGVkWzFdKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaWYgKGlzQmFiZWxQYXJzZUVycm9yKGUpKSB7XG4gICAgICAgICAgICBkaWFnbm9zdGljcy5lcnJvcihidWlsZENvZGVGcmFtZUVycm9yKGNhbGxQYXRoLCBlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuIl19