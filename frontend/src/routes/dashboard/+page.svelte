<script>
	import { onMount } from 'svelte';

    let workerList;

	async function loadDashboard(token) {
		const response = await fetch(`http://localhost/api/workers`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		});
		let data = await response.json();
		if (!response.ok) {
			if (response.status.toString()[0] === '4') {
				throw new Error(`${data.error}`);
			} else if (response.status.toString()[0] === '5') {
				console.error('Server error:', data.error);
				return
			}
		}
		console.log(data);
        data.forEach(worker => {
			const li = document.createElement('li');
			li.textContent = `${worker.personalInfo.firstName} ${worker.personalInfo.lastName}`;
			workerList.appendChild(li);
		});
	}

	onMount(async () => {
		// Additional setup can be done here if needed
		console.log('Dashboard component mounted');
		let token = sessionStorage.getItem('token');
		if (!token) {
			console.log('No token found, redirecting to login page.');
			sessionStorage.clear();
			window.location.href = '/';
			return;
		}
		try {
			const user = JSON.parse(sessionStorage.getItem('user'));
			await loadDashboard(token);
		} catch (error) {
			console.error(error);
			// window.location.href = '/';
		}
	});
</script>

<h1>Dashboard</h1>
<ul bind:this={workerList}></ul>