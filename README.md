I believe in "Complexity is aggregation of Simplicity", I will make all my best efforts to simplify the concepts with simple examples that are easy to understand. Thanks for visiting the blog, hope you are trying to understand the asynchronous programming challenges in Javascript and the possible solutions. Before we start looking into the solutions lets look into problem.
 
Scope:
This blog focuses on demonstrating the solutions that were evolved over the period of time to make better coding with asynchronous programming in Javascript; to address problems like callback hell, pyramid of doom etc.,.
The objective of these solutions is to make asynchronous programming resemble close to our mental model. With programming languages like Java, C#, python, code always executes in synchronously and can be blocking the control - with a valid reason - those languages have multithreading capabilities and can do multiple things at same time by spawning multiple threads however Javascript being single threaded there is no space to block the code execution hence there is a need to work with single thread efficiently without blocking.
 
The Problem:
Lets say you have to make a coffee - steps need to make coffee are listed below and they need to happen in the same order as mentioned else it would not be a good coffee :-)
1.	Go, get milk
2.	Boil milk
3.	Mix sugar and coffee powder
(Please do not validate my coffee making step, thats my style)
 
I have used setTimeout function to introduce (mock) delay into code.
Its time to code:1
/*

Requirement : Prepare a coffee

Steps :

1. Go and get milk from shop

2. Boil the milk

3. Mix sugar and coffee => Tasty coffee ready :-)

*/



function goGetMilk() {

setTimeout(

function () {

console.log('Step 1 - I got the milk from shop')

},

1000

)

}



function boilMilk() {

setTimeout(

function () {

console.log('Step 2 - Milk is hot')

},

2000

)

}



function mixSugarAndCoffeePowder() {

setTimeout(

function () {

console.log('Step 3 - Coffee powder and Sugar Added');

},

500

)

}



function makeCoffee(){

goGetMilk();

boilMilk();

mixSugarAndCoffeePowder();

}



makeCoffee();

OUT PUT
Step 3 - Coffee powder and Sugar Added

Step 1 - I got the milk from shop

Step 2 - Milk is hot
(Note: To keep things simple - the example here do not demonstrate any data pass between dependent steps, which I plan to cover in next blog )
Ahhhh !!! I do mentioned the steps in the code as per the requirement but output looks like steps are not completed in the defined order. What's going wrong here ??? - Any guess - Yes as you rightly guessed thats the problem with asynchronous code; The Javascript - welcomes you. Let's see what's wrong with the code.
 
When we wait for something to complete - we call it as synchronous or blocking. Since javascript is single threaded and blocking single thread leads to stop the world situation, we do things in asynchronous way to prevent blocking of single thread. Due to this fact setTimeout function executes in asynchronous style as it has to wait for the specified amount of time to start the work designated to it. So in the above code, line with boilMilk function call do not wait for goGetMilk function execution to be completed and same behaviour with mixSugarAndCoffeePower function call.
In current problem we have something to wait for - which means that stop the world till the current step completes. All 3 steps should happen in the fixed sequence else you would not call end product as coffee. So step 2 can happen only after step 1 completes, step 3 can happen only after step 2 completes. To code such problems in synchronous fashion and without blocking code; in Javascript we opt for asynchronous style of coding to perform actions in synchronous style - which makes our lives complex(isn't is not like a tongue twister synchronous asynchronous synchronous asynchronous).
 
Lets see what are the options that evolved over the period of time with language to make our lives easy. Things get complicated to absorb when we as human cannot visualize the concept.
 
Our dream - write asynchronous code look like synchronous code to match with our visualization (mental model)
 1. Callback - {I am AGENT} Your request will take time to process - please carry with your work and we will call you back once given task ( below code has 3 tasks to be done) is done.
(since setTimeout is also a callback, coffee making steps are not coded in callback style to make things simpler)
 
(since setTimeout is also a callback, coffee making steps are not coded in callback style to make things simpler. )
/*

Requirement : Prepare a coffee

Steps :

1. Go and get milk from shop

2. Boil the milk

3. Mix sugar and coffee => Tasty coffee ready :-)

*/



function prepareCoffee() {

setTimeout(

/* 1 */

function goGetMilk() {

console.log('Step 1 - I got the milk from shop');

setTimeout(

/* 2 */

function boilMilk() {

console.log('Step 2 - Milk is hot');

setTimeout(

/* 3 */

function mixSugarAndCoffeePowder() {

console.log('Step 3 - Coffee powder and Sugar Added');

},

500

)

},

2000

)

},

1000

)

}
OUT PUT

Step 1 - I got the milk from shop

Step 2 - Milk is hot

Step 3 - Coffee powder and Sugar Added
Hurray !!! - thats what I want. Cool, we have simple solution to solve the problem but this makes our code looks crazy for just for a small amount of code and small number of dependencies - scared.. - thats the problem with callback style which also termed as callback hell or pyramid of doom, see the deep stepped indentation and if you invert the code the same deep stepped indentation looks like a pyramid.
Lets understand what is happening in the code, since we have a problem when we write the code with a synchronous mental model
We humans, always try to make our lives easy :-). Lets keep moving to see other styles of solution.
 
