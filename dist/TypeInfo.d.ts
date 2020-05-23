/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
/**
 * Exposes easy access to type information including inquiring about members.
 */
export declare class TypeInfo {
    protected readonly target: any;
    readonly type: string;
    readonly isBoolean: boolean;
    readonly isNumber: boolean;
    readonly isFinite: boolean;
    readonly isValidNumber: boolean;
    readonly isString: boolean;
    readonly isTrueNaN: boolean;
    readonly isObject: boolean;
    readonly isArray: boolean;
    readonly isArrayLike: boolean;
    readonly isFunction: boolean;
    readonly isUndefined: boolean;
    readonly isNull: boolean;
    readonly isNullOrUndefined: boolean;
    readonly isPrimitive: boolean;
    readonly isSymbol: boolean;
    constructor(target: any);
    /**
     * Returns a TypeInfo for any target object.
     * If the target object is of a primitive type, it returns the TypeInfo instance assigned to that type.
     * @param target
     * @returns {TypeInfo}
     */
    static for(target: unknown): TypeInfo;
    /**
     * Returns a TypeInfo for any member or non-member,
     * where non-members are of type undefined.
     * @param name
     * @returns {TypeInfo}
     */
    member(name: string | number | symbol): TypeInfo;
    /**
     * Returns true if the target matches the type (instanceof).
     * @param type
     * @returns {boolean}
     */
    is<T extends object>(type: new (...params: any[]) => T): boolean;
    /**
     * Returns null if the target does not match the type (instanceof).
     * Otherwise returns the target as the type.
     * @param type
     * @returns {T|null}
     */
    as<T extends object>(type: new (...params: any[]) => T): T | null;
}
/**
 * Returns a TypeInfo for any target object.
 * If the target object is of a primitive type, it returns the TypeInfo instance assigned to that type.
 * @param target
 * @returns {TypeInfo}
 */
export default function typeInfo(target: unknown): TypeInfo;
