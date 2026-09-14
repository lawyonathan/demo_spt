<overview>
Typography on Apple platforms: legibility (default and minimum sizes, weights), hierarchy, the San Francisco and New York system fonts, text styles and symbolic traits, custom fonts, Dynamic Type, and per-platform type specifications including the emphasized weights added in 2025.
Distills the HIG page `typography` (updated 2025-12-16).
Load when choosing font sizes or weights, building a type scale, mapping a design to text styles, checking Dynamic Type and accessibility size behavior, or reviewing text on macOS, tvOS, visionOS, or watchOS.
</overview>

<topic name="Typography: legibility, hierarchy, and fonts" source="https://developer.apple.com/design/human-interface-guidelines/typography" updated="2025-12-16">
Typographic choices help display legible text, convey an information hierarchy, communicate important content, and express brand or style. Core rule: use the system fonts and built-in text styles at or above each platform's default size, and avoid light weights.

<when_to_use>
- Use San Francisco (SF) for interface text: SF Pro on iOS, iPadOS, macOS, tvOS, and visionOS; SF Compact on watchOS (SF Compact Rounded in complications); SF Mono for monospaced text; SF Arabic, SF Armenian, SF Georgian, SF Hebrew for those scripts.
- Use the rounded variants (SF Pro, SF Compact, SF Arabic, SF Armenian, SF Georgian, SF Hebrew) to coordinate text with soft or rounded UI elements or as an alternative typographic voice.
- Use New York (NY), the serif family, alone or alongside SF; available in iOS, iPadOS, tvOS, watchOS, visionOS (specify the type styles you want), and Mac Catalyst apps. In SwiftUI `Font.Design.default` is the system font and `Font.Design.serif` is NY.
- Use the built-in text styles for hierarchy and adjust them with symbolic traits rather than inventing sizes.
- Use a custom font only if it stays legible at the platform minimum sizes and implements Dynamic Type and Bold Text behaviors.
- Use SF Symbols to convey a concept or object within text; their weights match SF exactly.
</when_to_use>

<best_practices>
- **Use font sizes that most people can read easily.** Follow each platform's default and minimum sizes (specs) for custom and system fonts; a thin custom weight needs sizes larger than recommended.
- **Test legibility in different contexts.** Test game text on every platform the game runs on; fix hard-to-read text with larger sizes, higher contrast via text or background colors, visible background shapes, or legibility-optimized typefaces like the system fonts.
- **In general, avoid light font weights.** Prefer Regular, Medium, Semibold, or Bold; avoid Ultralight, Thin, and Light, especially at small sizes.
- **Adjust font weight, size, and color as needed to emphasize important information and help people visualize hierarchy.** Keep the relative hierarchy and distinction between text elements when people change text size.
- **Minimize the number of typefaces you use, even in a highly customized interface.** Many typefaces obscure hierarchy, hinder readability, and feel inconsistent.
- **Prioritize important content when responding to text-size changes.** People want the content they care about larger, not every word: tab titles in a tabbed window do not grow; a character's dialog matters more than transient hit-damage values.
- **Rely on the variable font format.** SF and NY interpolate between styles; weights run Ultralight to Black, and SF adds widths including Condensed and Expanded. Dynamic optical sizes merge discrete Text and Display sizes with weight into one continuous design, so discrete optical sizes matter only in design tools without variable font support.
- **Consider using the built-in text styles.** A text style bundles weight, point size, and leading per text size (body for multi-line reading, headline to set off a heading); together they form a hierarchy and support Dynamic Type and larger accessibility sizes where available.
- **Modify the built-in text styles if necessary.** Symbolic traits add bold weight for another hierarchy level or change leading: loose leading helps people keep their place in wide columns or long passages; tight leading fits multi-line text in height-constrained areas like a list row, but avoid tight leading for three or more lines (`leading(_:)`).
- **Access system fonts through `Font.Design`; don't embed them in your app or game.**
- **If necessary, adjust tracking in interface mockups.** A running app tracks the system font dynamically at every point size; mockups with the variable fonts need no discrete optical size but may need tracking adjustments. Per-size tracking tables (SF Pro, SF Pro Rounded, New York, macOS, tvOS, SF Compact, SF Compact Rounded) are on the source page.
- **Make sure custom fonts are legible.** Respect the recommended minimum sizes for each style and weight at various viewing distances and conditions.
- **Implement accessibility features for custom fonts.** System fonts support Dynamic Type (where available) and Bold Text automatically; a custom font must match. Unity games can use Apple's Unity plug-ins for Dynamic Type, or otherwise let players adjust text size another way.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** SF Pro is the system font; NY is also available.
- **macOS:** SF Pro is the system font; NY only via Mac Catalyst. No Dynamic Type. When necessary, use the dynamic system font variants (specs) so text matches standard controls.
- **tvOS:** SF Pro is the system font; NY is also available.
- **visionOS:** SF Pro is the system font; for NY, specify the type styles you want. Uses bolder body and title styles and adds Extra Large Title 1 and Extra Large Title 2 for wide, editorial layouts; vibrancy conveys text hierarchy (see materials). Prefer 2D text; depth makes characters harder to read, so keep 3D text to small decorative amounts. Pick a style that looks good at full scale, then test legibility at other scales. Maximize contrast with the container; default white text contrasts strongly with the system background material, so test any other color widely. Text with no background: prefer bold over shadows, since the space may lack a surface for an accurate shadow and the Environment is unpredictable. Billboard spatial labels: rotate around the y-axis so the baseline stays perpendicular to the line of sight as people move.
- **watchOS:** SF Compact is the system font; NY is also available; complications use SF Compact Rounded.
</platform_considerations>

