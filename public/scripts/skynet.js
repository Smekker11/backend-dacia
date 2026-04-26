import { LoadPage } from './index.js';
import { FetchSkynet } from './fetching.js';
import { TypeWord } from './typing.js';

const loginForm = { submitted: false };

const lfSubmitButton = document.getElementById("lf-submit");

lfSubmitButton.addEventListener("click", () => { lfSubmit(); });

function lfSubmit()
{
	const usernameInput = document.getElementById('lf-username');
	const usernameField = usernameInput.closest('.lf-field');

	if (usernameInput.value.trim() !== 'admin')
	{
		usernameField.classList.add('lf-has-error');
		return;
	}

	usernameField.classList.remove('lf-has-error');
	loginForm.submitted = true;

	document.dispatchEvent(new CustomEvent('lf:login',
	{
		detail: { username: usernameInput.value.trim() }
	}));

	const btn = document.getElementById('lf-submit');
	btn.classList.add('lf-loading');
	btn.disabled = true;

	setTimeout(() =>
	{
		btn.classList.remove('lf-loading');
		btn.disabled = false;

		LoadPage("skynet");

	}, 1800);
}

document.getElementById('lf-username').addEventListener('input', function() {
	this.closest('.lf-field').classList.remove('lf-has-error');
});

document.getElementById('lf-username').addEventListener('keydown', function(e) {
	if (e.key === 'Enter') document.getElementById('lf-password').focus();
});

document.getElementById('lf-password').addEventListener('keydown', function(e) {
	if (e.key === 'Enter') lfSubmit();
});

let skynetBody = { "param": [] };

let skynetInput = document.getElementById("skynet-params");

skynetInput.addEventListener("keydown", (event) =>
{
	if (event.key === 'Enter')
	{
		const param = skynetInput.value.trim();

		if (param)
			skynetBody.param.push(param);

		(async () =>
		{
			const fetchedSkynet = await FetchSkynet(skynetBody);
			
			if (!fetchedSkynet.error)
				VisualizeSkynet(skynetBody, fetchedSkynet);
		})();
	}
});

const VisualizeSkynet = (body, result) =>
{
	let acBody = document.getElementById("ac-body");
	acBody.innerText = JSON.stringify(body);

	let acResult = document.getElementById("ac-result");
	acResult.innerText = JSON.stringify(result);
	/*
	const text = JSON.stringify(result);
	TypeWord(acResult, text, 100);
	*/
};
