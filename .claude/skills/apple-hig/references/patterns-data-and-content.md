<overview>
How people get data into an app and work with its content: entering data, searching (in-app and Spotlight), documents and files, undo and redo, drag and drop, charting data, and printing.
Distills HIG pages: entering-data, searching, file-management, undo-and-redo, drag-and-drop, charting-data, printing.
Load when designing or reviewing forms and text entry, a search experience, a document-based app (open, save, browse, Quick Look), reversible actions, any drag-and-drop interaction, a chart, or a print flow. Search fields, text fields, and chart components have their own component files.
</overview>

<topic name="Entering data" source="https://developer.apple.com/design/human-interface-guidelines/entering-data" updated="2023-06-21">
Entering information is tedious with any input method. Pre-gather as much as possible to minimize what people supply, and support every available input method.

<best_practices>
- **Get information from the system whenever possible.** Read settings, or request permission for data like location or calendar information.
- **Be clear about the data you need.** Show a field prompt ("username@company.com") or an introductory label ("Email"); prefill reasonable defaults to speed entry.
- **Use a secure text-entry field when appropriate.** Obscure sensitive input with a filled circle per character (`SecureField`); tvOS can obscure a digit entry view (`isSecureDigitEntry`); the visionOS system field shows entries only to the wearer and blurs a secure field during AirPlay.
- **When possible, offer choices instead of requiring text entry.** A picker, menu, or other selection component beats typing even with a keyboard available.
- **As much as possible, let people provide data by dragging and dropping it or by pasting it.**
- **Dynamically validate field values.** Verify each value as entered and report problems immediately. For numeric data use a number formatter, which restricts a field to numbers and can format decimals, percentages, or currency.
- **When data entry is necessary, make sure people understand that they must provide the required data before they can proceed.** Enable a Next or Continue button only after required fields are filled.
</best_practices>

<platform_considerations>
- **macOS:** Consider an expansion tooltip to show the full text of a clipped or truncated field when the pointer rests on it; works for iOS and iPadOS apps running on a Mac too.
</platform_considerations>

<anti_patterns>
- Don't ask people to enter information you can gather automatically or by permission.
- Never prepopulate a password field; ask for the password or use biometric or keychain authentication.
</anti_patterns>
</topic>

<topic name="Searching" source="https://developer.apple.com/design/human-interface-guidelines/searching" updated="2026-06-08">
People expect a search field for in-app search, personalized with recent searches, suggestions, completions, or corrections. Apps can also let people scope or filter results (creation date, file size, file type; see Scope bars and tokens), find content in an open document (iOS, iPadOS, macOS), and index content for Spotlight so it's found without opening the app. (2026: terminology and placement guidance refined.)

<when_to_use>
- One place to find anything in the app → a single search location.
- Clearly distinct sections → a local search may help; in the iOS Music app, search acts as a filter on the current view.
- Narrowing by attribute → scope bar or tokens, with the scope visible.
- Finding content from outside the app → Spotlight indexing.
</when_to_use>

<best_practices>
- **If search is important, give it a primary position in your app or view.** (2026) Notes puts the search field in the bottom toolbar with other key actions; tab-bar apps like Photos and Apple TV make search a dedicated tab.
- **Aim to make your app's content searchable through a single location.** One clearly identified place; local search only for clearly distinct sections.
- **Clearly display the current scope of a search.** Descriptive placeholder text, a scope bar, or a title; Mail always names the mailbox being searched.
- **Provide suggestions to make searching easier.** Recent searches before typing, predictive suggestions while typing (`searchSuggestions(_:)`).
- **Take privacy into consideration before displaying search history.** Others may see it; if shown, provide a way to clear it.
- **Make your app's content searchable in Spotlight.** Make it indexable with descriptive metadata so Spotlight can extract, store, and organize it.
- **Define metadata for custom file types you handle.** Supply a Spotlight File Importer plug-in (`CSImportExtension`).
- **Use Spotlight to offer advanced file-search capabilities within the context of your app.** For example, a button that starts a Spotlight search on the current selection and shows results in a custom view.
- **Prefer using the system-provided open and save views.** They include a search field that filters the whole system.
- **Implement a Quick Look generator if your app produces custom file types.** Spotlight and other apps can then preview your documents.
</best_practices>
</topic>

