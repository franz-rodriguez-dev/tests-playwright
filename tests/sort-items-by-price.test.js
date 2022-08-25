const { test, expect } = require("@playwright/test");
test("User can sort the items by price, from highest to lowest", async ({
    page,
}) => {
    await page.goto("https://www.saucedemo.com");

    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    const inventoryContainer = page.locator(".inventory_container");
    await expect(inventoryContainer).toBeVisible();

    //should show items sorted by price from highest to lowest
    await page.locator(".product_sort_container").click();
    await page.selectOption(".product_sort_container", "hilo");

    const itemPrices = page.locator(".inventory_item_price");
    await expect(itemPrices).toHaveCount(6);

    const firstItem = itemPrices.first();
    await expect(firstItem).toContainText('$49.99');

    const lastItem = itemPrices.last();
    await expect(lastItem).toContainText('$7.99');
});