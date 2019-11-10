
const router = require('koa-router')({ prefix: '/epok' });

const { Term, CourseCode, ApplicationCode } = require('../epokModels');

async function getApplicationCode(ctx) {
  // fetch query values from req
  const term = ctx.request.query.term;
  const courseCode = ctx.request.query.courseCode;

  if (term && courseCode) {
    // fetch data from DB with Sequelize connection
    const applicationCode = await ApplicationCode.findAll({
      attributes: ['applicationCode'],
      include: [
        // join on Term from search query
        {
          model: Term,
          attributes: [],
          where: { term },
        },
        // join on Term from search query
        {
          model: CourseCode,
          attributes: [],
          where: { courseCode },
        }
      ],
    })
    const result = applicationCode[0];
    if (!result) {
      ctx.status = 204;

      message = 'No results found';
    } else {
      ctx.status = 200;
      message = 'Success';
    }

    ctx.body = {
      message,
      data: {
        result,
      }
    };

  } else {
    ctx.status = 400;

    ctx.body = {
      message: 'Request requires parameters term and courseCode',
    };
  }
}

router.get('/application', getApplicationCode);

module.exports = router;