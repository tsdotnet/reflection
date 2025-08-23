/* eslint-disable @typescript-eslint/ban-types */
import { describe, it, expect } from 'vitest';
import TypeValidator, {TypeInfoHelper} from '../src/TypeValidator';

const example = new TypeInfoHelper({
	a: {},
	b: 'hello',
	c: 1,
	d: true,
	e: {
		f: 'whatever',
		g: false,
		h: [
			0,
			1,
			'2'
		]
	},
	i: 'noise'
});

describe('.contains(descriptor)', () => {
	it('should detect a positive match', () => {
		expect(example.contains({
			a: Object,
			b: String,
			c: Number,
			d: Boolean,
			e: {
				f: String,
				g: Boolean,
				h: Array
			}
		})).toBe(true);

		expect(example.contains({
			a: Object,
			b: String,
			c: Number,
			d: Boolean,
			e: {
				f: String,
				g: Boolean,
				h: [
					Number,
					Number,
					String
				]
			}
		})).toBe(true);

		expect(example.contains({
			a: Object,
			b: String,
			c: Number,
			d: Boolean,
			e: {
				f: String,
				g: Boolean,
				h: [
					Number,
					Number,
					String
				]
			},
			i: 'noise'
		})).toBe(true);

		expect(example.contains({
			a: Object,
			b: String,
			c: Number,
			d: Boolean,
			e: {
				f: String,
				g: Boolean,
				h: [
					Number
				]
			}
		})).toBe(true);
	});

	it('should detect a negative match', () => {
		expect(!example.contains({
			a: Object,
			b: String,
			c: Number,
			d: Boolean,
			e: {
				f: String,
				g: Boolean,
				h: [
					Number,
					Boolean,
					String
				]
			}
		})).toBe(true);

		expect(!example.contains({
			a: Object,
			b: String,
			c: Number,
			d: Boolean,
			e: {
				f: String,
				g: Boolean,
				h: [
					String
				]
			}
		})).toBe(true);


		expect(!example.contains({
			a: Object,
			b: String,
			c: Number,
			d: Boolean,
			e: {
				f: String,
				g: Boolean,
				h: [
					Number
				]
			},
			i: 'goo'
		})).toBe(true);

		expect(!example.contains({
			a: Object,
			b: String,
			c: Number,
			d: Boolean,
			e: {
				f: String,
				g: Boolean,
				h: [
					Number
				]
			},
			i: Boolean
		})).toBe(true);
	});
});

describe('Example', () =>
	it('should work', () => {

		// Step 1: Declare the expected type/interface.
		interface MyType
		{
			a: object;
			b: string;
			c: number;
			d: boolean;
			e: {
				f: string;
				g: boolean;
				h: [
					number,
					boolean,
					string
				];
			};
		}

		// Step 2: Copy the interface as an actual object and <type> the validator
		const myTypeValidator = new TypeValidator<MyType>(
			{
				a: Object,
				b: String,
				c: Number,
				d: Boolean,
				e: {
					f: String,
					g: Boolean,
					h: [
						Number,
						Boolean,
						String
					]
				}
			}
		);

		// Step 3: validate as many times as you want:
		const myItem = {
			a: {},
			b: 'hello',
			c: 1,
			d: true,
			e: {
				f: 'whatever',
				g: false,
				h: [
					0,
					true,
					'2'
				]
			},
			i: 'noise'
		};

		// no compile-time type errors!
		const result = myTypeValidator.isSubsetOf(myItem);
		expect(result).toBe(true);
		if(result)
		{
			expect(myItem.e.h.length).equal(3);
			expect(myItem.b).equal('hello');
		}

		expect(!myTypeValidator.isSubsetOf(true)).toBe(true);
		expect(!myTypeValidator.isSubsetOf('no')).toBe(true);
		expect(!myTypeValidator.isSubsetOf({
			a: {},
			b: 'hello'
		})).toBe(true);

	})
);

