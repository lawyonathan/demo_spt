<overview>
Top-level app flows: modal presentation, launch and state restoration, onboarding, full-screen modes, multitasking, settings placement, help and tips, accounts, and rating requests.
Distills HIG pages: modality, launching, onboarding, going-full-screen, multitasking, settings, offering-help, managing-accounts, ratings-and-reviews.
Load when designing or reviewing an app's overall flow, first run, any modal presentation, a settings screen, sign-in or account deletion, tips or tooltips, or a review prompt. Component details (alerts, sheets, popovers, action sheets, windows) live in the component reference files.
</overview>

<topic name="Modality" source="https://developer.apple.com/design/human-interface-guidelines/modality" updated="2023-12-05">
Modality presents content in a separate, dedicated mode that blocks interaction with the parent view and requires an explicit action to dismiss.

<when_to_use>
- Use modality to: deliver critical information people must receive or act on; let people confirm or modify their most recent action; run a distinct, narrowly scoped task without losing the previous context; give an immersive experience or help people concentrate on a complex task.
- Alert (all platforms): important information about the app. Activity views, sheets, confirmation dialogs or action sheets: context-specific options.
- Distinct task: sheet or popover in iOS, iPadOS, macOS; a separate window in iPadOS, macOS, visionOS.
- Temporary experience (viewing media) or multistep task (editing): full-screen modal. Nonmodal full screen: see Going full screen. visionOS: Immersive experiences.
</when_to_use>

<best_practices>
- **Present content modally only when there's a clear benefit.** It takes people out of their context and demands a dismiss action.
- **Aim to keep modal tasks simple, short, and streamlined.** Complex modal tasks make people lose track of the suspended task, especially when the previous context is hidden.
- **Consider using a full-screen modal style for in-depth content or a complex task.** Videos, photos, camera views, document markup, photo editing. In visionOS it fills a window in the Shared Space and can become more immersive in a Full Space.
- **Always give people an obvious way to dismiss a modal view.** iOS, iPadOS, watchOS: a top toolbar button or swipe down. macOS, tvOS: a button in the main content view.
- **When necessary, help people avoid data loss by getting confirmation before closing a modal view.** Explain and offer a resolution, such as an iOS action sheet with a save option.
- **Make it easy to identify a modal view's task.** Title it with the task, or add text that describes or guides.
- **Let people dismiss a modal view before presenting another one.** Stacked modal views add clutter and cognitive load. An alert may appear over everything, including other modal views.
</best_practices>

<anti_patterns>
- Avoid a modal experience that feels like an app within your app; if subviews are unavoidable, provide a single path and no buttons mistakable for the dismiss button.
- Never display more than one alert at the same time.
</anti_patterns>
</topic>

<topic name="Launching" source="https://developer.apple.com/design/human-interface-guidelines/launching" updated="2024-06-10">
Launching runs from opening the app, through any initial download, until the first screen is ready. Onboarding, if any, comes after.

<best_practices>
- **Launch instantly.** Some people won't wait more than a couple of seconds.
- **If the platform requires it, provide a launch screen.** iOS, iPadOS, and tvOS show it the moment the app starts and replace it with the first screen. macOS, visionOS, and watchOS don't need one.
- **If you need a splash screen, consider displaying it at the beginning of your onboarding flow.** It's a graphic that succinctly conveys branding and required information; without onboarding, show it as soon as launching completes.
- **Restore the previous state when your app restarts.** Scroll to the last position; reopen windows in the same state and location.
- **Downplay the launch experience.** A launch screen's sole function is to make the app feel quick to launch and immediately ready.
- **Design a launch screen that's nearly identical to the first screen.** Differences cause a flash. If the first screen starts as a solid color, the launch screen is only that color. Match the device's current orientation and appearance mode.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** If both orientations are supported, launch in the device's current one; a single-orientation app launches in its orientation and lets people rotate. A landscape-only interface must respond correctly whether people rotate left or right.
- **tvOS:** The launch screen is static, unlike the layered images elsewhere. In a live-viewing app, consider auto-starting new or recently viewed live content after a few seconds of inactivity.
- **visionOS:** Consider launching in the Shared Space even if fully immersive; a window gives context, loading time, and a control for opening the immersive experience. People appreciate choosing when to enter a Full Space.
</platform_considerations>

