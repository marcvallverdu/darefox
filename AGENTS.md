# Daily Dare — Build Instructions

## What to Build
A mobile app called **DareFox** (Daily Dare with a fox pet mascot). Built with Expo SDK 54, TypeScript, Expo Router for navigation.

## Design Reference
Follow this design spec precisely:

### Color Palette
- Background: `#F2F4F5` (cool off-white)
- Cards: `#FFFFFF` with 20-24px border-radius, subtle shadow
- Primary green: `#4CAF50` (streak flame, CTA button)
- Dark text: `#1A1A1A`
- Muted text: `#888888`
- Dare category badges: soft pastel backgrounds with darker text

### Typography
- App name "DareFox": Bold 28-32pt, dark
- Streak "12 Days": Bold 24pt + regular 12pt below
- Dare text: Bold 20-22pt, dark
- Body text: Regular 14-16pt

### Layout (Home Screen)
1. **Header**: "DareFox" left, green flame icon + streak counter right
2. **Dare Card**: White rounded card, centered. Contains:
   - Category badge (e.g., "Social" in a soft pill shape)
   - Dare text: "Talk to a stranger today"
   - Cute fox mascot illustration area (use an emoji 🦊 as placeholder for now — we'll add real art later)
   - Difficulty indicator (comfort zone → brave → legendary)
3. **CTA Button**: Large green rounded button "I Did It!" — full width with padding
4. **Bottom Tab Nav**: Home, History, Pet, Settings

### Core Features to Build
1. **Dare of the Day**: Random dare from a local database of 50+ dares, categorized (Social, Physical, Creative, Mindful, Random)
2. **Streak Tracker**: Count consecutive days of completed dares. Store in AsyncStorage.
3. **Pet System**: Fox that has 5 courage levels (Timid → Cautious → Brave → Fearless → Legendary). Each completed dare gives XP. Show pet on dedicated Pet tab with current level + XP progress bar.
4. **History Tab**: Calendar/list view of completed dares with dates
5. **Daily Notification**: Schedule a local notification each morning at 8am with the day's dare
6. **Haptic Feedback**: Vibrate on dare completion

### Dare Database (seed at least 50)
Categories:
- **Social**: "Compliment a stranger", "Start a conversation with someone new", "Call a friend you haven't spoken to in months"
- **Physical**: "Take a cold shower", "Do 20 pushups right now", "Walk a different route today"  
- **Creative**: "Draw something in 5 minutes", "Write a haiku", "Take a photo of something beautiful"
- **Mindful**: "Meditate for 5 minutes", "Write down 3 things you're grateful for", "Eat a meal with no phone"
- **Random**: "Say yes to the next thing someone asks", "Wear something you never wear", "Cook something you've never made"

Include difficulty ratings (1-3) per dare.

### Tech Stack
- Expo SDK 54 (already initialized)
- Expo Router (file-based routing) — install and set up `app/` directory
- AsyncStorage for persistence
- expo-notifications for daily reminders
- expo-haptics for feedback
- No backend needed — all local

### File Structure
```
app/
  _layout.tsx          # Root layout with tab navigator
  (tabs)/
    _layout.tsx        # Tab layout (Home, History, Pet, Settings)
    index.tsx          # Home - today's dare
    history.tsx        # Completed dares history
    pet.tsx            # Fox pet screen with level/XP
    settings.tsx       # Notification time, reset data
lib/
  dares.ts             # Dare database (50+ dares)
  storage.ts           # AsyncStorage helpers
  pet.ts               # Pet XP/level calculations
  notifications.ts     # Notification scheduling
components/
  DareCard.tsx         # The main dare card component
  StreakCounter.tsx     # Flame + days counter
  PetDisplay.tsx       # Fox pet with level info
  XPBar.tsx            # Progress bar for XP
```

### Important
- Make it production-ready — proper error handling, loading states, clean code
- Use `expo-haptics` for the "I Did It!" button
- Dare selection: one per day (seed with date), don't repeat recently shown dares
- Pet XP: 10 XP per dare, 50 XP per level (so 5 dares = level up). Max level 5.
- Store everything in AsyncStorage: streak count, completed dares array, pet XP, last dare date
- Make it beautiful — follow the design spec closely. Rounded corners, shadows, clean spacing.
- App should work immediately on `npx expo start` with no errors

## Apple Developer / App Store
- Bundle ID: com.marcvallverdu.darefox
- Set up app.json with proper name, slug, icon placeholder, splash screen config
- Add EAS config for building later
