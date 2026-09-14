<required_reading>
**Read these reference files NOW, before designing:**
1. `references/design-principles.md`
2. `references/platforms.md` (the topic for the target platform; for web, read `references/web-translation.md` instead and then follow `workflows/apply-to-web.md` for implementation)
3. `references/layout.md`
4. `references/typography.md`
5. `references/color-and-dark-mode.md`
6. `references/materials.md` (any platform with Liquid Glass: iOS, iPadOS, macOS, tvOS, watchOS)
7. The component files for the components you expect to use (see `<reference_index>` in SKILL.md)
8. `references/patterns-app-structure.md` if the screen involves modality, onboarding, settings, or launching
9. `references/accessibility.md`
10. `references/branding-and-writing.md`

Load `references/patterns-feedback-and-media.md` when the screen loads data, plays media, or notifies, and `references/patterns-data-and-content.md` when it collects input, searches, or charts.
</required_reading>

<process>
**Step 1: Fix the purpose and constraints.**
Write one sentence for what the person is trying to accomplish on this screen and one for how it fits the app's main flow. Record: target platform(s) and size classes, entry points, the single primary action, and what success looks like. If the platform is not stated and the request is not about this repository's web app, ask once; otherwise assume and say so.

**Step 2: Establish the information hierarchy.**
List every piece of content and control the screen needs, then rank them. Remove anything that does not serve the purpose (Simplicity). Place the most important items top-leading in reading order. Decide what is primary, secondary, and disclosed on demand (progressive disclosure via menus, disclosure controls, nested views, or scrollable sections).

**Step 3: Choose the structure and components.**
Pick the navigation idiom (tab bar, sidebar, split view, page-based, single view) from the decision guide in `references/components-navigation-and-presentation.md`. For every control, use the decision guides in the component files; prefer the system component and note its SwiftUI, UIKit, or AppKit name (or the web equivalent from `references/web-translation.md`). Decide whether anything is modal, and if so which rung of the modal ladder (alert, action sheet, sheet, popover, full screen, window) and how it is dismissed.

**Step 4: Lay it out.**
Define the layout per size class, not per device. Respect safe areas and layout guides. Extend content under bars; controls sit on Liquid Glass with scroll edge effects, never on solid bands. Verify the layout still works at the largest accessibility text size (stack instead of inline, grow rows, fewer columns) and in right-to-left.

**Step 5: Apply typography, color, and materials.**
Use built-in text styles for hierarchy (Large Title, Title, Headline, Body, Footnote, Caption). Use semantic system colors for text, backgrounds, fills, and separators; reserve tint for the primary action and status. Liquid Glass only on the control layer, regular variant unless floating over media. Confirm light, dark, and Increase Contrast.

**Step 6: Design every state.**
Specify: empty, loading (determinate or indeterminate, never blocking without reason), partial or error (what happened, what to do, no blame), success (feedback that matches the action's weight), offline if relevant, and permission-not-granted if the screen needs a capability. Define feedback for the primary action (inline status, haptic, or none) and undo where the action changes user data.

**Step 7: Write the copy.**
Titles and buttons in title-style capitalization with verbs; body in sentence style. Every button says what it does. Every alert has a title that states the situation, an optional message, and buttons ordered per platform with the destructive one never as the primary. Purpose strings for permissions state the real benefit.

**Step 8: Accessibility pass.**
Walk the checklist in `references/accessibility.md`: targets, contrast, Dynamic Type, VoiceOver labels and grouping, gesture alternatives, Reduce Motion, keyboard access on macOS and iPadOS, focus on tvOS. Fix the design, not just the notes.

**Step 9: Write the spec.**
Fill `templates/screen-spec.md`. If implementation was requested, implement with system components and then run the project's checks. If the target is this repository, switch to `workflows/apply-to-web.md` for implementation details.

**Step 10: Verify.**
Run the `<quick_checklist>` of every loaded reference against the spec. Report pass/fail per checklist and cite the HIG page for each rule applied.
</process>

<anti_patterns>
Avoid:
- Designing for a device instead of for size classes and Dynamic Type
- Custom controls where a system control exists, or custom controls without press, focus, and disabled states
- More than two prominent buttons in a view, or a destructive action styled as primary
- Modal views for things that are not distinct, short tasks; modal on modal
- Solid opaque bars, Liquid Glass in the content layer, or glass on every custom element
- Color as the only carrier of meaning, hard-coded system color values, thin font weights
- Onboarding screens that restate the UI, permission prompts at launch, ratings prompts mid-task
- Copy that blames the person, vague button labels ("OK" when a verb would do), jargon
</anti_patterns>

<success_criteria>
The design is complete when:
- [ ] Purpose, platform, size classes, and the single primary action are stated
- [ ] Information hierarchy is explicit and everything on screen earns its place
- [ ] Every component is named, is a system component or justified, and has a cited HIG source
- [ ] Layout is defined per size class, respects safe areas, and survives the largest text size and right-to-left
- [ ] Type styles, semantic colors, and materials follow the references; light, dark, and Increase Contrast are covered
- [ ] All states (empty, loading, error, success, permission) and feedback are specified
- [ ] Copy follows Apple's writing rules
- [ ] Accessibility checklist passes
- [ ] `templates/screen-spec.md` is filled and the verification results are reported
</success_criteria>
