const http = require('http');
const req = http.request('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}, (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('Login:', data);
  });
});
req.write(JSON.stringify({email: 'admin@example.com', password: 'password'}));
req.end();
