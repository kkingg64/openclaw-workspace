# P2026-008 Asset Inventory

**Project:** MADHORSE HQ - Enterprise Mission Control Dashboard  
**Phase:** Phase 2 Design  
**Version:** v1.0  
**Date:** 2026-04-03  
**Author:** CDO  

---

## Overview

This document catalogs all assets required for MADHORSE HQ dashboard including fonts, icons, images, and external resources.

---

## 1. Typography Assets

### 1.1 Fonts

| Font | Family | Weights | Format | Source | License |
|------|--------|---------|--------|--------|---------|
| Inter | Inter | 400, 500, 600, 700 | WOFF2 | Google Fonts | OFL |
| System Fallback | -apple-system, BlinkMacSystemFont, Segoe UI, Roboto | N/A | System | OS Native | N/A |

### 1.2 Font Usage

| Style | Weight | Size | Line Height | Usage |
|-------|--------|------|-------------|-------|
| H1 | 700 | 32px | 1.2 | Page titles |
| H2 | 600 | 24px | 1.3 | Section headers |
| H3 | 600 | 18px | 1.4 | Card titles |
| Body | 400 | 14px | 1.5 | Default text |
| Small | 500 | 12px | 1.4 | Labels, metadata |
| Caption | 400 | 11px | 1.3 | Timestamps |

---

## 2. Icon Assets

### 2.1 Icon Library

| Library | Usage | Format | Source |
|---------|-------|--------|--------|
| Lucide React | Primary icons | SVG | shadcn/ui dependency |
| Custom SVGs | Project-specific | Inline SVG | Internal |

### 2.2 Core Icons

| Icon Name | Usage | Component |
|-----------|-------|-----------|
| Home | Dashboard nav | Lucide |
| Users | Agents nav | Lucide |
| FolderKanban | Projects nav | Lucide |
| BookOpen | Research nav | Lucide |
| TrendingUp | Trends nav | Lucide |
| Search | Search input | Lucide |
| Bell | Notifications | Lucide |
| LogOut | Logout | Lucide |
| ChevronDown | Dropdowns | Lucide |
| ChevronRight | Navigation | Lucide |
| RefreshCw | Refresh | Lucide |
| AlertCircle | Errors | Lucide |
| CheckCircle | Success | Lucide |
| XCircle | Error status | Lucide |
| Clock | Uptime, timestamps | Lucide |
| Cpu | CPU metric | Lucide |
| HardDrive | Storage metric | Lucide |
| Wifi | Network metric | Lucide |
| Activity | RAM metric | Lucide |
| Menu | Mobile hamburger | Lucide |
| X | Close modal | Lucide |
| ExternalLink | External links | Lucide |

### 2.3 Brand Icons

| Icon | Usage | File |
|------|-------|------|
| MADHORSE Logo | Header, favicon | SVG inline |

---

## 3. Image Assets

### 3.1 Avatars

| Avatar | Size | Format | Source |
|--------|------|--------|--------|
| CEO Fabio | 64x64 | WebP | Auto-generated |
| CTO | 64x64 | WebP | Auto-generated |
| COO | 64x64 | WebP | Auto-generated |
| CDO | 64x64 | WebP | Auto-generated |
| CISO | 64x64 | WebP | Auto-generated |
| Forex | 64x64 | WebP | Auto-generated |
| Default User | 64x64 | SVG | Generated |

### 3.2 Images

| Image | Dimensions | Format | Usage |
|-------|------------|--------|-------|
| Empty state illustration | 200x200 | SVG | Empty lists |
| Error illustration | 200x200 | SVG | Error states |
| Loading spinner | 24x24 | SVG | Loading states |

### 3.3 External Images

| Image | Source | License | Usage |
|-------|--------|---------|-------|
| Google Logo | Google Brand | Google brand guidelines | Login button |
| Platform logos (TikTok, etc.) | Respective brands | Brand assets | Trends page |

---

## 4. Component Assets

### 4.1 shadcn/ui Components Used

