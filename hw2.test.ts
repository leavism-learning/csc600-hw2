// filterFiveItemRow.test.ts

import {
  filterFiveItemRow,
  dropFiveItemRow,
  fiveItemRow,
  mapFiveItemRow,
  wordle3SetGuess,
  wordle3UsedLetters,
  wordle3Update,
  Wordle3,
} from './hw2';
import { expect, test, describe, it } from 'bun:test';

type letter =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

describe('filterFiveItemRow function', () => {
  it('should return an empty array if no items match the condition', () => {
    const row: fiveItemRow<letter> = {
      entries: ['J', 'O', 'K', 'E', 'R'],
    };
    const result = filterFiveItemRow(row, (arg) => arg === 'Z');
    expect(result).toEqual([]);
  });

  it('should return an array containing items that match the condition', () => {
    const row: fiveItemRow<letter> = {
      entries: ['P', 'O', 'K', 'E', 'R'],
    };
    const result = filterFiveItemRow(row, (arg) => arg === 'K');
    expect(result).toEqual(['K']);
  });

  it('should return an array containing items that do not match the inverse condition', () => {
    const row: fiveItemRow<letter> = {
      entries: ['M', 'U', 'S', 'K', 'Y'],
    };
    const result = filterFiveItemRow(row, (arg) => arg !== 'K');
    expect(result).toEqual(['M', 'U', 'S', 'Y']);
  });

  it('should return an array containing multiple occurrences of an item', () => {
    const row: fiveItemRow<letter> = {
      entries: ['F', 'U', 'S', 'S', 'Y'],
    };
    const result = filterFiveItemRow(row, (arg) => arg === 'S');
    expect(result).toEqual(['S', 'S']);
  });

  it('should return an array containing multiple different items', () => {
    const row: fiveItemRow<letter> = {
      entries: ['H', 'O', 'U', 'S', 'E'],
    };
    const result = filterFiveItemRow(row, (arg) => arg === 'S' || arg === 'O');
    expect(result).toEqual(['O', 'S']);
  });
});

describe('dropFiveItemRow function', () => {
  const row1: fiveItemRow<string> = {
    entries: ['J', 'O', 'K', 'E', 'R'],
  };

  it('should return the same array if indices are empty', () => {
    const result = dropFiveItemRow(row1, []);
    expect(result).toEqual(['J', 'O', 'K', 'E', 'R']);
  });

  it('should return an array missing the last item', () => {
    const result = dropFiveItemRow(row1, [4]);
    expect(result).toEqual(['J', 'O', 'K', 'E']);
  });

  it('should return an array missing the elements at indices 3 and 2', () => {
    const result = dropFiveItemRow(row1, [3, 2]);
    expect(result).toEqual(['J', 'O', 'R']);
  });

  it('should return an array missing the elements at indices 1 and 2', () => {
    const result = dropFiveItemRow(row1, [1, 2]);
    expect(result).toEqual(['J', 'E', 'R']);
  });

  it('should return an array with only the last item', () => {
    const result = dropFiveItemRow(row1, [1, 2, 3, 0]);
    expect(result).toEqual(['R']);
  });
});

describe('mapFiveItemRow function', () => {
  const row1: fiveItemRow<string> = {
    entries: ['J', 'O', 'K', 'E', 'R'],
  };

  it('should map all elements to 0', () => {
    const result = mapFiveItemRow(row1, (arg) => 0);
    expect(result).toEqual({ entries: [0, 0, 0, 0, 0] });
  });

  it('should append ! to all elements', () => {
    const result = mapFiveItemRow(row1, (arg) => arg + '!');
    expect(result).toEqual({ entries: ['J!', 'O!', 'K!', 'E!', 'R!'] });
  });

  it('should map all elements to their length', () => {
    const result = mapFiveItemRow(row1, (arg) => arg.length);
    expect(result).toEqual({ entries: [1, 1, 1, 1, 1] });
  });

  // Additional Test Case: Map to same element (identity function)
  it('should map all elements to themselves', () => {
    const result = mapFiveItemRow(row1, (arg) => arg);
    expect(result).toEqual(row1);
  });

  // Additional Test Case: Map to their ASCII codes
  it('should map all elements to their ASCII codes', () => {
    const result = mapFiveItemRow(row1, (arg) => arg.charCodeAt(0));
    expect(result).toEqual({ entries: [74, 79, 75, 69, 82] });
  });
});

