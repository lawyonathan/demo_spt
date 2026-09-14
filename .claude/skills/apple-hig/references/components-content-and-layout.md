<overview>
Distills the HIG "Content" pages (charts, image-views, text-views, web-views) and "Layout and organization" pages (boxes, collections, column-views, disclosure-controls, labels, lists-and-tables, lockups, outline-views, split-views, tab-views).
Covers which container fits which content (hierarchical, homogeneous, tabular, long text, remote HTML), the row, column, divider, and pane rules for each, and the platform-only views (column, outline, and tab views on macOS; lockups on tvOS).
Load when designing or reviewing any screen that shows data, text, images, or grouped content, or when choosing between list, table, collection, outline, column, split, or tab presentations.
</overview>

<topic name="Charts" source="https://developer.apple.com/design/human-interface-guidelines/charts" updated="2022-09-23">
A chart highlights a few key pieces of information in a dataset so people can gain insight and make decisions (see charting-data for app-wide strategy; Swift Charts implements).
Anatomy: a *mark* depicts one value and its type (bar, line, point) sets the chart style; marks sit in the *plot area*; a *scale* maps values (numbers, dates, categories) to position, color, or height; *axes* (usually one horizontal, one vertical) carry *ticks* (0, 50%, 100%) and *grid lines*; labels, accessibility labels, titles, subtitles, annotations, and a legend (for color or shape encodings) describe it.

<when_to_use>
- **Bar marks:** compare categories or parts of a whole; best over time when each value is a sum (steps per day).
- **Line marks:** change over time; slope shows magnitude of change and trend.
- **Point marks:** individual values; how two properties relate, outliers, clusters.
- **Combine marks when it adds clarity**, such as points on a line to highlight individual values.
</when_to_use>

<best_practices>
- **Choose a mark type based on the information you want to communicate.**
- **Use a fixed or dynamic axis range depending on the chart's meaning.** Fixed when min and max are meaningful for all data (battery 0% to 100%); dynamic so marks fill the plot area when values vary widely.
- **Define the lower bound based on mark type and usage.** Zero suits bar charts; zero can hide meaningful differences far from zero (resting versus active heart rate).
- **Prefer familiar sequences in tick and grid-line labels.** 0, 5, 10 reads at a glance; 1, 6, 11 does not.
- **Tailor grid lines and labels to the use case.** Too many distract, too few hinder estimation; interactive charts can use fewer grid lines and lighter label colors.
- **Write descriptions that explain a chart before people view it, and summarize its main message in a title and subtitle.** VoiceOver users and people with cognitive disabilities rely on them.
- **Keep the data most prominent in the visual hierarchy.** Descriptions and axes support without competing.
- **In a compact environment, maximize the width of the plot area.** Shorten vertical-axis labels, move units to the title, put a long category label inside the plot area when it doesn't obscure data.
- **Make every chart accessible.** Swift Charts gives a default Audio Graph (VoiceOver tones for values and trend, plus text summaries) and an accessibility element per mark or group; add a title and summary. Without Audio Graphs, state the chart type, each axis's meaning, and the axis bounds.
- **Let people interact when it makes sense, but don't require interaction to reveal critical information.** Interaction such as dragging an indicator may reveal individual values.
- **Expand the hit target to the entire plot area** when marks are too small for a finger or pointer, so people can scrub.
- **Make interactive charts navigable by keyboard (including Full Keyboard Access) and Switch Control.** Use `accessibilityRespondsToUserInteraction(_:)` for a logical path (along the X axis), or let people move focus among subsets of a very large dataset; both also help VoiceOver.
- **Help people notice changes to marks or axes.** Animate them and also post `UIAccessibility.Notification` or `NSAccessibility.Notification` for VoiceOver users and people who turn off animations.
- **Align a chart with surrounding elements.** Match leading edges; label vertical grid lines on their trailing side or move the Y axis to the trailing side; anchor a stray label to a grid line with a tick.
- **Avoid relying solely on color.** Add shapes or patterns (two point shapes for blood pressure components) and separators between contiguous colored areas such as stacked bars.
- **Label each important or interactive element**, unlike an image's single label; describe marks or groups by purpose (per-segment elevation summary versus a label on every Steps bar); one high-level label suits a small chart inside a button.
- **Write labels with context (date, location) and actual values.** No subjective terms (rapidly, gradually, almost); "June 6" not "6/6", "60 minutes" not "60m"; say what a series represents, not its color; name axes in a consistent order.
- **Hide visible axis and tick labels from assistive technologies.** VoiceOver users get values through accessibility labels and Audio Graphs.
</best_practices>

