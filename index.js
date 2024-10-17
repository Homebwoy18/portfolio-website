document.addEventListener('DOMContentLoaded', () => {
    const gbInput = document.getElementById('input');
    const packageList = document.getElementById('package-list');
    const priceList = document.getElementById('price-list');
    const totalPriceElem = document.getElementById('total-price');
    const button = document.getElementById('btn');
    const greeting = document.getElementById('greeting');
    const copyMessage = document.getElementById('copy-message');
    const inputOutputDiv = document.getElementById('input-output');
    const dateElem = document.getElementById('date');
    const Normal = document.getElementById('Normal');
    const Express = document.getElementById('Express');

    button.addEventListener('click', handleCopy);

    

    gbInput.addEventListener('input',function handleCalculate() {


        
        if(Normal.checked){
      
        const inputValue = gbInput.value;
        const gbValues = inputValue.split('+');
        const totalPrice = calculateTotal(gbValues);

        packageList.innerHTML = gbValues.map(gb => `<li class="list-group-item">${gb.trim()}GB</li>`).join('');
        priceList.innerHTML = gbValues.map(gb => `<li class="list-group-item">${prices[gb.trim().replace('GB', '')] || 0} cedis</li>`).join('');
        totalPriceElem.innerHTML = `Total Price: ${totalPrice} cedis`;

    
        calculateTotal(gbArray);

}

if (Normal.checked && Express.checked) {

    write('check only one *').style.Color = 'red';
    
} else {
    
}
    
    });



    //Express condition


    gbInput.addEventListener('input',function handleCalculateExpress() {
  
        //gbInput.addEventListener('input', handleCalculate);

        
        if(Express.checked){
      
        const inputValue = gbInput.value;
        const gbValues = inputValue.split('+');
        const totalPrice = calculateTotalExpress(gbValues);

        packageList.innerHTML = gbValues.map(gb => `<li class="list-group-item">${gb.trim()}GB</li>`).join('');
        priceList.innerHTML = gbValues.map(gb => `<li class="list-group-item">${Eprices[gb.trim().replace('GB', '')] || 0} cedis</li>`).join('');
        totalPriceElem.innerHTML = `Total Price: ${totalPrice} cedis`;

    
        calculateTotalExpress(gbArray);

}
    
    });




    displayGreeting();
    displayDate();
    setTimeout(() => {
        inputOutputDiv.classList.add('visible');
        setTimeout(() => {
            document.body.style.overflow = 'auto'; // Restore scrollbar after animation
        }, 1000);
    }, 100);


  


    function calculateTotal(gbArray) {
        let totalPrice = 0;
        gbArray.forEach(gb => {
            const packagePrice = prices[gb.trim().replace('GB', '')];
            if (packagePrice) {
                totalPrice += packagePrice;
            } else {
                console.error(`Package not found: ${gb.trim()}GB`);
            }
        });
        return totalPrice;
    }

///hanling express prices here ........



function calculateTotalExpress(gbArray) {
    let totalPrice = 0;
    gbArray.forEach(gb => {
        const packagePrice = Eprices[gb.trim().replace('GB', '')];
        if (packagePrice) {
            totalPrice += packagePrice;
        } else {
            console.error(`Package not found: ${gb.trim()}GB`);
        }
    });
    return totalPrice;
}



    

    function handleCopy() {
        const packageItems = Array.from(packageList.children).map(item => item.innerText.trim());
        const priceItems = Array.from(priceList.children).map(item => item.innerText.trim());
        const totalPriceText = totalPriceElem.innerText;
        const currentDate = dateElem.innerText;

        let outputText = `${currentDate}\n\nPackages\t\tPrices\n`;
        packageItems.forEach((pkg, index) => {
            outputText += `${pkg}\t\t${priceItems[index]}\n`;
        });
        outputText += `\n${totalPriceText}\n\nMake payment to: Fawuzan Masahudu [0543650011]`;

        navigator.clipboard.writeText(outputText).then(() => {
            copyMessage.style.display = 'block';
            setTimeout(() => copyMessage.style.display = 'none', 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }

    function displayGreeting() {
        const currentHour = new Date().getHours();
        let greetingText = '';

        if (currentHour < 12) {
            greetingText = 'Good Morning!';
        } else if (currentHour < 18) {
            greetingText = 'Good Afternoon!';
        } else {
            greetingText = 'Good Evening!';
        }

        greeting.innerText = greetingText;
    }

    function displayDate() {
        const today = new Date();
        const dateString = today.toDateString();
        dateElem.innerText = `Date: ${dateString}`;
    }

    const prices = {
        '1': 8,
        '2': 13,
        '3': 20,
        '4': 25,
        '5': 30,
        '6': 37,
        '7': 40,
        '8': 46,
        '9': 44,
        '10': 50,
        '11': 55,
        '12': 65.50,
        '15': 75,
        '20': 93,
        '25': 128,
        '30': 145,
        '35': 164,
        '40': 185,
        '45': 215,
        '50': 215,
        '80': 370,
        '100': 430,
    };


    const Eprices = {
        '1': 9,
        '2': 15,
        '3': 22,
        '4': 25,
        '5': 31,
        '6': 38,
        '7': 41,
        '8': 46,
        '9': 49,
        '10': 51,
        '11': 55,
        '12': 65.50,
        '15': 83,
        '20': 99,
        '25': 120,
        '30': 147,
        '35': 158,
        '40': 183,
        '45': 206,
        '50': 220,
        '80': 345,
        '100': 450,
    };
});
