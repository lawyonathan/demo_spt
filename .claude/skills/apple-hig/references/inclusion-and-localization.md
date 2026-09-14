<overview>
Distills HIG `inclusion` and `right-to-left` (both undated in the source). Inclusion covers designing from many perspectives, welcoming plain language, approachability, gender identity, diverse people and settings, hidden assumptions and stereotypes, accessibility as inclusion, and localization including culture-specific color meaning. Right to left covers Arabic and Hebrew support: text alignment, numerals, and which controls, images, and interface icons flip in the RTL context and which never do. Load when writing UI copy, choosing imagery, avatars, emoji, or glyphs, designing forms that ask about people, preparing for localization, or reviewing a mirrored RTL layout.
</overview>

<topic name="Inclusion" source="https://developer.apple.com/design/human-interface-guidelines/inclusion" updated="undated">
Inclusive apps put people first through respectful communication and content everyone can access and understand. The work is iterative: keep examining assumptions about how other people think and feel, and remember that an inoffensive app isn't necessarily an inclusive one.

<best_practices>
- **Design from many perspectives.** Use empathy to learn how a word or image lands from other perspectives, across: age; gender and gender identity; race and ethnicity; sexuality; physical attributes; cognitive attributes; permanent, temporary, and situational disabilities; language and culture; religion; education; political or philosophical opinions; social and economic context.
- **Consider the tone of your copy from different perspectives.** An academic tone seems to welcome only high levels of education; be clear, direct, and respectful.
- **Pay attention to how you refer to people.** Address them as _you_ and _your_; _the user_ or _the player_ feels distant. Reserve _we_ and _our_ for the software or company, since otherwise they imply a personal relationship that can read as insulting or condescending.
- **Avoid specialized or technical terms without defining them.** Define first and make definitions easy to look up; plain language reads and translates better even for people who know the term.
- **Replace colloquial expressions with plain language.** Idioms are culture-specific and hard to translate, and some (_peanut gallery_, _grandfathered in_) come from oppressive contexts.
- **Consider carefully before including humor.** It is subjective and hard to translate, and can confuse, irritate on repetition, or insult (Apple Style Guide: Writing inclusively).
- **Be approachable.** Require no prior skill or knowledge; present a clear, straightforward interface that fits the platform, and add onboarding that lets newcomers go step by step while others skip to the content they want.
- **Avoid unnecessary references to specific genders.** "You can let a subscriber post his or her recipes to your shared folder" becomes "Subscribers can post recipes to your shared folder", which also stays inclusive when localized into languages with gendered pronouns. Avoid gendered avatars, emoji, glyphs, and game characters; give people tools to customize them.
- **Depict a generic person with a nongendered human image.** SF Symbols such as `person.crop.circle`, `person.3.fill`, and `figure.wave`; _generic person_ means _human_, not _man_ or _woman_.
- **Ask for gender only when you require it** (health or legal reasons), with inclusive options such as _nonbinary_, _self-identify_, and _decline to state_, and consider letting people specify their pronouns.
- **Portray a range of human characteristics and activities.** A fitness app shows moves demonstrated by people of different racial backgrounds, body types, ages, and physical capabilities. Avoid stereotyped occupations and behaviors (only male doctors, female nurses, or heroes and villains echoing racial or gender stereotypes).
- **Review the settings and objects you show.** High affluence can feel unwelcoming and out of touch; prefer places, homes, activities, and items relatable to most people.
- **Find hidden assumptions.** A family account-access app that defines _family_ as a woman, a man, and their biological children excludes everyone else through its copy and images. Security questions like favorite college subject, first car, or first rainbow assume experiences not everyone shares; prefer universal ones such as favorite activity, first friend's name, or the quality that best describes you.
- **Support Apple's accessibility features** (VoiceOver, Display Accommodations, closed captioning, Switch Control, Speak Screen), and never assume a disability prevents someone from wanting the experience. Each disability is a spectrum (visual: low vision to blindness, color blindness, blurry vision, light sensitivity, peripheral vision loss), and everyone experiences disability with age, temporarily (hearing loss from an infection), or situationally (unable to hear on a noisy train).
- **Avoid images and language that exclude people with disabilities.** Include them when representing a variety of people, and never use a disability to express a negative quality.
- **Take a people-first approach when writing about disability.** Accomplishments and goals before the disability; use how a person or community self-identifies (Apple Style Guide: Writing about disability).
- **Prioritize simplicity and perceivability.** Familiar, consistent interactions; content perceivable by sight, hearing, or touch.
- **Internationalize first, then localize.** People choose a language for text and a region for dates, times, and money. Inclusive copy (plain, gender-neutral, stereotype-free, not culture-specific) prepares more locales, and SF Symbols supplies language-specific glyphs plus glyphs for both left-to-right and right-to-left contexts.
- **Discover color meanings in each locale.** White means death or grief in some places and purity or peace in others; if color communicates, make it communicate the same thing in every localized version.
</best_practices>

