<overview>
Distills the HIG "Technologies" group except VoiceOver (covered in accessibility.md): airplay, always-on, app-clips, apple-pay, augmented-reality, carekit, carplay, game-center, generative-ai, healthkit, homekit, icloud, id-verifier, imessage-apps-and-stickers, in-app-purchase, live-photos, mac-catalyst, machine-learning, maps, nfc, photo-editing, researchkit, shareplay, shazamkit, sign-in-with-apple, siri, tap-to-pay-on-iphone, wallet.
Focus is design guidance rather than API steps: when to offer a system feature, where its UI belongs, mandatory button and mark rules, wording and trademark rules, flows, privacy, and what to avoid.
Load this file when a UI touches payments, sign-in, passes, shared sessions, system intelligence (Siri, machine learning, generative AI), games, health, home, cars, maps, AR, media streaming, Messages, or App Clips.
Pages revised in 2025-2026 (Apple Pay, Generative AI, Machine learning, Siri AI, SharePlay, Wallet for iOS 27 and Pass Designer, demo App Clips, Game Center challenges and activities, iCloud GameSave) carry inline (2025) or (2026) markers.
</overview>

<topic name="AirPlay" source="https://developer.apple.com/design/human-interface-guidelines/airplay" updated="2023-05-02">
AirPlay streams media wirelessly from iOS, iPadOS, macOS, and tvOS devices to Apple TV, HomePod, and AirPlay-compatible TVs and speakers. Prefer the system media player and treat AirPlay as a noun-only, noninteractive brand reference.

<best_practices>
- **Prefer the system-provided media player.** `AVPlayerViewController` supplies chapter navigation, subtitles, closed captioning, and AirPlay streaming; design a custom player only when the system one can't meet the app's needs.
- **Provide content in the highest possible resolution.** The HLS playlist must include the full range of resolutions so AVFoundation picks the right one per device; 720p that looks great on iPhone looks low quality streamed to a 4K TV.
- **Stream only the content people expect.** Don't stream background loops or short clips that make sense only inside the app (`usesExternalPlaybackWhileExternalScreenIsActive`).
- **Support both AirPlay streaming and mirroring.** Together they give people the most flexibility.
- **Support remote control events.** People then control play, pause, and fast-forward from the Lock Screen, Siri, and HomePod.
- **Don't stop playback when the app enters the background or the device locks.** People expect the show to continue while they check mail; also avoid automatic mirroring in that scenario.
- **Don't interrupt another app's playback unless starting immersive content.** Launch videos and auto-playing inline videos play only on the local device while current playback continues (`ambient` audio session category).
- **Let people use other parts of the app during playback.** Navigating away from the playback screen must not start other in-app videos that interrupt the stream.
- **If a custom player is necessary, match the system controls.** Provide distinct visual states for playback starting, occurring, and unavailable; use only Apple-provided symbols to initiate AirPlay; place the AirPlay icon in the lower-right corner (iOS 16 and iPadOS 16 and later).
- **Use the black, white, or custom-color AirPlay icon to match other technology icons** on light, dark, or same-color layouts; display it inside the same shapes if other icons use shapes.
- **Pair the icon with the name AirPlay correctly.** Name below or beside the icon, in the layout's own font, only when other technologies are referenced the same way.
- **Emphasize the app over AirPlay.** References to AirPlay stay less prominent than the app name or main identity.
- **Write AirPlay as one word with capital A and P, always as a noun.** Good: "Use AirPlay to listen on your speaker", "[App Name] is compatible with AirPlay", "Compatible with Apple AirPlay", "[App Name] now supports AirPlay". Use terms like works with, use, supports, compatible; all-uppercase only when the whole layout is uppercase.
</best_practices>

<platform_considerations>
- **watchOS:** not supported.
</platform_considerations>

<anti_patterns>
- Don't use the AirPlay icon or name in custom buttons or interactive elements; noninteractive use only.
- Avoid the AirPlay icon within text or as a replacement for the name.
- Don't write "AirPlay to your speaker", "You can AirPlay with [App Name]", "AirPlay-enabled speaker", or "[App Name] has AirPlay".
- Don't auto-mirror when the device locks or the app backgrounds.
</anti_patterns>
</topic>

<topic name="Always On" source="https://developer.apple.com/design/human-interface-guidelines/always-on" updated="2023-09-12">
On devices with an Always On display, the system keeps showing an app's interface, dimmed and with minimal motion, after people stop interacting. Design a glanceable, privacy-preserving, low-power state.

<best_practices>
- **Hide sensitive information.** Redact bank balances, health data, and personal information in notifications that casual observers shouldn't see.
- **Keep other personal information glanceable when it makes sense.** Pace and heart rate during a workout on Apple Watch, a flight arrival or ride-share arrival on iPhone; people who want nothing shown can turn Always On off.
- **Keep important content legible and dim nonessential content.** Increase dimming on secondary text, images, and color fills; a to-do app removes row backgrounds and dims details to highlight titles; replace rich images and large color areas with dimmed colors.
- **Maintain a consistent layout.** When Always On begins, transition interactive components to an unavailable appearance rather than removing them; make infrequent, subtle updates (a sports app pauses play-by-play and updates only the score). Motion is especially distracting on iPhone lying face up.
- **Gracefully transition motion to a resting state; don't stop it instantly.** Finishing the current motion communicates the transition and avoids looking broken.
</best_practices>

<platform_considerations>
- **iOS:** on iPhone 14 Pro and iPhone 14 Pro Max the system shows Lock Screen items like widgets and Live Activities when the device is set face up and idle; notifications still appear; tapping exits Always On.
- **watchOS:** on wrist-down the watch face dims and the app's interface stays visible while it's frontmost or running a background session.
- **iPadOS, macOS, tvOS, visionOS:** not supported.
</platform_considerations>

<anti_patterns>
- Avoid distracting interface changes when Always On begins or ends.
- Don't just remove interactive components; show them as unavailable.
- Don't make frequent granular updates during Always On.
</anti_patterns>
</topic>

<topic name="App Clips" source="https://developer.apple.com/design/human-interface-guidelines/app-clips" updated="2025-06-09">
An App Clip is a lightweight version of an app or game that delivers an on-the-go task or a demo (2025) instantly, without an App Store download, and stays on the device only for a limited time. Keep it small, linear, focused, native, and privacy-preserving.

<when_to_use>
- Use an App Clip for an in-the-moment, finite task: renting a bike from an App Clip Code, advance coffee orders from a Smart App Banner or App Clip card, paying for a meal from Maps or Siri Suggestions, museum labels revealing AR content or audio commentary.
- Use a demo App Clip (2025) so people can try the app or game before buying or subscribing: a tutorial plus the first level, a free workout and guided meditation, creating and saving a document.
- Prefer a quick link to the website instead of an App Clip when only web components are available.
- Launch sources: App Clip Code, NFC tag, QR code, Siri Suggestions, Maps, Smart App Banners, App Clip cards in Safari, Messages links, and (iOS 17 and later) links and App Clip previews inside other apps. An App Clip Code is the best discovery method because its design is recognizable and trusted.
</when_to_use>

<best_practices>
- **Allow people to complete a task or a demo in the App Clip.** Don't require the full app to finish the demo, task, or level.
- **Focus on essential features.** Reserve advanced or complex features for the app.
- **Design a linear, easy-to-use, focused interface.** No tab bars, complex navigation, or settings; minimize screens and entry forms.
- **On launch, show the most relevant part.** Skip unnecessary steps and go straight to the context-appropriate part.
- **Ensure people can use it immediately.** Include all required assets, omit splash screens, never make people wait on launch.
- **Ensure the App Clip is small.** Remove unused code and assets; avoid downloading additional data, which kills immediacy.
- **Make it shareable.** Offer links to specific points; recipients launch from within Messages.
- **Make it easy to pay.** Support Apple Pay for express checkout with no typing.
- **Avoid requiring account creation first.** Ask after the task, and limit required information by offering Sign in with Apple.
- **Provide a familiar, focused experience in the app.** When installed, the app replaces the App Clip and its invocations; don't make people log in again.
- **Limit the data you store; store login information securely off the device.** App Clips can't run background operations, and the system may delete an App Clip and its data between launches.
- **Don't compromise the experience by asking people to install the app.** Rely on the App Clip card and the system app banner shown at first launch; let demo users finish the demo first.
- **Recommend the app at the right time, politely.** Show an `SKOverlay` after a task completes or at a natural pause; never repeatedly, never mid-task, never via push notification; state the app's extra features clearly.
- **Keep notifications focused and task-related.** App Clips can schedule notifications for up to 8 hours after launch; request extended permission only when functionality spans more than a day (a car-rental return reminder). No promotional notifications; send only in response to an explicit action.
- **For platform providers serving businesses, use consistent branding.** Tone down your own brand so the business's brand is front and center; handle multiple businesses or locations (switch between recent ones, verify location on launch).
- **App Clip card:** be informative; prefer photography and graphics over UI screenshots; avoid text in the header image (not localizable, hard to read); 1800x1200 px PNG or JPEG without transparency; title 30 characters max, subtitle 56 characters max; action verb View (media, informational, educational), Play (games), or Open (everything else).
- **App Clip Codes:** always use Apple's generated design (App Store Connect or the App Clip Code Generator); badge design with the App Clip logo when clear space allows, or the design without the logo when space is limited, on disposable paper or plastic, or on items tied to gambling or drinking (playing cards, poker chips, bar coasters). Never use the App Clip logo on its own.
- **Choose the variant by physical access.** NFC-integrated (iPhone glyph at center) where people can reach it: tabletops, registers, storefront windows, signage, gift cards, coupons. Scan-only (camera glyph) for unreachable or digital placement: posters, behind counters, digital displays, email, social images.
- **Place codes on flat or cylindrical surfaces only.** On a cylinder (a scooter handlebar) the code's width must not exceed one-sixth of the circumference; keep codes rigid (attach a card to bags or flexible boxes; stickers must adhere flat), well lit, scannable without wide angles, upright, unobstructed, never animated, dimmed, rotated, or overlaid with text, logos, or images.
- **Size codes for reliable scanning.** Distance-to-size ratio no more than 20:1, ideally 10:1 (scanning from 40 in / 101 cm needs a code at least 4 in / 10.16 cm). Make the code at least as large as any adjacent QR code; keep clear space equal to the gap between the center glyph and the circular code.
- **Add clear call-to-action messaging**, especially without the logo. Scan-only: "Scan to [describe what people can do]" or "Scan using the camera on your iPhone or iPad to [...]". NFC: "Hold your iPhone near the [object name] to launch an App Clip that [...]". Use title case for App Clip and App Clip Code; keep Apple trademarks in English.
- **Choose high-contrast colors.** Codes use a foreground, background, and generated third color; default pairs are offered and the tools refuse combinations that scan poorly.
- **Print on matte, high-quality, non-textured materials.** Avoid gloss, holographic overlays, and thin laminates (use matte laminate if needed); UV-resistant materials outdoors; flexographic printing professionally or inkjet at home; rasterize SVG at 600 ppi minimum and print at 300 dpi minimum; on receipt printers print near the paper's maximum bounds; convert sRGB to CMYK with relative colorimetric intent (Generic CMYK ICC profile on CMYK printers, Gracol 2013 ICC on CMYKOV, CIELab Delta E tolerance 2.5); generate grayscale codes for grayscale printers; use Type 5 NFC tags at least 35 mm in diameter; verify with Apple's printer calibration test sheets (color pairs and grayscale bars); for batches run small test prints and print the invocation URL and SVG filename beside each code.
- **Follow the legal requirements.** Only Apple-generated codes are approved; stop displaying a code when its App Clip is inactive; don't use the code, Apple logo, or App Clip mark in a company or product name; don't add symbols, seek trademark registration, or translate Apple trademarks.
</best_practices>

<specs>
| Item | Requirement |
|---|---|
| App Clip card image | 1800x1200 px PNG or JPEG, no transparency, no text |
| Card title / subtitle | 30 / 56 characters max |
| Printed code | minimum diameter 3/4 in (1.9 cm) |
| Digital code | minimum 256x256 px, PNG or SVG |
| NFC-integrated code | tag at least 35 mm in diameter; a 35 mm tag needs a printed code at least 1.37 in (3.48 cm) |
| Distance to code size | 20:1 max, 10:1 preferred |
| Cylinder placement | code width at most 1/6 of circumference |
| Print resolution | 600 ppi raster, 300 dpi print |
| Notifications | up to 8 hours after launch without extended permission |
</specs>

<platform_considerations>
- **iOS, iPadOS:** only supported platforms.
</platform_considerations>

<anti_patterns>
- Don't use App Clips solely for marketing and don't display ads in them.
- Avoid web views in an App Clip.
- Don't require the full app to complete the task, demo, or level.
- Don't ask people to install the app repeatedly, mid-task, or via push notification.
- Don't rely on data stored on the device between launches.
- Don't create your own code design, modify a generated code, apply filters, colors, glows, shadows, gradients, or reflections, or change its aspect ratio or stroke widths when scaling.
- Don't print codes on deformable materials or glossy finishes.
</anti_patterns>
</topic>

<topic name="Apple Pay" source="https://developer.apple.com/design/human-interface-guidelines/apple-pay" updated="2026-06-08">
Apple Pay pays for physical goods, services, donations, and subscriptions in apps and any browser through a system payment sheet authorized with Face ID, Touch ID, Optic ID, or a double-click on Apple Watch (2026 refresh of appearance and capabilities). Use In-app purchase, not Apple Pay, for virtual goods and digital-content subscriptions.

<when_to_use>
- Use Apple Pay for groceries, clothing, appliances, club memberships, hotel reservations, event tickets, and donations (approved nonprofits only).
- Use In-app purchase for premium content, digital goods, and digital-content subscriptions.
- Supported on iOS, iPadOS, macOS, visionOS, watchOS, and web browsers (2025 clarification), where people can also pay with a nearby iPhone or Apple Watch or by scanning a code; not supported in tvOS.
</when_to_use>

