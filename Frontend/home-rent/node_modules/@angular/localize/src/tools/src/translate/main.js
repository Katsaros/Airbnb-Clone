#!/usr/bin/env node
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/main", ["require", "exports", "@angular/compiler-cli/src/ngtsc/file_system", "glob", "yargs", "@angular/localize/src/tools/src/diagnostics", "@angular/localize/src/tools/src/translate/asset_files/asset_translation_handler", "@angular/localize/src/tools/src/translate/output_path", "@angular/localize/src/tools/src/translate/source_files/source_file_translation_handler", "@angular/localize/src/tools/src/translate/translation_files/translation_loader", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/simple_json_translation_parser", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/xliff1_translation_parser", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/xliff2_translation_parser", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/xtb_translation_parser", "@angular/localize/src/tools/src/translate/translator"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.translateFiles = void 0;
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
    var glob = require("glob");
    var yargs = require("yargs");
    var diagnostics_1 = require("@angular/localize/src/tools/src/diagnostics");
    var asset_translation_handler_1 = require("@angular/localize/src/tools/src/translate/asset_files/asset_translation_handler");
    var output_path_1 = require("@angular/localize/src/tools/src/translate/output_path");
    var source_file_translation_handler_1 = require("@angular/localize/src/tools/src/translate/source_files/source_file_translation_handler");
    var translation_loader_1 = require("@angular/localize/src/tools/src/translate/translation_files/translation_loader");
    var simple_json_translation_parser_1 = require("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/simple_json_translation_parser");
    var xliff1_translation_parser_1 = require("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/xliff1_translation_parser");
    var xliff2_translation_parser_1 = require("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/xliff2_translation_parser");
    var xtb_translation_parser_1 = require("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/xtb_translation_parser");
    var translator_1 = require("@angular/localize/src/tools/src/translate/translator");
    if (require.main === module) {
        var args = process.argv.slice(2);
        var options = yargs
            .option('r', {
            alias: 'root',
            required: true,
            describe: 'The root path of the files to translate, either absolute or relative to the current working directory. E.g. `dist/en`.',
        })
            .option('s', {
            alias: 'source',
            required: true,
            describe: 'A glob pattern indicating what files to translate, relative to the `root` path. E.g. `bundles/**/*`.',
        })
            .option('l', {
            alias: 'source-locale',
            describe: 'The source locale of the application. If this is provided then a copy of the application will be created with no translation but just the `$localize` calls stripped out.',
        })
            .option('t', {
            alias: 'translations',
            required: true,
            array: true,
            describe: 'A list of paths to the translation files to load, either absolute or relative to the current working directory.\n' +
                'E.g. `-t src/locale/messages.en.xlf src/locale/messages.fr.xlf src/locale/messages.de.xlf`.\n' +
                'If you want to merge multiple translation files for each locale, then provide the list of files in an array.\n' +
                'Note that the arrays must be in double quotes if you include any whitespace within the array.\n' +
                'E.g. `-t "[src/locale/messages.en.xlf, src/locale/messages-2.en.xlf]" [src/locale/messages.fr.xlf,src/locale/messages-2.fr.xlf]`',
        })
            .option('target-locales', {
            array: true,
            describe: 'A list of target locales for the translation files, which will override any target locale parsed from the translation file.\n' +
                'E.g. "-t en fr de".',
        })
            .option('o', {
            alias: 'outputPath',
            required: true,
            describe: 'A output path pattern to where the translated files will be written.\n' +
                'The path must be either absolute or relative to the current working directory.\n' +
                'The marker `{{LOCALE}}` will be replaced with the target locale. E.g. `dist/{{LOCALE}}`.'
        })
            .option('m', {
            alias: 'missingTranslation',
            describe: 'How to handle missing translations.',
            choices: ['error', 'warning', 'ignore'],
            default: 'warning',
        })
            .option('d', {
            alias: 'duplicateTranslation',
            describe: 'How to handle duplicate translations.',
            choices: ['error', 'warning', 'ignore'],
            default: 'warning',
        })
            .strict()
            .help()
            .parse(args);
        var fs = new file_system_1.NodeJSFileSystem();
        file_system_1.setFileSystem(fs);
        var sourceRootPath = options['r'];
        var sourceFilePaths = glob.sync(options['s'], { cwd: sourceRootPath, nodir: true });
        var translationFilePaths = convertArraysFromArgs(options['t']);
        var outputPathFn = output_path_1.getOutputPathFn(fs.resolve(options['o']));
        var diagnostics = new diagnostics_1.Diagnostics();
        var missingTranslation = options['m'];
        var duplicateTranslation = options['d'];
        var sourceLocale = options['l'];
        var translationFileLocales = options['target-locales'] || [];
        translateFiles({
            sourceRootPath: sourceRootPath,
            sourceFilePaths: sourceFilePaths,
            translationFilePaths: translationFilePaths,
            translationFileLocales: translationFileLocales,
            outputPathFn: outputPathFn,
            diagnostics: diagnostics,
            missingTranslation: missingTranslation,
            duplicateTranslation: duplicateTranslation,
            sourceLocale: sourceLocale
        });
        diagnostics.messages.forEach(function (m) { return console.warn(m.type + ": " + m.message); });
        process.exit(diagnostics.hasErrors ? 1 : 0);
    }
    function translateFiles(_a) {
        var sourceRootPath = _a.sourceRootPath, sourceFilePaths = _a.sourceFilePaths, translationFilePaths = _a.translationFilePaths, translationFileLocales = _a.translationFileLocales, outputPathFn = _a.outputPathFn, diagnostics = _a.diagnostics, missingTranslation = _a.missingTranslation, duplicateTranslation = _a.duplicateTranslation, sourceLocale = _a.sourceLocale;
        var fs = file_system_1.getFileSystem();
        var translationLoader = new translation_loader_1.TranslationLoader(fs, [
            new xliff2_translation_parser_1.Xliff2TranslationParser(),
            new xliff1_translation_parser_1.Xliff1TranslationParser(),
            new xtb_translation_parser_1.XtbTranslationParser(),
            new simple_json_translation_parser_1.SimpleJsonTranslationParser(),
        ], duplicateTranslation, diagnostics);
        var resourceProcessor = new translator_1.Translator(fs, [
            new source_file_translation_handler_1.SourceFileTranslationHandler(fs, { missingTranslation: missingTranslation }),
            new asset_translation_handler_1.AssetTranslationHandler(fs),
        ], diagnostics);
        // Convert all the `translationFilePaths` elements to arrays.
        var translationFilePathsArrays = translationFilePaths.map(function (filePaths) {
            return Array.isArray(filePaths) ? filePaths.map(function (p) { return fs.resolve(p); }) : [fs.resolve(filePaths)];
        });
        var translations = translationLoader.loadBundles(translationFilePathsArrays, translationFileLocales);
        sourceRootPath = fs.resolve(sourceRootPath);
        resourceProcessor.translateFiles(sourceFilePaths.map(file_system_1.relativeFrom), fs.resolve(sourceRootPath), outputPathFn, translations, sourceLocale);
    }
    exports.translateFiles = translateFiles;
    /**
     * Parse each of the given string `args` and convert it to an array if it is of the form
     * `[abc, def, ghi]`, i.e. it is enclosed in square brackets with comma delimited items.
     * @param args The string to potentially convert to arrays.
     */
    function convertArraysFromArgs(args) {
        return args.map(function (arg) { return (arg.startsWith('[') && arg.endsWith(']')) ?
            arg.slice(1, -1).split(',').map(function (arg) { return arg.trim(); }) :
            arg; });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2xvY2FsaXplL3NyYy90b29scy9zcmMvdHJhbnNsYXRlL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUNBOzs7Ozs7T0FNRztJQUNILDJFQUF5SDtJQUN6SCwyQkFBNkI7SUFDN0IsNkJBQStCO0lBRS9CLDJFQUF1RTtJQUN2RSw2SEFBZ0Y7SUFDaEYscUZBQTREO0lBQzVELDBJQUE0RjtJQUM1RixxSEFBeUU7SUFDekUsaUtBQW1IO0lBQ25ILHVKQUEwRztJQUMxRyx1SkFBMEc7SUFDMUcsaUpBQW9HO0lBQ3BHLG1GQUF3QztJQUV4QyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1FBQzNCLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLElBQU0sT0FBTyxHQUNULEtBQUs7YUFDQSxNQUFNLENBQUMsR0FBRyxFQUFFO1lBQ1gsS0FBSyxFQUFFLE1BQU07WUFDYixRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFDSix3SEFBd0g7U0FDN0gsQ0FBQzthQUNELE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDWCxLQUFLLEVBQUUsUUFBUTtZQUNmLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUNKLHNHQUFzRztTQUMzRyxDQUFDO2FBRUQsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUNYLEtBQUssRUFBRSxlQUFlO1lBQ3RCLFFBQVEsRUFDSiwyS0FBMks7U0FDaEwsQ0FBQzthQUVELE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDWCxLQUFLLEVBQUUsY0FBYztZQUNyQixRQUFRLEVBQUUsSUFBSTtZQUNkLEtBQUssRUFBRSxJQUFJO1lBQ1gsUUFBUSxFQUNKLG1IQUFtSDtnQkFDbkgsK0ZBQStGO2dCQUMvRixnSEFBZ0g7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QUFDLEdBQUcsQ0FBQywwQkFBWSxDQUFDLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUN6RixZQUFZLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBekNELHdDQXlDQztJQUVEOzs7O09BSUc7SUFDSCxTQUFTLHFCQUFxQixDQUFDLElBQWM7UUFDM0MsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUNYLFVBQUEsR0FBRyxJQUFJLE9BQUEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BELEdBQUcsRUFGQSxDQUVBLENBQUMsQ0FBQztJQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7Z2V0RmlsZVN5c3RlbSwgTm9kZUpTRmlsZVN5c3RlbSwgc2V0RmlsZVN5c3RlbSwgcmVsYXRpdmVGcm9tfSBmcm9tICdAYW5ndWxhci9jb21waWxlci1jbGkvc3JjL25ndHNjL2ZpbGVfc3lzdGVtJztcbmltcG9ydCAqIGFzIGdsb2IgZnJvbSAnZ2xvYic7XG5pbXBvcnQgKiBhcyB5YXJncyBmcm9tICd5YXJncyc7XG5cbmltcG9ydCB7RGlhZ25vc3RpY0hhbmRsaW5nU3RyYXRlZ3ksIERpYWdub3N0aWNzfSBmcm9tICcuLi9kaWFnbm9zdGljcyc7XG5pbXBvcnQge0Fzc2V0VHJhbnNsYXRpb25IYW5kbGVyfSBmcm9tICcuL2Fzc2V0X2ZpbGVzL2Fzc2V0X3RyYW5zbGF0aW9uX2hhbmRsZXInO1xuaW1wb3J0IHtnZXRPdXRwdXRQYXRoRm4sIE91dHB1dFBhdGhGbn0gZnJvbSAnLi9vdXRwdXRfcGF0aCc7XG5pbXBvcnQge1NvdXJjZUZpbGVUcmFuc2xhdGlvbkhhbmRsZXJ9IGZyb20gJy4vc291cmNlX2ZpbGVzL3NvdXJjZV9maWxlX3RyYW5zbGF0aW9uX2hhbmRsZXInO1xuaW1wb3J0IHtUcmFuc2xhdGlvbkxvYWRlcn0gZnJvbSAnLi90cmFuc2xhdGlvbl9maWxlcy90cmFuc2xhdGlvbl9sb2FkZXInO1xuaW1wb3J0IHtTaW1wbGVKc29uVHJhbnNsYXRpb25QYXJzZXJ9IGZyb20gJy4vdHJhbnNsYXRpb25fZmlsZXMvdHJhbnNsYXRpb25fcGFyc2Vycy9zaW1wbGVfanNvbl90cmFuc2xhdGlvbl9wYXJzZXInO1xuaW1wb3J0IHtYbGlmZjFUcmFuc2xhdGlvblBhcnNlcn0gZnJvbSAnLi90cmFuc2xhdGlvbl9maWxlcy90cmFuc2xhdGlvbl9wYXJzZXJzL3hsaWZmMV90cmFuc2xhdGlvbl9wYXJzZXInO1xuaW1wb3J0IHtYbGlmZjJUcmFuc2xhdGlvblBhcnNlcn0gZnJvbSAnLi90cmFuc2xhdGlvbl9maWxlcy90cmFuc2xhdGlvbl9wYXJzZXJzL3hsaWZmMl90cmFuc2xhdGlvbl9wYXJzZXInO1xuaW1wb3J0IHtYdGJUcmFuc2xhdGlvblBhcnNlcn0gZnJvbSAnLi90cmFuc2xhdGlvbl9maWxlcy90cmFuc2xhdGlvbl9wYXJzZXJzL3h0Yl90cmFuc2xhdGlvbl9wYXJzZXInO1xuaW1wb3J0IHtUcmFuc2xhdG9yfSBmcm9tICcuL3RyYW5zbGF0b3InO1xuXG5pZiAocmVxdWlyZS5tYWluID09PSBtb2R1bGUpIHtcbiAgY29uc3QgYXJncyA9IHByb2Nlc3MuYXJndi5zbGljZSgyKTtcbiAgY29uc3Qgb3B0aW9ucyA9XG4gICAgICB5YXJnc1xuICAgICAgICAgIC5vcHRpb24oJ3InLCB7XG4gICAgICAgICAgICBhbGlhczogJ3Jvb3QnLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICBkZXNjcmliZTpcbiAgICAgICAgICAgICAgICAnVGhlIHJvb3QgcGF0aCBvZiB0aGUgZmlsZXMgdG8gdHJhbnNsYXRlLCBlaXRoZXIgYWJzb2x1dGUgb3IgcmVsYXRpdmUgdG8gdGhlIGN1cnJlbnQgd29ya2luZyBkaXJlY3RvcnkuIEUuZy4gYGRpc3QvZW5gLicsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAub3B0aW9uKCdzJywge1xuICAgICAgICAgICAgYWxpYXM6ICdzb3VyY2UnLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICBkZXNjcmliZTpcbiAgICAgICAgICAgICAgICAnQSBnbG9iIHBhdHRlcm4gaW5kaWNhdGluZyB3aGF0IGZpbGVzIHRvIHRyYW5zbGF0ZSwgcmVsYXRpdmUgdG8gdGhlIGByb290YCBwYXRoLiBFLmcuIGBidW5kbGVzLyoqLypgLicsXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIC5vcHRpb24oJ2wnLCB7XG4gICAgICAgICAgICBhbGlhczogJ3NvdXJjZS1sb2NhbGUnLFxuICAgICAgICAgICAgZGVzY3JpYmU6XG4gICAgICAgICAgICAgICAgJ1RoZSBzb3VyY2UgbG9jYWxlIG9mIHRoZSBhcHBsaWNhdGlvbi4gSWYgdGhpcyBpcyBwcm92aWRlZCB0aGVuIGEgY29weSBvZiB0aGUgYXBwbGljYXRpb24gd2lsbCBiZSBjcmVhdGVkIHdpdGggbm8gdHJhbnNsYXRpb24gYnV0IGp1c3QgdGhlIGAkbG9jYWxpemVgIGNhbGxzIHN0cmlwcGVkIG91dC4nLFxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICAub3B0aW9uKCd0Jywge1xuICAgICAgICAgICAgYWxpYXM6ICd0cmFuc2xhdGlvbnMnLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICBhcnJheTogdHJ1ZSxcbiAgICAgICAgICAgIGRlc2NyaWJlOlxuICAgICAgICAgICAgICAgICdBIGxpc3Qgb2YgcGF0aHMgdG8gdGhlIHRyYW5zbGF0aW9uIGZpbGVzIHRvIGxvYWQsIGVpdGhlciBhYnNvbHV0ZSBvciByZWxhdGl2ZSB0byB0aGUgY3VycmVudCB3b3JraW5nIGRpcmVjdG9yeS5cXG4nICtcbiAgICAgICAgICAgICAgICAnRS5nLiBgLXQgc3JjL2xvY2FsZS9tZXNzYWdlcy5lbi54bGYgc3JjL2xvY2FsZS9tZXNzYWdlcy5mci54bGYgc3JjL2xvY2FsZS9tZXNzYWdlcy5kZS54bGZgLlxcbicgK1xuICAgICAgICAgICAgICAgICdJZiB5b3Ugd2FudCB0byBtZXJnZSBtdWx0aXBsZSB0cmFuc2xhdGlvbiBmaWxlcyBmb3IgZWFjaCBsb2NhbGUsIHRoZW4gcHJvdmlkZSB0aGUgbGlzdCBvZiBmaWxlcyBpbiBhbiBhcnJheS5cXG4nICtcbiAgICAgICAgICAgICAgICAnTm90ZSB0aGF0IHRoZSBhcnJheXMgbXVzdCBiZSBpbiBkb3VibGUgcXVvdGVzIGlmIHlvdSBpbmNsdWRlIGFueSB3aGl0ZXNwYWNlIHdpdGhpbiB0aGUgYXJyYXkuXFxuJyArXG4gICAgICAgICAgICAgICAgJ0UuZy4gYC10IFwiW3NyYy9sb2NhbGUvbWVzc2FnZXMuZW4ueGxmLCBzcmMvbG9jYWxlL21lc3NhZ2VzLTIuZW4ueGxmXVwiIFtzcmMvbG9jYWxlL21lc3NhZ2VzLmZyLnhsZixzcmMvbG9jYWxlL21lc3NhZ2VzLTIuZnIueGxmXWAnLFxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICAub3B0aW9uKCd0YXJnZXQtbG9jYWxlcycsIHtcbiAgICAgICAgICAgIGFycmF5OiB0cnVlLFxuICAgICAgICAgICAgZGVzY3JpYmU6XG4gICAgICAgICAgICAgICAgJ0EgbGlzdCBvZiB0YXJnZXQgbG9jYWxlcyBmb3IgdGhlIHRyYW5zbGF0aW9uIGZpbGVzLCB3aGljaCB3aWxsIG92ZXJyaWRlIGFueSB0YXJnZXQgbG9jYWxlIHBhcnNlZCBmcm9tIHRoZSB0cmFuc2xhdGlvbiBmaWxlLlxcbicgK1xuICAgICAgICAgICAgICAgICdFLmcuIFwiLXQgZW4gZnIgZGVcIi4nLFxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICAub3B0aW9uKCdvJywge1xuICAgICAgICAgICAgYWxpYXM6ICdvdXRwdXRQYXRoJyxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgZGVzY3JpYmU6ICdBIG91dHB1dCBwYXRoIHBhdHRlcm4gdG8gd2hlcmUgdGhlIHRyYW5zbGF0ZWQgZmlsZXMgd2lsbCBiZSB3cml0dGVuLlxcbicgK1xuICAgICAgICAgICAgICAgICdUaGUgcGF0aCBtdXN0IGJlIGVpdGhlciBhYnNvbHV0ZSBvciByZWxhdGl2ZSB0byB0aGUgY3VycmVudCB3b3JraW5nIGRpcmVjdG9yeS5cXG4nICtcbiAgICAgICAgICAgICAgICAnVGhlIG1hcmtlciBge3tMT0NBTEV9fWAgd2lsbCBiZSByZXBsYWNlZCB3aXRoIHRoZSB0YXJnZXQgbG9jYWxlLiBFLmcuIGBkaXN0L3t7TE9DQUxFfX1gLidcbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgLm9wdGlvbignbScsIHtcbiAgICAgICAgICAgIGFsaWFzOiAnbWlzc2luZ1RyYW5zbGF0aW9uJyxcbiAgICAgICAgICAgIGRlc2NyaWJlOiAnSG93IHRvIGhhbmRsZSBtaXNzaW5nIHRyYW5zbGF0aW9ucy4nLFxuICAgICAgICAgICAgY2hvaWNlczogWydlcnJvcicsICd3YXJuaW5nJywgJ2lnbm9yZSddLFxuICAgICAgICAgICAgZGVmYXVsdDogJ3dhcm5pbmcnLFxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICAub3B0aW9uKCdkJywge1xuICAgICAgICAgICAgYWxpYXM6ICdkdXBsaWNhdGVUcmFuc2xhdGlvbicsXG4gICAgICAgICAgICBkZXNjcmliZTogJ0hvdyB0byBoYW5kbGUgZHVwbGljYXRlIHRyYW5zbGF0aW9ucy4nLFxuICAgICAgICAgICAgY2hvaWNlczogWydlcnJvcicsICd3YXJuaW5nJywgJ2lnbm9yZSddLFxuICAgICAgICAgICAgZGVmYXVsdDogJ3dhcm5pbmcnLFxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICAuc3RyaWN0KClcbiAgICAgICAgICAuaGVscCgpXG4gICAgICAgICAgLnBhcnNlKGFyZ3MpO1xuXG4gIGNvbnN0IGZzID0gbmV3IE5vZGVKU0ZpbGVTeXN0ZW0oKTtcbiAgc2V0RmlsZVN5c3RlbShmcyk7XG5cbiAgY29uc3Qgc291cmNlUm9vdFBhdGggPSBvcHRpb25zWydyJ107XG4gIGNvbnN0IHNvdXJjZUZpbGVQYXRocyA9IGdsb2Iuc3luYyhvcHRpb25zWydzJ10sIHtjd2Q6IHNvdXJjZVJvb3RQYXRoLCBub2RpcjogdHJ1ZX0pO1xuICBjb25zdCB0cmFuc2xhdGlvbkZpbGVQYXRoczogKHN0cmluZ3xzdHJpbmdbXSlbXSA9IGNvbnZlcnRBcnJheXNGcm9tQXJncyhvcHRpb25zWyd0J10pO1xuICBjb25zdCBvdXRwdXRQYXRoRm4gPSBnZXRPdXRwdXRQYXRoRm4oZnMucmVzb2x2ZShvcHRpb25zWydvJ10pKTtcbiAgY29uc3QgZGlhZ25vc3RpY3MgPSBuZXcgRGlhZ25vc3RpY3MoKTtcbiAgY29uc3QgbWlzc2luZ1RyYW5zbGF0aW9uOiBEaWFnbm9zdGljSGFuZGxpbmdTdHJhdGVneSA9IG9wdGlvbnNbJ20nXTtcbiAgY29uc3QgZHVwbGljYXRlVHJhbnNsYXRpb246IERpYWdub3N0aWNIYW5kbGluZ1N0cmF0ZWd5ID0gb3B0aW9uc1snZCddO1xuICBjb25zdCBzb3VyY2VMb2NhbGU6IHN0cmluZ3x1bmRlZmluZWQgPSBvcHRpb25zWydsJ107XG4gIGNvbnN0IHRyYW5zbGF0aW9uRmlsZUxvY2FsZXM6IHN0cmluZ1tdID0gb3B0aW9uc1sndGFyZ2V0LWxvY2FsZXMnXSB8fCBbXTtcblxuICB0cmFuc2xhdGVGaWxlcyh7XG4gICAgc291cmNlUm9vdFBhdGgsXG4gICAgc291cmNlRmlsZVBhdGhzLFxuICAgIHRyYW5zbGF0aW9uRmlsZVBhdGhzLFxuICAgIHRyYW5zbGF0aW9uRmlsZUxvY2FsZXMsXG4gICAgb3V0cHV0UGF0aEZuLFxuICAgIGRpYWdub3N0aWNzLFxuICAgIG1pc3NpbmdUcmFuc2xhdGlvbixcbiAgICBkdXBsaWNhdGVUcmFuc2xhdGlvbixcbiAgICBzb3VyY2VMb2NhbGVcbiAgfSk7XG5cbiAgZGlhZ25vc3RpY3MubWVzc2FnZXMuZm9yRWFjaChtID0+IGNvbnNvbGUud2FybihgJHttLnR5cGV9OiAke20ubWVzc2FnZX1gKSk7XG4gIHByb2Nlc3MuZXhpdChkaWFnbm9zdGljcy5oYXNFcnJvcnMgPyAxIDogMCk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhbnNsYXRlRmlsZXNPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSByb290IHBhdGggb2YgdGhlIGZpbGVzIHRvIHRyYW5zbGF0ZSwgZWl0aGVyIGFic29sdXRlIG9yIHJlbGF0aXZlIHRvIHRoZSBjdXJyZW50IHdvcmtpbmdcbiAgICogZGlyZWN0b3J5LiBFLmcuIGBkaXN0L2VuYFxuICAgKi9cbiAgc291cmNlUm9vdFBhdGg6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBmaWxlcyB0byB0cmFuc2xhdGUsIHJlbGF0aXZlIHRvIHRoZSBgcm9vdGAgcGF0aC5cbiAgICovXG4gIHNvdXJjZUZpbGVQYXRoczogc3RyaW5nW107XG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBwYXRocyB0byB0aGUgdHJhbnNsYXRpb24gZmlsZXMgdG8gbG9hZCwgZWl0aGVyIGFic29sdXRlIG9yIHJlbGF0aXZlIHRvIHRoZSBjdXJyZW50XG4gICAqIHdvcmtpbmcgZGlyZWN0b3J5LlxuICAgKlxuICAgKiBGb3IgZWFjaCBsb2NhbGUgdG8gYmUgdHJhbnNsYXRlZCwgdGhlcmUgc2hvdWxkIGJlIGFuIGVsZW1lbnQgaW4gYHRyYW5zbGF0aW9uRmlsZVBhdGhzYC5cbiAgICogRWFjaCBlbGVtZW50IGlzIGVpdGhlciBhbiBhYnNvbHV0ZSBwYXRoIHRvIHRoZSB0cmFuc2xhdGlvbiBmaWxlLCBvciBhbiBhcnJheSBvZiBhYnNvbHV0ZSBwYXRoc1xuICAgKiB0byB0cmFuc2xhdGlvbiBmaWxlcywgZm9yIHRoYXQgbG9jYWxlLlxuICAgKlxuICAgKiBJZiB0aGUgZWxlbWVudCBjb250YWlucyBtb3JlIHRoYW4gb25lIHRyYW5zbGF0aW9uIGZpbGUsIHRoZW4gdGhlIHRyYW5zbGF0aW9ucyBhcmUgbWVyZ2VkLlxuICAgKlxuICAgKiBJZiBhbGxvd2VkIGJ5IHRoZSBgZHVwbGljYXRlVHJhbnNsYXRpb25gIHByb3BlcnR5LCB3aGVuIG1vcmUgdGhhbiBvbmUgdHJhbnNsYXRpb24gaGFzIHRoZSBzYW1lXG4gICAqIG1lc3NhZ2UgaWQsIHRoZSBtZXNzYWdlIGZyb20gdGhlIGVhcmxpZXIgdHJhbnNsYXRpb24gZmlsZSBpbiB0aGUgYXJyYXkgaXMgdXNlZC5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIGlmIHRoZSBmaWxlcyBhcmUgYFthcHAueGxmLCBsaWItMS54bGYsIGxpYi0yLnhsaWZdYCB0aGVuIGEgbWVzc2FnZSB0aGF0IGFwcGVhcnMgaW5cbiAgICogYGFwcC54bGZgIHdpbGwgb3ZlcnJpZGUgdGhlIHNhbWUgbWVzc2FnZSBpbiBgbGliLTEueGxmYCBvciBgbGliLTIueGxmYC5cbiAgICovXG4gIHRyYW5zbGF0aW9uRmlsZVBhdGhzOiAoc3RyaW5nfHN0cmluZ1tdKVtdO1xuICAvKipcbiAgICogQSBjb2xsZWN0aW9uIG9mIHRoZSB0YXJnZXQgbG9jYWxlcyBmb3IgdGhlIHRyYW5zbGF0aW9uIGZpbGVzLlxuICAgKlxuICAgKiBJZiB0aGVyZSBpcyBhIGxvY2FsZSBwcm92aWRlZCBpbiBgdHJhbnNsYXRpb25GaWxlTG9jYWxlc2AgdGhlbiB0aGlzIGlzIHVzZWQgcmF0aGVyIHRoYW4gYVxuICAgKiBsb2NhbGUgZXh0cmFjdGVkIGZyb20gdGhlIGZpbGUgaXRzZWxmLlxuICAgKiBJZiB0aGVyZSBpcyBuZWl0aGVyIGEgcHJvdmlkZWQgbG9jYWxlIG5vciBhIGxvY2FsZSBwYXJzZWQgZnJvbSB0aGUgZmlsZSwgdGhlbiBhbiBlcnJvciBpc1xuICAgKiB0aHJvd24uXG4gICAqIElmIHRoZXJlIGFyZSBib3RoIGEgcHJvdmlkZWQgbG9jYWxlIGFuZCBhIGxvY2FsZSBwYXJzZWQgZnJvbSB0aGUgZmlsZSwgYW5kIHRoZXkgYXJlIG5vdCB0aGVcbiAgICogc2FtZSwgdGhlbiBhIHdhcm5pbmcgaXMgcmVwb3J0ZWQuXG4gICAqL1xuICB0cmFuc2xhdGlvbkZpbGVMb2NhbGVzOiAoc3RyaW5nfHVuZGVmaW5lZClbXTtcbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBjb21wdXRlcyB0aGUgb3V0cHV0IHBhdGggb2Ygd2hlcmUgdGhlIHRyYW5zbGF0ZWQgZmlsZXMgd2lsbCBiZVxuICAgKiB3cml0dGVuLiBUaGUgbWFya2VyIGB7e0xPQ0FMRX19YCB3aWxsIGJlIHJlcGxhY2VkIHdpdGggdGhlIHRhcmdldCBsb2NhbGUuIEUuZy5cbiAgICogYGRpc3Qve3tMT0NBTEV9fWAuXG4gICAqL1xuICBvdXRwdXRQYXRoRm46IE91dHB1dFBhdGhGbjtcbiAgLyoqXG4gICAqIEFuIG9iamVjdCB0aGF0IHdpbGwgcmVjZWl2ZSBhbnkgZGlhZ25vc3RpY3MgbWVzc2FnZXMgZHVlIHRvIHRoZSBwcm9jZXNzaW5nLlxuICAgKi9cbiAgZGlhZ25vc3RpY3M6IERpYWdub3N0aWNzO1xuICAvKipcbiAgICogSG93IHRvIGhhbmRsZSBtaXNzaW5nIHRyYW5zbGF0aW9ucy5cbiAgICovXG4gIG1pc3NpbmdUcmFuc2xhdGlvbjogRGlhZ25vc3RpY0hhbmRsaW5nU3RyYXRlZ3k7XG4gIC8qKlxuICAgKiBIb3cgdG8gaGFuZGxlIGR1cGxpY2F0ZSB0cmFuc2xhdGlvbnMuXG4gICAqL1xuICBkdXBsaWNhdGVUcmFuc2xhdGlvbjogRGlhZ25vc3RpY0hhbmRsaW5nU3RyYXRlZ3k7XG4gIC8qKlxuICAgKiBUaGUgbG9jYWxlIG9mIHRoZSBzb3VyY2UgZmlsZXMuXG4gICAqIElmIHRoaXMgaXMgcHJvdmlkZWQgdGhlbiBhIGNvcHkgb2YgdGhlIGFwcGxpY2F0aW9uIHdpbGwgYmUgY3JlYXRlZCB3aXRoIG5vIHRyYW5zbGF0aW9uIGJ1dCBqdXN0XG4gICAqIHRoZSBgJGxvY2FsaXplYCBjYWxscyBzdHJpcHBlZCBvdXQuXG4gICAqL1xuICBzb3VyY2VMb2NhbGU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGVGaWxlcyh7XG4gIHNvdXJjZVJvb3RQYXRoLFxuICBzb3VyY2VGaWxlUGF0aHMsXG4gIHRyYW5zbGF0aW9uRmlsZVBhdGhzLFxuICB0cmFuc2xhdGlvbkZpbGVMb2NhbGVzLFxuICBvdXRwdXRQYXRoRm4sXG4gIGRpYWdub3N0aWNzLFxuICBtaXNzaW5nVHJhbnNsYXRpb24sXG4gIGR1cGxpY2F0ZVRyYW5zbGF0aW9uLFxuICBzb3VyY2VMb2NhbGVcbn06IFRyYW5zbGF0ZUZpbGVzT3B0aW9ucykge1xuICBjb25zdCBmcyA9IGdldEZpbGVTeXN0ZW0oKTtcbiAgY29uc3QgdHJhbnNsYXRpb25Mb2FkZXIgPSBuZXcgVHJhbnNsYXRpb25Mb2FkZXIoXG4gICAgICBmcyxcbiAgICAgIFtcbiAgICAgICAgbmV3IFhsaWZmMlRyYW5zbGF0aW9uUGFyc2VyKCksXG4gICAgICAgIG5ldyBYbGlmZjFUcmFuc2xhdGlvblBhcnNlcigpLFxuICAgICAgICBuZXcgWHRiVHJhbnNsYXRpb25QYXJzZXIoKSxcbiAgICAgICAgbmV3IFNpbXBsZUpzb25UcmFuc2xhdGlvblBhcnNlcigpLFxuICAgICAgXSxcbiAgICAgIGR1cGxpY2F0ZVRyYW5zbGF0aW9uLCBkaWFnbm9zdGljcyk7XG5cbiAgY29uc3QgcmVzb3VyY2VQcm9jZXNzb3IgPSBuZXcgVHJhbnNsYXRvcihcbiAgICAgIGZzLFxuICAgICAgW1xuICAgICAgICBuZXcgU291cmNlRmlsZVRyYW5zbGF0aW9uSGFuZGxlcihmcywge21pc3NpbmdUcmFuc2xhdGlvbn0pLFxuICAgICAgICBuZXcgQXNzZXRUcmFuc2xhdGlvbkhhbmRsZXIoZnMpLFxuICAgICAgXSxcbiAgICAgIGRpYWdub3N0aWNzKTtcblxuICAvLyBDb252ZXJ0IGFsbCB0aGUgYHRyYW5zbGF0aW9uRmlsZVBhdGhzYCBlbGVtZW50cyB0byBhcnJheXMuXG4gIGNvbnN0IHRyYW5zbGF0aW9uRmlsZVBhdGhzQXJyYXlzID0gdHJhbnNsYXRpb25GaWxlUGF0aHMubWFwKFxuICAgICAgZmlsZVBhdGhzID0+XG4gICAgICAgICAgQXJyYXkuaXNBcnJheShmaWxlUGF0aHMpID8gZmlsZVBhdGhzLm1hcChwID0+IGZzLnJlc29sdmUocCkpIDogW2ZzLnJlc29sdmUoZmlsZVBhdGhzKV0pO1xuXG4gIGNvbnN0IHRyYW5zbGF0aW9ucyA9XG4gICAgICB0cmFuc2xhdGlvbkxvYWRlci5sb2FkQnVuZGxlcyh0cmFuc2xhdGlvbkZpbGVQYXRoc0FycmF5cywgdHJhbnNsYXRpb25GaWxlTG9jYWxlcyk7XG4gIHNvdXJjZVJvb3RQYXRoID0gZnMucmVzb2x2ZShzb3VyY2VSb290UGF0aCk7XG4gIHJlc291cmNlUHJvY2Vzc29yLnRyYW5zbGF0ZUZpbGVzKFxuICAgICAgc291cmNlRmlsZVBhdGhzLm1hcChyZWxhdGl2ZUZyb20pLCBmcy5yZXNvbHZlKHNvdXJjZVJvb3RQYXRoKSwgb3V0cHV0UGF0aEZuLCB0cmFuc2xhdGlvbnMsXG4gICAgICBzb3VyY2VMb2NhbGUpO1xufVxuXG4vKipcbiAqIFBhcnNlIGVhY2ggb2YgdGhlIGdpdmVuIHN0cmluZyBgYXJnc2AgYW5kIGNvbnZlcnQgaXQgdG8gYW4gYXJyYXkgaWYgaXQgaXMgb2YgdGhlIGZvcm1cbiAqIGBbYWJjLCBkZWYsIGdoaV1gLCBpLmUuIGl0IGlzIGVuY2xvc2VkIGluIHNxdWFyZSBicmFja2V0cyB3aXRoIGNvbW1hIGRlbGltaXRlZCBpdGVtcy5cbiAqIEBwYXJhbSBhcmdzIFRoZSBzdHJpbmcgdG8gcG90ZW50aWFsbHkgY29udmVydCB0byBhcnJheXMuXG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRBcnJheXNGcm9tQXJncyhhcmdzOiBzdHJpbmdbXSk6IChzdHJpbmd8c3RyaW5nW10pW10ge1xuICByZXR1cm4gYXJncy5tYXAoXG4gICAgICBhcmcgPT4gKGFyZy5zdGFydHNXaXRoKCdbJykgJiYgYXJnLmVuZHNXaXRoKCddJykpID9cbiAgICAgICAgICBhcmcuc2xpY2UoMSwgLTEpLnNwbGl0KCcsJykubWFwKGFyZyA9PiBhcmcudHJpbSgpKSA6XG4gICAgICAgICAgYXJnKTtcbn1cbiJdfQ==