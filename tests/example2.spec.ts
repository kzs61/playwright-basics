import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { TopMenuPage } from '../pages/top-menu-page';

// AAA
// POM

const URL = 'https://playwright.dev/';
let homePage: HomePage;
let topMenuPage: TopMenuPage;
const pageUrl = /.*intro/;


test.beforeEach(async ({page}) => {
    await page.goto(URL);
    homePage = new HomePage(page);
});

async function clickGetStarted(page:Page){
    //  await page.getByRole('link', { name: 'Get started' }).click();
    await homePage.clickGetStarted();
}

test.describe('Playwright website', () => {

    test("has title", async () => {
        // Expect a title "to contain" a substring.
        // await expect(page).toHaveTitle(/Playwright/);
        await homePage.assertPageTitle();
      });
      
      test("get started link", async ({ page }) => {
        await clickGetStarted(page);
        // Click the get started link.
        await page.getByRole('link', { name: 'Get started' }).click();
    
        await expect(page).toHaveURL(/.*intro/);
      
        // Expects page to have a heading with the name of Installation.
        await expect(page.getByRole("heading", { name: 'Installation' })).toBeVisible();
      });
      
      test.only('check java page', async ({page}) => {
        await clickGetStarted(page);
      
        await page.getByRole('button', {name: 'Node.js'}).hover();
        await page.getByText('Java', {exact: true}).click();
      
        await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
        await expect(page).toHaveURL(/.*java/);
      
        await expect (page.getByText('Installing Playwright', {exact: true})).not.toBeVisible();
      
        const javaDescriptionText = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;
        await expect(page.getByText(javaDescriptionText)).toBeVisible();
      });

      test('check Java page', async ({ page }) => {
        await test.step('Act', async () => {
            await clickGetStarted(page);
            await topMenuPage.hoverNode();
            await topMenuPage.clickJava();
        });
      
        await test.step('Assert', async () => {
            await topMenuPage.assertPageUrl(pageUrl);
            await topMenuPage.assertNodeDescriptionNotVisible();
            await topMenuPage.assertJavaDescriptionVisible();
        });
    });
});
  
 
  