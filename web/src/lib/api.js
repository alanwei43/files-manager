export function request(method, url, params, body) {
    const options = {
        method: method,
        headers: {
            "content-type": "application/json"
        },
    };
    if (params) {
        url += "?" + Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join("&");
    }
    if (body) {
        options.body = JSON.stringify(body)
    }
    return fetch(url, options).then(res => res.json());
}
export function getJSON(url, params) {
    return request("GET", url, params);
}
export function postJSON(url, body, params) {
    return request("POST", url, params, body);
}