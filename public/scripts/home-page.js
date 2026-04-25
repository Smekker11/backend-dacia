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
// 	async function send() {
//   const cities = ["cluj napoca", "alba iulia", "burkina faso"];
//   const interests = ["work"];

//   const response = await fetch('/cities', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ cities, interests })
//   });

//   const data = await response.json();

//   const dataText = data.candidates[0].content.parts[0].text;

//   const cards = JSON.parse(dataText);

//   document.getElementById('result').innerText = "";

//   for (let i = 0; i < cards.length; i++)
//   {
//     const card = cards[i];

//     const cityName = card.name;
//     document.getElementById('result').innerText += "\\n" + cityName + "\\n";

//     const interests = card.interests;
//     for (let j = 0; j < interests.length; j++)
//     {
//       const interestName = interests[j].name;
//       const interestText = interests[j].text;

//       document.getElementById('result').innerText += interestName + "\\n" + interestText + "\\n";
//     }
//   }

//   console.warn("RECEIVED ANSWER", dataText);
// }

// 	send();
	
	LoadPage("pick-cities");
});
