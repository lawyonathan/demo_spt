<overview>
How people physically drive an interface on Apple platforms: touch and in-air gestures, pointing devices (trackpad, mouse, the iPadOS pointer), physical keyboards and shortcuts, the focus system for remotes, controllers, and keyboards, eyes and hover effects in visionOS, Apple Pencil and Scribble, the Digital Crown, the Action button, Camera Control, the Siri Remote, game controls (touch, controllers, key bindings), motion sensors, and Ultra Wideband nearby interactions.
Distills the HIG "Inputs" pages: gestures, pointing-devices, keyboards, focus-and-selection, eyes, apple-pencil-and-scribble, digital-crown, action-button, camera-control, remotes, game-controls, gyro-and-accelerometer, nearby-interactions.
Load this file when designing or reviewing how an action is triggered, when adding a custom gesture, shortcut, or pointer effect, when targeting a specific device input, or when checking that every action stays reachable by more than one input.
</overview>

<topic name="Gestures" source="https://developer.apple.com/design/human-interface-guidelines/gestures" updated="2024-09-09">
A gesture is a physical motion people use to directly affect an object, on a touchscreen, in the air (visionOS), or on a trackpad, mouse, remote, or game controller with a touch surface. Every platform supports the basic gestures (tap, swipe, drag), and people expect them to mean the same thing everywhere.

<when_to_use>
- Use standard gestures for standard actions (activate, select, scroll, dismiss, zoom, rotate) on every platform.
- Add a custom gesture only for a specialized, frequent task that no standard gesture covers, typically in a game or drawing app.
- Use a shortcut gesture (e.g. swipe from the side to go back) only as an accelerator alongside the standard control, never as a replacement.
- visionOS: prefer indirect gestures for UI and common components such as buttons; reserve direct and custom gestures for objects that invite close-up interaction or specific motions in a game.
</when_to_use>

<best_practices>
- **Give people more than one way to interact with your app.** Many people prefer or need voice, keyboard, or Switch Control; never assume a specific gesture is available for a task.
- **Respond to gestures in ways consistent with people's expectations.** People expect tap to activate or select. Don't use a familiar gesture like tap or swipe for an app-unique action, and don't invent a unique gesture for a standard action like activating a button or scrolling a long view.
- **Handle gestures as responsively as possible.** Provide immediate feedback that helps people predict the result and, when needed, shows the extent and type of movement required to finish.
- **Indicate when a gesture isn't available.** Otherwise people think the app froze or that they gestured wrong. A locked object must look locked; an unavailable button's state must be clearly distinct from its available state.
- **Add custom gestures only when necessary.** A custom gesture must be discoverable, straightforward to perform, distinct from other gestures, and not the only way to perform an important action.
- **Make custom gestures easy to learn.** Offer in-app moments that teach them, and test in real use. If you can't describe the gesture with simple language and graphics, people will find it hard to learn and perform.
- **Use shortcut gestures to supplement standard gestures, not replace them.** In a view hierarchy people expect a Back button in the top toolbar even when a swipe from the side also goes back.
- **Avoid conflicting with gestures that access system UI.** Edge swiping in watchOS and rolling the hand over in visionOS are reserved. Games and immersive experiences can defer the system gesture only in specific circumstances (see visionOS).
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** Additional expected gestures: three-finger swipe left = undo, right = redo; three-finger pinch in = copy, pinch out = paste; four-finger swipe (iPadOS only) = switch apps; shake = undo or redo. Consider simultaneous recognition of several gestures only where it helps, e.g. a game whose joystick and fire buttons work at the same time; unlikely to be useful in nongame apps.
- **macOS:** Keyboard and mouse are primary; standard gestures also work on Magic Trackpad, Magic Mouse, or a game controller with a touch surface.
- **tvOS:** Standard gestures come from a compatible remote, Siri Remote, or a controller with a touch surface (see Remotes).
- **visionOS:** Two gesture categories. *Indirect*: look at an object to target it, then manipulate it from a distance with the hands (look at a button, tap finger and thumb together). Comfortable at any distance, fast refocusing, minimal movement. *Direct*: physically touch an interactive object (tap keys on the visionOS keyboard). Best within reach and for infrequent use, because holding arms up tires people. visionOS supports direct versions of every standard gesture, so people can choose either mode on any standard component. Support standard gestures everywhere you can: once someone looks at an object, tap is the first gesture they try. Offer both indirect and direct interaction when possible. Avoid requiring specific body movements or positions; if movement is required, offer alternative inputs. Custom gestures require running in a Full Space and permission to access hand data (ARKit). Prioritize comfort and keep testing ergonomics: raised arms tire quickly and repeated similar movements stress muscles and joints. Carefully consider multi-finger or two-handed gestures, since both hands may not be free; offer a lower-movement alternative. Avoid gestures that require a specific hand (cognitive load, and unwelcoming to people with hand dominance or limb differences). System overlays (visionOS 2 and later): looking at the palm reveals the Home indicator; turning the hand reveals the status bar with a tap to open Control Center. The visionOS 1 look-upward method remains as an accessibility setting. Reserve the area around the hand for system overlays: don't anchor content to hands or wrists, and place hand-anchored game content outside the immediate hand area so it doesn't collide with the Home indicator. An immersive app in a Full Space can defer the overlay so a tap is required to reveal the Home indicator (`persistentSystemOverlays(_:)`); apps built for visionOS 1 defer by default. Use caution with any custom gesture involving a rolling motion of hand, wrist, and forearm: it is reserved for system overlays, which always draw on top and are invisible to your app, so test for conflicts.
- **watchOS:** Double tap (watchOS 11 and later) scrolls lists and scroll views and advances vertical tab views. You can name one toggle or button the primary action of a view, or of your widget or Live Activity in the Smart Stack; double tap highlights it and performs it (`handGestureShortcut(_:isEnabled:)`, `primaryAction`). In notifications, double tap performs the first nondestructive custom action. Avoid setting a primary action in views containing lists, scroll views, or vertical tabs, because it conflicts with the default double-tap navigation. Choose the most commonly used button as the primary action, e.g. play/pause in a media controls view.
</platform_considerations>

<specs>
Standard gestures (system APIs; work on touch, visionOS indirect input, trackpad, mouse, remote, and controller):
| Gesture | Supported in | Common action |
|---|---|---|
| Tap | iOS, iPadOS, macOS, tvOS, visionOS, watchOS | Activate a control; select an item |
| Swipe | iOS, iPadOS, macOS, tvOS, visionOS, watchOS | Reveal actions and controls; dismiss views; scroll |
| Drag | iOS, iPadOS, macOS, tvOS, visionOS, watchOS | Move a UI element |
| Touch (or pinch) and hold | iOS, iPadOS, tvOS, visionOS, watchOS | Reveal additional controls or functionality |
| Double tap | iOS, iPadOS, macOS, tvOS, visionOS, watchOS | Zoom in; zoom out if already zoomed; perform the primary action on Apple Watch Series 9 and Apple Watch Ultra 2 |
| Zoom (pinch) | iOS, iPadOS, macOS, tvOS, visionOS | Zoom a view; magnify content |
| Rotate | iOS, iPadOS, macOS, tvOS, visionOS | Rotate a selected item |

visionOS direct gestures:
| Direct gesture | Common use |
|---|---|
| Touch | Directly select or activate an object |
| Touch and hold | Open a contextual menu |
| Touch and drag | Move an object to a new location |
| Double touch | Preview an object or file; select a word when editing |
| Swipe | Reveal actions and controls; dismiss views; scroll |
| Two hands, pinch and drag together or apart | Zoom in or out |
| Two hands, pinch and drag in a circular motion | Rotate an object |
</specs>

