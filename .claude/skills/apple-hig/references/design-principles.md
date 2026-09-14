<overview>
Distills Apple's eight design principles (HIG page: design-principles, reintroduced 2026-06-08): Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, and Delight. They reflect a deep understanding of how people think, feel, and interact with the world, and they form the foundation for guidance throughout the HIG. There is no one right way to apply them; they are tools for weighing competing priorities and making key decisions on the path to a great design. Load this file when judging whether a direction feels right for an Apple platform, when two goals conflict (features vs focus, guidance vs freedom, delight vs task completion, personalization vs privacy, shipping vs polish), when writing the rationale for a design review, or when a brief is vague and needs a principled starting point. For component and platform rules, load the relevant area file.
</overview>

<topic name="Purpose" source="https://developer.apple.com/design/human-interface-guidelines/design-principles" updated="2026-06-08">
**Make something meaningful.** Design starts with intention. Identify what matters most to the people you're designing for. Focus on making those things great, and you'll create an experience that people truly value.

<best_practices>
- **Create value.** The best designs reflect a constant orientation toward what makes a product genuinely useful. At every stage of development, ask what your product is for and whether the design serves that purpose.
- **Keep focused.** Prioritize your app's most important features by aligning with how people want to use it, and focus on making those features truly great. A product with a clear use is more effective at helping people meet their goals.
- **Find new ways to solve the problem.** Investigate existing solutions, and avoid re-creating them. Define what sets your product apart, and ask how your design can reflect that.
</best_practices>

<anti_patterns>
- Don't re-create existing solutions; investigate them, then define what sets the product apart.
- Don't treat every feature as equally important; a product without a clear use is less effective at helping people meet their goals.
</anti_patterns>
</topic>

<topic name="Agency" source="https://developer.apple.com/design/human-interface-guidelines/design-principles" updated="2026-06-08">
**Let people do things their own way.** An interface exists to help people accomplish their goals. Give them the freedom to act, keep them informed about what's happening, and make it easy to recover from mistakes.

<best_practices>
- **Stay out of the way.** People use your product to get things done. Often the best way to help them do this is to get them directly to the task or content at hand. The best designs are unobtrusive and present when people need them.
- **Give people the freedom to explore.** Let them move through your interface and access features without being locked into specific flows or modes. When a guided flow is necessary, make it easy to skip or escape so people can get to the main experience quickly.
- **Help people recover from mistakes.** When people know they can reverse an action or return to a previous state, they feel free to explore, and that freedom makes your interface more inviting. Build forgiveness into your design, and make it easy. Recovering from the unexpected shouldn't cost people their time or work.
</best_practices>

<anti_patterns>
- Don't lock people into specific flows or modes; a necessary guided flow must be easy to skip or escape.
- Don't let recovering from the unexpected cost people their time or work.
- Don't put the interface between people and the task or content at hand.
</anti_patterns>
</topic>

<topic name="Responsibility" source="https://developer.apple.com/design/human-interface-guidelines/design-principles" updated="2026-06-08">
**Act in people's best interest.** Your work has an impact on people's lives. Earn their trust by prioritizing safety and privacy, and being transparent about what your product does and why.

<best_practices>
- **Be fully transparent about what your product does and why.** You have an opportunity to build a relationship with someone from their very first interaction. Make sure your app's intentions are clear from the start. Provide a clear rationale when asking for permission, and when gathering data, be clear about what you collect and how you use it.
- **Keep people's information safe.** People trust you to maintain the integrity of their data. Only collect what your product needs to function, and handle it with care. Anticipate ways it could be misused or cause harm, and put protections in place to prevent abuse and unintended consequences.
</best_practices>

<anti_patterns>
- Don't ask for permission without a clear rationale, and don't gather data without saying what you collect and how you use it.
- Don't collect more than the product needs to function.
- Don't ship without anticipating how data could be misused or cause harm and putting protections in place.
</anti_patterns>
</topic>

<topic name="Familiarity" source="https://developer.apple.com/design/human-interface-guidelines/design-principles" updated="2026-06-08">
**Build on what people know.** Drawing on concepts people already understand helps them feel immediately at home. Ground your experience in established physical and digital patterns and apply them consistently throughout your design.

<best_practices>
- **Use concepts that people know.** People bring knowledge of the real world and other software to every new experience. Draw on both to make your interface feel familiar and intuitive.
- **Keep visuals and interactions consistent.** Once you establish a behavior or appearance for an element, apply it throughout your design. Consistency helps people learn more quickly, and gives them confidence that new interactions will work the way they expect.
- **Provide clear feedback.** Give people clear signals about what's happening as they use your app. Show when controls are available, indicate when content changes, and use system patterns to display alerts and offer choices. Consistent feedback helps keep people informed and in control.
</best_practices>

