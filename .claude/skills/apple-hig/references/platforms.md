<overview>
Distills the platform pages of the HIG: designing-for-ios, designing-for-ipados, designing-for-macos, designing-for-tvos, designing-for-visionos, designing-for-watchos, designing-for-games, and designing-for-iphone-duo (new page, 2026-09-09). Each page describes the device characteristics that distinguish a platform (display, ergonomics, inputs, app interactions, system features) and the best practices that make an app or game feel at home there. Load this file when starting a design for a specific Apple platform, porting an app or game between platforms, reviewing whether an interface fits its device and viewing distance, or adapting an iPhone app to iPhone Duo's two displays, device poses, reserved regions, and vertical controls. Component-level rules live in the other area files.
</overview>

<topic name="Designing for iOS" source="https://developer.apple.com/design/human-interface-guidelines/designing-for-ios" updated="unknown">
People depend on iPhone to stay connected, play games, view media, accomplish tasks, and track personal data anywhere and on the go. Design for one- or two-handed use at close range, with few onscreen controls and seamless adaptation to appearance changes. The page points to Liquid Glass and the new design system as the current visual language (2025).

<characteristics>
- **Display.** Medium-size, high-resolution.
- **Ergonomics.** Held in one or both hands, switching between landscape and portrait as needed; viewing distance no more than a foot or two.
- **Inputs.** Multi-Touch gestures, virtual keyboards, and voice (Siri). People often want apps to use their personal data (see Privacy), the gyroscope and accelerometer, and spatial interactions.
- **App interactions.** A minute or two (checking updates, tracking data, messaging) or an hour or more (browsing, games, media). Multiple apps open; frequent switching among them.
- **System features.** Widgets, Home Screen quick actions, Spotlight (searching), Shortcuts (Siri shortcuts and suggestions), Activity views.
</characteristics>

<best_practices>
- **Limit the number of onscreen controls so people can concentrate on primary tasks and content.** Make secondary details and actions discoverable with minimal interaction.
- **Adapt seamlessly to appearance changes.** Device orientation, Dark Mode, and Dynamic Type must all work so people can choose the configurations that suit them.
- **Support interactions that accommodate how people hold the device.** Controls in the middle or bottom area of the display are easier and more comfortable to reach, so it is especially important to let people swipe to navigate back or to initiate actions in a list row.
- **With permission, integrate platform capabilities so people don't have to enter data.** For example, accept payments, provide security through biometric authentication, or use the device's location.
</best_practices>
</topic>

<topic name="Designing for iPadOS" source="https://developer.apple.com/design/human-interface-guidelines/designing-for-ipados" updated="unknown">
People value the power, mobility, and flexibility of iPad for media, games, detailed productivity tasks, and creation. Use the large display to elevate content and support every input mode, alone or combined. The page also points to (2025) guidance on responsive layouts for resizable app windows, accommodating window controls, building a menu bar, and the updated pointer, plus Liquid Glass and the new design system.

<characteristics>
- **Display.** Large, high-resolution.
- **Ergonomics.** Often held, but also set on a surface or a stand; viewing distance varies with position, typically within about 3 feet.
- **Inputs.** Multi-Touch gestures and virtual keyboards, an attached keyboard or pointing device, Apple Pencil (and Scribble), or voice; people often combine input modes.
- **App interactions.** A few quick actions, or hours immersed in games, media, content creation, or productivity. Multiple apps open, more than one onscreen at once, and inter-app capabilities like drag and drop.
- **System features.** Multitasking, Widgets, Drag and drop.
</characteristics>

<best_practices>
- **Take advantage of the large display to elevate the content people care about.** Minimize modal interfaces and full-screen transitions, and position onscreen controls where they are easy to reach but not in the way.
- **Use viewing distance and input mode to determine the size and density of onscreen content.**
- **Let people use Multi-Touch gestures, a physical keyboard or trackpad, or Apple Pencil,** and consider unique interactions that combine multiple input modes.
- **Adapt seamlessly to appearance changes and transition effortlessly to running in macOS.** Device orientation, multitasking modes, Dark Mode, and Dynamic Type all change; let people choose the configurations that work best for them.
</best_practices>
</topic>