<anti_patterns>
- Avoid making people retrace steps to reach their previous location.
- Avoid text on the launch screen, even if the first screen has text; it won't be localized.
- Don't advertise: no splash-screen or "About" look, no logos or branding unless a fixed part of the first screen.
</anti_patterns>
</topic>

<topic name="Onboarding" source="https://developer.apple.com/design/human-interface-guidelines/onboarding" updated="2024-06-10">
Ideally people understand the app by experiencing it. If onboarding is necessary, make it fast, fun, and optional; it happens after launching, never as part of it.

<best_practices>
- **Teach through interactivity.** Let people safely try an action, discover a feature, or test a game mechanic rather than view instructions.
- **Consider providing a collection of context-specific tips instead of a single onboarding flow.** Tips isolate one task at a time; show instructions near the interface area they describe (`TipKit`).
- **If you need to present a prerequisite onboarding flow, design a brief, enjoyable experience that doesn't require memorizing a lot.** Teaching too much overwhelms and lowers retention.
- **If it makes sense to offer a separate tutorial, consider making it optional.** If skipped at first launch, don't present it on later launches, but keep it findable in a help, account, or settings area.
- **Keep onboarding content focused on the experience you provide.** Not on how to use the system or device.
- **Briefly display a splash screen if necessary.** Long enough to absorb at a glance, not long enough to feel like a delay.
- **Postpone nonessential setup flows or customization steps.** Provide reasonable defaults.
- **If your app needs private data or resources before it can function, consider integrating the permission request into onboarding.** That's the chance to show why and the benefit. Otherwise request permission when people first use the dependent feature.
- **Prefer letting people experience your app before prompting them for ratings or purchases.** Engaged people respond more positively.
</best_practices>

<anti_patterns>
- Don't let large downloads hinder onboarding; ship enough media and content in the package to start immediately.
- Avoid licensing details in onboarding; the App Store displays agreements and disclaimers. If unavoidable, integrate them without disrupting the flow.
</anti_patterns>
</topic>

<topic name="Going full screen" source="https://developer.apple.com/design/human-interface-guidelines/going-full-screen" updated="2025-06-09">
iPhone, iPad, and Mac full-screen modes expand a window to fill the screen and hide system controls. Apple TV and Apple Watch already fill the screen; Apple Vision Pro instead lets people expand a window or turn the Digital Crown to hide passthrough (see Immersive experiences).

<best_practices>
- **Support full-screen mode when it makes sense for your experience.** Playing a game, viewing videos or photo slideshows, or an in-depth task that benefits from no distractions.
- **If necessary, adjust your layout in full-screen mode.** Keep essential content prominent, adjust proportions without changing which items appear, and keep changes subtle to avoid jarring transitions.
- **Continue to provide access to essential features and controls.** A full-screen media experience keeps playback controls persistently available or easy to reveal.
- **Except in games, let people reveal the Dock while your iPadOS or macOS app is in full-screen mode.** A full-screen game may ask iPadOS to ignore an initial swipe up from the bottom edge (`preferredScreenEdgesDeferringSystemGestures`) or hide the Dock entirely in macOS (`hideDock`).
- **After people switch away from your full-screen experience, help them resume where they left off.** A game or slideshow pauses automatically.
- **Let people choose when to exit full-screen mode.** People don't expect it to end when they switch away or finish an activity.
- **Prioritize content by temporarily hiding toolbars and navigation controls.** (2025) When content is the focus (full-screen photos, reading), hide chrome but restore it with a familiar action: tapping, swiping down, or moving the cursor to the top of the screen. Keep controls essential for navigation or tasks visible. visionOS windows can hide chrome too, but people expect immersive experiences there instead.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** (2025) The Home Screen indicator hides shortly after someone switches to the app and reappears on interaction with the bottom of the screen, so one swipe exits. Retain this expected behavior; only if it causes unexpected exits, require two swipes instead of one (`preferredScreenEdgesDeferringSystemGestures`).
- **macOS:** Use the system-provided full-screen experience (`toggleFullScreen(_:)`), which automatically accommodates the camera housing on some Mac models. Let people enter via the window's Enter Full Screen button, the View menu item, or Control-Command-F; a game may also offer a custom toggle.
- **tvOS, visionOS, watchOS:** Not supported.
</platform_considerations>

