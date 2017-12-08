const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var query = ctx.request.query;
  console.log('query: ' + JSON.stringify(query));

  var results = await mysql('user').select('*').where({ user: query.user });
  if (results == undefined || results.length == 0) {
    ids = await mysql('user').insert({
      type: 'family',
      user: query.user,
      name: query.name,
      sex: query.sex,
      imgUrl: query.imgUrl
    });
    results = await mysql('user').select('*').where({ id: ids[0] });
  }
  if (results != undefined && results.length > 0) {
    var res = results[0];
    console.log('res: ' + res);
    ctx.state.data = {
      state: 'success',
      errMessage: null,
      userinfo: res
    };
  } else {
    ctx.state.data = { state: 'failure', errMessage: '登录失败,请重新登录' };
  }
}