<best_practices>
- **Offer Apple Pay on every device and browser that supports it, and don't present it where unsupported** (`PKPaymentAuthorizationController`, `applePayCapabilities`).
- **Make Apple Pay the primary (not necessarily sole) payment option when the APIs report an active card in Wallet.** Pre-select it; never separate it into a different step or flow.
- **Use Apple Pay buttons only to initiate payment or, when appropriate, setup.** A tap on a device without Apple Pay set up offers setup; no other uses.
- **A custom button that starts Apple Pay must not display "Apple Pay" or the logo**, and the same page must show the Apple Pay mark or reference Apple Pay in text.
- **Use the Apple Pay mark only to say you accept Apple Pay.** It never facilitates payment or looks like a button; a separate custom button matching your design may initiate payment when the mark marks the selected method.
- **Don't hide an Apple Pay button or make it appear unavailable.** If a size or color is missing, point out the problem gracefully after the tap.
- **Tell search engines you accept Apple Pay** via semantic markup. Every website offering Apple Pay must include a privacy statement and follow the acceptable use guidelines.
- **Provide a cohesive checkout.** Keep your branding; avoid opening different pages or windows (on the web new windows feel like a handoff to another site).
- **If Apple Pay is available, assume people want it.** Show it first, larger, or separated by a line.
- **Put Apple Pay buttons on product detail pages** for single-item purchases (excluding cart contents; remove the item from the cart afterward) and offer express checkout for whole carts with one shipping method and destination.
- **Support coupons and promo codes in the payment sheet**, especially in express checkout; show an active code on the sheet to reassure people.
- **Collect required options (color, size) and optional data (gift messages, delivery instructions) before the button**, or after purchase; highlight and auto-navigate to missing fields.
- **Gather multiple shipping methods or destinations before the sheet**, which allows one method and destination per order. For in-store pickup choose the location first, show its address read-only on the sheet, and consider a pickup window (`PKDateComponentsRange`).
- **Prefer checkout information from Apple Pay** over stored contact, shipping, and payment data; assume it's complete and current.
- **Avoid requiring account creation before purchase.** Offer registration on the confirmation page, prepopulated from checkout.
- **Report transaction results in the payment sheet**, then show an order confirmation with shipping timing and status. If listing Apple Pay, show it after the last four digits or as a note: "1234 (Apple Pay)" or "Paid with Apple Pay".
- **Only present and request essential information on the sheet.** No shipping address for an electronically delivered gift card.
- **Let people choose the shipping method on the sheet** with a clear description, cost, and optional delivery or pickup date range using calendar and time-zone support.
- **Use line items for additional charges, discounts, pending costs, add-on donations, recurring and future payments** (label, cost, optional frequency); never as an itemized product list. Keep each on one line.
- **Write "Pay [Business_Name]" on the total line** using the name on card statements; intermediaries write "Pay [End_Merchant (via Your_Business)]".
- **Disclose costs that may accrue after authorization** (ride distance, later tips) with a clear explanation and an Amount Pending subtotal where regulations allow; reflect preauthorized amounts accurately.
- **Defer to the payment sheet for progress information**; extra spinners confuse.
- **Validate early and message clearly.** Before authorization only card type and a redacted shipping address are available, so validate what you can and always report post-authorization failures. Use noun phrases in sentence case, no ending punctuation, 128 characters or fewer: "Zip code doesn't match city", "Shipping not available for this state". Send the correct `PKPaymentError` status code. Ignore extra Zip+4 digits and accept phone numbers in multiple formats.
- **Handle interruptions.** On cancellation or timeout cancel any in-progress payment; people restart by tapping the button again.
- **Subscriptions:** clarify billing frequency and terms before the sheet; add line items for frequency, discounts, upfront fees, the trial amount (including $0), the regular amount after the trial, and the date regular billing begins; clarify the amount billed now in the total; if nothing is due now, disclose when billing occurs; show the sheet on a plan change only when it adds fees; treat the billing agreement field as a concise plain-language summary or leave it blank.
- **Donations:** show a line item like "Donation $50.00"; offer predefined amounts such as $25, $50, $100 plus Other Amount.
- **Always use the Apple-provided button APIs** (`PKPaymentButtonType`, `PKPaymentButtonStyle`, `WKInterfacePaymentButton`, Apple Pay on the Web): approved captions, fonts, colors, proportional scaling, automatic localization, corner radius customization, built-in VoiceOver text. Never create or replicate button designs.
- **Pick the button type that matches your flow.** Types: plain Apple Pay (smaller minimum width, no call to action; also the automatic fallback when a translated title doesn't fit or the OS lacks the type), Buy, Pay (bills and invoices), Check Out and Continue (matching other buttons with that text), Book, Donate (approved nonprofits), Subscribe, Reload, Add Money, Top Up, Order, Rent, Support, Contribute, Tip, and Set Up Apple Pay (shown in Settings, a profile, or an interstitial; no automatic replacement). In some contexts the button shows the default card image.
- **Use the automatic style or choose deliberately:** Black on white or light backgrounds with sufficient contrast (never on dark); White with outline on white or light backgrounds lacking contrast (never on dark or saturated); White on dark backgrounds with sufficient contrast.
- **Display the button prominently.** No smaller than other payment buttons; no scrolling to reach it; to the right of Add to Cart side by side, above it when stacked; adjust corner radius (square to capsule) to match other buttons; respect minimum size and margins because titles vary by locale.
- **Apple Pay mark:** use only Apple's artwork, altering nothing but height, which must equal or exceed other payment brand marks; keep clear space of 1/10 of its height; don't let it share a border with another graphic or button.
- **Provide a website icon** at 60x60 pt (120x120 px @2x, 180x180 px @3x) for reassurance during Handoff authorization and for subscriptions shown in Wallet.
- **Refer to Apple Pay correctly.** Two words, capital A and P, never plural, possessive, or translated; use ® on first body-text mention in the US but not in checkout selection; coordinate font with your app rather than mimicking Apple typography; all-uppercase only for an established all-caps style; follow App Store marketing guidelines. Text-only "Apple Pay" in a payment selector is allowed only when every option is text-only; if any option shows a logo, use the mark.
</best_practices>

<specs>
| Button | Minimum width | Minimum height | Minimum margins |
|---|---|---|---|
| Apple Pay (plain) | 100 pt (100 px @1x, 200 px @2x) | 30 pt (30 px @1x, 60 px @2x) | 1/10 of button height |
| Book, Buy, Check Out, Donate, Set Up, Subscribe with Apple Pay | 140 pt (140 px @1x, 280 px @2x) | 30 pt (30 px @1x, 60 px @2x) | 1/10 of button height |

Apple Pay mark clear space: 1/10 of its height. Website icon: 60x60 pt (120 px @2x, 180 px @3x). Error messages: 128 characters or fewer.
</specs>

<anti_patterns>
- Don't present Apple Pay on unsupported devices.
- Don't separate Apple Pay into a different step or flow.
- Don't use Apple Pay buttons for anything but payment or setup.
- Don't hide the button or dim it as unavailable.
- Don't use the mark as a button, change its width, corner radius, or aspect ratio, add ™, remove its border, add shadows, glows, or reflections, or flip, rotate, or animate it.
- Don't open new pages or windows during checkout.
- Don't use line items as an itemized product list.
- Don't add spinners over the payment sheet.
- Don't force compliance with rigid business logic in validation.
- Don't write "ApplePay", use the Apple logo for the word Apple, or write "APPLE PAY" outside all-caps layouts.
</anti_patterns>
</topic>

<topic name="Augmented reality" source="https://developer.apple.com/design/human-interface-guidelines/augmented-reality" updated="undated">
AR (ARKit) superimposes 3D virtual objects on the live camera view so they appear to inhabit the physical world. Offer AR only on capable devices and design for immersion, comfort, and safety; the page's guidance targets iOS and iPadOS.

<when_to_use>
- If AR is the app's primary purpose, make the app available only to ARKit-capable devices.
- If AR is optional or needs specific capabilities, simply don't offer the feature on unsupported devices; never show an error.
- Prefer direct manipulation of objects; use indirect 2D screen-space controls when people are moving around or need persistent controls.
</when_to_use>

<best_practices>
- **Let people use the entire display.** Avoid cluttering the camera view with controls and information.
- **Strive for convincing illusions.** Lifelike textures, correct scale on detected surfaces, environmental lighting, camera grain, top-down diffuse shadows; update scenes 60 times per second so objects don't jump or flicker.
- **Prefer small or coarse reflective surfaces**, because ARKit reflections are approximations.
- **Use audio and haptics** to confirm contact between objects and surfaces; background music helps envelop people.
- **Minimize text in the environment.** Put necessary information or controls in screen space, fixed in place, with translucency so they don't block the scene (as Measure does), positioned so people needn't shift their grip.
- **Communicate environment requirements up front** (room to move, flat surfaces) and consider feature sets for different environments.
- **Be mindful of comfort and safety.** Place objects at distances that reduce device movement, keep game levels short with downtime, introduce motion gradually, and avoid encouraging rapid, sweeping, or expansive movements.
- **Use the system coaching view** (`ARCoachingOverlayView`) for initialization and relocalization; hide unrelated UI while it's showing; model any custom coaching on it.
- **Show when to locate a surface and place an object** with an indicator aligned to the detected plane; integrate placed objects immediately, then subtly refine (nudge back onto the surface via `ARTrackedRaycast`) once detection completes.
- **Guide people to offscreen objects** with edge indicators or audio cues.
- **Use plane classification** (floor for furniture, table for a game board) to constrain placement.
- **Use standard gestures:** single-finger drag to move, two-finger rotation to spin; limit movement to the resting surface and rotation to one axis; respond to gestures near small, thin, or distant objects; test similar gestures (pinch vs. rotate) for conflicts.
- **Support scaling only when it makes sense** (imaginary environments, not furniture shopping); never use scaling to fake distance.
- **Keep object motion physically plausible and visible.** Objects stay attached to surfaces and don't jump, vanish, or reappear while resized, rotated, or moved. Explore motion and proximity too (a character turns to look as people approach).
- **Multiuser:** ARKit merges each participant's map; consider people occlusion; let newcomers join via implicit map merging unless the app needs everyone up front.
- **Reacting to real-world images and objects:** wait up to one second before fading out attached objects when a detected image disappears; keep 100 or fewer active reference images (swap sets by context, such as museum area via location services); limit tracked images to ones that move or carry small attachments.
- **Use approachable terminology.** "Unable to find a surface. Try moving to the side or repositioning your phone." not "Unable to find a plane. Adjust tracking."; "Tap a location to place the [object]." not "Tap a plane to anchor an object."; "Try turning on more lights and moving around." not "Insufficient features."; "Try moving your phone more slowly." not "Excessive motion detected."
- **Prefer 3D hints in 3D contexts** (a rotation indicator around the object); fall back to 2D text overlays only when people don't respond. Keep critical labels in screen space; 3D text must face people and use one type size regardless of distance.
- **Provide a visual affordance for more information** (tap for a detail view).
- **Handle interruptions with relocalization.** Use the coaching view to return the device to its prior pose, consider hiding placed objects until relocalized, embed non-AR tasks (changing upholstery) inside AR, and always allow cancel or reset because relocalization can continue indefinitely.
- **Indicate when face tracking is lost for more than about half a second**, with minimal text.
- **Let people reset the experience** and suggest fixes: insufficient features, try more light and moving around; excessive motion, try moving slower; slow surface detection, move around, add light, point at a textured surface.
- **Use the AR glyph only to launch ARKit experiences.** Alter only size and color; keep clear space of 10% of glyph height.
- **Use AR badges only to mark items viewable in AR** when the app mixes AR and non-AR items; prefer the full badge, glyph-only in constrained spaces; same corner of every photo, large enough to see but not occluding detail; 10% clear space; never recolor or alter.
</best_practices>

<platform_considerations>
- **visionOS:** with permission, ARKit detects surfaces, provides hand and finger positions for custom gestures, and incorporates nearby physical objects into immersive experiences.
- **macOS, tvOS, watchOS:** not supported.
</platform_considerations>

<anti_patterns>
- Don't show an error on unsupported devices; omit the feature.
- Avoid precisely aligning objects with detected surface edges (boundaries change).
- Don't use scaling to adjust distance.
- Avoid technical terms: ARKit, world detection, tracking, plane, anchor.
- Don't force people to wait for conditions to improve without a reset.
- Never alter the AR glyph or badges or use them with non-ARKit experiences; badging is redundant when every item supports AR.
</anti_patterns>
</topic>

<topic name="CareKit" source="https://developer.apple.com/design/human-interface-guidelines/carekit" updated="2023-05-02">
CareKit apps help people manage care plans (chronic illness, recovery, wellness goals) using CareKit UI prebuilt views and CareKit Store on-device data. Protect extremely sensitive data, use each view style for its intended purpose, and keep branding unobtrusive.

<best_practices>
- **Provide a coherent privacy policy URL** at submission; get permission before accessing device data and protect data from any source.
- **Request HealthKit access only when needed and in context** (weight when logging weight, not at launch), every time access is needed; add descriptive messages to the standard permission screen; manage sharing solely through Settings > Privacy.
- **Use motion data and photos only with permission** when useful for treatment (activity type, step count, pace, flights; periodic injury photos for the physician).
- **Incorporate ResearchKit** for surveys, tasks, charts, and its informed consent module when appropriate.
- **Use view categories as intended:** Tasks (medication, physical therapy, symptom logging), Charts (progress data), Contacts (phone, message, email, map link). Each view has a header (text, symbol, disclosure indicator, separator) and an optional vertical content stack; CareKit manages layout constraints.
- **Task information:** Title (required, "Ibuprofen"), Schedule (required, "Four times a day"), Instructions (optional), Group ID (optional, "medication" or "exercise").
- **Pick the task style by use case:** simple (one-step; header with title, subtitle, and button; checkmark fill or custom image on completion; no content stack), instructions (simple plus text like "Take on an empty stomach"), log (event logging with automatic timestamps), checklist (multistep list with per-item done buttons and instructional text), grid (compact multistep buttons with succinct titles; exposes its collection view for custom UI).
- **Use color to reinforce task meaning** (medications vs. activities) but never as the only signal.
- **Combine accuracy with simplicity.** Marketing name instead of chemical name; drop repeated words like "take"; supplement complex tasks with videos or images.
- **Charts (bar, scatter, line):** highlight narratives and trends (medication adherence vs. pain); short labels ("BPM" on the axis, not each point); distinct colors with sufficient contrast, not shades of one color; a legend when needed; explicit time units; consolidate large data sets; offset data so small values stay readable.
- **Contact views (simple, detailed):** consider color to categorize care team members.
- **Minimize notifications.** Coalesce multiple items; consider a notification detail view so people can mark tasks complete without opening the app.
- **Prefer CareKit-provided symbols**; in a grid view use SF Symbols for custom items (pill for medication, walking person for exercise); design care-relevant symbols, never decoration or corporate logos.
- **Incorporate refined, unobtrusive branding** through color and communication style; people don't want advertising in a care plan.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** only supported platforms.
</platform_considerations>

<anti_patterns>
- Avoid custom screens that replicate the standard health permission screen.
- Don't build in-app screens that affect health data flow.
- Avoid color as the only way to convey information.
- Avoid shades of one color for different chart meanings.
- Avoid purely decorative symbols or corporate logos as symbols.
</anti_patterns>
</topic>

<topic name="CarPlay" source="https://developer.apple.com/design/human-interface-guidelines/carplay" updated="2023-05-02">
CarPlay shows compatible iPhone apps on the car's built-in display using system-defined templates (audio, communication, navigation, fueling, and so on) so drivers complete tasks quickly with minimal interaction. The app supplies content; iOS renders it and handles touchscreens, knobs, and touch pads at any resolution.

<best_practices>
- **Eliminate iPhone interactions while CarPlay is active.** Any required setup happens on iPhone before the vehicle moves.
- **Never lock people out of CarPlay because iPhone needs input.** The app must work with iPhone in a bag or trunk; let people resolve problems after the vehicle stops.
- **Work without unlocking iPhone.** Most people use CarPlay with iPhone locked.
- **Let people choose when to start playback.** No autoplay unless the app plays a single audio source or resumes interrupted audio; don't start an audio session until ready to play, because it silences the car radio.
- **Start playback as soon as audio has sufficiently loaded.** The system keeps the selection highlighted with a spinning activity indicator until the app signals readiness.
- **Show the Now Playing screen when audio is ready**; load descriptive information in the background.
- **Resume only after resumable interruptions** (a phone call, yes; a Siri-initiated playlist is permanent), and only if audio was playing when it began.
- **Adjust relative audio levels but never the overall volume.**
- **Provide high-value information in a clean, scannable layout.** Consistent appearance for similar functions; primary content large and actionable; most important content and controls in the upper half of the screen.
- **Prefer a limited palette coordinated with the app logo.** Never share a color between interactive and noninteractive elements; test in a real car under varied lighting (night brightness, sunlight washout); support both light and dark appearances, which CarPlay may switch automatically; choose inclusive colors.
- **Supply @2x and @3x artwork** for landscape and portrait displays; mirror the iPhone app icon; don't use a black icon background (lighten it or add a border).
- **Report errors in CarPlay, only when necessary.** Never direct people to pick up iPhone to read or resolve an error.
</best_practices>

<specs>
| Common display (px) | Aspect ratio |
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
- Don't require iPhone interaction or unlocking while driving.
- Don't autoplay or open an audio session prematurely.
- Don't clutter the screen with nonessential details or embellishments.
- Don't use the same color for interactive and noninteractive elements.
- Don't use black icon backgrounds.
- Don't send people to iPhone for errors.
</anti_patterns>
</topic>

<topic name="Game Center" source="https://developer.apple.com/design/human-interface-guidelines/game-center" updated="2025-06-09">
Game Center is Apple's social gaming network (GameKit) for progress, friends, achievements, leaderboards, challenges (2025), and multiplayer activities (2025), surfaced across the system, the Apple Games app (2025), the App Store, and notifications. Initialize the player at launch and use the access point in menus.

<best_practices>
- **Check sign-in at launch and initialize the player** to maximize discovery (Top Played chart, friend recommendations).
- **Display the access point in menu screens** (main menu or settings) in any of the four corners, fixed. In iOS, iPadOS, and macOS it opens the Game Overlay (2025); in visionOS and tvOS the full-screen in-game dashboard.
- **Avoid placing controls near the access point.** It has collapsed and expanded forms, so check for overlap. In visionOS its location varies by game type (immersive or volume-based).
- **Consider pausing the game while the Game Overlay or dashboard is present.**
- **Custom UI may deep-link into the overlay or dashboard** (leaderboards, profile); use official artwork from Apple Design Resources unaltered, and correct terms: Game Center (not GameKit, GameCenter, game center; use the system translation), Game Center Profile (not Profile, Account, Player Info; localize Profile), Achievements (not Awards, Trophies, Medals), Leaderboards (not Rankings, Scores, Leaders), Challenges (not Competitions), Add Friends (not Add, Add Profiles, Include Friends).
- **Achievements:** map to the four states locked, in-progress, hidden, completed (the system groups Completed vs. Locked); upload in the desired display order (for example the common path through the game); title and description limited to two lines each, title-style capitalization for titles and sentence-style for descriptions; use progressive achievements for encouraging progress messages; unique, high-quality artwork per achievement (a placeholder appears otherwise), content centered for the circular mask.
- **Leaderboards:** classic (all-time best, never ends: perfect rhythm score, most coins in a run, longest endless run) or recurring (resets on an interval such as daily or weekly: rotating puzzles, seasonal events, battle modes); use leaderboard sets grouped by difficulty, activity type, or genre; a unique image per leaderboard; tvOS images are layered and animate on focus; keep primary content clear of set cropping and focus-effect edge cropping.
- **Challenges (2025):** built on leaderboards, time-limited, 1-5 minutes of individually completable, skill-based play (fastest lap, most enemies in a round, daily puzzle with fewest mistakes); track the most recent score, not overall progress or personal bests; deep-link to the exact mode or level from invitation links, the Game Overlay, or the Games app, and route first-timers through onboarding with UI explaining the game then jumps into the challenge; keep primary artwork out of the area covered by title and description; localize any text in artwork.
- **Multiplayer activities (2025):** use party codes (alphanumeric, typically eight characters like "2MP4-9CMF"); allow joining late, leaving early, and returning; show the current code in-game; allow manual code entry; support the Game Overlay and dashboard multiplayer UI (nearby, recent players, friends, contacts) or custom UI; provide activity preview artwork.
</best_practices>

<specs>
| Asset | Format | Size |
|---|---|---|
| Achievement (iOS, iPadOS, macOS, visionOS) | PNG, TIF, JPG; sRGB or P3; 72 DPI min | 512x512 pt (1024x1024 px @2x), mask diameter 512 pt |
| Achievement (tvOS) | same | 320x320 pt (640x640 px @2x), mask diameter 200 pt |
| Leaderboard (iOS, iPadOS, macOS) | JPEG, JPG, PNG; sRGB or P3; 72 DPI min | 512x512 pt (1024x1024 px @2x), cropped area 512x312 pt (1024x624 px @2x) |
| Leaderboard (tvOS) | PNG, TIF, JPG | 659x371 pt (1318x742 px @2x); focused 618x348 pt (1236x696 px); unfocused 548x309 pt (1096x618 px) |
| Challenge and multiplayer activity | JPEG, JPG, PNG | 1920x1080 pt (3840x2160 px @2x), cropped area 1465x767 pt (2930x1534 px @2x) |
| tvOS dashboard image | PNG, TIF, JPG | 600x180 pt (1200x360 px @2x); logo or word mark, not the app icon |
</specs>

<platform_considerations>
- **tvOS:** optional dashboard image at the top; leaderboard art is a focusable layered image set.
- **watchOS:** GameKit APIs exist but there is no system Game Center UI; content appears on the paired iPhone.
</platform_considerations>

<anti_patterns>
- Avoid showing the access point during gameplay, splash screens, cinematics, or tutorials.
- Don't reuse one asset for multiple achievements.
- Avoid challenges based on overall progress or personal bests.
- Don't adjust the dimensions or visual effects of Game Center artwork.
- Don't use the app icon as the tvOS dashboard image.
</anti_patterns>
</topic>

<topic name="Generative AI" source="https://developer.apple.com/design/human-interface-guidelines/generative-ai" updated="2026-06-08">
Generative AI uses machine learning models to create and transform text, images, and other content. Design responsibly: keep people in control, disclose AI use, protect privacy, minimize hallucinations, and (2026) let people refine results, give feedback during generation, and choose a model type that fits the feature.

<when_to_use>
- Offer generative features only where they provide clear, specific value (time savings, better communication, enhanced creativity).
- When AI is complementary rather than essential, provide a non-AI fallback (regular emoji alongside Genmoji; notifications readable without Apple Intelligence summaries).
- Model type (2026): on-device models keep information on the device, respond quickly, and work offline; server-based models suit features needing more processing power or larger context, always weighing privacy against capability and performance. The Foundation Models framework requires a compatible device with Apple Intelligence on; some model types may be unavailable due to device, network, or battery.
</when_to_use>

<best_practices>
- **Design responsibly.** Small input changes (or the same input twice) produce different outcomes, and requests can't all be anticipated; orient the process around inclusive, careful, privacy-protecting experiences.
- **Keep people in control.** Honor in-scope requests with clear expected output, handle sensitive content carefully, let people dismiss unwanted content and revert or retry transformations, and clearly identify when and where AI is used.
- **Ensure an inclusive experience.** Ask for the information a feature needs (when generating images or descriptions of people) instead of inferring personal or cultural characteristics; seek clarity before assumptions about gender identity or relationship types; test across diverse people.
- **Communicate where the app uses AI.** Never trick people into thinking they interact with or view human-authored content; align disclosure with regional regulation.
- **Set clear expectations about capabilities and limits.** A brief tutorial on introduction; curated suggestions for open-ended search bars or prompts; state known limitations up front, show how to get good results, explain inferior results.
- **Choose a model type that fits the feature and protects privacy (2026).** For server processing: process locally as much as possible, minimize what's shared, tell people data may go to a server, show what's shared, explain off-device storage and training use.
- **Ask permission before using personal information and usage data.** Use the minimum, offer a clear opt-out, get explicit permission for model improvement or storage, understand third parties' privacy, remember outputs can contain sensitive data, and follow stricter kids-app rules.
- **Disclose clearly how the app and model use and store personal data**, including whether it trains on it; explain benefits concisely and specifically when asking.
- **Evaluate model capabilities early and hands-on.** General-knowledge and task-specific models differ.
- **Choose datasets intentionally.** Diverse representation, known provenance, proper licenses, appropriate choices for people's data, and time to test for bias and misinformation.
- **Guide inputs.** Offer diverse predefined example inputs that hint at what's possible.
- **Raise awareness of and minimize hallucinations.** State that AI content may contain errors; scope requests narrowly; don't request facts unless the model has verified, current information; never use generated content where a hallucination could misinform and harm.
- **Get permission before irreversible or problematic tasks.** Don't automate destructive actions (deleting photos) or hard-to-undo ones (making a purchase); confirm significant actions; follow model usage policies and government AI policy per locale.
- **Make it easy to refine or revert results and acknowledge corrections (2026).** Surface Edit, Undo, Retry, or Adjust near generated content and give a clear signal when an adjustment takes effect.
- **Help people improve blocked or undesirable requests.** Coach toward success (Image Playground says "Unable to use that description"); offer example requests.
- **Reduce unexpected and harmful outcomes through testing.** Try out-of-scope, unrelated, poorly phrased, vague, ambiguous, personal, sensitive, controversial, and adversarial requests; devise policies and iterate.
- **Strive to avoid replicating copyrighted content.** Build on models with protections, curate inputs (a set of pre-approved prompts), and instruct the model to avoid mimicking certain content or styles.
- **Factor processing time into the design.** Generative models have higher latency than real-time models like Vision or ARKit body tracking; design a loading experience or generate in the background.
- **Give specific, reassuring feedback during generation (2026).** "Finding substitutions for ingredients" or "Summarizing key themes from your notes" beats "Processing…"; on failure, describe what happened in plain language with a clear next step.
- **Consider alternate versions of results** so people can choose among meaningfully different outputs (Image Playground offers multiple images of a person).
- **Improve the model over time.** Update blocked-word lists independently of releases; plan fine-tuning, retesting, and prompt engineering for newer base models; retrain with more data; test all updates.
- **Let people share feedback on outputs.** Voluntary, non-interrupting, clearly placed; quick thumbs-up and thumbs-down plus a detailed path for complicated issues; take it seriously and resolve issues quickly.
- **Design flexible features.** Separate the model from the experience so models can be swapped as capabilities evolve.
</best_practices>

<anti_patterns>
- Never present AI output or interaction as human-authored.
- Avoid requesting factual information the model can't verify.
- Avoid AI content where hallucinations could misinform and harm.
- Avoid automating destructive or hard-to-undo actions.
- Don't make feedback mandatory or interruptive.
- Don't show vague status like "Processing…" when a specific message is possible.
</anti_patterns>
</topic>

<topic name="HealthKit" source="https://developer.apple.com/design/human-interface-guidelines/healthkit" updated="undated">
HealthKit is the central repository for health and fitness data in iOS, iPadOS, and watchOS. Request access only for genuine health or fitness functionality, only in context, and use Activity rings and the Apple Health icon exactly as specified.

<best_practices>
- **Don't request private health data if the app doesn't provide health and fitness functionality.** A nutrition app may read weight and activity to set calorie goals and write logged calories back.
- **Provide a coherent privacy policy URL** at submission and show clearly how data is used.
- **Request access only when needed and in context** (weight when logging weight, not at launch), and make the request every time the app needs access because permissions can change.
- **Add descriptive messages to the standard permission screen** explaining why and how people benefit; never add custom screens that replicate it.
- **Manage sharing solely through Settings > Privacy**; no in-app screens that affect health data flow.
- **Activity rings (`HKActivityRingView`):** only for Move, Exercise, and Stand progress of a single, clearly identified person (label, photo, or avatar); never for other data, ornamentation, labels, backgrounds, branding, the app icon, or marketing; never change ring or background appearance with filters, colors, or opacity, and scale them appropriately; keep an outer margin no less than the distance between rings; enclose in a circle by adjusting the enclosing view's corner radius rather than masking; separate other ring-like elements with padding, lines, labels, color, or scale; never show rings in notifications and don't repeat the system's Move, Exercise, Stand updates, only app-specific references.
- **Apple Health icon:** use only Apple's artwork; show the name Apple Health nearby; make it no smaller than other app icons in a row; never a button; no masks, corner changes, circles, borders, overlays, gradients, shadows, or effects; clear space of 1/10 of its height; never composite onto another graphic; never within text or as a substitute for "Health", "Apple Health", or "HealthKit"; never show Health app images or screenshots.
- **Editorial:** say "Apple Health" or "the Apple Health app" ("works with the Apple Health app", "uses data from the Apple Health app"); never "HealthKit" in user-facing text; two capitalized words, all-caps only for an all-caps style; use the system translation of Health.
</best_practices>

<platform_considerations>
- **macOS, tvOS, visionOS:** not supported.
</platform_considerations>

<anti_patterns>
- Don't request health data without a health or fitness purpose.
- Don't replicate the permission screen or manage sharing in-app.
- Don't replicate, recolor, or repurpose Activity rings, or show them for multiple people.
- Don't use the Apple Health icon as a button or alter it.
- Don't use the term HealthKit with people.
</anti_patterns>
</topic>

<topic name="HomeKit" source="https://developer.apple.com/design/human-interface-guidelines/homekit" updated="2023-05-02">
HomeKit lets people control connected home accessories with Siri or the Home app on iPhone, iPad, Apple Watch, and Mac. Use HomeKit's object model and vocabulary, the system setup flow, and Home app settings as the source of truth.

<best_practices>
- **Use HomeKit terminology and hierarchy.** Home (root; people may have several), room (a name like Bedroom, no size or location), accessory (physical device; category is its type such as thermostat, fan, light, and a switch takes the category of what it controls), service (controllable feature, shown by descriptive names like "garage door opener" or "ceiling fan light", never the word "service"; Siri uses service names), characteristic (attribute like speed or brightness, never the word "characteristic"), service group ("reading lamps"), action (changing a characteristic), scene (group of actions; the API says "action set" but the UI always says "scene"), automation (triggered by location, time, another accessory, or a sensor), zone (multiple rooms, "upstairs").
- **Acknowledge the hierarchy even if the UI doesn't organize by room and zone**, so people can say "turn on the lights upstairs" or "It's dark in here".
- **Surface HomeKit details in an accessory detail view**, including room, zone, and home; don't bury them in settings.
- **Defer to Home app settings.** Never ask people to set up their home again or show duplicate settings.
- **Use the system-provided setup flow** (`performAccessorySetup`): naming, networks, pairing, room and service category assignment, favorites in a few steps. Then offer a custom post-setup experience for unique features (light scenes from photo colors).
- **Provide a purpose string for Home data**, such as "Lets you control this accessory with the Apple Home app and Siri across your Apple devices."
- **Don't require accounts or personal information.** Make cloud accounts optional and offer them after HomeKit setup.
- **Honor setup choices.** Don't force other platforms into the HomeKit setup flow.
- **Suggest service names that work with Siri**; never company names or model numbers. Enforce naming rules when people rename: alphanumeric, space, and apostrophe only; start and end with a letter or number; no emoji ("Reading lamp", "2nd garage door" work; "📚 lamp", "#2 garage door" don't); explain violations briefly and suggest alternatives. Detect location words in service names ("kitchen light") and offer to assign the room or zone instead.
- **Teach Siri commands.** After setup show example phrases using the chosen service name; later teach complex commands in context ("You can say 'Hey Siri, set Movie Time.'"). Siri resolves services, categories, rooms, zones, homes, service groups, scenes, and characteristics ("Make the living room a little bit brighter", "Did I leave the garage door open?", "Is someone in the living room?").
- **Recommend zones and service groups** when they suit the accessory ("upstairs", "media center").
- **Offer shortcuts only for functionality HomeKit doesn't support** ("Order AC filters"); explain the difference between HomeKit voice control and shortcuts; never encourage a shortcut for a scene or action HomeKit already handles.
- **Be clear about what your app does versus the Home app.** Guide people to build a scene with your accessory (dim the lights), then suggest opening the Home app to add shades and TV.
- **Defer to the HomeKit database on conflicts**, showing both values side by side to confirm; ask permission or intent before writing changes, and never overwrite HomeKit settings without explicit direction.
- **Cameras:** don't cover camera images (alerts may supplement them); show a microphone button only for bidirectional audio.
- **Icons:** use only Apple's HomeKit and Apple Home icons; black on light, white on dark, or custom color to match other technology icons, in the same shapes; the HomeKit icon is noninteractive (the Home app icon may open the app's App Store product page); never within text or as a replacement for the word; pair the name below or beside in the layout font.
- **Referring:** emphasize your app over HomeKit; "HomeKit" and "Apple Home" capitalized as shown, all-caps only for all-caps layouts; never translate; singular, never possessive; no category descriptors (say iPad, not tablet; "from your iPhone or iPad", not "from your iOS devices"); no implied sponsorship or endorsement; credit lines in legal text; devices and OS names only in specs. Use "works with", "use", "supports", "compatible" ("[Brand] lightbulbs work with HomeKit", "Compatible with Apple HomeKit"); not "HomeKit lightbulbs" or "HomeKit-enabled thermostat"; not "HomeKit unlocked the back door" (say "Back door is unlocked with HomeKit"); "Open HomeKit settings" is fine; first mention "the Apple Home app", then "the Home app", never "Open Home".
</best_practices>

<anti_patterns>
- Don't present duplicate home settings or re-run setup.
- Don't require an account before HomeKit setup.
- Never suggest company names or model numbers as service names.
- Don't offer shortcuts that duplicate HomeKit functionality.
- Never overwrite the HomeKit database without explicit direction.
- Don't block camera images or show a nonfunctional microphone button.
- Don't use the HomeKit icon in buttons, in text, or the name as a descriptor.
</anti_patterns>
</topic>

<topic name="iCloud" source="https://developer.apple.com/design/human-interface-guidelines/icloud" updated="2025-06-09">
iCloud gives people the latest version of their content on every device without explicit syncing; transparency is fundamental. Make iCloud automatic, respect its cost, and resolve conflicts early.

<best_practices>
- **Make iCloud automatic.** People turn it on in Settings and expect apps to work; if a choice is warranted, offer one all-or-nothing option the first time the app opens.
- **Avoid asking which documents to keep in iCloud.** Perform file management automatically.
- **Keep content up to date, balancing storage and bandwidth.** For very large documents let people control downloads, indicate when a newer version exists, and show subtle feedback for downloads over a few seconds.
- **Respect iCloud storage.** Store only content people create and understand, not resources or regenerable content; be picky about the Documents folder because backups include it even without iCloud support.
- **Behave appropriately when iCloud is unavailable.** No alert when it's off or in Airplane Mode; optionally note unobtrusively that changes won't reach other devices yet.
- **Keep app state in iCloud** (last page read) but only settings people want on all devices.
- **Warn before deleting**, since deletion removes the document from iCloud and all devices; ask for confirmation.
- **Resolve conflicts promptly.** Automatically when possible, otherwise an unobtrusive notification that makes versions easy to distinguish, as early as possible.
- **Include iCloud content in search results.**
- **For games, save progress in iCloud (2025)** with the GameSave framework, which syncs saves and provides built-in alerts for offline play and conflicts (or custom UI on its data).
</best_practices>

<anti_patterns>
- Don't ask people to manage individual documents' iCloud storage.
- Don't store regenerable resources in iCloud.
- Don't alert when iCloud is unavailable.
- Don't delete synced documents without a warning and confirmation.
</anti_patterns>
</topic>

<topic name="ID Verifier" source="https://developer.apple.com/design/human-interface-guidelines/id-verifier" updated="2023-09-12">
ID Verifier (iOS 17 and later) lets an iPhone app read ISO 18013-5 mobile IDs in person without external hardware, so customers present only the minimum data without handing over a card or device. Choose Display Only unless a legal requirement demands storing data.

<when_to_use>
- Use a Display Only request to show name or age beside the portrait in system UI on the requester's iPhone for visual confirmation; data never reaches your app.
- Use a Data Transfer request only with a legal verification requirement to store or process address or birth date; it needs an additional entitlement.
</when_to_use>

<best_practices>
- **Ask only for the data you need.** For minimum-age checks use an age threshold (`ageAtLeast`), not the current age or birth date.
- **Register with Apple Business Register if eligible** so your official organization name and logo appear in the customer's verification UI.
- **Provide a button that starts verification**, labeled Verify Age (simple age check, such as venue entry) or Verify Identity (detailed request, such as car rental pickup); no NFC or QR symbols; never the Apple logo.
- **In Display Only requests, let the operator record the visual match** with buttons like Matches Person and Doesn't Match Person so the response carries an approved or rejected value.
</best_practices>

<platform_considerations>
- **iOS:** only supported platform.
</platform_considerations>

<anti_patterns>
- Avoid requesting current age or birth date for an age gate.
- Avoid communication-type symbols or the Apple logo in the button.
</anti_patterns>
</topic>

<topic name="iMessage apps and stickers" source="https://developer.apple.com/design/human-interface-guidelines/imessage-apps-and-stickers" updated="2023-05-02">
iMessage apps help people share content, collaborate, and play games inside a Messages conversation; sticker packs decorate conversations and appear in Messages and FaceTime effects. Offer one primary experience with the essentials in the compact view.

<best_practices>
- **Prefer one primary experience per iMessage app.** People are mid-conversation; create separate apps for different functionality or content collections.
- **Surface content from the iOS or iPadOS app** (shopping list, trip itinerary) or support simple collaborative tasks (choosing a restaurant or movie).
- **Present essential features in the compact view** below the transcript; reserve more for the expanded view.
- **Let people edit text only in the expanded view**, because the compact view is roughly keyboard-sized.
- **Create expressive, inclusive, versatile stickers** legible on many backgrounds and when rotated or scaled; use transparency to integrate with text, photos, and other stickers.
- **Provide a localized alternative description for each sticker** for VoiceOver.
- **Pick one sticker size per pack**; don't mix sizes.
</best_practices>

<specs>
| Icon usage | @2x px | @3x px |
|---|---|---|
| Messages, notifications | 148x110, 143x100, 120x90, 64x48, 54x40 | 180x135, 96x72, 81x60 |
| Settings | 58x58 | 87x87 |
| App Store | 1024x1024 | 1024x1024 |

Supply square-cornered icons; the system rounds them.

| Sticker size | @3x px |
|---|---|
| Small | 300x300 |
| Regular | 408x408 |
| Large | 618x618 |

Sticker files 500 KB or smaller; the system downscales @2x and @1x. PNG (8-bit transparency, no animation), APNG (8-bit, animated), GIF (single-color transparency, animated), JPEG (no transparency, no animation).
</specs>

<anti_patterns>
- Don't bundle multiple experiences in one iMessage app.
- Don't mix sticker sizes in one pack.
- Don't put text editing in the compact view.
</anti_patterns>
</topic>

<topic name="In-app purchase" source="https://developer.apple.com/design/human-interface-guidelines/in-app-purchase" updated="2023-09-12">
In-app purchase sells virtual goods (premium content, digital goods, subscriptions) inside the app via StoreKit, in four types: consumable, non-consumable, auto-renewable subscription, non-renewing subscription. Show total prices, use the system confirmation and management sheets, and make cancellation and restore easy.

<when_to_use>
- Use in-app purchase for virtual goods and digital subscriptions; use Apple Pay for physical goods, services, and donations.
- Use the Advanced Commerce API for exceptionally large, frequently updated catalogs from multiple creators, or subscriptions with optional add-on content as a single purchase.
- Offer limited free access before asking people to subscribe: freemium app, metered paywall, or free trial.
</when_to_use>

<best_practices>
- **Let people experience the app before purchasing.**
- **Design an integrated shopping experience** that mirrors the app's style.
- **Use simple, succinct product names and descriptions** that don't truncate or wrap.
- **Display the total billing price for every in-app purchase, regardless of type.**
- **Display the store only when people can pay** (`canMakePayments`); otherwise hide it or explain why (parental restrictions).
- **Use the default confirmation sheet**; never modify or replicate it.
- **Family Sharing (up to five additional family members):** mention it where people learn about content ("Family" or "Shareable" in names, on the sign-up screen); explain benefits and participation (Apple notifies existing subscribers and family members); tailor messaging for family members ("Your family subscription includes…").
- **Purchase help and refunds:** offer a custom help screen (missing purchases, FAQs, feedback, contact) that links to the system refund flow (`beginRefundRequest`); title the action "Refund" or "Request a Refund"; show product image, name, description, and purchase date for each recent purchase; offer alternatives (immediate fulfillment, a conciliatory item) while keeping refunds clearly available; no scrolling or extra screens to reach the refund button; never characterize Apple's refund policies (link to Apple's refund support page instead).
- **Subscriptions: call attention to benefits during onboarding** with a strong call to action and a clear terms summary; offer a range of content, service levels, and durations; prompt at relevant moments (nearing the monthly free limit) and from settings.
- **Encourage a new subscription only for non-subscribers**; offer sign-in so people don't pay twice across apps or the web.
- **Make signup effortless.** Short, distinguishable option names with price and duration; for an introductory price list it, its duration, and the standard price after; ask only for necessary information, deferring the rest.
- **The in-app sign-up screen must include:** subscription name, duration, and the content or services per period; the billing amount localized for each territory and currency; a way for existing subscribers to sign in or restore purchases; plus links to Terms of Service and Privacy Policy in the app and App Store metadata. Show billing totals most prominently and per-period breakdowns subordinately (as the Forest Explorer example does for monthly, biannual, annual).
- **Clearly describe free trials:** state the trial duration and the amount automatically billed when it ends.
- **Offer codes (iOS, iPadOS):** one-time use codes (unique, generated in App Store Connect; redeemable via redemption URL, in-app, or in the App Store) for small or restricted distribution; custom codes (NEWYEAR, SPRINGSALE; alphanumeric ASCII only; redeemable via URL or in-app, not in App Store account settings) for mass campaigns. Explain offer details succinctly; tell people how to redeem custom codes; add a "Redeem Code" button on the paywall, onboarding, or settings that opens the system redemption sheet (`presentOfferCodeRedeemSheet`, `offerCodeRedemption`); supply a promotional image (the app icon shows otherwise); welcome new subscribers immediately, including those who subscribed before first launch, and keep any required sign-in smooth.
- **Subscription management:** show summaries with the upcoming renewal date near the management option in settings or account (`Product.SubscriptionInfo`); prefer the system management UI (`showManageSubscriptions`); on cancellation consider a personalized offer or exit survey; complement with branded contextual offers (a popular premium tier, promotional discounts, offer codes to win back lapsed subscribers).
- **Always make it easy to cancel an auto-renewable subscription.** A deep or unrecognizable management action feels like obstruction.
</best_practices>

