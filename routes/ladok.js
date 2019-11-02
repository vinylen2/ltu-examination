const router = require('koa-router')({ prefix: '/ladok' });

// models for connection to DB
const { Student, Grade, CourseOpenings } = require('../ladokModels');

async function rootRoute(ctx) {
  ctx.body = {
    data: 'this is ladok route',
  };
};

// route to fetch all grades from SSN
async function getGrades(ctx) {
  const SSN = ctx.request.query.ssn;

  const student = await Student.findAll({
    where: { SSN },
    attributes: ['firstName', 'lastName'],
    include: [
      {
        model: Grade,
        attributes: ['grade','examNumber'],
        include: [
          {
            model: CourseOpenings,
            attributes: ['openingCode'],
          },
        ],
      },
    ]
  });

  ctx.body = {
    student,
  };
};

async function postGrade(ctx) {
  const { SSN, openingCode, examNumber, date, grade } = ctx.request.body;

  ctx.body = {
    data: {
      SSN,
      openingCode,
      examNumber,
      date,
      grade
    },
  }
};

router.get('/', rootRoute);
router.get('/grades', getGrades);
router.post('/grade', postGrade);

module.exports = router;