<anti_patterns>
- Don't refer to people as _the user_ or _the player_, and don't use _we_ or _our_ for anything but the software or company.
- Don't use undefined technical terms, colloquialisms, or humor that won't translate.
- Don't add gender references, gendered generic-person imagery, or gender-specific avatars, emoji, glyphs, or characters when unnecessary.
- Don't ask for gender unless required, and don't offer only binary options when you do.
- Don't show only stereotyped occupations, narrow family definitions, or affluent settings.
- Don't base security questions on culture- or capability-specific experiences.
- Don't use a disability as a negative quality or lead with it before a person's accomplishments.
- Don't assume a color means the same thing in every locale.
</anti_patterns>
</topic>

<topic name="Right to left" source="https://developer.apple.com/design/human-interface-guidelines/right-to-left" updated="undated">
Support right-to-left (RTL) languages like Arabic and Hebrew by reversing the interface to match their reading direction. System-provided frameworks and components flip automatically, so standard layouts may need no changes; fine-tune only layout details and locale differences in currencies, numerals, and mathematical symbols.

<best_practices>
- **Adjust text alignment to match the interface direction if the system doesn't.** Text left-aligned with content in LTR becomes right-aligned to match the mirrored content in RTL.
- **Align a paragraph (three or more lines) based on its language, not the context.** Right-aligning LTR text hides the start of each line; one- and two-line blocks follow the context's reading direction.
- **Use a consistent alignment for all items in a list,** including items displayed in a different script.
- **Identify the right numerals per locale in number-centric apps.** Hebrew uses Western Arabic numerals; Arabic may use Western or Eastern Arabic numerals, varying by country, region, and even area. Other apps can rely on system-provided number representations.
- **Don't reverse the order of numerals in a specific number.** The digits of "541", a phone number, or a credit card number keep their order regardless of language or surrounding content.
- **Reverse numerals that show progress or a counting direction; never flip the numerals themselves.** Numerals on progress bars, sliders, and rating controls, and any sequence that communicates order, reverse with the flipped control.
- **Flip controls that show progress from one value to another** (sliders, progress indicators), and reverse the positions of the glyphs or images marking the beginning and ending values.
- **Flip controls that navigate or access items in a fixed order.** A back button points right in RTL; next and previous buttons for ordered lists flip.
- **Preserve the direction of a control that refers to an actual direction or points to an onscreen area.** A control meaning "to the right" always points right.
- **Visually balance adjacent Latin and RTL scripts.** Arabic and Hebrew have no uppercase and look too small beside all-caps Latin in buttons, labels, and titles; increase the RTL font size by about 2 points.
- **Avoid flipping photographs, illustrations, and general artwork.** Flipping changes meaning and can violate copyright; if content depends on reading direction, create a new version.
- **Reverse the positions of images when their order is meaningful** (chronological, alphabetical, favorite).
- **Use SF Symbols for interface icons.** They ship RTL variants and localized Arabic and Hebrew symbols; custom symbols can declare directionality.
- **Flip icons that represent text or reading direction.** Left-aligned bars representing text become right-aligned.
- **Consider a localized version of an icon that displays actual text** (font-size choice, signature). SF Symbols has Latin, Hebrew, and Arabic versions of the signature, rich-text, and I-beam pointer symbols. If letters express a concept unrelated to reading or writing, design a text-free alternative.
- **Flip an icon that shows forward or backward motion.** Motion in the reading direction reads as forward; a speaker's sound waves come from the left in LTR and from the right in RTL.
- **Don't flip logos or universal signs and marks.** A flipped logo confuses people and can have legal repercussions; show it in original form even if it contains text. Marks like the checkmark stay consistent.
- **In general, avoid flipping icons that depict real-world objects.** Clocks work the same everywhere; tools slanted for right-handed use needn't flip, since most people are right-handed, and flipping can confuse.
- **Consider components and visual balance before flipping a complex custom icon.** Badges, slashes, and magnifying glasses may follow a fixed design language (SF Symbols keeps the same prohibition backslash in LTR and RTL). A badge depicting actual UI flips with the UI; a meaning-modifying badge flips only if meaning and balance survive (a cart badge kept top-right unbalances the flipped cart). Keep a tool's orientation while flipping the base image if necessary.
</best_practices>

