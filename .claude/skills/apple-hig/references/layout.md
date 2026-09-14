<overview>
Layout across Apple platforms: visual hierarchy, adaptability, size classes, layout guides and safe areas, platform rules (macOS, tvOS focus grids, visionOS windows and volumes, watchOS), plus visionOS spatial layout (field of view, depth, scale, spacing) and immersive experiences (Shared Space vs Full Space, immersion styles, comfort, environments).
Distills the HIG pages: layout, spatial-layout, immersive-experiences.
Load when placing or grouping content, handling resizing, orientation, multitasking, or Dynamic Type, building tvOS grids, sizing visionOS windows, or designing visionOS depth, immersion, or environments.
</overview>

<topic name="Layout" source="https://developer.apple.com/design/human-interface-guidelines/layout" updated="2026-09-09">
A consistent layout that adapts across display sizes, orientations, window sizes, and multitasking states keeps familiar relationships between controls and content on every device.

<best_practices>
*Visual hierarchy*
- **Order content by relative importance.** People read top to bottom, leading to trailing, so put the most important items near the top and leading side; prefer standard components that adapt to right-to-left languages.
- **Align elements to make them easier to scan, and use indentation to convey hierarchy.** Aligned items read as related; indented items read as subordinate to the item above.
- **Group related items to clearly express related information or functions.** Use negative space, container shapes, or separator lines.
- **Use progressive disclosure to make layouts cleaner and easier to interact with.** Disclosure triangles, menus, or nested views reduce initial content; scrollable sections suit media apps (video, music, books).
- **Differentiate controls from content.** (2025) Use Liquid Glass for controls and a scroll edge effect, not a solid or semi-opaque background, to lift them above content. Extend full-screen background content under sidebars, toolbars, and tab bars; if a sidebar or inspector covers important parts of a background image, use a background extension effect (`backgroundExtensionEffect()`, `UIBackgroundExtensionView`) that flips and blurs the image beneath adjacent components.

*Adaptability*
- **Design a layout that adapts gracefully and consistently.** Use SwiftUI or Auto Layout; respect safe areas, margins, and guides; handle compact and regular size classes, screen sizes, orientations and aspect ratios, the Dynamic Island, external displays, Display Zoom, resizable windows on iPad and Mac, text-size changes, and locale features (left-to-right/right-to-left, date/time/number formats, font variation, text length). Even a landscape-only game must resize well.
- **Be prepared for text-size changes.** Support Dynamic Type: stack horizontally adjacent views vertically, grow rows and containers so text is never cropped or overlapping, let single-line rows become multiline. Unity games use Apple's accessibility plug-in.
- **Preview your app on multiple devices, using different size classes, localizations, and text sizes.** Test the largest and smallest layouts first; use Device Hub simulated devices to catch clipping (iPad window resizing, iPhone Mirroring on Mac).
- **When necessary, scale background artwork in response to display changes.** Never change its aspect ratio; scale to fill, and expect very wide-and-short or tall-and-narrow windows that need artwork beyond the usual visible area.

*Size classes (iOS, iPadOS)*
- Horizontal (compact = narrow, regular = wide) and vertical (compact = short, regular = tall) size classes are set by device type, window configuration, and multitasking state (full screen, Slide Over, iPhone Mirroring on Mac); apps can meet every combination. See `UITraitChangeObservable`, `UserInterfaceSizeClass`.
- **Determine layout based on size classes, not device type or orientation.** Only size classes describe available space; idiom and orientation do not.
- **Consider all possible combinations of size classes.** An iPhone-landscape layout (regular width, compact height) wastes space when an iPad window gains regular height; a compact-portrait-only layout leaves gaps at regular width.
- **Keep functionality the same as size classes change, and keep layout changes recognizable and familiar to the platform.** Vary how much is visible, not what exists: switch a tab bar to a sidebar or surface overflow-menu items in larger spaces. The idiom never changes on resize.

*Guides and safe areas*
- A **layout guide** is a rectangle for positioning, aligning, and spacing content; predefined guides apply standard margins and limit text width for readability (`UILayoutGuide`, `NSLayoutGuide`).
- **Respect the safe area,** the region not covered on an edge by hardware (Dynamic Island) or another view (toolbar, tab bar, status bar), so nothing obstructs content or controls (`SafeAreaRegions`).
</best_practices>

