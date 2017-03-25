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

/*******************************************

Step 3 - Coffee powder and Sugar Added
Step 1 - I got the milk from shop
Step 2 - Milk is hot

***************************************************/


//1) CALL BACK MODEL

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

/*******************************************
OUT PUT
Step 1 - I got the milk from shop
Step 2 - Milk is hot
Step 3 - Coffee powder and Sugar Added 

***********************************************/

//2. Promise MODAL

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

/**********************************************
Step 1 - I got the milk from shop
Step 2 - Milk is hot
Step 3 - Coffee powder and Sugar Added 
***********************************************/

//3. Generator

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

/************************************************
OUT PUT 
Step 1 - I got the milk from shop
Step 2 - Milk is hot
Step 3 - Coffee powder and Sugar Added s

**************************************************/ 

//4. Async/Await 

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