<anti_patterns>
- Don't programmatically resize your window in full-screen mode.
- In a macOS game, don't change the display mode when players go full screen; it doesn't improve performance.
- Avoid offering a custom menu of window modes on macOS.
</anti_patterns>
</topic>

<topic name="Multitasking" source="https://developer.apple.com/design/human-interface-guidelines/multitasking" updated="2025-06-09">
With rare exceptions (some games, Apple Vision Pro apps in a Full Space) every app must work well with multitasking, and because it can start at any time the app must always be ready to save and restore context. Not supported in watchOS.

<best_practices>
- **Pause activities that require people's attention or active participation when they switch away.** Games and media apps let people continue as if they never left.
- **Respond smoothly to audio interruptions.** Pause indefinitely for primary interruptions (music, podcasts, audiobooks). Lower volume or pause temporarily for short ones (GPS directional notifications), then restore volume or playback.
- **Finish user-initiated tasks in the background.** Downloads or video processing that need no input complete before the app suspends.
- **Use notifications sparingly.** Notify when an important or time-sensitive task completes after people switch away; let people check routine or secondary tasks when they return.
</best_practices>

<platform_considerations>
- **iOS:** FaceTime and Picture in Picture video continue while people use another app; the app switcher shows all open apps.
- **iPadOS:** (2025) People view and interact with several apps' windows at once, and an app can support multiple open windows. Full-screen apps switch via the app switcher. Windowed apps are resizable and arrangeable like macOS, with system window controls for tiling configurations, entering full screen, minimizing, and closing; the frontmost window has colored controls and casts a drop shadow on windows behind it. Picture in Picture overlays work in both modes. Apps don't control multitasking configurations or receive any indication of them, so adapt gracefully to every screen size (see Layout, Windows).
- **macOS:** Multitasking is the default; drop shadows and other effects distinguish window states.
- **tvOS:** People browse or play content while movies or TV shows play in Picture in Picture where supported.
- **visionOS:** Multiple apps run in the Shared Space with one active window; the window people look at becomes active and the previous one turns more translucent and recedes along the z-axis. Closing a window backgrounds the app without quitting; closing the Now Playing app's window pauses audio, resumable from Control Center. Audio can duck when people look away unless the app is the Now Playing app.
</platform_considerations>

<anti_patterns>
- Avoid interfering with visionOS multitasking: don't change a window's edge appearance, because the system applies a feathered mask to windows people look away from.
- Don't pause a window's video playback in visionOS when people look away.
- Avoid unnecessary notifications for routine task completion.
</anti_patterns>
</topic>

<topic name="Settings" source="https://developer.apple.com/design/human-interface-guidelines/settings" updated="2024-06-10">
The system Settings app handles global options (appearance, network, accounts, accessibility, language and region) and on some platforms per-app permissions (location, microphone, camera, notifications, Siri, Search). A custom in-app settings area holds general settings that affect the whole experience (interface style, game-saving behavior); task-specific options live inside the task.

<when_to_use>
- General, infrequently changed options → in-app settings area.
- Options affecting only the current task (show/hide parts of a view, reorder items, filter a list) → in the screen they affect.
- The most rarely changed options → the system Settings app, with an in-app button that opens it.
</when_to_use>

<best_practices>
- **Aim to provide default settings that give the best experience to the largest number of people.** A game can maximize performance for the device automatically rather than asking at launch.
- **Minimize the number of settings you offer.** Too many feel unapproachable and hide the one people want.
- **Make settings available in ways people expect.** Command-Comma (,) with a physical keyboard; Esc in a game.
- **Respect people's systemwide settings.** Accessibility accommodations, scrolling behavior, and authentication methods are managed in the Settings app and apply to every app.
- **Put general, infrequently changed settings in your custom settings area.** Window configuration, game-saving behavior, keyboard mappings, account options.
- **When possible, prefer letting people modify task-specific options without going to your settings area.** In-context options stay discoverable and show their results; in games, players adjust their approach as gameplay, not as a setting.
- **Add only the most rarely changed options to the system-provided Settings app.** Consider a button that opens it directly.
</best_practices>

