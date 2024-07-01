"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          fullname: "Hà Đình Hoàng",
          avatar: "1.png",
          username: "hoang",
          email: "aaa@gmail.com",
          phone: "0365203656",
          birthday: "2003-03-11",
          password: "hoang12345",
          address: "thanh hoa",
          role_id: 1,
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
