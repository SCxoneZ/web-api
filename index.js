import express from "express";
import axios from "axios";
import cheerio from "cheerio";

const app = express();
const URL = "https://covid19.go.id/"; // Thank You covid19.go.id ^_^
const PORT = 3000;

app.get("/covid", async (req, res) => {
	const htmlRes = await axios(URL);
	const html = htmlRes.data;
	const $ = cheerio.load(html);
	const globalValues = [];
	
	$(".section-sebaran-kasus-homepage .card-global h2").each(function(i, elm){
	  globalValues.push($(this).text());
	});
	
	res.json({
	  countries: globalValues[0],
	  confirms: globalValues[1],
	  dies: globalValues[2]
	});
	
});

app.listen(PORT, () => console.log(`App Listening on Port ${PORT}`));
