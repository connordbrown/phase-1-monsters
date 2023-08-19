document.addEventListener("DOMContentLoaded", () => {
    

    // set current page
    let currentPage = 1;
    // populate page upon loading
    fillPage(currentPage);


    // fill the page with a list of 50 monsters, given pageNum
    function fillPage(pageNum) {
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
            .then(response => response.json())
            .then(data => {
                const monsterContainer = document.querySelector('#monster-container');
                const monsterList = document.createElement('ul');
                monsterContainer.appendChild(monsterList);

                data.forEach(monster => {
                    const specs = document.createElement('li');
                        const {name, age, /*id,*/ description} = monster;

                        const monsterName = document.createElement('li');
                        monsterName.textContent = `Name: ${name}`;
                        const monsterAge = document.createElement('li');
                        monsterAge.textContent = `Age: ${age}`;
                        //const monsterId = document.createElement('li');
                        //monsterId.textContent = `ID: ${id}`;
                        const monsterDescr = document.createElement('li');
                        monsterDescr.textContent = `Description: ${description}`;
                    specs.appendChild(monsterName);
                    specs.appendChild(monsterAge);
                    //specs.appendChild(monsterId);
                    specs.appendChild(monsterDescr);
                    monsterList.appendChild(specs);

                    const lineBreak = document.createElement('br');
                    monsterList.appendChild(lineBreak);
                });
            })
        }


    // clear the monster list from the page
    function clearPage() {
        const monsterContainer = document.querySelector('#monster-container');
        monsterContainer.textContent = "";
    }


    // using fBtn, clear the page and display the next page
    fBtn = document.querySelector('#forward');
    fBtn.addEventListener('click', () => {
        clearPage();
        currentPage += 1;
        fillPage(currentPage);  
    })


    // using bBtn, clear the page and display the previous page
    bBtn = document.querySelector('#back');
    bBtn.addEventListener('click', () => {
        clearPage();
        currentPage -= 1;

        if (currentPage <= 0) {
            currentPage = 1;
            fillPage(1);
        } else {
             fillPage(currentPage);
          }
    })


    // create a form for adding new monsters to API
    const createMonster = document.querySelector('#create-monster');
    const h3 = document.createElement('h3');
        h3.textContent = 'Create a monster:'
    createMonster.appendChild(h3);

    const form = document.createElement('form');
        form.action = "http://localhost:3000/monsters";
        form.id = 'monster-form';
        form.method = 'POST';

            const name = document.createElement('input');
                name.type = 'text';
                name.name = "name";
                name.placeholder = 'monster name'
            const age = document.createElement('input');
                age.type = 'text';
                age.name = 'age';
                age.placeholder = 'monster age'
            const descr= document.createElement('input');
                descr.type = 'text';
                descr.name = 'description'
                descr.placeholder = 'monster description'
            const submit = document.createElement('input');
                submit.type = 'submit';
                submit.value = 'Submit';
        form.appendChild(name);
        form.appendChild(age);
        form.appendChild(descr);
        form.appendChild(submit); 
    createMonster.appendChild(form);


    // submit post request through form
    document.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            'name': e.target[0].value,
            'age': parseFloat(e.target[1].value),
            'description': e.target[2].value
        };
        const configObj = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        };
        fetch("http://localhost:3000/monsters", configObj)
            .then(response => response.json())
            .catch(error => alert(error.message))
        e.target.reset();
    });

})