const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function run() {
  const url = 'https://example.com';
  try {
    const res = await axios.get(url, { timeout: 10000 });
    const $ = cheerio.load(res.data);
    const titles = $('h2').map((i, el) => $(el).text().trim()).get();
    const out = { timestamp: new Date().toISOString(), titles };
    fs.writeFileSync('results.json', JSON.stringify(out, null, 2));
    console.log('Scraped:', out);
  } catch (err) {
    console.error('Scrape failed:', err.message);
    process.exit(1);
  }
}

run();
