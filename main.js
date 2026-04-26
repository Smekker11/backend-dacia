import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import * as prompts from './prompts/index.js';
import { fileURLToPath } from 'url';
import { generate } from './gemini.js';
import { UserInterests,sequelize } from './db-instance.js';
import { handle, findInterests, generateRandomId, generateRandomIp } from './methods.api.js';
import { error } from 'console';

dotenv.config();

const PORT = process.env.PORT;
const VALID_API_TOKEN = process.env.API_TOKEN;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.post('/api/skynetapi', async (req, res) =>
{
	const apiToken = req.headers['authorization'];

	console.log(apiToken);
	console.log(VALID_API_TOKEN);

	if (!apiToken || apiToken !== `Bearer ${VALID_API_TOKEN}`)
		return res.status(401).json({ error: 'Unauthorized' });

	const param = req.body.param;
	try
	{
		const results = await UserInterests.findAll(
		{
			where: sequelize.literal(`
			EXISTS (
			SELECT 1
			FROM json_each(interests)
			WHERE json_each.value IN (${param.map(i => `'${i}'`).join(",")})
			)`)
		});

		let geminiProfile = await generate(prompts.analysis(results, param));
		console.log(geminiProfile);

		try
        {
            const rawText = geminiProfile.candidates[0].content.parts[0].text;

            try
            {
                res.json(JSON.parse(rawText));
            }
            catch (err)
            {
                /*
                console.log(result);
                console.log(rawText);
                */

                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
        catch (err)
        {
            console.warn('Gemini is in high demand');
            res.status(500).json({ error: "Gemini is in high demand" });
        }
	}
	catch (error)
	{
		console.error('Error querying database:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
});

app.post('/api/city/:city', async (req, res) =>
{
	await handle(req, res, async () =>
	{
		let cityGenerate = await generate(prompts.promptForCity(req.params.city, req.body.interests));
		console.log(cityGenerate);
	
		return cityGenerate;
	});
});

app.post('/api/cities', async (req, res) =>
{
	try
	{
		await UserInterests.create(
		{
			uniqueId: generateRandomId(),
			ip: generateRandomIp(),
			interests: req.body.interests
		});

		const result = await generate(prompts.promptForCities(req.body.cities, req.body.interests));
		console.log(result);

		try
		{
			const rawText = result.candidates[0].content.parts[0].text;
			
		try
		{
			res.json(JSON.parse(rawText));
		}
		catch (err)
		{
			/*
			console.log(result);
			console.log(rawText);
			*/

			console.error(err);
			res.status(500).json({ error: "Internal Server Error" });
		}
		}
		catch (err)
		{
			console.warn('Gemini is in high demand');
			res.status(500).json({ error: "Gemini is in high demand" });
		}
	}
	catch (err)
	{
		console.error(err);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

app.post('/api/interests', async (req, res) =>
{
	try
	{
		await UserInterests.create(
		{
			uniqueId: generateRandomId(),
			ip: generateRandomIp(),
			interests: req.body.interests
		});
	}
	catch (err)
	{
		console.error('Error saving to database:', err);
		return res.status(500).json({ error: 'Internal Server Error' });
	}

	let intGenerate = await generate(prompts.whatAboutInterests(req.body.interests));
	console.log(intGenerate);
    try{
            const rawText = intGenerate.candidates[0].content.parts[0].text;

            try
            {
                res.json(JSON.parse(rawText));
            }
            catch (err)
            {
                /*
                console.log(result);
                console.log(rawText);
                */

                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
        catch (err)
        {
            console.warn('Gemini is in high demand');
            res.status(500).json({ error: "Gemini is in high demand" });
        }
});

const server = app.listen(PORT, () => console.log(`API listening to http://localhost:${PORT}`));

server.on('error', (err) => {
	console.error('Server error:', err);
	process.exit(1);
});

process.on('uncaughtException', (err) => {
	console.error('Uncaught exception:', err);
	process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
	console.error('Unhandled rejection at:', promise, 'reason:', reason);
	process.exit(1);
});
