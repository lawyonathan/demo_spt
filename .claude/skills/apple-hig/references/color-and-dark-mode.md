<overview>
Color and appearance across Apple platforms: system versus custom colors, inclusive color, dynamic semantic colors, color on Liquid Glass (2025), color management (sRGB and Display P3), and Dark Mode (adaptive colors, contrast ratios, base and elevated backgrounds, desktop tinting).
Distills the HIG pages `color` (updated 2025-12-16 for Liquid Glass) and `dark-mode` (updated 2024-08-06).
Load when defining a palette or app accent color, tinting Liquid Glass controls, choosing background or label colors, reviewing contrast, or checking a UI in light, dark, and Increase Contrast appearances.
</overview>

<topic name="Color" source="https://developer.apple.com/design/human-interface-guidelines/color" updated="2025-12-16">
Judicious color enhances communication, evokes brand, provides continuity, communicates status and feedback, and helps people understand information. System colors already work on many backgrounds and appearance modes and adapt to vibrancy and accessibility settings; custom colors must supply the same variants.

<when_to_use>
- Use system and dynamic semantic colors by default; they define light, dark, and increased contrast variants.
- Use custom colors for brand or personality, each with light, dark, and increased contrast variants.
- Use grouped backgrounds (`systemGroupedBackground` and its secondary and tertiary variants) for a grouped table view; otherwise `systemBackground` and its variants.
- Use `ColorPicker` when people choose colors.
- (2025) Color the Liquid Glass background of one primary action (prominent button, such as Done); keep other toolbar and tab bar controls monochromatic, especially over colorful content; use the brand color as accent when content is mostly monochromatic.
</when_to_use>