<platform_considerations>
- **watchOS:** show the same required sign-up information; clearly describe differences from other device versions without implying identical experiences ("90,000 maps" on the watch misleads); consider a modal sheet for the required information (its default Close button returns to free content) or a custom flow with Close or Cancel; make options easy to compare: one option per button locked up with its description, or a list of options followed by a button whose title updates with the chosen option.
- **tvOS:** help people sign up or authenticate by sending a code to another device instead of typing on Apple TV.
</platform_considerations>

<anti_patterns>
- Don't modify or replicate the system confirmation sheet.
- Don't show the store when payments aren't possible.
- Don't encourage subscribing to existing subscribers.
- Don't bury the cancel or refund actions.
- Don't speculate about Apple's refund policies.
- Don't use special or non-ASCII characters in custom codes.
</anti_patterns>
</topic>

<topic name="Live Photos" source="https://developer.apple.com/design/human-interface-guidelines/live-photos" updated="undated">
Live Photos capture audio and extra frames before and after a still; people press to bring them to life. Keep them intact, consistent with the system experience, and distinguishable from stills.

<best_practices>
- **Apply adjustments to all frames**, or offer conversion to a still.
- **Keep Live Photo content intact.** Never disassemble frames or audio for separate presentation.
- **Let people preview the entire Live Photo before sharing** and always offer sharing as a traditional photo.
- **Indicate download progress and when the photo is playable.**
- **Show a still representation where Live Photos aren't supported**; don't replicate the experience.
- **Make Live Photos distinguishable from stills** with a custom hint of movement (no built-in motion effect exists) or the system badge, with or without text, in the same corner on every photo. Never a playback button that reads as video.
</best_practices>

