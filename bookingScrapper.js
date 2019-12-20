const puppeteer = require('puppeteer');

let bookingUrl = 'https://www.booking.com/searchresults.en-gb.html?label=gen173nr-1FCAEoggI46AdIM1gEaCCIAQGYAQm4AQfIAQzYAQHoAQH4AQuIAgGoAgO4ApKZ8u8FwAIB&lang=en-gb&sid=069dbf2743da4015bd3ba65056217dfd&sb=1&src=searchresults&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.en-gb.html%3Flabel%3Dgen173nr-1FCAEoggI46AdIM1gEaCCIAQGYAQm4AQfIAQzYAQHoAQH4AQuIAgGoAgO4ApKZ8u8FwAIB%3Bsid%3D069dbf2743da4015bd3ba65056217dfd%3Btmpl%3Dsearchresults%3Bclass_interval%3D1%3Bdest_id%3D-631243%3Bdest_type%3Dcity%3Bdtdisc%3D0%3Bfrom_sf%3D1%3Bgroup_adults%3D2%3Bgroup_children%3D0%3Binac%3D0%3Bindex_postcard%3D0%3Blabel_click%3Dundef%3Bno_rooms%3D1%3Boffset%3D0%3Bpostcard%3D0%3Broom1%3DA%252CA%3Bsb_price_type%3Dtotal%3Bsearch_pageview_id%3D91633ec964aa01d2%3Bshw_aparth%3D1%3Bslp_r_match%3D0%3Bsrc%3Dindex%3Bsrc_elem%3Dsb%3Bsrpvid%3D11843ecfbb0b00a7%3Bss%3Dbrasilia%3Bss_all%3D0%3Bssb%3Dempty%3Bsshis%3D0%3Btop_ufis%3D1%26%3B&sr_autoscroll=1&ss=Brasilia&is_ski_area=0&ssne=Brasilia&ssne_untouched=Brasilia&city=-631243&checkin_year=2019&checkin_month=12&checkin_monthday=20&checkout_year=2019&checkout_month=12&checkout_monthday=21&group_adults=2&group_children=0&no_rooms=1&from_sf=1';
(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(bookingUrl);

    // get hotel details
    let hotelData = await page.evaluate(() => {
        let hotels = [];
        // get the hotel elements
        let hotelsElms = document.querySelectorAll('div.sr_property_block[data-hotelid]');
        // get the hotel data
        hotelsElms.forEach((hotelelement) => {
            let hotelJson = {};
            try {
                hotelJson.name = hotelelement.querySelector('span.sr-hotel__name').innerText;
                hotelJson.reviews = hotelelement.querySelector('span.review-score-widget__subtext').innerText;
                hotelJson.rating = hotelelement.querySelector('span.review-score-badge').innerText;
                if(hotelelement.querySelector('strong.price')){
                    hotelJson.price = hotelelement.querySelector('strong.price').innerText;
                }
            }
            catch (exception){

            }
            hotels.push(hotelJson);
        });
        return hotels;
    });

    console.dir(hotelData);
})();
