<overview>
Navigation, search, and presentation components, distilled from path-controls, search-fields, sidebars, tab-bars, token-fields, action-sheets, alerts, page-controls, panels, popovers, scroll-views, sheets, and windows.
Load when structuring an app (tab bar vs sidebar vs split view vs pages), placing search, choosing a modal presentation (alert, action sheet, popover, sheet, panel, full screen, new window), separating floating bars from scrolling content, or sizing windows and volumes on iPadOS, macOS, and visionOS.
Search as a tab, the adaptable sidebar, sidebar icon colors, scroll edge effects, and sheet button placement changed in 2025-2026; those items are marked inline.
</overview>

<topic name="Path controls" source="https://developer.apple.com/design/human-interface-guidelines/path-controls" updated="undated">
A macOS-only control showing the file system path of a selected file or folder (Finder's View > Show Path Bar; shows the window's folder when nothing is selected). `NSPathControl`.

<when_to_use>
- **Standard:** a linear list of root disk, parent folders, and selected item with icons and names; middle names hide when too long. Editable: dragging an item onto it selects and shows that item.
- **Pop up:** like a pop-up button showing the selected item; clicking opens a menu of root disk, parent folders, and item. Editable: the menu adds a Choose command and the control accepts dragged items.
</when_to_use>

<best_practices>
- **Use a path control in the window body, not the window frame.** Not for toolbars or status bars; Finder's path bar sits at the bottom of the body.
</best_practices>
</topic>

<topic name="Search fields" source="https://developer.apple.com/design/human-interface-guidelines/search-fields" updated="2026-06-08">
An editable text field with a Search icon, Clear button, and placeholder text, optionally narrowed by a scope bar and tokens. Entry-point placement depends on platform, layout, content, and navigation.

