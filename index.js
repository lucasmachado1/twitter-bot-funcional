const express = require('express');
const moment = require('moment');
const puppeteer = require('puppeteer');
const app = express();

console.log('Iniciando');

async function robo() {

  const browser = await puppeteer.launch({ headless: true});
  const page = await browser.newPage();
  const urlweb = 'https://www.google.com/search?client=firefox-b-d&q=dados+covid+19';
  await page.goto(urlweb);

  const casos = await page.evaluate(() => {
	  return document.querySelector('.m7B03').firstChild.childNodes.item(0).innerText;
	  });
  const  rec = await page.evaluate(() => {
	  return document.querySelector('.QmWbpe').nextElementSibling.firstChild.nextSibling.childNodes.item(0).firstChild.innerText;
	  });	 
  const  mor = await page.evaluate(() => {
	  return document.querySelector('.QmWbpe').nextElementSibling.nextSibling.firstElementChild.nextElementSibling.childNodes.item(0).firstElementChild.innerText; 
	  });	  
  const  casosplus = await page.evaluate(() => {
	  return document.querySelector('.QmWbpe').lastChild.childNodes.item(0).firstChild.innerText;
	  });	  
  const  recplus = await page.evaluate(() => {
	  return document.querySelector('.QmWbpe').nextElementSibling.lastChild.childNodes.item(0).firstChild.innerText;
	  });  
  const  morplus = await page.evaluate(() => {
	  return document.querySelector('.QmWbpe').nextElementSibling.nextElementSibling.lastChild.childNodes.item(0).firstChild.innerText;
	  });	 
  const  mundial = await page.evaluate(() => {
	  return document.querySelector('.wveNAf').nextElementSibling.nextSibling.lastElementChild.childNodes.item(0).firstChild.childNodes.item(0).lastElementChild.childNodes.item(0).firstChild.innerText;
	  });		  
  const  mundial2 = await page.evaluate(() => {
	  return document.querySelector('.wveNAf').nextElementSibling.nextSibling.lastElementChild.childNodes.item(0).firstChild.childNodes.item(1).lastElementChild.childNodes.item(0).firstChild.innerText;
	  });		  
  const  mundial3 = await page.evaluate(() => {
	  return document.querySelector('.wveNAf').nextElementSibling.nextSibling.lastElementChild.childNodes.item(0).firstChild.childNodes.item(2).lastElementChild.childNodes.item(0).firstChild.innerText;
	  });		  
	  	  	  
	const hora = moment().format("DD/MM/YYYY HH:mm:ss");







	
   //await page.screenshot({ path: 'sdasdsad.png' });
   //await browser.close();
   
   
  var http = require('http');
 // var server = http.createServer(function (req, res){
        
 // });
  
 
  
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
	
Estatísticas Covid-19 Brasil:

Total de casos:🔼 ${casos}lhões
${casosplus}

Recuperados:👐 ${rec}lhões
${recplus}

Mortes:⚰️ ${mor}
${morplus}

Mundial: 
Total de casos:🔼 ${mundial}lhões
Recuperados:👐 ${mundial2}lhões
Mortes:⚰️ ${mundial3}lhões

Fonte: http://bit.ly/estatisticascovid19`);
		
       res.end();
	   
	T.post('statuses/update', { status: `

	Data: ${hora}
Estatísticas do Brasil:

Casos:🔼 ${casos}lhões
${casosplus}

Recuperados:👐 ${rec}lhões
${recplus}

Mortes:⚰️ ${mor}
${morplus}

Mundial: 
Total de casos:🔼 ${mundial}lhões
Recuperados:👐 ${mundial2}lhões
Mortes:⚰️ ${mundial3}lhões


Fonte: http://bit.ly/estatisticascovid19
`}, function(err, data, response) {
		console.log(data)
	})
}) 
app.listen(1337, () => {
	console.log('Link no ar')
});
}


robo();