
let canvas = document.getElementById("canvas");

var window_width = window.innerWidth;
var window_height = window.innerHeight;

let context = canvas.getContext("2d");

canvas.width = window_width;
canvas.height = window_height;

console.log (document.getElementById("frogy")); 
console.log (document.getElementsByClassName("form")); 
console.log (document.getElementsByTagName("li")); 
console.log (document.querySelectorAll("div.formularz")); 
console.log (document.querySelector("p"));

var frog = document.getElementById('frogy');
var arrowR = document.getElementById('right');
var arrowL = document.getElementById('left');
var click = document.getElementById('click');
var text = document.getElementById('text');
var textA = document.getElementById('textA');
var textB = document.getElementById('textB');
var textC = document.getElementById('textC');
var textD = document.getElementById('textD');
var swamp = document.getElementById('swamp');
var form = document.getElementById('form');
var formularz = document.getElementById('formularz');
var frogy2 = document.getElementById('frogy2');
var email = document.getElementById('email');
var mess = document.getElementById("mess");
var topic = document.getElementById("topic");



//delay()
const delay = millis => new Promise((resolve, reject) => {
    setTimeout(_ => resolve(), millis);
  });

//animacja biegu
$(document).ready(function(){

    $surface = $('.surface');

    $surface.on('click',function(e){
            $($surface).toggleClass('moveRight');
            if(frog.getAttribute("src") == "FrogIdle.gif"){
                frog.setAttribute("src", "forgjump.gif");
            }
            else{
                frog.setAttribute("src", "FrogIdle.gif");
            }         
    });
});


//przelaczanie pomiedzy tekstami
$(document).ready(function(){
    
    $(text).click(function(){
        if(textA.style.display == 'block'){
            textA.style.display = 'none';
            textB.style.display = 'block';
        }else if (textB.style.display == 'block'){
            textB.style.display = 'none';
            textC.style.display = 'block';
        }else if (textC.style.display == 'block'){
            textC.style.display = 'none';
            textD.style.display = 'block';
        }else if (textD.style.display == 'block'){
            textD.style.display = 'none';
            textA.style.display = 'block';
        }
    });
});

//animacja w prawo
$(document).ready(function(){

    $swamp = $('.swamp');

    $(arrowR).click(function(){
        const myFunction = async function() {
            $($swamp).toggleClass('moveRight2');
            await delay(2000);
            swamp.style.display = "none";
            form.style.display = "block";
        };
        myFunction();
    });
});

//lista
$(document).ready(function(){

    var li1 = document.getElementById('li1');
    var li2 = document.getElementById('li2');

    $(li1).hover(function(){
        li1.innerHTML = "Herbata";
    },function(){
        li1.innerHTML = "Yerba";
    });

    $(li2).hover(function(){
        li2.innerHTML = "Herbata";
    },function(){
        li2.innerHTML = "Woda";
    });
});

//dodawanie do listy(po kliknieciu zaby) / random
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

$(document).ready(function(){

    $(frog).click(function(){
        if($("#list").children().length < 10){
            var a = getRandomInt(3);
            if(a == 0){
            $("#list").append($("<li>").html("Herbata"));}
            if(a == 1){
            $("#list").append($("<li>").html("Zielona Herbata"));}
            if(a == 2){
            $("#list").append($("<li>").html("Czarna Herbata"));}
        }   
    });
});

//powrot do lewej
$(document).ready(function(){

    $swamp = $('.swamp');
    $form = $('.form');

    $(arrowL).click(function(){
            form.style.display = "none";
            $($swamp).toggleClass('moveRight2');
            swamp.style.display = "block";         
    });
});

//obramowki formularza
$f = $('#f');

