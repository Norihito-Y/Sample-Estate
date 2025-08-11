//==============================
// マウスストーカーの設定
//==============================
const stalker = document.getElementById('mouse-stalker');
let hovFlag = false;

document.addEventListener('mousemove', function (e) {
    stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
});

const linkElem = document.querySelectorAll('a:not(.no_stick_)');
for (let i = 0; i < linkElem.length; i++) {
    linkElem[i].addEventListener('mouseover', function (e) {
        hovFlag = true;
        stalker.classList.add('is_active');

    });
    linkElem[i].addEventListener('mouseout', function (e) {
        hovFlag = false;
        stalker.classList.remove('is_active');
    });
}

//==============================
// ハンバーガー絵ニューの設定
//==============================

$(function () {
    $('.button.js-button').on('click', function () {
        $('.header-nav ul').toggleClass('is-open');
        $(this).toggleClass('active');
    });
});

// ハンバーガーメニュー開閉時にheaderにmenu-openクラスをトグル
$(function () {
    $('.js-button').on('click', function () {
        $('header').toggleClass('menu-open');
    });
});

//==============================
// ヒーローイメージのスライダー
//==============================

const mySwiper = new Swiper('.mv01 .swiper', {
    effect: 'fade',
    fadeEffect: {
        crossFade: false,
    },
    loop: true,
    loopAdditionalSlides: 1,
    initialSlide: 1,
    speed: 1500,
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
        waitForTransition: false,
    },
});

const storySwiper = new Swiper('.story-slider', {
    loop: true,
    centeredSlides: true,
    slidesPerView: 1,
    effect: 'slide',
    speed: 800,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    allowTouchMove: true,
});

//==============================
// SVGテキストのエフェクト効果
//==============================

document.addEventListener('DOMContentLoaded', function () {
    const svgText = document.querySelector('.svg-text');
    const glowGradient = document.getElementById('glowGradient');
    const glowOverlay = document.querySelector('.glow-overlay');

    // 要素が存在するかチェック
    if (!svgText || !glowGradient || !glowOverlay) {
        console.warn('SVG elements not found');
        return;
    }

    function updateGradientPosition(e) {
        const rect = svgText.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        // 範囲チェック
        if (x < 0 || x > 100 || y < 0 || y > 100) {
            return;
        }

        // グラデーションの中心位置を更新
        glowGradient.setAttribute('cx', x + '%');
        glowGradient.setAttribute('cy', y + '%');

        // オーバーレイを表示
        glowOverlay.style.opacity = '1';
    }

    function hideGlow() {
        glowOverlay.style.opacity = '0';
    }

    // イベントリスナーを元の通りSVGテキストに追加
    svgText.addEventListener('mousemove', updateGradientPosition);
    svgText.addEventListener('mouseenter', updateGradientPosition);
    svgText.addEventListener('mouseleave', hideGlow);

    // デバッグ用：エフェクトが動作しているかチェック
    console.log('SVG text effect initialized');
});

// ==============================
// 大円外周の接点から接点までアニメーション
// ==============================
function deg2rad(deg) {
    return deg * Math.PI / 180;
}
document.addEventListener('DOMContentLoaded', function () {
    // 大円の中心と半径
    const bigCenter = { x: 250, y: 290 };
    const bigR = 220;
    // 5等分した円周上の中心角度（ラジアン）
    const angles = [
        -90,   // お客様（上）
        -18,   // 従業員（右上）
        54,    // 利益（右下）
        126,   // 資産（左下）
        198    // 地域（左上）
    ].map(deg2rad);
    // 小円にかからないようにオフセット角度を計算
    const smallR = 70;
    const offset = Math.asin(smallR / bigR); // ラジアン
    // 5本のarcパスを設定
    const arcs = [
        document.getElementById('arc1'),
        document.getElementById('arc2'),
        document.getElementById('arc3'),
        document.getElementById('arc4'),
        document.getElementById('arc5'),
    ];
    // 各パスのd属性を設定（小円にかからないように始点・終点をずらす）
    for (let i = 0; i < 5; i++) {
        const theta1 = angles[i] + offset;
        const theta2 = angles[(i + 1) % 5] - offset;
        const from = {
            x: bigCenter.x + bigR * Math.cos(theta1),
            y: bigCenter.y + bigR * Math.sin(theta1)
        };
        const to = {
            x: bigCenter.x + bigR * Math.cos(theta2),
            y: bigCenter.y + bigR * Math.sin(theta2)
        };
        arcs[i].setAttribute('d', `M${from.x},${from.y} A${bigR},${bigR} 0 0,1 ${to.x},${to.y}`);
        arcs[i].style.opacity = 0;
    }
    // アニメーション
    function animateArc(idx = 0) {
        const arc = arcs[idx];
        const len = arc.getTotalLength();
        arc.style.opacity = 1;
        arc.style.strokeDasharray = `${len},${len}`;
        arc.style.strokeDashoffset = len;
        let start = null;
        function draw(ts) {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / 1000, 1);
            const currentLen = len * progress;
            arc.style.strokeDashoffset = len - currentLen;
            if (progress < 1) {
                requestAnimationFrame(draw);
            } else {
                if (idx < 4) {
                    animateArc(idx + 1);
                } else {
                    // 全部描画後、少し待って全て非表示にしてリセット
                    setTimeout(() => {
                        arcs.forEach(a => {
                            a.style.opacity = 0;
                            a.style.strokeDashoffset = a.getTotalLength();
                        });
                        setTimeout(() => animateArc(0), 500);
                    }, 1000);
                }
            }
        }
        requestAnimationFrame(draw);
    }
    animateArc(0);
});

