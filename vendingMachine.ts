import * as _ from 'lodash';

type Product = {price: number, description: string};
type VendingCollection = {product: Product, count: number};

const emptyProduct = {price: 0, description: 'empty'};

export class SlotError extends Error {};
export class RefillError extends Error {};

export class VendingMachine {
    #vendingState: Array<VendingCollection>;
    slotCount: number;

    #validSlot(slot: number): boolean {
        return slot >= 0 && slot <= this.slotCount - 1;
    }

    #invalidSlotError(slot: number): Error {
        return new SlotError(`Vending machine has ${this.slotCount} slots, attempting to access slot ${slot} (max slot ${this.slotCount - 1})`);
    }

    #ifInvalidSlotThrow(slot: number): void {
        if (!this.#validSlot(slot)) {
            throw this.#invalidSlotError(slot);
        }
    }

    // Construct vendingState of no products in the machine,
    // but the correct number of slots.
    constructor(slotCount: number) {
        this.slotCount = slotCount
        this.#vendingState = new Array(slotCount);
        this.#vendingState.fill({product: emptyProduct, count: 0});
        Object.seal(this.#vendingState);
    }

    // Valid slots are from 0 -> slotCount - 1.
    getSlotCount(): number {
        return this.slotCount;
    }

    // Returns 'empty' if there is no product in the slot, 
    // 'some product description' if there is a product in the slot,
    // throws error if slot is out of range.
    inspectSlot(slot: number): string {
        this.#ifInvalidSlotThrow(slot);

        return this.#vendingState[slot].product.description;
    }

    removeAtSlot(slot: number): Product | null {
        this.#ifInvalidSlotThrow(slot);
        
        const vendingCollection = this.#vendingState[slot];
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

    refill(slot: number, vendingCollectionRefill: VendingCollection): void {
        this.#ifInvalidSlotThrow(slot);

        if (vendingCollectionRefill.count == 0) {
            throw new RefillError('Cannot refill vending machine with 0 products');
        }

        if (_.isEqual(vendingCollectionRefill.product, emptyProduct)) {
            throw new RefillError('Cannot refill vending machine with empty product');
        }

        if (this.#vendingState[slot].count != 0) {
            if (!_.isEqual(this.#vendingState[slot].product, vendingCollectionRefill.product)) {
                throw new RefillError('cannot refill vending machine with non-matching products');
            }
        } else { // Empty slot.
            this.#vendingState[slot].product = vendingCollectionRefill.product;
        }

        this.#vendingState[slot].count += vendingCollectionRefill.count;
    }
}