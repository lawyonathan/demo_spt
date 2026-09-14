<overview>
Menus and actions: how people trigger commands on Apple platforms. Distills the HIG pages activity-views, buttons, context-menus, dock-menus, edit-menus, home-screen-quick-actions, menus, ornaments, pop-up-buttons, pull-down-buttons, the-menu-bar, and toolbars. Load this file when designing or reviewing any button, menu, toolbar, share sheet, or command surface, when deciding where a command should live (menu bar, toolbar, context menu, edit menu, Dock menu, quick action), or when laying out macOS and iPadOS menu bar menus. Toggles, segmented controls, action sheets, and keyboard shortcuts are covered in other reference files.
</overview>

<topic name="Activity views (share sheet)" source="https://developer.apple.com/design/human-interface-guidelines/activity-views" updated="undated">
An activity view (share sheet) presents sharing activities, actions such as Copy and Print, and frequently used apps for the current context. People open it with the Share or Action button; it appears as a sheet or a popover depending on device and orientation. iOS, iPadOS, visionOS only; macOS has no activity view but supports share and action app extensions.

<best_practices>
- **Don't duplicate common actions the activity view already offers.** If app-specific functionality resembles a system action, give it a distinct title such as "Print Transaction."
- **Consider an SF Symbol for a custom activity.** Center a custom interface icon in an area of about 70x70 pixels.
- **Write a succinct verb or verb-phrase title for each custom action.** Long titles wrap and may truncate. A share activity shows its title (typically a company name) below its icon.
- **Keep activities appropriate to the context.** System tasks can't be reordered, but inapplicable ones (such as Print) can be excluded and custom tasks shown conditionally. App-specific actions list before multi-app and system actions; people can edit the list.
- **Use the Share button to display an activity view.**
- **Share and action extensions.** Share extensions send content to apps, social accounts, and services; action extensions run content-specific tasks (add a bookmark, copy a link, edit an inline image, translate text) without leaving the context. iOS and iPadOS show both in the share sheet; macOS reaches share extensions through a toolbar Share button or a context menu Share item, and action extensions by hovering embedded content, a toolbar button, or a Finder quick action.
- **Prefer the system composition view for a share extension; include the app name in an action extension.** A custom interface should echo the app's own elements.
- **Streamline and limit interaction** to a few steps, such as posting with a single tap.
- **Provide an image that communicates purpose.** A share extension uses the app icon automatically; give an action extension a symbol or icon that identifies the task.
- **Continue lengthy work in the background and show status in the main app.** The activity view dismisses as soon as the extension's task completes.
</best_practices>

<anti_patterns>
- Don't duplicate system actions such as Print with lookalike custom actions.
- Avoid company or product names in action titles.
- Avoid alternative ways to reveal the share sheet; use the Share button.
- Avoid placing a modal view above an extension (an alert may be acceptable; further modal views are not).
- Don't notify people simply because an extension's task completed.
</anti_patterns>
</topic>

<topic name="Buttons" source="https://developer.apple.com/design/human-interface-guidelines/buttons" updated="2025-12-16">
A button initiates an instantaneous action and combines style (size, color, shape), content (symbol or icon, text label, or both), and role (system-defined semantic meaning). Toggles, pop-up buttons, and segmented controls are related button-like components with their own behavior. (2025: updated for Liquid Glass.)

<best_practices>
- **Give every button a hit region of at least 44x44 pt, 60x60 pt in visionOS,** plus enough surrounding space to distinguish it, for fingertip, pointer, eyes, or remote.
- **Always include a press state for a custom button.**
- **Use a prominent style for the most likely action in a view;** the system applies the accent color to its background. Keep prominent buttons to one or two per view.
- **Use style, not size, to distinguish the preferred choice.** Same-size buttons read as one coherent set of options.
- **Avoid a similar color on button labels and content layer backgrounds (2025).** With bright, colorful content, prefer the default monochromatic label appearance (see Liquid Glass color).
- **Make each button's purpose clear** with a symbol, a text label, or both. macOS and visionOS show a tooltip on hover.
- **Pair familiar actions with familiar icons** (`square.and.arrow.up` means share); use SF Symbols and the Standard icons list.
- **Use text when a short label is clearer than an icon.** Title-style capitalization, verb-led where possible ("Add to Cart").
- **Roles:** Normal; Primary (the default button, uses the app accent color, responds to Return, and lets a sheet, editable view, or alert close on Return); Cancel; Destructive (system red).
- **Assign the primary role to the button people are most likely to choose.**
- **Never give the primary role to a destructive button, even when it is the likely choice.** People choose prominent buttons without reading them.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** When an action doesn't complete instantly, configure the button to show an activity indicator, optionally with an alternate label ("Checkout" to "Checking out…"); the indicator appears beside the label and hides the button image.
- **macOS, push buttons:** The standard type; text, symbol, icon, image, or text plus image; can be the default button and can be tinted. Use a flexible-height push button (`NSButton.BezelStyle.flexiblePush`) only for two lines of text or a tall icon; it shares the standard corner radius and padding. Append a trailing ellipsis when the button opens another window, view, or app. Consider spring loading (drag selected items over the button and force click on a Magic Trackpad).
- **macOS, square (gradient) buttons:** Symbols or icons only, never text; behave like push buttons, toggles, or pop-up buttons; sit within or beneath the view they affect, such as adding or removing table rows (`NSButton.BezelStyle.smallSquare`).
- **macOS, help buttons:** Circular, consistently sized, question mark; open the help topic for the current context, or the top level of the app's help. One per window, inside the view. Placement table in specs.
- **macOS, image buttons:** Image, symbol, or icon; behave like push, toggle, or pop-up buttons. Include about 10 pixels of padding between image and button edges, because the edges define the clickable area even when invisible; generally no system border (`isBordered`). A label, if any, goes below the button.
- **visionOS:** Buttons typically have a visible background and play sound on interaction (visionOS has no haptics, so use standard controls for their audible feedback). Shapes: `circle` for icon-only, `roundedRectangle` or `capsule` for text-only, capsule for icon plus text. States: idle, hover, selected, unavailable; no custom hover effects. A tooltip can appear after a brief gaze; text buttons rarely need one. Prefer a discernible background shape and fill except inside a toolbar, context menu, alert, or ornament: the thin material on a glass window, the glass material when floating in space. Prefer circular or capsule shapes (eyes drift to corners); a capsule for a standalone button, rounded rectangles in a vertical stack, capsules in a horizontal row. Keep button centers at least 60 pt apart; for buttons 60 pt or larger add 4 pt of padding so hover effects don't overlap.
- **watchOS:** All inline buttons are capsules with a contrasting material. Use a toolbar to place buttons in the corners; the system moves the time and title and applies Liquid Glass to toolbar buttons. Prefer full-width buttons for primary actions; two buttons sharing a row use the same height and images or short titles. Toolbar buttons offer navigation to related areas or contextual actions. Vertical stacks of one- and two-line text buttons use identical heights.
</platform_considerations>

