import { LoadPage } from "./index.js";
import { DeleteSearches } from "./search.js";
import { VisualizeData } from "./search-pages.js";
import { FetchInterests } from "./fetching.js";

const buttonNavHome = document.getElementById("nav-home");

buttonNavHome.addEventListener("click", () =>
{
	LoadPage("home");

	DeleteSearches();
});

const buttonNavBestEdu = document.getElementById("nav-edu");

buttonNavBestEdu.addEventListener("click", () =>
{
	LoadPage("interest-best-cities");

	(async () =>
	{
		const fetchedInterests = await FetchInterests({ "interests": ["Education"] });
		VisualizeData(fetchedInterests);
	})();

	DeleteSearches();
});

const buttonNavBestWork = document.getElementById("nav-work");

buttonNavBestWork.addEventListener("click", () =>
{
	LoadPage("interest-best-cities");

	(async () =>
	{
		const fetchedInterests = await FetchInterests({ "interests": ["Work"] });
		VisualizeData(fetchedInterests);
	})();

	DeleteSearches();
});

const buttonNavBestTravel = document.getElementById("nav-travel");

buttonNavBestTravel.addEventListener("click", () =>
{
	LoadPage("interest-best-cities");

	(async () =>
	{
		const fetchedInterests = await FetchInterests({ "interests": ["Travel"] });
		VisualizeData(fetchedInterests);
	})();

	DeleteSearches();
});

const buttonNavAccount = document.getElementById("nav-account");

buttonNavAccount.addEventListener("click", () =>
{
	LoadPage("account");

	DeleteSearches();
});

const buttonNavInfo = document.getElementById("nav-info");

buttonNavInfo.addEventListener("click", () =>
{
	LoadPage("info");

	DeleteSearches();
});

const buttonNavApi = document.getElementById("nav-api");

buttonNavApi.addEventListener("click", () =>
{
	LoadPage("api");

	DeleteSearches();
});