<topic name="Designing for macOS" source="https://developer.apple.com/design/human-interface-guidelines/designing-for-macos" updated="unknown">
People rely on the power, spaciousness, and flexibility of a Mac for in-depth productivity, media, and games, often with several apps at once. Present more content with less nesting and modality, put every command in the menu bar, and let people shape windows and toolbars to their work style. The page points to Liquid Glass, the new design system, and (2025) AppKit guidance for tab views, split views, bars, presentations, search, controls, and Liquid Glass in custom UI.

<characteristics>
- **Display.** Typically large and high-resolution; people extend their workspace with additional displays, including their iPad.
- **Ergonomics.** Stationary, often on a desk or table; viewing distance about 1 to 3 feet.
- **Inputs.** Any combination of physical keyboards, pointing devices, game controls, and Siri.
- **App interactions.** A few minutes of quick tasks to several hours of deep concentration. Multiple apps open; people expect smooth transitions between active and inactive states when switching apps.
- **System features.** The menu bar, File management, Going full screen, Dock menus.
</characteristics>

<best_practices>
- **Leverage large displays to present more content in fewer nested levels and with less need for modality,** while maintaining a comfortable information density that doesn't make people strain.
- **Let people resize, hide, show, and move your windows** to fit their work style and device configuration, and support full-screen mode for a distraction-free context.
- **Use the menu bar to give people easy access to all the commands they need.**
- **Help people take advantage of high-precision input modes** for pixel-perfect selections and edits.
- **Handle keyboard shortcuts** so people can accelerate actions and use keyboard-only work styles.
- **Support personalization.** Let people customize toolbars, configure windows to show the views they use most, and choose the colors and fonts they want to see in the interface.
</best_practices>
</topic>

<topic name="Designing for tvOS" source="https://developer.apple.com/design/human-interface-guidelines/designing-for-tvos" updated="2022-09-14">
People enjoy the vibrant content, immersive experiences, and streamlined interactions tvOS delivers in media and games, and in fitness, education, and home utility apps. Design for room-scale viewing driven by the Siri Remote and the focus system.

<characteristics>
- **Display.** Very large, high-resolution.
- **Ergonomics.** Many feet from a stationary TV, often 8 feet or more; people sometimes keep interacting while moving around the room.
- **Inputs.** A remote, a game controller, voice (Siri), and apps running on their other devices.
- **App interactions.** Deep immersion in a single experience, often lasting hours; picture-in-picture to follow another app or video at the same time.
- **System features.** Integrating with the TV app (playing video), SharePlay, Top Shelf, TV provider accounts (managing accounts).
</characteristics>

<best_practices>
- **Support powerful, delightful interactions through the fluid, familiar gestures people make with the Siri Remote.**
- **Embrace the tvOS focus system,** letting it gently highlight and expand onscreen items as people move among them, so they know what to do and where they are at all times.
- **Deliver beautiful, edge-to-edge artwork, subtle and fluid animations, and engaging audio,** wrapping people in a rich, cinematic experience that is clear, legible, and captivating from across the room.
- **Enhance multiuser support.** Make sign-in easy and infrequent, handle shared sign-in, and automatically switch profiles when people change the current viewer.
</best_practices>
</topic>

<topic name="Designing for visionOS" source="https://developer.apple.com/design/human-interface-guidelines/designing-for-visionos" updated="2024-02-02">
On Apple Vision Pro, people enter an infinite 3D space where they engage with an app or game while staying connected to their surroundings. Prefer standard windows for UI-centric tasks, choose the minimum immersion each moment needs, and treat visual comfort as paramount.

<characteristics>
- **Space.** A limitless canvas for windows, volumes, and 3D objects, plus deeply immersive experiences that transport people elsewhere.
- **Immersion.** People fluidly transition between levels. An app launches by default in the Shared Space, where multiple apps run side by side and people open, close, and relocate windows. People can move an app to a Full Space, where it is the only app running and can blend 3D content with surroundings, open a portal to another place, or enter a different world.
- **Passthrough.** Live video from the external cameras lets people see their surroundings while interacting with virtual content; the Digital Crown controls how much passthrough they see.
- **Spatial Audio.** The device models the sonic characteristics of the surroundings so audio sounds natural; with permission to access surroundings information, an app can fine-tune Spatial Audio.
- **Eyes and hands.** Most actions: look at a virtual object (eyes) and make an indirect gesture like a tap; a direct gesture, like touching the object with a finger, also works.
- **Ergonomics.** People rely entirely on the cameras for everything they see, so visual comfort is paramount. The system places content relative to the wearer's head regardless of height or posture (sitting, standing, lying down); visionOS brings content to people rather than making them move, so they can remain at rest.
- **Accessibility.** VoiceOver, Switch Control, Dwell Control, Guided Access, Head Pointer, and more; system UI components build in accessibility support by default.
- **Safety.** Not for use while operating a vehicle or heavy machinery, or while moving around unsafe environments such as near balconies, streets, or stairs. Designed to be fit and used only by people 13 years of age or older (see Apple Vision Pro User Guide).
</characteristics>

