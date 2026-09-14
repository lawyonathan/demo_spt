<overview>
Feedback and media patterns: how an app tells people what is happening (inline status, progress, confirmations, warnings, haptics, notifications) and how it plays audio and video, plus sharing, live-TV, and workout experiences built on those mechanisms.
Distills the HIG pages feedback, loading, managing-notifications, playing-audio, playing-video, playing-haptics, collaboration-and-sharing, live-viewing-apps, workouts.
Load when designing or reviewing loading states, progress or completion feedback, alerts vs passive status, notifications, audio sessions and routing, video players and PiP, haptics, share sheets and collaboration UI, live-TV/EPG/DVR features, or workout sessions.
Component detail (alerts, progress indicators, notifications, activity views, SharePlay, activity rings, ornaments) lives in the component references.
</overview>

<topic name="Feedback" source="https://developer.apple.com/design/human-interface-guidelines/feedback" updated="undated">
Feedback tells people what is happening, what they can do next, the result of an action, and how to avoid mistakes. Match the significance of the information to how disruptively it is delivered: passive status stays in the interface; possible data loss interrupts.

<when_to_use>
- Passive in-context display for status people check when they want (Mail: last update time and unread count in the mailbox toolbar).
- Interrupting alert only for critical, ideally actionable, information such as unexpected, irreversible data loss.
- Success confirmation only for sufficiently important actions (an Apple Pay transaction); people expect success and mostly need to know when something fails.
</when_to_use>

