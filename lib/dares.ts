export type DareCategory = "Social" | "Physical" | "Creative" | "Mindful" | "Random";

export type DareDifficulty = 1 | 2 | 3;

export type Dare = {
  id: string;
  text: string;
  category: DareCategory;
  difficulty: DareDifficulty;
};

export const DARES: Dare[] = [
  { id: "social-1", text: "Compliment a stranger", category: "Social", difficulty: 1 },
  { id: "social-2", text: "Start a conversation with someone new", category: "Social", difficulty: 2 },
  { id: "social-3", text: "Call a friend you haven't spoken to in months", category: "Social", difficulty: 2 },
  { id: "social-4", text: "Ask a coworker about their weekend", category: "Social", difficulty: 1 },
  { id: "social-5", text: "Introduce yourself to a neighbor", category: "Social", difficulty: 2 },
  { id: "social-6", text: "Send a thoughtful text to someone you admire", category: "Social", difficulty: 1 },
  { id: "social-7", text: "Share a positive review for a local business", category: "Social", difficulty: 1 },
  { id: "social-8", text: "Give a genuine thank-you to someone who helped you", category: "Social", difficulty: 1 },
  { id: "social-9", text: "Ask someone for a recommendation", category: "Social", difficulty: 1 },
  { id: "social-10", text: "Invite someone to join you for a short walk", category: "Social", difficulty: 2 },

  { id: "physical-1", text: "Take a cold shower", category: "Physical", difficulty: 3 },
  { id: "physical-2", text: "Do 20 pushups right now", category: "Physical", difficulty: 2 },
  { id: "physical-3", text: "Walk a different route today", category: "Physical", difficulty: 1 },
  { id: "physical-4", text: "Stretch for 5 minutes", category: "Physical", difficulty: 1 },
  { id: "physical-5", text: "Take the stairs instead of the elevator", category: "Physical", difficulty: 1 },
  { id: "physical-6", text: "Do a 60-second plank", category: "Physical", difficulty: 2 },
  { id: "physical-7", text: "Go for a 10-minute brisk walk", category: "Physical", difficulty: 1 },
  { id: "physical-8", text: "Try a short yoga flow", category: "Physical", difficulty: 2 },
  { id: "physical-9", text: "Dance to one song", category: "Physical", difficulty: 1 },
  { id: "physical-10", text: "Take a 2-minute wall sit", category: "Physical", difficulty: 3 },

  { id: "creative-1", text: "Draw something in 5 minutes", category: "Creative", difficulty: 1 },
  { id: "creative-2", text: "Write a haiku", category: "Creative", difficulty: 1 },
  { id: "creative-3", text: "Take a photo of something beautiful", category: "Creative", difficulty: 1 },
  { id: "creative-4", text: "Make a quick collage from magazine scraps", category: "Creative", difficulty: 2 },
  { id: "creative-5", text: "Invent a new word and define it", category: "Creative", difficulty: 1 },
  { id: "creative-6", text: "Design a tiny logo for an imaginary brand", category: "Creative", difficulty: 2 },
  { id: "creative-7", text: "Write a 6-word story", category: "Creative", difficulty: 1 },
  { id: "creative-8", text: "Sketch your favorite object", category: "Creative", difficulty: 2 },
  { id: "creative-9", text: "Record a 20-second voice memo about your day", category: "Creative", difficulty: 1 },
  { id: "creative-10", text: "Make a mini playlist with 3 songs", category: "Creative", difficulty: 1 },

  { id: "mindful-1", text: "Meditate for 5 minutes", category: "Mindful", difficulty: 1 },
  { id: "mindful-2", text: "Write down 3 things you're grateful for", category: "Mindful", difficulty: 1 },
  { id: "mindful-3", text: "Eat a meal with no phone", category: "Mindful", difficulty: 2 },
  { id: "mindful-4", text: "Take 10 slow, deep breaths", category: "Mindful", difficulty: 1 },
  { id: "mindful-5", text: "Notice 5 things you can see right now", category: "Mindful", difficulty: 1 },
  { id: "mindful-6", text: "Write a short intention for today", category: "Mindful", difficulty: 1 },
  { id: "mindful-7", text: "Step outside and listen for 2 minutes", category: "Mindful", difficulty: 1 },
  { id: "mindful-8", text: "Drink a glass of water mindfully", category: "Mindful", difficulty: 1 },
  { id: "mindful-9", text: "Do a body scan for 3 minutes", category: "Mindful", difficulty: 2 },
  { id: "mindful-10", text: "Write a kind note to yourself", category: "Mindful", difficulty: 1 },

  { id: "random-1", text: "Say yes to the next thing someone asks", category: "Random", difficulty: 3 },
  { id: "random-2", text: "Wear something you never wear", category: "Random", difficulty: 2 },
  { id: "random-3", text: "Cook something you've never made", category: "Random", difficulty: 3 },
  { id: "random-4", text: "Use your non-dominant hand for 10 minutes", category: "Random", difficulty: 2 },
  { id: "random-5", text: "Try a new snack today", category: "Random", difficulty: 1 },
  { id: "random-6", text: "Take a different seat than usual", category: "Random", difficulty: 1 },
  { id: "random-7", text: "Sing one line from a song out loud", category: "Random", difficulty: 2 },
  { id: "random-8", text: "Do something kind anonymously", category: "Random", difficulty: 2 },
  { id: "random-9", text: "Write a tiny thank-you note and keep it", category: "Random", difficulty: 1 },
  { id: "random-10", text: "Swap your phone wallpaper", category: "Random", difficulty: 1 },

  { id: "social-11", text: "Ask someone how their day is going", category: "Social", difficulty: 1 },
  { id: "physical-11", text: "Do 15 squats", category: "Physical", difficulty: 1 },
  { id: "creative-11", text: "Create a doodle using only circles", category: "Creative", difficulty: 1 },
  { id: "mindful-11", text: "Write one sentence about how you feel", category: "Mindful", difficulty: 1 },
  { id: "random-11", text: "Learn one word in a new language", category: "Random", difficulty: 1 }
];

const hashSeed = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const mulberry32 = (seed: number) => {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let result = Math.imul(t ^ (t >>> 15), 1 | t);
    result ^= result + Math.imul(result ^ (result >>> 7), 61 | result);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
};

export const getDareById = (id: string) => DARES.find((dare) => dare.id === id) ?? null;

export const getDailyDare = (dateKey: string, recentIds: string[]) => {
  const recentSet = new Set(recentIds);
  const available = DARES.filter((dare) => !recentSet.has(dare.id));
  const source = available.length > 0 ? available : DARES;
  const random = mulberry32(hashSeed(dateKey));
  const index = Math.floor(random() * source.length);
  return source[index];
};

export const categoryStyles: Record<DareCategory, { background: string; text: string }> = {
  Social: { background: "#FDE7EA", text: "#B9375E" },
  Physical: { background: "#E8F3FF", text: "#2D6AA3" },
  Creative: { background: "#F3E8FF", text: "#6A3FA0" },
  Mindful: { background: "#E8F7EE", text: "#2F7A52" },
  Random: { background: "#FFF4E5", text: "#B85C00" }
};
