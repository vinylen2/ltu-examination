const router = require('koa-router')({ prefix: '/ideal' });

const { Student, CourseOpenings } = require('../idealModels');

async function getStudent(ctx) {
  ctx.body = {
    data: {
    }
  };
}

router.get('/student', getStudent);

module.exports = router;