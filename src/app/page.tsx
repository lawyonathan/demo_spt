"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

import { Alert, AlertTitle, AlertDescription } from "@/components/reui/alert";
import { Badge } from "@/components/reui/badge";
import { Frame } from "@/components/reui/frame";
import { Timeline, TimelineItem } from "@/components/reui/timeline";
import { Stepper, Step } from "@/components/reui/stepper";
import { Rating } from "@/components/reui/rating";
import { NumberField } from "@/components/reui/number-field";
import { Autocomplete } from "@/components/reui/autocomplete";
import { PhoneInput } from "@/components/reui/phone-input";
import { FileUpload } from "@/components/reui/file-upload";
import { Tree } from "@/components/reui/tree";
import { DateSelector } from "@/components/reui/date-selector";
import { Sortable } from "@/components/reui/sortable";
import { Kanban, type KanbanColumn } from "@/components/reui/kanban";

import { GradientHeading } from "@/components/cult/gradient-heading";
import { TextAnimate } from "@/components/cult/text-animate";
import { Typewriter } from "@/components/cult/typewriter";
import { AnimatedNumber } from "@/components/cult/animated-number";
import { DynamicIsland, DynamicIslandContent, useDynamicIsland } from "@/components/cult/dynamic-island";
import { DirectionAwareTabs } from "@/components/cult/direction-aware-tabs";
import { ExpandableCard } from "@/components/cult/expandable-card";
import { ColorPicker } from "@/components/cult/color-picker";
import { LightBoard } from "@/components/cult/lightboard";
import { MacOSDock } from "@/components/cult/macos-dock";

