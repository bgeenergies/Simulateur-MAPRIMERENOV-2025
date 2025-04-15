const tranches = {
  idf: {
    1: [23768, 28933, 40404],
    2: [34884, 42463, 59394],
    3: [41893, 51000, 71060],
    4: [48914, 59549, 83637],
    5: [55961, 68123, 95758],
    6: [62999, 76691, 107880],
    7: [70037, 85259, 120002],
    8: [77075, 93827, 132124],
    9: [84113, 102395, 144246],
    10: [91151, 110963, 156368],
    11: [98189, 119531, 168490],
    12: [105227, 128099, 180612],
    13: [112265, 136667, 192734],
    14: [119303, 145235, 204856],
    15: [126341, 153803, 216978]
  },
  province: {
    1: [17173, 22015, 30844],
    2: [25115, 32197, 45340],
    3: [30206, 38719, 54592],
    4: [35285, 45234, 63844],
    5: [40388, 51775, 73098],
    6: [45482, 58300, 82352],
    7: [50576, 64825, 91606],
    8: [55670, 71350, 100860],
    9: [60764, 77875, 110114],
    10: [65858, 84400, 119368],
    11: [70952, 90925, 128622],
    12: [76046, 97450, 137876],
    13: [81140, 103975, 147130],
    14: [86234, 110500, 156384],
    15: [91328, 117025, 165638]
  }
};

window.onload = () => {
  const foyer = document.getElementById('foyer');
  for (let i = 1; i <= 15; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = `${i} personne${i > 1 ? 's' : ''}`;
    foyer.appendChild(opt);
  }
};

function checkPassword() {
  const pass = document.getElementById('password').value;
  if (pass === 'benoit1997') {
    document.getElementById('passwordScreen').style.display = 'none';
    document.getElementById('simulator').style.display = 'block';
  } else {
    alert('Mot de passe incorrect');
  }
}

function updateTranches() {
  const region = document.getElementById('region').value;
  const foyer = parseInt(document.getElementById('foyer').value);
  const selectRevenu = document.getElementById('revenu');
  selectRevenu.innerHTML = '<option value="">-- Choisir --</option>';

  if (region && foyer && tranches[region] && tranches[region][foyer]) {
    const [bleu, jaune, violet] = tranches[region][foyer];
    selectRevenu.innerHTML += `
      <option value="bleu">Inférieur ou égal à ${bleu.toLocaleString('fr-FR')} €</option>
      <option value="jaune">Entre ${(bleu+1).toLocaleString('fr-FR')} € et ${jaune.toLocaleString('fr-FR')} €</option>
      <option value="violet">Entre ${(jaune+1).toLocaleString('fr-FR')} € et ${violet.toLocaleString('fr-FR')} €</option>
      <option value="rose">Supérieur ou égal à ${(violet+1).toLocaleString('fr-FR')} €</option>
    `;
  }
}

function estimerProfil() {
  const profil = document.getElementById('revenu').value;
  const result = document.getElementById('resultat');

  const couleurs = {
    bleu: ['#007bff', "Bonne nouvelle ! Vous pouvez prétendre jusqu'à 65 000 € d'aides pour vos travaux de rénovation énergétique et pour l'accompagnement (+aides locales le cas échéant)."],
    jaune: ['#ffc107', "Bonne nouvelle ! Vous pouvez prétendre jusqu'à 50 600 € d'aides pour vos travaux de rénovation énergétique et pour l'accompagnement (+aides locales le cas échéant)."],
    violet: ['#6f42c1', "Bonne nouvelle ! Vous pouvez prétendre jusqu'à 42 800 € d'aides pour vos travaux de rénovation énergétique et pour l'accompagnement (+aides locales le cas échéant)."],
    rose: ['#e83e8c', "Bonne nouvelle ! Vous pouvez prétendre jusqu'à 21 400 € d'aides pour vos travaux de rénovation énergétique et pour l'accompagnement (+aides locales le cas échéant)."]
  };

  if (profil && couleurs[profil]) {
    const [color, message] = couleurs[profil];
    result.style.backgroundColor = color;
    result.innerText = message;
  } else {
    result.innerText = '';
  }
}
