import puppeteer from 'puppeteer';

const BASE = 'http://localhost:5173';
const DIR = './screenshots';

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1280, height: 900 },
  });

  const page = await browser.newPage();

  // Log console messages for debugging
  page.on('console', msg => console.log('  [page]', msg.text()));

  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  // Helper: navigate by clicking nav buttons (state-based routing)
  const navTo = async (pageName, filename, scrollFull = true) => {
    console.log(`📸 ${filename}...`);
    await page.goto(BASE, { waitUntil: 'networkidle2', timeout: 15000 });

    if (pageName !== 'home') {
      const navLinks = {
        parts: 'Сэлбэг',
        services: 'Засвар',
        gallery: 'Зураг',
        advice: 'Зөвлөгөө',
        contact: 'Холбоо барих',
      };
      const linkText = navLinks[pageName];
      if (linkText) {
        await page.evaluate((text) => {
          const btns = [...document.querySelectorAll('nav button')];
          const btn = btns.find(b => b.textContent.trim() === text);
          if (btn) btn.click();
        }, linkText);
        await wait(800);
      }
    }

    if (scrollFull) {
      await page.evaluate(async () => {
        await new Promise(r => {
          let total = 0;
          const timer = setInterval(() => {
            window.scrollBy(0, 400);
            total += 400;
            if (total >= document.body.scrollHeight) { clearInterval(timer); r(); }
          }, 100);
        });
        window.scrollTo(0, 0);
      });
      await wait(500);
    }

    await page.screenshot({ path: `${DIR}/${filename}`, fullPage: true });
  };

  // Take screenshots of each page
  await navTo('home', '01-home.png');
  await navTo('parts', '02-parts.png');
  await navTo('services', '03-services.png');
  await navTo('gallery', '04-gallery.png');
  await navTo('advice', '05-advice.png');
  await navTo('contact', '06-contact.png');

  // Cart - add item then open cart
  console.log('📸 07-cart.png...');
  await page.goto(BASE, { waitUntil: 'networkidle2' });
  // Click first "add to cart" button
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')];
    const addBtn = btns.find(b => b.querySelector('svg') && b.classList.contains('bg-amber-500') && b.closest('.grid'));
    if (addBtn) addBtn.click();
  });
  await wait(500);
  // Open cart
  await page.evaluate(() => {
    const cartBtn = document.querySelector('button[class*="relative"]');
    if (cartBtn) cartBtn.click();
  });
  await wait(500);
  await page.screenshot({ path: `${DIR}/07-cart.png`, fullPage: false });

  // ===== Admin panel =====
  console.log('📸 Admin login...');
  await page.goto(BASE, { waitUntil: 'networkidle2' });

  // Step 1: Click login button in header
  const loginClicked = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')];
    const login = btns.find(b => b.textContent.trim() === 'Нэвтрэх');
    if (login) { login.click(); return true; }
    return false;
  });
  console.log('  Login button clicked:', loginClicked);
  await wait(800);

  // Step 2: Fill login form
  const emailInput = await page.$('#ae');
  console.log('  Email input found:', !!emailInput);
  if (emailInput) {
    await emailInput.click();
    await emailInput.type('admin@shop.mn');
  }

  const passInput = await page.$('#ap');
  console.log('  Password input found:', !!passInput);
  if (passInput) {
    await passInput.click();
    await passInput.type('admin123');
  }
  await wait(300);

  // Step 3: Click submit (the login button inside the modal with bg-amber-500)
  const submitClicked = await page.evaluate(() => {
    const modal = document.querySelector('.fixed.inset-0.z-50');
    if (!modal) return 'no modal';
    const btns = [...modal.querySelectorAll('button')];
    const submit = btns.find(b => b.textContent.trim() === 'Нэвтрэх' && b.classList.contains('bg-amber-500'));
    if (submit) { submit.click(); return true; }
    return 'no submit btn';
  });
  console.log('  Submit clicked:', submitClicked);
  await wait(1000);

  // Step 4: Click "Админ" button
  const adminClicked = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')];
    const admin = btns.find(b => b.textContent.trim() === 'Админ');
    if (admin) { admin.click(); return true; }
    // Debug: list all button texts
    return 'not found. Buttons: ' + btns.map(b => b.textContent.trim()).filter(t => t).slice(0, 10).join(' | ');
  });
  console.log('  Admin button clicked:', adminClicked);
  await wait(1000);

  // Step 5: Check if we're in admin panel
  const inAdmin = await page.evaluate(() => {
    return !!document.querySelector('aside');
  });
  console.log('  In admin panel:', inAdmin);

  console.log('📸 08-admin-overview.png...');
  await page.screenshot({ path: `${DIR}/08-admin-overview.png`, fullPage: true });

  // Admin tabs - click sidebar buttons
  if (inAdmin) {
    const tabs = [
      ['Social удирдлага', '09-admin-social.png'],
      ['Хуваарь', '10-admin-scheduler.png'],
      ['Бүтээгдэхүүн', '11-admin-products.png'],
      ['Захиалга', '12-admin-orders.png'],
      ['Нөөцийн мэдэгдэл', '13-admin-alerts.png'],
      ['Тохиргоо', '14-admin-settings.png'],
    ];

    for (const [tab, file] of tabs) {
      console.log(`📸 ${file}...`);
      const clicked = await page.evaluate((tabText) => {
        const btns = [...document.querySelectorAll('aside button')];
        const btn = btns.find(b => b.textContent.includes(tabText));
        if (btn) { btn.click(); return true; }
        return 'not found. Sidebar btns: ' + btns.map(b => b.textContent.trim()).join(' | ');
      }, tab);
      console.log(`  Tab "${tab}" clicked:`, clicked);
      await wait(600);
      await page.screenshot({ path: `${DIR}/${file}`, fullPage: true });
    }
  } else {
    console.log('⚠️ Not in admin panel, skipping admin tab screenshots');
  }

  await browser.close();
  console.log('✅ Done! Screenshots saved to ./screenshots/');
}

run().catch(console.error);