describe('mapFiveItemRow', () => {
  const row1: fiveItemRow<string> = {
    entries: ['J', 'O', 'K', 'E', 'R'],
  };

  test('should map every item to 0', () => {
    const result = mapFiveItemRow(row1, (arg) => 0);
    expect(result).toEqual({ entries: [0, 0, 0, 0, 0] });
  });

  test('should append "!" to every item', () => {
    const result = mapFiveItemRow(row1, (arg) => arg + '!');
    expect(result).toEqual({ entries: ['J!', 'O!', 'K!', 'E!', 'R!'] });
  });

  test('should map every item to its length', () => {
    const result = mapFiveItemRow(row1, (arg) => arg.length);
    expect(result).toEqual({ entries: [1, 1, 1, 1, 1] });
  });
});

describe('wordle3SetGuess function', () => {
  const wordle1: Wordle3 = {
    word: {
      entries: ['J', 'O', 'K', 'E', 'R'],
    },
    guesses: [
      {
        entries: [
          ['GUESS', 'M'],
          ['GUESS', 'U'],
          ['GUESS', 'S'],
          ['GUESS', 'K'],
          ['GUESS', 'Y'],
        ],
      },
      {
        entries: [
          ['GUESS', 'F'],
          ['GUESS', 'U'],
          ['GUESS', 'S'],
          ['GUESS', 'S'],
          ['GUESS', 'Y'],
        ],
      },
      {
        entries: [
          ['GUESS', 'H'],
          ['GUESS', 'O'],
          ['GUESS', 'U'],
          ['GUESS', 'S'],
          ['GUESS', 'E'],
        ],
      },
    ],
  };

  it('should set the first guess correctly', () => {
    const result = wordle3SetGuess(wordle1, 1, {
      entries: ['M', 'U', 'S', 'E', 'S'],
    });
    expect(result).toEqual({
      word: { entries: ['J', 'O', 'K', 'E', 'R'] },
      guesses: [
        {
          entries: [
            ['GUESS', 'M'],
            ['GUESS', 'U'],
            ['GUESS', 'S'],
            ['GUESS', 'E'],
            ['GUESS', 'S'],
          ],
        },
        {
          entries: [
            ['GUESS', 'F'],
            ['GUESS', 'U'],
            ['GUESS', 'S'],
            ['GUESS', 'S'],
            ['GUESS', 'Y'],
          ],
        },
        {
          entries: [
            ['GUESS', 'H'],
            ['GUESS', 'O'],
            ['GUESS', 'U'],
            ['GUESS', 'S'],
            ['GUESS', 'E'],
          ],
        },
      ],
    });
  });

  it('should set the second guess correctly', () => {
    const result = wordle3SetGuess(wordle1, 2, {
      entries: ['S', 'A', 'P', 'P', 'Y'],
    });
    expect(result).toEqual({
      word: { entries: ['J', 'O', 'K', 'E', 'R'] },
      guesses: [
        {
          entries: [
            ['GUESS', 'M'],
            ['GUESS', 'U'],
            ['GUESS', 'S'],
            ['GUESS', 'K'],
            ['GUESS', 'Y'],
          ],
        },
        {
          entries: [
            ['GUESS', 'S'],
            ['GUESS', 'A'],
            ['GUESS', 'P'],
            ['GUESS', 'P'],
            ['GUESS', 'Y'],
          ],
        },
        {
          entries: [
            ['GUESS', 'H'],
            ['GUESS', 'O'],
            ['GUESS', 'U'],
            ['GUESS', 'S'],
            ['GUESS', 'E'],
          ],
        },
      ],
    });
  });

  it('should set the third guess correctly', () => {
    const result = wordle3SetGuess(wordle1, 3, {
      entries: ['H', 'A', 'P', 'P', 'Y'],
    });
    expect(result).toEqual({
      word: { entries: ['J', 'O', 'K', 'E', 'R'] },
      guesses: [
        {
          entries: [
            ['GUESS', 'M'],
            ['GUESS', 'U'],
            ['GUESS', 'S'],
            ['GUESS', 'K'],
            ['GUESS', 'Y'],
          ],
        },
        {
          entries: [
            ['GUESS', 'F'],
            ['GUESS', 'U'],
            ['GUESS', 'S'],
            ['GUESS', 'S'],
            ['GUESS', 'Y'],
          ],
        },
        {
          entries: [
            ['GUESS', 'H'],
            ['GUESS', 'A'],
            ['GUESS', 'P'],
            ['GUESS', 'P'],
            ['GUESS', 'Y'],
          ],
        },
      ],
    });
  });
});

