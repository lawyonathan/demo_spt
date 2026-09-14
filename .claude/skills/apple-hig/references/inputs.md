<overview>
How people physically drive an interface on Apple platforms: touch and in-air gestures, pointing devices (trackpad, mouse, the iPadOS pointer), physical keyboards and shortcuts, the focus system, eyes and hover effects in visionOS, Apple Pencil and Scribble, the Digital Crown, the Action button, Camera Control, the Siri Remote, game controls, motion sensors, and Ultra Wideband nearby interactions.
Distills the HIG Inputs pages: gestures, pointing-devices, keyboards, focus-and-selection, eyes, apple-pencil-and-scribble, digital-crown, action-button, camera-control, remotes, game-controls, gyro-and-accelerometer, nearby-interactions.
Load when designing or reviewing how an action is triggered, adding a custom gesture, shortcut, or pointer effect, targeting a specific device input, or checking that every action stays reachable by more than one input.
</overview>

<topic name="Gestures" source="https://developer.apple.com/design/human-interface-guidelines/gestures" updated="2024-09-09">
A gesture is a physical motion that directly affects an object: on a touchscreen, in the air (visionOS), or on a trackpad, mouse, remote, or controller with a touch surface. Every platform supports tap, swipe, and drag, and people expect them to mean the same thing everywhere.

<best_practices>
- **Give people more than one way to interact.** Many people prefer or need voice, keyboard, or Switch Control; never assume a gesture is available for a task.
- **Respond to gestures as people expect.** Tap activates or selects. Don't use tap or swipe for an app-unique action, and don't invent a gesture for a standard action like activating a button or scrolling.
- **Handle gestures as responsively as possible.** Give immediate feedback that predicts the result and shows the extent and type of movement needed.
- **Indicate when a gesture isn't available.** A locked object must look locked and an unavailable button must look distinct from an available one, or people think the app froze.
- **Add custom gestures only when necessary.** For specialized, frequent tasks no standard gesture covers (games, drawing apps). Each must be discoverable, straightforward to perform, distinct from other gestures, and not the only way to perform an important action.
- **Make custom gestures easy to learn.** Teach them in the app and test in real use; if you can't describe one with simple words and graphics, people won't learn it.
- **Use shortcut gestures to supplement standard gestures, not replace them.** Keep the Back button in the top toolbar even when a swipe from the side also goes back.
- **Avoid conflicting with gestures that access system UI.** Edge swipe in watchOS and hand roll-over in visionOS are reserved; only games and immersive experiences may defer a system gesture, in specific circumstances.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** Also expected: three-finger swipe left/right = undo/redo; three-finger pinch in/out = copy/paste; four-finger swipe (iPadOS only) = switch apps; shake = undo/redo. Allow simultaneous gestures only where it helps, e.g. a game's joystick and fire buttons together; rarely useful in nongame apps.
- **macOS:** Keyboard and mouse are primary; standard gestures also work on Magic Trackpad, Magic Mouse, and controllers with a touch surface.
- **tvOS:** Standard gestures via a compatible remote, Siri Remote, or controller touch surface (see Remotes).
- **visionOS:** *Indirect* gestures: look at an object to target it, then act from a distance with the hands (look at a button, tap finger and thumb together). Comfortable at any distance, fast refocusing, minimal movement. *Direct* gestures: physically touch the object (tap keys on the visionOS keyboard). Best within reach and for infrequent use, because raised arms tire. Every standard gesture has a direct version, so people can choose either mode on any standard component. Support standard gestures everywhere (tap is the first thing people try after looking). Offer both indirect and direct when possible: indirect for UI and common components like buttons; direct and custom for objects that invite close-up interaction or game-specific motions. Avoid requiring specific body movements or positions; offer alternative inputs. Custom gestures need a Full Space and permission for hand data (ARKit): keep testing ergonomics (raised arms and repeated similar movements stress muscles and joints); think hard before requiring multiple fingers or both hands and offer a lower-movement alternative; never require a specific hand. System overlays (visionOS 2 and later): looking at the palm shows the Home indicator; turning the hand shows the status bar with a tap to open Control Center (the visionOS 1 look-upward method remains as an accessibility setting). Reserve the area around the hand: don't anchor content to hands or wrists, and keep hand-anchored game content outside the immediate hand area. A Full Space app can defer the overlay so a tap is needed to reveal the Home indicator (`persistentSystemOverlays(_:)`); apps built for visionOS 1 defer by default. Use caution with any gesture involving a rolling motion of hand, wrist, and forearm; it is reserved for overlays, which draw on top without your app knowing, so test for conflicts.
- **watchOS:** Double tap (watchOS 11 and later) scrolls lists and scroll views and advances vertical tab views. You can name one toggle or button the primary action of a view, or of a widget or Live Activity in the Smart Stack; double tap highlights it and performs it (`handGestureShortcut(_:isEnabled:)`, `primaryAction`). In notifications it performs the first nondestructive custom action. Don't set a primary action in views with lists, scroll views, or vertical tabs (conflicts with navigation). Choose the most-used button, e.g. play/pause in media controls.
</platform_considerations>

<specs>
Standard gestures (touch, visionOS indirect, trackpad, mouse, remote, controller); "all" = iOS, iPadOS, macOS, tvOS, visionOS, watchOS:
| Gesture | Platforms | Common action |
|---|---|---|
| Tap | all | Activate a control; select an item |
| Swipe | all | Reveal actions and controls; dismiss views; scroll |
| Drag | all | Move a UI element |
| Touch (or pinch) and hold | all except macOS | Reveal additional controls or functionality |
| Double tap | all | Zoom in; zoom out if already zoomed; primary action on Apple Watch Series 9 and Apple Watch Ultra 2 |
| Zoom (pinch) | all except watchOS | Zoom a view; magnify content |
| Rotate | all except watchOS | Rotate a selected item |
visionOS direct gestures: touch = select or activate; touch and hold = contextual menu; touch and drag = move; double touch = preview an object or file, or select a word when editing; swipe = reveal actions and controls, dismiss, scroll; two hands pinch and drag together or apart = zoom; two hands pinch and drag in a circle = rotate.
</specs>

