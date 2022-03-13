const bodyParser = require("body-parser");
const express = require("express");
const httpProxy = require("express-http-proxy");
const fs = require("fs");
const markdownIt = require("markdown-it");
const markdownItFrontmatter = require("markdown-it-front-matter");
const path = require("path");
const pug = require("pug");

const app = express();

/** Netlify sends large JSON blobs, e.g. base64 images. Allow that behavior */
app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));

/** Proxy netlify CMS proxy server to prevent client-side CORS errors */
app.use("/proxy", httpProxy("http://localhost:8081"));

/** Configure template engine */

const markdownCompiler = markdownIt().use(
  markdownItFrontmatter,
  (/* frontmatter */) => {
    // this callback is required my markdown it...
    // nothing to do here...
  }
);
app.get("/plants/:plantId", function (request, response, next) {
  const plantId = request.params.plantId;
  if (typeof plantId !== "string" || plantId.length === 0) {
    next();
    return;
  }

  let plantMd;
  try {
    plantMd = fs.readFileSync(
      path.resolve(process.cwd(), "data", "plants", `${plantId}.md`),
      { encoding: "utf8" }
    );
  } catch (plantNotFoundError) {
    // let 404 middleware handle plant not found
    next();
    return;
  }
  try {
    const plantDataHtml = markdownCompiler.render(plantMd);
    const plantCompiler = pug.compileFile(
      path.resolve(process.cwd(), "data/plants/template.pug"),
      {
        environment: "development",
      }
    );
    const plantHtml = plantCompiler({ plantDataHtml: plantDataHtml });
    response.send(plantHtml);
  } catch (renderError) {
    console.log("render", renderError);
    response.status(500);
    response.send("I goofed up");
  }
});

/** Attempt to fetch static asset */
app.use(
  express.static(path.resolve(process.cwd(), "site"), {
    extensions: ["html"],
  })
);

/** Everything else is 404 */
app.get("*", function (request, response) {
  response.status(404);
  response.send(
    pug.renderFile(path.resolve(process.cwd(), "site/404.pug"), {
      environment: "development",
    })
  );
});

app.listen(3000, function () {
  console.log("Listening on port 3000");
});