<platform_considerations>
- **visionOS:** people can view but not capture Live Photos.
- **watchOS:** not supported.
</platform_considerations>

<anti_patterns>
- Don't present frames or audio separately.
- Don't imitate the Live Photos experience in unsupported environments.
- Never show a video-style playback button.
</anti_patterns>
</topic>

<topic name="Mac Catalyst" source="https://developer.apple.com/design/human-interface-guidelines/mac-catalyst" updated="2023-05-02">
Mac Catalyst builds a Mac app from an iPad app. Go beyond displaying the iPad layout in a window: adopt macOS navigation, input, layout, and menu conventions.

<when_to_use>
- Good candidates already support drag and drop, keyboard navigation and shortcuts, multitasking (Split View, Slide Over, Picture in Picture), and multiple scenes (which become multiple windows).
- Unsuitable when essential features need gyroscope, accelerometer, rear camera, HealthKit, or ARKit, or the primary function is marking, handwriting, or navigation.
- iPad idiom (default "Scale Interface to Match iPad"): views and text scale to 77% (17 pt body becomes 13 pt) with minimal layout work. Mac idiom: 100% rendering, more Mac-like elements, better performance and lower power for graphics-heavy apps; best for text-, art-, or animation-heavy apps, at the cost of auditing layout, text, and images because unscaled views report different metrics.
</when_to_use>

