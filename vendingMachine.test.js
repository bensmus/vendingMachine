"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vendingMachine_1 = require("./vendingMachine");
const arbitrarySlotId = Math.round(Math.random() * 9);
const juiceProduct = { price: 2, description: 'juice' };
const chipsProduct = { price: 2, description: 'chips' };
const vendingCollectionRefill = {
    product: juiceProduct,
    count: 2
};
const vendingCollectionRefillAlt = {
    product: chipsProduct,
    count: 2
};
let vendingMachine;
const removeFunc = () => vendingMachine.removeAtSlot(arbitrarySlotId);
beforeEach(() => {
    vendingMachine = new vendingMachine_1.VendingMachine(10);
});
test('Has 10 slots with emptyProduct', () => {
    for (let n = 0; n < 10; n++) {
        expect(vendingMachine.inspectSlot(0)).toBe('empty');
    }
    expect(() => vendingMachine.inspectSlot(10)).toThrow(vendingMachine_1.SlotError);
    expect(() => vendingMachine.inspectSlot(15)).toThrow(vendingMachine_1.SlotError);
    expect(() => vendingMachine.inspectSlot(-1)).toThrow(vendingMachine_1.SlotError);
});
test('Refill slot with nothing in it', () => {
    expect(vendingMachine.inspectSlot(arbitrarySlotId)).toBe('empty');
    vendingMachine.refill(arbitrarySlotId, vendingCollectionRefill);
    expect(vendingMachine.inspectSlot(arbitrarySlotId)).toBe('juice');
});
test('Remove from empty slot', () => {
    expect(removeFunc()).toBe(null);
});
test('Refill, then remove', () => {
    vendingMachine.refill(arbitrarySlotId, vendingCollectionRefill);
    expect(vendingMachine.inspectSlot(arbitrarySlotId)).toBe('juice');
    expect(removeFunc()).toBe(juiceProduct);
    expect(removeFunc()).toBe(juiceProduct);
    expect(removeFunc()).toBe(null);
    expect(vendingMachine.inspectSlot(arbitrarySlotId)).toBe('empty');
});
test('Refill of different products', () => {
    vendingMachine.refill(arbitrarySlotId, vendingCollectionRefill);
    expect(() => vendingMachine.refill(arbitrarySlotId, vendingCollectionRefillAlt)).toThrow(vendingMachine_1.RefillError);
});
