(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tsdotnet/type'), require('@tsdotnet/compare')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tsdotnet/type', '@tsdotnet/compare'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.tsdotnet = global.tsdotnet || {}, global.tsdotnet.reflection = global.tsdotnet.reflection || {}), global.tsdotnet.type, global.tsdotnet.compare));
})(this, (function (exports, type, compare) { 'use strict';

    function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

    var type__default = /*#__PURE__*/_interopDefault(type);

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
                        this.isArrayLike = this.isArray || type__default.default.isArrayLike(target);
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

    /*!
     * @author electricessence / https://github.com/electricessence/
     * @license MIT
     */
    class TypeInfoHelper extends TypeInfo {
        contains(descriptor) {
            const value = this.target;
            if (value === descriptor)
                return true;
            switch (descriptor) {
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
            if (this.type !== typeof descriptor || (this.isPrimitive && !compare.areEqual(value, descriptor)))
                return false;
            if (this.isArrayLike && descriptor instanceof Array) {
                const vLen = value.length, dLen = descriptor.length;
                if (vLen !== dLen && (isNaN(vLen) || vLen < dLen))
                    return false;
                for (let i = 0; i < descriptor.length; i++) {
                    if (areInvalid(value[i], descriptor[i]))
                        return false;
                }
                return true;
            }
            if (this.isObject) {
                const targetKeys = Object.keys(value);
                const dKeys = Object.keys(descriptor);
                if (dKeys.length > targetKeys.length)
                    return false;
                for (const key of dKeys) {
                    if (targetKeys.indexOf(key) === -1)
                        return false;
                }
                for (const key of dKeys) {
                    if (areInvalid(value[key], descriptor[key]))
                        return false;
                }
            }
            return true;
        }
    }
    class TypeValidator {
        _typeDescriptor;
        constructor(_typeDescriptor) {
            this._typeDescriptor = _typeDescriptor;
            Object.freeze(this);
        }
        isSubsetOf(o) {
            return new TypeInfoHelper(o).contains(this._typeDescriptor);
        }
    }
    function areInvalid(v, d) {
        if (!compare.areEqual(v, d)) {
            const memberType = new TypeInfoHelper(v);
            if (!memberType.contains(d))
                return true;
        }
        return false;
    }

    exports.TypeInfo = TypeInfo;
    exports.TypeInfoHelper = TypeInfoHelper;
    exports.default = TypeValidator;
    exports.typeInfo = typeInfo;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=reflection.js.map
