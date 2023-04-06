class GDUtils{
    getFileIdFromUrl(url) {
        const fileIdRegex = /\/(?:d\/|file\/d\/)?([a-zA-Z0-9_-]{21}[a-zA-Z0-9_-]*)/;
        const match = fileIdRegex.exec(url);
        if (match && match[1]) {
          return match[1];
        } else {
          throw new Error('Invalid Google Drive URL');
        }
      }
    idToPreviewLink(id){
        return 'https://drive.google.com/file/d/' + id + '/preview'
    }
}

module.exports = new GDUtils()