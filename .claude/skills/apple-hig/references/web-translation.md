<overview>
How to apply Apple's Human Interface Guidelines to a web app, and specifically to this repository (Next.js 16 App Router, React 19, Tailwind CSS 4, shadcn-style components on Radix primitives in `src/components/ui`, Lucide icons, theme tokens in `src/app/globals.css`, dark mode via the `.dark` class). The HIG is written for Apple platforms; this file maps each rule to HTML, CSS, ARIA, and the components already in this codebase. Load it for any web design, review, or implementation task. Numbers marked (HIG) come from the guidelines; numbers marked (web adaptation) are this file's recommended translation, not Apple's rule.
</overview>

<topic name="Ground rules for translating the HIG to the web" source="https://developer.apple.com/design/human-interface-guidelines/design-principles">
The eight principles apply unchanged. On the web, "system components" means native HTML elements and this repository's `src/components/ui` library, and "platform conventions" means browser and OS conventions (back button, URL as state, text zoom, keyboard navigation, `prefers-*` media queries). Apple platform chrome (tab bars, Liquid Glass, Dynamic Island) is not something to imitate for its own sake; adopt the behavior behind it.

<best_practices>
- **Prefer native elements and the existing component library.** `button`, `a`, `input`, `select`, `dialog`, `details`, `progress` and the components in `src/components/ui` carry keyboard, focus, and assistive-technology behavior for free. Check the library before writing a new component.
- **Respect the browser as the platform.** URL reflects navigation state, the back button works, text zoom and OS font-size settings scale the page, `prefers-color-scheme`, `prefers-reduced-motion`, `prefers-contrast`, and `prefers-reduced-transparency` are honored.
- **Do not fake Apple chrome.** Do not draw a fake status bar, Dynamic Island, or home indicator, and do not bundle San Francisco or SF Symbols. Apple's font license (developer.apple.com/fonts) forbids embedding the SF fonts in websites, software, or other products and limits them to mock-ups of software for Apple platforms; SF Symbols ship under a comparable agreement. `system-ui` already renders San Francisco on Apple devices.
- **Read this repository's own rules first.** `AGENTS.md` requires reading the matching guide in `node_modules/next/dist/docs/` before writing Next.js code, because this Next.js version differs from older conventions.
</best_practices>
</topic>

<topic name="Typography" source="https://developer.apple.com/design/human-interface-guidelines/typography" updated="2025-12-16">
Use the system font stack, a small set of text styles, and relative units so text scales like Dynamic Type.

<best_practices>
- **Font stack:** `font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` (already `--font-sans` in `globals.css`). Serif alternative: `ui-serif, "New York", Georgia, serif`. Monospace: `ui-monospace, SFMono-Regular, Menlo, monospace`.
- **Sizes in rem, never px, for text.** 1 rem tracks the person's browser or OS text size, which is the web's Dynamic Type. Never set `font-size` on `html` in px, never use `maximum-scale=1` or `user-scalable=no`, and set `-webkit-text-size-adjust: 100%`.
- **Default and minimum (HIG):** iOS body is 17 pt; minimum 11 pt. macOS body is 13 pt; minimum 10 pt. Web adaptation: body 1rem (16 px, close to iOS 17 pt on a 16 px root) or 1.0625rem for a touch-first product; nothing below 0.6875rem (11 px) and only for captions.
- **Weights:** Regular, Medium, Semibold, Bold. Avoid 100 to 300 weights (HIG: avoid Ultralight, Thin, Light).
- **Hierarchy through the text styles below, not through many typefaces.** One family plus optional serif for editorial content.
- **Leading:** use the HIG leading values as `line-height`; loosen for long passages, never tighten below the table for three or more lines.
- **Test at 200 percent.** Browser zoom 200 percent and OS text size at the largest setting; layouts stack, rows grow, nothing truncates useful text.
- **Do not embed the SF fonts.** Use `font-optical-sizing: auto` so variable system fonts pick the right optical size.
</best_practices>

