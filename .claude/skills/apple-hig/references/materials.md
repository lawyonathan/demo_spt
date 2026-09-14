<overview>
Materials on Apple platforms: Liquid Glass (2025), the floating functional layer for controls and navigation with its regular and clear variants and 35% dimming rule, and the standard materials (ultraThin, thin, regular, thick) with vibrancy for labels, fills, and separators in the content layer. Distills the HIG page `materials` (updated 2025-09-09).
Load when styling toolbars, tab bars, sidebars, or custom controls with `glassEffect`, choosing a blur material for a content-layer background or overlay, picking vibrancy for text on a material, or designing visionOS windows.
</overview>

<topic name="Liquid Glass" source="https://developer.apple.com/design/human-interface-guidelines/materials" updated="2025-09-09">
(2025) Liquid Glass is a dynamic material that unifies the design language across Apple platforms. It forms a distinct functional layer for controls and navigation (tab bars, sidebars, toolbars) floating above the content layer; content scrolls and peeks through beneath while controls stay legible. Standard system components adopt it automatically.

<when_to_use>
- Use Liquid Glass for the functional layer only; use standard materials in the content layer (app backgrounds). Exception: sliders and toggles in content take on Liquid Glass while a person activates them.
- Use `Glass.regular` (most system components) when background content might hurt legibility or the component holds significant text: alerts, sidebars, popovers.
- Use `Glass.clear` only for components floating over visually rich media (photos, videos) where the content must stay prominent.
</when_to_use>

<best_practices>
- **Don't use Liquid Glass in the content layer.** It works by separating interactive elements from content; in content it adds complexity and confuses hierarchy.
- **Use Liquid Glass effects sparingly.** System components get it automatically; applying it to many custom controls distracts from the content it is meant to highlight. Limit custom effects (`glassEffect(_:in:)`) to the most important functional elements.
- **Only use clear Liquid Glass for components that appear over visually rich backgrounds.** The regular variant blurs and adjusts the luminosity of background content, and scroll edge effects further blur and reduce its opacity; the clear variant is highly translucent and prioritizes the underlying content for immersive media. Both change appearance under a preferred look for Liquid Glass chosen in device settings, Reduce Transparency, or Increase Contrast.
- **Decide whether clear Liquid Glass needs a dimming layer.** Bright underlying content: add a dark dimming layer of 35% opacity. Sufficiently dark content, or standard AVKit media playback controls (which provide their own dimming layer): none.
- **Color Liquid Glass sparingly.** It has no inherent color by default; see the color reference for tinting rules.
</best_practices>

<platform_considerations>
- **tvOS:** Liquid Glass appears throughout navigation and system experiences such as Top Shelf and Control Center; image views and buttons adopt it when they gain focus.
- **visionOS:** Windows use the system glass material instead (see standard materials).
</platform_considerations>

<anti_patterns>
- Don't use Liquid Glass in the content layer (backgrounds, content cards).
- Don't apply Liquid Glass to many custom controls.
- Don't use the clear variant over ordinary or text-heavy backgrounds.
- Don't put clear Liquid Glass over bright content without a 35% dark dimming layer, and don't double-dim AVKit playback controls.
</anti_patterns>
</topic>

<topic name="Standard materials and vibrancy" source="https://developer.apple.com/design/human-interface-guidelines/materials" updated="2025-09-09">
Standard materials and effects (blur, vibrancy, blending modes) create depth, layering, and hierarchy within the content layer beneath Liquid Glass, letting background color pass through so people keep a sense of place. Choose them by semantic purpose and pair them with vibrant colors.

