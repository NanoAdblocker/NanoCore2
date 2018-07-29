/******************************************************************************

    Nano Core 2 - An adblocker
    Copyright (C) 2018  Nano Core 2 contributors

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*******************************************************************************

    Locale file.

******************************************************************************/

"use strict";

/*****************************************************************************/

(() => {
    "use strict";
    return {
        // Dialog buttons
        "genericYes": {
            "message": "是",
            "description": "Button 'Yes' for dialogs"
        },
        "genericNo": {
            "message": "否",
            "description": "Button 'No' for dialogs"
        },
        "genericOK": {
            "message": "确定",
            "description": "Button 'OK' for dialogs"
        },
        // Generic messages
        "genericUnsavedChange": {
            "message": "您确定要离开这个标签么？未保存的更改将会丢失。",
            "description": "Unsaved change warning"
        },
        "genericFilterReadError": {
            "message": "未能读取数据，请刷新。",
            "description": "Error when filter data could not be loaded"
        },
        "genericDataSaveError": {
            "message": "未能保存数据，请重试。",
            "description": "Error when changes could not be saved"
        },
        "genericNothingToExport": {
            "message": "没有任何数据需要导出。",
            "description": "Error when nothing to export"
        },

        // New cloud UI
        "nanoCloudNoData": {
            "message": "没有云端数据。",
            "description": "English: No cloud data"
        },
        "nanoCloudLastSync": {
            "message": "上次同步： {{device}} 在 {{time}}",
            "description": "English: Last sync: {{device}} at {{time}}"
        },
        "nanoCloudSyncFailed": {
            "message": "出现了一些问题：\n{{error}}",
            "description": "English: Something went wrong:\n{{error}}"
        },

        // Dashboard dialog messages
        "dashboardMutexError": {
            "message": "未能获取互斥锁，您是否已经打开一个控制面板了？",
            "description": "Error when mutex locked by another dashboard"
        },

        // Settings groups
        "settingGeneralGroup": {
            "message": "基本",
            "description": "Group 'General' of settings tab"
        },
        "settingUserInterfaceGroup": {
            "message": "界面",
            "description": "Group 'User interface' of settings tab"
        },
        "settingOtherGroup": {
            "message": "其他",
            "description": "Group 'Other' of settings tab"
        },
        // Settings prompts
        "settingsDashboardAllowSelectionPrompt": {
            "message": "允许在控制面板中选择文字",
            "description": "English: Allow text selection in dashboard"
        },
        "settingsEditorWordWrapPrompt": {
            "message": "在规则编辑器中启用自动换行（ soft warp ）",
            "description": "English: Soft wrap long lines in filter editor"
        },
        "settingsViewerWordWrapPrompt": {
            "message": "在规则查看器中启用自动换行（ soft warp ）",
            "description": "English: Soft wrap long lines in filter viewer"
        },
        // Extra strings for new dashboard
        "settingDiskUsage": {
            "message": "占用空间： ",
            "description": "English: Disk usage: "
        },
        "settingMebibyte": {
            "message": " MiB",
            "description": "English: MiB"
        },
        "settingsLastBackedupFilePrompt": {
            "message": "上次备份文件名： ",
            "description": "English: Last backed up file: "
        },
        "settingsLastRestoredFilePrompt": {
            "message": "上次恢复文件名： ",
            "description": "English: Last restored file: "
        },

        // The tab name of advanced settings
        "advancedPageName": {
            "message": "高级",
            "description": "Advanced settings tab name"
        },

        // Extra help messages for user filters
        "1pResourcesReference": {
            "message": "Nano 拥有两套资源，",
            "description": "English: Nano comes with two sets of resources,"
        },
        "1pResourcesOriginal": {
            "message": "uBlock Origin 的资源",
            "description": "English: uBlock Origin Resources"
        },
        "1pResourcesAnd": {
            "message": "和",
            "description": "English: and"
        },
        "1pResourcesNano": {
            "message": "Nano 的额外资源",
            "description": "English: Nano Extra Resources"
        },
        "1pResourcesPeriod": {
            "message": "。",
            "description": "English: ."
        },
        "1pFilterEditorHelp": {
            "message": "Nano 规则编辑器是由 Ace 驱动，大部分快捷键都一样。",
            "description": "Explain the similarity between Nano Filter Editor and Ace in terms of shortcut keys"
        },

        // Whitelist linter limit warnings
        "whitelistLinterAborted": {
            "message": "Nano 没有验证剩下的白名单，因为已经有过多的错误。",
            "description": "Warning when too many errors"
        },
        "whitelistLinterTooManyWarnings": {
            "message": "Nano 没有检查剩下的白名单，因为已经有过多的警告。",
            "description": "Warning when too many warnings"
        },
        // Whitelist linter errors
        "whitelistLinterInvalidHostname": {
            "message": "这个主机名称无效。",
            "description": "Error when hostname not valid"
        },
        "whitelistLinterInvalidRegExp": {
            "message": "这个正则表达式有语法错误。",
            "description": "Error when regular expression has syntax errors"
        },
        "whitelistLinterInvalidURL": {
            "message": "这个路径无效。",
            "description": "Error when a URL not valid"
        },
        // Whitelist linter warnings
        "whitelistLinterSuspeciousRegExp": {
            "message": "这行被解析成了正则表达式，您确定这是正确的么？",
            "description": "Warning when parsed as regular expression but is unlikely the intention of user"
        },

        // Filter linter limit warnings
        /*"filterLinterTooManyErrors": {
            "message": "Nano did not scan the rest of the lines for errors because there are too many errors.",
            "description": "Error when too many errors"
        },
        "filterLinterTooManyWarnings": {
            "message": "Nano did not scan the rest of the lines for warnings because there are too many warnings.",
            "description": "Warning when too many warnings"
        },
        // Filter linter special deprecation warnings
        "filterLinterDeprecatedCommentBracket": {
            "message": "Using '[' to denote comment is deprecated, use '!' instead.",
            "description": "Deprecation when '[' used for comments"
        },
        "filterLinterDeprecatedInlineComment": {
            "message": "Inline comments are deprecated.",
            "description": "Deprecation when inline comments"
        },
        // Filter linter special errors
        "filterLinterInternalErrorCosmeticFilterPassedThrough": {
            "message": "This rule is rejected for now. More information: https://github.com/NanoAdblocker/NanoCore/issues/77",
            "description": "https://github.com/NanoAdblocker/NanoCore/issues/77"
        },
        // Extended filtering warnings
        "filterLinterDeprecatedScriptContains": {
            "message": "'##script:contains(...)' is deprecated, use '##^script:has-text(...)' instead.",
            "description": "Deprecation when 'script:contains' is used"
        },
        "filterLinterWarningScriptSnippetDoubleException": {
            "message": "Nano discarded a negated domain because it cannot be used in a script snippet exception rule.",
            "description": "Warning when negated domain used with script snippet exception"
        },
        "filterLinterWarningConvertedToException": {
            "message": "Nano converted this rule to an exception rule because it only contain negated domains.",
            "description": "Warning when a rule is convered to exception because all negated domains"
        },
        "filterLinterWarningNegatedHTMLFiltering": {
            "message": "Negated domain is not yet supported for HTML filtering.",
            "description": "Warning when negated domain used with HTML filtering"
        },
        // Extended filtering errors
        "filterLinterRejectedAdguardJSInjection": {
            "message": "Raw JavaScript injection is not accepted due to security concerns.",
            "description": "Error when raw JavaScript injection"
        },
        "filterLinterRejectedBadSelector": {
            "message": "The selector in this rule has syntax errors.",
            "description": "Error when selector has syntax errors"
        },
        "filterLinterRejectedTooExpensive": {
            "message": "This rule cannot be generic.",
            "description": "Error when expensive cosmetic is generic"
        },
        "filterLinterRejectedStyleInjection": {
            "message": "This CSS injection rule has syntax errors.",
            "description": "Error when CSS injection has syntax errors"
        },
        "filterLinterRejectedAssetsAccessViolation": {
            "message": "Unprivileged filters may not reference privileged resources.",
            "description": "Error when unprivileged filter references a privileged resources"
        },
        // Network filtering warnings
        "filterLinterWarningDiscardedNonNegatableType": {
            "message": "Nano discarded the type option '{{type}}' because it cannot be negated.",
            "description": "English: Nano discarded the type option '{{type}}' because it cannot be negated."
        },
        "filterLinterWarningExpandedMp4Option": {
            "message": "Nano replaced the option 'mp4' with 'media,redirect=noopmp4-1s'.",
            "description": "Warning when 'mp4' is replaced"
        },
        "filterLinterWarningDeprecatedMp4Option": {
            "message": "The use of the option 'mp4' is deprecated, write out the full options instead.",
            "description": "Deprecation when 'mp4'"
        },
        "filterLinterWarningUnsupportedTypeIgnored": {
            "message": "Nano discarded type options that are not yet supported.",
            "description": "Warning when unsupported type options discarded but not entire rule"
        },
        "filterLinterWarningRedirectNoType": {
            "message": "Nano discarded the option 'redirect=...' because it requires a type option.",
            "description": "Warning when 'redirect=' has no type"
        },
        "filterLinterWarningRedirectTooManyTypes": {
            "message": "Nano discarded the option 'redirect=...' because it has too many type options.",
            "description": "Warning when 'redirect=' has too many types"
        },
        "filterLinterWarningRedirectNoResourceToken": {
            "message": "Nano discarded the option 'redirect=...' because it has no arguments.",
            "description": "Warning when 'redirect=' has no arguments"
        },
        "filterLinterWarningRedirectNoSupportedType": {
            "message": "Nano discarded the option 'redirect=...' because it has no supported type option.",
            "description": "Warning when 'redirect=' has no supported type"
        },
        "filterLinterWarningRedirectNegatedDomain": {
            "message": "Nano discarded a negated domain because it cannot be used with the option 'redirect=...'.",
            "description": "Warning when negated domain used with 'redirect='"
        },
        "filterLinterWarningRedirectNoValidDestinationDomain": {
            "message": "Nano discarded the option 'redirect=...' because it has no valid destination domain.",
            "description": "Warning when 'redirect=' has no destination"
        },
        "filterLinterWarningRedirectPureHostname": {
            "message": "Nano discarded the option 'redirect=...' because it cannot be used with a pure host name rule.",
            "description": "Warning when 'redirect=' pure host name"
        },
        "filterLinterWarningRedirectDoesNotMatchRegExp": {
            // TODO 2017-12-28: Think of a better warning message
            "message": "Nano discarded the option 'redirect=...' because this network rule does not match this regular expression: {{regexp}}",
            "description": "Warning when 'redirect=' failed initial test, use '{{regexp}}' to denote the tester if needed"
        },
        // Network filtering errors
        "filterLinterDiscardedLocalhostHostEntry": {
            "message": "This host file entry is discarded because it is localhost declaration.",
            "description": "Error when localhost declaration"
        },
        "filterLinterRejectedAdguardElementRemove": {
            "message": "Element remove rules with Adguard syntax are not yet supported.",
            "description": "Error when Adguard style element remove rule"
        },
        "filterLinterRejectedNegatedGenerichide": {
            "message": "The options 'generichide', 'ghide', and 'elemhide' cannot be negated.",
            "description": "Error when 'generichide' is negated"
        },
        "filterLinterRejectedRedirectInException": {
            "message": "The option 'redirect=...' cannot be used in exception rules.",
            "description": "Error when 'redirect=' used in exception"
        },
        "filterLinterRejectedBadDomainOptionArguments": {
            "message": "The option 'domain=...' has invalid arguments.",
            "description": "Error when 'domain=' has invalid arguments"
        },
        "filterLinterRejectedBadCspOptionArguments": {
            "message": "The option 'csp=...' has invalid arguments.",
            "description": "Error when 'csp=' has invalid arguments"
        },
        "filterLinterRejectedUnknownOption": {
            "message": "The option '{{option}}' is not recognized.",
            "description": "English: The option '{{option}}' is not recognized."
        },
        "filterLinterRejectedOnlyUnsupportedType": {
            // TODO 2018-01-15: This was phrased like this due to weird
            // behavior of the type option 'webrtc', but turns out to be a bug:
            // https://github.com/gorhill/uBlock/issues/3433
            // Need to investigate whether this should be changed.
            "message": "A type option is not yet supported.",
            "description": "Error when unsupported type option used and entire rule discarded"
        },
        "filterLinterRejectedNetworkBadRegExp": {
            "message": "This network rule has regular expression syntax errors.",
            "description": "Error when network has regular expression syntax errors"
        },
        "filterLinterRejectedInterventionForSMed79": {
            // https://github.com/chrisaljoudi/uBlock/issues/1096
            "message": "The domain anchor may not be immediately followed by '^'.",
            "description": "Error when the bad rule from SMed79 is discarded"
        },*/

        // Tab name of hosts matrix
        "matrixPageName": {
            "message": "主机矩阵",
            "description": "Hosts matrix tab name"
        },

        // Title of filter viewer
        "filterViewerPageName": {
            "message": "Nano — 规则查看器",
            "description": "Title of the filter viewer"
        },

        // Popup tooltips
        "popupCacheControlPrompt": {
            "message": "缓存控制",
            "description": "The cache control strip name"
        },
        "popupTipOpenFirewallPane": {
            "message": "显示或隐藏防火墙边窗",
            "description": "Tooltip for toggle firewall pane button"
        },
        "popupTipRefreshButton": {
            "message": "单击：刷新当前页面\n\nCtrl + 单击：无视缓存并刷新当前页面",
            "description": "English: Click: refresh this page.\n\nCtrl+click: refresh this page bypassing cache."
        },
        // TODO 2018-02-02: Beta stage, do not translate!
        /*"popupTipForceEnableScroll": {
            "message": "进入临时强制滚动模式（会破坏布局）",
            "description": "Tooltip for force scroll button"
        },
        "popupTipBugReporter": {
            "message": "打开问题汇报器",
            "description": "Tooltip for bug reporter button"
        },*/

        // Based on message of about page
        "aboutBasedOn": {
            "message": "基于 {{@data}}",
            "description": "English: Based on {{@data}}"
        }
    };
})();

/*****************************************************************************/
