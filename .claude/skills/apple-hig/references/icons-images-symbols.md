<overview>
Every graphic asset an app ships: layered Liquid Glass app icons and appearance variants, interface icons (glyphs) and the standard SF Symbols for common actions, macOS document icons, image delivery (scale factors, formats, color profiles, tvOS layered images, visionOS spatial photos, watchOS autoscaling PDFs), and SF Symbols configuration (rendering modes, gradients, variable color, weights, scales, variants, animations, custom symbols).
Distills the HIG pages: app-icons, icons, images, sf-symbols.
Load when designing or reviewing an app icon, choosing or drawing an icon for a toolbar, tab bar, menu, or button, exporting image assets, or configuring SF Symbols.
</overview>

<topic name="App icons" source="https://developer.apple.com/design/human-interface-guidelines/app-icons" updated="2026-06-08">
A unique, memorable icon expresses the app's purpose on the Home Screen, in search, notifications, settings, and share sheets. (2025-2026) Icons are layered; the system applies Liquid Glass effects (specular highlights, refraction, translucency) and Icon Composer is the tool for building and previewing them.

<best_practices>
*Layer design*
- **Provide layers rather than a flattened image.** (2025) iOS, iPadOS, macOS, and watchOS icons: a background layer plus one or more foreground layers; Liquid Glass attributes adapt to icon size, apply consistently across platforms, and can differ between system versions. tvOS: two to five layers for parallax (the focused icon lifts, sways, and illuminates). visionOS: background plus one or two upper layers forming a 3D object with system shadows and an embossed look from upper-layer alpha.
- **Build iOS, iPadOS, macOS, and watchOS icons in Icon Composer.** Import foreground layers, define the background, place layers, apply specular highlights and refraction, annotate default, dark, and mono variants, preview across system versions, export for Xcode. tvOS and visionOS layers go into an image stack in Xcode; test with Parallax Previewer and the Parallax Exporter plug-in.
- **Prefer clearly defined edges in foreground layers.** Soft or feathered edges degrade system highlights and shadows.
- **Vary opacity in foreground layers to increase the sense of depth and liveliness.** Photos splits its centerpiece into translucent layers; import opaque layers and tune transparency in Icon Composer to preview it against system effects.
- **Design a background that both stands out and emphasizes foreground content.** Icon Composer supports solid colors and gradients, so custom background images are rarely needed; gradients must respond well to system lighting, and an imported background must be full-bleed and opaque.
- **Prefer vector graphics when bringing layers into Icon Composer.** SVG or PDF; outline artwork and convert text to outlines; lossless PNG for mesh gradients and raster art.

*Icon shape*
- **Produce appropriately shaped, unmasked layers.** The system masks: square layers for iOS, iPadOS, macOS (rounded corners matching system elements and the device bezel) and for visionOS and watchOS (circular); rectangular layers for tvOS (rounded, concentric). Pre-masked layers hurt specular highlights and look jagged.
- **Keep primary content centered to avoid truncation when the system adjusts corners or applies masking.** Especially for visionOS and watchOS; use the production template grids in Apple Design Resources.

*Design*
- **Embrace simplicity.** One core concept, a minimal number of shapes, a simple solid or gradient background; fine detail looks busy under system effects and vanishes at small sizes, and the canvas need not be filled.
- **Provide a visually consistent icon design across all the platforms your app supports.** One app must not look like several.
- **Consider basing your icon design around filled, overlapping shapes.** With transparency and blurring they create depth.
- **Include text only when it's essential to your experience or brand.** Text resists accessibility and localization, reads poorly small, and clutters; the app name usually appears nearby. A mnemonic first letter can work; never "Watch," "Play," "New," or "For visionOS." In tvOS keep text above other layers so parallax does not crop it.
- **Prefer illustrations to photos and avoid replicating UI components.** Photos fail across appearances, sizes, and layer splits; avoid extremely thin line weights and sharp corners; never reproduce UI components or screenshots.
- **Don't use replicas of Apple hardware products.** They are copyrighted.

