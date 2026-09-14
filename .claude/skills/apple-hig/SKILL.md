---
name: apple-hig
description: Apple Human Interface Guidelines (HIG) expertise for designing and reviewing user interfaces. Use when designing a new screen, flow, or component; reviewing existing UI for platform fit, usability, or accessibility; choosing between components (alert vs sheet, tab bar vs sidebar, picker vs segmented control); adapting a design across iOS, iPadOS, macOS, watchOS, tvOS, and visionOS; or applying Apple-quality design to a web app. Covers Apple's eight design principles, Liquid Glass, Dynamic Type, color, layout, motion, accessibility, every HIG pattern and component, inputs, and Apple technologies such as Apple Pay, Sign in with Apple, Siri, widgets, and generative AI.
---

<objective>
Design and review user interfaces the way Apple's Human Interface Guidelines recommend. This skill distills the full HIG (snapshot September 2026, including the Liquid Glass design system, iOS 26/27 updates, iPhone Duo, Siri AI, and snippets) into reference files Claude loads on demand, plus workflows for the jobs people actually bring: design something new, review something existing, pick the right component, audit accessibility, adapt across platforms, or translate Apple's principles to the web.

Source of truth: https://developer.apple.com/design/human-interface-guidelines. Every reference topic carries its source URL; cite it when you make a recommendation. When guidance in these references conflicts with what you remember of older HIG versions, trust the references. The design language changed substantially in 2025 and 2026.
</objective>

<essential_principles>
**Apple's eight design principles.** These are the lens for every trade-off. Full text in `references/design-principles.md`.

1. **Purpose. Make something meaningful.** Identify what matters most to the people you design for and make those things great. Keep focused; a product with a clear use is better at helping people meet their goals.
2. **Agency. Let people do things their own way.** Stay out of the way, let people explore without being locked into flows, and make recovery from mistakes cheap and obvious.
3. **Responsibility. Act in people's best interest.** Be transparent about what the product does and why. Collect only what it needs. Ask for permission with a clear rationale, in context.
4. **Familiarity. Build on what people know.** Use concepts and system patterns people already understand, apply them consistently, and give clear feedback about what is happening.
5. **Flexibility. Adapt to diverse contexts and needs.** Design for everyone from the start (accessibility is a priority, not a pass at the end). Preserve context across platforms and configurations. Support many input methods. Give every platform the same care.
6. **Simplicity. Be clear and direct.** Include just what is necessary. Be concise. Establish hierarchy so people know where they are and what comes next. Simplicity is not minimalism.
7. **Craft. Care about every detail.** Quality sets the tone: deliberate decisions, smooth animation, precise wording. Prototype, iterate, and keep the bar high after shipping.
8. **Delight. Make it human.** Decide the emotion the experience should evoke and create defining moments, but never let decoration get in the way of the task.

**Non-negotiables.** Apply these to every UI decision regardless of workflow. Each comes from a specific HIG page; the reference files carry the detail and the citation.

