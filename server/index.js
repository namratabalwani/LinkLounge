const express = require('express');

const app = express();

app.get('/', console.log("WE GOT A REQUEST. YAYYYYY!"));

const PORT = 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));