<specs>
macOS help button placement:
| View style | Help button location |
|---|---|
| Dialog with dismissal buttons (OK, Cancel) | Lower corner opposite the dismissal buttons, vertically aligned with them |
| Dialog without dismissal buttons | Lower-left or lower-right corner |
| Settings window or pane | Lower-left or lower-right corner |

visionOS button sizes:
| Shape | Mini 28 pt | Small 32 pt | Regular 44 pt | Large 52 pt | Extra large 64 pt |
|---|---|---|---|---|---|
| Circular | yes | yes | yes | yes | yes |
| Capsule, text only | no | yes | yes | yes | no |
| Capsule, text and icon | no | no | yes | yes | no |
| Rounded rectangle | no | yes | yes | yes | no |

Hit region 44x44 pt minimum (60x60 pt visionOS); visionOS centers at least 60 pt apart, 4 pt padding around buttons 60 pt or larger; image button padding about 10 pixels.
</specs>

<anti_patterns>
- Avoid more than one or two prominent buttons per view.
- Avoid placing buttons of different sizes near each other.
- Avoid similar colors on button labels and content layer backgrounds.
- Don't assign the primary role to a destructive button.
- Don't put square, help, or image buttons in the window frame (toolbar, status bar); use toolbar items.
- Avoid labels or introductory text for square buttons and help buttons.
- Don't include more than one help button per window.
- Avoid a system-provided border on an image button.
- visionOS: avoid a custom white-fill, black-content button (reserved for the toggled state); avoid small or mini buttons in a vertical stack or horizontal row.
</anti_patterns>
</topic>

<topic name="Context menus" source="https://developer.apple.com/design/human-interface-guidelines/context-menus" updated="2023-12-05">
A context menu (contextual menu on macOS) gives access to functionality directly related to an item without cluttering the interface. It is hidden by default and revealed by touch or pinch and hold (iOS, iPadOS, visionOS), Control-click (macOS, iPadOS), or a secondary click on a Magic Trackpad. Not supported in watchOS.

