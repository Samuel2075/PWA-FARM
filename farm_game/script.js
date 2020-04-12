
let vases = [
    
    null, null, null,
    null, null, null,
    null, null, null,

];
let plants = [];
let char = JSON.parse(localStorage.getItem('char'));
let gold_span = document.getElementById("gold_span");
let cotton_seeds = document.getElementById("cotton_seeds_char");
let corn_seeds = document.getElementById("corn_seeds_char");
let today_date;

if (localStorage.getItem("date_current") === null) {
    
    today_date = new Date();
    localStorage.setItem('date_current', today_date.toString());

}else{

    today_date = new Date(localStorage.getItem('date_current'));

}


if (localStorage.getItem("vases") === null) {
    
    localStorage.setItem('vases', JSON.stringify(vases));

}else{
    let btn_bg = "";
    let url_bgs = "";
    vases = JSON.parse(localStorage.getItem('vases'));

    for (let index = 0; index < vases.length; index++) {
       
        if(vases[index] != null){

            btn_bg = document.getElementById("btn_" + index);
            
            switch (vases[index].stage_current) {

                case 0:

                    url_bgs = vases[index].seed_img;
                    break;

                case 1:

                    url_bgs = vases[index].seed_img;
                    break;

                case 2:

                    url_bgs = vases[index].stage1_img;
                    break;

                case 3:
                    
                    url_bgs = vases[index].stage2_img;
                    break;
            
                default:
                    
                    if(vases[index].stage3_img != null){
                        
                        url_bgs = vases[index].stage3_img;
                        
                    }
                    break;
            }
            btn_bg.style.backgroundImage = "url(" + url_bgs + ")";
        
        }
        
    }

}



insert_plant_array("imgs/plants/seeds.png", "imgs/plants/stage1_cotton.png", "imgs/plants/stage2_cotton.png", null, "Algodão", 50, 80);
insert_plant_array("imgs/plants/seeds.png", "imgs/plants/stage1_corn.png", "imgs/plants/stage2_corn.png", "imgs/plants/stage3_corn.png", "Milho", 80, 130);

localStorage.setItem('plants', JSON.stringify(plants));
localStorage.setItem('char', JSON.stringify(char));

let plants_local = JSON.parse(localStorage.getItem('plants'));

function insert_plant_array(seed_img, stage1_img, stage2_img, stage3_img, name, price, sale_value){
    
    let obj_plant = {
    
        seed_img: "",
        stage1_img: "",
        stage2_img: "",
        stage3_img: "",
        name: "",
        price: 0,
        stage_current: 0,
        sale_value: 0,
        finish: false
        
    }

    obj_plant.seed_img = seed_img;
    obj_plant.stage1_img = stage1_img;
    obj_plant.stage2_img = stage2_img;
    obj_plant.stage3_img = stage3_img;
    obj_plant.name = name;
    obj_plant.sale_value = sale_value;
    obj_plant.price = price;
    
    plants.push(obj_plant);

}

function detect_background(id, this_param){
    
    if (vases[id] == null) {

        if(char.seed_current == null){
            
            alert("Selecione alguma semente para plantar!");
            
        }else if(char.seed_current == 0){
            
            if(char.plants.cotton.length > 0){
                
                vases[id] = plants[char.seed_current];
                this_param.style.backgroundImage = "url(" + plants[char.seed_current].seed_img + ")";
                
                char.plants.cotton.pop();
                
            }else{
                
                alert("Você não possue mais sementes de algodão para plantar!");
                
            }
            
        }else{

            if(char.plants.corn.length > 0){

                vases[id] = plants[char.seed_current];
                this_param.style.backgroundImage = "url(" + plants[char.seed_current].seed_img + ")";
                
                char.plants.corn.pop();
                
            }else{
                
                alert("Você não possue mais sementes de milho para plantar!");
                
            }
            
            
        }
        
        localStorage.setItem('char', JSON.stringify(char));
        
    }else{

        if(char.remove_plant){

            if(vases[id].finish){

                this_param.style.backgroundImage = "url('imgs/bg.png')";
                char.gold = char.gold + vases[id].sale_value;
                vases[id] = null;
            
            }else{

                let confirm_var = confirm("Esta planta ainda não está pronta, deseja remove-la mesmo assim? Você não recebera gold por ela.");
                
                if(confirm_var){

                    this_param.style.backgroundImage = "url('imgs/bg.png')";
                    vases[id] = null;

                }

            }
        
        }else{

            alert("Este vaso já possue uma planta, remova ela antes de plantar outra!");
        
        }

    }

    console.log(vases);
    localStorage.setItem('vases', JSON.stringify(vases));

    
}