<platform_considerations>
- **macOS:** Avoid controls or critical information at the bottom of a window (people drag windows below the screen edge). Avoid content behind the camera housing at the top edge (`NSPrefersDisplaySafeAreaCompatibilityMode`).
- **tvOS:** Inset primary content 60 pt from top and bottom and 80 pt from the sides to survive TV compatibility settings and overscan. Pad focusable elements, which grow on focus, so they never overlap important information; use the grid specs below (`UICollectionViewFlowLayout` derives column count from width and spacing). Add extra vertical spacing for titled rows, above and below the title. Use consistent spacing or it stops reading as a grid. Keep partially hidden offscreen content symmetrical, the same width on each side.
- **visionOS:** Content lives in a window, a bounded 3D volume, or an immersive space. In general, support resizing; adapt the layout and keep content horizontally centered at very large sizes. Set minimum and maximum sizes on windows, volumes, and ornaments only to stop overlap when small or unwieldiness when large (Safari fixes its navigation bar ornament's maximum), never to prevent resizing. Use 3D content sparingly in windows: reserve fixed-depth 3D for meaningful moments (an inline rocket model beside its description), inset it so it neither collides with controls nor pokes outside the window; use a volume or immersive space for larger or primarily 3D content. Display supplemental content in an adjacent window (`defaultWindowPlacement(_:)`), not in an ornament; ornaments are for app-specific controls such as toolbars and playback controls. Space controls so the hover effect cannot obscure neighbors: button centers at least 60 pt apart.
- **watchOS:** Avoid more than two or three controls side by side: at most three glyph buttons or two text buttons per row; full-width text buttons are usually better, and two short-text buttons work if the screen does not scroll. Support autorotation (`isAutorotating`) in views people show to others, like an image or QR code.
</platform_considerations>

<specs>
tvOS grids (space unfocused rows and columns so focused items do not overlap):

| Columns | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|
| Unfocused content width | 860 pt | 560 pt | 410 pt | 320 pt | 260 pt | 217 pt | 184 pt | 160 pt |
| Horizontal spacing | 40 pt | 40 pt | 40 pt | 40 pt | 40 pt | 40 pt | 40 pt | 40 pt |
| Minimum vertical spacing | 100 pt | 100 pt | 100 pt | 100 pt | 100 pt | 100 pt | 100 pt | 100 pt |

tvOS safe area: 60 pt top and bottom, 80 pt sides. visionOS: button centers at least 60 pt apart.
</specs>

<anti_patterns>
- Don't put a solid or semi-opaque background beneath controls.
- Don't change background artwork's aspect ratio.
- Don't decide layout from idiom or orientation.
- Don't change functionality with available space.
- Don't let Dynamic Type crop or overlap text.
- Don't let focused tvOS elements overlap content or space grids inconsistently.
- Don't use visionOS min/max sizes to block resizing, put supplemental content in an ornament, or let inline 3D exit the window.
- Don't put critical macOS controls at the window bottom or behind the camera housing.
- Don't exceed three glyph buttons or two text buttons per watchOS row.
</anti_patterns>
</topic>

<topic name="Spatial layout (visionOS)" source="https://developer.apple.com/design/human-interface-guidelines/spatial-layout" updated="2024-03-29">
Spatial layout uses the infinite canvas of Apple Vision Pro. Keep content in the field of view, use depth to clarify rather than decorate, and leave generous space around interactive elements.

<best_practices>
*Field of view*
- The field of view is what a person sees without moving their head; it varies with Light Seal fit and peripheral acuity, and the system does not report it.
- **Center important content within the field of view.** Apps launch directly in front of people; in immersive experiences keep key content centered and keep distracting motion or bright, high-contrast objects out of the periphery.
- **Avoid anchoring content to the wearer's head.** Head-locked content feels stuck and confining and hides passthrough; anchor content in the person's space.

*Depth*
- People read depth from distance, occlusion, and shadow; the system adds color temperature, reflections, and shadow automatically. Small amounts of depth throughout, even in windows, look natural (SwiftUI adds depth effects to views in 2D windows); use RealityKit for true 3D objects, anywhere or in a volume (a window without a visible frame).
- **Provide visual cues that accurately communicate the depth of your content.** Missing or conflicting cues cause discomfort.
- **Use depth to communicate hierarchy.** People notice depth changes: a window recedes along the z-axis when a sheet comes forward.
- **In general, avoid adding depth to text.** Hovering text is hard to read.
- **Make sure depth adds value.** Separate large elements (tab bar, toolbar from a window), not small ones (a button's symbol from its background); limit the number of depths, since each refocus tires the eyes.

*Scale*
- **Dynamic scale** enlarges a window as it moves away and shrinks it as it nears, so it appears constant; **fixed scale** keeps true size, looking smaller when far. A visionOS point is an angle, not pixels.
- **Consider using fixed scale when you want a virtual object to look exactly like a physical object.** Reserve it for noninteractive, life-size objects; interactive content needs dynamic scale.

*General*
- **Avoid displaying too many windows.** They obscure surroundings, feel constricting, and are cumbersome to relocate.
- **Prioritize standard, indirect gestures.** They work on any object at any distance without raising a hand; direct gestures tire people, especially at or above the line of sight, so reserve them for nearby objects handled briefly.
- **Rely on the Digital Crown to help people recenter windows in their field of view.** Pressing it recenters content with no app work.
- **Include enough space around interactive components to make them easy for people to look at.** Place regular-size buttons with centers at least 60 pt apart (16 pt or more between them) so the hover effect never crowds neighbors, and never overlap interactive elements.
- **Let people use your app with minimal or no physical movement.** Unless movement is essential, everything works while stationary.
- **Use the floor to help you place a large immersive experience.** Align floor-rising content to a flat horizontal plane at floor level.
</best_practices>

<anti_patterns>
- Don't head-lock content or put motion or bright objects in the periphery.
- Don't add depth to text or small elements, or use many depths.
- Don't fix-scale interactive content.
- Don't open too many windows or overlap interactive elements.
- Don't require physical movement.
</anti_patterns>
</topic>

<topic name="Immersive experiences (visionOS)" source="https://developer.apple.com/design/human-interface-guidelines/immersive-experiences" updated="2025-06-09">
Apps run in the Shared Space (alongside other apps) or a Full Space (alone, other apps hidden) and can transition between them at any time. Reserve immersion for meaningful moments and let people control when it increases.

<when_to_use>
- Default: launch in the Shared Space or with `mixed`; enter a Full Space only for tasks that benefit.
- `mixed` (Full Space): unbounded 3D blended with passthrough; no boundary; nearby content turns semi-opaque as a person approaches a physical object; may request room layout and nearby-object data via ARKit.
- `progressive` (Full Space): custom environment partially replaces passthrough; set a custom immersion range, portrait or landscape (2025); the Digital Crown adjusts immersion within the default 120 to 360 degrees or your range; boundary about 1.5 m.
- `full` (Full Space): 360-degree environment fully replaces passthrough; boundary about 1.5 m.
- Dimmed or tinted passthrough (`SurroundingsEffect`; black by default, custom tint allowed): focus attention in the Shared Space without hiding other apps, or sharpen focus in a Full Space.
- Virtual objects would substantially obscure passthrough → `full` or `progressive`, not `mixed`. People may move beyond 1.5 m → avoid `progressive` and `full`, or return to `mixed`.
</when_to_use>

<best_practices>
- System behavior: passthrough is live camera video. Pressing and holding the Digital Crown recenters content; double-clicking briefly hides all content. In `mixed`, content dims briefly when a person nears a physical object. In `progressive` and `full`, approaching the roughly 1.5 m boundary (from initial head position) fades the experience and raises passthrough; crossing it replaces visuals with the app icon until the person returns or recenters.
- **Offer multiple ways to use your app or game.** Support the accessibility features people rely on.
- **Prefer launching your app or game in the Shared Space or using the `mixed` immersion style.** People keep other apps in reach and choose when to go deeper.
- **Reserve immersion for meaningful moments and content.** Photos browses in a window and moves to a Full Space only to examine one photo.
- **Help people engage with key moments in your app or game, regardless of the level of immersion.** Start with subtle dimming, tinting, motion, scale, or Spatial Audio; strengthen only with reason.
- **Prefer subtle tint colors for passthrough.** (visionOS 2 and later) Tints coordinate surroundings and hands with content; avoid bright or dramatic tints.
- **Be mindful of people's visual comfort.** Keep 3D content within the field of view and motion comfortable in a Full Space.
- **Choose a style of immersion that supports the movements people might make while they're in your app or game.** Minor movements (shifting weight, turning, sitting or standing) are fine; excessive movement interrupts, so avoid `progressive` or `full` when people may cross 1.5 m.
- **Avoid encouraging people to move while they're in a progressive or fully immersive experience.** Let people bring an object closer instead of walking to it.
- **If you use the `mixed` immersion style, avoid obscuring passthrough too much.** People navigate by it.
- **Adopt ARKit if you want to blend custom content with someone's surroundings.** Room and hand data are sensitive: request permission (`SceneReconstructionProvider`).
- **Design smooth, predictable transitions when changing immersion.** Gentle, trackable, never jarring (`CoordinateSpaceProtocol`).
- **Let people choose when to enter or exit a more immersive experience.** Provide clear enter and exit actions (Keynote's Rehearsal shows a prominent Exit button); never require system controls to reduce immersion.
- **Indicate the purpose of an exit control.** Say whether it returns to a less immersive context or quits; if quitting, let people pause or save first.
- **Prefer virtual hands that match familiar characteristics.** Match the viewer's hand positions and gestures.
- **Use caution if you create virtual hands that are larger than the viewer's hands.** They block content, feel clumsy, and seem too close to the face.
- **If there's an interruption in hand-tracking data, fade out virtual hands and reveal the viewer's own hands.** Never freeze them; fade back in when data returns.
- **Minimize distracting content.** In an environment, avoid heavy movement or high-contrast detail during a primary task; use top-quality textures where attention belongs and lower quality plus dimming elsewhere.
- **Help people distinguish interactive objects in your environment.** Proximity signals interactivity: near objects invite touch, far ones do not.
- **Keep animation subtle.** Drifting clouds enrich; keep movement away from the edges of the field of view.
- **Create an expansive environment, regardless of the place it depicts.** Small spaces feel claustrophobic.
- **Use Spatial Audio to create atmosphere.** Avoid repetition and looping; lower or stop the soundscape when other audio (a movie) plays.
- **In general, avoid using a flat 360-degree image to create your environment.** It lacks scale; prefer lit object meshes with shader animation (clouds, leaves, reflections).
- **Help people feel grounded.** Always provide a ground plane mesh, even under a 360-degree image.
- **Minimize asset redundancy.** Repeated assets feel less real.
</best_practices>

<anti_patterns>
- Don't launch straight into `progressive` or `full`, or assume the app should be fully immersive most of the time.
- Don't use bright passthrough tints.
- Don't use `progressive` or `full` when people may cross 1.5 m, or encourage movement there.
- Don't obscure much passthrough in `mixed`.
- Don't make jarring transitions or force system controls for exit.
- Don't freeze or oversize virtual hands.
- Don't fill environments with motion or high contrast, especially peripheral; don't use flat 360-degree images, skip the ground plane, repeat assets, or loop audio.
</anti_patterns>
</topic>

<decision_guide>
- Separate controls from content → Liquid Glass plus scroll edge effect, never a solid backing.
- Adapt a layout → branch on size classes, never idiom or orientation; more width → tab bar becomes sidebar or overflow items surface, functionality unchanged.
- Background covered by sidebar or inspector → background extension effect; cropped or letterboxed → scale to fill, keep aspect ratio.
- tvOS edges → 60 pt top/bottom, 80 pt sides; grids → 40 pt column spacing, 100 pt minimum row spacing.
- visionOS mostly 2D with an inline 3D moment → window; primarily 3D → volume; supplemental content → adjacent window; app controls → ornament.
- visionOS interactive object → dynamic scale; noninteractive life-size object → fixed scale.
- visionOS attention → subtle dimming, tinting, motion, scale, or Spatial Audio before more immersion.

| Space / style | Other apps | Passthrough | Boundary | Use for |
|---|---|---|---|---|
| Shared Space | Visible | Full, optionally dimmed or tinted | None | Default launch, working beside other apps |
| Full Space `mixed` | Hidden | Full, content blends in | None | Unbounded 3D in the room, ARKit data, people who may move |
| Full Space `progressive` | Hidden | Partially replaced, 120 to 360 degrees adjustable | About 1.5 m | Custom environment while staying grounded |
| Full Space `full` | Hidden | Fully replaced | About 1.5 m | Total transport to a 360-degree environment |
</decision_guide>

<quick_checklist>
- [ ] Most important content near the top and leading edge, with alignment and indentation showing hierarchy?
- [ ] Controls use Liquid Glass with a scroll edge effect, and full-screen content extends under bars?
- [ ] Layout branches on size classes with every combination handled, functionality unchanged?
- [ ] Largest Dynamic Type sizes cause no clipping or overlap?
- [ ] Safe areas, margins, Dynamic Island, and macOS camera housing respected?
- [ ] Previewed at smallest and largest sizes, multiple localizations, and resized windows?
- [ ] tvOS content inset 60/80 pt, grid spacing per spec, focused items never overlapping?
- [ ] macOS critical controls away from the window bottom; watchOS rows hold at most three glyph or two text buttons?
- [ ] visionOS windows resize, stay centered when large, button centers 60 pt apart, no overlapping interactive elements?
- [ ] visionOS avoids head anchoring, peripheral motion, depth on text, and fixed scale on interactive objects?
- [ ] visionOS launches in the Shared Space or `mixed`, with explicit enter and exit controls for deeper immersion?
- [ ] Immersion style matches expected movement (no `progressive` or `full` past the 1.5 m boundary)?
- [ ] Environments have a ground plane, subtle animation, real meshes, and non-looping Spatial Audio?
</quick_checklist>
