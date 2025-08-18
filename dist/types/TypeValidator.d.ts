/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import typeInfo, { TypeInfo } from './TypeInfo';
export { typeInfo, TypeInfo };
export declare class TypeInfoHelper extends TypeInfo {
    contains<TDescriptor>(descriptor: unknown): this is TDescriptor;
}
export default class TypeValidator<T> {
    private readonly _typeDescriptor;
    constructor(_typeDescriptor: any);
    isSubsetOf(o: unknown): o is T;
}
