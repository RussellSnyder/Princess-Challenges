function parseImage(image) {
    let { title, file } = image.fields;
    let { url, details } = file;
    let { width, height } = details.image

    return {
        title,
        url,
        width,
        height
    }
}

module.exports = { parseImage }
