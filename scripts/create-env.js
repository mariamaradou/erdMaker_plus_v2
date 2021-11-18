const fs = require('fs')
const path = `./.env`
const vars = `
 REACT_APP_ERD_NOTATION_CHEN=${process.env.REACT_APP_ERD_NOTATION_CHEN}\n
 NODE_ENV = ${process.env.NODE_ENV}\n
 REACT_APP_DO_HOST = ${process.env.REACT_APP_DO_HOST}\n
 REACT_APP_EER_MODEL ==  ${process.env.REACT_APP_EER_MODEL}
`
fs.writeFileSync(path, vars)