<specs>
*Default and minimum text sizes*
| Platform | Default size | Minimum size |
|---|---|---|
| iOS, iPadOS | 17 pt | 11 pt |
| macOS | 13 pt | 10 pt |
| tvOS | 29 pt | 23 pt |
| visionOS | 17 pt | 12 pt |
| watchOS | 16 pt | 12 pt |

*macOS dynamic system font variants (`NSFont`)*
| Variant | API |
|---|---|
| Control content | `controlContentFont(ofSize:)` |
| Label | `labelFont(ofSize:)` |
| Menu | `menuFont(ofSize:)` |
| Menu bar | `menuBarFont(ofSize:)` |
| Message | `messageFont(ofSize:)` |
| Palette | `paletteFont(ofSize:)` |
| Title | `titleBarFont(ofSize:)` |
| Tool tips | `toolTipsFont(ofSize:)` |
| Document text (user) | `userFont(ofSize:)` |
| Monospaced document text (user fixed pitch) | `userFixedPitchFont(ofSize:)` |
| Bold system font | `boldSystemFont(ofSize:)` |
| System font | `systemFont(ofSize:)` |
</specs>

<anti_patterns>
- Avoid Ultralight, Thin, and Light weights, especially for small text.
- Avoid mixing many typefaces, even in a customized interface.
- Avoid enlarging every word when text size grows; tab titles and transient values stay put.
- Avoid tight leading for three or more lines of text.
- Avoid embedding system fonts; use `Font.Design`.
- Avoid custom fonts that skip Dynamic Type or Bold Text behavior.
- visionOS: Avoid 3D text for content people must read; avoid shadows for contrast; avoid text that does not face the wearer.
</anti_patterns>
</topic>

<topic name="Supporting Dynamic Type" source="https://developer.apple.com/design/human-interface-guidelines/typography" updated="2025-12-16">
Dynamic Type is a system-level feature in iOS, iPadOS, tvOS, visionOS, and watchOS that lets people adjust the size of visible text (macOS does not support it). Layouts must adapt from xSmall through the largest accessibility size without losing hierarchy or truncating meaningful text. Guidance expanded in 2025.

