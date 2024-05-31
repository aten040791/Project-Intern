const { BodyWithLocale, ParamWithLocale } = require("kernels/rules");

const postValidation = {
    index: [
        //other rules goes here
    ],

    getById: [
        new ParamWithLocale('id').notEmpty(),
    ],

    create: [
        new BodyWithLocale('title').notEmpty(),
        new BodyWithLocale('body').notEmpty(),
    ],
    update: [
        new ParamWithLocale('id').notEmpty(),
        new BodyWithLocale('title').notEmpty(),
        new BodyWithLocale('body').notEmpty(),
    ],
    delete: [
        new ParamWithLocale('id').notEmpty(),
    ]
}


module.exports = postValidation