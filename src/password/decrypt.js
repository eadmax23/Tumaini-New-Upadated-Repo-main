const bycrypt = require('bcryptjs')

console.log("Meee")
compare = (hash, password) =>
{
    const value = bycrypt.compareSync(hash,password);
    return value;
}

//console.log(compare("YelTec",'$2a$10$5xWzrHl1Vsct72BcgNsEPuGN/uIRDwoF6qDIIcIxZUk6Hn6FWVPGO' ))
// let name = compare("aaaaaaaa","$2a$10$dVQs5PYadLML2N3v5QMqKufumSYqmyW.xpEl4XPKhspmWuI9lVahK");
// console.log(name)
module.exports = compare;