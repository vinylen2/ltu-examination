
const router = require('koa-router')({ prefix: '/epok' });

const { ApplicationCode } = require('../epokModels');

async function getApplicationCode(ctx) {
  const termQuery = ctx.request.query.term;
  const courseCodeQuery = ctx.request.query.courseCode;

  ctx.body = {
    data: {
      term: termQuery,
      courseCode: courseCodeQuery,
    }
  };
}

router.get('/getApplicationCode', getApplicationCode);

module.exports = router;