<platform_considerations>
- **macOS:** The Settings item in the App menu opens the custom settings window, typically with a toolbar of buttons that switch panes. Put document-level options in the File menu. Dim the window's minimize and maximize buttons (Command-Comma reopens it, and it fits the current pane). Use a noncustomizable toolbar that stays visible and always indicates the active button. Title the window with the current pane; with one pane, "App Name Settings". Restore the most recently viewed pane.
- **watchOS:** Apps don't add settings to the system Settings app; offer a few essential options at the bottom of the main view or let people reconfigure objects through a More menu.
</platform_considerations>

<anti_patterns>
- Avoid using settings to ask for setup information you can detect (a connected controller, Dark Mode).
- Avoid redundant versions of systemwide settings in your app; they imply system settings may not apply or that your copy affects other apps.
- Avoid settings buttons in a macOS window toolbar; they take space from frequent commands.
</anti_patterns>
</topic>

<topic name="Offering help" source="https://developer.apple.com/design/human-interface-guidelines/offering-help" updated="2023-12-05">
The best experiences are approachable and intuitive, but contextual help is sometimes necessary. Relate it to the precise action people are doing now and make it easy to dismiss or avoid.

<when_to_use>
- Simple one- or two-step task: an inline view describing it. Complex multistep task: a tutorial.
- New or less obvious feature, or a faster way to do a task: a tip (`TipKit`). Popover tip preserves content flow; inline tip keeps surrounding information visible; annotation-style inline tip points to a specific element; hint-style tip when unrelated to specific UI.
- Describing one control on macOS or visionOS: a tooltip (help tag).
</when_to_use>

<best_practices>
- **Let your app's tasks inform the types of help people might need.** Match help to the task's complexity.
- **Use relevant and consistent language and images in your help content.** No game-controller imagery for Siri Remote users; no "click" on iPhone or "tap" on a Mac.
- **Make sure all help content is inclusive.** See Inclusion.
- **Use the most appropriate tip type for your app's user interface.** Popover, inline, annotation, or hint as above.
- **Use tips for simple features.** A feature needing more than three actions is too complicated for a tip.
- **Make tips short, actionable, and engaging.** One or two sentences of direct, action-oriented language explaining what the feature does and how to use it.
- **Define rules to help ensure your tips reach the intended audience.** Parameter-based or event-based eligibility; skip people who already used the feature. With multiple tips, set a display frequency such as once every 24 hours.
- **If there's an image or symbol people associate with the feature, consider including it in the tip, and prefer the filled variant.** A star signals favorites.
- **Use buttons to direct people to information or options.** Open the relevant settings or additional resources such as a setup flow.
</best_practices>

<platform_considerations>
- **macOS, visionOS:** A tooltip (help tag) appears when the pointer rests on an element on a Mac (including iPhone and iPad apps running there) or when a person looks at or points at an element in visionOS (`help(_:)`). Describe only the control people indicate interest in. Explain the action it initiates, often starting with a verb ("Restore default settings", "Add or remove a language from the list"). Be brief: at most 60 to 75 characters (localization changes length), using fragments and omitting articles; if a control needs lots of text, simplify the design. Use sentence case and omit ending punctuation unless your style requires it. Consider context-sensitive text for different control states.
</platform_considerations>

<anti_patterns>
- Avoid explaining how standard components or patterns work; describe what the element does in your app. For a unique control or nonstandard input (Siri Remote rotated 90 degrees), prefer animation or graphics to lengthy description.
- Avoid promotional content or content about a different feature or flow in a tip.
- Avoid repeating the same image in both a tip and the UI element it connects to.
- In a tooltip, avoid repeating the control's name.
</anti_patterns>
</topic>

<topic name="Managing accounts" source="https://developer.apple.com/design/human-interface-guidelines/managing-accounts" updated="undated">
Ask people to create an account only if core functionality requires it. If you require one, consider Sign in with Apple for a consistent, trusted sign-in. If you help people create an account, you must also help them delete it, not just deactivate it.

