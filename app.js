function showSection(section) {
    const bmiSection = document.getElementById('bmiSection');
    const calorieSection = document.getElementById('calorieSection');
    const buttonContainer = document.querySelector('.button-container');
    const calculatorPrompt = document.getElementById('calculatorPrompt');

    bmiSection.style.display = 'none';
    calorieSection.style.display = 'none';
    buttonContainer.style.display = 'none';
    calculatorPrompt.style.display = 'none';

    if (section === 'bmi') {
        bmiSection.style.display = 'flex';
    } else if (section === 'calorie') {
        calorieSection.style.display = 'flex';
    }
}

function showHome() {
    const bmiSection = document.getElementById('bmiSection');
    const calorieSection = document.getElementById('calorieSection');
    const buttonContainer = document.querySelector('.button-container');
    const calculatorPrompt = document.getElementById('calculatorPrompt');

    bmiSection.style.display = 'none';
    calorieSection.style.display = 'none';
    buttonContainer.style.display = 'flex'; 
    calculatorPrompt.style.display = 'block'; 

    const genderButtons = document.querySelectorAll('.gender-button');
    genderButtons.forEach(button => {
        button.classList.remove('selected'); 
    });
    
    selectedGender = ''; 

    [bmiForm, calorieForm].forEach(form => form.reset());
    document.getElementById('result').innerHTML = '';
    document.getElementById('calorieResult').innerHTML = '';
}

let selectedGender = ''; 

function selectGender(gender) {
    selectedGender = gender;
    const genderButtons = document.querySelectorAll('.gender-button');
    
    genderButtons.forEach(button => {
        if (button.id === `${gender}Button`) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected'); 
        }
    });
}

// คำนวณค่า BMI
const bmiForm = document.getElementById('bmiForm');
bmiForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100;
    const bmi = weight / (height * height); 

    const categories = [
        { limit: 18.5, category: "น้ำหนักน้อย", suggestion: "คุณควรเพิ่มน้ำหนัก หรือปรึกษาแพทย์หรือนักโภชนาการเพื่อขอคำแนะนำ" },
        { limit: 23, category: "น้ำหนักปกติ", suggestion: "คุณมีน้ำหนักตัวที่เหมาะสมแล้ว รักษาวิถีชีวิตสุขภาพดีนี้ไว้ต่อไป!" },
        { limit: 25, category: "น้ำหนักเกิน", suggestion: "คุณอาจพิจารณาในการควบคุมน้ำหนัก หรือ ออกกำลังกายเพื่อสุขภาพ" },
        { limit: 30, category: "อ้วนระดับ 1", suggestion: "คุณควรควบคุม น้ำหนัก ออกกำลังกายสม่ำเสมอ และปรึกษาแพทย์หรือนักโภชนาการ" },
        { limit: Infinity, category: "อ้วนระดับ 2", suggestion: "แนะนำให้ปรึกษาแพทย์หรือนักโภชนาการเพื่อวางแผนการดูแลสุขภาพที่เหมาะสม" }
    ];

    const { category, suggestion } = categories.find(({ limit }) => bmi < limit);

    document.getElementById('result').innerHTML = `
        <div>ค่า BMI ของคุณคือ: ${bmi.toFixed(2)} (${category}).</div>
        <div>${suggestion}</div>
    `;
});

// คำนวณแคลอรี่
const calorieForm = document.getElementById('calorieForm');
calorieForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('calorieWeight').value);
    const height = parseFloat(document.getElementById('calorieHeight').value);
    const activity = parseFloat(document.getElementById('activity').value);

    let bmr;

    // คำนวณค่า BMR ตามเพศ
    if (selectedGender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5; // สูตร BMR สำหรับชาย
    } else if (selectedGender === 'female') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161; // สูตร BMR สำหรับหญิง
    } else {
        document.getElementById('calorieResult').innerHTML = 'กรุณาเลือกเพศก่อนคำนวณ!';
        return; 
    }
    
    const calorieIntake = bmr * activity;

    document.getElementById('calorieResult').innerHTML = `คุณต้องการแคลอรี่ประมาณ ${calorieIntake.toFixed(2)} แคลอรี่ต่อวัน`;
});