*Visual effects*
- **Let the system handle blurring and other visual effects.** No baked-in specular highlights, inter-layer drop shadows, bevels, blurs, or glows; custom effects are static and conflict with dynamic system ones. Test any you add in Icon Composer, Device Hub, or on a device.
- **Create layer groupings to apply effects to multiple layers at once.** Groups get extra Liquid Glass options (specular highlights, refraction, translucency).

*Appearances (iOS, iPadOS, macOS)*
- **Design for default, dark, clear, and tinted appearances.** People choose to match wallpaper; the system generates any variant you omit.
- **Keep your icon's features consistent across appearances.** Never swap elements between variants.
- **Design dark and tinted icons that feel at home beside system app icons and widgets.** Dark is more subdued, clear and tinted more so; stay visible, legible, recognizable in every variant.
- **Use your light app icon as the basis for your dark icon.** Complementary colors, no excessively bright images; color backgrounds give the most contrast.
- **Consider offering alternate app icons.** iOS, iPadOS, tvOS, and compatible apps in visionOS; each must relate closely to the app (team icons in a sports app) and never resemble another app. In iOS and iPadOS every alternate needs its own dark, clear, and tinted variants; all are subject to App Review.
</best_practices>

<platform_considerations>
- **tvOS:** Include a safe zone; the focused icon scales and moves, cropping foreground layers more than background layers, and the zone varies with image size, layer depth, and motion.
- **visionOS:** Avoid a hole-like or concave shape on the background layer; system shadow and highlights make it stand out instead of recede.
- **watchOS:** Avoid black backgrounds; lighten them so the icon does not blend into the display.
</platform_considerations>

<specs>
| Platform | Layout shape | Shape after masking | Layout size | Style | Appearances |
|---|---|---|---|---|---|
| iOS, iPadOS, macOS | Square | Rounded rectangle (square) | 1024x1024 px | Layered | Default, dark, clear light, clear dark, tinted light, tinted dark |
| tvOS | Rectangle (landscape) | Rounded rectangle | 800x480 px | Layered (Parallax), 2 to 5 layers | N/A |
| visionOS | Square | Circular | 1024x1024 px | Layered (3D), background + 1 or 2 layers | N/A |
| watchOS | Square | Circular | 1088x1088 px | Layered | N/A |

The system scales icons down for Settings, notifications, and similar. Color spaces: sRGB, Gray Gamma 2.2, Display P3 (iOS, iPadOS, macOS, tvOS, watchOS only).
</specs>

<anti_patterns>
- Don't pre-mask layers, feather foreground edges, or import a background that is not full-bleed and opaque.
- Don't bake in highlights, shadows, bevels, blurs, or glows.
- Don't use photos, screenshots, UI replicas, thin lines, sharp corners, or Apple hardware.
- Don't add nonessential text, or put tvOS text below other layers.
- Don't swap elements between appearance variants or make dark, clear, or tinted icons too bright.
- Don't offer alternate icons that resemble other apps or lack their variants.
- Don't use a black watchOS background or a concave visionOS background shape.
</anti_patterns>
</topic>

<topic name="Interface icons" source="https://developer.apple.com/design/human-interface-guidelines/icons" updated="2025-06-09">
An interface icon (glyph) expresses one concept with streamlined shapes and touches of color, unlike the rich app icon. Custom glyphs and SF Symbols both use black and clear to define shape so the system can recolor the black areas.

<when_to_use>
- Prefer an SF Symbol, as-is or customized; draw a custom glyph or custom symbol only when nothing fits.
- For common actions use the standard symbols in the table below so menus, toolbars, and buttons read alike across platforms.
</when_to_use>

