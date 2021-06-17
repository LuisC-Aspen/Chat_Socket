const users =['Luis', 'Carlos', 'Contreras'];

function userJoin (id, username,room) {
    const user = {id, username, room};
    
    users.push(user);
    
    return user;
}

 function getCurrentUser(id) {
    return users.find(user => user.id === id)
 }


//codigo de la practica 11//

function userLeave(id){
    const index = users.findIndex(user => user.id === id)
}

function userLeave(id){
    const index = users.findIndex (user => user.id === id);

    if(index !== -1){
        return console.log(users.splice(index, 1)[0])
    }
}

function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

 //Fin del codigo de la 11//

//Examen//
//function getUName(username) {
//    return users.filter(user => user.username === username);
//}
//fin examen//
//awebo ya pude, no se ni que estba haciendo en está parte creando una función inecesaria


 module.exports = {
     userJoin,
     getCurrentUser,
     userLeave,
     getRoomUsers
 }