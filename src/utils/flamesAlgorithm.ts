export type FlamesKey = 'F' | 'L' | 'A' | 'M' | 'E' | 'S';

export interface EliminationStep {
  round: number;
  lettersBefore: FlamesKey[];
  startIndex: number;
  count: number;
  eliminatedIndex: number;
  eliminatedLetter: FlamesKey;
  lettersAfter: FlamesKey[];
  nextStartIndex: number;
}

export interface StruckLetter {
  char: string;
  isStruck: boolean;
}

export interface FlamesResult {
  yourName: string;
  partnerName: string;
  normalizedName1: string;
  normalizedName2: string;
  struckLetters1: StruckLetter[];
  struckLetters2: StruckLetter[];
  remainingLetters1: string[];
  remainingLetters2: string[];
  commonLetters: string[];
  remainingCount: number;
  isSpecialSoulmate: boolean;
  resultKey: FlamesKey;
  resultName: string;
  eliminationSteps: EliminationStep[];
}

export const FLAMES_NAMES: Record<FlamesKey, string> = {
  F: 'Friends',
  L: 'Love',
  A: 'Affection',
  M: 'Marriage',
  E: 'Enemies',
  S: 'Siblings',
};

/**
 * Calculates the FLAMES relationship using the authentic traditional algorithm.
 */
export function calculateFlames(name1: string, name2: string): FlamesResult {
  const clean1 = name1.trim();
  const clean2 = name2.trim();

  // Normalize by keeping only alphabetic characters
  const norm1 = clean1.toLowerCase().replace(/[^a-z]/g, '');
  const norm2 = clean2.toLowerCase().replace(/[^a-z]/g, '');

  if (!norm1 || !norm2) {
    throw new Error('Please enter valid names containing letters.');
  }

  // Count letter frequencies
  const freq1: Record<string, number> = {};
  const freq2: Record<string, number> = {};

  for (const c of norm1) freq1[c] = (freq1[c] || 0) + 1;
  for (const c of norm2) freq2[c] = (freq2[c] || 0) + 1;

  // Track letters to strike out from both
  const toStrike1: Record<string, number> = {};
  const toStrike2: Record<string, number> = {};
  const commonLetters: string[] = [];

  for (const c in freq1) {
    if (freq2[c]) {
      const common = Math.min(freq1[c], freq2[c]);
      toStrike1[c] = common;
      toStrike2[c] = common;
      for (let i = 0; i < common; i++) {
        commonLetters.push(c);
      }
    }
  }

  // Build letter-by-letter strikeout representation for name 1
  const strikesLeft1 = { ...toStrike1 };
  const struckLetters1: StruckLetter[] = [];
  const remainingLetters1: string[] = [];

  for (const char of norm1) {
    if (strikesLeft1[char] && strikesLeft1[char] > 0) {
      struckLetters1.push({ char, isStruck: true });
      strikesLeft1[char]--;
    } else {
      struckLetters1.push({ char, isStruck: false });
      remainingLetters1.push(char);
    }
  }

  // Build letter-by-letter strikeout representation for name 2
  const strikesLeft2 = { ...toStrike2 };
  const struckLetters2: StruckLetter[] = [];
  const remainingLetters2: string[] = [];

  for (const char of norm2) {
    if (strikesLeft2[char] && strikesLeft2[char] > 0) {
      struckLetters2.push({ char, isStruck: true });
      strikesLeft2[char]--;
    } else {
      struckLetters2.push({ char, isStruck: false });
      remainingLetters2.push(char);
    }
  }

  const remainingCount = remainingLetters1.length + remainingLetters2.length;

  // Handle special case where all letters cancel out (count === 0)
  if (remainingCount === 0) {
    return {
      yourName: clean1,
      partnerName: clean2,
      normalizedName1: norm1,
      normalizedName2: norm2,
      struckLetters1,
      struckLetters2,
      remainingLetters1,
      remainingLetters2,
      commonLetters,
      remainingCount: 0,
      isSpecialSoulmate: true,
      resultKey: 'L',
      resultName: 'Love (Soulmates)',
      eliminationSteps: [],
    };
  }

  // Traditional circular elimination
  const letters: FlamesKey[] = ['F', 'L', 'A', 'M', 'E', 'S'];
  const eliminationSteps: EliminationStep[] = [];
  let startIndex = 0;
  let round = 1;

  while (letters.length > 1) {
    const lettersBefore = [...letters];
    // Calculate index to eliminate (0-indexed)
    const eliminatedIndex = (startIndex + remainingCount - 1) % letters.length;
    const eliminatedLetter = letters[eliminatedIndex];

    // Remove the letter
    letters.splice(eliminatedIndex, 1);

    // The next round starts from the position immediately following the eliminated letter
    const nextStartIndex = letters.length > 0 ? eliminatedIndex % letters.length : 0;

    eliminationSteps.push({
      round,
      lettersBefore,
      startIndex,
      count: remainingCount,
      eliminatedIndex,
      eliminatedLetter,
      lettersAfter: [...letters],
      nextStartIndex,
    });

    startIndex = nextStartIndex;
    round++;
  }

  const finalKey = letters[0];

  return {
    yourName: clean1,
    partnerName: clean2,
    normalizedName1: norm1,
    normalizedName2: norm2,
    struckLetters1,
    struckLetters2,
    remainingLetters1,
    remainingLetters2,
    commonLetters,
    remainingCount,
    isSpecialSoulmate: false,
    resultKey: finalKey,
    resultName: FLAMES_NAMES[finalKey],
    eliminationSteps,
  };
}
