class Lord{
    constructor(name,type){
        this.name = name;
        this.type = type;
    }
}

class Race{
    constructor(id,name){
        this.name = name;
        this.id = id;
        this.lords = [];
    }
    addLord(name){
        this.lords.push(name);
    }
    deleteLord(id){
        let index = this.lords.indexOf(name);
        this.lords.splice(index,1);
    }
}
let races =[];
let raceId = 0;

onclick('new-race', () => {
    races.push(new Race(raceId++, getValue('new-race-name')));
    drawDOM();
});

function onclick(id, action){
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id){
    return document.getElementById(id).value;
}

function drawDOM(){
    let raceDiv = document.getElementById('races');
    clearElement(raceDiv);
    for(race of races){
        let table = createRaceTable(race);
        let title = document.createElement('h2');
        title.innerHTML = race.name;
        title.appendChild(createDeleteRaceButton(race));
        raceDiv.appendChild(title);
        raceDiv.appendChild(table);
        for(lord of race.lords){
            createLordRow(race,table,lord);
        }
    }
}

function createLordRow(race,table,lord){
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = lord.name;
    row.insertCell(1).innerHTML = lord.type;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(race,lord));
}

function createDeleteRowButton(race,lord){
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger btn-xs';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = race.lords.indexOf(lord);
        race.lords.splice(index,1);
        drawDOM();
    };
    return btn;
}

function createDeleteRaceButton(race){
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger btn-sm';
    btn.innerHTML = "Delete Race";
    btn.onclick = () => {
        let index = races.indexOf(race);
        races.splice(index,1);
        drawDOM();
    };
    return btn;
}

function createRaceTable(race){
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-hover table-bordered');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let typeColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    typeColumn.innerHTML = 'Type';
    row.appendChild(nameColumn);
    row.appendChild(typeColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let typeTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${race.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let typeInput = document.createElement('input');
    typeInput.setAttribute('id', `type-input-${race.id}`);
    typeInput.setAttribute('type', 'text');
    typeInput.setAttribute('class', 'form-control');
    let newMemberButton = createNewLordButton(race);
    nameTh.appendChild(nameInput);
    typeTh.appendChild(typeInput);
    createTh.appendChild(newMemberButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(typeTh);
    formRow.appendChild(createTh);
    return table;
}

function createNewLordButton(race){
    let btn = document.createElement('button');
    btn.className = 'btn btn-info';
    btn.innerText = "Create";
    btn.onclick = () => {
        race.lords.push(new Lord(getValue(`name-input-${race.id}`),getValue(`type-input-${race.id}`)));
        drawDOM();
    }
    return btn;
}

function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}


