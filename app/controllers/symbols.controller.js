const db = require("../models");
const Binance = require("binance-api-node").default;
const client = Binance();
const Symbols = db.symbols;
const Checking = db.checking;
const cron = require("node-cron");
const { StochasticRSI } = require("technicalindicators");
const stochLinePeriod = 14;
const rsiLinePeriod = 14;
const kPeriod = 3;
const dPeriod = 3;

// Set the %K and %D range
const kRange = [0, 20];
const dRange = [0, 20];
function CheckingRSI(data) {
   const kRange1 = [0, 20];
   const dRange1 = [0, 20];
   data.forEach((currency, index) => {
      const symbol = currency.name;
      client
         .candles({ symbol, interval: "1h", limit: 500 })
         .then((candles) => {
            // Extract the closing prices from the candlestick data
            const closePrices = candles.map((candle) =>
               parseFloat(candle.close)
            );

            // Calculate the Stochastic RSI
            const stochRsiInput = {
               values: closePrices,
               rsiPeriod: rsiLinePeriod,
               stochasticPeriod: stochLinePeriod,
               kPeriod,
               dPeriod,
            };
            const stochRsi = StochasticRSI.calculate(stochRsiInput);

            // Get the last value of the MA Stoch Line and MA Stoch RSI Line
            const maStochLineCurrent = stochRsi[stochRsi.length - 1].k;
            const maStochRsiLineCurrent = stochRsi[stochRsi.length - 1].d;

            // Check if the MA Stoch Line is up

            // Check if the MA Stoch RSI Line is between %K and %D range
            if (
               maStochLineCurrent >= kRange1[0] &&
               maStochLineCurrent <= kRange1[1] &&
               maStochRsiLineCurrent >= dRange1[0] &&
               maStochRsiLineCurrent <= dRange1[1]
            ) {
               if (maStochLineCurrent < maStochRsiLineCurrent) {
                  // Save symbols in the database
                  Checking.deleteMany({ name: symbol }, (error, result) => {
                     if (error) {
                        console.error(
                           "An error occurred while deleting documents:",
                           error
                        );
                        return;
                     }

                     // The `result` variable contains the deletion result
                     console.log("Deletion result:", result);
                  });
               } else {
               }
            } else {
            }
         })
         .catch((error) => {});

      // Fetch historical candlestick data for the symbol
   });
}
function UpdateData(data) {
   const kRange1 = [0, 20];
   const dRange1 = [0, 20];
   data.forEach((currency, index) => {
      const symbol = currency.name;
      const documentId = currency._id;
      client
         .candles({ symbol, interval: "1h", limit: 500 })
         .then((candles) => {
            // Extract the closing prices from the candlestick data
            const closePrices = candles.map((candle) =>
               parseFloat(candle.close)
            );

            // Calculate the Stochastic RSI
            const stochRsiInput = {
               values: closePrices,
               rsiPeriod: rsiLinePeriod,
               stochasticPeriod: stochLinePeriod,
               kPeriod,
               dPeriod,
            };
            const stochRsi = StochasticRSI.calculate(stochRsiInput);

            // Get the last value of the MA Stoch Line and MA Stoch RSI Line
            const maStochLineCurrent = stochRsi[stochRsi.length - 1].k;
            const maStochRsiLineCurrent = stochRsi[stochRsi.length - 1].d;

            // Check if the MA Stoch Line is up

            // Check if the MA Stoch RSI Line is between %K and %D range
            if (
               (maStochLineCurrent >= kRange1[0] &&
                  maStochLineCurrent <= kRange1[1]) ||
               (maStochRsiLineCurrent >= dRange1[0] &&
                  maStochRsiLineCurrent <= dRange1[1])
            ) {
               if (maStochLineCurrent > maStochRsiLineCurrent) {
                  // Save symbols in the database
                  const newValue = maStochLineCurrent - maStochRsiLineCurrent;
                  Checking.findByIdAndUpdate(
                     documentId,
                     { $set: { spreads: newValue } },
                     { useFindAndModify: false },
                     (error, result) => {
                        if (error) {
                           console.error(
                              "An error occurred while deleting documents:",
                              error
                           );
                           return;
                        }

                        // The `result` variable contains the update result
                        console.log("Update result:", result);
                     }
                  );
               } else {
               }
            } else {
            }
         })
         .catch((error) => {});

      // Fetch historical candlestick data for the symbol
   });
}
// Create and Save a new Tutorial
exports.create = (req, res) => {
   // Validate request

   // Create a Tutorial
   const symbols = new Symbols({
      title: req.body.title ? req.body.title : "SCUSDT",
      spreads: req.body.spreads ? req.body.spreads : 3.657559198542803,
   });

   // Save Tutorial in the database
   symbols
      .save(symbols)
      .then((data) => {
         res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the Tutorial.",
         });
      });
};

// Retrieve all Tutorials from the database.

exports.findAll = (req, res) => {
   Symbols.find()
      .sort({ spreads: "desc" })
      .then((data) => {
         res.send(data)
         console.log("Data Retrived");
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving tutorials.",
         });
      });
};

