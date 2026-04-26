export const TypeWord = (element, text, delay = 100) =>
{
	const words = text.split(' ');
	let i = 0;
	element.textContent = '';

	const interval = setInterval(() =>
	{
		if (i < words.length)
		{
			element.textContent += (i === 0 ? '' : ' ') + words[i];
			i++;
		}
		else clearInterval(interval);
	}, delay);
}
