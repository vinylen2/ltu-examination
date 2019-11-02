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
  // gets value from body in JSON
  const { SSN, openingCode, examNumber, date, grade } = ctx.request.body;

  // finds studentId from SSN value for db-relation
  const studentObject = await Student.findAll({
    where: { SSN },
  });

  // finds openingCodeId from openingCode value for db-relation
  const openingCodeObject = await CourseOpenings.findAll({
    where: { openingCode },
  });

  // inserts grade row from request
  if (studentObject.length > 0 && openingCodeObject.length > 0 ) {
    const insertedGrade = await Grade.create({
      examNumber,
      date,
      grade,
    });

    // creates relation to student and courseOpening with sequelize function
    insertedGrade.setStudent(studentObject[0]);
    insertedGrade.setCourseOpening(openingCodeObject[0]);

    ctx.body = {
      data: {
        insertedGrade
      },
    };

  } 

  // error handling
  if (studentObject.length == 0 && openingCodeObject.length > 0) {
    ctx.body = {
      message: 'No student found',
    };

  }

  if (studentObject.length > 0 && openingCodeObject.length == 0) {
    ctx.body = {
      message: 'No openingCode Found',
    };
  }

  if (studentObject.length == 0 && openingCodeObject.length == 0) {
    ctx.body = {
      message: 'No student or openingCode found',
    };
  }
};

router.get('/', rootRoute);
router.get('/grades', getGrades);
router.post('/grade', postGrade);

module.exports = router;