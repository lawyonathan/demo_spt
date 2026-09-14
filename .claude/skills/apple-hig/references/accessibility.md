<overview>
Distills HIG `accessibility` (2025-06-09) and `voiceover` (new page, 2025-03-07): Vision, Hearing, Mobility, Speech, and Cognitive rules with per-platform type-size, contrast, control-size, and padding thresholds, Reduce Motion and Assistive Access behavior, visionOS comfort, and VoiceOver labels, images, titles, grouping, change notifications, and rotor. Load when designing or reviewing UI for text size, contrast, hit targets, gestures, motion, captions, alt text, or assistive technologies (VoiceOver, Voice Control, Switch Control, Full Keyboard Access, Assistive Access).
</overview>

<topic name="Accessibility principles" source="https://developer.apple.com/design/human-interface-guidelines/accessibility" updated="2025-06-09">
An accessible interface works regardless of capability or how people use their device, and reaches a larger audience. It is intuitive (familiar, consistent interactions), perceivable (no single method conveys information; works by sight, hearing, speech, or touch), and adaptable (supports system accessibility features or personal settings).

<best_practices>
- **Audit accessibility while designing.** Use Accessibility Inspector to surface issues and see how the app presents itself to assistive technologies.
- **Declare supported features with Accessibility Nutrition Labels (2025).** Evaluate support (VoiceOver, Larger Text, Captions, and so on) and set accurate labels in App Store Connect.
</best_practices>
</topic>

<topic name="Vision" source="https://developer.apple.com/design/human-interface-guidelines/accessibility" updated="2025-06-09">
People may be blind, color blind, or have low vision or light sensitivity; lighting and screen brightness affect everyone.

<best_practices>
- **Support larger text sizes.** Let people enlarge text by at least 200 percent (140 percent in watchOS), through custom UI or by adopting Dynamic Type.
- **Use recommended defaults for custom type sizes.** Follow the per-platform default and minimum sizes in specs.
- **Account for font weight.** Thin weights read worse; with a thin custom font, go larger than the recommended sizes.
- **Meet color contrast minimums.** Measure with WCAG or APCA calculators; Accessibility Inspector applies the WCAG Level AA ratios in specs. If the default palette falls short, at least provide a higher-contrast scheme when Increase Contrast is on; check both light and dark appearances if the app supports Dark Mode.
- **Prefer system-defined colors.** Their accessible variants adapt automatically to Increase Contrast and light or dark appearance (`systemRed` has one).
- **Convey information with more than color alone.** Red-green and blue-orange pairings defeat color blindness; add distinct shapes or icons for function and state, and consider letting people customize chart or game-character colors.
- **Describe the interface and content for VoiceOver.** See the VoiceOver topic.
</best_practices>

<specs>
Default and minimum sizes for system-defined type styles (custom styles follow the same):

| Platform | Default size | Minimum size |
|---|---|---|
| iOS, iPadOS | 17 pt | 11 pt |
| macOS | 13 pt | 10 pt |
| tvOS | 29 pt | 23 pt |
| visionOS | 17 pt | 12 pt |
| watchOS | 16 pt | 12 pt |

WCAG Level AA minimum contrast ratios (used by Accessibility Inspector):

| Text size | Text weight | Minimum contrast ratio |
|---|---|---|
| Up to 17 pt | All | 4.5:1 |
| 18 pt | All | 3:1 |
| All | Bold | 3:1 |

Enlargement target: at least 200 percent (140 percent in watchOS).
</specs>
</topic>

<topic name="Hearing" source="https://developer.apple.com/design/human-interface-guidelines/accessibility" updated="2025-06-09">
People may be deaf, hard of hearing, or in noisy or public places; never convey dialogue or crucial information through audio alone.

<when_to_use>
- **Captions:** textual equivalent of audible information, synchronized live with media such as game cutscenes and video clips.
- **Subtitles:** live onscreen dialogue in the person's preferred language; TV shows and movies.
- **Audio descriptions:** spoken narration of visual-only information in natural pauses of the main audio.
- **Transcripts:** complete text of audible and visual information; long-form media like podcasts and audiobooks, reviewed as a whole or highlighted during playback.
</when_to_use>

<best_practices>
- **Support text-based ways to enjoy audio and video.** Offer the alternatives above and let people customize how the text is presented.
- **Use haptics in addition to audio cues.** Pair success chimes, error sounds, and game feedback with matching haptics; in iOS and iPadOS, Music Haptics and Audio graphs convey music and infographics through vibration and texture.
- **Augment audio cues with visual cues.** In games and spatial apps content may be off screen, so add visual indicators pointing to where to interact.
</best_practices>
</topic>

<topic name="Mobility" source="https://developer.apple.com/design/human-interface-guidelines/accessibility" updated="2025-06-09">
Offer a comfortable experience for people with limited dexterity or mobility.

