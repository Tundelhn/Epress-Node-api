const express = require('express');
const app = express();
const path = require('path');
const logger = require('./middleware/logger');
const members = require('./routes/api/members');
const exphbr = require('express-handlebars');
const Members = require('./Members');

//app.use(logger);

app.engine('handlebars', exphbr({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/members', members);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'MEMBER APPLICATIONs',
    members: Members
  });
});
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
