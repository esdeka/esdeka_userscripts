// ==UserScript==
// @name         Twitch Directory AutoRefresh
// @namespace    http://tampermonkey.net/
// @version      2025-04-29
// @description  Autorefresh Twitch directory and automatically click away pending drops notifications
// @author       esdeka
// @match        https://www.twitch.tv/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/esdeka/esdeka_userscripts/refs/heads/main/Twitch_Directory_AutoRefresh.user.js
// ==/UserScript==
 
(function() {
    'use strict';
 
    console.log('autorefresh', window.location)
    // Wait for 5 minutes then refresh the page
    setInterval(function() {
 
        console.log('autorefresh2', window.location)
        if (window.location.pathname.startsWith('/directory/')){
            // location.reload();
            console.log('autorefresh3', window.location)
 
            document.querySelector('a[data-a-target="following-overview-tab"]').click();
            setTimeout(() => document.querySelector('a[data-a-target="following-live-tab"]').click(), 100);
        }
 
        var notifs = parseInt(document.querySelector('nav div.onsite-notifications div.onsite-notifications__badge')?.textContent) || 0;
        if (notifs >= 1) {
            console.log('notifs', notifs);
 
            document.querySelector('button[aria-label="Open Notifications"]')?.click();
            setTimeout(()=> {
                console.log('markread?', document.querySelector('#OnsiteNotificationPopover-header')?.parentElement.firstChild, document.querySelector('#OnsiteNotificationPopover-header')?.parentElement.firstChild.querySelector('button'));
                document.querySelector('#OnsiteNotificationPopover-header')?.parentElement.firstChild.querySelector('button')?.click()
                document.querySelector('button[aria-label="Open Notifications"]')?.click();
            }, 50)
        }
 
    }, 310*1000); //  = 5 minutes
 
})();
