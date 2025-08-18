import type from '@tsdotnet/type';

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
const typeInfoRegistry = {};
const VOID0 = void 0;
class TypeInfo {
    target;
    type;
    isBoolean = false;
    isNumber = false;
    isFinite = false;
    isValidNumber = false;
    isString = false;
    isTrueNaN = false;
    isObject = false;
    isArray = false;
    isArrayLike = false;
    isFunction = false;
    isUndefined = false;
    isNull = false;
    isNullOrUndefined = false;
    isPrimitive = false;
    isSymbol = false;
    constructor(target) {
        this.target = target;
        switch ((this.type = typeof target)) {
            case 'boolean':
                this.isBoolean = true;
                this.isPrimitive = true;
                break;
            case 'number':
                this.isNumber = true;
                this.isTrueNaN = isNaN(target);
                this.isFinite = isFinite(target);
                this.isValidNumber = !this.isTrueNaN;
                this.isPrimitive = true;
                break;
            case 'string':
                this.isString = true;
                this.isPrimitive = true;
                break;
            case 'symbol':
                this.isSymbol = true;
                break;
            case 'object':
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
            case 'function':
                this.isFunction = true;
                break;
            case 'undefined':
                this.isUndefined = true;
                this.isNullOrUndefined = true;
                this.isPrimitive = true;
                break;
            default:
                throw new Error('Fatal type failure.  Unknown type: ' + this.type);
        }
        Object.freeze(this);
    }
    static for(target) {
        return typeInfo(target);
    }
    member(name) {
        const t = this.target;
        const m = !this.isPrimitive && t && name in t ? t[name] : VOID0;
        return typeInfo(m);
    }
    is(type) {
        const t = this.target;
        if (t == null)
            throw '\'type\' is null or undefined';
        return t instanceof type;
    }
    as(type) {
        const t = this.target;
        if (t == null)
            throw '\'type\' is null or undefined';
        return t instanceof type ? t : null;
    }
}
function typeInfo(target) {
    const t = target === null ? 'null' : typeof target;
    switch (t) {
        case 'object':
        case 'function':
            return new TypeInfo(target);
    }
    let info = typeInfoRegistry[t];
    if (!info)
        typeInfoRegistry[t] = info = new TypeInfo(target);
    return info;
}

export { TypeInfo, typeInfo as default };
//# sourceMappingURL=TypeInfo.js.map
