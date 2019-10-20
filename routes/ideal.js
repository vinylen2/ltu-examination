const router = require('koa-router')({ prefix: '/ideal' });

const { Student, CourseOpenings } = require('../idealModels');

async function getStudent(ctx) {
  const idealId = ctx.request.query.idealId;
  const openingCode = ctx.request.query.openingCode;

  const student = await Student.findAll({
    where: {idealId},
    include: [
      { 
        model: CourseOpenings,
        where: {openingCode},
      },
    ],
  })

  try {
    const result = student[0].SSN;
    ctx.body = {
      data: {
        result,
      },
    };
  } catch {
    ctx.body = {
      message: 'No student found',
    };
  }

}

router.get('/student', getStudent);

module.exports = router;