$(document).ready(function(){

    $(formularz).on('input',function(){
        var val = mess.value;
        var emailV = email.value;
        var valT = topic.value;
        if(val.length > 350){
            mess.style.border = '4px solid red';
        }else{
            mess.style.border = '2px solid black';}
        if(valT.length > 20 || valT.length < 3){
            topic.style.border = '4px solid red';
        }else{
            topic.style.border = '2px solid black';
        }
        if(validateEmail(emailV) == null){
            email.style.border = '4px solid red';
        }else{
            email.style.border = '2px solid black';
        }
    });
});

//walidacja emaila
const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

//wysylanie formularza
$(document).ready(function(){

    var bar = document.getElementById('bar');

    $('#button').click(function() {
        var val = mess.value;
        var valT = topic.value;
        var emailV = email.value;


        if(val.length > 350 || valT.length > 20 || validateEmail(emailV.trim()) == null || valT.length < 3){
            frogy2.setAttribute("src", "frogBad.gif");
        }else if(val.length <= 350 && valT.length <= 20 && validateEmail(emailV.trim()) && valT.length >=3){
            const myFunction = async function() {
                frogy2.setAttribute("src", "frogLove.gif");
                bar.style.display = "block";
                await delay(3000);
                var formdata = 'topic=' + valT + '&email=' + emailV + '&mess=' + val;
                $.ajax({
                    type: "POST",
                    url: "mail.php", //call storeemdata.php to store form data
                    data: formdata,
                    cache: false,
                });
                bar.style.display = "none";
                $f.trigger("reset");
                mess.placeholder = "Dzięki za wiadomość!";
            };
            myFunction();
        }else{
            frogy2.setAttribute("src", "FrogBad.gif");
        }
    });
});

//animacja budzenia
$(document).ready(function(){

    $(formularz).hover(function(){
        frogy2.setAttribute("src", "FrogIdle2t.gif");
    },function(){
        frogy2.setAttribute("src", "frogSleep.gif");
    });
});

//pointer gif
$(document).ready(function(){

    $(text).hover(function(){
        click.style.display = "block";
    },function(){
        click.style.display = "none";
    });
});

//Robaki
class Circle {
    constructor(xpos, ypos, h, w, color, speed){
        this.xpos = xpos;
        this.ypos = ypos;
        this.h = h;
        this.color = color;
        this.w = w;
        this.speed = speed;
        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }

    draw(context){
        context.beginPath();
        context.rect(this.xpos,this.ypos,this.w,this.h);
        context.fillStyle=this.color;
        context.shadowColor="#dbffa8";
        context.shadowBlur = 15;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.fill();
        context.stroke();  
    }

    update() {
        this.draw(context);
        
        if( (this.xpos + this.w) > window_width){
            this.dx = -this.dx;
        }

        if( (this.xpos - this.w) < 0){
            this.dx = -this.dx;
        }

        if( (this.ypos - this.h) < 0){
            this.dy = -this.dy;
        }

        if( (this.ypos + this.h) > window_height){
            this.dy = -this.dy;
        }
        this.xpos += this.dx;
        this.ypos += this.dy;
    }
}


let my_circle = new Circle(120, 130, 8,8, "#b3ff47", 1);
let my_circle2 = new Circle(100, 100, 8,8, "#b3ff47", 1);
let my_circle3 = new Circle(250, 100, 8,8, "#b3ff47", 1);
let my_circle4 = new Circle(320, 500, 8,8, "#b3ff47", 1);
let my_circle5 = new Circle(600, 400, 8,8, "#b3ff47", 1);
let my_circle6 = new Circle(345, 234, 8,8, "#b3ff47", 1);

my_circle.draw(context);
my_circle2.draw(context);
my_circle3.draw(context);
my_circle4.draw(context);
my_circle5.draw(context);
my_circle6.draw(context);

let updateCircle = function() {
    requestAnimationFrame(updateCircle);
    context.clearRect(0,0,window_width, window_height);
    my_circle.update();
    my_circle2.update();
    my_circle3.update();
    my_circle4.update();
    my_circle5.update();
    my_circle6.update(); 
};

updateCircle();

