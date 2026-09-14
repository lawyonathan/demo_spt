<overview>
Distills the HIG "Selection and input" pages (color-wells, combo-boxes, digit-entry-views, image-wells, pickers, segmented-controls, sliders, steppers, text-fields, toggles, virtual-keyboards) and "Status" pages (activity-rings, gauges, progress-indicators, rating-indicators).
Load when designing or reviewing forms, settings, data entry, onscreen keyboards, loading states, or any control that collects a value or reports one back.
Pop-up and pull-down buttons, tab bars, tab views, text views, and labels appear only as alternatives here; see their own references.
</overview>

<topic name="Color wells" source="https://developer.apple.com/design/human-interface-guidelines/color-wells" updated="n/a">
A color well adjusts the color of text, shapes, guides, and other elements; tapping or clicking opens a system or custom color picker (`UIColorWell`, `UIColorPickerViewController`, `NSColorWell`). iOS, iPadOS, macOS, visionOS only.

<best_practices>
- **Consider the system-provided color picker.** Consistent across iOS, iPadOS, and macOS, and people can save a set of colors usable from any app.
</best_practices>

<platform_considerations>
- **macOS:** A click highlights the well, opens the picker, and the well updates after selection. Colors can be dragged between wells and from the picker to a well.
</platform_considerations>
</topic>

<topic name="Combo boxes" source="https://developer.apple.com/design/human-interface-guidelines/combo-boxes" updated="n/a">
A text field plus a pull-down button (`NSComboBox`); people type a custom value or pick a predefined one, and custom values are not added to the list. macOS only.

<best_practices>
- **Populate the field with a meaningful default value from the list.** Need not be the first item.
- **Use an introductory label.** Title-style capitalization, ending with a colon.
- **Provide relevant choices.** Custom entry plus the most likely values.
- **Make sure list items aren't wider than the text field.** Otherwise they truncate.
</best_practices>
</topic>

<topic name="Digit entry views" source="https://developer.apple.com/design/human-interface-guidelines/digit-entry-views" updated="n/a">
A full-screen tvOS view collecting a series of digits, such as a PIN, on a digit-specific keyboard, with optional title and prompt above the digits (`TVDigitEntryViewController`). tvOS only.

<best_practices>
- **Use secure digit fields.** Asterisks replace digits; always for sensitive data.
- **Clearly state the purpose.** Title and prompt explain why digits are needed.
</best_practices>
</topic>

<topic name="Image wells" source="https://developer.apple.com/design/human-interface-guidelines/image-wells" updated="n/a">
An editable image view (`NSImageView`): once selected, people copy, paste, or delete its image; a new image can be dragged in without selecting. macOS only.

<best_practices>
- **Revert to a default image when necessary.** If an image is required, restore the default when people clear the well.
- **If copy and paste is supported, make the standard Edit menu items available.** People expect the menu items and keyboard shortcuts.
</best_practices>
</topic>

<topic name="Pickers" source="https://developer.apple.com/design/human-interface-guidelines/pickers" updated="2023-06-05">
One or more scrollable lists of distinct values, single or multipart; values and order follow device language. Date pickers add a calendar view and numeric keypad entry (`Picker`, `UIPickerView`, `UIDatePicker`, `NSDatePicker`).

<when_to_use>
- Picker: medium-to-long lists.
- Pull-down button: a fairly short list (a picker adds too much visual weight).
- List or table: a very large set (adjustable height; a table index jumps to sections).
</when_to_use>

<best_practices>
- **Use predictable and logically ordered values.** Most values are hidden before interaction (alphabetized countries).
- **Avoid switching views to show a picker.** Show it in context near the field, typically at the bottom of a window or in a popover.
- **Consider less granularity for minutes.** Default is 60 values (0 to 59); any interval dividing evenly into 60 works (0, 15, 30, 45).
- **Use a compact date picker when space is constrained (iOS, iPadOS).** A button in the accent color shows the value; tapping opens a modal calendar-style editor and time picker; people edit repeatedly, then tap outside to confirm.
- **Choose a date picker style that suits your app (macOS).** Textual: limited space, specific selections. Graphical: browsing a calendar, selecting a date range, or a clock face.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** Works with touch, keyboard, or pointer; values and order follow device location. Countdown timer mode is unavailable in inline and compact styles.
- **tvOS:** Available with SwiftUI `Picker`.
- **watchOS:** Digital Crown navigation. Lists and date/time pickers use the wheels style with optional outline, caption, and scrolling indicator. For longer lists the `navigationLink` style shows a button that opens the list; the Digital Crown can scrub options without tapping.
</platform_considerations>

