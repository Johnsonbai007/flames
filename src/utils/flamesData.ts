import { FlamesKey } from './flamesAlgorithm';

export interface FlamesDetail {
  key: FlamesKey;
  name: string;
  emoji: string;
  badge: string;
  tagline: string;
  description: string;
  quote: string;
  advice: string;
  compatibilityScore: number;
  stats: {
    chemistry: number;
    trust: number;
    passion: number;
    longevity: number;
  };
  theme: {
    gradient: string;
    border: string;
    glow: string;
    badgeBg: string;
    badgeText: string;
    accentColor: string;
    iconColor: string;
    cardBg: string;
  };
}

export const FLAMES_DETAILS: Record<FlamesKey, FlamesDetail> = {
  F: {
    key: 'F',
    name: 'Friends',
    emoji: '🤝',
    badge: 'Unbreakable Friendship',
    tagline: 'Partners in crime, confidants for a lifetime.',
    description:
      'The cosmic alignment between you two points to an extraordinary, golden friendship! You share an unspoken comfort zone where laughter flows effortlessly, secrets are safe forever, and you can truly be your authentic selves without fear of judgment. While the stars say friendship first, remember that the most legendary romances throughout history blossomed from the bedrock of best friendship.',
    quote: '“A real friend is one who walks in when the rest of the world walks out.”',
    advice:
      'Cherish this effortless bond! Celebrate your inside jokes, take spontaneous road trips, and support each other’s wild dreams. If sparks ever ignite into something more, you already possess the strongest foundation in the universe.',
    compatibilityScore: 88,
    stats: {
      chemistry: 82,
      trust: 98,
      passion: 70,
      longevity: 96,
    },
    theme: {
      gradient: 'from-amber-500 via-orange-500 to-rose-500',
      border: 'border-amber-400/40',
      glow: 'shadow-[0_0_50px_rgba(245,158,11,0.35)]',
      badgeBg: 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-400/50',
      badgeText: 'text-amber-300',
      accentColor: '#f59e0b',
      iconColor: 'text-amber-400',
      cardBg: 'from-amber-950/40 via-stone-900/60 to-purple-950/40',
    },
  },
  L: {
    key: 'L',
    name: 'Love',
    emoji: '💖',
    badge: 'Soulmate Romance',
    tagline: 'A breathtaking love story written among the stars.',
    description:
      'Cupid’s arrow has struck with pinpoint celestial precision! Your connection vibrates with intoxicating passion, electric chemistry, and heart-melting tenderness. When your eyes meet, the noise of the entire world fades away into a symphony of romantic wonder. You make each other feel invincible, deeply cherished, and magnetic.',
    quote: '“In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.” — Maya Angelou',
    advice:
      'Wear your heart boldly on your sleeve! Never let the magic turn into routine. Write sweet surprise love notes, plan candlelit dates, dance together in the living room, and celebrate every milestone of this beautiful journey.',
    compatibilityScore: 99,
    stats: {
      chemistry: 99,
      trust: 94,
      passion: 98,
      longevity: 95,
    },
    theme: {
      gradient: 'from-rose-500 via-pink-500 to-purple-600',
      border: 'border-rose-400/50',
      glow: 'shadow-[0_0_60px_rgba(244,63,94,0.45)]',
      badgeBg: 'bg-gradient-to-r from-rose-500/20 to-pink-500/20 border-rose-400/50',
      badgeText: 'text-rose-300',
      accentColor: '#f43f5e',
      iconColor: 'text-rose-400',
      cardBg: 'from-rose-950/50 via-pink-950/30 to-purple-950/50',
    },
  },
  A: {
    key: 'A',
    name: 'Affection',
    emoji: '🥰',
    badge: 'Gentle Tender Bond',
    tagline: 'Warm cuddles, heartfelt loyalty, and endless caring.',
    description:
      'Your hearts resonate with deep, heartwarming affection! This is not just a passing fleeting crush; it is a profound warmth, unconditional caring, and genuine admiration. You instinctively look out for each other, notice the small details others miss, and provide a comforting sanctuary of warmth in an unpredictable world.',
    quote: '“To love and be loved is to feel the sun from both sides.” — David Viscott',
    advice:
      'Express your adoration freely and often! Small gestures—bringing their favorite warm tea, wrapping them in a hug after a long day, or sending a sweet midday message—will make this affection bloom into a garden of lifelong devotion.',
    compatibilityScore: 92,
    stats: {
      chemistry: 89,
      trust: 95,
      passion: 85,
      longevity: 93,
    },
    theme: {
      gradient: 'from-fuchsia-500 via-pink-400 to-rose-400',
      border: 'border-pink-400/40',
      glow: 'shadow-[0_0_50px_rgba(236,72,153,0.35)]',
      badgeBg: 'bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 border-pink-400/50',
      badgeText: 'text-pink-300',
      accentColor: '#ec4899',
      iconColor: 'text-pink-400',
      cardBg: 'from-pink-950/40 via-fuchsia-950/30 to-purple-950/40',
    },
  },
  M: {
    key: 'M',
    name: 'Marriage',
    emoji: '💍',
    badge: 'Eternal Destiny',
    tagline: 'Till the stars burn out: A sacred lifelong union.',
    description:
      'The sacred wedding bells are ringing across the cosmos! Your connection transcends ordinary romance—it carries the gravitas and beauty of a forever partnership. You possess complementary values, mutual respect, and the rare ability to build a harmonious home and dream future side-by-side.',
    quote: '“Whatever our souls are made of, his and mine are the same.” — Emily Brontë',
    advice:
      'You have found your anchor in the stormy sea of life. Keep dreaming together, plan your adventures, build shared goals, and treat your union as the precious masterwork it is. Forever is just the beginning!',
    compatibilityScore: 97,
    stats: {
      chemistry: 93,
      trust: 99,
      passion: 91,
      longevity: 100,
    },
    theme: {
      gradient: 'from-amber-400 via-yellow-500 to-rose-400',
      border: 'border-amber-300/50',
      glow: 'shadow-[0_0_60px_rgba(251,191,36,0.4)]',
      badgeBg: 'bg-gradient-to-r from-amber-400/20 to-yellow-500/20 border-amber-300/50',
      badgeText: 'text-amber-200',
      accentColor: '#fbbf24',
      iconColor: 'text-amber-300',
      cardBg: 'from-amber-950/50 via-yellow-950/30 to-stone-900/60',
    },
  },
  E: {
    key: 'E',
    name: 'Enemies',
    emoji: '⚡',
    badge: 'Fiery Frenemies',
    tagline: 'Sparks fly, tempers clash, but tension never fades.',
    description:
      'Brace yourself for pure fireworks! Your energies collide with dramatic intensity—you challenge, provoke, and debate each other like classic anime rivals or star-crossed foes. Yet underneath all that stubborn bantering and fierce competitive tension lies an undeniable electric spark that neither of you can easily look away from.',
    quote: '“There is a thin line between love and hate, and we dance across it every single day.”',
    advice:
      'Channel that explosive energy with humor! Don’t let pride stand between you. If you learn to compromise and listen to each other with empathy, the classic "enemies to lovers" arc will be your greatest romantic adventure yet.',
    compatibilityScore: 74,
    stats: {
      chemistry: 95,
      trust: 68,
      passion: 94,
      longevity: 72,
    },
    theme: {
      gradient: 'from-violet-600 via-purple-700 to-rose-600',
      border: 'border-violet-500/40',
      glow: 'shadow-[0_0_55px_rgba(139,92,246,0.4)]',
      badgeBg: 'bg-gradient-to-r from-violet-600/20 to-rose-600/20 border-violet-400/50',
      badgeText: 'text-violet-300',
      accentColor: '#a855f7',
      iconColor: 'text-violet-400',
      cardBg: 'from-purple-950/60 via-violet-950/40 to-stone-900/60',
    },
  },
  S: {
    key: 'S',
    name: 'Siblings',
    emoji: '🧸',
    badge: 'Protective Family Bond',
    tagline: 'Playful teasing, fierce loyalty, and constant support.',
    description:
      'The cosmic alignment reveals a pure, protective sibling-style kinship! You share an intuitive understanding, love teasing each other relentlessly, and will drop everything to defend one another against the rest of the world. It’s an affectionate, wholesome dynamic grounded in unconditional acceptance.',
    quote: '“We may fight like cats and dogs, but we stand together like lions.”',
    advice:
      'Celebrate this heartwarming camaraderie! Be each other’s biggest cheerleader, share silly memes, and know that you have someone in your corner who will always tell you the truth with total love.',
    compatibilityScore: 84,
    stats: {
      chemistry: 75,
      trust: 97,
      passion: 60,
      longevity: 99,
    },
    theme: {
      gradient: 'from-teal-400 via-cyan-500 to-indigo-500',
      border: 'border-teal-400/40',
      glow: 'shadow-[0_0_50px_rgba(45,212,191,0.35)]',
      badgeBg: 'bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border-teal-400/50',
      badgeText: 'text-teal-300',
      accentColor: '#2dd4bf',
      iconColor: 'text-teal-400',
      cardBg: 'from-teal-950/40 via-cyan-950/30 to-indigo-950/40',
    },
  },
};
