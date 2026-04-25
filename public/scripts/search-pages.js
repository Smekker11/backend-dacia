import { LoadPage } from "./index.js";
import { DeleteSearches, ParseSearches } from "./search.js";
import { FetchCities } from "./fetching.js";
import { VisualizeData } from "./results.js";

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
