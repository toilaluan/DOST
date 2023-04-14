

function readableDoc(doc, req) {
  if (doc.price == 0) return true;
  else {
    let temp = req.session.loggedin;
    if (temp == true){
      let user = req.session.user[0]
      let picked = user.id_docs_bought.find(o => o === doc._id);
      if (picked == undefined) return false;
      else return true;
      }
    }

  // code
}

module.exports = readableDoc;

    
  
  