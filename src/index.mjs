import { readFileSync } from 'fs'
import minimist from 'minimist'
import { deduplicator } from './deduplicator.mjs'

const argv = minimist(process.argv.slice(2))
const filename = argv['f']
const reruns = argv['reruns'] || 2

const main = (filename) => {
    if (!filename) {
        process.stdout.write('Usage: src/index.mjs -f <filename> [--reruns <number>]');
        return;
    }
    const rerunFile = readFileSync(`${process.cwd()}/${filename}`, { encoding:'utf8', flag:'r' });
    const output = deduplicator(rerunFile, reruns);
    process.stdout.write(output);
}

main(filename)
