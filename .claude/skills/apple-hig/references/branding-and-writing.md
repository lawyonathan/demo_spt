<overview>
How an app expresses identity and speaks to people: where brand belongs (voice, accent color, custom fonts for headlines, content layer) and where it does not (launch screens, repeated logos, altered components), Apple trademark rules, and interface writing (voice, tone, clarity, verb labels, capitalization, multi-step flows, pronouns, per-device wording, empty states, errors, settings, text field hints).
Distills the HIG pages: branding, writing.
Load when applying brand color or fonts, reviewing logo placement, or writing or reviewing any UI text: button labels, alerts, errors, onboarding, empty states, settings, placeholders.
</overview>

<topic name="Branding" source="https://developer.apple.com/design/human-interface-guidelines/branding" updated="2026-09-09">
Apps express brand identity in ways that are instantly recognizable yet feel at home on the platform. Brand lives in the app icon, the voice, and the content, and always defers to what people came to do; the App Store Marketing Guidelines cover branding in the store.

<best_practices>
- **Use your brand's unique voice and tone in all the written communication you display.** An encouraging brand might use plain words, occasional exclamation marks and emoji, and simple sentences.
- **Apply your app's accent color judiciously.** (2026) Broad brand color overwhelms and dilutes; minimize it on controls and reserve it for primary actions or status indicators (unread badges, the selected tab icon). Express brand color in the content layer, where it scrolls beneath Liquid Glass controls and gets picked up dynamically.
- **Consider using a custom font.** It must be legible at all sizes and support bold text and Dynamic Type; use it for headlines and subheadings with system fonts for body copy and captions, which are tuned for small sizes.
- **Express your brand with familiar components.** If you customize a component's appearance, keep its sizing, placement, and behavior familiar and platform-appropriate.
- **Ensure branding always defers to content.** Space spent on a brand-only element is space taken from content; keep brand refined and unobtrusive.
- **Help people feel comfortable by using standard patterns consistently.** Expected UI locations, standard symbols for common actions, and conventional navigation and modality keep even a stylized interface approachable.
- **Resist the temptation to display your logo throughout your app or game unless it's essential for providing context.** People rarely need reminding which app they are in.
- **Avoid using a launch screen as a branding opportunity.** It exists to shorten perceived startup and vanishes too fast to convey anything; use a welcome or onboarding screen for branded content.
- **Follow Apple's trademark guidelines.** Apple trademarks must not appear in your app name or images (Apple Trademark List; Guidelines for Using Apple Trademarks).
</best_practices>

<anti_patterns>
- Don't spread brand color across controls.
- Don't use a custom font that fails at small sizes or lacks bold text and Dynamic Type support.
- Don't alter a component's expected sizing, placement, or behavior.
- Don't spend screen space on brand-only elements or repeat the logo.
- Don't brand the launch screen.
- Don't put Apple trademarks in your app name or images.
</anti_patterns>
</topic>

<topic name="Writing" source="https://developer.apple.com/design/human-interface-guidelines/writing" updated="2025-12-16">
Words are part of the user experience, from onboarding to alerts to accessibility descriptions. Set a voice, vary tone by situation, use as few clear words as possible, and write for everyone.