- **Prefer system components and system behaviors.** Build custom only when it is meaningfully better, and then match system states (press, focus, hover, disabled), accessibility, and appearance adaptation.
- **Hit targets:** at least 44x44 pt on iOS, iPadOS, and watchOS; 60x60 pt in visionOS (button centers at least 60 pt apart); 28x28 pt default on macOS; 66x66 pt on tvOS. About 12 pt of padding around bezeled elements and about 24 pt around unbezeled ones.
- **Text:** default 17 pt and minimum 11 pt on iOS and iPadOS (macOS 13/10, tvOS 29/23, visionOS 17/12, watchOS 16/12). Support Dynamic Type or at least 200 percent enlargement (140 percent on watchOS). Avoid Ultralight, Thin, and Light weights. Use the built-in text styles for hierarchy.
- **Contrast:** at least 4.5:1 for text up to 17 pt, 3:1 for 18 pt and larger or bold text. Check light, dark, and Increase Contrast. Never convey information by color alone.
- **Color:** use semantic dynamic system colors; do not hard-code system color values or redefine their meaning. Apply color sparingly on Liquid Glass and reserve it for primary actions and status.
- **Liquid Glass (2025+):** it is the floating layer for controls and navigation (tab bars, toolbars, sidebars). Never use it in the content layer. Use it sparingly in custom controls. Use scroll edge effects instead of solid bars, and extend content under bars.
- **Layout:** order by importance from top-leading in reading order, align and group deliberately, respect safe areas and layout guides, decide layout by size class not device type, and keep functionality the same as size changes.
- **Modality only with a clear benefit.** Keep modal tasks short, always provide an obvious dismiss, confirm before discarding user content, and never stack modal views or show two alerts.
- **Buttons and destructive actions:** one or two prominent buttons per view, style not size to distinguish the preferred choice, verbs in title-style capitalization, and never assign the primary role to a destructive action.
- **Feedback and motion:** every custom control has a press state; show progress for anything that is not instant; motion is purposeful and honors Reduce Motion (tighter springs, fades instead of movement, no z-axis animation).
- **Gestures need visible alternatives.** Every swipe or custom gesture has a button or menu equivalent, and system gestures are never overridden.
- **Permissions and privacy:** ask only when needed, in context, with a purpose string that states the real benefit. Never ask at launch without cause.
- **Writing:** concise, specific, in Apple's voice: sentence-style for body, title-style for buttons and titles, verbs for actions, no jargon, and never blame the person in error messages.
</essential_principles>

<recent_changes>
Guidance that changed in 2025 and 2026 and supersedes older HIG conventions. Assume older training knowledge is stale on these points; the reference files carry the detail.

- **Liquid Glass design system (2025):** a floating control layer for tab bars, toolbars, sidebars, and system controls with `regular` and `clear` variants; content extends under bars; scroll edge effects replace solid bar backgrounds; controls stay monochrome with tint reserved for one primary action; app icons are layered and rendered with glass effects (Icon Composer, default, dark, clear, and tinted appearances). See `materials.md`, `color-and-dark-mode.md`, `layout.md`, `icons-images-symbols.md`, `components-menus-and-actions.md`.
- **iPhone Duo (2026):** a folding iPhone; compact width on the outer display, regular on the inner; toolbars, tab bars, Dynamic Island, and status bar move to the vertical axis; reserved regions and arrangement views; build to resize, never per-pose layouts. See `platforms.md`.
- **Search (2026):** when search is central, give it a primary position: a search tab (standard or button appearance) in tab-bar apps or a field in the bottom toolbar; one search location; show scope. See `components-navigation-and-presentation.md`, `patterns-data-and-content.md`.
- **Tab bars and sidebars (2025-2026):** the iOS tab bar floats and can minimize on scroll; `sidebarAdaptable` switches between tab bar and sidebar; sidebar icons use the accent color by default and other colors need a clear purpose; a sidebar shows at most two levels.
- **Sheets (2026):** Done is paired with Cancel or Back, never all three; single-view sheets place Cancel leading and Done trailing; multi-step flows use Back until the final step.
- **Toolbars and menus (2025-2026):** leading, center, and trailing item groups with one prominent trailing action; no custom bar backgrounds or tinted controls; menu item icons only for the most common actions and consistently within a group; iPadOS has a menu bar.
- **iPadOS windowing (2025):** apps run full screen or in resizable windows with system window controls, may open multiple windows, and receive no configuration hint, so layouts adapt to any size. Split views are for regular environments.
- **Typography (2025):** every text style documents an emphasized weight; at accessibility sizes stack inline items, reduce columns, and keep primary elements at the top.
- **Accessibility (2025):** Assistive Access (core tasks only, one interaction per screen, double confirmation for hard-to-recover actions), Switch Control, Accessibility Nutrition Labels, and a dedicated VoiceOver page.
- **Widgets and Live Activities (2025):** widget appearances are light, dark, clear, and tinted with full color, accented, and vibrant rendering; visionOS widgets are 3D objects; Live Activities appear in the Mac menu bar and CarPlay Dashboard; Dynamic Island sizes cover iPhone 17 and iPhone Air.
- **System intelligence (2026):** prefer app schemas over App Shortcuts for common domains; snippets show confirmations and results from app intents (custom views at most 400 pt); Siri guidance revised for Siri AI; generative AI guidance covers letting people refine results, give feedback, and choosing a model type. See `components-system-experiences.md`, `technologies.md`.
- **Design principles (2026):** the eight principles were reintroduced as tools for weighing competing priorities.
</recent_changes>

