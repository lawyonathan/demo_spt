<required_reading>
**Read these reference files NOW:**
1. `references/web-translation.md` (the whole file; it maps every HIG rule to this repository)
2. `references/design-principles.md`
3. `references/accessibility.md`
4. `references/typography.md`, `references/color-and-dark-mode.md`, `references/layout.md`, `references/motion.md`
5. `references/materials.md` if the work touches headers, bars, toolbars, or any translucent surface
6. The `components-*.md` file for each component involved (use the mapping table in `web-translation.md` to find the HIG name)
7. `references/branding-and-writing.md` for any copy
8. This repository's `AGENTS.md`, and then the matching guide under `node_modules/next/dist/docs/` before writing Next.js code (required by the repo; run `npm install` first if `node_modules` is missing)
</required_reading>

<process>
**Step 1: Scope and inventory.**
Name the pages and components in scope (paths under `src/app` and `src/components/ui`). For each UI element, write its HIG component name from the mapping table and load that topic. Decide compact and regular behavior for each screen.

**Step 2: Reuse before building.**
Search `src/components/ui` for an existing component that plays the role. Extend a variant (for example a 44 px touch size on `button.tsx`, an `alertdialog` role on `dialog.tsx`) rather than creating a parallel component. Only build new when nothing fits, and then reproduce system behavior: keyboard, focus, states, ARIA.

**Step 3: Tokens, not values.**
Use the semantic tokens in `src/app/globals.css`. If a HIG role is missing (tertiary label, grouped background, link, text styles), add tokens under `:root`, `.dark`, and `@theme inline` and use them. No raw colors or pixel font sizes in components.

**Step 4: Structure and hierarchy.**
Order content top-leading by importance, group with space or cards or separators, disclose secondary content progressively, and pick the navigation idiom per width (bottom navigation on compact, sidebar on regular, same items in both).

**Step 5: Layout and safe areas.**
Container queries or Tailwind breakpoints, logical properties, `env(safe-area-inset-*)` on fixed bars, content scrolling under translucent bars with a scroll edge treatment, no glass on content. Test compact (about 390 px), regular (about 1024 px), wide, and 200 percent zoom.

**Step 6: Interaction.**
44 px touch targets with spacing, hover gated by `(hover: hover)`, focus rings intact, Escape and Enter behavior, correct input attributes, drag-and-drop with keyboard sensors, every gesture with a visible equivalent. Motion brief, purposeful, and disabled or faded under `prefers-reduced-motion`.

**Step 7: States, feedback, copy.**
Empty, loading, error, and success states with live-region announcements; undo for reversible actions; confirmation only for destructive ones; title-style verb labels on buttons; errors that say what to do.

**Step 8: Accessibility pass.**
Run the web accessibility checklist in `references/web-translation.md`: landmarks, heading order, labels, `alt`, ARIA on custom widgets, keyboard walk, contrast in both appearances, reduced motion.

**Step 9: Verify in the project.**
```bash
npm run lint
npm test
```
Then start the app (use the `run` skill or `npm run dev`) and check the change at compact and regular widths, in light and dark, and at 200 percent zoom. Report what you looked at.

**Step 10: Report.**
Summarize what changed, which HIG rules drove each decision with their source URL, and the checklist results. For review-only requests, use `templates/hig-review-report.md` and do not change code.
</process>

<anti_patterns>
Avoid:
- Imitating Apple chrome (fake status bars, Dynamic Island, bundled SF fonts or symbols) instead of adopting the behavior
- New components that duplicate `src/components/ui`, or raw colors and px font sizes in components
- Glass cards, glass on content, blur without fallbacks
- Hover-only actions, removed focus rings, sub-44 px touch targets, device sniffing for layout
- Alerts for routine confirmations; popovers on compact widths; sheet on sheet
- Writing Next.js code without reading the version-specific guide the repo requires
</anti_patterns>

<success_criteria>
- [ ] Every element maps to a HIG component and follows its rules, cited by URL
- [ ] Existing library components and tokens are reused; new tokens live in `globals.css`
- [ ] Compact and regular layouts both work with the same features; safe areas and scroll edges handled
- [ ] Targets, keyboard, focus, motion, and states meet the web checklist
- [ ] `npm run lint` and `npm test` pass and the change was viewed in the running app
- [ ] The report lists decisions, sources, and checklist results
</success_criteria>
