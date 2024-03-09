'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('nodes', [
      {
        id: '40c08597-977f-490e-aab0-ce1a89e33fb9',
        name: 'تحقیقاتی وتولیدی سینا ژن',
        value: 1,
        symbolSize: 30,
        category: 1,
      },
      {
        id: '73f37012-dec4-4630-bab7-597ddac19d79',
        name: 'فولاد آلیاژی ایران',
        value: 2,
        symbolSize: 10,
        category: 1,
      },
      {
        id: '2a02df8e-d642-435a-943d-099092f36455',
        name: 'غلتک سازان سپاهان',
        value: 3,
        symbolSize: 10,
        category: 1,
      },
      {
        id: 'a41df08a-d884-462d-a564-11d891525e30',
        name: 'آریوژن فارمد',
        value: 1,
        symbolSize: 10,
        category: 1,
      },
      {
        id: '399e2459-37c8-431f-a00e-7499c87f4d28',
        name: 'سیم و کابل ابهر',
        value: 2,
        symbolSize: 10,
        category: 1,
      },
      {
        id: '2c485f0d-d3fe-41f3-8e89-33d205566fa2',
        name: 'تولیدی فاران شیمی تویسرکان',
        value: 3,
        symbolSize: 10,
        category: 1,
      },
      {
        id: '5af175c2-7272-4bf0-9e37-2794b5e52eb6',
        name: 'پتروشیمی کارون',
        value: 3,
        symbolSize: 10,
        category: 1,
      },
      {
        id: '2ce85ff3-fa6c-4c77-8c16-657ba72b2703',
        name: 'پویندگان راه سعادت',
        value: 3,
        symbolSize: 10,
        category: 1,
      },
      {
        id: '8322882c-f58b-4d4a-81dc-07157efe8236',
        name: 'ریخته گری تراکتورسازی ایران',
        value: 4,
        symbolSize: 10,
        category: 1,
      },
      {
        id: '2e1e0b86-c7ac-4a01-a213-4c9dc087f652',
        name: 'تولید مواد اولیه داروپخش',
        value: 3,
        symbolSize: 10,
        category: 1,
      },
      {
        id: 'd7129d16-bafa-4d21-979d-73906862d56f',
        name: 'نانو فناوران داروئی الوند',
        value: 3,
        symbolSize: 10,
        category: 1,
      },
      {
        id: '1401b505-b262-4f97-8224-796191134197',
        name: 'مجتمع فرو آلیاژ رباط',
        value: 3,
        symbolSize: 30,
        category: 1,
      },
      {
        id: '2a02df8e-d642-435a-943d-099092f36415',
        name: 'نیان الکترونیک',
        value: 3,
        symbolSize: 30,
        category: 1,
      },
      {
        id: 'a41df08a-d884-462d-a564-11d891525e39',
        name: 'الکترونیک افزار آزما',
        value: 3,
        symbolSize: 30,
        category: 1,
      },
      {
        id: '399e2459-37c8-431f-a00e-7499c87f4d20',
        name: 'فرآورده های پویش دارو',
        value: 3,
        symbolSize: 30,
        category: 1,
      },
      {
        id: '2c485f0d-d3fe-41f3-8e89-33d205566fa1',
        name: 'تولیدی صنعتی مخزن فولاد رافع',
        value: 3,
        symbolSize: 30,
        category: 1,
      },



    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('nodes', {
      id: [
        "40c08597-977f-490e-aab0-ce1a89e33fb9",
        "1401b505-b262-4f97-8224-796191134197",
        "2a02df8e-d642-435a-943d-099092f36455",
        "73f37012-dec4-4630-bab7-597ddac19d79",
        "a41df08a-d884-462d-a564-11d891525e30",
        "a41df08a-d884-462d-a564-11d891525e30",
        '5af175c2-7272-4bf0-9e37-2794b5e52eb6',
        '2ce85ff3-fa6c-4c77-8c16-657ba72b2703',
        '8322882c-f58b-4d4a-81dc-07157efe8236',
        '2e1e0b86-c7ac-4a01-a213-4c9dc087f652',
        'd7129d16-bafa-4d21-979d-73906862d56f',
        '399e2459-37c8-431f-a00e-7499c87f4d28',
        '2c485f0d-d3fe-41f3-8e89-33d205566fa2',
        '',
        '',
        '',
      ]
    });
  }
};
