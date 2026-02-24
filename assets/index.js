const modal = document.getElementById('modalInfo');
const btnInfo = document.querySelector('.btn-secondary');
const btnJelajah = document.querySelector('.btn-jelajah');
const targetKonten = document.getElementById('konten');

window.history.scrollRestoration = "manual";

window.addEventListener('load', () => {
  window.scrollTo(0, 0);

  const loader = document.getElementById('pageLoader');

  setTimeout(() => {
    loader.classList.add('fade-out');

    setTimeout(() => {
      loader.style.display = 'none';
      document.body.classList.remove('no-scroll');
    }, 400);

  }, 1500);
});

btnInfo.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.remove('fade-out');
  modal.style.display = 'block';

  document.body.classList.add('no-scroll');
});

const closeModal = () => {
  modal.classList.add('fade-out');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);

  document.body.classList.remove('no-scroll');
};

window.onclick = (event) => {
  if (event.target == modal) {
    closeModal();
  }
};

btnJelajah.addEventListener('click', (e) => {
  e.preventDefault();
  targetKonten.scrollIntoView({ 
    behavior: 'smooth' 
  });
});

const slides = document.querySelectorAll('.slide');
let current = 0;

document.querySelector('.next').onclick = () => {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
};

document.querySelector('.prev').onclick = () => {
  slides[current].classList.remove('active');
  current = (current - 1 + slides.length) % slides.length;
  slides[current].classList.add('active');
};

fetch('./database/member-count.json').then(res => res.json()).then(data => {
    const labels = {
        generation_1: 'Kagenou Family 1',
        generation_2: 'Kagenou Family 2',
    };

    const tbody = document.querySelector('.member-table-body');

    Object.keys(data).forEach(key => {
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${labels[key]}</td>
        <td>${data[key]} member</td>
        `;

        tbody.appendChild(row);
    });
}).catch(err => console.error(err));

const btnDaftar = document.querySelector('.btn-daftar');
const modalMember = document.getElementById('modalMember');
const memberListEl = document.querySelector('.member-list');
const searchInput = document.querySelector('.member-search');
const memberTotalEl = document.querySelector('.member-total');

let allMembers = {};

btnDaftar.addEventListener('click', () => {
  modalMember.classList.remove('fade-out');
  modalMember.style.display = 'block';
  document.body.classList.add('no-scroll');

  fetch('./database/member-list.json')
    .then(res => res.json())
    .then(data => {
      allMembers = data;
      renderMembers(data);
    })
    .catch(err => console.error(err));
});

function renderMembers(data) {
  memberListEl.innerHTML = '';

  const total = Object.keys(allMembers).length;
  memberTotalEl.textContent = total;

  Object.keys(data).forEach(id => {
    const member = data[id];

    const li = document.createElement('li');
    li.innerHTML = `
      <strong class='nickname'>${normalizeText(member.nickname)}</strong>
      <span>@${member.username}</span>
    `;

    li.style.cursor = 'pointer';

    li.addEventListener('click', () => {
      openDetail(member);
    });

    memberListEl.appendChild(li);
  });
};

function resetDetail() {
  detailAvatar.src = '';
  detailName.textContent = '';
  detailUsername.textContent = '';
  detailBio.textContent = '';
  detailFollowers.textContent = '';
  detailFollowing.textContent = '';
  detailLikes.textContent = '';
  detailVideos.textContent = '';
};

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase();

  const filtered = Object.fromEntries(
    Object.entries(allMembers).filter(([id, member]) =>
      member.username.toLowerCase().includes(keyword)
    )
  );

  renderMembers(filtered);
});

window.addEventListener('click', (event) => {
  if (event.target === modalMember) {
    modalMember.classList.add('fade-out');

    setTimeout(() => {
      modalMember.style.display = 'none';
    }, 300);

    document.body.classList.remove('no-scroll');
  }
});

const modalDetail = document.getElementById('modalDetail');
const detailAvatar = document.querySelector('.detail-avatar');
const detailName = document.querySelector('.detail-name');
const detailUsername = document.querySelector('.detail-username');
const detailTitle = document.querySelector('.detail-title');
const detailBio = document.querySelector('.detail-bio');
const detailFollowers = document.querySelector('.detail-followers');
const detailFollowing = document.querySelector('.detail-following');
const detailLikes = document.querySelector('.detail-likes');
const detailVideos = document.querySelector('.detail-videos');
const detailStats = document.querySelector('.detail-stats');

async function openDetail(member) {
  resetDetail();
  const username = member.username.replace('@', '');

  showLoading();

  try {
    const response = await fetch(`https://sumi-ai-backend.vercel.app/api/stalk?user=${username}`);
    const data = await response.json();

    hideLoading();

    if (!data.success || !data.user) {
      showTemporaryMessage('Data tidak ada, username berubah :(', true);
      return;
    };

    const userData = data.user;
    const stats = data.stats;

    detailAvatar.src = userData.avatarLarger;
    detailName.textContent = normalizeText(userData.nickname);
    detailUsername.textContent = '@' + userData.uniqueId;

    detailBio.textContent = userData.signature || '';

    detailFollowers.textContent =
    `Pengikut : ${formatNumber(stats.followerCount)}`;

    detailFollowing.textContent =
    `Mengikuti : ${formatNumber(stats.followingCount)}`;

    detailLikes.textContent =
    `Total Suka : ${formatNumber(stats.heartCount)}`;

    detailVideos.textContent =
    `Total Video : ${stats.videoCount}`;

    modalDetail.classList.add('active');
    document.body.classList.add('no-scroll');
  } catch (err) {
    hideLoading();
    showTemporaryMessage('Error, server mungkin sedang down :(');
  }
}

modalDetail.addEventListener('click', (e) => {
  if (e.target === modalDetail) {
    modalDetail.classList.remove('active');
  }
});

function showTemporaryMessage(message, showFooter = false) {
  detailAvatar.style.display = 'none';
  detailUsername.style.display = 'none';
  detailTitle.style.display = 'none';
  detailBio.style.display = 'none';
  detailStats.style.display = 'none';

  detailName.innerHTML = message;

  if (showFooter) {
    detailName.innerHTML += `
      <div class='detail-footer'>
        Silakan verifikasi ulang di dalam Grup dengan Sumika.
      </div>
    `;
  }

  modalDetail.classList.add('active');
  document.body.classList.add('no-scroll');

  setTimeout(() => {
    modalDetail.classList.remove('active');
    document.body.classList.remove('no-scroll');

    setTimeout(() => {
      detailAvatar.style.display = 'block';
      detailUsername.style.display = 'block';
      detailTitle.style.display = 'block';
      detailBio.style.display = 'block';
      detailStats.style.display = 'block';

      detailName.textContent = '';
    }, 300);

  }, 2500);
}

const loadingOverlay = document.getElementById('loadingOverlay');

window.addEventListener('DOMContentLoaded', () => {
  modalDetail.classList.remove('active');
  document.body.classList.remove('no-scroll');
});

const subWrapper = document.querySelector('.subadmin-wrapper');

let isDown = false;
let startX;
let scrollLeft;

subWrapper.addEventListener('mousedown', (e) => {
  isDown = true;
  subWrapper.classList.add('dragging');
  startX = e.pageX - subWrapper.offsetLeft;
  scrollLeft = subWrapper.scrollLeft;
});

subWrapper.addEventListener('mouseleave', () => {
  isDown = false;
  subWrapper.classList.remove('dragging');
});

subWrapper.addEventListener('mouseup', () => {
  isDown = false;
  subWrapper.classList.remove('dragging');
});

subWrapper.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - subWrapper.offsetLeft;
  const walk = (x - startX) * 2; 
  subWrapper.scrollLeft = scrollLeft - walk;
});

