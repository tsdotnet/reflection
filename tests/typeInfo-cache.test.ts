import { describe, it, expect } from 'vitest';
import typeInfo from '../src/TypeInfo.js';

// typeInfo() shares one instance per primitive type; a number's flags depend on its value, so the shared instance
// must never carry the flags of the first number it saw.
describe('typeInfo shared primitive instances', () => {
	it('gives each kind of number its own flags, whatever came first', () => {
		for (const order of [[1, NaN, Infinity, -Infinity], [NaN, Infinity, 1, -Infinity], [Infinity, 1, NaN, -Infinity]]) {
			for (const n of order) {
				const info = typeInfo(n);
				expect(info.isNumber).toBe(true);
				expect(info.isTrueNaN).toBe(Number.isNaN(n));
				expect(info.isFinite).toBe(Number.isFinite(n));
				expect(info.isValidNumber).toBe(!Number.isNaN(n));
			}
		}
	});

	it('still shares instances for values of the same kind', () => {
		expect(typeInfo(1)).toBe(typeInfo(2.5));
		expect(typeInfo(NaN)).toBe(typeInfo(0 / 0));
		expect(typeInfo(Infinity)).toBe(typeInfo(-Infinity));
		expect(typeInfo('a')).toBe(typeInfo('b'));
		expect(typeInfo(1)).not.toBe(typeInfo(NaN));
	});

	it('creates a new instance for objects and functions', () => {
		expect(typeInfo({})).not.toBe(typeInfo({}));
		expect(typeInfo(() => 0).isFunction).toBe(true);
	});
});
