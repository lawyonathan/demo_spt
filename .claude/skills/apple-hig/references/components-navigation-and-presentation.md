<overview>
Navigation, search, and presentation components. Distills path-controls, search-fields, sidebars, tab-bars, token-fields (navigation and search) and action-sheets, alerts, page-controls, panels, popovers, scroll-views, sheets, windows (presentation).
Load when structuring an app (tab bar vs sidebar vs split view vs pages), placing search, choosing a modal presentation (alert, action sheet, popover, sheet, panel, full screen, new window), separating floating bars from scrolling content, or sizing windows and volumes on iPadOS, macOS, and visionOS.
Search as a tab, the adaptable sidebar, sidebar icon colors, scroll edge effects, and sheet button placement changed in 2025-2026 and are marked inline.
</overview>

<topic name="Path controls" source="https://developer.apple.com/design/human-interface-guidelines/path-controls" updated="undated">
A path control shows the file system path of a selected file or folder (Finder's View > Show Path Bar shows the selected item, or the window's folder when nothing is selected). It belongs in the window body.

<when_to_use>
- **Standard:** a linear list of root disk, parent folders, and selected item, each with icon and name; hides middle names when too long. If editable, dragging an item onto it selects that item and shows its path.
- **Pop up:** like a pop-up button showing the selected item's icon and name; clicking opens a menu of root disk, parent folders, and item. If editable, the menu adds a Choose command and the control accepts dragged items.
</when_to_use>

<best_practices>
- **Use a path control in the window body, not the window frame.** Not for toolbars or status bars; Finder's path bar sits at the bottom of the body, not in the status bar. `NSPathControl`.
</best_practices>

<platform_considerations>
- **macOS only.** Not supported in iOS, iPadOS, tvOS, visionOS, or watchOS.
</platform_considerations>
</topic>

<topic name="Search fields" source="https://developer.apple.com/design/human-interface-guidelines/search-fields" updated="2026-06-08">
An editable text field with a Search icon, Clear button, and placeholder text, optionally narrowed by a scope bar and tokens. Where the entry point lives depends on platform, layout, content, and navigation.