window.addEventListener('load', () => {
  const wrapper = document.querySelector('.subadmin-wrapper');
  const cards = document.querySelectorAll('.subadmin-card');
  if (!wrapper || cards.length === 0) return;

  const n = cards.length;

  const targetIndex = (n % 2 === 1) ? Math.floor(n / 2) : (n / 2) - 1;
  const targetCard = cards[targetIndex];

  const scrollTo =
    targetCard.offsetLeft -
    (wrapper.offsetWidth / 2) +
    (targetCard.offsetWidth / 2);

  wrapper.scrollLeft = scrollTo;
});

fetch('./database/member-top.json').then(res => res.json()).then(data => {
    function sensorNumber(number){
      const num = number.replace('@s.whatsapp.net','');
      
      if(num.length <= 6) return num;

      const first = num.slice(0,2);
      const middle = num.slice(5,8);

      return `${first}xxx${middle}xxx`;
    }

    const members = Object.entries(data).map(([id, info]) => ({
      name: info.name && info.name.trim() !== '' ? info.name : sensorNumber(id),
      level: info.level,
      exp: info.exp
    }));

    members.sort((a, b) => b.level - a.level);

    const top10 = members.slice(0, 10);
    const container = document.getElementById('top-member-list');

    container.innerHTML = '';

    top10.forEach((member, index) => {
      const li = document.createElement('li');

      li.innerHTML = `
        <span class='rank'>#${index + 1}</span>
        <span class='member-name'>${member.name}</span>
        <span class='level'>Lv ${member.level}</span>
        <span class='exp'>${member.exp.toLocaleString()} EXP</span>
      `;

      container.appendChild(li);
    });
  }).catch(err => console.error(err));

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('no-scroll');
  document.documentElement.classList.add('no-scroll');
});

window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');

  setTimeout(() => {
    loader.classList.add('fade-out');

    setTimeout(() => {
      loader.style.display = 'none';
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    }, 400);

  }, 1500);
});

function showLoading() {
  loadingOverlay.style.display = 'flex';
};

function hideLoading() {
  loadingOverlay.style.display = 'none';
};

function showError(message) {
  detailAvatar.style.display = 'none';
  detailName.style.display = 'none';
  detailUsername.style.display = 'none';

  detailName.textContent = message;
  detailName.style.display = 'block';
};

function normalizeText(text) {
  return text.normalize('NFKD').replace(/[^\w\s@._-]/g, '');
};

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + ' jt';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + ' rb';
  }
  return num;
};
