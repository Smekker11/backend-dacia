import { LoadPage } from "./index.js";
import { DeleteSearches } from "./search.js";

const buttonNavHome = document.getElementById("nav-home");

buttonNavHome.addEventListener("click", () =>
{
	LoadPage("home");

	DeleteSearches();
});

const buttonNavBestEdu = document.getElementById("nav-edu");

buttonNavBestEdu.addEventListener("click", () =>
{
	// LoadPage("interest-best-cities");

	DeleteSearches();
});

const buttonNavBestWork = document.getElementById("nav-work");

buttonNavBestWork.addEventListener("click", () =>
{
	// LoadPage("interest-best-cities");

	DeleteSearches();
});

const buttonNavBestTravel = document.getElementById("nav-travel");

buttonNavBestTravel.addEventListener("click", () =>
{
	// LoadPage("interest-best-cities");

	DeleteSearches();
});

const buttonNavInfo = document.getElementById("nav-info");

buttonNavInfo.addEventListener("click", () =>
{
	LoadPage("info");

	DeleteSearches();
});

