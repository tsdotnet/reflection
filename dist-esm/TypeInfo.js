/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
import type from '@tsdotnet/compare/dist/type';
// Only used for primitives.
const typeInfoRegistry = {};
const VOID0 = void 0;
/* eslint-disable @typescript-eslint/no-use-before-define */
/**
 * Exposes easy access to type information including inquiring about members.
 */
export class TypeInfo {
    // noinspection DuplicatedCode
    constructor(target) {
        this.target = target;
        this.isBoolean = false;
        this.isNumber = false;
        this.isFinite = false;
        this.isValidNumber = false;
        this.isString = false;
        this.isTrueNaN = false;
        this.isObject = false;
        this.isArray = false;
        this.isArrayLike = false;
        this.isFunction = false;
        this.isUndefined = false;
        this.isNull = false;
        this.isNullOrUndefined = false;
        this.isPrimitive = false;
        this.isSymbol = false;
        switch ((this.type = typeof target)) {
            case "boolean" /* Boolean */:
                this.isBoolean = true;
                this.isPrimitive = true;
                break;
            case "number" /* Number */:
                this.isNumber = true;
                this.isTrueNaN = isNaN(target);
                this.isFinite = isFinite(target);
                this.isValidNumber = !this.isTrueNaN;
                this.isPrimitive = true;
                break;
            case "string" /* String */:
                this.isString = true;
                this.isPrimitive = true;
                break;
            case "symbol" /* Symbol */:
                this.isSymbol = true;
                break;
            case "object" /* Object */:
                if (target === null) {
                    this.isNull = true;
                    this.isNullOrUndefined = true;
                    this.isPrimitive = true;
                }
                else {
                    this.isObject = true;
                    this.isArray = target instanceof Array;
                    this.isArrayLike = this.isArray || type.isArrayLike(target);
                }
                break;
            case "function" /* Function */:
                this.isFunction = true;
                break;
            case "undefined" /* Undefined */:
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
    static for(target) {
        return typeInfo(target);
    }
    /**
     * Returns a TypeInfo for any member or non-member,
     * where non-members are of type undefined.
     * @param name
     * @returns {TypeInfo}
     */
    member(name) {
        const t = this.target;
        const m = !this.isPrimitive && t && name in t ? t[name] : VOID0;
        return typeInfo(m);
    }
    /**
     * Returns true if the target matches the type (instanceof).
     * @param type
     * @returns {boolean}
     */
    is(type) {
        const t = this.target;
        if (t == null)
            throw '\'type\' is null or undefined';
        return t instanceof type;
    }
    /**
     * Returns null if the target does not match the type (instanceof).
     * Otherwise returns the target as the type.
     * @param type
     * @returns {T|null}
     */
    as(type) {
        const t = this.target;
        if (t == null)
            throw '\'type\' is null or undefined';
        return t instanceof type ? t : null;
    }
}
/**
 * Returns a TypeInfo for any target object.
 * If the target object is of a primitive type, it returns the TypeInfo instance assigned to that type.
 * @param target
 * @returns {TypeInfo}
 */
export default function typeInfo(target) {
    const t = target === null ? 'null' : typeof target;
    switch (t) {
        case "object" /* Object */:
        case "function" /* Function */:
            return new TypeInfo(target);
    }
    let info = typeInfoRegistry[t];
    if (!info)
        typeInfoRegistry[t] = info = new TypeInfo(target);
    return info;
}
//# sourceMappingURL=TypeInfo.js.map