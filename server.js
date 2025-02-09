const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.json({ message: "Hello from Backend Microservice!" });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Backend service running on port ${port}`);
});