<when_to_use>
- Use a standard window (a plane in space with familiar controls) for contained, UI-centric tasks; people can relocate it anywhere, and dynamic scaling keeps content legible near or far.
- Use a fully immersive Full Space context only for the key moments that need it; for each moment pick the minimum level of immersion that suits it (windowed, fully immersive, or in between).
- Use SharePlay for shared activities; participants see each other's spatial Personas as if together in one space.
</when_to_use>

<best_practices>
- **Embrace the unique features of Apple Vision Pro.** Use space, Spatial Audio, and immersion to bring experiences to life, while integrating passthrough and spatial input from eyes and hands in ways that feel at home on the device.
- **Consider different types of immersion for your app's most distinctive moments,** and don't assume every moment needs to be fully immersive.
- **Use windows for contained, UI-centric experiences.**
- **Prioritize comfort.** Display content within a person's field of view, positioned relative to their head. Support indirect gestures so people can interact with hands resting in their lap or at their sides. If you support direct gestures, keep the interactive content close and don't require extended interaction with it.
- **Help people share activities with others** through SharePlay.
</best_practices>

<anti_patterns>
- Don't assume every moment needs to be fully immersive.
- Avoid placing content where people must turn their head or change position to interact with it.
- Avoid motion that is overwhelming, jarring, too fast, or missing a stationary frame of reference.
- Avoid direct-gesture content that is too far away or that people must interact with for extended periods.
- Avoid encouraging people to move too much while in a fully immersive experience.
</anti_patterns>
</topic>

<topic name="Designing for watchOS" source="https://developer.apple.com/design/human-interface-guidelines/designing-for-watchos" updated="2023-06-05">
When people glance at Apple Watch, they expect essential information and simple, timely tasks whether stationary or in motion. Design streamlined, specialized, single-screen interactions with shallow hierarchy driven by the Digital Crown. The page points to watchOS 26 (2025): the new design system, widget updates, and controls on Apple Watch.

<characteristics>
- **Display.** Small, wrist-sized, easy to read, high-resolution.
- **Ergonomics.** No more than a foot away; people raise the wrist to view and use the opposite hand to interact. The Always On display shows information on the watch face when the wrist drops.
- **Inputs.** Turning the Digital Crown navigates vertically or inspects data, consistently on the watch face, the Home Screen, and in apps. Tap, swipe, and drag work even in motion. Pressing the Action button initiates an essential action without looking; shortcuts speed routine tasks. Device data: GPS, blood oxygen and heart sensors, altimeter, accelerometer, gyroscope.
- **App interactions.** Many glances a day at the Always On display; concise interactions of less than a minute each. Related experiences (complications, notifications, Siri interactions) are often used more than the app itself.
- **System features.** Complications, Notifications, Always On, Watch faces.
</characteristics>

<best_practices>
- **Support quick, glanceable, single-screen interactions** that deliver critical information succinctly and let people perform targeted actions with a simple gesture or two.
- **Minimize the depth of navigation hierarchy,** and use the Digital Crown for vertical navigation, scrolling, or switching between screens.
- **Personalize the experience** by proactively anticipating needs and using on-device data to provide actionable content relevant in the moment or very soon.
- **Use complications** to put relevant, potentially dynamic data and graphics on the watch face, viewed on every wrist raise and tappable to dive straight into the app.
- **Use notifications** to deliver timely, high-value information and let people act without opening the app.
- **Use background content such as color to convey supporting information, and materials to illustrate hierarchy and a sense of place.**
- **Design the app to function independently,** complementing notifications and complications with additional details and functionality.
</best_practices>
</topic>

<topic name="Designing for games" source="https://developer.apple.com/design/human-interface-guidelines/designing-for-games" updated="2025-06-09">
When people play a game on an Apple device, they dive into the world you designed while relying on the platform features they love. The guidance is cross-platform; combine it with the Designing-for page of each target platform. Updated 2025 for touch-based controls and Game Center.

