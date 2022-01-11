var dog,sadDog,happyDog, database;
var foodS,foodStock;

var addFood;
var foodObj;

//create feed and lastFed variable here
var feed, lastFed

function preload(){
sadDog=loadImage("images/dog.png");
happyDog=loadImage("images/dog1.png")
//food=loadImage("images/milk.png")
}

function setup() {
  database=firebase.database();
  createCanvas(800,600);

  foodObj = new Food ();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(400,475,300,300);
  dog.addImage(sadDog);
  dog.scale=0.2;

  //create feed the dog button here


  addFood=createButton("Add Food");
  addFood.position(770,95);
  addFood.mousePressed(addFoods);

  feed=createButton("Feed The Dog")
  feed.position(670,95)
  feed.mousePressed(feedDog)

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
 
  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
lastFed=data.val()
  })
  
 
  //write code to display text lastFed time here

  fill(255,255,255)

  if(lastFed>=12){
    text("Last Feed: "+ lastFed%12+"PM",360,30)
  }else if(lastFed==0){
    text("Last Feed: 12 AM",360,30)

  }else{
    text("Last Feed: "+ lastFed+"AM",360,30)

  }

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val * 0);
  }else{
    foodObj.updateFoodStock(food_stock_val -1);
  }

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
      FeedTime:hour()
    
  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}




