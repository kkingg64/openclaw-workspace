# designs/ — Visual Exports + UAT Evidence

> ⛔ **PROTOCOL UPDATE (v11.0+ / 2026-04-03):**
> **Pencil CLI & Penpot are DEPRECATED** — Use **shadcn Design-First** instead
> 
> Primary design tool: **shadcn/ui components + madhorse-cdo.json tokens**  
> Design preview: **Theme_Preview.html** (browser-renderable HTML, not production code)
> 
> Figma is no longer used — all designs via code-first component system.

Store these files here:

- `madhorse-cdo.json` — CDO token definitions (HSL format, shadcn tokens)
- `Theme_Preview.html` — Browser-renderable design preview for visual approval
- `Component_Inventory.md` — List of all shadcn components used
- `Interaction_Spec.md` — Interactive element specs (4 states: default, hover, active, disabled)
- `UI_Spec.md` — Visual specifications and layout guidelines
- `uat_screenshots/TC-XXX.png` — Phase 5 UAT browser 截圖

Subfolders:

```
designs/
├── exports/          ← (Deprecated - Pencil CLI exports no longer needed)
└── uat_screenshots/  ← Phase 5 UAT browser 截圖
```

**⚠️ Deprecated files (DO NOT CREATE):**
- `*.pen` (Pencil CLI designs)
- PNG exports from Penpot
- Figma files