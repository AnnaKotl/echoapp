import { uploadIcon } from '/js/api/adminApi.js';

const initAdminUpload = () => {
    const uploadForm = document.getElementById("uploadForm");
    const fileInput = document.getElementById("iconFile");
    const statusDiv = document.getElementById("uploadStatus");
    const previewDiv = document.querySelector(".admin-preview-icons");
    const previewWrapp = document.querySelector(".admin-preview-wrapp");

    previewWrapp.style.display = "none";

    let previewImages = [];

    fileInput.addEventListener("change", () => {
        previewDiv.innerHTML = '';
        previewImages = [];

        if (fileInput.files.length > 0) {
            previewWrapp.style.display = "flex";
            setTimeout(() => previewWrapp.classList.add("show"), 100);
        } else {
            previewWrapp.classList.remove("show");
            setTimeout(() => previewWrapp.style.display = "none", 300);
        }

        for (const file of fileInput.files) {
            const img = document.createElement("img");
            img.classList.add("admin-icon-preview");
            img.alt = file.name;

            const reader = new FileReader();
            reader.onload = (e) => img.src = e.target.result;
            reader.readAsDataURL(file);

            previewDiv.appendChild(img);
            previewImages.push({ file, img });
        }
    });

    uploadForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!fileInput.files.length) {
            statusDiv.textContent = "⚠️ Please select at least one file.";
            return;
        }

        statusDiv.innerHTML = '';

        for (const { file, img } of previewImages) {
            const fileStatus = document.createElement('p');
            fileStatus.textContent = `⏳ Uploading ${file.name}...`;
            statusDiv.appendChild(fileStatus);

            try {
                const imageUrl = await uploadIcon(file);
                img.src = imageUrl;
                fileStatus.textContent = `✅ ${file.name} uploaded successfully!`;
            } catch (error) {
                fileStatus.textContent = `❌ Failed to upload ${file.name}: ${error.message}`;
            }
        }

        fileInput.value = "";
    });

};

export { initAdminUpload };