<anti_patterns>
- Don't assume everyone can perform a given gesture.
- Avoid using tap or swipe for an app-unique action; avoid inventing a gesture for a standard action.
- Avoid custom gestures that are undiscoverable, hard to perform, similar to other gestures, or the only path to an important action.
- Avoid conflicting with system gestures (watchOS edge swipe, visionOS palm look and hand roll).
- visionOS: avoid requiring specific body positions or a specific hand; avoid anchoring content to hands or wrists; avoid hand, wrist, or forearm rolling gestures.
- watchOS: avoid a double-tap primary action in list, scroll, or vertical tab views.
</anti_patterns>
</topic>

<topic name="Pointing devices" source="https://developer.apple.com/design/human-interface-guidelines/pointing-devices" updated="2023-06-21">
A trackpad or mouse gives precise navigation and actions. On Mac it pairs with the keyboard as the primary input; on iPad and Apple Vision Pro it is an additional way to interact that never replaces touch, eyes, or gestures.

<when_to_use>
- iPadOS content effects: use **highlight** for a small element with a transparent background; **lift** for a small element with an opaque background; **hover** for large elements, customizing scale, tint, and shadow.
- Use system pointer appearances for standard buttons and text-entry areas, and system effects for any custom element that behaves like a standard one.
- Distinguish pointer from finger input only when it adds value (e.g. a scrubber that lets the pointer click a precise seek point).
</when_to_use>

<best_practices>
- **Be consistent when responding to mouse and trackpad gestures.** People expect "Swipe between pages" to behave the same across document pages, webpages, and images.
- **Avoid redefining systemwide trackpad gestures.** Even in a game with custom gestures, people expect the gestures that reveal the Dock or Mission Control; Mac users can also customize systemwide gestures.
- **Provide a consistent experience across gestures, eyes, pointer, and keyboard.** People move fluidly between inputs and don't want separate interactions per mode or per app.
- **Let the pointer reveal and hide controls that auto-minimize or fade.** Hovering over the minimized Safari toolbar in iPadOS reveals it; moving the pointer reveals or hides full-screen video controls.
- **Keep modifier-key behavior identical for touch and pointer.** If Option-drag duplicates an object, the result must match whether people drag by touch or pointer.
- **iPadOS: allow multiple selection in custom views when necessary.** In iPadOS 15 and later, click-and-drag expands the pointer into a selection rectangle; standard nonlist collection views support it by default, custom views need `UIBandSelectionInteraction`.
- **iPadOS: support the system content effects and align with their intent.** People expect the effects they see systemwide in every app.
- **iPadOS: add padding around interactive elements for comfortable hit regions.** About 12 pt around elements with a bezel; about 24 pt around the visible edges of elements without a bezel. Too small feels finicky; too large makes the pointer feel stuck.
- **iPadOS: create contiguous hit regions for custom bar buttons.** Gaps make the pointer flicker back to its default shape between buttons.
- **iPadOS: specify the corner radius of a nonstandard element that receives lift.** The pointer morphs into the element's shape; a circle needs its radius (`UIPointerShape.roundedRect(_:radius:)`).
- **iPadOS: use pointer effects consistently.** Every drawing area in a drawing app should feel the same.
- **iPadOS: keep custom pointer shapes simple.** The shape should signal the available action without drawing attention; an unclear shape wastes people's time.
- **iPadOS: consider custom annotations that carry useful information.** X and Y values over a graph; Keynote shows width and height while resizing an image.
- **iPadOS: use clear, simple images for custom pointer accessories** (`UIPointerAccessory`), and consider animating accessory transitions to signal state changes, e.g. `plus` to `circle.slash` when adding becomes unavailable.
- **iPadOS: weigh shadow, scale, and spacing in custom hover effects.** Reserve scaling for elements with room to grow (not table rows); for tightly spaced elements use tint without scale or shadow; never use shadow without scale, because an unscaled element doesn't look closer.
</best_practices>

<platform_considerations>
- **iPadOS:** The pointer is a circle by default and becomes an I-beam over text-entry areas. Content effects change the element under the pointer: *highlight* turns the pointer into a translucent rounded rectangle behind the control with gentle parallax (default for bar buttons, tab bars, segmented controls, edit menus); *lift* fades the pointer out while scaling the element up with a shadow and specular highlight (default for app icons and Control Center buttons); *hover* applies your custom scale, tint, or shadow without changing the pointer shape. *Pointer accessories* are small secondary indicators (e.g. resize arrows) that combine with any pointer. *Magnetism*: the pointer starts transforming as soon as it enters an element's hit region, which extends beyond its visible bounds, and a flick toward an element pulls the pointer to the element's center; applied by default to lift and highlight elements and to text-entry areas (where it prevents skipping lines during selection), not to hover elements, where it would feel jarring.
- **macOS:** Standard, customizable mouse and trackpad interactions. On both mouse and trackpad: primary click (select or activate), secondary click (contextual menu), scrolling, smart zoom, swipe between pages, swipe between full-screen apps, Mission Control (two-finger double tap on mouse; three- or four-finger swipe up on trackpad). Trackpad only: lookup and data detectors (one-finger force click or three-finger tap), tap to click, force click (Quick Look or lookup; variable pressure for pressure-sensitive controls such as variable-speed media controls), zoom (two-finger pinch), rotate (two fingers in a circle), Notification Center (swipe from the trackpad edge), App Expose (three- or four-finger swipe down), Launchpad (pinch thumb and three fingers), Show Desktop (spread thumb and three fingers). Use the standard `NSCursor` pointers to communicate state: arrow; closed hand (dragging content, e.g. a map); contextual menu (shown while Control is pressed); crosshair (precise rectangular selection); disappearing item (a dragged item vanishes on drop, original unaffected); drag copy (Option during a drag); drag link (Option-Command during a drag, makes an alias); horizontal and vertical I-beam (text selection and insertion); open hand (content can be dragged); operation not allowed; pointing hand (URL link); resize down, left, left/right, right, up, up/down.
- **visionOS:** People can attach a pointing device or keyboard while continuing to use eyes and hands. Looking at an element and then moving the pointer brings focus to the element under the pointer, with no app work required. The area people look at sets the pointer's context, so shifting the eyes to another window moves the pointer there. During trackpad or mouse gestures the pointer hides, reappearing where people are looking when they move it.
- **iOS:** No additional considerations. **tvOS, watchOS:** not supported.
</platform_considerations>

<specs>
| iPadOS pointer item | Value |
|---|---|
| Hit-region padding, element with bezel | about 12 pt |
| Hit-region padding, element without bezel | about 24 pt around visible edges |
| Highlight effect | small element, transparent background; default for bar buttons, tab bars, segmented controls, edit menus |
| Lift effect | small element, opaque background; default for app icons, Control Center buttons |
| Hover effect | large elements; custom scale, tint, shadow; pointer keeps its shape |
| Magnetism by default | lift and highlight elements, text-entry areas (not hover) |
</specs>

<anti_patterns>
- Avoid redefining systemwide trackpad gestures, even in games.
- Avoid gratuitous or purely decorative pointer and content effects.
- Avoid displaying instructional text with a pointer.
- Avoid scaling elements that have no room to grow; avoid shadow without scale.
- Don't add magnetism to hover-effect elements.
- Don't leave gaps between the hit regions of adjacent bar buttons.
- Don't give custom toolbar buttons a nonstandard effect; without highlight they look broken.
</anti_patterns>
</topic>

