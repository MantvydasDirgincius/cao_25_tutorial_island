const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { PORT } = require('./config');
const userRoutes = require('./userRoutes/userRoutes');
const tutorialRoutes = require('./tutorialRoutes/tutorialRoutes');
const app = express();

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/v1', userRoutes);
app.use('/v1', tutorialRoutes);

app.all('*', (req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

app.listen(PORT, () => console.log(`pakurta ant ${PORT}`));
