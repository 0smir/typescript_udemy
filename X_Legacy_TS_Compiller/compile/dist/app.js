"use strict";
console.log('Time to get started...');
let button = document.getElementById('button');
function clickHendle(message) {
    console.log('Clicked: ' + message);
}
if (button) {
    button.addEventListener('click', clickHendle.bind(null, 'welcome'));
}
