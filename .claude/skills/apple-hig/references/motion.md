<overview>
Animation and movement: when motion earns its place, how feedback motion should behave, keeping motion optional, game frame rate and power settings, visionOS comfort rules (peripheral motion, large objects, rotation, oscillation), and watchOS easing.
Distills the HIG page: motion.
Load when adding custom animation or transitions, reviewing feedback motion, tuning game motion, or moving anything in a visionOS window, volume, or space.
</overview>

<topic name="Motion" source="https://developer.apple.com/design/human-interface-guidelines/motion" updated="2025-09-09">
Fluid motion conveys status, provides feedback and instruction, and enriches the experience, but only with purpose. System components already include motion and adapt it to accessibility settings and input methods; (2025) Liquid Glass moves with greater emphasis under direct touch and more subtly with a trackpad.

<best_practices>
- **Add motion purposefully, supporting the experience without overshadowing it.** Gratuitous or excessive animation distracts and can cause physical discomfort.
- **Make motion optional.** Never make motion the only channel for important information; supplement it with haptics and audio.
- **Strive for realistic feedback motion that follows people's gestures and expectations.** A view revealed by sliding down should not dismiss sideways.
- **Aim for brevity and precision in feedback animations.** Brief, precise feedback feels lightweight and communicates better: a succinct game animation tied to a successful action, or a Photos panorama in visionOS expanding quickly to fill the space ahead.
- **In apps, generally avoid adding motion to UI interactions that occur frequently.** The system already animates standard elements subtly.
- **Let people cancel motion.** Never make people wait for an animation, especially a repeated one.
- **Consider using animated symbols where it makes sense.** SF Symbols 5 or later animates system and custom symbols.
- **Make sure your game's motion looks great by default on each platform you support.** A consistent 30 to 60 fps feels smooth; choose per-device defaults so people never adjust settings first.
- **Let people customize the visual experience of your game to optimize performance or battery life.** For example, offer power modes, such as when an external power source is detected.
</best_practices>

<platform_considerations>
- **visionOS:** Motion plus depth gives essential feedback when people look at interactive elements, so it must never distract, confuse, or cause discomfort. As much as possible, avoid motion at the edges of the field of view; peripheral motion makes people feel they or their surroundings are moving, so any object that must move there should match the brightness of surrounding content. Large objects that fill much of the field of view and occlude passthrough read as part of the surroundings: raise translucency or lower contrast so their movement does not feel like self-motion, and keep windows fairly small, because this applies even when the person drags the object. Consider fades when relocating an object whose path communicates nothing: fade out, move, fade in. In general, avoid letting people rotate a virtual world, even subtly or under their control; use instantaneous directional changes during a quick fade-out. Consider a stationary frame of reference, since contained movement is easier to handle than an entire surrounding that moves (auto-moving a player can make people feel unwell). Avoid sustained oscillation, especially around 0.2 Hz; if unavoidable, keep amplitude low and consider translucency.
- **watchOS:** Prefer SwiftUI; use WatchKit (`WKInterfaceImage`) for layout and appearance animations or animated image sequences. Built-in easing at the start and end of every layout or appearance animation cannot be turned off or customized.
</platform_considerations>

<anti_patterns>
- Don't animate for its own sake or rely on motion alone for important information.
- Don't add motion to frequent interactions on custom elements.
- Don't block people behind an animation or contradict the triggering gesture.
- Don't ship game defaults that need changing to look good.
- visionOS: don't show peripheral motion, rotate a virtual world, move the whole surroundings without a stationary reference, sustain oscillation near 0.2 Hz, or move large opaque objects or oversized windows.
</anti_patterns>
</topic>

<decision_guide>
- Standard control or transition → keep the system's built-in motion; add nothing.
- Custom element used often → no added motion.
- Confirm a completed action → brief, precise feedback plus haptic or audio backup.
- Status or activity → animated SF Symbol (SF Symbols 5+) before custom animation.
- Any animation longer than an instant → cancellable.
- Game → steady 30 to 60 fps by default, plus a performance or battery mode.
- visionOS relocation → fade out, move, fade in; orientation change → instant change under a quick fade, never rotation.
- visionOS large moving object or window → more translucency, less contrast, smaller size, nothing in the periphery; continuous motion → inside a stationary frame of reference.
</decision_guide>

<quick_checklist>
- [ ] Every custom animation serves status, feedback, or instruction?
- [ ] No information depends on motion alone; haptics, audio, or static UI carry it too?
- [ ] Frequent interactions on custom elements have no added motion?
- [ ] Feedback motion mirrors the triggering gesture and stays brief?
- [ ] People can cancel or act before an animation finishes?
- [ ] Standard components are used so built-in motion and accessibility adaptations apply?
- [ ] Animated SF Symbols considered before custom status animation?
- [ ] Game holds 30 to 60 fps by default and offers a performance or battery mode?
- [ ] visionOS: no peripheral motion (or brightness matched), no rotating world, stationary frame present, no oscillation near 0.2 Hz?
- [ ] visionOS: large moving objects use translucency or lower contrast, windows stay small, relocations fade?
- [ ] watchOS: mandatory start and end easing accounted for?
</quick_checklist>
