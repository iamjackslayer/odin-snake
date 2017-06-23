
function random(min,max){
	return Math.floor(Math.random()*(max-min) + min);
}
function createGrid(){
	var grid = [];
	for(i=0;i<40;i++){
		grid.push([]);
		for(j=0;j<40;j++){
			grid[i].push(" ");
		}
	}
	return grid;
}

function render(grid){
	$.each(grid,function(rowIndex,row){
		$.each(row,function(itemIndex,item){
			var div = $('<div class="pix"></div>');
			div.css({
				'border':'0.5px red solid',
				'height':'10px',
				'width':'10px',
				'float':'left',
				'text-align':'center',
				'font-size':'10px'
			});
			$('#main').append(div);
			if(itemIndex == 0){
				div.css({
					'clear':'left'
				});
			}
			grid[rowIndex][itemIndex] = div;
		});
	});
	return grid;
}

function gameOver(){
	clearInterval(setIntervalHandler);
	console.log('game over');
	alert('Game over');
}

var snake = {
	position: [20,20],
	direction: 'r',
	move: function(){
		switch(snake.direction){
			case 'r':
				if(snake.position[1] != 39){
					snake.position[1] += 1;
				}else{
					gameOver();
				}
				break;
			case 'l':
				if(snake.position[1] != 0){
					snake.position[1] -= 1;
				}else{
					gameOver();
				}
				break;
			case 'b':
				if(snake.position[0] != 39){	
					snake.position[0] += 1;
				}else{
					gameOver();
				}
				break;
			case 'u':
				if(snake.position[0] != 0){
					snake.position[0] -= 1;
				}else{
					gameOver();
				}
				break;
		}

	}
};
var foodPositionArray = [];//array of eaten food
function updateSnakePositions(tempFoodPosition){
	if(tempFoodPosition){
		foodPositionArray.push([tempFoodPosition[0],tempFoodPosition[1]]);
	}
	currentSnakeBodyUnits[0] = {transition: snake.direction, position: snake.position};
	//move every unit of snake body
	if(currentSnakeBodyUnits.length>=1){
		$.each(currentSnakeBodyUnits,function(index,bodyUnit){
			if(index>0){
				//if current body unit is to the right of the previous one, the snake is moving leftward
				if(bodyUnit.position[1] > currentSnakeBodyUnits[index-1].position[1]){
					//if current body unit is also to the bottom of the previous one, 
					if(bodyUnit.position[0] > currentSnakeBodyUnits[index-1].position[0]){
						//the current body unit shd move up if the prev unit's transition is left, or
						if(currentSnakeBodyUnits[index-1].transition=='l'){
							currentSnakeBodyUnits[index].position[0] -= 1;
							currentSnakeBodyUnits[index].transition = 'u';
						}
						//the current body unit shd move left if the prev unit's transition is up
						else if(currentSnakeBodyUnits[index-1].transition=='u'){
							currentSnakeBodyUnits[index].position[1] -= 1;
							currentSnakeBodyUnits[index].transition = 'l';
						}
					}
					//else if the current body unit is also to the top of the prev
					else if(bodyUnit.position[0] < currentSnakeBodyUnits[index-1].position[0]){
						//if the prev unit's transition is down, the current unit shd move left
						if(currentSnakeBodyUnits[index-1].transition=='b'){
							currentSnakeBodyUnits[index].position[1] -= 1;
							currentSnakeBodyUnits[index].transition = 'l';
						}
						//elseif the prev unit's transition is right, the current unit shd move down
						else if(currentSnakeBodyUnits[index-1].transition=='l'){
							currentSnakeBodyUnits[index].position[0] += 1;
							currentSnakeBodyUnits[index].transition = 'b';
						}
					}
					else{
						//else just move the current body unit leftward as normal
						currentSnakeBodyUnits[index].position[1] -= 1;
						currentSnakeBodyUnits[index].transition = 'l';
					}
				}
				//if current body unit is to the left of the previous one, the snake is moving rightward
				else if(bodyUnit.position[1] < currentSnakeBodyUnits[index-1].position[1]){
					//if current body unit is also to the bottom of the previous one
					if(bodyUnit.position[0] > currentSnakeBodyUnits[index-1].position[0]){
						//if the prev unit's transition is right, the current unit shd move up
						if(currentSnakeBodyUnits[index-1].transition=='r'){
							currentSnakeBodyUnits[index].position[0] -= 1;
							currentSnakeBodyUnits[index].transition = 'u';
						}
						//elseif the prev unit's transition is up, the current unit shd move right
						else if(currentSnakeBodyUnits[index-1].transition=='u'){
							currentSnakeBodyUnits[index].position[1] += 1;
							currentSnakeBodyUnits[index].transition = 'r';
						}
					}
					//else if the current body unit is also to the top of the prev
					else if(bodyUnit.position[0] < currentSnakeBodyUnits[index-1].position[0]){
						//if the prev unit's transition is right, the current unit shd move down
						if(currentSnakeBodyUnits[index-1].transition=='r'){
							currentSnakeBodyUnits[index].position[0] += 1;
							currentSnakeBodyUnits[index].transition = 'b';
						}
						//else if the prev unit's transition is down, the current unit shd move right
						else if(currentSnakeBodyUnits[index-1].transition=='b'){
							currentSnakeBodyUnits[index].position[1] += 1;
							currentSnakeBodyUnits[index].transition = 'r';
						}
					}
					else{
						//else just move current body unit rightward as normal
						currentSnakeBodyUnits[index].position[1] += 1;
						currentSnakeBodyUnits[index].transition = 'r';
					}
				}
				//if current body unit is to the top of the previous one, the snake is moving downward
				else if(bodyUnit.position[0] < currentSnakeBodyUnits[index-1].position[0]){
					currentSnakeBodyUnits[index].position[0] += 1;
					currentSnakeBodyUnits[index].transition = 'b';
				}
				//if current body unit is to the bottom of the previous one, the snake is moving upward
				else if(bodyUnit.position[0] > currentSnakeBodyUnits[index-1].position[0]){
					currentSnakeBodyUnits[index].position[0] -= 1;
					currentSnakeBodyUnits[index].transition = 'u';
				}
			}
		});
		switch(snake.direction){
			case 'r':
				
				
			break;
			case 'l':

			break;
			case 'u':

			break;
			case 'b':

			break;

		}
	}
	
	//Add tail for each eaten food
	//for snake of length 2 units or more
	if(currentSnakeBodyUnits.length>=2){
		//if last the tail is moving right
		if(currentSnakeBodyUnits[currentSnakeBodyUnits.length-1].transition == 'r'){
		
			if(foodPositionArray.length>0){
				console.log("not empty");
				//check if the first food is to the left of the snake's tail
				if(foodPositionArray[0][1]<currentSnakeBodyUnits[currentSnakeBodyUnits.length-1].position[1]){
					currentSnakeBodyUnits.push({transition:'r',position:foodPositionArray[0]});//add tail
					console.log("added tail");
					foodPositionArray.shift();
				}
			}
			
		}
		//if last tail is moving left
		else if(currentSnakeBodyUnits[currentSnakeBodyUnits.length-1].transition == 'l'){
			if(foodPositionArray.length>0){
				console.log("not empty");
				//check if the first food is to the right of the snake's tail
				if(foodPositionArray[0][1]>currentSnakeBodyUnits[currentSnakeBodyUnits.length-1].position[1]){
					currentSnakeBodyUnits.push({transition:'l',position:foodPositionArray[0]});//add tail
					console.log("added tail");
					foodPositionArray.shift();
				}
			}
		}
		//if last tail is moving down
		else if(currentSnakeBodyUnits[currentSnakeBodyUnits.length-1].transition == 'b'){
			if(foodPositionArray.length>0){
				console.log("not empty");
				//check if the first food is to the top of the snake's tail
				if(foodPositionArray[0][0]<currentSnakeBodyUnits[currentSnakeBodyUnits.length-1].position[0]){
					currentSnakeBodyUnits.push({transition:'b',position:foodPositionArray[0]});//add tail
					console.log("added tail");
					foodPositionArray.shift();
				}
			}
		}
		//if last tail is moving up
		else if(currentSnakeBodyUnits[currentSnakeBodyUnits.length-1].transition == 'u'){
			if(foodPositionArray.length>0){
				console.log("not empty");
				//check if the first food is to the top of the snake's tail
				if(foodPositionArray[0][0]>currentSnakeBodyUnits[currentSnakeBodyUnits.length-1].position[0]){
					currentSnakeBodyUnits.push({transition:'u',position:foodPositionArray[0]});//add tail
					console.log("added tail");
					foodPositionArray.shift();
				}
			}
		}
	}
	//for snake of one unit
	else if(currentSnakeBodyUnits.length==1){
		switch(snake.direction){
			case 'r':
				if(foodPositionArray.length>0){
					console.log("not empty");
					//check if the first food is to the left of the snake's tail
					if(foodPositionArray[0][1]<currentSnakeBodyUnits[currentSnakeBodyUnits.length-1].position[1]){
						currentSnakeBodyUnits.push({transition:'r',position:foodPositionArray[0]});//add tail
						console.log("added tail");
						foodPositionArray.shift();
					}
				}
				
			break;
			case 'l':
				if(foodPositionArray.length>0){
					console.log("not empty");
					//check if the first food is to the right of the snake's tail
					if(foodPositionArray[0][1]>currentSnakeBodyUnits[currentSnakeBodyUnits.length-1].position[1]){
						currentSnakeBodyUnits.push({transition:'l',position:foodPositionArray[0]});//add tail
						console.log("added tail");
						foodPositionArray.shift();
					}
				}
			break;
			case 'u':
				if(foodPositionArray.length>0){
					console.log("not empty");
					//check if the first food is to the bottom of the snake's tail
					if(foodPositionArray[0][0]>currentSnakeBodyUnits[currentSnakeBodyUnits.length-1].position[0]){
						currentSnakeBodyUnits.push({transition:'u',position:foodPositionArray[0]});//add tail
						console.log("added tail");
						foodPositionArray.shift();
					}
				}
			break;
			case 'b':
				if(foodPositionArray.length>0){
					console.log("not empty");
					//check if the first food is to the top of the snake's tail
					if(foodPositionArray[0][0]<currentSnakeBodyUnits[currentSnakeBodyUnits.length-1].position[0]){
						currentSnakeBodyUnits.push({transition:'b',position:foodPositionArray[0]});//add tail
						console.log("added tail");
						foodPositionArray.shift();
					}
				}
			break;
		}
	}
	

}