<best_practices>
- **Make sure all feedback is accessible.** Use several channels (color, text, sound, haptics) so it reaches people who silenced the device, look away, or use VoiceOver.
- **Consider integrating status feedback into your interface.** Show status near the items it describes so people needn't act or leave their context.
- **Use alerts to deliver critical, ideally actionable, information.** Alerts disrupt; overuse or trivial content drains their impact.
- **Warn people when they initiate a task that can cause unexpected, irreversible data loss.** Not when loss is the expected result (Finder doesn't warn on every file deletion).
- **When it makes sense, confirm that a significant action or task completed.**
- **Show people when a command can't be carried out and help them understand why.** Maps explains it can't route to and from the same location.
</best_practices>

<platform_considerations>
- **watchOS:** Avoid indeterminate progress indicators (loading spinners); animation makes people think they must keep watching. Reassure them they'll get a notification when the process completes.
</platform_considerations>

<anti_patterns>
- Don't use alerts too often or for unimportant information.
- Don't warn when data loss is the expected result of the action.
- Don't rely on a single channel (color only, sound only).
- watchOS: avoid indeterminate progress indicators.
</anti_patterns>
</topic>

<topic name="Loading" source="https://developer.apple.com/design/human-interface-guidelines/loading" updated="2025-06-09">
The best content-loading experience finishes before people become aware of it; loading assets, levels, or content must never disrupt the experience.

<best_practices>
- **Show something as soon as possible.** An empty wait reads as a broken app; show placeholder text, graphics, or animations and replace them as content arrives.
- **Let people do other things while content loads.** Load in the background (a game loads the next level while players read about it or view a menu).
- **If loading is unavoidably long, give people something interesting to view.** Gameplay hints, tips, new-feature introductions; gauge remaining time accurately so placeholder content is neither cut short nor repeated.
- **Improve installation and launch time by downloading large assets in the background (2025).** Use the Background Assets framework to schedule level packs, 3D character models, and textures right after installation, during updates, or at other nondisruptive times.
- **Clearly communicate that content is loading and how long it might take.** Beyond a moment or two, use system progress indicators: determinate when you know the duration, indeterminate when you don't.
- **For games, consider creating a custom loading view.** Standard indicators can feel out of place; match the game's style.
</best_practices>

<platform_considerations>
- **watchOS:** Avoid loading indicators as much as possible and display content immediately; if content needs a second or two, an indicator beats a blank screen.
</platform_considerations>

<anti_patterns>
- Don't make people wait with nothing on screen.
- Don't block other actions while content loads.
- watchOS: avoid loading indicators where possible; never show a blank screen.
</anti_patterns>
</topic>

<topic name="Managing notifications" source="https://developer.apple.com/design/human-interface-guidelines/managing-notifications" updated="undated">
Notifications deliver timely, important information whether the device is locked or in use. Get permission before sending any; people can revisit that choice in Settings and silence all notifications (except government alerts in some locales).

<when_to_use>
- **Communication notifications** for calls and messages: adopt SiriKit intents (`INSendMessageIntent`, `UNNotificationContentProviding`) so people can customize behavior with Siri; the system times the alert by sender.
- **Noncommunication notifications** for everything else: assign each a system interruption level (`UNNotificationInterruptionLevel`).
- Focus and scheduled delivery: people set a Focus (sleeping, working, reading, driving), choose immediate alerts or a summary at chosen times, and pick which contacts, apps, and Time Sensitive alerts break through. A Focus may delay the alert, but the notification is available as soon as it arrives.
</when_to_use>

<specs>
| Interruption level | Meaning | Overrides scheduled delivery | Breaks through Focus | Overrides Ring/Silent (iPhone, iPad) |
|---|---|---|---|---|
| Passive | View at leisure (restaurant recommendation) | No | No | No |
| Active (default) | Worth knowing on arrival (score update) | No | No | No |
| Time Sensitive | Directly impacts the person, needs immediate attention (account security issue, package delivery) | Yes | Yes | No |
| Critical | Urgent health or safety; extremely rare, typically governmental or public agencies and health/home apps; requires an entitlement | Yes | Yes | Yes |
</specs>

<best_practices>
- **Build trust by accurately representing the urgency of each notification.** People can throttle or turn off your notifications entirely; never carry low-priority content at a high level.
- **Use the Time Sensitive level only for notifications relevant in the moment.** The event must be happening now or within an hour. On your first Time Sensitive notification the system explains the level and offers a way to turn it off, then periodically re-asks.
- **Never use the Time Sensitive level to send a marketing notification.** Marketing must never break through a Focus or scheduled delivery.
- **Get explicit permission before sending promotional or marketing notifications.** An alert, modal view, or other interface describes what you'll send with a clear opt in or out (subscription offer, live game event offer).
- **Make sure people can manage notification settings within your app.** An in-app settings screen must let people change their choice for informational and marketing notifications.
</best_practices>

<platform_considerations>
- **watchOS:** iPhone notification settings apply to the same apps on Apple Watch by default; people manage them in the Apple Watch app on iPhone or swipe left on an arriving notification for options such as Mute 1 Hour or Turn off Time Sensitive.
</platform_considerations>

<anti_patterns>
- Don't send any notification without permission.
- Don't inflate the interruption level for low-priority information.
- Don't use Time Sensitive for anything not happening now or within an hour.
- Never send marketing at the Time Sensitive level or without explicit opt in.
- Don't omit an in-app settings screen for notification choices.
</anti_patterns>
</topic>

<topic name="Playing audio" source="https://developer.apple.com/design/human-interface-guidelines/playing-audio" updated="2023-06-21">
Audio must adjust automatically as context changes: output via speakers, headphones, Bluetooth, or AirPlay; control via volume buttons, the Ring/Silent switch on iPhone, headphone controls, the Control Center slider, and accessory controls.

<when_to_use>
- **Silence.** Silent mode means no unexpected sounds (ringtones, message tones) and no nonessential sounds (keyboard clicks, sound effects, game soundtracks, audible feedback). Only explicitly initiated audio plays: media playback, alarms, audio/video messaging.
- **Volume.** System volume governs all sound, music and in-app effects alike, however it is adjusted; only iPhone ringer volume is set separately in Settings.
- **Headphones.** Connecting reroutes sound automatically without interruption; disconnecting pauses playback immediately.
</when_to_use>

<specs>
Audio session categories (`AVAudioSession.Category`):
| Category | Meaning | Silence switch | Mixes | Background |
|---|---|---|---|---|
| Solo ambient | Nonessential sound that silences other audio (game with a soundtrack) | Responds | No | No |
| Ambient | Nonessential sound that doesn't silence other audio (game that lets another app's music replace its soundtrack) | Responds | Yes | No |
| Playback | Essential sound that might mix (audiobook, language-learning app people keep hearing after leaving) | Ignores | Maybe | Can play |
| Record | Sound is recorded (note-taking app with audio mode; switch to Playback to play notes back) | Ignores | No | Can record |
| Play and record | Records and plays, possibly at once (audio messaging, video calling) | Ignores | Maybe | Can record and play |
</specs>

