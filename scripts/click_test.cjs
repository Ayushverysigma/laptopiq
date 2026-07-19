const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 10000 });
    
    // Wait for the cards to load and click the first one
    await page.waitForSelector('.card-brutal');
    console.log('Clicking on the first laptop card...');
    await page.click('.card-brutal');
    
    // Wait a bit to see if it crashes
    await new Promise(r => setTimeout(r, 2000));
    
    await browser.close();
  } catch (e) {
    console.log('Script Error:', e);
  }
})();
