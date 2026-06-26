document.getElementById("analyzeBtn").addEventListener("click", () => {

    const file = document.getElementById("resumeFile").files[0];

    if (!file) {
        alert("Please upload your resume first.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {

        const text = e.target.result.toLowerCase();

        let score = 0;
        let suggestions = [];

        // Email
        if (text.includes("@")) {
            score += 15;
        } else {
            suggestions.push("❌ Add a professional email address.");
        }

        // Phone
        if (/\d{10}/.test(text)) {
            score += 15;
        } else {
            suggestions.push("❌ Add your phone number.");
        }

        // Education
        if (text.includes("education")) {
            score += 15;
        } else {
            suggestions.push("❌ Education section missing.");
        }

        // Skills
        if (text.includes("skills")) {
            score += 15;
        } else {
            suggestions.push("❌ Skills section missing.");
        }

        // Experience
        if (text.includes("experience")) {
            score += 15;
        } else {
            suggestions.push("❌ Experience section missing.");
        }

        // Projects
        if (text.includes("project")) {
            score += 15;
        } else {
            suggestions.push("❌ Projects section missing.");
        }

        // Certifications
        if (text.includes("certification")) {
            score += 10;
        } else {
            suggestions.push("💡 Add certifications if you have any.");
        }

        document.getElementById("score").innerText = score + "%";

        let html = "";

        if (suggestions.length === 0) {
            html = "🎉 Excellent Resume! ATS Friendly.";
        } else {
            html = "<h3>Suggestions</h3><br>";
            suggestions.forEach(item => {
                html += `<p>${item}</p>`;
            });
        }

        document.getElementById("result").innerHTML = html;

    };

    reader.readAsText(file);

});