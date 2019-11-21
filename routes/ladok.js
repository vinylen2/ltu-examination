const router = require('koa-router')({ prefix: '/ladok' });

// models for connection to DB
const { Student, Grade, CourseOpenings } = require('../ladokModels');

// basic rootroute for testing
async function rootRoute(ctx) {
  ctx.body = {
    data: 'this is ladok route',
  };
};

// route to fetch all grades from SSN
async function getGrades(ctx) {
  // get SSN from query in URL
  const SSN = ctx.request.query.ssn;

  // finds all students with sequelize function "findAll"
  // async call with ES8 async...await
  const student = await Student.findAll({
    // syntax for "WHERE"-clause in SQL
    where: { SSN },
    // selected attributes 
    attributes: ['firstName', 'lastName'],
    // joins grade and courseopenings
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

  // sets HTTP status code to 200
  ctx.status = 200;

  // attaches student object to the body
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

    ctx.status = 201;
    ctx.body = {
      data: {
        insertedGrade
      },
    };

  } 

  // error handling
  if (studentObject.length == 0 && openingCodeObject.length > 0) {
    ctx.status = 400;

    ctx.body = {
      message: 'No student found',
    };
  }

  if (studentObject.length > 0 && openingCodeObject.length == 0) {
    ctx.status = 400;

    ctx.body = {
      message: 'No openingCode Found',
    };
  }

  if (studentObject.length == 0 && openingCodeObject.length == 0) {
    ctx.status = 400;

    ctx.body = {
      message: 'No student or openingCode found',
    };
  }
};

// adding routes and linking them to functions for DB-calls
router.get('/', rootRoute);
router.get('/grades', getGrades);
router.post('/grade', postGrade);

module.exports = router;