<when_to_use>
| Placement | Use when |
|---|---|
| iOS search tab, standard style (2026) | You want a landing page for suggestions, discovery, and exploration (Apple TV genres); tapping opens a page with the field at top. |
| iOS search tab, button appearance (2026) | People need results fast; tapping focuses the field and raises the keyboard, and exiting returns to the previous tab. |
| iOS bottom toolbar (2025) | Search is a priority and there is room, as an expanded field or a button (Settings: only item; Mail, Notes: beside other controls); it animates into a field above the keyboard. |
| iOS top toolbar (navigation bar) | Bottom content must stay uncovered (Wallet's pass stack) or there is no bottom toolbar; animates into a field above the keyboard or at the top. |
| iOS inline field | Position beside content clarifies scope: filtering one view, several search fields in one app, or location defines scope (Music library filter). Put it above the list; consider pinning it to the top toolbar on scroll. |
| iPadOS, macOS trailing toolbar edge (2025) | The common default, especially split views searching several columns (Mail, Notes) or results in the detail view (Freeform). |
| iPadOS, macOS top of sidebar | Filtering sidebar navigation or content, even levels deep (Settings). |
| iPadOS, macOS sidebar or tab bar item | A dedicated discovery area with rich suggestions, categories, and recents (Music, TV), always available. |
</when_to_use>

<best_practices>
- **Use placeholder text to help people know what they can search for.**
- **If possible, start search immediately when a person types.**
- **Consider showing suggested search terms.** Recents before typing, predictions while typing.
- **Simplify search results.** Most relevant first; consider categories.
- **Consider letting people filter search results.** A scope bar in the results area.
- **Use a scope bar to filter among clearly defined search categories (2025).** Mail: whole mailbox to the current one.
- **Default to a broader scope and let people refine it.**
- **Use tokens to filter by common search terms or items (2025).** A token is a selectable, editable term that filters further terms (a contact in Mail, photos in Messages); the macOS equivalent is a token field.
- **Consider pairing tokens with search suggestions.** People may not know which tokens exist.
- **In a dedicated search area, consider focusing the field immediately.** Except on iPad with only a virtual keyboard, which would cover the view.
- **Account for window resizing.** The iPad field resizes like on Mac; in compact views keep search where it is contextually useful (Notes and Mail: above the content list column). Keep iPad and Mac consistent. `searchable(text:placement:prompt:)`, `UISearchBar`, `NSSearchField`.
</best_practices>

<platform_considerations>
- **iOS:** entry points per the table; a search tab sits at the trailing end of the tab bar.
- **tvOS:** a search screen is a keyboard screen with results beneath (`UISearchController`); provide popular, context-specific, and recent suggestions because people avoid typing.
- **watchOS:** tapping the field opens a full-screen text-input control; the app returns only after Cancel or Search.
</platform_considerations>
</topic>

<topic name="Sidebars" source="https://developer.apple.com/design/human-interface-guidelines/sidebars" updated="2026-06-08">
A sidebar on the leading side navigates between app areas or top-level collections (folders, playlists). It needs much vertical and horizontal space; when space is limited, a tab bar, or a tab bar that converts to a sidebar, navigates better. Not supported in watchOS.

<when_to_use>
- Consider a tab bar first (iOS, iPadOS); reach less-frequent areas through its convertible sidebar appearance.
- Deeper than two levels: a split view with a content list between sidebar and detail.
- Sidebar only, no conversion: `NavigationSplitView` or `UISplitViewController`.
</when_to_use>

<best_practices>
- **Extend visually rich content beneath the sidebar (2025).** In iOS, iPadOS, and macOS sidebars float in the Liquid Glass layer; let content scroll horizontally beneath, or apply a background extension effect that mirrors adjacent content (`backgroundExtensionEffect()`).
- **When possible, let people customize the contents of a sidebar.**
- **Group hierarchy with disclosure controls if your app has a lot of content.**
- **Consider using familiar symbols to represent items.** SF Symbols; a custom symbol over a bitmap.
- **Consider letting people hide the sidebar.** iPadOS edge swipe; macOS show/hide button or Show Sidebar and Hide Sidebar in the View menu; visionOS windows expand to fit, so hiding is rare.
- **In general, show no more than two levels of hierarchy in a sidebar.**
- **If you need two levels, use succinct, descriptive labels to title each group.**
- **Make sure any sidebar icon colors you choose serve a clear purpose (2026).** Icons default to the app accent color; macOS users can change the system accent color and expect every sidebar icon to follow. Sparingly used fixed colors can clarify or draw attention (Mail's yellow VIP icon).
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** the `sidebarAdaptable` tab view style (clarified 2026) lets you choose sidebar or tab bar at launch; both include a switch button, and it adapts to platform, rotation, and window resizing. Without SwiftUI: `UICollectionLayoutListConfiguration.Appearance.sidebar`.
- **macOS:** row height, text, and glyph size follow the sidebar size (small, medium, large), set programmatically or by people in General settings. Consider auto-hiding and revealing the sidebar as the window resizes (Mail viewer).
- **visionOS:** for deep hierarchy, a sidebar inside a tab gives secondary navigation; sidebar selections must not change the tab.
</platform_considerations>

<anti_patterns>
- Avoid hiding the sidebar by default.
- Avoid critical information or actions at the bottom of a macOS sidebar; window bottoms often get hidden.
</anti_patterns>
</topic>

<topic name="Tab bars" source="https://developer.apple.com/design/human-interface-guidelines/tab-bars" updated="2026-06-08">
A tab bar navigates between top-level sections while preserving each section's navigation state. Navigation only, never actions. Not supported in watchOS.

<when_to_use>
- A few frequently used sections (Clock: Alarm, Stopwatch, Timer).
- Controls acting on the current view: a toolbar.
- Complex structure: a sidebar, or a tab bar that adapts to one; a sidebar with no conversion uses `NavigationSplitView`, not a tab view.
</when_to_use>

<best_practices>
- **Use a tab bar to support navigation, not to provide actions.**
- **Make sure the tab bar is visible when people navigate to different sections.** Only a temporary modal view may cover it.
- **Use the appropriate number of tabs.** Fewer is easier; weigh each addition against access frequency.
- **Include tab labels.** Single words whenever possible.
- **Consider using SF Symbols for tab bar icons.** They adapt to compact (icon above label) and regular (side by side) bars; prefer filled symbols. Custom icon dimensions: Apple Design Resources.
- **Use a badge to indicate that critical information is available.** A red oval with a white number or exclamation point; reserve it for critical information.
</best_practices>

<platform_considerations>
- **iOS (2025):** floats at the bottom on a Liquid Glass background. With an attached accessory (Music's MiniPlayer) it can minimize and move the accessory inline on scroll down; tapping a tab or scrolling to top restores it (`TabBarMinimizeBehavior`). A search tab sits at the trailing end.
- **iPadOS:** near the top, fixed (`tabBarOnly`) or with a button converting it to a sidebar (`sidebarAdaptable`). Prefer a tab bar; offer sidebar conversion for wider access. Let people customize tabs (Music: a favorite playlist), with a default of five or fewer to preserve continuity between compact and regular sizes (`TabViewCustomization`, `UITab.Placement`).
- **tvOS:** customizable background tint, color, or image; item fonts (including the selected item); selected and unselected tints; button icons such as settings and search. Translucent with only the selected tab opaque; focus adds a drop shadow. Height 68 pt, top edge 46 pt from the screen top, both fixed. Overflow fades the rightmost item, plus a left fade once scrolling. The bar scrolls offscreen for single-view tabs but stays pinned above a split view (TV Library, Settings); Menu always returns focus to it. Live-viewing apps order tabs: Live content, Cloud DVR or recorded content, Other content.
- **visionOS:** always vertical, fixed to the window's leading side; expands when looked at and may temporarily obscure content. Give each tab a symbol (always visible) and a short label (revealed on look). Deep hierarchy: a sidebar within a tab that never changes the tab.
</platform_considerations>

<anti_patterns>
- Avoid overflow tabs; in iOS and iPadOS the trailing tab becomes a More tab that hides content.
- Don't disable or hide tab bar buttons when content is unavailable; explain the empty section.
- Avoid similar colors for tab labels and content backgrounds (2025); with colorful content prefer a monochromatic bar or a clearly differentiated accent.
</anti_patterns>
</topic>

<topic name="Token fields" source="https://developer.apple.com/design/human-interface-guidelines/token-fields" updated="undated">
A macOS-only text field that turns typed text into tokens people can select, drag to reorder, or move between fields (Mail's address fields). It can suggest completions while typing and give each token a contextual menu (edit name, mark VIP, view contact card). `NSTokenField`.

<best_practices>
- **Add value with a context menu.**
- **Consider providing additional ways to convert text into tokens.** A comma converts by default; add shortcuts such as Return.
- **Consider customizing the delay before showing suggested tokens.** Immediate by default, which can distract while typing. Tokens as search terms: see Search fields.
</best_practices>
</topic>

<topic name="Action sheets" source="https://developer.apple.com/design/human-interface-guidelines/action-sheets" updated="undated">
A modal view presenting choices related to an action people just initiated. SwiftUI: a confirmation dialog presentation modifier on all platforms; UIKit: `UIAlertController.Style.actionSheet` (iOS, iPadOS, tvOS). Not supported in visionOS.

<when_to_use>
- Use an action sheet, not an alert, for choices tied to an intentional action (canceling a Mail draft: delete or save); an alert only confirms or cancels and is usually unexpected.
- Use an action sheet, not a menu, when choices follow an action; people expect a menu only when they reveal it (iOS, iPadOS).
</when_to_use>

<best_practices>
- **Use action sheets sparingly.** They interrupt the task.
- **Aim to keep titles short enough to display on a single line.**
- **Provide a message only if necessary.**
- **If necessary, provide a Cancel button for actions that might destroy data.** At the bottom (upper-left corner in watchOS); a SwiftUI confirmation dialog includes it by default.
- **Make destructive choices visually prominent.** Destructive style (`ButtonRole.destructive`, `UIAlertAction.Style.destructive`) at the top of the sheet.
</best_practices>

<platform_considerations>
- **watchOS:** title, optional message, Cancel, and one or more buttons styled Default (no special meaning), Destructive (destroys data), or Cancel (dismisses without acting).
</platform_considerations>

<anti_patterns>
- Avoid letting an action sheet scroll (iOS, iPadOS); scrolling invites accidental taps.
- Avoid more than four buttons including Cancel in watchOS, so at most three choices.
</anti_patterns>
</topic>

<topic name="Alerts" source="https://developer.apple.com/design/human-interface-guidelines/alerts" updated="2024-02-02">
An alert gives people critical information right away: a problem, a warning of data loss, or confirmation of a purchase or other important action they initiated. A modal view with a title, optional informative text, and up to three buttons.

<when_to_use>
- Unexpected, actionable information, or confirming an uncommon destructive action people cannot undo.
- Choices related to an intentional action: an action sheet (iOS, iPadOS; canceling a Mail draft: delete edits or draft, save, return to editing).
- Purely informative situations: an in-context indicator (Mail's server-unavailable indicator).
- Extras: a text field (iOS, iPadOS, macOS, visionOS); icon and accessory view (macOS, visionOS); suppression checkbox and Help button (macOS).
</when_to_use>

<best_practices>
- **Use alerts sparingly.** Only essential information and useful actions.
- **In all alert copy, be direct, and use a neutral, approachable tone.** Not oblique, accusatory, or minimizing.
- **Write a title that clearly and succinctly describes the situation.** What happened, where, and why. Complete sentence: sentence-style capitalization with ending punctuation; fragment: title-style, no punctuation.
- **Include informative text only if it adds value.** Short complete sentences, sentence-style capitalization.
- **Include a text field only if you need people's input to resolve the situation.** A secure field for a password.
- **Create succinct, logical button titles.** One or two words naming the result; verbs tied to the text ("View All", "Reply", "Ignore"). "OK" only in informational alerts. Always "Cancel" for a canceling button. Title-style capitalization, no ending punctuation.
- **Place buttons where people expect.** Most likely choice on the trailing side of a row or top of a stack; the default button always trailing or top; Cancel typically leading or bottom.
- **Use the destructive style for a button that performs a destructive action people didn't deliberately choose.** A deliberately chosen Empty Trash keeps the plain style so Return confirms it.
- **If there's a destructive action, include a Cancel button.** To make people read rather than press Return, avoid making any button the default. A single-button alert whose button is the default uses Done, not Cancel.
- **Provide alternative ways to cancel.** Exit to the Home Screen (iOS, iPadOS); Escape or Command-Period on a keyboard (iOS, iPadOS, macOS, visionOS); Menu on the remote (tvOS). `alert(_:isPresented:actions:)`, `UIAlertController`, `NSAlert`.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** keep titles short and messages brief so the alert does not scroll at large text sizes.
- **macOS:** shows the app icon by default (replaceable); supports repeating alerts with suppression, an `accessoryView`, and a Help button.
- **visionOS:** in the Shared Space the alert sits in front of the window, slightly forward on the z-axis, anchored to it if moved; in a Full Space it is centered in the field of view. Accessory view: max height 154 pt, 16-pt corner radius.
</platform_considerations>

<anti_patterns>
- Avoid an alert merely to provide information.
- Avoid alerts for common, undoable actions even when destructive (deleting an email or file).
- Avoid an alert at app start; make information discoverable, or show cached or placeholder data with a nonintrusive label.
- Avoid titles like "Error" or "Error 329347 occurred", and titles wrapping beyond two lines.
- Avoid explaining alert buttons; if unavoidable, say choose and use the exact title without quotes.
- Avoid "OK" as the default title unless purely informational; prefer "Erase", "Convert", "Clear", "Delete". Avoid "Yes" and "No".
- Never make Cancel the default button.
- Use the macOS caution symbol (`exclamationmark.triangle`) only for unexpected data loss, never for tasks meant to overwrite or remove data such as save or empty trash.
</anti_patterns>
</topic>

<topic name="Page controls" source="https://developer.apple.com/design/human-interface-guidelines/page-controls" updated="2023-06-21">
A row of equidistant indicator dots, one per page in a flat ordered list, with a solid dot for the current page; dots clip when too many fit. Not supported in macOS.

<when_to_use>
- An ordered list of peer pages, including user-created lists.
- Hierarchical or nonsequential relationships: a sidebar or split view.
- More than about 10 pages: a grid or another any-order arrangement.
</when_to_use>

<best_practices>
- **Use page controls to represent movement between an ordered list of pages.**
- **Center a page control at the bottom of the view or window.**
- **Make sure custom indicator images are simple and clear.** Simple SF Symbols work. `preferredIndicatorImage`, `setIndicatorImage(_:forPage:)`.
- **Customize the default indicator image only when it enhances the control's meaning.** `bookmark.fill` when every page holds bookmarks; Weather marks only the current-location page with `location.fill`.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** highlights the current indicator and shrinks end indicators when more exist than fit. Tapping the leading or trailing side of the current dot goes to the previous or next page (iPadOS pointer can target a dot); scrubbing (drag) steps through pages, and past an edge jumps to first or last. Background styles (`backgroundStyle`): Automatic shows the translucent rounded background only during interaction (not the primary navigation); Prominent always (primary navigation only); Minimal never (position only).
- **tvOS:** use on collections of full-screen peer pages; extra controls make focus hard to keep.
- **visionOS:** display only; not interactive.
- **watchOS:** at the bottom for horizontal pagination or beside the Digital Crown for a vertical tab view, showing position within the page and the set. Use vertical pagination to separate views into distinct, purposeful pages; it beats horizontal paging and deep hierarchy. Limit pages to one screen height where possible; place variable-height pages after fixed-height ones. `PageTabViewStyle`, `UIPageControl`.
</platform_considerations>

<anti_patterns>
- Don't display more than about 10 dots; they are hard to count.
- Avoid complex shapes, negative space, text, or inner lines in indicator images.
- Avoid more than two different indicator images.
- Avoid coloring indicators; system color keeps current-page contrast.
- Avoid animating page transitions during scrubbing; animate taps only.
- Avoid supporting the scrubber with the minimal background style.
</anti_patterns>
</topic>

<topic name="Panels" source="https://developer.apple.com/design/human-interface-guidelines/panels" updated="undated">
A macOS-only window that floats above others with supplementary controls, options, or information for the active window or selection; less prominent than a main window, optionally a dark translucent HUD. Elsewhere use a modal view. `NSPanel`, `hudWindow`.

<when_to_use>
- Quick access to controls or settings for the selected item.
- Inspector (contents follow the selection): a panel or a split view pane. Info window (contents fixed): a regular window.
- Repeated input-and-observe cycles such as find and replace: a panel, not a sheet.
- HUD only in a media-oriented app (movies, photos, slides), when a standard panel would obscure essential content, or when no controls are needed (only the disclosure triangle matches a HUD).
</when_to_use>

<best_practices>
- **Prefer simple adjustment controls in a panel.** Sliders and steppers over typing or item selection.
- **Write a brief title that describes the panel's purpose.** A noun or noun phrase in title-style capitalization ("Fonts", "Colors", "Inspector").
- **Show and hide panels appropriately.** App active: bring all open panels forward; inactive: hide them all.
- **Refer to panels by title.** Menus: "Show Fonts", "Show Inspector" without the word panel; help: the title or title plus window ("Fonts window").
- **Prefer standard panels.** A HUD without reason distracts and may not match the appearance setting.
- **Maintain one panel style when your app switches modes.** Keep a HUD when leaving full screen if used there.
- **Use color sparingly in HUDs.** Small amounts of high-contrast color.
- **Keep HUDs small.** Never obscure or compete with the content they adjust.
</best_practices>

<anti_patterns>
- Avoid listing panels in the Window menu's documents list (show and hide commands are fine).
- Avoid making a panel's minimize button available.
</anti_patterns>
</topic>

<topic name="Popovers" source="https://developer.apple.com/design/human-interface-guidelines/popovers" updated="undated">
A transient view that appears above content when people click or tap a control or interactive area, points at its source, and closes after interaction or an outside click or tap. Not supported in tvOS or watchOS.

<when_to_use>
- A small amount of information or a few related tasks (changing a calendar event's date, time, or calendar).
- Temporary room for content that would otherwise need a sidebar or panel.
- Regular widths only; in compact views use a full-screen modal such as a sheet.
</when_to_use>

<best_practices>
- **Use a popover to expose a small amount of information or functionality.**
- **Position popovers appropriately.** The arrow points directly at the revealing element without covering it or essential content.
- **Use a Close button for confirmation and guidance only.** Cancel or Done when it clarifies saving; otherwise outside tap or selection closes it. With multiple selections, stay open until explicit dismissal or an outside tap.
- **Always save work when automatically closing a nonmodal popover.** Discard only on explicit Cancel.
- **Show one popover at a time.** Close the open one first.
- **Let people close one popover and open another with a single click or tap.**
- **Provide a smooth transition when changing a popover's size.** Animate it. `popover(isPresented:attachmentAnchor:arrowEdge:content:)`, `UIPopoverPresentationController`, `NSPopover`.
</best_practices>

<platform_considerations>
- **macOS:** a popover can be detachable, becoming a panel when dragged; consider allowing it and keep the detached appearance nearly identical.
</platform_considerations>

<anti_patterns>
- Never cascade popovers.
- Don't show any view except an alert over a popover.
- Avoid making a popover too big; the system may resize it.
- Avoid popovers in compact views (iOS, iPadOS).
- Avoid a popover for a warning; use an alert.
- Avoid the word popover in help documentation.
</anti_patterns>
</topic>

<topic name="Scroll views" source="https://developer.apple.com/design/human-interface-guidelines/scroll-views" updated="2026-06-08">
Shows content larger than its bounds by moving it vertically or horizontally. Its only visible part is a translucent scroll indicator that appears after scrolling starts and, except in tvOS, shows whether content is near the beginning, middle, or end.

<best_practices>
- **Support default scrolling gestures and keyboard shortcuts.** Custom scrolling keeps the elastic behavior.
- **Make it apparent when content is scrollable.** Show partial content at the edge.
- **Consider supporting page-by-page scrolling if it makes sense.** A page is typically the view's height or width; subtract an overlap unit (a line of text, a row of glyphs, part of a picture) to keep context. `PagingScrollTargetBehavior`.
- **In some cases, scroll automatically to help people find their place.** When an operation selects content or places the insertion point offscreen (a search hit), when people type at a hidden insertion point, when the pointer passes the view edge during selection, or when people scroll away from a selection before acting on it. Scroll only as much as necessary.
- **If you support zoom, set appropriate maximum and minimum scale values.**
- **Prefer the automatic scroll edge effect style (2025, updated 2026).** In iOS, iPadOS, and macOS a scroll edge effect separates floating elements such as toolbars from scrolling content; automatic gives a more opaque separation for top toolbars with many controls, text outside Liquid Glass controls, and pinned table headers. Custom bars may need it added manually or its style set to hard or soft; test soft thoroughly for legibility. `ScrollEdgeEffectStyle`, `UIScrollEdgeEffect.Style`, `NSScrollEdgeEffectStyle`.
- **Only use a scroll edge effect when a scroll view is behind floating interface elements (2026).** Not decorative; it does not block or darken like an overlay.
- **Apply one scroll edge effect per view (2026).** Each iPad or Mac split view pane may have its own; keep heights consistent.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** consider a page control in page-by-page mode (Weather's locations); no scroll indicator on the same axis.
- **macOS:** the indicator is a scroll bar; small or mini scroll bars may go in a panel when space is tight, with all its controls the same size.
- **tvOS:** views scroll without indicators; the system scrolls to keep focused items visible.
- **visionOS:** the indicator is small and fixed size, vertically centered at the trailing edge (vertical) or horizontally centered at the bottom edge (horizontal), appearing on swipe; looking at it and dragging enables a jog bar with tick marks that controls speed. It is a little thicker than in iOS, so widen tight margins. Look to Scroll (2026): eyes scroll by looking near the top and bottom (vertical) or sides (horizontal); off by default, enabled per scroll view (`ScrollInputKind`, `look`), coexisting with gestures. Support it in reading and browsing views, keep it consistent across similar views, and make scroll areas full window width or height or give them clear boundaries when inset.
- **watchOS:** prefer vertically scrolling content via the Digital Crown. Use tab views for page-by-page scrolling; stacked vertically, the crown moves through full-screen pages with a page indicator beside it. Limit pages to one screen height where possible; the indicator expands into a scroll indicator for long pages, so place variable-height pages after fixed-height ones. `ScrollView`, `UIScrollView`, `NSScrollView`, `WKPageOrientation`.
</platform_considerations>

<anti_patterns>
- Avoid a scroll view inside another with the same orientation; perpendicular nesting is fine.
- Avoid a scroll indicator on the same axis as a page control.
- Avoid Look to Scroll for secondary or control-dense content (Notes: main view yes, notes list no), and remove custom scroll-position effects such as parallax before adopting it.
</anti_patterns>
</topic>

<topic name="Sheets" source="https://developer.apple.com/design/human-interface-guidelines/sheets" updated="2026-03-24">
A sheet helps people perform a scoped task closely related to the current context (supplying information, attaching a file) before returning to the parent view. Always modal in macOS, tvOS, visionOS, and watchOS; modal or nonmodal in iOS and iPadOS (Notes' format sheet keeps the note editable).

<when_to_use>
- Simple self-contained tasks or requests for specific information.
- Complex or prolonged flows: iOS and iPadOS full-screen modal (`UIModalPresentationStyle.fullScreen`) for video, photos, camera, or multistep editing; macOS a new window or full-screen mode; visionOS a Full Space.
- Supplementary items affecting the ongoing main task: nonmodal sheet (iOS, iPadOS), panel (macOS), split view (visionOS).
- macOS repeated input with observed results (find and replace): a panel.
- watchOS: only when a modal task needs a custom title or content presentation; otherwise an alert or action sheet.
</when_to_use>

<best_practices>
- **Display only one sheet at a time from the main interface.** Close the first before showing a second; re-show it afterward if needed.
- **Provide an alternative to the Done button (2026).** Pair Done with Cancel (dismiss without saving) or Back (previous step). Cancel or Close dismisses without saving; Done dismisses after completing or saving; Back navigates and never dismisses.
- **In an iPhone app, consider supporting the medium detent for progressive disclosure.** A share sheet shows the most relevant items at medium; Messages and Mail compose sheets use only full height.
- **Include a grabber in a resizable sheet.** It signals resizing, cycles detents on tap, and works with VoiceOver (`prefersGrabberVisible`).
- **Support swiping to dismiss a sheet.** With unsaved changes, confirm via an action sheet.
- **Prefer the page or form sheet presentation styles in an iPadOS app.** Default sizes centered on a dimmed background (`UIModalPresentationStyle`).
- **Present a macOS sheet in a reasonable default size.** Support resizing where a clearer view helps.
- **Let people interact with other macOS app windows without first dismissing a sheet.** Opening a sheet brings the parent (and a document's modeless panels) forward.
- **Keep watchOS sheet interactions brief and occasional.** `sheet(item:onDismiss:content:)`, `UISheetPresentationController`, `presentAsSheet(_:)`.
</best_practices>

<platform_considerations>
- **iOS, iPadOS (button placement 2026):** single view: Cancel on the leading edge of the top toolbar, Done on the trailing edge. Multi-step: first step Cancel leading and inactive Done trailing; later steps Back replaces Cancel; the final step activates Done. A resizable sheet expands on scroll or by dragging the grabber at its top edge. Detents (designed for iPhone): large is fully expanded, medium about half; custom values allowed. Large is automatic; adding medium rests at both; only medium prevents full height (`detents`).
- **macOS:** a cardlike rounded view over its dimmed parent window; other app windows stay usable.
- **visionOS:** floats in front of the dimmed parent and takes interaction; center it in the field of view, size it to retain context, consider resizing.
- **watchOS:** a full-screen semitransparent view over blurred, desaturated content. If you change the default label, prefer SF Symbols.
</platform_considerations>

<anti_patterns>
- Avoid showing Cancel, Done, and Back together, and avoid Done alone.
- Avoid a sheet for complex or prolonged flows.
- Avoid the medium detent when content needs full height.
- Avoid a visionOS sheet emerging from the window's bottom edge or covering most or all of it.
- Avoid using a watchOS sheet for navigation, or labels that suggest hierarchy or read like a page or app title.
</anti_patterns>
</topic>

<topic name="Windows" source="https://developer.apple.com/design/human-interface-guidelines/windows" updated="2025-06-09">
A window presents an app's views, bounds its content, and enables multitasking in iPadOS, macOS, and visionOS (not iOS, tvOS, watchOS). A primary window holds main navigation and content; an auxiliary window serves one task or area, allows no navigation elsewhere, and usually has a close button.

<when_to_use>
- A new window to help people multitask or preserve context (Mail's Compose beside the open message), or as an optional context menu or File menu command (`OpenWindowAction`).
- visionOS: a window for a familiar, UI-centric interface; a volume for rich or bounded 3D content viewed from any angle (a game board).
</when_to_use>

<best_practices>
- **Make sure your windows adapt fluidly to different sizes (2025).**
- **Choose the right moment to open a new window (2025).** Excess windows clutter and confuse.
- **Consider providing the option to view content in a new window (2025).**
- **Use the term window in user-facing content (2025).** Never scene.
- **iPadOS: make sure window controls don't overlap toolbar items (2025).** Controls appear at the toolbar's leading edge when windowed; move leading buttons inward when they appear.
- **iPadOS: consider a gesture to open content in a new window.** Pinch a Notes item; `UIWindowScene.ActivationInteraction`. A single-file view can use `QLPreviewSceneActivationConfiguration`, but the app must support multiple windows.
- **macOS: make sure custom windows use the system-defined appearances.** Update backgrounds and buttons on state changes.
- **visionOS: retain the window's glass background.** Removing it hurts legibility and cohesion; opaque feels heavy.
- **visionOS: choose an initial window size that minimizes empty areas.** Default 1280x720 pt, placed about two meters in front with an apparent width of about three meters. Shape it for content (Keynote wide, Safari tall; a tower game taller than a driving game) and set a minimum and maximum size so UI never overlaps or becomes unusable.
- **visionOS: minimize the depth of 3D content in a window.** Deep content is clipped; use a volume.
- **visionOS volumes: prefer a volume for rich 3D content; place 2D content to look good from multiple angles** (pin it with attachments). Use dynamic scaling in general; fixed scaling (the default) for real-world-size objects such as retail products. In visionOS 2 and later the baseplate glows when looked at to reveal edges and the resize control; skip it for full-bleed content or a custom baseplate. A volume may add one ornament anchored such as `topBack` or `bottomFront`. Alignment: parallel to the floor for low-interaction content, tilting with the viewer for use while reclining. `WindowGroup`, `UIWindow`, `NSWindow`.
</best_practices>

<platform_considerations>
- **iPadOS (2025):** full screen (windows fill the screen; app switcher) or windowed (free resizing, several windows, repositioning; size and placement remembered) per Multitasking & Gestures settings.
- **macOS:** a frame (window controls, toolbar, rarely a bottom bar) above a body. States: Main (frontmost; one per app), Key (accepts input; one onscreen; may be a panel; clicking a Dock icon makes only the most recent window key), Inactive. The key window colors its close, minimize, and zoom controls; others show gray, and inactive windows lose vibrancy. Panels like Colors and Fonts become key only on a title bar click or keyboard input.
- **visionOS:** default (window), volumetric (volume), and plain (`PlainWindowStyle`, no glass) styles, usable in the Shared Space and a Full Space; the system places the first window. A window is an upright glass plane with close button, window bar, and resize controls, optionally a Share button, tab bar, toolbar, and ornaments, with dynamic scale by default. A volume's close button and window bar turn to face the viewer.
</platform_considerations>

<anti_patterns>
- Avoid opening new windows as default behavior.
- Avoid custom window frames or controls, or replicating the system look.
- Avoid critical information or actions in a macOS bottom bar (Finder's status bar shows only counts and free space); use an inspector on the trailing side of a split view for more.
- Avoid removing the visionOS glass background, oversized empty windows, unbounded sizes, or deep 3D content in a window.
- Avoid a volume ornament on a toolbar or tab bar edge, or more than one additional ornament.
</anti_patterns>
</topic>

<decision_guide>
**Navigation model to component**

| Structure | Component | Notes |
|---|---|---|
| Flat: a few peer sections used often | Tab bar | iOS bottom on Liquid Glass; iPadOS near top; visionOS vertical leading. Few tabs, single-word labels, no actions. |
| Flat but many sections of varying frequency | Adaptable tab bar (`sidebarAdaptable`) | Tab bar first; converts to a sidebar for less-frequent areas; iPadOS default of five or fewer. |
| Hierarchical, up to two levels of areas and collections | Sidebar (`NavigationSplitView`) | Needs space; disclosure controls; customizable; hideable but never hidden by default. |
| Hierarchical, deeper than two levels | Split view with a content list column | visionOS: a sidebar inside a tab that never changes the tab. |
| Content-driven: an ordered list of peer pages | Page control over a paged scroll view | About 10 pages or fewer; beyond that, a grid. watchOS: vertical tab views paged by the Digital Crown. |
| File-system location (macOS) | Path control in the window body | Not in toolbars or status bars. |
| Multi-item entry such as recipients (macOS) | Token field | Comma or Return converts; add a context menu. |

**Placing search:** use the placement table under Search fields. Discovery wants a standard search tab, speed wants the button appearance (2026), and iPad and Mac default to the trailing toolbar edge.

**Modal presentation ladder (least to most disruptive)**
- Popover: a little information or a few related tasks anchored to a control; regular widths only; never a warning.
- Action sheet: choices arising from an action just taken; destructive on top, Cancel at the bottom, no scrolling.
- Alert: unexpected critical information or confirming an uncommon irreversible action; up to three buttons; never information alone.
- Sheet: a scoped task tied to the current context; one at a time; Done paired with Cancel or Back; iPhone medium detent for progressive disclosure. Supplementary tools while the main task continues: nonmodal sheet (iOS, iPadOS), panel (macOS), split view (visionOS).
- Full-screen modal (iOS, iPadOS): complex or prolonged flows, media, camera, multistep editing.
- New window (macOS, iPadOS) or Full Space (visionOS): a self-contained task such as composing or editing a document, or immersive content.

**When a sidebar should collapse to a tab bar:** space is limited or content deserves more of the screen; a `sidebarAdaptable` tab bar shows the tab bar in narrow widths and adapts automatically to rotation and resizing. Start with the tab bar and let people switch; if the sidebar is the only navigation, never hide it by default. macOS: consider auto-collapsing the sidebar as the window shrinks (Mail viewer), keeping a show/hide control or View menu commands.
</decision_guide>

<quick_checklist>
- [ ] Tab bar holds only navigation, with labels, no disabled or hidden tabs, no More overflow?
- [ ] Sidebar limited to two levels, hideable by platform gesture or menu, never hidden by default, icons following the accent color?
- [ ] Search placed by intent: standard or button-appearance tab, bottom or top toolbar, inline, or trailing toolbar on iPad and Mac?
- [ ] Each alert has a specific title under two lines, verb-titled buttons, Cancel when destructive, and no Cancel as default?
- [ ] Choices arising from a user action use an action sheet, not an alert or menu, with destructive buttons on top?
- [ ] Every popover is small, arrow-anchored, one at a time, and replaced by a sheet in compact widths?
- [ ] Every sheet pairs Done with Cancel or Back (not all three), one at a time, with swipe-to-dismiss and a grabber when resizable?
- [ ] Complex or long flows use a full-screen modal, new window, or Full Space instead of a sheet?
- [ ] Scroll edge effect only where a scroll view sits behind floating elements, one per pane, automatic style unless tested?
- [ ] No same-orientation nested scroll views, and no scroll indicator on a page control's axis?
- [ ] Page control shows about 10 pages or fewer, centered at the bottom, at most two indicator images, no custom colors?
- [ ] Windows never open by default, use system frames and controls, say window not scene, and on visionOS keep glass, set min and max sizes, and use a volume for deep 3D?
</quick_checklist>