| Component | Version | Source |
|-----------|---------|--------|
| Button | Latest | shadcn/ui |
| Card | Latest | shadcn/ui |
| Badge | Latest | shadcn/ui |
| Input | Latest | shadcn/ui |
| Avatar | Latest | shadcn/ui |
| Progress | Latest | shadcn/ui |
| ScrollArea | Latest | shadcn/ui |
| Skeleton | Latest | shadcn/ui |
| Tooltip | Latest | shadcn/ui |
| Dialog | Latest | shadcn/ui |
| DropdownMenu | Latest | shadcn/ui |
| Tabs | Latest | shadcn/ui |
| Collapsible | Latest | shadcn/ui |
| Toast | Latest | shadcn/ui |
| Sheet (Mobile Sidebar) | Latest | shadcn/ui |

### 4.2 Custom Components

| Component | Description | Tokens Used |
|-----------|-------------|-------------|
| SystemMonitor | VPS metrics row | --card, --accent, --muted |
| AgentCard | Agent status card | --card, --foreground, --success |
| ProjectCard | Project overview card | --card, --accent, --secondary |
| ResearchCard | Research article card | --card, --secondary |
| TrendCard | Trending topic card | --card, --accent |
| Header | Main navigation header | --background, --foreground |
| Sidebar | Agent list sidebar | --card, --border |
| FeaturedResearch | Spotlight card | --card, --accent |

---

## 5. Design Tokens Asset

### 5.1 Token Source

| File | Location | Format |
|------|----------|--------|
| madhorse-cdo.json | shadcn/themes/madhorse-cdo.json | JSON |

### 5.2 Token Categories

| Category | Tokens |
|----------|--------|
| Background | --background, --card, --popover, --muted |
| Foreground | --foreground, --card-foreground, --popover-foreground, --muted-foreground |
| Interactive | --primary, --primary-foreground, --secondary, --secondary-foreground, --accent, --accent-foreground |
| Destructive | --destructive, --destructive-foreground |
| Borders | --border, --input, --ring |
| Utility | --radius |

---

## 6. External Dependencies

### 6.1 CDN Resources

| Resource | URL | Usage |
|----------|-----|-------|
| Google Fonts Inter | https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap | Typography |

### 6.2 NPM Packages

| Package | Version | Usage |
|---------|---------|-------|
| next | ^14.x | Framework |
| react | ^18.x | UI library |
| shadcn/ui | Latest | Component library |
| lucide-react | Latest | Icons |
| tailwindcss | ^3.x | CSS framework (shadcn dependency) |
| class-variance-authority | Latest | Component variants |
| clsx | Latest | Conditional classes |
| tailwind-merge | Latest | Class merging |

---

## 7. Favicon & App Icons

### 7.1 Favicon

| File | Size | Format |
|------|------|--------|
| favicon.ico | 32x32, 16x16 | ICO |
| favicon.svg | Scalable | SVG |

### 7.2 App Icons

| Platform | Size | Format |
|----------|------|--------|
| iOS | 180x180 | PNG |
| Android | 192x192, 512x512 | PNG |
| PWA | 512x512 | PNG |

---

## 8. Asset Organization

```
public/
├── fonts/
│   └── (Inter loaded via Google Fonts CDN)
├── icons/
│   ├── favicon.ico
│   ├── favicon.svg
│   └── platform-logos/
│       ├── tiktok.svg
│       ├── xhs.svg
│       ├── instagram.svg
│       ├── twitter.svg
│       └── youtube.svg
└── images/
    ├── empty-state.svg
    └── error-state.svg
```

---

## 9. Asset Quality Standards

| Asset Type | Standard |
|------------|----------|
| SVG | Optimized, < 5KB each |
| PNG | WebP with PNG fallback, optimized |
| Font | WOFF2 only, Latin subset |
| Icons | 24x24 default, consistent stroke width |

---

**CDO_SIGNED:** `FABIO_CDO_SIGNED_2026-04-03`

**Document Status:** v1.0 — Complete
