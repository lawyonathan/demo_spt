<overview>
Distills HIG `privacy` (2023-06-21, consolidated and updated for visionOS). Covers App Store privacy details, data minimization and transparency, what requires permission and when to ask, purpose string wording, pre-alert screens, tracking requests and App Review prohibitions, the location button, protecting data (passkeys, two-factor, biometrics, keychain), and macOS and visionOS considerations. Load when designing any flow that asks for personal data or a protected resource, writing a usage description string, building onboarding or sign-in, or handling location, camera, microphone, tracking, or ARKit data.
</overview>

<topic name="Privacy fundamentals" source="https://developer.apple.com/design/human-interface-guidelines/privacy" updated="2023-06-21">
Be transparent about the data and resources the app requires and protect what people share. On submission, declare privacy practices and collected data so the App Store product page shows them (manageable in App Store Connect); people read them before downloading.

<best_practices>
- **Request access only to data you actually need.** Asking for more than a feature needs, or before people show interest in the feature, erodes trust; make each request as specific as possible.
- **Be transparent about how the app collects and uses data.** Always respect choices to use Hide My Email and Mail Privacy Protection, and know your app-tracking obligations.
- **Process data on the device where possible.** In iOS, the Apple Neural Engine and custom CreateML models avoid risky round trips to a server.
- **Adopt system-defined privacy protections and security best practices.** In iOS 15 and later, CloudKit provides encryption and key management for strings, numbers, and dates.
</best_practices>
</topic>

<topic name="Requesting permission" source="https://developer.apple.com/design/human-interface-guidelines/privacy" updated="2023-06-21">
The system's standard alert shows the app's purpose string; people can reread it and change their choice in Settings > Privacy. Permission is required for personal data (location, health, financial, contact, other personally identifying information); user-generated content (emails, messages, calendar data, contacts, gameplay information, Apple Music activity, HomeKit data, audio, video, and photo content); protected resources (Bluetooth peripherals, home automation, Wi-Fi connections, local networks); camera and microphone; ARKit data in a visionOS Full Space (hand tracking, plane estimation, image anchoring, world tracking); and the advertising identifier used for app tracking.

<best_practices>
- **Request permission only when the app clearly needs access.** Ideally wait until people use the feature that needs it; the location button lets them share after showing interest.
- **Avoid requesting permission at launch unless the app can't function without it.** Obvious needs are tolerated: a navigation app needs location; a visionOS game bouncing objects off walls needs the surroundings.
- **Write copy that clearly describes how the app uses the ability, data, or resource.** The purpose string (usage description string) appears after the app name and before the grant and deny buttons: one brief, complete, specific, easy sentence in sentence case, active voice, ending with a period.
- **Pre-alert screens: include only one button and make it clear that it opens the system alert.** For custom screens before camera, microphone, location, contact, calendar, and tracking alerts, title the button "Continue" or "Next", never "Allow" or anything resembling the alert's allow button in meaning or visual weight; a button that doesn't open the alert diverts people from making their choice.
- **Don't include additional actions in the pre-alert screen.** No close, cancel, or other way to leave without viewing the system alert.
- **Show the system tracking alert before collecting any tracking data.** A custom screen describing tracking's benefits can precede it, but tracking from launch means the alert comes first.
- **Never precede the tracking alert with a custom screen that could confuse or mislead.** Screens that exploit quick, unread dismissal are rejected by App Store review (App Review Guidelines 5.1.1 (iv)). Prohibited: incentives (no compensation, no withholding functionality or content, no unusable app until tracking is allowed); imitation requests (mirroring the alert, "Allow" or similar button titles); showing a modified image of the alert; annotating the screen to draw attention to the alert's Allow buttons.
</best_practices>

<specs>
| Verdict | Purpose string | Why |
|---|---|---|
| Good | The app records during the night to detect snoring sounds. | Active sentence that clearly describes how and why the app collects the data. |
| Bad | Microphone access is needed for a better experience. | Passive sentence with a vague, undefined justification. |
| Bad | Turn on microphone access. | Imperative sentence with no justification. |
</specs>

<anti_patterns>
- Don't ask for data a feature doesn't need, or before people show interest.
- Don't request at launch unless the app can't function otherwise.
- Don't write passive, vague, or imperative purpose strings.
- Don't title a pre-alert button "Allow", give it the alert's weight, or add cancel, close, or other actions.
- Don't collect tracking data before the system alert; don't incentivize, gate features, imitate, picture, or annotate the alert.
</anti_patterns>
</topic>

<topic name="Location button" source="https://developer.apple.com/design/human-interface-guidelines/privacy" updated="2023-06-21">
In iOS, iPadOS, and watchOS, Core Location's button (`LocationButton` in SwiftUI, `CLLocationButton`) grants temporary, one-time location authorization at the moment a task needs it; it can match the app's UI while always signaling location sharing recognizably. The first tap shows a standard alert explaining how the button limits access and reminding people of the location indicator; afterward each tap grants one-time permission that expires when people stop using the app, with no reconfirmation. With no authorization status a tap equals _Allow Once_; if people previously chose _While Using the App_, a tap doesn't change that status.

