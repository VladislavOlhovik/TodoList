

describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-appwithredux--base-example&viewMode=story');
        const image = await page.screenshot();
 
        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-additemform--base-example&viewMode=story');
        const image = await page.screenshot();
 
        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-task--is-not-completed-task&viewMode=story');
        const image = await page.screenshot();
 
        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-task--completed-task&viewMode=story');
        const image = await page.screenshot();
 
        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});
 