<topic name="Keyboards" source="https://developer.apple.com/design/human-interface-guidelines/keyboards" updated="2025-06-09">
A physical keyboard connects to every device except Apple Watch. A keyboard shortcut is a primary key plus one or more modifiers (Control, Option, Shift, Command); a game shortcut, called a key binding, is often a single key. Standard shortcuts must behave the same in every app; custom shortcuts cover only the most frequent app-specific commands. Game key-binding guidance now lives on the Game controls page (2025).

<when_to_use>
- Use a standard shortcut for its standard action; create a custom shortcut for a unique, frequent action instead of repurposing a standard one.
- Redefine a standard shortcut only when its action is meaningless in your app (no text editing, so Command-I can become Get Info).
- On iPadOS, rely on Full Keyboard Access rather than custom keyboard navigation for controls.
</when_to_use>

<best_practices>
- **Support Full Keyboard Access when possible.** Available in iOS, iPadOS, macOS, and visionOS, it lets people navigate and activate windows, menus, controls, and system features with the keyboard alone. Test by turning it on in Settings > Accessibility (`isFullKeyboardAccessEnabled`).
- **iPadOS: don't add keyboard navigation to controls.** iPadOS supports keyboard navigation in text fields, text views, and sidebars, with APIs for collection and custom views, but avoid it for buttons, segmented controls, and switches. Let Full Keyboard Access activate controls, reach every onscreen component, and perform gesture interactions like drag and drop.
- **Respect standard keyboard shortcuts.** People expect the shortcuts that work systemwide. Gamers expect some standards (Command-Q quits) while also expecting to remap each game's key bindings.
- **Don't repurpose standard shortcuts for custom actions.** People get confused when known shortcuts behave differently.
- **Define custom shortcuts only for the most frequently used app-specific commands.** Too many make the app seem hard to learn.
- **Use modifier keys in expected ways.** Command-drag moves items as a group; Shift while drag-resizing constrains aspect ratio; holding an arrow key moves the selection by the smallest app-defined unit until released.
- **Choose modifiers by role.** Prefer Command as the main modifier; use Shift as a secondary modifier that complements a related shortcut; use Option sparingly for less common or power commands; avoid Control, which the system uses for focus movement, screenshots, and many other features.
- **Mind international keyboards.** Some characters need modifiers (Option-5 types "{" on a French keyboard). Command alone is usually safe; avoid an additional modifier with characters that aren't on all keyboards, and if you must, pair it only with alphabetic characters.
- **List modifiers in the order Control, Option, Shift, Command.**
- **Don't add Shift to a shortcut that uses the upper character of a two-character key.** Help is Command-Question mark, not Shift-Command-Slash; Hide Status Bar is Command-Slash.
- **Let the system localize and mirror shortcuts.** Keys localize to the connected keyboard, and right-to-left layouts mirror automatically.
- **Don't build a new shortcut by adding a modifier to an existing shortcut for an unrelated command.** Shift-Command-Z must mean redo, since Command-Z is undo.
</best_practices>

<platform_considerations>
- **visionOS:** Holding Command on a connected keyboard shows a shortcut interface organized like iPad or Mac menu bar menus (File, Edit, View), but every relevant category appears in one flat view listing only available commands that have shortcuts. Write descriptive shortcut titles, because submenu titles aren't there to give context (`discoverabilityTitle`). Whenever a physical keyboard is connected the system shows a virtual keyboard overlay with typing completion and other controls.
- **iOS, iPadOS, macOS, tvOS:** no additional considerations. **watchOS:** not supported.
</platform_considerations>

