const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var query = ctx.request.query;
  console.log('query: ' + JSON.stringify(query));

  try {
    var results = await mysql('user').insert({
      user: query.user,
      password: query.pswd,
      mphone: query.tel,
      name: query.user
    });
    console.log('results: ' + results);
    ctx.state.data = {
      state: 'success',
      errMessage: null
    };
  } catch (e) {
    console.log('err: '+e);
    ctx.state.data = { state: 'failure', errMessage: '用户名重复，请修改' };
  }

}