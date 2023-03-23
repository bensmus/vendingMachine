"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _VendingMachine_vendingState;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendingMachine = void 0;
const _ = require("lodash");
const emptyProduct = { price: 0, description: 'empty' };
class VendingMachine {
    // Construct vendingState of no products in the machine,
    // but the correct number of slots.
    constructor(count) {
        _VendingMachine_vendingState.set(this, void 0);
        __classPrivateFieldSet(this, _VendingMachine_vendingState, new Array(count), "f");
        __classPrivateFieldGet(this, _VendingMachine_vendingState, "f").fill({ product: emptyProduct, count: 0 });
        Object.seal(__classPrivateFieldGet(this, _VendingMachine_vendingState, "f"));
    }
    inspectSlot(slot) {
        var _a;
        return ((_a = __classPrivateFieldGet(this, _VendingMachine_vendingState, "f")[slot]) === null || _a === void 0 ? void 0 : _a.product.description) || null;
    }
    removeAtSlot(slot) {
        if (__classPrivateFieldGet(this, _VendingMachine_vendingState, "f")[slot].count > 0) {
            const boughtProduct = __classPrivateFieldGet(this, _VendingMachine_vendingState, "f")[slot].product;
            __classPrivateFieldGet(this, _VendingMachine_vendingState, "f")[slot].count--;
            return boughtProduct;
        }
        throw Error('no item at slot');
    }
    refill(slot, vendingCollectionRefill) {
        if (vendingCollectionRefill.count == 0) {
            throw Error('cannot refill vending machine with nothing');
        }
        if (__classPrivateFieldGet(this, _VendingMachine_vendingState, "f")[slot].count != 0) {
            if (!_.isEqual(__classPrivateFieldGet(this, _VendingMachine_vendingState, "f")[slot].product, vendingCollectionRefill.product)) {
                throw Error('cannot refill vending machine with non-matching products');
            }
            __classPrivateFieldGet(this, _VendingMachine_vendingState, "f")[slot].count += vendingCollectionRefill.count;
        }
        else {
            __classPrivateFieldGet(this, _VendingMachine_vendingState, "f")[slot] = vendingCollectionRefill;
        }
    }
}
exports.VendingMachine = VendingMachine;
_VendingMachine_vendingState = new WeakMap();
