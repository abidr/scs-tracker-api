const rp = require('request-promise');
const $ = require('cheerio');

exports.cnNumber = (req, res) => {
    rp("http://103.3.227.172:4040/Default.aspx?Page=SearchByCNNumber&CN_Number=" + req.params.cnNumber)
    .then(function(html){
        const scrapedData = [];

        $("#ctl00_gvOrders_ctl02_DetailsView1 > tbody > tr", html).each((index, element) => {
            const tds = $(element).find("td");
            const date = $(tds[0]).text();
            const branch = $(tds[1]).text();
            const status = $(tds[2]).text().trim();
            const vehicle = $(tds[3]).text().trim();
            const mnf = $(tds[4]).text().trim();
            const tableRow = { date, branch, status, vehicle, mnf };
            if(!index == 0){
                scrapedData.push(tableRow);
            }
        });
        res.json({
            cn: $('#ctl00_gvOrders_ctl02_lblCN_Number', html).text(),
            bookingDate: $('#ctl00_lblBookingDate', html).text(),
            bookingFrom: $('#ctl00_lblBookingBranch', html).text(),
            destination: $('#ctl00_lblDestination', html).text(),
            itemDescription: $('#ctl00_lblItemDescription', html).text(),
            lot: $('#ctl00_lblQty', html).text(),
            data: scrapedData
        })
    })
    .catch(function(err){
        res.status(502).json({
            error: "Server Busy"
        })
    });
}