<specs>
| iOS/iPadOS style | Appearance |
|---|---|
| Compact | Button; editable date and time in a modal view |
| Inline | Time only: button with wheels; date and time: inline calendar |
| Wheels | Scrolling wheels; built-in or external keyboard entry |
| Automatic | System-chosen from platform and mode |

| Mode | Values |
|---|---|
| Date | Months, days, years |
| Time | Hours, minutes, optional AM/PM |
| Date and time | Dates, hours, minutes, optional AM/PM |
| Countdown timer | Hours and minutes, max 23 h 59 min; not inline or compact |
</specs>

<anti_patterns>
- Avoid switching views to present a picker.
</anti_patterns>
</topic>

<topic name="Segmented controls" source="https://developer.apple.com/design/human-interface-guidelines/segmented-controls" updated="2023-06-21">
A linear set of two or more usually equal-width segments, each a button with text or an image (labels may sit beneath segments or the whole control). Single choice; on macOS also multiple choice (Keynote alignment vs font attributes); or momentary action buttons with no selection state (Mail's Reply, Reply all, Forward; `isMomentary`, `NSSegmentedControl.SwitchTracking.momentary`). Not in watchOS.

<when_to_use>
- Closely related choices affecting an object, state, or view (inspector attributes, toolbar actions, Health's time ranges), or when grouping and visible selection state matter; grouping survives any view size.
- iOS, iPadOS: switching closely related subviews (Calendar's New Event: event vs reminder); separate app sections use a tab bar.
- macOS: switching views in a toolbar or inspector pane; the main window area uses a tab view.
- tvOS: consider a split view for content filtering.
</when_to_use>

<best_practices>
- **Keep control types consistent within one control.** No action segments in a selection control and no selection state in an action control.
- **Limit the number of segments.** About five to seven in a wide interface, about five on iPhone.
- **Keep segment size consistent.** Equal widths, consistent icon and title widths.
- **Prefer either text or images, not a mix.**
- **Use content of similar size in each segment.**
- **Use nouns or noun phrases for segment labels.** Title-style capitalization; text-labeled controls need no introductory text.
- **Consider introductory text (macOS).** With symbols, add a label below each segment and a tooltip per segment.
- **Consider supporting spring loading (macOS).** Dragging items over a segment and force clicking on a Magic Trackpad activates it without dropping.
- **Avoid other focusable elements close to segmented controls (tvOS).** Segments select on focus, not click.
</best_practices>

<platform_considerations>
- **visionOS:** Looking at an icon segment shows a tooltip with your descriptive text.
</platform_considerations>

<anti_patterns>
- Don't mix action and selection segments, or text and images.
- Don't exceed about 5-7 segments (about 5 on iPhone).
- tvOS: don't place focusable elements next to a segmented control.
</anti_patterns>
</topic>

<topic name="Sliders" source="https://developer.apple.com/design/human-interface-guidelines/sliders" updated="2023-06-21">
A horizontal track with a thumb between a minimum and maximum; the track fills with color up to the thumb, with optional left and right icons (`Slider`, `UISlider`, `NSSlider`). Not in tvOS.

<when_to_use>
- Horizontal: a fixed start and end (opacity 0 to 100 percent).
- Circular (macOS): values that repeat or continue indefinitely (rotation 0 to 360 degrees; spins, four rotations = 1440 degrees).
- iOS, iPadOS: never for audio volume; use a volume view (volume-level slider plus output-device control).
</when_to_use>

<best_practices>
- **Customize appearance if it adds value.** Track color, thumb image and tint, end icons (small to large image icon for size).
- **Use familiar slider directions.** Minimum leading, maximum trailing; vertical: minimum bottom, maximum top.
- **Consider supplementing with a text field and stepper.** Wide ranges benefit from an exact value, direct entry, and whole-value steps.
- **Consider live feedback as the value changes (macOS).** Dock icons scale with the Size slider.
- **Consider a label to introduce a slider (macOS).** Sentence-style capitalization, ending with a colon.
- **Use tick marks for clarity and accuracy (macOS).**
- **Consider labeling tick marks (macOS).** Numbers or words; often only minimum and maximum; periodic labels for nonlinear scales (Energy Saver); add a tooltip showing the thumb value on hover.
- **Prefer horizontal sliders (visionOS).** Side-to-side gestures are easier than up and down.
- **Create custom glyphs if necessary (watchOS).** Defaults are plus and minus.
</best_practices>

<platform_considerations>
- **macOS:** Linear slider: narrow lozenge thumb, filled track, often end icons, optional tick marks. Circular slider: small circle thumb; tick marks are evenly spaced dots around the circumference.
- **watchOS:** A horizontal track over a finite range, discrete steps or continuous bar; side buttons change the value by a predefined amount.
</platform_considerations>

<anti_patterns>
- Don't use a slider for audio volume (iOS, iPadOS).
</anti_patterns>
</topic>

<topic name="Steppers" source="https://developer.apple.com/design/human-interface-guidelines/steppers" updated="n/a">
A two-segment control that increments or decrements a value; it shows no value, so it sits beside a field that does (`UIStepper`, `NSStepper`). iOS, iPadOS, macOS, visionOS only.

<best_practices>
- **Make the affected value obvious.**
- **Pair with a text field when large changes are likely.** Steppers suit a few taps; a field handles widely varying values (print copies).
- **Consider Shift-click for large ranges (macOS).** For example 10 times the default increment.
</best_practices>
</topic>

<topic name="Text fields" source="https://developer.apple.com/design/human-interface-guidelines/text-fields" updated="2023-06-05">
A rectangular area for entering or editing small, specific pieces of text (`TextField`, `SecureField`, `UITextField`, `NSTextField`).

<when_to_use>
- Text field: a small amount of information such as a name or email; text view: larger text.
- macOS: a combo box to pair text input with a list.
- watchOS: only when necessary; prefer a list of options.
</when_to_use>

<best_practices>
- **Show a hint to communicate purpose.** Placeholder text ("Email", "Password") disappears on typing, so also add a separate label.
- **Use secure text fields to hide private data.** Always for passwords (`SecureField`).
- **Match field size to the anticipated text.**
- **Evenly space multiple text fields.** Stack vertically with consistent widths per type (first and last name one width, address and city another).
- **Ensure tabbing flows as people expect.** Logical focus order; the system usually handles it.
- **Validate when it makes sense.** Digits-only fields flag other characters; validate an email when people switch fields, a user name or password before they switch.
- **Use a number formatter for numeric data.** Restricts input to numbers and formats decimals, percentages, or currency; presentation varies by locale.
- **Adjust line breaks to the field.** Default clips; alternatives wrap by character or word, or truncate with an ellipsis at beginning, middle, or end.
- **Consider an expansion tooltip for clipped or truncated text.** Shown when the pointer rests on the field.
- **Show the appropriate keyboard type (iOS, iPadOS, tvOS, visionOS).** Numbers, URLs, and so on.
- **Minimize text entry in tvOS and watchOS.** Prefer buttons.
- **Display a Clear button at the trailing end (iOS, iPadOS).** Avoids repeated Delete taps.
- **Use images and buttons in text fields (iOS, iPadOS).** Custom images at either end or a system button such as Bookmarks; leading end shows purpose, trailing end offers features.
</best_practices>

<anti_patterns>
- Don't assume the presentation of formatted numbers; locale changes it.
</anti_patterns>
</topic>

<topic name="Toggles" source="https://developer.apple.com/design/human-interface-guidelines/toggles" updated="2024-03-29">
A toggle switches between two opposing states such as on and off with a distinct appearance per state; styles include switch and checkbox, and all platforms support buttons that behave like toggles (`Toggle`, `ToggleStyle`, `UISwitch`, `NSSwitch`, `NSButton.ButtonType.toggle`).

<when_to_use>
- Toggle: two opposing values affecting the state of content or a view; choosing from a list uses a pop-up button.
- iOS, iPadOS: switch style only in a list row; a toggle-style button elsewhere.
- macOS: checkbox for a single on/off setting and hierarchies; switch for emphasized or grouped settings; radio buttons for more than two exclusive options; pop-up button beyond about five.
</when_to_use>

<best_practices>
- **Clearly identify what the toggle affects.** Context usually suffices; macOS often adds a label; toggle-style buttons use an icon and change background per state.
- **Make state differences obvious.** Add or remove a fill, background shape, or inner detail like a checkmark or dot; never color alone.
- **Use the switch style only in a list row (iOS, iPadOS).** Row content is the label.
- **Change the default switch color only if necessary (iOS, iPadOS).** Default green works; an accent color needs enough contrast with the uncolored appearance.
- **Outside a list, use a button that behaves like a toggle (iOS, iPadOS).** Phone's filter button adds a blue highlight when active (`changesSelectionAsPrimaryAction`).
- **Avoid a label explaining that button's purpose (iOS, iPadOS).** Icon plus background states suffice.
- **Use switches, checkboxes, and radio buttons in the window body, not the window frame (macOS).** Not in a toolbar or status bar.
- **Prefer a switch for settings you want to emphasize (macOS).** More visual weight, so it should control more, such as a group of settings.
- **Use a mini switch for a single row in a grouped form (macOS).** Matches other control heights; regular switch for the primary setting, mini for subordinates (`GroupedFormStyle`, `ControlSize`).
- **Don't replace an existing checkbox with a switch (macOS).**
- **Use a checkbox, not a switch, for a hierarchy of settings (macOS).** Leading-edge alignment and indentation show dependencies.
- **Consider radio buttons for more than two mutually exclusive options (macOS).** Each gets a unique label.
- **Consider a label introducing a checkbox group if the relationship isn't clear (macOS).** Align its baseline with the first checkbox.
- **Reflect checkbox state accurately (macOS).** On, off, or mixed; show mixed when subordinates differ (`allowsMixedState`).
- **Prefer radio buttons for mutually exclusive options; checkboxes for multiple selection (macOS).**
- **Avoid too many radio buttons (macOS).** More than about five: pop-up button.
- **Prefer a checkbox for a single on/off setting (macOS).** Rarely, a pair of labeled radio buttons when one checkbox can't express both states.
- **Space horizontal radio buttons consistently (macOS).** Measure the longest label and reuse that spacing.
</best_practices>

<platform_considerations>
- **macOS:** Checkbox: small square, empty off, checkmark on, dash mixed; titled on the trailing side except in an editable checklist. Radio button: small circle plus label, groups of two to five; filled selected, empty deselected; its mixed state is rarely useful, so use a checkbox for that.
</platform_considerations>

<anti_patterns>
- Avoid relying solely on color for state.
- Don't use a switch outside a list row or label a toggle-style button (iOS, iPadOS).
- Avoid switches, checkboxes, and radio buttons in a toolbar or status bar (macOS).
- Don't replace a checkbox with a switch; avoid more than about five radio buttons (macOS).
</anti_patterns>
</topic>

<topic name="Virtual keyboards" source="https://developer.apple.com/design/human-interface-guidelines/virtual-keyboards" updated="2025-06-09">
Keyboards optimized for the task on devices without physical keyboards (an email keyboard adds "@", a period, even ".com"); they don't support keyboard shortcuts. Apps can replace the keyboard with a custom input view, and in iOS, iPadOS, and tvOS ship a custom keyboard app extension. Not in macOS.

<when_to_use>
- System keyboard with matching keyboard and content type: nearly all entry.
- Custom input view: app-specific entry inside your app only (Numbers' numeric view).
- Custom keyboard extension: unique systemwide functionality, such as a novel input method or an unsupported language.
</when_to_use>

<best_practices>
- **Choose a keyboard that matches the content.** Numbers and punctuation for numeric data; a semantic content type lets the system pick the keyboard and refine corrections (`keyboardType(_:)`, `textContentType(_:)`, `UIKeyboardType`, `UITextContentType`).
- **Consider customizing the Return key type.** A search Return key for search fields (`submitLabel(_:)`, `UIReturnKeyType`).
- **Make a custom input view make sense in context.** Otherwise people wonder why the system keyboard is gone.
- **Play the standard keyboard sound while people type.** Custom input views too (`playInputClick()`); people can disable it in Settings > Sounds.
- **Provide an obvious way to switch keyboards.** Like the Globe key, which replaces the Emoji key when multiple keyboards are installed.
- **Avoid duplicating system keyboard features.** On some devices the Emoji/Globe and Dictation keys already appear beneath custom keyboards.
- **Consider a keyboard tutorial in your app.** How to choose, activate, use, and switch back; not inside the keyboard.
- **Use the keyboard layout guide (iOS, iPadOS).** Keeps important content and buttons visible (`UIKeyboardLayoutGuide`).
- **Place custom controls above the keyboard thoughtfully (iOS, iPadOS) (2025).** An input accessory view holds task-relevant controls (Numbers' calculations). If other views use Liquid Glass, or the view looks out of place, apply Liquid Glass to the container; a standard toolbar adopts it automatically. Use the keyboard layout guide and standard padding (`ToolbarItemPlacement`, `inputAccessoryView`).
</best_practices>

<platform_considerations>
- **iOS, iPadOS, tvOS:** A custom keyboard chosen in Settings works in any app except secure text fields and phone number fields; several can be installed and switched any time.
- **tvOS:** Linear keyboard with the Siri Remote; grid keyboard with other devices, layout adapts. Digit entry views get a digit-specific keyboard.
- **visionOS:** Supports direct and indirect gestures in a separate movable window; layouts need not account for it.
- **watchOS (2025):** Keyboard if the screen is large enough, else dictation or Scribble; keyboard type is fixed but content type can be set for suggestions (`textContentType(_:)`). A paired iPhone can also enter text.
</platform_considerations>

<specs>
Keyboard types: ASCII capable, ASCII capable number pad, Decimal pad, Default, Email address, Name phone pad, Number pad, Numbers and punctuation, Phone pad, Twitter, URL, Web search.
</specs>

<anti_patterns>
- Avoid duplicating the Emoji/Globe and Dictation keys.
- Avoid help content inside the keyboard.
</anti_patterns>
</topic>

<topic name="Activity rings" source="https://developer.apple.com/design/human-interface-guidelines/activity-rings" updated="2024-03-29">
One person's daily progress toward Move, Exercise, and Stand goals. watchOS always shows three rings matching the Activity app; iOS shows a single Move ring (an approximation) or three when an Apple Watch is paired (`HKActivityRingView`). iOS, iPadOS, watchOS only.

<when_to_use>
- Show them when relevant, especially in health and fitness apps contributing to HealthKit: a workout metrics screen or post-workout summary.
</when_to_use>

<best_practices>
- **Use Activity rings only for Move, Exercise, and Stand.** Never other data, and never that data in another ring-like element.
- **Show progress for a single person.** Identify them with a label, photo, or avatar.
- **Keep the appearance identical everywhere.** Never change ring colors (no filters or opacity); always a black background; prefer a circular enclosure via the enclosing view's corner radius, not a circular mask; keep black visible around the outermost ring, adding a thin black stroke if needed and no gradient, shadow, or effect; scale appropriately; make the interface blend with the rings, never the reverse.
- **Use matching colors for ring-specific labels and values.** Apple's specified RGB values for Move, Exercise, and Stand (shown as swatches on the HIG page); don't approximate.
- **Maintain margins.** Minimum outer margin no less than the distance between rings; nothing may crop, obstruct, or encroach.
- **Differentiate other ring-like elements.** Separate with padding, lines, labels, color, or scale.
- **Don't send notifications repeating the Activity app's.** Don't show the ring element in notifications; app-specific references to progress are fine.
- **Don't use rings for decoration.** Never in labels or background graphics.
- **Don't use rings for branding.** Never in the app icon or marketing.
</best_practices>

<platform_considerations>
- **iOS:** Three rings with an Apple Watch paired; Move only without, from steps and other apps' workouts. History can mix both (Fitness).
</platform_considerations>

<anti_patterns>
- Never alter colors, background, or scale, or add effects.
- Never show other data in the rings or Activity data in another ring; never more than one person.
- Never crop or crowd the margin.
- Never use in notifications, decoration, app icons, or marketing.
</anti_patterns>
</topic>

<topic name="Gauges" source="https://developer.apple.com/design/human-interface-guidelines/gauges" updated="n/a">
A numerical value within a range on a circular or linear path, optionally with endpoint text and a color spectrum (`Gauge`). Standard style shows an indicator at the value; capacity style fills up to it. Not in tvOS.

<best_practices>
- **Write succinct labels for the current value and both endpoints.** VoiceOver reads the visible ones.
- **Consider a gradient fill.** Red to blue for hot to cold.
- **Consider the continuous style for large ranges (macOS level indicator).** Discrete segments become too small.
- **Consider changing fill color at significant levels (macOS level indicator).** Default green; change at very low, very high, or past the middle, whole-indicator or via the tiered state with several colors.
</best_practices>

<platform_considerations>
- **macOS:** Also defines a level indicator (`NSLevelIndicator`) for capacity, rating, or rarely relevance. Capacity is continuous (translucent track filled by a solid bar) or discrete (equal segments, one per unit, filling completely, never partially). Relevance is a shaded horizontal bar, as in search results.
</platform_considerations>

<specs>
| Variant | Description |
|---|---|
| Standard, circular or linear | Indicator marks the value |
| Capacity, circular or linear | Fill stops at the value |
| Accessory | Resembles watchOS complications; for iOS Lock Screen widgets and similar |
</specs>
</topic>

<topic name="Progress indicators" source="https://developer.apple.com/design/human-interface-guidelines/progress-indicators" updated="2023-09-12">
Transient indicators that the app isn't stalled. Determinate (known duration, such as file conversion): progress bars fill leading to trailing, circular progress indicators fill clockwise. Indeterminate, also called activity indicators or spinners (loading or syncing complex data): an animated spinning image; macOS also has an indeterminate bar (`ProgressView`, `UIProgressView`, `UIActivityIndicatorView`, `NSProgressIndicator`).

<when_to_use>
- Determinate whenever duration is known; indeterminate only when it isn't.
- iOS, iPadOS: a refresh control (`UIRefreshControl`), a hidden activity indicator revealed by dragging down, for immediate reload of content such as a table view (Mail's Inbox).
- macOS: a spinner for background work (fetching from a server) or constrained space (inside a text field, beside a button).
</when_to_use>

<best_practices>
- **Use a determinate indicator when possible.** Lets people decide to wait, do something else, restart later, or abandon.
- **Report advancement accurately.** Even out the pace; 90 percent in five seconds then 10 percent in 5 minutes feels deceptive.
- **Keep indicators moving.** Stationary reads as frozen; if stalled, explain the problem and what to do.
- **Switch from indeterminate to determinate when possible.**
- **Don't switch from circular to bar style.** Different shapes and sizes disrupt the interface.
- **Display a description if helpful.** Accurate and succinct; avoid vague terms like "loading" or "authenticating".
- **Use a consistent location.**
- **Let people halt processing when feasible.** Cancel when interruption is harmless; add Pause when it isn't (losing a partial download).
- **Warn when halting has a negative consequence.** An alert to confirm cancellation or resume.
- **Perform automatic content updates (refresh control).** Don't make people initiate every update.
- **Supply a refresh-control title only if it adds value.** Never to explain how to refresh; give content information (Podcasts shows the last update time).
- **Prefer a spinner for background operations or constrained space (macOS).**
- **Avoid labeling a spinner (macOS).** People just initiated the process.
</best_practices>

<platform_considerations>
- **macOS:** Indeterminate indicators come in bar and circular forms.
- **watchOS:** White over the scene background by default; adjustable with tint color.
</platform_considerations>

<anti_patterns>
- Don't switch from circular to bar style.
- Avoid vague descriptions like "loading" or "authenticating".
- Don't make people responsible for every refresh; don't use a refresh title to explain how to refresh.
- Avoid labeling a spinner (macOS).
</anti_patterns>
</topic>

<topic name="Rating indicators" source="https://developer.apple.com/design/human-interface-guidelines/rating-indicators" updated="n/a">
Horizontally arranged symbols, stars by default, showing a ranking level (`NSLevelIndicator.Style.rating`). No partial symbols (values round to whole symbols); spacing is fixed rather than stretched to the component width. macOS only.

<best_practices>
- **Make it easy to change rankings.** Adjust rank inline, without a separate editing screen.
- **If you replace the star, make the custom symbol's purpose clear.** Other symbols may not read as a rating.
</best_practices>
</topic>

<decision_guide>
| Input to collect | Control | Notes |
|---|---|---|
| One of a few related options affecting an object, state, or view | Segmented control | About 5-7 max (about 5 on iPhone); text or images, not both; app sections: tab bar; macOS main window: tab view |
| One of a short list | Pull-down or pop-up button | A picker is too heavy |
| One of a medium-to-long list | Picker | Predictable order, shown in context |
| One of a very large set | List or table | Table index for speed |
| On/off state | Toggle | iOS/iPadOS: switch in a list row, toggle-style button elsewhere; macOS: checkbox, or switch for emphasized or grouped settings |
| 2-5 exclusive options (macOS) | Radio buttons | More than about five: pop-up button; multi-select: checkboxes |
| Number in a range, approximate | Slider | Add text field and stepper for wide ranges; circular (macOS) for repeating values; never volume on iOS/iPadOS |
| Number nudged in steps | Stepper beside a value field | Add a text field for large changes; macOS Shift-click 10x |
| Short free text | Text field | Placeholder plus label; secure field for passwords; Clear button (iOS/iPadOS); matching keyboard type |
| Long free text | Text view | |
| Text or a list value (macOS) | Combo box | Custom values aren't added to the list |
| Date, time, or both | Date picker | iOS/iPadOS: compact when tight, inline to browse, wheels for keyboard entry; macOS: textual for space, graphical to browse or pick ranges; watchOS: wheels |
| Countdown duration | Date picker, countdown timer mode | Max 23 h 59 min; not inline or compact |
| Color | Color well | Prefer the system color picker |
| Image (macOS) | Image well | Copy, paste, delete, drag in; default fallback |
| PIN or digit code (tvOS) | Digit entry view | Secure for sensitive data |
| Numeric text on touch | Text field with number pad, decimal pad, or numbers and punctuation keyboard | Plus a number formatter |
| App-only special input | Custom input view | Standard key click |
| Systemwide novel input or unsupported language | Custom keyboard extension | Unavailable in secure and phone number fields |

| Progress or status to show | Indicator |
|---|---|
| Known duration | Determinate progress bar (leading to trailing) or circular indicator (clockwise) |
| Unknown duration | Spinner; macOS may use an indeterminate bar; go determinate when known, never spinner to bar |
| Background or cramped work (macOS) | Unlabeled spinner |
| Manual list reload (iOS, iPadOS) | Refresh control plus automatic refreshes |
| Value within a fixed range | Gauge (standard or capacity; accessory for Lock Screen widgets); macOS level indicator (continuous for large ranges, discrete for small; relevance bar) |
| Ranking (macOS) | Rating indicator, whole symbols |
| Move, Exercise, Stand | Activity rings, unmodified, on black, one person |
| Any other ring metric | A custom ring kept visually separate from Activity rings |
</decision_guide>

<quick_checklist>
- [ ] Segmented controls: at most about 5-7 segments (about 5 on iPhone), text-only or image-only, selecting or acting but not both?
- [ ] Short lists use a pull-down/pop-up button, medium-to-long lists a picker in context, huge sets a list or table?
- [ ] Date pickers use a fitting style and a minute interval dividing evenly into 60?
- [ ] Sliders run minimum-leading to maximum-trailing, never control volume on iOS/iPadOS, and get a text field and stepper for wide ranges?
- [ ] Every stepper sits beside a visible value?
- [ ] Every text field has placeholder plus persistent label, matched size, the right keyboard type, a secure field for sensitive data, and timely validation?
- [ ] iOS/iPadOS switches appear only in list rows, with unlabeled toggle-style buttons elsewhere?
- [ ] macOS uses checkboxes for single settings and hierarchies, switches only for emphasized or grouped settings, 2-5 radio buttons for exclusive choices, none in the toolbar or status bar?
- [ ] Toggle state is shown by shape or fill, not color alone?
- [ ] Controls above the keyboard use the keyboard layout guide and adopt Liquid Glass when the app does (2025)?
- [ ] Progress indicators are determinate where possible, keep moving, sit in a consistent place, offer Cancel (plus Pause when interruption is costly), and never switch spinner to bar?
- [ ] Refresh controls coexist with automatic refreshes and carry a title only when it adds information?
- [ ] Gauges label the current value and both endpoints?
- [ ] Activity rings are unmodified, on black, single-person, margin at least the inter-ring distance, and absent from notifications, decoration, icons, and marketing?
</quick_checklist>