<platform_considerations>
- **watchOS:** avoid complex chart interactions; show glanceable data with simple interactions and put detail and interaction in a companion app on another platform.
</platform_considerations>

<anti_patterns>
- Don't rely solely on color to differentiate data.
- Don't require interaction to reveal critical information.
- Avoid subjective terms in accessibility labels.
- Avoid ambiguous formats and abbreviations ("6/6", "60m").
- Avoid requiring complex chart interactions on watchOS.
</anti_patterns>
</topic>

<topic name="Image views" source="https://developer.apple.com/design/human-interface-guidelines/image-views" updated="2023-06-21">
An image view displays a single image or an animated sequence (PNG, JPEG, PDF) on a transparent or opaque background, can stretch, scale, size to fit, or pin the image, and is typically not interactive (`Image`, `UIImageView`, `NSImageView`).

<when_to_use>
- Use an image view when the view's primary purpose is simply to display an image.
- Prefer a system button configured with the image when the image must be interactive.
- Prefer an SF Symbol or interface icon (glyph or template image that takes color, including accent colors) for icons.
</when_to_use>

<best_practices>
- **Take care when overlaying text on images.** Ensure contrast; add a text shadow or background layer.
- **Use a consistent size for all images in an animated sequence.** Prescale to the view so the system does no scaling; same size and shape performs best.
</best_practices>

<platform_considerations>
- **macOS:** use an image well for an editable image view (copy, paste, drag, Delete key); use an image button for a clickable image.
- **tvOS:** images often combine transparent layers for depth (layered images).
- **visionOS:** image views show 2D, stereoscopic, and spatial photos; RealityKit can place images beside 3D content or generate a spatial scene from a 2D image (`ImagePresentationComponent`).
- **watchOS:** use SwiftUI for animations; WatchKit `WKImageAnimatable` as a fallback.
</platform_considerations>
</topic>

<topic name="Text views" source="https://developer.apple.com/design/human-interface-guidelines/text-views" updated="2023-06-05">
A text view shows multiline, styled, optionally editable text of any height, scrolls on overflow, aligns to the leading edge in the system label color by default, and in iOS, iPadOS, and visionOS raises a keyboard when an editable view is selected (`Text`, `UITextView`, `NSTextView`).

<when_to_use>
- Use a text view for text that is long, editable, or in a special format.
- Prefer a label for a small amount of static text and a text field for a small amount of editable text.
</when_to_use>

<best_practices>
- **Keep text legible.** Adopt Dynamic Type and test with accessibility options such as Bold Text.
- **Make useful text selectable.** Error messages, serial numbers, IP addresses.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** show the keyboard type appropriate to the content (virtual keyboards).
- **tvOS:** display only; tvOS uses text fields for editable text because input is minimal by design.
</platform_considerations>
</topic>

<topic name="Web views" source="https://developer.apple.com/design/human-interface-guidelines/web-views" updated="undated">
A web view loads rich web content such as embedded HTML and websites inside the app, as Mail does for HTML messages (`WKWebView`).

<best_practices>
- **Support forward and back navigation when appropriate.** Off by default; enable it with controls when people are likely to visit multiple pages.
- **Avoid using a web view to build a web browser.** Brief access to a site in context is fine; Safari is the primary browser.
</best_practices>

