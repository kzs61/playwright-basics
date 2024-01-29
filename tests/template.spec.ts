import { test, expect } from '@playwright/test';

// AAA Pattern: (suggests us to structure our code in sections)
// 1st pattern [Arrange]
// 2nd pattern [Act]
// 3rd pattern [Assert]

// With this suggestion, you will start your file by having all the Arranges at the beginning.
// And this can be in a loop - so you can have an Arrange section with Arrange, Act, and Assert within it.
// For example, here we see a const password. This would be representing the Arrange area.

// **Ideally, all the variables should come at the very beginning of a file or a method. **

const password = process.env.PASSWORD;


// The beforeAll method, which is present in the test object, is the method that will be executed by default before all the tests within a file.

test.beforeAll(async ({ playwright }) => {
    // skip the test if the environment is production
    test.skip(
      !!process.env.PROD,
      'Test intentionally skipped in production due to data dependency.'
    );
    // start a server
    // create a db connection
    // reuse a sign in state

    // if we have Arrange, Act and Assert in this section we'll use within this BeforeAll method.
});
  
test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running ${testInfo.title}`);
    // open a URL
    // clean up the DB
    // create a page object
    // dismiss a modal
    // load params
});

test.afterAll(async ({ page }, testInfo) => {
    console.log('Test file completed.');
    // close a DB connection
});

test.afterEach( async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    if (testInfo.status !== testInfo.expectedStatus)
        console.log(`Did not run as expected, ended up at ${page.url()}`);
    // clean up all the data we created for this test through API calls
});

// test.describe('Test Case', () => {
// test.describe.only('Test Case', () => {
test.describe.skip('Test Case', () => {
    test('Test Scenario One', async ({ page }) => {
        await test.step('Step One', async () => {
            // ...
        });

        await test.step('Step Two', async () => {
            // ...
        });

        // ...
    });
  
    test('Test Scenario Two', async ({ page }) => {
        // Arrange
        // Act
        // Assert
    });
});

/**
"describe" is similar to a test case name and the test will be similar to a test scenario.
"skip" the test will skip all the tests within this test case.
"only" can be used instead of "skip", in that case it would only run the tests that are inside this describe.
The describe is optional, and you can have multiple describes within one test file. Avoid those situations, because I like splitting the file in case we have multiple describes.
But of course, this depends on each project. There are situations where we do need two describes within one file, so be mindful about the use of it.
Inside the describe, we have the test scenarios.
In this example, there are multiple steps. These steps could be used - for example - as Arrange, Act, and Assert, if needed. If not, you could just create different steps 
for each scenario that you want. These are also optional.
As we did for describe, we could also use skip and only for each test scenario. You could just do test.only or test.skip.
And again, within each test scenario, we would follow the pattern AAA.
Finally, you can have a "test.describe" representing the test case.
You can skip the entire test case or you can run only the entire test case, or you can just have nothing here.
Inside of describe, you have test scenarios.
Inside a test scenario, you can have steps and commands after them, or you can have just a simple test scenario without steps.
You could use .only and .skip to run one specific test scenario.
All the way back to the top, we do have our variables at the beginning, beforeAll, beforeEach, afterAll, and afterEach.
*/