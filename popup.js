var console = chrome.extension.getBackgroundPage().console;

var winNums;
var tabNums;

chrome.storage.sync.get('totWins', function(result) {
    winNums = result.totWins;
    document.getElementById("winNums").textContent = winNums;
});
chrome.storage.sync.get('totTabs', function(result) {
    tabNums = result.totTabs;
    document.getElementById("tabNums").textContent = tabNums;
    document.getElementById("maxTabs").value = tabNums;
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("setMax").addEventListener('click', submitThis);
});

function submitThis(e) {
    e.preventDefault();
    if (maxTabs.value < tabNums && maxTabs.value != 0) {
      document.getElementById("success").textContent="";
        document.getElementById("error").textContent = "can't set Tab Number to less than are currently open!"
    } else {
        document.getElementById("error").textContent = "";
        document.getElementById("success").textContent = "Max Tabs Set! \n Happy Working!";
        chrome.extension.sendMessage({
            maxTabs: document.getElementById("maxTabs").value
        });

    }
}