<specs>
iOS Large (default) Dynamic Type scale (HIG) and a rem mapping for a 16 px root (web adaptation):

| Style | Weight | pt | Leading pt | rem | line-height | Tailwind 4 utility (arbitrary) |
|---|---|---|---|---|---|---|
| Large Title | Regular (Bold emphasized) | 34 | 41 | 2.125 | 1.2 | `text-[2.125rem]/[1.2]` |
| Title 1 | Regular (Bold) | 28 | 34 | 1.75 | 1.21 | `text-[1.75rem]/[1.21]` |
| Title 2 | Regular (Bold) | 22 | 28 | 1.375 | 1.27 | `text-[1.375rem]/[1.27]` |
| Title 3 | Regular (Semibold) | 20 | 25 | 1.25 | 1.25 | `text-[1.25rem]/[1.25]` |
| Headline | Semibold | 17 | 22 | 1.0625 | 1.29 | `text-[1.0625rem]/[1.29] font-semibold` |
| Body | Regular | 17 | 22 | 1.0625 | 1.29 | `text-[1.0625rem]/[1.29]` |
| Callout | Regular | 16 | 21 | 1 | 1.31 | `text-base/[1.31]` |
| Subhead | Regular | 15 | 20 | 0.9375 | 1.33 | `text-[0.9375rem]/[1.33]` |
| Footnote | Regular | 13 | 18 | 0.8125 | 1.38 | `text-[0.8125rem]/[1.38]` |
| Caption 1 | Regular | 12 | 16 | 0.75 | 1.33 | `text-xs/[1.33]` |
| Caption 2 | Regular | 11 | 13 | 0.6875 | 1.18 | `text-[0.6875rem]/[1.18]` |

macOS built-in text styles (HIG), for desktop-density screens: Large Title 26/32, Title 1 22/26, Title 2 17/22, Title 3 15/20, Headline 13/16 Bold, Body 13/16, Callout 12/15, Subheadline 11/14, Footnote 10/13, Caption 10/13. Web adaptation: use the iOS scale on compact widths and consider the macOS scale only for dense desktop tools; never go below 0.6875rem.

Recommended: define these as Tailwind theme tokens once (`--text-title-1`, `--text-body`, ...) in `globals.css` under `@theme` instead of repeating arbitrary values.
</specs>

<anti_patterns>
- Pixel font sizes, disabled zoom, thin weights, more than two typefaces
- Text that does not reflow at 200 percent
- Bundling SF Pro or SF Symbols as web assets
</anti_patterns>
</topic>

<topic name="Color and Dark Mode" source="https://developer.apple.com/design/human-interface-guidelines/color" updated="2025-12-16">
Use semantic tokens that carry meaning, adapt to light, dark, and increased contrast, and never hard-code system-looking values.

<best_practices>
- **Semantic roles the HIG defines, and the token in this repository that plays each role:**

| HIG role | Purpose | This repo (`globals.css`) | Gap to fill if needed |
|---|---|---|---|
| Label | primary text | `--foreground` | |
| Secondary label | secondary text | `--muted-foreground` | |
| Tertiary / quaternary label | de-emphasized text, disabled | none | add `--foreground-tertiary` rather than `opacity` on text |
| Placeholder text | inputs | `placeholder:text-muted-foreground` | |
| Separator | hairlines that let content show through | `--border` | |
| Link | text links | `--primary` or a dedicated `--link` | prefer a dedicated token so links and primary buttons can differ |
| System background primary / secondary / tertiary | view, grouping, nested grouping | `--background`, `--card` or `--secondary`, `--muted` | |
| Grouped background set | inset grouped lists and settings screens | none | add `--background-grouped` (light gray page, white cards) for settings-style screens |
| Tint / accent | primary actions, selection, links | `--primary`, `--accent` | keep one tint; `--accent` here is a neutral hover fill, not Apple's accent |
| Status | success, warning, info, destructive | `--success`, `--warning`, `--info`, `--destructive` | |

