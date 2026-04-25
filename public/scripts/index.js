const hiddenPageClass = "hidden";

const pages = document.getElementsByTagName("main").item(0).getElementsByClassName("page");

export const LoadPage = (pageId) =>
{
	let pageElem = document.getElementById(pageId);

	if (pageElem === null)
	{
		console.error("No page has ID \"" + pageId + "\". Cannot load.");
		return;
	}

	if (!pageElem.classList.contains(hiddenPageClass))
		return;

	for (let i = 0; i < pages.length; i++)
	{
		const currPageId = pages.item(i).id;

		if (currPageId === pageId)
		{
			pageElem.classList.remove(hiddenPageClass);
			LoadBackground(currPageId);
		}
		else
			UnloadPage(currPageId);
	}
};

export const UnloadPage = (pageId) =>
{
	let pageElem = document.getElementById(pageId);

	if (pageElem === null)
	{
		console.error("No page has ID \"" + pageId + "\". Cannot unload.");
		return;
	}

	if (pageElem.classList.contains(hiddenPageClass))
		return;

	pageElem.classList.add(hiddenPageClass);
};

const backgroundGlobeWhole = "./backgrounds/globe-whole.mp4";
const backgroundGlobeSide = "./backgrounds/globe-side.mp4";

const LoadBackground = (pageId) =>
{
	let background = document.getElementById("background");
	let source = background.getElementsByTagName("source").item(0);

	let attrSrc = document.createAttribute("src");
	switch (pageId)
	{
		case "home":
			attrSrc.value = backgroundGlobeWhole;
			break;
		/*
		case "results":
			attrSrc.value = ???;
			break;
		*/
		default:
			attrSrc.value = backgroundGlobeSide;
			break;
	}

	source.attributes.setNamedItem(attrSrc);
	background.load();
};

LoadPage("home");