<anti_patterns>
- Don't mix alignments within a list.
- Don't align a paragraph against its language just to match the context.
- Don't reverse digits within a number, and don't mirror numeral glyphs.
- Don't flip literal-direction controls, photographs, artwork, logos, universal marks, or real-world objects.
- Don't flip a complex icon wholesale without checking each component.
</anti_patterns>
</topic>

<decision_guide>
- Writing copy: address people as _you_; plain, defined terms; no idioms or humor; no unnecessary gender; _we_ only for the company or software.
- Generic person: nongendered SF Symbol (`person.crop.circle`, `person.3.fill`, `figure.wave`); customizable avatars, emoji, and characters.
- Collecting gender: only when required; _nonbinary_, _self-identify_, _decline to state_, optional pronouns.
- Security questions and examples: universal experiences, not college, cars, or specific sensory memories.
- Imagery of people: varied race, body type, age, and capability, including disabilities; no stereotyped roles, narrow families, or affluence.
- Color as a signal: confirm its meaning in every locale.
- New markets: internationalize, then localize; SF Symbols for language-specific and bidirectional glyphs.

RTL mirroring:

| Element | Behavior in the RTL context |
|---|---|
| Layout, navigation, system components | Flip automatically |
| One- or two-line text block | Align to the current context |
| Paragraph (three or more lines) | Align to its own language |
| List items | All share the reversed alignment, even in another script |
| Digits within a number, phone number, card number | Keep original order |
| Numerals marking progress, count, or sequence | Reverse order; never mirror the glyphs |
| Sliders, progress indicators, back, next, previous | Flip, including start and end glyphs |
| Control meaning a literal direction or onscreen area | Don't flip |
| Photos, illustrations, artwork | Don't flip; redraw if direction-bound |
| Ordered image sets | Reverse positions |
| Icons of text, reading direction, forward or backward motion | Flip |
| Icons containing actual text | Localized version (Latin, Hebrew, Arabic) |
| Logos, universal marks (checkmark) | Never flip |
| Real-world objects, clocks, right-handed tools | Don't flip |
| Prohibition backslash and similar design-language components | Keep as is |
| Arabic or Hebrew beside all-caps Latin | About 2 pt larger |
</decision_guide>

<quick_checklist>
- [ ] Copy addresses people as _you_, avoids _the user_ and _the player_, and reserves _we_ for the company?
- [ ] Technical terms are defined, and idioms and humor are absent or translatable?
- [ ] Gender references are removed where unnecessary, generic-person imagery is nongendered, and avatars are customizable?
- [ ] If gender is collected, it's required and offers _nonbinary_, _self-identify_, _decline to state_, and pronouns?
- [ ] Security questions and examples rely on universal experiences?
- [ ] Images show varied races, body types, ages, and abilities without stereotyped occupations, families, or affluence?
- [ ] Writing about disability is people-first and never uses disability as a negative?
- [ ] Colors that carry meaning are checked per locale?
- [ ] RTL text aligns by context (one or two lines) or by language (three or more), with uniform list alignment?
- [ ] RTL digits keep their order while progress and sequence numerals reverse without mirrored glyphs?
- [ ] RTL sliders, progress indicators, back, next, and previous flip, while literal-direction controls don't?
- [ ] Photos, artwork, logos, universal marks, clocks, and right-handed tools stay unflipped?
- [ ] Text-bearing icons are localized, and text, reading-direction, and motion icons use RTL variants?
- [ ] Arabic or Hebrew beside all-caps Latin is about 2 pt larger?
</quick_checklist>