<best_practices>
- **Adjust levels automatically when necessary, but don't adjust the overall volume.** Mix relative levels; system volume governs final output.
- **Permit rerouting of audio when possible.** Living room stereo, car radio, Apple TV; support it unless there's a compelling reason not to.
- **Use the system-provided volume view (`MPVolumeView`).** Volume slider (customizable appearance) plus a rerouting control.
- **Choose an audio category that fits the way your app uses sound.** Don't make people stop another app's music if you don't need to.
- **Respond to audio controls only when it makes sense.** Control Center and headphone controls reach your app in foreground or background; respond when actively playing, in a clear audio context, or connected via Bluetooth or AirPlay. Otherwise avoid halting another app's audio.
- **Avoid repurposing audio controls.** Same meaning in every app; if you don't support a control, don't respond to it.
- **Create custom player controls only for commands the system doesn't support.** Custom skip increments, or related content such as a sports score.
- **Let other apps know when your app finishes playing temporary audio.** Flag the session with `notifyOthersOnDeactivation` so they can resume.
- **Determine how to respond to audio-session interruptions.** A recording app can refuse interruption by an incoming call unless the person accepts it. A VoIP app must end the call when people close an iPad Smart Folio while using the built-in mic (closing mutes it and interrupts the session); restarting on reopen would unmute the mic without their knowledge.
- **When an interruption ends, determine whether to resume automatically.** Resumable (incoming call) vs nonresumable (a new playlist). A media app checks `shouldResume` first; a game can resume without checking because its audio wasn't an explicit choice.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** Use the system sound services (Audio Services) for short sounds and vibrations.
- **macOS:** Notification sounds mix with other audio by default.
- **tvOS:** Audio plays only when people initiate it (in-app interaction, device calibration); no sounds accompany alerts or notifications.
- **visionOS:** Subtle sounds are everywhere and give essential feedback for look-and-gesture interaction; Spatial Audio places sound in space. Never convey important information with sound alone. Now Playing app audio pauses when its window closes; other apps' audio can duck when people look away. Prefer playing sound: a silent app, especially in an immersive moment, feels lifeless or broken. Design custom sounds for custom elements (system elements already sound so people can locate them). Combine ambient audio (anchors people in a virtual world) with audio sources (sound from a specific object); a moved window keeps emitting from its new place. Vary repetitive sounds by randomizing pitch and volume at playback, as the virtual keyboard does, instead of shipping multiple files. Choose fixed sound (pointed at the wearer regardless of gaze; Mindfulness uses it to envelop) or tracked sound (from an object, changes with distance; usually better for realism).
- **watchOS:** The system manages playback; apps play short clips in the foreground or longer audio that continues after wrist-down or an app switch. Encode at 64 kbps HE-AAC. Consider the system Now Playing view so people control current or recent audio without leaving your app; it shows the current source (possibly another app on Apple Watch or iPhone) and auto-selects the current or most recent one.
</platform_considerations>

<anti_patterns>
- Don't change the system volume; adjust only relative levels.
- Don't block rerouting without a compelling reason.
- Don't pick a category that silences other apps' music unnecessarily.
- Don't respond to remote controls outside an audio context; don't redefine what a control means.
- Don't build custom player controls when system ones suffice.
- Don't auto-restart a mic session after a Smart Folio reopens.
- visionOS: don't convey important information with sound alone.
</anti_patterns>
</topic>

<topic name="Playing video" source="https://developer.apple.com/design/human-interface-guidelines/playing-video" updated="2023-09-12">
System video players exist for iOS, iPadOS, macOS, tvOS, and visionOS, and content can also be offered through the TV app. Use the system player; if a custom one is truly required, mirror its behavior so habitual interactions keep working.

<when_to_use>
Default playback mode is chosen by aspect ratio (people can switch during playback):
| Mode | Behavior | Default for |
|---|---|---|
| Full-screen / aspect-fill (`resizeAspectFill`) | Fills the display, some edge cropping | Wide video, 2:1 through 2.40:1 |
| Fit-to-screen / aspect (`resizeAspect`) | Whole frame visible, letterboxed or pillarboxed | Standard (4:3, 16:9, up to 2:1) and ultrawide (above 2.40:1) |
- Picture in Picture (PiP) is available in most platforms.
- tvOS and visionOS players add transport controls (subtitles, audio language, add to library, favorite) with content tabs below (Info, Episodes, Chapters); in visionOS the transport controls are an ornament.
- visionOS: `AVPlayerViewController` for inline 2D video in a window; a RealityKit video player for splash screens, transitional views, or video on a surface (no controls, no dimming or anchoring; correct aspect ratio for 2D and 3D; closed captions).
</when_to_use>

