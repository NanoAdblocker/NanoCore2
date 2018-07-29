// JSON does not allow comments, which makes things too painful
(() => {
    "use strict";
    return {
        // Dialog buttons
        "genericYes": {
            "message": "Ja",
            "description": "Button 'Yes' for dialogs"
        },
        "genericNo": {
            "message": "Nei",
            "description": "Button 'No' for dialogs"
        },
        "genericOK": {
            "message": "OK",
            "description": "Button 'OK' for dialogs"
        },
        // Generic messages
        "genericUnsavedChange": {
            "message": "Vil du forlate denne fanen? Endringer du har gjort vil ikke bli lagret.",
            "description": "Unsaved change warning"
        },
        "genericFilterReadError": {
            "message": "Kunne ikke laste inn data, vennligst oppfrisk.",
            "description": "Error when filter data could not be loaded"
        },
        "genericDataSaveError": {
            "message": "Kunne ikke lagre data, vennligst prøv igjen.",
            "description": "Error when changes could not be saved"
        },
        "genericNothingToExport": {
            "message": "Det er ingenting å eksportere.",
            "description": "Error when nothing to export"
        },

        // New cloud UI
        "nanoCloudNoData": {
            "message": "Det er ingen skydata.",
            "description": "English: No cloud data"
        },
        "nanoCloudLastSync": {
            "message": "Forrige synkronisering: {{device}} den {{time}}",
            "description": "English: Last sync: {{device}} at {{time}}"
        },
        "nanoCloudSyncFailed": {
            "message": "Noe gikk galt:\n{{error}}",
            "description": "English: Something went wrong:\n{{error}}"
        },

        // Dashboard dialog messages
        "dashboardMutexError": {
            "message": "Klarte ikke å hente mutex-låsen, har du et annet kontrollbord åpent?",
            "description": "Error when mutex locked by another dashboard"
        },

        // Settings groups
        "settingGeneralGroup": {
            "message": "Generelt",
            "description": "Group 'General' of settings tab"
        },
        "settingUserInterfaceGroup": {
            "message": "Brukergrensesnitt",
            "description": "Group 'User interface' of settings tab"
        },
        "settingOtherGroup": {
            "message": "Annet",
            "description": "Group 'Other' of settings tab"
        },
        // Settings prompts
        "settingsDashboardAllowSelectionPrompt": {
            "message": "Tillat tekstmarkering i kontrollbordet",
            "description": "English: Allow text selection in dashboard"
        },
        "settingsEditorWordWrapPrompt": {
            "message": "Myk tekstbryting av lange linjer i filterredigereren",
            "description": "English: Soft wrap long lines in filter editor"
        },
        "settingsViewerWordWrapPrompt": {
            "message": "Myk tekstbryting av lange linjer i filterviseren",
            "description": "English: Soft wrap long lines in filter viewer"
        },
        // Extra strings for new dashboard
        "settingDiskUsage": {
            "message": "Diskbruk: ",
            "description": "English: Disk usage: "
        },
        "settingMebibyte": {
            "message": " MiB",
            "description": "English: MiB"
        },
        "settingsLastBackedupFilePrompt": {
            "message": "Filen ble senest sikkerhetskopiert den: ",
            "description": "English: Last backed up file: "
        },
        "settingsLastRestoredFilePrompt": {
            "message": "Filen ble senest gjenopprettet den: ",
            "description": "English: Last restored file: "
        },

        // The tab name of advanced settings
        "advancedPageName": {
            "message": "Avansert",
            "description": "Advanced settings tab name"
        },

        // Extra help messages for user filters
        "1pResourcesReference": {
            "message": "Nano kommer med to sett med ressurser,",
            "description": "English: Nano comes with two sets of resources,"
        },
        "1pResourcesOriginal": {
            "message": "uBlock Origin-ressursene",
            "description": "English: uBlock Origin Resources"
        },
        "1pResourcesAnd": {
            "message": "og",
            "description": "English: and"
        },
        "1pResourcesNano": {
            "message": "Nano sine ekstraressurser",
            "description": "English: Nano Extra Resources"
        },
        "1pResourcesPeriod": {
            "message": ".",
            "description": "English: ."
        },
        "1pFilterEditorHelp": {
            "message": "Nano sin filterredigerer er drevet av Ace, og de fleste hurtigknappene virker på samme måte.",
            "description": "Explain the similarity between Nano Filter Editor and Ace in terms of shortcut keys"
        },

        // Whitelist linter limit warnings
        "whitelistLinterAborted": {
            "message": "Nano skannet ikke resten av linjene for feil, fordi det er for mange feil.",
            "description": "Warning when too many errors"
        },
        "whitelistLinterTooManyWarnings": {
            "message": "Nano skannet ikke resten av linjene for advarsler, fordi det er for mange advarsler.",
            "description": "Warning when too many warnings"
        },
        // Whitelist linter errors
        "whitelistLinterInvalidHostname": {
            "message": "Dette vertsnavnet er ikke gyldig.",
            "description": "Error when hostname not valid"
        },
        "whitelistLinterInvalidRegExp": {
            "message": "Dette ordinære uttrykket har syntaksfeil.",
            "description": "Error when regular expression has syntax errors"
        },
        "whitelistLinterInvalidURL": {
            "message": "Denne URLen er ugyldig.",
            "description": "Error when a URL not valid"
        },
        // Whitelist linter warnings
        "whitelistLinterSuspeciousRegExp": {
            "message": "Denne linjen blir behandlet som et ordinært uttrykk. Var det tilsiktet?",
            "description": "Warning when parsed as regular expression but is unlikely the intention of user"
        },

        // Filter linter limit warnings
        "filterLinterTooManyErrors": {
            "message": "Nano skannet ikke resten av linjene for feil, fordi det er for mange feil.",
            "description": "Error when too many errors"
        },
        "filterLinterTooManyWarnings": {
            "message": "Nano skannet ikke resten av linjene for advarsler, fordi det er for mange advarsler.",
            "description": "Warning when too many warnings"
        },
        // Filter linter special deprecation warnings
        "filterLinterDeprecatedCommentBracket": {
            "message": "Å bruke '[' til å markere en kommentar, har blitt utfaset. Bruk '!' istedet.",
            "description": "Deprecation when '[' used for comments"
        },
        "filterLinterDeprecatedInlineComment": {
            "message": "Kommentarer innenfor filteroppføringene har blitt utfaset.",
            "description": "Deprecation when inline comments"
        },
        // Filter linter special errors
        "filterLinterInternalErrorCosmeticFilterPassedThrough": {
            "message": "Denne regelen har blitt avslått per nå. For mere informasjon: https://github.com/NanoAdblocker/NanoCore/issues/77",
            "description": "https://github.com/NanoAdblocker/NanoCore/issues/77"
        },
        // Extended filtering warnings
        "filterLinterDeprecatedScriptContains": {
            "message": "'##script:contains(...)' har blitt utfaset. Bruk '##^script:has-text(...)' istedet.",
            "description": "Deprecation when 'script:contains' is used"
        },
        "filterLinterWarningScriptSnippetDoubleException": {
            "message": "Nano avslo et nullifisert domene, fordi den ikke kan bli brukt i en skriptutdrags-unntaksregel.",
            "description": "Warning when negated domain used with script snippet exception"
        },
        "filterLinterWarningConvertedToException": {
            "message": "Nano konverterte denne regelen til en unntaksregel, siden den bare inneholder nullifiserte domener",
            "description": "Warning when a rule is convered to exception because all negated domains"
        },
        "filterLinterWarningNegatedHTMLFiltering": {
            "message": "Nullifiserte domener støtter ikke HTML-filtrering ennå.",
            "description": "Warning when negated domain used with HTML filtering"
        },
        // Extended filtering errors
        "filterLinterRejectedAdguardJSInjection": {
            "message": "Rå JavaScript-innsprøytinger er ikke akseptert, grunnet sikkerhetsbekymringer.",
            "description": "Error when raw JavaScript injection"
        },
        "filterLinterRejectedBadSelector": {
            "message": "Velgeren i denne regelen har syntaksfeil.",
            "description": "Error when selector has syntax errors"
        },
        "filterLinterRejectedTooExpensive": {
            "message": "Denne regelen kan ikke være generisk.",
            "description": "Error when expensive cosmetic is generic"
        },
        "filterLinterRejectedStyleInjection": {
            "message": "Denne CSS-innsprøytingsregelen har syntaksfeil.",
            "description": "Error when CSS injection has syntax errors"
        },
        "filterLinterRejectedAssetsAccessViolation": {
            "message": "Upriviligerte filtre kan ikke henvise til priviligerte filtre.",
            "description": "Error when unprivileged filter references a privileged resources"
        },
        // Network filtering warnings
        "filterLinterWarningDiscardedNonNegatableType": {
            "message": "Nano avslo typevalget '{{type}}' fordi den ikke kan bli nullifisert.",
            "description": "English: Nano discarded the type option '{{type}}' because it cannot be negated."
        },
        "filterLinterWarningExpandedMp4Option": {
            "message": "Nano byttet ut valget 'mp4' med 'media,redirect=noopmp4-1s'.",
            "description": "Warning when 'mp4' is replaced"
        },
        "filterLinterWarningDeprecatedMp4Option": {
            "message": "Bruken av valget 'mp4' har blitt utfaset. Utdyp fullengde-valgene istedet.",
            "description": "Deprecation when 'mp4'"
        },
        "filterLinterWarningUnsupportedTypeIgnored": {
            "message": "Nano avslo typevalg som ikke er støttet ennå.",
            "description": "Warning when unsupported type options discarded but not entire rule"
        },
        "filterLinterWarningRedirectNoType": {
            "message": "Nano avslo valget 'redirect=...' fordi den krever et typevalg.",
            "description": "Warning when 'redirect=' has no type"
        },
        "filterLinterWarningRedirectTooManyTypes": {
            "message": "Nano avslo valget 'redirect=...' fordi den har for mange typevalg.",
            "description": "Warning when 'redirect=' has too many types"
        },
        "filterLinterWarningRedirectNoResourceToken": {
            "message": "Nano avslo valget 'redirect=...' fordi den ikke har noen argumenter.",
            "description": "Warning when 'redirect=' has no arguments"
        },
        "filterLinterWarningRedirectNoSupportedType": {
            "message": "Nano avslo valget 'redirect=...' fordi den ikke har noen støttede typevalg.",
            "description": "Warning when 'redirect=' has no supported type"
        },
        "filterLinterWarningRedirectNegatedDomain": {
            "message": "Nano avslo et nullifisert domene, fordi den ikke kan bli brukt med valget 'redirect=...'.",
            "description": "Warning when negated domain used with 'redirect='"
        },
        "filterLinterWarningRedirectNoValidDestinationDomain": {
            "message": "Nano avslo valget 'redirect=...' fordi den ikke har et gyldig måldomene.",
            "description": "Warning when 'redirect=' has no destination"
        },
        "filterLinterWarningRedirectPureHostname": {
            "message": "Nano avslo valget 'redirect=...' fordi den ikke kan bli brukt med en ren vertsnavnregel.",
            "description": "Warning when 'redirect=' pure host name"
        },
        "filterLinterWarningRedirectDoesNotMatchRegExp": {
            // TODO 2017-12-28: Think of a better warning message
            "message": "Nano avslo valget 'redirect=...' fordi denne nettverksregelen ikke samsvarer med dette ordinære uttrykket: {{regexp}}",
            "description": "Warning when 'redirect=' failed initial test, use '{{regexp}}' to denote the tester if needed"
        },
        // Network filtering errors
        "filterLinterDiscardedLocalhostHostEntry": {
            "message": "Denne vertsfiloppføringen er avslått, siden den er en localhost-erklæring.",
            "description": "Error when localhost declaration"
        },
        "filterLinterRejectedAdguardElementRemove": {
            "message": "Elementfjerningsregler med Adguard sin syntaks er ikke støttet ennå.",
            "description": "Error when Adguard style element remove rule"
        },
        "filterLinterRejectedNegatedGenerichide": {
            "message": "Valgene 'generichide', 'ghide', and 'elemhide' kan ikke bli nullifisert.",
            "description": "Error when 'generichide' is negated"
        },
        "filterLinterRejectedRedirectInException": {
            "message": "Valget 'redirect=...' kan ikke bli brukt i unntaksregler.",
            "description": "Error when 'redirect=' used in exception"
        },
        "filterLinterRejectedBadDomainOptionArguments": {
            "message": "Valget 'domain=...' har ugyldige argumenter.",
            "description": "Error when 'domain=' has invalid arguments"
        },
        "filterLinterRejectedBadCspOptionArguments": {
            "message": "Valget 'csp=...' har ugyldige argumenter.",
            "description": "Error when 'csp=' has invalid arguments"
        },
        "filterLinterRejectedUnknownOption": {
            "message": "Valget '{{option}}' er ikke gjenkjent.",
            "description": "English: The option '{{option}}' is not recognized."
        },
        "filterLinterRejectedOnlyUnsupportedType": {
            // TODO 2018-01-15: This was phrased like this due to weird behavior of
            // the type option 'webrtc', but turns out to be a bug:
            // https://github.com/gorhill/uBlock/issues/3433
            // Need to investigate whether this should be changed.
            "message": "En typeinnstilling er ikke støttet ennå.",
            "description": "Error when unsupported type option used and entire rule discarded"
        },
        "filterLinterRejectedNetworkBadRegExp": {
            "message": "Denne nettverksregelen har syntaksfeil i dens ordinære uttrykk.",
            "description": "Error when network has regular expression syntax errors"
        },
        "filterLinterRejectedInterventionForSMed79": {
            // https://github.com/chrisaljoudi/uBlock/issues/1096
            "message": "Domeneankeret kan ikke bli umiddelbart etterfulgt av '^'.",
            "description": "Error when the bad rule from SMed79 is discarded"
        },

        // Tab name of hosts matrix
        "matrixPageName": {
            "message": "Vertsmatrise",
            "description": "Hosts matrix tab name"
        },

        // Title of filter viewer
        "filterViewerPageName": {
            "message": "Nano — Filterviser",
            "description": "Title of the filter viewer"
        },

        // Popup tooltips
        "popupCacheControlPrompt": {
            "message": "mellomlagerkontroll",
            "description": "The cache control strip name"
        },
        "popupTipOpenFirewallPane": {
            "message": "Skru brannmurpanelet av/på",
            "description": "Tooltip for toggle firewall pane button"
        },
        "popupTipRefreshButton": {
            "message": "Klikk her for å oppfriske denne siden.\n\nCtrl+klikk for å oppfriske denne siden mens mellomlageret blir forbipassert.",
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
            "message": "Basert på {{@data}}",
            "description": "English: Based on {{@data}}"
        }
    };
})();