<platform_considerations>
- **tvOS, watchOS:** not supported.
</platform_considerations>

<anti_patterns>
- Don't replicate Safari's functionality in a web view.
</anti_patterns>
</topic>

<topic name="Boxes" source="https://developer.apple.com/design/human-interface-guidelines/boxes" updated="undated">
A box visually groups logically related information and components with a border or background color and an optional title (`GroupBox`, `NSBox`).

<best_practices>
- **Keep a box relatively small compared with its containing view.** Near window size it stops communicating separation and crowds content.
- **Use padding and alignment for subgroups within a box.** Nested boxes feel busy and constrained.
- **Provide a succinct introductory title if it clarifies the contents.** It also helps VoiceOver users predict content.
- **Write a title as a brief descriptive phrase.** Sentence-style capitalization, no ending punctuation, except a colon in a settings pane.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** boxes use the secondary and tertiary background colors by default.
- **macOS:** the title appears above the box by default.
- **tvOS, watchOS:** not supported.
</platform_considerations>

<anti_patterns>
- Avoid nested boxes.
- Avoid ending punctuation in titles outside a settings pane.
</anti_patterns>
</topic>

<topic name="Collections" source="https://developer.apple.com/design/human-interface-guidelines/collections" updated="undated">
A collection manages an ordered set of content in a customizable, highly visual layout and is ideal for image-based content (`UICollectionView`, `NSCollectionView`).

<when_to_use>
- Use a collection for image-based content or items that vary widely in size.
- Prefer a table or list for text.
</when_to_use>

<best_practices>
- **Use the standard row or grid layout whenever possible.** People expect a horizontal row or a grid.
- **Make it easy to choose an item.** Pad images so focus or hover effects stay visible and content doesn't overlap.
- **Add custom interactions only when necessary.** Defaults: tap to select, touch and hold to edit, swipe to scroll.
- **Consider animations as feedback for insert, delete, and reorder.** Standard animations are built in; custom ones are allowed.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** use caution with dynamic layout changes; avoid changing layout while people view or interact unless it answers an explicit action.
- **watchOS:** not supported.
</platform_considerations>

<anti_patterns>
- Avoid custom layouts that confuse people or draw undue attention.
- Avoid changing the layout while people are using it.
</anti_patterns>
</topic>

<topic name="Column views (macOS only)" source="https://developer.apple.com/design/human-interface-guidelines/column-views" updated="undated">
A column view (browser) shows a hierarchy as a series of vertical columns, one level per column, with parents marked by a triangle icon; selecting a parent fills the next column with its children and people can navigate back up (`NSBrowser`).

<when_to_use>
- Use a column view for a deep hierarchy where people move back and forth between levels often and don't need sorting (Finder offers it beside icon, list, and gallery views).
- Prefer a list or table when sorting matters; prefer a split view for hierarchical content on iPadOS or visionOS.
</when_to_use>

<best_practices>
- **Show the root level in the first column.** People scroll back to it to restart from the top.
- **Show information about a selected item with no children.** Finder shows a preview plus creation date, modification date, file type, size.
- **Let people resize columns.** Long item names overflow the default width.
</best_practices>
</topic>

<topic name="Disclosure controls" source="https://developer.apple.com/design/human-interface-guidelines/disclosure-controls" updated="undated">
Disclosure controls reveal and hide information or functionality tied to a control or view: the disclosure triangle (`NSButton.BezelStyle.disclosure`) and the disclosure button (`NSButton.BezelStyle.pushDisclosure`); SwiftUI offers `DisclosureGroup`.

<when_to_use>
- **Disclosure triangle:** for a view or list of items (export options, Finder list view hierarchy); points inward from the leading edge when collapsed, down when expanded.
- **Disclosure button:** for one specific control (the macOS Save sheet button beside Save As that expands location options); points down when collapsed, up when expanded.
</when_to_use>

