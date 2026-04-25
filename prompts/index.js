export function whatAbout(city, addinterests)
{
	let prompt = ``;

	if (city && addinterests)
	{
		prompt += `Describe ${city}. Only talk about the following topics: ${addinterests}.
		Don't talk about any other topics or include any filler content. `;
	}
	else if (!addinterests && city)
	{
		prompt += `Give a general overview of the city, consisting of three interests. `;
	}
	else if (!city && addinterests)
	{
		prompt += `Pick three cities that are the best in this topic: ${addinterests}. `;
	}

	prompt += `Do not include any website links, URLs, or external references.
	Keep it concise and to the point. Don't talk like an AI.
	Don't include any filler phrases and whatnot.
	This will be used in a website that helps people choose a city to move in. `;

	prompt += `The format of the text should be the following: 
	[{ name: "CITY_NAME", interests: [{ name: "INTEREST_NAME", text: "INTEREST_TEXT" }] }], 
	where CITY_NAME must be the name of the respective city,
	INTEREST_NAME must be the name of the respective interest,
	INTEREST_TEXT must be the text of the respective itnerest.
	Add into the INTEREST_TEXT an approximative budget or salary (but not always, only when applicable).`;

	return prompt;
}

export function whatAboutAll(cities, addinterests)
{
	if (!Array.isArray(cities))
		return [whatAbout(cities, addinterests)];

	let prompts = [];

	prompts.push(`USE NEXT INSTRUCTIONS AS A TEMPLATE. APPLY TEMPLATE FOR EACH CITY AND THEIR INTERESTS:`);
	cities.forEach(city => { prompts.push(whatAbout(city, addinterests)); });

	return prompts;
}

export function whatAboutInterests(addinterests)
{
	let prompt = `Make me a tierlist nonnumbered with bulletpts of cities based on the following interests: ${addinterests}. Do not include any website links, URLs, or external references. Keep it concise and to the point. Don't talk like an AI. Don't include phraes such as "Okay, here’s a description of ${addinterests} focusing solely on work, education, and restaurants" and whatnot. Start directly with the bullet points. This will be used in a website that helps students choose a city to study in. Only talk about the following topics: ${addinterests}. Don't talk about any other topics or include any filler content. For each interest, bullet point them as a list.`;
	return prompt;
}

export function analysis(dump, addinterests)
{
	let prompt = `Describe from an analytical standpoint view, PROBING THIS TOPIC
	${addinterests} for advertisiong purposes, fake data from this json input. respond like a scraperbot like you own too much information fitting a profile based on this information: ${dump}. Don't talk about any other topics or include any filler content. make me think you are an all knowing api, that read a person and built an elaborate advertising profile for each ip and unique id. Only talk about the following topics THIS JSON DUMP: ${dump}. Don't talk about any other topics or include any filler content.
	RESPOND IN JSON FORMAT,ROBOTICALLY, ALGORITMICALLY AND CONCISELY, DO NOT RESPOND IN ANY OTHER FORMAT. RETURN MINIMUM 300 LINES of prettified JSON, but NO MORE THAN 500 LINES with no explanations, no preambles, no postambles, no commentary, no filler content. ONLY RETURN THE RAW JSON. with realistic elaborate and scary but fake profiling data based on the input.`;

	return prompt;
}