// Find a single Tutorial with an id
const Chacking = () => {
   client
      .exchangeInfo()
      .then((exchangeInfo) => {
         // Get all symbols
         const symbols = exchangeInfo.symbols;
         const array2 = [
            "BUSDUSDT",
            "BTTCUSDT",
            "USDCUSDT",
            "TUSDUSDT",
            "BTCUSDT",
            "ETHUSDT",
            "USDPUSDT",
            "EURUSDT",
            "FUNUSDT",
         ];
         // Filter for cryptocurrencies of interest
         const goodCurrencies = symbols.filter(
            (symbol) =>
               symbol.quoteAsset === "USDT" &&
               symbol.isSpotTradingAllowed &&
               symbol.status === "TRADING" &&
               !array2.includes(symbol.symbol)
            // Filter condition - adjust as per your requirements
         );
         Symbols.deleteMany({})
            .then((data) => {
               console.log(
                  " were deleted successfully! / / / / / / / / / / / / / / / / / / / / / / / / / / /"
               );
            })
            .catch((err) => {
               console.log(err);
            });

         // Iterate over the filtered currencies
         goodCurrencies.forEach((currency, index) => {
            const symbol = currency.symbol;
            client
               .candles({ symbol, interval: "1h", limit: 500 })
               .then((candles) => {
                  // Extract the closing prices from the candlestick data
                  const closePrices = candles.map((candle) =>
                     parseFloat(candle.close)
                  );

                  // Calculate the Stochastic RSI
                  const stochRsiInput = {
                     values: closePrices,
                     rsiPeriod: rsiLinePeriod,
                     stochasticPeriod: stochLinePeriod,
                     kPeriod,
                     dPeriod,
                  };
                  const stochRsi = StochasticRSI.calculate(stochRsiInput);

                  // Get the last value of the MA Stoch Line and MA Stoch RSI Line
                  const maStochLineCurrent = stochRsi[stochRsi.length - 1].k;
                  const maStochRsiLineCurrent = stochRsi[stochRsi.length - 1].d;

                  // Check if the MA Stoch Line is up

                  // Check if the MA Stoch RSI Line is between %K and %D range
                  if (
                     (maStochLineCurrent >= kRange[0] &&
                        maStochLineCurrent <= kRange[1]) ||
                     (maStochRsiLineCurrent >= dRange[0] &&
                        maStochRsiLineCurrent <= dRange[1])
                  ) {
                     if (maStochLineCurrent > maStochRsiLineCurrent) {
                        // const value =
                        //    maStochLineCurrent - maStochRsiLineCurrent;
                        const value =
                           maStochLineCurrent - maStochRsiLineCurrent;

                        const symbols = new Symbols({
                           title: symbol ? symbol : "SCUSDT",
                           spreads: value ? value : 3.657559198542803,
                        });

                        // Save symbols in the database
                        symbols
                           .save(symbols)
                           .then((data) => {
                              console.log("saved");
                           })
                           .catch((err) => {
                              console.log(err);
                           });
                     } else {
                     }
                  } else {
                  }
               })
               .catch((error) => {});

            // Fetch historical candlestick data for the symbol
         });
      })
      .catch((error) => {
         console.log("Error " + symbol);
      });
   Symbols.find()
      .sort({ spreads: "desc" })
      .then((data) => {
         Checking.countDocuments({}, (error, count) => {
            if (error) {
               console.error(
                  "An error occurred while checking the length:",
                  error
               );
               return;
            }

            if (count === 5) {
               Symbols.find()
                  .sort({ spreads: "desc" })
                  .then((symbol) => {
                     if (symbol.length == 0) {
                        console.log("No Symblo");
                     } else {

                     }

            } else {
               Checking.findOne({ name: data[0].title }, (error, document) => {
                  if (error) {
                     console.error(
                        "An error occurred while finding the document:",
                        error
                     );
                     return;
                  }
                  if (document) {
                     Checking.find().then((res) => {
                        UpdateData(res);
                        CheckingRSI(res);
                     });
                  } else {
                     const location = new Checking({
                        name: data[0].title ? data[0].title : "LINAUSDT",
                        spreads: data[0].spreads ? data[0].spreads : "",
                     });
                     location
                        .save(location)
                        .then((res) => {
                           console.log(`New checking created!`, res);
                        })
                        .catch((err) => {
                           console.log("Err", err);
                        });
                  }

                  // The `document` variable contains the first document matching the value
               });
            }
         });
      })
      .catch((err) => {});
};
exports.findOne = (req, res) => {
   const id = req.params.id;

   Symbols.findById(id)
      .then((data) => {
         if (!data)
            res.status(404).send({
               message: "Not found Tutorial with id " + id,
            });
         else res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message: "Error retrieving Tutorial with id=" + id,
         });
      });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
   if (!req.body) {
      return res.status(400).send({
         message: "Data to update can not be empty!",
      });
   }

   const id = req.params.id;
   Symbols.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
            });
         } else res.send({ message: "Tutorial was updated successfully." });
      })
      .catch((err) => {
         res.status(500).send({
            message: "Error updating Tutorial with id=" + id,
         });
      });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
   const id = req.params.id;

   Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
            });
         } else {
            res.send({
               message: "Tutorial was deleted successfully!",
            });
         }
      })
      .catch((err) => {
         res.status(500).send({
            message: "Could not delete Tutorial with id=" + id,
         });
      });
};

// UNDisplay for list without Delete
exports.published = (req, res) => {
   const id = req.params.id;

   Symbols.findByIdAndUpdate(
      id,
      {
         $set: {
            published: false,
         },
      },
      { useFindAndModify: false }
   )
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
            });
         } else res.send({ message: "Tutorial was updated successfully." });
      })
      .catch((err) => {
         res.status(500).send({
            message: "Error updating Tutorial with id=" + id,
         });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
   Symbols.deleteMany({})
      .then((data) => {
         res.send({
            message: `${data.deletedCount} Tutorials were deleted successfully!/ / / / / / / / / / / / / / / / / / / / / / / / / / /`,
         });
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while removing all tutorials.",
         });
      });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
   Symbols.find({ published: true })
      .then((data) => {
         res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving tutorials.",
         });
      });
};
cron.schedule("*/30 * * * * *", () => {
   Chacking();
});

// cron.schedule("* * * * * *", () => {
//    console.log("khaleed abu hawwas");
// });
