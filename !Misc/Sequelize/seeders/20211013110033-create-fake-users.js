"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          uuid: "b2a7be0e-ca67-4879-a2a8-43744b4b3504",
          name: "Stillwater",
          email: "stillwater@gmail.com",
          role: "user",
          createdAt: "2021-10-13T06:08:44.592Z",
          updatedAt: "2021-10-13T06:08:44.592Z",
        },
        {
          uuid: "42619975-92e6-447d-89e1-a72fe07580b3",
          name: "Alok",
          email: "alok@gmail.com",
          role: "admin",
          createdAt: "2021-10-13T06:08:44.592Z",
          updatedAt: "2021-10-13T06:08:44.592Z",
        },
        {
          uuid: "05cc49dc-f917-42ef-a3be-047ce1de278e",
          name: "Goblin",
          email: "goblin@gmail.com",
          role: "user",
          createdAt: "2021-10-13T06:08:44.592Z",
          updatedAt: "2021-10-13T06:08:44.592Z",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
