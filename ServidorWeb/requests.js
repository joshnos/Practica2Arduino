const http = require('http');

const ip = "0.0.0.0";

class Requests {
    
    constructor() {
        this.data = [];
        this.options = {
          hostname: ip,
          port: 80,
          path: '',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
          }
        }
    }

    put(data, path) {
        this.options.path = path;
        this.data = JSON.stringify(data);
        req = http.request(this.options, res => {
          console.log(`statusCode: ${res.statusCode}`)
        
          res.on('data', d => {
            process.stdout.write(d)
          })
        })
        
        req.on('error', error => {
          console.error(error)
        })
        
        req.write(data)
        req.end()
    }
}

module.exports = Requests;