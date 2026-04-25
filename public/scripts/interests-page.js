import { LoadPage } from "./index.js";
import { DeleteSearches, ParseSearches } from "./search.js";
import { FetchCities } from "./fetching.js";
import { VisualizeData } from "./results.js";

const buttonSearch = document.getElementById("search-interests-icon");

buttonSearch.addEventListener("click", () =>
{
	LoadPage("results");

	(async () =>
	{
		const fetchedCities = await FetchCities(ParseSearches());
		VisualizeData(fetchedCities);
	})();

	DeleteSearches();
});
