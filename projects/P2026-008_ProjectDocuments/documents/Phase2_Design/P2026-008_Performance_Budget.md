# P2026-008 Performance Budget

**Project:** MADHORSE HQ - Enterprise Mission Control Dashboard  
**Phase:** Phase 2 Design  
**Version:** v1.0  
**Date:** 2026-04-03  
**Author:** CDO  

---

## Overview

This document defines performance budgets and targets for MADHORSE HQ dashboard. All metrics are based on Lighthouse testing on 4G network simulation.

---

## 1. Core Web Vitals Targets

| Metric | Target | Measurement | Tool |
|--------|--------|-------------|------|
| **LCP** (Largest Contentful Paint) | < 2.5s | P75 on 4G | Lighthouse |
| **FID** (First Input Delay) | < 100ms | P75 on 4G | Lighthouse |
| **CLS** (Cumulative Layout Shift) | < 0.1 | P75 on 4G | Lighthouse |
| **TTI** (Time to Interactive) | < 3.8s | P75 on 4G | Lighthouse |
| **FCP** (First Contentful Paint) | < 1.8s | P75 on 4G | Lighthouse |
| **Speed Index** | < 3.4s | P75 on 4G | Lighthouse |

---

## 2. Bundle Size Budget

### 2.1 JavaScript Budget

| Asset | Budget (gzipped) | Max (gzipped) |
|-------|-----------------|---------------|
| Initial JS Bundle | < 200KB | 250KB |
| Lazy-loaded chunks | < 50KB each | 75KB |
| Total JS (all routes) | < 500KB | 600KB |

### 2.2 CSS Budget

| Asset | Budget (gzipped) | Max (gzipped) |
|-------|-----------------|---------------|
| Critical CSS | < 15KB | 20KB |
| Total CSS | < 30KB | 40KB |

### 2.3 Font Budget

| Asset | Budget | Format |
|-------|--------|--------|
| Inter (Latin) | < 30KB | WOFF2 |
| Inter (Full) | < 100KB | WOFF2 |

---

## 3. Network Budget

### 3.1 Initial Page Load

| Resource | Count | Total Size (gzipped) |
|----------|-------|----------------------|
| HTML | 1 | < 30KB |
| CSS | 1 | < 30KB |
| JavaScript | 1 | < 200KB |
| Fonts | 1 | < 30KB |
| Images (LCP) | 1 | < 100KB |
| **Total Initial** | **5** | **< 390KB** |

### 3.2 API Response Budget

| Endpoint | Response Size | Refresh |
|----------|---------------|---------|
| `/api/system` | < 2KB | 30s |
| `/api/agents` | < 3KB | 30s |
| `/api/projects` | < 5KB | 60s |
| `/api/research` | < 10KB | 5min |
| `/api/trends` | < 10KB | 5min |

---

## 4. Render Budget

### 4.1 Critical Rendering Path

| Step | Target | Max |
|------|--------|-----|
| TTFB (Time to First Byte) | < 200ms | 600ms |
| HTML Parse | < 100ms | 300ms |
| CSS Parse & Render | < 100ms | 300ms |
| JS Execute (blocking) | < 150ms | 500ms |
| LCP Render | < 2500ms | 4000ms |

### 4.2 Interaction Timing

| Interaction | Target | Max |
|-------------|--------|-----|
| Button click response | < 50ms | 100ms |
| Navigation transition | < 300ms | 500ms |
| Modal open | < 200ms | 400ms |
| Filter/search response | < 300ms | 500ms |

---

## 5. Caching Strategy

| Resource | Cache Duration | Strategy |
|----------|----------------|----------|
| Static assets (JS/CSS) | 1 year | Immutable + hash |
| Fonts | 1 year | Immutable + hash |
| API responses | No cache | Real-time data |
| Images | 1 week | Versioned |

---

## 6. Image Optimization

| Image Type | Max Dimensions | Format | Quality |
|------------|---------------|--------|---------|
| Icons | 24x24 / 32x32 | SVG | N/A |
| Avatar | 64x64 | WebP | 80% |
| Featured Image | 800x400 | WebP | 80% |
| Card Thumbnail | 400x200 | WebP | 75% |

---

## 7. Code Splitting Strategy

### 7.1 Route-Based Splitting

| Route | Bundle | Loading |
|-------|--------|---------|
| `/` (Dashboard) | < 100KB | Initial |
| `/agents` | < 80KB | Initial |
| `/projects` | < 60KB | Initial |
| `/research` | < 80KB | Lazy |
| `/trends` | < 100KB | Lazy |
| `/login` | < 40KB | Lazy |

### 7.2 Component Lazy Loading

| Component | Trigger | Bundle |
|-----------|---------|--------|
| FeaturedResearchSpotlight | Scroll into view | < 30KB |
| HotReelsSpotlight | Scroll into view | < 40KB |
| ReasoningLog | Agent card click | < 20KB |
| DiscussionThread | Navigation | < 25KB |

---

## 8. Performance Monitoring

### 8.1 Real-User Monitoring (RUM)

| Metric | Collection | Threshold |
|--------|------------|-----------|
| LCP | Navigation Timing API | Alert if P75 > 2.5s |
| FID | Event Timing API | Alert if P75 > 100ms |
| CLS | Layout Instability API | Alert if P75 > 0.1 |

### 8.2 Synthetic Monitoring

| Test | Frequency | Tool |
|------|-----------|------|
| Lighthouse CI | Every PR | GitHub Actions |
| Bundle size check | Every build | webpack-bundle-analyzer |

---

## 9. Optimization Techniques

| Technique | Implementation | Expected Savings |
|-----------|----------------|-------------------|
| Tree shaking | ES modules + webpack | 30-40% JS reduction |
| Code splitting | Dynamic imports | 50-70% initial JS |
| Font subsetting | Latin only | 60% font size |
| Image lazy loading | Native `loading="lazy"` | 40-60% initial img |
| API debouncing | 30s polling with dedup | Reduced API calls |
| Compression | Brotli (preferred), gzip | 70% transfer reduction |

---

## 10. Performance Budget Compliance

| Category | Budget | Status |
|----------|--------|--------|
| LCP | < 2.5s | ✅ Target Set |
| TTI | < 3.8s | ✅ Target Set |
| CLS | < 0.1 | ✅ Target Set |
| Initial Bundle | < 250KB | ✅ Target Set |
| CSS | < 30KB | ✅ Target Set |
| Total Initial Load | < 390KB | ✅ Target Set |

---

**CDO_SIGNED:** `FABIO_CDO_SIGNED_2026-04-03`

**Document Status:** v1.0 — Complete