<best_practices>
*Jump into gameplay*
- **Let people play as soon as installation completes.** Include as much playable content as possible in the initial installation while keeping download time to 30 minutes or less; download additional content in the background (see Loading).
- **Provide great default settings.** Use the player's device information to choose defaults: the resolution that makes graphics look great, automatic recognition of paired accessories and game controllers, and the player's accessibility settings. Support the platform's most common interaction methods (see Settings).
- **Teach through play.** Fold configuration and onboarding into a playable tutorial that engages people quickly and helps them feel successful right away; offer any written tutorial as a reference, not a prerequisite (see Onboarding).
- **Defer requests until the right time.** Sensors and personalizing data such as hand-tracking require permission (see Privacy); integrate the request into the scenario that needs it, for example between an initial cutscene and the first time hands control the action. Ask for a rating or review only after people have spent quality time with the game (see Ratings and reviews).

*Look stunning on every display*
- **Make sure text is always legible.** Text must contrast well with the background and use at least each platform's recommended minimum size (see specs; see Typography).
- **Make sure buttons are always easy to use.** Too small or too close together frustrates players; each platform defines a minimum based on its default interaction method, for example at least 44x44 pt in iOS for touch (see specs; see Buttons).
- **Prefer resolution-independent textures and graphics;** otherwise match the game's resolution to the device's. In visionOS, prefer vector-based art that keeps looking good as the system dynamically scales it for different distances and angles (see Images).
- **Integrate device features into your layout.** Rounded corners or a camera housing can affect the interface; rely on platform-provided safe areas whenever possible (see Layout; Apple Design Resources includes safe-area templates).
- **Make sure in-game menus adapt to different aspect ratios,** such as 16:10, 19.5:9, and 4:3, and to both orientations on iPhone and iPad if supported, staying legible and usable without obscuring other content. Use dynamic layouts with relative constraints (see In-game menus).
- **Design for the full-screen experience.** In macOS, iOS, and iPadOS, full-screen mode hides other apps and parts of the system UI; in visionOS a game in a Full Space can completely surround people (see Going full screen).

*Enable intuitive interactions*
- **Support each platform's default interaction method.** Touch on iPhone; keyboard and mouse or trackpad on Mac; eyes and hands with indirect and direct gestures in visionOS. Pay special attention to control sizing and menu behavior, especially when bringing a game from a pointer-based context to a touch-based one.
- **Support physical game controllers, while also giving people alternatives.** Every platform except watchOS supports them; a controller simplifies porting and complex mappings, but not every player can use one (see Physical controllers under Game controls).
- **Offer touch-based game controls that embrace the touchscreen on iPhone and iPad (2025).** Let players interact directly with game elements and use virtual controls that appear on top of game content (see Touch controls under Game controls).

*Welcome everyone*
- **Prioritize perceivability.** People must be able to perceive content by sight, hearing, or touch: don't rely solely on color for an important detail, and give cutscenes descriptive subtitles or another way to read the content. Check text sizes, color and effects, motion, interactions, and buttons (see Accessibility).
- **Help players personalize their experience.** No configuration suits everyone; let players customize type size, game control mapping, motion intensity, and sound balance. Apple accessibility technologies are available through system frameworks or Apple's Unity plug-ins.
- **Give players the tools they need to represent themselves.** For avatars, names, or descriptions, support the spectrum of self-identity with options for as many human characteristics as possible.
- **Avoid stereotypes in your stories and characters.** Ask whether enemies or scenarios perpetuate real-life stereotypes of race, gender, or cultural heritage; remove biases, and keep necessary references to real cultures and languages respectful (see Inclusion).

*Adopt Apple technologies*
- **Integrate Game Center (2025)** so players discover the game across devices and connect with friends; it tracks progress and achievements and supports leaderboards, challenges, and multiplayer activities (`GameKit`).
- **Let players pick up their game on any of their devices.** With `GameSave`, game state saves to the player's iCloud account and resumes exactly where they left off elsewhere.
- **Support haptics to help players feel the action.** Core Haptics composes custom haptic patterns, optionally with custom audio; available in iOS, iPadOS, tvOS, and visionOS and on many game controllers (see Playing haptics).
- **Use Spatial Audio to immerse players in the soundscape.** Multichannel audio adapts automatically to the current device and enables Spatial Audio where supported (see Playing audio).
- **Take advantage of Apple technologies for unique gameplay mechanics,** such as augmented reality, machine learning, HealthKit, location, camera, and microphone (see Technologies).
</best_practices>

