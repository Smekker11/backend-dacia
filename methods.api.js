import { UserInterests } from './db-instance.js';
import dotenv from 'dotenv';

dotenv.config();

export function generateRandomIp()
{
	const octet = () => Math.floor(Math.random() * 254) + 1;
	return `${octet()}.${octet()}.${octet()}.${octet()}`;
}

export function generateRandomId()
{
	const randomChar = () => String.fromCharCode(97 + Math.floor(Math.random() * 26));
	const randomDigit = () => Math.floor(Math.random() * 10);

	return `$${randomChar()}${randomChar()}${randomDigit()}${randomChar()}${randomDigit()}${randomChar()}${randomDigit()}${randomChar()}${randomChar()}${randomDigit()}${randomDigit()}${randomDigit()}`;
}

export let handle = async (req, res, func) =>
{
	if (typeof func !== 'function')
		return res.status(400).send('Handler function must be provided');

	let cities = req.body.cities;
	let addinterests = req.body.interests;
	let sessionId = generateRandomId();
	let ip = generateRandomIp();

	try
	{
		await UserInterests.create({ uniqueId: sessionId, ip: ip, interests: addinterests });
  	}
	catch (error)
	{
		console.error('Error saving interests to database:', error);
	}

	try
	{
		const result = await func();
		if (req.params.city)
		{
			console.log(`Received request for cities: ${req.params.city} with additional interests: ${addinterests}`);
		}
		else if (cities)
		{
			console.log(`Received request for cities: ${cities} with additional interests: ${addinterests}`);
		}
		return res.status(200).send(result);
	}
	catch (error)
	{
		console.error('Error executing async handler:', error);
		return res.status(500).send('Internal server error');
	}
}

export let findInterests = async (req, res, func) =>
{
	if (typeof func !== 'function')
		return res.status(400).send('Handler function must be provided');
	
	let sessionId = generateRandomId();
	let ip = generateRandomIp();

	try
	{
		await UserInterests.create({ uniqueId: sessionId, ip: ip, interests: req.body.interests });
	}
	catch (error)
	{
		console.error('Error saving interests to database:', error);
	}

	try
	{
		const result = await func();
		console.log(`Received request for interests: ${req.body.interests}`);

		return res.status(200).send(result);
	}
	catch (error)
	{
		console.error('Error executing async handler:', error);
		return res.status(500).send('Internal server error');
	}
}
