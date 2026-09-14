<overview>
Distills the HIG "Technologies" group except VoiceOver (see accessibility.md): airplay, always-on, app-clips, apple-pay, augmented-reality, carekit, carplay, game-center, generative-ai, healthkit, homekit, icloud, id-verifier, imessage-apps-and-stickers, in-app-purchase, live-photos, mac-catalyst, machine-learning, maps, nfc, photo-editing, researchkit, shareplay, shazamkit, sign-in-with-apple, siri, tap-to-pay-on-iphone, wallet.
Focus is design guidance, not API steps: when to offer a system feature, where its UI belongs, mandatory button and mark rules, wording and trademark rules, flows, privacy, and what to avoid.
Load this file when a UI touches payments, sign-in, passes, shared sessions, system intelligence (Siri, machine learning, generative AI), games, health, home, cars, maps, AR, media streaming, Messages, or App Clips.
Pages revised in 2025-2026 (Apple Pay, Generative AI, Machine learning, Siri AI, SharePlay, Wallet for iOS 27 and Pass Designer, demo App Clips, Game Center challenges and activities, iCloud GameSave) carry inline (2025) or (2026) markers.
</overview>

<topic name="AirPlay" source="https://developer.apple.com/design/human-interface-guidelines/airplay" updated="2023-05-02">
AirPlay streams media from iOS, iPadOS, macOS, and tvOS devices to Apple TV, HomePod, and compatible TVs and speakers. Prefer the system player; use the AirPlay name and icon only as noninteractive nouns.

<best_practices>
- **Prefer the system-provided media player.** `AVPlayerViewController` gives chapter navigation, subtitles, closed captioning, and AirPlay; go custom only when it can't meet the app's needs.
- **Provide the highest possible resolution.** The HLS playlist must include the full resolution range; 720p that looks fine on iPhone looks poor on a 4K TV.
- **Stream only what people expect.** No background loops or in-app-only clips (`usesExternalPlaybackWhileExternalScreenIsActive`).
- **Support both streaming and mirroring, and remote control events** (play, pause, fast-forward from the Lock Screen, Siri, HomePod).
- **Don't stop playback when the app backgrounds or the device locks**, and never auto-mirror then.
- **Don't interrupt another app's playback unless starting immersive content.** Launch and inline autoplay videos play locally only (`ambient` category).
- **Keep the app usable during playback**; navigating away must not start other videos.
- **Custom players match system controls:** distinct starting, playing, and unavailable states; only Apple-provided symbols; AirPlay icon in the lower-right corner (iOS 16, iPadOS 16 and later).
- **Icon:** black on light, white on dark, or a custom color when other technology icons share it; same shapes as other technology icons; name below or beside in the layout font only when other technologies are shown that way; keep AirPlay less prominent than the app's identity.
- **Write AirPlay as one word, capital A and P, always a noun** ("Use AirPlay to listen on your speaker", "compatible with AirPlay", "Compatible with Apple AirPlay", "now supports AirPlay"); all-caps only in all-caps layouts.
</best_practices>

<platform_considerations>
- **watchOS:** not supported.
</platform_considerations>

<anti_patterns>
- Don't use the AirPlay icon or name in buttons or interactive elements, within text, or in place of the name.
- Don't write "AirPlay to your speaker", "You can AirPlay with [App]", "AirPlay-enabled speaker", or "[App] has AirPlay".
</anti_patterns>
</topic>

<topic name="Always On" source="https://developer.apple.com/design/human-interface-guidelines/always-on" updated="2023-09-12">
On Always On displays the system keeps showing an app's interface, dimmed with minimal motion, after people stop interacting. Design a glanceable, private, low-power state.

<best_practices>
- **Hide sensitive information** such as bank balances, health data, and personal notification content.
- **Keep useful personal information glanceable** (workout pace and heart rate on Apple Watch, flight or ride arrival on iPhone); people can turn Always On off.
- **Keep important content legible and dim the rest:** more dimming on secondary text, images, and fills; drop row backgrounds, rich images, and large color areas.
- **Maintain a consistent layout.** Transition interactive components to an unavailable appearance instead of removing them; make infrequent, subtle updates (score only, not play-by-play). Motion is especially distracting on an iPhone lying face up.
- **Transition motion gracefully to rest; don't stop it instantly.**
</best_practices>

<platform_considerations>
- **iOS:** iPhone 14 Pro and Pro Max show Lock Screen widgets and Live Activities when set face up and idle; notifications still appear; a tap exits.
- **watchOS:** on wrist-down the watch face dims and the app stays visible while frontmost or in a background session.
- **iPadOS, macOS, tvOS, visionOS:** not supported.
</platform_considerations>

<anti_patterns>
- Avoid distracting changes when Always On begins or ends, and frequent updates during it.
</anti_patterns>
</topic>

<topic name="App Clips" source="https://developer.apple.com/design/human-interface-guidelines/app-clips" updated="2025-06-09">
An App Clip is a lightweight version of an app or game for an on-the-go task or a demo (2025), launched instantly without an App Store download and kept on the device only temporarily. Keep it small, linear, native, and privacy-preserving.

<when_to_use>
- In-the-moment finite tasks: rent a bike from an App Clip Code, order coffee from a Smart App Banner or App Clip card, pay a restaurant bill from Maps or Siri Suggestions, museum AR or audio from a label.
- Demos (2025): a game tutorial plus first level, a free workout, creating and saving a document.
- Launch sources: App Clip Code (best; recognizable and trusted), NFC tag, QR code, Siri Suggestions, Maps, Smart App Banners, Safari App Clip cards, Messages links, and (iOS 17 and later) links and previews inside other apps.
- Offer a website link instead when only web components are available.
</when_to_use>

<best_practices>
- **Let people complete the task or demo in the App Clip**; never require the full app to finish a task, demo, or level.
- **Focus on essentials with a linear, focused UI:** no tab bars, complex navigation, or settings; minimal screens and forms; skip straight to the relevant part on launch.
- **Launch instantly:** include all assets, omit splash screens, keep it small, avoid extra downloads.
- **Make it shareable** with links to specific points; recipients launch from Messages.
- **Make paying easy with Apple Pay; avoid requiring an account first**, and if one is needed, ask after the task and offer Sign in with Apple.
- **Give a familiar experience in the full app**, which replaces the App Clip and its invocations; don't force a new login.
- **Store minimal data, securely off the device.** App Clips can't run in the background and the system may delete them and their data between launches.
- **Recommend the app politely at natural pauses** with an `SKOverlay`; the App Clip card and the first-launch app banner already link to the App Store; let demo users finish first.
- **Notifications:** allowed for up to 8 hours after launch; request extended permission only when the task spans more than a day (car-rental return); task-related and in response to explicit actions only, never promotional.
- **Platform providers serving businesses:** tone down your own brand so the business's brand leads; support switching between recent businesses or locations and verify location at launch.
- **App Clip card:** informative photography or graphics, not UI screenshots or text; 1800x1200 px PNG or JPEG, no transparency; title 30 characters max, subtitle 56 max; verb View (media, informational, educational), Play (games), Open (else).
- **App Clip Codes:** use only Apple-generated designs (App Store Connect or the App Clip Code Generator); badge with the App Clip logo when clear space allows; the logo-free design when space is tight, on disposable paper or plastic, or on gambling or drinking items (playing cards, poker chips, coasters); never the logo alone.
- **Variant by access:** NFC-integrated (iPhone glyph) where reachable (tabletops, registers, storefront windows, signage, gift cards); scan-only (camera glyph) for unreachable or digital placement (posters, behind counters, screens, email, social).
- **Placement and size:** flat or cylindrical surfaces only; rigid backing on flexible objects; good light; upright, unobstructed, never animated, dimmed, rotated, or overlaid; at least as large as adjacent QR codes; clear space equal to the gap between the center glyph and the circle (see specs for ratios).
- **Messaging:** "Scan to [do X]", "Scan using the camera on your iPhone or iPad to [do X]", or for NFC "Hold your iPhone near the [object] to launch an App Clip that [does X]"; title case for App Clip and App Clip Code; trademarks stay in English.
- **Colors:** foreground, background, and a generated third color; the tools reject low-contrast pairs.
- **Printing:** matte, non-textured, UV-resistant outdoors; no gloss, holographic, or thin laminate finishes; 600 ppi raster, 300 dpi print minimum; sRGB to CMYK with relative colorimetric intent (Generic CMYK or Gracol 2013 ICC, Delta E 2.5); grayscale codes for grayscale printers; Type 5 NFC tags at least 35 mm; verify with Apple's calibration test sheets and test batches with the URL and filename printed beside each code.
- **Legal:** stop showing a code when its App Clip is inactive; never use the code, Apple logo, or App Clip mark in company or product names; no added symbols, trademark registration, or translated trademarks.
</best_practices>

<specs>
| Item | Requirement |
|---|---|
| Card image | 1800x1200 px PNG or JPEG, no transparency, no text |
| Card title / subtitle | 30 / 56 characters max |
| Printed code | 3/4 in (1.9 cm) minimum diameter |
| Digital code | 256x256 px minimum, PNG or SVG |
| NFC code | tag at least 35 mm; a 35 mm tag needs a code at least 1.37 in (3.48 cm) |
| Distance to size | 20:1 max, 10:1 preferred (40 in / 101 cm away needs at least 4 in / 10.16 cm); cylinder width at most 1/6 of circumference |
| Notifications | up to 8 hours after launch |
</specs>

<anti_patterns>
- Don't use App Clips solely for marketing or show ads; avoid web views.
- Don't ask people to install the app repeatedly, mid-task, or by push notification.
- Don't rely on data stored between launches.
- Don't design your own code, alter a generated one (filters, colors, glows, shadows, gradients, reflections), or change its aspect ratio or stroke widths when scaling.
- Don't print on deformable or glossy materials.
</anti_patterns>
</topic>

<topic name="Apple Pay" source="https://developer.apple.com/design/human-interface-guidelines/apple-pay" updated="2026-06-08">
Apple Pay pays for physical goods, services, donations, and subscriptions in apps and browsers via a system payment sheet authorized with Face ID, Touch ID, Optic ID, or a double-click on Apple Watch (2026 appearance and capability refresh). Use In-app purchase for virtual goods and digital subscriptions.

