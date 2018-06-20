const fs = require('fs');
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
		const file = await fs.readFileSync(`${__dirname}/python/drowsiness-detection/eye.txt`, 'utf-8');
		const response = await exec(`python ${__dirname}/python/drunk.py`);
		let obj;
		try{
			obj = JSON.parse(response);
			obj.danger = file.trim() === 'bad' ? true : false;
		}catch(e){
		}
		ctx.body = obj;
	});

app.use(router.routes());
app.listen(3000, () => {
	//exec(`python ${__dirname}/python/drowsiness-detection/start.sh`);	
	console.log('Server running at port 3000. Visit http://10.1.220.40:3000/');
});

process.on('exit', () => {
	//exec('killall python');
});