<best_practices>
- **Create a recognizable, highly simplified design.** Familiar metaphors tied to the action or content; excess detail confuses.
- **Maintain visual consistency across all interface icons in your app.** Same size, detail level, stroke weight, and perspective across custom and system icons; adjust dimensions to equalize visual weight.
- **In general, match the weights of interface icons and adjacent text.** Unless one is meant to dominate.
- **If necessary, add padding to a custom interface icon to achieve optical alignment.** Asymmetric icons (a download arrow, heavy at the bottom) look low when geometrically centered; nudge the glyph and bake the offset into the asset's padding.
- **Provide a selected-state version of an interface icon only if necessary.** Toolbars, tab bars, and buttons handle selection automatically (a selected toolbar icon takes the accent color).
- **Use inclusive images.** Gender-neutral figures; nothing hard to recognize across cultures or languages.
- **Include text in your design only when it's essential for conveying meaning.** A formatting character is fine; localize individual characters, abstract passages of text, and ship a flipped version for right-to-left.
- **If you create a custom interface icon, use a vector format like PDF or SVG.** The system scales vectors; PNG needs multiple versions. Or make a custom SF Symbol with a scale matching adjacent text.
- **Provide alternative text labels for custom interface icons.** VoiceOver needs them.
- **Avoid using replicas of Apple hardware products.** Hardware changes often and dates the UI; use only Apple Design Resources images or the Apple-product SF Symbols.
</best_practices>

<platform_considerations>
- **macOS (document icons):** A document icon is a page with a folded top-right corner; without one, macOS composites your app icon and the file extension. Supply any mix of background fill, center image, and text (template in Apple Design Resources) and the system layers, masks, and composites them. Design simple images with uncomplicated shapes and a reduced palette, since icons render as small as 16x16 px. A single expressive background fill with no center image works well (Xcode, TextEdit). Reduce complexity in small versions: fewer, thicker grid-aligned lines at 32x32 px, details removed at 16x16 px. Avoid important content in the top-right corner of the fill, where the folded corner is drawn. A center image depicting a familiar object measures half the icon canvas (16x16 px for a 32x32 px icon); keep about 80% of its canvas filled inside a roughly 10% margin (about 205x205 px in 256x256 px). Specify a succinct term for an unfamiliar extension (SceneKit shows "scene" instead of "scn"); the system scales it to fit and capitalizes every letter.
</platform_considerations>

<specs>
Standard icons for common actions:

| Group | Action | Symbol name |
|---|---|---|
| Editing | Cut | `scissors` |
| Editing | Copy | `document.on.document` |
| Editing | Paste | `document.on.clipboard` |
| Editing | Done, Save | `checkmark` |
| Editing | Cancel, Close | `xmark` |
| Editing | Delete | `trash` |
| Editing | Undo | `arrow.uturn.backward` |
| Editing | Redo | `arrow.uturn.forward` |
| Editing | Compose | `square.and.pencil` |
| Editing | Duplicate | `plus.square.on.square` |
| Editing | Rename | `pencil` |
| Editing | Move to, Folder | `folder` |
| Editing | Attach | `paperclip` |
| Editing | Add | `plus` |
| Editing | More | `ellipsis` |
| Selection | Select | `checkmark.circle` |
| Selection | Deselect, Close | `xmark` |
| Selection | Delete | `trash` |
| Text formatting | Superscript | `textformat.superscript` |
| Text formatting | Subscript | `textformat.subscript` |
| Text formatting | Bold | `bold` |
| Text formatting | Italic | `italic` |
| Text formatting | Underline | `underline` |
| Text formatting | Align Left | `text.alignleft` |
| Text formatting | Center | `text.aligncenter` |
| Text formatting | Justified | `text.justify` |
| Text formatting | Align Right | `text.alignright` |
| Search | Search | `magnifyingglass` |
| Search | Find, Find and Replace, Find Next, Find Previous, Use Selection for Find | `text.page.badge.magnifyingglass` |
| Search | Filter | `line.3.horizontal.decrease` |
| Sharing and exporting | Share, Export | `square.and.arrow.up` |
| Sharing and exporting | Print | `printer` |
| Users and accounts | Account, User, Profile | `person.crop.circle` |
| Ratings | Dislike | `hand.thumbsdown` |
| Ratings | Like | `hand.thumbsup` |
| Layer ordering | Bring to Front | `square.3.layers.3d.top.filled` |
| Layer ordering | Send to Back | `square.3.layers.3d.bottom.filled` |
| Layer ordering | Bring Forward | `square.2.layers.3d.top.filled` |
| Layer ordering | Send Backward | `square.2.layers.3d.bottom.filled` |
| Other | Alarm | `alarm` |
| Other | Archive | `archivebox` |
| Other | Calendar | `calendar` |

