const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const target = "https://rally1.rallydev.com/slm/attachment/"; // Replace with your API server URL

// Create a proxy for requests to the API server
const apiProxy = createProxyMiddleware({
  target,
  changeOrigin: true,
  headers: {
    ZSESSIONID: `${process.env.REACT_APP_ZSESSIONID}`,
    WorkspaceId: `${process.env.REACT_APP_WORKSPACEID}`,
  },
  // Optionally, you can add additional configuration options here
});
app.use(cors());
// Apply the proxy to all requests starting with '/api'
app.use("/", apiProxy);

// Start the server
const port = 3100; // Choose a port number
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
