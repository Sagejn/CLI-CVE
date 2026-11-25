#!/usr/bin/env node
var blessed = require('blessed');
const yargs = require("yargs/yargs");
    fs = require('fs');
const { hideBin } = require("yargs/helpers");
const chalk = require('chalk');
const voxen = require("boxen");



// const options = yargs(hideBin(process.argv))
//     .usage("Usage: clicve")
//     .option("", { alias: "daily", describe: "", type: "string", demandOption: true })
//     .option("s", { alias: "search", describe: "Allows you to search the NVD database for a specific CVE", type: "string", demandOption: false })
//     .argv;


yargs(hideBin(process.argv))
    .command('$0', 'Run main', () => {}, async () => {
    await main()
})
.parse();
async function main(){

var strLogo = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡤⠤⠤⠀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⡼⠟⠓⠒⠂⠀⢀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡾⠀⠀⠀⠀⠀⣐⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡤⠖⠋⠁⠀⠀⠀⠀⠀⢀⠔⠃⠀⠀//     ░▒▓██████▓▒░░▒▓█▓▒░      ░▒▓█▓▒                    ░░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░ 
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣮⡅⠀⠀⠀⠀⢠⡁⠀⠀⠀⠀⠀⣠⣶⡼⠛⠁⠀⠀⠀⠀⠀⠀⠀⢀⡴⠃⠀⠀⠀⠀//    ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒                    ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣏⡀⠀⠀⠀⠘⠀⠀⠀⠀⠀⣦⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⢀⡴⠋⠀⠀⠀⠀⠀⠀//    ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒                    ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⡇⠀⠀⢌⠁⠀⠀⠀⠀⣰⠏⠀⠀⠀⠀⠀⠀⠀⠀⢀⠴⠊⠀⠀⠀⠀⠀⠀⠀⠀//    ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒                    ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡠⡀⠀⠀⠀⠀⣿⠀⠀⠎⠀⠀⠀⠀⢰⡏⠀⠀⠀⠀⠀⠀⠀⢀⣠⣧⣤⠤⠤⠀⠀⠀⠀⠀⠀⠀//    ░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░    ░░▒▓██████▓▒░   ▒▓█▓▒░       ░▒▓█▓▒▒▓█▓▒░░▒▓██████▓▒░    
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⠈⠻⣦⠀⠀⠀⢸⣧⠀⠁⠀⠀⠀⢀⣿⠀⠀⠀⠀⣀⣤⡶⠚⠋⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀//    ░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░                    ▒▓█▓▒░        ░▒▓█▓▓█▓▒░ ░▒▓█▓▒░            
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢦⡀⠀⠘⣻⢀⠄⠀⠀⠀⢸⠇⢐⣆⡾⠟⠉⠀⠀⠀⠀⠀⠀⠀⢀⠔⠀⠀⠀⠀⠀⠀ //    ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░                    ▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▓█▓▒░ ░▒▓█▓▒░          
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢦⡀⠀⠘⣻⢀⠄⠀⠀⠀⢸⠇⢐⣆⡾⠟⠉⠀⠀⠀⠀⠀⠀⠀⢀⠔⠀⠀⠀⠀⠀ //       ░▒▓██████▓▒░░▒▓████████▓▒░▒▓█▓▒░░                    ▒▓██████▓▒░   ░▒▓██▓▒░  ░▒▓████████▓▒░   
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣄⣄⣾⠶⢆⣀⣀⣀⣿⣦⣤⣿⣟⣖⣜⣅⣰⢏⣠⢟⠉⠀⠀⠀⠀⠀⠀⠀⢀⠤⠞⠁⠀⠀⠀    ==================================================================⠀  
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⢇⠜⠉⠒⣿⣿⡿⠟⢻⣿⣿⣿⣿⣿⣿⣜⣵⠟⠁⠀⠀⠀⠀⠀⠀⢀⠠⠠⠉⠀⠀⠀       MAY THE BEST SENTIENCE WIN
⠀⠀⠀⠀⠀⠀⠀⢀⡪⠁⠀⠀⠀⣰⣿⣃⣤⣤⣾⣿⣿⣿⡿⢿⣿⣿⢿⠆⠀⠀⠀⠀⠀⠛⠑⠀⠀            --------------------------
⠀⠀⠀⠀⠀⠀⠀⡾⠁⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⢿⢳⣿⣿⠁⠈⠻⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀   > Interactive JSON fetcher for the NVD CVE database                                                                          
⠀⠀⠀⠀⠀⢀⡾⠁⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⡏⣦⣿⡿⠁⠀⠀⠀⠱⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀  > AUTHOR: Sagejn
⠀⠀⠀⠀⠀⢸⠃⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣷⣿⠟⢁⠀⠀⠀⠀⠀⠈⠣⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀    > FUCK AI
⠀⠀⠀⠀⠀⡜⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⠿⠿⢿⣿⡟⠁⠀⠈⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡰⣻⠁⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠔⠁⠀⠀⠀⠀⠀⠀⠀⢠⠗⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠎`



var screen = blessed.screen({
    smartCSR: true,
    title: 'CLI-CVE'
});


var form = blessed.form({
    parent: screen,
    width: '90%',
    left: 'center',
    bottom: 2,
    keys: true,
    vi: true
});




var logo = blessed.text({
    parent: screen,
    top: 0,
    left: 5,
    content: strLogo,
    fg: 'red',
    height: 60
})


var box = blessed.box({
    parent: screen,
    name: 'CVEname',
    bottom: 10,
    left: 'center',
    height: 10,
    width: 80,
    label: 'CVE',
    style: {
        label:{fg: 'red',bold: true,}
    },
    border: {
        type: 'line',
        fg: 'red'
    
    }
});
var back = blessed.button({
    parent: form,
    name: 'Back',
    content: 'Back',
    bottom: 40,
    // left: 50,
    shrink: true,
    padding: {
    right: 2,
    left: 2
    },
    border: {
        type: 'line',
        fg: 'red'
    },
    style: {
    bold: true,
    fg: 'red',
    focus: {
    inverse: true,
    bg:'red',
    fg:'black'


    }
    }
});
var next = blessed.button({
    parent: form,
    name: 'next',
    content: 'Next',
    bottom: 20,
    right: 10,
    shrink: true,
    padding: {
    right: 2,
    left: 2
    },
    border: {
        type: 'line',
        fg: 'red'
    },
    style: {
    bold: true,
    fg: 'red',
    focus: {
    inverse: true,
    bg:'red',
    fg:'black'
    }
    }
});






// Key bindings
screen.key('C-c', function () {
this.destroy();
});
// Render everything!
screen.render();

}






/* 
Variables to do:

Get buttons working
Might have to start again from first principles

Create a new text object for later passing of CVE data 


CVE PLAN:

Object: CVE:
CVE-ID
CVSS
Platform
Small Description
Access Vector
Link


Look through the api and match the variable names so they can be parsed easil
*/