import {
  CheckCircle2, Music, Home, Mail, Settings,
  FileText, Star, Zap, Globe,
} from "lucide-react";

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export default function HomePage() {
  const [activeStep, setActiveStep] = React.useState(1);
  const [rating, setRating] = React.useState(3.5);
  const [numberVal, setNumberVal] = React.useState(5);
  const [sortItems, setSortItems] = React.useState([
    { id: "1", title: "Design system architecture" },
    { id: "2", title: "Component implementation" },
    { id: "3", title: "Documentation & examples" },
    { id: "4", title: "Testing & QA" },
  ]);

  const [kanbanColumns, setKanbanColumns] = React.useState<KanbanColumn[]>([
    {
      id: "todo",
      title: "To Do",
      color: "#6366f1",
      cards: [
        { id: "k1", title: "Research competitors", description: "Analyze top 5 competitor products", priority: "high" as const, labels: [{ text: "Research", color: "#6366f1" }] },
        { id: "k2", title: "Create wireframes", description: "Low-fi wireframes for main flows", priority: "medium" as const },
      ],
    },
    {
      id: "progress",
      title: "In Progress",
      color: "#f59e0b",
      cards: [
        { id: "k3", title: "Build component library", description: "Implement core design system components", priority: "urgent" as const, labels: [{ text: "Dev", color: "#22c55e" }] },
      ],
    },
    {
      id: "done",
      title: "Done",
      color: "#22c55e",
      cards: [
        { id: "k4", title: "Project setup", priority: "low" as const },
      ],
    },
  ]);

  const island = useDynamicIsland({
    sizes: ["compact", "default", "large"],
    defaultSize: "compact",
  });

  const treeData = [
    {
      id: "src",
      label: "src",
      children: [
        {
          id: "components",
          label: "components",
          children: [
            { id: "ui", label: "ui", children: [{ id: "button.tsx", label: "button.tsx" }, { id: "input.tsx", label: "input.tsx" }] },
            { id: "reui", label: "reui", children: [{ id: "alert.tsx", label: "alert.tsx" }, { id: "badge.tsx", label: "badge.tsx" }] },
            { id: "cult", label: "cult", children: [{ id: "dynamic-island.tsx", label: "dynamic-island.tsx" }] },
          ],
        },
        { id: "lib", label: "lib", children: [{ id: "utils.ts", label: "utils.ts" }] },
        { id: "app", label: "app", children: [{ id: "page.tsx", label: "page.tsx" }, { id: "layout.tsx", label: "layout.tsx" }] },
      ],
    },
  ];

  const autocompleteOptions = [
    { value: "react", label: "React", group: "Frameworks" },
    { value: "vue", label: "Vue.js", group: "Frameworks" },
    { value: "angular", label: "Angular", group: "Frameworks" },
    { value: "svelte", label: "Svelte", group: "Frameworks" },
    { value: "tailwind", label: "Tailwind CSS", group: "Styling" },
    { value: "sass", label: "Sass", group: "Styling" },
    { value: "typescript", label: "TypeScript", group: "Languages" },
    { value: "javascript", label: "JavaScript", group: "Languages" },
  ];

  const dockItems = [
    { id: "home", label: "Home", icon: <Home className="h-6 w-6" />, badge: 3 },
    { id: "mail", label: "Mail", icon: <Mail className="h-6 w-6" />, badge: 12 },
    { id: "files", label: "Files", icon: <FileText className="h-6 w-6" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-6 w-6" /> },
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 space-y-16">
      <div className="text-center space-y-4">
        <GradientHeading variant="ocean" size="xl" as="h1">
          Design System
        </GradientHeading>
        <TextAnimate
          text="Built with shadcn/ui + reUI + cult-ui inspired components"
          type="fadeInUp"
          by="word"
          className="text-lg text-muted-foreground"
          as="p"
        />
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="soft-info">shadcn/ui Base</Badge>
          <Badge variant="soft-success">17 reUI Components</Badge>
          <Badge variant="soft" shape="pill">11 cult-ui Components</Badge>
        </div>
      </div>

      <Separator />

      <Section title="Base Components" description="Standard shadcn/ui primitives with extended variants">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>Extended with success, warning, and info variants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="success">Success</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="info">Info</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Form Controls</CardTitle>
              <CardDescription>Input, Label, Checkbox, Switch</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="dark" />
                <Label htmlFor="dark">Dark mode</Label>
              </div>
              <Progress value={66} />
            </CardContent>
          </Card>
        </div>
      </Section>

      <Separator />

      <Section title="Alert" description="Contextual notifications with 10 variants (reUI)">
        <div className="grid gap-3 md:grid-cols-2">
          <Alert variant="success"><AlertTitle>Success</AlertTitle><AlertDescription>Operation completed successfully.</AlertDescription></Alert>
          <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>Something went wrong.</AlertDescription></Alert>
          <Alert variant="warning"><AlertTitle>Warning</AlertTitle><AlertDescription>Please review before proceeding.</AlertDescription></Alert>
          <Alert variant="info"><AlertTitle>Info</AlertTitle><AlertDescription>Here is some helpful information.</AlertDescription></Alert>
          <Alert variant="filled-success" dismissible><AlertTitle>Filled Success</AlertTitle><AlertDescription>Dismissible filled variant.</AlertDescription></Alert>
          <Alert variant="filled-destructive" dismissible><AlertTitle>Filled Error</AlertTitle><AlertDescription>Dismissible filled variant.</AlertDescription></Alert>
        </div>
      </Section>

      <Separator />

      <Section title="Badge" description="Status indicators with 16 variants (reUI)">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="soft">Soft</Badge>
            <Badge variant="soft-destructive">Soft Destructive</Badge>
            <Badge variant="soft-success">Soft Success</Badge>
            <Badge variant="soft-warning">Soft Warning</Badge>
            <Badge variant="soft-info">Soft Info</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline-success" shape="pill" dot>Active</Badge>
            <Badge variant="outline-destructive" shape="pill" dot>Offline</Badge>
            <Badge variant="info" size="lg" removable onRemove={() => {}}>Removable</Badge>
            <Badge variant="success" icon={<CheckCircle2 className="h-3 w-3" />}>With Icon</Badge>
          </div>
        </div>
      </Section>

      <Separator />

      <Section title="Frame" description="Card-like wrapper with 8 variants (reUI)">
        <div className="grid gap-4 md:grid-cols-3">
          <Frame header="Default Frame" variant="default"><p className="text-sm text-muted-foreground">Standard frame with border and shadow.</p></Frame>
          <Frame header="Elevated" variant="elevated"><p className="text-sm text-muted-foreground">Elevated frame with more shadow.</p></Frame>
          <Frame header="Collapsible" variant="bordered" collapsible><p className="text-sm text-muted-foreground">Click the header to collapse/expand.</p></Frame>
        </div>
      </Section>

      <Separator />

      <Section title="Timeline" description="Event sequences and activity feeds (reUI)">
        <Timeline>
          <TimelineItem status="completed" title="Project Kickoff" description="Initial planning and team alignment" timestamp="Jan 15, 2025" />
          <TimelineItem status="completed" title="Design Phase" description="Created wireframes and visual designs" timestamp="Feb 1, 2025" icon={<CheckCircle2 className="h-4 w-4" />} />
          <TimelineItem status="current" title="Development" description="Building the component library" timestamp="Mar 1, 2025" icon={<Zap className="h-4 w-4" />} />
          <TimelineItem status="upcoming" title="Testing" description="QA and user testing" timestamp="Apr 1, 2025" />
          <TimelineItem status="upcoming" title="Launch" description="Production release" timestamp="May 1, 2025" isLast />
        </Timeline>
      </Section>

      <Separator />

      <Section title="Stepper" description="Multi-step forms with per-step validation (reUI)">
        <div className="space-y-6">
          <Stepper activeStep={activeStep} onStepClick={setActiveStep} orientation="horizontal">
            <Step label="Account" description="Create your account" />
            <Step label="Profile" description="Set up your profile" />
            <Step label="Preferences" description="Configure settings" />
            <Step label="Review" description="Review and submit" />
          </Stepper>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setActiveStep(Math.max(0, activeStep - 1))} disabled={activeStep === 0}>Previous</Button>
            <Button onClick={() => setActiveStep(Math.min(3, activeStep + 1))} disabled={activeStep === 3}>Next</Button>
          </div>
        </div>
      </Section>

      <Separator />

      <Section title="Interactive Controls" description="Rating, NumberField, PhoneInput, Autocomplete (reUI)">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Rating</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>Interactive</Label><Rating value={rating} onChange={setRating} showValue /></div>
              <div className="space-y-2"><Label>Half Stars (read-only)</Label><Rating value={3.5} allowHalf readOnly showValue /></div>
              <div className="space-y-2"><Label>Large</Label><Rating value={4} size="lg" readOnly /></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Number Field</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <NumberField value={numberVal} onChange={setNumberVal} min={0} max={100} label="Quantity" />
              <NumberField defaultValue={25} min={0} max={100} step={5} size="lg" label="Volume" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Phone Input</CardTitle></CardHeader>
            <CardContent><PhoneInput defaultCountry="US" /></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Autocomplete</CardTitle></CardHeader>
            <CardContent><Autocomplete options={autocompleteOptions} placeholder="Search technologies..." clearable /></CardContent>
          </Card>
        </div>
      </Section>

      <Separator />

      <Section title="File Upload" description="Multi-file with dropzone support (reUI)">
        <div className="max-w-lg"><FileUpload accept="image/*,.pdf" multiple maxSize={5 * 1024 * 1024} /></div>
      </Section>

      <Separator />

      <Section title="Date Selector" description="Range picker with calendar and presets (reUI)">
        <div className="flex flex-wrap gap-4">
          <div className="space-y-2"><Label>Single Date</Label><DateSelector mode="single" /></div>
          <div className="space-y-2"><Label>Date Range with Presets</Label><DateSelector mode="range" showPresets /></div>
        </div>
      </Section>

      <Separator />

      <Section title="Tree View" description="Hierarchical display with expand/collapse (reUI)">
        <Card className="max-w-sm"><CardContent className="p-3"><Tree data={treeData} showIcons showLines /></CardContent></Card>
      </Section>

      <Separator />

      <Section title="Sortable List" description="Drag-and-drop list reordering (reUI)">
        <div className="max-w-md">
          <Sortable items={sortItems} onReorder={setSortItems} renderItem={(item) => <span className="text-sm font-medium">{item.title}</span>} variant="cards" />
        </div>
      </Section>

      <Separator />

      <Section title="Kanban Board" description="Drag-and-drop task boards (reUI)">
        <Kanban
          columns={kanbanColumns}
          onColumnsChange={setKanbanColumns}
          onAddCard={(colId) => {
            setKanbanColumns((cols) =>
              cols.map((col) =>
                col.id === colId
                  ? { ...col, cards: [...col.cards, { id: `new-${Date.now()}`, title: "New Task", priority: "medium" as const }] }
                  : col
              )
            );
          }}
        />
      </Section>

      <Separator />

      <div className="text-center space-y-2">
        <GradientHeading variant="purple" size="lg" as="h2">cult-ui Inspired Components</GradientHeading>
        <p className="text-muted-foreground">Animation-forward, visually distinctive components</p>
      </div>

      <Separator />

      <Section title="Dynamic Island" description="Animated notification surface (cult-ui)">
        <div className="flex flex-col items-center gap-4">
          <DynamicIsland size={island.currentSize} onClick={island.toggle}>
            <DynamicIslandContent>
              {island.currentSize === "compact" && (<><Music className="h-4 w-4 text-green-400" /><span className="text-xs">Now Playing</span></>)}
              {island.currentSize === "default" && (<><Music className="h-5 w-5 text-green-400" /><div><p className="text-xs font-medium">Midnight City</p><p className="text-[10px] text-white/60">M83</p></div></>)}
              {island.currentSize === "large" && (
                <div className="flex flex-col items-center gap-3 py-4">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500" />
                  <div className="text-center"><p className="font-semibold">Midnight City</p><p className="text-xs text-white/60">M83 - Hurry Up, We&apos;re Dreaming</p></div>
                  <div className="w-full max-w-[200px] h-1 bg-white/20 rounded-full"><div className="h-full w-1/3 bg-white rounded-full" /></div>
                </div>
              )}
            </DynamicIslandContent>
          </DynamicIsland>
          <p className="text-xs text-muted-foreground">Click to cycle through sizes</p>
        </div>
      </Section>

      <Separator />

      <Section title="Typography Effects" description="Gradient heading, text animations, typewriter (cult-ui)">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <GradientHeading variant="pink" size="sm">Pink Gradient</GradientHeading>
              <GradientHeading variant="blue" size="sm">Blue Gradient</GradientHeading>
              <GradientHeading variant="sunset" size="sm">Sunset Gradient</GradientHeading>
              <GradientHeading variant="forest" size="sm">Forest Gradient</GradientHeading>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="mb-1 block">Typewriter</Label>
                <Typewriter words={["Design Systems", "Component Libraries", "Beautiful Interfaces", "Great UX"]} className="text-xl font-bold" />
              </div>
              <div>
                <Label className="mb-1 block">Animated Numbers</Label>
                <div className="flex gap-6">
                  <div className="text-center"><AnimatedNumber value={1234} className="text-3xl font-bold" /><p className="text-xs text-muted-foreground">Users</p></div>
                  <div className="text-center"><AnimatedNumber value={99.9} suffix="%" className="text-3xl font-bold" /><p className="text-xs text-muted-foreground">Uptime</p></div>
                  <div className="text-center"><AnimatedNumber value={45} prefix="$" suffix="M" className="text-3xl font-bold" /><p className="text-xs text-muted-foreground">Revenue</p></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Label className="mb-2 block">Text Animate</Label>
            <div className="space-y-3">
              <TextAnimate text="Fade In Up Animation" type="fadeInUp" className="text-lg font-semibold" />
              <TextAnimate text="Blur In Effect" type="blurIn" className="text-lg font-semibold" delay={0.3} />
              <TextAnimate text="Scale Up Letters" type="scaleUp" by="character" className="text-lg font-semibold" delay={0.6} />
            </div>
          </div>
        </div>
      </Section>

      <Separator />

      <Section title="Direction Aware Tabs" description="Animated tabs with directional transitions (cult-ui)">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Label className="mb-2 block">Default</Label>
            <DirectionAwareTabs tabs={[
              { id: "overview", label: "Overview", content: <p className="text-sm text-muted-foreground">Project overview with key metrics.</p> },
              { id: "analytics", label: "Analytics", content: <p className="text-sm text-muted-foreground">Detailed analytics dashboard.</p> },
              { id: "reports", label: "Reports", content: <p className="text-sm text-muted-foreground">Generated reports and exports.</p> },
            ]} />
          </div>
          <div>
            <Label className="mb-2 block">Pill Variant</Label>
            <DirectionAwareTabs variant="pill" tabs={[
              { id: "all", label: "All", content: <p className="text-sm text-muted-foreground">All items displayed.</p> },
              { id: "active", label: "Active", content: <p className="text-sm text-muted-foreground">Active items only.</p> },
              { id: "archived", label: "Archived", content: <p className="text-sm text-muted-foreground">Archived items.</p> },
            ]} />
          </div>
        </div>
      </Section>

      <Separator />

      <Section title="Expandable Card" description="Cards with smooth expand/collapse (cult-ui)">
        <div className="grid gap-4 md:grid-cols-3">
          <ExpandableCard title="Getting Started" description="Quick setup guide" icon={<Zap className="h-5 w-5 text-warning" />}>
            <p className="text-sm text-muted-foreground">Install the package and start using components right away.</p>
          </ExpandableCard>
          <ExpandableCard title="Customization" description="Theming and styling" icon={<Star className="h-5 w-5 text-primary" />} variant="bordered">
            <p className="text-sm text-muted-foreground">All components use CSS variables for theming.</p>
          </ExpandableCard>
          <ExpandableCard title="Accessibility" description="Built for everyone" icon={<Globe className="h-5 w-5 text-success" />} variant="elevated">
            <p className="text-sm text-muted-foreground">Components follow WAI-ARIA guidelines.</p>
          </ExpandableCard>
        </div>
      </Section>

      <Separator />

      <Section title="Color Picker" description="Full-featured color picker with presets (cult-ui)">
        <div className="flex gap-6 flex-wrap">
          <ColorPicker />
          <div className="space-y-2"><Label>Compact Variant</Label><ColorPicker variant="compact" /></div>
        </div>
      </Section>

      <Separator />

      <Section title="LightBoard" description="Interactive generative light display (cult-ui)">
        <div className="flex justify-center"><LightBoard rows={8} columns={16} autoPlay speed={200} /></div>
      </Section>

      <Separator />

      <Section title="MacOS Dock" description="Dock with magnification effect (cult-ui)">
        <div className="flex justify-center py-8"><MacOSDock items={dockItems} /></div>
      </Section>

      <Separator />

      <Section title="Component Inventory">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-primary" />Base (shadcn/ui)</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {["Button", "Input", "Label", "Card", "Dialog", "Select", "Tabs", "Tooltip", "Popover", "Checkbox", "Switch", "Progress", "Avatar", "Separator", "ScrollArea", "Table", "Textarea", "DropdownMenu"].map((c) => (
                  <Badge key={c} variant="outline" size="sm">{c}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-success" />reUI Inspired</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {["Alert", "Badge", "Frame", "Timeline", "Stepper", "Rating", "NumberField", "Autocomplete", "PhoneInput", "FileUpload", "Tree", "Scrollspy", "Sortable", "DataGrid", "DateSelector", "Filters", "Kanban"].map((c) => (
                  <Badge key={c} variant="soft-success" size="sm">{c}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-info" />cult-ui Inspired</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {["DynamicIsland", "GradientHeading", "TextAnimate", "Typewriter", "AnimatedNumber", "FloatingPanel", "DirectionAwareTabs", "ExpandableCard", "ColorPicker", "LightBoard", "MacOSDock"].map((c) => (
                  <Badge key={c} variant="soft-info" size="sm">{c}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      <div className="text-center py-8">
        <p className="text-sm text-muted-foreground">46 total components &middot; 18 base &middot; 17 reUI-inspired &middot; 11 cult-ui inspired</p>
      </div>
    </div>
  );
}
