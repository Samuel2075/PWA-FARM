
let vases = [
    
    null, null, null,
    null, null, null,
    null, null, null,

];

let obj_plant = {
    
    seed_img: "",
    stage1_img: "",
    stage2_img: "",
    stage3_img: "",
    name: "",
    price: 0,
    stage_current: 0,
    sale_value: 0
    
}

let plants = [];

insert_plant_array("imgs/plants/seeds.png", "imgs/plants/stage1_cotton.png", "imgs/plants/stage2_cotton.png", null, "Algodão", 50, 80);
insert_plant_array("imgs/plants/seeds.png", "imgs/plants/stage1_corn.png", "imgs/plants/stage2_corn.png", "imgs/plants/stage3_corn.png", "Milho", 80, 130);

localStorage.setItem('plants', JSON.stringify(plants));


function insert_plant_array(seed_img, stage1_img, stage2_img, stage3_img, name, price, sale_value){
    
    obj_plant.seed_img = seed_img;
    obj_plant.stage1_img = stage1_img;
    obj_plant.stage2_img = stage2_img;
    obj_plant.stage3_img = stage3_img;
    obj_plant.name = name;
    obj_plant.price = price;
    
    plants.push(obj_plant);
}

function detect_background(id, this_param){
    
    if (vases[id] == null) {

        this_param.style.backgroundImage = "url(imgs/plants/seeds.png)";
        vases[id] = plants[id];
        console.log(vases[id]);
        
    }
    
}

function open_modal(){

    let modal = document.getElementById("myModal");
    let span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";
    span.onclick = function() {

        modal.style.display = "none";
    
    }

    window.onclick = function(event) {

        if (event.target == modal) {

            modal.style.display = "none";

        }

    }

}

function buy_plant(id){

    let plants_array = JSON.parse(localStorage.getItem('plants'));
    let char = JSON.parse(localStorage.getItem('char'));
    
    if(id == 0){
    
        char.plants.cotton.push(plants_array[id]);    
    
    }else{

        char.plants.corn.push(plants_array[id]);    

    }
    
    localStorage.setItem('char', JSON.stringify(char));

    console.log(plants_array[0].stage3_img);

}

function start(){

    
    let char = localStorage.getItem('char');
    
    if(char != null){

        window.location.href = 'index.html';
        
    }else{

        window.location.href = 'register.html';

    }

}

function register_user(){
    
    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    let birthday = document.getElementById('birthday').value;

    if (name != '' && age != '' && birthday != '') {
        
        let date = new Date(birthday);
        
        if(!isNaN(date)){
            
            let obj_char = {
                'name': name,
                'age': age,
                'birthday':birthday,
                'plants':{
                    'corn':[],
                    'cotton':[]
                }
            }

            localStorage.setItem('char', JSON.stringify(obj_char));
            window.location.href = 'index.html';
        
        }else{
            
            document.getElementById("text_alert").innerHTML = "Digite uma data válida!";
            document.getElementById("alert").style.display = "flex";
        
            let time = setInterval(function(){ 
            
                document.getElementById("alert").style.display = "none"; 
                clearTimeout(time);
            
            }, 2000);
        }


    }else{

        document.getElementById("alert").style.display = "flex";

        let time = setInterval(function(){ 
        
            document.getElementById("alert").style.display = "none"; 
            clearTimeout(time);
        
        }, 2000);


    }
    
}