<best_practices>
- **Make sure your app's layout adapts to all font sizes.** Verify scaling and legibility of text and glyphs; on iPhone or iPad turn on Larger Accessibility Text Sizes (Settings > Accessibility > Display & Text Size > Larger Text) and confirm the app stays comfortably readable.
- **Increase the size of meaningful interface icons as font size increases.** Icons that carry information must stay viewable; SF Symbols scale with Dynamic Type automatically.
- **Keep text truncation to a minimum as font size increases.** Show as much useful text at the largest accessibility size as at the largest standard size; avoid truncation in scrollable regions unless a separate view shows the rest; let labels use as many lines as needed (`numberOfLines`).
- **Consider adjusting your layout at large font sizes.** In horizontally constrained contexts inline items (glyphs, timestamps) and container edges crowd text; use a stacked layout with text above secondary items, and reduce column count for multicolumn text (`isAccessibilityCategory`).
- **Maintain a consistent information hierarchy regardless of the current font size.** Keep primary elements toward the top of a view even at very large sizes.
- **Use built-in text styles with system fonts** to inherit Dynamic Type and larger accessibility sizes; Unity games use Apple's Unity plug-ins. Downloadable size tables per platform are in Apple Design Resources.
- **(2025) Use emphasized variants via symbolic traits.** SwiftUI `bold()`; UIKit `traitBold` on `UIFontDescriptor`. Emphasized weight is Medium, Semibold, Bold, or Heavy depending on style (specs).
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** Seven standard sizes (xSmall, Small, Medium, Large default, xLarge, xxLarge, xxxLarge) plus AX1 through AX5. Body runs from 14 pt at xSmall to 53 pt at AX5. Weight is Regular except Headline (Semibold); emphasized is Bold for Large Title, Title 1, Title 2 and Semibold for the rest, at every size.
- **macOS:** No Dynamic Type; fixed built-in text styles (specs).
- **tvOS:** Fixed built-in text styles, mostly Medium weight, Body 29 pt (specs).
- **visionOS:** Bolder body and title styles; adds Extra Large Title 1 and Extra Large Title 2; shares the iOS tracking values.
- **watchOS:** xSmall through xxxLarge plus AX1 through AX3; the default depends on case size (Small on 38mm, Large on 40mm/41mm/42mm, xLarge on 44mm/45mm/49mm). Styles replace Callout and Subhead with Footnote 1 and Footnote 2; emphasized is Bold only for Large Title, Semibold otherwise.
</platform_considerations>

<specs>
*iOS, iPadOS Dynamic Type, Large (default)*
| Style | Weight | Size (pt) | Leading (pt) | Emphasized weight |
|---|---|---|---|---|
| Large Title | Regular | 34 | 41 | Bold |
| Title 1 | Regular | 28 | 34 | Bold |
| Title 2 | Regular | 22 | 28 | Bold |
| Title 3 | Regular | 20 | 25 | Semibold |
| Headline | Semibold | 17 | 22 | Semibold |
| Body | Regular | 17 | 22 | Semibold |
| Callout | Regular | 16 | 21 | Semibold |
| Subhead | Regular | 15 | 20 | Semibold |
| Footnote | Regular | 13 | 18 | Semibold |
| Caption 1 | Regular | 12 | 16 | Semibold |
| Caption 2 | Regular | 11 | 13 | Semibold |

*iOS, iPadOS Dynamic Type, xSmall (smallest)*
| Style | Weight | Size (pt) | Leading (pt) | Emphasized weight |
|---|---|---|---|---|
| Large Title | Regular | 31 | 38 | Bold |
| Title 1 | Regular | 25 | 31 | Bold |
| Title 2 | Regular | 19 | 24 | Bold |
| Title 3 | Regular | 17 | 22 | Semibold |
| Headline | Semibold | 14 | 19 | Semibold |
| Body | Regular | 14 | 19 | Semibold |
| Callout | Regular | 13 | 18 | Semibold |
| Subhead | Regular | 12 | 16 | Semibold |
| Footnote | Regular | 12 | 16 | Semibold |
| Caption 1 | Regular | 11 | 13 | Semibold |
| Caption 2 | Regular | 11 | 13 | Semibold |