<best_practices>
- **Use the system video player.** A custom player that diverges only slightly frustrates people who can't tell which habits still work.
- **Always display video content at its original aspect ratio.** Embedded letterbox or pillarbox padding defeats scaling, shrinks video in both modes, and breaks edge-to-edge contexts like PiP on iPad.
- **Provide additional information when it adds value.** In iOS, iPadOS, tvOS, and visionOS supply image, title, and description via `externalMetadata`; don't obscure playback.
- **Support the interactions people expect on every input device.** Space on a connected keyboard plays or pauses on Apple Vision Pro, Mac, iPhone, iPad, and Apple TV; Siri Remote gestures move through media on Apple TV.
- **In tvOS, add a transport control or custom content tab only for the most useful options.** Actions take a step or two at most, content stays succinct; transport control for playback actions (favoriting), content tab for supplementary information or recommendations.
- **Avoid letting audio from different sources mix as viewers switch modes.** Typical failure: video goes to PiP (auto-muted), a game with music starts full-screen, the viewer unmutes PiP, and the game ignores secondary audio. Observe `silenceSecondaryAudioHintNotification`.

TV app integration (starting playback in the TV app opens your app and transitions to it):
- **Ensure a smooth transition.** The TV app fades to black and skips your launch screen; immediately show your own black screen before playing.
- **Show the expected content immediately.** No splash, detail screens, intro animations, or other barriers. If an interstitial is unavoidable, Select steps through it and Play skips it.
- **Avoid asking whether to resume playback.** Resume automatically, at the previous end time for long clips.
- **Play or pause on Space from a connected Bluetooth keyboard.**
- **Make sure content plays for the correct viewer.** Switch to the profile named in the request; if none, ask the viewer to choose one before playback.
- **Avoid loading screens when possible.** If loading exceeds two seconds, show a black screen with a centered activity spinner and nothing else, only until enough content loads to begin; load the rest in the background. Keep branding minimal on the black background.
- **On exit, show a contextually relevant screen.** People stay in your app: show a detail view for the content just watched with a resume option, else a menu listing it or the main menu. Prepare it as soon as the playback notification arrives in case people exit immediately.
</best_practices>

<platform_considerations>
- **tvOS:** Defer to content for logos and noninteractive overlays; a small logo or countdown timer is fine, large distracting overlays are not. Some devices suffer image retention, so keep overlays short and prefer translucent SDR graphics to bright, opaque content. For interactive overlays (quizzes, surveys, progress check-ins), pause after a minimum 0.5-second delay, then show the overlay with a clear way to dismiss and resume.
- **visionOS:** Keep people comfortable: let them choose when playback starts, use a small resizable window, keep surroundings visible. In a fully immersive experience the system places the player at a predictable optimal location; don't let virtual content occlude the playback or transport ornament near the bottom. Never auto-start fully immersive playback. Supply a thumbnail track for scrubbing, each thumbnail 160 px wide (HLS Trick Play). Don't expand an inline player to fill a window: inline video is 2D, controls sit in the window's plane, and visible surrounding content signals no immersive playback.
- **watchOS:** The system manages playback; apps play short clips in the foreground, inline via a movie element or in a separate interface (`VideoPlayer`). Keep clips to 30 seconds or less (disk space, wrist fatigue). Don't scale clips. A poster image should represent the clip and never look like a system control; tapping it swaps in the video and plays inline.
</platform_considerations>

<specs>
watchOS media encoding:
| Attribute | Value |
|---|---|
| Video codec | H.264 High Profile |
| Video bit rate | 160 kbps at up to 30 fps |
| Resolution (full screen) | 208x260 px, portrait |
| Resolution (16:9) | 320x180 px, landscape |
| Audio (movies and audio-only) | 64 kbps HE-AAC |
</specs>

<anti_patterns>
- Don't build a custom player that only slightly diverges from the system one.
- Don't embed letterbox or pillarbox padding in the video frame.
- Don't let secondary audio mix across full-screen and PiP switches.
- TV app: don't show launch, splash, detail, or intro screens before content; don't ask to confirm resume; no loading screen unless loading exceeds two seconds.
- tvOS: avoid large distracting overlays and bright, opaque long-lived graphics.
- visionOS: don't auto-start fully immersive video; don't cover transport controls; don't expand inline players to fill a window.
- watchOS: avoid clips over 30 seconds, scaled video, and poster images that look like controls or don't match the content.
</anti_patterns>
</topic>

