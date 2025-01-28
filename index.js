// Module imports
import express from "express";
import axios from "axios";

// Express server setup
const app = express();
const port = 3000;

// Joke API setup
const jokeEndpoint = "https://v2.jokeapi.dev/joke/programming";

// Static content folder setup
app.use(express.static("public"));

// Home page handler (ASYNC modifier needed)
app.get("/", async (req, res) => {
  // Try Joke API call...
  try {
    // AWAIT modifier needed as the method returns a Promise
    var result = await axios.get(jokeEndpoint);

    // If all goes well, go on...
    var data;

    // Check joke type (single or double), format accordingly in order
    // to render the view.
    //
    // Also, new line characters ('\n') in the text are substituted for
    // equivalent HTML 'break' tags.
    //
    // For those <br> tags to render correctly, the view will use
    // "<%- %>" (dash) EJS tags instead of the usual "<%= %>" (equal)
    // ones.
    if (result.data.type == "single") {
      // Single statement joke
      data = {
        setup: result.data.joke.replaceAll("\n", "<br>"),
        delivery: "",
      };
    } else {
      // Setup and punchline joke
      data = {
        setup: result.data.setup.replaceAll("\n", "<br>"),
        delivery: result.data.delivery.replaceAll("\n", "<br>"),
      };
    }

    // Render main view passing the returned API data to it.
    // The 'data' object has the two keys "setup" and "delivery"
    // expected by the view in them.
    res.render("index.ejs", data);
    //
  } catch (error) {
    // API call error handling
    // Log error message and give return code 500
    console.log(error.response.data);
    res.status(500);
  }
});

// Server start
app.listen(port, () => {
  console.log(`Server started on Port ${port}.`);
});
