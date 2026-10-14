
let sizeMap = {
    "קטנה":   "Small",
    "בינונית": "Medium",
    "גדולה":  "Large"
};

// מתרגם את הערך העברי של השתייה לשם התמונה באנגלית
let drinkMap = {
    "קולה": "Cola",
    "מים":  "Water",
    "מיץ":  "Juice",
    "תה":   "Tea",
    "קפה":  "Coffee"
};

// מערך התוספות - לכל תוספת הערך שלה וקובץ התמונה שמונח על הפיצה
let toppingsList = [
    { value: "פטריות",  img: "images/mushroom.png" },
    { value: "זיתים",    img: "images/olive.png" },
    { value: "בצל",      img: "images/onion.png" },
    { value: "עגבניות",  img: "images/tomato.png" },
    { value: "פפרוני",   img: "images/pepperoni.png" },
    { value: "פלפל",     img: "images/pepper.png" },
    { value: "אננס",     img: "images/pineapple.png" }
];


// ===================== בחירת גודל =====================
function updateSize() {
    let sizeRadios = document.getElementsByName("size");
    let chosen = "";

    // פעולה ראשונה: הדגשת התמונה הנבחרת בשורה העליונה
    for (let i = 0; i < sizeRadios.length; i++) {
        let img = document.getElementById("img" + sizeMap[sizeRadios[i].value]);
        img.className = "sizeImg";   // כולן חצי שקופות
        if (sizeRadios[i].checked == true) {
            img.className = "sizeImg selected";   // הנבחרת - שקיפות מלאה
            chosen = sizeRadios[i].value;
        }
    }

    // פעולה שנייה: הצגת הפיצה הקבועה בריבוע התחתון
    if (chosen != "") {
        let pizza = document.getElementById("finalPizza");
        pizza.src = "images/pizza.png";
        pizza.style.display = "block";   // מציגים את הפיצה
    }
    checkForm();
}


// ===================== סימון תוספות =====================
function updateToppings() {
    let boxes = document.getElementsByName("topping");
    let layer = document.getElementById("toppingsLayer");

    layer.innerHTML = "";   // מנקים את התוספות הקודמות

    // עוברים על כל הצ'ק-בוקסים
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].checked == true) {
            // מחפשים במערך את התמונה ששייכת לתוספת הזו
            for (let j = 0; j < toppingsList.length; j++) {
                if (toppingsList[j].value == boxes[i].value) {
                    layer.innerHTML = layer.innerHTML +
                        "<img class='toppingOnPizza' src='" + toppingsList[j].img + "' alt='" + boxes[i].value + "' />";
                }
            }
        }
    }
}


// ===================== בחירת שתייה =====================
function updateDrink() {
    let drinkBoxes = document.getElementsByName("drink");

    // עוברים על כל השתייה ומדגישים את המסומנות
    for (let i = 0; i < drinkBoxes.length; i++) {
        let img = document.getElementById("img" + drinkMap[drinkBoxes[i].value]);
        img.className = "drinkImg";   // חצי שקיפות
        if (drinkBoxes[i].checked == true) {
            img.className = "drinkImg selected";   // המסומנת - שקיפות מלאה
        }
    }

    checkForm();
}


// ===================== בדיקה אם אפשר להפעיל את הכפתור =====================
function checkForm() {
    let name   = document.getElementById("customerName").value;
    let size   = getChecked("size");
    let pickup = getChecked("pickup");
    let drinks = getCheckedList("drink");   // לפחות שתייה אחת

    let btn = document.getElementById("submitBtn");

    // רק אם שם, גודל, איסוף וגם לפחות שתייה אחת נבחרו
    if (name != "" && size != "" && pickup != "" && drinks != "") {
        btn.disabled = false;
        btn.style.opacity = 1;
    } else {
        btn.disabled = true;
        btn.style.opacity = 0.5;
    }
}


// ===================== פונקציות עזר =====================

// מחזירה את הערך הנבחר מקבוצת רדיו (ערך אחד)
function getChecked(groupName) {
    let radios = document.getElementsByName(groupName);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked == true) {
            return radios[i].value;
        }
    }
    return "";
}

