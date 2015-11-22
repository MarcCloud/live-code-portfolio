import glob from 'glob';
import {resolve} from 'path';


glob('./app/**/*_test.js', (err, files)=>{
    console.log(files)
    files.forEach(file=>{
        require(resolve(file));
    });
});