<topic name="File management" source="https://developer.apple.com/design/human-interface-guidelines/file-management" updated="2024-06-10">
Document-based apps (Pages, Keynote, Photos, Preview) create, edit, and save files, but people also expect to browse files without an app: the Finder on Mac, the Files app on iPhone, iPad, and Apple Vision Pro. watchOS and tvOS have no document-browsing interface.

<best_practices>
- **Use app menus and keyboard shortcuts to give people convenient ways to create and open documents.** iPadOS shows New and Open in the shortcuts interface when people hold Command on a hardware keyboard; macOS uses the File menu. Always include an Add (+) button; in macOS put the add action in the File menu.
- **If your app requires a custom file browser, support people's understanding of the platform's file system.** Open at the most relevant place (Documents, iCloud, or the last location) but let people reach the rest of the file system.
- **Help people be confident that their work is always preserved unless they cancel or delete it.** Save periodically while editing and when people close a file or switch apps, rather than requiring an explicit save.
- **Hide file extensions by default, but let people view them if they choose.** Reflect the choice in every save and open interface.
- **Use a Quick Look viewer to let people preview a file even when your app can't open it.** Previews can be interactive: listen to audio, mark up a photo, rotate and scale a 3D file.
- **Consider implementing a Quick Look generator if your app produces custom file types.** The Finder, Files, and Spotlight can then preview them.
</best_practices>

<platform_considerations>
- **iOS, iPadOS, document launcher (iOS 18 and iPadOS 18 or later):** `DocumentGroupLaunchScene` gives document-based apps a full-screen, graphical way to browse, open, and create files. Three customizable parts: a title card (app title plus two app-specific buttons), a background image with optional accessory images around the card, and a sheet with a file browser plus optional custom toolbar controls. Assign the buttons to the most important functions: primary creates a new document, secondary offers options (Numbers: Start Writing, Choose a Template). Give the background a solid color, gradient, or pattern clearly distinct from the card and accessories. Accessories may sit in front of and behind the card for depth, but the app name and both buttons must stay clearly visible; test across supported screen sizes and orientations. Use animation sparingly: gentle repeating motion that makes an accessory breathe or sway.
- **iOS, iPadOS, file provider extension:** Lets other apps import, export, open, and move your documents. Display only documents appropriate to the host context (a PDF editor sees only PDFs), optionally with modification dates, sizes, and local or remote status. Let people choose a destination when exporting or moving, navigating your hierarchy and adding subdirectories. Apps can also browse and open other apps' files through a document browser.
- **macOS:** Make a custom opening interface convenient: an "open recent" action, filter criteria, opening several documents at once, and an Open button title matching the task (Insert). Provide a save interface for name, format, and location: new documents are "Untitled" until named, the browser defaults to a logical location, and people can choose a format when several are supported. Consider a custom accessory view in the Save dialog (Mail: include attachments). A Finder Sync extension can badge items with sync status, add contextual menu items (favoriting, password protection), and add toolbar buttons (start a sync). If people turn off autosaving ("Ask to keep changes when closing documents" in Desktop & Dock settings), show a dot on the window's close button and beside the document name in the Window menu, and present a save dialog on close, quit, log out, or restart. Regardless of autosave, you may append "Edited" to the title, removing it as soon as autosave occurs or people save.
</platform_considerations>

<anti_patterns>
- Avoid making people take an explicit action to save their work.
- Avoid a custom top toolbar in a file provider extension; the hosting modal view already has one.
- Use the default macOS file browser unless you have an important reason for a custom one.
- Don't show the unsaved-changes dot when autosaving is on; it implies action is needed.
- Avoid complex background images, cluttered accessories, or heavy motion in the document launcher.
</anti_patterns>
</topic>

<topic name="Undo and redo" source="https://developer.apple.com/design/human-interface-guidelines/undo-and-redo" updated="undated">
Undo and redo let people reverse actions and experiment safely. People try undoing repeatedly until something changes, so help them predict the outcome and highlight the result. iOS, iPadOS, macOS, visionOS only.

<best_practices>
- **Help people predict the results of undo and redo as much as possible.** Describe the result in the iPhone shake alert (with undo or cancel), or in menu labels like Undo Typing and Redo Bold.
- **Show the results of an undo or redo.** If the affected content is offscreen, reveal it (scroll to a restored paragraph) so people don't repeat the action thinking it failed.
- **Let people undo multiple times.** People expect to undo everything since a logical step such as opening or saving a document.
- **Consider giving people the option to revert multiple changes at once.** Batch related actions (incremental adjustments to one property), or undo everything since opening or saving.
- **Provide undo and redo buttons only when necessary.** People expect the macOS Edit menu, keyboard shortcuts on Mac and iPad, or shaking iPhone. If buttons matter, use the standard system symbols in a toolbar.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** The undo and redo alert title automatically starts with "Undo " or "Redo " (trailing space included); add one or two words describing the operation: "Undo Name", "Redo Address Change".
- **macOS:** Put undo and redo at the top of the Edit menu and support Command-Z and Shift-Command-Z.
</platform_considerations>

