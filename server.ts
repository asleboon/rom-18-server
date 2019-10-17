// Creates express app
const app = require('express')();
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
import { Response, Request } from 'express';
require('dotenv').config();

/**
 * TODO:
 * Authentication?
 * images
 * quotes
 * trafikk
 *
 */

export interface IComic {
	month: string;
	num: number;
	link: string;
	year: string;
	news: string;
	safe_title: string;
	transcript: string;
	alt: string;
	img: string;
	title: string;
	day: string;
}

export interface Itemp {
	temp: string;
}

const PORT = process.env.PORT || 4000;

// config
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
	res.send(`
  <!DOCTYPE html>
  <html>
  <head>
  <style>
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 50vw;
    }

    td, th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }
  </style>
  </head>
  <body>
  <h1>Rom-18-dashboard API</h1>
  <table class="table">
      <tr>
        <th>Endepunkt</th>
        <th>Data</th>
        <th>Beskrivelse</th>
      </tr>
      <tr>
        <td>'/'</td>
        <td>HTML</td>
        <td>Dokumentasjon</td>
     </tr>
      <tr>
        <td>'/xkcd'</td>
        <td>IComic</td>
        <td>Xkcd comic</td>
      </tr>
      <tr>
        <td>'/temp'</td>
        <td>Itemp</td>
        <td>Temperature at the office</td>
      </tr>
    </thead>
  </table>
  </body>
  </html>
  `);
});

app.get('/xkcd', async (req: Request, res: Response) => {
	try {
		const newDate = new Date();
		const randomNumber = Math.round(Math.random() * 90 * newDate.getHours()); // between 0 and 2200
		const result = await axios.get(
			`${process.env.XKCD_API}/${randomNumber}/info.0.json`
		);
		const comicData: IComic = result.data;
		return res.status(200).send(comicData);
	} catch (err) {
		console.log('err: ', err);
		return res.status(500).send('Something went wrong :(');
	}
});

app.get('/temp', async (req: Request, res: Response) => {
	res
		.status(200)
		.send({ temp1: req.body, temp2: req.query, temp3: req.params });
});

app.post('/temp', async (req: Request, res: Response) => {
	res
		.status(200)
		.send({ temp1: req.body, temp2: req.query, temp3: req.params });
});

app.listen(PORT, function() {
	console.log('Server is listening on ' + PORT);
});
