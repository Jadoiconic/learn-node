const express = require("express");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 8000;

// reading a file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours.json`));

app.use(express.json());

// get method
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "Success",
    results: tours.data.length,
    data: { tours },
  });
});

// get tour by Id
app.get("/api/v1/tours/:q", (req, res) => {
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
});

// post method
app.post("/api/v1/tours", (req, res) => {
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
});

// Update tour by Id
app.patch("/api/v1/tours/:q", (req, res) => {
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
});

// Delete tour by Id
app.delete("/api/v1/tours/:q", (req, res) => {
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
});

// app listen on server
app.listen(port, () => {
  console.log(`Server is runnig on http://localhost:${port}`);
});
