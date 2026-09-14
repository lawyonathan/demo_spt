<required_reading>
**Read these reference files NOW, before reviewing:**
1. `references/design-principles.md`
2. `references/accessibility.md`
3. `references/layout.md`, `references/typography.md`, `references/color-and-dark-mode.md`
4. `references/materials.md` if the UI has bars, toolbars, sidebars, or any translucent element
5. `references/branding-and-writing.md`
6. The component and pattern files that match what is on screen (identify them in Step 1, then load them)
7. `references/platforms.md` (the target platform topic), or `references/web-translation.md` for web UI

Load `references/motion.md` when the UI animates, `references/privacy.md` when it asks for permissions or data, and `references/inputs.md` when it defines gestures or keyboard behavior.
</required_reading>

<process>
**Step 1: Inventory the UI.**
From code, screenshots, or description, list every screen, then every component and pattern on each screen (navigation idiom, bars, buttons, lists, inputs, modals, feedback, media). Note the platform and size classes it targets. Map each item to its HIG topic and load those reference files.

**Step 2: Check the non-negotiables first.**
Run the list in SKILL.md `<essential_principles>` against the inventory. Anything failing here is a Blocker.

**Step 3: Check each component and pattern against its topic.**
For each inventory item, walk the topic's `<best_practices>`, `<platform_considerations>`, and `<anti_patterns>`. Record every deviation with: what was observed, which rule it breaks, the source URL, and a concrete fix (preferably the system component or setting to use). Use the `<decision_guide>` to test whether a different component would serve the job better.

**Step 4: Check the whole against the principles.**
Ask the eight-principle questions from `references/design-principles.md`: Is the purpose clear? Can people explore and recover? Is anything hidden or dishonest? Is it consistent and familiar? Does it adapt to text size, appearance, input, and platform? Is anything unnecessary? Where does craft slip? Does it evoke the intended feeling without decoration getting in the way?

**Step 5: Rate severity.**
- **Blocker:** accessibility failures (targets, contrast, missing labels, no Dynamic Type), destructive action as primary, data loss without confirmation or undo, privacy or permission misuse, system gesture overridden.
- **Major:** wrong component for the job, modality misuse, broken hierarchy or navigation, Liquid Glass misuse, layout that breaks at larger text or other size classes, missing states (loading, empty, error).
- **Minor:** copy, capitalization, spacing, icon choice, motion polish, inconsistency between screens.

**Step 6: Write the report.**
Fill `templates/hig-review-report.md`. Lead with the summary and the top three fixes. Group findings by severity, then by screen. Every finding cites its HIG page. Do not change code unless the person asked for fixes; if they did, fix Blockers and Majors first, then re-run the checks.

**Step 7: Verify.**
Run the `<quick_checklist>` of each loaded reference and report the totals. If you changed code in this repository, run `npm run lint` and `npm test` and look at the result in the app.
</process>

<anti_patterns>
Avoid:
- Reviewing from memory instead of the loaded reference topics
- Findings without a source URL or without a concrete fix
- Rating a taste preference as a HIG violation; if the HIG does not say it, label it a suggestion
- Skipping states (loading, empty, error) and text-size scaling because the screenshot shows only the happy path
- Fixing code the person only asked you to review
</anti_patterns>

<success_criteria>
The review is complete when:
- [ ] Every screen and component was inventoried and mapped to a HIG topic
- [ ] Non-negotiables were checked first and any failure is a Blocker
- [ ] Each finding has observation, rule, source URL, severity, and fix
- [ ] Findings are grouped by severity with the top three fixes up front
- [ ] The report uses `templates/hig-review-report.md`
- [ ] Checklist totals are reported and any code changes pass project checks
</success_criteria>
