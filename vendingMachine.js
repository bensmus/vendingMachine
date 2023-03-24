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
var _VendingMachine_instances, _VendingMachine_vendingState, _VendingMachine_validSlot, _VendingMachine_invalidSlotError, _VendingMachine_ifInvalidSlotThrow;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendingMachine = exports.RefillError = exports.SlotError = void 0;
const _ = require("lodash");
const emptyProduct = { price: 0, description: 'empty' };
class SlotError extends Error {
}
exports.SlotError = SlotError;
;
class RefillError extends Error {
}
exports.RefillError = RefillError;
;
class VendingMachine {
    // Construct vendingState of no products in the machine,
    // but the correct number of slots.
    constructor(slotCount) {
        _VendingMachine_instances.add(this);
        _VendingMachine_vendingState.set(this, void 0);
        this.slotCount = slotCount;
        __classPrivateFieldSet(this, _VendingMachine_vendingState, new Array(slotCount), "f");
        __classPrivateFieldGet(this, _VendingMachine_vendingState, "f").fill({ product: emptyProduct, count: 0 });
        Object.seal(__classPrivateFieldGet(this, _VendingMachine_vendingState, "f"));
    }
    // Valid slots are from 0 -> slotCount - 1.
    getSlotCount() {
        return this.slotCount;
    }
    // Returns 'empty' if there is no product in the slot, 
    // 'some product description' if there is a product in the slot,
    // throws error if slot is out of range.
    inspectSlot(slot) {
        __classPrivateFieldGet(this, _VendingMachine_instances, "m", _VendingMachine_ifInvalidSlotThrow).call(this, slot);
        return __classPrivateFieldGet(this, _VendingMachine_vendingState, "f")[slot].product.description;
    }
    removeAtSlot(slot) {
        __classPrivateFieldGet(this, _VendingMachine_instances, "m", _VendingMachine_ifInvalidSlotThrow).call(this, slot);
        const vendingCollection = __classPrivateFieldGet(this, _VendingMachine_vendingState, "f")[slot];
        if (vendingCollection.count > 0) {
            const boughtProduct = vendingCollection.product;
            vendingCollection.count--;
            if (vendingCollection.count == 0) {
                vendingCollection.product = emptyProduct;
            }
            return boughtProduct;
        }
        return null;
    }
    refill(slot, vendingCollectionRefill) {
        __classPrivateFieldGet(this, _VendingMachine_instances, "m", _VendingMachine_ifInvalidSlotThrow).call(this, slot);
        if (vendingCollectionRefill.count == 0) {
            throw new RefillError('Cannot refill vending machine with 0 products');
        }
        if (_.isEqual(vendingCollectionRefill.product, emptyProduct)) {
            throw new RefillError('Cannot refill vending machine with empty product');
        }
        if (__classPrivateFieldGet(this, _VendingMachine_vendingState, "f")[slot].count != 0) {
            if (!_.isEqual(__classPrivateFieldGet(this, _VendingMachine_vendingState, "f")[slot].product, vendingCollectionRefill.product)) {
                throw new RefillError('cannot refill vending machine with non-matching products');
            }
        }
        else { // Empty slot.
            __classPrivateFieldGet(this, _VendingMachine_vendingState, "f")[slot].product = vendingCollectionRefill.product;
        }
        __classPrivateFieldGet(this, _VendingMachine_vendingState, "f")[slot].count += vendingCollectionRefill.count;
    }
}
exports.VendingMachine = VendingMachine;
_VendingMachine_vendingState = new WeakMap(), _VendingMachine_instances = new WeakSet(), _VendingMachine_validSlot = function _VendingMachine_validSlot(slot) {
    return slot >= 0 && slot <= this.slotCount - 1;
}, _VendingMachine_invalidSlotError = function _VendingMachine_invalidSlotError(slot) {
    return new SlotError(`Vending machine has ${this.slotCount} slots, attempting to access slot ${slot} (max slot ${this.slotCount - 1})`);
}, _VendingMachine_ifInvalidSlotThrow = function _VendingMachine_ifInvalidSlotThrow(slot) {
    if (!__classPrivateFieldGet(this, _VendingMachine_instances, "m", _VendingMachine_validSlot).call(this, slot)) {
        throw __classPrivateFieldGet(this, _VendingMachine_instances, "m", _VendingMachine_invalidSlotError).call(this, slot);
    }
};
