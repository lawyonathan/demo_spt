<required_reading>
**Read these reference files NOW:**
1. The `<decision_guide>` sections of the component files that cover the candidates. Map the job to files as follows:
   - Presenting something temporarily, navigating, or searching: `references/components-navigation-and-presentation.md`
   - Triggering actions or offering menus: `references/components-menus-and-actions.md`
   - Collecting a value or showing status: `references/components-input-and-status.md`
   - Showing content or organizing it: `references/components-content-and-layout.md`
   - Reaching people outside the app: `references/components-system-experiences.md`
2. `references/patterns-app-structure.md` when the question is about modality, settings, onboarding, or help
3. `references/patterns-data-and-content.md` when the question is about input, search, files, undo, drag and drop, or charts
4. `references/patterns-feedback-and-media.md` when the question is about feedback, progress, notifications, or media
5. `references/platforms.md` for the target platform, or `references/web-translation.md` for web
</required_reading>

<process>
**Step 1: State the job, not the widget.**
Write what the person needs to do in one sentence ("pick one of four sort orders", "confirm deleting 12 photos", "see download progress"). Note platform, size class, and where in the flow it happens.

**Step 2: List the candidates.**
Name every component or pattern that could do the job. Include the one the person proposed.

**Step 3: Apply the decision guide.**
Use the loaded `<decision_guide>` and each candidate's `<when_to_use>`. Eliminate candidates the HIG reserves for other jobs (for example, alerts are for critical information that needs a decision; action sheets for a choice tied to the current action; sheets for a distinct short task; popovers for regular-width contexts only). Check `<platform_considerations>` for the target platform.

**Step 4: Decide and justify.**
Pick one. Give the rule that decides it and its source URL. Name the system implementation (SwiftUI, UIKit, or AppKit type, or the HTML and ARIA pattern from `references/web-translation.md`). State the configuration that matters (button count and order, detents, dismissal, label style, accessibility label).

**Step 5: Note the runner-up.**
Say when the second-best choice would be right instead, so the person can adjust if their context differs.
</process>

<anti_patterns>
Avoid:
- Choosing by appearance instead of job
- Recommending a custom component when a system one fits
- Using alerts for non-critical information or for confirmation of routine, reversible actions
- Popovers on compact widths, segmented controls with too many segments, toggles for actions
- Answering without the platform considerations for the target platform
</anti_patterns>

<success_criteria>
- [ ] The job is stated in terms of what the person needs to do
- [ ] Candidates were compared with the HIG decision guide
- [ ] One choice is named with its rule, source URL, system implementation, and key configuration
- [ ] The runner-up and when it applies are noted
</success_criteria>