// מחזירה את כל הערכים המסומנים בקבוצה, מופרדים בפסיק
function getCheckedList(groupName) {
    let items = document.getElementsByName(groupName);
    let result = "";
    for (let i = 0; i < items.length; i++) {
        if (items[i].checked == true) {
            if (result != "") {
                result = result + ", ";
            }
            result = result + items[i].value;
        }
    }
    return result;
}


// ===================== לחיצה על "שלח הזמנה" =====================
function sendOrder() {
    let name   = document.getElementById("customerName").value;
    let size   = getChecked("size");
    let pickup = getChecked("pickup");

    // שתייה - כל המשקאות שנבחרו
    let drink = getCheckedList("drink");
    if (drink == "") {
        drink = "ללא שתייה";
    }

    // תוספות - כל מה שסומן
    let toppings = getCheckedList("topping");
    if (toppings == "") {
        toppings = "ללא תוספות";
    }

    // הערות
    let notes = document.getElementById("notes").value;
    if (notes == "") {
        notes = "ללא הערות";
    }

    // בונים את טקסט הסיכום
    let summary = "שם הלקוח: " + name + "<br>" +
        "גודל הפיצה: " + size + "<br>" +
        "תוספות: " + toppings + "<br>" +
        "שתייה: " + drink + "<br>" +
        "איסוף: " + pickup + "<br>" +
        "הערות: " + notes;

    // מציגים בחלון הסיכום ופותחים אותו
    document.getElementById("orderSummary").innerHTML = summary;
    document.getElementById("orderModal").style.display = "flex";
}

function updatePickup() {
    let pickupRadios = document.getElementsByName("pickup");

    // מסתירים את כל תמונות האיסוף
    document.getElementById("imgTakeaway").style.display = "none";
    document.getElementById("imgSit").style.display = "none";

    // מציגים את התמונה של האפשרות שנבחרה
    for (let i = 0; i < pickupRadios.length; i++) {
        if (pickupRadios[i].checked == true) {
            if (pickupRadios[i].value == "לקחת") {
                document.getElementById("imgTakeaway").style.display = "block";
            }
            if (pickupRadios[i].value == "לשבת") {
                document.getElementById("imgSit").style.display = "block";
            }
        }
    }

    checkForm();   // ממשיכים לבדוק אם הכפתור יכול להידלק
}
// ===================== סגירת חלון הסיכום =====================
// ===================== סגירת חלון הסיכום ואיפוס הטופס =====================
function closeModal() {
    // סוגרים את החלון
    document.getElementById("orderModal").style.display = "none";

    // מנקים את תיבת הטקסט וההערות
    document.getElementById("customerName").value = "";
    document.getElementById("notes").value = "";
 

    // מבטלים את כל הסימונים (רדיו וצ'ק-בוקס)
    let allInputs = document.getElementsByTagName("input");
    for (let i = 0; i < allInputs.length; i++) {
        if (allInputs[i].type == "radio" || allInputs[i].type == "checkbox") {
            allInputs[i].checked = false;
        }
    }

    // מחזירים את תמונות הגדלים לחצי שקיפות
    let sizeRadios = document.getElementsByName("size");
    for (let i = 0; i < sizeRadios.length; i++) {
        document.getElementById("img" + sizeMap[sizeRadios[i].value]).className = "sizeImg";
    }

    // מחזירים את תמונות השתייה לחצי שקיפות
    let drinkBoxes = document.getElementsByName("drink");
    for (let i = 0; i < drinkBoxes.length; i++) {
        document.getElementById("img" + drinkMap[drinkBoxes[i].value]).className = "drinkImg";
    }

    // מסתירים את הפיצה ומנקים את התוספות שעליה
    let pizza = document.getElementById("finalPizza");
    pizza.src = "";
    pizza.style.display = "none";
    document.getElementById("toppingsLayer").innerHTML = "";
    // מסתירים גם את תמונות האיסוף
    document.getElementById("imgTakeaway").style.display = "none";
    document.getElementById("imgSit").style.display = "none";

    // מחזירים את הכפתור למצב מושבת ומעומעם
    checkForm();
}
