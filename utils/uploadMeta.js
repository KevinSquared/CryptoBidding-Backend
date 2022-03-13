import FormData from 'form-data';
import fetch from "node-fetch";
const formData = new FormData();
import path from "path";
const basePath = process.cwd();
import fs from 'fs';

export const uploadPhoto = (photos) => {
    fs.readdirSync(`./`)
    .forEach((file, idx) => {
        const formData = new FormData();
        const fileStream = fs.createReadStream(`${basePath}/images/${file}`);
        formData.append("file", fileStream);
    
        let url = 'https://api.nftport.xyz/v0/metadata';
    
        let options = {
            method: 'POST',
            headers: {
                Authorization: '60e56aaa-0534-47cf-943f-83de5437a28b'
            },
            body: formData
        };
    
        fetch(url, options)
        .then(res => res.json())
        .then(d => {
            //const fileName = path.parse(json.file_name).name;
            //let rawdata = fs.readFileSync(`${basePath}/json/${fileName}.json`);
            //let metaData = JSON.parse(rawdata);
            let data = JSON.stringify(d);
    
            fs.writeFile(`./json/${idx}-user.json`, data, (err) => {
                if (err) {
                    throw err;
                }
                console.log("JSON data is saved.");
            });
            //metaData.file_url = json.ipfs_url;
            console.log(`${d.ipfs_url} uploaded!`);
            //fs.writeFileSync(`${basePath}/json/${fileName}.json`,
            //JSON.stringify(metaData, null, 2));
    
            //console.log(`${json.file_name} uploaded & ${fileName}.json updated!`)
        })
        .catch(err => console.error('error:' + err));
    })
} 