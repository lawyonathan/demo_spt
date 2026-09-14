<overview>
Covers the system experiences that surface an app's content and actions outside the app: App Shortcuts, snippets, widgets, Live Activities, controls, notifications, the status bar, tvOS Top Shelf, and watchOS complications and watch faces. Distills the HIG pages app-shortcuts, complications, controls, live-activities, notifications, snippets, status-bars, top-shelf, watch-faces, and widgets. Load when designing or reviewing anything on the Home Screen, Lock Screen, Control Center, Dynamic Island, StandBy, CarPlay, the Mac menu bar or desktop, the Smart Stack or a watch face, Siri, Spotlight or Shortcuts results, or the Apple TV Home Screen, and when choosing which of these surfaces fits a piece of information (see the decision guide).
</overview>

<topic name="App Shortcuts" source="https://developer.apple.com/design/human-interface-guidelines/app-shortcuts" updated="2026-06-08">
An App Shortcut exposes a key function or piece of content to Siri, Spotlight, the Shortcuts app, the Action button (iPhone, Apple Watch), and Apple Pencil squeeze. Built on App Intents, available the moment installation finishes; each bundles one or more actions; up to 10 per app. People can also compose custom cross-app shortcuts from the app's App Intents in the Shortcuts app.

<when_to_use>
- (2026) **Prefer app schemas for common domains.** Apple Intelligence, Siri, and other system experiences then surface actions and content contextually without individual App Shortcuts. Use App Shortcuts for unique features or custom content that app schemas do not cover.
- Offer App Shortcuts for the most common and important tasks, ideally completable without leaving the current context; open the app only when that makes a multistep task easier.
- Respond with a snippet for static information or dialog options (weather at a location, order confirmation); respond with a Live Activity for information that stays relevant and changes over time (timers, countdowns) via `LiveActivityIntent`.
</when_to_use>

<best_practices>
- **Add flexibility with one optional parameter.** "Start [morning, daily, sleep] meditation"; use predictable, familiar values because people can't see the list.
- **Ask for clarification when optional information is missing.** Suggest the most recent or time-of-day option; present the likeliest as default plus a short list of alternatives.
- **Keep voice interactions simple.** A phrase that feels complicated aloud is too hard to remember; ask for extra required information in a follow-up step.
- **Make App Shortcuts discoverable in the app.** Show occasional tips when people perform the matching action (`SiriTipUIView`).
- **Provide enough detail for audio-only devices.** AirPods and HomePod users may not see the screen; put all critical information in the full dialogue text (`IntentDialog(full:supporting:systemImageName:)`).
- **Provide brief, memorable activation phrases and natural variants.** The app name is required but can be used creatively: "Create a Keynote", "Add a new presentation in Keynote" (`AppShortcutPhrase`).
- **Editorial.** Title case and plural for App Shortcuts and the Shortcuts app; lowercase "shortcut" for an individual one.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** shown in Spotlight's Top Hit or Shortcuts area with an SF Symbol you choose or a preview image of the linked item. Order by importance; that sets the initial order in Spotlight and Shortcuts, then the system reprioritizes by use.
- **macOS:** App Shortcuts unsupported, but App Intents actions work in Shortcuts on Mac. **tvOS:** unsupported. visionOS, watchOS: no additional considerations.
</platform_considerations>

<anti_patterns>
- Don't put two parameters in one phrase ("Start [sleep] meditation with nature sounds").
- Don't add App Shortcuts for what an app schema already covers (2026).
</anti_patterns>
</topic>

<topic name="Complications" source="https://developer.apple.com/design/human-interface-guidelines/complications" updated="2023-10-24">
A complication shows timely, relevant information on the watch face at every wrist raise; people prefer apps with multiple, powerful complications. Most faces show at least one, some four or more. Since watchOS 9, complications (accessories) are organized into families (circular, corner, inline, rectangular) with recommended layouts, and each face slot declares its family. Legacy templates are nongraphic and don't take the wearer's color. Build with `WidgetKit` for watchOS 9 and later; `CLKComplicationDataSource` only for earlier versions.

<best_practices>
- **Identify essential, dynamic content people want at a glance.** A static complication loses its prominent slot.
- **Support all families when possible.** More families, more faces; if a family can't show useful data, show an app image (e.g. the app icon) so it still launches.
- **Consider multiple complications per family.** A triathlon app: three circular complications, one per segment, each deep-linked, plus a preconfigured shareable face.
- **Define a different deep link for each complication.** Identical targets feel less useful.
- **Keep privacy in mind.** The Always-On Retina display exposes the face to others (see Always On).
- **Carefully consider when to update data.** Data is a timeline of dated entries (a meeting an hour before it starts; a forecast at its time); timeline updates per day and stored entries per app are limited.
- **Choose a ring or gauge style by the data.** Closed: percentage of a whole (battery). Open: arbitrary minimum and maximum (speed). Segmented: app-defined range conveying rapid change (Noise).
- **Make images look good in tinted mode.** The system tints text, gauges, and images with one color from the wearer's selection and desaturates full-color images unless you supply tinted versions (`WidgetRenderingMode`; legacy: graphic templates only). Never use color as the only signal; provide an alternate tinted image when desaturation looks bad.
- **Use line widths of 2 pt or greater.** Thinner lines are hard to see at a glance, especially in motion.
- **Provide static placeholder images for each complication.** Shown when no content exists (e.g. right after install) and in the selection carousel; placeholder size varies per layout and may differ from the real image (`placeholder(in:)`).
- **Optimize rectangular layouts for the Smart Stack (watchOS 10+).** Add a background color or content that aids recognition, declare relevancy with App Intents, and consider a custom Smart Stack layout (`WidgetFamily.accessoryRectangular`; see Widgets).
</best_practices>

