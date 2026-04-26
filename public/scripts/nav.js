import { LoadPage } from "./index.js";
import { DeleteSearches, DeleteResults } from "./search.js";
import { VisualizeBest } from "./search-pages.js";
import { FetchInterests } from "./fetching.js";

const buttonNavHome = document.getElementById("nav-home");

buttonNavHome.addEventListener("click", () =>
{
	DeleteSearches();
	DeleteResults();

	LoadPage("home");
});

const buttonNavBestEdu = document.getElementById("nav-edu");

buttonNavBestEdu.addEventListener("click", () =>
{
	DeleteSearches();
	DeleteResults();

	LoadPage("interest-best-cities");

	document.getElementById("best-container").innerHTML = "";

	(async () =>
	{
		const fetchedInterests = await FetchInterests({ "interests": ["Education"] });
		VisualizeBest(fetchedInterests, "Education");
	})();
});

const buttonNavBestWork = document.getElementById("nav-work");

buttonNavBestWork.addEventListener("click", () =>
{
	DeleteSearches();
	DeleteResults();

	LoadPage("interest-best-cities");

	document.getElementById("best-container").innerHTML = "";

	(async () =>
	{
		const fetchedInterests = await FetchInterests({ "interests": ["Work"] });
		VisualizeBest(fetchedInterests, "Work");
	})();
});

const buttonNavBestTravel = document.getElementById("nav-travel");

buttonNavBestTravel.addEventListener("click", () =>
{
	DeleteSearches();
	DeleteResults();

	LoadPage("interest-best-cities");

	document.getElementById("best-container").innerHTML = "";

	(async () =>
	{
		const fetchedInterests = await FetchInterests({ "interests": ["Travel"] });
		VisualizeBest(fetchedInterests, "Travel");
	})();
});

const buttonNavAccount = document.getElementById("nav-account");

buttonNavAccount.addEventListener("click", () =>
{
	DeleteSearches();
	DeleteResults();

	LoadPage("account");
});

const buttonNavInfo = document.getElementById("nav-info");

buttonNavInfo.addEventListener("click", () =>
{
	DeleteSearches();
	DeleteResults();

	LoadPage("info");
});

const buttonNavApi = document.getElementById("nav-api");

buttonNavApi.addEventListener("click", () =>
{
	DeleteSearches();
	DeleteResults();

	LoadPage("api");
});