<best_practices>
- **Automatic macOS support includes** pointer interactions, keyboard focus and navigation, window management, toolbars, rich text with copy, paste, and contextual editing menus, file management, menu bar menus, and app settings in the Settings app; split view, file browser, activity view, form sheet, contextual actions, and color picker take on Mac appearances.
- **When adopting the Mac idiom, audit the whole layout**, consider a separate asset catalog, adjust font sizes using text styles rather than fixed sizes (text renders at 100% and can look too large), and verify views and images at full detail.
- **Limit appearance customizations** to those macOS controls also support.
- **Replace a tab bar with a split view with a sidebar** (preferred; consistent across iPad and Mac, child items disclose in place) or a segmented control (flat hierarchies); list top-level items in the macOS View menu either way.
- **Offer Next and Previous buttons** in addition to swipe gestures for paging.
- **Input mapping:** tap to left or right click, touch and hold to click and hold, pan to click and drag; trackpad also maps pinch and rotate (both touches go to the view under the pointer).
- **Create a macOS version of the app icon** with the lifelike rendering style people expect on Mac while staying harmonious across platforms.
- **Use the wider screen:** split single columns into multiple columns, use regular-width and regular-height size classes and reflow side by side on resize, show inspectors beside content instead of popovers; move controls into the window toolbar and list their commands in the menu bar; adopt a top-down flow with important actions near the top; relocate buttons from side and bottom edges, which exist on iPad for reachability only.
- **Put every command in the menu bar** (`UIMenuBuilder`, `UICommand`, `UIKeyCommand` for shortcuts); pop-up and pull-down button menus and context menus convert automatically; add context menus to every object, as Mac users expect ("contextual menu" on Mac).
</best_practices>

<anti_patterns>
- Don't merely display the iPad layout in a macOS window.
- Avoid fixed font, view, or layout sizes.
- Don't keep a tab bar or edge-hugging buttons on Mac.
- Don't rely on gestures alone for paging.
</anti_patterns>
</topic>

<topic name="Machine learning" source="https://developer.apple.com/design/human-interface-guidelines/machine-learning" updated="2026-06-08">
Machine learning features use models to personalize experiences (curated feeds, trip itineraries, search suggestions). Because behavior depends on data, design by defining the feature's role and then applying the input and output patterns: explicit and implicit feedback, calibration, mistakes, corrections, multiple options, confidence, attribution, and limitations (2026 clarity edits).

