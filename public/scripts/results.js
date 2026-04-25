export const VisualizeData = (parsedData) =>
{
	console.log("LOGGING PARSED DATA", parsedData);

	let resultsPage = document.getElementById("results");

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

			let infoName = document.createElement("h2");
			infoName.classList.add("info-name");
			infoName.textContent = interestName;
			infoDetails.appendChild(infoName);

			let infoText = document.createElement("h2");
			infoText.classList.add("info-text");
			infoText.textContent = interestText;
			infoDetails.appendChild(infoText);
		}
	}
};
