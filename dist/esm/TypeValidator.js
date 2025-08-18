import { TypeInfo } from './TypeInfo.js';
export { default as typeInfo } from './TypeInfo.js';
import { areEqual } from '@tsdotnet/compare';

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
        if (this.type !== typeof descriptor || (this.isPrimitive && !areEqual(value, descriptor)))
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
    if (!areEqual(v, d)) {
        const memberType = new TypeInfoHelper(v);
        if (!memberType.contains(d))
            return true;
    }
    return false;
}

export { TypeInfo, TypeInfoHelper, TypeValidator as default };
//# sourceMappingURL=TypeValidator.js.map
