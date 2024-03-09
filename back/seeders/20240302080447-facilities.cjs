'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('facilities', [
      {
        id: '2e3d25be-16a2-43b9-ac50-18f39e9f69b2',
        name: 'فعالان مجاز اقتصادی (AEO)',
        companyId:  '40c08597-977f-490e-aab0-ce1a89e33fb9',
        year: 1395,
        quantity: 0,
        type: 3,
        motevali: 'معاونت توسعه شرکت‌های دانش‌بنیان',
        tedad: 6
      },
      {
        id: '48485db9-f0d3-41ca-91df-3f8075a94f8f',
        name: 'معافیت مالیات بر حقوق کارکنان فعال در شرکت‌های مستقر در پارک‌های علم و فناوری',
        companyId:  '40c08597-977f-490e-aab0-ce1a89e33fb9',
        year: 1395,
        quantity: 724707610155,
        type: 1,
        motevali: 'سایر دستگاه‌ها',
      },
      {
        id: 'a75732a0-1f44-4c49-821f-a8819c72a0c4',
        name: 'حمایت از تبلیغات در بازارهای صادراتی',
        companyId:  '40c08597-977f-490e-aab0-ce1a89e33fb9',
        year: 1396,
        type: 2,
        motevali: 'مرکز تعاملات بین‌المللی علم و فناوری',
        tedad: 25
      },
      {
        id: '27e8dc52-bb3c-4a07-a335-7984bbc89834',
        name:'کارآموزی استعدادهای برتر در شرکت‌های دانش‌بنیان',
        companyId:  '40c08597-977f-490e-aab0-ce1a89e33fb9',
        year: 1400,
        quantity: 0,
        type: 4,
        motevali: 'سایر دستگاه‌ها',
        tedad: 100
      },
      {
        id: '758002fa-e0ce-4035-8571-070de3e5e3da',
        name:'هم‌سرمایه‌گذاری',
        companyId:  '40c08597-977f-490e-aab0-ce1a89e33fb9',
        year: 1401,
        quantity: 2540814226355,
        type: 4,
        motevali: 'صندوق نوآوری و شکوفایی',
        tedad: 0
      },
      {
        id: '856ab601-adeb-4cf1-ad94-7e49b0629c73',
        name:'مشاوره و ثبت اختراع خارجی',
        companyId:  '73f37012-dec4-4630-bab7-597ddac19d79',
        year: 1394,
        quantity: 0,
        type: 2,
        motevali: 'صندوق نوآوری و شکوفایی',
        tedad: 2
      },
      {
        id: 'e0f22861-1fb3-4b9f-958f-de4fbddee2e8',
        name:'تسهیلات تامین محل کار',
        companyId:  '73f37012-dec4-4630-bab7-597ddac19d79',
        year: 1395,
        quantity: 0,
        type: 3,
        motevali: 'صندوق نوآوری و شکوفایی',
        tedad: 10
      },
      {
        id: 'c141c6e6-0c7a-4986-ae10-04a24cbc3439',
        name:'حمایت از ورود شرکت‌ها به بورس',
        companyId:  '73f37012-dec4-4630-bab7-597ddac19d79',
        year: 1395,
        quantity: 285599861984,
        type: 1,
        motevali: 'معاونت توسعه شرکت‌های دانش‌بنیان',
        tedad: 0
      },
      {
        id: '1cd50196-5155-44d8-9c8f-11b2531b6c26',
        name:'حمایت از حضور در مناقصات بین‌المللی',
        companyId:  '73f37012-dec4-4630-bab7-597ddac19d79',
        year: 1395,
        quantity: 0,
        type:2,
        motevali: 'مرکز تعاملات بین‌المللی علم و فناوری',
        tedad: 100
      },
      {
        id: '07e0d632-cb9b-46c2-8904-ba1c5822638e',
        name:'یارانه سود تسهیلات صادراتی',
        companyId:  '73f37012-dec4-4630-bab7-597ddac19d79',
        year: 1395,
        quantity: 151632996500,
        type:1,
        motevali: 'مرکز تعاملات بین‌المللی علم و فناوری',
        tedad: 0
      },
      {
        id: 'd4406923-bbaa-4ca2-8573-6c6b6ba9721d',
        name:'نشست‌های بهره‌برداری از توان داخل',
        companyId:  '73f37012-dec4-4630-bab7-597ddac19d79',
        year: 1397,
        quantity: 0,
        type:3,
        motevali: 'معاونت توسعه شرکت‌های دانش‌بنیان',
        tedad: 12
      },
      {
        id: '4b528a3b-c5ac-4ebe-8775-aebb9307b7d8',
        name: 'تدوین گزارش تحقیقات بازار',
        companyId:  '73f37012-dec4-4630-bab7-597ddac19d79',
        year: 1397,
        quantity: 0,
        type:2,
        motevali: 'معاونت توسعه شرکت‌های دانش‌بنیان',
        tedad: 32
      },
      {
        id: '47bfa29a-b9cf-4465-9593-185551ee809d',
        name: 'تسهیل گمرکی',
        companyId:  '73f37012-dec4-4630-bab7-597ddac19d79',
        year: 1397,
        quantity: 0,
        type:3,
        motevali: 'معاونت توسعه شرکت‌های دانش‌بنیان',
        tedad: 15
      },
      {
        id: '45d014ca-7c9a-481b-99a0-817e590240b1',
        name: 'معافیت مالیاتی 4 درصد علی‌الحساب بر واردات',
        companyId:  '73f37012-dec4-4630-bab7-597ddac19d79',
        year: 1400,
        quantity: 3407691522067,
        type:1,
        motevali: 'معاونت توسعه شرکت‌های دانش‌بنیان',
        tedad: 0
      },
      {
        id: 'd52e9ba3-c9ab-4a8e-ad98-4a855d500842',
        name: 'مشاوره گمرکی',
        companyId:  '73f37012-dec4-4630-bab7-597ddac19d79',
        year: 1400,
        quantity: 0,
        type:2,
        motevali: 'معاونت توسعه شرکت‌های دانش‌بنیان',
        tedad: 53
      },
      {
        id: 'fc8c0277-1ea4-4cad-bb9c-50f480ac5ae8',
        name: 'بخشودگی جرایم بیمه تامین اجتماعی',
        companyId:  '73f37012-dec4-4630-bab7-597ddac19d79',
        year: 1402,
        quantity: 364693172958,
        type:1,
        motevali: 'معاونت توسعه شرکت‌های دانش‌بنیان',
        tedad: 0
      },
      {
        id: '2fee9400-31cf-4446-97b3-34524afcb519',
        name: ' بسته بیمه‌های اشخاص',
        companyId:  '2a02df8e-d642-435a-943d-099092f36455',
        year: 1397,
        quantity: 0,
        type:2,
        motevali: 'معاونت توسعه شرکت‌های دانش‌بنیان',
        tedad: 10
      },
      {
        id: '9a20be39-2139-4a33-b4ae-54a1a5bce67c',
        name: 'امریه نظام‌وظیفه در شرکت‌های دانش‌بنیان',
        companyId:  '2a02df8e-d642-435a-943d-099092f36455',
        year: 1397,
        quantity: 0,
        type:4,
        motevali: 'معاونت توسعه شرکت‌های دانش‌بنیان',
        tedad: 14
      },
      {
        id: '45863c67-ab8a-40b4-a4a3-5092f03c9108',
        name: 'بخشودگی جرایم بیمه تامین اجتماعی',
        companyId:  '2a02df8e-d642-435a-943d-099092f36455',
        year: 1398,
        quantity: 19144052545720,
        type:1,
        motevali: 'معاونت توسعه شرکت‌های دانش‌بنیان',
        tedad: 0
      },
      {
        id: '49d8e418-4c08-4ebf-9969-9e3185e05fe3',
        name: 'مشاروه بیمه تامین اجتماعی',
        companyId:  '2a02df8e-d642-435a-943d-099092f36455',
        year: 1399,
        quantity: 0,
        type:2,
        motevali: 'معاونت توسعه شرکت‌های دانش‌بنیان',
        tedad: 2
      },
      {
        id: '16576f2e-ff06-40df-9d90-383012538bc0',
        name: 'تسهیل عضویت شرکت‌های دانش‌بنیان در صندوق بازنشستگی آینده‌ساز',
        companyId:  '2a02df8e-d642-435a-943d-099092f36455',
        year: 1399,
        quantity: 0,
        type:3,
        motevali: 'معاونت توسعه شرکت‌های دانش‌بنیان',
        tedad: 4
      },
      {
        id: '074a812d-755a-47b3-a573-8fce667919e2',
        name: 'معافیت مالیاتی شرکت‌های دانش‌بنیان',
        companyId:  '2a02df8e-d642-435a-943d-099092f36455',
        year: 1399,
        quantity: 1008360,
        type:1,
        motevali: 'معاونت توسعه شرکت‌های دانش‌بنیان',
        tedad: 0
      },
      {
        id: 'eeb3c5cf-ed29-42b4-8b6c-c3d300274ed2',
        name: 'معافیت مالیاتی شرکت‌های دانش‌بنیان',
        companyId:  '2a02df8e-d642-435a-943d-099092f36455',
        year: 1400,
        quantity: 471734,
        type:1,
        motevali: 'سایر دستگاه‌ها',
        tedad: 0
      },
      {
        id: '6766152f-8d7b-41e3-8903-0a1184b01d4d',
        name: 'معافیت مالیات بر حقوق کارکنان فعال در شرکت‌های مستقر در پارک‌های علم و فناوری',
        companyId:  '2a02df8e-d642-435a-943d-099092f36455',
        year: 1401,
        quantity: 477372,
        type:1,
        motevali: 'سایر دستگاه‌ها',
        tedad: 0
      },
      {
        id: 'd43ab60b-8666-4553-8a30-012b0d014339',
        name: 'یارانه سود تسهیلات صادراتی',
        companyId:  '2a02df8e-d642-435a-943d-099092f36455',
        year: 1401,
        quantity: 5211918469056,
        type:1,
        motevali: 'مرکز تعاملات بین‌المللی علم و فناوری',
        tedad: 0
      },
      {
        id: 'fb5e5614-221d-4061-9c42-1daa7404ad30',
        name: 'صدور گواهی انطباق و گواهی محصول',
        companyId:  'a41df08a-d884-462d-a564-11d891525e30',
        year: 1394,
        quantity: 0,
        type:2,
        motevali:'معاونت توسعه شرکت‌های دانش‌بنیان',
        tedad: 2
      },
      {
        id: 'bb8d4197-938d-44fd-9286-e9e92eba7ec2',
        name: 'قیمت‌گذاری سهام و ارزشگذاری دانش فنی',
        companyId:  'a41df08a-d884-462d-a564-11d891525e30',
        year: 1395,
        quantity: 0,
        type:2,
        motevali:'معاونت توسعه شرکت‌های دانش‌بنیان',
        tedad: 6
      },
      {
        id: '496ed4ed-2af0-45fd-98a7-4bbeeb0aaf0c',
        name: 'خدمات شبکه آزمایشگاهی فناوری‌های راهبردی',
        companyId:  'a41df08a-d884-462d-a564-11d891525e30',
        year: 1397,
        quantity: 0,
        type:2,
        motevali:'سایر دستگاه‌ها',
        tedad: 78
      },
      {
        id: '390cda0d-fea8-48ff-bf2d-17ee0893f9a6',
        name: 'خدمات مرکز صنعتی‌سازی نانو فناوری کاربردی',
        companyId:  'a41df08a-d884-462d-a564-11d891525e30',
        year: 1398,
        quantity: 0,
        type:2,
        motevali:'سایر دستگاه‌ها',
        tedad: 1
      },
      {
        id: '918b257a-cbfa-450f-b957-6c365755bb73',
        name: 'امتیاز ارتقای مرتبه اعضای هیئت علمی',
        companyId:  'a41df08a-d884-462d-a564-11d891525e30',
        year: 1398,
        quantity: 0,
        type:3,
        motevali:'سایر دستگاه‌ها',
        tedad: 5
      },
      {
        id: '0524cf88-2e46-4fb0-add0-ec3d2a5a0b7f',
        name: 'مشارکت در تاسیس و اداره شرکت‌های دانش‌بنیان توسط دانشگاه‌ها',
        companyId:  'a41df08a-d884-462d-a564-11d891525e30',
        year: 1400,
        quantity: 0,
        type:3,
        motevali:'سایر دستگاه‌ها',
        tedad: 32
      },
      {
        id: '6300db03-5f5f-46f1-9e97-a1c571687098',
        name: 'مجوز فعالیت اعضای هیات علمی در شرکت‌های دانش‌بنیان',
        companyId:  'a41df08a-d884-462d-a564-11d891525e30',
        year: 1401,
        quantity: 0,
        type:3,
        motevali:'سایر دستگاه‌ها',
        tedad: 32
      },
      {
        id: 'ce7e403f-5c57-4238-ab30-86bee217cf2c',
        name: 'حمایت از حضور در مناقصات بین‌المللی',
        companyId:  '399e2459-37c8-431f-a00e-7499c87f4d28',
        year: 1397,
        quantity: 0,
        type:2,
        motevali:'مرکز تعاملات بین‌المللی علم و فناوری',
        tedad: 2
      },
      {
        id: '5c08ea45-334b-424b-a9ba-25e97509f7fc',
        name: 'حمایت از حضور در مناقصات بین‌المللی',
        companyId:  '399e2459-37c8-431f-a00e-7499c87f4d28',
        year: 1397,
        quantity: 0,
        type:2,
        motevali:'مرکز تعاملات بین‌المللی علم و فناوری',
        tedad: 2
      },
      {
        id: '1d54735d-979a-4dbe-b6e3-ed990a83fd20',
        name:'یارانه سود تسهیلات صادراتی',
        companyId:  '399e2459-37c8-431f-a00e-7499c87f4d28',
        year: 1397,
        quantity: 1303278878585,
        type:1,
        motevali:'مرکز تعاملات بین‌المللی علم و فناوری',
        tedad: 0
      },
      {
        id: '1c920675-1091-439f-bf2b-543cbc589ee7',
        name:'حمایت از واسطه‌های صادراتی',
        companyId:  '399e2459-37c8-431f-a00e-7499c87f4d28',
        year: 1397,
        quantity: 0,
        type:2,
        motevali:'مرکز تعاملات بین‌المللی علم و فناوری',
        tedad: 5
      },
      {
        id: '73773e7f-f5ce-4d90-a52d-335f2cda4b5e',
        name:'حمایت از آموزش بازرگانی و صادرات',
        companyId:  '399e2459-37c8-431f-a00e-7499c87f4d28',
        year: 1399,
        quantity: 0,
        type:2,
        motevali:'مرکز تعاملات بین‌المللی علم و فناوری',
        tedad: 2
      },
      {
        id: 'a456fc5b-36b4-4af4-be1a-abfdf111f5d9',
        name:'حمایت از ورود شرکت‌ها به بورس',
        companyId:  '399e2459-37c8-431f-a00e-7499c87f4d28',
        year: 1401,
        quantity: 269008914211,
        type:2,
        motevali:'معاونت توسعه شرکت‌های دانش‌بنیان',
        tedad: 0
      },
      {
        id: '01752cac-b0dc-4129-b900-c314c15d47fb',
        name:'معرفی محصولات شرکت‌های دانش‌بنیان',
        companyId:  '2c485f0d-d3fe-41f3-8e89-33d205566fa2',
        year: 1396,
        quantity: 0,
        type:4,
        motevali:'معاونت توسعه شرکت‌های دانش‌بنیان',
        tedad: 5
      },
      {
        id: 'aa1cfa16-8cb9-44d6-8b0b-6681ab4e51df',
        name:'نشست‌های بهره‌برداری از توان داخل',
        companyId:  '2c485f0d-d3fe-41f3-8e89-33d205566fa2',
        year: 1397,
        quantity: 0,
        type:4,
        motevali:'معاونت توسعه شرکت‌های دانش‌بنیان',
        tedad: 2
      },
      {
        id: '605ae4d0-684f-4fd9-9e50-a1500605a0cc',
        name:'تدوین گزارش تحقیقات بازار',
        companyId:  '2c485f0d-d3fe-41f3-8e89-33d205566fa2',
        year: 1398,
        quantity: 0,
        type:2,
        motevali:'معاونت توسعه شرکت‌های دانش‌بنیان',
        tedad: 9
      },
      {
        id: '4fb01616-5c77-4d60-bc1f-45dc75af2744',
        name:'مشاوره گمرکی',
        companyId:  '2c485f0d-d3fe-41f3-8e89-33d205566fa2',
        year: 1399,
        quantity: 0,
        type:2,
        motevali:'معاونت توسعه شرکت‌های دانش‌بنیان',
        tedad: 10
      },
      {
        id: '92cee60c-971e-44a6-bbe9-48ab96a36130',
        name:'معافیت از پرداخت حق بیمه‌قراردادها',
        companyId:  '2c485f0d-d3fe-41f3-8e89-33d205566fa2',
        year: 1400,
        quantity: 9830340054839,
        type:1,
        motevali:'معاونت توسعه شرکت‌های دانش‌بنیان',
        tedad: 0
      },
      {
        id: 'f0ed3623-245e-464f-8a81-4966351dcc1b',
        name:' بخشودگی جرایم بیمه تامین اجتماعی',
        companyId:  '2c485f0d-d3fe-41f3-8e89-33d205566fa2',
        year: 1401,
        quantity: 4209614013026,
        type:1,
        motevali:'معاونت توسعه شرکت‌های دانش‌بنیان',
        tedad: 0
      },
      



    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('facilities', {
      id: [
        '2e3d25be-16a2-43b9-ac50-18f39e9f69b2',
        '48485db9-f0d3-41ca-91df-3f8075a94f8f',
        'a75732a0-1f44-4c49-821f-a8819c72a0c4',
        '27e8dc52-bb3c-4a07-a335-7984bbc89834',
        '758002fa-e0ce-4035-8571-070de3e5e3da',
        'e0f22861-1fb3-4b9f-958f-de4fbddee2e8',
        '856ab601-adeb-4cf1-ad94-7e49b0629c73',
        'c141c6e6-0c7a-4986-ae10-04a24cbc3439',
        '1cd50196-5155-44d8-9c8f-11b2531b6c26',
        '07e0d632-cb9b-46c2-8904-ba1c5822638e',
        'd4406923-bbaa-4ca2-8573-6c6b6ba9721d',
      ]
  });
  }
};
