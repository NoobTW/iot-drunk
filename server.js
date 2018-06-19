const koa = require('koa');
const koaRouter = require('koa-router');
const cExec = require('child_process').exec;

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

router.get('/api/drunk', async ctx => {
	// ctx.body = 'gay';

	const response = await exec(`python ${__dirname}/python/gay.py`);
	console.log(`python ${__dirname}/python/gay.py`);
	ctx.body = response;
});

app.use(router.routes());
app.listen(3000, () => {
	console.log('不要，8080');
});