<specs>
| Platform | Default text | Minimum text | Default button | Minimum button | Default interaction | Additional interaction methods |
|---|---|---|---|---|---|---|
| iOS | 17 pt | 11 pt | 44x44 pt | 28x28 pt | Touch | Game controller |
| iPadOS | 17 pt | 11 pt | 44x44 pt | 28x28 pt | Touch | Game controller, keyboard, mouse, trackpad, Apple Pencil |
| macOS | 13 pt | 10 pt | 28x28 pt | 20x20 pt | Keyboard, mouse, trackpad | Game controller |
| tvOS | 29 pt | 23 pt | 66x66 pt | 56x56 pt | Remote | Game controller, keyboard, mouse, trackpad |
| visionOS | 17 pt | 12 pt | 60x60 pt | 28x28 pt | Touch | Game controller, keyboard, mouse, trackpad, spatial game controller |
| watchOS | 16 pt | 12 pt | 44x44 pt | 28x28 pt | Touch | none |

Other thresholds: initial download 30 minutes or less; aspect ratios to handle include 16:10, 19.5:9, and 4:3; Core Haptics on iOS, iPadOS, tvOS, visionOS, and many game controllers; physical controllers on every platform except watchOS.
</specs>

<anti_patterns>
- Don't make a player's first experience a lengthy download.
- Don't bombard people with permission or review requests before they start playing.
- Don't make a written tutorial a prerequisite for gameplay.
- Avoid fixed layouts as much as possible; create a custom, device-specific layout only when necessary.
- Don't let in-game menus obscure other content or break at other aspect ratios or orientations.
- Don't rely solely on color to convey an important detail.
- Don't ship a cutscene without descriptive subtitles or another way to read the content.
- Don't require a physical game controller; always offer alternatives.
- Avoid depicting enemies or scenarios through stereotypes of race, gender, or cultural heritage.
</anti_patterns>

<related_guidance>
HIG pages the games guide points to: Launching, Onboarding, Loading, Settings, Privacy, Ratings and reviews, Typography, Buttons, Images, Layout, In-game menus (menus), Going full screen, Game controls (Physical controllers, Touch controls), Gestures, Pointing devices, Accessibility, Inclusion, Game Center, iCloud, In-app purchase, Playing haptics, Playing audio, Technologies, and the per-platform Designing-for pages.
</related_guidance>
</topic>

<topic name="Designing for iPhone Duo" source="https://developer.apple.com/design/human-interface-guidelines/designing-for-iphone-duo" updated="2026-09-09">
(2026) iPhone Duo is the first folding iPhone: an outer display and an inner display, each with its own front-facing camera, joined by a center hinge. An app designed for it adapts seamlessly to both displays and provides a continuous experience as the device opens and closes. It is still iPhone, so Designing for iOS patterns and best practices apply; an app that uses standard system components and supports resizing adapts to the device's poses with little adjustment.

<characteristics>
- **Displays.** People use the outer display when the device is closed. It is wider and shorter than other iPhone displays, so the system moves toolbars and tab bars to the side to preserve vertical space for content, and keeps them there when the device opens in landscape so people move between displays at the same vertical height. Size classes: compact width on the outer display, regular width on the inner display.
- **Hinge.** Supports many ways to hold and position the device and shapes the space available for content as the device folds.
- **Cameras.** The outer front-facing camera sits in the corner, is always visible, and is vertically aligned with the side controls. The inner camera is behind the display and hidden until the camera is active.
- **Device poses.** Partially folded like a book, placed down on a surface, or standing on its edges. Supporting poses does not mean a custom layout per pose: use size classes so the app adapts naturally as it changes size, and let the existing layout expand into the available space.
- **Multitasking.** In Split View multitasking two apps share the inner display, each placing controls along its own outer edge (the left app on the left).
- **Vertical control stack.** The side holds system and app elements: the Dynamic Island, the status bar, the toolbar (including navigation buttons), and the tab bar. Because they align with the hardware, they keep the same position relative to the camera and stay on the same side in right-to-left languages.
</characteristics>

