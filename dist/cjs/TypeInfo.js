"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeInfo = void 0;
exports.default = typeInfo;
const tslib_1 = require("tslib");
const type_1 = tslib_1.__importDefault(require("@tsdotnet/type"));
const typeInfoRegistry = {};
const VOID0 = void 0;
class TypeInfo {
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
                    this.isArrayLike = this.isArray || type_1.default.isArrayLike(target);
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
exports.TypeInfo = TypeInfo;
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
//# sourceMappingURL=TypeInfo.js.map