<best_practices>
- **Explain the benefits of creating an account and how to sign up.** A brief, friendly description in the sign-in view.
- **Delay sign-in for as long as possible.** People abandon apps that force sign-in before anything useful; a shopping app requires it only at purchase.
- **If you don't use Sign in with Apple in your iOS, iPadOS, macOS, or visionOS app, prefer using a passkey.** People supply only a user name to create or sign in. If passwords remain, require two-factor authentication.
- **Always identify the authentication method you offer.** "Sign In with Face ID", not "Sign In".
- **Refer only to authentication methods that are available in the current context.** Check device capabilities (`LABiometryType`).
- **Provide a clear way to initiate account deletion within your app or game.** If impossible in-app, link directly to the deletion webpage. Comply with regional law and the right to be forgotten; if law compels retaining accounts or data (digital health records) or a specific process, describe it clearly. Revoke Sign in with Apple tokens on deletion.
- **Provide a consistent account-deletion experience whether people perform it in-app or on the website.** Neither path longer or more complicated.
- **Consider letting people schedule account deletion to occur in the future.** People may want remaining services or a renewal first; also offer immediate deletion.
- **Tell people when account deletion will complete, and notify them when it's finished.**
- **If you support in-app purchases, help people understand how billing and cancellation work when they delete their account.** Auto-renewable subscription billing continues through Apple until people cancel, regardless of deletion; afterward people must cancel or request a refund. Explain how to cancel subscriptions and manage purchases. Deletion is required even if the subscription wasn't bought through your app.
- **In a TV provider app, use TV Provider Authentication.** People sign in once at the system level.
</best_practices>

<platform_considerations>
- **tvOS:** People use a remote, so ask for the minimum. Prefer letting people sign up or authenticate on another device; with associated domains configured, Apple TV can suggest credentials including Sign in with Apple. On a shared account, avoid asking people to choose their profile each time; in tvOS 16 and later, share credentials across users while storing profiles separately (`kSecUseUserIndependentKeychain`, User Management Entitlement). For more than a small amount of data, send people to a website on another device; for an email address, show the email keyboard screen with recent addresses.
- **watchOS:** Use iCloud synchronization for Keychain access so people can autofill user names and passwords and preserve settings.
</platform_considerations>

<anti_patterns>
- Don't require an account when core functionality doesn't need one.
- Avoid an app-specific setting for opting in to biometric authentication; it's a system-level choice.
- Avoid the term "passcode" for account authentication; people associate it with device unlock and Apple services.
- Don't bury the deletion link in your Privacy Policy or Terms of Service.
- Avoid a sign-out option when people are signed in at the system level; if required, prompt them to Settings > TV Provider.
- Never instruct people to sign out via Settings > Privacy TV provider controls; those manage app access.
</anti_patterns>
</topic>

<topic name="Ratings and reviews" source="https://developer.apple.com/design/human-interface-guidelines/ratings-and-reviews" updated="2023-09-12">
A great experience earns ratings; timing the request matters. Base it on launch count or frequency, features explored, or tasks completed. People can always rate the app in the App Store.

<best_practices>
- **Ask for a rating only after people have demonstrated engagement with your app or game.** After completing a level or a significant task.
- **Prefer the system-provided prompt.** In iOS, iPadOS, and macOS (`RequestReviewAction`) it checks for previous feedback, asks for a rating and optional review, dismisses with one tap or click, honors a systemwide opt-out, and is limited to three occurrences per app within a 365-day period.
- **Weigh the benefits of resetting your summary rating against the potential disadvantage of showing fewer ratings.** Resetting on a new version keeps ratings current but lowers the count, which can discourage downloads.
</best_practices>

<anti_patterns>
- Avoid asking on first launch or during onboarding; people haven't formed an opinion and may respond negatively.
- Avoid interrupting a task or gameplay; ask at natural breaks or stopping points.
- Avoid pestering: allow at least a week or two between requests, and only after further engagement.
</anti_patterns>
</topic>

<decision_guide>
**Modal or nonmodal?**
- Critical information, a confirmation of the last action, or a distinct short task people finish and leave → modal.
- Temporary immersive content (media, camera) or a multistep task (editing, markup) → full-screen modal (visionOS: optionally a Full Space).
- Sustained focus on a game, media, or in-depth work the person controls → nonmodal full-screen mode, entered and exited by the person.
- Navigation, browsing, or options that affect the current view → nonmodal, in context.

