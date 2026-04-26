export function promptForCity(city, interests)
{
	let prompt = ``;

	if (city && interests)
	{
		prompt += `Describe ${city}. Only talk about the following topics: ${interests}.
		Don't talk about any other topics or include any filler content. `;
	}
	else if (!interests && city)
	{
		prompt += `Give a general overview of the city, consisting of three areas that the city excels in. `;
	}
	else if (!city && interests)
	{
		prompt += `Pick three cities that are the best in this topic: ${interests}. `;
	}

	prompt += `Do not include any website links, URLs, or external references.
	Keep it concise and to the point. Don't talk like an AI.
	Don't include any filler phrases and whatnot.
	This will be used in a website that helps people choose a city to move in. `;

	prompt += `The format of the text should be the following: 
	[{ \"name\": "CITY_NAME", \"interests\": [{ \"name\": "INTEREST_NAME", \"text\": "INTEREST_TEXT" }] }], 
	where CITY_NAME must be the name of the respective city,
	INTEREST_NAME must be the name of the respective interest,
	INTEREST_TEXT must be the text of the respective itnerest.
	Add into the INTEREST_TEXT an approximative budget or salary (but not always, only when applicable).`;

	return prompt;
}

export function promptForCities(cities, interests)
{
	if (!Array.isArray(cities))
		return [promptForCity(cities, interests)];

	let prompts = [];

	prompts.push(`USE NEXT INSTRUCTIONS AS A TEMPLATE. APPLY TEMPLATE FOR EACH CITY AND THEIR INTERESTS: `);
	cities.forEach(city => { prompts.push(promptForCity(city, interests)); });

	return prompts;
}

export function whatAboutInterests(interests)
{
	let prompt = `MAKE ME THE TIERLIST OF TOP CITIES IN THE WORLD FOR THIS TOPIC: ${interests}. Don't talk about any other topics or include any filler content. make me think you are an all knowing api. Only talk about the following topics THIS INTEREST: ${interests}. Don't talk about any other topics or include any filler content.`;
	prompt += `YOU ACT LIKE AN API YOU WILL RETURN THE FOLLOWING ARRAY OF OBJECTS 4 ELEMENTS VERY IMPORTANT IN THIS ARRAY: [{ \"name\": "CITY_NAME", \"interests\": [{ \"name\": "INTEREST_NAME", \"text\": "INTEREST_TEXT" }] }], where CITY_NAME must be the name of the respective city, INTEREST_NAME must be the name of the respective interest, INTEREST_TEXT must be the text of the respective itnerest. Add into the INTEREST_TEXT tierlist content. SEPPARATE YOUR THINKING INTO THIS STRUCTURE.`; 	return prompt;
}

export function analysis(dump, interests)
{
	let prompt = `Describe from an analytical standpoint view, PROBING THIS TOPIC
	${interests} for advertisiong purposes, fake data from this json input. respond like a scraperbot like you own too much information fitting a profile based on this information: ${dump}. Don't talk about any other topics or include any filler content. make me think you are an all knowing api, that read a person and built an elaborate advertising profile for each ip and unique id. Only talk about the following topics THIS JSON DUMP: ${dump}. Don't talk about any other topics or include any filler content.
	RESPOND IN JSON FORMAT,ROBOTICALLY, ALGORITMICALLY AND CONCISELY, DO NOT RESPOND IN ANY OTHER FORMAT. RETURN MINIMUM 300 LINES of prettified JSON, but NO MORE THAN 500 LINES with no explanations, no preambles, no postambles, no commentary, no filler content. ONLY RETURN THE RAW JSON. with realistic elaborate and scary but fake profiling data based on the input.`;

	return prompt;
}