<anti_patterns>
- Don't assume everyone can perform a gesture.
- Don't repurpose tap or swipe; don't invent gestures for standard actions.
- Avoid custom gestures that are undiscoverable, hard, similar to others, or the sole path.
- Avoid conflicts with system gestures (watchOS edge swipe, visionOS palm look and hand roll).
- visionOS: avoid required body positions or a specific hand; don't anchor content to hands or wrists.
- watchOS: no double-tap primary action in list, scroll, or vertical tab views.
</anti_patterns>
</topic>

<topic name="Pointing devices" source="https://developer.apple.com/design/human-interface-guidelines/pointing-devices" updated="2023-06-21">
A trackpad or mouse adds precision and flexibility. On Mac it pairs with the keyboard as the primary input; on iPad and Apple Vision Pro it supplements touch, eyes, and gestures without replacing them.

<best_practices>
- **Be consistent when responding to mouse and trackpad gestures.** "Swipe between pages" must behave the same for document pages, webpages, and images.
- **Avoid redefining systemwide trackpad gestures.** Even in a game, people expect the gestures that reveal the Dock or Mission Control, and Mac users can customize them.
- **Provide a consistent experience across gestures, eyes, pointer, and keyboard.** People move fluidly between inputs and don't want to learn separate interactions per mode or app.
- **Let the pointer reveal and hide auto-minimizing controls.** Hovering reveals the minimized Safari toolbar in iPadOS and full-screen video playback controls.
- **Keep modifier-key results identical for touch and pointer.** If Option-drag duplicates an object, it does so either way.
- **iPadOS: allow multiple selection in custom views when necessary.** In iPadOS 15 and later a click-and-drag expands the pointer into a selection rectangle; nonlist collection views support it by default, custom views need `UIBandSelectionInteraction`.
- **iPadOS: distinguish pointer from finger input only where it adds value,** e.g. a scrubber where the pointer can click a precise seek point.
- **iPadOS: support the system content effects and their design intent.** Highlight for a small element with a transparent background; lift for a small element with an opaque background; hover for large elements with custom scale, tint, and shadow. Prefer system pointer appearances for standard buttons and text-entry areas, and system effects for custom elements that behave like standard ones (custom toolbar buttons without highlight look broken).
- **iPadOS: pad hit regions.** About 12 pt around elements with a bezel; about 24 pt around the visible edges of elements without one. Too small feels finicky; too large makes the pointer feel stuck. Make the hit regions of adjacent custom bar buttons contiguous so the pointer doesn't flicker to its default shape between them.
- **iPadOS: give a nonstandard lift element its corner radius** (e.g. a circle) so the pointer morphs cleanly (`UIPointerShape.roundedRect(_:radius:)`).
- **iPadOS: use effects consistently, keep custom pointer shapes simple, and consider useful annotations** (X and Y over a graph; Keynote shows width and height while resizing). Use clear, simple images for pointer accessories (`UIPointerAccessory`) and animate accessory transitions to signal state changes, e.g. `plus` to `circle.slash` when adding becomes unavailable.
- **iPadOS: weigh shadow, scale, and spacing in custom hover effects.** Scale only elements with room to grow (not table rows); for tight elements use tint without scale or shadow; never shadow without scale, because an unscaled element doesn't look closer.
</best_practices>

<platform_considerations>
- **iPadOS:** The pointer is a circle by default and an I-beam over text. Content effects: *highlight* turns the pointer into a translucent rounded rectangle behind the control with gentle parallax (default for bar buttons, tab bars, segmented controls, edit menus); *lift* fades the pointer out while scaling the element up with a shadow and specular highlight (default for app icons and Control Center buttons); *hover* applies your scale, tint, or shadow without changing the pointer. *Accessories* are small secondary indicators (resize arrows) that combine with any pointer. *Magnetism*: the pointer transforms as soon as it enters a hit region (which extends beyond visible bounds), and a flick pulls it to the likely target's center; on by default for lift and highlight elements and text-entry areas (prevents skipping lines while selecting), off for hover elements where it would feel jarring.
- **macOS:** Mouse and trackpad: primary click (select or activate), secondary click (contextual menu), scrolling, smart zoom, swipe between pages, swipe between full-screen apps, Mission Control (two-finger double tap on mouse; three- or four-finger swipe up on trackpad). Trackpad only: lookup and data detectors (one-finger force click or three-finger tap), tap to click, force click (Quick Look or lookup, plus variable pressure for pressure-sensitive controls like variable-speed media controls), two-finger pinch zoom, two-finger rotate, Notification Center (swipe from the edge), App Expose (three- or four-finger swipe down), Launchpad (pinch thumb and three fingers), Show Desktop (spread thumb and three fingers). Use the standard `NSCursor` pointers to signal state: arrow; closed hand (dragging content, e.g. a map); contextual menu (while Control is held); crosshair (precise rectangular selection); disappearing item (drop removes it, original untouched); drag copy (Option during a drag); drag link (Option-Command during a drag, creates an alias); horizontal and vertical I-beam (text); open hand (draggable content); operation not allowed; pointing hand (URL link); resize down, left, left/right, right, up, up/down.
- **visionOS:** Looking at an element and then moving the pointer focuses the element under it, automatically. Where people look sets the pointer's context, so it follows the eyes to another window. The pointer hides during trackpad or mouse gestures and reappears where people are looking when they move it.
- **iOS:** no additional considerations. **tvOS, watchOS:** not supported.
</platform_considerations>

<anti_patterns>
- Avoid redefining systemwide trackpad gestures, even in games.
- Avoid gratuitous or purely decorative pointer and content effects.
- Avoid instructional text on a pointer.
- Avoid scaling cramped elements; avoid shadow without scale.
- Don't add magnetism to hover elements; don't leave gaps between bar-button hit regions.
</anti_patterns>
</topic>

<topic name="Keyboards" source="https://developer.apple.com/design/human-interface-guidelines/keyboards" updated="2025-06-09">
A physical keyboard connects to every device except Apple Watch. A shortcut is a primary key plus one or more modifiers (Control, Option, Shift, Command); a game key binding is often a single key (that guidance moved to Game controls, 2025). Standard shortcuts must behave the same everywhere; custom ones cover only the most frequent app-specific commands.

