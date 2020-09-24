var id =0;
var itime=Date.now();
var page=0;
var saisie=0;
var infos="infos";

var tab_e=[["r1","p2","c3","r5","p6","c7"," ","r9","p10","c11","r13","p14","c15"],
           ["p1","c2","r4","p5","c6","r8"," ","p9","c10","r12","p13","c14","r16"],
           ["c1","r3","p4","c5","r7","p8"," ","c9","r11","p12","c13","r15","p16"],
           ["r2","p3","c4","r6","p7","c8"," ","r10","p11","c12","r14","p15","c16"],

           ["r9","p10","c11","r13","p14","c15"," ","r1","p2","c3","r5","p6","c7"],
           ["p9","c10","r12","p13","c14","r16"," ","p1","c2","r4","p5","c6","r8"],
           ["c9","r11","p12","c13","r15","p16"," ","c1","r3","p4","c5","r7","p8"],
           ["r10","p11","c12","r14","p15","c16"," ","r2","p3","c4","r6","p7","c8"]
         ]

var tab_e=[["r230","A102","B294","C326","D214","r470"," ","A278","B118","C54","D150","r198","A166"],
          ["A230","B102","C502","D326","r214","A86"," ","B278","C118","D438","r150","A198","B134"],
          ["B230","C294","D502","r326","A470","B86"," ","C278","D54","r438","A150","B166","C134"],
          ["C102","D294","r502","A214","B470","C86"," ","D118","r54","A438","B198","C166","D134"],
          ["D230","r102","A294","B326","C214","D470"," ","r278","A118","B54","C150","D198","r166"],

          ["A278","B118","C54","D150","r198","A166"," ","r230","A102","B294","C326","D214","r470"],
          ["B278","C118","D438","r150","A198","B134"," ","A230","B102","C502","D326","r214","A86"],
          ["C278","D54","r438","A150","B166","C134"," ","B230","C294","D502","r326","A470","B86"],
          ["D118","r54","A438","B198","C166","D134"," ","C102","D294","r502","A214","B470","C86"],
          ["r278","A118","B54","C150","D198","r166"," ","D230","r102","A294","B326","C214","D470"]
          ]
var tab_r=[[1,5],[2,4],[3,6],[5,1],[4,2],[6,3]]


var sequence_e=tab_e[id%10];
var sequence_r=tab_r[id%3];
var finish=false;

//My buttons
const butfin=document.querySelectorAll(".cansubfinal");
const butt=document.querySelectorAll(".button");
const cancel=document.getElementById('cancel');
const progress =document.getElementById('progress');


//Initial display

document.getElementById("def").style.display = "none";
document.getElementById("progress").style.display = "none";
document.getElementById("eval").style.display = "none";
document.getElementById("rank").style.display = "none";
document.getElementById("out").style.display = "none";
document.getElementById("thanks").style.display = "none";
document.getElementById("send").style.display = "none";
document.getElementById("rank_smart").style.display = "none";

window.addEventListener('beforeunload',function (event){

  if (finish==false){
    // Cancel the event as stated by the standard.
    event.preventDefault();
    // Chrome requires returnValue to be set.
    event.returnValue = '';
  }
});


document.getElementById('start').addEventListener('click',function(){
  id=getRandomInt(10);
  saisie=String(id)+",";
  sequence_e=tab_e[id%8];
  sequence_r=tab_r[id%3];
});

document.addEventListener('click',function(){
  if(page==15){
    infos="infosfr,";
    var f = document.querySelectorAll('.infos');
    for (let question = 0; question <f.length; question++) {
      b=f[question].length;
      for (let opt=0; opt<b;opt++){
        if (f[question][opt].checked) {infos+=opt+",";}
      }
    }
    infos+= String(Date.now()-itime)+',';
    infos+= smart;
    console.log(infos);
  }
  document.getElementById("sentence").value=saisie+infos;
});




for (let but=0; but< butt.length;but++){
  butt[but].addEventListener("click", function() {
    saisir(page);
    reinitialiser();
    open_next(page);
    page+=1;
  });
};

butfin[0].addEventListener('click',function(){
  time=Date.now()-itime;
  registre(saisie,time);
});

cancel.addEventListener('click',function(e){
  var imgs= document.querySelectorAll('.img');
  var rks= document.querySelectorAll('.empty_square');
  var img_row=document.getElementById('row');
  for (let j=0; j<rks.length; j++){
    var rk=rks[j];
    var aimg= rk.querySelectorAll('.img');
    for (var i = 0; i <aimg.length; i++){
      rk.removeChild(aimg[i]);
      img_row.append(aimg[i]);
    }
  }
  butrank[0].disabled = true;
});