<intake>
Identify what the person wants from their request. Ask only if the platform or the target is genuinely ambiguous and would change the answer materially; otherwise assume from context (this repository is a Next.js web app, so an unspecified target means the web workflow) and state the assumption.

1. **Design** a new screen, flow, feature, or component
2. **Review** existing UI (code, mockup, screenshot, or description) against the HIG
3. **Choose** the right component or pattern for a job
4. **Audit accessibility** of a screen or app
5. **Adapt** a design across Apple platforms (iOS, iPadOS, macOS, watchOS, tvOS, visionOS, iPhone Duo)
6. **Apply to web** the HIG principles in this repository's Next.js, React, and Tailwind code
7. **Answer a question** about what the HIG says
</intake>

<routing>
| Intent | Keywords | Workflow |
|--------|----------|----------|
| 1 Design | "design", "build", "create", "new screen", "mockup", "spec" | `workflows/design-new-screen.md` |
| 2 Review | "review", "audit", "check", "critique", "does this follow", "improve" | `workflows/review-against-hig.md` |
| 3 Choose | "which component", "should I use", "alert or sheet", "tab bar or sidebar", "picker or" | `workflows/choose-component.md` |
| 4 Accessibility | "accessibility", "a11y", "VoiceOver", "Dynamic Type", "contrast", "WCAG" | `workflows/accessibility-audit.md` |
| 5 Adapt | "port to", "iPad version", "Mac version", "watchOS", "visionOS", "cross-platform" | `workflows/adapt-across-platforms.md` |
| 6 Web | "web", "Next.js", "React", "Tailwind", "CSS", "this app", "landing page", "dashboard" | `workflows/apply-to-web.md` |
| 7 Question | "what does the HIG say", "Apple's guidance on", "why does Apple" | No workflow. Load the matching reference from the index, answer with the rule, its reason, and the source URL. |

**After reading a workflow, follow it exactly.** Load only the references the workflow names plus the component topics the task involves.
</routing>

<reference_index>
All domain knowledge lives in `references/`. Each file opens with an `<overview>` that says when to load it and ends with a `<quick_checklist>` to run against your output.

**Foundations**
- `design-principles.md`: the eight principles in full, how to weigh them
- `platforms.md`: iOS, iPadOS, macOS, tvOS, visionOS, watchOS, games, iPhone Duo: characteristics and best practices
- `accessibility.md`: vision, hearing, mobility, speech, cognitive, VoiceOver; size, contrast, and control tables
- `inclusion-and-localization.md`: inclusive design, right-to-left layout
- `privacy.md`: permission requests, purpose strings, data minimization
- `color-and-dark-mode.md`: system and semantic colors, Liquid Glass color, Dark Mode
- `typography.md`: legibility, SF and NY fonts, text styles, Dynamic Type tables
- `materials.md`: Liquid Glass regular and clear variants, standard materials, vibrancy
- `layout.md`: hierarchy, adaptability, size classes, safe areas, spatial layout, immersive experiences
- `motion.md`: purposeful animation, Reduce Motion
- `icons-images-symbols.md`: app icons, standard interface icons, images, SF Symbols
- `branding-and-writing.md`: brand expression, tone, capitalization, labels, error messages

