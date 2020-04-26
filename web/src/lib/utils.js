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