<best_practices>
- **Prioritize relevancy.** Offer the commands people most likely need in the current context, not advanced or rare ones (Mail's Inbox message menu: reply and move, not editing or mailbox management).
- **Aim for a small number of items.**
- **Support context menus consistently throughout the app,** or people assume something is broken.
- **Always make context menu items available in the main interface too** (a toolbar in iOS and iPadOS; the menu bar in macOS).
- **Keep submenus to one level** with intuitive titles that predict contents.
- **Hide unavailable items, don't dim them.** macOS exception: Cut, Copy, and Paste may appear unavailable.
- **Put the most frequently used items where people read first,** nearest the finger or pointer; reverse the order when the menu opens above the content.
- **Show keyboard shortcuts in the app's main menus, not in context menus.**
- **Use separators to group items; keep to about three groups.**
- **iOS, iPadOS, visionOS: identify destructive items (Delete, Remove) as destructive and list them last.** The system can render them in red (`destructive`).
- **Content:** seldom a title; add one only when it clarifies effect (Mail's Mark menu shows the count of selected messages). Each item gets a short descriptive label and the same familiar icons the system uses for Copy, Share, Delete, and similar actions.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** Provide either a context menu or an edit menu for an item, never both. In iPadOS consider a context menu for creating a new object (Files creates a folder from empty space). A context menu can show a preview of the content; people may tap it to open or drag it. Prefer a graphical preview that confirms the target (condensed content in Notes and Mail). Match the preview's clipping path to the preview image so rounded corners don't appear to change during the emergence animation (`UIContextMenuInteractionDelegate`).
- **visionOS:** Consider a context menu instead of a panel or inspector window for frequently used functionality. Keep the menu shorter than the window's height so it doesn't obscure window-management controls or the Share menu; size the item count to the audience (specialist apps tolerate more).
</platform_considerations>

<anti_patterns>
- Don't fill a context menu with advanced or rarely used commands.
- Avoid long menus and more than one level of submenu.
- Don't dim unavailable items (except macOS Cut, Copy, Paste); hide them.
- Don't show keyboard shortcuts in a context menu.
- Avoid more than about three separator groups.
- iOS, iPadOS: don't offer both a context menu and an edit menu on the same item.
- visionOS: avoid a context menu taller than its window.
</anti_patterns>
</topic>

<topic name="Dock menus" source="https://developer.apple.com/design/human-interface-guidelines/dock-menus" updated="undated">
On a Mac, a secondary click on an app's Dock icon reveals a Dock menu of system-provided and custom items; system items vary with whether the app is open. macOS only; the iOS and iPadOS analog is Home Screen quick actions.

<best_practices>
- **Label items succinctly and organize them logically** per the Menus guidance.
- **Make custom Dock menu items available elsewhere too,** in menu bar menus or the interface.
- **Prefer high-value custom items:** currently or recently open windows, plus a few actions useful when the app isn't frontmost or has no windows (Mail: get new mail, compose).
</best_practices>

<anti_patterns>
- Don't make the Dock menu the only place a command exists.
- Avoid dynamic (modifier-key) items in Dock menus.
</anti_patterns>
</topic>

<topic name="Edit menus" source="https://developer.apple.com/design/human-interface-guidelines/edit-menus" updated="2023-06-21">
An edit menu lets people change selected content in the current view and offers related commands such as Copy, Select, Translate, and Look Up. It applies to text and other selectable content (images, files, contact cards, charts, map locations); in iOS, iPadOS, and visionOS the system detects the data type and may add actions such as Get directions. Not in tvOS or watchOS.

<best_practices>
- **Prefer the system-provided edit menu** (standard commands: `UIResponderStandardEditActions`).
- **Let people reveal it with the interactions they know:** touch and hold, pinch and hold in visionOS, secondary click with a trackpad or keyboard.
- **Offer only commands relevant in context; remove or dim the rest.** No Copy or Cut without a selection, no Paste with nothing to paste.
- **List custom commands near the related system commands** (custom formatting after the system format section), and keep them few.
- **Let people select and copy noneditable text** such as captions or statuses, but not control labels.
- **Support undo and redo;** edit menu actions run without confirmation.
- **Differentiate deletion commands:** Delete equals the Delete key; Cut copies to the pasteboard first.
- **Use short verb or verb-phrase labels for custom commands.**
- **Appearance:** iOS shows a compact horizontal list on touch and hold or double-tap, with a trailing chevron that expands it into a context menu; iPadOS uses the horizontal style for touch and opens directly as a context menu for keyboard or pointer; macOS offers editing commands in a context menu while editing and in the menu bar Edit menu; visionOS opens a horizontal bar on pinch and hold, or a context menu.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** Make the menu work in both styles: compact horizontal for Multi-Touch, vertical for keyboard or pointing device (see the Menus iOS and iPadOS layouts). Default position is above or below the insertion point or selection with a pointer indicator; the shape and pointer are fixed, but the menu can be moved to avoid covering important content.
- **macOS:** Edit menu item order is defined under The menu bar.
</platform_considerations>

<anti_patterns>
- Avoid a custom menu that duplicates the system edit menu.
- Avoid custom interactions for revealing the edit menu.
- Avoid selection-dependent commands with no selection, or Paste with nothing to paste.
- Avoid overwhelming people with custom commands.
- Avoid other controls that duplicate edit menu items.
- Don't let people copy control labels.
</anti_patterns>
</topic>

<topic name="Home Screen quick actions" source="https://developer.apple.com/design/human-interface-guidelines/home-screen-quick-actions" updated="undated">
Quick actions let people perform app-specific tasks from a menu revealed by touching and holding an app icon on the Home Screen or in the Dock (harder press on 3D Touch devices). Each has a title, an interface icon on the left or right depending on the icon's position, and an optional subtitle, left-aligned in left-to-right languages; the menu also lists system items for removing the app and editing the Home Screen. Actions can update dynamically (Messages lists recent conversations). iOS and iPadOS only.

<best_practices>
- **Create quick actions for compelling, high-value tasks.** People expect at least one per app; provide up to four (Maps: search nearby, directions home).
- **Keep dynamic changes predictable,** whether driven by location, recent activity, time of day, or settings.
- **Write a succinct title stating the result** ("Directions Home", "New Message"); add a subtitle only for extra context (Mail: unread status). Keep text short to avoid truncation and plan for localization.
- **Provide a familiar interface icon:** SF Symbols and the Standard icons, or a custom icon built with the Quick Action Icon Template in Apple Design Resources.
</best_practices>

<anti_patterns>
- Avoid unpredictable changes to quick actions.
- Don't include the app name or extraneous information in titles or subtitles.
- Don't use an emoji in place of a symbol or icon; quick action icons are monochromatic and adapt to Dark Mode.
</anti_patterns>
</topic>

<topic name="Menus" source="https://developer.apple.com/design/human-interface-guidelines/menus" updated="2026-06-08">
A menu reveals its options when people interact with it; each menu item represents a command, option, or state affecting the current selection or context. The label and organization rules here apply to every menu type: pop-up, pull-down, context, menu bar, Dock, in-game. (2026: menu item icon guidance updated.)

<best_practices>
- **Write a clear, succinct label for each item,** a verb or verb phrase for actions (View, Close, Select). An app item may show its keyboard command; a game item rarely does.
- **Use title-style capitalization:** capitalize every word except articles, coordinating conjunctions, and short prepositions; always capitalize the last word.
- **Remove articles (a, an, the) from labels** ("View Settings").
- **Show when an item is unavailable** by dimming it. If all items are unavailable, keep the menu openable so people can learn its commands.
- **Append an ellipsis (…) when an action needs more input** before it completes.
- **Represent common actions with the system's standard icons (2026)** for Share, Print, Search, and similar actions.
- **Use menu item icons sparingly and with purpose (2026):** the most common actions and key features, file system locations, connected devices, visual concepts such as rotating or flipping an image, and user-generated content such as folders and documents.
- **Apply a uniform treatment within a group (2026):** icons for all items in the group or for none.
- **List important or frequently used items first.**
- **Group logically related items with separators** (a line or a short gap, depending on platform and menu type), keeping related commands together even at different frequencies (Paste and Match Style with Copy, Cut, and Paste).
- **Be mindful of length.** Split an overlong menu or use a submenu (difficulty levels under New Game). Exception: user-defined or dynamic content (Safari History, Bookmarks) may be long and scroll.
- **Use submenus sparingly.** Consider one when a term repeats in more than two items of a group (Sort by > Date, Score, Time), keeping the repeated term in the parent label. One level only; more than about five items suggests a new menu. Keep the submenu item available even when its nested items aren't. Prefer a submenu to indentation.
- **Toggled items:** prefer one changeable label (Show Map / Hide Map); add a verb when ambiguous (Turn HDR On / Turn HDR Off); show both items when seeing both states helps (Take Account Online / Take Account Offline, one unavailable); use checkmarks for attributes in effect (Format > Font styles); offer one item that clears multiple attributes (Plain).
- **In-game menus:** use the platform's default interaction (touch in iOS and iPadOS, direct and indirect gestures in visionOS). Scaled game content can shrink menus below readable and tappable sizes; resize targets per platform Typography and Touch controls guidance.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** Three layouts (`preferredElementSize`): Small (a top row of four symbol-only items above the list), Medium (a top row of three items with a symbol above a short label), Large (default, all items in a list). Use Medium for three important frequent actions (Notes: Scan, Lock, Pin); use Small only for closely related actions that appear as a group (Bold, Italic, Underline, Strikethrough) with recognizable symbols.
- **visionOS:** Supports Small and Large layouts. A menu can present from 3D content via a SwiftUI view and may extend outside the window as in macOS. Display it near the content it controls. (2025) Breakthrough effect keeps a menu visible behind 3D content: `automatic` applies `subtle` (preferred; blends with surroundings while preserving depth); `prominent` shows the menu over the whole scene but can disrupt and cause discomfort; `none` lets content fully occlude it (puzzle barriers) at the cost of visibility.
</platform_considerations>

<anti_patterns>
- Don't display an icon if none clearly represents the item (2026).
- Don't mix icon and non-icon items within one group (2026).
- Don't keep articles in labels.
- Avoid long menus except for user-generated or dynamic content.
- Avoid submenus deeper than one level or longer than about five items.
- Don't indent menu items to show hierarchy.
- visionOS: avoid the prominent breakthrough effect unless the menu must dominate the scene.
</anti_patterns>
</topic>

<topic name="Ornaments" source="https://developer.apple.com/design/human-interface-guidelines/ornaments" updated="2024-02-02">
In visionOS, an ornament presents controls and information related to a window without crowding it. It floats in a plane parallel to and slightly in front of the window along the z-axis, moves with the window, and stays fixed while content scrolls. Ornaments can sit on any edge and hold buttons, segmented controls, and other views; the system builds toolbars, tab bars, and video playback controls from them. visionOS only.

<best_practices>
- **Consider an ornament for frequently needed controls in a consistent location** (Music's Now Playing controls).
- **Keep an ornament visible in general;** hide it only when people dive into content such as a video or photo.
- **With multiple ornaments, prioritize the window's visual balance;** constrain the total and relocate removed elements into the window.
- **Keep an ornament no wider than its window,** or it interferes with a tab bar or other vertical content on the side.
- **Consider borderless buttons;** the glass background makes borders unnecessary, and the system applies the hover effect automatically.
- **Use system toolbars and tab bars** (`Toolbars`, `TabView`), which already appear as ornaments; build a custom ornament (`ornament(visibility:attachmentAnchor:contentAlignment:ornament:)`) only for custom components.
</best_practices>

<anti_patterns>
- Avoid hiding an ornament outside content-immersion moments.
- Avoid so many ornaments that the window gains visual weight and feels complicated.
- Don't make an ornament wider than its window.
- Don't recreate toolbars or tab bars with custom ornaments.
</anti_patterns>
</topic>

<topic name="Pop-up buttons" source="https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons" updated="2023-10-24">
A pop-up button displays a menu of mutually exclusive options; after a choice the menu closes and the button can update to show the selection. iOS, iPadOS, macOS, visionOS (`MenuPickerStyle`, `changesSelectionAsPrimaryAction`, `NSPopUpButton`).

<when_to_use>
- Use a pop-up button for a flat list of mutually exclusive options or states that affect content or the surrounding view, especially when space is limited and options need not always be visible.
- Prefer a pull-down button to offer a list of actions, allow multiple selection, or include a submenu.
</when_to_use>

<best_practices>
- **Provide a useful default selection** that most people want; the button shows it until people choose.
- **Let people predict the options without opening the menu** with an introductory label or a button label describing its effect.
- **Include a Custom option when needed** for occasionally useful items, with optional explanatory text below the list.
</best_practices>

<platform_considerations>
- **iPadOS:** In a popover or modal view, consider a pop-up button instead of a disclosure indicator for a list item with a small, well-defined set of options, so people choose without opening a detail view.
</platform_considerations>

<anti_patterns>
- Don't use a pop-up button for actions, multiple selection, or submenus.
- Avoid cluttering the interface with occasionally needed items; fold them into Custom.
</anti_patterns>
</topic>

<topic name="Pull-down buttons" source="https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons" updated="2022-09-14">
A pull-down button displays a menu of items or actions directly related to the button's purpose; choosing one closes the menu and performs the action. iOS, iPadOS, macOS, visionOS (`showsMenuAsPrimaryAction`, `pullsDown`).

<when_to_use>
- Use a pull-down button to clarify a button's target or customize its behavior: Add reveals what to add, Sort reveals the attribute, Back reveals specific locations.
- Use a pop-up button for mutually exclusive choices that aren't commands.
- With only one or two items, use buttons for actions and toggles or switches for selections.
</when_to_use>

<best_practices>
- **Balance menu length with ease of use.** At least three items makes opening the menu worthwhile; too many slows people down.
- **Display a menu title only when it adds meaning.**
- **Mark destructive items and ask people to confirm.** Menus show destructive actions in red; on choosing one the system presents an action sheet (iOS) or popover (iPadOS) to confirm or cancel.
- **Include an icon with an item only when it adds value,** after the label; SF Symbols stay aligned with text at every scale.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** A gesture can also reveal a pull-down menu (Safari's Tabs button on touch and hold, iOS 14 and later). Consider a More pull-down button for items that don't need prominent positions; the ellipsis icon doesn't predict contents, so weigh convenience against discoverability.
</platform_considerations>

<anti_patterns>
- Avoid putting all of a view's actions in one pull-down button; primary actions must be discoverable.
- Avoid menus of one or two items, or so many that finding one is slow.
- Avoid unnecessary menu titles.
- Avoid over-relying on More buttons that hide functionality.
</anti_patterns>
</topic>

<topic name="The menu bar" source="https://developer.apple.com/design/human-interface-guidelines/the-menu-bar" updated="2025-06-09">
The menu bar at the top of the screen on a Mac or (2025) an iPad shows the app's top-level menus; people rely on it to learn what an app does and find commands. iPad uses the same menu order, item sets, and keyboard shortcut patterns as Mac.

<best_practices>
- **Order the menus: _AppName_, File, Edit, Format, View, app-specific menus, Window, Help.** macOS adds the Apple menu on the leading side and menu bar extras on the trailing side.
- **Support the system-defined menus and ordering;** the system implements many standard items (Edit > Copy for selected text in a standard text field).
- **Always show the same set of menu items;** disable unavailable items instead of hiding them.
- **Represent actions with the system's familiar icons** (Copy, Share, Delete).
- **Support the standard keyboard shortcuts** (Copy, Cut, Paste, Save, Print); define custom shortcuts only when necessary.
- **Prefer short, one-word menu titles** in title-style capitalization.
- **App menu (name in bold):** About _AppName_ (first, alone in its group; short name of 16 characters or fewer; no version number); Settings… (app-level only; document-specific settings go in File; on iPadOS it opens the app's page in Settings); optional app-specific configuration items after Settings in the same group; Services (macOS); Hide _AppName_, Hide Others, Show All (macOS); Quit _AppName_ (Option: Quit and Keep Windows).
- **File menu (rename or drop if the app handles no files):** New _Item_ (name the item type, such as Event); Open (ellipsis when people pick an item in a separate interface); Open Recent (submenu of recognizable names, most recent first, no file paths, usually with Clear Menu); Close (Option: Close All; Close Tab replaces it in tabbed windows, Option: Close Other Tabs; consider Close Window); Close File (for multiple views of one file); Save (autosave periodically; prompt for name and location for a new document; offer formats via a pop-up in the Save sheet); Save All; Duplicate (Option: Save As; prefer it over Save As, Export, Copy To, Save To); Rename…; Move To…; Export As… (only for formats the app doesn't typically handle; the document stays open, the export doesn't open); Revert To (with autosave: submenu of versions plus the version browser); Page Setup… (document-specific parameters such as paper size and orientation; global or frequently changed ones like printer name and copies belong in the Print panel); Print….
- **Edit menu (useful even in non-document apps):** Undo, Redo (name the target: Undo Paste and Match Style, Undo Typing); Cut; Copy; Paste (Clipboard unchanged, so repeatable); Paste and Match Style; Delete (no Clipboard; never Erase or Clear; equals the Delete key); Select All; Find submenu (Find, Find and Replace, Find Next, Find Previous, Use Selection for Find, Jump to Selection; move to File if it searches files or objects); Spelling and Grammar submenu (Show Spelling and Grammar, Check Document Now, Check Spelling While Typing, Check Grammar With Spelling, Correct Spelling Automatically); Substitutions submenu (Show Substitutions, Smart Copy/Paste, Smart Quotes, Smart Dashes, Smart Links, Data Detectors, Text Replacement); Transformations submenu (Make Uppercase, Make Lowercase, Capitalize); Speech submenu (Start Speaking, Stop Speaking); Start Dictation and Emoji & Symbols (added by the system at the bottom).
- **Format menu (omit without formatted text editing):** Font submenu (Show Fonts, Bold, Italic, Underline, Bigger, Smaller, Show Colors, Copy Style, Paste Style); Text submenu (Align Left, Align Center, Justify, Align Right, Writing Direction, Show Ruler, Copy Ruler, Paste Ruler).
- **View menu (appearance of all windows, never window navigation):** Show/Hide Tab Bar; Show All Tabs/Exit Tab Overview; Show/Hide Toolbar; Customize Toolbar; Show/Hide Sidebar; Enter/Exit Full Screen. Provide it even for a subset (full screen only); each show/hide title reflects the current state.
- **App-specific menus sit between View and Window.** List every custom command there, even infrequent or advanced ones, for findability, keyboard shortcuts, and Full Keyboard Access. Mirror the app's hierarchy (Mail: Mailbox, Message, Format), most general first.
- **Window menu (navigate, organize, manage windows; never appearance or Close):** Minimize (Option: Minimize All); Zoom (Option: Zoom All; never for full screen); Show Previous Tab; Show Next Tab; Move Tab to New Window; Merge All Windows; Enter/Exit Full Screen (only if there is no View menu, keeping Minimize and Zoom separate); Bring All to Front (Option: Arrange in Front); open windows alphabetically, excluding panels and modal views. Provide it even with one window so Full Keyboard Access can Minimize and Zoom. Consider show/hide items for panels (not font or color panels, which Format covers).
- **Help menu (trailing end; Help Book format adds a search field):** Send _AppName_ Feedback to Apple; _AppName_ Help; additional items (registration, release notes) after a separator. Keep the total small or link from within the help content.
- **Dynamic menu items (a modifier changes the item, such as Minimize to Minimize All with Option):** never the only way to do a task; primarily in menu bar menus; a single modifier key (`isAlternate`). macOS sizes menus to the widest item, including dynamic ones.
</best_practices>

<platform_considerations>
- **iPadOS (2025):** Hidden until people move the pointer to the top edge or swipe down; occupies the status bar's space; centered. No menu bar extras, no Apple menu; the App menu lacks About, Services, and visibility items; window controls appear in the menu bar when the app is full screen. Because the bar is often hidden and dynamic items need a hardware keyboard, every function must also be reachable in the UI. Reserve _AppName_ > Settings for the app's page in iPadOS Settings; link internal preferences with a separate item beneath it in the same group, with other app-wide options. For tab-style navigation, consider listing each tab in the View menu with key bindings. Group items into submenus more often than on Mac; rows are taller for tapping and some screens are smaller.
- **macOS:** The Apple menu is always first and can't be modified. When space is constrained the system prioritizes menus and essential extras, tightening or truncating titles. In full-screen mode the bar hides until the pointer reaches the top.
- **macOS menu bar extras (`MenuBarExtra`, `NSStatusBar`):** A trailing-side icon exposing functionality while the app runs, even when not frontmost; the bar is 24 pt tall. Use a symbol or icon drawn in black and clear so the system can recolor it for light and dark bars and selection. Clicking shows a menu, not a popover, unless the functionality is too complex for a menu. Let people choose whether to show the extra (a setting; optionally offered during setup). The system hides and shows extras as space requires, so never rely on presence or position; also expose the functionality elsewhere, such as a Dock menu, which is always available while the app runs.
</platform_considerations>

<specs>
| | iPadOS | macOS |
|---|---|---|
| Menu bar visibility | Hidden until revealed | Visible by default |
| Horizontal alignment | Centered | Leading side |
| Menu bar extras | Not available | System default and custom |
| Window controls | In the menu bar when the app is full screen | Never in the menu bar |
| Apple menu | Not available | Always available |
| App menu | About, Services, and visibility items not available | Always available |

macOS menu bar height 24 pt; About item name 16 characters or fewer.
</specs>

<anti_patterns>
- Don't hide unavailable menu bar items; disable them.
- Don't include a version number in the About item.
- Don't show file paths in Open Recent.
- Don't use Save As, Export, Copy To, or Save To in place of Duplicate.
- Don't name deletion Erase or Clear.
- Don't put window navigation in the View menu, or appearance and Close in the Window menu.
- Avoid using Zoom to enter or exit full screen.
- Avoid listing panels or modal views in the Window menu.
- Avoid crowding the Help menu.
- Avoid a dynamic item as the only path to a task, dynamic items in contextual or Dock menus, or more than one modifier key.
- iPadOS: avoid using the menu bar as a catch-all for functionality that fits nowhere else.
- Menu bar extras: don't show a popover instead of a menu; don't add the extra without the person's choice; don't rely on the extra being visible.
</anti_patterns>
</topic>

<topic name="Toolbars" source="https://developer.apple.com/design/human-interface-guidelines/toolbars" updated="2025-12-16">
A toolbar gives access to frequently used commands, controls, navigation, and search: sets of controls arranged horizontally along the top or bottom edge of the view, grouped into logical sections. It carries three content types: the view title, navigation controls (back, forward, search fields), and actions or bar items (buttons, menus). A tab bar, by contrast, is only for navigating between app areas; in iOS a navigation-specific toolbar is sometimes called a navigation bar. (2025: updated for Liquid Glass; navigation bar guidance folded in.)

<best_practices>
- **Choose items deliberately to avoid overcrowding,** and define which items move to the overflow menu as the toolbar narrows. macOS and iPadOS add the overflow menu automatically when items no longer fit.
- **Add a More menu for lower-priority actions** only if all actions can't fit; as the window narrows, More moves into the overflow menu with other items.
- **iPadOS, macOS: consider letting people customize the toolbar** in apps with many items, advanced functionality, or long sessions (editing commands are a good candidate set).
- **Reduce toolbar backgrounds and tinted controls (2025).** Let the content layer inform the toolbar's appearance; use a `ScrollEdgeEffectStyle` when the toolbar must be distinguished from content.
- **Avoid similar colors on toolbar item labels and content backgrounds (2025);** with colorful content, prefer the default monochromatic appearance.
- **Prefer standard components (2025);** their corner radii are concentric with the bar's corners, and a custom component must match.
- **Consider temporarily hiding toolbars for a distraction-free experience,** contextually, with a reliable way to restore them (Going full screen; Immersive experiences).
- **Provide a useful, concise window title under 15 characters;** leave it empty when redundant (Notes titles a note with its first line only in separate windows).
- **Use the standard Back and Close buttons with their standard symbols;** a custom version must look and behave the same and be used consistently.
- **Provide actions that support the main tasks,** prioritizing the most frequent commands or the highest-level objects.
- **Make each control's meaning clear** with simple, recognizable symbols, using text only for actions such as Edit that symbols represent poorly.
- **Prefer system-provided symbols without borders (2025);** the section supplies the container and the system defines hover and selection states.
- **Use the `.prominent` style for the key action such as Done or Submit (2025):** one primary action only, on the trailing side.
- **Position items in three locations (2025).** Leading edge: previous-document and show/hide sidebar controls at the far edge, then the view title, then an optional document menu (Duplicate, Rename, Move, Export); not customizable. Center area: common controls and possibly the title; customizable in macOS and iPadOS; collapses into the system overflow menu first. Trailing edge: items that must stay available, inspector buttons, an optional search field, the More menu (which also supports customization), and the primary action such as Done; always visible. Pin items to an edge or the center and insert space between them.
- **Group items by function and frequency** (Keynote: presentation-level, playback, object insertion), with navigation controls and critical actions such as Done, Close, or Save in dedicated, visually distinct sections.
- **Keep groupings and placement consistent across platforms.**
- **Aim for a maximum of three groups,** even with the added space on iPad and Mac.
- **Keep text-labeled actions separate** with fixed space (`UIBarButtonItem.SystemItem.fixedSpace`); text beside a symbol reads as one combined action, and adjacent text buttons run together.
</best_practices>

<platform_considerations>
- **iOS:** Include only the most important items in the main toolbar area and move the rest to a More menu. Use a large title that becomes a standard title on scroll and returns at the top (`prefersLargeTitles`).
- **iPadOS:** A toolbar and a tab bar can share the same horizontal space at the top of the view, keeping the full window width for content.
- **macOS:** The toolbar lives in the window frame at the top, below or integrated with the title bar; titles can display inline with controls and items have no bezel. Make every toolbar item available as a menu bar command, because people can customize or hide the toolbar; don't mirror every menu item.
- **visionOS:** The system toolbar runs along the bottom edge of the window, above the window-management controls, in a plane slightly in front of the window; a variable blur in the bar background keeps items legible over scrolling content. Items take a symbol or a text label; looking at a symbol item reveals its label. Prefer the system toolbar (optimized for eye and hand input, positioned automatically). Keep windows from resizing below the toolbar's width because visionOS has no menu bar listing every action. In a modal state (multistep photo edit), offer contextual toolbar controls and reinstate the standard ones on exit.
- **watchOS:** Toolbar buttons go in the top corners (`topBarLeading`, `topBarTrailing`) or along the bottom (`bottomBar`); above scrolling content they stay visible as content scrolls under them. A scrolling toolbar button (`primaryAction`) stays hidden until people scroll up, so discovery is automatic; use it for an important action that isn't the view's primary function (Mail's New Message atop the Inbox).
</platform_considerations>

<specs>
Positions: leading edge (fixed), center area (customizable, overflows first), trailing edge (always visible). Groups: about three max. Title: under 15 characters. Primary action: one, `.prominent`, trailing side.
</specs>

<anti_patterns>
- Don't add an overflow menu manually or ship layouts that overflow by default.
- Don't title windows with the app name.
- Don't use text labels reading Back or Close.
- Avoid custom toolbar backgrounds and tinted controls.
- Avoid similar colors on item labels and content backgrounds.
- Avoid bordered or outlined-circle symbols.
- Avoid more than one prominent primary action, or one away from the trailing side.
- Avoid more than about three groups.
- Avoid text-labeled buttons directly beside symbol buttons or each other without fixed space.
- macOS: don't make the toolbar the only home for a command; don't add a toolbar item for every menu item.
- visionOS: avoid vertical toolbars (tab bars are vertical); avoid pull-down menus in the toolbar (they can obscure window controls below the bottom edge); avoid windows narrower than the toolbar.
</anti_patterns>
</topic>

<decision_guide>
**Choosing an action control**
| Need | Use |
|---|---|
| One instantaneous action | Button; prominent style for the one or two most likely actions in a view |
| Turn one attribute or object on or off | Toggle, or a toggled menu item with a changeable label (Show Map / Hide Map) |
| Pick one of a few mutually exclusive options that should all stay visible | Segmented control |
| Pick one of many mutually exclusive options or states while saving space | Pop-up button with a useful default and an introductory label |
| Run one of several related actions, allow multiple selection, or need a submenu | Pull-down button (at least three items; with one or two, use buttons, toggles, or switches) |
| Extra lower-priority actions when space is tight | More pull-down button, weighing convenience against discoverability |
| Action that doesn't complete instantly | Button with an activity indicator and alternate label (iOS, iPadOS) |

**Where a command surfaces**
| Need | Use |
|---|---|
| Frequent commands for the whole view, always discoverable | Toolbar (about three groups; one `.prominent` primary action on the trailing edge) |
| Frequent commands for one specific item, on demand | Context menu (few items, one submenu level, hide unavailable items, no shortcuts); the same commands must also exist in the main interface |
| Act on selected text or content (Copy, Cut, Paste, Look Up, Translate) | System edit menu; never both an edit menu and a context menu on one item (iOS, iPadOS) |
| Send content to another app, service, or system action | Activity view via the Share button; exclude inapplicable system tasks rather than duplicating them |
| Confirm a destructive choice from a pull-down menu | The system's action sheet (iOS) or popover (iPadOS), shown automatically for destructive items |
| Commands from the Home Screen without opening the app | Up to four Home Screen quick actions (iOS, iPadOS) |
| Commands from the Dock while the app isn't frontmost | Dock menu (macOS): open windows plus a few high-value actions |
| Always-available functionality on Mac even when not frontmost | Menu bar extra (a menu, not a popover), backed by a Dock menu because extras can be hidden |
| Window-adjacent controls in visionOS | System toolbar or tab bar (already ornaments); a custom ornament only for custom components |

**macOS: menu bar vs toolbar vs contextual menu**
- Menu bar: every command the app supports, including advanced, rare, and contextual ones, with keyboard shortcuts and Full Keyboard Access; unavailable items are disabled, never hidden. Every toolbar item and context menu item must also live here.
- Toolbar: the subset of commands people use most or that map to the most important objects; customizable and hideable, so never the sole home of a command, and not every menu item deserves a toolbar item.
- Contextual menu: a short list of the commands most relevant to the clicked item; only applicable items (Cut, Copy, Paste may stay dimmed), no keyboard shortcuts, one submenu level at most.
- Dock menu and menu bar extras: optional shortcuts to a few high-value app-level actions, always duplicated in the menu bar or interface.
</decision_guide>

<quick_checklist>
- [ ] Every button hit region is at least 44x44 pt (60x60 pt in visionOS), and custom buttons have a press state.
- [ ] No more than one or two prominent buttons per view; preference is shown by style, not size.
- [ ] No destructive button carries the primary role.
- [ ] Menu item labels are verb-led, title-style, article-free, with an ellipsis when more input follows.
- [ ] Menu icons are used sparingly, match the system's standard icons, and apply to all items in a group or none (2026).
- [ ] Submenus are one level deep and about five items or fewer; groups are separated.
- [ ] Context menus hide unavailable items, show no keyboard shortcuts, have about three groups max, and every item also exists in the main interface.
- [ ] Destructive menu items are marked and listed last (iOS, iPadOS, visionOS), with confirmation for destructive pull-down actions.
- [ ] Pop-up buttons hold mutually exclusive options; pull-down buttons hold actions and offer at least three items.
- [ ] Toolbar has about three groups max, one `.prominent` trailing primary action, no custom background or tinted controls, no bordered symbols, and fixed space between text-labeled buttons.
- [ ] Window titles are under 15 characters and never the app name; Back and Close use the standard symbols.
- [ ] macOS: menu bar order is App, File, Edit, Format, View, custom, Window, Help; standard items and shortcuts are present; unavailable items are disabled, not hidden; every toolbar and context menu command is in the menu bar.
- [ ] iPadOS: every menu bar function is also reachable in the UI, and Settings opens the app's page in Settings.
- [ ] The share sheet opens only from the Share button and doesn't duplicate system actions.
- [ ] Home Screen quick actions: at most four, symbol or icon (no emoji), no app name in titles.
</quick_checklist>
