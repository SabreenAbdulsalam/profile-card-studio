// متغيرات لتحديد ما إذا كان المستخدم يختار رمزاً رسمياً أو صورة مرفوعة
let isCustomPhoto = false;
let selectedIconClass = "bi-person-fill";
let customPhotoUrl = "";

// 1. اختيار رمز رسمي من الشريط العلوي
function pickFormalIcon(iconClass, btnElement) {
    isCustomPhoto = false;
    selectedIconClass = iconClass;

    // إظهار الأيقونة الرسمية وإخفاء الصورة في دائرة المعاينة
    const iconPreview = document.getElementById('iconPreview');
    const imagePreview = document.getElementById('imagePreview');

    iconPreview.className = `bi ${iconClass}`;
    iconPreview.classList.remove('hidden');
    imagePreview.classList.add('hidden');

    // تحديث التحديد على الزر المختار
    document.querySelectorAll('.formal-avatar').forEach(btn => {
        btn.classList.remove('selected');
    });
    btnElement.classList.add('selected');
}

// 2. رفع صورة رسمية خاصة من الجهاز (اختياري)
function uploadCustomPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        isCustomPhoto = true;
        customPhotoUrl = URL.createObjectURL(file);

        const iconPreview = document.getElementById('iconPreview');
        const imagePreview = document.getElementById('imagePreview');

        imagePreview.src = customPhotoUrl;
        imagePreview.classList.remove('hidden');
        iconPreview.classList.add('hidden');

        // إلغاء التحديد عن الرموز الرسمية الجاهزة
        document.querySelectorAll('.formal-avatar').forEach(btn => {
            btn.classList.remove('selected');
        });
    }
}

// 3. إنشاء البطاقة الرسمية والتحقق من الشروط
function buildModernCard() {
    let name = document.getElementById('userName').value.trim();
    let ageValue = document.getElementById('userAge').value.trim();
    let job = document.getElementById('userJob').value.trim();
    let ageError = document.getElementById('ageError');

    ageError.classList.add('hidden');

    if (name === "" || ageValue === "" || job === "") {
        alert("يرجى إدخال الاسم والعمر والمسمى الوظيفي لإصدار البطاقة.");
        return;
    }

    // شرط العمر: منع الصفر والأرقام السالبة
    let age = Number(ageValue);
    if (age <= 0) {
        ageError.innerText = "تنبيه: يجب أن يكون العمر أكبر من الصفر!";
        ageError.classList.remove('hidden');
        document.getElementById('userAge').focus();
        return;
    }

    // تحديث وإظهار رسالة الترحيب الرسمية بالأسفل
    const welcomeBanner = document.getElementById('welcomeBanner');
    const welcomeText = document.getElementById('welcomeText');
    welcomeBanner.classList.remove('hidden');

    welcomeText.innerHTML = `
        <h3>مرحباً بك، ${name}</h3>
        <p>تم إصدار بطاقتك التعريفية بنجاح؛ الاسم: <strong>${name}</strong> | العمر: <strong>${age} عاماً</strong> | المسمى الوظيفي: <strong>${job}</strong>.</p>
    `;

    // تحديد محتوى الدائرة في البطاقة (صورة مرفوعة أو رمز رسمي)
    let avatarContent = isCustomPhoto
        ? `<img src="${customPhotoUrl}" alt="${name}">`
        : `<i class="bi ${selectedIconClass}"></i>`;

    // إنشاء البطاقة الزجاجية وإضافتها للشبكة
    const cardsGrid = document.getElementById('cardsGrid');
    const newCard = document.createElement('div');
    newCard.className = 'glass-user-card';

    newCard.innerHTML = `
        <button class="remove-btn" onclick="this.parentElement.remove()" title="حذف البطاقة">
            <i class="bi bi-trash3"></i>
        </button>
        <div class="card-avatar-box">
            ${avatarContent}
        </div>
        <h4>${name}</h4>
        <span class="card-job-pill"><i class="bi bi-briefcase"></i> ${job}</span>
        <p class="card-age-tag"><i class="bi bi-calendar2-check"></i> العمر: ${age} سنة</p>
    `;

    cardsGrid.prepend(newCard);
}

// 4. زر الزائد (+) لتفريغ الحقول وإضافة بطاقة جديدة
function resetForNewCard() {
    document.getElementById('userName').value = "";
    document.getElementById('userAge').value = "";
    document.getElementById('userJob').value = "";
    document.getElementById('ageError').classList.add('hidden');
    document.getElementById('fileInput').value = "";

    // إعادة اختيار الرمز الرسمي الأول افتراضياً
    const firstFormalBtn = document.querySelector('.formal-avatar');
    if (firstFormalBtn) {
        pickFormalIcon('bi-person-fill', firstFormalBtn);
    }

    document.getElementById('userName').focus();
}