function createFood(divs){
	var foodRow = random(0,20);
	var foodColumn = random(0,20);
	var foodObject = divs[foodRow][foodColumn];//create food on random position
	
	

	return {position: [foodRow,foodColumn],
			object: foodObject};

}
var setIntervalHandler;
var currentSnakeBodyUnits = [];
var food;
$(document).ready(function(){
	// render grid of 40x40
	var divs = render(createGrid()); //return an array of divs(jquery objs) too
	
	food = createFood(divs);
	food.object.css({
		'background-color':'blue'
	});
	setIntervalHandler = setInterval(function(){
		
		//Before the snake moves, whiten the pixels the snake occupies.
		//After the snake moves, make the newly occupied pixels red.
		$.each(currentSnakeBodyUnits,function(pairIndex,bodyUnit){
			divs[bodyUnit.position[0]][bodyUnit.position[1]].css({
				'background-color':'white'
			});
		});
		snake.move();//move the snake's head

		//increase length by one unit if food is eaten
		if((snake.position[0]==food.position[0]) && (snake.position[1]==food.position[1])){
			console.log("just eaten");
			
			updateSnakePositions(food.position);
			food = createFood(divs);
			food.object.css({
				'background-color':'blue'
			});
		}else{
			updateSnakePositions();
		}

		//make the movement visible 
		$.each(currentSnakeBodyUnits,function(pairIndex,bodyUnit){
			divs[bodyUnit.position[0]][bodyUnit.position[1]].css({
				'background-color':'red'
			});
		});
		


	},200);

		// change snake's direction on keypress 
	var keypressFunction = function(e){

		switch(e.key){
			case 'w':
			case 'W':
				snake.direction = 'u';
				break;
			case 'd':
			case 'D':
				snake.direction = 'r';
				break;
			case 's':
			case 'S':
				snake.direction = 'b';
				break;
			case 'a':
			case 'A':
				snake.direction = 'l';
				break;
		}
		
	
	};
	// event listener for keypress to change snake's direction
	$(document).on('keypress', keypressFunction);
	
});