<best_practices>
- **Determine your app's voice.** Know who you address and which words are familiar to them, and how you want them to feel: a banking app conveys trust and stability, a game excitement and fun. Keep a list of common terms and reuse it.
- **Match your tone to the context.** Consider what people are doing physically and in the app: a reached exercise goal gets a light, congratulatory tone; a failed payment gets a straightforward, direct one. Situation shapes the words and how text is displayed.
- **Be clear.** Use easily understood words, check that every word is needed, cut where you can, and read aloud when in doubt.
- **Write for everyone.** Plain language, accessibility and localization in mind, no jargon or gendered terminology.
- **Consider each screen's purpose.** Most important information first, text formatted for reading, more than one idea split across screens with a deliberate flow.
- **Be action oriented.** Active voice; button and link labels are almost always verbs. Clarity over cleverness: "Send" beats "Let's do it!" Links: never "Click here," instead "Learn more about UX Writing," which matters most for screen readers.
- **Build language patterns.** Consistency makes the app feel cohesive and makes future writing easier.
- **Adopt capitalization rules that align with your app's style, then apply them consistently.** Components like button labels have their own guidelines; otherwise title case reads formal, sentence case casual. Pick one per element type (title case for all alerts, sentence case for all headlines).
- **Give clear guidance and use consistent language throughout processes with multiple steps.** Open with "Get Started," advance with a consistent "Continue" or "Next" (or a label hinting at the next step), and finish with "Done."
- **Use possessive pronouns sparingly.** (2025) "Favorites" says what "Your Favorites" says, shorter. If used, keep the perspective consistent. Avoid "we" entirely: "Unable to load content" beats "We're having trouble loading this content."
- **Write for how people use each device.** Keep language consistent but adjust where helpful; describe gestures correctly ("tap," not "click," on iPhone and iPad). iPhone and Apple Watch allow personalization but demand brevity; TVs sit in shared spaces read by several people, and large distant text also demands brevity.
- **Provide clear next steps on any blank screens.** Empty states (a finished to-do list, an empty bookmarks folder) can welcome, educate, and show voice, but must be useful, fit the context, make the next action obvious with a button or link, and never hold crucial information, since they are temporary.
- **Write clear error messages.** Prevent errors first; when one is needed, place it close to the problem, avoid blame, and say what fixes it: "Choose a password with at least 8 characters" beats "That password is too short." No "oops!" or "uh-oh," which sound insincere. If wording cannot fix an error many people will hit, rethink the interaction.
- **Choose the right delivery method.** Weigh urgency, importance, context, need for immediate action, and supporting detail, then pick notifications, alerts, or action sheets with a matching tone.
- **Keep settings labels clear and simple.** Practical labels; add an explanation only when needed, describing the on state so people infer the off state (Apple Watch's Handwashing Timer says a timer can start when you wash your hands). To point to a setting, give a direct link or button, not a location description.
- **Show hints in text fields.** Label every field and use hint or placeholder text for format: an example ("name@example.com") or a description ("Your name"). Show errors next to the field and instruct rather than scold: "Use only letters for your name" beats "Don't use numbers or symbols"; never "Invalid name."
</best_practices>

<anti_patterns>
- Don't use jargon, gendered terms, or extra words.
- Don't use cute labels instead of verbs, or "Click here."
- Don't mix title and sentence case within one element type, or switch step labels mid-flow.
- Don't overuse "my" and "your," switch perspective, or say "we."
- Don't say "click" on touch devices.
- Don't leave empty states without a next action or park crucial information in them.
- Don't blame, use "oops!" or "uh-oh," or show an error far from its cause.
- Don't describe a setting's off state or its location instead of linking to it.
- Don't ship fields without hints or with robotic errors like "Invalid name."
</anti_patterns>
</topic>

<decision_guide>
- Brand presence → voice in copy, accent color only on primary actions and status, brand color in the content layer under Liquid Glass, custom font for headlines only.
- Tempted by a logo, splash, or branded chrome → cut it; branded welcome content goes in onboarding.
- Customizing a component → styling only; size, placement, behavior stay standard.
- Attention outside the flow → judge urgency and context, then notification, alert, or action sheet.

| Text element | Rule |
|---|---|
| Button label | Verb, clear over clever, consistent case ("Send," "Get Started") |
| Link | Describes destination ("Learn more about UX Writing"), never "Click here" |
| Flow steps | "Get Started" → "Continue" or "Next" → "Done" |
| Failure message | Impersonal and specific ("Unable to load content"), never "we" |
| Error | Next to the problem, no blame, states the fix ("Choose a password with at least 8 characters") |
| Placeholder | Example ("name@example.com") or description ("Your name") |
| Field validation | Instructs ("Use only letters for your name"), never "Invalid name" |
| Collection or setting label | No possessive ("Favorites"); describes on state; links directly to settings |
| Empty state | Welcome, educate, next action via button or link, nothing crucial |
| Gesture wording | "tap" on iPhone and iPad, "click" only with a pointer |
</decision_guide>

<quick_checklist>
- [ ] Accent color limited to primary actions and status, with brand color in the content layer rather than on controls?
- [ ] Custom font legible at all sizes with bold text and Dynamic Type support, and body copy in a system font?
- [ ] Customized components keep standard size, placement, and behavior?
- [ ] No repeated logo, branded launch screen, or brand-only screen elements?
- [ ] No Apple trademarks in the app name or images?
- [ ] Consistent voice, with tone matched to each situation?
- [ ] Every button label is a verb; every link describes its destination?
- [ ] Capitalization consistent per element type?
- [ ] Multi-step flows use consistent "Get Started" / "Continue" or "Next" / "Done" language?
- [ ] Possessives minimal and consistent; "we" absent?
- [ ] Gesture words match the device?
- [ ] Empty states offer a next action and hold nothing crucial?
- [ ] Errors sit beside the problem, avoid blame and interjections, and state the fix?
- [ ] Text fields have labels, format hints, and instructive inline errors?
- [ ] Settings labels describe the on state and link directly when referenced?
</quick_checklist>