**Which modal component?**
| Job | Component |
|---|---|
| Important app information, possibly requiring action; can appear over anything, one at a time | Alert |
| Confirm or modify the most recent action; context-specific choices such as save before closing (iOS) | Action sheet / confirmation dialog |
| Other platform-defined context-specific options | Activity view (see its component page) |
| A distinct, narrowly scoped task in iOS, iPadOS, macOS | Sheet or popover (see their component pages) |
| Viewing media, a camera view, or a complex multistep task | Full-screen modal |
| A distinct task that warrants its own window in iPadOS, macOS, visionOS | Separate window |

**Where does a setting belong?**
| Setting | Location |
|---|---|
| Global: accessibility, scrolling, authentication method, appearance, Dark Mode, notifications, permissions, Siri, Search | System Settings app; never duplicated in-app |
| General, infrequently changed: interface style, window configuration, game-saving behavior, keyboard mappings, account options | In-app settings area (macOS: window from the App menu, Command-Comma; watchOS: bottom of main view or a More menu) |
| Affects only the current task: show/hide view parts, reorder, filter | In the screen it affects |
| Detectable setup info: controller, Dark Mode | Nowhere; detect it |
| Most rarely changed | System Settings app plus an in-app button that opens it |

**Is onboarding justified?**
- The interface teaches itself → none; use context-specific tips for less obvious features.
- People truly need something before starting → brief, interactive, optional prerequisite flow; a splash screen at its start only if branding or required information must be shown.
- A permission is required to function at all → request inside onboarding with the reason; otherwise at first use.
- Setup is nonessential → defaults, no flow.
- A tutorial helps but isn't required → optional, skippable, never auto-repeated, findable in help, account, or settings.

**Accounts**
- Core functionality works without one → don't require it.
- Required → explain the benefit in the sign-in view, delay sign-in until needed, use Sign in with Apple or a passkey, name the method on the button, add two-factor authentication if passwords stay.
- Deletion → in-app entry point (or a prominent direct web link), identical web and in-app flows, immediate plus optional scheduled deletion, stated completion time and a finish notification, subscription billing explained (Apple bills until the person cancels), Sign in with Apple tokens revoked.
- Ratings or purchases → only after engagement, at a natural break, never in onboarding, via the system prompt (3 per 365 days, at least a week or two apart).
</decision_guide>

<quick_checklist>
- [ ] Is each modal justified (critical info, confirmation, or a short distinct task), titled with its task, single-path, and dismissible the platform-standard way?
- [ ] Is only one modal view visible at a time and only one alert, with a save confirmation before losing user content?
- [ ] Does the launch screen (iOS, iPadOS, tvOS) mirror the first screen with no text, logos, or branding, and does the app restore scroll position and windows on restart?
- [ ] Is onboarding optional, interactive, brief, app-focused, free of licensing text and blocking downloads, and never repeated after being skipped?
- [ ] Are permission requests explained in onboarding only when required to function, otherwise deferred to first use?
- [ ] In full screen, are essential controls reachable, the Dock revealable (except games), exit under the person's control, and hidden toolbars restorable by tap, swipe down, or cursor to top?
- [ ] Does the app pause attention-dependent activity on switch-away, finish user-initiated work in the background, handle audio interruptions, and adapt to iPad windowed sizes?
- [ ] Are systemwide settings left to the Settings app, task options kept in context, and in-app settings few, general, and defaulted well?
- [ ] On macOS, is Settings in the App menu with a fixed visible toolbar, dimmed minimize/maximize, pane-based title, and last pane restored?
- [ ] Are tips one or two sentences, for features of three actions or fewer, eligibility-gated, rate-limited, and non-promotional; are tooltips verb-led, sentence case, and 60 to 75 characters or fewer?
- [ ] Is the account optional unless core functionality needs it, sign-in deferred, the method named on the button, passkey or Sign in with Apple preferred, and biometric opt-in left to the system?
- [ ] Can people delete (not merely deactivate) their account in-app with a consistent web flow, clear timing, and subscription-billing guidance?
- [ ] Are rating requests made only after engagement, at natural breaks, a week or two apart, through the system prompt?
</quick_checklist>
