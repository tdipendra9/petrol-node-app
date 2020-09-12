const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const axios = require("axios");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Creating and Conecting to SQLite Database
const db_name = path.join(__dirname, "data", "apptest.db");

const db = new sqlite3.Database(db_name, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successfully Connected to  Database ");
});

// Creating Relational Normalized Tables in Database
const second = `CREATE TABLE IF NOT  EXISTS SECOND(
                      PRODUCT_ID INT(20)    NOT NULL   ,
                      PRODUCT_NAME VARCHAR(200) NOT NULL ,
                      PRIMARY KEY(PRODUCT_ID)
                      )`;
db.run(second, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successfully Created Second Table inside Database");
});
const third = `CREATE TABLE IF NOT EXISTS THIRD (
  YEAR_ID INT(20) NOT NULL ,
  TRADE_YEAR VARCHAR(200) NOT NULL ,
  PRIMARY KEY(YEAR_ID)
)`;
db.run(third, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successfully Created Third Table inside Database");
});
const first = `
CREATE TABLE IF NOT EXISTS FIRST(
ID INTEGER(10) NOT NULL ,
PRODUCT_ID INT(20) NOT NULL,
YEAR_ID INT(20) NOT NULL ,
SALES  VARCHAR(100) ,
PRIMARY KEY(ID),
CONSTRAINT FK_1 FOREIGN KEY (PRODUCT_ID) REFERENCES SECOND(PRODUCT_ID) ON UPDATE CASCADE ON DELETE CASCADE,
CONSTRAINT FK_2  FOREIGN KEY (YEAR_ID) REFERENCES THIRD(YEAR_ID) ON UPDATE CASCADE ON DELETE CASCADE
) `;

db.run(first, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successfully Created First Table inside Database");
});

