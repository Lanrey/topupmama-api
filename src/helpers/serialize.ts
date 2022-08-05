const serialize = (obj: any, fields: string[] = []) => {
    const str: string[] = [];
    for (let p in obj) {
      if (obj.hasOwnProperty(p) && p !== 'reset') {
        if (encodeURIComponent(obj[p])) {
          if (fields.length === 0 || fields.includes(encodeURIComponent(p))) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
          }
        }
      }
    }
    return str.join('&');
  }
  
  module.exports = serialize;