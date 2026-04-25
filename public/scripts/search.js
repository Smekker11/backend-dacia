export let searchCities = [];
export let searchInterests = [];

let cardsHolderCities = document.getElementById("pick-cities").getElementsByClassName("cards-holder").item(0);
let cardsHolderInterests = document.getElementById("pick-interests").getElementsByClassName("cards-holder").item(0);

export const ParseSearches = () =>
{
	let obj =
	{
		"cities": [],
		"interests": [],
	};

	searchCities.forEach(element => { obj.cities.push(element.name); });
	searchInterests.forEach(element => { obj.interests.push(element.name); });

	return obj;
};

export const DeleteSearches = () =>
{
	for (let i = 0; i < searchCities.length; i++)
		RemoveCitySearch(searchCities[i].name);
	searchInterests.forEach(element => { RemoveInterestSearch(element.name); });
}

const AddCitySearch = (cityName) =>
{
	if (searchCities.indexOf(cityName) !== -1)
		return;

	let card = { name: cityName, obj: null };

	let elem = document.createElement("div");
	elem.classList.add("card");
	cardsHolderCities.appendChild(elem);

	let name = document.createElement("h2");
	name.textContent = cityName;
	elem.appendChild(name);

	let br = document.createElement("br");
	elem.appendChild(br);

	let more = document.createElement("h2");
	more.textContent = "Click to learn more";
	elem.appendChild(more);

	let remove = document.createElement("button");
	remove.classList.add("button");
	remove.innerHTML = "<h2>Remove search</h2>";
	remove.addEventListener("click", () =>
	{
		RemoveCitySearch(cityName);
	});
	elem.appendChild(remove);

	card.obj = elem;

	searchCities.push(card);

	console.warn("ADDED " + cityName, searchCities);
};

const AddInterestSearch = (interestName) =>
{
	if (searchInterests.indexOf(interestName) !== -1)
		return;

	let card = { name: interestName, obj: null };

	let elem = document.createElement("div");
	elem.classList.add("card");
	cardsHolderInterests.appendChild(elem);

	let name = document.createElement("h2");
	elem.appendChild(name);
	name.textContent = interestName;

	let br = document.createElement("br");
	elem.appendChild(br);
	elem.appendChild(br);
	elem.appendChild(br);

	let remove = document.createElement("button");
	elem.appendChild(remove);
	remove.classList.add("button");
	remove.innerHTML = "<h2>Remove search</h2>";
	remove.addEventListener("click", () =>
	{
		RemoveInterestSearch(interestName);
	});

	card.obj = elem;

	searchInterests.push(card);

	console.warn("ADDED " + interestName, searchInterests);
};

const RemoveCitySearch = (cityName) =>
{
	let index = -1;

	for (let i = 0; i < searchCities.length; i++)
		if (searchCities[i].name === cityName)
		{
			index = i;
			break;
		}

	if (index === -1)
		return;

	cardsHolderCities.removeChild(searchCities[index].obj);
	searchCities.splice(index, 1);

	console.warn("REMOVED " + cityName, searchCities);
};

const RemoveInterestSearch = (interestName) =>
{
	let index = -1;

	for (let i = 0; i < searchInterests.length; i++)
		if (searchInterests[i].name === interestName)
		{
			index = i;
			break;
		}

	if (index === -1)
		return;

	cardsHolderInterests.removeChild(searchInterests[index].obj);
	searchInterests.splice(index, 1);

	console.warn("REMOVED " + interestName, searchInterests);
};

const inputCity = document.getElementById("search-cities");
const inputInterest = document.getElementById("search-interests");

inputCity.addEventListener('keydown', (event) =>
{
	if (event.key !== 'Enter')
		return;

	event.preventDefault();

	const search = inputCity.value.trim();
	if (search)
		AddCitySearch(search);

	inputCity.value = "";
});

inputInterest.addEventListener('keydown', (event) =>
{
	if (event.key !== 'Enter')
		return;

	event.preventDefault();

	const search = inputInterest.value.trim();
	if (search)
		AddInterestSearch(search);

	inputInterest.value = "";
});
