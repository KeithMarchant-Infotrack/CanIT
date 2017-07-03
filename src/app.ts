import * as express from 'express';

const app = express();
const port = 3000;

app.get('/health', (req, res) => {
    res.send("I'm alive!");
});

app.listen(port, () => console.log(`CanIT is running on port ${port}.`));