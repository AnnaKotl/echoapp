import"./main-DpHhsvio.js";const r="/admin/requests",o=void 0;async function a(){try{const t=await fetch(`${r}?secret=${o}`);if(!t.ok)throw new Error("Failed to fetch admin requests");return await t.json()}catch(t){return console.error("Error fetching requests:",t),[]}}document.addEventListener("DOMContentLoaded",async()=>{if(new URLSearchParams(window.location.search).get("secret")===void 0){const s=document.querySelector(".requests-list"),n=await a();n.length>0?s.innerHTML=n.map(e=>`
          <div class="request-item">
            <p><strong>Name:</strong> ${e.name}</p>
            <p><strong>Email:</strong> ${e.email}</p>
            <p><strong>Mobile:</strong> ${e.mobileNumber||"N/A"}</p>
            <p><strong>Country:</strong> ${e.country}</p>
            <p><strong>Social Network:</strong> ${e.socialNetwork||"N/A"}</p>
            <p><strong>Service:</strong> ${e.selectedService}</p>
            <p><strong>Message:</strong> ${e.message||"No message provided"}</p>
            <p><strong>Date:</strong> ${new Date(e.createdAt).toLocaleDateString()}</p>
          </div>
        `).join(""):s.innerHTML="<p>No requests found.</p>"}else window.location.href="/"});
