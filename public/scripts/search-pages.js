import { LoadPage } from "./index.js";
import { DeleteSearches, ParseSearches } from "./search.js";
import { FetchCities } from "./fetching.js";
import { TypeWord } from "./typing.js";

const buttonSearchCity = document.getElementById("search-cities-icon");

buttonSearchCity.addEventListener("click", () =>
{
	LoadPage("pick-interests");
});

const buttonSearchInterest = document.getElementById("search-interests-icon");

buttonSearchInterest.addEventListener("click", () =>
{
	LoadPage("results");

	let resultsPage = document.getElementById("results-container");
	resultsPage.innerHTML = "";

	(async () =>
	{
		const fetchedCities = await FetchCities(ParseSearches());
		VisualizeData(fetchedCities);
	})();

	DeleteSearches();
});

export const VisualizeData = (parsedData) =>
{
	console.log("LOGGING PARSED DATA", parsedData);

	let resultsPage = document.getElementById("results-container");
	resultsPage.innerHTML = "";

	for (let i = 0; i < parsedData.length; i++)
	{
		const city = parsedData[i];
		const cityName = city.name;
		const interests = city.interests;

		let result = document.createElement("div");
		result.classList.add("result");
		resultsPage.appendChild(result);

		let info = document.createElement("div");
		info.classList.add("info");
		result.appendChild(info);

		let infoName = document.createElement("h2");
		infoName.classList.add("info-name");
		infoName.textContent = cityName;
		info.appendChild(infoName);

		let infoDetails = document.createElement("div");
		infoDetails.classList.add("info-holder");
		info.appendChild(infoDetails);

		for (let j = 0; j < interests.length; j++)
		{
			const interest = interests[j];
			const interestName = interest.name;
			const interestText = interest.text;

			let infoInt = document.createElement("h2");
			infoInt.classList.add("info-int");
			infoInt.textContent = interestName;
			infoDetails.appendChild(infoInt);

			let infoText = document.createElement("p");
			infoText.classList.add("info-text");
			infoDetails.appendChild(infoText);
		
			TypeWord(infoText, interestText, 100);
		}
	}
};

export const VisualizeBest = (unkData, interest) =>
{
	let resultsTitle = document.getElementById("results-title");
	resultsTitle.innerText = `Best in ${interest}`;

	let resultsPage = document.getElementById("best-container");
	resultsPage.innerHTML = "";

	if (!unkData)
	{
		DeleteSearches();

		LoadPage("home");
		return;
	}

	let parsedData = unkData.data ? unkData.data : (unkData.tier_list ? unkData.tier_list : unkData);

	console.log("LOGGING PARSED DATA", parsedData);

	for (let i = 0; i < parsedData.length; i++)
	{
		const city = parsedData[i];
		const cityName = city.name;
		const interests = city.interests;

		let result = document.createElement("div");
		result.classList.add("result");
		resultsPage.appendChild(result);

		let info = document.createElement("div");
		info.classList.add("info");
		result.appendChild(info);

		let infoName = document.createElement("h2");
		infoName.classList.add("info-name");
		infoName.textContent = cityName;
		info.appendChild(infoName);

		let infoDetails = document.createElement("div");
		infoDetails.classList.add("info-holder");
		info.appendChild(infoDetails);

		const interest = interests[0];
		const interestName = interest.name;
		const interestText = interest.text;

		let infoInt = document.createElement("h2");
		infoInt.classList.add("info-int");
		infoInt.textContent = interestName;
		infoDetails.appendChild(infoInt);

		let infoText = document.createElement("p");
		infoText.classList.add("info-text");
		infoDetails.appendChild(infoText);
	
		TypeWord(infoText, interestText, 100);
	}
};
