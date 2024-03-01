export default is used to export a file 
after exporting the file you can now use the file to get the various functions or variables

e.g 
export default { 
    get, post
}

import test from "./test/testcontroller"

for export it is used to export each function or variable independently like
export {get, post}

import {get, post} from "./test/testcontroller


destructuring is used to assign an object or array of objects or array directly to the variables which makes it more readable

example
person = {
    fn : "david",
    ln: "mayowa"
}
without destructuring
const fn = person.fn
const ln = person.ln

but with destructuring
const {fn, ln} = person

for req.body


