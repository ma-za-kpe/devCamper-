const {
    to,
    ReE,
    ReS
} = require('../services/util.service');

// get all users
const get = async function (req, res) {
    let user = req.user;

    return ReS(res, {
        user: user.toWeb()
    });
}
module.exports.get = get;