<when_to_use>
- Use a split view (`NavigationSplitView`, `UISplitViewController`) for primary/secondary content: it expands on the inner display and collapses to a single pane on the outer display, as between regular and compact environments on other iPhones, and adapts to reserved regions automatically.
- Use a split arrangement view when the layout already places two views side by side or one above the other (an `HStack` or `VStack`); use an overlay arrangement view when it layers one view over another (a `ZStack`).
- Use the full display width without bars for visual, immersive interfaces that don't scroll (Calculator does), as long as nothing conflicts with the Dynamic Island or the status bar; or let a background image or header span the full width while scrollable content stays inset.
- When space is limited: in navigation-focused experiences keep the tab bar and move toolbar items into the overflow menu (the default bar compression behavior); in task-oriented experiences minimize the tab bar to preserve the toolbar actions central to the task (mirrors the minimized tab bar on other iPhones).
</when_to_use>

<best_practices>
*Fundamentals*
- **Build your app to resize.** Two displays, many poses, and Split View multitasking mean many sizes. Use size classes, layout margins, and safe area insets (`safeAreaInsets` on SwiftUI `GeometryProxy` and UIKit `UIView`); avoid fixed widths and display-specific dependencies.
- **Create a consistent experience across displays.** Keep functionality and the state of elements the same between displays. Maintain the information hierarchy, but show an additional level on the larger inner display if it suits the content: Mail shows the email list (primary) or an email (secondary) when closed, and both side by side when open.
- **Maintain the same functionality across device poses.** Controls may overflow and content may move or resize, but provide access to the same controls and content however someone holds or views the device.
- **Follow the system's vertical layout for toolbars, tab bars, and navigation controls.** Standard components receive it automatically; refine only as the app needs.
- **Make your game playable in every device pose.** You may lock to portrait or landscape, but fill the screen as the pose changes and keep text and control sizes as consistent as possible. Prefer changing the aspect ratio over letterboxing or pillarboxing; if unavoidable, add artwork to the padding area so the experience feels full screen.

*Dynamic layouts and reserved regions*
- **Adapt to reserved regions** (see specs). Alerts, context menus, and sheets move to account for the fold automatically, and split views adapt their columns' width and margins to match the symmetry of the inner display. For custom components, use the reserved region APIs to reposition content away from reserved regions.
- **Adapt your layout when the device folds.** Prefer a container that adapts automatically, like the Notes split view that adjusts each pane's width to stay clearly visible. In a grid-style layout, prefer an even number of columns so content divides cleanly. Use the reserved region APIs to keep important elements clear of the center if the system doesn't move them.
- **Avoid extreme layout changes as people fold the device.** Move only what is necessary to keep elements visible and easy to tap; controls that disappear or shift dramatically are harder to find and track, so favor small adjustments over rearrangement.

*Arrangement views*
- **Consider an arrangement view when your layout already resembles one.** It holds a primary and a secondary view and organizes them by display size, orientation, and reserved regions (behaviors in specs). You can limit which axes a split arrangement uses and collapse the secondary view of an overlay arrangement.
- **Keep navigation outside of arrangement views.** They lay out content but don't handle navigation; wrap navigation split views and tab views around them, never within.

*Vertical controls*
- **Account for asymmetry in your layouts.** Controls along one edge make the content space asymmetrical. Use safe areas so controls don't cover content, including controls on the opposite edge when two apps share the inner display.
- **Keep controls consistent across device poses.** Not every pose places controls vertically and space varies, so keep controls' relative positions as similar as possible so people don't relearn where actions live.
- **Follow the standard placement order for toolbar items.** Reserve the top of the vertical axis for primary navigation controls (Back, Close), then prominent actions (Done). Keep remaining items in their original groupings; the system inserts vertical space between items from the top and bottom bars to keep them distinct.
- **Prioritize frequently used toolbar items.** Items overflow from bottom to top by default. Assign visibility priority (`ToolbarItemVisibilityPriority`, `UIBarButtonItemVisibilityPriority`) to whole groups first, then individual items. Preserve frequent actions first (Compose in Mail, New Note in Notes) and keep status-bearing items, like badged items, visible longer.
- **In general, don't override the default bar placement.** Vertical control position is a core pattern of iPhone Duo; familiar positions help people learn the app immediately and reinforce the unified platform experience.
- **Group related toolbar items instead of spacing them manually.** `ToolbarItemGroup` and `UIBarButtonItemGroup` space items and groups automatically and adapt as space changes; never add fixed spacing (see Toolbars).
- **Locate controls near the content they affect.** Controls for a content area other than the one along the trailing edge stay with that area: in Mail, list controls stay above the leading pane rather than moving to the side.
- **Provide both a title and a symbol for each toolbar item that isn't text-only.** The system picks the representation for the context and uses the title in overflow menus and expanded forms (`Label`, `UIBarButtonItem`).
- **Keep text-based buttons to a minimum.** Labels that include text stay in a horizontal bar, so prefer a symbol wherever one works.
- **Use the system overflow menu.** Move any app-specific overflow actions into it (`ToolbarOverflowMenu`, `additionalOverflowItems`) so everything is in one place. Reserve the ellipsis symbol for overflow; give other menus a distinct symbol.
</best_practices>

