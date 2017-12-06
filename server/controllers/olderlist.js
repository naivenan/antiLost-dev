const { mysql } = require('../qcloud')

async function olderlist(ctx, next) {
  var query = ctx.request.query;
  var res = await mysql('older').select('*').where({ uid: query.uid });
  console.log(res);
  ctx.state.data = res;
}

async function addolder(ctx, next) {
  var query = ctx.request.query;
  var res = await mysql('older').update({uid:query.uid}).where({ name: query.name });
  console.log(res);
  ctx.state.data = res;
}

async function deleteolder(ctx, next) {
  var query = ctx.request.query;
  var list = JSON.parse(query.list);
  var res = [];
  for(let i=0;i<list.length;i++){
    let user = list[i];
    var result = await mysql('older').update({uid:null}).where({ id: user.id });
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