<specs>
Standard shortcuts people expect (don't repurpose):
| Shortcut | Action |
|---|---|
| Command-Space; Option-Command-Space; Control-Command-Space | Spotlight search field; Spotlight results window; Special Characters window (Shift-Command-Space varies) |
| Shift-Tab; Control-Tab; Control-Shift-Tab | Reverse through controls; next group of controls or next table; previous group |
| Command-Tab; Shift-Command-Tab | Next / previous most recently used app |
| Esc; Option-Command-Esc | Cancel current action; Force Quit dialog |
| Control-Command-Eject; Control-Option-Command-Eject | Restart; shut down (after saving changes) |
| Control-F1 | Toggle full keyboard access |
| Control-F2; Control-F3; Control-F4; Control-F5; Control-F6 | Focus menu bar; Dock; active or next window; toolbar; first or next panel |
| Control-Shift-F4; Control-Shift-F6 | Previously active window; previous panel |
| Control-F7 | Temporarily override keyboard access mode |
| Command-F5 | Toggle VoiceOver |
| F8, F9, F10 vary; F11; F12 | Show desktop; Dashboard |
| Command-Grave; Shift-Command-Grave; Option-Command-Grave | Next window in app; previous window; window drawer |
| Command-Hyphen; Shift-Command-Equal sign | Decrease / increase size of selection |
| Option-Command-Hyphen; Option-Command-Equal sign; Option-Command-8 | Zoom out; zoom in (screen zooming on); toggle screen zooming |
| Control-Option-Command-8 | Invert screen colors |
| Command-Left bracket; Command-Right bracket; Command-Pipe | Left-align; right-align; center-align |
| Command-Colon; Command-Semicolon | Spelling window; find misspelled words |
| Command-Comma; Command-Period | App settings; cancel an operation |
| Control-Option-Command-Comma / Period | Decrease / increase screen contrast |
| Command-Question mark | App Help menu |
| Option-Command-Forward slash | Toggle font smoothing |
| Shift-Command-3 / 4; add Control | Capture screen / selection to a file; to the Clipboard |
| Command-A; Shift-Command-A | Select all; deselect all |
| Command-B; Command-I; Command-U | Bold; italic (or Info window in nontext apps); underline |
| Command-C; Shift-Command-C; Option-Command-C; Control-Command-C | Copy; Colors window; copy style; copy formatting |
| Command-X; Command-V | Cut to Clipboard; paste at insertion point |
| Shift-Command-V; Option-Command-V; Option-Shift-Command-V; Control-Command-V | Paste as (e.g. Quotation); apply style; paste and match surrounding style; apply formatting |
| Option-Command-D; Control-Command-D | Show or hide Dock; Dictionary definition of selected word |
| Command-E; Command-F; Option-Command-F; Control-Command-F | Use selection for find; Find window; jump to search field; enter full screen |
| Command-G; Shift-Command-G | Find next; find previous |
| Command-H; Option-Command-H | Hide app; hide others |
| Option-Command-I | Inspector window |
| Command-J | Scroll to selection |
| Command-M; Option-Command-M | Minimize window; minimize all app windows |
| Command-N; Command-O | New document; Open dialog |
| Command-P; Shift-Command-P | Print; Page Setup |
| Command-Q; Shift-Command-Q; Option-Shift-Command-Q | Quit; log out; log out without confirmation |
| Command-S; Shift-Command-S | Save; Duplicate or Save As |
| Command-T; Option-Command-T | Fonts window; show or hide toolbar |
| Command-W; Shift-Command-W; Option-Command-W | Close window; close file and its windows; close all windows |
| Command-Z; Shift-Command-Z | Undo; redo (when separate from undo) |
| Shift-Arrow | Extend selection one character (left/right) or one line (up/down) |
| Option-Shift-Left/Right; Option-Shift-Up/Down | Extend selection by word; by paragraph (down includes the terminator in cut, copy, paste) |
| Shift-Command-Left/Right; Shift-Command-Up/Down | Extend to start/end of line; to start/end of document |
| Control-Arrow | Move focus to another value or cell in a view such as a table |
| Command-Right arrow; Command-Left arrow | Keyboard layout to Roman script; to system script |
| Control-Space; Control-Option-Space | Toggle current and last input source; next input source |
</specs>

<anti_patterns>
- Don't repurpose standard shortcuts unless their action is meaningless in your app.
- Avoid Control as a modifier; avoid modifiers beyond Command with characters missing from some keyboards.
- Avoid adding Shift to shortcuts that use the upper character of a two-character key.
- Avoid an existing shortcut plus a modifier for an unrelated command.
- Avoid defining many custom shortcuts.
- iPadOS: avoid keyboard navigation for buttons, segmented controls, and switches.
</anti_patterns>
</topic>

<topic name="Focus and selection" source="https://developer.apple.com/design/human-interface-guidelines/focus-and-selection" updated="2023-10-24">
Focus lets people visually confirm what their interaction targets when using a remote, game controller, or keyboard. Focusing often selects, except where automatic selection would cause a distracting context shift (tvOS: selecting opens or activates, so it needs a separate gesture). iPadOS and macOS show focus with a ring or highlight; tvOS uses the parallax effect to lift the focused item. Not supported in iOS or watchOS.

<when_to_use>
- Use a focus ring for a text or search field; use a whole-row highlight in a list or collection (a ring is acceptable for an item that fills its cell, such as a photo).
- iPadOS: use the halo (focus ring) for custom views and opaque cell content like images; the highlighted appearance (text in accent color) is a selection look, not a focus effect.
- tvOS: use the focus model for menus and UI; free-form pointer movement is acceptable only inside gameplay.
</when_to_use>

<best_practices>
- **Rely on system-provided focus effects.** They are tuned to feel responsive and lifelike and give consistency; create custom ones only if absolutely necessary.
- **Avoid changing focus without people's interaction.** Exception: when people use a discrete directional input (keyboard, remote, controller) and the focused item disappears, move focus to one of the few items one step away. In all other cases hide the focus indicator when the focused object disappears.
- **Match the platform's focus reach.** iPadOS and macOS: Full Keyboard Access reaches every control, so support focus only for content elements (list items, text fields, search fields), not buttons, sliders, or toggles. tvOS: people must be able to focus every onscreen element using directional gestures on a remote, controller, or arrow keys.
- **Indicate focus with platform-consistent appearances.** iPadOS and macOS focused list items: white text on a highlight matching the accent color; unfocused: standard text on a gray highlight (`UICollectionView`, `NSTableView`).
- **iPadOS: customize the halo only when necessary.** The system infers the halo from the item's shape; refine it for rounded corners or Bezier paths, or move it when a badge must sit above it or a parent view clips it (`UIFocusHaloEffect`).
- **iPadOS: make focus move through custom views sensibly.** Tab moves through focus groups in reading order (leading to trailing, top to bottom); to move down a vertical stack before moving trailing, mark the stack as one focus group (`focusGroupIdentifier`).
- **iPadOS: raise the priority of a group's most likely item.** The primary item receives focus when its group does (`UIFocusGroupPriority`).
- **tvOS: in a full-screen experience, let gestures act on the content, not on focus.** Full-screen items don't show focus, so people expect gestures to affect the object.
- **tvOS: design for every focus state.** Focusable items have up to five visually distinct states: unfocused (less prominent), focused (elevated, illuminated, animated), pressed (instant feedback, e.g. brief color inversion), selected or activated (e.g. a filled heart), unavailable (inactive). Focus usually scales the item, so supply larger assets and keep the scaled item from crowding neighbors.
</best_practices>

<platform_considerations>
- **iPadOS:** iPadOS 15 and later defines a focus system for keyboard navigation of text fields, text views, sidebars, collection views, and custom views. It uses *focus groups* (sidebar, grid, list): Tab moves between groups; arrow keys move directionally within a group, similar to tvOS.
- **tvOS:** *Directional focus*: swiping the Siri Remote or pressing arrow keys reaches every component. Avoid displaying a pointer; people expect to navigate a fixed set of items by focus, not drag a tiny pointer across a huge screen. If a pointer is truly required, make it highly visible and integrated.
- **macOS:** Focus ring or highlight; Full Keyboard Access reaches controls.
- **visionOS:** Same focus system as iPadOS and tvOS for connected keyboards or game controllers. Looking at an object triggers the *hover effect*, not a focus effect; the two are unrelated (see Eyes).
</platform_considerations>

<anti_patterns>
- Avoid custom focus effects unless absolutely necessary.
- Avoid moving focus without interaction (beyond the one-step exception).
- iPadOS, macOS: don't add focus to buttons, sliders, or toggles.
- tvOS: avoid displaying a pointer; avoid blurry scaled assets; avoid focused items that crowd neighbors.
</anti_patterns>
</topic>

<topic name="Eyes" source="https://developer.apple.com/design/human-interface-guidelines/eyes" updated="2024-06-10">
In visionOS people look at a virtual object to target it, and the system highlights it with a *hover effect* that confirms the target and signals that an indirect gesture like tap will act on it. Some components expand on look: a tab bar reveals labels after the individual tab highlights, and a button can reveal a tooltip. For privacy, visionOS never tells an app where people look before they tap; system components report the tap. Focus effects for connected keyboards or controllers are unrelated. visionOS only.

<when_to_use>
- Use standard components and standard hover effects by default.
- Use a custom hover effect only to emphasize a special moment, replacing or augmenting the standard effect on system, custom, or RealityKit elements.
- Delay choice for custom hover effects: **no delay** (default) for subtle, inviting effects such as a slider knob appearing; **short delay** so people can look and interact without waiting, as with tab bar expansion; **long delay** for supplementary information such as a tooltip.
</when_to_use>

<best_practices>
- **Always give people multiple ways to interact.** Support the accessibility features people use to personalize interaction.
- **Design for visual comfort.** Keep the objects people need within the field of view. The system places the first window or volume conveniently in front of people; in a Full Space you can request head-pose data to place 3D content. Avoid requiring multiple quick eye adjustments over a large area or across several depth levels.
- **Place content at a comfortable viewing distance.** At least one meter away for reading or extended engagement; keep very close content brief.
- **Prefer standard UI components.** They respond consistently to a look; custom visual cues are hard to learn and remember.
- **Minimize visual distractions.** Movement, especially peripheral, pulls the eyes involuntarily; revealing content beside a button people are looking at makes them look away from the button.
- **Provide enough space around interactive items.** Eyes make small quick adjustments even while fixating, so crowding causes jumps. Use a margin of at least 16 pt around each item's bounds, or keep item centers at least 60 pt apart.
- **Avoid a repeating pattern or texture that fills the field of view.** Eyes can lock onto elements at apparently different depths; confine patterns to a smaller area.
- **Use subtle cues to draw the eye to the likely target.** Place it near the center of the field of view, or use gentle motion, increased contrast, or variation in color or scale. Noticeable, not flashy or harsh.
- **Give interactive items a rounded shape.** Eyes drift toward corners; the rounder the shape, the easier it is to target its center.
- **Give a multi-element component one containing shape to highlight.** If an image and a label act as one control, define a custom region covering both so the whole region highlights when people look at either.
- **Understand how custom hover effects work.** You define two appearances (with and without the effect). The system applies the effect outside your process, so your app never knows when it's applied or which state the element is in, and the effect can't run code (a Favorites symbol can appear, but the effect can't perform favoriting).
- **Prefer custom hover effects for special moments.** Too many, or using them where standard effects suffice, dilutes the design, distracts, and can cause visual discomfort.
- **Keep at least one primary view unchanged in both states.** Constant elements give visual stability; if everything moves, people lose track of the transition.
- **Thoroughly test custom hover effects while wearing Apple Vision Pro.** Testing is the only way to know they look good, respond appropriately, and feel alive without distracting.
</best_practices>

<specs>
| Item | Value |
|---|---|
| Margin around each interactive item's bounds | at least 16 pt |
| Distance between interactive item centers | at least 60 pt |
| Viewing distance for reading or extended content | at least 1 m |
| Custom hover effect delays | none (default), short, long |
</specs>

<anti_patterns>
- Avoid crowding interactive items or revealing content next to something people are looking at.
- Avoid repeating patterns across the field of view.
- Avoid sharp-cornered interactive shapes.
- Avoid placing content very close unless it is viewed briefly.
- Avoid too many custom hover effects, or custom effects where standard ones suffice.
- Avoid changing every view of an element during a custom hover effect.
- Don't depend on a hover effect to trigger app logic.
</anti_patterns>
</topic>

<topic name="Apple Pencil and Scribble" source="https://developer.apple.com/design/human-interface-guidelines/apple-pencil-and-scribble" updated="2024-05-07">
Apple Pencil gives pixel-level precision for notes, sketching, painting, and markup, and also works as a pointer and UI tool. Scribble lets people write in any text field using fast, private, on-device handwriting recognition. iPadOS only.

<when_to_use>
- **Hover**: preview what a touch will do and surface nearby tool UI; never to trigger an action.
- **Double tap**: switch tools or interaction modes per the person's system setting; never to modify content.
- **Squeeze** (Apple Pencil Pro): one quick, discrete, nondestructive action, with any resulting UI near the tip; people may instead assign squeeze to an App Shortcut.
- **Barrel roll** (Apple Pencil Pro): only to modify marking behavior (e.g. rotate a highlighter's angle), never for navigation or showing controls.
</when_to_use>

<best_practices>
- **Support behaviors people expect from a marking instrument.** E.g. people naturally write in the margins of documents.
- **Let people choose when to switch between Apple Pencil and finger.** Every control must respond to Apple Pencil; an unresponsive control reads as a malfunction or low battery. (Scribble accepts only Apple Pencil input.)
- **Let people make a mark the moment Apple Pencil touches the screen.** No button tap or special mode first.
- **Respond to tilt (altitude), force (pressure), orientation (azimuth), and barrel roll.** Vary thickness and intensity; map pressure to continuous properties like opacity or brush size, and keep it simple.
- **Give visual feedback showing a direct connection with content.** Marks appear immediately under the tip; never trigger seemingly disconnected actions or change content elsewhere.
- **Design a great left- and right-handed experience.** Don't place controls where either hand may cover them; consider letting people reposition them.
- **Use hover to help people predict the mark.** Show the current tool's size and color. Avoid continuously changing the preview with height above the screen; it rarely clarifies and is distracting.
- **Avoid using hover to initiate an action.** Hover is imprecise; people shouldn't trigger anything, especially something destructive, by holding the pencil near the screen.
- **Preview a value near the middle of a dynamic range.** A maximum-pressure preview occludes the marking area; a minimum-pressure preview can be invisible.
- **Consider hover for interactions near the marking point.** E.g. show a contextual menu of tool sizes on squeeze or when people press a modifier on an attached keyboard, so hands stay put.
- **Show hover previews for Apple Pencil, not pointing devices.** Identical feedback for both can confuse; restrict previews to Apple Pencil where it makes sense.
- **Respect the double-tap setting when it makes sense.** Default toggles current tool and eraser; people can choose current/previous tool, show/hide color picker, or nothing. If system settings don't fit, double tap can still change interaction mode (e.g. raise/lower in a 3D mesh tool).
- **Provide a control to choose custom double-tap behavior, off by default.** People must know which mode they're in and must be able to discover the custom behavior.
- **Avoid double tap for actions that modify content.** Accidental double taps happen unnoticed; prefer easily undone actions and never destructive ones.
- **Treat squeeze as a single quick gesture for a discrete action.** People squeeze hard; holding or repeating tires them. Respond to one squeeze and show the result promptly. Squeeze works only when the iPad screen is on and the pencil isn't touching it, so people may not see the result.
- **Show squeeze-revealed UI close to Apple Pencil Pro.** Displaying it near the tip strengthens the connection and keeps people on task.
- **Define squeeze actions that are nondestructive and easy to undo.** Squeezes can be unintentional.
- **Make Scribble text entry fluid.** It works by default in text fields, text views, search fields, and editable web content (not password fields); a custom text field must accept writing without a tap or selection first.
- **Make Scribble available wherever text entry feels natural.** In Reminders, writing below the last item creates a new reminder even though no text field is there (`UIIndirectScribbleInteraction`).
- **Avoid distracting people while they write.** No autocompletion text; hide placeholder text the moment writing starts.
- **Keep the text field stationary while people write.** If a field must move or resize (e.g. a search field making room for results), delay it until people pause.
- **Prevent autoscrolling while people write or edit.** Scrolling makes people avoid the moving text and can shift the selected range.
- **Give people enough space to write.** Enlarge the field before writing begins or during a pause, never mid-stroke (`UIScribbleInteraction`).
- **PencilKit: keep markup sharp over existing content.** Canvas colors adapt to Dark Mode by default; disable that when people draw on a PDF or photo.
- **Show undo and redo buttons in a compact environment.** The PencilKit tool picker includes them only in a regular environment; add them to a toolbar and consider the standard 3-finger undo/redo gesture.
</best_practices>

<anti_patterns>
- Don't require a tap or mode switch before marking or writing.
- Don't let any control ignore Apple Pencil.
- Avoid a hover preview that varies with height; avoid hover-triggered actions; avoid previews at the extremes of a range.
- Avoid double tap or squeeze for destructive or content-modifying actions; don't turn custom double-tap behavior on by default.
- Don't use barrel roll for navigation or displaying controls.
- Avoid autocompletion, visible placeholder text, field movement, resizing, or autoscrolling while people write.
</anti_patterns>
</topic>

<topic name="Digital Crown" source="https://developer.apple.com/design/human-interface-guidelines/digital-crown" updated="2023-12-05">
Hardware input on Apple Vision Pro and Apple Watch. On Apple Vision Pro it is system-only: adjust volume, adjust immersion in a portal, an Environment, or a Full Space app or game, recenter content, open Accessibility settings, and exit to the Home View; visionOS apps receive no direct Digital Crown information. On Apple Watch, turning it navigates and can drive app interactions, while presses are reserved by watchOS (e.g. revealing the Home Screen).

<best_practices>
- **Anchor your app's navigation to the Digital Crown.** Since watchOS 10 it is the primary navigation input: Smart Stack widgets on the watch face, vertical movement through the Home Screen, switching vertically paginated tabs, and scrolling lists and variable-height pages. Keep list, tab, and scroll views vertical, and back every crown interaction with a corresponding touch interaction.
- **Consider the Digital Crown for inspecting data where navigation isn't needed.** In World Clock, turning it advances the time of day at the selected location for comparison.
- **Provide visual feedback in response to every turn.** Pickers change their displayed value; if you track turns directly (`WKCrownDelegate`), update the interface programmatically, or people assume turning has no effect.
- **Update the interface to match turn speed.** People expect precise control; avoid updating so fast that values are hard to select.
- **Use the default haptic feedback when it makes sense.** Most models give linear haptic detents per distance turned; tables give detents as new rows appear. Turn detents off if they don't match your animation, or switch a table with very different row heights to linear detents for consistency.
</best_practices>

<platform_considerations>
- **visionOS:** System functions only; no app access to crown data.
- **watchOS:** Apps never receive presses. Not supported in iOS, iPadOS, macOS, or tvOS.
</platform_considerations>

<anti_patterns>
- Don't design around crown presses.
- Don't leave crown turns without visual feedback.
- Avoid update rates that make values hard to select.
- Don't make a crown interaction the only way; pair it with touch.
</anti_patterns>
</topic>

<topic name="Action button" source="https://developer.apple.com/design/human-interface-guidelines/action-button" updated="2023-09-12">
On supported iPhone and Apple Watch models the Action button runs an App Shortcut or a system function (flashlight; on Apple Watch Ultra, workouts and dives). People pick its function during setup or later in Settings; pressing it runs the App Shortcut just as Siri or Spotlight would. Treat it as another fast path to a function people use regularly. iOS and watchOS only.

<best_practices>
- **Support the Action button with your app's essential functions.** A cooking app's "Start Egg Timer", for example. Don't offer an App Shortcut that just opens the app; the system, app icon, widgets, and complications already do that.
- **Write a short label for each action.** People see it in Settings. Use title-style capitalization, begin with a verb, use present tense, omit articles and prepositions, maximum three words: "Start Race", not "Started Race" or "Start the Race".
- **Let the system show people how to use the Action button with your app.** Settings already helps people configure it; don't repeat that guidance or other system usage tips.
</best_practices>

<platform_considerations>
- **iOS:** Let people use actions without leaving their current context, using Live Activities and custom snippets rather than opening the app: "Set Timer" prompts for a duration and then starts a Live Activity countdown.
- **watchOS:** A first press can drop a waypoint, start a dive, or begin a specific workout; subsequent presses support secondary actions such as marking a segment or moving to the next modality of a multi-part workout. Consider one secondary function that supports or advances the primary action; people press without looking, so it must flow logically from the first press and be easy to learn and remember. Consider carefully before offering more than one secondary function (cognitive load). Prefer subsequent presses for additional functionality, not for stopping or concluding; offer stop within the interface. Pause the current function when people press the Action button and side button together, except in a diving app where pausing could make the diver lose track of depth or time underwater.
</platform_considerations>

<anti_patterns>
- Don't offer an "open the app" action.
- Avoid labels longer than three words, with articles or prepositions, or in past tense.
- Avoid content that repeats the system's Action button guidance.
- watchOS: avoid several secondary functions; avoid using a subsequent press to stop or conclude the task.
</anti_patterns>
</topic>

<topic name="Camera Control" source="https://developer.apple.com/design/human-interface-guidelines/camera-control" updated="2024-09-09">
On iPhone 16 and iPhone 16 Pro models the Camera Control opens your app's camera experience. A light press shows an overlay extending from the bezel, a light double press shows the available controls, and sliding a finger adjusts the selected control. Two control types: a *slider* for a continuous range (e.g. contrast) and a *picker* for discrete options (e.g. viewfinder grid on or off); the system also provides standard zoom factor and exposure bias controls (`AVCaptureControl`). iOS only.

<best_practices>
- **Use SF Symbols to represent control functionality.** Custom symbols aren't supported; pick from the Camera & Photos section. Symbols show the function, not the current state.
- **Keep control names short.** Labels follow Dynamic Type sizes and long names obscure the viewfinder.
- **Include units or symbols with slider values.** EV, %, or a custom string (`localizedValueFormat`) tells people what the slider controls.
- **Define prominent values for sliders.** The most frequently chosen or evenly spaced values, like the major zoom increments; the system lands on them more easily (`prominentValues`).
- **Make space for the overlay in the viewfinder.** The overlay and labels occupy the screen area adjacent to the Camera Control in portrait and landscape; keep your UI out of those areas, maximize the viewfinder's height and width, and let the overlay appear over it.
- **Minimize distractions in the viewfinder.** Don't duplicate sliders and toggles in your UI that the overlay already shows.
- **Enable or disable controls per camera mode.** Disable video controls when taking photos; controls can't be added or removed at runtime.
- **Arrange controls by frequency.** Commonly used controls in the middle, lesser ones on either side; the system remembers the last control used in your app.
- **Let people launch your experience from anywhere.** A locked camera capture extension (`LockedCameraCapture`) lets the Camera Control open your camera from the locked device, the Home Screen, or inside other apps.
</best_practices>

<anti_patterns>
- Don't use custom symbols; don't use symbols to show state.
- Avoid long control names.
- Avoid slider values without units or context.
- Avoid placing UI where the overlay appears.
- Avoid duplicating overlay controls in the viewfinder.
</anti_patterns>
</topic>

<topic name="Remotes" source="https://developer.apple.com/design/human-interface-guidelines/remotes" updated="unknown">
The Siri Remote is the primary tvOS input: specific buttons plus a clickpad with a touch surface for swipe and press. Outside active gameplay people expect standard remote behavior in every app. tvOS only.

<best_practices>
- **Prefer standard gestures for standard actions.** Redefining or repurposing remote behavior causes confusion and complexity, except during gameplay.
- **Be consistent with the tvOS focus experience.** Always move focus in the same direction as the gesture.
- **Provide clear feedback for gestures.** Lightly resting a thumb on the remote can show where to swipe down to reveal an info area.
- **Define new gestures only when it makes sense.** Fine within gameplay; elsewhere people don't want to discover or remember new ones.
- **Differentiate press from tap, and don't respond to inadvertent taps.** Pressing is intentional (choose a button, confirm a selection, act in gameplay). Taps suit navigation or showing information, but people tap accidentally when resting a thumb, picking up, moving, or handing over the remote, so avoid responding to taps during live video playback.
- **Consider positional taps (up, down, left, right) for navigation or gameplay** only if intuitive and discoverable.
- **Open the parent of the current screen when people press Back.** At the top level the parent is the Apple TV Home Screen; inside an app the parent is defined by hierarchy, not necessarily the previous screen. During gameplay, where repeated accidental presses are easy, Back opens an in-game pause menu; a further press closes the menu and resumes. Press and hold Back always goes to the Home Screen.
- **Respond correctly to Play/Pause during media playback.** Play, pause, or resume.
- **Swipe and press semantics.** Swiping scrolls large item sets with fast-then-slowing movement; swiping on the remote's edge speeds through items. Pressing activates a control or selects an item; pressing before swiping enters scrubbing mode.
- **Live-viewing apps with an EPG: respond to a compatible remote's EPG buttons as expected.** A "guide" or "browse" button opens the EPG; "page up" or "page down" navigate the guide while browsing (and nothing else). People can also tap the upper or lower touch surface to browse. Without an EPG, the system routes these presses to the device's default guide app. While content plays, "page up" and "page down" change the channel.
</best_practices>

<specs>
| Button or area | Expected in an app | Expected in a game |
|---|---|---|
| Touch surface (swipe) | Navigates; changes focus | Directional pad behavior |
| Touch surface (press) | Activates a control or item; navigates deeper | Primary button behavior |
| Back | Returns to previous screen; exits to Apple TV Home Screen | Pauses/resumes gameplay; returns to previous screen, exits to main game menu, or exits to Home Screen |
| Play/Pause | Activates, pauses, or resumes media playback | Secondary button behavior; skips intro video |
</specs>

<anti_patterns>
- Avoid redefining standard remote behavior outside gameplay.
- Avoid responding to taps during live video playback.
- Avoid sending Back anywhere other than the parent screen (or the pause menu in a game).
- Avoid responding to page up/down in other ways while people browse the EPG.
</anti_patterns>
</topic>

<topic name="Game controls" source="https://developer.apple.com/design/human-interface-guidelines/game-controls" updated="2025-06-09">
Games take input from physical controllers or each platform's default interaction (touch, a remote, mouse and keyboard, eyes and hands). Always support the default because not every player has a controller and players like the method they already know. Updated in 2025 with touch control practices, a controller-to-UI map, and visionOS spatial controllers.

<when_to_use>
- Virtual controls over game content suit games with many actions or player-controlled movement; when direct interaction is more immersive, let players tap in-game objects instead (tap to select rather than a selection button) (2025).
- Physical controllers are optional on iOS, iPadOS, and macOS; tvOS and visionOS can require one, but the game must still open gracefully without it.
</when_to_use>

<best_practices>
- **Place virtual buttons where they're easy to reach (2025).** Respect device bounds and safe areas; don't overlap the Home indicator or Dynamic Island; put frequently used buttons near the thumb, outside the circular regions where players expect movement and camera input; put secondary controls like menus at the top of the screen. `TouchController` adds virtual controls.
- **Make controls large enough (2025).** Frequently used controls at least 44x44 pt; less important controls such as menus at least 28x28 pt.
- **Always include visible and tactile press states (2025).** A visual effect such as a glow that stays visible under the finger, combined with sound and haptics.
- **Use symbols that communicate the action (2025).** A weapon graphic for attack; not abstract shapes or controller names like A, X, or R1.
- **Show and hide virtual controls to reflect gameplay (2025).** Hide unavailable or irrelevant actions; e.g. hide movement controls until the player touches the screen, fade the thumbstick at rest, and highlight it toward the movement direction.
- **Combine functionality into a single control (2025).** Redesign mechanics that need simultaneous or sequenced presses; use double tap and touch-and-hold for variants (hold for a powered-up attack); merge walk and sprint into one control.
- **Map movement and camera to predictable sides (2025).** Movement on the left of the screen, camera on the right, with the largest possible input areas. Show the virtual thumbstick wherever the thumb lands rather than at a fixed position; pan the camera with direct touch instead of a thumbstick.
- **Support the platform's default interaction method.** Every iPhone and iPad has a touchscreen, every Mac a keyboard and trackpad or mouse, every Apple TV a remote, and every Apple Vision Pro responds to eyes and hands. Provide that fallback whenever you support controllers.
- **Tell people about controller requirements.** tvOS and visionOS can require a controller (`GCRequiresControllerUserInteraction`); the App Store shows a "Game Controller Required" badge. People can still open the game without one, so check for it and prompt gracefully.
- **Automatically detect a paired controller and its profile** rather than requiring manual setup (Game Controller framework).
- **Customize onscreen content to match the connected controller.** The framework names elements by placement, but real controllers' colors and symbols differ; use the connected controller's labeling scheme (`GCControllerElement`).
- **Map controller buttons to expected UI behavior outside gameplay (2025).** See specs; follow the conventions on every Apple platform.
- **Support multiple connected controllers.** Use labels and glyphs matching the controller the player is actively using; in multiplayer, refer to each player's own controller; when referring to buttons on several controllers, list them together.
- **Prefer symbols, not text, for controller elements.** SF Symbols cover most elements across controller brands and spare inexperienced players from hunting for a label mid-game.
- **Keyboards: prioritize single-key commands.** Faster alongside a mouse or trackpad; use first letters (I for Inventory, M for Map) and put the main action on the large Space bar.
- **Test key-binding comfort on an Apple keyboard.** A Control (^) binding from another keyboard may belong on Command, which sits beside the Space bar near W, A, S, D.
- **Take key proximity into account.** Put other high-value commands near W, A, S, D; map closely related actions to adjacent keys, e.g. number keys for inventory categories.
- **Let players customize key bindings.** Provide sensible defaults, but many players need remapping for comfort and play style.
</best_practices>

<platform_considerations>
- **visionOS (2025):** Support spatial game controllers such as the PlayStation VR2 Sense controller so they mirror hand input: look at an object and press the left or right trigger to interact indirectly, or reach out and press a trigger to interact directly.
- **iOS, iPadOS, macOS, tvOS:** no additional considerations. **watchOS:** not supported.
</platform_considerations>

<specs>
Touch control sizes: frequently used controls 44x44 pt minimum; secondary controls (menus) 28x28 pt minimum.
Controller-to-UI map outside gameplay (all platforms):
| Button | Expected UI behavior |
|---|---|
| A | Activates a control |
| B | Cancels an action or returns to the previous screen |
| X, Y | Unassigned |
| Left / Right shoulder | Navigates left / right to a different screen or section |
| Left / Right trigger | Unassigned |
| Left/right thumbstick, directional pad | Moves selection |
| Home/logo | Reserved for system controls |
| Menu | Opens game settings or pauses gameplay |
</specs>

<anti_patterns>
- Avoid a controller-only game without a fallback where the platform can't require one.
- Avoid abstract shapes or A/X/R1 names as virtual button artwork.
- Avoid virtual buttons over the Home indicator, Dynamic Island, or thumb movement regions.
- Avoid virtual controls with no visible and tactile press state.
- Avoid mechanics requiring simultaneous or sequenced presses on touch.
- Avoid a static thumbstick position or a camera thumbstick when direct touch works.
- Avoid text labels for controller buttons when symbols exist.
- Avoid fixed, non-remappable key bindings.
</anti_patterns>
</topic>

<topic name="Gyroscope and accelerometer" source="https://developer.apple.com/design/human-interface-guidelines/gyro-and-accelerometer" updated="unknown">
Motion data (Core Motion) supports real-time motion-based experiences in iOS, iPadOS, and watchOS; tvOS apps can use gyroscope data from the Siri Remote.

<best_practices>
- **Use motion data only for a tangible benefit.** Fitness feedback, gameplay enhancement; never gather data just to have it.
- **Explain why you need motion data.** Required copy appears in the system permission request the first time you access it, and people can deny access.
- **Outside active gameplay, avoid using motion to directly manipulate the interface.** Motion gestures are hard to repeat precisely, physically challenging for some people, and cost battery.
</best_practices>

<anti_patterns>
- Avoid collecting motion data without a purpose.
- Avoid motion-driven UI manipulation outside gameplay.
</anti_patterns>
</topic>

<topic name="Nearby interactions" source="https://developer.apple.com/design/human-interface-guidelines/nearby-interactions" updated="2023-06-21">
Experiences that build on the presence of nearby people and objects, like handing music from iPhone to HomePod mini by bringing the devices together. They require Ultra Wideband hardware and the `NearbyInteraction` framework; people grant permission per app, and sessions use random device identifiers that live only as long as the session. iOS, iPadOS, watchOS.

<best_practices>
- **Look to the physical world for inspiration.** Ground tasks in physical actions (bringing devices close) so they feel natural.
- **Use distance, direction, and context to inform an interaction.** The share sheet can suggest the closest contact the person is facing.
- **Let changing distance guide the interaction.** Feedback should sharpen with proximity, as iPhone's AirTag arrow becomes a pulsing circle.
- **Provide continuous feedback** that responds to movement, as Find My does while locating an item.
- **Combine visual, audible, and haptic feedback.** Visual while people look at the screen; audio and haptics while they engage with the environment.
- **Avoid using a nearby interaction as the only way to perform a task.** Not everyone can experience it.
- **Encourage portrait orientation.** Landscape reduces the accuracy and availability of distance and direction; give implicit visual cues about how to hold the device rather than telling people explicitly.
- **Design for the sensor's directional field of view,** similar to the Ultra Wide camera on iPhone 11 and later; outside it you may get distance but not direction.
- **Explain that intervening people, animals, or large objects reduce accuracy,** e.g. in onboarding or tutorials.
</best_practices>

<platform_considerations>
- **iOS:** APIs provide a peer device's distance and direction.
- **watchOS:** APIs provide distance only; every participating watchOS app must be in the foreground.
- **iPadOS:** no additional considerations. **macOS, tvOS, visionOS:** not supported.
</platform_considerations>

<anti_patterns>
- Avoid a nearby interaction as the sole path to a task.
- Avoid explicit "hold in portrait" instructions when implicit cues suffice.
</anti_patterns>
</topic>

<decision_guide>
**Inputs each platform must support, and what never to depend on alone**
| Platform | Must support | Also expect | Never the only path |
|---|---|---|---|
| iOS | Touch with standard gestures; three-finger undo/redo and copy/paste; shake undo; Full Keyboard Access; voice and Switch Control via accessibility | Physical keyboard, pointing device, game controller, Action button (App Shortcuts), Camera Control (iPhone 16), motion, nearby interactions | Custom gestures, shake, motion, nearby interaction, Action button |
| iPadOS | Touch; four-finger app switch; pointer with system content effects and 12/24 pt hit padding; Full Keyboard Access; focus for content elements | Apple Pencil (every control must respond), Scribble in all text areas, hardware keyboard, controllers | Apple Pencil-only or pointer-only paths, custom gestures |
| macOS | Keyboard and mouse or trackpad; standard shortcuts; systemwide trackpad gestures; focus ring and highlight; standard NSCursor pointers | Magic Trackpad and Magic Mouse gestures, game controllers | Custom trackpad gestures, custom shortcuts |
| tvOS | Siri Remote swipe and press; Back to parent; Play/Pause for media; every element focusable via directional focus | Compatible remotes with EPG buttons, game controllers (may be required), keyboard arrow keys, Siri Remote gyroscope | A pointer, custom remote gestures outside gameplay, taps during live playback |
| visionOS | Eyes plus indirect gestures on every standard component; system hover effects; direct versions of standard gestures | Keyboard (Command shows shortcut interface), pointing device, controllers including spatial, custom hand gestures only in a Full Space with permission | Direct gestures, custom gestures, a specific hand or body position, hover effects as logic triggers |
| watchOS | Touch; Digital Crown navigation with touch equivalents; double tap scrolling and primary action | Action button (App Shortcuts, workouts, dives), nearby interaction (distance only, foreground only) | Crown presses (unavailable), crown-only interactions, double-tap primary action in scrolling views |

**When a custom gesture is acceptable**
- Only for a specialized, frequent task no standard gesture covers, typically in a game or drawing app; otherwise use the standard gesture and its standard meaning.
- It must be discoverable, straightforward, distinct from other gestures, taught in the app, and never the only way to perform an important action. If it can't be described with simple words and pictures, drop it.
- It must not collide with system gestures: watchOS edge swipe; visionOS palm look, hand turn, and hand/wrist/forearm roll; macOS Dock and Mission Control trackpad gestures; standard Siri Remote behavior outside gameplay; standard Apple Pencil double tap and squeeze settings.
- visionOS adds: run in a Full Space with hand-data permission, test ergonomics, keep arms low, offer a lower-movement alternative to multi-finger or two-handed gestures, never require a specific hand, and defer system overlays only in immersive games that need it.
- Games may use custom gestures, simultaneous gestures, and custom remote behavior during active gameplay, but menus and UI still follow the platform conventions (controller A activates, B cancels, Menu pauses; Back opens the pause menu).

**Making every gesture-driven action reachable by a visible control**
- Shortcut gesture → keep the standard control: swipe back plus a Back button; three-finger undo plus Undo and Redo buttons (required in compact PencilKit environments); edge swipe plus a visible toolbar action.
- Apple Pencil hover, double tap, squeeze, barrel roll → the same tool changes are available in the tool picker or an onscreen control, and any custom double-tap mode has a visible mode control.
- Digital Crown turn → an equivalent touch interaction (scroll, tap, picker) in the same view.
- watchOS double tap → it performs a button already visible in the view; keep that button.
- Action button and Camera Control → the same App Shortcut and camera controls remain in the app; overlay controls map to in-app settings.
- Nearby interaction and motion → a normal UI path (share sheet, button) for the same task.
- Game controller → touch controls, keyboard, remote, or eyes and hands as the fallback; virtual buttons show press states and action symbols.
- Keyboard shortcut → a menu command or toolbar button carries the same action; in visionOS the shortcut interface lists only commands with shortcuts, so give them descriptive titles.
- Pointer hover reveal (minimized toolbar, video controls) → the same control is reachable by touch or keyboard.
- Custom hover effect (visionOS) → purely visual; the action itself lives on a tappable control.

**Which effect or indicator**
- iPadOS pointer: highlight for small transparent-background elements; lift for small opaque elements (provide the corner radius for nonstandard shapes); hover for large elements; magnetism only on lift and highlight.
- Focus indicator: ring for text and search fields; row highlight for lists and collections; iPadOS halo for custom views and opaque cell images; tvOS parallax with all five states.
- visionOS look targets: rounded shapes, 16 pt margins or 60 pt center spacing, one containing shape per multi-element component, standard hover effect unless a special moment justifies a custom one (choose no, short, or long delay by purpose).
- tvOS Back button: parent screen in apps; pause menu in games. Play/Pause: media in apps; secondary button or skip intro in games.
</decision_guide>

<quick_checklist>
- [ ] Every gesture-driven action also has a visible standard control (Back button, menu item, toolbar button, picker)?
- [ ] No standard gesture (tap, swipe) repurposed for an app-unique action, and no invented gesture for a standard action?
- [ ] Custom gestures are discoverable, taught in-app, distinct, optional, and free of conflicts with system gestures?
- [ ] Unavailable gestures and controls look visibly different from available ones?
- [ ] iPadOS: every control responds to Apple Pencil; pointer effects follow highlight/lift/hover rules with about 12 pt (bezel) or 24 pt (no bezel) hit padding; Scribble works in every text area without a tap; fields stay still while writing?
- [ ] Standard keyboard shortcuts untouched; custom shortcuts lead with Command, list modifiers as Control-Option-Shift-Command, avoid Control; Full Keyboard Access works?
- [ ] Focus: system effects only; focus never moves without interaction; tvOS makes every element focusable and shows no pointer; iPadOS and macOS focus only content elements?
- [ ] visionOS: interactive items rounded with 16 pt margin or 60 pt center spacing; content at least 1 m away; indirect gestures on all UI; nothing anchored to hands; no hand-roll gesture; custom hover effects rare and tested on device?
- [ ] watchOS: navigation anchored to the Digital Crown with touch equivalents and visual feedback on every turn; no reliance on crown presses; no double-tap primary action in scrolling views?
- [ ] Action button labels are at most three words, verb-first, present tense, with no "open app" action; watchOS offers at most one well-considered secondary function and pauses on Action plus side button?
- [ ] Camera Control uses SF Symbols only, short names, units on sliders, prominent values, and keeps UI clear of the overlay areas?
- [ ] tvOS remote: Back opens the parent (pause menu in games), Play/Pause drives media, taps ignored during live playback, focus moves with the swipe direction?
- [ ] Games: platform default input works as a fallback; touch controls at least 44x44 pt (menus 28x28 pt) with press states and action symbols; controller UI map followed (A activates, B cancels, Menu pauses); key bindings remappable?
- [ ] Motion and nearby interactions are optional enhancements with permission copy, portrait guidance, and an alternate path?
</quick_checklist>
