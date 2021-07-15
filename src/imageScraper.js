const Scraper = require('images-scraper')

const google = new Scraper({
  puppeteer: {
    headless: true,
  },
})
;(async () => {
  console.log('hello')
  const results = await google.scrape('milka bubble', 10)
  console.log(results)
})()