var smart=false
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 smart=true
 console.log('ok');
}
function saisir(page){
  if(page==7 ||page==14){
    if (smart){
      var im=sequence_r[(page-1)%6];
      var f =document.getElementById('row_smart').querySelectorAll(".img");
      saisie+=" rank 2"+im+",";
      for (let question = 0; question <f.length; question++) {
        console.log(f[question].id+",");
        saisie+=f[question].id+",";

      }
    }else{
      var im=sequence_r[(page-1)%6];
      var f =document.querySelectorAll(".empty_square");
      saisie+=" rank 2"+im+",";
      for (let question = 0; question <f.length; question++) {
        saisie+=f[question].querySelectorAll(".img")[0].id+",";
      }
    }
  } else if (page==15) {
    saisie+=" infosfr,"
    var f = document.querySelectorAll('.infos');
    for (let question = 0; question <f.length; question++) {
      b=f[question].length;
      for (let opt=0; opt<b;opt++){
        if (f[question][opt].checked) {saisie+=opt+",";}
      }
    }
  }else if (page>14 ||page<1){
 }else{
    var im=sequence_e[page-1];
    saisie+=" eval "+im+",";
    var f = document.querySelectorAll('.form');
    for (let question = 0; question <f.length; question++) {
      b=f[question].length;
      for (let opt=0; opt<b;opt++){
        if (f[question][opt].checked) {saisie+=opt+",";}
      }
  }

}}
var st=true;

document.getElementById("showdef").addEventListener('click',function(){
  if (st){
      document.getElementById("ct").style.display = "inherit";
      st=false;
      document.getElementById("showdef").innerHTML="Cacher les définitions.";
  }else{
      document.getElementById("ct").style.display = "none";
      st=true;
      document.getElementById("showdef").innerHTML="Afficher les définitions.";
}
});


function open_next(page){

  progress.value=page*100/15
  if(page==6 ||page==13){
    var im=sequence_r[page%6];
    document.getElementById("ct").style.display = "none";
    document.getElementById("def").style.display = "inherit";
    document.getElementById("progress").style.display = "inherit";
    document.getElementById("eval").style.display = "none";
    document.getElementById("send").style.display = "none";
    document.getElementById("init_image").innerHTML="<img src=\"images\\rank\\i2"+im+".png\"  class=\"img\" draggable=\"false\">";
    document.getElementById("init_image2").innerHTML="<img src=\"images\\rank\\i2"+im+".png\"  class=\"img\" draggable=\"false\">";
    document.getElementById("empty_row").innerHTML="<div class=\"empty_square\" value=\"1\"></div><div class=\"empty_square\" value=\"2\"></div><div class=\"empty_square\" value=\"3\"></div><div class=\"empty_square\" value=\"4\"></div><div class=\"empty_square\" value=\"5\"></div>"
    document.getElementById("row").innerHTML="<img src=\"images\\rank\\D2"+im+".png\" draggable=\"true\" class=\"img\" id=\"d\"><img src=\"images\\rank\\C2"+im+".png\" draggable=\"true\" class=\"img\" id=\"c\"><img src=\"images\\rank\\r2"+im+".png\" draggable=\"true\" class=\"img\" id=\"r\"><img src=\"images\\rank\\A2"+im+".png\" draggable=\"true\" class=\"img\" id=\"a\" ><img src=\"images\\rank\\B2"+im+".png\" draggable=\"true\" class=\"img\" id=\"b\">";
    document.getElementById("row_smart").innerHTML=
      "<div class='col' id='col0'><img src=\"images\\rank\\D2"+im +".png\" draggable=\"true\" class=\"img\" id=\"d\"><div class='row'><button class='classementg' type='button'>	&lt;	&lt;</button><button class='classementd' type='button'>&gt; 	&gt;</button></div></div>"
      +"<div class='col' id='col1'><img src=\"images\\rank\\C2"+im+".png\" draggable=\"true\" class=\"img\" id=\"c\"><div class='row'><button class='classementg' type='button'>	&lt;	&lt;</button><button class='classementd' type='button'>&gt; 	&gt;</button></div></div>"
      +"<div class='col' id='col2'><img src=\"images\\rank\\r2"+im+".png\" draggable=\"true\" class=\"img\" id=\"r\"><div class='row'><button class='classementg' type='button'>	&lt;	&lt;</button><button class='classementd' type='button'>&gt; 	&gt;</button></div></div>"
      +"<div class='col' id='col3'><img src=\"images\\rank\\A2"+im+".png\" draggable=\"true\" class=\"img\" id=\"a\"><div class='row'><button class='classementg' type='button'>	&lt;	&lt;</button><button class='classementd' type='button'>&gt; 	&gt;</button></div></div>"
      +"<div class='col' id='col4'><img src=\"images\\rank\\B2"+im+".png\" draggable=\"true\" class=\"img\" id=\"b\"><div class='row'><button class='classementg' type='button'>	&lt;	&lt;</button><button class='classementd' type='button'>&gt; 	&gt;</button></div></div>";
    if (smart){
          document.getElementById("rank").style.display = "none";
          document.getElementById("rank_smart").style.display = "inherit";
          rankwitharrow();
    }else{
          document.getElementById("rank").style.display = "inherit";
          document.getElementById("rank_smart").style.display = "none";
          draganddrop();}
  } else if (page==14) {

    document.getElementById("ct").style.display = "none";
    document.getElementById("def").style.display = "none";
    document.getElementById("progress").style.display = "inherit";
    document.getElementById("rank").style.display = "none";
    document.getElementById("out").style.display = "inherit";
    document.getElementById("send").style.display = "inherit";
    document.getElementById("rank_smart").style.display = "none";
  }else if (page>14){
      finish=true;
      document.getElementById("ct").style.display = "none";
      document.getElementById("progress").style.display = "inherit";
      document.getElementById("send").style.display = "none";
      document.getElementById("out").style.display = "none";
      document.getElementById("rank").style.display = "none";
      document.getElementById("entrance").style.display = "none";
      document.getElementById("eval").style.display = "none";
      document.getElementById("thanks").style.display = "inherit";
      document.getElementById("def").style.display = "none";
      document.getElementById("rank_smart").style.display = "none";
 }else{
    var im=sequence_e[page];
    document.getElementById("ct").style.display = "none";
    document.getElementById("def").style.display = "inherit";
    document.getElementById("progress").style.display = "inherit";
    document.getElementById("entrance").style.display = "none";
    document.getElementById("rank").style.display = "none";
    document.getElementById("send").style.display = "none";
    document.getElementById("image_row").innerHTML=  "<img src=\"images\\eval\\i"+im.substring(1,im.length)+".png\" class=\"img\">  <img src=\"images\\fleche.jpg\" class=\"imgdemi\"><img src=\"images\\eval\\"+im+".png\" class=\"img\">"
    document.getElementById("eval").style.display = "inherit";
    document.getElementById("rank_smart").style.display = "none";
  }
};