<anti_patterns>
- Don't give an element a different behavior or appearance in one part of the design once you have established one elsewhere.
- Don't invent custom patterns for alerts and choices when system patterns exist.
- Don't leave people guessing whether a control is available or whether content changed.
</anti_patterns>
</topic>

<topic name="Flexibility" source="https://developer.apple.com/design/human-interface-guidelines/design-principles" updated="2026-06-08">
**Adapt to diverse contexts and needs.** People use your software in ways as unique as they are. The more your design acknowledges this, the more people feel welcome to use it. Be mindful of experiences other than yours, and try to support as many devices, types of interaction, and perspectives as possible.

<best_practices>
- **Design for everyone.** People are empowered by products designed with them in mind. Think about the diversity of people who may encounter your design, and take the range of their experiences, perspectives, and needs into account. Treat accessibility as a priority from the start. Design inclusively to reach the broadest possible audience and create a better experience for all.
- **Preserve a person's context.** Help people feel at home as your design adapts across platforms and configurations. Keep content and controls in consistent, predictable positions, and use natural animations to ease transitions.
- **Consider a variety of input methods.** People interact with their devices in different ways. Designing for as many inputs as possible, including voice, touch, keyboard, and more, means more people can use your product the way that works best for them.
- **Approach every platform with intention.** Your software should feel polished and at home wherever it runs. Give each platform you support the same level of care.
</best_practices>

<anti_patterns>
- Don't treat accessibility as an afterthought; it is a priority from the start.
- Don't move content and controls to unpredictable positions when the design adapts to a new platform or configuration.
- Don't design only for your own experience or for a single input method.
- Don't give a secondary platform less care than the primary one.
</anti_patterns>
</topic>

<topic name="Simplicity" source="https://developer.apple.com/design/human-interface-guidelines/design-principles" updated="2026-06-08">
**Be clear and direct.** A well-designed experience removes the unnecessary, with every element earning its place. When your interface is logically organized and straightforward to navigate, it's easier to get things done.

<best_practices>
- **Include just what's necessary.** Simplicity isn't minimalism. Aim for a focused, useful experience that keeps the important things close by and lets the others fall away.
- **Be concise.** When you find the simplest way to say something, it's often the most universal, and the most helpful. Choose exactly the words you need to convey a concept or label a control.
- **Establish hierarchy.** When form and function are readily apparent, people know how to reach a desired outcome. Prioritize recognizable controls and a consistent structure that helps people understand where they are and what comes next.
</best_practices>

<anti_patterns>
- Don't confuse simplicity with minimalism; the goal is a focused, useful experience, not sparseness for its own sake.
- Don't keep elements that haven't earned their place, or words a label doesn't need.
- Don't hide form and function behind unrecognizable controls or an inconsistent structure.
</anti_patterns>
</topic>

<topic name="Craft" source="https://developer.apple.com/design/human-interface-guidelines/design-principles" updated="2026-06-08">
**Care about every detail.** Your design is a reflection of how much you care. It shows your dedication to delivering the best possible experience for people. Take the time to do the work well.

<best_practices>
- **Quality sets the tone.** Every element of your design shows people how much you care. Be deliberate with each decision, and strive for stunning visuals, smooth animations, precise wording, and thoughtful audio.
- **Experiment and iterate.** Prototype early, try new approaches, and be willing to discard what doesn't work. Set a high bar for every feature, refine it, and try again. Test your product in real-world settings to make sure it's durable, reliable, and high-performing.
- **Maintain your craft.** Shipping isn't the finish line. Keep your interface current with the latest platform capabilities and design patterns, and keep the quality bar high. Design is an ongoing commitment.
</best_practices>

<anti_patterns>
- Don't treat shipping as the finish line; keep the interface current with the latest platform capabilities and design patterns.
- Don't keep an approach that doesn't work just because it was built; be willing to discard it.
- Don't skip real-world testing for durability, reliability, and performance.
</anti_patterns>
</topic>

<topic name="Delight" source="https://developer.apple.com/design/human-interface-guidelines/design-principles" updated="2026-06-08">
**Make it human.** People remember how a product makes them feel. Think about the emotions that are right for your experience, and aim to deliver them in a way that's satisfying, enriching, and a joy to use.