<best_practices>
- **Offer sufficiently sized controls.** Meet the per-platform minimums in specs.
- **Treat spacing between controls as important as size.** About 12 pt of padding around elements with a bezel, about 24 pt around the visible edges of elements without one.
- **Support simple gestures for common interactions.** Use the simplest gesture for frequent actions; avoid custom multifinger and multihand gestures.
- **Offer alternatives to gestures.** Core functionality needs more than one physical interaction type: pair swipe-to-dismiss or swipe-to-delete with a button (Edit, then tap to delete).
- **Let people use Voice Control.** Spoken commands perform gestures, interact with elements, and dictate and edit text; label elements appropriately.
- **Integrate with Siri and Shortcuts.** People automate repetitive tasks from Siri, the Action button on iPhone or Apple Watch, Home Screen shortcuts, or Control Center.
- **Support mobility-related assistive technologies.** Test with VoiceOver, AssistiveTouch, Full Keyboard Access, Pointer Control, and Switch Control, and verify elements are labeled.
</best_practices>

<specs>
| Platform | Default control size | Minimum control size |
|---|---|---|
| iOS, iPadOS | 44x44 pt | 28x28 pt |
| macOS | 28x28 pt | 20x20 pt |
| tvOS | 66x66 pt | 56x56 pt |
| visionOS | 60x60 pt | 28x28 pt |
| watchOS | 44x44 pt | 28x28 pt |

Padding: about 12 pt around bezeled elements; about 24 pt around the visible edges of non-bezeled elements.
</specs>

<anti_patterns>
- Avoid custom multifinger and multihand gestures for frequent actions.
</anti_patterns>
</topic>

<topic name="Speech" source="https://developer.apple.com/design/human-interface-guidelines/accessibility" updated="2025-06-09">
Apple's features help people with speech disabilities and people who prefer text-based interaction.

<best_practices>
- **Let people use the keyboard alone to navigate and interact.** Test with Full Keyboard Access; the system defines accessibility shortcuts and many others people use constantly.
- **Support Switch Control (2025).** People select, tap, type, and draw through separate hardware, game controllers, or sounds such as a click or a pop.
</best_practices>

<anti_patterns>
- Avoid overriding system-defined keyboard shortcuts.
</anti_patterns>
</topic>

<topic name="Cognitive" source="https://developer.apple.com/design/human-interface-guidelines/accessibility" updated="2025-06-09">
Minimizing complexity benefits everyone.

<best_practices>
- **Keep actions simple and intuitive.** Prefer familiar system gestures and behaviors over custom ones people must learn and retain.
- **Minimize time-boxed interface elements.** Auto-dismissing views hurt people who need longer to process or whose assistive technologies traverse slowly; dismiss by explicit action.
- **Consider difficulty accommodations in games.** Options to reduce level-completion criteria, adjust reaction time, or enable control assistance.
- **Let people control audio and video playback.** Discoverable start and stop controls, a global opt-out from all autoplay, and `isVideoAutoplayEnabled`.
- **Let people opt out of flashing lights in video playback.** Respond to the Dim Flashing Lights setting.
- **Be cautious with fast-moving and blinking animations.** In excess they distract, cause dizziness, and can trigger epileptic episodes. When Reduce Motion is on, reduce automatic and repetitive animation (zooming, scaling, peripheral motion), tighten springs to cut bounce, track animations directly with gestures, and replace x-, y-, and z-axis transitions with fades.
- **Optimize the UI for Assistive Access (2025).** In iOS and iPadOS it presents a streamlined app with a default, low-load layout (as in Camera). When it's on: keep core functionality and consider removing noncritical workflows and UI; break multistep flows into one interaction per screen; always ask for confirmation twice before hard-to-recover actions such as deleting a file.
</best_practices>

<anti_patterns>
- Avoid autoplaying audio or video without controls to start and stop it.
- Under Reduce Motion, avoid animating depth changes in z-axis layers and animating into or out of blurs.
</anti_patterns>
</topic>

<topic name="visionOS accessibility considerations" source="https://developer.apple.com/design/human-interface-guidelines/accessibility" updated="2025-06-09">
visionOS offers head and hand Pointer Control and Zoom; immersion raises the chance of motion sickness and visual or ergonomic discomfort. Other platforms have no additional considerations.

<best_practices>
- **Prioritize comfort.** Keep elements within the field of view and prefer horizontal layouts to neck-straining vertical ones; reduce the speed and intensity of animated objects, especially in peripheral vision; be gentle with camera and video motion; minimize large and repetitive gestures.
</best_practices>

<anti_patterns>
- Avoid demanding attention in different locations in quick succession.
- Avoid situations where people feel the world moves without their control.
- Avoid anchoring content to the wearer's head; it feels confining and blocks assistive technologies like Pointer Control.
</anti_patterns>
</topic>