<best_practices>
- **Choose materials and effects based on semantic meaning and recommended usage.** Never pick one for the color it seems to impart; system settings change its appearance and behavior.
- **Help ensure legibility by using vibrant colors on top of materials.** System vibrant colors never turn too dark, bright, saturated, or low contrast in any context; a plain color like `systemGray3` on a material gives poor contrast.
- **Consider contrast and visual separation when choosing a material to combine with blur and vibrancy effects.** Thicker, more opaque materials give contrast for text and fine features; thinner, more translucent materials keep people oriented by showing background content (`Material`, `UIBlurEffect`, `UIVibrancyEffect`).
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** Four content-layer materials: `ultraThin`, `thin`, `regular` (default), `thick`. Vibrant colors for labels, fills, and separators are tuned per material; the default level has the highest contrast and quaternary the lowest (specs). Avoid quaternary labels on `thin` and `ultraThin`.
- **macOS:** Purpose-specific materials (`NSVisualEffectView.Material`) and vibrant versions of all system colors. Choose when to allow vibrancy in custom views and controls, testing in many contexts. Choose a blending mode, behind window or within window (`NSVisualEffectView.BlendingMode`).
- **tvOS:** Standard materials define structure in the content layer; thickness sets how much content shows through (specs).
- **visionOS:** Windows use glass, an unmodifiable adaptive material that lets light, the current Environment, virtual content, and surroundings show through while limiting background color range to keep contrast, brightening or darkening with the surroundings. No Dark Mode setting; glass adapts to the luminance behind it. Prefer translucency to opaque colors in windows; opacity blocks the view and feels constricting. Custom component materials and vibrancy levels are in specs.
- **watchOS:** Use materials to provide context in full-screen modal views, which are common; the contrast orients people and separates controls and system elements from content. Avoid removing or replacing the default material backgrounds of modal sheets.
</platform_considerations>

<specs>
*iOS, iPadOS vibrancy (`UIVibrancyEffectStyle`)*
| Element | Levels, highest to lowest contrast | Restriction |
|---|---|---|
| Labels | `label` (default), `secondaryLabel`, `tertiaryLabel`, `quaternaryLabel` | No quaternary on `thin` or `ultraThin` |
| Fills | `fill` (default), `secondaryFill`, `tertiaryFill` | All materials |
| Separators | `separator` | All materials |

*tvOS standard materials*
| Material | Recommended for |
|---|---|
| `ultraThin` | Full-screen views that require a light color scheme |
| `thin` | Overlay views that partially obscure onscreen content and require a light color scheme |
| `regular` | Overlay views that partially obscure onscreen content |
| `thick` | Overlay views that partially obscure onscreen content and require a dark color scheme |

*visionOS materials and vibrancy*
| Item | Use for |
|---|---|
| glass (system, unmodifiable) | Standard windows |
| `thin` | Bringing attention to interactive elements: buttons, selected items |
| `regular` | Separating sections: sidebar, grouped table view |
| `thick` | A dark element that stays distinct on top of a `regular` background |
| `label` vibrancy | Standard text |
| `secondaryLabel` vibrancy | Descriptive text: footnotes, subtitles |
| `tertiaryLabel` vibrancy | Inactive elements, only when text needs no high legibility |
</specs>

<anti_patterns>
- Avoid choosing a material for the color it appears to add.
- Avoid non-vibrant colors (such as `systemGray3`) for labels on a material.
- iOS, iPadOS: Avoid quaternary label vibrancy on `thin` and `ultraThin`.
- visionOS: Avoid opaque color areas in windows.
- watchOS: Avoid removing or replacing default modal sheet materials.
</anti_patterns>
</topic>

<decision_guide>
- Toolbar, tab bar, sidebar, floating control, alert, popover: Liquid Glass regular (automatic for system components).
- Control over photos or video: Liquid Glass clear, plus a 35% dark dimming layer if the media is bright (none if dark or under AVKit controls).
- App background, content card, in-content overlay: standard material, never Liquid Glass; `ultraThin`/`thin` for context, `regular`/`thick` for contrast.
- Slider or toggle inside content: standard at rest, Liquid Glass while activated (system behavior).
- Custom control emphasis: `glassEffect` only for the most important functional elements.
- Text on any material: vibrant `label`, then `secondaryLabel`/`tertiaryLabel`; no quaternary on thin materials.
- Platform tables: tvOS overlay materials by light or dark scheme; visionOS glass windows with `thin`/`regular`/`thick` and three vibrancy levels; macOS material by purpose plus blending mode; watchOS default sheet materials kept.
</decision_guide>

<quick_checklist>
- [ ] Liquid Glass confined to controls and navigation, none on backgrounds or content?
- [ ] Custom `glassEffect` limited to the most important functional elements?
- [ ] Clear variant only over photos, video, or similar rich media, with a 35% dark dimming layer when the media is bright?
- [ ] Alerts, sidebars, popovers, and other text-heavy floating elements use the regular variant?
- [ ] Content-layer materials chosen for context versus contrast, not apparent color?
- [ ] Labels, fills, and separators on materials use vibrant system colors, no quaternary on thin materials?
- [ ] Verified with Reduce Transparency, Increase Contrast, and any preferred Liquid Glass look?
- [ ] tvOS overlays, visionOS glass and vibrancy levels, and watchOS default sheet materials follow the platform tables?
</quick_checklist>