macOS document icon sizes (px): background fill 512 @1x/1024 @2x, 256/512, 128/256, 32/64, 16/32; center image 256 @1x/512 @2x, 128/256, 32/64, 16/32.
</specs>

<anti_patterns>
- Don't overload glyphs with detail or mix stroke weights, sizes, or perspectives.
- Don't ship selected-state art for icons in standard toolbars, tab bars, or buttons.
- Don't leave characters unlocalized or direction-suggesting icons unflipped for right-to-left.
- Don't use PNG for flat glyphs, or omit accessibility labels.
- Don't depict Apple hardware except with Apple-provided assets.
- Don't put important document-icon content in the top-right corner.
</anti_patterns>
</topic>

<topic name="Images" source="https://developer.apple.com/design/human-interface-guidelines/images" updated="2025-12-16">
Deliver artwork at the scale factors and formats each platform needs. A point maps to a resolution-dependent number of pixels on 2D platforms; in visionOS it is an angle that scales with distance.

<best_practices>
- **Provide high-resolution assets for all bitmap images in your app, for every device you support.** Suffix filenames "@1x," "@2x," "@3x" in the asset catalog (scale factor 1 = one pixel per point; 2 and 3 for denser displays).
- **In general, design images at the lowest resolution and scale them up to create high-resolution assets.** Put vector control points on whole values so they stay grid-aligned at 1x, 2x, and 3x.
- **Include a color profile with each image.** Keeps colors intended across displays.
- **Always test images on a range of actual devices.** Art can look pixelated, stretched, or compressed on real hardware.
</best_practices>

<platform_considerations>
- **tvOS:** Parallax (focused element lifts, sways, shines; after inactivity unfocused content dims and the focused element expands) requires layered images of two to five layers. The tvOS app icon must be layered; Top Shelf and other focusable images are strongly encouraged to be. Server-delivered layered images must be runtime `.lcr` files made by Xcode's `layerutil` from LSR or Photoshop files, downloaded, never embedded. Use standard elements and focus APIs (`FocusState`) to get parallax automatically. Identify logical foreground (characters, title text), middle (secondary content, shadows), and background (opaque backdrop) layers; generally keep text in the foreground. Keep the background layer opaque or you get an error. Keep layering simple and subtle; parallax should be almost unnoticeable. Leave a safe zone around foreground layers, which crop as the image scales and moves. Always preview in Xcode, Parallax Previewer for macOS, or the Parallax Exporter plug-in for Adobe Photoshop, then on an actual TV.
- **visionOS:** Images span a much larger size range, the system scales resolution dynamically, and angled placement means pixels may not map 1:1. Create a layered app icon (two to three layers). Prefer vector-based art for 2D images; bitmaps may look poor scaled up (Core Animation: see `Drawing sharp layer-based content in visionOS`). If you must rasterize, balance quality with performance: @2x is fine at common distances but is not dynamically scaled and softens up close; higher resolutions cost file size and runtime performance, especially above @6x, so pair anything above @2x with high-quality filtering (`CALayer.filters`). (2025) Spatial photos (stereoscopic photos with spatial metadata from iPhone 15 Pro or later, Apple Vision Pro, or compatible cameras) and spatial scenes (3D parallax generated from a 2D image) display via RealityKit (`ImagePresentationComponent`). Use stereo HEIC with spatial metadata so visionOS applies its stereo-comfort treatments. Prefer the feathered glass background effect (`GlassBackgroundEffect`) for text over spatial photos; it adds contrast and blurs detail. Mind visual comfort when generating spatial photos from 2D, since disparity adjustments can cause discomfort from some positions. Display spatial photos and scenes in standalone views (sheet or window), not inline; if stereoscopic images must be inline, add generous spacing. Use spatial scenes for specific moments, since each takes up to several seconds to generate (Photos offers an explicit action on a single photo); avoid many at once and move between them with scroll views, pagination, or explicit actions. When displaying immersively, prefer minimal UI (Spatial Gallery: one item, a small caption, one Back button, swipe navigation). Prefer larger spatial scenes centered in the field of view; small ones give little parallax.
- **watchOS:** In general, avoid transparency to keep files small; bake a constant background into the image. Transparency is required for complication images, menu icons, and other template-image interface icons, which the system uses to place color. Use autoscaling PDFs, designed for the 40mm and 42mm screens at 2x, so WatchKit scales one asset per the table below.
</platform_considerations>