// 追加：スクロール問題のデバッグ
window.addEventListener('scroll', function () {
    // スクロール可能かどうかの確認
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) {
        console.warn('Page is not scrollable. Document height:', document.documentElement.scrollHeight, 'Window height:', window.innerHeight);
    }
});

// ローディングフェードアウト（ロゴアニメ→ロゴfadeOut→ローディングfadeOut）
$(window).on('load', function () {
    setTimeout(function () {
        $('#loader .loader-logo').fadeOut(600, function () {
            $('#loader').fadeOut(600, function () {
                $('#main-content').css('opacity', 1);
            });
        });
    }, 1400);
});

// ページ遷移時のフェードアウト
$('a').on('click', function (e) {
    const href = $(this).attr('href');
    if (href && href.charAt(0) !== '#' && !$(this).attr('target')) {
        e.preventDefault();
        $('#loader').fadeIn(400, function () {
            window.location = href;
        });
    }
});

// worksセクションのswiperスライダー初期化
if ($('.works-swiper').length) {
    new Swiper('.works-swiper', {
        slidesPerView: 2.5,
        spaceBetween: 32,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        loop: true,
        breakpoints: {
            992: {
                slidesPerView: 2.5,
            },
            768: {
                slidesPerView: 1.2,
            },
            0: {
                slidesPerView: 1,
            }
        }
    });
}

// story-sectionのswiperスライダー初期化
if ($('.story-swiper').length) {
    new Swiper('.story-swiper', {
        slidesPerView: 1,
        effect: 'slide',
        loop: true,
        speed: 1000, // 1秒かけてスライド
        autoplay: {
            delay: 4000, // 4秒表示
            disableOnInteraction: false,
        },
        allowTouchMove: true,
        pagination: false,
        navigation: false
    });
}

// ==============================
// ContactセクションでPC時のみヘッダー非表示
// ==============================
function toggleHeaderOnContact() {
    const header = document.querySelector('.header');
    const contact = document.querySelector('.contact');
    if (!header || !contact) return;

    function checkHeaderVisibility() {
        const isPC = window.innerWidth >= 992;
        const rect = contact.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;

        if (isPC && inView) {
            header.style.display = 'none';
        } else {
            header.style.display = '';
        }
    }

    window.addEventListener('scroll', checkHeaderVisibility);
    window.addEventListener('resize', checkHeaderVisibility);
    checkHeaderVisibility();
}

document.addEventListener('DOMContentLoaded', toggleHeaderOnContact);

// ==============================
// FooterセクションでPC時のみヘッダー非表示
// ==============================
function toggleHeaderOnFooter() {
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    if (!header || !footer) return;

    function checkHeaderVisibility() {
        const isPC = window.innerWidth >= 992;
        const rect = footer.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;

        if (isPC && inView) {
            header.style.display = 'none';
        } else {
            header.style.display = '';
        }
    }

    window.addEventListener('scroll', checkHeaderVisibility);
    window.addEventListener('resize', checkHeaderVisibility);
    checkHeaderVisibility();
}

document.addEventListener('DOMContentLoaded', toggleHeaderOnFooter);

