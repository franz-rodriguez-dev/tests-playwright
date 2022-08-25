const { test, expect } = require("@playwright/test");
test("User can add an item to cart", async ({ page }) => {
    await page.goto("https://www.saucedemo.com");

    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    const inventoryContainer = page.locator(".inventory_container");
    await expect(inventoryContainer).toBeVisible();

    await page.locator("#add-to-cart-sauce-labs-backpack").click();
    await page.locator("#shopping_cart_container").click();

    // Should show the 'Sauce Labs Backpack' item label.
    const cartItemLabel = page.locator(".cart_item_label");

    await expect(cartItemLabel).toContainText("Sauce Labs Backpack");

    // Should show one cart item.
    const cartItem = page.locator(".cart_item");
    await expect(cartItem).toHaveCount(1);
});