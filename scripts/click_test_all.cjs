const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 10000 });
    
    await page.waitForSelector('.card-brutal');
    const cards = await page.$$('.card-brutal');
    
    for (let i = 0; i < cards.length; i++) {
      console.log(`Clicking card ${i}...`);
      await page.evaluate((index) => {
        document.querySelectorAll('.card-brutal')[index].click();
      }, i);
      
      await new Promise(r => setTimeout(r, 500));
      
      await page.evaluate(() => {
        const btn = document.querySelector('.bg-\\[var\\(--ink\\)\\].text-white');
        if (btn) btn.click();
        else {
           const closeBtns = document.querySelectorAll('button');
           for (const b of closeBtns) {
             if (b.innerHTML.includes('<line') || b.innerHTML.includes('X')) b.click();
           }
        }
      });
      await new Promise(r => setTimeout(r, 200));
    }
    
    await browser.close();
  } catch (e) {
    console.log('Script Error:', e);
  }
})();
