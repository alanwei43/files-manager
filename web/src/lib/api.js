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

/**
 * 创建目录
 * @param {string} path 路径
 * @param {string} name 目录名称
 * @returns {Promise<{success: boolean}>}
 */
export function createDir(path, name) {
    return postJSON("/api/dir", {
        name: name,
        path: path
    });
}

/**
 * 创建目录
 * @param {string} path 路径
 * @param {string} name 目录名称
 * @returns {Promise<{success: boolean}>}
 */
export function deleteDir(path, name) {
    return request("DELETE", "/api/dir", null, {
        name: name,
        path: path
    });
}

/**
 * 删除文件
 * @param {string} path 路径
 * @param {string} name 文件名
 * @returns {Promise<{}>}
 */
export function deleteFile(path, name) {
    return request("DELETE", "/api/files", null, {
        name: name,
        path: path
    });
}

/**
 * 获取文件/目录
 * @param {string} path 路径
 * @returns {Promise<{files: [{}]}>}
 */
export function getFiles(path) {
    return getJSON("/api/files", { path: path });
}