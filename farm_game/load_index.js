
let char = JSON.parse(localStorage.getItem('char'));


let name = document.getElementsByClassName('name');
let birthday = document.getElementsByClassName('birthday_month');
let age = document.getElementsByClassName('age');

name[0].getElementsByClassName('value')[0].innerHTML = char.name;
birthday[0].getElementsByClassName('value')[0].innerHTML = char.birthday;
age[0].getElementsByClassName('value')[0].innerHTML = char.age;
let aux_date_birthday = char.birthday.split('/')[1] + "/" + char.birthday.split('/')[0] + "/" + char.birthday.split('/')[2];

let today_date = new Date();
let date_birthday = new Date(aux_date_birthday);

let obj_char = {};

if ((today_date.getDate()) == (date_birthday.getDate()) && (today_date.getMonth() + 1) == (date_birthday.getMonth() + 1)) {
    
    document.getElementById("alert").style.display = "flex";
    
    let time = setInterval(function(){ 
    
        document.getElementById("alert").style.display = "none"; 
        clearTimeout(time);
    
    }, 3000);

    if(char.first_time){

        obj_char = {
            'name': char.name,
            'age': char.age,
            'birthday':char.birthday,
            'first_time':false
        }

        
    }else{
        
        obj_char = {
            'name': char.name,
            'age': parseInt(char.age) + 1,
            'birthday':char.birthday,
            'first_time':true
        }
        
    }

    localStorage.setItem('char', JSON.stringify(obj_char));
    age[0].getElementsByClassName('value')[0].innerHTML = parseInt(char.age) + 1;
    
}else{
    
    console.log("diferente");

}