describe('wordle3UsedLetters function', () => {
  const wordle1: Wordle3 = {
    word: {
      entries: ['J', 'O', 'K', 'E', 'R'],
    },
    guesses: [
      {
        entries: [
          ['GUESS', 'M'],
          ['GUESS', 'U'],
          ['GUESS', 'S'],
          ['GUESS', 'K'],
          ['GUESS', 'Y'],
        ],
      },
      {
        entries: [
          ['GUESS', 'F'],
          ['GUESS', 'U'],
          ['GUESS', 'S'],
          ['GUESS', 'S'],
          ['GUESS', 'Y'],
        ],
      },
      {
        entries: [
          ['GUESS', 'H'],
          ['GUESS', 'O'],
          ['GUESS', 'U'],
          ['GUESS', 'S'],
          ['GUESS', 'E'],
        ],
      },
    ],
  };
  it('should return [K] for wordle1, guess 1', () => {
    const result = wordle3UsedLetters(wordle1, 1);
    expect(result).toEqual(['K']);
  });

  it('should return [] for wordle1, guess 2', () => {
    const result = wordle3UsedLetters(wordle1, 2);
    expect(result).toEqual([]);
  });

  it('should return [O, E] for wordle1, guess 3', () => {
    const result = wordle3UsedLetters(wordle1, 3);
    expect(result).toEqual(['O', 'E']);
  });
});

