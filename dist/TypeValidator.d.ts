/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import typeInfo, { TypeInfo } from './TypeInfo';
export { typeInfo };
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
export declare class TypeInfoHelper extends TypeInfo {
    contains<TDescriptor>(descriptor: any): this is TDescriptor;
}
/**
 * A class for validating if an object matches the type profile of a descriptor.
 */
export default class TypeValidator<T> {
    private readonly _typeDescriptor;
    constructor(_typeDescriptor: any);
    /**
     * Returns true if the parameter matches the descriptor.
     * @param o
     * @returns {o is T}
     */
    isSubsetOf(o: any): o is T;
}
