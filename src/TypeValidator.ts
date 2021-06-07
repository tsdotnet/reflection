/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import typeInfo, {TypeInfo} from './TypeInfo';
import areEqual from '@tsdotnet/compare/dist/areEqual';

export {typeInfo};

/**
 * A descriptor is simply a JSON tree that either has an actual value or a type that identifies what the expect type should be at that leaf in the tree.
 *
 * var descriptor = {
 *      a : Object,
 *      b : String,
 *      c : {
 *          d : true ,
 *          e : Array,
 *          f : []
 *      },
 *      g : "literal"
 * }
 */
export class TypeInfoHelper
	extends TypeInfo
{
	contains<TDescriptor> (descriptor: unknown): this is TDescriptor
	{
		const value = this.target;

		// works with literals and values.
		if(value===descriptor) return true;

		// First check against simple types.
		switch(descriptor)
		{
			case Function:
				return this.isFunction;
			case Object:
				return this.isObject;
			case Array:
				return this.isArray;
			case String:
				return this.isString;
			case Number:
				return this.isNumber;
			case Boolean:
				return this.isBoolean;
		}

		if(this.type!== typeof descriptor || (this.isPrimitive && !areEqual(value, descriptor))) return false;

		// Check array contents and confirm intersections.
		if(this.isArrayLike && descriptor instanceof Array)
		{
			const vLen = value.length as number, dLen = descriptor.length;
			if(vLen!==dLen && (isNaN(vLen) || vLen<dLen)) return false;
			for(let i = 0; i<descriptor.length; i++)
			{
				if(areInvalid(value[i], descriptor[i])) return false;
			}

			return true;
		}

		if(this.isObject)
		{
			const targetKeys = Object.keys(value);
			const dKeys = Object.keys(descriptor as any);

			// Quick check...
			if(dKeys.length>targetKeys.length) return false;

			// Quick check #2...
			for(const key of dKeys)
			{
				if(targetKeys.indexOf(key)=== -1) return false;
			}

			// Final pass with recursive...
			for(const key of dKeys)
			{
				if(areInvalid(value[key], (descriptor as any)[key])) return false;
			}
		}

		return true;
	}
}

/**
 * A class for validating if an object matches the type profile of a descriptor.
 */
export default class TypeValidator<T>
{
	constructor (private readonly _typeDescriptor: any)
	{
		Object.freeze(this);
	}

	/**
	 * Returns true if the parameter matches the descriptor.
	 * @param o
	 * @returns {o is T}
	 */
	isSubsetOf (o: unknown): o is T
	{
		return new TypeInfoHelper(o).contains(this._typeDescriptor);
	}
}


function areInvalid (v: any, d: any): boolean
{
	if(!areEqual(v, d))
	{
		const memberType = new TypeInfoHelper(v);
		if(!memberType.contains(d)) return true;
	}
	return false;
}
