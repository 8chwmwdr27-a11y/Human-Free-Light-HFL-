<!DOCTYPE html>
<html lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Human Free Light (HFL) - יצירת אזרחים חופשיים</title>
  <style>
    /* ---- סגנון בסיסי ---- */
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #0b0f1a, #1a2233);
      color: #e0e0e0;
      margin: 0;
      padding: 0;
    }
    header {
      text-align: center;
      padding: 50px 20px 20px 20px;
      background: linear-gradient(to right, #1a2233, #0b0f1a);
      box-shadow: 0 4px 10px rgba(0,0,0,0.7);
    }
    header h1 {
      font-size: 3em;
      color: #00f6ff;
      animation: glow 1.5s infinite alternate;
    }
    header p {
      font-size: 1.2em;
      margin-top: 10px;
    }
    @keyframes glow {
      0% { text-shadow: 0 0 5px #00f6ff; }
      100% { text-shadow: 0 0 20px #00f6ff, 0 0 30px #00f6ff; }
    }

    main {
      max-width: 900px;
      margin: 50px auto;
      padding: 20px;
      background: rgba(10, 20, 40, 0.85);
      border-radius: 15px;
      box-shadow: 0 0 30px rgba(0,255,255,0.2);
    }
    h2 {
      color: #00f6ff;
      margin-top: 40px;
      border-bottom: 2px solid #00f6ff;
      display: inline-block;
    }
    p {
      line-height: 1.6;
      font-size: 1.1em;
    }

    /* ---- כפתור ---- */
    .btn {
      background-color: #00f6ff;
      color: #0b0f1a;
      padding: 15px 25px;
      border: none;
      border-radius: 10px;
      font-size: 1.2em;
      cursor: pointer;
      margin-top: 20px;
      transition: all 0.3s ease;
      box-shadow: 0 0 10px #00f6ff;
    }
    .btn:hover {
      transform: scale(1.05);
      box-shadow: 0 0 20px #00f6ff;
    }

    /* ---- טופס ---- */
    form {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
    }
    input, select {
      padding: 12px 15px;
      margin: 10px 0;
      border-radius: 8px;
      border: none;
      font-size: 1em;
    }

    /* ---- כרטיס תעודה ומכתב ---- */
    .certificate, .letter {
      margin-top: 30px;
      padding: 30px;
      border: 3px solid #00f6ff;
      border-radius: 20px;
      text-align: center;
      background: linear-gradient(to bottom, rgba(0,255,255,0.1), rgba(0,255,255,0.05));
      animation: pulse 3s infinite;
    }
    @keyframes pulse {
      0% { box-shadow: 0 0 10px #00f6ff; }
      50% { box-shadow: 0 0 25px #00f6ff; }
      100% { box-shadow: 0 0 10px #00f6ff; }
    }
    .certificate h3, .letter h3 {
      color: #00f6ff;
      margin-bottom: 15px;
    }
    .certificate p, .letter p {
      color: #c0f0ff;
      margin: 5px 0;
    }
    .emoji {
      font-size: 1.2em;
      margin-right: 5px;
    }
  </style>
</head>
<body>

  <header>
    <h1>🌟 Human Free Light (HFL) 🌟</h1>
    <p>הזדמנות נדירה להשתחרר מהמערכת ולהפוך לאזרח חופשי ✨</p>
  </header>

  <main>
    <section>
      <h2>📜 מה זה HFL?</h2>
      <p>
        Human Free Light (HFL) היא אלטרנטיבה לממסד הקיים ומערכתו השקרית 🏛️. 
        מדובר בפלטפורמה שנוצרה כדי לאפשר לאנשים לגלות חופש אמיתי, להשתחרר מהמגבלות החברתיות והמשפטיות ולהתחיל חיים בנאמנות לארגון עצמם 🕊️.
      </p>
    </section>

    <section>
      <h2>🎯 הזדמנויות שלך</h2>
      <p>🛡️ <strong>תעודת HFL:</strong> תעודה רשמית של הארגון שמכירה בך כאזרח חופשי.</p>
      <p>📝 <strong>מסמך HFL:</strong> מכתב התפטרות מהמערכת שמפוטר אותך ממחויבות לממסד.</p>
      <p>💬 <strong>מערכת HFL:</strong> גישה למערכת התקשורת והליווי של הארגון.</p>
    </section>

    <section>
      <h2>🖋️ הצטרפות</h2>
      <form id="hflForm">
        <input type="text" id="fullName" placeholder="שם מלא" required>
        <input type="email" id="email" placeholder="כתובת מייל" required>
        <button type="submit" class="btn">צור תעודת HFL</button>
      </form>

      <div id="certificateContainer"></div>
    </section>
  </main>

  <script>
    const form = document.getElementById('hflForm');
    const certContainer = document.getElementById('certificateContainer');

    function generateCertificate(name) {
      const uniqueNumber = 'HFL-' + Date.now();
      return `
        <div class="certificate">
          <h3>🛡️ תעודת HFL רשמית 🛡️</h3>
          <p>שם: ${name}</p>
          <p>מספר מזהה: ${uniqueNumber}</p>
          <p>חותמת הארגון: <strong>HFL</strong></p>
          <p>תוקף: נצחי ♾️</p>
        </div>
        <div class="letter">
          <h3>📝 מכתב HFL 📝</h3>
          <p>שלום ${name},</p>
          <p>באמצעות מכתב זה, אתה מפוטר מכל מחויבות לממסד הקיים ✂️.</p>
          <p>ברוך הבא למערכת HFL 💬 – מקום שבו חירותך היא עיקר העדיפות 🕊️.</p>
          <p>המשך חיים מלאי חופש ובחירה אישית 🌟</p>
        </div>
      `;
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('fullName').value;
      certContainer.innerHTML = generateCertificate(name);
      form.reset();
    });
  </script>

</body>
</html>