<when_to_use>
- Use for lightweight, feature-specific sharing: attaching location to a message or post, finding a store, or identifying a building, plant, or animal nearby.
- Use when people often grant _Allow Once_, so they avoid repeated alerts.
</when_to_use>

<best_practices>
- **Customize only the permitted attributes.** A system-provided title ("Current Location" or "Share My Current Location"), the filled or outlined glyph, background and title/glyph colors, and corner radius; everything else is fixed for recognition and trust.
- **Keep it legible.** Fix the system's warnings about low contrast or too much translucency, and make text fit without truncation at all accessibility text sizes and in every language.
- **Treat consistent warnings as blocking.** If problems persist, the system won't provide the location on tap; the button can do other things, but people lose trust when it doesn't work as expected.
</best_practices>
</topic>

<topic name="Protecting data" source="https://developer.apple.com/design/human-interface-guidelines/privacy" updated="2023-06-21">
Use system security technologies whenever the app stores information locally, authorizes people for specific operations, or transports information across a network.

<best_practices>
- **Avoid relying solely on passwords.** Replace them with passkeys where possible; otherwise require two-factor authentication (iCloud Keychain verification codes), and protect logged-in apps with Face ID, Optic ID, or Touch ID via Local Authentication.
- **Store sensitive information in a keychain.** Keychain services give a secure, predictable experience.
- **Never store passwords or other secure content in plain-text files,** even with file permissions.
- **Avoid inventing custom authentication schemes.** Prefer passkeys, Sign in with Apple, or Password AutoFill (see Managing accounts).
</best_practices>

<platform_considerations>
- **macOS:** Sign with a valid Developer ID when distributing outside the store. Protect data with App Sandbox (required for the Mac App Store). Avoid assuming who is signed in; fast user switching means several people may be active.
- **visionOS:** ARKit algorithms (persistence, world mapping, segmentation, matting, environment lighting) always run and benefit apps in the Shared Space, but ARKit sends no data there; ARKit APIs need a Full Space, and Plane Estimation, Scene Reconstruction, Image Anchoring, and Hand Tracking each require permission. Input is private by design: hover effects on interactive SwiftUI and RealityKit components give feedback without exposing where people look before they tap. The back camera returns blank input (compatibility only); the front camera feeds spatial Personas only after permission. When bringing an iOS or iPadOS app with a camera feature, remove it or replace it with content import.
</platform_considerations>

<anti_patterns>
- Don't rely on passwords alone or store secrets in plain text; don't invent authentication schemes.
- macOS: don't ship unsigned outside the store, skip App Sandbox, or assume a single signed-in person.
- visionOS: don't expect ARKit data in the Shared Space or port camera-capture features.
</anti_patterns>
</topic>

<decision_guide>
- Feature needs data or a protected resource: ask when the person uses that feature, at the narrowest scope, with an active, specific purpose string ending in a period.
- App can't function without it (navigation and location, spatial game and surroundings): a launch-time request is acceptable.
- Context doesn't explain the request: one pre-alert screen with a single "Continue" or "Next" button and nothing else.
- Location needed momentarily, or people usually choose _Allow Once_: the location button with a system title and legible, untruncated text.
- App tracks people: the App Tracking Transparency alert before any tracking; an optional benefits screen must not incentivize, gate, imitate, picture, or annotate the alert.
- Authentication: passkeys first, then Sign in with Apple or Password AutoFill; passwords only with two-factor; biometrics for logged-in sessions; secrets in the keychain.
- Processing: keep it on device (Neural Engine, CreateML); use CloudKit encryption when syncing.
- visionOS surroundings data: open a Full Space and request each ARKit feature; never depend on the cameras.
</decision_guide>

<quick_checklist>
- [ ] Each request covers only what the feature needs, and only once the person uses that feature (unless the app can't function without it)?
- [ ] Each purpose string is a brief, specific, active, sentence-case sentence ending with a period?
- [ ] Any pre-alert screen has exactly one "Continue" or "Next" button that opens the system alert, with no cancel or close?
- [ ] Tracking shows the system alert before any data is collected, with no incentives, gating, imitation, alert images, or annotations?
- [ ] The location button uses only system titles and permitted customizations, with legible contrast and untruncated text at every accessibility size and language?
- [ ] Hide My Email and Mail Privacy Protection choices are respected?
- [ ] Processing stays on device where possible, with system protections like CloudKit encryption?
- [ ] Passkeys, Sign in with Apple, or Password AutoFill replace custom schemes, with two-factor for remaining passwords?
- [ ] Secrets live in the keychain, never in plain-text files?
- [ ] App Store privacy details match what the app actually collects?
- [ ] macOS: Developer ID signed, sandboxed, no assumptions about who is signed in?
- [ ] visionOS: ARKit only in a Full Space with per-feature permission, and no camera-capture features?
</quick_checklist>
