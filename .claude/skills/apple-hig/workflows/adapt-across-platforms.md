<required_reading>
**Read these reference files NOW:**
1. `references/platforms.md` (source platform topic and every target platform topic)
2. `references/layout.md` (size classes, safe areas, platform considerations; spatial layout for visionOS)
3. `references/inputs.md`
4. `references/components-navigation-and-presentation.md`
5. `references/components-menus-and-actions.md` (the menu bar and toolbars for macOS; ornaments for visionOS)
6. `references/materials.md`
7. The component files for every component the existing design uses
8. `references/components-system-experiences.md` when the target has widgets, complications, Live Activities, or Top Shelf opportunities
</required_reading>

<process>
**Step 1: Inventory the source design.**
List screens, navigation idiom, components, gestures, modal presentations, and system integrations. Note what is essential to the purpose versus incidental to the source platform.

**Step 2: Re-read the target platform's characteristics.**
From `references/platforms.md`: display and viewing distance, ergonomics, inputs, session length, system features, best practices. Write the three things the target platform values most that the source did not need to.

**Step 3: Map navigation and structure.**
Translate the idiom: iPhone tab bar becomes an iPad or Mac sidebar (adaptable sidebar style) or stays a tab bar in compact width; Mac gains the menu bar with the standard menus and keyboard shortcuts; watchOS flattens to a few screens with full-width buttons; tvOS becomes focus-driven grids with safe-area insets; visionOS uses windows, volumes, ornaments, and optional immersion. Keep functionality the same; change how much is visible.

**Step 4: Map inputs.**
Replace or supplement: touch gestures with pointer hover and precise clicks, keyboard shortcuts and Full Keyboard Access on Mac and iPad; Digital Crown and the Action button on watchOS; Siri Remote focus and swipes on tvOS; eyes and hands with 60 pt spacing and hover effects on visionOS. Every gesture keeps a visible alternative.

**Step 5: Map sizes, type, and materials.**
Apply the target's default and minimum text sizes, control sizes, and padding. Reapply Liquid Glass rules for the target's bars; visionOS uses glass windows, not Dark Mode. Recheck safe areas (tvOS 60 pt top and bottom, 80 pt sides; macOS camera housing; Dynamic Island).

**Step 6: Add what the platform expects.**
Identify system experiences worth adopting: widgets and Live Activities on iOS, complications on watchOS, Top Shelf on tvOS, menu bar and Dock menu on macOS, App Shortcuts everywhere Siri runs. Note what to drop because it does not fit (for example, complex data entry on watchOS and tvOS).

**Step 7: Write the adaptation spec.**
Use `templates/screen-spec.md` per screen, or a table with columns: element, source behavior, target behavior, HIG source. Call out open questions where both options lose something.

**Step 8: Verify.**
Run the target platform's checklist in `references/platforms.md` and the checklists of the component files loaded.
</process>

<anti_patterns>
Avoid:
- Scaling an iPhone layout up and calling it an iPad or Mac app (use regular-width idioms, sidebars, multiple windows, the menu bar)
- Porting touch-only gestures without pointer, keyboard, or remote equivalents
- Keeping Dark Mode assumptions on visionOS, or mobile bottom bars on tvOS
- Changing functionality between size classes instead of changing how much is visible
- Ignoring the platform's system experiences that people expect
</anti_patterns>

<success_criteria>
- [ ] Source inventory and target characteristics are written down
- [ ] Navigation, inputs, sizes, type, and materials are mapped with HIG sources
- [ ] Platform-expected system experiences are proposed or explicitly declined
- [ ] Every element in the spec has a source and target behavior
- [ ] Target platform checklist passes
</success_criteria>