<anti_patterns>
- Avoid unnecessary limits on how many times people can undo or redo.
- Avoid redefining the standard undo and redo gestures (three-finger swipe, shake) in iOS and iPadOS.
</anti_patterns>
</topic>

<topic name="Drag and drop" source="https://developer.apple.com/design/human-interface-guidelines/drag-and-drop" updated="2023-10-24">
People select content at a source and drop it at a destination: the same container, a different container, or another app. Within the same container the drop moves content; in a different container it copies; between apps it always copies. Interactions: visionOS pinch and hold, dragging in any direction including the z-axis; iOS and iPadOS touch, pointing device, or full keyboard access; Universal Control between Mac and iPad; macOS pointing device, full keyboard access, or VoiceOver. Not supported in tvOS or watchOS.

<best_practices>
- **As much as possible, support drag and drop throughout your app.** People try it everywhere; system text fields and text views support it automatically.
- **Offer alternative ways to accomplish drag-and-drop actions.** Menu commands for copy and move; in iOS and iPadOS, expose sources and destinations to assistive technologies (`accessibilityDragSourceDescriptors`, `accessibilityDropPointDescriptors`).
- **Determine when dragging and dropping content within your app results in a move or a copy.** Same container (text within a document) moves; different containers (an image between documents) copy. Before changing defaults, choose what most people expect and what least risks data loss.
- **Support multi-item drag and drop when it makes sense.** iOS, iPadOS, macOS, and visionOS drag a selected group; macOS also groups items from several apps; iPadOS lets people add items during an in-progress drag.
- **Prefer letting people undo a drag-and-drop operation.** Where undo is impossible, ask for confirmation first (the Finder confirms drops into a write-only folder) or provide a way to reverse the result (Photos lets people cancel sharing after dropping into a shared stream).
- **Consider offering multiple versions of dragged content, ordered from highest to lowest fidelity.** A line drawing: PDF vector, lossless PNG with transparency, lossy JPEG. A chart: native object, then an image.
- **Consider supporting spring loading.** Dragging content over buttons or segmented controls activates them (Calendar's day, week, month, year segments). On a Mac with a Magic Trackpad the control activates on force-click while holding content; on iPad on hover while holding.
- **Display a drag image as soon as people drag a selection about three points.** Make it translucent so it's distinct from the original and destinations show through; keep it until the drop.
- **If it adds clarity, modify the drag image to help people predict the result.** A dragged photo can expand to its default size in the document. Use drag flocking to group multiple items, then ungroup on drop.
- **Show people whether a destination can accept dragged content.** Insertion point or highlight only when it can; no feedback or an explicit "not allowed" image (SF Symbols `circle.slash`) when it can't. Show cues only while content is over the destination, and cue one destination at a time.
- **When people drop an item on an invalid destination, or when dropping fails, provide visual feedback.** Return it to the source if visible, or scale it up and fade it out so it evaporates.
- **Scroll the contents of a destination when necessary.** Auto-scroll a large container as the item moves over it and stop when the drag leaves it; system text views and fields do this by default.
- **When there's a choice, pick the richest version of dropped content your app can accept.** The native chart object if supported, otherwise the image.
- **Extract only the relevant portion of dropped content if necessary.** A contact dropped on a Mail recipient field yields only name and email address.
- **When a physical keyboard is attached, check for the Option key at drop time.** Option held at drop forces a same-container copy; released before the drop, the operation is a move.
- **Provide feedback when dropped content needs time to transfer.** A progress indicator, and in collections, lists, and tables a placeholder at the drop location; the system can alert on long transfers between apps.
- **Provide feedback when dropped content initiates a task or action.** Show that printing or another task began and report progress.
- **Apply appropriate styling to dropped text.** Keep font, typeface, size, and attributes when both sides support the styles; otherwise apply the destination's style.
- **After a drop, maintain the content's selection state in the destination, updating it in the source as needed.** Dropped content stays selected. A same-container move removes the original; a same-container copy deselects the original; a drop in a different container deselects the source.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** Let people perform multiple simultaneous drag activities; on iPad they add items to an in-progress session (several Home Screen icons into a folder). Support adding items mid-drag with flocking feedback and accept multiple simultaneous drops.
- **macOS:** Consider letting people drag content to the Finder in a format your app reopens (Calendar events as `.ics`), or as a clipping, a temporary container unrelated to the Clipboard that can later be dragged into a text field. Let people drag a background selection from an inactive window without activating it, and drag an unselected item from an inactive window without disturbing its selection. Consider a badge (small filled oval with a count) for multi-item drags, updated when a destination accepts only a subset. Consider the copy, drag link, disappearing item, and operation not allowed pointers. Let people select and drag in a single motion unless selecting multiple items.
- **visionOS:** When possible, launch your app to handle content dropped into empty space by associating a user activity with draggable content (`NSUserActivity`); a dropped URL launches Safari, dropped Quick Look content launches Quick Look.
</platform_considerations>

<anti_patterns>
- Avoid a drag image that changes constantly and radically.
- Don't show destination highlighting while content is not over the destination, or for more than one destination at once.
- Don't keep auto-scrolling after the drag leaves the container.
</anti_patterns>
</topic>

<topic name="Charting data" source="https://developer.apple.com/design/human-interface-guidelines/charting-data" updated="2022-09-23">
Charts communicate complex information without much text, from a glanceable graphic to an interactive centerpiece. They support analyzing trends from historical or predicted values, visualizing the current state of a process, system, or quantity that changes over time, and comparing items across categories. Chart components are on the Charts page.

<when_to_use>
- Use a chart when you need to convey information about data or help people analyze it.
- Use a list or table that scrolls, searches, and sorts when you only need to provide data.
- Prefer a common chart type (bar chart, line chart) people already know how to read; use a novel form only when needed, and teach it.
- Use a small chart for glanceable information about one item or as a preview of a larger chart.
</when_to_use>

<best_practices>
- **Use a chart when you want to highlight important information about a dataset.** Charts draw attention; make clear what people can learn.
- **Keep a chart simple, letting people choose when they want additional details.** Reveal data gradually through levels of detail, subsets, or several versions each adding functionality.
- **Make every chart in your app accessible.** Provide accessibility labels for chart values and components and accessibility elements for interacting with the chart (see Enhancing the accessibility of a chart on the Charts page).
- **In general, prefer using common chart types.** Bar charts and line charts are familiar.
- **If you need to create a chart that presents data in a novel way, help people learn how to interpret it.** Activity animates each ring individually to show the move, exercise, and stand mapping.
- **Examine the data from multiple levels or perspectives to find details you can display.** Macro: totals, averages. Mid: useful subsets. Individual points: specific values worth attention.
- **Aid comprehension by adding descriptive text to the chart.** Titles, subtitles, and annotations highlight takeaways; a headline or summary ("Chance of light rain in the next hour" above Weather's hourly forecast) gives the essentials at a glance. Descriptive text doesn't replace accessibility labels.
- **Match the size of a chart to its functionality, topic, and level of detail.** Large enough to read labels and annotations and support interactions like changing scope; small for glanceable data or a preview.
- **Prefer consistency across multiple charts, deviating only when you need to highlight differences.** Similar-purpose charts share type and style so learning transfers.
- **Maintain continuity among multiple charts that use the same data.** One chart type with consistent colors, annotations, layouts, and text (Health Trends small charts expand with identical style, colors, marks, and annotations).
</best_practices>

<anti_patterns>
- Don't chart data that only needs to be listed.
- Resist packing as much data as possible into a chart; it obscures the relationships you want to convey.
- Don't imply related charts are unrelated by giving each a different type or style.
</anti_patterns>
</topic>

<topic name="Printing" source="https://developer.apple.com/design/human-interface-guidelines/printing" updated="undated">
iOS, iPadOS, macOS, and visionOS apps can integrate system print functionality and add printer- or document-specific options when necessary. Not supported in tvOS or watchOS.

<best_practices>
- **Make printing discoverable.** macOS: a Print item in the File menu, optionally a toolbar Print button people can add when customizing the toolbar. iOS and iPadOS: a toolbar button that opens an action sheet.
- **Present a printing option only when it's possible.** With nothing to print or no printer available, dim the macOS File menu item, remove the action from the iOS or iPadOS action sheet, and dim or hide a custom button.
- **Present relevant printing options.** Page range, multiple copies, or double-sided printing through the system-provided view when the printer supports them.
</best_practices>

<platform_considerations>
- **macOS:** If you offer options the system doesn't, add a custom print panel category with a unique name such as your app name, beside the default Layout, Paper Handling, and Media & Quality categories (Keynote: presenter notes, slide backgrounds, skipped slides). For document-specific page settings, consider a page setup dialog holding rarely changed page size, orientation, and scaling. Make interdependencies clear (double-sided printing disables transparencies). Separate advanced features behind a disclosure control labeled "Advanced Options". Consider previewing a setting's effect with a thumbnail. Consider storing modified settings with the document, at minimum until it closes.
</platform_considerations>

<anti_patterns>
- Avoid reimplementing features the system already provides, such as page orientation or reverse order.
</anti_patterns>
</topic>

<decision_guide>
**Minimize typing**
| Situation | Do this |
|---|---|
| The system has the value (settings, location, calendar) | Read it or request permission |
| A known set of valid values | Picker, menu, or selection component |
| Content exists elsewhere | Accept paste and drag and drop |
| A default fits most people | Prefill it |
| Numeric input | Number formatter (numbers only; decimals, percentage, currency) |
| Sensitive input | Secure field; passwords never prefilled |
| Long form | Validate each field on entry; enable Next or Continue only when required data is present |
| tvOS | Ask for the minimum; send people to another device for more |

**Search vs filter vs scope**
- People can describe what they want but not where it is → a search field in a primary position (bottom toolbar, or a dedicated tab in tab-bar apps), one for the whole app.
- People are in a list or section and want to narrow it → local search acting as a filter on the current view (Music), or in-context options on that screen.
- People want to constrain results by attribute → scope bar or tokens, scope always visible.
- Content should be found outside the app → Spotlight indexing, metadata for custom types, a Quick Look generator.
- Text inside an open document → find-in-document (iOS, iPadOS, macOS).

**Undo vs confirmation**
- Reversible action → make it undoable (multiple levels, result named in the menu item or alert, result shown); don't ask first.
- Irreversible action (drop into a write-only folder, sharing) → confirm before completing, or offer a way to reverse the outcome afterward.
- Closing a modal view or document would lose user content → confirm with a save option.
- Routine edits → autosave; no confirmation, no explicit save.

**Which chart for which question**
| Question | Presentation |
|---|---|
| Trend over time, historical or predicted | Chart, common type such as a line chart, with headline summary and annotations |
| Comparison across items or categories | Chart, common type such as a bar chart |
| Current state of a changing quantity | Small glanceable chart (Activity rings), taught if the form is novel |
| Just the values, no analysis | List or table that scrolls, searches, and sorts |
| Several views of one dataset | Same type, colors, marks, annotations, and text throughout |
| Lots of data or functionality | Simple default with progressive detail or subsets |
</decision_guide>

<quick_checklist>
- [ ] Does every input avoid data the system can supply, prefer selection over typing, accept paste and drag and drop, and validate as people enter it?
- [ ] Are password fields never prefilled, sensitive fields secure, and Next/Continue disabled until required fields are complete?
- [ ] Is search in a primary position (toolbar or dedicated tab), in one place, with the current scope shown, suggestions offered, and history clearable?
- [ ] Is content indexed for Spotlight, with metadata for custom file types and a Quick Look generator?
- [ ] Are documents created via menus, shortcuts, and an Add (+) button; work autosaved; extensions hidden by default but viewable?
- [ ] On macOS, are the default file browser and save dialog used, the unsaved dot shown only when autosaving is off, and "Edited" cleared after saving?
- [ ] Does the document launcher (iOS 18+) keep the title card and both buttons legible on a simple background with restrained motion?
- [ ] Can people undo many levels through system routes, with the result described (Undo Typing) and shown, and no redefined gestures?
- [ ] Do drags show a translucent drag image after about 3 pt, highlight only valid destinations one at a time, and animate failed drops back or away?
- [ ] Are move/copy semantics right (same container moves, different copies, Option forces copy), with undo or confirmation for irreversible drops and menu alternatives?
- [ ] Are multi-item drags, spring loading, multiple fidelities, and progress feedback for slow transfers supported where relevant?
- [ ] Is each chart justified over a table, simple, of a common or taught type, sized to its detail, described with text, consistent with related charts, and fully labeled for accessibility?
- [ ] Is Print in the File menu (macOS) or a toolbar action sheet (iOS, iPadOS), disabled when nothing can print, and using system option views?
</quick_checklist>