<best_practices>
- **Use a disclosure control to hide details until they're relevant.** Most-used controls stay visible at the top; advanced options hidden by default.
- **Provide a descriptive label for a disclosure triangle.** Name what it reveals, such as "Advanced Options".
- **Place a disclosure button near the content it shows and hides.**
- **Use no more than one disclosure button in a single view.**
</best_practices>

<platform_considerations>
- **iOS, iPadOS, visionOS:** available via SwiftUI `DisclosureGroup`.
- **tvOS, watchOS:** not supported.
</platform_considerations>
</topic>

<topic name="Labels" source="https://developer.apple.com/design/human-interface-guidelines/labels" updated="2023-06-05">
A label is static text people can read and often copy but not edit: button text (Edit, Cancel, Send), list item text with a symbol or image, or text introducing a control or action (`Label`, `Text`, `UILabel`, `NSTextField` with `isEditable` off).

<when_to_use>
- Use a label for a small amount of uneditable text; a text field for small editable text; a text view for large text.
</when_to_use>

<best_practices>
- **Prefer system fonts.** Labels support Dynamic Type by default; keep custom fonts legible.
- **Use system label colors to communicate relative importance.** Four levels, see specs.
- **Make useful label text selectable.** Error messages, locations, IP addresses.
</best_practices>

<platform_considerations>
- **watchOS:** date and time text components (configurable formats, calendars, time zones) and countdown or count-up timer components auto-fit the available space and update without app input; consider them in complications.
</platform_considerations>

<specs>
| System color | Usage | iOS, iPadOS, tvOS, visionOS | macOS |
|---|---|---|---|
| Label | Primary information | `label` | `labelColor` |
| Secondary label | Subheading or supplemental text | `secondaryLabel` | `secondaryLabelColor` |
| Tertiary label | Unavailable item or behavior | `tertiaryLabel` | `tertiaryLabelColor` |
| Quaternary label | Watermark text | `quaternaryLabel` | `quaternaryLabelColor` |
</specs>
</topic>

<topic name="Lists and tables" source="https://developer.apple.com/design/human-interface-guidelines/lists-and-tables" updated="2023-06-21">
Lists and tables present data in one or more columns of rows, can express groups or hierarchies, and support selecting, adding, deleting, and reordering; lists often express an app's information hierarchy, tables often sit inside a split view or hold multicolumn sortable data (`List`, `Table`, `UITableView`, `NSTableView`).

<when_to_use>
- Prefer a list or table for text; rows make text easy to scan.
- Prefer a collection for items that vary widely in size or for many images.
- On macOS, use an outline view for hierarchical data.
</when_to_use>

<best_practices>
- **Let people edit a table when it makes sense.** Reordering is appreciated even without add or remove; in iOS and iPadOS people enter an edit mode before selecting items.
- **Provide appropriate selection feedback.** Navigation tables persistently highlight the selected row; option lists highlight briefly then add a checkmark.
- **Keep item text succinct.** Minimizes truncation and wrapping; for long content, list titles and open a detail view instead of over-large rows.
- **Preserve readability of clipped text.** In narrow or resizable tables a middle ellipsis keeps the beginning and end recognizable.
- **Use descriptive column headings in a multicolumn table.** Nouns or short noun phrases, title-style capitalization, no ending punctuation; a single-column table without a heading needs a label or header.
- **Choose a table or list style that fits the data and platform.** iOS and iPadOS grouped style separates groups with headers, footers, and space; watchOS elliptical style rolls items off a rounded surface; macOS bordered style alternates row backgrounds for large tables (`ListStyle`).
- **Choose a row style that fits the information.** For example a small leading image and brief label; `UIListContentConfiguration` lays out rows, headers, and footers in iOS, iPadOS, tvOS.
</best_practices>

