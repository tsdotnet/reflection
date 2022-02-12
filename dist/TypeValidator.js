"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeInfoHelper = exports.typeInfo = void 0;
const tslib_1 = require("tslib");
const TypeInfo_1 = (0, tslib_1.__importStar)(require("./TypeInfo"));
exports.typeInfo = TypeInfo_1.default;
const areEqual_1 = (0, tslib_1.__importDefault)(require("@tsdotnet/compare/dist/areEqual"));
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
class TypeInfoHelper extends TypeInfo_1.TypeInfo {
    contains(descriptor) {
        const value = this.target;
        // works with literals and values.
        if (value === descriptor)
            return true;
        // First check against simple types.
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
        if (this.type !== typeof descriptor || (this.isPrimitive && !(0, areEqual_1.default)(value, descriptor)))
            return false;
        // Check array contents and confirm intersections.
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
            // Quick check...
            if (dKeys.length > targetKeys.length)
                return false;
            // Quick check #2...
            for (const key of dKeys) {
                if (targetKeys.indexOf(key) === -1)
                    return false;
            }
            // Final pass with recursive...
            for (const key of dKeys) {
                if (areInvalid(value[key], descriptor[key]))
                    return false;
            }
        }
        return true;
    }
}
exports.TypeInfoHelper = TypeInfoHelper;
/**
 * A class for validating if an object matches the type profile of a descriptor.
 */
class TypeValidator {
    constructor(_typeDescriptor) {
        this._typeDescriptor = _typeDescriptor;
        Object.freeze(this);
    }
    /**
     * Returns true if the parameter matches the descriptor.
     * @param o
     * @returns {o is T}
     */
    isSubsetOf(o) {
        return new TypeInfoHelper(o).contains(this._typeDescriptor);
    }
}
exports.default = TypeValidator;
function areInvalid(v, d) {
    if (!(0, areEqual_1.default)(v, d)) {
        const memberType = new TypeInfoHelper(v);
        if (!memberType.contains(d))
            return true;
    }
    return false;
}
//# sourceMappingURL=TypeValidator.js.map