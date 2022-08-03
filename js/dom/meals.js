
//createOneMeal();

    
/*
    console.log("Meal Name: ",data.meals[0].strMeal);
    console.log("strCategory: ",data.meals[0].strCategory);
    console.log("strMealThumb: ",data.meals[0].strMealThumb);
    console.log("seemore: ",data.meals[0].strYoutube);

    */



let urlMainMeal ="https://www.themealdb.com/api/json/v1/1/random.php";
fetch(urlMainMeal,displayMainMeal);


let urlMealsCategories ="https://www.themealdb.com/api/json/v1/1/categories.php";
fetch(urlMealsCategories,suggestedMeals);



function suggestedMeals(data){
    let categories = data.categories
    
    categories.forEach(element => {
        createOneMeal( element.strCategory, element.strCategoryThumb)
    });
}

function displayMainMeal(data){
    console.log(data);
    let mealName = data.meals[0].strMeal;
    let mealCategory = data.meals[0].strCategory;
    let mealImg = data.meals[0].strMealThumb;
    let mealYoutube = data.meals[0].strYoutube;

    mainMeal(mealName,mealCategory,mealImg,mealYoutube);



}

function createElement (element,eleClass,parent,text){
    const newElemnt = document.createElement(element);
    newElemnt.className = eleClass;
    newElemnt.textContent = text;
    parent.appendChild(newElemnt);

    return newElemnt;
}

function mainMeal(mealName,mealCategory,mealImg,mealYoutube){

    const oneMealSection = document.querySelector("#one-meal"); 
    oneMealSection.textContent = '';
    createSearch(oneMealSection);

    oneMealSection.style.backgroundImage = `url(${mealImg})`;
    const oneMealDetails = createElement('div','details',oneMealSection,'');
    const oneMealh2 = createElement('h2','',oneMealDetails,mealName);
    const oneMealspan = createElement('span','',oneMealh2,mealCategory);
    const oneMealbtn = createElement('button','',oneMealDetails,'See more')
}



function createSearch(divParent){
    const searchDiv = createElement('div','search',divParent,'');
    const input = createElement('input','',searchDiv,'');
    const i = createElement('i','fa-solid fa-magnifying-glass',searchDiv,'');

    input.addEventListener('keyup', () =>{
        console.log(input.value);
        let  url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`;

        fetch(url,fetchMealBySearch);

    })
}




function   createOneMeal( mealCategory, mealImg,id=null){

    const oneMeal = document.querySelector("#meals-section");
    
    const meal = createElement('div','meal',oneMeal,'');
    const mealdetails = createElement('div','details',meal,'');
    const mealimg = createElement('div','img',mealdetails,'');
    mealimg.style.backgroundImage = `url(${mealImg})`;
    const mealname = createElement('div','name',mealdetails,'');
    const mealnameh4 = createElement('h4','',mealname,mealCategory);
    const mealbutton = createElement('button','',meal,'See More');

    mealbutton.addEventListener('click', (event)=> {
        if(id === null){
            oneMeal.textContent = "";
            fetchmealsByCategory(mealCategory);  
        }else{
            mealDetails(id);
        } 
    });
}


function fetchmealsByCategory(categoryName){
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;
    fetch(url,mealsFromCategory);
}


function mealsFromCategory(data){
    let meals = data.meals;
    meals.forEach(element => {
        createOneMeal(element.strMeal, element.strMealThumb,element.idMeal);
    });
}


function mealDetails(mealId){
    const mealurl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(mealurl,displayMainMeal);
}


function displayMealDetails(data){
    displayMainMeal(data);

}

function fetchMealBySearch(data){ 
    document.querySelector("#meals-section").textContent = "";
    let meals = data.meals;
    console.log(meals);
    meals.forEach(element => {
        createOneMeal(element.strMeal, element.strMealThumb,element.idMeal);

});
}