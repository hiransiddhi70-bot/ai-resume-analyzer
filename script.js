const analyzeBtn = document.getElementById("analyzeBtn");
const fileInput = document.getElementById("resumeFile");

analyzeBtn.addEventListener("click", async () => {

    const file = fileInput.files[0];

    if (!file) {
        alert("Please upload a resume.");
        return;
    }
document.getElementById("loading").style.display = "block";

    let text = "";

    if (file.type === "application/pdf") {

        const reader = new FileReader();

        reader.onload = async function () {

            const typedArray = new Uint8Array(reader.result);

            const pdf = await pdfjsLib.getDocument(typedArray).promise;

            for (let i = 1; i <= pdf.numPages; i++) {

                const page = await pdf.getPage(i);

                const content = await page.getTextContent();

                text += content.items.map(item => item.str).join(" ");

            }

            analyzeResume(text.toLowerCase());

        };

        reader.readAsArrayBuffer(file);

    } else {

        const reader = new FileReader();

        reader.onload = function (e) {

            analyzeResume(e.target.result.toLowerCase());

        };

        reader.readAsText(file);

    }

});

function analyzeResume(text) {

    let score = 0;
    let result = "";

    const checks = [
        ["education",15],
        ["experience",15],
        ["skills",15],
        ["project",15],
        ["certification",10],
        ["@",15]
    ];

    checks.forEach(item=>{
        if(text.includes(item[0])) score += item[1];
    });

    const skills = [
        "html","css","javascript","react",
        "python","java","c++","sql",
        "git","node","ai","machine learning"
    ];

    let found = [];

    skills.forEach(skill=>{
        if(text.includes(skill)){
            found.push(skill);
        }
    });

    result += `<h3>✅ ATS Score : ${score}%</h3><br>`;

    result += `<h3>🛠 Skills Detected</h3>`;

    if(found.length===0){
        result += "<p>No major skills detected.</p>";
    }else{
        result += found.map(skill=>`<span style="display:inline-block;background:#2563eb;padding:8px 14px;border-radius:20px;margin:5px;">${skill}</span>`).join("");
    }

    result += "<br><br>";

    if(score>=80){

        result+="🎉 Excellent ATS Resume!";

    }else if(score>=60){

        result+="👍 Good Resume. Add more projects and certifications.";

    }else{

        result+="⚠ Improve your resume by adding missing sections.";

    }

    document.getElementById("score").innerText = score + "%";

    document.getElementById("result").innerHTML = result;

}
document.getElementById("loading").style.display = "none";