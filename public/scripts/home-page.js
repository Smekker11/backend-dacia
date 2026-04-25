import { LoadPage } from "./index.js";

const messages =
[
	"Look for a job that suits you",
	"You do not find the happy life - you make it!",
	"Study in the city you dream of!",
	"An investment in knowledge pays the best interest!",
	"Check out local restaurants",
	"Interested in the history of another city?",
	"Ready to check out a new city?",
];

const GenerateMessage = (prevMessageId) =>
{
	let messageId = 0;

	do messageId = Math.floor(Math.random() * messages.length);
	while (messageId === prevMessageId);

	let messageElem = document.getElementById("home-message");
	messageElem.innerText = messages[messageId];

	setTimeout(() => GenerateMessage(messageId), 5000);
};

GenerateMessage(0);

const buttonGotoPickCities = document.getElementById("goto-pick-cities");

buttonGotoPickCities.addEventListener("click", () =>
{
	LoadPage("pick-cities");
});