*iOS, iPadOS larger accessibility size AX5 (largest)*
| Style | Weight | Size (pt) | Leading (pt) | Emphasized weight |
|---|---|---|---|---|
| Large Title | Regular | 60 | 70 | Bold |
| Title 1 | Regular | 58 | 68 | Bold |
| Title 2 | Regular | 56 | 66 | Bold |
| Title 3 | Regular | 55 | 65 | Semibold |
| Headline | Semibold | 53 | 62 | Semibold |
| Body | Regular | 53 | 62 | Semibold |
| Callout | Regular | 51 | 60 | Semibold |
| Subhead | Regular | 49 | 58 | Semibold |
| Footnote | Regular | 44 | 52 | Semibold |
| Caption 1 | Regular | 43 | 51 | Semibold |
| Caption 2 | Regular | 40 | 48 | Semibold |

*Other iOS, iPadOS sizes (size/leading in pt; same weights and emphasized weights as above)*
- Small: Large Title 32/39, Body 15/20, Caption 2 11/13.
- Medium: Large Title 33/40, Body 16/21, Caption 2 11/13.
- xLarge: Large Title 36/43, Body 19/24, Caption 2 13/18.
- xxLarge: Large Title 38/46, Body 21/26, Caption 2 15/20.
- xxxLarge: Large Title 40/48, Body 23/29, Caption 2 17/22.
- AX1: Large Title 44/52, Body 28/34, Caption 2 20/25.
- AX2: Large Title 48/57, Body 33/40, Caption 2 24/30.
- AX3: Large Title 52/61, Body 40/48, Caption 2 29/35.
- AX4: Large Title 56/66, Body 47/56, Caption 2 34/41.

*macOS built-in text styles*
| Text style | Weight | Size (pt) | Line height (pt) | Emphasized weight |
|---|---|---|---|---|
| Large Title | Regular | 26 | 32 | Bold |
| Title 1 | Regular | 22 | 26 | Bold |
| Title 2 | Regular | 17 | 22 | Bold |
| Title 3 | Regular | 15 | 20 | Semibold |
| Headline | Bold | 13 | 16 | Heavy |
| Body | Regular | 13 | 16 | Semibold |
| Callout | Regular | 12 | 15 | Semibold |
| Subheadline | Regular | 11 | 14 | Semibold |
| Footnote | Regular | 10 | 13 | Semibold |
| Caption 1 | Regular | 10 | 13 | Medium |
| Caption 2 | Medium | 10 | 13 | Semibold |

*tvOS built-in text styles*
| Text style | Weight | Size (pt) | Leading (pt) | Emphasized weight |
|---|---|---|---|---|
| Title 1 | Medium | 76 | 96 | Bold |
| Title 2 | Medium | 57 | 66 | Bold |
| Title 3 | Medium | 48 | 56 | Bold |
| Headline | Medium | 38 | 46 | Bold |
| Subtitle 1 | Regular | 38 | 46 | Medium |
| Callout | Medium | 31 | 38 | Bold |
| Body | Medium | 29 | 36 | Bold |
| Caption 1 | Medium | 25 | 32 | Bold |
| Caption 2 | Medium | 23 | 30 | Bold |

*watchOS Dynamic Type, Large (default on 40mm/41mm/42mm)*
| Style | Weight | Size (pt) | Leading (pt) | Emphasized weight |
|---|---|---|---|---|
| Large Title | Regular | 36 | 38.5 | Bold |
| Title 1 | Regular | 34 | 36.5 | Semibold |
| Title 2 | Regular | 28 | 30.5 | Semibold |
| Title 3 | Regular | 19 | 21.5 | Semibold |
| Headline | Semibold | 16 | 18.5 | Semibold |
| Body | Regular | 16 | 18.5 | Semibold |
| Caption 1 | Regular | 15 | 17.5 | Semibold |
| Caption 2 | Regular | 14 | 16.5 | Semibold |
| Footnote 1 | Regular | 13 | 15.5 | Semibold |
| Footnote 2 | Regular | 12 | 14.5 | Semibold |

