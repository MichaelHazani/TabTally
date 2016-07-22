var maxTabs = 0;
var maxWins = 0;


//on new tab creation, go
chrome.tabs.onCreated.addListener(tallyAction);
chrome.tabs.onRemoved.addListener(tallyAction);
// chrome.windows.onCreated.addListener(tallyAction);
// chrome.windows.onRemoved.addListener(tallyAction);

function tallyAction() {
var totWins;
    var totTabs = 0;
    //get num of tabs and windows every time tab is created
    chrome.windows.getAll({
        "populate": true
    }, function(wins) {
        totWins = wins.length;
        chrome.storage.sync.set({
            'totWins': totWins
        });
        for (win in wins) {
            totTabs += wins[win].tabs.length;
        }
        chrome.storage.sync.set({
            'totTabs': totTabs
        });

        //if max tabs/wins not set or set to infinite, return
        if (maxTabs == 0) {
            return
        } else {
            //check if max tabs met
            if (totTabs > maxTabs) {
                chrome.tabs.query({
                    'active': true
                }, function(tab) {
                  alert("max number of tabs exceeded! (This is tab #" + totTabs + ")");
                    chrome.tabs.remove(tab[tab.length-1].id);
                });
            }
        }
    });
}
//listen to max tabs and windows message from popup.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        maxTabs = request.maxTabs;
        maxWins = request.maxWins;
    });
