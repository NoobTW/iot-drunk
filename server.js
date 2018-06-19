const koa = require('koa');
const koaRouter = require('koa-router');
const koaServe = require('koa-static');
const cExec = require('child_process').exec;
const path = require('path');

const app = new koa();
const router = new koaRouter();

function exec(command){
	return new Promise((resolve, reject) => {
		cExec(command, (error, stdout, stderr) => {
			if(error){
				reject();
			}else{
				resolve(stdout);
			}
		});
	});
}

app.use(koaServe(path.join(__dirname, '/public')));

router
	.get('/', async ctx => {
		ctx.response.redirect('/index.html');
	})

	.get('/api/drunk', async ctx => {
		// ctx.body = 'gay';

		const response = await exec(`python ${__dirname}/python/gay.py`);
		console.log(`python ${__dirname}/python/gay.py`);
		ctx.body = response;
	});

app.use(router.routes());
app.listen(3000, () => {
	console.log('不要，8080');
});
