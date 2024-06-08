


const testRoutes = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>Hello - Kelly></title></head>')
    res.write('<body><h1>I will be Bigger!</h1><br/><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Submit</button></form></body>');
    res.write('</html>');
    return res.end();

  }

  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>Hello - Kelly></title></head>')
    res.write('<body><ul><li>User 1</li><li>User 2</li></ul></body>')
    res.write('</html>')
    return res.end();
  }

  if (url === '/create-user') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody)
      const message = parsedBody.split('=')[1];
      console.log(message)
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();


    });

  }
}

module.exports = testRoutes;