function next_day(){

    vases = JSON.parse(localStorage.getItem('vases'));
    let seeds_planted = 0;
    let btn_bg = "";
    let url = "";
    
    for (let index = 0; index < vases.length; index++) {

        if(vases[index] != null){
            
            seeds_planted++;
            
            switch (vases[index].stage_current) {
            
                case 0:
                    
                    url = vases[index].seed_img;
                    
                    break;
                case 1:
                    
                    url = vases[index].stage1_img;
                    
                    break;
                case 2:
                    
                    url = vases[index].stage2_img;
                    
                    break;
                case 3:
                    
                    if(vases[index].stage3_img == null){
                    
                        vases[index].finish = true;
                    
                    }

                    url = vases[index].stage3_img;
                                    
                    break;
                default:

                    vases[index].finish = true;

                    break;

            }
            
            if(!vases[index].finish){

                if(url != null){
    
                    btn_bg = document.getElementById("btn_" + index);
                    btn_bg.style.backgroundImage = "url(" + url + ")";
                
                }
            
                vases[index].stage_current = vases[index].stage_current + 1;
            }
            
            localStorage.setItem('vases', JSON.stringify(vases));
        

        }
        
    }    

    if(seeds_planted == 0 && char.plants.corn == 0 && char.plants.cotton && char.gold < 50){
        
        localStorage.clear();
        window.location.href = 'index.html';
    
    }
    
}

function open_modal(){

    let modal = document.getElementById("myModal");
    let span = document.getElementsByClassName("close")[0];

    gold_span.innerText = char.gold + "$";
    cotton_seeds.innerText = char.plants.cotton.length + "x";
    corn_seeds.innerText = char.plants.corn.length + "x";

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
    
    if(id == 0){
    
        if(char.gold >= 50){

            char.plants.cotton.push(plants_array[id]);
            char.gold = char.gold - 50;
                 
            localStorage.setItem('char', JSON.stringify(char));

            cotton_seeds.innerText = char.plants.cotton.length + "x";
            
        }else{

            alert("Dinheiro insuficiente algodão");

        }
    
    }else{
        
        if(char.gold >= 80){

            char.plants.corn.push(plants_array[id]);
            char.gold = char.gold - 80;     
            localStorage.setItem('char', JSON.stringify(char));
            corn_seeds.innerText = char.plants.corn.length + "x";
            
        }else{

            alert("Dinheiro insuficiente milho");

        } 

    }

    gold_span.innerText = char.gold + "$";

}

function remove_plant(){

    char.seed_current = null;
    char.remove_plant = true;
    document.getElementById("select_plant").innerText = "Nenhuma";
    localStorage.setItem('char', JSON.stringify(char));

}

function use_plant(id){

    if(id == 0){

        if(char.plants.cotton.length > 0){

            char.seed_current = 0;
            
        }else{

            alert("Não tem mais sementes para plantar algodão");

        }

    }else{

        if(char.plants.corn.length > 0){

            char.seed_current = 1;
            
        }else{

            alert("Não tem mais sementes para plantar milho");

        }

    }
    char.remove_plant = false;
    localStorage.setItem('char', JSON.stringify(char));    
    document.getElementById("select_plant").innerText = plants_local[char.seed_current].name;

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
                'plants': {
                    'corn':[],
                    'cotton':[]
                },
                gold: 200,
                seed_current: null,
                remove_plant: false
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