<specs>
| Platform | Scale factors |
|---|---|
| iPadOS, watchOS | @2x |
| iOS | @2x and @3x |
| visionOS | @2x or higher |
| macOS, tvOS | @1x and @2x |

| Image type | Format |
|---|---|
| Bitmap or raster work | De-interlaced PNG |
| PNG not needing full 24-bit color | 8-bit color palette |
| Photos | JPEG (optimized) or HEIC |
| Stereo or spatial photos | Stereo HEIC |
| Flat icons, interface icons, flat artwork needing scaling | PDF or SVG |

| watchOS screen | 38mm | 40mm | 41mm | 42mm | 44mm | 45mm | 49mm |
|---|---|---|---|---|---|---|---|
| PDF image scale | 90% | 100% | 106% | 100% | 110% | 119% | 119% |

tvOS layered image: 2 to 5 layers, opaque background. visionOS rasters: performance impact above @6x.
</specs>

<anti_patterns>
- Don't ship bitmaps missing a required scale factor or color profile, or skip device testing.
- tvOS: don't use a transparent background layer, exaggerate 3D layering, or put essential content outside the safe zone.
- visionOS: don't rely on bitmaps for 2D art, exceed @6x lightly, show spatial photos inline, or show many spatial scenes at once.
- watchOS: don't add transparency to non-template images.
</anti_patterns>
</topic>

<topic name="SF Symbols" source="https://developer.apple.com/design/human-interface-guidelines/sf-symbols" updated="2025-07-28">
Thousands of configurable symbols that align with the San Francisco font in every weight and size, for toolbars, tab bars, context menus, and inline text. Symbols and features exist only on OS versions from their introduction year onward, and the license forbids symbols (or lookalikes) in app icons, logos, or any trademarked use.

<best_practices>
*Rendering modes*
- Symbol paths sit in layers (primary, secondary, tertiary; `cloud.sun.rain.fill` = cloud, sun, raindrops). **Monochrome**: one color, all layers. **Hierarchical**: one color, per-layer opacity for depth. **Palette**: two or more colors, one per layer (two colors on three levels give secondary and tertiary the same color). **Multicolor**: intrinsic meaningful colors (`leaf` green, `trash.slash` red), some layers accepting other colors.
- **Use system-provided colors so symbols adapt to accessibility accommodations, vibrancy, and Dark Mode.** See `renderingMode(_:)`.
- **Confirm that a symbol's rendering mode works well in every context.** The automatic setting gives the preferred mode, but size and background contrast can call for another.

*Gradients (2025, SF Symbols 7)*
- **Use gradient rendering to add dimension.** A smooth linear gradient from one source color; works in all modes, with system or custom colors and custom symbols; renders at any size but looks best large.

*Variable color*
- **Use variable color to communicate change, not depth.** Layers take color as a value crosses thresholds between 0 and 100 percent (`speaker.wave.3`: wave layers light up per decibel range, none at silence; the speaker body opts out). Use Hierarchical mode for depth.