app.get("/", (req, res) => {
  //Storing data from given api into new table inside apptest.db database

  axios
    .get(
      "https://raw.githubusercontent.com/younginnovations/internship-challenges/master/programming/petroleum-report/data.json"
    )
    .then((result) => {
      db.serialize(function () {
        db.run(
          "CREATE TABLE IF NOT EXISTS DATA (ID ,Year,Petroleum_product, Sale )"
        );
        const sql_insert = db.prepare("INSERT INTO DATA VALUES (?,?,?,?)");
        for (let i = 0; i < result.data.length; i++) {
          var year = result.data[i].year;
          var petroleumProduct = result.data[i].petroleum_product;
          var sale = result.data[i].sale;
          sql_insert.run(i, year, petroleumProduct, sale);
        }
        sql_insert.finalize();
        res.render("home");
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/firstProblem", (req, res) => {
  axios
    .get(
      "https://raw.githubusercontent.com/younginnovations/internship-challenges/master/programming/petroleum-report/data.json"
    )
    .then((result) => {
      output = result.data;
      //console.log(output[1]);
      res.render("index1", { output });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/secondProblem", (req, res) => {
  const sql = "SELECT * FROM DATA ";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    // console.log(rows);
    res.render("index2", { model: rows });
  });
});
app.get("/thirdProblem", (req, res) => {
  let sql1 = `SELECT * FROM FIRST`;
  let sql2 = `SELECT * FROM SECOND`;
  let sql3 = `SELECT * FROM THIRD`;

  db.all(sql1, [], (err, first) => {
    if (err) {
      throw err;
    } // console.log(first);
    db.all(sql2, [], (err, second) => {
      if (err) {
        throw err;
      } // console.log(second);
      db.all(sql3, [], (err, third) => {
        if (err) {
          throw err;
        } // console.log(third);
        res.render("index3", { first, second, third });
      });
    });
  });
});

app.get("/fourthProblem", (req, res) => {
  axios
    .get(
      "https://raw.githubusercontent.com/younginnovations/internship-challenges/master/programming/petroleum-report/data.json"
    )
    .then((result) => {
      start = "";
      end = "";
      item = "";
      out = [];

      for (let i = 0; i < result.data.length; i++) {
        var year = result.data[i].year;
        var product = result.data[i].petroleum_product;
        var sale = result.data[i].sale;

        if (product == "Petrol") {
          if (year == 2000) {
            start = year;
            end = 2004;
            item = product;
            out.push({ start, end, item });
          } else if (year == 2005) {
            start = year;
            end = 2009;
            item = product;
            out.push({ start, end, item });
          } else if (year == 2010) {
            start = year;
            end = 2014;
            item = product;
            out.push({ start, end, item });
          } else {
            console.log("PL");
          }
        } else if (product == "Diesel") {
          if (year == 2000) {
            start = year;
            end = 2004;
            item = product;
            out.push({ start, end, item });
          } else if (year == 2005) {
            start = year;
            end = 2009;
            item = product;
            out.push({ start, end, item });
          } else if (year == 2010) {
            start = year;
            end = 2014;
            item = product;
            out.push({ start, end, item });
          } else {
            console.log("DL");
          }
        } else if (product == "Kerosene") {
          if (year == 2000) {
            start = year;
            end = 2004;
            item = product;
            out.push({ start, end, item });
          } else if (year == 2005) {
            start = year;
            end = 2009;
            item = product;
            out.push({ start, end, item });
          } else if (year == 2010) {
            start = year;
            end = 2014;
            item = product;
            out.push({ start, end, item });
          } else {
            console.log("KE");
          }
        } else if (product == "Aviation Turbine Fuel") {
          if (year == 2000) {
            start = year;
            end = 2004;
            item = product;
            out.push({ start, end, item });
          } else if (year == 2005) {
            start = year;
            end = 2009;
            item = product;
            out.push({ start, end, item });
          } else if (year == 2010) {
            start = year;
            end = 2014;
            item = product;
            out.push({ start, end, item });
          } else {
            console.log("ATF");
          }
        } else if (product == "Light Diesel Oil") {
          if (year == 2000) {
            start = year;
            end = 2004;
            item = product;
            out.push({ start, end, item });
          } else if (year == 2005) {
            start = year;
            end = 2009;
            item = product;
            out.push({ start, end, item });
          } else if (year == 2010) {
            start = year;
            end = 2014;
            item = product;
            out.push({ start, end, item });
          } else {
            console.log("LDO");
          }
        } else if (product == "Furnace Oil") {
          if (year == 2000) {
            start = year;
            end = 2004;
            item = product;
            out.push({ start, end, item });
          }
          if (year == 2005) {
            start = year;
            end = 2009;
            item = product;
            out.push({ start, end, item });
          } else if (year == 2010) {
            start = year;
            end = 2014;
            item = product;
            out.push({ start, end, item });
          } else {
            console.log("FO");
          }
        } else if (product == "LPG in MT") {
          if (year == 2000) {
            start = year;
            end = 2004;
            item = product;
            out.push({ start, end, item });
          } else if (year == 2005) {
            start = year;
            end = 2009;
            item = product;
            out.push({ start, end, item });
          } else if (year == 2010) {
            start = year;
            end = 2014;
            item = product;
            out.push({ start, end, item });
          } else {
            console.log("LPGMT");
          }
        } else if (product == "Mineral Turpentine Oil") {
          if (year == 2000) {
            start = year;
            end = 2004;
            item = product;
            out.push({ start, end, item });
          } else if (year == 2005) {
            start = year;
            item = product;
            end = 2009;
          } else if (year == 2010) {
            start = year;
            end = 2014;
            item = product;
            out.push({ start, end, item });
          } else {
            console.log("MTO");
          }
        } else {
          console.log("not in use");
        }
      }

      for (j = 0; j < out.length; j++) {
        a = out[j].start;
        b = out[j].end;
        c = out[j].item;
        // console.log(typeof a);
        // console.log(typeof b);
        // console.log(typeof c);

        let sql1 = `
        SELECT  PETROLEUM_PRODUCT, YEAR,min(SALE), max(SALE), avg(SALE)
        FROM DATA WHERE (YEAR BETWEEN '${a}' AND '${b}'
        AND PETROLEUM_PRODUCT = '${c}' ) ; `;
        db.get(sql1, [], (err, rows) => {
          if (err) {
            throw err;
          }

          // console.log(rows);
          // aa = [rows];
          // console.log(aa);

          // res.render("index4", { model: aa });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

let port = 5000;
app.listen(port, () => console.log("server started at  " + port));
