const regionUrl = "https://api.dataforsyningen.dk/regioner"
const kommuneUrl = "https://api.dataforsyningen.dk/kommuner"
const regionEndPoint = "http://localhost:8080/saveRegions"
const kommuneEndPoint = "http://localhost:8080/saveKommuner"
const kommuneFromDatabase = "http://localhost:8080/kommuner"
const deleteKommune = "http://localhost:8080/deleteKommune"
const kommuneInsert = "http://localhost:8080/insertKommune"
const dd = document.getElementById('regionDD')
const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
const btn3 = document.getElementById('btn3')
const btn4 = document.getElementById('btn4')
const table = document.getElementById('kommuner')

let regionList = []
let kommuneList = []
let regionBody = {}
let kommuneBody = {}


function fetchSomething(URL) {
    return fetch(URL).then(response => response.json())
}

async function regionActionFetch() {

    regionList = await fetchSomething(regionUrl)

    console.log(regionList)

    regionList.forEach(item => {
        addToDropdown(item)
    })

}

async function kommuneActionFetch() {

    kommuneList = await fetchSomething(kommuneUrl)
    console.log(kommuneList)
}

async function kommuneFromDatabaseFetch() {
    kommuneList = await fetchSomething(kommuneFromDatabase)
    console.log(kommuneList)
}


function addToDropdown(unit) {
    const option = document.createElement('option')
    option.textContent = unit.navn
    option.region = unit
    dd.appendChild(option)
}

const postReqRegion = {
    method: "POST",
    headers: {
        "content-type": "application/json"
    },
    body: regionBody
}
const postReqKommune = {
    method: "POST",
    headers: {
        "content-type": "application/json"
    },
    body: kommuneBody
}

async function kommunePostReq(kommune) {
    kommuneBody = JSON.stringify(kommune)
    console.log(kommuneBody)
    postReqKommune.body = kommuneBody
    await fetch(kommuneEndPoint, postReqKommune).catch((error) => console.log(error));
}


async function regionPostReq(region) {
    regionBody = JSON.stringify(region)
    console.log(regionBody)
    postReqRegion.body = regionBody
    await fetch(regionEndPoint, postReqRegion).catch((error) => console.log(error));

}

function kommuneActionReq() {
    if (kommuneList) {
        kommuneList.forEach(kommunePostReq)
        console.log(kommuneList)
    }
}

function regionActionReq() {
    if (regionList) {
        console.log(regionList)
        regionList.forEach(regionPostReq)

    } else {
        console.log("eeeeh virker ikke")
    }
}


function saveKommuner() {
    kommuneActionFetch()
    kommuneActionReq()
}

function addKommunerToTable() {

    if (kommuneList.length > 0) {
        kommuneList.forEach(addTotable)
    } else {
        kommuneList = kommuneFromDatabaseFetch()
        console.log(kommuneList)
        kommuneList.forEach(addTotable)
    }

}

function addTotable(kommune) {
    const row = table.insertRow()
    const cell1 = row.insertCell(0)
    const cell2 = row.insertCell(1)
    const cell3 = row.insertCell(2)
    const cell4 = row.insertCell(3)
    const cell5 = row.insertCell(4)
    const cell6 = row.insertCell(5)

    const link = document.createElement('a')
    link.href = kommune.href
    link.textContent = kommune.href
    link.target = "_blank"
    const img = document.createElement('img')
    img.src = kommune.photoSrc
    img.height = 50
    img.width = 50

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = "Delete"
    deleteBtn.addEventListener('click', () => {
        row.remove()
        deleteKommuneFromDatabase(kommune)

    })
    cell6.appendChild(deleteBtn)

    cell1.textContent = kommune.kode
    cell2.textContent = kommune.navn
    cell3.appendChild(link)
    cell4.textContent = kommune.region.kode
    cell5.appendChild(img)
}

async function deleteKommuneFromDatabase(kommune) {

    const deleteReq = {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(kommune)
    }
    console.log(deleteReq)
    await fetch(deleteKommune + "/" + kommune.kode, deleteReq).catch((error) => console.log(error));
}

async function insertKommuneFromApi() {
    const kommune = await getFromApi()
    const insertReq = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(kommune)
    }
    kommuneBody = JSON.stringify(kommune)
    console.log(kommuneBody)
    postReqKommune.body = kommuneBody

    await fetch(kommuneInsert, insertReq).catch((error) => console.log(error));
}

async function getFromApi() {
    return await fetchSomething(kommuneUrl + "/" + input.value)

}


const input = document.getElementById('inputKommune')
const btn5 = document.getElementById('btn5')


btn1.addEventListener('click', regionActionFetch)
btn2.addEventListener('click', regionActionReq)
btn3.addEventListener('click', saveKommuner)
btn4.addEventListener('click', addKommunerToTable)
btn5.addEventListener('click', insertKommuneFromApi)