const express = require("express");
const { Client } = require('pg')
const bodyParser = require("body-parser");


const app = express();
const PORT = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const client = new Client({
  user: 'grzes',
  host: 'localhost',
  database: 'postgres',
  password: '123',
  port: 5432,
})
client.connect()



app.get("/buttons", (req, res) => {

  client.query('SELECT * from surface_buttons', (err, query_results) => {
    if (err) {
      res.status(500).send({ message: "couldn't get data" });
      console.error("couldn't get data: ", err);
      client.end()
      return;
    }
    res.status(200).send(query_results.rows);
  })
});

app.listen(PORT, () =>
console.log(`Listening on port ${PORT}`)
);