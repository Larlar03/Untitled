'use strict';

const { app } = require('./users');

app.listen(3000, () => {
	console.info('Listening on port 3000.');
});