*Weights and scales*
- **Match symbol weight to adjacent text.** Nine weights, ultralight to black, mirror San Francisco.
- **Use scale to adjust emphasis without breaking weight matching.** Small, medium (default), and large, relative to cap height (`imageScale(_:)`, `UIImage.SymbolScale`, `NSImage.SymbolConfiguration`).

*Design variants*
- **Pick the variant that states the exact state or action.** Outline (most common, text-like): toolbars, lists, beside text. Fill: more emphasis, for iOS tab bars, swipe actions, accent-color selection. Slash: unavailable. Enclosed (circle, square, rectangle): legibility at small sizes; combines with outline or fill.
- **Let the host view choose outline vs fill.** An iOS tab bar prefers fill, a toolbar outline.
- **Rely on script-specific variants.** Latin, Arabic, Hebrew, Hindi, Thai, Chinese, Japanese, Korean, Cyrillic, Devanagari, and several Indic numeral systems switch automatically with device language.

*Animations*
- All symbols, modes, weights, scales, and custom symbols animate; control playback (once, indefinite until a condition, speed, reverse before repeat) with the `Symbols` framework and `SymbolEffect`. **Appear / Disappear**: gradual emergence or recession. **Bounce**: brief elastic scale up or down and back, once by default, for an action that occurred or is needed. **Scale**: persistent size change for selection or feedback. **Pulse**: opacity on annotated layers (or all) for ongoing activity. **Variable color**: cumulative (changes persist) or iterative (one layer at a time), with autoreverse and optional hiding of inactive layers; closed-loop layouts (a circular progress ring) loop seamlessly, open-loop ones do not. **Replace**: down-up (state change), up-up (forward progression), off-up (emphasize next state). **Magic Replace**: smart transition between related shapes (slashes draw on or off, badges appear or disappear), now the default, falling back to down-up or your chosen direction for unrelated symbols. **Wiggle**: back-and-forth along an axis to flag an overlooked change or reinforce direction. **Breathe**: opacity plus size for living status such as active recording (pulse is opacity only). **Rotate**: whole symbol or By Layer (fan blades) for work in progress. **Draw On / Draw Off** (2025, SF Symbols 7): draws along guide points, all layers at once, staggered, or one at a time, for progress like a download or meaning like an arrow.
- **Apply symbol animations judiciously.** No limit exists, but too many overwhelm.
- **Make sure that animations serve a clear purpose in communicating a symbol's intent.** Check how people will read an animation or combination.
- **Use symbol animations to communicate information more efficiently.** Feedback and compact presentation of complex information.
- **Consider your app's tone when adding animations.** Align with brand and style.

*Custom symbols*
- **Use the template as a guide.** Export a similar symbol's template, edit in a vector tool, and match system symbols in detail, optical weight, alignment, position, and perspective; aim for simple, recognizable, inclusive, directly related. Annotate layers with a color or hierarchical level (primary, secondary, tertiary).
- **Assign negative side margins to your custom symbol if necessary.** For optical alignment when badges widen a symbol (a stack of folders, some badged); name margins per configuration, such as "left-margin-Regular-M".
- **Optimize layers to use animations with custom symbols.** Annotate layers in the SF Symbols app; Z-order sets variable color order (front-to-back or back-to-front); layer groups move together.
- **Test animations for custom symbols.** Run every preset. Draw whole shapes, not cutouts (a `person.2.fill`-style symbol draws the full left person plus an offset path annotated as an erase layer) so layer data survives motion.
- **Avoid making custom symbols that include common variants, such as enclosures or badges.** Use the SF Symbols app component library.
- **Provide alternative text labels for custom symbols.** VoiceOver needs them.
- **Don't design replicas of Apple products.** Apple product and feature symbols are copyrighted; the app badges noncustomizable ones with an Info icon and lists restrictions in the inspector; display them, never customize.
</best_practices>

