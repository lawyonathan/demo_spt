<required_reading>
**Read these reference files NOW:**
1. `references/accessibility.md` (all topics, including VoiceOver)
2. `references/typography.md` (Dynamic Type sections)
3. `references/color-and-dark-mode.md`
4. `references/motion.md`
5. `references/inputs.md` (keyboards, pointing devices, focus and selection, gestures)
6. `references/inclusion-and-localization.md`
7. `references/web-translation.md` when the target is web
</required_reading>

<process>
**Step 1: Scope.**
List the screens and flows in scope and the platform. Identify the assistive technologies that apply: VoiceOver, Dynamic Type and Larger Accessibility Sizes, Increase Contrast, Reduce Motion, Reduce Transparency, Bold Text, Voice Control, Switch Control, Full Keyboard Access, Assistive Access, captions, Dim Flashing Lights.

**Step 2: Vision.**
Check text sizes against the default and minimum table; confirm at least 200 percent enlargement (140 percent on watchOS) or Dynamic Type; confirm layout at the largest accessibility size (stacking, growing rows, no truncation of useful text); check contrast (4.5:1 up to 17 pt, 3:1 at 18 pt or bold) in light, dark, and Increase Contrast; confirm no meaning by color alone; confirm meaningful icons scale with text.

**Step 3: VoiceOver.**
Every interactive element has a concise label that says what it is, not how it looks; images that carry meaning are described, decorative ones are hidden; related elements are grouped; custom controls expose traits and actions; reading order matches visual order; dynamic changes are announced.

**Step 4: Hearing.**
Audio and video have captions, subtitles, audio descriptions, or transcripts as appropriate; audio cues have haptic and visual equivalents; nothing essential is audio-only.

**Step 5: Mobility.**
Targets meet the platform minimums (44x44 pt iOS, iPadOS, watchOS; 60x60 pt visionOS; 28x28 pt macOS; 66x66 pt tvOS) with 12 to 24 pt of padding; every gesture has a visible control alternative; no custom multi-finger or multi-hand gestures for frequent actions; Voice Control works because elements are labeled; Switch Control and Full Keyboard Access reach everything.

**Step 6: Speech and keyboard.**
The whole app works with the keyboard alone; system keyboard shortcuts are not overridden; focus is visible and moves in a sensible order.

**Step 7: Cognitive.**
Interactions are simple and consistent; no timed auto-dismissal; media does not autoplay without controls; flashing content honors Dim Flashing Lights; Reduce Motion tightens springs, replaces movement with fades, avoids z-axis and blur animation; Assistive Access strips to core tasks, one interaction per screen, double confirmation for hard-to-recover actions.

**Step 8: Platform specifics.**
visionOS: comfort, field of view, no head-anchored content, reduced peripheral motion. tvOS: focus is obvious and every element is reachable. web: see the accessibility section of `references/web-translation.md`.

**Step 9: Report.**
Fill `templates/hig-review-report.md` with the audit scoped to accessibility. Blockers are anything that prevents a person using an assistive technology from completing a core task. Cite the HIG page for every finding.
</process>

<anti_patterns>
Avoid:
- Auditing only the default text size and light appearance
- Labeling icons by appearance ("blue square") instead of purpose ("Add to Favorites")
- Removing focus indicators, overriding system shortcuts, or hiding controls behind gestures
- Treating accessibility as a checklist item after design rather than part of the design (Flexibility principle)
</anti_patterns>

<success_criteria>
- [ ] All five dimensions plus VoiceOver, keyboard, and platform specifics were checked
- [ ] Every finding has severity, rule, source URL, and fix
- [ ] Largest accessibility text size and Reduce Motion were evaluated explicitly
- [ ] Report uses `templates/hig-review-report.md`
</success_criteria>
