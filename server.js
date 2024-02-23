// Importing required dependencies and modules
const express = require("express");
const mongoose = require("mongoose");
const Course = require("./models/courseModel"); // Assuming there's a course model defined in "./models/courseModel"

// Creating an Express application
const app = express();
const PORT = 8080;

// Route for the root endpoint
app.get("/", (req, res) => {
  res.send("WELCOME TO ROOT ROUTE OF THE API");
});

// Route to get courses sorted by name
app.get("/courses/getCoursesSortedByName", async (req, res) => {
  try {
    // Fetching all courses from the database
    const years = await Course.find();
    let courses = [];
    // Extracting courses from each year and merging them into a single array
    years.forEach((year) => {
      ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
        if (year[yearKey]) {
          courses.push(...year[yearKey]);
        }
      });
    });
    // Sorting courses by description (name) and sending the result as JSON
    courses.sort((a, b) => a.description.localeCompare(b.description));
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get course names and specializations
app.get("/courses/getCoursesNameAndSpecialization", async (req, res) => {
  try {
    // Fetching all courses from the database
    const years = await Course.find();
    let courses = [];
    // Extracting courses from each year and merging them into a single array
    years.forEach((year) => {
      ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
        if (year[yearKey]) {
          courses.push(...year[yearKey]);
        }
      });
    });
    // Extracting only the description and tags from each course and sending the result as JSON
    const descriptionsAndTags = courses.map((course) => ({
      description: course.description,
      tags: course.tags,
    }));
    res.json(descriptionsAndTags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get published courses with specific tags
app.get("/courses/getPublishedCourses", async (req, res) => {
  try {
    // Fetching all courses from the database
    const years = await Course.find();
    let courses = [];
    // Extracting courses from each year and merging them into a single array
    years.forEach((year) => {
      ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
        if (year[yearKey]) {
          courses.push(...year[yearKey]);
        }
      });
    });
    // Filtering courses based on specific tags and extracting description and tags, then sending the result as JSON
    const descriptionsAndTags = courses
      .filter(
        (course) => course.tags.includes("BSIT") || course.tags.includes("BSIS")
      )
      .map((course) => ({
        description: course.description,
        tags: course.tags,
      }));
    res.json(descriptionsAndTags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Connecting to MongoDB
mongoose
  .connect("mongodb://localhost:27017/mongo-test")
  .then(() => {
    console.log("Database Connected!");
    // Start the server after successful database connection
    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}...`);
    });
  })
  .catch((error) => {
    console.log(error);
  });