<best_practices>
- **Support Full Keyboard Access when possible.** In iOS, iPadOS, macOS, and visionOS it lets people navigate and activate windows, menus, controls, and system features by keyboard alone; test by enabling it in Settings > Accessibility (`isFullKeyboardAccessEnabled`).
- **iPadOS: don't add keyboard navigation to controls.** Support it in text fields, text views, sidebars, and (via APIs) collection and custom views, but not for buttons, segmented controls, or switches; Full Keyboard Access activates controls, reaches every component, and performs gestures like drag and drop.
- **Respect standard keyboard shortcuts.** Give a unique frequent action a custom shortcut instead of repurposing a standard one; redefine a standard shortcut only when its action is meaningless in your app (no text editing, so Command-I can become Get Info). Gamers expect Command-Q to quit but expect to remap key bindings.
- **Define custom shortcuts only for the most frequent app-specific commands.** Too many make the app seem hard to learn.
- **Use modifiers as people expect.** Command-drag moves items as a group; Shift while drag-resizing constrains aspect ratio; a held arrow key moves the selection by the smallest app-defined unit until released.
- **Choose modifiers by role.** Command as the main modifier; Shift as a secondary modifier complementing a related shortcut; Option sparingly for less common or power commands; avoid Control, which the system uses for focus movement, screenshots, and many other features.
- **Mind international keyboards.** Option-5 types "{" on a French keyboard. Command alone is usually safe; avoid an additional modifier with characters not on all keyboards, or pair it only with alphabetic characters.
- **List modifiers in the order Control, Option, Shift, Command.**
- **Don't add Shift for the upper character of a two-character key.** Help is Command-Question mark, not Shift-Command-Slash; Hide Status Bar is Command-Slash.
- **Let the system localize and mirror shortcuts** for the connected keyboard and for right-to-left layouts.
- **Don't build a shortcut for an unrelated command by adding a modifier to an existing one.** Shift-Command-Z must mean redo because Command-Z is undo.
</best_practices>

<platform_considerations>
- **visionOS:** Holding Command on a connected keyboard shows a shortcut interface organized like menu bar menus (File, Edit, View) but flat, listing only available commands that have shortcuts. Write descriptive shortcut titles because no submenu title provides context (`discoverabilityTitle`). A virtual keyboard overlay with typing completion appears whenever a physical keyboard is connected.
- **iOS, iPadOS, macOS, tvOS:** no additional considerations. **watchOS:** not supported.
</platform_considerations>

