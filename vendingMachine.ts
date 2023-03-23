import * as _ from 'lodash';

export type Product = {price: number, description: string};
const emptyProduct = {price: 0, description: 'empty'};

type VendingCollection = {product: Product, count: number};

export class VendingMachine {
    #vendingState: Array<VendingCollection>;

    // Construct vendingState of no products in the machine,
    // but the correct number of slots.
    constructor(count: number) {
        this.#vendingState = new Array(count);
        this.#vendingState.fill({product: emptyProduct, count: 0});
        Object.seal(this.#vendingState);
    }

    inspectSlot(slot: number): string | null {
        return this.#vendingState[slot]?.product.description || null;
    }

    removeAtSlot(slot: number): Product {
        if (this.#vendingState[slot].count > 0) {
            const boughtProduct = this.#vendingState[slot].product;
            this.#vendingState[slot].count--;
            return boughtProduct!;
        }
        throw Error('no item at slot');
    }

    refill(slot: number, vendingCollectionRefill: VendingCollection): void {
        if (vendingCollectionRefill.count == 0) {
            throw Error('cannot refill vending machine with nothing');
        }
        if (this.#vendingState[slot].count != 0) {
            if (!_.isEqual(this.#vendingState[slot].product, vendingCollectionRefill.product)) {
                throw Error('cannot refill vending machine with non-matching products');
            }
            this.#vendingState[slot].count += vendingCollectionRefill.count;
        } else {
            this.#vendingState[slot] = vendingCollectionRefill;
        }
    }
}