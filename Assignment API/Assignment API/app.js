import cors from 'cors';
import express from 'express';
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.options('*', cors());

const cityRouter = require('./routers/cityRouter')();
app.use('/api', cityRouter);
const apartmentRouter = require('./routers/apartmentRouter')();
app.use('/api', apartmentRouter);
const schoolRoute = require('./routers/schoolRouter')();
app.use('/school', schoolRoute);

app.server = app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

export default app;