<topic name="Playing haptics" source="https://developer.apple.com/design/human-interface-guidelines/playing-haptics" updated="2024-05-07">
Haptics engage touch and bring physical-world familiarity into an app or game. Switches, sliders, and pickers play haptics automatically on supported iPhone models; the Apple Watch Taptic Engine plays built-in patterns with an audible tone; a Force Touch trackpad Mac plays haptics during drags and force clicks. Game controllers (iPadOS, macOS, tvOS, visionOS), Apple Pencil Pro, and some trackpads on certain iPad models also play haptics.

<best_practices>
- **Use system-provided haptic patterns according to their documented meanings.** If the documented use doesn't fit, use a generic or custom pattern, never a repurposed one.
- **Use haptics consistently.** Build a clear causal link between each haptic and its action; reusing the mission-failed pattern for a level completion confuses people.
- **Prefer using haptics to complement other feedback.** Match haptic intensity and sharpness to the accompanying animation; synchronize sound with haptics (Core Haptics patterns can include audio).
- **Avoid overusing haptics.** Occasional feels right, frequent feels tiresome; user-test for balance. The best haptic is one people don't notice but miss when it's off.
- **In most apps, prefer short haptics that complement discrete events.** Long-running haptics suit gameplay flows but dilute meaning in apps; on Apple Pencil Pro, continuous haptics don't clarify writing or drawing and make holding the pencil less pleasant.
- **Make haptics optional.** Provide an off or mute setting; the app must remain enjoyable without them.
- **Be aware that haptics might impact other experiences.** Vibration can disrupt the camera, gyroscope, or microphone.

Custom haptics (Core Haptics; common in games, occasionally in apps):
- **Transient** events are brief taps or impulses (the Flashlight button on the Home Screen); **continuous** events are sustained vibration (the lasers effect in a message).
- Both take **sharpness** (soft, rounded, organic vs crisp, precise, mechanical) and **intensity** (strength). Combine event types, vary by input or context (a jump from a tree hits harder than a jump in place; a collision differs from approaching footsteps), and optionally add audio.
</best_practices>

