# DareFox Pastel Redesign

## Task
Overhaul ALL screens and components to use a cute, pastel aesthetic. Replace emoji fox placeholders with actual mascot images. Make the app feel warm, kawaii, and delightful.

## Pastel Color Palette
Replace ALL hardcoded colors across every file:

| Role | Old | New |
|------|-----|-----|
| Background | #F2F4F5 | #FFF8F0 (warm cream) |
| Card bg | #FFFFFF | #FFFFFF |
| Card shadow | #0B1A26 | #E8C4A8 (peachy shadow) |
| Primary button | #4CAF50 | #FF8C7C (soft coral) |
| Button disabled | #9FD6A2 | #FFD4CC (light coral) |
| Primary text | #1A1A1A | #4A3728 (warm brown) |
| Secondary text | #888888 | #9B8579 (warm gray) |
| Tab active tint | #4CAF50 | #FF8C7C (coral) |
| Tab inactive | #8E8E93 | #C4A99A |
| Streak flame color | (emoji) | #FF8C7C |
| XP bar fill | #4CAF50 | #A8E6CF (pastel mint) |
| XP bar track | #E0E0E0 | #F0E6DE (warm light) |
| Switch track on | #4CAF50 | #A8E6CF |
| Reset button border | #F1C1C1 | #FFD4CC |
| Reset button text | #C55353 | #E87461 |
| Category badges - keep their existing colors but make them more pastel/soft |

## Mascot Images
Images are at `assets/mascot/`. Use them as follows:

### In components/PetDisplay.tsx
Replace the fox emoji with an actual `<Image>` showing the mascot based on pet level:
- Level 1 (Timid): `require('../../assets/mascot/timid.png')`
- Level 2 (Cautious): `require('../../assets/mascot/main.png')`
- Level 3 (Brave): `require('../../assets/mascot/brave.png')`
- Level 4 (Fearless): `require('../../assets/mascot/brave.png')`
- Level 5 (Legendary): `require('../../assets/mascot/celebrate.png')`

### In app/(tabs)/index.tsx (Home screen)
- Show a small mascot image (120x120) above the dare card
- Use `main.png` normally, `celebrate.png` when completed today
- Add a cute greeting like "Ready for today's dare?" with the mascot

### In components/DareCard.tsx
- Replace the fox emoji placeholder with a small (48x48) mascot face
- Round it with borderRadius

### Tab bar icons
Keep emoji icons but update the style to match pastel theme.

## Typography & Spacing
- Use softer font weights where possible (600 instead of 800 for titles)
- Increase card border radius from 20 to 24
- Add slightly more padding (20 → 24)
- Card shadow: opacity 0.08, radius 16, offset y:6

## Category Badge Colors (softer)
Update categoryStyles in lib/dares.ts:
- social: bg #FFE5E5, text #D4726A
- physical: bg #E5F0FF, text #6A8FD4
- creative: bg #FFF0E5, text #D4976A
- mindfulness: bg #E5FFE8, text #6AD47A
- random: bg #F0E5FF, text #9B6AD4

## Files to Update
1. `lib/dares.ts` - category badge colors
2. `components/DareCard.tsx` - colors + mascot image
3. `components/StreakCounter.tsx` - colors
4. `components/XPBar.tsx` - colors
5. `components/PetDisplay.tsx` - replace emoji with Image, colors
6. `app/(tabs)/index.tsx` - full color overhaul + mascot image
7. `app/(tabs)/history.tsx` - colors
8. `app/(tabs)/pet.tsx` - colors + mascot
9. `app/(tabs)/settings.tsx` - colors
10. `app/(tabs)/_layout.tsx` - tab bar colors
11. `app/_layout.tsx` - background color

## Important
- Import `Image` from `react-native` where needed
- Use `require()` for local images (not URIs)
- Keep all existing functionality intact
- TypeScript must compile clean (`npx tsc --noEmit`)

When done, run: `touch /tmp/darefox-redesign-done`
