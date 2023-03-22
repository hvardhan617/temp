import { test } from 'vitest';
import { checkInCart } from './QuantityHelper';
import { expect, it } from 'vitest';

// it('toUpperCase', () => {
//   const result = toUpperCase('foobar')
//   expect(result).toMatchSnapshot()
// })

test('check if item is already in cart', () => {
  expect(checkInCart([{ pid: 1 }, { pid: 2 }, { pid: 3 }], 2).alreadyInCart).toBe(true);
  expect(checkInCart([{ pid: 1 }, { pid: 2 }, { pid: 3 }], 4).alreadyInCart).toBe(false);
});
