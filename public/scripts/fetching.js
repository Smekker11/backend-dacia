export const baseURL = window.location.origin;

export const config = await fetch("./../config.json").then(r => r.json());

export const FetchSkynet = () => fetch(`${baseURL}/api/skynetapi`,
{
	method: "POST",
	headers:
	{
		"Content-Type": "application/json",
		"Authorization": `Bearer ${config.API_TOKEN}`
	},
	body: JSON.stringify({ param: ["Culture"] })
})
	.then(response =>
	{
		response.json()
	})
	.then(data =>
	{
		console.warn("Response:", data);
		return data.json();
	})
	.catch(error =>
	{
		console.error("Error:", error);
	});

export const FetchCities = (parsedData) => 
fetch(`${window.location.origin}/api/cities`,
{
	method: "POST",
	headers:
	{
		"Content-Type": "application/json"
	},
	body: JSON.stringify(parsedData)
})
	.then(response =>
	{
		if (!response.ok)
			throw new Error(`HTTP error: ${response.status}`);
		return response.json();
	})
	.then(data =>
	{
		console.warn("Response:", data);
		return data;
	})
	.catch(error =>
	{
		console.error("Error:", error);
	});