<topic name="VoiceOver" source="https://developer.apple.com/design/human-interface-guidelines/voiceover" updated="2025-03-07">
VoiceOver is a screen reader for people who are blind or have low vision; it works on every Apple platform and in Unity games via Apple's Unity plug-ins. Inform it with alternative text describing the interface and content.

<best_practices>
- **Provide alternative labels for all key interface elements.** Replace the generic default labels of system controls with descriptive ones, label every custom element, and keep labels current (SwiftUI accessibility modifiers).
- **Describe meaningful images.** Describe only what the image itself conveys; VoiceOver already reads surrounding context like captions.
- **Make charts and infographics fully accessible.** Concisely describe what each conveys and expose any interaction through the accessibility APIs.
- **Exclude purely decorative images.** Hiding them saves time and cognitive load (`accessibilityHidden(_:)`, `accessibilityElement`, `isAccessibilityElement`).
- **Use titles and headings to convey hierarchy.** The title is announced first on arrival; make each unique and descriptive, with accurate section headings.
- **Specify how elements are grouped, ordered, or linked.** Describe relationships that are visual only (proximity, alignment). VoiceOver reads in the locale's reading order (top-to-bottom, left-to-right in US English): ungrouped images and captions read as all images then all captions; grouped, each image with its caption (`shouldGroupAccessibilityChildren`).
- **Inform VoiceOver of visible content or layout changes.** Post `AccessibilityNotification` so people can update their mental map.
- **Support the VoiceOver rotor when possible.** Expose headings, links, and other content types (`AccessibilityRotorEntry`, `UIAccessibilityCustomRotor`, `NSAccessibilityCustomRotor`); the rotor also brings up the braille keyboard.
</best_practices>

<platform_considerations>
- **visionOS:** With VoiceOver on, apps that define custom gestures receive no hand input by default, so people can explore by voice. People can opt in to Direct Gesture mode, which disables standard VoiceOver gestures and passes hand input to the app. Don't assume custom gestures are accessible.
</platform_considerations>

<anti_patterns>
- Don't describe decorative images or repeat nearby captions in an image description.
- Don't leave system controls with generic labels or let labels go stale.
</anti_patterns>
</topic>

<decision_guide>
- Text: platform default and minimum sizes; 200 percent enlargement (140 percent watchOS) via Dynamic Type; larger for thin weights; 4.5:1 up to 17 pt, 3:1 at 18 pt or bold, in light and dark; otherwise a higher-contrast scheme under Increase Contrast.
- Audio carries information: captions (synced clips), subtitles (TV, movies), audio descriptions (visual-only content), transcripts (podcasts, audiobooks), plus matching haptics and visual cues.
- Control size: 28x28 pt minimum on iOS, iPadOS, visionOS, watchOS; 20x20 pt macOS; 56x56 pt tvOS; pad 12 pt bezeled or 24 pt non-bezeled.
- Anything gesture-only, timer-dismissed, color-only, or autoplaying: add a button, an explicit dismiss, a shape or icon, or start and stop controls.
- Motion: under Reduce Motion use fades, tighter springs, gesture-tracked animation, no blur or z-depth animation; honor Dim Flashing Lights for video; gentler still in visionOS.
- Assistive Access on: core functionality only, one interaction per screen, double confirmation for hard-to-recover actions.
- Image: meaningful, describe what it alone conveys; decorative, hide. Dynamic content: post a notification. Long page: rotor entries.
- visionOS custom gesture: works under VoiceOver only in Direct Gesture mode, so provide a non-gesture path.
</decision_guide>

<quick_checklist>
- [ ] Text enlarges at least 200 percent (140 percent watchOS) and custom type meets platform default and minimum sizes?
- [ ] Contrast is 4.5:1 up to 17 pt or 3:1 at 18 pt or bold in both appearances, or a higher-contrast scheme appears under Increase Contrast?
- [ ] No state or function is conveyed by color alone?
- [ ] Every audio cue has a text equivalent, a matching haptic, or a visual indicator?
- [ ] Controls meet the platform minimum size with about 12 pt (bezeled) or 24 pt (non-bezeled) padding?
- [ ] Every gesture-driven action has an onscreen alternative, and frequent gestures aren't multifinger or multihand?
- [ ] System keyboard shortcuts are untouched, and the app works with Full Keyboard Access, Voice Control, and Switch Control?
- [ ] Nothing auto-dismisses on a timer, and nothing autoplays without controls?
- [ ] Reduce Motion swaps zoom, scale, peripheral motion, blur, and z-depth animation for fades, and Dim Flashing Lights is respected?
- [ ] Under Assistive Access the app shows core functionality only, one interaction per screen, and double confirmation for hard-to-recover actions?
- [ ] All key and custom elements have descriptive, current VoiceOver labels, with decorative images hidden?
- [ ] Each screen has a unique title and accurate headings, related elements are grouped, changes are announced, and rotor entries exist?
- [ ] visionOS content stays in the field of view, isn't head-anchored, and custom gestures have alternatives?
</quick_checklist>
