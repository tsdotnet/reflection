/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
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
    static for(target: unknown): TypeInfo;
    member(name: string | number | symbol): TypeInfo;
    is<T extends object>(type: new (...params: any[]) => T): boolean;
    as<T extends object>(type: new (...params: any[]) => T): T | null;
}
export default function typeInfo(target: unknown): TypeInfo;
