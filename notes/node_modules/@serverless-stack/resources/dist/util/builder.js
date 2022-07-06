export function addExtensionToHandler(handler, extension) {
    return handler.replace(/\.[\w\d]+$/, extension);
}
export function getHandlerFullPosixPath(srcPath, handler) {
    return srcPath === "." ? handler : `${srcPath}/${handler}`;
}
export function getHandlerHash(posixPath) {
    return `${posixPath.replace(/[\\/.]/g, "-")}-${Date.now()}`;
}
