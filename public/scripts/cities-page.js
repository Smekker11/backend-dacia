import { LoadPage } from "./index.js";

const buttonSearch = document.getElementById("search-cities-icon");

buttonSearch.addEventListener("click", () =>
{
	LoadPage("pick-interests");
});
