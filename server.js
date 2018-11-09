// Include http ,url module.
var http = require('http');
var fs = require('fs');
var url = require('url');
var formidable = require('formidable');
var systempath = require('path');

// Create http server.
var httpServer = http.createServer(function (req, resp) {

    // Get client request url.
    var reqUrlString = req.url;

    // Get client request path name.
    var pathName = url.parse(reqUrlString, true, false).pathname;

    var method = req.method;

    // If post.
    if ("POST" == method) {

        //neu duong dan post co ten la upload file thi xu ly upload
        if (req.url == '/fileupload') {
            var form = new formidable.IncomingForm();
            //luu tru file vao dia 
            form.parse(req, function (err, fields, files) {
                var oldpath = files.filetoupload.path;
                var newPath0 = files.filetoupload.path.substring(0, files.filetoupload.path.lastIndexOf(systempath.sep));
                ///////////////////////////////////////////////
                //'uploadfiles/' 
                resp.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
                
                //luu vao thu muc cua lap trinh uploadfiles
                var newpath = 'uploadfiles/' + files.filetoupload.name;
                fs.rename(oldpath, newpath, function (err) {
                    if (err) {
                        //luu vao thu muc mat dinh cua os
                        newpath = newPath0 + '/' + files.filetoupload.name;
                        fs.rename(oldpath, newpath, function (err2) {
                            if (err2) {
                                resp.end(JSON.stringify(err2));
                            } else {
                                resp.end('{"file_name": "' + newpath + '", "command_id": "upload", "status": "ok", "message": "ban da upload file thanh cong!"}');
                            }
                        });

                    } else {
                        resp.end('{"file_name": "' + newpath + '", "command_id": "upload", "status": "ok", "message": "ban da upload file thanh cong!"}');
                    }
                });
                ///////////////////////////////////////////////
            });

        } else {
            //neu duong dan khac thi xu ly post binh thuong
            var postData = '';

            // Get all post data when receive data event.
            req.on('data', (chunk) => {
                postData += chunk;

            });

            // When all request post data has been received.
            req.on('end', () => {
                var postDataObject = JSON.parse(postData);
                var commandId = postDataObject.command_id;
                resp.writeHead(200, { 'Access-Control-Allow-Origin': '*' });

                if ('login' == commandId) {
                    resp.end('{"command_id": "' + commandId + '", "status": "ok", "message": "ban da login thanh cong!"}');
                } else {
                    resp.end('{"command_id": "' + commandId + '", "status": "nok", "message": "khong thanh cong"}');
                }
            })
        }
    } else if ("GET" == method) {

        if (req.url == '/testupload') {

            resp.writeHead(200, { 'Content-Type': 'text/html' });
            resp.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
            resp.write('<input type="file" name="filetoupload"><br>');
            resp.write('<input type="submit">');
            resp.write('</form>');

            return resp.end();

        } else {


            // get
            var reqUrlString = req.url;
            var urlObject = url.parse(reqUrlString, true, false);

            // Get user request file name.
            var fileName = urlObject.pathname;
            fileName = fileName.substr(1);

            // Read the file content and return to client when read complete.
            fs.readFile(fileName, { encoding: 'utf-8', flag: 'r' }, function (error, data) {

                if (!error) {
                    resp.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
                    resp.end(data);
                } else {
                    resp.writeHead(404, { 'Access-Control-Allow-Origin': '*' });
                    resp.end(JSON.stringify(error));
                }
            });
        }
    }

});

// Http server listen on port 8888.

var PORT = process.env.PORT || 8888;

httpServer.listen(PORT);

console.log("Server is started with : " + PORT);