const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var query = ctx.request.query;
  console.log('query: ' + JSON.stringify(query));

  var results = await mysql('user').select('*').where({ user: query.user });
  if (results == undefined || results.length == 0) {
    results = await mysql('user').select('*').where({ mphone: query.user });
  }
  if (results != undefined && results.length > 0) {
    var res = results[0];
    console.log('res: ' + res);
    if (res.password == query.pswd) {
      ctx.state.data = {
        state: 'success',
        errMessage: null,
        userinfo: { id: res.id, user: res.user, name: res.name, mphone: res.mphone }
      };
    } else {
      ctx.state.data = { state: 'failure', errMessage: 'password not correct.' };
    }
  } else {
    ctx.state.data = { state: 'failure', errMessage: 'username not correct.' };
  }
}