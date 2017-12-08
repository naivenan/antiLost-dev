const { mysql } = require('../qcloud')

async function olderlist(ctx, next) {
  var query = ctx.request.query;
  var res = await mysql('user').select('*').where({ bid: query.uid });
  console.log(res);
  ctx.state.data = res;
}

async function addolder(ctx, next) {
  var query = ctx.request.query;
  var res = await mysql('user').update({ bid: query.uid }).where({ user: query.user });
  console.log(res);
  ctx.state.data = res;
}

async function deleteolder(ctx, next) {
  var query = ctx.request.query;
  var list = JSON.parse(query.list);
  var res = [];
  for (let i = 0; i < list.length; i++) {
    let user = list[i];
    var result = await mysql('user').update({ bid: null }).where({ id: user.id });
    console.log(result);
    res.push(result);
  }
  ctx.state.data = res;
}

async function select(ctx, next) {
  var query = ctx.request.query;
  var res = [];
  ctx.state.data = res;
}

async function update(ctx, next) {
  var query = ctx.request.query;
  var res = [];
  ctx.state.data = res;
}

module.exports = {
  olderlist,
  addolder,
  deleteolder,
  select,
  update
}