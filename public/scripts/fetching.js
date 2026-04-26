export const config = await fetch("./../config.json").then(r => r.json());

export const FetchSkynet = (skynetBody) =>
fetch(`${window.location.origin}/api/skynetapi`,
{
	method: "POST",
	headers:
	{
		"Content-Type": "application/json",
		"authorization": `Bearer ${config.API_TOKEN}`
	},
	body: JSON.stringify(skynetBody)
})
	.then(response =>
	{
		return response.json()
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

export const FetchInterests = (parsedData) =>
fetch(`${window.location.origin}/api/interests`,
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
