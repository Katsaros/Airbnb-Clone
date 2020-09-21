/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 *
 * @fileoverview Schematics for ng-new project that builds with Bazel.
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/schematics/ng-add", ["require", "exports", "tslib", "@angular-devkit/core", "@angular-devkit/schematics", "@schematics/angular/utility/workspace", "@schematics/angular/utility/workspace-models"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.localizePolyfill = void 0;
    var tslib_1 = require("tslib");
    var core_1 = require("@angular-devkit/core");
    var schematics_1 = require("@angular-devkit/schematics");
    var workspace_1 = require("@schematics/angular/utility/workspace");
    var workspace_models_1 = require("@schematics/angular/utility/workspace-models");
    exports.localizePolyfill = "import '@angular/localize/init';";
    function getRelevantTargetDefinitions(project, builderName) {
        var definitions = [];
        project.targets.forEach(function (target) {
            if (target.builder === builderName) {
                definitions.push(target);
            }
        });
        return definitions;
    }
    function getOptionValuesForTargetDefinition(definition, optionName) {
        var optionValues = [];
        if (definition.options && optionName in definition.options) {
            var optionValue = definition.options[optionName];
            if (typeof optionValue === 'string') {
                optionValues.push(optionValue);
            }
        }
        if (!definition.configurations) {
            return optionValues;
        }
        Object.values(definition.configurations)
            .forEach(function (configuration) {
            if (configuration && optionName in configuration) {
                var optionValue = configuration[optionName];
                if (typeof optionValue === 'string') {
                    optionValues.push(optionValue);
                }
            }
        });
        return optionValues;
    }
    function getFileListForRelevantTargetDefinitions(project, builderName, optionName) {
        var fileList = [];
        var definitions = getRelevantTargetDefinitions(project, builderName);
        definitions.forEach(function (definition) {
            var optionValues = getOptionValuesForTargetDefinition(definition, optionName);
            optionValues.forEach(function (filePath) {
                if (fileList.indexOf(filePath) === -1) {
                    fileList.push(filePath);
                }
            });
        });
        return fileList;
    }
    function prependToTargetFiles(project, builderName, optionName, str) {
        return function (host) {
            var fileList = getFileListForRelevantTargetDefinitions(project, builderName, optionName);
            fileList.forEach(function (path) {
                var data = host.read(path);
                if (!data) {
                    // If the file doesn't exist, just ignore it.
                    return;
                }
                var content = core_1.virtualFs.fileBufferToString(data);
                if (content.includes(exports.localizePolyfill) ||
                    content.includes(exports.localizePolyfill.replace(/'/g, '"'))) {
                    // If the file already contains the polyfill (or variations), ignore it too.
                    return;
                }
                // Add string at the start of the file.
                var recorder = host.beginUpdate(path);
                recorder.insertLeft(0, str);
                host.commitUpdate(recorder);
            });
        };
    }
    function default_1(options) {
        var _this = this;
        return function (host) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var workspace, project, localizeStr;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options.name) {
                            throw new schematics_1.SchematicsException('Option "name" is required.');
                        }
                        return [4 /*yield*/, workspace_1.getWorkspace(host)];
                    case 1:
                        workspace = _a.sent();
                        project = workspace.projects.get(options.name);
                        if (!project) {
                            throw new schematics_1.SchematicsException("Invalid project name (" + options.name + ")");
                        }
                        localizeStr = "/***************************************************************************************************\n * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.\n */\n" + exports.localizePolyfill + "\n";
                        return [2 /*return*/, schematics_1.chain([
                                prependToTargetFiles(project, workspace_models_1.Builders.Browser, 'polyfills', localizeStr),
                                prependToTargetFiles(project, workspace_models_1.Builders.Server, 'main', localizeStr),
                            ])];
                }
            });
        }); };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sb2NhbGl6ZS9zY2hlbWF0aWNzL25nLWFkZC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7R0FRRzs7Ozs7Ozs7Ozs7Ozs7SUFFSCw2Q0FBMkQ7SUFDM0QseURBQWtGO0lBQ2xGLG1FQUFtRTtJQUNuRSxpRkFBc0U7SUFLekQsUUFBQSxnQkFBZ0IsR0FBRyxrQ0FBa0MsQ0FBQztJQUVuRSxTQUFTLDRCQUE0QixDQUNqQyxPQUFxQyxFQUFFLFdBQXFCO1FBQzlELElBQU0sV0FBVyxHQUFrQyxFQUFFLENBQUM7UUFDdEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFtQztZQUMxRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLEtBQUssV0FBVyxFQUFFO2dCQUNsQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzFCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBRUQsU0FBUyxrQ0FBa0MsQ0FDdkMsVUFBdUMsRUFBRSxVQUFrQjtRQUM3RCxJQUFNLFlBQVksR0FBYSxFQUFFLENBQUM7UUFDbEMsSUFBSSxVQUFVLENBQUMsT0FBTyxJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsT0FBTyxFQUFFO1lBQzFELElBQUksV0FBVyxHQUFZLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUQsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7Z0JBQ25DLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDaEM7U0FDRjtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFO1lBQzlCLE9BQU8sWUFBWSxDQUFDO1NBQ3JCO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMs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QUFJLE1BQUcsQ0FBQyxDQUFDO3lCQUN6RTt3QkFFSyxXQUFXLEdBQ2IsNE1BR04sd0JBQWdCLE9BQ2pCLENBQUM7d0JBRUUsc0JBQU8sa0JBQUssQ0FBQztnQ0FDWCxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsMkJBQVEsQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQztnQ0FDekUsb0JBQW9CLENBQUMsT0FBTyxFQUFFLDJCQUFRLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUM7NkJBQ3BFLENBQUMsRUFBQzs7O2FBQ0osQ0FBQztJQUNKLENBQUM7SUF4QkQsNEJBd0JDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICpcbiAqIEBmaWxlb3ZlcnZpZXcgU2NoZW1hdGljcyBmb3IgbmctbmV3IHByb2plY3QgdGhhdCBidWlsZHMgd2l0aCBCYXplbC5cbiAqL1xuXG5pbXBvcnQge3ZpcnR1YWxGcywgd29ya3NwYWNlc30gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHtjaGFpbiwgUnVsZSwgU2NoZW1hdGljc0V4Y2VwdGlvbiwgVHJlZX0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHtnZXRXb3Jrc3BhY2V9IGZyb20gJ0BzY2hlbWF0aWNzL2FuZ3VsYXIvdXRpbGl0eS93b3Jrc3BhY2UnO1xuaW1wb3J0IHtCdWlsZGVyc30gZnJvbSAnQHNjaGVtYXRpY3MvYW5ndWxhci91dGlsaXR5L3dvcmtzcGFjZS1tb2RlbHMnO1xuXG5pbXBvcnQge1NjaGVtYX0gZnJvbSAnLi9zY2hlbWEnO1xuXG5cbmV4cG9ydCBjb25zdCBsb2NhbGl6ZVBvbHlmaWxsID0gYGltcG9ydCAnQGFuZ3VsYXIvbG9jYWxpemUvaW5pdCc7YDtcblxuZnVuY3Rpb24gZ2V0UmVsZXZhbnRUYXJnZXREZWZpbml0aW9ucyhcbiAgICBwcm9qZWN0OiB3b3Jrc3BhY2VzLlByb2plY3REZWZpbml0aW9uLCBidWlsZGVyTmFtZTogQnVpbGRlcnMpOiB3b3Jrc3BhY2VzLlRhcmdldERlZmluaXRpb25bXSB7XG4gIGNvbnN0IGRlZmluaXRpb25zOiB3b3Jrc3BhY2VzLlRhcmdldERlZmluaXRpb25bXSA9IFtdO1xuICBwcm9qZWN0LnRhcmdldHMuZm9yRWFjaCgodGFyZ2V0OiB3b3Jrc3BhY2VzLlRhcmdldERlZmluaXRpb24pOiB2b2lkID0+IHtcbiAgICBpZiAodGFyZ2V0LmJ1aWxkZXIgPT09IGJ1aWxkZXJOYW1lKSB7XG4gICAgICBkZWZpbml0aW9ucy5wdXNoKHRhcmdldCk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGRlZmluaXRpb25zO1xufVxuXG5mdW5jdGlvbiBnZXRPcHRpb25WYWx1ZXNGb3JUYXJnZXREZWZpbml0aW9uKFxuICAgIGRlZmluaXRpb246IHdvcmtzcGFjZXMuVGFyZ2V0RGVmaW5pdGlvbiwgb3B0aW9uTmFtZTogc3RyaW5nKTogc3RyaW5nW10ge1xuICBjb25zdCBvcHRpb25WYWx1ZXM6IHN0cmluZ1tdID0gW107XG4gIGlmIChkZWZpbml0aW9uLm9wdGlvbnMgJiYgb3B0aW9uTmFtZSBpbiBkZWZpbml0aW9uLm9wdGlvbnMpIHtcbiAgICBsZXQgb3B0aW9uVmFsdWU6IHVua25vd24gPSBkZWZpbml0aW9uLm9wdGlvbnNbb3B0aW9uTmFtZV07XG4gICAgaWYgKHR5cGVvZiBvcHRpb25WYWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG9wdGlvblZhbHVlcy5wdXNoKG9wdGlvblZhbHVlKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFkZWZpbml0aW9uLmNvbmZpZ3VyYXRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvblZhbHVlcztcbiAgfVxuICBPYmplY3QudmFsdWVzKGRlZmluaXRpb24uY29uZmlndXJhdGlvbnMpXG4gICAgICAuZm9yRWFjaCgoY29uZmlndXJhdGlvbjogUmVjb3JkPHN0cmluZywgdW5rbm93bj58dW5kZWZpbmVkKTogdm9pZCA9PiB7XG4gICAgICAgIGlmIChjb25maWd1cmF0aW9uICYmIG9wdGlvbk5hbWUgaW4gY29uZmlndXJhdGlvbikge1xuICAgICAgICAgIGNvbnN0IG9wdGlvblZhbHVlOiB1bmtub3duID0gY29uZmlndXJhdGlvbltvcHRpb25OYW1lXTtcbiAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvblZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgb3B0aW9uVmFsdWVzLnB1c2gob3B0aW9uVmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gIHJldHVybiBvcHRpb25WYWx1ZXM7XG59XG5cbmZ1bmN0aW9uIGdldEZpbGVMaXN0Rm9yUmVsZXZhbnRUYXJnZXREZWZpbml0aW9ucyhcbiAgICBwcm9qZWN0OiB3b3Jrc3BhY2VzLlByb2plY3REZWZpbml0aW9uLCBidWlsZGVyTmFtZTogQnVpbGRlcnMsIG9wdGlvbk5hbWU6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgY29uc3QgZmlsZUxpc3Q6IHN0cmluZ1tdID0gW107XG4gIGNvbnN0IGRlZmluaXRpb25zID0gZ2V0UmVsZXZhbnRUYXJnZXREZWZpbml0aW9ucyhwcm9qZWN0LCBidWlsZGVyTmFtZSk7XG4gIGRlZmluaXRpb25zLmZvckVhY2goKGRlZmluaXRpb246IHdvcmtzcGFjZXMuVGFyZ2V0RGVmaW5pdGlvbik6IHZvaWQgPT4ge1xuICAgIGNvbnN0IG9wdGlvblZhbHVlcyA9IGdldE9wdGlvblZhbHVlc0ZvclRhcmdldERlZmluaXRpb24oZGVmaW5pdGlvbiwgb3B0aW9uTmFtZSk7XG4gICAgb3B0aW9uVmFsdWVzLmZvckVhY2goKGZpbGVQYXRoOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICAgIGlmIChmaWxlTGlzdC5pbmRleE9mKGZpbGVQYXRoKSA9PT0gLTEpIHtcbiAgICAgICAgZmlsZUxpc3QucHVzaChmaWxlUGF0aCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gZmlsZUxpc3Q7XG59XG5cbmZ1bmN0aW9uIHByZXBlbmRUb1RhcmdldEZpbGVzKFxuICAgIHByb2plY3Q6IHdvcmtzcGFjZXMuUHJvamVjdERlZmluaXRpb24sIGJ1aWxkZXJOYW1lOiBCdWlsZGVycywgb3B0aW9uTmFtZTogc3RyaW5nLCBzdHI6IHN0cmluZykge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUpID0+IHtcbiAgICBjb25zdCBmaWxlTGlzdCA9IGdldEZpbGVMaXN0Rm9yUmVsZXZhbnRUYXJnZXREZWZpbml0aW9ucyhwcm9qZWN0LCBidWlsZGVyTmFtZSwgb3B0aW9uTmFtZSk7XG5cbiAgICBmaWxlTGlzdC5mb3JFYWNoKChwYXRoOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBob3N0LnJlYWQocGF0aCk7XG4gICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgLy8gSWYgdGhlIGZpbGUgZG9lc24ndCBleGlzdCwganVzdCBpZ25vcmUgaXQuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29udGVudCA9IHZpcnR1YWxGcy5maWxlQnVmZmVyVG9TdHJpbmcoZGF0YSk7XG4gICAgICBpZiAoY29udGVudC5pbmNsdWRlcyhsb2NhbGl6ZVBvbHlmaWxsKSB8fFxuICAgICAgICAgIGNvbnRlbnQuaW5jbHVkZXMobG9jYWxpemVQb2x5ZmlsbC5yZXBsYWNlKC8nL2csICdcIicpKSkge1xuICAgICAgICAvLyBJZiB0aGUgZmlsZSBhbHJlYWR5IGNvbnRhaW5zIHRoZSBwb2x5ZmlsbCAob3IgdmFyaWF0aW9ucyksIGlnbm9yZSBpdCB0b28uXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIHN0cmluZyBhdCB0aGUgc3RhcnQgb2YgdGhlIGZpbGUuXG4gICAgICBjb25zdCByZWNvcmRlciA9IGhvc3QuYmVnaW5VcGRhdGUocGF0aCk7XG4gICAgICByZWNvcmRlci5pbnNlcnRMZWZ0KDAsIHN0cik7XG4gICAgICBob3N0LmNvbW1pdFVwZGF0ZShyZWNvcmRlcik7XG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnM6IFNjaGVtYSk6IFJ1bGUge1xuICByZXR1cm4gYXN5bmMgKGhvc3Q6IFRyZWUpID0+IHtcbiAgICBpZiAoIW9wdGlvbnMubmFtZSkge1xuICAgICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oJ09wdGlvbiBcIm5hbWVcIiBpcyByZXF1aXJlZC4nKTtcbiAgICB9XG5cbiAgICBjb25zdCB3b3Jrc3BhY2UgPSBhd2FpdCBnZXRXb3Jrc3BhY2UoaG9zdCk7XG4gICAgY29uc3QgcHJvamVjdDogd29ya3NwYWNlcy5Qcm9qZWN0RGVmaW5pdGlvbnx1bmRlZmluZWQgPSB3b3Jrc3BhY2UucHJvamVjdHMuZ2V0KG9wdGlvbnMubmFtZSk7XG4gICAgaWYgKCFwcm9qZWN0KSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbihgSW52YWxpZCBwcm9qZWN0IG5hbWUgKCR7b3B0aW9ucy5uYW1lfSlgKTtcbiAgICB9XG5cbiAgICBjb25zdCBsb2NhbGl6ZVN0ciA9XG4gICAgICAgIGAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBMb2FkIFxcYCRsb2NhbGl6ZVxcYCBvbnRvIHRoZSBnbG9iYWwgc2NvcGUgLSB1c2VkIGlmIGkxOG4gdGFncyBhcHBlYXIgaW4gQW5ndWxhciB0ZW1wbGF0ZXMuXG4gKi9cbiR7bG9jYWxpemVQb2x5ZmlsbH1cbmA7XG5cbiAgICByZXR1cm4gY2hhaW4oW1xuICAgICAgcHJlcGVuZFRvVGFyZ2V0RmlsZXMocHJvamVjdCwgQnVpbGRlcnMuQnJvd3NlciwgJ3BvbHlmaWxscycsIGxvY2FsaXplU3RyKSxcbiAgICAgIHByZXBlbmRUb1RhcmdldEZpbGVzKHByb2plY3QsIEJ1aWxkZXJzLlNlcnZlciwgJ21haW4nLCBsb2NhbGl6ZVN0ciksXG4gICAgXSk7XG4gIH07XG59XG4iXX0=