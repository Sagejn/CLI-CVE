#!/usr/bin/env node
var blessed = require('blessed');
const yargs = require("yargs/yargs");
    fs = require('fs');
const { hideBin } = require("yargs/helpers");
const chalk = require("chalk");
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

screen.key('SIGINT', function () {
  this.destroy();
});

var form = blessed.form({
    parent: screen,
    width: '100%',
    left: 'center',
    keys: true,
    vi: true,
});

// var cveName = blessed.textbox({
//     parent: form,
//     name: 'CVEname',
//     bottom: 4,
//     left: 5,
//     height: 20,
//     inputOnFocus:true,
//     content: 'first',
//     border: {
//         type: 'line',
//         fg: 'red'
    
//     },
//     focus:{
//         fg: 'blue'
//     }
// });

var logo = blessed.text({
    parent: screen,
    top: 0,
    left: 5,
    content: strLogo,
    fg: 'red',
    height: 60
})

// var label = blessed.text({
//     parent: screen,
//     bottom: 80,
//     left: 5,
//     content:'CVE',
//     fg: 'red'
// });


// var vim = blessed.checkbox({
//   parent: form,
//   name: 'editors',
//   content: 'Vim',
//   bottom: 5,
//   left: 5
// });

// var emacs = blessed.checkbox({
//   parent: form,
//   name: 'editors',
//   content: 'Emacs',
//   bottom: 5,
//   left: 20
// });
// var atom = blessed.checkbox({
//   parent: form,
//   name: 'editors',
//   content: 'Atom',
//   bottom: 5,
//   left: 35
// });
// var brackets = blessed.checkbox({
//   parent: form,
//   name: 'editors',
//   content: 'Brackets',
//   bottom: 5,
//   left: 50
// });

// // Radio buttons
// var label4 = blessed.text({
//   parent: screen,
//   content: 'Do you like Blessed?',
//   bpttom: 5,
//   left: 5
// });
// var radioset = blessed.radioset({
//   parent: form,
//   width: '100%',
//   height: 5,
//   bottom: 21
// });
// var yes = blessed.radiobutton({
//   parent: radioset,
//   name: 'like',
//   content: 'Yes',
//   left: 5
// });
// var no = blessed.radiobutton({
//   parent: radioset,
//   name: 'like',
//   content: 'No',
//   left: 15
// });
// // Text area
// var label5 = blessed.text({
//   parent: screen,
//   content: 'Your comments...',
//   bottom: 24,
//   left: 5
// });
// var textarea = blessed.textarea({
//   parent: form,
//   name: 'comments',
//   bottom: 26,
//   left: 5,
//   height: 7,
//   inputOnFocus: true,
//   border: {
//     type: 'line'
//   }
// });

var buttonBox = blessed.textbox({
    parent: screen,
    name: 'CVEname',
    bottom: 10,
    left: 'center',
    height: 10,
    width: 80,
    content: ' ',
    border: {
        type: 'line',
        fg: 'red'
    
    }
});

// Submit/Cancel buttons
var submit = blessed.button({
    parent: form,
    name: 'submit',
    content: 'Submit',
    bottom: 5,
    left: 5,
    shrink: true,
    padding: {
    bottom: 1,
    right: 2,
    bottom: 1,
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
        inverse: true
    }
}
});
var reset = blessed.button({
    parent: form,
    name: 'reset',
    content: 'Reset',
    bottom: 5,
    left: 15,
    shrink: true,
    padding: {
    bottom: 1,
    right: 2,
    bottom: 1,
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
    inverse: true
    }
}
});
// Info
var msg = blessed.message({
    parent: screen,
    bottom: 40,
    left: 'center',
    style: {
    italic: true,
    fg: 'green'
}
});
var table = blessed.table({
    parent: screen,
    content: '',
    bottom: 40,
    left: 'center',
    style: {
    fg: 'green',
    header: {
    bold: true,
    fg: 'white',
    bg: 'blue'
    }
},
hidden: true
});
// Event management
submit.on('press', function () {
form.submit();
});
reset.on('press', function () {
form.reset();
});
form.on('submit', function (data) {
var editors = ['Vim', 'Emacs', 'Atom', 'Brackets'].filter(function (item, index) {
    return data.editors[index];
});
msg.display('Form submitted!', function () {
    var summary = '';
    summary += data.firstname + ' ' + data.lastname + '\n';
    summary += '------------------------------\n';
    summary += 'Favorite editors: ' + editors + '\n';
    summary += 'Likes Blessed: ' + data.like[0] + '\n';
    summary += 'Comments: ' + data.comments;
    fs.writeFile('form-data.txt', summary, function (err) {
if (err) throw err;
    });
});
});
form.on('reset', function () {
msg.display('Form cleared!', function () {});
});
// Key bindings
screen.key('C-c', function () {
this.destroy();
});
// Render everything!
screen.render();

}




