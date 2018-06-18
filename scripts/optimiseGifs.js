const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const rimraf = require('rimraf');
const argv = require('minimist')(process.argv.slice(2));

const folder = path.resolve(__dirname, '../assets');

const prms = (comm) => (...args) =>
	new Promise((resolve, reject) => {
		exec(comm(...args), (err, stdout, stderr) => {
	 		if (err) return reject(err);
	 		return resolve({ stdout, stderr });
		})
	})

const files = fs.readdirSync(path.resolve(folder, 'gifs'))
	.map(file => path.resolve(folder, 'gifs', file))
	.filter(x => /\.gif/.test(x))
	// .filter(x => /luisa-charles-and-miryana-ivanova\.gif/.test(x))

const command = (width, input, output) => `gifsicle --resize-width ${width} -i ${input} -o ${output}`;
const extractPNG = (input, output) => `magick ${input}[0] ${output}`
const optimise = (input, output, size = 200, quality = 10, fuzz = 2) => `convert ${input} -quality ${quality}% -resize ${size} -fuzz ${fuzz}% -layers Optimize ${output}`;

const extractAllFirst = () => {
	const outDir = path.resolve(folder, `./gif-pic`);
	Promise.resolve('')
		.then(() => Promise.all(files.map(file => prms(extractPNG)(file, path.resolve(outDir, path.basename(file.replace('.gif', '.png')))))))
		// .then(() => extractPNG(files[1], path.resolve(outDir, path.basename(files[1].replace('.gif', '.png'))), size))
		.then(x => x.map(com => exec(com, (err) => console.log('com', err))))
		.catch(err => console.log('err', err))
}

const optimiseAll = () => {
	const outDir = path.resolve(folder, `./optimised`);
	
	Promise.resolve('')
		.then(() => Promise.all(files.slice(0, 100).map(file => 
			prms(optimise)(file, path.resolve(outDir, path.basename(file)))
				.then(x => console.log('done', file))
		)))
		// .then(() => extractPNG(files[1], path.resolve(outDir, path.basename(files[1].replace('.gif', '.png'))), size))
		// .then(x => x.map(com => exec(com, (err) => console.log('com', err))))
		.then(err => console.log('done', err))
		.catch(err => console.log('err', err))
}

// prms(optimise)('')
// optimiseAll();
// extractAllFirst();
// console.log(path.basename(files[1]))
// convertAll(800, 25)
// const settings = process.argv.reduce((a, b) => {
// 	if (/--/.test())
// }, {})

// if (argv.all && argv.size && argv.fps) return convertAll(argv.size, argv.fps);
// else if (argv.i && argv.size && argv.fps) return convert(argv.i, argv.o || argv.i.replace('mp4', 'gif'), argv.size, argv.fps);
// else return console.log('Not Enough Arguments', argv)


