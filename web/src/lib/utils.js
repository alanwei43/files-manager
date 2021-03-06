export function readFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (evt) {
            const result = evt.target.result.split("base64,")[1];
            resolve(result);
        };
        reader.onerror = function () {
            reject();
        };
        reader.readAsDataURL(file);
    });
}
export function getRandomStr() {
    return Date.now().toString(16) + Math.random().toString(16).substr(2);
}

/**
 * ref: https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
 * @param {string} str 
 */
export function copyToClipboard(str) {
    const el = document.createElement('textarea');  // Create a <textarea> element
    el.value = str;                                 // Set its value to the string that you want copied
    el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
    el.style.position = 'absolute';
    el.style.left = '-9999px';                      // Move outside the screen to make it invisible
    document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
    const selected =
        document.getSelection().rangeCount > 0        // Check if there is any content selected previously
            ? document.getSelection().getRangeAt(0)     // Store selection if found
            : false;                                    // Mark as false to know no selection existed before
    el.select();                                    // Select the <textarea> content
    document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el);                  // Remove the <textarea> element
    if (selected) {                                 // If a selection existed before copying
        document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
        document.getSelection().addRange(selected);   // Restore the original selection
    }
}

export function combinePath(sep, ...path) {
    return path.join(sep).replace(/(\/{2,})/, "/").replace(/(\\{2,})/, "\\");
}

export function humanSize(bytes) {
    const kb = bytes / 1024;
    if (kb < 1024) {
        return {
            size: kb.toFixed(2),
            unit: "KB"
        }
    }
    const mb = kb / 1024;
    if (mb < 1024) {
        return {
            size: mb.toFixed(2),
            unit: "MB"
        };
    }
    const gb = mb / 1024;
    return {
        size: gb.toFixed(2),
        unit: "GB"
    };
}