<platform_considerations>
- **iOS, iPadOS, visionOS:** an info button (detail disclosure button in a row) only reveals details and never navigates; use a disclosure indicator accessory to drill in (`UITableViewCell.AccessoryType.disclosureIndicator`). Avoid an index (trailing vertical alphabet) in a table whose rows have trailing controls; people trigger one reaching for the other.
- **macOS:** let people click a column heading to sort, and re-sort in the opposite direction on a second click. Let people resize columns. Consider alternating row colors in a multicolumn table. Use an outline view (a table with disclosure triangles) for hierarchical data.
- **tvOS:** a focused row highlights, grows slightly, and may round its corners; prepare nearby images for this and don't add your own corner masks.
- **watchOS:** limit rows when possible; for an expected long list show the most relevant items and a way to view more. Keep detail views short to support vertical page-based navigation (swiping vertically between rows' details); scrolling detail views break it.
</platform_considerations>

<anti_patterns>
- Don't add ending punctuation to column headings.
- Avoid an index in a table with trailing-side row controls.
- Don't add your own rounded-corner masks to tvOS row images.
</anti_patterns>
</topic>

<topic name="Lockups (tvOS only)" source="https://developer.apple.com/design/human-interface-guidelines/lockups" updated="undated">
A lockup joins a content view, a header above, and a footer below into one interactive unit whose views expand and contract together on focus; the four types are cards, caption buttons, monograms, and posters (`TVLockupView`, `TVLockupHeaderFooterView`).

<best_practices>
- **Allow adequate space between lockups.** A focused lockup expands and must not overlap or displace neighbors.
- **Use consistent lockup sizes within a row or group.**
- **Cards** (`TVCardView`): header, footer, and content for ratings and reviews of media items.
- **Caption buttons** (`TVCaptionButtonView`): image or text with title and subtitle beneath; on focus they tilt with the swipe: up and down when aligned vertically, left and right horizontally, both in a grid.
- **Monograms** (`TVMonogramContentView`): circular picture and name for people such as cast and crew, initials as fallback. **Prefer images over initials.**
- **Posters** (`TVPosterView`): image with optional title and subtitle hidden until focus; any size appropriate to the content.
</best_practices>
</topic>

<topic name="Outline views (macOS only)" source="https://developer.apple.com/design/human-interface-guidelines/outline-views" updated="undated">
An outline view lists hierarchical data in cells organized into columns and rows: the first column holds parents with disclosure triangles and their children, extra columns hold attributes such as size and modification date; outline views often sit on the leading side of a split view (`OutlineGroup`, `NSOutlineView`).

<when_to_use>
- Use an outline view for text-based hierarchical content; use a table for non-hierarchical data.
</when_to_use>

<best_practices>
- **Expose data hierarchy in the first column only.**
- **Use descriptive column headings.** Nouns or short noun phrases, title-style capitalization, no punctuation or trailing colon; always in multi-column views; a heading-less single column needs a label for context.
- **Consider click-to-sort column headings.** Sorting the primary column sorts each hierarchy level (top-level folders, then items within each); a second click reverses; secondary sorts can run behind the scenes.
- **Let people resize columns.**
- **Make expanding and collapsing easy.** Click expands one folder; Option-click expands all subfolders.
- **Retain people's expansion choices** between sessions.
- **Consider alternating row colors in multi-column outline views.**
- **Let people edit data if it makes sense.** Single-click edits a cell; double-click may differ (rename versus open a file); allow reorder, add, remove when useful.
- **Consider a centered ellipsis instead of clipping cell text.**
- **Consider a search field in the toolbar for lengthy outline views.**
</best_practices>

<anti_patterns>
- Avoid a trailing colon on column headings.
</anti_patterns>
</topic>

<topic name="Split views" source="https://developer.apple.com/design/human-interface-guidelines/split-views" updated="2025-06-09">
A split view manages adjacent panes (tables, collections, images, custom views), usually showing several hierarchy levels at once: primary selection fills the secondary pane, and a tertiary pane can show further detail; it commonly hosts a sidebar in the leading pane and, rarely, supplementary areas such as a navigator, notes, and inspector pane around a main canvas (`NavigationSplitView`, `UISplitViewController`, `NSSplitViewController`).

<best_practices>
- **Persistently highlight the current selection in each pane that leads to the detail view.** Keeps people oriented across panes.
- **Consider drag and drop between panes.** Visible hierarchy makes moving items convenient.
</best_practices>

<platform_considerations>
- **iOS (2025):** prefer a split view in a regular, not compact, environment; in iPhone portrait, panes wrap or truncate and get hard to use.
- **iPadOS (2025):** two vertical panes (Mail) or three (Keynote). Account for narrow, compact, and intermediate window widths because iPad windows resize fluidly; keep navigation between panes logical at every width.
- **macOS:** arrange panes vertically, horizontally, or both, with draggable dividers (`VSplitView`, `HSplitView`). Set default minimum and maximum pane sizes that keep the divider visible. Consider letting people hide panes to focus on editing, and provide multiple ways to reveal them: toolbar button plus menu command with keyboard shortcut. Prefer the thin divider (one point wide); use a thicker style only for a specific need such as strong linear table rows on both sides (`NSSplitView.DividerStyle`).
- **tvOS:** suits filtering, category in the primary pane and results in the secondary. Default one-third primary and two-thirds secondary, or half-and-half. Show one title above the whole split view, not per pane; center it when the secondary pane is a content collection, place it above the primary pane when the secondary pane is one main view.
- **visionOS:** prefer a split view over a new window for supplementary information; a new window disrupts navigation and repositioning. Use a sheet for a small amount of information or a simple task people finish before returning.
- **watchOS:** shows either the list or a detail view full screen. Show the most relevant detail view at launch (location, time, recent actions). Put multiple detail pages in a vertical tab view; the Digital Crown scrolls them and a page indicator beside the Digital Crown shows count and selection.
</platform_considerations>

<anti_patterns>
- Avoid split views in a compact environment.
- Avoid thicker divider styles without a specific need.
- Don't title each pane of a tvOS split view.
</anti_patterns>
</topic>

<topic name="Tab views (macOS, watchOS only)" source="https://developer.apple.com/design/human-interface-guidelines/tab-views" updated="2023-06-05">
A tab view shows mutually exclusive panes in one area, switched by a tabbed control on the top edge of the content area (`NSTabView`, `TabView`). It is distinct from the tab bar used for app-level navigation; it is not supported on iOS, iPadOS, tvOS, or visionOS, and iOS and iPadOS use a segmented control instead.

<when_to_use>
- Use a tab view for closely related areas of content; the enclosure implies each tab's content resembles the others'.
- Prefer a pop-up button menu of view options when there are too many panes for tabs.
</when_to_use>

<best_practices>
- **Make sure controls in a pane affect content only in that pane.** Panes are self-contained.
- **Label each tab to describe its pane.** Nouns or short noun phrases (a verb phrase occasionally), title-style capitalization.
- **Avoid a pop-up button to switch tabs.** Tabs take one click and show all choices; a pop-up takes two and hides them.
- **Avoid more than six tabs.** More overwhelms and breaks layout; offer each pane as a view option in a pop-up button menu instead.
- **Hide the tabbed control only when the app switches panes programmatically.** The content area can then be borderless (solid or transparent), bezeled, or bordered with a line.
- **Inset a tab view with a margin of window-body area on all sides.** Leaves room for unrelated controls; extending to the window edges is unusual.
</best_practices>

<platform_considerations>
- **iOS, iPadOS:** use a segmented control.
- **watchOS:** tab views appear as page controls.
</platform_considerations>

<anti_patterns>
- Avoid a pop-up button as the tab switcher.
- Avoid more than six tabs.
</anti_patterns>
</topic>

<decision_guide>
| Content to show | Component |
|---|---|
| Hierarchical text with attribute columns (macOS) | Outline view: hierarchy in first column, sortable headings, Option-click expands all |
| Deep hierarchy, frequent level changes, no sorting (macOS) | Column view (browser), root in first column |
| Hierarchical content on iPadOS or visionOS | Split view with a sidebar (primary, secondary, optional tertiary), regular environment only |
| Several hierarchy levels visible at once | Split view: 2 or 3 vertical panes on iPadOS; vertical, horizontal, or both on macOS; persistent selection |
| Optional or advanced details in a view or list | Disclosure triangle with a label; `DisclosureGroup` on iOS, iPadOS, visionOS |
| Extra options for one control | Disclosure button beside it, one per view |
| Homogeneous items, mostly text | List or table; edit mode to reorder; highlight for navigation, checkmark for options |
| Homogeneous items, image-based or varying sizes | Collection, standard row or grid layout |
| Sections of settings or options | Grouped list style (iOS, iPadOS); box with colon-terminated title in a macOS settings pane |
| Multicolumn sortable data | Table with title-style headings; on macOS click-to-sort, resizable columns, alternating rows |
| Related controls needing a visual group | Box, small relative to its container, never nested |
| Small static text | Label, system font, one of four label colors |
| Small editable text | Text field |
| Long, editable, or specially formatted text | Text view with Dynamic Type, selectable useful text, matching keyboard |
| One non-interactive image | Image view; button if tappable; symbol or icon for glyphs; image well if editable (macOS) |
| Remote or embedded HTML | Web view with forward and back controls for multi-page use; not a browser; no tvOS or watchOS |
| Closely related alternative panes (macOS) | Tab view, six tabs max; pop-up button beyond; segmented control on iOS, iPadOS; tab bar for app navigation |
| Focusable media units (tvOS) | Lockup: card, caption button, monogram, poster |
| Numeric comparisons, trends, relationships | Chart: bar for categories and sums, line for change over time, point for relationships and outliers |
| Row "more info" versus "drill in" | Info button for details; disclosure indicator for navigation; no index beside trailing controls |
</decision_guide>

<quick_checklist>
- [ ] Text in lists or tables, image-heavy or variably sized items in collections?
- [ ] macOS hierarchies in an outline view (hierarchy in the first column only) or column view, not a flat table?
- [ ] Column headings are nouns in title-style capitalization with no punctuation; columns resizable; sort reverses on a second click?
- [ ] iOS and iPadOS rows use info buttons for details and disclosure indicators for navigation, with no index beside trailing controls?
- [ ] Split views highlight the selection in each pane, avoid compact iPhone layouts, and work at narrow, compact, and intermediate iPad widths?
- [ ] macOS split views use the 1 pt thin divider, sane min and max pane sizes, and a toolbar button plus menu command to restore hidden panes?
- [ ] macOS tab views have six or fewer noun-labeled tabs, a window-body margin, and no pop-up button switcher?
- [ ] Every disclosure triangle is labeled, and no view has more than one disclosure button?
- [ ] Boxes are small, not nested, titled in sentence style with no ending punctuation (colon only in a settings pane)?
- [ ] Labels and text views use system fonts, Dynamic Type, system label colors, and selectable useful text?
- [ ] Images sit in image views only when non-interactive, with buttons for tappable images and symbols for glyphs?
- [ ] Charts choose the mark for the message, set a meaningful axis range and lower bound, encode beyond color, and never hide critical data behind interaction?
- [ ] Charts provide a title and summary, Audio Graphs or an overview, per-element labels without subjective terms or abbreviations, and hide visible axis labels from assistive technologies?
- [ ] Web views offer forward and back controls for multi-page use and don't try to be a browser?
- [ ] watchOS lists stay short or offer "view more", detail views fit vertical page-based navigation, and charts avoid complex interaction?
</quick_checklist>
