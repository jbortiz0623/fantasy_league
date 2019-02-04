const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const db = require('../models');

// Access and store CSV file through arguments array
const filePath = path.join(__dirname, '');



const readFile = (path) => {

    db.Player.deleteMany({}, (err, deletedPlayers) => {
        if (err) console.log('Error at player delete many');
        console.log(`Removed all ${players.length}the players`);        
    });
    
    var fileContent;

    return new Promise(function(resolve) {
        fileContent = fs.readdirSync(path).filter(file => file.endsWith('.csv'))
        resolve(fileContent);
    })
    .then(playerData => {
        console.log('playerdata',playerData)
        playerData.forEach((playerFile)=>{
            playerCsv = fs.readFileSync(`${path}/${playerFile}`, 'utf8')
            let playerStrings = playerCsv.split("\n");
            let players = [];
            playerStrings.forEach(data => {
                playerArr = data.split(',');
                let player  = {
                    Number : playerArr[0], // PNumber: '2'
                    Name : playerArr[1], //PName: 'Lonzo Ball'
                    Position : playerArr[2], // 'PG'
                    Age : playerArr[3], // '21'
                    Height : playerArr[4], // '6\' 6"'
                    Weight : playerArr[5], // '190 lbs'
                    College : playerArr[6], // 'UCLA'
                    Salary : `${playerArr[7]},${playerArr[8]},${playerArr[9]}` // '$7,000,000'
                }
                players.push(player);
                
            });
            db.Player.create(players, function(err, newPlayers) {
                //Catch error to keep server running
                if (err) console.log('ERROR is: ', err);
                // Created the new player
                console.log(`Created ${players.length} players!`);
            });
        })
    })
    .catch(err => console.log(err));
}


readFile(filePath);
