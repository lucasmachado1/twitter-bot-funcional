const express = require('express');
const moment = require('moment');
const momentTimezone = require('moment-timezone');
const puppeteer = require('puppeteer');
const app = express();

console.log('Iniciando');
	var http = require('http');
	async function robo() {

	const browser = await puppeteer.launch({ 
	headless: true,
	args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
  ]
	});
const page = await browser.newPage();
	const urlweb = 'https://www.worldometers.info/coronavirus/country/brazil/';
  await page.goto(urlweb);

  const casos = await page.evaluate(() => {
		return document.querySelector('.maincounter-number').childNodes.item(1).innerText;
	  });
  const  rec = await page.evaluate(() => {
		return document.querySelector('.content-inner').childNodes.item(15).children.item(1).innerText;
	  });	 
  const  mor = await page.evaluate(() => {
		return document.querySelector('.content-inner').childNodes.item(13).children.item(1).innerText;
	  });	  
	  

	 
	const hora = moment().format("DD/MM/YYYY HH:mm:ss", "America/Sao_Paulo");

   //await page.screenshot({ path: 'sdasdsad.png' });
   //await browser.close();

var Twit = require('twit')
var T = new Twit({
  consumer_key:         'TnUPtwRQikaWQEJz7zfMIiTtM',
  consumer_secret:      'yO18TgCJxvt2lHWKJ2VFmGdJ8cEzTHSHYz7A1ExnxzJwHYYMlB',
  access_token:         '1027798872939216896-faDNyZzfYlWM1npQUnA66Y6ncKdyBU',
  access_token_secret:  '9qRQ4pi04aoVGLbRDwFwrpyCkXtbB1YszGhy10TuoL9p6',
  timeout_ms:           60*1000,
  strictSSL:            true,
})

app.get('/add', (req, res)=>{
	res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8;'});
        res.write(`
Data: ${hora}
	
Estatísticas do Brasil:

Total de casos: 🔼 ${casos}

Recuperados: 👐 ${rec}

Mortes: ⚰️ ${mor}

Fonte: http://bit.ly/estatisticascovid19`);
		
       res.end();
	   
	T.post('statuses/update', { status: `

Data: ${hora}

Estatísticas do Brasil:

Casos: 🔼 ${casos}

Recuperados: 👐 ${rec}

Mortes: ⚰️ ${mor}

Fonte: http://bit.ly/estatisticascovid19
`}, function(err, data, response) {
		console.log(data)
	})
}) 
//app.listen(1337, () => {
	//console.log('Link no ar')
//});
app.listen(process.env.PORT || 5000);
}
robo();