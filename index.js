/**
 * @typedef Party
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} date
 * @property {string} location
 */

// === Constants ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2506-Lokkee";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// === State ===
let parties = [];
let selectedParty;

async function getParties() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    parties = result.data;
    // console.log(parties);
  } catch (error) {
    console.error(error);
  }
  render();
}

async function getParty(id) {
  try {
    const response = await fetch(API + "/" + id);
    const result = await response.json();
    selectedParty = result.data;
    // console.log(selectedParty);
  } catch (error) {
    console.log(error);
  }
  render();
}

// === Components ===
function PartyListItem(party) {
  const $list = document.createElement("li");
  $list.innerHTML = `
        <a href="selected">${party.name}</a>
    `;
  $list.addEventListener("click", (e) => {
    e.preventDefault();

    getParty(party.id);
  });
  return $list;
}

function PartyList() {
  const $container = document.createElement("ul");
  $container.classList.add("partylist");

  const $names = parties.map(PartyListItem);
  $container.replaceChildren(...$names);

  return $container;
}

function PartyDetails() {
  if (!selectedParty) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party to learn more.";
    return $p;
  } else {
    const $p = document.createElement("section");
    $p.classList.add("party");
    const date = selectedParty.date.slice(0, 10);
    $p.innerHTML = `
        <h3>${selectedParty.name} #${selectedParty.id}</h3>
        <time>${date}</time>
        <address>${selectedParty.location}</address>
        <p>${selectedParty.description}</p>
    `;
    return $p;
  }
}

// === Render ===
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
        <section>
            <h2>Upcoming Parties</h2>
            <PartyList></PartyList>
        </section>
        <section id="selected">
            <h2>Party Details</h2>
            <PartyDetails></PartyDetails>
        </section>
    </main>
  `;
  $app.querySelector("PartyList").replaceWith(PartyList());
  $app.querySelector("PartyDetails").replaceWith(PartyDetails());
}

async function init() {
  await getParties();
  render();
}

init();
