document.addEventListener('DOMContentLoaded', function() {
    const openBtn = document.getElementById('openModal');
    const modal = document.getElementById('modal');
    const goSelect = document.getElementById('goSelect');

    (function() {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') || 
                (e.ctrlKey && e.shiftKey && e.key === 'C') || 
                (e.ctrlKey && e.key === 'u') ||
                (e.ctrlKey && e.shiftKey && e.key === 'J')) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                return false;
            }
        }, true);

        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });

        let prevHeight = window.innerHeight;
        let prevWidth = window.innerWidth;
        
        setInterval(() => {
            if (window.outerHeight - window.innerHeight > 150 || 
                window.outerWidth - window.innerWidth > 150) {
                window.resizeTo(400, 800);
            }
            prevHeight = window.innerHeight;
            prevWidth = window.innerWidth;
        }, 250);

        (function() {
            const originalDebugger = window.debugger;
            window.debugger = function() {};
        })();

        document.addEventListener('mouseDown', function(e) {
            if (e.detail > 1) e.preventDefault();
        });

        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.shiftKey && e.key === 'K') {
                e.preventDefault();
                return false;
            }
        }, true);
    })();

    openBtn.addEventListener('click', function() {
        modal.classList.add('active');
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });

    goSelect.addEventListener('click', function() {
        window.open('https://chat.whatsapp.com/BpGNLDB0cExCA0oOGYNg1W', '_blank');
    });

    fetch('./database/member-count.json').then(res => res.json()).then(data => {
        const total = data.selection || 0;

        document.getElementById('memberCount').innerHTML = `
            ${total} anggota sedang seleksi ...
        `;
    }).catch(() => {
        document.getElementById('memberCount').innerHTML = `
            <span class='total'>Data member tidak ada.</span>
        `;
    })
});
