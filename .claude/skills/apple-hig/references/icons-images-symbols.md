<overview>
Covers every graphic asset an app ships: layered Liquid Glass app icons and their appearance variants, interface icons (glyphs) and the standard SF Symbols for common actions, macOS document icons, bitmap and vector image delivery (scale factors, formats, color profiles, tvOS layered images, visionOS spatial photos, watchOS autoscaling PDFs), and SF Symbols configuration (rendering modes, gradients, variable color, weights, scales, variants, animations, custom symbols).
Distills the HIG pages: app-icons, icons, images, sf-symbols.
Load this file when designing or reviewing an app icon, choosing or drawing an icon for a toolbar, tab bar, menu, or button, exporting image assets, or configuring SF Symbols in code.
</overview>

<topic name="App icons" source="https://developer.apple.com/design/human-interface-guidelines/app-icons" updated="2026-06-08">
A unique, memorable app icon expresses the app's purpose and personality on the Home Screen, in search, notifications, settings, and share sheets. (2025-2026) Icons are now layered: the system applies Liquid Glass effects (specular highlights, refraction, translucency) to the layers, and Icon Composer is the tool for building and previewing them.

<best_practices>
*Layer design*
- **Provide layers rather than a flattened image.** (2025) iOS, iPadOS, macOS, and watchOS icons have a background layer plus one or more foreground layers; the system applies Liquid Glass attributes that adapt to icon size, apply consistently across platforms, and can differ between system versions. tvOS icons use two to five layers for the parallax effect (the icon lifts, sways, and illuminates when focused). visionOS icons use a background layer plus one or two upper layers, forming a 3D object with system shadows and an embossed look from the upper layers' alpha channels.
- **Build iOS, iPadOS, macOS, and watchOS icons in Icon Composer.** Import foreground layers from your design tool, define the background, place layers, apply specular highlights and refraction, annotate default, dark, and mono appearance variants, preview across system versions, and export for Xcode. For tvOS and visionOS, add layers directly to an image stack in Xcode and test with Parallax Previewer and the Parallax Exporter plug-in.
- **Prefer clearly defined edges in foreground layers.** Soft or feathered edges degrade the system-drawn highlights and shadows.
- **Vary opacity in foreground layers to increase the sense of depth and liveliness.** Photos splits its centerpiece into translucent layers; import fully opaque layers and tune transparency in Icon Composer so you can preview how transparency and system effects interact.
- **Design a background that both stands out and emphasizes foreground content.** Icon Composer supports solid colors and gradients, so a custom background image is rarely needed; if you use a gradient, confirm it responds well to system lighting, and any imported background must be full-bleed and opaque.
- **Prefer vector graphics when bringing layers into Icon Composer.** SVG or PDF stays crisp at any size; outline artwork and convert text to outlines. Use lossless PNG for mesh gradients and raster artwork.

*Icon shape*
- **Produce appropriately shaped, unmasked layers.** The system masks edges: square layers for iOS, iPadOS, and macOS (rounded corners matching system elements and the device bezel) and for visionOS and watchOS (circular mask); rectangular layers for tvOS (rounded, concentric corners). Pre-masked layers hurt specular highlights and look jagged.
- **Keep primary content centered to avoid truncation when the system adjusts corners or applies masking.** Center especially carefully for visionOS and watchOS; use the grids in the app icon production templates from Apple Design Resources.

*Design*
- **Embrace simplicity.** Find the one concept that captures the app, express it with a minimal number of shapes, and prefer a simple background (solid color or gradient); fine details look busy under system shadows and highlights and vanish at small sizes, and you need not fill the whole canvas.
- **Provide a visually consistent icon design across all the platforms your app supports.** People must recognize one app, not mistake it for several.
- **Consider basing your icon design around filled, overlapping shapes.** Overlapping solid foreground shapes paired with transparency and blurring create depth.
- **Include text only when it's essential to your experience or brand.** Text resists accessibility and localization, reads poorly at small sizes, and clutters; the app name often appears nearby anyway. A mnemonic like the first letter can work, but never add words like "Watch," "Play," "New," or "For visionOS." In tvOS, keep text above other layers so parallax does not crop it.
- **Prefer illustrations to photos and avoid replicating UI components.** Photos carry detail that fails across appearances, small sizes, and layer splits; avoid extremely thin line weights and sharp corners; never reproduce standard UI components or screenshots.
- **Don't use replicas of Apple hardware products.** They are copyrighted.

