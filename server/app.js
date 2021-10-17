const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const {spawn} = require('child_process');
const readLine = require('readline');
//const f = require('fs');
const databasePath = path.join(__dirname, "library.db");
let db = null;
const initializeDbAndServer = async () => {
    try {
      db = await open({
        filename: databasePath,
        driver: sqlite3.Database,
      });
    } catch (error) {
      console.log(`DB Error: ${error.message}`);
      process.exit(1);
    }
};
  
initializeDbAndServer();
//console.log(db)

var fs = require('fs');
let l = []
let x
app.listen(3001,()=>{
    console.log("your server is running at http://localhost:3001/")
})

searchFunction = (filename,a,c,e) =>{
    fs.readFile(filename, 'utf8', function(err, data) {
        if (err) throw err;
        //console.log('OK: ' + filename);
        if(data.includes(a) && data.includes(c) && !data.includes(e)){
            l.push(filename)
        }
      });
}

app.post('/',async (request,response)=>{
    const {inputQuery} = request.body
    const [a,b,c,d,e] = inputQuery.split(" ");
    await searchFunction('file1.txt',a,c,e);
    await searchFunction('file2.txt',a,c,e);
    await searchFunction('file3.txt',a,c,e);
    await searchFunction('file4.txt',a,c,e);
  // console.log(l)
   l.sort()
   const result = "result : "+l.join(',')
   //console.log(result)
   response.send(result)
   l=[]
})

search =async ans => {
  console.log("entered")
  const query = `select * from books where name like '%${ans}%' or author like '%${ans}%';`
  const results = await db.all(query);
  response.send(results)
}

spellingCorrection = (searchInput) => {
  console.log("entered")
   const {spawn} = require('child_process');
   const process  = spawn('python3',['./sample.py',searchInput]);
   process.stdout.on('data',data => {
     x=data.toString()
     console.log(x,typeof(x))
     let ans = ''
     for(let i of x){
       if(i == '[' || i == ']' || i == "'"){}
       else{
         ans+=i
       }
     }
     return ans
   })
}

app.post('/books',async (request,response) => {
  let correctword = ''
  let ans = ''
    const {searchInput} = request.body;
    let query;
    if(searchInput === "" || searchInput === undefined){
      query = 'select * from books;';
    }else{
        const spell = async () => {
                const process  = spawn('python3',['./sample.py',searchInput]);
              process.stdout.on('data',data => {
                x=data.toString()
                console.log(x,typeof(x))  
                  for(let i of x){
                    if(i == '[' || i == ']' || i == "'"){}
                    else{ans+=i}
                  }
                  //console.log(ans.length)
                  x=''
                  for(let i in ans){
                    if(i == ans.length-1){}
                    else{
                      x+=ans[i]
                    }
                  }
                  //console.log(x.length)
                  query = `select * from books where name like '%${x}%' or author like '%${x}%';`;
                  //console.log(query) 
                  correctword = x
              })
        }
        await spell()
    }
    
    setTimeout(async ()=>{ 
          const results = await db.all(query);          
          //console.log(x)
          response.send([correctword,results]);
     }, 1000);
     
})

module.exports = app;