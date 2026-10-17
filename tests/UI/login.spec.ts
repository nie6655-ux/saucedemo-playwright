import { test, expect } from '../../fixtures/pageFixtures';
import { ENV } from '../../utils/env';
import { USERS } from '../../test-data/user';

test.describe('Login Tests', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateToLogin();
    });

    test('Verify login is successful for valid credentials', async ({ loginPage, page }) => {
        
        await test.step('Login with valid credentials', async () => {
            await loginPage.login(USERS.STANDARD_USER, ENV.PASSWORD);
        });
        
        await test.step('Verify user is redirected to inventory page', async () => {
            await expect(page).toHaveURL(/inventory\.html/);
        });

    });

    test('Verify login fails for locked out user', async ({ loginPage }) => {

        await test.step('Login with locked out user', async () => {
            await loginPage.login(USERS.LOCKED_OUT_USER, ENV.PASSWORD);
        });

        await test.step('Verify error message is displayed', async () => {
            await expect(loginPage.errorMessage).toBeVisible();
            await expect(loginPage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
        });
    });

    test('Verify login succeeds for problem user but incorrect product images are displayed', async ({ loginPage, inventoryPage, page }) => {

        await test.step('Login with problem  user', async () => {
            await loginPage.login(USERS.PROBLEM_USER, ENV.PASSWORD);
        });

        await test.step('Verify user is redirect to inventory page but product images are incorrect', async () => {
            await expect(page).toHaveURL(/inventory\.html/);

            const productImages = inventoryPage.productImages;
            const expectedImageCount = 6;

            await expect(productImages).toHaveCount(expectedImageCount);

            for (let i = 0; i < expectedImageCount; i++) {
                const image = productImages.nth(i);
                await expect.soft(image, `Product image ${i + 1} should be visible`).toBeVisible();
                await expect.soft(image, `Product image ${i + 1} should have the expected src attribute`).toHaveAttribute('src', /assets\/sl-404-.*\.jpg/);
            }
        });
    });
});