2. Promise - {I am UNIVERSAL} Your request will take time to process - please carry with your work. We promise you to call you back once given task ( below code has 3 tasks to be done) is done.
 
/*

Requirement : Prepare a coffee

Steps :

1. Go and get milk from shop

2. Boil the milk

3. Mix sugar and coffee => Tasty coffee ready :-)

*/



const goGetMilk = function () {

return new Promise(function (resolve, reject) {

setTimeout(

function () {

console.log('Step 1 - I got the milk from shop');

resolve();

},

1000

)

});

};





const boilMilk = function () {

return new Promise(function (resolve, reject) {

setTimeout(

function () {

console.log('Step 2 - Milk is hot');

resolve();

},

2000

)

});

};



const mixSugarAndCoffeePowder = function () {

return new Promise(function (resolve, reject) {

setTimeout(

function () {

console.log('Step 3 - Coffee powder and Sugar Added');

resolve()

},

500

)

});

};



/* Code looks synchronous for below lines of code .then.then... */



/* 1 */

goGetMilk()

.then(boilMilk) /* 2 */

.then(mixSugarAndCoffeePowder) /* 3 */

.catch(function (err) {

console.log(err)

});
OUT PUT
Step 1 - I got the milk from shop

Step 2 - Milk is hot

Step 3 - Coffee powder and Sugar Added

Awesome !!! we got the same output as desired. Definitely code looks better than our callback style but still you have problems with promises (discussion about problems with promises is beyond the scope of this post)
 
3. Generator - {I am STREAM} Your request will take time to process - please carry with your work. We promise you to call you back whenever your presence is needed and we will not make any progress till you ask us to move to next step.
/*

Requirement : Prepare a coffee

Steps :

1. Go and get milk from shop

2. Boil the milk

3. Mix sugar and coffee => Tasty coffee ready :-)

*/



const goGetMilk = function () {

return new Promise(function (resolve, reject) {

setTimeout(

function () {

console.log('Step 1 - I got the milk from shop');

resolve();

},

1000

)

});

};





const boilMilk = function () {

return new Promise(function (resolve, reject) {

setTimeout(

function () {

console.log('Step 2 - Milk is hot');

resolve();

},

2000

)

});

};



const mixSugarAndCoffeePowder = function () {

return new Promise(function (resolve, reject) {

setTimeout(

function () {

console.log('Step 3 - Coffee powder and Sugar Added');

resolve()

},

500

)

});

};



/* Code looks synchronous in this function */

function* makeCoffee() {

yield goGetMilk();

yield boilMilk();

yield mixSugarAndCoffeePowder();

}



const generator = makeCoffee();

/* 1 */

generator.next().value.then(() =>

/* 2 */ 

generator.next().value.then(

/* 3 */

() => generator.next().value.then()

)
); 
OUT PUT 
Step 1 - I got the milk from shop


Step 2 - Milk is hot

Step 3 - Coffee powder and Sugar Added

Great !! we got the output what we intended to see, however let's also observe the last few lines (55-61) of code. There's lot of pain in this, isn't it?
 
Since generators are based on iterators it is the responsibility of the programmer to run the iteration chain - which is definitely painful. We have control flow libraries like co, task.js to take this pain out.
 
4. Async/Await - {I am FUTURE} Your request will take time to process - please carry with your work. We will finish up the work without disturbing you.
/*


Requirement : Prepare a coffee


Steps :


1. Go and get milk from shop


2. Boil the milk


3. Mix sugar and coffee => Tasty coffee ready :-)


*/





const goGetMilk = function () {


return new Promise(function (resolve, reject) {


setTimeout(


function () {


console.log('Step 1 - I got the milk from shop');


resolve();


},


1000


)


});


};








const boilMilk = function () {


return new Promise(function (resolve, reject) {


setTimeout(


function () {


console.log('Step 2 - Milk is hot');


resolve();


},


2000


)


});


};





const mixSugarAndCoffeePowder = function () {


return new Promise(function (resolve, reject) {


setTimeout(


function () {


console.log('Step 3 - Coffee powder and Sugar Added');


resolve()


},


500


)


});


};





async function makeCoffee() {


await goGetMilk(); /* 1 */


await boilMilk(); /* 2 */


await mixSugarAndCoffeePowder(); /* 3 */


}


makeCoffee(); 

Amazing!! we got the output what we intended to see and now the code looks like synchronous and this is where the future is heading. We want to write asynchronous code in synchronous style and the dream comes true with async / await.





 

