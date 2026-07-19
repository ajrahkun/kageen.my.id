const infoModalEl = document.getElementById('modalInfo');
const infoTriggerBtn = document.querySelector('.btn-secondary');
const exploreBtn = document.querySelector('.btn-explore');
const contentSectionEl = document.getElementById('explore');

window.history.scrollRestoration = 'manual';

window.addEventListener('contextmenu', (e) => e.preventDefault());
window.addEventListener('keydown', (e) => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
        return false;
    }
});

window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('no-scroll');
    document.documentElement.classList.add('no-scroll');
    detailModalEl.classList.remove('active');
    videoDetailModalEl.classList.remove('active');
});

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    const pageLoaderEl = document.getElementById('pageLoader');

    setTimeout(() => {
        pageLoaderEl.classList.add('fade-out');

        setTimeout(() => {
        pageLoaderEl.style.display = 'none';
        document.body.classList.remove('no-scroll');
        document.documentElement.classList.remove('no-scroll');
        }, 400);
    }, 1500);
});

infoTriggerBtn.addEventListener('click', (event) => {
    event.preventDefault();
    infoModalEl.classList.remove('fade-out');
    infoModalEl.style.display = 'block';
    document.body.classList.add('no-scroll');
});

const handleCloseInfoModal = () => {
    infoModalEl.classList.add('fade-out');
    setTimeout(() => {
        infoModalEl.style.display = 'none';
    }, 300);
    document.body.classList.remove('no-scroll');
};

window.onclick = (event) => {
    if (event.target === infoModalEl) {
        handleCloseInfoModal();
    }
};

exploreBtn.addEventListener('click', (event) => {
    event.preventDefault();
    contentSectionEl.scrollIntoView({ behavior: 'smooth' });
});

const carouselSlides = document.querySelectorAll('.slide');
let currentSlideIndex = 0;

document.querySelector('.next').onclick = () => {
    carouselSlides[currentSlideIndex].classList.remove('active');
    currentSlideIndex = (currentSlideIndex + 1) % carouselSlides.length;
    carouselSlides[currentSlideIndex].classList.add('active');
};

document.querySelector('.prev').onclick = () => {
    carouselSlides[currentSlideIndex].classList.remove('active');
    currentSlideIndex = (currentSlideIndex - 1 + carouselSlides.length) % carouselSlides.length;
    carouselSlides[currentSlideIndex].classList.add('active');
};