<when_to_use>
- Apple Pay: groceries, clothing, appliances, memberships, hotel reservations, event tickets, donations (approved nonprofits only). In-app purchase: premium content, digital goods, digital-content subscriptions.
- Supported on iOS, iPadOS, macOS, visionOS, watchOS, and web browsers (2025), where people can also pay with a nearby iPhone or Apple Watch or by scanning a code; not tvOS.
</when_to_use>

<best_practices>
- **Offer Apple Pay wherever supported and never where it isn't** (`PKPaymentAuthorizationController`, `applePayCapabilities`).
- **Make Apple Pay the primary, pre-selected (not necessarily sole) option when the APIs report an active card**; never a separate step or flow.
- **Use Apple Pay buttons only to pay or, when appropriate, to set up Apple Pay.**
- **A custom payment button must not show "Apple Pay" or the logo**, and the same page must show the Apple Pay mark or mention Apple Pay in text. The mark only says you accept Apple Pay; it is never a button.
- **Never hide or disable the button.** If a size or color is missing, explain after the tap.
- **Websites:** declare Apple Pay in semantic markup; include a privacy statement and follow the acceptable use guidelines.
- **Cohesive checkout:** your branding throughout; no new pages or windows.
- **Assume people want Apple Pay:** first, larger, or separated by a line; buttons on product detail pages for single items (exclude cart contents, remove the item from the cart after); express checkout for whole carts with one shipping method and destination.
- **Support coupon and promo codes on the sheet** (essential for express checkout) and show an active code there.
- **Collect required options, optional data (gift messages, delivery instructions), and multiple shipping methods or destinations before the sheet**; highlight and auto-navigate to missing fields. For pickup, choose the location first, show its address read-only, and consider a pickup window (`PKDateComponentsRange`).
- **Prefer checkout information from Apple Pay** over stored data; **defer account creation** to the confirmation page, prepopulated.
- **Report results in the sheet**, then show an order confirmation with shipping timing and status ("1234 (Apple Pay)" or "Paid with Apple Pay" if mentioned).
- **Request only essential information** (no shipping address for an e-gift card); let people pick a shipping method with description, cost, and optional date range using calendar and time-zone support.
- **Line items** explain extra charges, discounts, pending costs, add-on donations, recurring and future payments (label, cost, optional frequency), one line each; never an itemized product list.
- **Total line reads "Pay [Business_Name]"** as on card statements; intermediaries use "Pay [End_Merchant (via Your_Business)]".
- **Disclose post-authorization costs** (ride distance, later tips) with an Amount Pending subtotal where regulations allow; reflect preauthorizations accurately.
- **Defer to the sheet for progress**; no extra spinners.
- **Errors:** only card type and a redacted address are available before authorization, so validate what you can and always report post-authorization failures; noun phrases, sentence case, no end punctuation, 128 characters or fewer ("Zip code doesn't match city", "Shipping not available for this state"); correct `PKPaymentError` codes; ignore Zip+4 extras and accept varied phone formats.
- **Handle interruptions:** cancel in-progress payments on cancellation or timeout; people re-tap to restart.
- **Subscriptions:** clarify frequency and terms before the sheet; line items for frequency, discounts, upfront fees, trial amount (including $0), post-trial price and start date; total shows the amount billed now; disclose when billing starts if nothing is due; re-authorize only when a change adds fees; keep the billing agreement field a concise summary or blank.
- **Donations:** a "Donation $50.00" line item; presets like $25, $50, $100 plus Other Amount.
- **Always use the button APIs** (`PKPaymentButtonType`, `PKPaymentButtonStyle`, `WKInterfacePaymentButton`, Apple Pay on the Web) for approved captions, scaling, localization, corner radius, and VoiceOver. Types: plain Apple Pay (smallest width, no call to action; the automatic fallback when a translated title doesn't fit or the OS lacks the type), Buy, Pay (bills), Check Out, Continue, Book, Donate (approved nonprofits), Subscribe, Reload, Add Money, Top Up, Order, Rent, Support, Contribute, Tip, and Set Up Apple Pay (Settings, profile, or interstitial; no fallback). Some contexts show the default card on the button.
- **Styles:** automatic, or Black (light backgrounds with contrast; never dark), White with outline (light backgrounds lacking contrast; never dark or saturated), White (dark backgrounds).
- **Size and position:** no smaller than other payment buttons; no scrolling to reach it; right of Add to Cart side by side, above it stacked; corner radius square to capsule; respect minimums because titles vary by locale.
- **Mark:** Apple artwork only, altering only height, which must equal or exceed other payment marks; clear space 1/10 of height; never sharing a border with another graphic or button.
- **Website icon:** 60x60 pt (120x120 px @2x, 180x180 px @3x) for Handoff authorization and Wallet subscriptions.
- **Wording:** two words, capital A and P, never plural, possessive, or translated; ® on first body-text mention in the US, not in checkout; your own font; all-caps only in all-caps styles; text-only "Apple Pay" in a selector only when every option is text-only, otherwise the mark.
</best_practices>

<specs>
| Button | Min width | Min height | Min margins |
|---|---|---|---|
| Apple Pay (plain) | 100 pt (100 px @1x, 200 px @2x) | 30 pt (30 px @1x, 60 px @2x) | 1/10 of height |
| Book, Buy, Check Out, Donate, Set Up, Subscribe | 140 pt (140 px @1x, 280 px @2x) | 30 pt | 1/10 of height |
</specs>

<anti_patterns>
- Don't separate Apple Pay into its own step, hide or dim the button, or use it for anything but payment or setup.
- Don't use the mark as a button, change its width, radius, or aspect ratio, add ™, remove the border, add effects, or flip, rotate, or animate it.
- Don't open new windows in checkout, itemize products as line items, or add spinners over the sheet.
- Don't write "ApplePay", use the Apple logo for the word Apple, or "APPLE PAY" outside all-caps layouts.
</anti_patterns>
</topic>
<topic name="Augmented reality" source="https://developer.apple.com/design/human-interface-guidelines/augmented-reality" updated="undated">
ARKit superimposes 3D virtual objects on the live camera view. Offer AR only on capable devices and design for immersion, comfort, and safety (guidance targets iOS and iPadOS).

<when_to_use>
- AR-first apps run only on ARKit-capable devices; optional AR features simply don't appear on unsupported devices, with no error.
- Prefer direct manipulation; use indirect 2D screen-space controls when people are moving or need persistent controls.
</when_to_use>

<best_practices>
- **Use the entire display**; don't clutter the camera view with controls.
- **Make illusions convincing:** lifelike textures, correct scale on detected surfaces, environmental lighting, camera grain, top-down diffuse shadows, 60 updates per second; prefer small or coarse reflective surfaces because reflections are approximations.
- **Use audio and haptics** to confirm contact; minimize text; put needed information and controls in fixed screen space, translucent, reachable without changing grip (like Measure).
- **State environment needs up front** (space, flat surfaces) and consider feature sets per environment.
- **Protect comfort and safety:** objects at distances that limit device movement, short game levels with downtime, gradual motion, no rapid, sweeping, or expansive movements.
- **Use the coaching view** (`ARCoachingOverlayView`) for initialization and relocalization, hiding unrelated UI; base custom coaching on it.
- **Placement:** show when a surface is found with an indicator aligned to the plane; place instantly and refine subtly later (`ARTrackedRaycast` nudges objects back onto the surface); guide to offscreen objects with edge indicators or sound; use plane classification (floor, table).
- **Interaction:** single-finger drag to move, two-finger rotation to spin; limit movement to the surface and rotation to one axis; accept gestures near small or distant objects; test pinch vs. rotate conflicts; allow scaling only when it fits (not furniture shopping) and never to fake distance; keep motion visible and surface-attached; explore motion and proximity triggers.
- **Multiuser:** maps merge automatically; consider people occlusion; let newcomers join via implicit map merging.
- **Image and object detection:** delay removal up to one second after an image disappears; keep 100 or fewer active reference images, swapping sets by context; track only images that move or carry small attachments.
- **Wording:** "Unable to find a surface. Try moving to the side or repositioning your phone." not "Unable to find a plane. Adjust tracking."; "Tap a location to place the [object]." not "Tap a plane to anchor an object."; "Try turning on more lights and moving around." not "Insufficient features."; "Try moving your phone more slowly." not "Excessive motion detected."
- **Prefer 3D hints in 3D**; 2D text overlays only when people don't respond; critical text in screen space; 3D text faces people at one size regardless of distance; add an affordance for more information.
- **Interruptions:** coach people back to the prior pose, consider hiding placed objects until relocalized, embed non-AR tasks inside AR, always allow cancel or reset (relocalization can run forever); indicate lost face tracking after about half a second with minimal text.
- **Recovery:** let people reset; suggest fixes (more light and movement; move slower; textured surface).
- **AR glyph:** only to launch ARKit experiences; change only size and color; 10% of height clear space. **AR badges:** only to mark AR-viewable items in mixed collections; prefer the full badge, glyph-only in tight spaces; same corner every time; 10% clear space; never altered.
</best_practices>

<platform_considerations>
- **visionOS:** with permission, ARKit detects surfaces, provides hand and finger positions for custom gestures, and brings nearby objects into immersive experiences.
- **macOS, tvOS, watchOS:** not supported.
</platform_considerations>

<anti_patterns>
- Don't show errors on unsupported devices, align objects to surface edges, scale to adjust distance, or use terms like ARKit, world detection, tracking, plane, anchor.
- Don't force people to wait without a reset; don't alter glyph or badges or use them for non-ARKit experiences; don't badge when everything supports AR.
</anti_patterns>
</topic>

<topic name="CareKit" source="https://developer.apple.com/design/human-interface-guidelines/carekit" updated="2023-05-02">
CareKit apps manage care plans with CareKit UI views (tasks, charts, contacts) and CareKit Store data. Guard extremely sensitive data, use each view style as intended, and keep branding quiet.

<best_practices>
- **Provide a privacy policy URL**; get permission before any device data and protect it all.
- **HealthKit:** request only when needed and in context, every time; add descriptive text to the standard permission screen; manage sharing only in Settings > Privacy.
- **Motion data** (activity type, steps, pace, flights) and **photos** (injury progress) only with permission and when useful for treatment; **ResearchKit** for surveys, tasks, charts, and informed consent.
- **Views:** Tasks (medication, therapy, symptom logging), Charts (progress), Contacts (phone, message, email, map). Each has a header (text, symbol, disclosure indicator, separator) and optional content stack; CareKit handles constraints.
- **Task fields:** Title and Schedule required ("Ibuprofen", "Four times a day"); Instructions and Group ID optional.
- **Task styles:** simple (one step; title, subtitle, button; checkmark or custom image; no stack), instructions (adds text like "Take on an empty stomach"), log (timestamped events), checklist (multistep with per-item buttons), grid (compact buttons; exposes its collection view for custom UI).
- **Use color to reinforce meaning, never alone**; use marketing names, drop repeated words like "take", add videos or images for complex tasks.
- **Charts (bar, scatter, line):** show trends; short labels ("BPM" on the axis); distinct, contrasting colors, not shades of one; a legend if needed; explicit time units; consolidate big data sets; offset small values.
- **Contacts (simple, detailed):** color can categorize team members.
- **Notifications:** minimal, coalesced; consider a detail view to complete tasks in place.
- **Symbols:** CareKit's defaults; SF Symbols for custom grid items (pill, walking person); care-relevant, never decorative or a corporate logo. **Branding:** subtle, via color and tone; no advertising.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** only supported platforms.
</platform_considerations>

<anti_patterns>
- Avoid replicating the permission screen, in-app health data sharing controls, color as the sole signal, or same-hue chart colors.
</anti_patterns>
</topic>

<topic name="CarPlay" source="https://developer.apple.com/design/human-interface-guidelines/carplay" updated="2023-05-02">
CarPlay renders iPhone apps on the car display through system templates (audio, communication, navigation, fueling, and so on); the app supplies content and iOS handles screens, knobs, and touch pads. Design for drivers: fast, minimal interaction.

<best_practices>
- **No iPhone interaction while CarPlay is active**; setup happens before driving; never lock people out because iPhone needs input; work with iPhone locked or in the trunk.
- **Audio:** no autoplay unless the app plays one source or resumes; don't open an audio session until ready (it silences the radio); start as soon as loaded (the system shows a spinner on the selection); show Now Playing immediately and load metadata in the background; resume only after resumable interruptions (a call, not a Siri playlist) and only if audio was playing; adjust relative levels, never overall volume.
- **Layout:** high-value, uncluttered, consistent; primary content large and actionable in the upper half.
- **Color:** limited palette from the logo; never one color for interactive and noninteractive elements; test in a real car (night glare, sunlight washout); support light and dark, which CarPlay may switch automatically; inclusive colors.
- **Artwork:** @2x and @3x, landscape and portrait; mirror the iPhone icon; no black icon background (lighten or add a border).
- **Errors:** only when necessary, in CarPlay, never on iPhone.
</best_practices>

<specs>
| Display (px) | Ratio |
|---|---|
| 800x480 | 5:3 |
| 960x540 | 16:9 |
| 1280x720 | 16:9 |
| 1920x720 | 8:3 |

App icon: 120x120 px @2x, 180x180 px @3x.
</specs>

<platform_considerations>
- **iOS:** only supported platform.
</platform_considerations>

<anti_patterns>
- Don't require iPhone unlocking or input, autoplay, clutter, shared interactive colors, black icon backgrounds, or iPhone-side errors.
</anti_patterns>
</topic>

<topic name="Game Center" source="https://developer.apple.com/design/human-interface-guidelines/game-center" updated="2025-06-09">
Game Center (GameKit) provides progress, friends, achievements, leaderboards, challenges (2025), and multiplayer activities (2025) across the system, the Apple Games app (2025), the App Store, and notifications. Initialize at launch and use the access point in menus.

<best_practices>
- **Check sign-in at launch and initialize the player** for discovery (Top Played, friend recommendations).
- **Access point:** menu or settings screens, fixed in any corner; opens the Game Overlay (2025) in iOS, iPadOS, macOS and the full-screen dashboard in visionOS and tvOS (visionOS placement varies by game type); keep controls clear of its collapsed and expanded forms; consider pausing while it's open.
- **Custom links** may deep-link into leaderboards or the profile; use official artwork unaltered and exact terms: Game Center (not GameKit, GameCenter, game center; system translation), Game Center Profile (not Profile, Account, Player Info), Achievements (not Awards, Trophies, Medals), Leaderboards (not Rankings, Scores, Leaders), Challenges (not Competitions), Add Friends (not Add, Add Profiles, Include Friends).
- **Achievements:** map to locked, in-progress, hidden, completed (grouped as Completed vs. Locked); upload in display order; title and description two lines each, title-style and sentence-style capitalization; progressive achievements get encouraging messages; unique art per achievement, centered for the circular mask.
- **Leaderboards:** classic (all-time best, never ends) or recurring (daily, weekly resets for rotating puzzles, seasonal events, modes); sets grouped by difficulty, activity, or genre; unique image each; tvOS layered images animate on focus; keep key content clear of set and focus cropping.
- **Challenges (2025):** leaderboard-based, time-limited, 1-5 minutes of individually completable skill play; track the most recent score, not progress or personal bests; deep-link to the exact mode or level and run first-timers through onboarding with UI saying the challenge follows; keep art clear of the title and description area; localize text in art.
- **Multiplayer activities (2025):** party codes (alphanumeric, typically eight characters, "2MP4-9CMF"); allow late join, early leave, return; show the code in-game; allow manual entry; support the overlay or dashboard invite UI (nearby, recent, friends, contacts) or custom UI; provide preview art.
</best_practices>

<specs>
| Asset | Format | Size |
|---|---|---|
| Achievement (iOS, iPadOS, macOS, visionOS) | PNG, TIF, JPG; sRGB or P3; 72 DPI min | 512x512 pt (1024 px @2x), mask 512 pt |
| Achievement (tvOS) | same | 320x320 pt (640 px @2x), mask 200 pt |
| Leaderboard (iOS, iPadOS, macOS) | JPEG, JPG, PNG | 512x512 pt (1024 px @2x), crop 512x312 pt (1024x624 px) |
| Leaderboard (tvOS) | PNG, TIF, JPG | 659x371 pt (1318x742 px); focused 618x348 pt; unfocused 548x309 pt |
| Challenge and activity | JPEG, JPG, PNG | 1920x1080 pt (3840x2160 px), crop 1465x767 pt (2930x1534 px) |
| tvOS dashboard image | PNG, TIF, JPG | 600x180 pt (1200x360 px); logo or word mark, not the app icon |
</specs>

<platform_considerations>
- **watchOS:** GameKit APIs but no system Game Center UI; content appears on the paired iPhone.
</platform_considerations>

<anti_patterns>
- Don't show the access point during gameplay, splash screens, cinematics, or tutorials.
- Don't reuse one asset for several achievements, base challenges on progress or personal bests, resize or restyle Game Center art, or use the app icon as the tvOS dashboard image.
</anti_patterns>
</topic>
<topic name="Generative AI" source="https://developer.apple.com/design/human-interface-guidelines/generative-ai" updated="2026-06-08">
Generative AI uses machine learning models to create and transform text, images, and other content. Design responsibly: keep people in control, disclose AI use, protect privacy, minimize hallucinations, and (2026) let people refine results, give feedback during generation, and choose the right model type.

<when_to_use>
- Offer generative features only where they add clear, specific value; when AI is complementary, keep a non-AI fallback (regular emoji beside Genmoji; notifications readable without summaries).
- Model type (2026): on-device keeps data local, is fast, and works offline; server-based suits heavier processing or larger context, always weighed against privacy. Foundation Models needs a compatible device with Apple Intelligence on; device, network, or battery can make model types unavailable.
</when_to_use>

<best_practices>
- **Design responsibly.** Small or repeated inputs yield different outputs and requests can't all be anticipated; aim for inclusive, careful, privacy-protecting experiences.
- **Keep people in control.** Honor in-scope requests, handle sensitive content carefully, let people dismiss, revert, or retry, and identify where AI is used.
- **Be inclusive.** Ask for needed personal details rather than inferring them; avoid assumptions about gender identity or relationship types; test with diverse people.
- **Communicate AI use.** Never pass off AI as human; follow regional disclosure rules.
- **Set expectations:** a brief tutorial, curated suggestions for open-ended prompts, up-front limitations, how to get good results, why poor results happen.
- **Server processing (2026):** process locally as much as possible, minimize what's sent, say that data may go to a server, show what's shared, explain storage and training use.
- **Ask permission for personal and usage data;** use the minimum, offer opt-out, get explicit consent for storage or improvement, vet third parties, remember outputs can leak sensitive data, follow stricter kids-app rules; explain benefits concisely and whether the model trains on data.
- **Evaluate models and datasets early:** general vs. task-specific; diverse, licensed, known-provenance data; time to test for bias and misinformation.
- **Guide inputs** with diverse example prompts.
- **Minimize hallucinations:** state that content may be wrong, scope requests narrowly, request facts only with verified current data, never use AI where a hallucination could harm.
- **Confirm before irreversible or significant actions**; never automate destructive (deleting photos) or hard-to-undo (purchases) tasks; follow model and regulatory policies per locale.
- **Let people refine or revert results and acknowledge it (2026):** Edit, Undo, Retry, Adjust near output, with a clear signal that the change took effect.
- **Coach past blocked or poor results** (Image Playground: "Unable to use that description") with example requests.
- **Test adversarially:** out-of-scope, vague, sensitive, controversial, and harmful requests; set policies and iterate.
- **Avoid copyrighted output:** protected base models, curated or pre-approved prompts, instructions not to mimic styles.
- **Plan for latency:** generative models are slower than real-time models (Vision, ARKit body tracking); design loading or background generation.
- **Give specific progress feedback (2026):** "Finding substitutions for ingredients", not "Processing…"; explain failures plainly with a next step.
- **Offer alternate results** when meaningful (Image Playground's multiple images).
- **Improve continuously:** blocked-word lists outside release cycles; fine-tune, retest, and re-prompt for new base models; test every update.
- **Collect voluntary feedback** via quick thumbs-up and thumbs-down plus a detailed path, placed without interrupting; act on it.
- **Keep the model swappable** from the experience.
</best_practices>

<anti_patterns>
- Never present AI output as human, request unverifiable facts, or use AI where hallucinations could harm.
- Don't automate destructive or hard-to-undo actions, make feedback mandatory, or show vague status text.
</anti_patterns>
</topic>

<topic name="HealthKit" source="https://developer.apple.com/design/human-interface-guidelines/healthkit" updated="undated">
HealthKit is the central store for health and fitness data in iOS, iPadOS, and watchOS. Request access only for real health or fitness features, in context, and use Activity rings and the Apple Health icon exactly as specified.

<best_practices>
- **Don't request health data without health or fitness functionality.** Provide a privacy policy URL and show how data is used.
- **Request in context, every time it's needed** (weight when logging weight, not at launch); add descriptive text to the system permission screen; manage sharing only in Settings > Privacy.
- **Activity rings (`HKActivityRingView`):** only Move, Exercise, Stand progress for one identified person (label, photo, avatar); never other data, decoration, labels, backgrounds, branding, the icon, or marketing; never recolor, filter, or change opacity; scale properly; outer margin at least the gap between rings; enclose in a circle by corner radius, not a mask; separate other ring-like elements with padding, lines, labels, color, or scale; never in notifications, and don't repeat system ring updates.
- **Apple Health icon:** Apple artwork only, with the name Apple Health nearby; no smaller than sibling app icons; never a button; no masks, corner changes, circles, borders, overlays, gradients, shadows; 1/10-height clear space; never composited, within text, or replacing "Health", "Apple Health", or "HealthKit"; never show Health app screenshots.
- **Wording:** "Apple Health" or "the Apple Health app"; never "HealthKit" to people; two capitalized words, all-caps only in all-caps styles; use the system translation of Health.
</best_practices>

<platform_considerations>
- **macOS, tvOS, visionOS:** not supported.
</platform_considerations>

<anti_patterns>
- Don't replicate the permission screen, manage sharing in-app, repurpose or restyle Activity rings, show rings for multiple people, make the Health icon a button, or say HealthKit.
</anti_patterns>
</topic>

<topic name="HomeKit" source="https://developer.apple.com/design/human-interface-guidelines/homekit" updated="2023-05-02">
HomeKit lets people control home accessories with Siri or the Home app. Use HomeKit's object model and vocabulary, the system setup flow, and Home app settings as the source of truth.

<best_practices>
- **Vocabulary:** home (root; people may have several), room (a name only), accessory (device; category is its type, and a switch takes its target's category), service (controllable feature, shown by a descriptive name like "garage door opener", never the word "service"; Siri uses service names), characteristic (attribute like brightness, never the word), service group ("reading lamps"), action (changing a characteristic), scene (group of actions; API says "action set", UI always says "scene"), automation (location, time, accessory, or sensor triggers), zone (multiple rooms, "upstairs").
- **Acknowledge the hierarchy** even if your UI doesn't use rooms and zones, so voice commands work; show room, zone, and home in accessory detail views, not buried settings; never duplicate home setup or settings; defer to the Home app.
- **Use the system setup flow** (`performAccessorySetup`), then a custom post-setup experience for unique features; purpose string like "Lets you control this accessory with the Apple Home app and Siri across your Apple devices."; no required account or personal information (cloud accounts optional, after setup); don't force other platforms into the flow.
- **Names:** suggest Siri-friendly service names, never company names or model numbers; enforce rules on rename (alphanumeric, space, apostrophe; start and end with a letter or number; no emoji: "Reading lamp" and "2nd garage door" pass, "📚 lamp" and "#2 garage door" fail) with brief explanations and alternatives; steer location words ("kitchen light") into room or zone assignment.
- **Siri:** show example phrases with the chosen name after setup; teach complex commands in context ("You can say 'Hey Siri, set Movie Time.'"); suggest zones and service groups ("upstairs", "media center"); offer shortcuts only for what HomeKit can't do ("Order AC filters") and explain the difference; never suggest shortcuts for scenes or actions HomeKit handles.
- **Custom functionality:** be clear about your app vs. the Home app (build a scene with your accessory, then send people to the Home app to add others); reflect HomeKit database changes automatically, show conflicts side by side, ask before writing, never overwrite without explicit direction.
- **Cameras:** don't cover images (alerts may supplement); microphone button only with bidirectional audio.
- **Icons:** Apple's HomeKit and Home app icons only; black, white, or custom color matching other technology icons and their shapes; HomeKit icon noninteractive (the Home app icon may open its App Store page); never in text or replacing the word; name beside or below in the layout font.
- **Wording:** your app more prominent than HomeKit; "HomeKit" and "Apple Home" as written, singular, never possessive or translated; no category descriptors (iPad, not tablet); no implied endorsement; credit lines in legal text; "works with", "use", "supports", "compatible", not "HomeKit lightbulbs" or "HomeKit-enabled"; "unlocked with HomeKit", not "HomeKit unlocked"; "the Apple Home app" first, then "the Home app", never "Open Home".
</best_practices>

<anti_patterns>
- Don't duplicate home settings, require accounts, suggest brand or model service names, offer redundant shortcuts, overwrite the HomeKit database, block camera images, show a dead microphone button, or use the HomeKit icon or name interactively or as a descriptor.
</anti_patterns>
</topic>

<topic name="iCloud" source="https://developer.apple.com/design/human-interface-guidelines/icloud" updated="2025-06-09">
iCloud gives people the latest content on every device without explicit syncing. Make it automatic, respect its cost, and resolve conflicts early.

<best_practices>
- **Work automatically** once iCloud is on; if a choice is warranted, one all-or-nothing option at first launch; never ask which documents to sync.
- **Keep content current** within storage and bandwidth limits; for very large documents let people control downloads, show that a newer version exists, and give subtle feedback after a few seconds.
- **Respect storage:** only content people create, not regenerable resources; be picky about the Documents folder, which backups include.
- **When unavailable** (off, Airplane Mode) don't alert; optionally note quietly that changes won't sync yet.
- **Sync app state** (last page) and only settings people want everywhere.
- **Warn and confirm before deleting**, since deletion hits every device.
- **Resolve conflicts** automatically or with an unobtrusive, early notification that distinguishes versions; **include iCloud content in search**.
- **Games (2025):** save progress with GameSave, which syncs and offers built-in alerts for offline and conflict cases.
</best_practices>

<anti_patterns>
- Don't ask people to manage per-document storage, store regenerable data, alert on unavailability, or delete without confirmation.
</anti_patterns>
</topic>

<topic name="ID Verifier" source="https://developer.apple.com/design/human-interface-guidelines/id-verifier" updated="2023-09-12">
ID Verifier (iOS 17 and later) lets an iPhone app read ISO 18013-5 mobile IDs in person without extra hardware; customers share only the minimum data. Prefer Display Only unless law requires storing data.

<when_to_use>
- Display Only: name or age with the portrait in system UI on the requester's iPhone; nothing reaches your app.
- Data Transfer: only with a legal requirement to store or process address or birth date; needs an extra entitlement.
</when_to_use>

<best_practices>
- **Ask only for needed data:** an age threshold (`ageAtLeast`), not age or birth date.
- **Register with Apple Business Register** if eligible so your organization name and logo appear in the customer's UI.
- **Provide a start button** labeled Verify Age (venue entry) or Verify Identity (rental pickup); no NFC or QR symbols; never the Apple logo.
- **In Display Only, let the operator record the visual match** (Matches Person, Doesn't Match Person) to return approved or rejected.
</best_practices>

<platform_considerations>
- **iOS:** only supported platform.
</platform_considerations>

<anti_patterns>
- Don't request current age or birth date for an age gate; no communication symbols or Apple logo in the button.
</anti_patterns>
</topic>

<topic name="iMessage apps and stickers" source="https://developer.apple.com/design/human-interface-guidelines/imessage-apps-and-stickers" updated="2023-05-02">
iMessage apps share content, collaborate, and play games inside a Messages conversation; sticker packs decorate conversations and Messages and FaceTime effects. One primary experience, essentials in the compact view.

<best_practices>
- **One primary experience per app**; separate apps for separate functions. Surface content from the main app (lists, itineraries) or simple collaborative choices.
- **Essentials in the compact view** under the transcript; more in the expanded view; **text editing only in the expanded view** (the compact view is keyboard-sized).
- **Stickers:** expressive, inclusive, legible on any background and when rotated or scaled; use transparency; a localized alternative description for VoiceOver; one size per pack.
</best_practices>

<specs>
| Icon usage | @2x px | @3x px |
|---|---|---|
| Messages, notifications | 148x110, 143x100, 120x90, 64x48, 54x40 | 180x135, 96x72, 81x60 |
| Settings | 58x58 | 87x87 |
| App Store | 1024x1024 | 1024x1024 |

Square-cornered icons (the system rounds them). Stickers @3x: Small 300x300, Regular 408x408, Large 618x618 px; 500 KB max; PNG (8-bit alpha, static), APNG (8-bit, animated), GIF (single-color alpha, animated), JPEG (no alpha, static).
</specs>

<anti_patterns>
- Don't bundle several experiences, mix sticker sizes, or edit text in the compact view.
</anti_patterns>
</topic>
<topic name="In-app purchase" source="https://developer.apple.com/design/human-interface-guidelines/in-app-purchase" updated="2023-09-12">
In-app purchase sells virtual goods through StoreKit in four types: consumable, non-consumable, auto-renewable subscription, non-renewing subscription. Show total prices, use the system sheets unmodified, and make restore and cancel easy.

<when_to_use>
- In-app purchase for virtual goods and digital subscriptions; Apple Pay for physical goods, services, donations.
- Advanced Commerce API for very large, frequently updated multi-creator catalogs or subscriptions with add-ons sold as one purchase.
- Free access first: freemium, metered paywall, or free trial.
</when_to_use>

<best_practices>
- **Let people experience the app before buying;** integrate the store with the app's style; short product names that don't truncate or wrap.
- **Show the total billing price for every purchase, of every type.**
- **Show the store only when payments are possible** (`canMakePayments`); otherwise hide it or explain (parental restrictions).
- **Use the default confirmation sheet**, never modified or replicated.
- **Family Sharing (up to five additional members):** mention it where content is described ("Family", "Shareable" in names, on sign-up); explain participation; welcome family members ("Your family subscription includes…").
- **Refund help:** a custom help screen (missing purchases, FAQs, contact) linking to the system flow (`beginRefundRequest`); action titled "Refund" or "Request a Refund"; each recent purchase with image, name, description, date; alternatives (fulfillment, a conciliatory item) without hiding the refund button behind scrolling or another screen; never characterize Apple's refund policy (link to Apple's refund page).
- **Subscriptions:** present benefits during onboarding with a clear call to action and terms; offer a range of tiers and durations; prompt at relevant moments (near the free limit) and in settings; encourage signup only for non-subscribers and offer sign-in so nobody pays twice.
- **Signup:** short, distinct option names with price and duration; introductory price with its duration and the standard price after; only necessary information. The screen must include the subscription name, duration, content or services per period, the billing amount localized per territory and currency, and a way to sign in or restore purchases, plus Terms of Service and Privacy Policy links in-app and in App Store metadata; billing totals prominent, per-period breakdowns subordinate. Free trials state the duration and the amount billed automatically afterward.
- **Offer codes (iOS, iPadOS):** one-time use codes (App Store Connect; redeemable by URL, in-app, or in the App Store) for small or restricted distribution; custom codes (NEWYEAR; alphanumeric ASCII only; URL or in-app, not App Store settings) for mass campaigns; explain the offer; tell people how to redeem; a "Redeem Code" button on the paywall, onboarding, or settings opens the system sheet (`presentOfferCodeRedeemSheet`, `offerCodeRedemption`); supply a promotional image (else the app icon); welcome new subscribers at once, including those who subscribed before first launch.
- **Management:** show the upcoming renewal date near the management option in settings or account (`Product.SubscriptionInfo`); prefer `showManageSubscriptions`; on cancel consider a personalized offer or exit survey; complement with branded offers and win-back codes.
- **Always make canceling easy;** a deep or unrecognizable path feels like obstruction.
</best_practices>

<platform_considerations>
- **watchOS:** same required signup information; state honestly how the watch version differs; consider a modal sheet (its Close button returns to free content) or a custom flow with Close or Cancel; options easy to compare: one button per option locked to its description, or a list plus a button whose title reflects the choice.
- **tvOS:** sign up or authenticate via a code sent to another device.
</platform_considerations>

<anti_patterns>
- Don't alter the confirmation sheet, show the store when payments are blocked, upsell existing subscribers, bury cancel or refund, speculate on Apple's refund policy, or use non-ASCII custom codes.
</anti_patterns>
</topic>

<topic name="Live Photos" source="https://developer.apple.com/design/human-interface-guidelines/live-photos" updated="undated">
Live Photos capture audio and extra frames around a still; people press to play them. Keep them intact, consistent with the system experience, and distinguishable from stills.

<best_practices>
- **Apply adjustments to all frames** or offer conversion to a still; never disassemble frames or audio.
- **Preview the whole Live Photo before sharing** and always offer sharing as a traditional photo.
- **Show download progress and playability;** show a still where Live Photos aren't supported instead of imitating the effect.
- **Distinguish from stills** with a custom hint of movement (no built-in effect exists) or the system badge, with or without text, in the same corner every time; never a video-style play button.
</best_practices>

<platform_considerations>
- **visionOS:** view only, no capture. **watchOS:** not supported.
</platform_considerations>

<anti_patterns>
- Don't separate frames or audio, imitate Live Photos where unsupported, or show a playback button.
</anti_patterns>
</topic>

<topic name="Mac Catalyst" source="https://developer.apple.com/design/human-interface-guidelines/mac-catalyst" updated="2023-05-02">
Mac Catalyst builds a Mac app from an iPad app. Go beyond the iPad layout in a window: adopt macOS navigation, input, layout, and menu conventions.

<when_to_use>
- Good candidates support drag and drop, keyboard navigation and shortcuts, multitasking (Split View, Slide Over, Picture in Picture), and multiple scenes (become windows).
- Unsuitable when essentials need gyroscope, accelerometer, rear camera, HealthKit, or ARKit, or the main job is marking, handwriting, or navigation.
- iPad idiom (default): content scales to 77% (17 pt body becomes 13 pt), little layout work. Mac idiom: 100% rendering, more Mac-like views, better performance and power for graphics-heavy apps; best for text-, art-, or animation-heavy apps, but unscaled views report different metrics, so audit layout, text, and images.
</when_to_use>

<best_practices>
- **Automatic support:** pointer, keyboard focus, window management, toolbars, rich text with copy, paste, and context menus, file management, menu bar, Settings app; split view, file browser, activity view, form sheet, contextual actions, and color picker become Mac-like.
- **Mac idiom:** separate asset catalog; text styles, not fixed sizes; check images at full detail; limit appearance customizations to what macOS controls support.
- **Navigation:** replace a tab bar with a split view with a sidebar (preferred) or a segmented control (flat hierarchies); list top-level items in the View menu; add Next and Previous buttons beside swipe gestures.
- **Input mapping:** tap to click, touch and hold to click and hold, pan to click and drag; trackpad also pinch and rotate (delivered to the view under the pointer).
- **Icon:** a macOS version with the lifelike Mac rendering style.
- **Layout:** multiple columns; regular size classes with side-by-side reflow on resize; inspectors beside content, not popovers; controls into the window toolbar with commands in the menu bar; top-down flow; no edge-hugging buttons.
- **Menus:** every command in the menu bar (`UIMenuBuilder`, `UICommand`, `UIKeyCommand` for shortcuts); pop-up, pull-down, and context menus convert automatically; give every object a context menu.
</best_practices>

<anti_patterns>
- Don't just show the iPad layout in a window, use fixed sizes, keep tab bars or edge buttons, or rely on gestures alone for paging.
</anti_patterns>
</topic>

<topic name="Machine learning" source="https://developer.apple.com/design/human-interface-guidelines/machine-learning" updated="2026-06-08">
ML features use models to personalize experiences. Because behavior depends on data, define the feature's role first, then apply the patterns: explicit and implicit feedback, calibration, mistakes, corrections, multiple options, confidence, attribution, limitations (2026 clarity edits).

<when_to_use>
- Critical (Face ID) vs. complementary (QuickType): central features must be accurate; secondary ones are forgiven.
- Private vs. public data: sensitive data makes errors serious (a false doctor recommendation vs. a bad artist pick); always protect privacy.
- Proactive (Siri Suggestions) vs. reactive (QuickType): unrequested results get less tolerance and may need more data.
- Visible (Image Playground) vs. invisible (News suggestions): invisible features struggle to convey reliability or gather feedback.
- Dynamic (improves with use; uses calibration and feedback) vs. static (improves with updates).
- Calibrate only when the feature can't work without initial data; prefer guided corrections (a list of alternatives) over freeform.
</when_to_use>

<best_practices>
- **Explicit feedback:** only when necessary and always voluntary (favoriting and social reactions are implicit); describe options and consequences plainly ("Suggest less pop music", "Mute politics for a week"), never "dislike"; icons only to clarify; offer progressively specific options; act immediately, persist everywhere, and use it to tune when and where results show.
- **Implicit feedback:** secure it; explain how behavior is gathered and shared across apps and let people restrict it; don't shrink exploration; combine signals (viewing and sharing don't prove liking); withhold sensitive suggestions on shared devices; prioritize recent feedback (Face ID) with historical fallback; update at the expected cadence (typing instantly, songs not continuously); expect shifts after UI changes; beware confirmation bias and never rely on it alone.
- **Calibration:** secure data; explain the benefit (what, not how); collect only essentials; ask once, early (except per-object calibration like a new baseball field); quick, nothing to look up or hard to do; explicit goal and progress (Face ID tick marks); immediate, blame-free help when stalled with a next step; confirm success with a path to the feature; cancel anytime without judgment or follow-up; let people edit or remove data later.
- **Mistakes:** anticipate, help people handle, learn when it helps; match tools to severity (a bad keyboard suggestion vs. a missed flight); make frequent mistakes easy to fix; keep updating with tastes and trends; fix without complicating the UI (a wrong attribution magnifies errors); extra care in proactive features; watch that fixing dogs doesn't break cats.
- **Corrections:** familiar paths that show the automated steps (Photos highlights auto-crop controls); instant value, persisted; let people correct corrections; balance benefit vs. effort; never rely on corrections to mask poor results; learn from them only when quality rises.
- **Multiple options:** diverse (Maps: no tolls, scenic, highways); not too many, on one screen; most likely first (validated confidence or context), selected by default when apt; distinguishable with brief descriptions or grouped categories; learn from selections.
- **Confidence:** verify values track quality before showing; translate into known concepts ("Because you listen to pop music" over "97% match"); rank or use categories ("high chance", "low chance"); numbers only where expected (weather, sports, polls); actionable phrasing ("This is a good time to buy"); adapt by threshold (Photos confirms faces at low confidence); suppress low-confidence proactive results.
- **Attribution:** state the basis, not the model ("Because you've read mysteries"); use to distinguish options, soften mistakes, build a mental model; neither too specific (surveillance) nor too general (impersonal); factual ("Because you've read nonfiction", not "love"); no jargon outside statistical domains.
- **Limitations:** set expectations early for rare serious limits (marketing or in context), attributions for minor ones; demonstrate good use with placeholder text ("Photos, People, Places…"), live guidance (Memoji lighting hints), and alternatives instead of no results; explain poor results (Memoji in the dark); announce resolved limits.
</best_practices>

<anti_patterns>
- Don't request unnecessary or mandatory explicit feedback, use vague labels or icon-only options, recommend from sensitive implicit data, repeat calibration or blame stalls, mask poor results with corrections, show raw confidence or low-confidence proactive results, or attribute emotions and beliefs.
</anti_patterns>
</topic>
<topic name="Maps" source="https://developer.apple.com/design/human-interface-guidelines/maps" updated="2024-12-18">
A MapKit map offers Maps-app zoom, pan, and rotate plus annotations, overlays, routing, standard, satellite, or hybrid views, and place cards. Keep maps interactive, in your style, with the Apple logo and legal link visible.

<when_to_use>
- Default emphasis (saturated) for standard maps and alignment with the Maps app; muted (desaturated) when rich custom content must stand out.
- Overlays above roads (default, below buildings and trees) to hint at what's beneath; above labels to abstract or hide areas.
- Place card styles: automatic; callout popover (full or compact; full is a popover on iPadOS and macOS, a sheet on iOS); caption ("Open in Apple Maps" link); sheet. Web embeds can show one place's card by default.
</when_to_use>

<best_practices>
- **Keep the map interactive;** add search with category filters; mark selections with an outline and color; **cluster overlapping points** into one pin that expands on zoom.
- **Keep the Apple logo and legal link visible:** about 7 pt side padding and 10 pt above and below; fixed to the map, not your UI; 10 pt above a pull-up card's lowest resting position; not shown on maps under 200x100 px.
- **Annotations** (`MKAnnotationView`) match your style: recolor the default red pin, or use a logo or a two- to three-character string; make Apple features independently selectable (`MKMapFeatureOptions`) with custom presentation; ensure control contrast with a thin stroke, light shadow, or blend modes.
- **Place cards in a map:** choose by density (compact callout for small maps with many pins); verify on all sizes (minimum width for full callouts); avoid repeating information the app shows (prefer compact or caption); keep the place visible by offsetting the card toward it.
- **Place cards outside a map** must include a map; cue them with names, addresses, a details button, or a pin icon.
- **Indoor maps:** rooms and buildings at every zoom, details progressively (terminals then stores); color plus icons; a concise floor picker (numbers); dimmed surroundings for context; routing to transit, parking, and Apple Maps; limit scrolling so the venue stays partly visible; your app's style, not Apple Maps (Indoor Mapping Data Format).
</best_practices>

<platform_considerations>
- **watchOS:** static snapshots (`WKInterfaceMap`) set at design time; a tap opens Maps; up to five annotations; fit on screen without scrolling; smallest region covering all points.
</platform_considerations>

<anti_patterns>
- Don't obscure the map, permanently cover or move the logo and legal link, duplicate place information, mimic Apple Maps indoors, or allow scrolling far outside the venue.
</anti_patterns>
</topic>

<topic name="NFC" source="https://developer.apple.com/design/human-interface-guidelines/nfc" updated="undated">
NFC reads tags on objects within a few centimeters. Use friendly wording, the system scanning sheet, and both background and in-app reading.

<best_practices>
- **Say scan and hold near, never tap or touch;** no proximity contact is needed.
- **Avoid NFC, Core NFC, Near-field communication, tag:** "Hold your iPhone near the [object name] to learn more about it." not "To use NFC scanning, tap your phone to the [object]."; "Scan the [object name]." not "Scan the NFC tag."
- **Sheet text:** one complete sentence, sentence case, ending punctuation, naming the object; first scan "Hold your iPhone near the [object name] to learn more about it.", later "Now hold your iPhone near another [object name]."; short to avoid truncation.
- **Support background reading** (screen lit, notification hands data to the app; unavailable during a scanning sheet, Wallet or Apple Pay, camera use, Airplane Mode, or before first unlock after restart) **and always in-app reading.**
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** only supported platforms.
</platform_considerations>

<anti_patterns>
- Don't say tap or touch, use developer terms, or rely on background reading alone.
</anti_patterns>
</topic>

<topic name="Photo editing" source="https://developer.apple.com/design/human-interface-guidelines/photo-editing" updated="undated">
Photo-editing extensions edit photos and videos inside Photos, saving new files and preserving originals, in a modal view whose built-in top toolbar confirms or cancels.

<best_practices>
- **Confirm cancellation** and warn that edits are lost, unless nothing changed.
- **No custom top toolbar;** let people preview edits; use the app icon as the extension icon.
</best_practices>

<platform_considerations>
- **iOS, iPadOS, macOS:** supported; tvOS, visionOS, watchOS: not.
</platform_considerations>

<anti_patterns>
- Don't discard changes instantly on Cancel or add a second toolbar.
</anti_patterns>
</topic>

<topic name="ResearchKit" source="https://developer.apple.com/design/human-interface-guidelines/researchkit" updated="2023-09-12">
ResearchKit supplies screens for research apps: ordered onboarding, surveys, active tasks, a profile, and a dashboard. Onboarding is seen once, so keep it clear and in order.

<best_practices>
- **Onboarding order:** 1 Introduction (subject, purpose, call to action, quick login for existing participants), 2 Eligibility (as early as possible, only necessary requirements, plain language), 3 Informed consent (sections for data gathering, use, benefits, risks, time, withdrawal; overview plus Learn More; the whole form viewable; optional comprehension quiz; confirmation, signature, contact details; usually an emailed PDF; comply with App Store and review-board rules), 4 Permissions (only data critical to the study, with reasons; notifications if needed).
- **Surveys:** state count and duration; one question per screen; show progress; several short surveys over one long one; smaller font for explanations; confirm completion.
- **Active tasks** (microphone, tapping, walking, memory): clear instructions, timing or conditions, obvious completion.
- **Profile** (editable data, upcoming activities, leave the study, consent and privacy documents) and **dashboard** (daily progress, weekly assessments, results, aggregate comparisons), both always accessible.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** only supported platforms.
</platform_considerations>

<anti_patterns>
- Don't ask unnecessary eligibility questions, request non-critical data, or stack questions on one long survey.
</anti_patterns>
</topic>

<topic name="SharePlay" source="https://developer.apple.com/design/human-interface-guidelines/shareplay" updated="2026-09-09">
SharePlay lets people do an app's activities together in real time from their own devices, synced by the system alongside FaceTime or Messages, starting from an in-app control, a call, or a link (2026 reorganization, expanded visionOS, custom templates). Each participant needs their own copy of paid content; the system prompts those without it.

<when_to_use>
- Same-moment activities only; for asynchronous work, offer sharing or saving afterward (a Freeform board link).
- One shared view for watching or browsing; per-role views for games.
- visionOS templates: side-by-side (watching along a curve, focus on content), surround (tabletop games; circle around 3D or per-viewer content; more interaction), conversational (people around a center, content at the edge; being together while the app plays music), or a custom template.
</when_to_use>

<best_practices>
- **Work across platforms, devices, and communication methods.**
- **Start easily:** a button with the SharePlay symbol, the share sheet, or in visionOS the Share button by the window bar.
- **Join without friction:** straight to content; sign-in, downloads, or subscriptions in a view that dismisses when done; provisional access or Family Sharing; defer setup (profiles after joining a match).
- **Describe activities briefly** in invitations (title, summary, poster) to avoid truncation.
- **Keep people oriented:** the system syncs media (one pause pauses all); show who did what for other changes (Freeform initials).
- **Term:** noun ("Join SharePlay") or verb ("SharePlay Movie"); no adjectives like virtual or spatial; never SharePlayed, SharePlays, SharePlaying.
- **visionOS shared context:** align windows and volumes so everyone sees the same placement; position objects, sound, and interactions to feel together; start from a window (immersive spaces need custom start UI).
- **Conflicts:** no take-control UI for single-user tools; people speak or gesture; a simple rule like last change wins.
- **Views and immersion:** keep in sync; a personal immersive view swaps the Persona for a contact photo with FaceTime Audio continuing; if an immersion change would interrupt someone, let them join when ready and move everyone else at once; comfort settings (volume, subtitles) per person; easy leave and rejoin, with a windowed version for multitasking.
- **Personas:** support participants without a spatial Persona (other devices, Persona off, windowed FaceTime) with UI alternatives to expressions and gestures; nearby wearers see each other through passthrough and share one physical spot.
- **Templates:** a template per stage (team pick, then play), mixing system and custom; transitions tied to explicit actions, infrequent, low-movement, faded, with reorientation cues.
- **Custom templates (2026):** seats apply only to spatial Personas; guide co-located people with position markers; set seat orientation (default faces content); five seats when possible (Apple Vision Pro supports up to five spatial Personas), all defined up front and kept when someone leaves, plus spectator seats for limited-player games; at least a meter apart (too close swaps a Persona for a photo); a fill order that stays balanced; roles independent of seats, reserving a spot only when a role needs it (a host at the head).
</best_practices>

<platform_considerations>
- **iOS, iPadOS, macOS:** Picture in Picture for shared video; on Mac a window people can bring forward.
- **visionOS:** windows share by mirroring via the Share button; adopt SharePlay for volumes and immersive content; remote people appear as spatial Personas or contact photos, other devices as 2D video.
- **tvOS:** nothing extra. **watchOS:** not supported.
</platform_considerations>

<anti_patterns>
- Don't show unrelated views on join, pair SharePlay with adjectives, show take-control UI, force immersion changes, share comfort settings, add or remove seats dynamically, or tie roles to seats.
</anti_patterns>
</topic>

<topic name="ShazamKit" source="https://developer.apple.com/design/human-interface-guidelines/shazamkit" updated="undated">
ShazamKit matches audio against the Shazam catalog or a custom catalog (genre visuals, synced captions or sign language, syncing with external content). Microphone access needs a clear permission reason.

<best_practices>
- **Stop recording as soon as the sample is captured.**
- **Let people opt in** before storing recognized songs in their iCloud library, even though Music Recognition and Shazam credit your app.
</best_practices>

<anti_patterns>
- Don't keep the microphone on or write to the library without approval.
</anti_patterns>
</topic>
<topic name="Sign in with Apple" source="https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple" updated="2022-09-14">
Sign in with Apple uses a person's Apple Account with Face ID, Touch ID, or Optic ID, built-in two-factor authentication, and an optional private relay email, on every platform including non-Apple ones. Delay sign-in, minimize data, and show the button prominently.

<when_to_use>
- Ask to sign in only in exchange for value, as late as possible (browse before signing in to stream).
- If an account is required, explain why, complete setup, then offer Sign in with Apple with other methods.
- Commerce: ask after purchase; with guest checkout and Apple Pay, offer account creation on the confirmation page without re-asking name or email.
- Offer account linking when a shared email matches an existing account or from account settings after a password sign-in.
</when_to_use>

<best_practices>
- **Welcome people immediately** and show sign-in status ("Using Sign in with Apple") in settings or account UI.
- **Data:** state whether extra data is required (terms, region, birth date, real-identity laws) or optional (explain the benefit; never gate features); never ask for a password unless people stopped using Sign in with Apple; never ask for a personal email when a relay address is shared (show the relay address in-app, point to Settings > Apple Account > Password & Security > Apps using Apple Account, or use an order number or phone); ask for optional data after engagement; show the name or email people shared so they see how it's used.
- **Prominence:** no smaller than other sign-in buttons, visible without scrolling.
- **System buttons** (`ASAuthorizationAppleIDButton`, `WKInterfaceAuthorizationAppleIDButton`, web): approved look, proportions, automatic translation, corner radius (iOS, macOS, web), VoiceOver label. Titles: Sign in with Apple, Sign up with Apple, Continue with Apple (iOS, macOS, tvOS, web); watchOS only "Sign in"; use one consistently.
- **Styles:** White (all platforms; dark backgrounds with contrast), White with outline (iOS, macOS, web; light backgrounds lacking contrast; never dark or saturated), Black (all platforms; light backgrounds; never dark). watchOS black uses system dark gray against the black watch background.
- **Corner radius** square to capsule to match; respect minimums since titles vary by locale.
- **Custom buttons** (iOS, macOS, web; App Review checks them) must be instantly recognizable, using only Apple Design Resources logo files (PNG, SVG, PDF; black and white; padded): logo file height equals button height, no cropping, no added vertical padding, never the logo alone as a button or a homemade logo. Fixed: the three titles; rectangular shape for logo-plus-text (logo-only may be circular); black or white logo and title. Adjustable: title font, weight, size, all-caps; black or white background with subtle texture or gradient; corner radius; bezel stroke; shadow.
- **Logo-plus-text:** PNG only at 44 pt height (iOS default), vectors at any height, small, medium, large logos to match other buttons; system font preferred at 43% of button height (height 233% of font size); keep default capitalization unless the UI is all-caps; title centered vertically, logo height equal to button height; inset the logo to align with other logos; at least 8% of width between title and right edge.
- **Logo-only:** 1:1 with built-in padding; PNG only at 44x44 pt; mask to a circle or rounded rectangle, never crop or add padding; margin 1/10 of height.
</best_practices>

<specs>
| Button | Min width | Min height | Min margin |
|---|---|---|---|
| System or custom logo-plus-text (iOS, macOS, web) | 140 pt (140 px @1x, 280 px @2x) | 30 pt (30 px @1x, 60 px @2x) | 1/10 of height |
| Logo-only custom | 1:1; 44x44 pt for PNG | | 1/10 of height |

Title font 43% of button height; title-to-right-edge margin at least 8% of width.
</specs>

<anti_patterns>
- Don't force early sign-in, ask for passwords or personal email with a relay address, gate features on optional data, shrink or bury the button, use outlined on dark or black on dark, or invent logos, colors, or titles.
</anti_patterns>
</topic>

<topic name="Siri" source="https://developer.apple.com/design/human-interface-guidelines/siri" updated="2026-06-08">
Siri helps people find, know, and do things by voice, by swiping down from the Dynamic Island, or in the Siri app; Siri AI (2026), powered by Apple Intelligence, runs app actions from anywhere, acts on on-screen content, and reaches deep features. Apps participate via App Intents, app schemas, and App Shortcuts.

<when_to_use>
- Expose actions (intents) and content (entities) with App Intents for Siri, Spotlight, and Shortcuts; the system knows nothing otherwise.
- Adopt app schemas (2026) for common domains (email, music, photos) to get built-in handling, natural conversation, and deeper context; App Shortcuts for actions outside schemas.
- Annotate on-screen views with entities so Siri resolves "this photo"; donate entities to Spotlight; donate actions so Siri anticipates them.
- Optional intent or entity properties (a playback snippet) only enhance schema responses and may not appear in non-visual contexts.
</when_to_use>

<best_practices>
- **Prioritize the most popular actions and their contexts** (hands-free, device); use familiar terms (track, song, podcast).
- **Offer relevant content to Spotlight** (recent searches, favorites, bookmarks, wishlists); whole catalogs only for email or messaging.
- **No ads, marketing, or in-app purchase pitches** in Siri content; custom responses only when built-in ones fall short.
- **Dialogue:** clear ("Which soup?" not "Which one?"), succinct, no filler or humor; deliverable audibly and visually with a voice response that stands alone; inclusive ("Who should I send it to?"); open-ended questions when lists are long; device-independent; no app name (the system attributes); parental-control-safe; specific errors ("Sorry, we're out of chicken noodle soup").
- **Editorial:** Siri by name, never pronouns; never impersonate Siri, reproduce it, or speak as Apple; no reserved phrases ("Call 911", "Hey Siri"); translate only "Hey" using Apple's per-locale list (Hej, Oye, Dis, Ehi, Hei, Hé, E aí, Hai, привет, Siri야, หวัดดี, 嘿, 喂), never Siri.
</best_practices>

<anti_patterns>
- Don't advertise, over-customize responses, include the app name, device wording, gendered pronouns, or offensive language, impersonate Siri, or translate Siri.
</anti_patterns>
</topic>

<topic name="Tap to Pay on iPhone" source="https://developer.apple.com/design/human-interface-guidelines/tap-to-pay-on-iphone" updated="2025-01-17">
Tap to Pay on iPhone lets merchants accept contactless cards and wallets on iPhone without hardware, via a payment service provider (PSP), an entitlement, and ProximityReader. Get terms accepted early, educate merchants, keep the option always available, and label it exactly.

<best_practices>
- **Terms:** accept before customer-facing flows (from in-app messaging or onboarding); administrators only (tell others admin access is needed, or allow web acceptance); after any PSP-required iOS update.
- **Tutorial:** payment types and how to accept each; via Learn More, automatically after terms and for new users, and always in help or settings; use `ProximityReaderDiscovery` (localized, kept current) or Apple-approved assets; custom tutorials show launching checkout per type, positioning the card or wallet, PIN entry with accessibility mode, and end with a terms option.
- **Checkout:** always offer Tap to Pay, enabled or not (tapping presents terms then opens the screen); prepare at launch and each foregrounding (`prepare(using:)`); selectable during configuration with an indeterminate indicator, determinate when progress is reported; no scrolling to find it; auto-open when it's the only method; easy switching with hardware readers without visiting settings.
- **Label:** "Tap to Pay on iPhone" or "Tap to Pay" when constrained; reuse Charge or Checkout only if it's the sole method; icons `wave.3.right.circle` or `wave.3.right.circle.fill`; never the Apple logo; your own color and shape; payment actions only.
- **Amount:** settle tips and pre-payment options first and show the final total on the Tap to Pay screen.
- **Results:** process immediately (`returnReadResultImmediately`); show an authorization indicator after the checkmark animation; clearly show declined or approved; offer digital receipts (QR, text); on failure accept cash, other hardware, a payment link, or retry another card; consult the PSP for Strong Customer Authentication and Offline PIN cases; explain merchant-fixable errors (an alert to update iOS) and link to help and support.
- **Non-payment reads:** generic labels ("Look Up", "Store Card", "Verify", "Refund"); loyalty transactions get a separate button without payment terms.
</best_practices>

<platform_considerations>
- **iOS:** only supported platform.
</platform_considerations>

<anti_patterns>
- Don't show terms to nonadministrators, wait for configuration, hide the button below the fold, add the Apple logo, or use "Tap to Pay" for non-payment or loyalty flows.
</anti_patterns>
</topic>

<topic name="Wallet" source="https://developer.apple.com/design/human-interface-guidelines/wallet" updated="2026-06-08">
Wallet stores cards, IDs, transit cards, tickets, keys, and passes on iPhone and Apple Watch. Add passes at the right moment, keep them current, track orders, and verify identity with system buttons; the 2026 revision covers iOS 27 and the Pass Designer app (semantic passes, poster styles, templates).

<best_practices>
- **Adding passes:** one-tap system UI when an action creates a pass; background adding after a one-time authorization for predictable actions (check-in), with Wallet notifying; a review view with an Add to Apple Wallet button when people want to look first; suggest passes made on the web or another device once, never again if declined; add related passes as a group; show an Add to Apple Wallet button (`PKAddPassButton`, or the email and web badge) wherever pass information appears for passes not in Wallet; link to Wallet with "View in Wallet".
- **Lifecycle:** set expiration, relevant date, and voided so Wallet hides expired passes; ask before deleting (a manual vs. automatic setting or an alert); supply time and place relevance so the Lock Screen suggests the pass and event tickets can start a Live Activity; keep passes current; change messages only for time-critical updates, never marketing.
- **Anatomy:** pass fields set content and layout; semantic tags describe content for relevance and featured actions (directions, event guides); poster event and semantic boarding passes require semantic tags (auto layout) plus pass fields for older iOS. Areas: logo and logo text and header (visible collapsed), primary, secondary and auxiliary, footer (category like "Family"), back (rarely needed details, legal text); supplemental sheets link from the front.
- **Design (Pass Designer, 2026):** templates or blank for boarding, coupon, event, store card, generic, poster generic; clean and simple, not a replica of the physical card; works on every device (Apple Watch shows less and crops white space; no image padding); essentials in the header for the collapsed state; details on the information sheet; brand colors and art for instant recognition; label contrast on solid and image backgrounds; device-neutral text ("Slide to view" fails on Apple Watch).
- **Styles:** boarding (airline via semantic tags; train, bus, boat, transit via fields; one trip each), coupon, event ticket (poster full-art or non-poster with background and thumbnail; season passes allowed), store card (loyalty, points, gift; shows balance), poster generic (2026; full background, flexible), generic (gym card, coat check).
- **Images:** PNG @2x and @3x; visuals only (embedded text isn't accessible); barcodes via Pass Designer or API; small files; a pass icon (app icon or custom); no inner drop shadows on logos; strip images uncluttered behind text with key visuals toward the bottom or trailing edge, no text; thumbnails rounded, transparent PNG; poster art within the safe area (a material strip covers the bottom) with room for a barcode (`footerBackgroundColor`).
- **Order tracking (Wallet Orders):** add automatically after Apple Pay (`PKPaymentOrderDetails`, `ApplePayPaymentOrderDetails`) or via the Track with Apple Wallet button (`AddOrderToWalletButton`, iOS 17 and later) on confirmation, status, and tracking pages and emails; provide data immediately ("Check back later for full order details"); keep status current (Order Placed, Processing, Ready for Pickup, Picked Up, Out for Delivery, Delivered, Issue, Canceled); 300x300 px PNG or JPEG logo and product images on solid nontransparent backgrounds; brief, localized text; price matches the confirmed total; a universal link to order management; full line items; apps listed by priority; no duplicate notifications; contact methods (website required); carrier name (default "Track Shipment"), specific statuses (`onTheWay`, `outForDelivery`, `delivered`) or `shipped`, and a tracking link; pickup barcode and instructions; tracking before promotions; Issue or Canceled explained directly.
- **Identity verification (iOS 16 and later):** Verify with Apple Wallet button only on capable devices, with a fallback method; ask at the moment of need, not at account creation; purpose string as one direct sentence with a period ("Federal law requires this information to verify your identity and also to help [App Name] prevent fraud."); minimum data (age threshold via `age(atLeast:)`); state retention (`PKIdentityIntentToStore` renders it); labels Verify Age, Verify Identity, Continue (more data follows, such as a Social Security number), or a generic variant (government signup); multiline variants auto-apply when narrow; always white on black, optional light outline for dark backgrounds, adjustable corner radius.
</best_practices>

<specs>
| Image | Styles | File | Size |
|---|---|---|---|
| Logo | non-semantic airline, other boarding, coupon, non-poster event, generic, store card | logo.png | 50 to 160 pt wide, 50 pt tall |
| Primary logo | airline, poster event, poster generic | primaryLogo.png | 30 to 126 pt wide, 30 pt tall |
| Secondary logo | poster event | secondaryLogo.png | 12 to 135 pt wide, 12 pt tall |
| Icon | all | icon.png | 38x38 pt (system rounds) |
| Strip | coupon, store card | strip.png | 375x144 pt |
| Thumbnail | event ticket, generic | thumbnail.png | 60 to 90 pt wide, 90 pt tall |
| Background (non-poster, blurred) | event ticket | background.png | 343x503 pt |
| Background (poster, unblurred) | poster event, poster generic | artwork.png | 358x448 pt |
| Footer | airline boarding | footer.png | 268x15 pt |
| Order logo and product images | order tracking | PNG or JPEG | 300x300 px, nontransparent |
</specs>

<platform_considerations>
- **watchOS:** carousel of cards; a tap opens a scrolling details screen; fixed layout areas per style with overflow in details; the strip image is cropped to the card ratio and white space may be cropped; passes arrive without a watch app.
- **tvOS:** not supported.
</platform_considerations>

<anti_patterns>
- Don't re-suggest declined passes, delete without permission, send marketing change messages, put essentials in device-specific elements, embed text or barcodes in images, pad images, use inner shadows, show the verify button on unsupported devices or too early, request birth dates over age thresholds, or use busy order images.
</anti_patterns>
</topic>
<decision_guide>
Map a product need to the technology the HIG points at, with its three top rules.

| Need | Technology | Top three rules |
|---|---|---|
| Sign in or sign up | Sign in with Apple | 1. Delay sign-in until it buys value; in commerce ask after purchase; label data as required or optional. 2. System button no smaller than peers, visible without scrolling, at least 140x30 pt, style by background. 3. Never ask for a password or a personal email when a relay address is shared. |
| Checkout for physical goods, services, donations | Apple Pay | 1. Primary and pre-selected when a card exists; never a separate step; hidden only where unsupported. 2. API buttons only (100 or 140 pt wide, 30 pt tall, 1/10-height margins), right type and style; the mark is never a button. 3. Gather options, optional data, and shipping choices before the sheet; report results and specific errors (128 characters max) in it. |
| Selling digital goods or subscriptions | In-app purchase | 1. Total price on every item; signup shows name, duration, localized price, terms, privacy, trial terms, restore or sign in. 2. System confirmation, refund, redemption, and management sheets unmodified; cancel is easy. 3. Try before buying; prompt only non-subscribers; hide the store when payments are blocked. |
| Accepting card payments in person | Tap to Pay on iPhone | 1. Always offered, even mid-configuration, with a progress indicator. 2. Exact label "Tap to Pay on iPhone" or "Tap to Pay", `wave.3.right.circle`, no Apple logo, payment only. 3. Final amount first; alternatives when a tap fails. |
| Passes, tickets, loyalty, order tracking, ID checks | Wallet (ID Verifier in person) | 1. Add passes when created, grouped, with relevance and expiration; ask before deleting. 2. Clean Pass Designer passes with semantic tags and images at the listed sizes; no text or barcodes in images. 3. Verify identity only at the moment of need with a purpose string, an age threshold, and stated retention. |
| Sharing a session in real time | SharePlay | 1. Same-moment activities; share or save afterward for async work. 2. SharePlay-symbol button, frictionless joining, provisional access, brief descriptions. 3. Keep everyone oriented; on visionOS pick the right template, keep comfort settings personal, support non-Persona participants. |
| Exposing app actions and content to the system | Siri via App Intents, app schemas, App Shortcuts | 1. Expose popular actions and relevant content in familiar terms; annotate and donate. 2. Succinct, inclusive, device-independent dialogue that works by ear, without app name or ads. 3. Never impersonate Siri or use reserved phrases; Siri by name; translate only "Hey". |
| On-device intelligence, recommendations, recognition | Machine learning | 1. Define the role (critical or complementary, proactive or reactive, visible or invisible) and match accuracy expectations. 2. Prefer implicit feedback, act on all feedback instantly and persistently, make corrections easy and guided. 3. Confidence only as understandable, actionable concepts; suppress low-confidence proactive results; state limits up front. |
| Generating or transforming content | Generative AI | 1. Disclose AI, keep control with Edit, Undo, Retry, Adjust, never pose as human. 2. Choose on-device or server by privacy and capability; ask permission; say what leaves the device. 3. Scope requests against hallucination, confirm irreversible actions, give specific progress text, collect voluntary thumbs feedback. |
| Instant task or demo without install | App Clips | 1. Linear, small, native, no account first; finish the task or demo inside. 2. Card: 1800x1200 px, 30-character title, 56-character subtitle, View, Play, or Open. 3. Apple-generated codes at the listed sizes and ratios; recommend the app only at natural pauses. |
| Social features in games | Game Center | 1. Initialize at launch; access point in menus, clear of controls. 2. Official terms and artwork sizes for achievements, leaderboards, challenges, activities. 3. Challenges 1-5 minutes on the most recent score; party codes with late join. |
| Health, care, research data | HealthKit, CareKit, ResearchKit | 1. Request only what's needed, in context, every time, via the system screen with a descriptive message. 2. Sharing only in Settings > Privacy; Activity rings and the Apple Health icon unaltered; say Apple Health, not HealthKit. 3. Privacy policy, quiet branding, minimal notifications, ordered consent onboarding. |
| Home accessories | HomeKit | 1. HomeKit terms and hierarchy; defer to Home app settings. 2. System setup flow, no required account, custom post-setup. 3. Service naming rules and Siri phrases; shortcuts only for what HomeKit lacks. |

Other needs map directly to one topic above: driving (CarPlay), venue or location maps (Maps), virtual objects (Augmented reality), streaming to TVs (AirPlay), cross-device sync (iCloud, GameSave for games), physical tags (NFC or App Clip Codes), in-person ID checks (ID Verifier), Messages content (iMessage apps and stickers), photos (Live Photos, Photo editing), audio recognition (ShazamKit), iPad-to-Mac (Mac Catalyst), idle display (Always On).
</decision_guide>

<quick_checklist>
- [ ] Are Apple Pay and Sign in with Apple buttons made with the system APIs, at least as large as neighbors, visible without scrolling, and styled for their background?
- [ ] Is the Apple Pay mark only an "accepted here" indicator, never a button, and is Apple Pay pre-selected when a card is available?
- [ ] Does every in-app purchase show its total price, and does the signup screen list name, duration, localized price, terms, privacy, trial terms, and restore or sign in?
- [ ] Are system sheets (payment, purchase confirmation, refund, subscription management, offer redemption, health permission, HomeKit setup, Wallet add, identity verification) used unmodified?
- [ ] Is sign-in, account creation, or identity verification deferred until it delivers value, with minimum data and no password or personal email requests?
- [ ] Are Apple technology names (Apple Pay, AirPlay, HomeKit, Apple Health, SharePlay, Siri, Tap to Pay on iPhone, Game Center) spelled, capitalized, untranslated, and used grammatically as specified, with icons noninteractive?
- [ ] Does AI content disclose that it's AI and offer Edit, Undo, Retry, Adjust, specific progress messages, voluntary feedback, and confirmation before irreversible actions?
- [ ] Do ML features use understandable attributions instead of raw confidence, hide low-confidence proactive suggestions, and make corrections easy and persistent?
- [ ] Are Siri intents, entities, and App Shortcuts named in familiar terms with succinct, inclusive, device-independent dialogue and no app name or ads?
- [ ] Does a SharePlay activity start from a clear control, let people join without detours, and keep everyone oriented?
- [ ] Are passes, App Clip cards and codes, achievements, leaderboards, stickers, CarPlay icons, and other assets at the exact sizes specified?
- [ ] Are user-facing strings free of developer terms (HealthKit, NFC, tag, ARKit, plane, tracking, GameKit, service, characteristic, action set)?
- [ ] Do CarPlay, Always On, and App Clip experiences avoid iPhone interaction, sensitive data exposure, and mid-task install prompts?
- [ ] Are health, home, motion, camera, microphone, and identity data requested only in context, with purpose strings, and managed through system settings?
</quick_checklist>
