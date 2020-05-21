/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import type from '@tsdotnet/type';

// Only used for primitives.
const typeInfoRegistry: { [key: string]: TypeInfo } = {};
const VOID0 = void 0;

/* eslint-disable @typescript-eslint/no-use-before-define */

/**
 * Exposes easy access to type information including inquiring about members.
 */
export class TypeInfo
{
	readonly type: string;
	readonly isBoolean: boolean = false;
	readonly isNumber: boolean = false;
	readonly isFinite: boolean = false;
	readonly isValidNumber: boolean = false;
	readonly isString: boolean = false;
	readonly isTrueNaN: boolean = false;
	readonly isObject: boolean = false;
	readonly isArray: boolean = false;
	readonly isArrayLike: boolean = false;
	readonly isFunction: boolean = false;
	readonly isUndefined: boolean = false;
	readonly isNull: boolean = false;
	readonly isNullOrUndefined: boolean = false;
	readonly isPrimitive: boolean = false;
	readonly isSymbol: boolean = false;

	// noinspection DuplicatedCode
	constructor (protected readonly target: any)
	{
		switch((this.type = typeof target))
		{
			case type.Value.Boolean:
				this.isBoolean = true;
				this.isPrimitive = true;
				break;
			case type.Value.Number:
				this.isNumber = true;
				this.isTrueNaN = isNaN(target);
				this.isFinite = isFinite(target);
				this.isValidNumber = !this.isTrueNaN;
				this.isPrimitive = true;
				break;
			case type.Value.String:
				this.isString = true;
				this.isPrimitive = true;
				break;
			case type.Value.Symbol:
				this.isSymbol = true;
				break;
			case type.Value.Object:
				if(target===null)
				{
					this.isNull = true;
					this.isNullOrUndefined = true;
					this.isPrimitive = true;
				}
				else
				{
					this.isObject = true;
					this.isArray = target instanceof Array;
					this.isArrayLike = this.isArray || type.isArrayLike(target);
				}
				break;
			case type.Value.Function:
				this.isFunction = true;
				break;
			case type.Value.Undefined:
				this.isUndefined = true;
				this.isNullOrUndefined = true;
				this.isPrimitive = true;
				break;
			default:
				throw new Error('Fatal type failure.  Unknown type: ' + this.type);
		}

		Object.freeze(this);
	}

	/**
	 * Returns a TypeInfo for any target object.
	 * If the target object is of a primitive type, it returns the TypeInfo instance assigned to that type.
	 * @param target
	 * @returns {TypeInfo}
	 */
	static for (target: any): TypeInfo
	{
		return typeInfo(target);
	}

	/**
	 * Returns a TypeInfo for any member or non-member,
	 * where non-members are of type undefined.
	 * @param name
	 * @returns {TypeInfo}
	 */
	member (name: string | number | symbol): TypeInfo
	{
		const t = this.target;
		const m = !this.isPrimitive && t && name in t ? t[name] : VOID0;
		return typeInfo(m);
	}

	/**
	 * Returns true if the target matches the type (instanceof).
	 * @param type
	 * @returns {boolean}
	 */
	is<T extends object> (type: new (...params: any[]) => T): boolean
	{
		const t = this.target;
		if(t==null) throw '\'type\' is null or undefined';
		return t instanceof type;
	}

	/**
	 * Returns null if the target does not match the type (instanceof).
	 * Otherwise returns the target as the type.
	 * @param type
	 * @returns {T|null}
	 */
	as<T extends object> (type: new (...params: any[]) => T): T | null
	{
		const t = this.target;
		if(t==null) throw '\'type\' is null or undefined';
		return t instanceof type ? t : null;
	}
}

/**
 * Returns a TypeInfo for any target object.
 * If the target object is of a primitive type, it returns the TypeInfo instance assigned to that type.
 * @param target
 * @returns {TypeInfo}
 */
export default function typeInfo (target: any): TypeInfo {
	const t: string = target===null ? 'null' : typeof target;
	switch(t)
	{
		case type.Value.Object:
		case type.Value.Function:
			return new TypeInfo(target);
	}
	let info = typeInfoRegistry[t];
	if(!info) typeInfoRegistry[t] = info = new TypeInfo(target);
	return info;
}
