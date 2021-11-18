const fs = require('fs')
const path = `./.env`
const vars = `
 REACT_APP_ERD_NOTATION_CHEN=${process.env.REACT_APP_ERD_NOTATION_CHEN}
`
fs.writeFileSync(path, vars)