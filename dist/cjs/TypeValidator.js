"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeInfoHelper = exports.TypeInfo = exports.typeInfo = void 0;
const tslib_1 = require("tslib");
const TypeInfo_1 = tslib_1.__importStar(require("./TypeInfo"));
exports.typeInfo = TypeInfo_1.default;
Object.defineProperty(exports, "TypeInfo", { enumerable: true, get: function () { return TypeInfo_1.TypeInfo; } });
const compare_1 = require("@tsdotnet/compare");
class TypeInfoHelper extends TypeInfo_1.TypeInfo {
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
        if (this.type !== typeof descriptor || (this.isPrimitive && !(0, compare_1.areEqual)(value, descriptor)))
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
exports.TypeInfoHelper = TypeInfoHelper;
class TypeValidator {
    constructor(_typeDescriptor) {
        this._typeDescriptor = _typeDescriptor;
        Object.freeze(this);
    }
    isSubsetOf(o) {
        return new TypeInfoHelper(o).contains(this._typeDescriptor);
    }
}
exports.default = TypeValidator;
function areInvalid(v, d) {
    if (!(0, compare_1.areEqual)(v, d)) {
        const memberType = new TypeInfoHelper(v);
        if (!memberType.contains(d))
            return true;
    }
    return false;
}
//# sourceMappingURL=TypeValidator.js.map