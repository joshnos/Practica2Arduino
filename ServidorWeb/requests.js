const http = require('http');

const ip = "192.168.43.47";

class Requests {
    
    constructor() {
        this.data = [];
        this.options = {
          hostname: ip,
          port: 80,
          path: '',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        }
    }

    async put(data, path) {
      this.options.path = path;
      this.data = JSON.stringify(data);
      const req = http.request(this.options, res => {
        console.log(`statusCode: ${res.statusCode}`)
      
        res.on('data', data => {
          process.stdout.write(data)
        })
      });
      
      req.on('error', error => {
        console.error(error)
      });

      req.write(data.toString());

      req.end();
    }
}

module.exports = Requests;