<specs>
Standard shortcuts people expect (don't repurpose):
| Shortcut | Action |
|---|---|
| Command-A / Shift-Command-A | Select all / deselect all |
| Command-B, Command-I, Command-U | Bold, italic (or Info window in nontext apps), underline |
| Command-C, Command-X, Command-V | Copy, cut, paste |
| Shift-Command-C; Option-Command-C; Control-Command-C | Colors window; copy style; copy formatting |
| Shift-Command-V; Option-Command-V; Option-Shift-Command-V; Control-Command-V | Paste as (e.g. Quotation); apply style; paste and match surrounding style; apply formatting |
| Command-Z / Shift-Command-Z | Undo / redo |
| Command-N; Command-O; Command-S; Shift-Command-S | New document; Open dialog; Save; Duplicate or Save As |
| Command-P / Shift-Command-P | Print / Page Setup |
| Command-W; Shift-Command-W; Option-Command-W | Close window; close file and its windows; close all windows |
| Command-Q; Shift-Command-Q; Option-Shift-Command-Q | Quit; log out; log out without confirmation |
| Command-M / Option-Command-M | Minimize window / all app windows |
| Command-H / Option-Command-H | Hide app / hide other apps |
| Command-F; Option-Command-F; Control-Command-F | Find window; jump to search field; enter full screen |
| Command-G / Shift-Command-G; Command-E | Find next / previous; use selection for find |
| Command-J | Scroll to selection |
| Command-T / Option-Command-T; Option-Command-I | Fonts window / show or hide toolbar; inspector window |
| Command-Comma; Command-Question mark | App settings; app Help menu |
| Command-Period; Esc | Cancel an operation; cancel current action |
| Command-Colon / Command-Semicolon | Spelling window / find misspelled words |
| Command-Left bracket / Right bracket / Pipe | Left-align / right-align / center-align |
| Command-Hyphen / Shift-Command-Equal sign | Decrease / increase selection size |
| Command-Grave; Shift-Command-Grave; Option-Command-Grave | Next window in app; previous window; window drawer |
| Shift-Arrow; Option-Shift-Left/Right; Option-Shift-Up/Down | Extend selection by character or line; by word; by paragraph |
| Shift-Command-Left/Right; Shift-Command-Up/Down | Extend to line start/end; to document start/end |
| Shift-Tab; Control-Tab; Control-Shift-Tab; Control-Arrow | Reverse through controls; next control group or table; previous group; another cell or value |
| System-reserved: Command-Space (Spotlight), Option-Command-Space (results window), Control-Command-Space (Special Characters), Command-Tab and Shift-Command-Tab (app switching), Option-Command-Esc (Force Quit), Control-Command-Eject and Control-Option-Command-Eject (restart, shut down), Control-F1 (full keyboard access), Control-F2 through F6 (focus menu bar, Dock, window, toolbar, panel), Control-Shift-F4/F6 (previous window/panel), Control-F7 (override access mode), Command-F5 (VoiceOver), F11 (desktop), F12 (Dashboard), Option-Command-D (Dock), Control-Command-D (Dictionary), Shift-Command-3/4 (screenshots; add Control for Clipboard), Option-Command-8 and Option-Command-Hyphen/Equal sign (screen zoom), Control-Option-Command-8 (invert colors), Control-Option-Command-Comma/Period (contrast), Option-Command-Forward slash (font smoothing), Command-Left/Right arrow (layout script), Control-Space and Control-Option-Space (input sources) | Leave to the system |
</specs>

<anti_patterns>
- Don't repurpose standard shortcuts unless their action is meaningless in your app.
- Avoid Control as a modifier; avoid extra modifiers with characters missing on some keyboards.
- Avoid Shift for a two-character key's upper character.
- Avoid an existing shortcut plus a modifier for an unrelated command.
- Avoid defining many custom shortcuts.
- iPadOS: avoid keyboard navigation for buttons, segmented controls, switches.
</anti_patterns>
</topic>

<topic name="Focus and selection" source="https://developer.apple.com/design/human-interface-guidelines/focus-and-selection" updated="2023-10-24">
Focus lets people confirm what a remote, controller, or keyboard interaction targets. Focusing often selects, except where automatic selection would cause a distracting context shift (tvOS selection opens or activates, so it is a separate gesture). iPadOS and macOS draw a ring or highlight; tvOS uses the parallax effect. Not supported in iOS or watchOS.

<best_practices>
- **Rely on system-provided focus effects.** Create custom ones only if absolutely necessary.
- **Avoid changing focus without people's interaction.** Exception: with a discrete directional input (keyboard, remote, controller), when the focused item disappears, move focus to one of the few items one step away. Otherwise hide the focus indicator.
- **Match the platform's focus reach.** iPadOS and macOS: Full Keyboard Access reaches every control, so support focus only for content elements (list items, text fields, search fields), not buttons, sliders, or toggles. tvOS: every element must be focusable by directional gestures on a remote, controller, or arrow keys.
- **Indicate focus consistently with the platform.** iPadOS and macOS focused list items: white text on an accent-color highlight; unfocused: standard text on gray (`UICollectionView`, `NSTableView`).
- **Use a focus ring for text and search fields, a row highlight in lists and collections.** A ring is acceptable for an item that fills its cell (a photo), but full-row highlight reads more easily.
</best_practices>

<platform_considerations>
- **iPadOS:** The iPadOS 15 and later focus system covers text fields, text views, sidebars, collection views, and custom views via *focus groups* (sidebar, grid, list): Tab moves between groups; arrow keys move within a group. Two looks: the *halo* (focus ring), a customizable outline for custom views and opaque cell content like images (`UIFocusHaloEffect`); customize it only when the inferred shape is wrong (rounded corners, Bezier paths) or a badge must sit above it or a parent view clips it. The *highlighted* appearance (text in accent color) is a selection look on collection cells with content configurations, not a focus effect. Keep Tab order sensible (reading order: leading to trailing, top to bottom); mark a vertical stack as one focus group so focus moves down before trailing (`focusGroupIdentifier`). Raise the priority of a group's most likely item so it receives focus with the group (`UIFocusGroupPriority`).
- **tvOS:** *Directional focus*: swiping the Siri Remote or pressing arrow keys reaches every component. In a full-screen experience, gestures act on the content, not on focus. Avoid displaying a pointer; people navigate a fixed set of items by focus (free-form movement suits gameplay only, and a required pointer must be highly visible and integrated). Design for up to five distinct states: unfocused (less prominent), focused (elevated, illuminated, animated), pressed (instant feedback, e.g. brief color inversion), selected (e.g. a filled heart), unavailable (inactive). Focus usually scales the item, so supply larger assets and keep it from crowding neighbors.
- **visionOS:** Same focus system for connected keyboards and controllers. Looking at an object triggers the hover effect, which is unrelated to focus (see Eyes).
</platform_considerations>

<anti_patterns>
- Avoid custom focus effects unless absolutely necessary.
- Avoid moving focus without interaction (beyond the one-step exception).
- iPadOS, macOS: don't add focus to buttons, sliders, toggles.
- tvOS: avoid a pointer; avoid blurry scaled assets or focused items that crowd neighbors.
</anti_patterns>
</topic>

<topic name="Eyes" source="https://developer.apple.com/design/human-interface-guidelines/eyes" updated="2024-06-10">
In visionOS people look at an object to target it; the system's *hover effect* highlights it, confirming the target and inviting an indirect gesture like tap. Some components expand on look (a tab bar reveals labels after the individual tab highlights; a button can show a tooltip). For privacy, visionOS never reports where people look before they tap; system components report the tap. Focus effects for keyboards and controllers are unrelated. visionOS only.

<best_practices>
- **Always give people multiple ways to interact,** supporting the accessibility features they use.
- **Design for visual comfort.** Keep needed objects in the field of view (the system places the first window or volume in front of people; a Full Space app can request head-pose data to place 3D content). Avoid requiring multiple quick eye adjustments across a large area or several depth levels.
- **Place content at a comfortable distance.** At least one meter for reading or extended engagement; keep very close content brief.
- **Prefer standard UI components.** They respond consistently to a look; custom cues are hard to learn and remember.
- **Minimize visual distractions.** Movement, especially peripheral, pulls the eyes; revealing content beside a button people are looking at makes them look away from it.
- **Space interactive items.** Eyes make small quick adjustments even while fixating, so use a margin of at least 16 pt around each item's bounds or keep centers at least 60 pt apart.
- **Avoid a repeating pattern or texture filling the field of view.** Eyes lock onto elements at apparently different depths; confine patterns to a smaller area.
- **Use subtle cues to draw the eye to the likely target.** Center placement, gentle motion, contrast, or color and scale variation; noticeable, not flashy or harsh.
- **Give interactive items a rounded shape.** Eyes drift toward corners; rounder is easier to target.
- **Give a multi-element component one containing shape.** An image plus label acting as one control needs a custom region covering both so the whole region highlights.
- **Understand custom hover effects before designing one.** You define two appearances; the system applies the effect outside your process, so your app never knows when it's applied or which state the element is in, and the effect can't run code (a Favorites symbol can show, but the effect can't favorite). Use them, on system, custom, or RealityKit elements, to emphasize a special moment; too many, or where standard effects suffice, dilutes the design, distracts, and can cause visual discomfort.
- **Choose the right delay.** No delay (default) for subtle or inviting effects (a slider knob appears); short delay so people can look and act without waiting (tab bar expansion); long delay for supplementary information (a tooltip below a button).
- **Keep at least one primary view unchanged in both states** for visual stability; if everything moves, people lose track.
- **Test custom hover effects while wearing Apple Vision Pro.** Only testing shows whether they look good, respond appropriately, and feel alive without distracting.
</best_practices>

<specs>
Margin around each interactive item: at least 16 pt, or centers at least 60 pt apart. Content for reading or extended viewing: at least 1 m away. Custom hover delays: none (default), short, long.
</specs>

<anti_patterns>
- Avoid crowded items or content revealed beside what people are looking at.
- Avoid field-filling repeating patterns and sharp-cornered targets.
- Avoid very close content beyond brief moments.
- Avoid many custom hover effects, or custom where standard suffices; never rely on one to trigger logic.
- Avoid changing every view of an element during a hover effect.
</anti_patterns>
</topic>

<topic name="Apple Pencil and Scribble" source="https://developer.apple.com/design/human-interface-guidelines/apple-pencil-and-scribble" updated="2024-05-07">
Apple Pencil gives pixel-level precision for notes, sketching, painting, and markup and also works as a pointer and UI tool; Scribble lets people write in any text field with fast, private, on-device handwriting recognition. iPadOS only.

<when_to_use>
- **Hover**: preview the mark and surface nearby tool UI; never trigger an action.
- **Double tap**: switch tools or interaction modes per the person's setting; never modify content.
- **Squeeze** (Apple Pencil Pro): one quick, discrete, nondestructive action with any resulting UI near the tip; people may assign squeeze to an App Shortcut instead.
- **Barrel roll** (Apple Pencil Pro): modify marking behavior only (e.g. rotate a highlighter's angle), never navigation or controls.
</when_to_use>

<best_practices>
- **Support behaviors people expect from a marking instrument,** such as writing in a document's margins.
- **Let people choose when to switch between Apple Pencil and finger.** Every control must respond to Apple Pencil or it looks broken or low on battery (Scribble is Apple Pencil only).
- **Let people mark the moment the tip touches the screen.** No button tap or special mode first.
- **Respond to tilt (altitude), force (pressure), orientation (azimuth), and barrel roll** by varying thickness and intensity; map pressure to continuous properties like opacity or brush size, and keep it simple.
- **Show a direct connection with content.** Marks appear immediately under the tip; never trigger seemingly disconnected actions or change content elsewhere.
- **Design for left- and right-handed use.** Keep controls out from under either hand, or let people reposition them.
- **Use hover to preview the mark** (size and color of the current tool). Don't vary the preview with height; it rarely clarifies and distracts. Preview values near the middle of a range, since maximum pressure occludes the area and minimum is invisible. Consider hover for nearby interactions, such as a tool-size menu when people squeeze or press a keyboard modifier. Show hover previews for Apple Pencil, not for pointing devices.
- **Respect the double-tap setting when it fits.** Default toggles current tool and eraser; people can choose current/previous tool, show/hide color picker, or nothing. If none fits, double tap can change interaction mode (raise/lower in a 3D mesh tool). Any custom behavior needs a visible mode control, off by default, and must be easy to undo.
- **Treat squeeze as one quick gesture for a discrete action** and show the result promptly; holding or repeating squeezes tires people. It works only with the iPad screen on and the pencil off the screen, so people may not see the result. Show resulting UI (a contextual menu) close to the tip.
- **Scribble: make text entry fluid.** Works by default in text fields, text views, search fields, and editable web content (not password fields); a custom field must accept writing without a tap or selection. Make it available wherever text entry feels natural, e.g. writing below the last reminder creates a new one (`UIIndirectScribbleInteraction`).
- **Don't distract while people write.** No autocompletion text; hide placeholder text as writing starts; keep the field stationary (delay any move or resize until a pause); prevent autoscrolling, which shifts the selection; enlarge small fields before writing or during a pause, never mid-stroke (`UIScribbleInteraction`).
- **PencilKit: keep markup sharp over existing content** by disabling the default Dark Mode color adaptation over PDFs or photos. **Show undo and redo buttons in a compact environment** (the tool picker has them only in regular), and consider the 3-finger undo/redo gesture.
</best_practices>

<anti_patterns>
- Don't require a tap or mode switch before marking or writing.
- Don't let any control ignore Apple Pencil.
- Avoid height-varying hover previews, hover-triggered actions, and extreme-value previews.
- Avoid double tap or squeeze for destructive or content-modifying actions; don't enable custom double tap by default.
- Don't use barrel roll for navigation or displaying controls.
- Avoid autocompletion, placeholder text, movement, resizing, or autoscroll while people write.
</anti_patterns>
</topic>

<topic name="Digital Crown" source="https://developer.apple.com/design/human-interface-guidelines/digital-crown" updated="2023-12-05">
Hardware input on Apple Vision Pro and Apple Watch. On Apple Vision Pro it is system-only (volume; immersion in a portal, an Environment, or a Full Space app or game; recenter content; Accessibility settings; exit to the Home View) and apps receive no crown data. On Apple Watch, turning it navigates and can drive apps; presses are reserved by watchOS (e.g. revealing the Home Screen).

<best_practices>
- **Anchor navigation to the Digital Crown.** Since watchOS 10 it is the primary navigation input (Smart Stack widgets, vertical Home Screen movement, vertically paginated tabs, lists, variable-height pages). Keep list, tab, and scroll views vertical, and back every crown interaction with a touch equivalent.
- **Use the crown to inspect data where navigation isn't needed,** as World Clock advances the time of day at a location.
- **Give visual feedback for every turn.** Pickers update their value; if you track turns directly (`WKCrownDelegate`), update the interface yourself, or people assume nothing happened.
- **Match update speed to turn speed.** People expect precise control; don't update so fast that values are hard to select.
- **Use default haptics when they fit.** Most models give linear detents per distance turned; tables give a detent per new row. Turn detents off if they don't match your animation; use linear detents for tables with very different row heights.
</best_practices>

<anti_patterns>
- Don't design around crown presses or leave turns without feedback.
- Avoid update rates that make values hard to select.
- Don't make the crown the only way; pair it with touch.
</anti_patterns>
</topic>

<topic name="Action button" source="https://developer.apple.com/design/human-interface-guidelines/action-button" updated="2023-09-12">
On supported iPhone and Apple Watch models the Action button runs an App Shortcut or a system function (flashlight; on Apple Watch Ultra, workouts and dives), chosen at setup or in Settings; pressing it runs the App Shortcut as Siri or Spotlight would. Treat it as another fast path to a function people use regularly. iOS and watchOS only.

<best_practices>
- **Support the Action button with essential functions** ("Start Egg Timer"). Don't offer an action that merely opens the app; the system, app icon, widgets, and complications already do that.
- **Write a short label for each action.** Shown in Settings: title-style capitalization, verb first, present tense, no articles or prepositions, at most three words ("Start Race", not "Started Race" or "Start the Race").
- **Let the system teach usage.** Don't repeat the Settings guidance or other system tips.
</best_practices>

<platform_considerations>
- **iOS:** Keep people in context with Live Activities and custom snippets instead of opening the app ("Set Timer" asks for a duration, then starts a Live Activity countdown).
- **watchOS:** A first press can drop a waypoint, start a dive, or begin a workout; later presses handle secondary actions (mark a segment, move to the next modality). Offer at most one simple secondary function that supports or advances the primary action, since people press without looking; more adds cognitive load. Use later presses for more functionality, not to stop or conclude; put stop in the interface. Pause the current function when people press the Action button and side button together, except in diving apps where pausing could endanger the diver.
</platform_considerations>

<anti_patterns>
- Don't offer an "open the app" action.
- Avoid labels over three words, in past tense, or with articles or prepositions.
- Avoid repeating the system's guidance.
- watchOS: avoid several secondary functions; avoid a subsequent press that stops the task.
</anti_patterns>
</topic>

<topic name="Camera Control" source="https://developer.apple.com/design/human-interface-guidelines/camera-control" updated="2024-09-09">
On iPhone 16 and iPhone 16 Pro models the Camera Control opens your camera experience: a light press shows an overlay extending from the bezel, a light double press lists the available controls, and sliding a finger adjusts the selected one. Controls are *sliders* (continuous, e.g. contrast) or *pickers* (discrete, e.g. viewfinder grid on or off); the system also offers standard zoom factor and exposure bias controls (`AVCaptureControl`). iOS only.

<best_practices>
- **Use SF Symbols for controls** (Camera & Photos section); custom symbols aren't supported, and symbols show function, not current state.
- **Keep control names short.** Labels follow Dynamic Type and long names obscure the viewfinder.
- **Include units or symbols with slider values** (EV, %, or a custom string; `localizedValueFormat`).
- **Define prominent values for sliders** (the most frequent or evenly spaced values, like major zoom increments) so the system lands on them (`prominentValues`).
- **Make space for the overlay,** which occupies the area adjacent to the Camera Control in portrait and landscape; keep UI out of that area and let the viewfinder fill the height and width.
- **Minimize viewfinder distractions.** Don't duplicate the overlay's sliders and toggles in your UI.
- **Enable or disable controls per camera mode** (disable video controls for photos); controls can't be added or removed at runtime.
- **Order controls by frequency:** common ones in the middle, others on either side; the system remembers the last control used in your app.
- **Let people launch from anywhere** with a locked camera capture extension (`LockedCameraCapture`): the locked device, Home Screen, or other apps.
</best_practices>

<anti_patterns>
- No custom symbols; no state shown in symbols.
- Avoid long names or unitless slider values.
- Avoid UI in the overlay area; avoid duplicating overlay controls in the viewfinder.
</anti_patterns>
</topic>

<topic name="Remotes" source="https://developer.apple.com/design/human-interface-guidelines/remotes" updated="unknown">
The Siri Remote is the primary tvOS input: specific buttons plus a clickpad touch surface for swipe and press. Outside active gameplay, people expect standard remote behavior in every app. tvOS only.

<best_practices>
- **Prefer standard gestures for standard actions;** redefining them confuses and adds complexity except in gameplay. Define new gestures only when it makes sense (custom gestures can be fun in games).
- **Be consistent with the tvOS focus experience.** Always move focus in the same direction as the gesture.
- **Give clear feedback,** e.g. a lightly resting thumb shows where to swipe down to reveal an info area.
- **Differentiate press from tap, and ignore inadvertent taps.** Press is intentional (choose a button, confirm, act in gameplay). Taps suit navigation or showing information, but people tap accidentally when resting a thumb or handling the remote, so avoid responding to taps during live video playback. Positional taps (up, down, left, right) only where intuitive and discoverable.
- **Open the parent of the current screen on Back.** Top level: the Apple TV Home Screen; within an app, the hierarchy's parent, not necessarily the previous screen. In gameplay, Back opens an in-game pause menu (accidental repeated presses are easy); a further press closes it and resumes. Press and hold Back always goes to the Home Screen.
- **Play/Pause plays, pauses, or resumes media playback.**
- **Swipe** scrolls large item sets, fast then slowing; swiping the remote's edge speeds through items. **Press** activates a control or selects an item; pressing before swiping enters scrubbing mode.
- **Live-viewing apps with an EPG: honor compatible remotes' guide buttons.** "Guide" or "browse" opens the EPG; "page up" and "page down" navigate it while browsing (respond no other way); people can also tap the upper or lower touch surface. Without an EPG the system routes these presses to the default guide app. While content plays, page up and page down change the channel.
</best_practices>

<specs>
| Button | In an app | In a game |
|---|---|---|
| Touch surface swipe | Navigates; changes focus | Directional pad |
| Touch surface press | Activates a control or item; navigates deeper | Primary button |
| Back | Previous screen; exit to Home Screen | Pause/resume; previous screen, main menu, or Home Screen |
| Play/Pause | Play, pause, resume media | Secondary button; skip intro video |
</specs>

<anti_patterns>
- Avoid redefining standard remote behavior outside gameplay.
- Avoid responding to taps during live video playback.
- Avoid Back going anywhere but the parent (or the pause menu in a game).
- Avoid other responses to page up/down while people browse the EPG.
</anti_patterns>
</topic>

<topic name="Game controls" source="https://developer.apple.com/design/human-interface-guidelines/game-controls" updated="2025-06-09">
Games take input from physical controllers or each platform's default interaction (touch, remote, mouse and keyboard, eyes and hands). Always support the default: not every player has a controller, and players prefer the method they know. Updated in 2025 with touch control practices, a controller-to-UI map, and visionOS spatial controllers.

<best_practices>
- **Decide whether virtual controls belong over game content (2025).** They suit many actions or player-controlled movement; otherwise let players touch in-game objects directly (tap to select instead of a selection button). `TouchController` adds virtual controls.
- **Place virtual buttons within reach (2025).** Respect device bounds and safe areas; avoid the Home indicator and Dynamic Island; put frequent buttons near the thumb, outside the circular regions expected for movement and camera; put secondary controls like menus at the top.
- **Size controls generously (2025).** Frequently used controls at least 44x44 pt; less important controls such as menus at least 28x28 pt.
- **Always include visible and tactile press states (2025):** a glow that stays visible under the finger, plus sound and haptics.
- **Use symbols that show the action (2025),** e.g. a weapon for attack, not abstract shapes or controller names like A, X, or R1.
- **Show and hide virtual controls with gameplay (2025).** Hide unavailable actions; hide movement controls until the player touches the screen; fade the thumbstick at rest and highlight its direction in motion.
- **Combine functionality into one control (2025).** Redesign mechanics that need simultaneous or sequenced presses; use double tap and touch-and-hold for variants (hold for a powered-up attack); merge walk and sprint.
- **Map movement to the left and camera to the right (2025),** with the largest possible input areas; show the thumbstick where the thumb lands rather than a fixed spot; pan the camera with direct touch instead of a thumbstick.
- **Support the platform's default input as a fallback.** Every iPhone and iPad has touch, every Mac a keyboard and trackpad or mouse, every Apple TV a remote, every Apple Vision Pro eyes and hands.
- **Tell people about controller requirements.** tvOS and visionOS can require one (`GCRequiresControllerUserInteraction`; the App Store shows "Game Controller Required"), but the game can still open without it, so check and prompt gracefully.
- **Detect a paired controller and its profile automatically** (Game Controller framework), and **label controls per the connected controller** (`GCControllerElement`), since real colors and symbols differ from the framework's placement names. With several controllers, match the one in use; in multiplayer refer to each player's own; list buttons together when several apply.
- **Map controller buttons to expected UI behavior outside gameplay (2025):** see specs.
- **Prefer symbols over text for controller elements.** SF Symbols cover most buttons across brands and spare newcomers from hunting for labels mid-game.
- **Keyboard bindings: prioritize single keys** (first letters such as I for Inventory and M for Map; the main action on the large Space bar). **Test comfort on an Apple keyboard** (remap a Control binding to Command, which sits beside Space near W, A, S, D). **Keep related keys close** (high-value commands near W, A, S, D; number keys for inventory categories). **Let players remap** for comfort and play style.
</best_practices>

<platform_considerations>
- **visionOS (2025):** Support spatial controllers such as the PlayStation VR2 Sense controller like hands: look at an object and press the left or right trigger to interact indirectly, or reach out and press a trigger to interact directly.
- **iOS, iPadOS, macOS, tvOS:** no additional considerations. **watchOS:** not supported.
</platform_considerations>

<specs>
Touch controls: 44x44 pt minimum for frequent controls; 28x28 pt minimum for secondary ones such as menus.
Controller-to-UI map outside gameplay, all platforms: A activates a control; B cancels or returns to the previous screen; X, Y, and both triggers unassigned; left/right shoulder navigates left/right to another screen or section; thumbsticks and directional pad move selection; Home/logo reserved for the system; Menu opens game settings or pauses gameplay.
</specs>

<anti_patterns>
- Avoid controller-only play without the platform's default fallback.
- Avoid abstract or A/X/R1 artwork; avoid controls with no visible and tactile press state.
- Avoid buttons over the Home indicator, Dynamic Island, or thumb movement regions.
- Avoid simultaneous or sequenced button mechanics on touch; avoid a fixed thumbstick or a camera thumbstick when direct touch works.
- Avoid text for controller buttons when symbols exist; avoid fixed key bindings.
</anti_patterns>
</topic>

<topic name="Gyroscope and accelerometer" source="https://developer.apple.com/design/human-interface-guidelines/gyro-and-accelerometer" updated="unknown">
Core Motion data supports real-time motion experiences in iOS, iPadOS, and watchOS; tvOS apps can use the Siri Remote's gyroscope.

<best_practices>
- **Use motion data only for a tangible benefit** (fitness feedback, gameplay), never just to have it.
- **Explain why you need it.** Required copy appears in the system permission request on first access, and people can deny.
- **Outside active gameplay, don't use motion to manipulate the interface directly.** Motion gestures are hard to repeat precisely, physically challenging for some people, and cost battery.
</best_practices>

<anti_patterns>
- Avoid purposeless motion data collection; avoid motion-driven UI outside gameplay.
</anti_patterns>
</topic>

<topic name="Nearby interactions" source="https://developer.apple.com/design/human-interface-guidelines/nearby-interactions" updated="2023-06-21">
Experiences built on nearby people and objects (music hands off from iPhone to HomePod mini when brought close). They require Ultra Wideband hardware and the `NearbyInteraction` framework; people grant permission per app, and sessions use random identifiers that expire with the session. iOS, iPadOS, watchOS.

<best_practices>
- **Draw on the physical world** so tasks feel natural, and **use distance, direction, and context** (the share sheet can suggest the closest contact the person is facing).
- **Let distance shape feedback,** sharpening with proximity (the AirTag arrow becomes a pulsing circle), and **keep feedback continuous** as Find My does.
- **Combine visual, audible, and haptic feedback:** visual while people watch the screen, audio and haptics while they engage the environment.
- **Never make a nearby interaction the only way to perform a task.**
- **Encourage portrait orientation** (landscape reduces accuracy and availability of distance and direction) through implicit visual cues rather than explicit instructions.
- **Design for the sensor's field of view** (similar to the Ultra Wide camera on iPhone 11 and later); outside it you may get distance but not direction. **Explain that intervening people, animals, or large objects reduce accuracy,** e.g. in onboarding.
</best_practices>

<platform_considerations>
- **iOS:** distance and direction. **watchOS:** distance only, and apps must be in the foreground. **iPadOS:** no additional considerations. **macOS, tvOS, visionOS:** not supported.
</platform_considerations>

<anti_patterns>
- Avoid a nearby interaction as the sole path; avoid explicit "hold in portrait" instructions when cues suffice.
</anti_patterns>
</topic>

<decision_guide>
**Inputs each platform must support**
| Platform | Must support | Also expect | Never the only path |
|---|---|---|---|
| iOS | Touch and standard gestures; three-finger undo/redo and copy/paste; shake; Full Keyboard Access; voice and Switch Control | Keyboard, pointer, controller, Action button, Camera Control (iPhone 16), motion, nearby interactions | Custom gestures, shake, motion, nearby, Action button |
| iPadOS | Touch; four-finger app switch; pointer with system effects and 12/24 pt hit padding; Full Keyboard Access; focus for content elements | Apple Pencil (every control responds), Scribble in all text areas, keyboard, controllers | Apple Pencil-only or pointer-only paths, custom gestures |
| macOS | Keyboard and mouse or trackpad; standard shortcuts; systemwide trackpad gestures; focus ring or highlight; standard pointers | Magic Trackpad and Magic Mouse gestures, controllers | Custom trackpad gestures, custom shortcuts |
| tvOS | Siri Remote swipe and press; Back to parent; Play/Pause; every element focusable | EPG remotes, controllers (may be required), keyboard arrow keys, remote gyroscope | A pointer, custom remote gestures outside gameplay, taps during live playback |
| visionOS | Eyes plus indirect gestures on every standard component; hover effects; direct versions of standard gestures | Keyboard (Command shortcut interface), pointer, controllers including spatial, custom hand gestures only in a Full Space with permission | Direct or custom gestures, a specific hand or body position, hover effects as triggers |
| watchOS | Touch; Digital Crown navigation with touch equivalents; double tap | Action button, nearby interaction (distance, foreground only) | Crown presses, crown-only paths, double-tap primary action in scrolling views |

**When a custom gesture is acceptable**
- Only for a specialized, frequent task no standard gesture covers (games, drawing); it must be discoverable, straightforward, distinct, taught in-app, and never the sole path to an important action. If it can't be explained with simple words and pictures, drop it.
- It must not collide with system gestures: watchOS edge swipe; visionOS palm look, hand turn, and hand/wrist/forearm roll; macOS Dock and Mission Control trackpad gestures; standard Siri Remote behavior outside gameplay; the person's Apple Pencil double-tap and squeeze settings.
- visionOS adds: a Full Space plus hand-data permission, ergonomic testing, no sustained raised arms, a lower-movement alternative to multi-finger or two-handed gestures, no specific-hand requirement, and overlay deferral only in immersive games that need it.
- Gameplay may use custom and simultaneous gestures and custom remote behavior, but menus follow platform conventions (A activates, B cancels, Menu pauses; Back opens the pause menu).

**Keep every gesture-driven action reachable by a visible control**
- Shortcut gesture → the standard control stays: swipe back plus a Back button; three-finger undo plus Undo and Redo buttons (required in compact PencilKit).
- Apple Pencil hover, double tap, squeeze, barrel roll → the same tool changes in the tool picker; a custom double-tap mode has a visible mode control.
- Digital Crown turn → an equivalent touch interaction in the same view.
- watchOS double tap → it performs a button already visible in the view; keep that button.
- Action button and Camera Control → the same App Shortcut and camera settings remain inside the app.
- Nearby interaction and motion → a normal UI path (share sheet, button) for the same task.
- Game controller → touch, keyboard, remote, or eyes and hands as the fallback, with visible virtual controls on touch.
- Keyboard shortcut → a menu command or toolbar button; visionOS lists only commands that have shortcuts, so title them descriptively.
- Pointer hover reveals (minimized toolbar, video controls) and visionOS custom hover effects → purely visual; the action itself lives on a tappable control.

**Which effect or indicator**
- iPadOS pointer: highlight (small, transparent background), lift (small, opaque; supply the corner radius for nonstandard shapes), hover (large elements); magnetism only on lift and highlight.
- Focus: ring for text and search fields; row highlight for lists and collections; iPadOS halo for custom views and opaque cell images; tvOS parallax with five states.
- visionOS targets: rounded, 16 pt margin or 60 pt center spacing, one containing shape per compound component, standard hover effect unless a special moment justifies a custom one with a purpose-chosen delay.
- tvOS Back: parent screen in apps, pause menu in games; Play/Pause: media in apps, secondary button or skip intro in games.
</decision_guide>

<quick_checklist>
- [ ] Every gesture-driven action also has a visible standard control?
- [ ] No tap or swipe repurposed for an app-unique action, and no invented gesture for a standard action?
- [ ] Custom gestures discoverable, taught, distinct, optional, and free of system-gesture conflicts?
- [ ] Unavailable gestures and controls look clearly different from available ones?
- [ ] iPadOS: every control responds to Apple Pencil; pointer effects follow highlight/lift/hover with about 12 pt (bezel) or 24 pt (no bezel) hit padding; Scribble works everywhere without a tap and fields stay still while writing?
- [ ] Standard shortcuts untouched; custom ones lead with Command, list modifiers as Control-Option-Shift-Command, avoid Control; Full Keyboard Access works?
- [ ] Focus: system effects only and never moved without interaction; tvOS focuses every element with no pointer; iPadOS and macOS focus only content elements?
- [ ] visionOS: rounded targets with 16 pt margin or 60 pt center spacing; content at least 1 m away; indirect gestures on all UI; nothing anchored to hands; no hand-roll gesture; custom hover effects rare and tested on device?
- [ ] watchOS: crown navigation with touch equivalents and visual feedback on every turn; no reliance on crown presses; no double-tap primary action in scrolling views?
- [ ] Action button labels at most three words, verb-first, present tense, no "open app"; watchOS offers at most one secondary function and pauses on Action plus side button?
- [ ] Camera Control: SF Symbols only, short names, units and prominent values on sliders, UI clear of the overlay area?
- [ ] tvOS remote: Back to parent (pause menu in games), Play/Pause for media, taps ignored in live playback, focus follows the swipe direction?
- [ ] Games: default input works as fallback; touch controls at least 44x44 pt (menus 28x28 pt) with press states and action symbols; A activates, B cancels, Menu pauses; key bindings remappable?
- [ ] Motion and nearby interactions optional, with permission copy and an alternate path?
</quick_checklist>
