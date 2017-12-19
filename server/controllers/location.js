const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var query = ctx.request.query;
  var subquery = await mysql('user').where({ bid: query.uid }).select('id');
  var ids = [];
  subquery.forEach(function (o) {
    ids.push(o.id);
  })
  var res = await mysql.select('user.id', 'user.name', 'location.lat', 'location.lng', 'location.addr').from('user').innerJoin('location', 'user.id', 'location.uid').where('user.id', 'in', ids)
  console.log(res);
  ctx.state.data = res;
}