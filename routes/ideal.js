const router = require('koa-router')({ prefix: '/ideal' });

// models for connection to DB
const { Student, CourseOpenings } = require('../idealModels');

async function rootRoute(ctx) {
};

async function getStudent(ctx) {
  // get query values from req
  const idealId = ctx.request.query.idealId;
  const openingCode = ctx.request.query.openingCode;

  // TO-DO error handling if values are missing in Query
  // DB request
  const student = await Student.findAll({
    // using value for idealID from query
    where: {idealId},
    // join using Sequelize with value for openingCode from query
    include: [
      { 
        model: CourseOpenings,
        where: {openingCode: openingCode},
      },
    ],
  })

  // error handling
  try {
    const SSN = student[0].SSN;
    ctx.body = {
      data: {
        SSN,
      },
    };
  } catch {
    ctx.body = {
      message: 'No student found',
    };
  }

}

router.get('/student', getStudent);
router.get('/', rootRoute);

module.exports = router;