<specs>
Bar placement by context:
| Context | Toolbar, tab bar, navigation controls |
|---|---|
| Outer display (closed) | On the side (vertical axis) |
| Inner display, landscape | On the side, same vertical height as on the outer display |
| Inner display, portrait | Standard horizontal bars (enough vertical space) |
| Split View multitasking, inner display | Each app's controls along its own outer edge |
| Right-to-left languages | Same side (aligned with hardware) |

Reserved regions:
| Region | Present | Behavior |
|---|---|---|
| Outer front-facing camera | Always | Expands into the Dynamic Island for Live Activities; the system arranges side controls around it |
| Inner front-facing camera | Only while the camera is active | Invisible when inactive; when it activates, the UI moves aside |
| Folding region | When partially open | Divides the inner display into multiple usable regions, excluding the center |

Arrangement views:
| Type | Behavior |
|---|---|
| Split | Divides its area horizontally when wider than tall, vertically when taller than wide; axes can be limited |
| Overlay | Partially folded: views occupy each side; otherwise primary view atop secondary; secondary can be collapsed |

Width size classes: outer display compact, inner display regular. Toolbar overflow: bottom to top by default, reordered by visibility priority (groups, then items). Grids: prefer an even number of columns.
</specs>

<anti_patterns>
- Don't design a custom layout per device pose, and don't reinvent the app when it resizes; let the existing layout expand.
- Avoid fixed widths and anything tied to a specific display.
- Avoid extreme layout changes or dramatically shifting controls as the device folds.
- In general, don't override the default vertical bar placement.
- Don't add fixed spacing between toolbar items; use groups.
- Don't put navigation containers inside an arrangement view.
- Don't let a full-width layout conflict with the Dynamic Island or the status bar.
- Don't keep a separate app overflow menu, and don't use the ellipsis symbol for anything but overflow.
- Don't rely on text-only toolbar buttons where a symbol works, and don't omit a title on symbol items.
- Don't letterbox or pillarbox a game when changing the aspect ratio is possible.
</anti_patterns>
</topic>

<decision_guide>
Platform comparison (from the Designing-for pages):

| Platform | Viewing distance | Primary input (plus extras) | Typical session | Navigation and structure idiom | Key adaptation concerns |
|---|---|---|---|---|---|
| iOS | No more than 1-2 ft, handheld | Multi-Touch, virtual keyboard, voice; gyroscope, accelerometer | Minutes or an hour+; frequent app switching | Few onscreen controls; reachable middle/bottom controls; swipe back and list-row actions | Orientation, Dark Mode, Dynamic Type; Widgets, quick actions, Spotlight, Shortcuts, Activity views |
| iPadOS | Within about 3 ft; varies with stand or surface | Multi-Touch plus keyboard, pointing device, Apple Pencil, voice, often combined | Quick actions or hours; several apps onscreen | Content elevated on the large display; minimal modality and full-screen transitions; drag and drop | Orientation, multitasking modes, Dark Mode, Dynamic Type, resizable windows (2025), running in macOS |
| macOS | About 1-3 ft, stationary | Keyboard, pointing devices, game controls, Siri | Minutes to hours; many apps open | Menu bar holds all commands; resizable, movable windows; full screen; fewer nested levels, less modality | Window management, keyboard shortcuts, high-precision input, personalization, additional displays |
| tvOS | 8 ft or more, across the room | Siri Remote; game controller, voice, other devices | Hours in one experience; picture-in-picture | Focus system highlights and expands items; edge-to-edge artwork | Room-scale legibility; multiuser sign-in and profile switching; TV app, SharePlay, Top Shelf, TV provider accounts |
| visionOS | Head-relative field of view; dynamic scaling keeps windows legible near or far | Eyes plus indirect gestures; direct gestures; Digital Crown for passthrough | Not stated; Shared Space beside other apps, or a Full Space alone | Windows as planes in space; immersion level chosen per moment | Visual comfort, motion, field of view, indirect gestures, safety, age 13+ |
| watchOS | No more than 1 ft, wrist raise; Always On when the wrist drops | Digital Crown, tap/swipe/drag, Action button, shortcuts; sensors | Under a minute, many times a day; complications and notifications used more than the app | Single screen, shallow hierarchy; Digital Crown for vertical navigation | Glanceability, complications, notifications, Always On, watch faces |
| iPhone Duo (2026) | As iPhone | As iPhone | As iPhone; Split View multitasking on the inner display | Toolbars and tab bars on the side (except inner display portrait); split view expands on the inner display | Poses, compact vs regular width, reserved regions (cameras, fold), asymmetric safe areas, toolbar visibility priorities |

