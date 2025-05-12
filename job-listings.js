// job-listings.js

document.addEventListener('DOMContentLoaded', () => {
    fetch('/jobs')
        .then(response => response.json())
        .then(jobs => {
            const listings = document.getElementById('job-listings');
            listings.innerHTML = '';

            jobs.forEach(job => {
                const jobEl = document.createElement('div');
                jobEl.className = 'job-card';
                jobEl.innerHTML = `
                    <h3>${job.title}</h3>
                    <p>${job.description}</p>
                    <button onclick="applyToJob('${job.title}')">Apply</button>
                `;
                listings.appendChild(jobEl);
            });
        })
        .catch(error => {
            console.error('Error fetching jobs:', error);
        });
});

function applyToJob(title) {
    fetch('/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    })
    .then(response => {
        if (response.ok) {
            alert(`Applied to "${title}" successfully.`);
        } else {
            alert('Error applying for job.');
        }
    });
}
