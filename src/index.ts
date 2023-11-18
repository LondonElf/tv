import Express from "express";
import { SERVICE_GENERATORS } from "./services";
import { UserException } from "./user-exception";

const app = Express();

app.get("/", (_, res) => {
  res.redirect("https://mizapo.github.io");
});

app.use("/", Express.static('public', {
  fallthrough: true,
  extensions: ["html"]
}));

app.get("/:service", (req, res) => {
  const { u: username, p: password } = req.query;
  const service = req.params.service;

  try {
    const generator = SERVICE_GENERATORS[service?.toLowerCase()];
    if (!generator) {
      throw new UserException("Invalid service", 400);
    }

    console.log(`Generating '${service}'...`);

    // Wrap the generator call in a try-catch block
    try {
      // Pass username and password as separate arguments
      const generatorResult = generator(
        typeof username === "string" ? username : "",
        typeof password === "string" ? password : ""
      );

      // Check if the result is iterable
      if (typeof generatorResult[Symbol.iterator] !== "function") {
        throw new Error("Generator result is not iterable.");
      }

      // Convert the iterable result to an array
      const content = Array.from(generatorResult).join("\n");

      res.set({
        "Content-Type": "application/octet-stream",
        "Content-Description": "File Transfer",
        "Cache-Control": "must-revalidate",
        "Content-Disposition": `attachment; filename="LiveTV.m3u"`,
        Pragma: "public",
        Expires: "0",
      });

      res.send(content);
    } catch (generatorError) {
      console.error("Error in generator:", generatorError);
      res.status(500).send("Internal Server Error");
    }
  } catch (e) {
    console.error(e);
    e instanceof UserException
      ? res.status(e.statusCode).send(e.message)
      : res.status(500).send("Internal Server Error");
  }
});