If you need to:
- Size text or controls → start from viewing distance and input mode; for games use the per-platform minimums (tvOS 23 pt / 56x56 pt is the largest, macOS 10 pt / 20x20 pt the smallest, iOS touch targets at least 44x44 pt).
- Bring an iPad app to Mac → keep the adaptive iPadOS layout and transition effortlessly to macOS; add menu bar commands, keyboard shortcuts, window management, and personalization.
- Bring a pointer-based game to touch → recheck control sizing and menu behavior, add touch controls, keep controllers optional.
- Ship a game everywhere → initial download at or under 30 minutes, each platform's default input supported, controllers everywhere except watchOS, menus built on safe areas and relative constraints for 16:10, 19.5:9, and 4:3.
- Choose visionOS presentation → standard window for UI-centric tasks; per key moment, the minimum immersion that suits it; Full Space only when the experience should surround people.
- Design for Apple Watch → lead with complications and notifications, keep the app single-screen and glanceable, put vertical navigation on the Digital Crown.
- Design for TV → lean on the focus system and Siri Remote gestures; make sign-in rare and profile switching automatic.
- Adapt an iPhone app to iPhone Duo → keep iOS patterns; use size classes (compact outer, regular inner), safe area insets, and reserved region APIs; accept the system's vertical bars; set toolbar visibility priorities; use `NavigationSplitView` or arrangement views for two-pane content.
</decision_guide>

<quick_checklist>
- [ ] Do text size and content density reflect the platform's viewing distance (iPhone 1-2 ft, iPad about 3 ft, Mac 1-3 ft, TV 8 ft+, Watch 1 ft, Vision Pro head-relative field of view)?
- [ ] Does the design support the platform's default input and the extra inputs people combine (keyboard, pointing device, Apple Pencil, game controller, voice)?
- [ ] Does it adapt to orientation, Dark Mode, and Dynamic Type, and on iPad to multitasking modes and running in macOS?
- [ ] On iPhone, are primary controls reachable in the middle or bottom of the display, with swipe-back and list-row swipe actions?
- [ ] On iPad and Mac, does the large display show more content with fewer nested levels and less modality, at a comfortable density?
- [ ] On Mac, are all commands in the menu bar, keyboard shortcuts handled, windows resizable and movable, full screen supported, toolbars customizable?
- [ ] On tvOS, does the app embrace the focus system, edge-to-edge artwork, room-scale legibility, and easy, infrequent multiuser sign-in?
- [ ] On visionOS, does each key moment use the minimum immersion it needs, with content in the field of view, comfortable motion, and indirect gestures supported?
- [ ] On watchOS, are interactions glanceable and single-screen, the hierarchy shallow, the Digital Crown used for vertical navigation, and complications and notifications provided?
- [ ] Does the app integrate the platform's system features (Widgets, quick actions, Spotlight, Shortcuts, Activity views; Multitasking, drag and drop; menu bar, Dock menus, file management; TV app, SharePlay, Top Shelf; complications, Always On, watch faces)?
- [ ] For a game: initial download 30 minutes or less, text and buttons at or above platform minimums, controllers optional, requests deferred to the moment of need, nothing conveyed by color alone, cutscenes subtitled?
- [ ] On iPhone Duo, does the layout use size classes, layout margins, safe area insets, and reserved region APIs instead of fixed widths, with only small adjustments when folding?
- [ ] On iPhone Duo, are toolbars and tab bars left in the system's vertical placement, with standard order (Back/Close, then Done), visibility priorities, a title and symbol per item, grouped items, and the system overflow menu?
- [ ] On iPhone Duo, do functionality and element state stay the same across both displays and every pose?
</quick_checklist>
