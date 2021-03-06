function genesis(){
  return true
}

function revocation(arg,nUserList){
  debug("===========================(Starts) - Revocation===========================");
  // this is called when the user wants to revoke his keys
  if(!isRegistered()){return false}
  else{
  test=  callRevocaiton(arg,nUserList);
  if(test==true){regenUser(arg);}
  return test
}
}

function isRegistered() {
  me=getMeAgent();
    var registered_users_key = getLinks(me, "keyRegistration",{Load:true})
    debug("Registered users are: "+JSON.stringify(registered_users_key));
    if( registered_users_key instanceof Error) return false
    registered_users_key = registered_users_key.Links
    var agent_id = App.Key.Hash
    for(var i=0; i < registered_users_key.length; i++) {
        var profile = registered_users_key[i].Entry
        debug("Registered user key "+i+" is " + profile.shared_ID)
        if( profile.public_key == agent_id) return true;
    }
    return false;
}

function getRevocationKeyLink(){
  key=getLinks(getMeAgent(),"keyRegistration",{Load:true});
  return key[0].Hash;
}
function getRevocationKey(){
  key=getLinks(getMeAgent(),"keyRegistration",{Load:true});
  keyRegistration=JSON.parse(key[0].Entry);
  return keyRegistration
}
function callRevocaiton(arg,nUserList){
// Depending on the choice that was made for the Revocation Method that has to be formed
revocationKey=getRevocationKey();
choice=keyRegistration.revocation_Method_ID

if(choice=="1"){
  if(arg.revocationKey==getRevocationKeyLink()){
    debug("Revoaction key Verified")
  }
  else{return false}
test=  revokeKeySelf(revocationKey);
}
else if(choice=="2"){
test=  revokeKeyMN(revocationKey,nUserList)
}
else if(choice=="3"){
test=  revokeKeyAthority(revocationKey);
}
debug("===========================(Completed) - Revocation===========================");

return test
}


function revokeKeyMN(revocationKey){
debug("++++++++Call revokeKeyMN+++++++")
}


function revokeKeySelf(revocationKey){
    official_revocationKey=makeHash("keyRegistration",revocationKey);
  user_revocationKey=official_revocationKey; //TODO get key from user the user_revocationKey.
  if(user_revocationKey!=official_revocationKey){
    debug("**ERROR: Revocation Key Does'nt match**")
    return false
  }else{
    old_Agent_TopHash=App.Agent.TopHash;
    updateAgent({Revocation:"revoked this key"});
//the identity can be used if we want to update the key.hash only
    new_Agent_TopHash=App.Agent.TopHash;
}

return  checkUpdate(old_Agent_TopHash,new_Agent_TopHash);
}

function checkUpdate(old_Agent_TopHash,new_Agent_TopHash){
  if(old_Agent_TopHash==new_Agent_TopHash){
    debug("[Revocation ERROR: **Revocation Key not Succesfull]")
    return false}
  else{
    debug("||->Revocation Succesfull")
    return true
  }
}
/*
Funtion user to re-generate the user that just revorked his old keys
*/

function regenUser(arg){

  call("users","usersUpdateDetails",arg);
  call("keyRegistration","keyRegistrationUpdate",arg);
}


function revokeKeyAthority(revocationKey){
debug("++++++++Call revokeKeyAthority+++++++")
}


function getDirectory() {return App.DNA.Hash;}
function getMeKey() {return App.Key.Hash;}
function getMeAgent(){return App.Agent.Hash;}


function revocationRead(){

}
function revocationUpdate(){

}
function revocationDelete(){

}
function revocation_linksCreate(){

}
function revocation_linksRead(){

}
function revocation_linksUpdate(){

}
function revocation_linksDelete(){

}
