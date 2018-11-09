create server node js for upload file, json post, get
1. npm init : khoi tao mot node js server
2. git init : khoi tao git (tao file .gitignore de bo qua cac file upload len github)
3. git add .
4. git commit -m "first commit"
5. git remote add origin https://github.com/cuongdqpayment/server-node-json.git
6. git push -u origin master


# Tao server.js de tao node 
1. npm install http fs url formidable path os mime-types
- http la server
- fs la doi tuong doc, ghi xuong dia
- url la doi tuong xu ly url 
- formidable la doi tuong xu ly formdata de lay du lieu tu form 
- path la doi tuong lay duong dan he thong
- os la doi tuong lay thong tin he thong
- mime-types la doi tuong chuyen doi dang file sang content_type bao cho header biet de ung dung tai client goi ung dung lien quan mo file truc tiep ra

2. Tao file sever.js thuc hien phuong thuc post, get cua http