describe('Complex test', () =>
	it('should work', () => {
		interface System
		{
			volume_str: string;
			buy: boolean;
			issued: string;
			price: number;
			volumeEntered: number;
			minVolume: number;
			volume: number;
			range: string;
			href: string;
			duration_str: string;
			location: {
				id_str: string;
				href: string;
				id: number;
				name: string;
			};
			duration: number;
			minVolume_str: string;
			volumeEntered_str: string;
			type: {
				id_str: string;
				href: string;
				id: number;
				name: string;
			};
			id: number;
			id_str: string;
		}

		const systemTypeValidator = new TypeValidator<System>({
			volume_str: String,
			buy: Boolean,
			issued: String,
			price: Number,
			volumeEntered: Number,
			minVolume: Number,
			volume: Number,
			range: String,
			href: String,
			duration_str: String,
			location: {
				id_str: String,
				href: String,
				id: Number,
				name: String
			},
			duration: Number,
			minVolume_str: String,
			volumeEntered_str: String,
			type: {
				id_str: String,
				href: String,
				id: Number,
				name: String
			},
			id: Number,
			id_str: String
		});

		//noinspection SpellCheckingInspection
		expect(systemTypeValidator.isSubsetOf(
			{
				'volume_str': '590653',
				'buy': false,
				'issued': '2016-04-03T06:18:39',
				'price': 4.96,
				'volumeEntered': 1090653,
				'minVolume': 1,
				'volume': 590653,
				'range': 'region',
				'href': 'https://crest-tq.eveonline.com/market/10000007/orders/4490918296/',
				'duration_str': '90',
				'location': {
					'id_str': '61000748',
					'href': 'https://crest-tq.eveonline.com/universe/locations/61000748/',
					'id': 61000748,
					'name': 'I6-SYN I - MegaAdmiral respect obelisk'
				},
				'duration': 90,
				'minVolume_str': '1',
				'volumeEntered_str': '1090653',
				'type': {
					'id_str': '34',
					'href': 'https://crest-tq.eveonline.com/types/34/',
					'id': 34,
					'name': 'Tritanium'
				},
				'id': 4490918296,
				'id_str': '4490918296'
			}
		)).toBe(true);

	}));

	describe('direct constructor validation', () => {
		it('should validate Object constructor directly', () => {
			// Test the specific case that covers line 39 in TypeValidator.ts
			const objectValidator = new TypeInfoHelper({});
			expect(objectValidator.contains(Object)).toBe(true);
			
			const nonObjectValidator = new TypeInfoHelper(42);
			expect(nonObjectValidator.contains(Object)).toBe(false);
			
			const nullValidator = new TypeInfoHelper(null);
			expect(nullValidator.contains(Object)).toBe(false);
			
			const arrayValidator = new TypeInfoHelper([]);
			expect(arrayValidator.contains(Object)).toBe(true); // Arrays are objects in JS
		});

		it('should validate other constructors directly', () => {
			const stringValidator = new TypeInfoHelper('test');
			expect(stringValidator.contains(String)).toBe(true);
			expect(stringValidator.contains(Object)).toBe(false);
			
			const numberValidator = new TypeInfoHelper(123);
			expect(numberValidator.contains(Number)).toBe(true);
			expect(numberValidator.contains(Object)).toBe(false);
			
			const booleanValidator = new TypeInfoHelper(true);
			expect(booleanValidator.contains(Boolean)).toBe(true);
			expect(booleanValidator.contains(Object)).toBe(false);
			
			const functionValidator = new TypeInfoHelper(() => {});
			expect(functionValidator.contains(Function)).toBe(true);
			expect(functionValidator.contains(Object)).toBe(false);
			
			const arrayValidator = new TypeInfoHelper([1, 2, 3]);
			expect(arrayValidator.contains(Array)).toBe(true);
			expect(arrayValidator.contains(Object)).toBe(true);
		});
	});