**Patterns**
- `patterns-app-structure.md`: modality, launching, onboarding, full screen, multitasking, settings, help, accounts, ratings
- `patterns-data-and-content.md`: entering data, searching, file management, undo and redo, drag and drop, charting, printing
- `patterns-feedback-and-media.md`: feedback, loading, notifications, audio, video, haptics, collaboration, live viewing, workouts

**Components**
- `components-content-and-layout.md`: charts, image views, text views, web views, boxes, collections, column views, disclosure controls, labels, lists and tables, lockups, outline views, split views, tab views
- `components-menus-and-actions.md`: activity views, buttons, context menus, Dock menus, edit menus, Home Screen quick actions, menus, ornaments, pop-up and pull-down buttons, the menu bar, toolbars
- `components-navigation-and-presentation.md`: path controls, search fields, sidebars, tab bars, token fields, action sheets, alerts, page controls, panels, popovers, scroll views, sheets, windows
- `components-input-and-status.md`: color wells, combo boxes, digit entry, image wells, pickers, segmented controls, sliders, steppers, text fields, toggles, virtual keyboards, activity rings, gauges, progress indicators, rating indicators
- `components-system-experiences.md`: app shortcuts, complications, controls, Live Activities, notifications, snippets, status bars, Top Shelf, watch faces, widgets

**Inputs and technologies**
- `inputs.md`: gestures, keyboards, pointing devices, focus, eyes, Digital Crown, Action button, Camera Control, Apple Pencil, remotes, game controls, motion sensors, nearby interactions
- `technologies.md`: Apple Pay, Sign in with Apple, Wallet, Tap to Pay, App Clips, in-app purchase, Game Center, generative AI, machine learning, Siri, SharePlay, CarPlay, Maps, AR, HealthKit, HomeKit, iCloud, and more

**Web**
- `web-translation.md`: how each HIG rule maps to HTML, CSS, React, and this repository's conventions
</reference_index>

<workflows_index>
| Workflow | Purpose |
|----------|---------|
| `design-new-screen.md` | Design a screen, flow, or component from purpose through states, copy, and accessibility |
| `review-against-hig.md` | Inventory a UI, check it against the relevant HIG topics, and report prioritized findings with citations |
| `choose-component.md` | Pick the right component or pattern for a job using the decision guides |
| `accessibility-audit.md` | Run the five accessibility dimensions plus VoiceOver, Dynamic Type, contrast, and motion checks |
| `adapt-across-platforms.md` | Translate an existing design to another Apple platform's idioms, inputs, and sizes |
| `apply-to-web.md` | Bring Apple's principles into this repository's Next.js, React, and Tailwind UI |
</workflows_index>

<templates_index>
| Template | Use |
|----------|-----|
| `templates/screen-spec.md` | Output structure for a designed screen or flow |
| `templates/hig-review-report.md` | Output structure for a review or audit |
</templates_index>

<verification_loop>
Before you hand back a design, review, or implementation:

1. Run the `<quick_checklist>` of every reference you loaded against your output.
2. Re-read the non-negotiables above and confirm none is violated.
3. State the result plainly: which checks pass, which fail, and what you changed. Cite the HIG page URL for each rule you relied on.
4. For code in this repository, also run the project checks (`npm run lint`, `npm test`) and, when a change is visual, look at it in the running app before calling it done.
</verification_loop>

<success_criteria>
The skill has done its job when:
- The recommendation or design follows the HIG as of 2026, including Liquid Glass, and each rule cited links to its source page.
- Every non-negotiable is met or the exception is stated with its reason.
- System components are preferred and any custom component reproduces system states and accessibility.
- The output uses the matching template, is concise, and names the platform assumptions it made.
- For web work, the mapping in `references/web-translation.md` was applied and project checks pass.
</success_criteria>