<specs>
| Attribute | Values |
|---|---|
| Rendering modes | Monochrome, Hierarchical, Palette, Multicolor; gradient rendering in SF Symbols 7 |
| Weights | 9, ultralight to black |
| Scales | Small, medium (default), large |
| Variants | Outline, fill, slash, enclosed (circle, square, rectangle), script-specific |
| Variable color | Thresholds from 0 to 100 percent |
| Animations | Appear, Disappear, Bounce, Scale, Pulse, Variable color, Replace, Magic Replace, Wiggle, Breathe, Rotate, Draw On / Draw Off |
| Versions | Animations need SF Symbols 5; Draw and gradients need SF Symbols 7 |
</specs>

<anti_patterns>
- Don't use SF Symbols or lookalikes in app icons, logos, or trademarked uses.
- Don't assume availability on OS versions older than a symbol's introduction.
- Don't use variable color for depth, or custom colors that ignore accessibility, vibrancy, and Dark Mode.
- Don't pile on animations or animate without purpose.
- Don't customize Apple product or feature symbols, or draw Apple product replicas.
- Don't hand-build enclosure or badge variants; use the component library.
- Don't ship custom symbols without accessibility labels or untested animations.
</anti_patterns>
</topic>

<decision_guide>
- Common action (Share, Add, Delete, Search, Filter, Bold, Like) → the standard SF Symbol from the table.
- No symbol fits → custom SF Symbol from a template (weights, scales, modes, animations for free); else PDF or SVG glyph with optical padding and an accessibility label.
- App identity → layered icon in Icon Composer, unmasked square (tvOS rectangular) layers, default plus dark, clear, tinted variants, no baked-in effects.
- Symbol beside text in a toolbar or list → outline, weight matched; tab bar, swipe action, accent selection → fill; small size → enclosed; unavailable → slash.
- Changing level (volume, signal, progress) → variable color; structure or depth → Hierarchical.
- Ongoing activity → Pulse, Breathe, Rotate, or iterative Variable color; one-off confirmation → Bounce; state change → Replace or Magic Replace; overlooked action → Wiggle; progress along a path → Draw On.
- Raster art → de-interlaced PNG at every scale factor with a color profile; photos → JPEG or HEIC; spatial photos → stereo HEIC; flat art → PDF or SVG.
- tvOS focusable image → layered (2 to 5 layers, opaque background, safe zone); visionOS 2D → vector, or raster above @2x with filtering; watchOS → autoscaling PDF for 40mm/42mm at 2x, transparency only for templates.
- macOS custom file type → document icon: background fill, optional center image (half canvas, about 80% fill), short term for an obscure extension.
</decision_guide>

<quick_checklist>
- [ ] App icon is layered with unmasked layers at 1024x1024 px (800x480 tvOS, 1088x1088 watchOS) and no baked-in highlights, shadows, blurs, or bevels?
- [ ] App icon keeps core features across default, dark, clear, and tinted appearances, and alternates have their own variants?
- [ ] App icon avoids photos, screenshots, UI replicas, Apple hardware, thin lines, sharp corners, and nonessential text, and matches across platforms?
- [ ] Common actions use the standard SF Symbols from the table?
- [ ] All interface icons share size, detail, stroke weight, and perspective, matching adjacent text weight?
- [ ] Custom glyphs are PDF or SVG, optically centered, localized or flipped as needed, with accessibility labels?
- [ ] Symbols use system colors with a rendering mode checked in each context?
- [ ] Variant matches the container (outline in toolbars, fill in iOS tab bars); variable color shows change, not depth?
- [ ] Symbol animations are few, purposeful, and tested on custom symbols?
- [ ] Bitmaps ship at every required scale factor with color profiles and were tested on devices?
- [ ] tvOS layered images: 2 to 5 layers, opaque background, text in front, safe zone kept?
- [ ] visionOS: vector 2D art, spatial photos in standalone views with feathered glass behind text, rasters at or below @6x?
- [ ] watchOS: no transparency except templates; autoscaling PDFs used?
- [ ] No SF Symbols in the app icon or logo, and no Apple product symbols customized?
</quick_checklist>