<when_to_use>
| Placement | Use when |
|---|---|
| iOS search tab, standard style (2026) | You want a landing page with suggestions, discovery, and exploration (Apple TV's genres and categories). Tapping opens a page with the field at top. |
| iOS search tab, button appearance (2026) | People need to find something fast. Tapping focuses the field and raises the keyboard; exiting returns to the previous tab. |
| iOS bottom toolbar (2025) | Search is a priority and there is room, as an expanded field or a button (Settings: only item; Mail and Notes: beside other controls). Tapping animates it into a field above the keyboard. |
| iOS top toolbar (navigation bar) | Bottom content must stay uncovered (Wallet's pass stack) or there is no bottom toolbar. Animates into a field above the keyboard, or at the top if there is no room below. |
| iOS inline field | Position beside content strengthens scope, you filter a single view, the app has several search fields, or location defines scope (Music's library filter while main search is a tab). Place it above the list it searches and consider pinning it to the top toolbar on scroll. |
| iPadOS, macOS trailing toolbar edge (2025) | The common default, especially split views searching several columns (Mail, Notes, Voice Memos) or results shown in the detail view (Freeform). |
| iPadOS, macOS top of sidebar | Filtering the sidebar's navigation or content, even levels deep (Settings), with a clear separation from the detail view. |
| iPadOS, macOS sidebar or tab bar item | A dedicated discovery area with rich suggestions, categories, and recents (Music, TV); keeps search always available. |
</when_to_use>

<best_practices>
- **Use placeholder text to help people know what they can search for.** Reinforce scope or teach what content search reaches.
- **If possible, start search immediately when a person types.**
- **Consider showing suggested search terms.** Recent searches before typing, predictive suggestions while typing.
- **Simplify search results.** Most relevant first; consider categorizing.
- **Consider letting people filter search results.** For example a scope bar in the results area.
- **Use a scope bar to filter among clearly defined search categories (2025).** Mail on iPhone narrows from the whole mailbox to the current one.
- **Default to a broader scope and let people refine it as they need.**
- **Use tokens to filter by common search terms or items (2025).** A token is a selectable, editable term that filters further terms (a contact in Mail, photos in Messages). macOS equivalent: token fields.
- **Consider pairing tokens with search suggestions.** People may not know which tokens exist.
- **In a dedicated search area, consider immediately focusing the field.** Except on iPad with only a virtual keyboard, where it would cover the view.
- **Account for window resizing with the placement of the search field.** The iPad field resizes fluidly like on Mac; in compact views keep search where it is contextually useful (Notes and Mail put it above the content list column). Keep iPad and Mac consistent. `searchable(text:placement:prompt:)`, `UISearchBar`, `UISearchTextField`, `NSSearchField`.
</best_practices>

<platform_considerations>
- **iOS:** entry points are a tab (at the trailing end of the tab bar), a bottom or top toolbar, or an inline field, per the table.
- **tvOS:** a search screen is a keyboard screen with results beneath it (`UISearchController`). Provide popular, context-specific, and recent suggestions; people avoid typing.
- **watchOS:** tapping the field opens a full-screen text-input control; the app returns to the field only after Cancel or Search.
- **visionOS:** no additional considerations.
</platform_considerations>
</topic>

<topic name="Sidebars" source="https://developer.apple.com/design/human-interface-guidelines/sidebars" updated="2026-06-08">
A sidebar on the leading side navigates between app areas or top-level collections (folders, playlists). It needs a lot of vertical and horizontal space; when space is limited, a tab bar, or a tab bar style that converts to a sidebar, navigates better.

<when_to_use>
- Consider a tab bar first (iOS, iPadOS); expose less-frequent areas through the tab bar's convertible sidebar appearance.
- Hierarchy deeper than two levels: a split view with a content list between sidebar and detail.
- Sidebar with no tab bar conversion: `NavigationSplitView` or `UISplitViewController`.
</when_to_use>

<best_practices>
- **Extend visually rich content beneath the sidebar (2025).** In iOS, iPadOS, and macOS sidebars float in the Liquid Glass layer; let content scroll horizontally beneath, or apply a background extension effect that mirrors adjacent content (`backgroundExtensionEffect()`).
- **When possible, let people customize the contents of a sidebar.** People choose which areas matter and their order.
- **Group hierarchy with disclosure controls if your app has a lot of content.**
- **Consider using familiar symbols to represent items in the sidebar.** SF Symbols; a custom symbol over a bitmap.
- **Consider letting people hide the sidebar.** iPadOS edge swipe; macOS show/hide button or Show Sidebar and Hide Sidebar in the View menu; visionOS windows expand to fit a sidebar, so hiding is rare.
- **In general, show no more than two levels of hierarchy in a sidebar.**
- **If you need two levels, use succinct, descriptive labels to title each group.** Omit unnecessary words.
- **Make sure any sidebar icon colors you choose serve a clear purpose (2026).** Icons default to the app accent color; in macOS people can change the system accent color and expect every sidebar icon to follow. Sparingly used fixed colors can clarify meaning or draw attention (Mail's yellow VIP icon).
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** the `sidebarAdaptable` tab view style (clarified 2026) lets you choose whether a sidebar or tab bar shows at launch; both include a switch button, and it adapts to platform, rotation, and window resizing. Without SwiftUI: `UICollectionLayoutListConfiguration.Appearance.sidebar`.
- **macOS:** row height, text, and glyph size follow the sidebar size (small, medium, large), set programmatically or by people in General settings. Consider automatically hiding and revealing the sidebar when the window resizes (Mail viewer).
- **visionOS:** for deep hierarchy, a sidebar inside a tab bar tab gives secondary navigation; prevent sidebar selections from changing the tab.
- **tvOS:** none. **watchOS:** not supported.
</platform_considerations>

<anti_patterns>
- Avoid hiding the sidebar by default; it must stay discoverable.
- Avoid critical information or actions at the bottom of a macOS sidebar; window bottoms often get hidden.
</anti_patterns>
</topic>

<topic name="Tab bars" source="https://developer.apple.com/design/human-interface-guidelines/tab-bars" updated="2026-06-08">
A tab bar lets people navigate between an app's top-level sections while preserving each section's navigation state. Navigation only, never actions.

<when_to_use>
- A few frequently used sections (Clock: Alarm, Stopwatch, Timer).
- Controls that act on the current view: a toolbar.
- Complex structure: a sidebar, or a tab bar that adapts to a sidebar; a sidebar with no conversion uses `NavigationSplitView`, not a tab view.
</when_to_use>

<best_practices>
- **Use a tab bar to support navigation, not to provide actions.**
- **Make sure the tab bar is visible when people navigate to different sections.** Only a temporary, self-contained modal view may cover it.
- **Use the appropriate number of tabs required to help people navigate.** Fewer tabs are easier; weigh each addition against how often people need it.
- **Include tab labels to help with navigation.** Single words whenever possible.
- **Consider using SF Symbols for tab bar icons.** They adapt to compact (icon above label) and regular (side by side) bars; prefer filled symbols. Custom icon dimensions: Apple Design Resources.
- **Use a badge to indicate that critical information is available.** A red oval with a white number or exclamation point; reserve it so it keeps meaning.
</best_practices>

<platform_considerations>
- **iOS (2025):** floats above content at the bottom on a Liquid Glass background. With an attached accessory (Music's MiniPlayer) the tab bar can minimize and move the accessory inline on scroll down; tapping a tab or scrolling to the top restores it (`TabBarMinimizeBehavior`, `UITabBarController.MinimizeBehavior`). A dedicated search tab sits at the trailing end.
- **iPadOS:** near the top, fixed (`tabBarOnly`) or with a button that converts it to a sidebar (`sidebarAdaptable`). Prefer a tab bar for navigation and offer sidebar conversion for wider access. Let people customize tabs (Music: a favorite playlist), with a default list of five or fewer to preserve continuity between compact and regular sizes (`TabViewCustomization`, `UITab.Placement`).
- **tvOS:** customizable background tint, color, or image; fonts including a different one for the selected item; selected and unselected tints; button icons such as settings and search. Translucent with only the selected tab opaque; focus adds a drop shadow. Height 68 pt and top edge 46 pt from the screen top, both fixed. Overflow fades the rightmost item, plus a left fade once scrolling is needed. The bar scrolls offscreen for single-view tabs but stays pinned above a split view (TV Library, Settings); pressing Menu always returns focus to it. Live-viewing apps order tabs: Live content, Cloud DVR or other recorded content, Other content.
- **visionOS:** always vertical, fixed to the window's leading side; expands when looked at and may temporarily obscure content. Supply a symbol and a short text label per tab (symbol always visible, labels revealed on look). Deep hierarchy: a sidebar within a tab that never changes the tab.
- **macOS:** none. **watchOS:** not supported.
</platform_considerations>

<anti_patterns>
- Avoid overflow tabs; in iOS and iPadOS the trailing tab becomes a More tab that hides content.
- Don't disable or hide tab bar buttons when content is unavailable; explain why a section is empty.
- Avoid a similar color for tab labels and content layer backgrounds (2025); with colorful content prefer a monochromatic tab bar or a clearly differentiated accent (Liquid Glass color).
- Don't hide the tab bar while navigating sections.
</anti_patterns>
</topic>

<topic name="Token fields" source="https://developer.apple.com/design/human-interface-guidelines/token-fields" updated="undated">
A macOS text field that converts typed text into tokens people can select, reorder by dragging, or move between fields (Mail's address fields). It can suggest completions while typing and give each token a contextual menu (edit name, mark VIP, view contact card).

<best_practices>
- **Add value with a context menu.** Extra options or information per token.
- **Consider providing additional ways to convert text into tokens.** A comma creates a token by default; add shortcuts such as Return.
- **Consider customizing the delay before showing suggested tokens.** Suggestions appear immediately by default, which can distract. Tokens as search terms: see Search fields. `NSTokenField`.
</best_practices>

<platform_considerations>
- **macOS only.** Not supported in iOS, iPadOS, tvOS, visionOS, and watchOS.
</platform_considerations>
</topic>

<topic name="Action sheets" source="https://developer.apple.com/design/human-interface-guidelines/action-sheets" updated="undated">
A modal view presenting choices related to an action people just initiated. SwiftUI: a confirmation dialog presentation modifier on all platforms; UIKit: `UIAlertController.Style.actionSheet` in iOS, iPadOS, and tvOS.

<when_to_use>
- Use an action sheet, not an alert, for choices tied to an intentional action (canceling a Mail draft: delete or save). An alert only confirms or cancels and is usually unexpected.
- Use an action sheet, not a menu, when choices follow an action; people expect a menu only when they choose to reveal it (iOS, iPadOS).
</when_to_use>

<best_practices>
- **Use action sheets sparingly.** They interrupt the current task.
- **Aim to keep titles short enough to display on a single line.** Long titles truncate or force scrolling.
- **Provide a message only if necessary.** Title plus context usually suffices.
- **If necessary, provide a Cancel button that lets people reject an action that might destroy data.** At the bottom of the sheet (upper-left corner in watchOS); a SwiftUI confirmation dialog includes it by default.
- **Make destructive choices visually prominent.** Destructive style (`ButtonRole.destructive`, `UIAlertAction.Style.destructive`) placed at the top where it is most noticeable.
</best_practices>

<platform_considerations>
- **watchOS:** title, optional message, Cancel, and one or more buttons styled Default (no special meaning), Destructive (destroys data or performs a destructive action), or Cancel (dismisses without acting).
- **macOS, tvOS:** none. **visionOS:** not supported.
</platform_considerations>

<anti_patterns>
- Avoid letting an action sheet scroll (iOS, iPadOS); more buttons cost effort and scrolling invites accidental taps.
- Avoid more than four buttons including Cancel in watchOS, so no more than three additional choices.
</anti_patterns>
</topic>

<topic name="Alerts" source="https://developer.apple.com/design/human-interface-guidelines/alerts" updated="2024-02-02">
An alert gives people critical information they need right away: a problem, a warning that an action may destroy data, or confirmation of a purchase or other important action they initiated. A modal view with a title, optional informative text, and up to three buttons.

<when_to_use>
- Use for unexpected, actionable information or to confirm an uncommon destructive action people cannot undo.
- Choices related to an intentional action: an action sheet instead (iOS, iPadOS; canceling a Mail draft offers delete edits or draft, save draft, return to editing).
- Purely informative situations: an in-context indicator (Mail's server-unavailable indicator).
- Extras: a text field (iOS, iPadOS, macOS, visionOS); an icon and accessory view (macOS, visionOS); a suppression checkbox and Help button (macOS).
</when_to_use>

<best_practices>
- **Use alerts sparingly.** Each offers only essential information and useful actions.
- **In all alert copy, be direct, and use a neutral, approachable tone.** Not oblique, accusatory, or masking severity.
- **Write a title that clearly and succinctly describes the situation.** What happened, in what context, and why. A complete sentence uses sentence-style capitalization and ending punctuation; a fragment uses title-style capitalization and no ending punctuation.
- **Include informative text only if it adds value.** Short, complete sentences, sentence-style capitalization, appropriate punctuation.
- **If supported, include a text field only if you need people's input to resolve the situation.** For example a secure text field for a password.
- **Create succinct, logical button titles.** One or two words naming the result; verbs tied to the alert text ("View All", "Reply", "Ignore"). "OK" only in informational alerts. Always "Cancel" for a canceling button. Title-style capitalization, no ending punctuation.
- **Place buttons where people expect.** The most likely choice on the trailing side of a row or top of a stack; the default button always trailing or top; Cancel typically leading in a row or bottom in a stack.
- **Use the destructive style for a button that performs a destructive action people didn't deliberately choose.** A deliberately chosen Empty Trash keeps the plain style so Return can confirm it.
- **If there's a destructive action, include a Cancel button.** To make people read the alert rather than press Return, avoid making any button the default. A single-button alert whose button is the default uses Done, not Cancel.
- **Provide alternative ways to cancel an alert.** Exit to the Home Screen (iOS, iPadOS); Escape or Command-Period on an attached keyboard (iOS, iPadOS, macOS, visionOS); Menu on the remote (tvOS). `alert(_:isPresented:actions:)`, `UIAlertController`, `NSAlert`.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** keep titles short and messages brief so the alert does not scroll at large text sizes.
- **macOS:** shows the app icon by default (an alternative icon or symbol is allowed); supports repeating alerts with suppression, an `accessoryView`, and a Help button that opens your help.
- **visionOS:** in the Shared Space the alert appears in front of the window, slightly forward on the z-axis, and stays anchored if the window moves; in a Full Space it is centered in the field of view. Accessory view: maximum height 154 pt, 16-pt corner radius.
- **tvOS, watchOS:** none.
</platform_considerations>

<anti_patterns>
- Avoid an alert merely to provide information.
- Avoid alerts for common, undoable actions even when destructive (deleting an email or file); alert only for uncommon actions people can't undo.
- Avoid an alert when the app starts; make the information discoverable, or show cached or placeholder data plus a nonintrusive label for a startup problem.
- Avoid titles like "Error" or "Error 329347 occurred", and titles wrapping to more than two lines.
- Avoid explaining alert buttons; if unavoidable, say choose and use the exact title without quotes.
- Avoid "OK" as the default button title unless purely informational; prefer "Erase", "Convert", "Clear", "Delete". Avoid "Yes" and "No".
- Never make Cancel the default button.
- Avoid a scrolling alert (iOS, iPadOS).
- Use the macOS caution symbol (`exclamationmark.triangle`) sparingly: only for unexpected data loss, never for tasks meant to overwrite or remove data such as save or empty trash.
</anti_patterns>
</topic>

<topic name="Page controls" source="https://developer.apple.com/design/human-interface-guidelines/page-controls" updated="2023-06-21">
A row of equidistant indicator dots, one per page in a flat ordered list, with a solid dot for the current page; dots clip when too many fit. Handles any number of pages, including user-created lists.

<when_to_use>
- Movement between an ordered list of peer pages.
- Hierarchical or nonsequential relationships: a sidebar or split view.
- More than about 10 peer pages: a grid or another any-order arrangement.
</when_to_use>

<best_practices>
- **Use page controls to represent movement between an ordered list of pages.**
- **Center a page control at the bottom of the view or window.** People always know where to find it.
- **Make sure custom indicator images are simple and clear.** Simple SF Symbols work well. `preferredIndicatorImage`, `setIndicatorImage(_:forPage:)`.
- **Customize the default indicator image only when it enhances the page control's overall meaning.** `bookmark.fill` when every page holds bookmarks; Weather marks only the current-location page with `location.fill`.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** highlights the current indicator and shrinks indicators at both ends when more exist than fit. Tapping the leading or trailing side of the current dot goes to the previous or next page (iPadOS pointer can target a dot); scrubbing (touch and drag) steps through pages, and past an edge jumps to first or last. Background styles (`backgroundStyle`): Automatic shows the translucent rounded background only during interaction, for controls that are not the primary navigation; Prominent always shows it, only for the primary navigation control; Minimal never shows it, for position only.
- **tvOS:** use on collections of full-screen peer pages; extra controls make focus hard to maintain.
- **visionOS:** indicates pages only; people do not interact with it.
- **watchOS:** at the bottom for horizontal pagination, or beside the Digital Crown for a vertical tab view, showing position within the page and within the set. Use vertical pagination to separate views into distinct, purposeful pages; it beats horizontal pagination and deep hierarchy. Limit each page to a single screen height where possible and place variable-height pages after fixed-height ones.
- **macOS:** not supported. `PageTabViewStyle`, `UIPageControl`.
</platform_considerations>

<anti_patterns>
- Don't display more than about 10 dots; they are hard to count at a glance.
- Avoid complex shapes, negative space, text, or inner lines in indicator images.
- Avoid more than two different indicator images; people must memorize each meaning.
- Avoid coloring indicators; system color keeps the current-page contrast.
- Avoid animating page transitions during scrubbing; animate taps only.
- Avoid supporting the scrubber with the minimal background style; it gives no feedback.
</anti_patterns>
</topic>

<topic name="Panels" source="https://developer.apple.com/design/human-interface-guidelines/panels" updated="undated">
A macOS panel floats above other windows with supplementary controls, options, or information for the active window or selection; it looks less prominent than a main window and can use a dark, translucent HUD style. On other platforms use a modal view.

<when_to_use>
- Quick access to controls or settings for the selected item.
- Inspector (contents follow the selection): a panel or a split view pane. Info window (contents never change): a regular window.
- Repeated input-and-observe cycles such as find and replace: a panel, not a sheet.
- HUD only in a media-oriented app (movies, photos, slides), when a standard panel would obscure essential content, or when no controls are needed (only the disclosure triangle matches a HUD).
</when_to_use>

<best_practices>
- **Prefer simple adjustment controls in a panel.** Sliders and steppers over typing or selecting items.
- **Write a brief title that describes the panel's purpose.** A noun or noun phrase in title-style capitalization ("Fonts", "Colors", "Inspector"); the title bar lets people position it.
- **Show and hide panels appropriately.** App becomes active: bring all open panels forward; app inactive: hide them all.
- **Refer to panels by title in your interface and help.** Menus: "Show Fonts", "Show Colors", "Show Inspector" without the word panel; help: the title, or title plus window ("Fonts window").
- **Prefer standard panels.** A HUD without reason distracts and may not match the appearance setting.
- **Maintain one panel style when your app switches modes.** Keep a HUD when leaving full screen if you used it there.
- **Use color sparingly in HUDs.** Small amounts of high-contrast color only.
- **Keep HUDs small.** Never obscure or compete with the content they adjust. `NSPanel`, `hudWindow`.
</best_practices>

<platform_considerations>
- **macOS only.** Not supported in iOS, iPadOS, tvOS, visionOS, or watchOS.
</platform_considerations>

<anti_patterns>
- Avoid including panels in the Window menu's documents list (show and hide commands are fine).
- Avoid making a panel's minimize button available.
</anti_patterns>
</topic>

<topic name="Popovers" source="https://developer.apple.com/design/human-interface-guidelines/popovers" updated="undated">
A transient view that appears above content when people click or tap a control or interactive area, points at its source, and closes after interaction or an outside click or tap.

<when_to_use>
- A small amount of information or a few related tasks (changing a calendar event's date, time, or calendar).
- Temporary room for content that would otherwise need a sidebar or panel.
- Regular widths only; in compact views use all the screen with a full-screen modal such as a sheet.
</when_to_use>

<best_practices>
- **Use a popover to expose a small amount of information or functionality.**
- **Position popovers appropriately.** The arrow points as directly as possible at the revealing element without covering it or essential content.
- **Use a Close button for confirmation and guidance only.** Cancel or Done when it clarifies saving; otherwise an outside tap or a selection closes it. With multiple selections, stay open until explicit dismissal or an outside tap.
- **Always save work when automatically closing a nonmodal popover.** Discard only on an explicit Cancel.
- **Show one popover at a time.** Close the open one before showing another.
- **Let people close one popover and open another with a single click or tap.** Especially when several bar buttons each open one.
- **Provide a smooth transition when changing the size of a popover.** Animate condensed-to-expanded changes. `popover(isPresented:attachmentAnchor:arrowEdge:content:)`, `UIPopoverPresentationController`, `NSPopover`.
</best_practices>

<platform_considerations>
- **macOS:** a popover can be detachable, becoming a panel when dragged. Consider allowing it, and keep the detached version's appearance nearly identical.
- **visionOS:** none. **tvOS, watchOS:** not supported.
</platform_considerations>

<anti_patterns>
- Never show a cascade or hierarchy of popovers.
- Don't show any view except an alert over a popover.
- Avoid making a popover too big; the system may resize it to fit.
- Avoid popovers in compact views (iOS, iPadOS).
- Avoid a popover for a warning; people miss or dismiss it, so use an alert.
- Avoid the word popover in help documentation; name the task or control.
</anti_patterns>
</topic>

<topic name="Scroll views" source="https://developer.apple.com/design/human-interface-guidelines/scroll-views" updated="2026-06-08">
A scroll view shows content larger than its bounds by moving it vertically or horizontally. Its only visible part is a translucent scroll indicator that appears after scrolling starts and, in iOS, iPadOS, macOS, visionOS, and watchOS, shows whether content is near the beginning, middle, or end.

<best_practices>
- **Support default scrolling gestures and keyboard shortcuts.** Custom scrolling keeps the elastic behavior people expect.
- **Make it apparent when content is scrollable.** Show partial content at the edge.
- **Consider supporting page-by-page scrolling if it makes sense for your content.** A page is typically the view's height or width; subtract an overlap unit (a line of text, a row of glyphs, part of a picture) to keep context. `PagingScrollTargetBehavior`.
- **In some cases, scroll automatically to help people find their place.** When an operation selects content or places the insertion point offscreen (a search hit), when people start typing at a hidden insertion point, when the pointer passes the view edge during selection, or when people scroll away from a selection before acting on it. Scroll only as much as necessary.
- **If you support zoom, set appropriate maximum and minimum scale values.**
- **Prefer the automatic scroll edge effect style (2025, updated 2026).** In iOS, iPadOS, and macOS a scroll edge effect separates floating elements such as toolbars from scrolling content; automatic gives a more opaque separation for top toolbars with many controls, text outside Liquid Glass controls, and pinned table headers. Custom bars may need it added manually or its style changed to hard or soft; test soft thoroughly for legibility. `ScrollEdgeEffectStyle`, `UIScrollEdgeEffect.Style`, `NSScrollEdgeEffectStyle`.
- **Only use a scroll edge effect when a scroll view is behind floating interface elements (2026).** It is not decorative and does not block or darken like an overlay.
- **Apply one scroll edge effect per view (2026).** Each iPad or Mac split view pane may have its own; keep their heights consistent for alignment.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** consider a page control in page-by-page mode (Weather's saved locations); do not show a scroll indicator on the same axis.
- **macOS:** the indicator is a scroll bar; use small or mini scroll bars in a panel when space is tight, sizing all its controls the same.
- **tvOS:** views scroll without indicators; the system scrolls to keep focused items visible.
- **visionOS:** the indicator is small and fixed size, vertically centered at the trailing edge for vertical scrolling or horizontally centered at the bottom edge for horizontal, appearing on swipe. Looking at it and dragging enables a jog bar with tick marks that controls scrolling speed. It is a little thicker than in iOS, so widen tight margins. Look to Scroll (2026): people scroll with their eyes by looking near the top and bottom (vertical) or the sides (horizontal); it coexists with gestures, is off by default, and is enabled per scroll view (`ScrollInputKind`, `look`). Support it in reading and browsing views, keep it consistent across similar views, and give scroll areas the full window width or height, or clear boundaries when inset.
- **watchOS:** prefer vertically scrolling content via the Digital Crown. Use tab views for page-by-page scrolling; stacked vertically, the crown moves through full-screen pages with a page indicator beside it showing position within the page and set. Limit pages to a single screen height where possible; the indicator expands into a scroll indicator for long pages, so place variable-height pages after fixed-height ones. `ScrollView`, `UIScrollView`, `NSScrollView`, `WKPageOrientation`.
</platform_considerations>

<anti_patterns>
- Avoid a scroll view inside another with the same orientation; perpendicular nesting is fine.
- Avoid a scroll indicator on the same axis as a page control.
- Avoid Look to Scroll for secondary or control-dense content (Notes: main view yes, notes list no), and remove custom scroll-position effects such as parallax before adopting it.
</anti_patterns>
</topic>

<topic name="Sheets" source="https://developer.apple.com/design/human-interface-guidelines/sheets" updated="2026-03-24">
A sheet helps people perform a scoped task closely related to the current context (supplying information, attaching a file, choosing a save location) before returning to the parent view. Always modal in macOS, tvOS, visionOS, and watchOS; modal or nonmodal in iOS and iPadOS (Notes' format sheet keeps the note editable).

<when_to_use>
- Simple self-contained tasks or requests for specific information.
- Complex or prolonged flows: iOS and iPadOS full-screen modal (`UIModalPresentationStyle.fullScreen`) for video, photos, camera, or multistep editing; macOS a new window or full-screen mode; visionOS a Full Space.
- Supplementary items that affect the ongoing main task: a nonmodal sheet (iOS, iPadOS), a panel (macOS), a split view (visionOS).
- macOS repeated input with observed results (find and replace): a panel.
- watchOS: only when a modal task needs a custom title or content presentation; otherwise an alert or action sheet.
</when_to_use>

<best_practices>
- **Display only one sheet at a time from the main interface.** Close the first before showing a second; re-show it afterward if needed.
- **Provide an alternative to the Done button (2026).** Pair Done with Cancel (dismiss without saving) or Back (previous step). Cancel or Close dismisses without saving; Done dismisses after completing or explicitly saving; Back navigates and never dismisses.
- **In an iPhone app, consider supporting the medium detent to allow progressive disclosure.** A share sheet shows the most relevant items at medium; Messages and Mail compose sheets use only full height.
- **Include a grabber in a resizable sheet.** It signals resizing, cycles detents on tap, and works with VoiceOver (`prefersGrabberVisible`).
- **Support swiping to dismiss a sheet.** With unsaved changes, confirm through an action sheet.
- **Prefer the page or form sheet presentation styles in an iPadOS app.** Default sizes centered on a dimmed background (`UIModalPresentationStyle`).
- **Present a macOS sheet in a reasonable default size.** Support resizing where a clearer view helps.
- **Let people interact with other macOS app windows without first dismissing a sheet.** Opening a sheet brings its parent (and a document's modeless panels) forward, but other windows stay reachable.
- **Keep watchOS sheet interactions brief and occasional.** A temporary interruption for an important task. `sheet(item:onDismiss:content:)`, `UISheetPresentationController`, `presentAsSheet(_:)`.
</best_practices>

<platform_considerations>
- **iOS, iPadOS (button placement 2026):** single view: Cancel on the leading edge of the top toolbar, Done on the trailing edge. Multi-step: the first step shows Cancel leading and an inactive Done trailing; later steps replace Cancel with Back; the final step activates Done. A resizable sheet expands on scroll or by dragging the grabber at its top edge. Detents (designed for iPhone): large is fully expanded, medium about half; custom values allowed. Large is automatic; adding medium rests at both; specifying only medium prevents full height (`detents`).
- **macOS:** a cardlike rounded view over its dimmed parent window; people expect other app windows to stay usable.
- **visionOS:** floats in front of the dimmed parent and takes interaction; center it in the field of view, use a default size that retains context, and consider allowing resizing.
- **watchOS:** a full-screen semitransparent view over blurred, desaturated content. If you change the default label, prefer SF Symbols.
- **tvOS:** none.
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
A window presents an app's views, defines its content boundary, and enables multitasking in iPadOS, macOS, and visionOS. A primary window holds main navigation and content; an auxiliary window serves one task or area, allows no navigation elsewhere, and usually has a close button.

<when_to_use>
- A new window when it helps people multitask or preserve context (Mail's Compose beside the open message), or as an optional context menu or File menu command (`OpenWindowAction`).
- visionOS: a window for a familiar, UI-centric interface; a volume for rich or bounded 3D content viewed from any angle (a game board).
</when_to_use>

<best_practices>
- **Make sure your windows adapt fluidly to different sizes (2025).** Multitasking and multiwindow workflows depend on it.
- **Choose the right moment to open a new window (2025).** Excess windows clutter and confuse.
- **Consider providing the option to view content in a new window (2025).**
- **Use the term window in user-facing content (2025).** Never scene, which names the implementation.
- **iPadOS: make sure window controls don't overlap toolbar items (2025).** Controls appear at the toolbar's leading edge when windowed; move leading buttons inward when they appear.
- **iPadOS: consider letting people use a gesture to open content in a new window.** Pinch a Notes item; `UIWindowScene.ActivationInteraction`. A single-file view can use `QLPreviewSceneActivationConfiguration`, but the app must support multiple windows.
- **macOS: make sure custom windows use the system-defined appearances.** State changes must update backgrounds and buttons.
- **visionOS: retain the window's glass background.** Removing it hurts legibility and cohesion; an opaque background feels constricting and heavy.
- **visionOS: choose an initial window size that minimizes empty areas.** Default 1280x720 pt, placed about two meters in front of the wearer with an apparent width of about three meters. Shape it for the content (Keynote wide, Safari tall; a tower-building game taller than a driving game), and set a minimum and maximum size so UI never overlaps or becomes unusable.
- **visionOS: minimize the depth of 3D content you display in a window.** Content extending too far is clipped; use a volume for depth.
- **visionOS volumes: prefer a volume for rich 3D content and place 2D content so it looks good from multiple angles.** Pin 2D content with attachments. Use dynamic scaling in general; fixed scaling (the default) for real-world-size objects such as retail products. In visionOS 2 and later the baseplate glows when looked at to reveal edges and the resize control; skip it for full-bleed content or a custom baseplate. A volume may add one ornament anchored such as `topBack` or `bottomFront` that stays put relative to the viewer. Choose alignment: parallel to the floor for low-interaction content, tilting with the viewer's gaze for use while reclining. `WindowGroup`, `UIWindow`, `NSWindow`.
</best_practices>

<platform_considerations>
- **iPadOS (2025):** full screen (windows fill the screen; switch via the app switcher) or windowed (free resizing, several windows onscreen, repositioning; size and placement remembered across launches) per Multitasking & Gestures settings.
- **macOS:** a frame (window controls, toolbar, rarely a bottom bar) above a body; drag the frame to move, edges to resize. States: Main (frontmost; one per app), Key (accepts input; one onscreen; may be a floating panel; clicking a Dock icon makes only the most recent window key), Inactive. The key window colors its close, minimize, and zoom controls; others show gray, and inactive windows lose vibrancy. Panels like Colors and Fonts become key only on a title bar click or keyboard input such as a text field.
- **visionOS:** default (window), volumetric (volume), and plain (`PlainWindowStyle`, no glass) styles, all usable in the Shared Space and a Full Space; the system places the first window. A window is an upright glass plane with close button, window bar, and resize controls, optionally a Share button, tab bar, toolbar, and ornaments, using dynamic scale by default. A volume has the same controls, but its close button and window bar turn to face the viewer.
- **iOS, tvOS, watchOS:** not supported.
</platform_considerations>

<anti_patterns>
- Avoid opening new windows as default behavior.
- Avoid custom window frames or controls, or replicating the system look.
- Avoid critical information or actions in a macOS bottom bar (Finder's status bar shows only item counts and free space); use an inspector on the trailing side of a split view for more.
- Avoid removing the visionOS glass background, oversized empty windows, unbounded window sizes, or deep 3D content in a window.
- Avoid a volume ornament on the same edge as a toolbar or tab bar, or more than one additional ornament.
</anti_patterns>
</topic>

<decision_guide>
**Navigation model to component**

| Structure | Component | Notes |
|---|---|---|
| Flat: a few peer sections used often | Tab bar | iOS floats at the bottom on Liquid Glass; iPadOS near the top; visionOS vertical on the leading edge. Few tabs, single-word labels, no actions. |
| Flat but many sections of varying frequency | Adaptable tab bar (`sidebarAdaptable`) | Tab bar first; converts to a sidebar for less-frequent areas; iPadOS default list of five or fewer. |
| Hierarchical: areas plus top-level collections, up to two levels | Sidebar (`NavigationSplitView`) | Needs lots of space; disclosure controls; customizable; hideable but never hidden by default. |
| Hierarchical, deeper than two levels | Split view with a content list column between sidebar and detail | visionOS alternative: a sidebar inside a tab that never changes the tab. |
| Content-driven: an ordered list of peer pages | Page control over a paged scroll view | About 10 pages or fewer; more than that, a grid. watchOS: vertical tab views paged by the Digital Crown. |
| File-system location (macOS) | Path control in the window body | Not in toolbars or status bars. |
| Multi-item entry such as recipients (macOS) | Token field | Comma or Return converts text; add a context menu. |

**Placing search**
- iOS discovery landing page with suggestions: search as a standard tab. Fast lookup that returns to the previous tab: search tab with button appearance (2026).
- iOS search is a priority and there is room: bottom toolbar. Bottom content must stay visible or there is no bottom toolbar: top toolbar.
- Filtering one view, or several search fields in one app: inline field above the list, pinned on scroll.
- iPadOS and macOS: trailing toolbar edge for split views and detail results; top of the sidebar to filter navigation; a sidebar or tab item for a dedicated discovery area.
- Filter clearly defined categories: a scope bar defaulting to broad. Filter by known items: tokens paired with suggestions.

**Modal presentation ladder (least to most disruptive)**
- Popover: a small amount of information or a few related tasks anchored to a control; regular widths only; never a warning.
- Action sheet: choices arising from an action the person just took; destructive on top, Cancel at the bottom, no scrolling.
- Alert: unexpected critical information or confirmation of an uncommon irreversible destructive action; up to three buttons; never information alone.
- Sheet: a scoped task related to the current context; one at a time; Done paired with Cancel or Back; iPhone medium detent for progressive disclosure. Supplementary tools while the main task continues: nonmodal sheet (iOS, iPadOS), panel (macOS), split view (visionOS).
- Full-screen modal (iOS, iPadOS): complex or prolonged flows, media, camera, multistep editing.
- New window (macOS, iPadOS) or Full Space (visionOS): a self-contained task such as composing or editing a document, or immersive content.

**When a sidebar should collapse to a tab bar**
- Space is limited or content deserves more of the screen: use a tab bar, or a `sidebarAdaptable` tab bar that shows the tab bar in narrow widths and adapts automatically to rotation and window resizing.
- Both are available: start with the tab bar and let people switch; if the sidebar is the only navigation, never hide it by default.
- macOS: consider automatically collapsing the sidebar when the window shrinks (Mail viewer), keeping a show/hide control or View menu commands.
</decision_guide>

<quick_checklist>
- [ ] Does the tab bar hold only navigation, with visible labels, no disabled or hidden tabs, and no More overflow?
- [ ] Is the sidebar limited to two hierarchy levels, customizable, hideable by platform gesture or menu, and never hidden by default?
- [ ] Do sidebar icons follow the accent color (including the user-chosen macOS accent) unless a fixed color has a clear purpose?
- [ ] Is search placed by intent: standard or button-appearance tab, bottom or top toolbar, inline, or trailing toolbar or sidebar on iPad and Mac?
- [ ] Does each alert have a specific title under two lines, verb-titled buttons, a Cancel when destructive, and no Cancel as default?
- [ ] Are choices arising from a user action in an action sheet rather than an alert or menu, with destructive buttons on top?
- [ ] Is every popover small, arrow-anchored, shown one at a time, and replaced by a sheet in compact widths?
- [ ] Does every sheet pair Done with Cancel or Back (not all three), appear one at a time, and offer swipe-to-dismiss and a grabber when resizable?
- [ ] Are complex or long flows in a full-screen modal, new window, or Full Space instead of a sheet?
- [ ] Is a scroll edge effect used only where a scroll view sits behind floating elements, one per pane, automatic unless tested?
- [ ] Are same-orientation scroll views never nested, and is no scroll indicator shown on a page control's axis?
- [ ] Does a page control show about 10 pages or fewer, centered at the bottom, with at most two indicator images and no custom colors?
- [ ] Do windows avoid opening by default, use system frames and controls, and say window rather than scene?
- [ ] On visionOS, does each window keep its glass background, set min and max sizes, and use a volume for deep 3D content?
</quick_checklist>