<specs>
Families and layouts: **Circular** (Infograph, Infograph Modular; closed gauge image/text, open gauge image/text, open gauge range, image, stack image/text; bezel text can curve nearly 180 degrees before truncating; extra-large variants fill most of the X-Large face with some multicolor text; circular mask applied). **Corner** (Infograph corners; circular image, gauge image/text, stack text, text image; some multicolor text; circular mask). **Inline**: utilitarian small (corner rectangle on Chronograph, Simple; flat, ring image/text, square) and utilitarian large (text with a leading icon spanning the bottom of Utility, Motion; large flat). **Rectangular** (images, text, a gauge, optional title; suits charts such as Heart Rate's 24-hour graph in high-contrast white and red with lower-contrast gray grid lines; standard body, text gauge, large image; large-image layouts get an automatic 4-pt corner radius). **Legacy**: circular small (ring, simple, stack), modular small (columns text, ring, simple, stack), modular large (columns, standard body, table, tall body), extra large (ring, simple, stack); stack widths are maximums.

Image sizes in pt (@2x doubles); columns 40mm | 41mm | 44mm | 45/49mm:
| Layout | 40 | 41 | 44 | 45/49 |
|---|---|---|---|---|
| Circular image (also circular and bezel placeholder) | 42 | 44.5 | 47 | 50 |
| Circular closed gauge / open gauge | 27 / 11 | 28.5 / 11.5 | 31 / 12 | 32 / 13 |
| Circular stack | 28x14 | 29.5x15 | 31x16 | 33.5x16.5 |
| XL circular image (also placeholder) | 120 | 127 | 132 | 143 |
| XL open gauge / closed gauge | 31 / 77 | 33 / 81.5 | 33 / 87 | 37 / 91.5 |
| XL stack | 80x40 | 85x42 | 87x44 | 95x48 |
| Corner circular | 32 | 34 | 36 | 38 |
| Corner gauge, text (also placeholder) | 20 | 21 | 22 | 24 |
| Rectangular large image with / without title | 150x47 / 162x69 | 159x50 / 171.5x73 | 171x54 / 184x78 | 178.5x56 / 193x82 |
| Rectangular standard body, text gauge | 12 | 12.5 | 13.5 | 14.5 |
Inline utilitarian small (38 | 40/42 | 41 | 44 | 45/49mm): flat 9-21x9 | 10-22x10 | 10.5-23.5x21 | n/a | 12-26x12; ring 14 | 14 | 15 | 16 | 16.5; square 20 | 22 | 23.5 | 25 | 26. Utilitarian large flat matches small flat (41mm: 10.5-23.5x10.5).
Default SwiftUI text (SF Rounded; 40 / 41 / 44 / 45-49mm): circular Medium 12 / 12.5 / 13 / 14.5; XL circular Medium 34.5 / 36.5 / 36.5 / 41; corner Semibold 10 / 10.5 / 11 / 12; rectangular Medium 16.5 / 17.5 / 18 / 19.5.
Legacy (40/42mm | 45/49mm; source also lists 38, 41, 44mm): circular small ring 22 | 26, simple and placeholder 18 | 21.5, stack 17x8 | 19x9.5; modular small ring 19 | 22.5, simple and placeholder 29 | 34.5, stack 29x15 | 34.5x18; modular large columns, standard body, table 12-37x12 | 14.5-44x14.5; extra large ring 66.5 | 79, simple and placeholder 101.5 | 121, stack 87x45 | 103.5x53.5.
</specs>

<anti_patterns>
- Avoid color as the only carrier of information; tinted mode strips it.
- Not supported on iOS, iPadOS, macOS, tvOS, visionOS.
</anti_patterns>
</topic>

<topic name="Controls" source="https://developer.apple.com/design/human-interface-guidelines/controls" updated="2024-06-10">
A control is a button or toggle giving quick access to an app feature from Control Center, the Lock Screen, or the Action button. Buttons perform an action, link to an app area, or launch a camera experience on a locked device; toggles switch between two states. People add controls by pressing and holding an empty area of Control Center, customizing the Lock Screen, or configuring the Action button in Settings. Anatomy: a symbol (SF Symbol or custom), a title, and an optional value showing state. Control Center shows the symbol and, at larger sizes, title and value; the Lock Screen shows the symbol only; press-and-hold on the Action button shows symbol and value in the Dynamic Island.

<best_practices>
- **Offer controls for actions with the most benefit without launching the app.** Starting a Live Activity from a control is a model case.
- **Update controls on interaction, on completion, or remotely by push notification.** Reflect current state and whether an action is still in progress.
- **Choose a descriptive symbol that suggests the behavior.** Title and value are often hidden; toggles need a symbol per state (`door.garage.open` / `door.garage.closed`).
- **Use symbol animations for state changes.** Toggles animate on/off; buttons with a duration animate until complete (`SymbolEffect`).
- **Select a brand-compatible tint color.** Applied to a toggle's symbol in the on state and, from the Action button, to symbol and value in the Dynamic Island.
- **Prompt for configuration on first add when the action needs it** (which light); people can reconfigure any time (`promptsForUserConfiguration()`).
- **Provide verb-based hint text for the Action button.** Shown on press to explain press-and-hold (`controlWidgetActionHint(_:)`).
- **Include a placeholder when the title or value varies.** Shown in the controls gallery and before Action button assignment.
- **Hide sensitive information when locked.** Let the system redact title and value; optionally redact symbol state too (symbol then shows off state).
- **Require authentication for security actions** such as locking a door or starting a car (`IntentAuthenticationPolicy`).
- **Camera on a locked device (iOS 18+).** A control can open the app's camera experience while locked (`LockedCameraCapture`); anything beyond capture requires unlocking. Use the same camera UI as the app so the handoff is seamless, and give instructions for adding the control.
</best_practices>

<platform_considerations>
- **iOS, iPadOS, macOS:** no additional considerations. Not supported in watchOS, tvOS, visionOS.
</platform_considerations>

<anti_patterns>
- Don't ship a toggle with one symbol for both states.
- Don't leave stale state after an action completes.
- Don't expose personal or security details on a locked device.
</anti_patterns>
</topic>

<topic name="Live Activities" source="https://developer.apple.com/design/human-interface-guidelines/live-activities" updated="2025-12-16">
A Live Activity lets people track the progress of an activity, event, or task at a glance, with frequent updates over a few hours and optional interaction (delivery ETA, live score, workout with pause and cancel). It starts on iPhone or iPad and appears on the iPhone and iPad Lock Screen, Home Screen, Dynamic Island and StandBy (iPhone), the Mac menu bar, the Apple Watch Smart Stack, and CarPlay Dashboard (2025).

Presentations, all required: **Compact** (Dynamic Island with one active Live Activity; two elements on the leading and trailing sides of the TrueDepth camera). **Minimal** (multiple active; two shown, one attached, one detached as a circle or oval; tap opens the app, touch and hold expands). **Expanded** (touch and hold on compact or minimal; also shown on alerts). **Lock Screen** (banner at the bottom of the Lock Screen, layout like expanded; on devices without a Dynamic Island, alerts briefly show it as a banner over the Home Screen or other apps). **StandBy** uses minimal; a tap switches to the Lock Screen presentation scaled 2x to fill the screen, and a custom Lock Screen background color extends across the whole screen. The compact elements are combined by the system into one default view for Apple Watch and CarPlay.

<when_to_use>
- Use for tasks and events with a defined beginning and end, short to medium duration, not exceeding 8 hours.
- Prefer a widget for content that changes through the day without real-time tracking; the two share frameworks, so build them in tandem.
- Don't send push notifications for the same updates.
</when_to_use>

<best_practices>
- **Focus on the information people need at a glance.** A tap opens the app for more.
- **Avoid sensitive information.** Visible to observers on the Lock Screen and Always-On display; show an innocuous summary or redact views and let people opt in.
- **Match the app's aesthetic in light and dark appearances.** A logo mark, if any, goes without a container; never the whole app icon.
- **Ensure text is easy to read.** Large, medium weight or heavier; small text sparingly.
- **Adapt to screen sizes and presentations.** Layouts and assets per device and scale factor; use only the space the content needs; start from the Apple Design Resources templates (system margins, recommended text sizes) so it fits the Smart Stack and other surroundings.
- **Use consistent margins and concentric placement.** Even margins between rounded shapes and the edges; inner radius equals outer radius minus margin (`ContainerRelativeShape`). Tip: blur nonrounded content in the drawing tool to judge alignment with the outer perimeter.
- **Separate content blocks with an inset container shape or a thick line;** never draw to the edge of the Dynamic Island.
- **Change height dynamically on the Lock Screen and in expanded.** Compact while a rideshare locates a driver, taller once pickup time and driver details arrive.
- **Consider custom background color and opacity carefully.** Customizable only for the Lock Screen presentation, not compact, minimal, or expanded; keep contrast, especially tints on Always-On displays with reduced luminance.
- **Use bold color for character.** The Dynamic Island background is opaque black; bold text and object colors make the Live Activity recognizable.
- **Tint the key line to match content.** On dark backgrounds a key line outlines the Dynamic Island.
- **Animate to reinforce information and updates.** Maximum 2 seconds; not performed on Always-On displays with reduced luminance. Default content-replace transition or custom scale, opacity, movement (numeric transitions for scores, fade a timer at zero). Animate layout changes by moving existing elements rather than removing and re-adding them, and avoid overlaps (in lists, move only the changed element and fade the rest).
- **Tapping opens the app at the right location.** Deep-link to related details and actions.
- **Focus on simple, direct actions.** Buttons and toggles cost space; include only essential functions activated once or paused and resumed (music, workouts, live audio), preferably a single element to avoid mis-taps; a response button is fine for actionable updates (contact the driver).
- **Start at expected moments (order placed, ride requested, match start) and make it easy to turn off in the app** (unfollow a game or team), or people disable Live Activities in Settings.
- **Offer an App Shortcut that starts the Live Activity**, e.g. from the Action button.
- **Update only when content changes; alert only for essential updates.** Alerts light the screen, play the notification sound, and show expanded or a banner.
- **Track multiple events in one Live Activity** with a dynamic layout that rotates through them, rather than several to jump between.
- **End immediately when the task ends and set a custom dismissal time.** Removed at once from the Dynamic Island and CarPlay; remains up to 4 hours on the Lock Screen, Mac menu bar, and Smart Stack. Choose a dismissal proportional to duration; 15 to 30 minutes is usually adequate (rideshare: 30 minutes for summary and tip).
- **Start with the iPhone design, then refine** custom layouts for StandBy, CarPlay, Apple Watch.
- **Compact: the most important, dynamic information** (two team logos and the score). Leading and trailing read as one unit with consistent color and typography; as narrow as possible, no padding against the TrueDepth camera, balanced widths (shortened units, less precision), status bar information not obscured; both elements link to the same screen.
- **Minimal: stay recognizable**, preferably with live data rather than a logo (Timer shows remaining time).
- **Expanded: keep relative placement** so layouts expand predictably from compact or minimal, and wrap content tightly around the TrueDepth camera.
- **Lock Screen: don't replicate notification layouts.** Use custom background, tint, and opacity sparingly to fit personalized wallpapers; default background is light in light appearance, dark in dark. Verify in Dark Mode and on Always-On. Verify the generated dismiss button color (`activitySystemActionForegroundColor(_:)`). Standard margin 14 pt; tighter for graphics or buttons but never crowded.
- **StandBy: update the layout** for the larger scale and extra space; consider the default background so it blends with the bezel and scales slightly larger; keep standard margins or content gets cut off; verify in Night Mode (red tint).
- **CarPlay: the system merges compact leading and trailing on the Dashboard and deactivates interactive elements.** Declare `ActivityFamily.small` for a custom layout with larger text or more information; prefer timely content over buttons if people may be driving.
</best_practices>

<platform_considerations>
- **macOS (2025):** appears in the menu bar of a paired Mac in compact, minimal, and expanded; clicking launches iPhone Mirroring.
- **watchOS:** appears at the top of the Smart Stack combining the compact elements by default; tap opens the watchOS app, or without one a full-screen view with a button to open on iPhone. A custom watchOS layout can add information and a button or toggle, but the same layout serves CarPlay with interaction disabled, so omit controls if people may be driving. Prioritize progress (delivery ETA), controls (stopwatch, timer), significant updates (score changes).
- **tvOS, visionOS:** not supported.
</platform_considerations>

<specs>
iOS (pt): 430x932 screen: compact leading and trailing 62.33x36.67 each; minimal 36.67 to 45 x 36.67; expanded and Lock Screen 408 x 84 to 160. 393x852: compact 52.33x36.67; minimal same; expanded and Lock Screen 371 x 84 to 160. Dynamic Island corner radius 44 pt (matches the TrueDepth camera). Dynamic Island width: 230 compact/minimal and 371 expanded on iPhone 14 Pro, 15, 15 Pro, 16, 16 Pro, 17, 17 Pro; 250 and 408 on iPhone 14 Pro Max, 15 Plus, 15 Pro Max, 16 Plus, 16 Pro Max, 17 Pro Max, iPhone Air.
iPadOS Lock Screen: 1366x1024 screen 500 x 84 to 160; 1194x834, 1012x834, 1080x810, 1024x768 screens 425 x 84 to 160. macOS: iOS values.
watchOS Smart Stack (same as watch widgets): 40mm 152x69.5; 41mm 165x72.5; 44mm 173x76.5; 45mm 184x80.5; 49mm 191x81.5.
CarPlay (may be scaled): 240x78, 240x100, 170x78. Test Smart Display Zoom configurations: widescreen 1920x720, portrait 900x1200, standard 800x480.
</specs>

<anti_patterns>
- Don't use a Live Activity for ads or promotions.
- Don't add elements to the app that draw attention to the Dynamic Island.
- Don't use the entire app icon.
- Don't pad between compact content and the TrueDepth camera.
- Don't replicate notification layouts on the Lock Screen.
- Don't alert too often, and don't pair push notifications with the same updates.
- Don't include buttons or toggles in custom watchOS/CarPlay layouts people may see while driving.
</anti_patterns>
</topic>

<topic name="Notifications" source="https://developer.apple.com/design/human-interface-guidelines/notifications" updated="2023-10-24">
A notification gives people timely, high-value information they can understand at a glance. Consent is required first (`Asking permission to use notifications`); people then choose styles and delivery times per urgency level (interruption levels and Time Sensitive notifications: see Managing notifications). Styles: a banner or view on the Lock Screen, Home Screen, Home View, or desktop; an app icon badge; a Notification Center item. Communication notifications (calls, messages) show contact avatars and group names instead of the app icon.

<when_to_use>
- Use an alert, not a notification, for an error message.
- Use notification actions (up to four buttons) for simple tasks doable without opening the app.
- Use a badge only for the unread notification count, never for weather, dates, prices, or scores.
</when_to_use>

<best_practices>
- **Provide concise, informative notifications.**
- **Handle foreground delivery gracefully.** Notifications don't show while the app is frontmost; present the data discoverably but not invasively (increment a badge, insert into the current list as Mail does).
- **Create a short title only if it adds context.** Headline, event name, or subject; the system shows the sender's name for communication and the app name when you give none, which beats a generic "New Document". Title case, no end punctuation.
- **Write succinct content.** Complete sentences, sentence case, punctuation; the system truncates when needed.
- **Provide generic placeholder text for hidden previews.** Otherwise only the icon and "Notification" appear; use "Friend request", "New comment", "Reminder", "Shipment" in sentence case (`hiddenPreviewsBodyPlaceholder`).
- **Consider a sound.** Custom (short, distinctive, professionally produced) or system; never rely on it for important information; vibration can't be triggered programmatically (`UNNotificationSound`).
- **Provide beneficial actions in context.** Common, time-saving tasks (Calendar's Snooze); labels short, title case, result-describing, no app name, localizable, brief enough not to truncate; prefer nondestructive, and give context for any destructive action (the system styles it distinctly); give each an SF Symbol shown after the title.
- **Keep badges up to date.** Clear when notifications are opened; zero removes related items from Notification Center; badging can be disabled, so never make it the only path to essential information.
</best_practices>

<platform_considerations>
- **watchOS:** two stages. A **short look** shows on wrist raise and vanishes on lower: basic information only, nothing sensitive in the title, never the sole channel for critical information. A **long look** adds detail, scrolls by swipe or Digital Crown, dismisses by tap or wrist lower; fixed structure: a sash (app icon and name; custom color, or blurred translucent over a top photo), custom content, up to four custom action buttons, then an always-present Dismiss button. Provide at least a static interface (message plus bundled static text and images); prefer a dynamic one too (static is the fallback without network or iPhone companion). Content background is transparent; white at 18% opacity matches system notifications, or use a brand color. Rich long looks may use SwiftUI animations, SpriteKit, or SceneKit; an iPhone companion's actionable types are shared. **Double tap** runs the first nondestructive action, so order the most-used first (parking: extend 5 minutes, 15 minutes, 1 hour).
- iOS, iPadOS, macOS, tvOS, visionOS: no additional considerations.
</platform_considerations>

<anti_patterns>
- Avoid multiple notifications for the same thing, even unanswered.
- Avoid telling people to perform tasks in the app.
- Avoid sensitive, personal, or confidential content.
- Avoid including the app name or icon; the system adds the icon.
- Avoid an action that merely opens the app.
- Avoid custom elements that mimic a badge.
</anti_patterns>
</topic>

<topic name="Snippets" source="https://developer.apple.com/design/human-interface-guidelines/snippets" updated="2026-06-08">
(2026, new page) A snippet is a compact view, presented by an app intent, that shows the result of a task performed with Siri, Spotlight, or the Shortcuts app or asks for confirmation. A **confirmation** snippet lets people confirm or cancel and may include options that affect the result; a **result** snippet gives information needing no further action. An intent that shows a snippet always shows a result; confirmation is optional (`Displaying static and interactive snippets`). Anatomy: **dialogue** (the spoken app intent dialogue, included by default above the view), a **custom view** (may include buttons to modify content, get more information, or take another action), and **system buttons**: confirmation has a secondary Cancel and a primary button with a customizable label; result has a single Done.

<best_practices>
- **Ensure legibility.** Sufficient contrast against the system background in light and dark; consistent margins.
- **Keep content concise.** Custom views no taller than the 400-pt maximum; remember text draws at the person's preferred size; deep-link for more detail instead of adding it to a result snippet.
- **Choose a descriptive primary-button label.** A system `ConfirmationActionName` or custom; "Order" beats "OK" or "Proceed"; default is Continue.
- **Communicate purpose visually.** Spoken dialogue matters when people aren't looking, but prefer omitting it from the visual and let the custom view carry the information.
</best_practices>

<platform_considerations>
- **iOS, iPadOS, macOS:** no additional considerations. Not supported in tvOS, visionOS, watchOS.
</platform_considerations>

<anti_patterns>
- Don't rely on displayed dialogue text to convey purpose.
- Don't exceed 400 pt of custom view height.
</anti_patterns>
</topic>

<topic name="Status bars" source="https://developer.apple.com/design/human-interface-guidelines/status-bars" updated="undated">
The status bar runs along the upper edge on iOS and iPadOS, showing time, carrier, and battery; its background is transparent by default.

<best_practices>
- **Obscure content under the status bar.** Content showing through hurts legibility and visible controls behind it invite impossible taps; prefer a scroll edge effect that puts a blurred view behind it (`ScrollEdgeEffectStyle`, `UIScrollEdgeEffect`).
- **Consider temporarily hiding it for full-screen media**, as Photos does, and let a simple, discoverable gesture (a single tap in Photos) bring it back.
</best_practices>

<platform_considerations>
- **iOS, iPadOS** only.
</platform_considerations>

<anti_patterns>
- Avoid permanently hiding the status bar; people would have to leave the app to check the time or Wi-Fi.
- Don't imply content behind it is interactive.
</anti_patterns>
</topic>

<topic name="Top Shelf" source="https://developer.apple.com/design/human-interface-guidelines/top-shelf" updated="undated">
Top Shelf is the Apple TV Home Screen area that showcases an app's content when it is selected in the Dock; with full-screen Top Shelf people swipe through full-screen views, play trailers and previews, and jump straight into the app or game. Layout templates are in Apple Design Resources.

<best_practices>
- **Help people jump right into content.** Carousel actions and carousel details include a primary playback button and a More Info button that opens the app to details.
- **Feature new content and personalize.** New releases and episodes, upcoming titles, targeted recommendations, resume playback or gameplay.
- **Showcase dynamic content**, preferably layered images; **if you don't provide full-screen content, supply at least one static image** (shown when the app is focused in the Dock; tvOS flips and blurs it to 1920 px wide at 16:9): 2320x720 pt (4640x1440 px @2x).
- **Carousel actions: provide a succinct title**, optionally a brief subtitle (album date range, show name); best for content people already know (user photos, a known franchise).
- **Carousel details: title the currently playing content** near the top, with optional metadata (plot summary, cast) and an attribution phrase above like "Featured on My App."
- **Sectioned content row: provide a complete row.** One labeled row of focusable content (recent, new, favorites); load enough images to span the screen width and include at least one label (multiple allowed). Mixed sizes scale to the tallest image (a 16:9 image becomes 500 px tall beside a poster or square).
- **Scrolling inset banner: provide three to eight images.** Near full-width images auto-scroll on a timer until focused, then loop; fewer than three feels weak, more than eight is hard to navigate. Circular remote gestures trigger the focus effect with lighting and a 3D effect for layered images. No labels are shown, so put any text in the image (on a top layer if layered) and in the accessibility label for VoiceOver.
</best_practices>

<specs>
| Row image | Actual | Focused/safe zone | Unfocused |
|---|---|---|---|
| Poster 2:3 | 404x608 | 380x570 | 333x570 |
| Square 1:1 | 608x608 | 570x570 | 500x500 |
| 16:9 | 908x512 | 852x479 | 782x440 |
| Scrolling inset banner | 1940x692 | 1740x620 | 1740x560 |
Values in pt (@1x px; @2x doubles).
</specs>

<anti_patterns>
- Avoid advertisements or prices; show prices only after people show interest.
- Avoid promoting content people already bought, rented, or watched.
- Avoid implying interactivity in a static image; it isn't focusable.
- tvOS only.
</anti_patterns>
</topic>

<topic name="Watch faces" source="https://developer.apple.com/design/human-interface-guidelines/watch-faces" updated="undated">
The watch face is the primary watchOS view, customized with complications and often varied per activity. Since watchOS 7 configured faces can be shared, including from an app, a website, Messages, Mail, or social media, which introduces people to the app's complications.

<best_practices>
- **Share watch faces that feature the app's complications.** Support several complications to curate a face; some faces accept a system accent color, images, or styles. People without the app are prompted to install it.
- **Display a preview of each shared face.** Email the face to yourself from the iOS Watch app for an illustrated-bezel preview, or composite onto a hardware bezel from Apple Design Resources (`Sharing an Apple Watch face`).
- **Offer shareable faces for all Apple Watch devices.** California, Chronograph Pro, Gradient, Infograph, Infograph Modular, Meridian, Modular Compact, Solar Dial need Series 4 or later; Explorer needs Series 3 (cellular) or later. Provide a similar configuration on a face for Series 3 and earlier and label each face with supported devices.
- **Respond gracefully to an incompatible face.** The system sends an error on Series 3 or earlier; immediately offer a compatible alternative instead of an error, and warn people in advance.
</best_practices>

<anti_patterns>
- Don't surface a raw error for an incompatible face.
- watchOS only.
</anti_patterns>
</topic>

<topic name="Widgets" source="https://developer.apple.com/design/human-interface-guidelines/widgets" updated="2025-12-16">
A widget gives quick access to essential information and focused interactions in additional contexts: iPhone and iPad Home Screen and Lock Screen, Mac desktop and Notification Center, visionOS surfaces (2025), and the Apple Watch Smart Stack. Decide which sizes to support, which contexts they appear in, and the rendering mode and color treatment each context applies; WidgetKit supplies defaults, but a custom design per context is best.

Families: **system** small (iPhone Home Screen, Today View, StandBy, CarPlay; iPad Home Screen, Today View, Lock Screen; Mac desktop and Notification Center; visionOS surfaces), medium and large (Home Screen and Today View on iPhone and iPad, Mac, visionOS), extra large (iPad, Mac, visionOS only), extra large portrait (visionOS only). **Accessory** (very limited information): circular (iPhone and iPad Lock Screen; watch complications and Smart Stack), corner (watch complications only), inline (iPhone and iPad Lock Screen; watch complications; a single tap target), rectangular (iPhone and iPad Lock Screen; watch complications and Smart Stack).

Appearances (2025): on the iPhone and iPad Home Screen people choose light, dark, clear, or tinted. Light and dark are full color; clear desaturates and adds translucency, highlights, and the Liquid Glass material; tinted desaturates and applies the person's tint. On Apple Vision Pro a widget is a framed 3D object with a glass- or paper-like coating that responds to light, full color or tinted from system palettes. The iPad Lock Screen is monochrome without tint. StandBy scales the widget up with the background removed and renders monochrome red in low light. Rectangular accessory widgets are monochrome on the Lock Screen and full color or tinted as watch complications.

Rendering modes: **full color** (system family everywhere; views unchanged). **Accented** (system family everywhere plus accessory widgets on Apple Watch): background removed and replaced with a tint effect (tinted) or a Liquid Glass background (clear); views split into an accent group and a primary group, each filled with a solid color. **Vibrant** (iPhone and iPad Lock Screen, StandBy in low light): desaturates text, images, and gauges and colors them for the Lock Screen background or Mac desktop; Lock Screen tint or the StandBy red tint applies. Per platform: iPhone full color on Home Screen, Today View, StandBy and CarPlay (background removed), accented on Home Screen and Today View, vibrant on Lock Screen and low-light StandBy; iPad full color and accented on Home Screen and Today View, vibrant on Lock Screen; Apple Watch full color and accented in Smart Stack and complications; Mac full color on desktop and Notification Center, vibrant on desktop, no accented; Apple Vision Pro full color and accented, no vibrant.

<when_to_use>
- Use a widget for timely, glanceable content that changes through the day plus simple related actions; widgets refresh periodically, never in real time.
- Offer Live Activities for a task or event tracked for a limited time with frequent updates; shared frameworks, so develop both in tandem.
- Lock Screen widgets are functionally complications and follow the Complications guidance; design them together.
</when_to_use>

<best_practices>
- **Choose simple ideas tied to the app's main purpose** (Weather: current high, low, conditions) and **give quick access to wanted content**: meaningful data, useful actions, deep links; an app icon replica adds little.
- **Prefer dynamic information that changes through the day.** Static content loses its spot; widgets don't update minute to minute, so keep content fresh other ways. Look for surprise and delight (a calendar treatment on birthdays or holidays).
- **Offer multiple sizes only when each adds value.** Small shows one piece of information; larger sizes add layers and actions. One best size beats all sizes.
- **Balance information density.** Essentials at a glance, details on a longer look; if too dense, use a larger size or replace text with graphics. Show only information tied to the widget's purpose (Calendar stays centered on events at every size).
- **Use brand elements thoughtfully.** Colors, typefaces, stylized glyphs; a logo is rarely needed, and when it is (multiple sources) a small one in the top-right corner suffices.
- **Choose automatic content or configuration.** Stocks lets people pick symbols; Podcasts shows recent content (`Making a configurable widget`). Tell people when signing in adds value ("Sign in to view reservations").
- **Keep the widget up to date.** Match refresh to data change and need (hourly tides are useful); if people check more often than you can update, show the last update time. Let the system refresh dates and times to conserve update budget, and don't hide stale data behind placeholders (`Keeping a widget up to date`).
- **Animate data updates.** SwiftUI animates by default; standard and custom animations up to 2 seconds.
- **Offer simple, relevant interactivity; keep complexity in the app.** Taps outside buttons and toggles launch the app; interactions open the app at the right location (a medium Stocks widget opens the tapped symbol). Multiple targets are allowed but avoid app-like layouts and make targets confidently tappable.
- **Use standard margins.** 16 pt for most widgets, 11 pt for tighter groupings (graphics, buttons, background shapes); margins are smaller on the Mac desktop and on the Lock Screen including StandBy (`padding(_:_:)`). iOS shrinks content designed for large devices; iPadOS renders large then scales down. Match content corner radius to the widget with `ContainerRelativeShape`.
- **Prefer the system font, text styles, and SF Symbols.** A custom font sparingly, typically for the large text with SF Pro for small text. Dynamic Type Large to AX5 is supported on iOS, iPadOS, visionOS via `Font` or `custom(_:size:)`. Fonts 11 pt or larger; never rasterize text (scaling, VoiceOver).
- **Use color without competing with content**, convey meaning with text and iconography too (monochrome modes; watchOS may invert colors per face), and **use full-color images judiciously**: tinted and clear desaturate them by default, and opting into full color draws attention and can look foreign, so reserve it for media (album art) at smaller-than-widget sizes. Asset-catalog colors can also drive the system's editing UI.
- **Full color: support light and dark** with matching backgrounds and semantic system colors or asset variants.
- **Accented: group views into accent and primary groups.** iPhone, iPad, Mac tint both white; Apple Watch tints primary white and accent in the face color (`widgetAccentable(_:)`).
- **Vibrant: optimize assets for contrast.** Pixel opacity sets material strength, brightness sets vibrancy; render content at full opacity, white or light gray for primary and darker grays for secondary, opaque grays rather than partial-opacity white.
- **Design a realistic gallery preview** (real or realistic simulated data) and **placeholder content** that stays recognizable: static components plus semi-opaque rectangles for text and circles or squares for glyphs.
- **Write a succinct description** starting with an action verb ("See the current weather conditions and forecast for a location"), sentence case; **group all sizes under one description**, and consider coloring the gallery Add button with a brand color.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** Lock Screen widgets come as inline text above the clock and circular and rectangular shapes below it; make them useful, not just launchers. Support the Always-On display: reduced luminance, so use grays with enough contrast.
- **StandBy and CarPlay (2025):** StandBy shows two small system widgets side by side scaled to fill the screen; supporting it also covers CarPlay, which uses the small widget with the background removed, scaled to the Widgets screen grid. Scale up and rearrange text for distance, limit rich images or color as meaning, and use no background color so it blends with black (`Displaying the right widget background`).
- **visionOS (2025):** persistent 3D objects on horizontal or vertical surfaces at real-world scale; people scale them 75 to 125 percent, tint from system palettes (accented mode), pick a frame width for elevated widgets, and use widget-specific options (Music poster's own light and dark theme; no systemwide appearance). Design for the room (a large-type poster; a small desk widget); test every palette and lighting condition, including untinted elements. Level-of-detail thresholds: `simplified` at a distance (fewer details, larger type, no buttons or toggles) and `default` nearby, sharing elements across both. Use print-design hierarchy and high-resolution assets. Mounting: **elevated** (default; tilted with a shadow on horizontal surfaces, flush like a picture frame on vertical; reminders, media, glanceable data) or **recessed** (vertical only, cutout effect; ambient content like weather or editorial); declare per configuration with `supportedMountingStyles(_:)`, using separate configurations for a recessed-only widget, and keep elevated layouts balanced at every frame width (not detectable). Treatment: **paper** (print-like, responds to ambient light; Music poster) or **glass** (foreground stays bright and full color; information-rich widgets such as News headlines over images).
- **watchOS:** Smart Stack widgets default to black; consider a meaningful background color (Stocks: red falling, green rising). Provide relevancy (location, workout) so the system shows or elevates the widget (`RelevanceKit`).
- **macOS:** no additional considerations. **tvOS:** not supported.
</platform_considerations>

<specs>
iOS (portrait screen, pt):
| Screen | Small | Medium | Large | Circular | Rectangular | Inline |
|---|---|---|---|---|---|---|
| 430x932, 428x926 | 170 | 364x170 | 364x382 | 76 | 172x76 | 257x26 |
| 414x896 | 169 | 360x169 | 360x379 | 76 | 160x72 | 248x26 |
| 414x736 | 159 | 348x157 | 348x357 | 76 | 170x76 | 248x26 |
| 393x852, 390x844 | 158 | 338x158 | 338x354 | 72 | 160x72 | 234x26 |
| 375x812, 360x780 | 155 | 329x155 | 329x345 | 72 | 157x72 | 225x26 |
| 375x667 | 148 | 321x148 | 321x324 | 68 | 153x68 | 225x26 |
| 320x568 | 141 | 292x141 | 292x311 | n/a | n/a | n/a |
iPadOS (pt; design canvas / rendered device size; * renders at canvas size):
| Screen | Small | Medium | Large | Extra large |
|---|---|---|---|---|
| 768x1024, 744x1133 | 141 / 120 | 305.5x141 / 260x120 | 305.5 / 260 | 634.5x305.5 / 540x260 |
| 810x1080 | 146 / 124 | 320.5x146 / 272x124 | 320.5 / 272 | 669x320.5 / 568x272 |
| 820x1180, 834x1194 | 155 / 136 | 342x155 / 300x136 | 342 / 300 | 715.5x342 / 628x300 |
| 834x1112 | 150 / 132 | 327.5x150 / 288x132 | 327.5 / 288 | 682x327.5 / 600x288 |
| 954x1373 *, 970x1389 * | 162 | 350x162 | 350 | 726x350 |
| 1024x1366 | 170 / 160 | 378.5x170 / 356x160 | 378.5 / 356 | 795x378.5 / 748x356 |
| 1192x1590 * | 188 | 412x188 | 412 | 860x412 |
visionOS (pt; mm at 100 percent): small 158x158 (268x268); medium 338x158 (574x268); large 338x354 (574x600); extra large 450x338 (763x574); extra large portrait 338x450 (574x763).
watchOS Smart Stack: 40mm 152x69.5; 41mm 165x72.5; 44mm 173x76.5; 45mm 184x80.5; 49mm 191x81.5.
</specs>

<anti_patterns>
- Avoid replicating the app icon or expanding small content just to fill a larger size.
- Avoid mirroring the widget's appearance inside the app.
- Avoid app-like layouts, fonts under 11 pt, rasterized text, and color as the only meaning.
- Avoid full-color images in tinted or clear appearances except for media.
- Avoid background colors in StandBy and CarPlay.
- Avoid descriptions like "This widget shows..." or "Add this widget."
</anti_patterns>
</topic>

<decision_guide>
Surfacing information or actions outside the app:

| Need | Use | Conditions |
|---|---|---|
| Glanceable content that changes through the day, placed by the person | **Widget** (system family on Home Screen, desktop, visionOS surfaces; accessory on Lock Screen and watch) | Periodic refresh, never real time; simple buttons or toggles; deep link to the related location; works in full-color, accented (tinted and clear), and vibrant modes and without a background in StandBy and CarPlay |
| Progress of a bounded task or event | **Live Activity** | Up to 8 hours; compact, minimal, expanded, Lock Screen presentations; Dynamic Island, StandBy, Mac menu bar, Smart Stack, CarPlay; update only on change, alert only when essential, end immediately with a 15 to 30 minute summary; no ads, no duplicate push notifications |
| One-time, timely, high-value information | **Notification** | Consent required; concise title and body plus hidden-preview placeholder; up to four actions that avoid opening the app; badge only for unread count; never for errors (alert) and never repeated |
| Quick action or on/off state from Control Center, Lock Screen, Action button | **Control** | Symbol must stand alone; animate state; brand tint; configuration prompt; redaction when locked; authentication for security; can start a Live Activity or a locked camera experience |
| Invoke a key task by voice, Spotlight, Shortcuts, Action button, Pencil squeeze | **App Shortcut**, or an **app schema** (2026) for common domains | Up to 10; one optional parameter; short phrase with the app name; respond with dialogue plus a snippet or a Live Activity |
| Result or confirmation of a Siri, Spotlight, or Shortcuts action | **Snippet** (2026) | Confirmation (Cancel plus labeled primary) or result (Done); custom view up to 400 pt; deep link for more; visuals work without dialogue text |
| Always-visible data on the watch face | **Complication** (accessory circular, corner, inline, rectangular) | Timeline updates with daily limits; every family with a distinct deep link; 2 pt lines; tinted-mode safe; promote through a shareable **watch face** with previews and device labels |
| Featured or personalized media on Apple TV | **Top Shelf** | Carousel actions or details, sectioned row, or 3 to 8 scrolling banners; 2320x720 static fallback; no ads or prices |
| Device state atop an iOS screen | **Status bar** | Keep legible with a scroll edge effect; hide only temporarily for media |

Recommended combinations: a control that starts a Live Activity; an App Shortcut that starts a Live Activity or returns a snippet; widgets and Live Activities on shared code; Lock Screen widgets and complications designed together; several complications bundled into a shareable watch face.
</decision_guide>

<quick_checklist>
- [ ] Is the surface right: widget for periodic glanceable content, Live Activity for a bounded live task, notification for a one-time update, control for a quick action, App Shortcut or app schema for invocation, snippet for a Siri result?
- [ ] Does every widget, Live Activity, control, and complication tap deep-link to the directly related screen?
- [ ] Do widgets and complications show dynamic content rather than a static launcher or app icon?
- [ ] Are widgets legible in full-color, accented (tinted and clear), and vibrant modes, with meaning not carried by color alone, fonts 11 pt or larger, 16 pt (or 11 pt) margins, and no background in StandBy or CarPlay?
- [ ] Does the Live Activity support all four presentations, stay under 8 hours, use 14 pt Lock Screen margins, hug the TrueDepth camera, animate within 2 seconds, and end promptly with a 15 to 30 minute dismissal?
- [ ] Is sensitive information kept off or redacted on Lock Screen, Always-On, StandBy, notification, and locked-device control surfaces?
- [ ] Do notifications avoid duplicates and app branding, provide a hidden-preview placeholder, and offer at most four useful actions, nondestructive first?
- [ ] Is the badge used only for the unread count and kept in sync?
- [ ] Do controls have a symbol per state, Action button hint text, placeholders for variable titles, and authentication for security actions?
- [ ] Are there 10 or fewer App Shortcuts, each with at most one parameter, a short phrase including the app name, and critical information in spoken dialogue?
- [ ] Does each snippet stay under 400 pt with a descriptive primary label and a self-explanatory visual?
- [ ] Do complications support all families, use 2 pt or thicker lines, ship placeholders, and survive tinted mode?
- [ ] Are buttons and toggles omitted from watch and CarPlay layouts people may see while driving?
- [ ] On tvOS, does Top Shelf feature new or personalized content with a static fallback and no ads or prices?
- [ ] Is the status bar readable and only ever hidden temporarily?
</quick_checklist>