<best_practices>
- **Identify the emotion you want to inspire.** Not all software feels the same to use. A fitness app might energize; a meditation app might calm; a game might thrill. Know the feeling you want to evoke, and let it shape your design.
- **Create defining moments.** Every interaction is a chance to show what your software stands for. From a simple button press to an error message, consider whether each moment is an opportunity to add a touch of character that reflects the spirit of your design.
- **Don't mistake delight for decoration.** Keep in mind that people are trying to accomplish a task, so don't let pursuit of delight for its own sake get in the way of your product's core purpose. Think about your overall aesthetic: some designs benefit from a carefully considered practical touch, while others might prefer some whimsy. Experiment to find the right balance.
- **Consider the whole.** Delight emerges as the sum of the consideration that you put into your product. It's the culmination of everything a person experiences as they use it: the freedom to act, the safety to explore, the comfort of familiar metaphors, and the flexibility to transition from one context to another. When you design with intent, focus, and care, the result is a product that people find naturally delightful.
</best_practices>

<anti_patterns>
- Don't mistake delight for decoration.
- Don't let pursuit of delight for its own sake get in the way of the product's core purpose.
- Don't apply the same feeling to every product; a fitness app, a meditation app, and a game should not feel the same to use.
</anti_patterns>
</topic>

<decision_guide>
The principles are not a checklist to satisfy one by one. Use them to name the tension in a decision, then choose which value should win for the people the product serves. Typical tensions and how the principles resolve them:

| Competing priorities | Principles in play | How to resolve |
|---|---|---|
| Add more features vs stay focused | Purpose, Simplicity | Ask what the product is for. Make the most important features great; keep the important things close by and let the others fall away. Simplicity isn't minimalism. |
| Guided onboarding vs freedom to explore | Agency, Familiarity | Get people directly to the task or content. If a guided flow is necessary, make it easy to skip or escape. |
| Novel interaction vs established convention | Familiarity, Purpose, Craft | Default to concepts people already know and apply them consistently. Innovate only where it defines what sets the product apart, and prototype it early. |
| Personalization that needs data vs privacy | Responsibility, Purpose | Collect only what the feature needs to function, give a clear rationale at the moment of the request, and protect the data against misuse. |
| Expressive or playful UI vs task completion | Delight, Simplicity | Identify the emotion the experience should evoke, add character at defining moments (a button press, an error message), and never let delight for its own sake block the core purpose. |
| One design everywhere vs per-platform tailoring | Flexibility, Familiarity | Preserve a person's context (consistent, predictable positions; natural transition animations) while giving each platform the same level of care so the app feels at home wherever it runs. |
| Ship now vs polish | Craft, Purpose | Quality sets the tone: set a high bar, iterate, discard what doesn't work, and test in real-world settings. Shipping isn't the finish line; keep the interface current with platform capabilities. |
| Optimize one input mode vs support many | Flexibility, Agency | Design for as many inputs as possible (voice, touch, keyboard, and more) so people can use the product the way that works best for them. |
| Prevent errors with restrictions vs allow freedom | Agency | Build forgiveness: make actions reversible and previous states recoverable so freedom to explore is safe and doesn't cost time or work. |
| Accessibility later vs accessibility now | Flexibility, Responsibility | Treat accessibility as a priority from the start; designing inclusively creates a better experience for all. |

When a decision is still unclear, ask the principles in this order:
1. Purpose: does this serve what the product is for and what matters most to these people?
2. Agency and Responsibility: does it keep people in control, informed, safe, and able to recover?
3. Familiarity and Simplicity: is it built on known concepts, consistent, concise, and clearly organized?
4. Flexibility: does it work for everyone, on every supported device and input method?
5. Craft and Delight: is every detail deliberate, and does the whole evoke the intended feeling?
</decision_guide>

<quick_checklist>
- [ ] Is it clear what the product is for, and does the design serve that purpose at every stage?
- [ ] Are the most important features prioritized and made truly great, rather than every feature treated equally?
- [ ] Does the interface get people directly to the task or content, staying unobtrusive until needed?
- [ ] Can people skip or escape any guided flow and move through the interface without being locked into modes?
- [ ] Can people reverse actions and return to a previous state without losing time or work?
- [ ] Are the app's intentions clear from the first interaction, with a clear rationale for every permission request and every kind of data collected?
- [ ] Does the app collect only what it needs, with protections against misuse and unintended consequences?
- [ ] Are visuals and interactions consistent throughout, and built on concepts people already know from the real world and other software?
- [ ] Does the design give clear feedback: available controls, content changes, and system patterns for alerts and choices?
- [ ] Was accessibility treated as a priority from the start, and are multiple input methods (voice, touch, keyboard) supported?
- [ ] Do content and controls stay in consistent, predictable positions as the design adapts across platforms and configurations, with natural transition animations?
- [ ] Does every element earn its place, with concise wording and a recognizable hierarchy that shows where people are and what comes next?
- [ ] Are visuals, animations, wording, and audio deliberate and polished, and has the product been tested in real-world settings?
- [ ] Is the intended emotion identified, and is delight expressed through defining moments rather than decoration?
</quick_checklist>
