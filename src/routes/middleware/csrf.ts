const csrf = require('csurf');

const csrfProtection = csrf({ cookie: true });

export default csrfProtection;