<when_to_use>
Define the role first; it sets expectations for accuracy, feedback, and presentation:
- Critical (Face ID can't work without ML) vs. complementary (the keyboard works without QuickType): central features demand accurate, reliable results; secondary ones are forgiven.
- Private vs. public data: the more sensitive the data, the more serious an inaccurate result (a false doctor recommendation vs. a disliked artist); always protect privacy.
- Proactive (Siri Suggestions offering a shortcut unasked) vs. reactive (QuickType responding to typing): proactive results get less tolerance and may need more data.
- Visible (Image Playground adjustments and remixes) vs. invisible (News topic suggestions): invisible features struggle to convey reliability or collect feedback.
- Dynamic (improves as people interact; often uses calibration and feedback) vs. static (improves only with app updates).
- Use calibration only when the feature can't function without initial information; otherwise gather it through implicit or, possibly, explicit feedback.
- Prefer guided corrections (a list of alternatives, as in speech-to-text) over freeform ones (Photos auto-crop adjustment); combine when it makes sense.
</when_to_use>

<best_practices>
- **Explicit feedback: request it only when necessary and always voluntarily.** Favoriting and social reactions are implicit feedback, not app-specific requests.
- **Describe each option and its consequence in simple, direct language:** "Suggest less pop music", "Suggest more thrillers", "Mute politics for a week"; never vague terms like "dislike", which don't convey consequences and translate poorly. Add icons only to clarify, never alone.
- **Offer multiple, progressively specific options** so people can identify and remove unwanted suggestions.
- **Act immediately on explicit feedback and persist it** everywhere in the app; also use it to tune when and where results appear.
- **Implicit feedback: always secure the information and help people control it.** Explain how the app gets and shares behavior across apps and let people restrict the flow.
- **Don't let implicit feedback shrink exploration.** Suggestions that only reinforce current tastes help short-term and hurt long-term.
- **Combine multiple signals** (viewing, sharing, and adding a photo to an album doesn't prove liking it); withhold private or sensitive suggestions (shared devices and accounts); prioritize recent feedback (Face ID prioritizes recent facial input) with historical fallback.
- **Update predictions at the cadence people expect** (typing suggestions instantly; song recommendations not continuously, which feels rushed).
- **Expect implicit feedback to shift when the UI changes** (moving a button) and beware confirmation bias; never rely solely on implicit feedback.
- **Calibration: secure data, explain the benefit (what it does, not how), collect only essentials, and ask once**, early in the experience; the exception is calibrating with objects (each new baseball field).
- **Make calibration quick:** a few important items with the rest inferred; nothing people must look up; nothing difficult. Give an explicit goal and progress (Face ID's tick marks), assist immediately when progress stalls without implying fault or leaving people without a next step, confirm success with a clear path to the feature, allow cancel any time without judgment or follow-up messaging, and let people update or remove calibration data outside the flow.
- **Mistakes: anticipate them, help people handle them, and learn from them when doing so improves the app.** Match corrective tools to severity (an annoying keyboard suggestion vs. a route that misses a flight); make frequent or predictable mistakes easy to correct; keep updating with people's evolving interests and domain trends without extra work from them; address mistakes without complicating the UI (a wrong attribution magnifies the error); be especially careful in proactive features; watch that improving one area (dogs) doesn't degrade another (cats).
- **Corrections: give familiar, easy paths** by showing the steps the automation took (Photos highlights the auto-crop controls); provide immediate value and persist the update; let people correct their corrections; balance feature benefit against correction effort, or people abandon the feature; never rely on corrections to cover low-quality results; learn from corrections only when it raises quality.
- **Multiple options: prefer diverse options** (Maps offers no-tolls, scenic, and highway routes); avoid too many, fit them on one screen; list the most likely first (rank by validated confidence or context like time and location) and select it by default when appropriate; make options distinguishable with brief descriptions that highlight differences, or grouped categories for large sets; learn from selections without hurting the experience.
- **Confidence: verify that confidence values track result quality before showing them**; otherwise don't convey confidence. Translate into understood concepts ("Because you listen to pop music" beats "97% match"); use ranking or semantic categories ("high chance", "low chance"); show numeric values only where people expect statistics (weather, sports, polling); phrase as actionable suggestions ("This is a good time to buy", "Consider waiting for a better price"); vary presentation by threshold (Photos shows faces at high confidence and asks to confirm at lower); set a threshold below which proactive suggestions don't appear.
- **Attribution: explain the basis without explaining the model** ("Because you've read mysteries"); use it to distinguish options ("New books by authors you've read"), soften mistakes, build a mental model, and earn trust; avoid overly specific (feels like surveillance) or overly general (feels impersonal); keep it factual and objective ("Because you've read nonfiction", not "Because you love nonfiction"); avoid statistical jargon except for inherently statistical results.
- **Limitations: set realistic expectations** before use (in marketing or in context) for rare but serious limitations, and via attributions for minor ones; demonstrate how to get good results with placeholder text ("Photos, People, Places…"), live guidance (Memoji suggests better lighting or moving closer), and alternative suggestions instead of no results; explain why poor results occur (Memoji doesn't work well in the dark); tell people when a limitation is resolved so they revisit avoided interactions.
</best_practices>

<anti_patterns>
- Don't request explicit feedback when implicit feedback suffices, and never make it mandatory.
- Avoid imprecise feedback labels like "dislike" or icon-only options.
- Don't recommend based on private or sensitive implicit feedback.
- Avoid repeat calibration, information people must look up, or difficult actions; never blame people when progress stalls.
- Never rely on corrections to compensate for low-quality results.
- Don't show raw confidence numbers or technical jargon outside statistical domains, and don't show low-confidence proactive results.
- Don't provide attributions that imply judgment of emotions, preferences, or beliefs.
</anti_patterns>
</topic>

<topic name="Maps" source="https://developer.apple.com/design/human-interface-guidelines/maps" updated="2024-12-18">
A MapKit map shows outdoor or indoor geographic data with the same zoom, pan, and rotate behavior as the Maps app, plus annotations, overlays, routing, standard, satellite, or hybrid views, and place cards. Keep maps interactive, match your app's style, and keep the Apple logo and legal link visible.

<when_to_use>
- Default emphasis style (fully saturated) for standard maps and visual alignment with the Maps app; muted style (desaturated) when information-rich custom content must stand out.
- Overlay above roads (default; below buildings and trees) when people should sense what's beneath; above labels to fully abstract content or hide irrelevant areas.
- Place card styles: automatic (system picks by map size); callout as a popover next to the place, full (richest) or compact (space-saving), defaulting to automatic callout; caption (an "Open in Apple Maps" link); sheet. Full callout is a popover on iPadOS and macOS and a sheet on iOS. Websites can embed a map that shows a place card for one place by default.
</when_to_use>

<best_practices>
- **Make the map interactive**; noninteractive elements obscuring it break expectations.
- **Help people find places** with search plus category filters (clothing, housewares, electronics, jewelry, toys).
- **Clearly identify selections** with an outline and color variation.
- **Cluster overlapping points of interest** into a single pin that expands progressively on zoom.
- **Keep the Apple logo and legal link visible.** Temporary covering is fine; use about 7 pt padding on the sides and 10 pt above and below; keep them fixed to the map rather than moving with your UI; place them 10 pt above the lowest resting position of a pull-up card. They aren't shown on maps smaller than 200x100 px.
- **Match annotations to your visual style** (`MKAnnotationView`): change the default red tint and white pin to your colors, a logo, or an icon string of two to three characters.
- **Make standard map features (points of interest, territories, physical features) independently selectable** (`MKMapFeatureOptions`) with custom appearance and information.
- **Ensure contrast between custom controls and the map** with a thin stroke, light drop shadow, or blend modes.
- **Place cards in a map:** pick a style that fits (compact callout for small maps with many annotations); verify content on different devices and window sizes (set a minimum width for full callouts); avoid duplicating information the app already shows (prefer compact or caption); keep the selected location visible by offsetting the card and pointing it at the place.
- **Place cards outside a map** (search results, store locator) must include a map; use location cues such as place names, addresses, a details button, or a map pin icon so people know a card opens.
- **Indoor maps:** show rooms and buildings at all zoom levels and add detail progressively (terminals and gates, then stores and restrooms); differentiate features with color and icons; offer a concise floor picker (numbers, not names); include dimmed, distinctly colored surrounding streets and areas for context; route to nearby transit, parking, and to Apple Maps; limit scrolling so part of the venue stays visible, adjusting by zoom level; match your app's style, not Apple Maps (Indoor Mapping Data Format).
</best_practices>

<platform_considerations>
- **watchOS:** maps are static snapshots (`WKInterfaceMap`) placed at design time; tapping opens the Maps app; up to five annotations; fit the whole element on screen without scrolling and show the smallest region containing all points of interest.
</platform_considerations>

<anti_patterns>
- Don't obscure the map with noninteractive elements.
- Don't permanently cover the Apple logo and legal link or let them move with your interface.
- Don't duplicate information between the app and a place card.
- Don't replicate the appearance of Apple Maps in an indoor map.
- Don't let people scroll far outside the venue.
</anti_patterns>
</topic>

<topic name="NFC" source="https://developer.apple.com/design/human-interface-guidelines/nfc" updated="undated">
NFC lets iOS devices within a few centimeters read tags on real-world objects (toys, in-store signs, inventory). Use friendly language, the system scanning sheet in-app, and support background tag reading where available.

<best_practices>
- **Don't encourage physical contact.** Say "scan" and "hold near", not "tap" and "touch"; the device only needs proximity.
- **Use approachable terminology.** Avoid NFC, Core NFC, Near-field communication, tag. "Hold your iPhone near the [object name] to learn more about it." not "To use NFC scanning, tap your phone to the [object]."; "Scan the [object name]." not "Scan the NFC tag."
- **Provide succinct scanning-sheet text:** a complete sentence in sentence case with ending punctuation that identifies the object; first scan "Hold your iPhone near the [object name] to learn more about it.", subsequent scans "Now hold your iPhone near another [object name]."; keep it short to avoid truncation.
- **Support both background and in-app tag reading.** Background reading scans whenever the screen is lit and shows a notification that sends data to the app, but is unavailable while a scanning sheet is visible, Wallet or Apple Pay is in use, cameras are in use, in Airplane Mode, or after a restart before unlock; the app must still offer in-app scanning.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** only supported platforms.
</platform_considerations>

<anti_patterns>
- Don't say tap or touch.
- Don't use developer terms like NFC or tag in UI text.
- Don't rely on background reading alone.
</anti_patterns>
</topic>

<topic name="Photo editing" source="https://developer.apple.com/design/human-interface-guidelines/photo-editing" updated="undated">
Photo-editing extensions modify photos and videos inside the Photos app; edits save as new files, preserving originals. The extension runs in a modal view that already has a top toolbar whose dismissal confirms and saves, or cancels.

<best_practices>
- **Confirm cancellation of edits** and warn that edits will be lost; skip the confirmation when nothing has changed yet.
- **Don't provide a custom top toolbar**; the modal view already includes one, and a second one takes space from content.
- **Let people preview edits** before returning to Photos.
- **Use the app icon for the extension icon** so people trust its source.
</best_practices>

<platform_considerations>
- **iOS, iPadOS, macOS:** supported. **tvOS, visionOS, watchOS:** not supported.
</platform_considerations>

<anti_patterns>
- Don't discard changes immediately on Cancel.
- Don't add a second toolbar.
</anti_patterns>
</topic>

<topic name="ResearchKit" source="https://developer.apple.com/design/human-interface-guidelines/researchkit" updated="2023-09-12">
ResearchKit provides predesigned screens for medical research apps: onboarding (introduction, eligibility, informed consent, data permission), surveys, active tasks, a profile, and a dashboard. Keep onboarding in order and clear because people see it once.

<best_practices>
- **Display onboarding screens in order:** 1 Introduction, 2 Eligibility, 3 Informed consent, 4 Data permission.
- **Introduction:** describe the study's subject and purpose with a call to action; let existing participants log in and continue quickly.
- **Determine eligibility as soon as possible**, with only necessary requirements, plain language, and easy entry.
- **Ensure understanding before consent.** Break long consent forms into sections (data gathering, data use, benefits, risks, time commitment, withdrawal) with high-level overviews and Learn More detail; participants must be able to view the whole form; optionally quiz understanding for questions normally asked in person; after agreement collect signature and contact details following a confirmation dialog; most apps email a PDF copy. Comply with App Store consent requirements and review boards.
- **Request access to device data and notifications** only for data critical to the study, with clear reasons.
- **Surveys:** state question count and duration; one question per screen; show progress; keep surveys short (several short beats one long); standard font for questions and slightly smaller for explanations; tell participants when done.
- **Active tasks** (microphone, finger tapping, walking, memory tests): describe how in clear, simple language, explain timing or circumstances, and make completion obvious.
- **Provide a profile** for editable data (weight, sleep habits), upcoming activities, leaving the study, the consent document, and the privacy policy; and a **dashboard** for daily progress, weekly assessments, activity results, and comparisons with aggregated study results. Keep both accessible at all times.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** only supported platforms.
</platform_considerations>

<anti_patterns>
- Don't present eligibility requirements that aren't necessary.
- Don't request data that isn't critical to the study.
- Don't put multiple questions on one screen or run one long survey.
</anti_patterns>
</topic>

<topic name="SharePlay" source="https://developer.apple.com/design/human-interface-guidelines/shareplay" updated="2026-09-09">
SharePlay lets people do an app's activities together in real time from their own devices, synced by the system alongside FaceTime or Messages, starting from an in-app control, a FaceTime call, or a shared link (2026 reorganization with expanded visionOS and custom template guidance). Each participant needs their own copy or subscription for paid content; the system prompts those without access.

<when_to_use>
- Use SharePlay for activities people do together at the same moment; for asynchronous collaboration, offer a way to share or save the activity afterward (a Freeform board shared by link).
- One shared view for watching or browsing; per-role views for games where each player has a perspective.
- visionOS templates: side-by-side (watching content along a curve; less nonverbal interaction), surround (tabletop games; a circle around 3D or per-viewer content; encourages verbal and nonverbal interaction), conversational (people around a center point with content at the edge; for being together while the app plays music in the background), or a custom template when none fit.
</when_to_use>

<best_practices>
- **Design activities that work across Apple platforms**, devices, settings, and communication methods.
- **Make starting easy:** a recognizable button with the SharePlay symbol, plus the share sheet; in visionOS the Share button next to the window bar.
- **Let people join without friction.** Go straight to shared content; handle sign-in, downloads, or subscriptions in a view that dismisses when done; lower barriers with provisional access for nonsubscribers or Family Sharing; defer nonessential steps (profile setup after joining a match).
- **Describe activities clearly and briefly** in invitations (title, short summary, poster) to avoid truncation.
- **Keep people oriented as the activity changes.** The system coordinates media playback (one pause pauses all); for other changes show who did what (Freeform shows a participant's initials).
- **Use the term SharePlay correctly.** Noun ("Join SharePlay") or verb (a "SharePlay Movie" button); never with adjectives like virtual or spatial; never SharePlayed, SharePlays, SharePlaying.
- **visionOS shared context:** align windows and volumes so everyone sees content in the same relative location; position 3D objects, sounds, and interactions to reinforce being together.
- **Prefer starting from a window**, shareable via the Share button; immersive-space activities need custom start UI.
- **Resolve conflicts naturally.** Don't show take-control UI for single-user tools; let people speak or gesture; use a simple rule like last change wins.
- **Reserve unique views for moments that call for them.** Keep views and immersion in sync; when someone enters a personal immersive view, replace their spatial Persona with a contact photo and keep FaceTime Audio going.
- **Let people opt in to immersion changes mid-task.** If a change would interrupt someone, prompt them to join when ready; transition everyone else immediately.
- **Keep comfort settings (volume, subtitles) per participant.**
- **Make leaving and rejoining easy** with a clear rejoin control; a windowed version lets people multitask while staying connected.
- **Support people without a spatial Persona** (other devices, Persona off, windowed FaceTime); offer UI alternatives to facial expressions and gestures. Nearby Vision Pro wearers see each other through passthrough and share content in the same physical spot.
- **Templates:** divide complex activities into stages with a template each (choosing teams, then play); mix system and custom templates rather than one complex custom template; tie template transitions to explicit actions (choosing a team); keep transitions infrequent and low-movement, fade out and in, and add reorientation cues.
- **Custom templates (2026):** seats apply only to spatial Personas; guide physically present people with position markers because templates can't move them; control seat orientation (default faces content center); include five seats when possible (Apple Vision Pro supports up to five spatial Personas), define all seats up front, keep a seat after someone leaves, and add spectator seats for limited-player games; place seats at least a meter apart (a Persona too close to another becomes a contact photo); define fill order so partial groups stay balanced (left to right feels unbalanced); keep roles (player, spectator, team member, host) independent of seats and reserve a spot only when a role truly needs it (a host at the head of a table).
</best_practices>

<platform_considerations>
- **iOS, iPadOS, macOS:** support Picture in Picture for shared video; on Mac keep it playing in a window people can bring forward.
- **visionOS:** standard windows share by screen mirroring via the Share button; adopt SharePlay for volumetric windows and immersive content. Remote participants appear as spatial Personas (or contact photos); people on iPhone, iPad, Mac, or Apple TV appear in a 2D video window.
- **tvOS:** no additional considerations. **watchOS:** not supported.
</platform_considerations>

<anti_patterns>
- Don't show views unrelated to the activity when someone joins.
- Don't pair SharePlay with adjectives or alter the term.
- Don't show take-control UI for single-user tools.
- Don't pull people into immersion changes mid-task.
- Don't let one participant's comfort settings affect others.
- Don't add or remove seats as people come and go, or tie roles to seats.
</anti_patterns>
</topic>

<topic name="ShazamKit" source="https://developer.apple.com/design/human-interface-guidelines/shazamkit" updated="undated">
ShazamKit matches audio samples against the Shazam catalog or a custom catalog for features like genre-matched graphics, synced captions or sign language for accessibility, and syncing in-app experiences with external content. Microphone access requires a permission request with a clear reason.

<best_practices>
- **Stop recording as soon as possible.** People don't expect the microphone to stay on; record only as long as the sample needs.
- **Let people opt in to storing recognized songs in their iCloud library**, even though the Music Recognition control and Shazam app show your app as the source.
</best_practices>

<anti_patterns>
- Don't keep the microphone on after capturing the sample.
- Don't write songs to a person's library without approval.
</anti_patterns>
</topic>

<topic name="Sign in with Apple" source="https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple" updated="2022-09-14">
Sign in with Apple lets people use their Apple Account to sign up or sign in with Face ID, Touch ID, or Optic ID, built-in two-factor authentication, and an optional private relay email, on every platform including non-Apple ones. Delay sign-in, minimize data, and display the button prominently using the system API where possible.

<when_to_use>
- Ask people to sign in only in exchange for value (personalization, extra features, sync), and delay it as long as possible (a streaming app lets people browse before signing in).
- If an account is required, explain why, complete setup first, then offer Sign in with Apple and other methods.
- In commerce apps, wait until after purchase; with guest checkout and Apple Pay, offer account creation on the order confirmation page without re-asking for name or email.
- Offer account linking: suggest it when a shared email matches an existing account, or from account settings after a password sign-in.
</when_to_use>

<best_practices>
- **Welcome people to their new account immediately**; don't delay with non-required information.
- **Indicate when people are signed in** with a phrase like "Using Sign in with Apple" in settings or account UI.
- **Clarify whether additional data is required or recommended.** Legally or contractually required items (terms agreement, country or region, birth date, real-identity laws) must be explained as required; optional items need their benefit explained and must never gate access or features.
- **Don't ask for a password** unless people stopped using Sign in with Apple with your app or website.
- **Respect a private relay address.** Never ask for a personal email; let people view their relay address in-app, direct them to Settings > Apple Account > Password & Security > Apps using Apple Account, or identify them by order number or phone.
- **Ask for optional data after engagement** (a phone number for text updates, social info for playing with friends).
- **Be transparent:** welcome people by the name or email they shared so they see how it's used and where to find the relay address.
- **Prominently display the button**: no smaller than other sign-in buttons and visible without scrolling.
- **Use the system buttons** (`ASAuthorizationAppleIDButton`, `WKInterfaceAuthorizationAppleIDButton`, web JS): approved appearance, ideal proportions, automatic title translation, corner radius configuration (iOS, macOS, web), VoiceOver label. Titles: Sign in with Apple, Sign up with Apple, Continue with Apple (iOS, macOS, tvOS, web); watchOS offers only "Sign in". Use one variant consistently.
- **Choose the style by background:** White (all platforms; on dark backgrounds with sufficient contrast), White with outline (iOS, macOS, web; on white or light backgrounds lacking contrast; never on dark or saturated, where the outline adds clutter), Black (all platforms; on white or light backgrounds; never on black or dark). The watchOS black button uses a system dark gray fill to contrast with the pure black watch background.
- **Adjust the corner radius** (square to capsule) to match other buttons; respect minimum size and margin because titles vary by locale.
- **Custom buttons** (iOS, macOS, web; App Review evaluates them) must be instantly identifiable. Use only the Apple Design Resources logo files (PNG, SVG, PDF; black and white; padded): match logo file height to button height, don't crop, don't add vertical padding, never use the Apple logo alone as a button, never create a custom Apple logo. Keep fixed: titles (only the three official ones), rectangular shape for logo-plus-text (logo-only may be circular or rectangular), black or white logo and title colors. May change: title font, weight, and size; all-caps title; background texture or gradient (still black or white overall); corner radius; bezel stroke; shadow.
- **Logo-plus-text custom buttons:** use PNG logos only at 44 pt height (the iOS default and recommended height), vector formats at any height, with small, medium, and large logo sizes to match other sign-in buttons; prefer the system font with title size 43% of button height (button height 233% of font size, rounded); keep default capitalization ("Sign", "Continue", and "Apple" capitalized) unless the UI is all-caps; center the title vertically and match logo height to button height; inset the logo to align with other authentication logos; keep at least 8% of button width between the title and the right edge.
- **Logo-only custom buttons:** 1:1 aspect ratio with the built-in padding; PNG only at 44x44 pt; mask to a circle or rounded rectangle rather than cropping or adding padding; minimum margin 1/10 of height.
</best_practices>

<specs>
| Button | Minimum width | Minimum height | Minimum margin |
|---|---|---|---|
| System or custom logo-plus-text (iOS, macOS, web) | 140 pt (140 px @1x, 280 px @2x) | 30 pt (30 px @1x, 60 px @2x) | 1/10 of button height |
| Logo-only custom | 1:1 aspect ratio; 44x44 pt when using PNG | | 1/10 of button height |

Title proportion: font size 43% of button height; title-to-right-edge margin at least 8% of button width; PNG logo files only for 44 pt buttons.
</specs>

<anti_patterns>
- Don't force sign-in before people see value.
- Don't ask for a password or a personal email when a relay address was shared.
- Don't block features when optional data is declined.
- Don't hide the button below the fold or make it smaller than others.
- Don't use the outlined style on dark or saturated backgrounds, or black on dark.
- Don't invent an Apple logo, crop the logo file, use custom title colors, or change the title wording.
</anti_patterns>
</topic>

<topic name="Siri" source="https://developer.apple.com/design/human-interface-guidelines/siri" updated="2026-06-08">
Siri helps people find, know, and do things by voice, by swiping down from the Dynamic Island, or in the Siri app; Siri AI (2026) is powered by Apple Intelligence and can run app actions from anywhere, act on on-screen content ("Add this photo to my Landscapes album", "Make this black and white"), and reach deep features. Apps participate through the App Intents framework, app schemas, and App Shortcuts.

<when_to_use>
- Expose actions (intents) and content (entities) with App Intents so Siri, Spotlight, and the Shortcuts app can use them; the system has no awareness of an app otherwise.
- Adopt app schemas (2026) for common domains such as email, music, or photos to get built-in request handling, natural conversation, and deeper contextual understanding.
- Use App Shortcuts for custom actions outside existing schema domains (see the App Shortcuts page).
- Annotate on-screen views with entities so Siri understands references to on-screen content and controls; donate entities to the Spotlight index for search; donate actions people take so Siri can anticipate future ones (recent activity, items of interest).
- Add optional intent or entity properties (for example a playback control snippet) only to enhance schema responses; they may not appear in non-visual contexts.
</when_to_use>

<best_practices>
- **Identify the most popular actions and when and where they occur** (hands-free, a particular device) to prioritize intents and entities.
- **Use familiar terms for content and actions** (track, song, or podcast as people say it).
- **Offer relevant content to Spotlight**: recent searches, favorites, bookmarks, wishlists; whole catalogs only for categories like email or messaging.
- **Don't advertise** in Siri-delivered content: no ads, marketing, or in-app purchase pitches.
- **Provide custom responses only when built-in ones fall short.**
- **Write clear, descriptive dialogue** ("Which soup?" not "Which one?") and keep it succinct; remove details already in context; no filler or humor that irritates on repetition.
- **Provide responses Siri can deliver audibly and visually.** The voice response must stand alone (weather appears on iPhone; Siri speaks it on AirPods).
- **Design inclusive interactions**: "Who should I send it to?" rather than "What's his or her name?"
- **Ask an open-ended question when the option list is too long to read** ("What kind of shoes are you interested in?").
- **Keep responses device-independent** because requests start on one device and act on another.
- **Omit the app name** from responses; the system attributes it verbally and visually.
- **Use appropriate language and respect parental controls**; Siri may speak aloud where others hear.
- **Make errors specific**: "Sorry, we're out of chicken noodle soup" beats "Sorry, we can't complete your order."
- **Refer to Siri by name**, never she, him, or her.
- **Never impersonate Siri**, reproduce its functionality, or respond as Apple; don't use reserved phrases like "Call 911" or "Hey Siri".
- **Translate only "Hey" in "Hey Siri"**; Siri is never translated (Hej Siri for da_DK and sv_SE, Oye Siri for Spanish locales, Dis Siri for French, Ehi Siri for Italian, Hei Siri for Finnish and Norwegian, Hé Siri for nl_NL, Hé, Siri for nl_BE, E aí Siri for pt_BR, Hai Siri for ms_MY, привет Siri for ru_RU, Siri야 for ko_KR, หวัดดี Siri for th_TH, 嘿Siri for zh_CN, 喂 Siri for zh_HK, 嘿 Siri for zh_TW, يا Siri for Arabic; German, English, Japanese, and Turkish keep Hey Siri).
</best_practices>

<anti_patterns>
- Don't include ads or sales pitches in Siri content.
- Don't provide custom responses when defaults suffice.
- Don't include the app name, device-specific wording, gendered pronouns, or offensive language in dialogue.
- Don't impersonate Siri or use reserved phrases.
- Don't translate the word Siri.
</anti_patterns>
</topic>

<topic name="Tap to Pay on iPhone" source="https://developer.apple.com/design/human-interface-guidelines/tap-to-pay-on-iphone" updated="2025-01-17">
Tap to Pay on iPhone lets merchants accept contactless cards and digital wallets on iPhone without external hardware, working alongside existing accessories, through a payment service provider (PSP), the entitlement, and ProximityReader. Get terms accepted early, educate merchants, keep the option always available, and label it exactly.

<best_practices>
- **Help merchants accept terms and conditions before customer-facing flows**, from in-app messaging or onboarding; present terms only to an administrative user (tell nonadministrators that admin access is required, or let admins accept on the web or in another app); if the PSP requires a minimum iOS version, present terms only after the update.
- **Provide a tutorial** of supported payment types: in a Learn More option, automatically after accepting terms, automatically for new users, and always in help or settings. Use the `ProximityReaderDiscovery` pre-built, localized education experience or Apple-approved marketing assets. A custom tutorial must show launching checkout per payment type, positioning the card or wallet on the device, and PIN entry including accessibility mode; end with an option to accept terms.
- **Always offer Tap to Pay on iPhone as a checkout option, enabled or not.** Tapping it presents terms if needed and opens the Tap to Pay screen when configuration completes.
- **Avoid making merchants wait.** Prepare at app start and on every return to the foreground (`prepare(using:)`); keep the option selectable during background configuration with an indeterminate progress indicator, or a determinate one when the API reports progress.
- **Make the button easy to find without scrolling** when multiple methods exist; if Tap to Pay is the only method, open it automatically at checkout.
- **Let merchants switch between Tap to Pay and hardware accessories** (Bluetooth chip and PIN readers) during checkout without visiting settings; set up both together.
- **Label the button "Tap to Pay on iPhone" or, if space is constrained, "Tap to Pay"**; if it's the only method, existing Charge or Checkout buttons may activate it. With icons, use `wave.3.right.circle` or `wave.3.right.circle.fill`; never the Apple logo. Match the button's color and shape to your other buttons. Use the label only for payment actions.
- **Determine the final amount before opening the Tap to Pay screen** (tips and pre-payment options like payment type first) and display the final amount there.
- **Start processing immediately** (`returnReadResultImmediately`) and show an authorization progress indicator after the checkmark animation finishes, since authorization can take several seconds.
- **Clearly display declined or successful results** (insufficient funds, suspected fraud, wrong PIN) and offer digital receipts via QR code or text message.
- **Help complete checkout when a tap fails** (unreadable card, unsupported network, amount limits, no online PIN): accept cash, use external hardware or a payment link, or relaunch Tap to Pay for another card. Consult the PSP for Strong Customer Authentication PIN prompts and Offline PIN market fallbacks.
- **Explain merchant-actionable errors** (an alert recommending an iOS update) and make help easy (in-app help content, a contact-support action).
- **Use generic labels for card reads with no transaction amount**: "Look Up", "Store Card", "Verify", "Refund"; never "Tap to Pay".
- **Separate loyalty card transactions** with a distinct, clearly labeled button whose label avoids "Tap to Pay" or payment terms.
</best_practices>

<platform_considerations>
- **iOS:** only supported platform.
</platform_considerations>

<anti_patterns>
- Don't present terms to nonadministrators.
- Don't wait for configuration before offering the option.
- Don't make merchants scroll to find the button.
- Don't include the Apple logo in the button.
- Don't use "Tap to Pay" labels for non-payment or loyalty flows.
</anti_patterns>
</topic>

<topic name="Wallet" source="https://developer.apple.com/design/human-interface-guidelines/wallet" updated="2026-06-08">
Wallet stores cards, IDs, transit cards, tickets, keys, and passes on iPhone and Apple Watch. Apps add passes at the right moment, keep them current, track orders, and verify identity with system buttons; the 2026 revision covers iOS 27 and the Pass Designer app with semantic passes, poster styles, and templates.

<best_practices>
- **Offer to add new passes** with one-tap system UI when an action creates a pass (ticket purchase, rewards signup); for frequent, predictable actions (flight check-in) add passes in the background after a one-time authorization (Wallet notifies people); show a custom review view with an Add to Apple Wallet button when people want to inspect first.
- **Suggest adding passes created elsewhere** (website, another device) the next time the app opens; if declined, never ask again.
- **Add related passes as a group** (multi-connection boarding passes, sets of event tickets bundled for one download).
- **Show an Add to Apple Wallet button** (`PKAddPassButton`, or the badge in email and web) wherever pass information appears for passes not yet in Wallet or removed.
- **Link to the pass in Wallet** with a label like "View in Wallet".
- **Set expiration, relevant date, and voided properties** so Wallet hides expired passes (it offers a button to revisit them).
- **Always get permission before deleting passes**: an in-app setting for manual vs. automatic removal, or an alert.
- **Provide relevance information** (time, location) so the system links the pass on the Lock Screen when needed (a gym card on arrival) and can start a Live Activity for event tickets.
- **Keep passes up to date** (gate changes, delays) and use per-field change messages only for time-critical updates, never for marketing or noncritical changes like a support phone number.
- **Pass anatomy:** pass fields define content and arrangement; semantic tags describe content for relevance and featured actions (venue directions, event guides). Poster event and semantic boarding passes require semantic tags (automatic layout) and should still include pass fields for older iOS. Field areas: logo and logo text (visible when collapsed), header (critical, visible collapsed), primary (most important), secondary and auxiliary (less critical), footer (category like "Family" or "Annual"), back (rarely needed details and legal text); supplemental sheets link from the front.
- **Use Pass Designer (2026)** with Apple templates or a blank pass for boarding passes, coupons, event tickets, store cards, generic, and poster generic passes, and preview layouts and safe areas.
- **Design a clean, simple pass that feels at home in Wallet** rather than replicating the physical counterpart; make it work on all devices (Apple Watch shows less information and fewer images and crops white space; no padding on images); essential information in the header for the collapsed state; quick-access information on the front; rarely needed details on the additional information sheet; brand colors, images, icons, and full-art backgrounds for instant recognition; sufficient label contrast on solid and image backgrounds; device-neutral language ("Slide to view" fails on Apple Watch).
- **Pass styles:** boarding pass (airline via semantic tags; train, bus, boat, transit via pass fields; one trip each), coupon (offers, discounts), event ticket (poster with full-art background, or non-poster with background image and thumbnail; season tickets allowed), store card (loyalty, discount, points, gift; shows balance), poster generic (2026; full background and distinct layout for anything that doesn't fit elsewhere), generic (gym membership, coat-check ticket).
- **Pass images:** PNG at @2x and @3x; reserve images for visual content (embedded text isn't accessible and may not display); add barcodes via Pass Designer or API, never in images; keep files small for email and web delivery; provide a pass icon (the app icon or a custom one); avoid inner drop shadows on logos; keep strip image areas behind text uncluttered with key visuals toward the bottom or trailing edge and no embedded text; thumbnails use rounded corners exported as transparent PNG; keep poster background content in the safe area (a material strip covers the bottom edge) and account for barcodes (`footerBackgroundColor`).
- **Order tracking (Wallet Orders):** add orders automatically after Apple Pay via `PKPaymentOrderDetails` (app) or `ApplePayPaymentOrderDetails` (web), or show the system Track with Apple Wallet button (`AddOrderToWalletButton`, iOS 17 and later) on confirmation, status, and tracking pages and in emails (re-adding opens the existing order); make order information available immediately with a status like "Check back later for full order details" if details are pending; keep fulfillment status current (Order Placed, Processing, Ready for Pickup, Picked Up, Out for Delivery, Delivered, Issue, Canceled) so the system can notify customers; supply a 300x300 px PNG or JPEG merchant logo and per-product images on solid, nontransparent backgrounds (no lifestyle shots or busy backgrounds); keep text brief, approachable, and localized; match the confirmed final price; provide a universal link to order management; describe every line item (price, name, image; optional PDF receipt per transaction); list your apps in priority order for the details link; suppress duplicate notifications when your app is installed; offer multiple contact methods (website or landing page required; Messages for Business, phone, email, support page optional); for shipping provide the carrier name (or the default "Track Shipment"), specific statuses (`onTheWay`, `outForDelivery`, `delivered`) or `shipped` when details are unknown, and a direct tracking link plus tracking number; for pickup include a scannable barcode and clear instructions; keep the fulfillment screen centered on tracking rather than promotions; describe Issue or Canceled status directly and thoroughly.
- **Identity verification (iOS 16 and later):** show a Verify with Apple Wallet button only when the device supports it, with a fallback verification method otherwise; ask at the precise moment of need (completing the transaction, not at account creation); write a purpose string as one direct, specific sentence in sentence case, active voice, with a period ("Federal law requires this information to verify your identity and also to help [App Name] prevent fraud."; "Applicable state law requires [App Name] to verify your driving privileges."); request only needed data (an age threshold via `age(atLeast:)`, not age or birth date); state whether and how long data is kept (`PKIdentityIntentToStore` shows it in the sheet); choose the label: Verify Age (lease a car after an age check), Verify Identity (car rental), Continue (when more information such as a Social Security number or phone number follows, as in opening a financial account), or a generic variant when those labels don't fit (signing up for a government service); multiline variants appear automatically in constrained widths; the button is always white on black, optionally with a light outline for dark backgrounds, with adjustable corner radius.
</best_practices>

<specs>
| Image | Styles | File | Size |
|---|---|---|---|
| Logo | non-semantic airline, other boarding, coupon, non-poster event, generic, store card | logo.png | 50 to 160 pt wide, 50 pt tall |
| Primary logo (semantic passes) | airline boarding, poster event, poster generic | primaryLogo.png | 30 to 126 pt wide, 30 pt tall |
| Secondary logo | poster event | secondaryLogo.png | 12 to 135 pt wide, 12 pt tall |
| Icon | all | icon.png | 38x38 pt (system rounds corners) |
| Strip | coupon, store card | strip.png | 375x144 pt |
| Thumbnail | event ticket, generic | thumbnail.png | 60 to 90 pt wide, 90 pt tall |
| Background (non-poster, shown blurred) | event ticket | background.png | 343x503 pt |
| Background (poster, unblurred) | poster event, poster generic | artwork.png | 358x448 pt |
| Footer | airline boarding | footer.png | 268x15 pt |
| Order merchant logo and product images | order tracking | PNG or JPEG | 300x300 px, nontransparent |
</specs>

<platform_considerations>
- **watchOS:** passes appear in a scrolling carousel of cards; tapping opens a scrolling details screen (sometimes per transaction); each style has fixed layout areas and overflow goes to details; watchOS crops the strip image to the card aspect ratio and may crop white space from other images; people can add passes without a watch app.
- **tvOS:** not supported.
</platform_considerations>

<anti_patterns>
- Don't repeatedly suggest a pass people declined.
- Don't delete passes without permission.
- Don't use change messages for marketing or noncritical updates.
- Don't put essential information in device-specific elements or embed text and barcodes in images.
- Don't add padding to images or inner drop shadows on logos.
- Don't show the Verify with Apple Wallet button on unsupported devices or before people start the flow that needs it.
- Don't request birth date when an age threshold suffices.
- Don't use lifestyle or busy backgrounds for order images.
</anti_patterns>
</topic>

<decision_guide>
Map a product need to the technology the HIG points at, with the three most important rules for each.

| Need | Technology | Top three rules |
|---|---|---|
| Sign in or sign up | Sign in with Apple | 1. Delay sign-in until it's exchanged for value; in commerce ask after purchase; explain required vs. optional data. 2. Show the system button no smaller than other sign-in buttons, visible without scrolling, at least 140x30 pt, style chosen by background (white on dark, black or outlined on light). 3. Never ask for a password or a personal email when a relay address is shared, and welcome people immediately. |
| Checkout for physical goods, services, donations | Apple Pay | 1. Make Apple Pay primary and pre-selected when a card is available; never a separate step; hide it only on unsupported devices. 2. Use only API-generated buttons of the right type and style (100 or 140 pt wide, 30 pt tall, 1/10-height margins); the Apple Pay mark is never a button. 3. Collect options, optional data, and multiple shipping choices before the sheet; report results and specific errors (128 characters or fewer) in the sheet. |
| Selling digital goods or subscriptions | In-app purchase | 1. Show the total billing price for every item and the full required sign-up information (name, duration, localized price, terms, privacy, restore or sign in, trial terms). 2. Use the system confirmation, refund, redemption, and management sheets unmodified; make cancel easy. 3. Let people try before buying, prompt only non-subscribers at relevant moments, and hide the store when payments aren't possible. |
| Accepting card payments in person | Tap to Pay on iPhone | 1. Always show the option, even before configuration completes, with a progress indicator. 2. Label exactly "Tap to Pay on iPhone" or "Tap to Pay" with `wave.3.right.circle`, never the Apple logo, and only for payment actions. 3. Determine the final amount first and handle failed taps with alternatives. |
| Tickets, boarding passes, loyalty cards, order tracking, ID checks | Wallet (ID Verifier for in-person reads) | 1. Add passes at the moment they're created, as groups, with relevance data and correct expiration; ask before deleting. 2. Design clean passes in Pass Designer with semantic tags and images at the specified pt sizes, no embedded text or barcodes. 3. Ask for identity only at the moment of need, with a purpose string, an age threshold, and a stated retention period. |
| Sharing a session in real time | SharePlay | 1. Use it for same-moment activities; offer share or save afterward for async work. 2. Provide a SharePlay-symbol button and frictionless joining with provisional access; describe the activity briefly. 3. Keep everyone oriented on changes; on visionOS choose the right spatial template, keep comfort settings per person, and support people without a spatial Persona. |
| Exposing app actions and content to the system | Siri via App Intents, app schemas, App Shortcuts | 1. Expose the most popular actions and personally relevant content using familiar terms; annotate on-screen content and donate entities and actions. 2. Keep dialogue succinct, inclusive, device-independent, audible and visual, and free of the app name and ads. 3. Never impersonate Siri or use reserved phrases; refer to Siri by name; translate only "Hey". |
| On-device intelligence, recommendations, recognition | Machine learning | 1. Define the role (critical vs. complementary, proactive vs. reactive, visible vs. invisible) and match accuracy expectations. 2. Prefer implicit over explicit feedback, act on feedback immediately and persist it, and make corrections easy and guided. 3. Show confidence only as understandable, actionable concepts, suppress low-confidence proactive results, and set limitations up front. |
| Generating or transforming content | Generative AI | 1. Disclose AI use, keep people in control with Edit, Undo, Retry, Adjust, and never pass AI off as human. 2. Choose on-device vs. server models by privacy and capability, ask permission for personal data, and be transparent about what leaves the device. 3. Scope requests to minimize hallucinations, confirm before irreversible actions, give specific progress feedback, and collect voluntary thumbs-up and thumbs-down feedback. |
| Instant task or demo without install | App Clips | 1. Linear, small, native, no account first; complete the task or demo in the clip. 2. Card: 1800x1200 px image, 30-character title, 56-character subtitle, View, Play, or Open. 3. Use Apple-generated App Clip Codes at the specified sizes and ratios; recommend the app only at natural pauses. |
| Social features in games | Game Center | 1. Initialize at launch; place the access point in menus, away from controls, and consider pausing while the overlay shows. 2. Use official terminology and the artwork sizes for achievements, leaderboards, challenges, and activities. 3. Keep challenges 1-5 minutes and based on the most recent score; support party codes with late join and manual entry. |
| Health, care, research data | HealthKit, CareKit, ResearchKit | 1. Request only what's needed, in context, every time, through the system permission screen with a descriptive message. 2. Manage sharing only in Settings > Privacy; use Activity rings and the Apple Health icon unaltered and say "Apple Health", not "HealthKit". 3. Provide a privacy policy, unobtrusive branding, minimal notifications, and ordered onboarding with informed consent. |
| Home accessories | HomeKit | 1. Use HomeKit terms and hierarchy and defer to Home app settings. 2. Use the system setup flow with no required account, then a custom post-setup experience. 3. Enforce service naming rules and teach Siri phrases; shortcuts only for what HomeKit can't do. |
| Driving | CarPlay | 1. Templates only; no iPhone interaction or unlock while driving. 2. Clean, scannable layout with primary content in the upper half; light and dark appearances; distinct colors for interactive elements. 3. Errors in CarPlay, never on iPhone; no autoplay. |
| Location and venues | Maps | 1. Interactive maps with clusters, contrasting controls, and the Apple logo and legal link visible (7 pt sides, 10 pt above and below). 2. Choose emphasis style and place card style by content density; don't duplicate information. 3. Indoor maps match your app, not Apple Maps, with progressive detail, a floor picker, and limited scrolling. |
| Placing virtual objects in the world | Augmented reality | 1. Capable devices only, full-screen camera view, 60 updates per second, coaching view for setup and relocalization. 2. Direct manipulation with standard gestures, immediate placement, friendly non-technical wording. 3. AR glyph and badges unaltered with 10% clear space, only for ARKit experiences. |
| Streaming media to TVs and speakers | AirPlay | 1. System player, full HLS resolution ladder, no interruptions or auto-mirroring. 2. AirPlay icon in the lower-right of custom players; icon and name noninteractive. 3. AirPlay as a one-word noun. |
| Sync across devices | iCloud | 1. Automatic, all-or-nothing, no per-document choices. 2. Store only user-created content; warn before deletion. 3. Resolve conflicts early and unobtrusively; use GameSave for games (2025). |
| Reading physical tags | NFC (or App Clip Codes) | 1. Say scan and hold near, never tap or touch. 2. No developer terms in UI; complete-sentence sheet text. 3. Support in-app scanning even with background reading. |
| Scanning IDs in person | ID Verifier | 1. Display Only unless legally required to store data. 2. Age threshold, not birth date. 3. Verify Age or Verify Identity button without communication symbols or the Apple logo. |
| Messages content | iMessage apps and stickers | 1. One primary experience, essentials in the compact view, text editing in the expanded view. 2. One sticker size per pack, files 500 KB or less, localized alt text. 3. Provide the full icon size set. |
| Photo features | Live Photos, Photo editing | 1. Keep Live Photos intact and badged consistently; still fallback where unsupported; no video-style play button. 2. Extensions: no custom top toolbar, confirm cancel, preview edits, app icon. |
| Audio recognition | ShazamKit | 1. Explain microphone use when asking permission. 2. Stop recording as soon as possible. 3. Opt-in for saving to the iCloud library. |
| Bringing an iPad app to Mac | Mac Catalyst | 1. Pick the idiom (iPad at 77% or Mac at 100%) and audit layout without fixed sizes. 2. Sidebar instead of tab bar, toolbar and menu bar commands, context menus everywhere. 3. Mac app icon, Next and Previous buttons, no edge-hugging buttons. |
| Glanceable idle display | Always On | 1. Redact sensitive data. 2. Dim nonessential content and keep the layout stable. 3. Finish motion gracefully; rare, subtle updates. |
</decision_guide>

<quick_checklist>
- [ ] Are Apple Pay and Sign in with Apple buttons created with the system APIs, at least as large as neighboring buttons, visible without scrolling, and styled for their background?
- [ ] Is the Apple Pay mark used only as an "accepted here" indicator, never as a button, and is Apple Pay pre-selected when a card is available?
- [ ] Does every in-app purchase show its total price, and does the subscription sign-up screen list name, duration, localized price, terms, privacy, trial terms, and restore or sign in?
- [ ] Are system sheets (payment, purchase confirmation, refund, subscription management, offer redemption, health permission, HomeKit setup, Wallet add, identity verification) used unmodified?
- [ ] Is sign-in, account creation, or identity verification deferred until the moment it delivers value, with minimum data and no password or personal email requests?
- [ ] Are Apple technology names (Apple Pay, AirPlay, HomeKit, Apple Health, SharePlay, Siri, Tap to Pay on iPhone, Game Center) spelled, capitalized, untranslated, and used grammatically as the HIG specifies, with their icons used noninteractively?
- [ ] Does AI-powered content disclose that it's AI and offer Edit, Undo, Retry, Adjust, specific progress messages, voluntary feedback, and confirmation before irreversible actions?
- [ ] Do ML features explain results with understandable attributions instead of raw confidence numbers, hide low-confidence proactive suggestions, and make corrections easy and persistent?
- [ ] Are Siri intents, entities, and App Shortcuts named in familiar terms with succinct, inclusive, device-independent dialogue and no app name or ads?
- [ ] Does a SharePlay activity start from a clear control, let people join without detours, and keep everyone oriented on shared changes?
- [ ] Are passes, App Clip cards and codes, achievements, leaderboards, stickers, CarPlay icons, and other assets at the exact pixel or point sizes specified?
- [ ] Are user-facing strings free of developer terms (HealthKit, NFC, tag, ARKit, plane, tracking, GameKit, service, characteristic, action set)?
- [ ] Do CarPlay, Always On, and App Clip experiences avoid requiring iPhone interaction, exposing sensitive data, or forcing app installs mid-task?
- [ ] Are health, home, motion, camera, microphone, and identity data requested only in context, with purpose strings, and managed through system settings?
</quick_checklist>