function reinitialiser(){
  for (let elem=0; elem<butform.length;elem++){
    butform[elem].disabled = true;
  }
  for (let elem=0; elem<butfin.length;elem++){
    butfin[elem].disabled = true;
  }
  for (let elem=0; elem<butrank.length;elem++){
    butrank[elem].disabled = true;
  }
  var f = document.querySelectorAll('.form');
  for (var question = 0; question <f.length; question++) {
    b=f[question].length;
    var fill=false
    for (var opt=0; opt<b;opt++){
      f[question][opt].checked=false;
    }
    if (!fill) cansubmit = false;
  }
}

function rankwitharrow(){
  var bg=document.querySelectorAll('.classementg');
  var bd=document.querySelectorAll('.classementd');
  var ligne=document.querySelectorAll('.img');
  for (let i=0; i<bg.length; i++){
    bg[i].addEventListener('click',function(){
      //déplacement vers la gauche
      var a=document.getElementById('col'+(i-1)).innerHTML;
      var b=document.getElementById('col'+(i)).innerHTML;
      document.getElementById('col'+(i-1)).innerHTML=b;
      document.getElementById('col'+(i)).innerHTML=a;
      rankwitharrow();
    })
    bd[i].addEventListener('click',function(){
      //déplacmeent vers la droite
      var a=document.getElementById('col'+(i)).innerHTML;
      var b=document.getElementById('col'+(i+1)).innerHTML;
      document.getElementById('col'+(i)).innerHTML=b;
      document.getElementById('col'+(i+1)).innerHTML=a;
      rankwitharrow();
    })
  }
  document.addEventListener('click',function(){
    //activation de toutes les boutons
    for (let i=0; i<bg.length; i++){
      bd[i].disabled = false;
      bg[i].disabled = false;
    }
    //désactivation de 0g
    document.getElementById('col0').querySelectorAll('.classementg')[0].disabled = true;
    //désactivation de 3d
    document.getElementById('col4').querySelectorAll('.classementd')[0].disabled = true;

  })
}
function draganddrop(){
  let draggedItem=null;
  var imgs= document.querySelectorAll('.img');
  var rks= document.querySelectorAll('.empty_square');
  var img_row=document.getElementById('row');
  var previouspos=[img_row,img_row,img_row,img_row];
  for (let i=0; i<imgs.length; i++){
    var img=imgs[i];
    var initpos=img_row[0];
    img.addEventListener('dragstart',function(e){
      draggedItem=this;
      initpos=this.parentNode
    });
    img.addEventListener('dragend',function(){
      setTimeout(function(){
        draggedItem=null;
     },0);
   });
   for (let j=0; j<rks.length; j++){
    var rk=rks[j];
    rk.addEventListener('dragover',function(e){e.preventDefault();});
    rk.addEventListener('dragenter',function(e){e.preventDefault();});
    rk.addEventListener('drop',function(e){
    e.preventDefault();
    if (draggedItem.className=="img"){
      this.append(draggedItem);
    }
      if (this.childNodes.length>1){
        aimg= this.querySelectorAll('.img');
        if (aimg[0].id==i){
          var k=1;
        }else{
          var k=0;
        };
        this.removeChild(aimg[k]);
        initpos.append(aimg[k]);
        previouspos[i]=rk;
        previouspos[aimg[k].id] =initpos;
      }else{
        previouspos[i]=rk;
      }
    });
  }
}};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
