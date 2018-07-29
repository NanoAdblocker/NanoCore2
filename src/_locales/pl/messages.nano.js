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
            "message": "Tak",
            "description": "Button 'Yes' for dialogs"
        },
        "genericNo": {
            "message": "Nie",
            "description": "Button 'No' for dialogs"
        },
        "genericOK": {
            "message": "OK",
            "description": "Button 'OK' for dialogs"
        },
        // Generic messages
        "genericUnsavedChange": {
            "message": "Czy chcesz opuścić tę kartę? Wprowadzone zmiany nie zostaną zapisane.",
            "description": "Unsaved change warning"
        },
        "genericFilterReadError": {
            "message": "Nie można załadować danych, proszę odświeżyć.",
            "description": "Error when filter data could not be loaded"
        },
        "genericDataSaveError": {
            "message": "Nie można zapisać danych, proszę spróbować ponownie.",
            "description": "Error when changes could not be saved"
        },
        "genericNothingToExport": {
            "message": "Brak danych do eksportu.",
            "description": "Error when nothing to export"
        },

        // New cloud UI
        "nanoCloudNoData": {
            "message": "Brak danych w chmurze",
            "description": "English: No cloud data"
        },
        "nanoCloudLastSync": {
            "message": "Ostatnia synchronizacja: {{device}} o {{time}}",
            "description": "English: Last sync: {{device}} at {{time}}"
        },
        "nanoCloudSyncFailed": {
            "message": "Coś poszło nie tak:\n{{error}}",
            "description": "English: Something went wrong:\n{{error}}"
        },

        // Dashboard dialog messages
        "dashboardMutexError": {
            "message": "Nie można uzyskać blokady mutexu, czy masz otwarty inny panel sterowania?",
            "description": "Error when mutex locked by another dashboard"
        },

        // Settings groups
        "settingGeneralGroup": {
            "message": "Ogólne",
            "description": "Group 'General' of settings tab"
        },
        "settingUserInterfaceGroup": {
            "message": "Interfejs użytkownika",
            "description": "Group 'User interface' of settings tab"
        },
        "settingOtherGroup": {
            "message": "Inne",
            "description": "Group 'Other' of settings tab"
        },
        // Settings prompts
        "settingsDashboardAllowSelectionPrompt": {
            "message": "Pozwalaj na zaznaczenie tekstu w panelu sterowania",
            "description": "English: Allow text selection in dashboard"
        },
        "settingsEditorWordWrapPrompt": {
            "message": "Zawijaj długie linie w edytorze filtrów",
            "description": "English: Soft wrap long lines in filter editor"
        },
        "settingsViewerWordWrapPrompt": {
            "message": "Zawijaj długie linie w przeglądarce filtrów",
            "description": "English: Soft wrap long lines in filter viewer"
        },
        // Extra strings for new dashboard
        "settingDiskUsage": {
            "message": "Użycie dysku: ",
            "description": "English: Disk usage: "
        },
        "settingMebibyte": {
            "message": " MiB",
            "description": "English: MiB"
        },
        "settingsLastBackedupFilePrompt": {
            "message": "Ostatnio zrobiono kopię zapasową pliku: ",
            "description": "English: Last backed up file: "
        },
        "settingsLastRestoredFilePrompt": {
            "message": "Ostatni przywrócony plik: ",
            "description": "English: Last restored file: "
        },

        // The tab name of advanced settings
        "advancedPageName": {
            "message": "Zaawansowane",
            "description": "Advanced settings tab name"
        },

        // Extra help messages for user filters
        "1pResourcesReference": {
            "message": "Nano ma dwa zestawy zasobów,",
            "description": "English: Nano comes with two sets of resources,"
        },
        "1pResourcesOriginal": {
            "message": "zasoby uBlock Origin",
            "description": "English: uBlock Origin Resources"
        },
        "1pResourcesAnd": {
            "message": "i",
            "description": "English: and"
        },
        "1pResourcesNano": {
            "message": "dodatkowe zasoby Nano",
            "description": "English: Nano Extra Resources"
        },
        "1pResourcesPeriod": {
            "message": ".",
            "description": "English: ."
        },
        "1pFilterEditorHelp": {
            "message": "Edytor filtrów Nano jest obsługiwany przez ACE i większość skrótów klawiszowych działa tak samo.",
            "description": "Explain the similarity between Nano Filter Editor and Ace in terms of shortcut keys"
        },

        // Whitelist linter limit warnings
        "whitelistLinterAborted": {
            "message": "Nano nie skanował pozostałych linii w poszukiwaniu błedów, ponieważ jest zbyt wiele błędów.",
            "description": "Warning when too many errors"
        },
        "whitelistLinterTooManyWarnings": {
            "message": "Nano nie skanował pozostałych linii w poszukiwaniu ostrzeżeń, ponieważ jest zbyt wiele ostrzeżeń.",
            "description": "Warning when too many warnings"
        },
        // Whitelist linter errors
        "whitelistLinterInvalidHostname": {
            "message": "Ta nazwa hosta jest nieprawdłowa.",
            "description": "Error when hostname not valid"
        },
        "whitelistLinterInvalidRegExp": {
            "message": "To wyrażenie regularne zawiera błędy w składni.",
            "description": "Error when regular expression has syntax errors"
        },
        "whitelistLinterInvalidURL": {
            "message": "Ten adres URL jest nieprawidłowy.",
            "description": "Error when a URL not valid"
        },
        // Whitelist linter warnings
        "whitelistLinterSuspeciousRegExp": {
            "message": "Ta linia jest traktowana jako wyrażenie regularne, czy to było zamierzone?",
            "description": "Warning when parsed as regular expression but is unlikely the intention of user"
        },

        // Filter linter limit warnings
        "filterLinterTooManyErrors": {
            "message": "Nano nie skanował pozostałych linii w poszukiwaniu błedów, ponieważ jest zbyt wiele błędów.",
            "description": "Error when too many errors"
        },
        "filterLinterTooManyWarnings": {
            "message": "Nano nie skanował pozostałych linii w poszukiwaniu ostrzeżeń, ponieważ jest zbyt wiele ostrzeżeń.",
            "description": "Warning when too many warnings"
        },
        // Filter linter special deprecation warnings
        "filterLinterDeprecatedCommentBracket": {
            "message": "Używanie '[' do oznaczenia komentarza jest przestarzałe, skorzystaj z '!' zamiast tego.",
            "description": "Deprecation when '[' used for comments"
        },
        "filterLinterDeprecatedInlineComment": {
            "message": "Komentarze inline są przestarzałe.",
            "description": "Deprecation when inline comments"
        },
        // Filter linter special errors
        "filterLinterInternalErrorCosmeticFilterPassedThrough": {
            "message": "Ta reguła jest na razie odrzucona. Więcej informacji na: https://github.com/NanoAdblocker/NanoCore/issues/77",
            "description": "https://github.com/NanoAdblocker/NanoCore/issues/77"
        },
        // Extended filtering warnings
        "filterLinterDeprecatedScriptContains": {
            "message": "Reguła '##script:contains(...)' jest przestarzała, skorzystaj z '##^script:has-text(...)' zamiast niej.",
            "description": "Deprecation when 'script:contains' is used"
        },
        "filterLinterWarningScriptSnippetDoubleException": {
            "message": "Nano odrzucił zanegowaną domenę, ponieważ nie może ona zostać użyta w regule wyjątku dot. fragmentu skryptu.",
            "description": "Warning when negated domain used with script snippet exception"
        },
        "filterLinterWarningConvertedToException": {
            "message": "Nano zamienił tą regułę na regułę wyjątku, ponieważ zawiera ona tylko zanegowane domeny.",
            "description": "Warning when a rule is convered to exception because all negated domains"
        },
        "filterLinterWarningNegatedHTMLFiltering": {
            "message": "Zanegowane domeny nie są jeszcze obsługiwane w przypadku filtrowania HTML.",
            "description": "Warning when negated domain used with HTML filtering"
        },
        // Extended filtering errors
        "filterLinterRejectedAdguardJSInjection": {
            "message": "Wstrzykiwanie Raw JavaScript nie jest akceptowane ze względów bezpieczeństwa.",
            "description": "Error when raw JavaScript injection"
        },
        "filterLinterRejectedBadSelector": {
            "message": "Selektor tej reguły zawiera błędy w składni.",
            "description": "Error when selector has syntax errors"
        },
        "filterLinterRejectedTooExpensive": {
            "message": "Ta reguła nie może być ogólna.",
            "description": "Error when expensive cosmetic is generic"
        },
        "filterLinterRejectedStyleInjection": {
            "message": "Ta reguła wstrzykiwania CSS zawiera błędy w składni.",
            "description": "Error when CSS injection has syntax errors"
        },
        /*"filterLinterRejectedAssetsAccessViolation": {
            "message": "Unprivileged filters may not reference privileged resources.",
            "description": "Error when unprivileged filter references a privileged resources"
        },*/
        // Network filtering warnings
        "filterLinterWarningDiscardedNonNegatableType": {
            "message": "Nano odrzucił opcję typu '{{type}}', ponieważ nie można jej zanegować.",
            "description": "English: Nano discarded the type option '{{type}}' because it cannot be negated."
        },
        "filterLinterWarningExpandedMp4Option": {
            "message": "Nano zamienił opcję 'mp4' na 'media,redirect=noopmp4-1s'.",
            "description": "Warning when 'mp4' is replaced"
        },
        "filterLinterWarningDeprecatedMp4Option": {
            "message": "Korzystanie z opcji 'mp4' jest przestarzałe, zamiast tego wpisz pełne opcje.",
            "description": "Deprecation when 'mp4'"
        },
        "filterLinterWarningUnsupportedTypeIgnored": {
            "message": "Nano odrzucił typy opcji, które nie są jeszcze obsługiwane.",
            "description": "Warning when unsupported type options discarded but not entire rule"
        },
        "filterLinterWarningRedirectNoType": {
            "message": "Nano odrzucił opcję 'redirect=...', ponieważ wymagana ona typu opcji.",
            "description": "Warning when 'redirect=' has no type"
        },
        "filterLinterWarningRedirectTooManyTypes": {
            "message": "Nano odrzucił opcję 'redirect=...', ponieważ zawiera ona zbyt wiele typów opcji.",
            "description": "Warning when 'redirect=' has too many types"
        },
        "filterLinterWarningRedirectNoResourceToken": {
            "message": "Nano odrzucił opcję 'redirect=...', ponieważ nie zawiera ona żadnych argumentów.",
            "description": "Warning when 'redirect=' has no arguments"
        },
        "filterLinterWarningRedirectNoSupportedType": {
            "message": "Nano odrzucił opcję 'redirect=...', ponieważ nie zawiera ona żadnych obsługiwanych opcji typu.",
            "description": "Warning when 'redirect=' has no supported type"
        },
        "filterLinterWarningRedirectNegatedDomain": {
            "message": "Nano odrzucił zanegowaną domenę, ponieważ nie może ona zostać użyta z opcją 'redirect=...'.",
            "description": "Warning when negated domain used with 'redirect='"
        },
        "filterLinterWarningRedirectNoValidDestinationDomain": {
            "message": "Nano odrzucił opcję 'redirect=...', ponieważ nie zawiera ona żadnej prawidłowej domeny docelowej.",
            "description": "Warning when 'redirect=' has no destination"
        },
        "filterLinterWarningRedirectPureHostname": {
            "message": "Nano odrzucił opcję 'redirect=...', ponieważ nie może ona zostać użyta z czystą regułą nazwy hosta.",
            "description": "Warning when 'redirect=' pure host name"
        },
        "filterLinterWarningRedirectDoesNotMatchRegExp": {
            // TODO 2017-12-28: Think of a better warning message
            "message": "Nano odrzucił opcję 'redirect=...', ponieważ ta reguła sieciowa nie pasuje do tego wyrażenia regularnego: {{regexp}}",
            "description": "Warning when 'redirect=' failed initial test, use '{{regexp}}' to denote the tester if needed"
        },
        // Network filtering errors
        "filterLinterDiscardedLocalhostHostEntry": {
            "message": "Ten wpis pliku hosta jest odrzucany, ponieważ jest to deklaracja localhost.",
            "description": "Error when localhost declaration"
        },
        "filterLinterRejectedAdguardElementRemove": {
            "message": "Reguły usuwania elementów ze składnią AdGuarda nie są jeszcze obsługiwane.",
            "description": "Error when Adguard style element remove rule"
        },
        "filterLinterRejectedNegatedGenerichide": {
            "message": "Opcje 'generichide', 'ghide', i 'elemhide' nie mogą być zanegowane.",
            "description": "Error when 'generichide' is negated"
        },
        "filterLinterRejectedRedirectInException": {
            "message": "Opcja 'redirect=...' nie może zostać wykorzystana w regułach wyjątku.",
            "description": "Error when 'redirect=' used in exception"
        },
        "filterLinterRejectedBadDomainOptionArguments": {
            "message": "Opcja 'domain=...' zawiera nieprawidłowe argumenty.",
            "description": "Error when 'domain=' has invalid arguments"
        },
        "filterLinterRejectedBadCspOptionArguments": {
            "message": "Opcja 'csp=...' zawiera nieprawidłowe argumenty.",
            "description": "Error when 'csp=' has invalid arguments"
        },
        "filterLinterRejectedUnknownOption": {
            "message": "Opcja '{{option}}' nie jest rozpoznawana.",
            "description": "English: The option '{{option}}' is not recognized."
        },
        "filterLinterRejectedOnlyUnsupportedType": {
            // TODO 2018-01-15: This was phrased like this due to weird
            // behavior of the type option 'webrtc', but turns out to be a bug:
            // https://github.com/gorhill/uBlock/issues/3433
            // Need to investigate whether this should be changed.
            "message": "Opcja typu nie jest jeszcze obsługiwana.",
            "description": "Error when unsupported type option used and entire rule discarded"
        },
        "filterLinterRejectedNetworkBadRegExp": {
            "message": "Ta reguła sieciowa zawiera błędy w składni wyrażeń regularnych.",
            "description": "Error when network has regular expression syntax errors"
        },
        "filterLinterRejectedInterventionForSMed79": {
            // https://github.com/chrisaljoudi/uBlock/issues/1096
            "message": "Znak '^' nie może być bezpośrednio po kotwicy domeny.",
            "description": "Error when the bad rule from SMed79 is discarded"
        },

        // Tab name of hosts matrix
        "matrixPageName": {
            "message": "Macierz hostów",
            "description": "Hosts matrix tab name"
        },

        // Title of filter viewer
        "filterViewerPageName": {
            "message": "Nano — Przeglądarka filtrów",
            "description": "Title of the filter viewer"
        },

        // Popup tooltips
        "popupCacheControlPrompt": {
            "message": "sterowanie cache",
            "description": "The cache control strip name"
        },
        "popupTipOpenFirewallPane": {
            "message": "Przełącz panel zapory sieciowej",
            "description": "Tooltip for toggle firewall pane button"
        },
        "popupTipRefreshButton": {
            "message": "Kliknij, by odświeżyć tę stronę.\n\nCtrl+klik, by odświeżyć tę stronę, pomijając pamięć podręczną.",
            "description": "English: Click to refresh this page.\n\nCtrl+click to refresh this page while bypassing cache."
        },
        // TODO 2018-02-02: Beta stage, do not translate!
        /*"popupTipForceEnableScroll": {
            "message": "(beta) Enter force scroll mode (will break layout)",
            "description": "Tooltip for force scroll button"
        },
        "popupTipBugReporter": {
            "message": "(beta) Open the bug reporter",
            "description": "Tooltip for bug reporter button"
        },*/

        // Based on message of about page
        "aboutBasedOn": {
            "message": "Bazuje na {{@data}}",
            "description": "English: Based on {{@data}}"
        }
    };
})();

/*****************************************************************************/
