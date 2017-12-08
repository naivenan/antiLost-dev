const { mysql } = require('../qcloud')

module.exports = {
  register: async ctx => {
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
      console.log('err: ' + e);
      ctx.state.data = { state: 'failure', errMessage: '用户名重复，请修改' };
    }
  },

  login: async ctx => {
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
          userinfo: res
        };
      } else {
        ctx.state.data = { state: 'failure', errMessage: 'password not correct.' };
      }
    } else {
      ctx.state.data = { state: 'failure', errMessage: 'username not correct.' };
    }
  },

  update: async ctx => {
    var user = JSON.parse(ctx.request.query.user);
    var res = await mysql('user').update({
      name: user.name,
      mphone: user.mphone,
      birthday: user.birthday,
      sex: user.sex,
      imgUrl: user.imgUrl
    }).where({ id: user.id })
    ctx.state.data = res;
  }
}