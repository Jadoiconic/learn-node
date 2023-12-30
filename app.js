const express = require("express");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 8000;

// reading a file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours.json`));

app.use(express.json());

// Get all data
const getAllTours = (req, res) => {
  res.status(200).json({
    status: "Success",
    results: tours.data.length,
    data: { tours },
  });
};
const getToursById = (req, res) => {
  const id = req.params.q * 1;

  if (id > tours.data.length)
    return res.status(404).json({
      status: "Failed",
      message: "Record not found",
    });
  const tour = tours.data.find((ell) => ell.id === id);
  res.status(200).json({
    status: "Success",
    data: { tour },
  });
};

// create a tour
const createTour = (req, res) => {
  const newId = tours.data[tours.data.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.data.push(newTour);

  // writting on a source file
  fs.writeFile(`${__dirname}/data/tours.json`, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: "Success",
      data: { tours: newTour },
    });
  });
};

//   Update method

const upadateTourById = (req, res) => {
  const id = req.params.q * 1;

  if (id > tours.data.length)
    return res.status(404).json({
      status: "Failed",
      message: "Record not found",
    });
  const tour = tours.data.find((ell) => ell.id === id);
  res.status(200).json({
    status: "Success",
    data: { tour: "Updated tool here...." },
  });
};

//   Delete Tour By Id
const deleteTourById = (req, res) => {
  const id = req.params.q * 1;

  if (id > tours.data.length)
    return res.status(404).json({
      status: "Failed",
      message: "Record not found",
    });
  const tour = tours.data.find((ell) => ell.id === id);
  res.status(204).json({
    status: "Success",
    data: null,
  });
};
// Routes
app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
  .route("/api/v1/tours/:q")
  .get(getToursById)
  .patch(upadateTourById)
  .delete(deleteTourById);

// app listen on server
app.listen(port, () => {
  console.log(`Server is runnig on http://localhost:${port}`);
});