<best_practices>
- **Avoid using the same color to mean different things.** A brand color that marks a borderless button as interactive must not also style noninteractive text.
- **Make sure all your app's colors work well in light, dark, and increased contrast contexts.** System colors vary subtly by appearance and diverge strongly with Increase Contrast on; a custom color needs light and dark variants plus an increased contrast option for each with significantly higher differentiation. (2025) Provide light and dark colors even in a single-appearance app so Liquid Glass can adapt.
- **Test your app's color scheme under a variety of lighting conditions.** Bright surroundings make colors darker and muted; dark ones make them bright and saturated; in visionOS nearby walls and objects reflect into the app.
- **Test your app on different devices.** True Tone (some iPhone, iPad, Mac) shifts the white point; reading, photo, video, and gaming apps can tune it with `UIWhitePointAdaptivityStyle`. Test tvOS on multiple brands of HD and 4K TVs and display settings; test Mac under P3 and sRGB profiles (System Settings > Displays).
- **Consider how artwork and translucency affect nearby colors.** Maps goes light in map mode and dark in satellite mode; colors shift behind or on translucent elements like a toolbar.
- **If your app lets people choose colors, prefer system-provided color controls where available.**
- **Avoid relying solely on color to differentiate between objects, indicate interactivity, or communicate essential information.** Back it with text labels or glyph shapes for people with color blindness.
- **Avoid using colors that make it hard to perceive content in your app.** Low contrast blends icons and text into the background; some pairs are indistinguishable to color-blind people.
- **Consider how the colors you use might be perceived in other countries and cultures.** Red means danger in some cultures and positivity in others (Stocks: positive trend is green in English, red in Chinese).
- **Avoid hard-coding system color values in your app.** Documented values are references that fluctuate by release; use APIs like SwiftUI `Color`.
- **Use dynamic system colors for their semantic purpose.** iOS, iPadOS, macOS, and visionOS define them by role (background hierarchy levels; labels, links, separators) and they adapt to light and dark.
- **Avoid redefining the semantic meanings of dynamic system colors.** No `separator` as text color, no `secondaryLabel` as background.
- **(2025) Treat Liquid Glass as colorless by default.** It takes color from content behind it; coloring a Liquid Glass element gives a stained glass look for emphasis (primary call to action, the system's prominent button style), and symbols or text on it can also be colored. Toolbars and tab bars flip between light and dark with the underlying content and keep symbols and text monochromatic (darker over light, lighter over dark); larger elements like sidebars render more opaque for legibility over complex backgrounds.
- **(2025) Apply color sparingly to the Liquid Glass material, and to symbols or text on the material.** Reserve it for status indicators or primary actions; emphasize a primary action by coloring the background (app accent color on the Done button), not its symbol or text; refrain from coloring the backgrounds of multiple controls.
- **(2025) Avoid using similar colors in control labels if your app has a colorful background.** Prefer a monochromatic toolbar and tab bar, or an accent color with sufficient differentiation; with monochromatic content, the brand color as app accent color works well.
- **(2025) Be aware of the placement of color in the content layer.** Avoid overlapping similar colors in content and controls; content may scroll under controls, but the resting state (top of a scrollable screen) must stay legible.
- **Apply color profiles to your images.** A color space (gamut) such as sRGB or Display P3 represents colors in a model like RGB or CMYK; the embedded profile lets displays reproduce them. sRGB is accurate on most displays.
- **Use wide color to enhance the visual experience on compatible displays.** P3 gives richer, more saturated photos, video, visual data, and status indicators; use the Display P3 profile at 16 bits per pixel (per channel), export PNG, and design on a wide color display.
- **Provide color space-specific image and color variations if necessary.** Similar P3 colors can merge and P3 gradients can clip on sRGB displays; supply per-color-space versions in the Xcode asset catalog.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** Two dynamic background sets, system and grouped, each with primary (overall view), secondary (groups within it), and tertiary (groups within secondary) variants. Foreground dynamic colors in specs.
- **macOS:** Dynamic system colors (also in the Developer palette of the Color panel) in specs. From macOS 11 an app accent color styles buttons, selection highlighting, and sidebar icons, applied only when General > Accent color is multicolor; any other choice replaces it everywhere except a sidebar icon with a fixed color you specify, which keeps its meaning-bearing color.
- **tvOS:** Consider a limited palette coordinated with the app logo, deferring to content. Avoid using only color to indicate focus; scaling and responsive animation are the primary cues.
- **visionOS:** Use color sparingly, especially on glass, where surroundings show through; use it to call attention or show relationships, in bold text and large areas rather than lightweight text or small areas. In fully immersive experiences keep brightness balanced: go fully bright only when the rest of the context is bright, and avoid a bright object on a very dark or black background, especially one that flashes or moves. System colors use the default dark values.
- **watchOS:** Use background color to support content or supply information (Activity infographic views match each ring color), not as flourish; avoid full-screen background color in long-lived views such as workout or audio-playing apps. People may prefer graphic complications in tinted mode, a single color derived from the wearer's selected color for images, gauges, and text.
</platform_considerations>

<specs>
*System colors (SwiftUI `Color`).* Each has default and increased contrast variants in light and dark; the source page shows them only as swatches and values change between releases, so reference the API, never a hex value. visionOS uses the default dark values.
| Name | SwiftUI API |
|---|---|
| Red | `red` |
| Orange | `orange` |
| Yellow | `yellow` |
| Green | `green` |
| Mint | `mint` |
| Teal | `teal` |
| Cyan | `cyan` |
| Blue | `blue` |
| Indigo | `indigo` |
| Purple | `purple` |
| Pink | `pink` |
| Brown | `brown` |

*iOS, iPadOS system grays (UIKit).* `systemGray`, `systemGray2`, `systemGray3`, `systemGray4`, `systemGray5`, `systemGray6`, each with default and increased contrast light and dark variants; SwiftUI `gray` equals `systemGray`.

*iOS, iPadOS dynamic background colors (UIKit).* System set: `systemBackground`, `secondarySystemBackground`, `tertiarySystemBackground`. Grouped set: `systemGroupedBackground`, `secondarySystemGroupedBackground`, `tertiarySystemGroupedBackground`.

*iOS, iPadOS dynamic foreground colors (UIKit `UIColor`)*
| Color | Use for | API |
|---|---|---|
| Label | Primary text content | `label` |
| Secondary label | Secondary text content | `secondaryLabel` |
| Tertiary label | Tertiary text content | `tertiaryLabel` |
| Quaternary label | Quaternary text content | `quaternaryLabel` |
| Placeholder text | Placeholder text in controls or text views | `placeholderText` |
| Separator | Separator that lets some underlying content show | `separator` |
| Opaque separator | Separator that hides underlying content | `opaqueSeparator` |
| Link | Text that functions as a link | `link` |

*macOS dynamic system colors (AppKit `NSColor`)*
| Color | Use for | API |
|---|---|---|
| Alternate selected control text | Text on a selected surface in a list or table | `alternateSelectedControlTextColor` |
| Alternating content background | Alternating rows or columns in a list, table, or collection view | `alternatingContentBackgroundColors` |
| Control accent | Accent color chosen in System Settings | `controlAccentColor` |
| Control background | Background of a large element such as a browser or table | `controlBackgroundColor` |
| Control | Surface of a control | `controlColor` |
| Control text | Text of an available control | `controlTextColor` |
| Current control tint | System-defined control tint | `currentControlTint` |
| Unavailable control text | Text of an unavailable control | `disabledControlTextColor` |
| Find highlight | A find indicator | `findHighlightColor` |
| Grid | Gridlines of an element such as a table | `gridColor` |
| Header text | Text of a table header cell | `headerTextColor` |
| Highlight | The virtual light source onscreen | `highlightColor` |
| Keyboard focus indicator | Ring around the keyboard-focused control | `keyboardFocusIndicatorColor` |
| Label | Primary label text | `labelColor` |
| Link | A link to other content | `linkColor` |
| Placeholder text | Placeholder string in a control or text view | `placeholderTextColor` |
| Quaternary label | Below tertiary importance, such as watermark text | `quaternaryLabelColor` |
| Secondary label | Subheading or additional information | `secondaryLabelColor` |
| Selected content background | Selected content in a key window or view | `selectedContentBackgroundColor` |
| Selected control | Surface of a selected control | `selectedControlColor` |
| Selected control text | Text of a selected control | `selectedControlTextColor` |
| Selected menu item text | Text of a selected menu | `selectedMenuItemTextColor` |
| Selected text background | Background of selected text | `selectedTextBackgroundColor` |
| Selected text | Selected text | `selectedTextColor` |
| Separator | Separator between content sections | `separatorColor` |
| Shadow | Virtual shadow of a raised object | `shadowColor` |
| Tertiary label | Below secondary importance | `tertiaryLabelColor` |
| Text background | Background behind text | `textBackgroundColor` |
| Text | Text in a document | `textColor` |
| Under page background | Background behind a document's content | `underPageBackgroundColor` |
| Unemphasized selected content background | Selected content in a non-key window or view | `unemphasizedSelectedContentBackgroundColor` |
| Unemphasized selected text background | Selected text background in a non-key window or view | `unemphasizedSelectedTextBackgroundColor` |
| Unemphasized selected text | Selected text in a non-key window or view | `unemphasizedSelectedTextColor` |
| Window background | Background of a window | `windowBackgroundColor` |
| Window frame text | Text in the window title bar area | `windowFrameTextColor` |
</specs>

<anti_patterns>
- Avoid one color with two meanings; avoid hard-coded system values; avoid repurposing semantic colors (separator as text, secondary label as background).
- Avoid color as the only carrier of meaning, interactivity, or state; avoid low-contrast or color-blind-indistinguishable pairs.
- Avoid custom colors without light, dark, and increased contrast variants, even in single-appearance apps (2025).
- (2025) Avoid coloring the Liquid Glass background of more than one control; avoid coloring symbols or text instead of the background for emphasis; avoid label colors similar to a colorful background; avoid similar colors overlapping between content and controls at rest.
- tvOS: Avoid color alone to indicate focus.
- visionOS: Avoid colored lightweight text or small areas; avoid bright objects on very dark or black backgrounds in immersive scenes, especially flashing or moving ones.
- watchOS: Avoid full-screen background color in long-lived views.
</anti_patterns>
</topic>

<topic name="Dark Mode" source="https://developer.apple.com/design/human-interface-guidelines/dark-mode" updated="2024-08-06">
Dark Mode is a systemwide appearance setting in iOS, iPadOS, macOS, and tvOS that applies a dark palette to every screen, view, menu, and control, often with greater perceptual contrast. People often choose it as their default and expect every app and game to respect it. Not supported in visionOS or watchOS.

<when_to_use>
- Follow the systemwide setting; never add an app-level appearance switch.
- Support Auto, which switches between light and dark during the day, possibly while the app runs.
- Use a dark-only appearance only in rare cases such as immersive media viewing where the UI should recede (Stocks is dark-only).
</when_to_use>

<best_practices>
- **Avoid offering an app-specific appearance setting.** It doubles the work and makes the app look broken when it ignores the system choice.
- **Ensure that your app looks good in both appearance modes.** Auto can switch while the app is running.
- **Test your content to make sure that it remains comfortably legible in both appearance modes.** Check Dark Mode with Increase Contrast and Reduce Transparency, separately and together; dark text on dark backgrounds can lose legibility, and Increase Contrast in Dark Mode can reduce contrast between dark text and a dark background.
- **In rare cases, consider using only a dark appearance in the interface.** For immersive media viewing where the UI recedes.
- **Embrace colors that adapt to the current appearance.** The dark palette dims backgrounds and brightens foregrounds, and not all colors are inversions. Semantic colors (`labelColor`, `controlColor` in macOS; `separator` in iOS and iPadOS) adapt automatically; for custom colors add a Color Set asset with bright and dim variants. Avoid hard-coded or non-adapting colors.
- **Aim for sufficient color contrast in all appearances.** Contrast ratio no lower than 4.5:1; for custom foreground and background colors strive for 7:1, especially in small text.
- **Soften the color of white backgrounds.** Slightly darken content images with white backgrounds so they do not glow.
- **Use SF Symbols wherever possible.** They work in both modes with dynamic tint colors or vibrancy.
- **Design separate interface icons for the light and dark appearances if necessary.** A full moon may need a dark outline only on light; an oil drop may need a border only on dark.
- **Make sure full-color images and icons look good in both appearances.** Reuse one asset if it works; otherwise modify it or ship light and dark assets combined in an asset catalog under one name.
- **Use the system-provided label colors for labels.** Primary, secondary, tertiary, and quaternary label colors adapt automatically.
- **Use system views to draw text fields and text views.** They adjust for the presence or absence of vibrancy; avoid drawing text yourself.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** Dark Mode uses base (dimmer, receding) and elevated (brighter, advancing) background sets to convey depth when dark interfaces stack. Prefer the system background colors: they switch from base to elevated automatically for foreground interfaces such as a popover or modal sheet, and elevated also separates apps in multitasking and windows in a multiple-window context; custom backgrounds hide these distinctions.
- **macOS:** With the graphite accent color, window backgrounds pick up color from the desktop picture (desktop tinting). Include some transparency in custom component backgrounds when appropriate, only for components with a visible background or bezel and only in a neutral, colorless state; transparency in a colored state makes the color fluctuate as the window moves or the desktop picture changes.
- **tvOS:** No additional considerations.
- **visionOS, watchOS:** Dark Mode not supported.
</platform_considerations>

<anti_patterns>
- Avoid an app-specific appearance setting.
- Avoid hard-coded or non-adapting colors, and avoid assuming dark colors are inversions of light ones.
- Avoid contrast below 4.5:1 (7:1 target for custom colors and small text).
- Avoid glowing white-background images and single-appearance icons or illustrations that lose detail in the other mode.
- Avoid drawing text yourself when a system view exists.
- iOS, iPadOS: Avoid custom backgrounds that defeat base versus elevated.
- macOS: Avoid transparency on a custom component while it is in a colored state.
</anti_patterns>
</topic>

<decision_guide>
- Text, background, separator, or link color: the dynamic semantic color for that role; never swap roles. Grouped table view: grouped background set; anything else: system set (primary view, secondary groups, tertiary groups within groups).
- Brand or custom color: Color Set with light, dark, and increased contrast variants of each, even for single-appearance apps (2025).
- One primary action in a Liquid Glass toolbar (2025): accent color on that button's background only; other controls monochromatic. Colorful or media content behind controls: monochromatic or strongly differentiated accent.
- Status or state people must understand: color plus label or glyph.
- Contrast: 4.5:1 minimum; 7:1 for custom pairs and small text; recheck with Increase Contrast and Reduce Transparency in both modes.
- Sheet, popover, or multitasking window in Dark Mode: system elevated background. Dark-only app: immersive media only.
- macOS: accent applies only under multicolor; fixed-color sidebar icons never overridden; custom components under desktop tinting get some transparency in a neutral state only.
- Wide color: Display P3, 16 bits per channel, PNG, with sRGB fallbacks when similar colors or gradients degrade.
- tvOS focus: scaling and animation, never color alone. visionOS: sparing, bold, large-area color and balanced brightness. watchOS: no full-screen background in long-lived views.
</decision_guide>

<quick_checklist>
- [ ] Every color comes from a system or semantic API, with no hard-coded system values?
- [ ] Each color carries one consistent meaning, and semantic roles are respected?
- [ ] Every custom color has light, dark, and increased contrast variants, even in a single-appearance app?
- [ ] No information is conveyed by color alone?
- [ ] Text contrast is at least 4.5:1 (7:1 for custom pairs and small text) in light, dark, Increase Contrast, and Reduce Transparency?
- [ ] At most one Liquid Glass control is colored, on its background rather than its symbol or text (2025)?
- [ ] Toolbars and tab bars are monochromatic over colorful content, and content at the resting scroll position keeps controls legible (2025)?
- [ ] No app-specific light/dark toggle, and Auto switching works while running?
- [ ] Dark Mode foreground layers use system elevated backgrounds?
- [ ] Icons and images look right in both appearances, with white-background images softened?
- [ ] Wide color assets have sRGB-safe fallbacks where gradients or near-identical colors could clip?
- [ ] Platform rules honored: tvOS focus not by color alone, visionOS color sparing and bold, watchOS no full-screen background in long-lived views?
</quick_checklist>