describe('wordle3Update function', () => {
  // Initial state of wordle1 and wordle2 should be defined here.
  const wordle1: Wordle3 = {
    word: {
      entries: ['J', 'O', 'K', 'E', 'R'],
    },
    guesses: [
      {
        entries: [
          ['GUESS', 'M'],
          ['GUESS', 'U'],
          ['GUESS', 'S'],
          ['GUESS', 'K'],
          ['GUESS', 'Y'],
        ],
      },
      {
        entries: [
          ['GUESS', 'F'],
          ['GUESS', 'U'],
          ['GUESS', 'S'],
          ['GUESS', 'S'],
          ['GUESS', 'Y'],
        ],
      },
      {
        entries: [
          ['GUESS', 'H'],
          ['GUESS', 'O'],
          ['GUESS', 'U'],
          ['GUESS', 'S'],
          ['GUESS', 'E'],
        ],
      },
    ],
  };

  const wordle2: Wordle3 = {
    word: {
      entries: ['J', 'O', 'K', 'E', 'R'],
    },
    guesses: [
      {
        entries: [
          ['GUESS', 'C'],
          ['GUESS', 'A'],
          ['GUESS', 'K'],
          ['GUESS', 'E'],
          ['GUESS', 'S'],
        ],
      },
      {
        entries: [
          ['GUESS', 'P'],
          ['GUESS', 'O'],
          ['GUESS', 'K'],
          ['GUESS', 'E'],
          ['GUESS', 'R'],
        ],
      },
      {
        entries: [
          ['GUESS', 'J'],
          ['GUESS', 'O'],
          ['GUESS', 'K'],
          ['GUESS', 'E'],
          ['GUESS', 'R'],
        ],
      },
    ],
  };

  const wordle1_1 = {
    word: { entries: ['J', 'O', 'K', 'E', 'R'] },
    guesses: [
      {
        entries: [
          ['RED', 'M'],
          ['RED', 'U'],
          ['RED', 'S'],
          ['GRAY', 'K'],
          ['RED', 'Y'],
        ],
      },
      {
        entries: [
          ['GUESS', 'F'],
          ['GUESS', 'U'],
          ['GUESS', 'S'],
          ['GUESS', 'S'],
          ['GUESS', 'Y'],
        ],
      },
      {
        entries: [
          ['GUESS', 'H'],
          ['GUESS', 'O'],
          ['GUESS', 'U'],
          ['GUESS', 'S'],
          ['GUESS', 'E'],
        ],
      },
    ],
  };

  const wordle1_2 = {
    word: { entries: ['J', 'O', 'K', 'E', 'R'] },
    guesses: [
      {
        entries: [
          ['RED', 'M'],
          ['RED', 'U'],
          ['RED', 'S'],
          ['GRAY', 'K'],
          ['RED', 'Y'],
        ],
      },
      {
        entries: [
          ['RED', 'F'],
          ['RED', 'U'],
          ['RED', 'S'],
          ['RED', 'S'],
          ['RED', 'Y'],
        ],
      },
      {
        entries: [
          ['GUESS', 'H'],
          ['GUESS', 'O'],
          ['GUESS', 'U'],
          ['GUESS', 'S'],
          ['GUESS', 'E'],
        ],
      },
    ],
  };

  const wordle1_3 = {
    word: { entries: ['J', 'O', 'K', 'E', 'R'] },
    guesses: [
      {
        entries: [
          ['RED', 'M'],
          ['RED', 'U'],
          ['RED', 'S'],
          ['GRAY', 'K'],
          ['RED', 'Y'],
        ],
      },
      {
        entries: [
          ['RED', 'F'],
          ['RED', 'U'],
          ['RED', 'S'],
          ['RED', 'S'],
          ['RED', 'Y'],
        ],
      },
      {
        entries: [
          ['RED', 'H'],
          ['GREEN', 'O'],
          ['RED', 'U'],
          ['RED', 'S'],
          ['GRAY', 'E'],
        ],
      },
    ],
  };

  const wordle2_1 = {
    word: { entries: ['J', 'O', 'K', 'E', 'R'] },
    guesses: [
      {
        entries: [
          ['RED', 'C'],
          ['RED', 'A'],
          ['GREEN', 'K'],
          ['GREEN', 'E'],
          ['RED', 'S'],
        ],
      },
      {
        entries: [
          ['GUESS', 'P'],
          ['GUESS', 'O'],
          ['GUESS', 'K'],
          ['GUESS', 'E'],
          ['GUESS', 'R'],
        ],
      },
      {
        entries: [
          ['GUESS', 'J'],
          ['GUESS', 'O'],
          ['GUESS', 'K'],
          ['GUESS', 'E'],
          ['GUESS', 'R'],
        ],
      },
    ],
  };

  const wordle2_2 = {
    word: { entries: ['J', 'O', 'K', 'E', 'R'] },
    guesses: [
      {
        entries: [
          ['RED', 'C'],
          ['RED', 'A'],
          ['GREEN', 'K'],
          ['GREEN', 'E'],
          ['RED', 'S'],
        ],
      },
      {
        entries: [
          ['RED', 'P'],
          ['GREEN', 'O'],
          ['GREEN', 'K'],
          ['GREEN', 'E'],
          ['GREEN', 'R'],
        ],
      },
      {
        entries: [
          ['GUESS', 'J'],
          ['GUESS', 'O'],
          ['GUESS', 'K'],
          ['GUESS', 'E'],
          ['GUESS', 'R'],
        ],
      },
    ],
  };

  const wordle2_3 = {
    word: { entries: ['J', 'O', 'K', 'E', 'R'] },
    guesses: [
      {
        entries: [
          ['RED', 'C'],
          ['RED', 'A'],
          ['GREEN', 'K'],
          ['GREEN', 'E'],
          ['RED', 'S'],
        ],
      },
      {
        entries: [
          ['RED', 'P'],
          ['GREEN', 'O'],
          ['GREEN', 'K'],
          ['GREEN', 'E'],
          ['GREEN', 'R'],
        ],
      },
      {
        entries: [
          ['GREEN', 'J'],
          ['GREEN', 'O'],
          ['GREEN', 'K'],
          ['GREEN', 'E'],
          ['GREEN', 'R'],
        ],
      },
    ],
  };

  it('updates wordle1 guess 1', () => {
    const result = wordle3Update(wordle1, 1);
    // Define the expected state for wordle1_1 here
    expect(result).toEqual(wordle1_1);
  });

  it('updates wordle1 guess 2', () => {
    const result = wordle3Update(wordle1_1, 2);
    // Define the expected state for wordle1_2 here
    expect(result).toEqual(wordle1_2);
  });

  it('updates wordle1 guess 3', () => {
    const result = wordle3Update(wordle1_2, 3);
    // Define the expected state for wordle1_3 here
    expect(result).toEqual(wordle1_3);
  });

  it('updates wordle2 guess 1', () => {
    const result = wordle3Update(wordle2, 1);
    // Define the expected state for wordle2_1 here
    expect(result).toEqual(wordle2_1);
  });

  it('updates wordle2 guess 2', () => {
    const result = wordle3Update(wordle2_1, 2);
    // Define the expected state for wordle2_2 here
    expect(result).toEqual(wordle2_2);
  });

  it('updates wordle2 guess 3', () => {
    const result = wordle3Update(wordle2_2, 3);
    // Define the expected state for wordle2_3 here
    expect(result).toEqual(wordle2_3);
  });
});