*Other watchOS sizes (size/leading in pt; same weights and emphasized weights as above)*
- xSmall: Large Title 30/32.5, Body 14/16.5, Footnote 2 10/12.5.
- Small (default on 38mm): Large Title 32/34.5, Body 15/17.5, Footnote 2 11/13.5.
- xLarge (default on 44mm/45mm/49mm): Large Title 40/42.5, Body 17/19.5, Footnote 2 13/15.5.
- xxLarge: Large Title 41/43.5, Body 18/20.5, Footnote 2 14/16.5.
- xxxLarge: Large Title 42/44.5, Body 19/21.5, Footnote 2 15/17.5.
- AX1: Large Title 44/46.5, Body 21/23.5, Footnote 2 15/17.5.
- AX2: Large Title 45/47.5, Body 22/24.5, Footnote 2 16/17.5.
- AX3: Large Title 46/48.5, Body 23/25.5, Footnote 2 17/19.5.

*Tracking.* Per-point-size tracking tables (1/1000 em and points) for SF Pro, SF Pro Rounded, New York, macOS, tvOS, SF Compact, and SF Compact Rounded are on the source page; the running system applies them automatically.
</specs>

<anti_patterns>
- Avoid truncating text as size grows, especially in scrollable regions.
- Avoid keeping inline items beside text at accessibility sizes; stack them.
- Avoid multicolumn text at large sizes; reduce columns.
- Avoid letting primary elements drift away from the top at large sizes.
- Avoid fixed-size icons that carry meaning; scale them with text.
- Avoid hard-coded point sizes where text styles and Dynamic Type are available.
</anti_patterns>
</topic>

<decision_guide>
- Body copy: Body text style at the platform default (17 pt iOS/iPadOS/visionOS, 13 macOS, 29 tvOS, 16 watchOS); never below the minimum (11, 10, 23, 12, 12).
- Screen or section title: Large Title, Title 1, Title 2, Title 3 in descending importance; visionOS adds Extra Large Title 1 and 2 for editorial layouts.
- Emphasis within a level: `bold()` or `traitBold` (Bold for Large Title, Title 1, Title 2; Semibold for most others; macOS Headline goes Heavy), not a new size (2025).
- Secondary or metadata text: Subhead, Footnote, Caption 1, Caption 2 (watchOS: Caption 1 and 2, Footnote 1 and 2).
- Wide columns or long passages: loose leading. Height-constrained rows of one or two lines: tight leading. Three or more lines: never tight.
- Need a serif voice: NY via `Font.Design.serif`. Soft or rounded UI: SF Rounded. Code or tabular data: SF Mono.
- Custom brand font: only if legible at minimum sizes, Regular or heavier, and wired to Dynamic Type and Bold Text; otherwise stay with SF.
- Text next to icons: SF Symbols so weight and scaling match.
- Accessibility sizes (AX1 to AX5): stack inline items, drop columns, allow multi-line labels, keep primary elements on top, keep tab titles and transient values fixed.
- macOS control text: dynamic variants (`labelFont`, `menuFont`, `toolTipsFont`, etc.) so it matches system controls.
- visionOS spatial labels: 2D, bold instead of shadowed, billboarded toward the wearer.
</decision_guide>

<quick_checklist>
- [ ] Body text is at or above the platform default size and nothing falls below the minimum?
- [ ] No Ultralight, Thin, or Light weights, and thin custom fonts are sized up?
- [ ] Hierarchy uses built-in text styles (or a small set of custom sizes) with few typefaces?
- [ ] Emphasis uses symbolic traits with the documented emphasized weights (2025)?
- [ ] Leading is loose for long passages and never tight for three or more lines?
- [ ] System fonts are loaded via `Font.Design`, not embedded?
- [ ] Custom fonts support Dynamic Type and Bold Text?
- [ ] Layout has been checked at the largest accessibility size with no clipped or truncated meaningful text?
- [ ] Inline items stack and columns collapse at accessibility sizes?
- [ ] Meaningful icons (ideally SF Symbols) scale with text?
- [ ] Primary elements stay near the top and tab titles do not grow with text size?
- [ ] macOS control text uses dynamic font variants; visionOS text is 2D, high contrast, and billboarded?
</quick_checklist>