*Visual effects*
- **Let the system handle blurring and other visual effects.** Do not bake in specular highlights, inter-layer drop shadows, beveled edges, blurs, or glows; custom effects are static and conflict with the dynamic system ones. If you add any, test in Icon Composer, a Device Hub simulated device, or a physical device.
- **Create layer groupings to apply effects to multiple layers at once.** Grouping in Icon Composer or your design tool applies effects at group level and unlocks extra Liquid Glass options (specular highlights, refraction, translucency).

*Appearances (iOS, iPadOS, macOS)*
- **Design for default, dark, clear, and tinted appearances.** People pick an appearance to match their wallpaper; you may supply every variant and the system generates any you omit.
- **Keep your icon's features consistent across appearances.** Never swap elements between variants; people must still find the app after switching.
- **Design dark and tinted icons that feel at home beside system app icons and widgets.** You can keep the default palette, but dark icons are more subdued and clear and tinted icons more so; the icon must stay visible, legible, and recognizable in every variant.
- **Use your light app icon as the basis for your dark icon.** Choose complementary colors, avoid excessively bright imagery, and prefer color backgrounds for the greatest dark-icon contrast.
- **Consider offering alternate app icons.** Available in iOS, iPadOS, tvOS, and compatible apps in visionOS; each alternate must relate closely to the app (a sports app offering team icons) and never resemble another app. In iOS and iPadOS every alternate needs its own dark, clear, and tinted variants, and all icons are subject to App Review.
</best_practices>

<platform_considerations>
- **tvOS:** Include a safe zone so the system does not crop content when the focused icon scales and moves; the zone varies with image size, layer depth, and motion, and foreground layers are cropped more than background layers.
- **visionOS:** Avoid adding a shape that is intended to look like a hole or concave area to the background layer; system shadows and highlights make it stand out rather than recede.
- **watchOS:** Avoid black for the icon background; lighten it so the icon does not blend into the display.
</platform_considerations>

<specs>
| Platform | Layout shape | Shape after masking | Layout size | Style | Appearances |
|---|---|---|---|---|---|
| iOS, iPadOS, macOS | Square | Rounded rectangle (square) | 1024x1024 px | Layered | Default, dark, clear light, clear dark, tinted light, tinted dark |
| tvOS | Rectangle (landscape) | Rounded rectangle | 800x480 px | Layered (Parallax), 2 to 5 layers | N/A |
| visionOS | Square | Circular | 1024x1024 px | Layered (3D), background + 1 or 2 layers | N/A |
| watchOS | Square | Circular | 1088x1088 px | Layered | N/A |

The system scales the icon down for Settings, notifications, and similar locations. Color spaces: sRGB (color), Gray Gamma 2.2 (grayscale), Display P3 (wide-gamut; iOS, iPadOS, macOS, tvOS, and watchOS only).
</specs>

<anti_patterns>
- Don't supply pre-masked layers, soft or feathered foreground edges, or a background that is not full-bleed and opaque.
- Don't bake in specular highlights, drop shadows, bevels, blurs, or glows.
- Don't use photos, screenshots, replicas of UI components, thin line weights, or sharp corners.
- Don't add nonessential text ("Watch," "Play," "New," "For visionOS") or let tvOS text sit below other layers.
- Don't reproduce Apple hardware.
- Don't swap elements between appearance variants or make dark, clear, or tinted icons excessively bright.
- Don't offer alternate icons that could be mistaken for another app, or omit their dark, clear, and tinted variants.
- Don't use a black background on watchOS or a concave-looking shape on the visionOS background layer.
</anti_patterns>
</topic>

<topic name="Interface icons" source="https://developer.apple.com/design/human-interface-guidelines/icons" updated="2025-06-09">
An interface icon (glyph) expresses a single concept with streamlined shapes and touches of color, unlike the rich, personality-laden app icon. Both custom glyphs and SF Symbols use black and clear to define shape so the system can recolor the black areas.

