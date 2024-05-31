const { BodyWithLocale } = require("kernels/rules");
const { index } = require("../controllers/postController");

const postValidation = {
    index: [
        new BodyWithLocale('title').notEmpty(),
        //other rules goes here
    ],
    create: [
        //rules
    ]
}


module.exports = postValidation