export type DareCategory =
  | "Social"
  | "Physical"
  | "Creative"
  | "Mindful"
  | "Random"
  | "Kindness"
  | "Adventure";

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
  { id: "social-3", text: "Call a friend you have not spoken to in months", category: "Social", difficulty: 2 },
  { id: "social-4", text: "Ask a coworker about their weekend", category: "Social", difficulty: 1 },
  { id: "social-5", text: "Introduce yourself to a neighbor", category: "Social", difficulty: 2 },
  { id: "social-6", text: "Send a thoughtful text to someone you admire", category: "Social", difficulty: 1 },
  { id: "social-7", text: "Share a positive review for a local business", category: "Social", difficulty: 1 },
  { id: "social-8", text: "Give a genuine thank-you to someone who helped you", category: "Social", difficulty: 1 },
  { id: "social-9", text: "Ask someone for a recommendation", category: "Social", difficulty: 1 },
  { id: "social-10", text: "Invite someone to join you for a short walk", category: "Social", difficulty: 2 },
  { id: "social-11", text: "Ask someone how their day is going", category: "Social", difficulty: 1 },
  { id: "social-12", text: "Share a small win with a friend", category: "Social", difficulty: 1 },
  { id: "social-13", text: "Introduce two people who should meet", category: "Social", difficulty: 2 },
  { id: "social-14", text: "Send a voice note instead of a text", category: "Social", difficulty: 2 },
  { id: "social-15", text: "Smile and say hello to three people", category: "Social", difficulty: 1 },
  { id: "social-16", text: "Ask for help with a small task", category: "Social", difficulty: 2 },
  { id: "social-17", text: "Start a group chat for something fun", category: "Social", difficulty: 3 },
  { id: "social-18", text: "Thank a service worker by name", category: "Social", difficulty: 1 },
  { id: "social-19", text: "Invite someone to coffee this week", category: "Social", difficulty: 2 },
  { id: "social-20", text: "Join a conversation instead of staying quiet", category: "Social", difficulty: 2 },
  { id: "social-21", text: "Ask a thoughtful follow-up question", category: "Social", difficulty: 1 },
  { id: "social-22", text: "Give a sincere compliment to a coworker", category: "Social", difficulty: 1 },
  { id: "social-23", text: "Share a recommendation you love", category: "Social", difficulty: 1 },
  { id: "social-24", text: "Reach out to a mentor to say thanks", category: "Social", difficulty: 2 },
  { id: "social-25", text: "Introduce yourself at a group event", category: "Social", difficulty: 3 },

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
  { id: "physical-11", text: "Do 15 squats", category: "Physical", difficulty: 1 },
  { id: "physical-12", text: "Do a 2-minute jog in place", category: "Physical", difficulty: 1 },
  { id: "physical-13", text: "Hold a balance pose for 45 seconds", category: "Physical", difficulty: 2 },
  { id: "physical-14", text: "Take a 15-minute walk outdoors", category: "Physical", difficulty: 2 },
  { id: "physical-15", text: "Try five new stretches", category: "Physical", difficulty: 1 },
  { id: "physical-16", text: "Do 30 jumping jacks", category: "Physical", difficulty: 1 },
  { id: "physical-17", text: "Do a 3-minute plank variation", category: "Physical", difficulty: 3 },
  { id: "physical-18", text: "Practice posture checks for 5 minutes", category: "Physical", difficulty: 1 },
  { id: "physical-19", text: "Do a short mobility routine", category: "Physical", difficulty: 2 },
  { id: "physical-20", text: "Try a new sport drill", category: "Physical", difficulty: 3 },
  { id: "physical-21", text: "Walk without headphones for 10 minutes", category: "Physical", difficulty: 1 },
  { id: "physical-22", text: "Take a quick power walk break", category: "Physical", difficulty: 1 },
  { id: "physical-23", text: "Climb a small hill or stairs", category: "Physical", difficulty: 2 },
  { id: "physical-24", text: "Try a 5-minute core circuit", category: "Physical", difficulty: 2 },
  { id: "physical-25", text: "Do a 1-minute cold face splash", category: "Physical", difficulty: 2 },

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
  { id: "creative-11", text: "Create a doodle using only circles", category: "Creative", difficulty: 1 },
  { id: "creative-12", text: "Write a tiny poem about the weather", category: "Creative", difficulty: 1 },
  { id: "creative-13", text: "Design a postcard for your city", category: "Creative", difficulty: 2 },
  { id: "creative-14", text: "Create a 30-second soundtrack for your day", category: "Creative", difficulty: 2 },
  { id: "creative-15", text: "Write a one-paragraph story about a fox", category: "Creative", difficulty: 1 },
  { id: "creative-16", text: "Rearrange something in your space", category: "Creative", difficulty: 2 },
  { id: "creative-17", text: "Make a tiny paper sculpture", category: "Creative", difficulty: 3 },
  { id: "creative-18", text: "Create a mood board with 5 images", category: "Creative", difficulty: 2 },
  { id: "creative-19", text: "Write a list of 10 quirky ideas", category: "Creative", difficulty: 1 },
  { id: "creative-20", text: "Make a color palette from your surroundings", category: "Creative", difficulty: 1 },
  { id: "creative-21", text: "Draw a map of an imaginary place", category: "Creative", difficulty: 2 },
  { id: "creative-22", text: "Write a short letter to your future self", category: "Creative", difficulty: 1 },
  { id: "creative-23", text: "Design a sticker you would use", category: "Creative", difficulty: 2 },
  { id: "creative-24", text: "Create a 5-minute photo series", category: "Creative", difficulty: 2 },
  { id: "creative-25", text: "Write down three bold ideas", category: "Creative", difficulty: 3 },

  { id: "mindful-1", text: "Meditate for 5 minutes", category: "Mindful", difficulty: 1 },
  { id: "mindful-2", text: "Write down 3 things you are grateful for", category: "Mindful", difficulty: 1 },
  { id: "mindful-3", text: "Eat a meal with no phone", category: "Mindful", difficulty: 2 },
  { id: "mindful-4", text: "Take 10 slow, deep breaths", category: "Mindful", difficulty: 1 },
  { id: "mindful-5", text: "Notice 5 things you can see right now", category: "Mindful", difficulty: 1 },
  { id: "mindful-6", text: "Write a short intention for today", category: "Mindful", difficulty: 1 },
  { id: "mindful-7", text: "Step outside and listen for 2 minutes", category: "Mindful", difficulty: 1 },
  { id: "mindful-8", text: "Drink a glass of water mindfully", category: "Mindful", difficulty: 1 },
  { id: "mindful-9", text: "Do a body scan for 3 minutes", category: "Mindful", difficulty: 2 },
  { id: "mindful-10", text: "Write a kind note to yourself", category: "Mindful", difficulty: 1 },
  { id: "mindful-11", text: "Write one sentence about how you feel", category: "Mindful", difficulty: 1 },
  { id: "mindful-12", text: "Sit quietly for 2 minutes", category: "Mindful", difficulty: 1 },
  { id: "mindful-13", text: "Do a 3-minute breathing count", category: "Mindful", difficulty: 2 },
  { id: "mindful-14", text: "Name three sounds you hear", category: "Mindful", difficulty: 1 },
  { id: "mindful-15", text: "Write a gentle reminder to yourself", category: "Mindful", difficulty: 1 },
  { id: "mindful-16", text: "Take a mindful sip of tea or coffee", category: "Mindful", difficulty: 1 },
  { id: "mindful-17", text: "Pause and relax your shoulders", category: "Mindful", difficulty: 1 },
  { id: "mindful-18", text: "Go outside and feel the air for 1 minute", category: "Mindful", difficulty: 1 },
  { id: "mindful-19", text: "Write down one worry and release it", category: "Mindful", difficulty: 2 },
  { id: "mindful-20", text: "Try a 5-minute guided meditation", category: "Mindful", difficulty: 2 },
  { id: "mindful-21", text: "Do a slow stretch with steady breathing", category: "Mindful", difficulty: 1 },
  { id: "mindful-22", text: "Take a quiet walk without music", category: "Mindful", difficulty: 2 },
  { id: "mindful-23", text: "Write three things you did well today", category: "Mindful", difficulty: 1 },
  { id: "mindful-24", text: "Spend 5 minutes in silence", category: "Mindful", difficulty: 2 },
  { id: "mindful-25", text: "Notice one thing you can let go of", category: "Mindful", difficulty: 2 },

  { id: "random-1", text: "Say yes to the next thing someone asks", category: "Random", difficulty: 3 },
  { id: "random-2", text: "Wear something you never wear", category: "Random", difficulty: 2 },
  { id: "random-3", text: "Cook something you have never made", category: "Random", difficulty: 3 },
  { id: "random-4", text: "Use your non-dominant hand for 10 minutes", category: "Random", difficulty: 2 },
  { id: "random-5", text: "Try a new snack today", category: "Random", difficulty: 1 },
  { id: "random-6", text: "Take a different seat than usual", category: "Random", difficulty: 1 },
  { id: "random-7", text: "Sing one line from a song out loud", category: "Random", difficulty: 2 },
  { id: "random-8", text: "Do something kind anonymously", category: "Random", difficulty: 2 },
  { id: "random-9", text: "Write a tiny thank-you note and keep it", category: "Random", difficulty: 1 },
  { id: "random-10", text: "Swap your phone wallpaper", category: "Random", difficulty: 1 },
  { id: "random-11", text: "Learn one word in a new language", category: "Random", difficulty: 1 },
  { id: "random-12", text: "Eat dessert before dinner", category: "Random", difficulty: 2 },
  { id: "random-13", text: "Make a tiny wish list", category: "Random", difficulty: 1 },
  { id: "random-14", text: "Try a new pen or notebook", category: "Random", difficulty: 1 },
  { id: "random-15", text: "Do something in a new order today", category: "Random", difficulty: 1 },
  { id: "random-16", text: "Answer a question with a story", category: "Random", difficulty: 2 },
  { id: "random-17", text: "Take a photo of something you normally ignore", category: "Random", difficulty: 1 },
  { id: "random-18", text: "Eat a meal with chopsticks", category: "Random", difficulty: 2 },
  { id: "random-19", text: "Try a new playlist", category: "Random", difficulty: 1 },
  { id: "random-20", text: "Do a 10-minute digital detox", category: "Random", difficulty: 1 },
  { id: "random-21", text: "Change one small habit today", category: "Random", difficulty: 2 },
  { id: "random-22", text: "Try a new seating spot at home", category: "Random", difficulty: 1 },
  { id: "random-23", text: "Write a tiny list of curiosities", category: "Random", difficulty: 1 },
  { id: "random-24", text: "Pick a new podcast or episode", category: "Random", difficulty: 1 },
  { id: "random-25", text: "Give yourself a playful nickname", category: "Random", difficulty: 2 },

  { id: "kindness-1", text: "Leave a kind note for someone", category: "Kindness", difficulty: 1 },
  { id: "kindness-2", text: "Hold the door for three people", category: "Kindness", difficulty: 1 },
  { id: "kindness-3", text: "Send a thank-you message", category: "Kindness", difficulty: 1 },
  { id: "kindness-4", text: "Offer to help a friend with a task", category: "Kindness", difficulty: 2 },
  { id: "kindness-5", text: "Donate an item you no longer need", category: "Kindness", difficulty: 2 },
  { id: "kindness-6", text: "Leave a positive review for a small business", category: "Kindness", difficulty: 1 },
  { id: "kindness-7", text: "Make a small snack for someone", category: "Kindness", difficulty: 2 },
  { id: "kindness-8", text: "Give someone a sincere compliment", category: "Kindness", difficulty: 1 },
  { id: "kindness-9", text: "Send a funny meme to cheer someone up", category: "Kindness", difficulty: 1 },
  { id: "kindness-10", text: "Check in on a friend who is busy", category: "Kindness", difficulty: 2 },
  { id: "kindness-11", text: "Write a gratitude list for someone", category: "Kindness", difficulty: 1 },
  { id: "kindness-12", text: "Tip extra if you can", category: "Kindness", difficulty: 2 },
  { id: "kindness-13", text: "Offer your seat to someone", category: "Kindness", difficulty: 1 },
  { id: "kindness-14", text: "Pick up a small piece of litter", category: "Kindness", difficulty: 1 },
  { id: "kindness-15", text: "Send a voice note of encouragement", category: "Kindness", difficulty: 2 },
  { id: "kindness-16", text: "Give a thank-you to a service worker", category: "Kindness", difficulty: 1 },
  { id: "kindness-17", text: "Share a helpful resource", category: "Kindness", difficulty: 1 },
  { id: "kindness-18", text: "Offer to babysit or pet sit", category: "Kindness", difficulty: 3 },
  { id: "kindness-19", text: "Bring a treat to someone", category: "Kindness", difficulty: 2 },
  { id: "kindness-20", text: "Leave a kind note for yourself", category: "Kindness", difficulty: 1 },
  { id: "kindness-21", text: "Ask someone how you can help", category: "Kindness", difficulty: 2 },
  { id: "kindness-22", text: "Send a quick appreciation email", category: "Kindness", difficulty: 2 },
  { id: "kindness-23", text: "Donate to a small cause", category: "Kindness", difficulty: 3 },
  { id: "kindness-24", text: "Give a genuine thank-you in person", category: "Kindness", difficulty: 1 },
  { id: "kindness-25", text: "Write a short encouraging note", category: "Kindness", difficulty: 1 },

  { id: "adventure-1", text: "Take a new route to a familiar place", category: "Adventure", difficulty: 1 },
  { id: "adventure-2", text: "Try a new cafe or shop", category: "Adventure", difficulty: 2 },
  { id: "adventure-3", text: "Plan a mini day trip", category: "Adventure", difficulty: 3 },
  { id: "adventure-4", text: "Explore a nearby park", category: "Adventure", difficulty: 1 },
  { id: "adventure-5", text: "Walk in a neighborhood you do not know", category: "Adventure", difficulty: 2 },
  { id: "adventure-6", text: "Try a new activity class", category: "Adventure", difficulty: 3 },
  { id: "adventure-7", text: "Visit a local landmark", category: "Adventure", difficulty: 2 },
  { id: "adventure-8", text: "Bring a journal on a short outing", category: "Adventure", difficulty: 1 },
  { id: "adventure-9", text: "Take a photo walk for 20 minutes", category: "Adventure", difficulty: 2 },
  { id: "adventure-10", text: "Try a new dish at a restaurant", category: "Adventure", difficulty: 2 },
  { id: "adventure-11", text: "Visit a new bookstore or library", category: "Adventure", difficulty: 1 },
  { id: "adventure-12", text: "Find a hidden spot in your area", category: "Adventure", difficulty: 2 },
  { id: "adventure-13", text: "Take public transit to a new stop", category: "Adventure", difficulty: 2 },
  { id: "adventure-14", text: "Go on a sunrise or sunset walk", category: "Adventure", difficulty: 2 },
  { id: "adventure-15", text: "Try a new hiking trail", category: "Adventure", difficulty: 3 },
  { id: "adventure-16", text: "Go on a picnic somewhere new", category: "Adventure", difficulty: 2 },
  { id: "adventure-17", text: "Plan a spontaneous meetup", category: "Adventure", difficulty: 3 },
  { id: "adventure-18", text: "Take a scenic detour", category: "Adventure", difficulty: 1 },
  { id: "adventure-19", text: "Try a beginner friendly class", category: "Adventure", difficulty: 2 },
  { id: "adventure-20", text: "Visit a museum or gallery", category: "Adventure", difficulty: 2 },
  { id: "adventure-21", text: "Walk to a spot with a view", category: "Adventure", difficulty: 2 },
  { id: "adventure-22", text: "Try a new recipe from another cuisine", category: "Adventure", difficulty: 2 },
  { id: "adventure-23", text: "Spend 15 minutes exploring a map", category: "Adventure", difficulty: 1 },
  { id: "adventure-24", text: "Go on a small treasure hunt", category: "Adventure", difficulty: 2 },
  { id: "adventure-25", text: "Take a new route home", category: "Adventure", difficulty: 1 }
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
  Social: { background: "#FFE5E5", text: "#D4726A" },
  Physical: { background: "#E5F0FF", text: "#6A8FD4" },
  Creative: { background: "#FFF0E5", text: "#D4976A" },
  Mindful: { background: "#E5FFE8", text: "#6AD47A" },
  Random: { background: "#F0E5FF", text: "#9B6AD4" },
  Kindness: { background: "#FFE5F0", text: "#D46A8F" },
  Adventure: { background: "#E5F5FF", text: "#6ABED4" }
};