<when_to_use>
- Prefer an SF Symbol as-is or customized; draw a custom glyph or custom symbol only when no symbol fits.
- For the common actions below, use the listed SF Symbols so menus, toolbars, and buttons read the same across Apple platforms.
</when_to_use>

<best_practices>
- **Create a recognizable, highly simplified design.** Use familiar visual metaphors directly related to the action or content; excess detail makes an icon confusing or unreadable.
- **Maintain visual consistency across all interface icons in your app.** Whether custom, system, or mixed, use consistent size, level of detail, stroke weight, and perspective; adjust an icon's dimensions when its visual weight differs so the set looks uniform.
- **In general, match the weights of interface icons and adjacent text.** Same weight gives consistent emphasis, unless you deliberately emphasize one.
- **If necessary, add padding to a custom interface icon to achieve optical alignment.** Asymmetric icons (such as a download arrow, heavier at the bottom) look off when geometrically centered; nudge the glyph and bake the offset into the asset's padding so geometric centering yields optical centering.
- **Provide a selected-state version of an interface icon only if necessary.** Toolbars, tab bars, and buttons update the selected appearance automatically (a selected toolbar icon takes the app's accent color).
- **Use inclusive images.** Prefer gender-neutral human figures and avoid imagery that is hard to recognize across cultures or languages.
- **Include text in your design only when it's essential for conveying meaning.** A character standing for text formatting is fine; localize any individual characters, abstract any passage of text, and ship a flipped version for right-to-left contexts.
- **If you create a custom interface icon, use a vector format like PDF or SVG.** The system scales vectors for high-resolution displays; PNG requires multiple versions. Alternatively create a custom SF Symbol with a scale that matches adjacent text.
- **Provide alternative text labels for custom interface icons.** Accessibility descriptions let VoiceOver describe the control.
- **Avoid using replicas of Apple hardware products.** Hardware changes often and dates your UI; if you must, use only Apple Design Resources images or the SF Symbols for Apple products.
</best_practices>

<platform_considerations>
- **macOS (document icons):** A document icon is a page with its top-right corner folded; if you supply none, macOS composites your app icon and the file extension. Supply any combination of background fill, center image, and text, and the system layers, masks, and composites them (template in Apple Design Resources). Design simple images that clearly communicate the document type with uncomplicated shapes and a reduced palette, since the icon can be as small as 16x16 px. A single expressive background fill with no center image works well (Xcode, TextEdit). Consider reducing complexity in small versions: use fewer, thicker lines aligned to the pixel grid at 32x32 px and drop details entirely at 16x16 px. Avoid placing important content in the top-right corner of the background fill, where the folded corner is drawn. If a familiar object conveys the type, add a center image; it measures half the icon canvas (16x16 px image for a 32x32 px icon). Define a margin of about 10% of the center-image canvas and keep about 80% of the canvas filled (about 205x205 px within 256x256 px). Specify a succinct term in place of an unfamiliar extension (SceneKit shows "scene" instead of "scn"); the system scales it to fit and capitalizes every letter.
</platform_considerations>

<specs>
Standard icons for common actions (SF Symbols):

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

macOS document icon background fill sizes: 512x512 @1x / 1024x1024 @2x; 256x256 @1x / 512x512 @2x; 128x128 @1x / 256x256 @2x; 32x32 @1x / 64x64 @2x; 16x16 @1x / 32x32 @2x (px).
macOS document icon center image sizes: 256x256 @1x / 512x512 @2x; 128x128 @1x / 256x256 @2x; 32x32 @1x / 64x64 @2x; 16x16 @1x / 32x32 @2x (px). Center image occupies about 80% of its canvas with a roughly 10% margin.
</specs>

<anti_patterns>
- Don't overload a glyph with detail or use unfamiliar metaphors.
- Don't mix stroke weights, detail levels, sizes, or perspectives across your icon set.
- Don't ship separate selected-state artwork for icons in standard toolbars, tab bars, or buttons.
- Don't include unlocalized characters or a reading-direction icon without a right-to-left flip.
- Don't use PNG for flat glyphs when PDF or SVG works.
- Don't omit accessibility labels on custom icons.
- Don't depict Apple hardware except with Apple-provided assets or symbols.
- Don't put important document-icon content in the top-right corner.
</anti_patterns>
</topic>

<topic name="Images" source="https://developer.apple.com/design/human-interface-guidelines/images" updated="2025-12-16">
Deliver artwork at the scale factors and formats each platform needs so it looks sharp on every device. A point is an abstract unit: on 2D platforms it maps to a resolution-dependent number of pixels; in visionOS it is an angular value that scales with distance.

<best_practices>
- **Provide high-resolution assets for all bitmap images in your app, for every device you support.** Append "@1x," "@2x," or "@3x" to filenames in the asset catalog; scale factor 1 is 1 px per point, 2 and 3 are the higher pixel densities of high-resolution displays.
- **In general, design images at the lowest resolution and scale them up to create high-resolution assets.** Place control points of resizable vector shapes at whole values so they align to the raster grid at 1x and therefore at 2x and 3x.
- **Include a color profile with each image.** Profiles keep colors as intended across displays (see color management guidance).
- **Always test images on a range of actual devices.** Artwork that looks right at design time can appear pixelated, stretched, or compressed on real hardware.
</best_practices>

<platform_considerations>
- **tvOS:** Layered images, transparency, scaling, and motion drive the parallax effect: a focused element lifts to the foreground, sways, and shines, and after inactivity unfocused content dims while the focused element expands. A layered image has two to five layers; the tvOS app icon must be a layered image, and Top Shelf and other focusable images are strongly encouraged to be. Runtime layered images fetched from a server must be `.lcr` files generated by Xcode's `layerutil` from LSR or Photoshop files, downloaded rather than embedded. Use standard interface elements (for example `FocusState`) so layered images get parallax automatically. Identify logical foreground (prominent elements, characters, title text), middle (secondary content, shadows), and background (opaque backdrop) layers. Generally keep text in the foreground. Keep the background layer opaque, or you get an error. Keep layering simple and subtle; parallax is meant to be almost unnoticeable. Leave a safe zone around foreground layers, because scaling and movement crop them. Always preview layered images in Xcode, Parallax Previewer for macOS, or the Parallax Exporter plug-in for Adobe Photoshop, and finally on an actual TV.
- **visionOS:** Images display across a far larger size range and the system scales resolution dynamically; positioned at angles, pixels may not map 1:1. Create a layered app icon (two to three layers). Prefer vector-based art for 2D images, since bitmaps may look poor when scaled up (see `Drawing sharp layer-based content in visionOS` for Core Animation layers). If you must rasterize, balance quality with performance: @2x is fine at common distances but is not dynamically scaled and can look soft up close; higher resolutions cost file size and runtime performance, especially above @6x, so pair anything above @2x with high-quality image filtering (`CALayer.filters`). (2025) Spatial photos (stereoscopic photos with spatial metadata, captured on iPhone 15 Pro or later, Apple Vision Pro, or compatible cameras) and spatial scenes (3D parallax images generated from a 2D image) display via RealityKit (`ImagePresentationComponent`). Make sure spatial photos render correctly by using stereo HEIC with spatial metadata so visionOS applies its stereo-comfort treatments. Prefer the feathered glass background effect (`GlassBackgroundEffect`) for text over spatial photos; it adds contrast and blurs detail to reduce discomfort. Take visual comfort into consideration when creating spatial photos from 2D content, since disparity adjustments can cause discomfort from some viewing positions. Display spatial photos and spatial scenes in standalone views such as a sheet or window, not inline; if stereoscopic images must be inline, add generous spacing so eyes can adjust. Use spatial scenes for specific moments, because each takes up to several seconds to generate (Photos offers an explicit action while immersed in one photo); avoid many at once and move between them with scroll views, pagination, or explicit actions. When displaying immersively, prefer minimal UI (Spatial Gallery shows one item, a small caption, a single Back button, and swipe navigation). Prefer larger spatial scenes centered in the field of view, since small ones give little parallax.
- **watchOS:** In general, avoid transparency to keep files small; composite a constant background into the image instead. Transparency is required in complication images, menu icons, and other template-image interface icons, because the system uses it to decide where to apply color. Use autoscaling PDFs to ship one asset for all screen sizes: design for the 40mm and 42mm screens at 2x and WatchKit scales per the table below.
</platform_considerations>

<specs>
| Platform | Scale factors |
|---|---|
| iPadOS, watchOS | @2x |
| iOS | @2x and @3x |
| visionOS | @2x or higher (see visionOS notes) |
| macOS, tvOS | @1x and @2x |

| Image type | Format |
|---|---|
| Bitmap or raster work | De-interlaced PNG |
| PNG graphics that don't need full 24-bit color | 8-bit color palette |
| Photos | JPEG (optimized as necessary) or HEIC |
| Stereo or spatial photos | Stereo HEIC |
| Flat icons, interface icons, other flat artwork needing high-resolution scaling | PDF or SVG |

watchOS autoscaling PDF scale by screen size:

| Screen size | 38mm | 40mm | 41mm | 42mm | 44mm | 45mm | 49mm |
|---|---|---|---|---|---|---|---|
| Image scale | 90% | 100% | 106% | 100% | 110% | 119% | 119% |

tvOS layered image: 2 to 5 layers, opaque background required. visionOS raster images: above @6x noticeably impacts performance.
</specs>

<anti_patterns>
- Don't ship bitmaps without every required scale factor or without a color profile.
- Don't skip testing on real devices.
- tvOS: don't use a transparent background layer, exaggerate 3D layering, or put essential content outside the safe zone.
- visionOS: don't rely on bitmaps for 2D art, don't exceed @6x without weighing performance, don't display spatial photos inline, and don't show many spatial scenes at once.
- watchOS: don't add transparency to non-template images.
</anti_patterns>
</topic>

<topic name="SF Symbols" source="https://developer.apple.com/design/human-interface-guidelines/sf-symbols" updated="2025-07-28">
SF Symbols provides thousands of configurable symbols that align with the San Francisco system font in every weight and size, for toolbars, tab bars, context menus, and inline text. Symbols and features are available only on the OS versions of the year they were introduced or later, and the license prohibits using symbols (or confusingly similar images) in app icons, logos, or any trademarked use.

<best_practices>
*Rendering modes*
- Symbol paths are organized into layers (primary, secondary, tertiary; `cloud.sun.rain.fill` is cloud, sun, raindrops). **Monochrome** applies one color to all layers. **Hierarchical** applies one color with per-layer opacity to create depth. **Palette** applies two or more colors, one per layer (two colors on a three-level symbol give secondary and tertiary the same color). **Multicolor** uses intrinsic colors that carry meaning (`leaf` green, `trash.slash` red), and some multicolor symbols accept other colors on some layers.
- **Use system-provided colors so symbols adapt automatically to accessibility accommodations, vibrancy, and Dark Mode.** See `renderingMode(_:)`.
- **Confirm that a symbol's rendering mode works well in every context.** Size and background contrast change how well details read; the automatic setting gives the preferred mode, but check each placement for a mode that improves legibility.

*Gradients (2025, SF Symbols 7)*
- **Use gradient rendering for dimension where size allows.** It generates a smooth linear gradient from a single source color, works in all rendering modes with system or custom colors and custom symbols, renders at any size, and looks best at larger sizes.

*Variable color*
- **Use variable color to communicate change, not depth.** It colors layers as a value crosses thresholds between 0 and 100 percent (for `speaker.wave.3`, wave layers light up as decibel ranges are reached and none light at silence); layers that do not change, like the speaker body, opt out. Use Hierarchical mode, not variable color, to convey depth and foreground/background structure.

*Weights and scales*
- **Match symbol weight to adjacent text.** Nine weights from ultralight to black correspond to San Francisco weights for precise matching.
- **Use scale to adjust emphasis without breaking weight matching.** Three scales, small, medium (default), and large, are defined relative to the font's cap height (`imageScale(_:)`, `UIImage.SymbolScale`, `NSImage.SymbolConfiguration`).

*Design variants*
- **Pick the variant that states the exact state or action.** Outline (most common, text-like, no solid areas) suits toolbars, lists, and symbols beside text; fill adds emphasis and suits iOS tab bars, swipe actions, and accent-color selection; slash marks an unavailable item or action; enclosed variants (circle, square, rectangle) improve legibility at small sizes; enclosed and slash often combine with outline or fill.
- **Let the host view choose outline vs fill when it can.** An iOS tab bar prefers fill and a toolbar takes outline, so you often need not specify.
- **Rely on script-specific variants.** Variants exist for Latin, Arabic, Hebrew, Hindi, Thai, Chinese, Japanese, Korean, Cyrillic, Devanagari, and several Indic numeral systems, and switch automatically with device language.

*Animations*
- Animations work on every symbol, in every rendering mode, weight, and scale, and on custom symbols; you control playback (once, indefinitely until a condition, speed, reverse before repeat) via the `Symbols` framework and `SymbolEffect`. Available effects: **Appear** and **Disappear** (gradual emergence or recession); **Bounce** (brief elastic scale up or down and back, plays once, signals an action occurred or is needed); **Scale** (persistent size change until reset, for selection or feedback); **Pulse** (opacity varies on layers annotated to pulse, or all layers, for ongoing activity); **Variable color** (cumulative, where changes persist per layer, or iterative, one layer at a time, with autoreverse and an option to hide inactive layers; open-loop layouts vs closed-loop layouts such as a circular progress ring that play seamlessly); **Replace** (down-up for a state change, up-up for forward progression, off-up to emphasize the next state); **Magic Replace** (smart transition between related shapes such as slashes drawing on and off or badges appearing; now the default, falling back to down-up or a direction you choose for unrelated symbols); **Wiggle** (back-and-forth along an axis to flag an overlooked change or reinforce direction); **Breathe** (opacity and size together, for living status like an active recording; pulse changes opacity alone); **Rotate** (whole symbol or By Layer, like fan blades, to show work in progress); **Draw On / Draw Off** (2025, SF Symbols 7: draws along a path through guide points, all layers at once, staggered, or one at a time, for progress like a download or meaning like a directional arrow).
- **Apply symbol animations judiciously.** There is no hard limit, but too many overwhelm and distract.
- **Make sure that animations serve a clear purpose in communicating a symbol's intent.** Each effect implies a specific action or response; check that people will not misread the animation or a combination.
- **Use symbol animations to communicate information more efficiently.** They confirm that something happened and can present complex information compactly.
- **Consider your app's tone when adding animations.** Align the animation's character with your brand and overall style.

*Custom symbols*
- **Use the template as a guide.** Export the template of a similar symbol, edit it in a vector tool, and match system symbols in level of detail, optical weight, alignment, position, and perspective; aim for simple, recognizable, inclusive, and directly related to the action or content. Annotate each layer with a color or hierarchical level (primary, secondary, tertiary) to support rendering modes.
- **Assign negative side margins to your custom symbol if necessary.** They optically align symbols whose badges widen them (a stack of folder symbols, some badged); name margins by configuration, for example "left-margin-Regular-M".
- **Optimize layers to use animations with custom symbols.** Annotate layers in the SF Symbols app; Z-order sets the color order for variable color, animatable front-to-back or back-to-front, and layer groups move related layers together.
- **Test animations for custom symbols.** Run every animation preset. Draw whole shapes rather than cutouts (a `person.2.fill`-style symbol should draw the full left person plus an offset path annotated as an erase layer for the gap) so layer information survives motion.
- **Avoid making custom symbols that include common variants, such as enclosures or badges.** Use the SF Symbols app component library to generate variants consistent with system symbols.
- **Provide alternative text labels for custom symbols.** VoiceOver needs them.
- **Don't design replicas of Apple products.** Apple product and feature symbols are copyrighted; the SF Symbols app badges noncustomizable ones with an Info icon and describes restrictions in the inspector, and you may display but never customize them.
</best_practices>

<specs>
| Attribute | Values |
|---|---|
| Rendering modes | Monochrome, Hierarchical, Palette, Multicolor (plus gradient rendering in SF Symbols 7) |
| Weights | 9, ultralight to black, matching San Francisco |
| Scales | Small, medium (default), large, relative to cap height |
| Variants | Outline, fill, slash, enclosed (circle, square, rectangle), script-specific |
| Variable color range | 0 to 100 percent thresholds |
| Animations | Appear, Disappear, Bounce, Scale, Pulse, Variable color, Replace, Magic Replace, Wiggle, Breathe, Rotate, Draw On / Draw Off |
| Minimum for animations | SF Symbols 5; Draw and gradients need SF Symbols 7 |
</specs>

<anti_patterns>
- Don't use SF Symbols or lookalikes in app icons, logos, or trademarked uses.
- Don't assume a symbol or feature exists on OS versions older than its introduction year.
- Don't use variable color to show depth; use Hierarchical rendering.
- Don't hardcode custom colors that ignore accessibility, vibrancy, and Dark Mode.
- Don't pile on animations or animate without a communicative purpose.
- Don't customize symbols marked as Apple products or features, and don't draw Apple product replicas.
- Don't hand-build enclosure or badge variants of custom symbols; use the component library.
- Don't ship custom symbols without accessibility labels or without testing every animation preset.
</anti_patterns>
</topic>

<decision_guide>
- Need an icon for a common action (Share, Add, Delete, Search, Filter, Bold, Like) → use the standard SF Symbol from the table; never invent a new metaphor.
- Need a glyph no symbol covers → create a custom SF Symbol from a template (gets weights, scales, rendering modes, animations); fall back to a PDF or SVG glyph with baked-in optical padding and an accessibility label.
- App identity → layered app icon built in Icon Composer with unmasked square (or tvOS rectangular) layers, default plus dark, clear, and tinted appearances; no baked-in effects.
- Symbol beside text in a toolbar or list → outline variant, weight matched to the text; tab bar, swipe action, or accent-color selection → fill variant.
- Symbol at a small size that must stay legible → enclosed (circle or square) variant.
- Unavailable action or state → slash variant.
- Showing a level that changes (volume, signal, progress) → variable color; showing structure or depth → Hierarchical rendering.
- Ongoing activity → Pulse (opacity), Breathe (opacity plus size), Rotate (working), or Variable color iterative; one-off confirmation → Bounce; state change → Replace or Magic Replace; overlooked call to action → Wiggle; progress along a path → Draw On (SF Symbols 7).
- Raster artwork → de-interlaced PNG at every required scale factor with a color profile; photos → JPEG or HEIC; spatial photos → stereo HEIC; flat art → PDF or SVG.
- tvOS focusable imagery → layered image (2 to 5 layers, opaque background, safe zone); visionOS 2D art → vectors, or rasters above @2x with filtering; watchOS → autoscaling PDF designed for 40mm/42mm at 2x, no transparency unless template.
- macOS custom file type → document icon from background fill, optional center image (half canvas, about 80% fill), and a short term instead of an obscure extension.
</decision_guide>

<quick_checklist>
- [ ] App icon is layered, built with unmasked layers of the right shape at 1024x1024 px (800x480 px tvOS, 1088x1088 px watchOS), with no baked-in highlights, shadows, blurs, or bevels?
- [ ] App icon has consistent core features across default, dark, clear, and tinted appearances, and every alternate icon has its own variants?
- [ ] App icon avoids photos, screenshots, UI replicas, Apple hardware, thin lines, sharp corners, and nonessential text?
- [ ] Icon design is visually consistent across all platforms the app supports?
- [ ] Common actions use the standard SF Symbols from the table rather than custom metaphors?
- [ ] All interface icons share size, detail level, stroke weight, and perspective, and match the weight of adjacent text?
- [ ] Custom glyphs are PDF or SVG, optically centered, localized or flipped where needed, and carry accessibility labels?
- [ ] Symbols use system colors and a rendering mode confirmed legible in each context?
- [ ] Symbol variant matches the container (outline in toolbars, fill in iOS tab bars) and variable color is used only for change, not depth?
- [ ] Symbol animations are few, purposeful, and tested on any custom symbols?
- [ ] Bitmaps ship at every required scale factor (@2x/@3x iOS, @2x iPadOS and watchOS, @1x/@2x macOS and tvOS) with color profiles?
- [ ] tvOS layered images have 2 to 5 layers, an opaque background, text in the foreground, and a safe zone?
- [ ] visionOS uses vector 2D art, shows spatial photos in standalone views with feathered glass behind text, and keeps rasters at or below @6x?
- [ ] watchOS images avoid transparency except template images and use autoscaling PDFs?
- [ ] No SF Symbols appear in the app icon, logo, or other trademarked use, and no Apple product symbols are customized?
</quick_checklist>