- **Both dark-mode mechanisms.** This repo toggles `.dark`; also honor `prefers-color-scheme: dark` when no explicit choice is stored, and set `color-scheme: light dark` on `:root` so native controls and scrollbars follow.
- **Contrast (HIG):** at least 4.5:1 for text up to 17 pt, 3:1 for 18 pt and larger or bold, in both appearances. Add a `prefers-contrast: more` block that raises contrast of secondary text and borders, and check `forced-colors: active` renders with system colors.
- **Never color alone.** Pair status color with an icon, label, or shape.
- **Tint sparingly.** One tint, on the primary action and selection. Avoid tinting large areas or every icon.
- **Do not hard-code Apple system color values** (HIG says values change between releases). Use this repo's oklch tokens; if a status color is needed, add a token.
- **Charts:** use `--chart-1` to `--chart-5`; ensure adjacent series differ in lightness, not only hue, and add a legend or direct labels.
</best_practices>

<anti_patterns>
- Raw hex or oklch in components instead of tokens
- Tinting text on a translucent bar (HIG: keep monochrome on Liquid Glass; color only on the primary action's background)
- Gray-on-gray text below 4.5:1, red and green as the only status difference
</anti_patterns>
</topic>

<topic name="Layout, size classes, and safe areas" source="https://developer.apple.com/design/human-interface-guidelines/layout" updated="2026-09-09">
Decide layout by available space, not device. Respect safe areas. Keep functionality identical as width changes.

<best_practices>
- **Size classes map to container queries and breakpoints.** Compact width behaves like iPhone: single column, bottom navigation, full-width buttons, sheets from the bottom. Regular width behaves like iPad and Mac: sidebar, split views, popovers, multi-column. Web adaptation: treat below 640 CSS px (Tailwind `sm`) as compact and `md` and above as regular; prefer `@container` queries for components that live in both.
- **Same features in both idioms.** Only the amount visible at once changes (HIG). A tab bar item that becomes a sidebar item keeps its label, icon, and order.
- **Reading order.** Most important content top-leading; use logical properties (`ms-`, `me-`, `ps-`, `text-start`) and set `dir` on `html` so right-to-left mirrors correctly.
- **Safe areas.** Add `viewport-fit=cover` to the viewport meta and pad fixed bars and full-bleed content with `env(safe-area-inset-top|bottom|left|right)`; sticky bottom bars use `padding-bottom: max(1rem, env(safe-area-inset-bottom))`.
- **Content extends under bars.** Fixed or sticky headers and bottom bars sit over scrolling content with a translucent background (see Materials), and scrolling containers use `scroll-padding` so anchored content is not hidden beneath them.
- **Margins and grouping (web adaptation).** 16 px page margins on compact, 24 to 32 px on regular; 8 px spacing steps; group with space, container shapes (cards), or separators, and use indentation for hierarchy.
- **Progressive disclosure.** `details`, the accordion and collapsible components, menus, and secondary pages instead of everything on one screen.
- **Windows.** On regular widths, let people resize; do not lock a minimum width wider than 320 px. Test compact (about 390 px), regular (about 1024 px), and very wide (about 1920 px) plus 200 percent zoom.
</best_practices>

<anti_patterns>
- Device sniffing to choose layout; fixed pixel widths; horizontal page scrolling
- Bottom bars without safe-area padding; content hidden under sticky headers
- Different features on mobile and desktop
</anti_patterns>
</topic>

<topic name="Materials and Liquid Glass on the web" source="https://developer.apple.com/design/human-interface-guidelines/materials" updated="2025-09-09">
Liquid Glass is the floating control layer (2025). On the web the equivalent is a translucent, blurred bar for navigation and toolbars only, never for content.

<best_practices>
- **Only on floating controls and navigation:** sticky headers, bottom tab bars, floating toolbars, and floating action clusters. Cards, sections, and page backgrounds use solid or standard translucent fills, not glass (HIG: never in the content layer).
- **Regular glass (web adaptation):** `background: color-mix(in oklch, var(--background) 72%, transparent); backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: ...;` plus a hairline `border-bottom: 1px solid color-mix(in oklch, var(--border) 60%, transparent)`. Text and icons on it stay monochrome (`--foreground`), tint only the primary action.
- **Clear glass** only over photos and video, with a dark scrim of about 35 percent when the media is bright (HIG).
- **Scroll edge effect.** Instead of a solid bar, fade the content at the bar's edge: a small gradient from `var(--background)` to transparent below the header, or a bar that only gains its background after the page scrolls (`IntersectionObserver` sentinel or `animation-timeline: scroll()`).
- **Fallbacks.** `@supports not (backdrop-filter: blur(1px))` use an opaque `var(--background)`. Under `prefers-reduced-transparency: reduce` use opaque backgrounds. Under `prefers-contrast: more` raise the bar's opacity.
- **Sparingly.** One glass layer per screen region. Stacked glass on glass is a HIG anti-pattern.
</best_practices>

<anti_patterns>
- Glassmorphism cards everywhere; glass on the content layer
- Colored or gradient glass bars; tinted labels on glass
- Blur without a fallback or without reduced-transparency support
</anti_patterns>
</topic>

<topic name="Motion" source="https://developer.apple.com/design/human-interface-guidelines/motion" updated="2025-09-09">
Motion is purposeful, brief, cancelable, and optional.

<best_practices>
- **Purposeful.** Animate to show a relationship (where a sheet came from, what a button did), not to decorate. No motion on frequent interactions beyond the subtle defaults (hover and press feedback is enough).
- **Brief and precise (web adaptation).** Around 150 to 250 ms for state changes, up to about 350 ms for view transitions; `ease-out` for entering, `ease-in` for leaving. Never block input while animating; let a second click cancel or skip.
- **Reduce Motion.** Under `prefers-reduced-motion: reduce`, replace movement, scaling, and parallax with opacity fades, tighten or remove springs, stop auto-playing carousels and looping animations, and never animate blur. Keep essential state changes visible without motion.
- **Follow the gesture.** A sheet dragged down dismisses down; a panel opened from the side leaves to the side.
- **Use the View Transitions API or CSS transitions with `transform` and `opacity` only**; do not animate `width`, `height`, or layout properties except for small disclosure containers already handled by the library's accordion and collapsible animations.
- **Animated icons** are acceptable for meaningful feedback (a checkmark drawing after save), not for idle decoration.
</best_practices>

<anti_patterns>
- Autoplaying or looping motion without controls; parallax by default
- Animations that must finish before the next action; motion as the only feedback
- Ignoring `prefers-reduced-motion`
</anti_patterns>
</topic>

<topic name="Targets, pointers, keyboards, and gestures" source="https://developer.apple.com/design/human-interface-guidelines/inputs">
Support touch, pointer, and keyboard equally; every gesture has a visible control.

<best_practices>
- **Hit targets (HIG):** 44x44 pt on touch; 28x28 pt minimum on macOS pointer. Web adaptation: 44x44 CSS px minimum for anything a finger taps (`min-h-11 min-w-11`), 32 px acceptable for pointer-only dense tables under `@media (pointer: fine)`. This repo's `Button` default is `h-9` (36 px): use `size="lg"` or larger, or add a `touch` size that resolves to 44 px on coarse pointers. Add about 8 to 12 px between adjacent targets (HIG: 12 pt around bezeled elements, 24 pt around unbezeled).
- **Hover only where hover exists.** Wrap hover-only affordances in `@media (hover: hover) and (pointer: fine)`; never hide primary actions behind hover. Tooltips (`tooltip.tsx`) supplement labels, never replace them.
- **Pointer feedback.** Buttons show hover and pressed states (`hover:`, `active:`); rows highlight on hover; drag handles show `cursor: grab`. `touch-action: manipulation` on tappable controls removes the 300 ms delay on some browsers.
- **Keyboard.** Everything reachable by Tab in a sensible order; `:focus-visible` rings are never removed (the library's `focus-visible:ring-2` is the standard); Enter activates the primary action in forms and dialogs; Escape closes sheets, popovers, and menus; arrow keys move within menus, tabs, and radio groups (Radix handles this). Do not override browser or OS shortcuts; app shortcuts use modifier combinations the browser does not claim, show the symbol for the current platform (⌘ on Apple devices, Ctrl elsewhere), and are listed in a help view.
- **Virtual keyboards.** Set `type`, `inputmode`, `autocomplete`, `enterkeyhint`, and `autocapitalize` so the right keyboard appears (`inputmode="numeric"` for codes, `type="email"`, `autocomplete="one-time-code"`). Keep the focused field visible above the keyboard.
- **Gestures.** Swipe-to-delete, drag-and-drop (`@dnd-kit` in this repo), and pinch are enhancements; the same actions exist as visible buttons and menu items, and drag-and-drop has keyboard sensors enabled.
- **Scrolling.** Native scrolling only; never hijack the wheel; `overscroll-behavior: contain` inside sheets and drawers.
</best_practices>

<anti_patterns>
- Removing focus outlines; hover-only actions; tooltips as the only label
- Targets under 44 px on touch; icon buttons without `aria-label`
- Custom scrolling, disabled zoom, gesture-only features
</anti_patterns>
</topic>

<topic name="Component mapping" source="https://developer.apple.com/design/human-interface-guidelines/components">
Map each HIG component to the native element or the component in `src/components/ui`, and carry its HIG rules across.

<specs>
| HIG component | Use when (HIG) | Web / this repo | Rules that carry over |
|---|---|---|---|
| Alert | critical information that needs a decision | `dialog.tsx` with `role="alertdialog"`, or native `dialog` | title states the situation; one or two buttons, at most three; Cancel on the leading side, default action trailing; destructive action never the default; no alert for routine confirmations |
| Action sheet | choice tied to the action just taken (compact) | bottom-anchored `dialog.tsx` on compact, `popover.tsx` on regular | at most four buttons including Cancel; destructive buttons in the destructive style at the top; Cancel at the bottom; short one-line title; never scrolls |
| Sheet | a distinct short task | `dialog.tsx` (bottom sheet on compact, centered on regular) | title names the task; explicit Done and Cancel; confirm before discarding edits; never sheet on sheet |
| Popover | transient options anchored to a control, regular width only | `popover.tsx` | never on compact widths (use a sheet); closes on outside click and Escape; no popover from a popover |
| Context menu | actions on the thing under the pointer or long press | `dropdown-menu.tsx` opened on `contextmenu` and long press | few, relevant items; the same actions reachable from the main interface; unavailable items hidden not dimmed; destructive items warned about; submenus one level; no keyboard shortcuts shown |
| Menu / pull-down button | a list of related actions | `dropdown-menu.tsx`; trigger shows a chevron or ellipsis | verbs, title-style labels, separators between groups, icons consistent (2026: menu item icons), submenus one level |
| Pop-up button | choose one of several values | `select.tsx` | shows the current value; not for actions |
| Button | instantaneous action | `button.tsx` | one or two prominent (`variant="default"`) per view; `secondary`/`outline` for standard, `ghost` for borderless in toolbars, `destructive` only for destructive; verb labels; always a pressed state; 44 px on touch |
| Toggle | a setting that is on or off | `switch.tsx` only inside a list or settings row; `checkbox.tsx` in forms and hierarchies of settings; a toggle-style button (`toggle`, `toggle-group`) outside lists | context or label states the thing controlled, not the state; obvious on and off difference; never a toggle for an action; do not replace an existing checkbox with a switch |
| Segmented control | closely related choices that affect a view, state, or object | `tabs.tsx` (view switching) or `toggle-group` (value) | no more than about five to seven segments in a wide interface and five on compact widths; all text or all icons, never mixed; equal widths; noun labels in title style; segments select, they never act |
| Picker | choose from a long or structured set | `select.tsx`, native `input type="date"`, `date-selector.tsx`, `mini-calendar.tsx` | prefer native pickers on mobile; show current value |
| Slider | continuous value where precision is not critical | native `input type="range"` styled with tokens | show value if it matters; leading and trailing icons for min and max |
| Stepper | small precise increments | `stepper.tsx`, `number-field.tsx` | pair with a visible value; for wide ranges use a field |
| Text field | free text | `input.tsx`, `textarea.tsx` with `label.tsx` | visible label, placeholder is a hint not the label, inline validation after leaving the field, clear button for search |
| Search field | search | `input type="search"` in a form, `autocomplete.tsx` for suggestions | placeholder "Search" or the scope, results as you type when cheap, scope bar for filters |
| Tab bar | top-level flat navigation, compact | bottom `nav` with a small number of links, active state, icons plus labels | never for actions; weigh every added tab against complexity and avoid overflow; never hide or disable a tab; same items become the sidebar on regular widths; search may be a tab (2026) |
| Sidebar | top-level navigation, regular width | `dashboard-sidebar.tsx`, `crypto-sidebar.tsx` | collapsible and hideable; at most two levels of hierarchy with short group labels; icons use the accent color by default and any other icon color must serve a clear purpose (2026); nothing critical at the bottom |
| Split view | list-detail | CSS grid or the sidebar plus main; keep URL for detail | two or three columns; primary column resizable on desktop |
| List / table | rows of items or structured data | `table.tsx`, `data-grid.tsx`, or `ul` with rows | grouped style with section headers for settings screens; disclosure chevrons for navigation rows; swipe actions also in a menu |
| Disclosure control | show or hide detail in place | `accordion`, `collapsible`, `details` | chevron rotates; state announced |
| Toolbar | frequent actions for the current view | `div role="toolbar"` with `ghost` icon buttons and labels | choose items deliberately to avoid overcrowding and move the rest to a More menu; simple recognizable symbols; no custom bar backgrounds or tinted controls (2025 Liquid Glass); standard Back and Close; a concise title under 15 characters that is not the app name |
| Progress indicator | ongoing work | `progress.tsx` (determinate), spinner or skeleton (indeterminate), `role="progressbar"` or `role="status"` | show it for anything over about a second; keep the rest of the UI usable; label what is happening |
| Activity view (share) | send content elsewhere | Web Share API with fallback menu | share icon is the square with an up arrow |
| Charts | data | `area-chart.tsx`, `bar-chart.tsx`, `donut-chart.tsx`, `sparkline-chart.tsx`, `portfolio-chart.tsx` | title and axes labels, direct labels over legends when possible, a data table or summary for assistive tech |
| Rating indicator | show or collect a rating | `rating.tsx` | keyboard operable, value announced |
| Notification | out-of-app updates | Web Push with the Notifications API, requested after value is shown | never at first load; explain first; group and keep short |
| Widget | glanceable info outside the app | not applicable; nearest: `stat-card.tsx` on a dashboard, or a PWA shortcut | |

For every component: check the topic in the matching `components-*.md` reference for the full rule set.
</specs>
</topic>

<topic name="Icons and imagery" source="https://developer.apple.com/design/human-interface-guidelines/icons">
Icons are consistent in weight and size, match text, and carry the familiar meaning.

<best_practices>
- **Use `lucide-react` (already installed) as the single icon set.** Match its stroke weight to the text weight beside it and size icons in `em` or with the text style (`size-4` for body, `size-5` for headlines). Do not mix icon sets in one view.
- **Reuse the meanings people know (HIG standard icons):** share is a square with an up arrow (`Share`), add is `Plus`, compose is `SquarePen`, delete is `Trash2`, search is `Search`, settings is `Settings`, more is `Ellipsis`, close is `X`, back is `ChevronLeft`, filter is `ListFilter` or `SlidersHorizontal`, favorite is `Heart` or `Star`. The `icons-images-symbols.md` reference has the full table.
- **Label every icon-only control** with `aria-label` (and a tooltip on pointer devices). Prefer text plus icon when space allows.
- **Images:** serve 1x, 2x, and 3x or use `next/image` with `sizes`; `alt` describes meaning or is empty for decoration; never stretch; provide dark-appearance variants for images with light backgrounds.
- **App icon on the web:** favicon and `apple-touch-icon` at 180x180 without transparency and without your own rounded corners (the system masks it).
</best_practices>
</topic>

<topic name="Writing" source="https://developer.apple.com/design/human-interface-guidelines/writing">
Copy follows the HIG unchanged on the web.

<best_practices>
- **Buttons and titles in title-style capitalization** ("Add to Cart", "Delete Note"); body, hints, and error text in sentence style.
- **Buttons are verbs that say what happens.** Not "OK" and "Yes"; "Delete" and "Keep Editing".
- **Alerts:** title states the situation ("Delete 12 Notes?"), the message adds the consequence, buttons say the outcome.
- **Errors say what happened and what to do, without blame or codes**; validation appears next to the field.
- **Concise, specific, no jargon**; "you" is fine, "user" is not; ellipsis on a menu item or button that opens a further step.
- **Empty states** name what goes here and offer the action that fills it.
</best_practices>
</topic>

<topic name="Feedback, states, and undo" source="https://developer.apple.com/design/human-interface-guidelines/feedback">
Every action gets proportionate feedback; destructive or irreversible actions are protected; loading never strands the person.

<best_practices>
- **Announce status changes** with `role="status"` and `aria-live="polite"`; errors that need attention use `role="alert"`.
- **Loading:** show an indicator after about one second (web adaptation) of waiting, skeletons that match final layout for content areas, `progress` when the amount is known; keep navigation usable; never a full-screen blocker for background work.
- **Undo over confirmation for reversible actions:** a status toast with an "Undo" action; confirmation dialogs only for irreversible or bulk destructive actions.
- **Success feedback matches weight:** inline change for small actions, a brief status toast for saves, a dedicated screen only for milestones (order placed).
- **No haptics on the web;** use motion and sound sparingly as the equivalent, and never sound without a visible cue.
</best_practices>
</topic>

<topic name="Privacy and permissions on the web" source="https://developer.apple.com/design/human-interface-guidelines/privacy">
Browser permission prompts follow the same rules as system permission alerts.

<best_practices>
- **Request in context, after the person acts** (tap "Use my location", "Enable notifications"), never on page load.
- **Explain the benefit first in your own UI**, then call the browser API; the browser prompt cannot be customized, so the explanation lives before it.
- **Handle denial gracefully** with a manual alternative (enter a city; check the inbox instead of push).
- **Collect only what the feature needs**, show what is stored, offer deletion, and keep account deletion as easy as creation.
- **Sign in with Apple on the web** follows the button rules in `technologies.md` (styles, sizes, placement, and offering it whenever other third-party sign-in is offered).
</best_practices>
</topic>

<topic name="Accessibility on the web" source="https://developer.apple.com/design/human-interface-guidelines/accessibility" updated="2025-06-09">
The HIG's five dimensions map to WCAG practices already expected on the web.

<best_practices>
- **Vision:** contrast per the HIG table (WCAG AA); text scales to 200 percent; `prefers-contrast: more` and `forced-colors` supported; meaning never by color alone; icons scale with text.
- **Screen readers (VoiceOver):** semantic landmarks (`header`, `nav`, `main`, `aside`, `footer`), one `h1` and ordered headings, `label` for every field, `aria-label` for icon buttons, `alt` for images, `aria-expanded` and `aria-controls` on disclosures, `aria-current="page"` on navigation, live regions for status, focus moved into dialogs and returned on close (Radix does this), and reading order equal to visual order.
- **Hearing:** captions or transcripts for media; no audio-only cues.
- **Mobility:** 44 px targets, spacing, keyboard for everything, no time limits, drag-and-drop with keyboard sensors, skip link to main content.
- **Cognitive:** simple consistent interactions, no auto-dismissing content, no autoplay, `prefers-reduced-motion` honored, clear error recovery.
- **Language and direction:** `lang` on `html`, `dir` when localized, logical CSS properties.
- **Test:** keyboard-only walk, VoiceOver on Safari (macOS or iOS), 200 percent zoom, dark mode, reduced motion, and an automated pass (axe or Lighthouse) before calling it done.
</best_practices>
</topic>

<decision_guide>
- **Compact or regular?** Below `sm` (640 px) behave like iPhone: bottom navigation, full-width primary buttons, bottom sheets, single column, no popovers. At `md` and above behave like iPad and Mac: sidebar, split views, popovers and menus, multi-column, hover affordances allowed as supplements.
- **Which modal?** Needs a decision about critical information: alert dialog. A choice about the action just taken on compact: action sheet (bottom dialog). A short distinct task: sheet (dialog). Transient options anchored to a control on regular width: popover. A long task: a new page with its own URL, not a modal.
- **Which control?** One of 2 to 5 views: tabs or segmented toggle group. One of many values: select. On or off: switch (settings) or checkbox (forms). Range without precision: range input. Small precise increments: stepper. Free text: input with a label.
- **Glass or not?** Only for a floating navigation or toolbar layer over scrolling content, with fallbacks. Cards and content: solid tokens.
- **New component or existing?** Search `src/components/ui` first; extend variants (for example a 44 px touch size on `button.tsx`) before creating a parallel component.
- **Where to put tokens?** New semantic colors and text styles go in `src/app/globals.css` under `:root`, `.dark`, and `@theme inline`, never inline in components.
</decision_guide>

<quick_checklist>
- [ ] Text uses rem, system font stack, weights 400 to 700, and reflows at 200 percent zoom
- [ ] Colors come from semantic tokens; contrast 4.5:1 (3:1 for large or bold) in light and dark; nothing conveyed by color alone
- [ ] `color-scheme`, `prefers-color-scheme`, `prefers-contrast`, `prefers-reduced-motion`, `prefers-reduced-transparency` handled
- [ ] Layout decided by container or breakpoint, not device; same features on compact and regular
- [ ] Safe-area insets on fixed bars; content scrolls under translucent bars with a scroll edge treatment; no glass in the content layer
- [ ] Touch targets 44 px with 8 to 12 px spacing; hover-only affordances gated by `(hover: hover)`; focus rings intact
- [ ] Every gesture and drag has a button or menu equivalent and a keyboard path
- [ ] Right modal rung: alert dialog, bottom action sheet, sheet, popover (regular only), or a page
- [ ] One or two prominent buttons per view; destructive never the default; verb labels in title style
- [ ] Inputs have labels, correct `type`, `inputmode`, `autocomplete`, and inline validation
- [ ] Loading, empty, error, and success states exist; status announced via live regions; undo offered for reversible actions
- [ ] Permissions requested in context after explanation; denial handled
- [ ] Icons from one set, sized to text, labeled when icon-only; no bundled SF assets
- [ ] Landmarks, heading order, `alt`, `aria-*` on custom widgets; VoiceOver and keyboard walk done
- [ ] `npm run lint` and `npm test` pass; change viewed in the running app at compact and regular widths
</quick_checklist>