<platform_considerations>
- **iOS:** Standard toggles, sliders, and pickers play Apple-designed haptics by default. `UIFeedbackGenerator` plays predefined patterns in three categories: Notification (outcome of a task, e.g. depositing a check or unlocking a vehicle), Impact (physical metaphor: a tap when a view snaps into place, a thud when heavy objects collide), Selection (feedback while a UI element's values change).
- **macOS:** With a Magic Trackpad, respond to a drag or force click with one of three `NSHapticFeedbackPerformer` patterns (specs).
- **watchOS:** Apple Watch Series 4 and later gives Digital Crown haptics: linear detents while rotating by default, and some controls like table views add detents as items scroll on. `WKHapticType` defines the meaning-bearing set (specs).
</platform_considerations>

<specs>
macOS trackpad patterns:
| Pattern | Use |
|---|---|
| Alignment | A dragged item aligns with another (shapes in a drawing app), scales to fit, reaches a preferred position, or hits the beginning/end or min/max of something like a video scrubber |
| Level change | Movement between discrete pressure levels, e.g. fast-forward speed steps as pressure increases on a video player |
| Generic | General feedback when the other patterns don't apply |

watchOS haptics:
| Haptic | Meaning |
|---|---|
| Notification | Something significant or out of the ordinary needs attention; also played for local and remote notifications |
| Up / Down | An important value rose above / fell below a significant threshold |
| Success / Failure | An action completed / failed |
| Retry | An action failed but can be retried |
| Start / Stop | An activity the person explicitly starts and stops (a timer) began / stopped; Stop usually follows Start |
| Click | Dial-click sensation for progress at predefined increments; overuse diminishes it and overlapping clicks confuse |
</specs>

<anti_patterns>
- Don't repurpose a system pattern to mean something else.
- Don't use one pattern for both positive and negative outcomes.
- Don't overuse haptics or play long-running haptics in nongame apps (especially on Apple Pencil Pro).
- Don't make haptics mandatory.
- Don't let vibration interfere with camera, gyroscope, or microphone use.
- watchOS: don't overuse Click or let clicks overlap.
</anti_patterns>
</topic>

<topic name="Collaboration and sharing" source="https://developer.apple.com/design/human-interface-guidelines/collaboration-and-sharing" updated="2023-12-05">
Great collaboration and sharing is simple and responsive: people engage with content while communicating with others. The share sheet, sharing popover, Collaboration button, and Messages integration work with CloudKit, iCloud Drive, or a custom solution; custom infrastructure must also support universal links. Real-time shared activities are SharePlay (shareplay page).

<when_to_use>
- Sharing or collaboration starts by dropping a document into a Messages conversation or choosing a destination in the share sheet.
- Once underway, the Collaboration button is where people communicate, run custom actions, and manage details; Messages notifies people when collaborators mention them, make changes, join, or leave.
- Doing an activity together in real time from separate devices is SharePlay, not document collaboration.
</when_to_use>

<best_practices>
- **Place the Share button in a convenient location, like a toolbar.** Since iOS 16 the share sheet lets people pick a file-sharing method and set permissions for a new collaboration; iPadOS 16 and macOS 13 do the same in the sharing popover. SwiftUI: `ShareLink` opens the share sheet.
- **If necessary, customize the share sheet or popover for the file-sharing types you support.** CloudKit: pass both the file and the collaboration object so the sheet enables "send copy". iCloud Drive: "send copy" works by default. Custom: include a file, or a plain-text representation, in the collaboration object.
- **Write succinct phrases that summarize the sharing permissions you support.** E.g. "Only invited people can edit" or "Everyone can make changes"; the system shows the summary in a button that reveals the sharing options.
- **Provide a set of simple sharing options.** Who can access, edit vs read only, whether collaborators can add participants; keep custom choices minimal and grouped for at-a-glance understanding.
- **Prominently display the Collaboration button as soon as collaboration starts.** It reminds people the content is shared and shows who's sharing; place it next to the Share button.
- **Provide custom actions in the collaboration popover only if needed.** Top section: collaborators with Messages and FaceTime buttons; middle: your custom items; bottom: the manage-shared-file button. Offer only essentials (Notes summarizes recent updates with buttons for more).
- **If it makes sense, customize the collaboration-management button title.** Default "Manage Shared File"; it opens the view for settings and adding or removing collaborators (CloudKit provides the view; otherwise build your own).
- **Consider posting collaboration event notifications in Messages.** Pick the event type (content change, membership change, mention) and include a universal link to the relevant view (`SWHighlightEvent`, Shared with You).
</best_practices>

<platform_considerations>
- **tvOS:** Not available.
- **visionOS:** In the Shared Space the system streams the current window to collaborators; moving the app to a Full Space pauses the stream for others until it returns.
- **watchOS:** Use `ShareLink` in SwiftUI to present the system share sheet.
</platform_considerations>

<anti_patterns>
- Don't overwhelm people with permission options or nonessential items in the collaboration popover.
- Don't skip universal-link support with custom collaboration infrastructure.
</anti_patterns>
</topic>

<topic name="Live-viewing apps" source="https://developer.apple.com/design/human-interface-guidelines/live-viewing-apps" updated="undated">
Live-viewing apps elevate live content over video on demand (VOD): on every screen, draw attention to live content and make it distinguishable from VOD at a glance, with fluid interactions that encourage immersion.

<best_practices>
- **Feature live content prominently and make it easy to access.** Minimize launch-to-playback time; live content in the first tab means at most one tap.
- **Let people tap once, or not at all, to start playback.** E.g. a Watch Now button over featured or recently viewed live content that disappears into full-screen playback.
- **Make sure live content looks live.** Playing it is best; also mark it, e.g. a "Live" collection row with a badge, symbol, or sash per item.
- **Consider indicating the progress of currently playing live content.** A progress bar shows where people will land and how much remains.
- **Give people additional actions and viewing alternatives.** Playback is always primary; support record, restart, download, etc. in the same order everywhere (Watch, Start Over, Record, Favorite). Show other airing times so people can schedule viewing.
- **Consider a content footer for browsing channels during playback.** Subtle darkening for legibility; badge or tint the current channel's thumbnail or progress bar; match categories to the EPG; symmetric invoke and dismiss (swipe up to show, swipe down to hide).
- **Provide instant visual feedback when people change channels.** It confirms the channel and gives the stream time to load.
- **Match audio to the current context.** Audio continues while people browse with live content in the background, but stops when they leave the live tab.
- EPG: **prominently show the current program, channel, and time with an easy return to playback**; **make browsing effortless** (paging, scrolling, jumping; a My Channels or Favorites group); **group content into familiar categories** (Movies, TV Shows, Kids, Sports, Popular) reused in the content footer; **let people browse without leaving current content** via PiP or background playback.
- Cloud DVR: **start and stop recording from the info panel** while streaming; **record a future program from its detail view**, this program only or all future episodes; **let people tailor recording** (current episode, new episodes, games with specific teams); **allow play, delete, and settings changes in the DVR area**; **consider a DVR settings control** (delete watched or older-than-N-days content; ideally automatic storage management that overwrites the oldest or already viewed content).
</best_practices>

<anti_patterns>
- Don't require more than one tap to reach live playback.
- Don't let live and VOD content look alike.
- Don't reorder secondary actions between screens.
- Don't keep live audio playing after people leave the live tab.
- Don't use different categories in the content footer and the EPG.
</anti_patterns>
</topic>

<topic name="Workouts" source="https://developer.apple.com/design/human-interface-guidelines/workouts" updated="undated">
A workout experience keeps people engaged with the current activity and tracks progress on Apple Watch, iPhone, or iPad using device activity data and familiar metric components. Larger or stationary devices (iPad Pro, Mac, Apple TV) are used to follow live or recorded sessions.

<best_practices>
- **In a watchOS fitness app, use workout sessions to provide useful data and relevant controls.** watchOS keeps showing the app between wrist raises during a session, so show what matters most (elapsed or remaining time, calories burned, distance) plus controls like lap or interval markers.
- **Avoid distracting people from a workout with irrelevant information.** No workout lists or other app areas mid-workout. Common arrangement (as in Workout): large session controls (End, Resume, New) on the leftmost screen; a dedicated glanceable metrics screen; media playback controls, if supported, on the rightmost screen.
- **Use a distinct visual appearance to indicate an active workout.** Live-updating metrics plus a unique layout make the active state recognizable.
- **Provide workout controls that are easy to find and tap.** Pause, resume, stop, with clear feedback when a session starts or stops.
- **Help people understand the health information you record when sensor data is unavailable.** Water may block heart rate while distance and calories still record. For the Swimming or Other types, mirror the Workout app's wording: "GPS is not used during a Pool Swim, and water may prevent a heart-rate measurement, but Apple Watch will still track your calories, laps, and distance using the built-in accelerometer." / "In this type of workout, you earn the calorie equivalent of a brisk walk anytime sensor readings are unavailable." / "GPS will only provide distance when you do a freestyle stroke. Water might prevent a heart-rate measurement, but calories will still be tracked using the built-in accelerometer."
- **Provide a summary at the end of a session.** It confirms completion and shows recorded data; consider including Activity rings.
- **Discard extremely brief workout sessions.** If a session ends a few seconds after it starts, discard automatically or ask whether to record it.
- **Make sure text is legible when people are in motion.** Large font sizes, high-contrast colors, most important information easiest to read.
- **Use Activity rings correctly.** Ring colors and meanings match the Activity app; use the view only for its documented purpose.
</best_practices>

<platform_considerations>
- **iOS, iPadOS, watchOS:** Supported (Apple Watch worn during workouts; iPhone or iPad carried while walking, wheelchair pushing, or running).
- **macOS, tvOS, visionOS:** Not supported.
</platform_considerations>

<anti_patterns>
- Don't show workout lists or unrelated app areas during an active session.
- Don't silently record a session that lasted only seconds.
- Don't use Activity rings for anything but their documented purpose.
</anti_patterns>
</topic>

<decision_guide>
"I need to tell the person ..." → mechanism:
| Need | Mechanism |
|---|---|
| Current status they may check when curious (last sync, unread count) | Inline status text or badge near the item; passive, no interruption |
| Something is loading, duration known | Determinate progress indicator; placeholders visible, other actions available |
| Something is loading, duration unknown | Indeterminate progress indicator plus placeholders; on watchOS avoid spinners and promise a notification |
| Loading takes more than a moment or two in a game | Custom loading view with tips or hints, timed to the real remaining duration |
| Video needs more than two seconds to buffer (TV app flow) | Black screen with a centered activity spinner, nothing else |
| A value is changing or a control is being adjusted | Selection haptic (iOS) or Click / Digital Crown detents (watchOS); automatic with system controls |
| A discrete physical moment (snap into place, collision) | Impact haptic matched to the animation's intensity and sharpness |
| An action succeeded or failed | Notification haptic (iOS); Success / Failure / Retry (watchOS); visual confirmation only if significant (Apple Pay) |
| An activity started or stopped (timer, workout) | Start / Stop haptic (watchOS) plus a clear visual state change |
| A value crossed a threshold | Up / Down haptic (watchOS) |
| A command can't be carried out | Inline explanation of why, in context |
| Unexpected, irreversible data loss is about to happen | Alert; never for expected deletions |
| Critical, actionable information while the app is in use | Alert, kept rare so it retains impact |
| Something happened while the app isn't in use | Notification at an honest level: Passive (leisure), Active (default), Time Sensitive (now or within an hour, directly impacts them), Critical (health/safety, entitlement) |
| A call or message arrived | Communication notification via SiriKit intents |
| A promotion or offer | Only after explicit opt in, never Time Sensitive, changeable in in-app settings |
| Collaborators changed shared content or mentioned someone | Collaboration event in Messages (Shared with You) with a universal link |
Pair every channel with another (text + color, haptic + visual, sound + visual) so silenced devices, VoiceOver, and averted eyes still receive it.

"Media of type X" → playback pattern:
| Media | Pattern |
|---|---|
| Nonessential game soundtrack or effects | Solo ambient (silences others) or Ambient (mixes); both obey the silence switch and stop in the background |
| Essential audio people keep listening to (audiobook, lessons, music) | Playback category; ignores the silence switch, plays in the background; `MPVolumeView` for volume and routes; honor remote controls; check `shouldResume` after interruptions |
| Recording (notes, voice) | Record category; switch to Playback for playback; decide whether calls may interrupt |
| Calls or audio messaging | Play and record; end the call on Smart Folio close, never auto-restart the mic |
| Short UI sounds or vibrations (iOS, iPadOS) | System sound services |
| watchOS audio | Foreground clips or background audio; 64 kbps HE-AAC; consider the system Now Playing view |
| Standard 2D video in an app | System player at original aspect ratio; aspect-fill for 2:1 to 2.40:1, fit-to-screen otherwise; PiP where available; Space plays or pauses |
| Video launched from the TV app | Black screen, immediate playback at the previous end time, no prompts, exit to a detail view with resume |
| tvOS playback options | Transport control for playback actions, content tab for information; pause at least 0.5 s before an interactive overlay |
| visionOS inline video | `AVPlayerViewController` in a small resizable window, never expanded to fill it |
| visionOS immersive video | System-placed player, transport ornament unobstructed, never auto-started; 160 px thumbnails for scrubbing |
| visionOS splash, transition, or surface video | RealityKit video player (no controls) |
| watchOS video | Inline movie element or separate interface; 30 s max; 208x260 or 320x180 px H.264 at 160 kbps; content-representative poster |
| Live TV and channels | Live content in the first tab, one-tap Watch Now, live badges, content footer and EPG with matching categories, PiP while browsing, cloud DVR from the info panel |
| A shared real-time activity | SharePlay; document collaboration uses the share sheet plus the Collaboration button |
</decision_guide>

<quick_checklist>
- [ ] Is every piece of feedback delivered through more than one channel (text or color, sound, haptic)?
- [ ] Is passive status shown inline near its subject rather than as an alert?
- [ ] Are alerts reserved for critical, actionable information and unexpected irreversible data loss?
- [ ] Does something appear immediately during loading, and can people keep working while it loads?
- [ ] Is the progress indicator determinate when duration is known, and avoided (or replaced by a notification promise) on watchOS?
- [ ] Is each notification's interruption level honest, with Time Sensitive limited to events within an hour and marketing opted in and never Time Sensitive?
- [ ] Does the app offer an in-app notification settings screen?
- [ ] Does the audio session category match the sound's role (silence switch for nonessential sound, mixing when appropriate, background only when essential)?
- [ ] Does audio reroute to headphones without interruption, pause on disconnect, use `MPVolumeView`, and leave system volume alone?
- [ ] Do audio controls keep their standard meaning and act only when the app is in an audio context?
- [ ] Is video shown at its original aspect ratio without embedded padding, using the system player and PiP where available?
- [ ] From the TV app, does playback start immediately after a black screen, resume without prompts, and exit to a detail view?
- [ ] Do haptics use documented system meanings, stay short and consistent, sync with visuals and sound, and have an off switch?
- [ ] Are the Share and Collaboration buttons adjacent in a toolbar, with succinct permission summaries and minimal custom options?
- [ ] Live-viewing or workout: is live content first-tab and badged with audio stopping off the live tab; are workout controls, metrics, and media on separate screens with a distinct active state and an end summary?
</quick_checklist>
