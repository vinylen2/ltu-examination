const router = require('koa-router')({ prefix: '/ideal' });

// models for connection to DB
const { Student, CourseOpenings } = require('../idealModels');

async function rootRoute(ctx) {
};

async function getStudent(ctx) {
  // get query values from req
  const idealId = ctx.request.query.idealId;
  const openingCode = ctx.request.query.openingCode;


  if (idealId && openingCode) {
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
      // server is returning content
      ctx.status = 200;

      ctx.body = {
        data: {
          SSN,
        },
      };

    } catch {
      // OK request but empty content
      ctx.status = 204;

      ctx.body = {
        message: 'No student found',
      };
    }

  } else {
    // faulty request, missing parameters
    ctx.status = 400;
    ctx.body = {
      message: "Request requires parameters idealId and openingCode",
    };
  }
  // DB request

}

router.get('/student', getStudent);
router.get('/', rootRoute);

module.exports = router;