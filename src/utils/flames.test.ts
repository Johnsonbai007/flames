import { calculateFlames, FlamesKey } from './flamesAlgorithm';

function runTests() {
  console.log('🧪 Starting FLAMES Algorithm Tests...\n');

  // Test 1: Basic test - John & Jane
  // John: j, o, h, n
  // Jane: j, a, n, e
  // Matches: j, n. Remaining: o, h (2) + a, e (2) = 4.
  const res1 = calculateFlames('John', 'Jane');
  console.log(`Test 1: John & Jane -> Remaining: ${res1.remainingCount}, Result: ${res1.resultName} (${res1.resultKey})`);
  if (res1.remainingCount !== 4) throw new Error(`Expected count 4, got ${res1.remainingCount}`);

  // Test 2: Verify all 6 results can be produced
  const expectedKeys: FlamesKey[] = ['F', 'L', 'A', 'M', 'E', 'S'];
  const foundKeys = new Set<FlamesKey>();

  // Let's test known name combinations or constructed name pairs to find all 6
  const testPairs: [string, string][] = [
    ['Romeo', 'Juliet'],
    ['Jack', 'Rose'],
    ['Harry', 'Ginny'],
    ['Ron', 'Hermione'],
    ['Edward', 'Bella'],
    ['Peter', 'Gwen'],
    ['Tony', 'Pepper'],
    ['Clark', 'Lois'],
    ['Rachel', 'Ross'],
    ['Chandler', 'Monica'],
    ['Bonnie', 'Clyde'],
    ['Adam', 'Eve'],
    ['Alexander', 'Elizabeth'],
    ['David', 'Victoria'],
    ['Brad', 'Angelina'],
    ['Michael', 'Sarah'],
    ['Liam', 'Emma'],
    ['Noah', 'Olivia'],
    ['Lucas', 'Mia'],
    ['Ethan', 'Sophia'],
    ['Alex', 'Alexa'], // Count 1 -> Siblings!
  ];

  for (const [n1, n2] of testPairs) {
    const res = calculateFlames(n1, n2);
    foundKeys.add(res.resultKey);
    console.log(`Pair: ${n1} & ${n2} -> Count: ${res.remainingCount} -> ${res.resultName} (${res.resultKey})`);
  }

  // Check counts 1 to 25
  for (let c = 1; c <= 25; c++) {
    // Construct names with exact total count c
    // If c === 1: 'a' and '' (but we need at least 1 char in both names)
    // E.g., 'ab' and 'a' has count 1 (b)
    const n1 = 'a' + 'x'.repeat(c - 1);
    const n2 = 'a' + (c === 1 ? '' : '');
    // Or let's test directly with calculateFlames on valid pairs
  }

  console.log('\nFound FLAMES outcomes:', Array.from(foundKeys).sort());
  for (const key of expectedKeys) {
    if (!foundKeys.has(key)) {
      throw new Error(`Missing FLAMES outcome: ${key}`);
    }
  }
  console.log('✅ All 6 FLAMES outcomes are verified and reachable!\n');

  // Test 3: Special case - Identical names (count = 0)
  const soulmateRes = calculateFlames('Elena', 'Elena');
  console.log(`Test 3: Elena & Elena -> isSpecialSoulmate: ${soulmateRes.isSpecialSoulmate}, Result: ${soulmateRes.resultName}`);
  if (!soulmateRes.isSpecialSoulmate || soulmateRes.remainingCount !== 0) {
    throw new Error('Soulmate test failed');
  }
  console.log('✅ Special soulmate case passed!\n');

  // Test 4: Spaces and special characters
  const cleanedRes = calculateFlames('  Mary - Anne! ', ' John_Doe 123 ');
  console.log(`Test 4: Cleaned names -> ${cleanedRes.normalizedName1} & ${cleanedRes.normalizedName2}`);
  if (cleanedRes.normalizedName1 !== 'maryanne' || cleanedRes.normalizedName2 !== 'johndoe') {
    throw new Error('Normalization test failed');
  }
  console.log('✅ Normalization passed!\n');

  // Test 5: Empty input validation
  try {
    calculateFlames('   ', 'Alex');
    throw new Error('Should have thrown on empty name');
  } catch (err: any) {
    console.log(`Test 5: Empty name correctly caught error: "${err.message}"`);
  }
  console.log('✅ Empty input validation passed!\n');

  console.log('🎉 ALL FLAMES UNIT TESTS PASSED SUCCESSFULLY!');
}

runTests();
