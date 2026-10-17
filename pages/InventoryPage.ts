import { Locator, type Page } from '@playwright/test';
import { ENV } from '../utils/env';

export class InventoryPage {
    readonly page: Page;
    readonly productImages: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productImages = page.locator('img.inventory_item_img');
    }
}