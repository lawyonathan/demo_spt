<template>
Copy this structure and fill every section. Delete a section only if it truly does not apply and say why in one line.

**Screen:** {name}
**Purpose:** {one sentence: what the person accomplishes here}
**Place in flow:** {entry points, what comes before and after}
**Platform and size classes:** {e.g. iOS compact width; iPadOS regular width; web compact and regular}
**Primary action:** {the one thing most people come here to do}

**Information hierarchy**
1. {most important content or control}
2. {...}
3. {disclosed on demand: ...}

**Structure and components**
| Element | Component (system name) | Configuration | HIG source |
|---------|-------------------------|---------------|------------|
| {Navigation} | {Tab bar / Sidebar / ...} | {items, search tab, ...} | {URL} |
| {Primary action} | {Button, prominent style} | {label, role} | {URL} |
| {...} | {...} | {...} | {URL} |

**Modal presentations:** {none, or: component, trigger, dismissal, confirmation on discard}

**Layout**
- Compact width: {...}
- Regular width: {...}
- Safe areas and bars: {content extends under bars; scroll edge effect; ...}
- Largest accessibility text size: {what stacks or grows}
- Right to left: {what mirrors; what does not}

**Typography, color, materials**
- Text styles: {Large Title for ..., Body for ..., Footnote for ...}
- Colors: {semantic colors used; where tint appears}
- Materials: {Liquid Glass on ...; regular or clear variant; standard material for ...}
- Appearance checks: {light, dark, Increase Contrast, Reduce Transparency}

**States**
| State | What the person sees | Feedback |
|-------|----------------------|----------|
| Empty | {...} | {...} |
| Loading | {determinate/indeterminate, what stays interactive} | {...} |
| Error | {what happened, what to do} | {...} |
| Success | {...} | {inline status / haptic / none} |
| Permission not granted | {...} | {...} |

**Copy**
- Title: {...}
- Buttons: {verb, title-style}
- Alerts: {title, message, buttons in order}
- Purpose strings: {...}

**Accessibility**
- Targets and spacing: {...}
- VoiceOver labels and grouping: {...}
- Dynamic Type: {...}
- Gesture alternatives: {...}
- Reduce Motion: {...}
- Keyboard and focus (macOS, iPadOS, web): {...}

**Open questions and assumptions**
- {...}

**Verification**
- Checklists run: {file: pass/fail counts}
- Non-negotiables: {all met, or exception and reason}
</template>
