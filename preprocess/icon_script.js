// this goes through each food and sees if there's a matching icon file for it
// if there is, it sets the filename (not including .svg) on icon_name field
// if there isn't, it sets icon_name to null
// for right now, it writes to a new file just to be safe

const assetFolder = '../src/assets/';
const fs = require('fs');
const dataFilename = "nutrients_and_price";

fs.readdir(assetFolder, (err, files) => {
  let data = JSON.parse(fs.readFileSync(`../src/data/${dataFilename}.json`));
  let names = files.map(filename => filename.replace(".svg", ""));
  
  let foodsMissingIcons = [];
  let newData = data.map(item => {
    let fileName = item.title.toLowerCase().replace(" ", "_");
    if (names.includes(fileName))
    {
        item.icon_name = fileName;
    }
    else 
    {
        item.icon_name = null;
        foodsMissingIcons.push(item.title);
    }
    return item;
    });
    
    // write updated data to json file
    newData = JSON.stringify(newData);
    fs.writeFileSync(`../src/data/${dataFilename}1.json`, newData);
    
    //print foods that still don't have icons
    console.log(`\n${foodsMissingIcons.length} Foods Missing Icons`);
    foodsMissingIcons.forEach(item => console.log(item));

});