fetch('https://v5n7k8p2m4q9x1z.haiakuazra.workers.dev/', {
    headers: {
        Authorization: 'Bearer yK7mP2qW9xL4vN1zB6tF3sR8jQ5cX0dY2gH9vK4mP7zB2tF8sN'
    }
}).then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}).then(encryptedData => {
    const ciphertext = CryptoJS.enc.Base64.parse(encryptedData.ajra);

    const keyHash = CryptoJS.SHA256('yK7mP2qW9xL4vN1zB6tF3sR8jQ5cX0dY2gH9vK4mP7zB2tF8sN');
    const iv = CryptoJS.enc.Hex.parse('0a141e28323c46505a646e78828c96a0');

    const decrypted = CryptoJS.AES.decrypt({ ciphertext }, keyHash, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    const generationData = JSON.parse(decryptedText);

    const GENERATION_LABELS = {
        generation_1: 'Kagenou Family 1',
        generation_2: 'Kagenou Family 2',
        generation_3: 'Kagenou Family 3'
    };

    const metricsTableBody = document.querySelector('.member-table-body');
    metricsTableBody.innerHTML = '';

    ['generation_1', 'generation_2', 'generation_3'].forEach(genKey => {
        if (generationData[genKey] !== undefined) {
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
            <td>${GENERATION_LABELS[genKey]}</td>
            <td><strong>${generationData[genKey]}</strong> anggota</td>
        `;
        metricsTableBody.appendChild(tableRow);
        }
    })
}).catch(console.error);

const registerDirectoryBtn = document.querySelector('.btn-daftar');
const memberDirectoryModalEl = document.getElementById('modalMember');
const memberListContainer = document.querySelector('.member-list');
const directorySearchInput = document.querySelector('.member-search');
const totalMembersCounter = document.querySelector('.member-total');

let memberDirectoryCache = {};

registerDirectoryBtn.addEventListener('click', () => {
    memberDirectoryModalEl.classList.remove('fade-out');
    memberDirectoryModalEl.style.display = 'block';
    document.body.classList.add('no-scroll');

    fetch('https://b9r3t7w4v8k2p5m.haiakuazra.workers.dev/', {
        headers: {
        Authorization: 'Bearer yK7mP2qW9xL4vN1zB6tF3sR8jQ5cX0dY2gH9vK4mP7zB2tF8sN'
        }
    }).then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    }).then(encryptedData => {
        const ciphertext = CryptoJS.enc.Base64.parse(encryptedData.ajra);

        const keyHash = CryptoJS.SHA256('yK7mP2qW9xL4vN1zB6tF3sR8jQ5cX0dY2gH9vK4mP7zB2tF8sN');
        const iv = CryptoJS.enc.Hex.parse('0a141e28323c46505a646e78828c96a0');

        const decrypted = CryptoJS.AES.decrypt({ ciphertext }, keyHash, {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        const data = JSON.parse(decryptedText);

        memberDirectoryCache = data;
        r9v4k8p2m7q3z1b6t2w8x4v0k5p9m3r7x2z6m1q5z9v4k8p2b6(data);
    }).catch(console.error);
});

function r9v4k8p2m7q3z1b6t2w8x4v0k5p9m3r7x2z6m1q5z9v4k8p2b6(targetData) {
    memberListContainer.innerHTML = '';
    totalMembersCounter.textContent = Object.keys(memberDirectoryCache).length;

    Object.keys(targetData).forEach(memberId => {
        const memberProfile = targetData[memberId];
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <strong class='nickname'>${m3q8z2v7k4p9b1t6r0w5x9v3k8p2m7r4x1z6m9q3z7v2k5p8b4(memberProfile.nickname)}</strong>
            <span>@${memberProfile.username}</span>
        `;
        listItem.style.cursor = 'pointer';
        listItem.addEventListener('click', () => {
            z3m8q2v7k1p6b0t5r9w4x8v2k7p3m9r1x6z2m5q9z4v8k3p7b1(memberProfile);
        });

        memberListContainer.appendChild(listItem);
    })
};

directorySearchInput.addEventListener('input', () => {
    const searchQuery = directorySearchInput.value.toLowerCase();
    const filteredDirectory = Object.fromEntries(Object.entries(memberDirectoryCache).filter(([_, member]) => member.username.toLowerCase().includes(searchQuery)));
    r9v4k8p2m7q3z1b6t2w8x4v0k5p9m3r7x2z6m1q5z9v4k8p2b6(filteredDirectory);
});

window.addEventListener('click', (event) => {
    if (event.target === memberDirectoryModalEl) {
        memberDirectoryModalEl.classList.add('fade-out');
        setTimeout(() => {
            memberDirectoryModalEl.style.display = 'none';
        }, 300);
        document.body.classList.remove('no-scroll');
    }
});

const detailModalEl = document.getElementById('modalDetail');
const profileAvatarImg = document.querySelector('.detail-avatar');
const profileNameEl = document.querySelector('.detail-name');
const profileUsernameEl = document.querySelector('.detail-username');
const profileTitleEl = document.querySelector('.detail-title');
const profileBioEl = document.querySelector('.detail-bio');
const statsFollowersEl = document.querySelector('.detail-followers');
const statsFollowingEl = document.querySelector('.detail-following');
const statsLikesEl = document.querySelector('.detail-likes');
const statsVideosEl = document.querySelector('.detail-videos');
const statsContainerEl = document.querySelector('.detail-stats');

function k2p7m3q9z4v8r2b7t1w6x0v5k9p3m7r2x8z4m9q1z6v3k8p2b5() {
    profileAvatarImg.src = '';
    profileNameEl.textContent = '';
    profileUsernameEl.textContent = '';
    profileBioEl.textContent = '';
    statsFollowersEl.textContent = '';
    statsFollowingEl.textContent = '';
    statsLikesEl.textContent = '';
    statsVideosEl.textContent = '';
};

async function z3m8q2v7k1p6b0t5r9w4x8v2k7p3m9r1x6z2m5q9z4v8k3p7b1(member) {
    k2p7m3q9z4v8r2b7t1w6x0v5k9p3m7r2x8z4m9q1z6v3k8p2b5();
    const sanitizedUsername = member.username.replace('@', '');

    t1r6b2z7q3m8v4k9p0w5x2v8k3p7m1r6x2z8m4q9z3v7k1p5b0();

    try {
        const response = await fetch(`https://api.kageen.my.id/api/stalk-tiktok?user=${sanitizedUsername}`);
        const apiResult = await response.json();

        w6x2v8k4p9m1q5z0b4t8r3v7k2p6m9r1x5z9m4q8z2v6k1p3b7();

        if (!apiResult.success || !apiResult.user) {
            return v8k4p9m3q7z2b6t0r5w9x4v1k7p3m8r2x6z1m5q9z4v8k2p6b0('Username tidak Terdaftar di TikTok', true);
        };

        const { user: userData, stats: userStats } = apiResult;

        profileAvatarImg.src = userData.avatarLarger;
        profileNameEl.textContent = m3q8z2v7k4p9b1t6r0w5x9v3k8p2m7r4x1z6m9q3z7v2k5p8b4(userData.nickname);
        profileUsernameEl.textContent = '@' + userData.uniqueId;
        profileBioEl.textContent = userData.signature || '';

        statsFollowersEl.textContent = `Pengikut : ${b9t4w0x5v2k7p1m6q9z3r8v2k6p9m1r5x9z4m8q2z7v3k1p5b6(userStats.followerCount)}`;
        statsFollowingEl.textContent = `Mengikuti : ${b9t4w0x5v2k7p1m6q9z3r8v2k6p9m1r5x9z4m8q2z7v3k1p5b6(userStats.followingCount)}`;
        statsLikesEl.textContent = `Total Suka : ${b9t4w0x5v2k7p1m6q9z3r8v2k6p9m1r5x9z4m8q2z7v3k1p5b6(userStats.heartCount)}`;
        statsVideosEl.textContent = `Total Video : ${userStats.videoCount}`;

        detailModalEl.classList.add('active');
        document.body.classList.add('no-scroll');
    } catch (err) {
        w6x2v8k4p9m1q5z0b4t8r3v7k2p6m9r1x5z9m4q8z2v6k1p3b7();
        return v8k4p9m3q7z2b6t0r5w9x4v1k7p3m8r2x6z1m5q9z4v8k2p6b0('Gagal mengambil data akun tersebut :(');
    }
};

detailModalEl.addEventListener('click', (event) => {
    if (event.target === detailModalEl) {
        detailModalEl.classList.remove('active');
    }
});

function v8k4p9m3q7z2b6t0r5w9x4v1k7p3m8r2x6z1m5q9z4v8k2p6b0(message, isFallbackVerification = false) {
    profileAvatarImg.style.display = 'none';
    profileUsernameEl.style.display = 'none';
    profileTitleEl.style.display = 'none';
    profileBioEl.style.display = 'none';
    statsContainerEl.style.display = 'none';

    profileNameEl.innerHTML = message;

    if (isFallbackVerification) {
        profileNameEl.innerHTML += `
        <div class='detail-footer'>
            Silakan melakukan verifikasi ulang di dalam Grup 😉
        </div>
        `;
    };

    detailModalEl.classList.add('active');
    document.body.classList.add('no-scroll');

    setTimeout(() => {
        detailModalEl.classList.remove('active');
        document.body.classList.remove('no-scroll');

        setTimeout(() => {
        profileAvatarImg.style.display = 'block';
        profileUsernameEl.style.display = 'block';
        profileTitleEl.style.display = 'block';
        profileBioEl.style.display = 'block';
        statsContainerEl.style.display = 'block';
        profileNameEl.textContent = '';
        }, 300);
    }, 2500);
};

const subAdminWrapperEl = document.querySelector('.subadmin-wrapper');
let isDraggableActive = false;
let dragStartX;
let horizontalScrollLeftState;

subAdminWrapperEl.addEventListener('mousedown', (event) => {
    isDraggableActive = true;
    subAdminWrapperEl.classList.add('dragging');

    dragStartX = event.pageX - subAdminWrapperEl.offsetLeft;
    horizontalScrollLeftState = subAdminWrapperEl.scrollLeft;
});

subAdminWrapperEl.addEventListener('mouseleave', () => {
    isDraggableActive = false;
    subAdminWrapperEl.classList.remove('dragging');
});

subAdminWrapperEl.addEventListener('mouseup', () => {
    isDraggableActive = false;
    subAdminWrapperEl.classList.remove('dragging');
});

subAdminWrapperEl.addEventListener('mousemove', (event) => {
    if (!isDraggableActive) return;
    event.preventDefault();

    const currentX = event.pageX - subAdminWrapperEl.offsetLeft;
    const scrollMultiplier = (currentX - dragStartX) * 2;

    subAdminWrapperEl.scrollLeft = horizontalScrollLeftState - scrollMultiplier;
});

window.addEventListener('load', () => {
    const adminCards = document.querySelectorAll('.subadmin-card');
    if (!subAdminWrapperEl || adminCards.length === 0) return;

    const totalCards = adminCards.length;
    const targetIndex = (totalCards % 2 === 1) ? Math.floor(totalCards / 2) : (totalCards / 2) - 1;
    const targetCard = adminCards[targetIndex];

    const calculatedScrollPosition = targetCard.offsetLeft - (subAdminWrapperEl.offsetWidth / 2) + (targetCard.offsetWidth / 2);
    subAdminWrapperEl.scrollLeft = calculatedScrollPosition;
});

fetch('https://x4m8q2z7v1k9p3b.haiakuazra.workers.dev/', {
    headers: {
        Authorization: 'Bearer yK7mP2qW9xL4vN1zB6tF3sR8jQ5cX0dY2gH9vK4mP7zB2tF8sN'
    }
}).then(res => {
    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
}).then(encryptedData => {
    const secretKey = 'yK7mP2qW9xL4vN1zB6tF3sR8jQ5cX0dY2gH9vK4mP7zB2tF8sN';

    const ciphertext = CryptoJS.enc.Base64.parse(encryptedData.ajra);
    const keyHash = CryptoJS.SHA256(secretKey);
    const iv = CryptoJS.enc.Hex.parse('0a141e28323c46505a646e78828c96a0');

    const decrypted = CryptoJS.AES.decrypt({ ciphertext }, keyHash, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    const leaderboardData = JSON.parse(decryptedText);

    function x5v9k3p7m2q6z1b5t0w4r9v3k8p2m6r1x7z4m9q3z8v2k6p1b5(identityString) {
        const cleanedNumber = identityString.replace('@s.whatsapp.net', '');
        if (cleanedNumber.length <= 6) return cleanedNumber;

        const visualPrefix = cleanedNumber.slice(0, 2);
        const visualMiddle = cleanedNumber.slice(5, 8);

        return `${visualPrefix}xxx${visualMiddle}xxx`;
    };

    const leaderboardProfiles = Object.entries(leaderboardData).map(([id, info]) => ({
        name: info.name && info.name.trim() !== '' ? info.name : x5v9k3p7m2q6z1b5t0w4r9v3k8p2m6r1x7z4m9q3z8v2k6p1b5(id),
        level: info.level,
        exp: info.exp
    }));

    leaderboardProfiles.sort((a, b) => {
        if (b.level !== a.level) return b.level - a.level;
        return b.exp - a.exp;
    });

    const TOP_10_LEADERBOARD = leaderboardProfiles.slice(0, 10);
    const leaderboardContainer = document.getElementById('top-member-list');

    leaderboardContainer.innerHTML = '';

    TOP_10_LEADERBOARD.forEach((member, index) => {
        const listItem = document.createElement('li');

        let nameStyle = '';
        let textStyle = '';

        if (index === 0) {
            nameStyle = 'color: #ffd700; font-weight: 800; text-shadow: 0 0 10px rgba(255, 215, 0, 0.4);';
            textStyle = 'color: #ffd700; text-shadow: 0 0 8px rgba(255, 215, 0, 0.3);';
        } else if (index === 1) {
            nameStyle = 'color: #c0c0c0; font-weight: 800; text-shadow: 0 0 10px rgba(192, 192, 192, 0.4);';
            textStyle = 'color: #c0c0c0; text-shadow: 0 0 8px rgba(192, 192, 192, 0.3);';
        } else if (index === 2) {
            nameStyle = 'color: #cd7f32; font-weight: 800; text-shadow: 0 0 10px rgba(205, 127, 50, 0.4);';
            textStyle = 'color: #cd7f32; text-shadow: 0 0 8px rgba(205, 127, 50, 0.3);';
        };

        const rankMedal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;

        listItem.innerHTML = `
            <span class="rank">${rankMedal}</span>
            <span class="member-name" style="${nameStyle}">${member.name}</span>
            <span class="level" style="${textStyle}">Lv ${member.level}</span>
            <span class="exp" style="${textStyle}">${member.exp.toLocaleString()} EXP</span>
        `;

        leaderboardContainer.appendChild(listItem);
    })
}).catch(console.error);

fetch('https://7vn2kp9xl4mr8tb.haiakuazra.workers.dev/', {
    headers: {
        Authorization: 'Bearer yK7mP2qW9xL4vN1zB6tF3sR8jQ5cX0dY2gH9vK4mP7zB2tF8sN'
    }
}).then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}).then(encryptedData => {
    const secretKey = 'yK7mP2qW9xL4vN1zB6tF3sR8jQ5cX0dY2gH9vK4mP7zB2tF8sN';

    const ciphertext = CryptoJS.enc.Base64.parse(encryptedData.ajra);
    const keyHash = CryptoJS.SHA256(secretKey);
    const iv = CryptoJS.enc.Hex.parse('0a141e28323c46505a646e78828c96a0');

    const decrypted = CryptoJS.AES.decrypt({ ciphertext }, keyHash, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    const attendanceData = JSON.parse(decryptedText);

    const currentISOFormattedMonth = new Date().toISOString().slice(0, 7);

    const INDONESIAN_MONTHS = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const currentDateInstance = new Date();

    document.getElementById('absensi-subtitle').textContent = `Rekapan Data Periode Bulan ${INDONESIAN_MONTHS[currentDateInstance.getMonth()]} ${currentDateInstance.getFullYear()} 📅`;

    const activeMonthData = attendanceData[currentISOFormattedMonth] || {};
    const attendanceRecords = Object.values(activeMonthData);

    attendanceRecords.sort((a, b) => b.attendance.length - a.attendance.length);

    const TOP_3_ATTENDANCE = attendanceRecords.slice(0, 3);
    const attendanceContainer = document.getElementById('top-absensi-list');

    attendanceContainer.innerHTML = '';

    TOP_3_ATTENDANCE.forEach((record, index) => {
        const ROMAN_GENERATION_MAP = {
            1: 'I',
            2: 'II',
            3: 'III'
        };

        const rankMedal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;
        const listItem = document.createElement('li');

        let nameStyle = '';
        let textStyle = '';

        if (index === 0) {
            nameStyle = 'color: #ffd700; font-weight: 800; text-shadow: 0 0 10px rgba(255, 215, 0, 0.4);';
            textStyle = 'color: #ffd700; text-shadow: 0 0 8px rgba(255, 215, 0, 0.3);';
        } else if (index === 1) {
            nameStyle = 'color: #c0c0c0; font-weight: 800; text-shadow: 0 0 10px rgba(192, 192, 192, 0.4);';
            textStyle = 'color: #c0c0c0; text-shadow: 0 0 8px rgba(192, 192, 192, 0.3);';
        } else if (index === 2) {
            nameStyle = 'color: #cd7f32; font-weight: 800; text-shadow: 0 0 10px rgba(205, 127, 50, 0.4);';
            textStyle = 'color: #cd7f32; text-shadow: 0 0 8px rgba(205, 127, 50, 0.3);';
        };

        listItem.innerHTML = `
            <span class="rank">${rankMedal}</span>
            <span class="member-name" style="${nameStyle}">${record.name}</span>
            <span class="level" style="${textStyle}">Gen ${ROMAN_GENERATION_MAP[record.generation] || record.generation}</span>
            <span class="exp" style="${textStyle}">${record.attendance.length}x Hadir</span>
        `;

        attendanceContainer.appendChild(listItem);
    })
}).catch(console.error);

const globalLoadingOverlayEl = document.getElementById('loadingOverlay');
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function x7m2k5v4p9q1r3z8b6t0w4v8k2p5m7r1x9z4m8q2z7v1k9p3b5() {
    const headers = {
        Authorization: 'Bearer yK7mP2qW9xL4vN1zB6tF3sR8jQ5cX0dY2gH9vK4mP7zB2tF8sN'
    };

    const secretKey = 'yK7mP2qW9xL4vN1zB6tF3sR8jQ5cX0dY2gH9vK4mP7zB2tF8sN';
    const keyHash = CryptoJS.SHA256(secretKey);
    const iv = CryptoJS.enc.Hex.parse('0a141e28323c46505a646e78828c96a0');

    function q9z4k8p2m7v3r9b5t1w6x2v8k4p9m3r7x1z6m2q8z4v9k3p7b1(payload) {
        const ciphertext = CryptoJS.enc.Base64.parse(payload);
        const decrypted = CryptoJS.AES.decrypt({ ciphertext }, keyHash, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    };

    let isRespondSuccess1 = false;
    while (!isRespondSuccess1) {
        try {
            const result_1 = await fetch(`https://api.kageen.my.id/api/direct2?query=margakagenou`, { headers }).then(r => r.json());

            if (result_1.success && result_1.ajra) {
                const data = q9z4k8p2m7v3r9b5t1w6x2v8k4p9m3r7x1z6m2q8z4v9k3p7b1(result_1.ajra);

                const margaView = document.getElementById('marga-views');
                const margaVideo = document.getElementById('marga-videos');

                if (margaView) animateHashtagNumber(margaView, data.view_count);
                if (margaVideo) animateHashtagNumber(margaVideo, data.user_count);

                isRespondSuccess1 = true;
            } else {
                await delay(1000);
            }
        } catch (err) {
            await delay(1000);
        }
    }

    await delay(1000);

    let isRespondSuccess12 = false;
    while (!isRespondSuccess12) {
        try {
            const result_2 = await fetch(`https://api.kageen.my.id/api/direct2?query=kagenoufamily`, { headers }).then(r => r.json());

            if (result_2.success && result_2.ajra) {
                const data = q9z4k8p2m7v3r9b5t1w6x2v8k4p9m3r7x1z6m2q8z4v9k3p7b1(result_2.ajra);

                const familyView = document.getElementById('family-views');
                const familyVideo = document.getElementById('family-videos');

                if (familyView) animateHashtagNumber(familyView, data.view_count);
                if (familyVideo) animateHashtagNumber(familyVideo, data.user_count);

                isRespondSuccess12 = true;
            } else {
                await delay(1000);
            }
        } catch (err) {
            await delay(1000);
        }
    };

    await delay(500);

    const targetHashtag = [
        { query: 'margakagenou', label: 'KGN' },
        { query: 'nanimecreatoraogiri', label: 'NCA' },
        { query: 'creatoranimeone', label: 'CAO' },
        { query: 'margatsr', label: 'TSR' },
        { query: 'margakgy', label: 'KGY' }
    ];

    const listContainer = document.getElementById('top-hashtag-list');
    if (!listContainer) return;

    listContainer.innerHTML = '<p style="color:#888; text-align:center; padding: 20px;">Memuat Data Peringkat ...</p>';

    try {
        listContainer.innerHTML = ''; 

        for (let i = 0; i < targetHashtag.length; i++) {
            const tag = targetHashtag[i];
            try {
                const res = await fetch(`https://api.kageen.my.id/api/direct2?query=${tag.query}`, { headers }).then(r => r.json());
                
                if (res.success && res.ajra) {
                    const data = q9z4k8p2m7v3r9b5t1w6x2v8k4p9m3r7x1z6m2q8z4v9k3p7b1(res.ajra);
                    const videos = data.user_count || 0; 
                    
                    const listItem = document.createElement('li');
                    
                    let nameStyle = '';
                    let textStyle = '';
                    if (i === 0) {
                        nameStyle = 'color: #ffd700; font-weight: 800; text-shadow: 0 0 10px rgba(255, 215, 0, 0.4);';
                        textStyle = 'color: #ffd700; text-shadow: 0 0 8px rgba(255, 215, 0, 0.3);';
                    } else if (i === 1) {
                        nameStyle = 'color: #c0c0c0; font-weight: 800; text-shadow: 0 0 10px rgba(192, 192, 192, 0.4);';
                        textStyle = 'color: #c0c0c0; text-shadow: 0 0 8px rgba(192, 192, 192, 0.3);';
                    } else if (i === 2) {
                        nameStyle = 'color: #cd7f32; font-weight: 800; text-shadow: 0 0 10px rgba(205, 127, 50, 0.4);';
                        textStyle = 'color: #cd7f32; text-shadow: 0 0 8px rgba(205, 127, 50, 0.3);';
                    } else {
                        nameStyle = 'font-weight: 700; color: #fff;';
                        textStyle = 'color: #aaa;';
                    };

                    const rankMedal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`;
                    const formattedView = v4k8p2m7r1x9z4m8q2z7v1k9p3b5b9r3t7w4v8k2p5m1x9z4m8(videos);
                    
                    listItem.innerHTML = `
                        <span class="rank">${rankMedal}</span>
                        <span class="member-name" style="${nameStyle}">${tag.label}</span>
                        <span class="level" style="${textStyle}">#${tag.query}</span>
                        <span class="exp" style="${textStyle}">${formattedView} Video</span>
                    `;

                    listItem.classList.add('item-masuk-smooth');
                    listContainer.appendChild(listItem);
                }
            } catch (err) {
                console.warn(err);
            };

            await delay(500); 
        }
    } catch (err) {
        console.error(err);
        listContainer.innerHTML = '<p style="color:red; text-align:center;">Gagal memuat data server.</p>';
    }
};

function v4k8p2m7r1x9z4m8q2z7v1k9p3b5b9r3t7w4v8k2p5m1x9z4m8(num) {
    if (!num) return '0';
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace('.0', '') + ' M';
    };

    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace('.0', '') + ' JT';
    };

    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace('.0', '') + ' RB';
    };

    return num.toString();
};

function t1r6b2z7q3m8v4k9p0w5x2v8k3p7m1r6x2z8m4q9z3v7k1p5b0() {
    globalLoadingOverlayEl.style.display = 'flex';
    document.body.classList.add('no-scroll');
};

function w6x2v8k4p9m1q5z0b4t8r3v7k2p6m9r1x5z9m4q8z2v6k1p3b7() {
    globalLoadingOverlayEl.style.display = 'none';
};

function m3q8z2v7k4p9b1t6r0w5x9v3k8p2m7r4x1z6m9q3z7v2k5p8b4(rawText) {
    return rawText.normalize('NFKD').replace(/[^\w\s@._-]/g, '');
};

function b9t4w0x5v2k7p1m6q9z3r8v2k6p9m1r5x9z4m8q2z7v3k1p5b6(numericValue) {
    if (numericValue >= 1000000) {
        return (numericValue / 1000000).toFixed(1) + ' JT';
    };

    if (numericValue >= 1000) {
        return (numericValue / 1000).toFixed(1) + ' RB';
    };

    return numericValue;
};

const videoDetailModalEl = document.getElementById('modalVideoDetail');
const videoCoverImg = document.querySelector('.video-detail-cover');
const videoNameEl = document.querySelector('.video-detail-name');
const videoUsernameEl = document.querySelector('.video-detail-username');
const videoTitleEl = document.querySelector('.video-detail-title');
const videoStatsLikes = document.querySelector('.val-likes');
const videoStatsComments = document.querySelector('.val-comments');
const videoStatsShares = document.querySelector('.val-shares');
const videoStatsViews = document.querySelector('.val-views');
const videoLinkBtn = document.querySelector('.video-detail-link');
const videoDateEl = document.querySelector('.video-detail-date');

const topViewWrapperEl = document.getElementById('top-view-list');
let isTopViewDragActive = false;
let topViewDragStartX;
let topViewScrollLeft;

if (topViewWrapperEl) {
    topViewWrapperEl.addEventListener('mousedown', (e) => {
        isTopViewDragActive = true;
        topViewWrapperEl.classList.add('dragging');
        topViewDragStartX = e.pageX - topViewWrapperEl.offsetLeft;
        topViewScrollLeft = topViewWrapperEl.scrollLeft;
    });

    topViewWrapperEl.addEventListener('mouseleave', () => {
        isTopViewDragActive = false;
        topViewWrapperEl.classList.remove('dragging');
    });

    topViewWrapperEl.addEventListener('mouseup', () => {
        isTopViewDragActive = false;
        topViewWrapperEl.classList.remove('dragging');
    });

    topViewWrapperEl.addEventListener('mousemove', (e) => {
        if (!isTopViewDragActive) return;
        e.preventDefault();
        const x = e.pageX - topViewWrapperEl.offsetLeft;
        const walk = (x - topViewDragStartX) * 2;
        topViewWrapperEl.scrollLeft = topViewScrollLeft - walk;
    })
};

async function v4m9k2p7q1z6r3b8t0w5x2v8k4p9m1r7x3z6m2q8z1v5k9p4b7() {
    const sectionEl = document.querySelector('.top-view-section');
    if (sectionEl) sectionEl.style.display = 'none';

    let loadingEl = document.getElementById('top-views-loading-text');
    if (!loadingEl) {
        loadingEl = document.createElement('div');
        loadingEl.id = 'top-views-loading-text';
        loadingEl.style.color = '#888';
        loadingEl.style.fontSize = '1.1rem';
        loadingEl.style.margin = '50px auto';
        loadingEl.style.textAlign = 'center';
        loadingEl.textContent = 'Memuat ...';
        if (sectionEl) {
            sectionEl.parentNode.insertBefore(loadingEl, sectionEl);
        }
    };
    loadingEl.style.display = 'block';

    try {
        const response = await fetch('https://w5n3r8x2m9p4v7k.haiakuazra.workers.dev/', {
            headers: {
                Authorization: 'Bearer yK7mP2qW9xL4vN1zB6tF3sR8jQ5cX0dY2gH9vK4mP7zB2tF8sN'
            }
        });
        
        if (!response.ok) throw new Error('Unauthorized / Failed to load data');
        const encryptedData = await response.json();

        const secretKey = 'yK7mP2qW9xL4vN1zB6tF3sR8jQ5cX0dY2gH9vK4mP7zB2tF8sN';
        const ciphertext = CryptoJS.enc.Base64.parse(encryptedData.ajra);
        const keyHash = CryptoJS.SHA256(secretKey);
        const iv = CryptoJS.enc.Hex.parse('0a141e28323c46505a646e78828c96a0');

        const decrypted = CryptoJS.AES.decrypt({ ciphertext }, keyHash, {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        const data = JSON.parse(decryptedText);

        if (loadingEl) loadingEl.style.display = 'none';
        if (sectionEl) sectionEl.style.display = 'block';

        p6q1z5k9m2v7r3b8t0w4x9v3k8p2m6r1x7z4m9q3z7v2k5p8b1(data);
    } catch (err) {
        console.warn(err);
        if (loadingEl) loadingEl.textContent = 'Gagal memuat data peringkat video :(';
    }
};

function p6q1z5k9m2v7r3b8t0w4x9v3k8p2m6r1x7z4m9q3z7v2k5p8b1(items) {
    if (!topViewWrapperEl) return;
    topViewWrapperEl.innerHTML = '';

    let itemsArray = [];
    if (Array.isArray(items)) {
        itemsArray = items;
    } else if (items && typeof items === 'object') {
        itemsArray = Object.values(items);
    };

    if (itemsArray.length === 0) return;

    const sortedItems = [...itemsArray].sort((a, b) => (b.top_view || 0) - (a.top_view || 0));
    const top9 = sortedItems.slice(0, 9);
    
    const rankOrder = [8, 6, 4, 3, 1, 2, 5, 7, 9];
    const pyramidData = [];
    
    rankOrder.forEach(rankVal => {
        if (rankVal <= top9.length) {
            const item = top9[rankVal - 1];
            if (item) {
                const itemCopy = { ...item };
                itemCopy.originalRank = rankVal;
                pyramidData.push(itemCopy);
            }
        }
    });

    pyramidData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.setAttribute('data-rank', item.originalRank);

        let rankBadgeClass = '';
        let rankText = `#${item.originalRank}`;
        if (item.originalRank === 1) {
            rankBadgeClass = 'rank-1';
            rankText = '👑 1st Rank';
        } else if (item.originalRank === 2) {
            rankBadgeClass = 'rank-2';
            rankText = '🥈 2nd Rank';
        } else if (item.originalRank === 3) {
            rankBadgeClass = 'rank-3';
            rankText = '🥉 3rd Rank';
        };

        const cardImgId = `cover-${(item.username || '').replace(/[^\w]/g, '')}-${item.video_id || ''}`;

        card.innerHTML = `
            <span class="card-badge ${rankBadgeClass}">${rankText}</span>
            <div class="video-card-cover-wrapper">
                <img id="${cardImgId}" referrerpolicy="no-referrer" src="${item.cover || './assets/image/pfp-community.jpg'}" alt="cover">
            </div>
            <div class="video-card-header">
                <div class="video-card-user-info">
                <span class="video-card-nickname">${m3q8z2v7k4p9b1t6r0w5x9v3k8p2m7r4x1z6m9q3z7v2k5p8b4(item.nickname)}</span>
                <span class="video-card-username">@${item.username}</span>
                </div>
            </div>
            <p class="video-card-title">${item.title || 'Tidak ada caption'}</p>
            <div class="video-card-stats">
                <span class="video-card-views">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                ${b9t4w0x5v2k7p1m6q9z3r8v2k6p9m1r5x9z4m8q2z7v3k1p5b6(item.top_view)} Penonton
                </span>
                <span class="video-card-action">
                Detail
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </span>
            </div>
        `;

        card.addEventListener('click', () => {
            r2v8k4p9m3q7z1b6t0w5x9v2k8p4m7r1x6z2m9q5z8v3k1p7b4(item);
        });

        topViewWrapperEl.appendChild(card);

        if (item.video_id) {
            const cleanUsername = item.username.replace('@', '').trim();
            const videoUrl = `https://www.tiktok.com/${cleanUsername}/${item.video_id}`;

            setTimeout(() => {
                fetch(`https://api.kageen.my.id/api/direct1?url=${encodeURIComponent(videoUrl)}`, {
                    headers: {
                        Authorization: 'Bearer yK7mP2qW9xL4vN1zB6tF3sR8jQ5cX0dY2gH9vK4mP7zB2tF8sN'
                    }
                }).then(res => {
                    if (!res.ok) throw new Error('Unauthorized.');
                    return res.json();
                }).then(encryptedData => {
                    const secretKey = 'yK7mP2qW9xL4vN1zB6tF3sR8jQ5cX0dY2gH9vK4mP7zB2tF8sN';
                    const ciphertext = CryptoJS.enc.Base64.parse(encryptedData.ajra);
                    const keyHash = CryptoJS.SHA256(secretKey);
                    const iv = CryptoJS.enc.Hex.parse('0a141e28323c46505a646e78828c96a0');

                    const decrypted = CryptoJS.AES.decrypt({ ciphertext }, keyHash, {
                        iv,
                        mode: CryptoJS.mode.CBC,
                        padding: CryptoJS.pad.Pkcs7
                    });
                    
                    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
                    const result = JSON.parse(decryptedText);

                    if (result.Status && result.data && result.data.cover) {
                        const imgEl = document.getElementById(cardImgId);
                        if (imgEl) {
                            imgEl.src = result.data.cover;
                        }
                    }
                }).catch(err => console.warn(`Error : ${item.username}`, err));
            }, (item.originalRank - 1) * 1500);
        }
    });

    setTimeout(() => {
        const rank1Card = topViewWrapperEl.querySelector('.video-card[data-rank="1"]');
        if (rank1Card) {
            const scrollPos = rank1Card.offsetLeft - (topViewWrapperEl.offsetWidth / 2) + (rank1Card.offsetWidth / 2);
            topViewWrapperEl.scrollLeft = scrollPos;
        }
    }, 300);
};

async function r2v8k4p9m3q7z1b6t0w5x9v2k8p4m7r1x6z2m9q5z8v3k1p7b4(item) {
    if (videoCoverImg) {
        videoCoverImg.src = '';
        videoCoverImg.removeAttribute('poster');
    };

    if (videoTitleEl) videoTitleEl.textContent = '';
    if (videoDateEl) videoDateEl.textContent = '';
    if (videoStatsViews) videoStatsViews.textContent = '';
    if (videoStatsLikes) videoStatsLikes.textContent = '';
    if (videoStatsComments) videoStatsComments.textContent = '';
    if (videoStatsShares) videoStatsShares.textContent = '';
    if (videoLinkBtn) videoLinkBtn.href = '#';

    const cleanUsername = item.username.replace('@', '').trim();
    const videoUrl = `https://www.tiktok.com/${cleanUsername}/${item.video_id}`;

    t1r6b2z7q3m8v4k9p0w5x2v8k3p7m1r6x2z8m4q9z3v7k1p5b0();

    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const response = await fetch(`https://api.kageen.my.id/api/direct1?url=${encodeURIComponent(videoUrl)}`, {
            headers: {
                Authorization: 'Bearer yK7mP2qW9xL4vN1zB6tF3sR8jQ5cX0dY2gH9vK4mP7zB2tF8sN'
            }
        });

        const encryptedData = await response.json();
        const secretKey = 'yK7mP2qW9xL4vN1zB6tF3sR8jQ5cX0dY2gH9vK4mP7zB2tF8sN';

        const ciphertext = CryptoJS.enc.Base64.parse(encryptedData.ajra);
        const keyHash = CryptoJS.SHA256(secretKey);
        const iv = CryptoJS.enc.Hex.parse('0a141e28323c46505a646e78828c96a0');
        const decrypted = CryptoJS.AES.decrypt({ ciphertext }, keyHash, {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        
        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        const apiResult = JSON.parse(decryptedText);

        w6x2v8k4p9m1q5z0b4t8r3v7k2p6m9r1x5z9m4q8z2v6k1p3b7();

        if (!apiResult.Status || !apiResult.data) {
            return z7k3m8v1p6q9r2b5t0w4x8v3k7p2m6r1x9z5m4q2z8v1k6p9b3('Gagal mengambil data dari API server.', true, item);
        };
        const videoData = apiResult.data;

        if (videoCoverImg) {
            videoCoverImg.src = videoData.hdplay || videoData.play || '';
            videoCoverImg.poster = videoData.cover || '';
        };

        if (videoTitleEl) videoTitleEl.textContent = videoData.title || item.title || '';
        if (videoDateEl) {
            if (item.create_time) {
                const dateObj = new Date(parseInt(item.create_time) * 1000);
                const bulanArr = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
                videoDateEl.textContent = `${dateObj.getDate()} ${bulanArr[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
            } else {
                videoDateEl.textContent = '';
            }
        };

        if (videoStatsViews) videoStatsViews.textContent = b9t4w0x5v2k7p1m6q9z3r8v2k6p9m1r5x9z4m8q2z7v3k1p5b6(videoData.play_count || 0);
        if (videoStatsLikes) videoStatsLikes.textContent = b9t4w0x5v2k7p1m6q9z3r8v2k6p9m1r5x9z4m8q2z7v3k1p5b6(videoData.digg_count || 0);
        if (videoStatsComments) videoStatsComments.textContent = b9t4w0x5v2k7p1m6q9z3r8v2k6p9m1r5x9z4m8q2z7v3k1p5b6(videoData.comment_count || 0);
        if (videoStatsShares) videoStatsShares.textContent = b9t4w0x5v2k7p1m6q9z3r8v2k6p9m1r5x9z4m8q2z7v3k1p5b6(videoData.share_count || 0);
        if (videoLinkBtn) videoLinkBtn.href = `https://www.tiktok.com/@${cleanUsername}/video/${item.video_id}`;
        if (videoDetailModalEl) videoDetailModalEl.classList.add('active');

        document.body.classList.add('no-scroll');
    } catch (err) {
        w6x2v8k4p9m1q5z0b4t8r3v7k2p6m9r1x5z9m4q8z2v6k1p3b7();
        return z7k3m8v1p6q9r2b5t0w4x8v3k7p2m6r1x9z5m4q2z8v1k6p9b3('Gagal menghubungi API server.', true, item);
    }
};

function z7k3m8v1p6q9r2b5t0w4x8v3k7p2m6r1x9z5m4q2z8v1k6p9b3(message, showFallbackInfo = false, originalItem = {}) {
    const cardImgId = `cover-${(originalItem.username || '').replace(/[^\w]/g, '')}-${originalItem.video_id || ''}`;
    const existingCardImg = document.getElementById(cardImgId);
    const fallbackCover = (existingCardImg && existingCardImg.src) ? existingCardImg.src : './assets/image/pfp-community.jpg';
    
    if (videoCoverImg) {
        videoCoverImg.src = '';
        videoCoverImg.poster = fallbackCover;
    };
    
    if (videoNameEl) videoNameEl.textContent = m3q8z2v7k4p9b1t6r0w5x9v3k8p2m7r4x1z6m9q3z7v2k5p8b4(originalItem.nickname || '');
    if (videoUsernameEl) videoUsernameEl.textContent = '@' + (originalItem.username || '');
    if (videoTitleEl) videoTitleEl.textContent = originalItem.title || '';
    if (videoDateEl) {
        if (item.create_time) {
            const dateObj = new Date(parseInt(item.create_time) * 1000);
            const bulanArr = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            videoDateEl.textContent = `${dateObj.getDate()} ${bulanArr[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
        } else {
            videoDateEl.textContent = '';
        }
    };
    
    if (videoStatsViews) videoStatsViews.textContent = b9t4w0x5v2k7p1m6q9z3r8v2k6p9m1r5x9z4m8q2z7v3k1p5b6(originalItem.top_view || 0);
    if (videoStatsLikes) videoStatsLikes.textContent = '-';
    if (videoStatsComments) videoStatsComments.textContent = '-';
    if (videoStatsShares) videoStatsShares.textContent = '-';

    const cleanUsername = (originalItem.username || '').replace('@', '').trim();
    if (videoLinkBtn) videoLinkBtn.href = `https://www.tiktok.com/@` + cleanUsername + `/video/` + (originalItem.video_id || '');

    if (videoDetailModalEl) videoDetailModalEl.classList.add('active');
    document.body.classList.add('no-scroll');
};

if (videoDetailModalEl) {
    videoDetailModalEl.addEventListener('click', (event) => {
        if (event.target === videoDetailModalEl) {
            videoDetailModalEl.classList.remove('active');
            document.body.classList.remove('no-scroll');

            if (videoCoverImg) {
                videoCoverImg.pause();
                videoCoverImg.src = '';
            }
        }
    })
};

document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15
    });
    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    })
});

function animateHashtagNumber(element, targetValue) {
    if (!element) return;
    const endValue = parseInt(targetValue) || 0;
    const duration = 10000;
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        const easeOut = 1 - Math.pow(1 - progress, 3); 
        const currentVal = Math.floor(easeOut * endValue);

        element.textContent = v4k8p2m7r1x9z4m8q2z7v1k9p3b5b9r3t7w4v8k2p5m1x9z4m8(currentVal);
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = v4k8p2m7r1x9z4m8q2z7v1k9p3b5b9r3t7w4v8k2p5m1x9z4m8(endValue);
        }
    };
    window.requestAnimationFrame(step);
};

x7m2k5v4p9q1r3z8b6t0w4v8k2p5m7r1x9z4m8q2z7v1k9p3b5();
v4m9k2p7q1z6r3b8t0w5x2v8k4p9m1r7x3z6m2q8z1v5k9p4b7();
