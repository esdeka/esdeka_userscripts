// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @require      https://raw.githubusercontent.com/esdeka/esdeka_userscripts/refs/heads/main/snippets.js
// ==/UserScript==
/* global $, jQuery */

const DQ = function(selectors) { return document.querySelector(selectors) }
const DQA = function(selectors) { return document.querySelectorAll(selectors) }

// (async function() {
//     'use strict';
const waitForElement = async (all_selectors, rootElement = document) => {
    if (!rootElement)
      rootElement = document;

    return new Promise((resolve) => {

        for (const selector of all_selectors) {
            const element = rootElement.querySelector(selector);
            if (element) {
                resolve([selector,element]);
            }
        }

        const observer = new MutationObserver(() => {
            for (const selector of all_selectors) {
                const element = rootElement.querySelector(selector);
                if (element) {
                    observer.disconnect();
                    resolve([selector,element]);
                }
            }
        });

        observer.observe(rootElement, {
            childList: true,
            subtree: true,
        });
    });
};

    // while (selectors.length > 0 && window.location.host=='login.microsoftonline.com') {
    //     var [selector, element] = await waitForElement(selectors);
    //     console.log('microauth.user.js','found', selector, element);


const setNativeValue = function(element, value) {
  console.log('setNativeValue', element, value)
    // https://www.reddit.com/r/javascript/comments/4is6xj/tampermonkey_and_reactjs/idwm91a/
    // https://stackoverflow.com/questions/30683628/react-js-setting-value-of-input/52486921#52486921
    // https://stackoverflow.com/questions/75314383/tampermonkey-enters-values-into-web-form-but-are-cleared-on-submit
    // https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
    // https://stackoverflow.com/questions/57879322/how-can-i-enter-data-into-a-custom-handled-input-field/57900849#57900849
    // let lastValue = element.value;
    //     element.value = value;

    element.focus()
    element.click()
    //     document.execCommand('selectAll');
    document.execCommand('insertText', false, value);
    //     let event = new Event("input", { target: element, bubbles: true });
    //     // React 15
    //     event.simulated = true;
    //     // React 16
    //     let tracker = element._valueTracker;
    //     if (tracker) {
    //         tracker.setValue(lastValue);
    //     }
    //     element.dispatchEvent(event);
    // 	element.dispatchEvent(new Event('change', {bubbles: true})); // usually not needed
}

// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
const promptDefault = function ( key, deletePrevious ) {
    if (deletePrevious) {
    GM_deleteValue(key)
    }
    if (!GM_getValue(key)) {
        GM_setValue(key, prompt(key))
    }
    return GM_getValue(key)
}
// else if (window.location.pathname == "/Account/Login") {
//     let deletePrevious = document.querySelector('.validation-summary-errors')?.textContent == "Invalid login attempt."
//     document.querySelector('#UserName').value = promptDefault("auser", deletePrevious);
//     document.querySelector('#Password').value = promptDefault("pwoord", deletePrevious);
//     document.querySelector('#RememberMe').checked = true;
//     document.querySelector('.btn').click();


const triggerMouseEvent = function (node, eventType) {
  var clickEvent = document.createEvent ('MouseEvents');
  clickEvent.initEvent (eventType, true, true);
  node.dispatchEvent (clickEvent);
}
              // triggerMouseEvent(node.querySelector('.soundOff'), 'click')
