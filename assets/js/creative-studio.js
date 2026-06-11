/*!
=========================================================
* Creative Studio Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
$(document).ready(function () {
  $(".navbar .nav-link").on("click", function (event) {
    if (this.hash !== "" && !$(this).closest(".has-dropdown").length) {
      event.preventDefault();

      var hash = this.hash;

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        700,
        function () {
          window.location.hash = hash;
        },
      );
    }
  });
});

/* =========================
   Team Render Script
========================= */

document.addEventListener("DOMContentLoaded", function () {
  const teamData = {
    pi: [{ en: "Po-Chih Kuo", zh: "郭柏志", img: "assets/imgs/team/prof.jpg" }],

    phd: [
      {
        en: "Yueh-Chun Liu",
        zh: "劉岳濬",
        img: "assets/imgs/team/yuehchun.jpeg",
      },
    ],

    graduate: [
      { en: "Chao-Hsuan Lin", zh: "林晁璿", img: "assets/imgs/team/ray.jpg" },
      { en: "Wen-Yen Chung", zh: "鍾汶諺", img: "assets/imgs/team/wen.JPG" },
      { en: "Jui-Yun Su", zh: "蘇芮筠", img: "assets/imgs/team/juiyun.jpg" },
      { en: "Yu-Chieh Lin", zh: "林育頡", img: "assets/imgs/team/yuchieh.jpg" },
      {
        en: "Chien-Hui Su",
        zh: "蘇芊卉",
        img: "assets/imgs/team/chienhui.jpg",
      },
      { en: "Sung-Wei Yu", zh: "游松偉", img: "assets/imgs/team/sungwei.jpg" },
      { en: "Erich Wu", zh: "吳聲宏", img: "assets/imgs/team/Erich_Wu.png" },
      {
        en: "Shu-Yuu Luo",
        zh: "駱書宇",
        img: "assets/imgs/team/Shu-Yuu Luo.jpg",
      },
      { en: "Hsi-Yu Ho", zh: "何習與", img: "assets/imgs/team/Hsi-Yu Ho.jpg" },
      { en: "Yang-Chen Lin", zh: "林泱辰", img: "assets/imgs/team/yc.jpg" },
      {
        en: "Wen-Hsuan Lin",
        zh: "林玟萱",
        img: "assets/imgs/team/Wen-Hsuan Lin.JPG",
      },
      {
        en: "Pin-Shun Wang",
        zh: "王品舜",
        img: "assets/imgs/team/Pin-Shun.jpg",
      },
      { en: "Cathy Hou", zh: "侯凱馨", img: "assets/imgs/team/cathy.jpg" },
      { en: "Yu-Chieh Wu", zh: "吳昱潔", img: "assets/imgs/team/Yu-Chieh.jpg" },
      {
        en: "Humam Arshad Mustagfirin",
        zh: "胡紹良",
        img: "assets/imgs/team/Humam.jpg",
      },
      {
        en: "Kai-Sheng Chong",
        zh: "張凱盛",
        img: "assets/imgs/team/kaisheng.jpg",
      },
      {
        en: "Wen-Ting Chen",
        zh: "陳玟廷",
        img: "assets/imgs/team/wenting.jpg",
      },
      {
        en: "Hsiang-Ling Hsu",
        zh: "許香羚",
        img: "assets/imgs/team/hsiangling.jpg",
      },
      {
        en: "Yan-Rong Chen",
        zh: "陳彥蓉",
        img: "assets/imgs/team/yan_rong.jpeg",
      },
      {
        en: "Liao Hsiao-Wei",
        zh: "廖曉威",
        img: "assets/imgs/team/liaohsiao.png",
      },
    ],

    undergraduate: [
      {
        en: "Yun-Chieh Tsai",
        zh: "蔡昀潔",
        img: "assets/imgs/team/yunchiehtsai.jpeg",
      },
      {
        en: "Hank Fang",
        zh: "馮亦翰",
        img: "assets/imgs/team/hankfang.jpeg",
      },
      {
        en: "Yan-Lin Chen",
        zh: "陳彥霖",
        img: "assets/imgs/team/yanlinchen.png",
      },
      {
        en: "Jen Kuang Chien",
        zh: "任光謙",
        img: "assets/imgs/team/jenkuangchen.JPG",
      },
      {
        en: "Hsieh Chia Chin",
        zh: "謝佳晉",
        img: "assets/imgs/team/hsiehchiachin.jpeg",
      },
      {
        en: "Yan-Hong Chen",
        zh: "陳彥宏",
        img: "assets/imgs/team/yanhongchen.jpg",
      },
      {
        en: "Roger Fan",
        zh: "范升維",
        img: "assets/imgs/team/rogerfan.jpg",
      },
      {
        en: "Arthur",
        zh: "李騏維",
        img: "assets/imgs/team/arthur.jpeg",
      },
      {
        en: "Shun-Ting Chang",
        zh: "張舜婷",
        img: "assets/imgs/team/shunting.JPG",
      },
      {
        en: "Yu-Min Wang",
        zh: "王昱閔",
        img: "assets/imgs/team/yumin.jpg",
      },
      {
        en: "Yuchen Chiu",
        zh: "邱宇晨",
        img: "assets/imgs/team/yuchen.jpg",
      },
      {
        en: "Yu-Hua Liao",
        zh: "廖宇嬅",
        img: "assets/imgs/team/yuhua.jpg",
      },
      {
        en: "Yu-Chi Chiang",
        zh: "姜語綺",
        img: "assets/imgs/team/yuchi.jpeg",
      },
      {
        en: "Yi-An Chen",
        zh: "陳奕安",
        img: "assets/imgs/team/yian.jpg",
      },
      {
        en: "Yen-Ting Chen",
        zh: "陳彥廷",
        img: "assets/imgs/team/yentingchen.jpg",
      },
    ],

    ra: [
      { en: "Han-Jay Hsu", zh: "許瀚杰", img: "assets/imgs/team/hanjay.jpg" },
    ],

    alumni: [
      { en: "Pei-Chuan Lin", zh: "林培權", img: "assets/imgs/team/pei.jpg" },
      { en: "Ching-Yuan Chen", zh: "陳靖元", img: "assets/imgs/team/chin.png" },
      {
        en: "Chang-Hsien Hsieh",
        zh: "謝昌賢",
        img: "assets/imgs/team/xian.jpg",
      },
      { en: "Debra Liu", zh: "劉采渝", img: "assets/imgs/team/debra.jpg" },
      { en: "Chien-Hung Lee", zh: "李健鴻", img: "assets/imgs/team/hon.png" },
      { en: "Li-Ming Chang", zh: "張立明", img: "assets/imgs/team/lm.jpg" },
      { en: "Shang-Lin Yu", zh: "游尚霖", img: "assets/imgs/team/shan.jpg" },
      { en: "An-Yu Chuang", zh: "莊安鈺", img: "assets/imgs/team/ann.jpeg" },
      { en: "Ryan Wang", zh: "王瑞恩", img: "assets/imgs/team/ryan.jpeg" },
      {
        en: "Li-Ching Chen",
        zh: "陳立晴",
        img: "assets/imgs/team/liching.jpg",
      },
      { en: "Chun-Yi Lee", zh: "李俊逸", img: "assets/imgs/team/yi.png" },
      { en: "Kuan-Ting Kuo", zh: "郭冠廷", img: "assets/imgs/team/kuan.jpg" },
      {
        en: "Li-Cheng Chien",
        zh: "簡立誠",
        img: "assets/imgs/team/licheng.jpg",
      },
      { en: "Yi-Jen Ju", zh: "朱以箴", img: "assets/imgs/team/yijenju.jpeg" },
      { en: "Fang-Chen Tu", zh: "杜方辰", img: "assets/imgs/team/tu.png" },
      { en: "Yuan-Ting Chen", zh: "陳媛婷", img: "assets/imgs/team/ting.jpg" },
      {
        en: "Yun-Yang Huang",
        zh: "黃允暘",
        img: "assets/imgs/team/yunyang.jpg",
      },
      { en: "林雨宣", zh: "", img: "assets/imgs/team/yuhsuan.jpg" },
      { en: "Po-Chun Lin", zh: "林柏均", img: "assets/imgs/team/pochun.jpg" },
      { en: "Shao-Ni Shih", zh: "施少旎", img: "assets/imgs/team/nophoto.png" },
      { en: "Yu-Shu Huang", zh: "黃鈺舒", img: "assets/imgs/team/nophoto.png" },
      {
        en: "Meng-Chien Lin",
        zh: "林孟謙",
        img: "assets/imgs/team/meng_chien_lin.jpg",
      },
      {
        en: "You-Qi Chang-Liao",
        zh: "張廖祐祺",
        img: "assets/imgs/team/liao.jpg",
      },
      { en: "De-Shiuan Chang", zh: "張德萱", img: "assets/imgs/team/de.jpg" },
      {
        en: "Yi-Shiuan Tseng",
        zh: "曾怡瑄",
        img: "assets/imgs/team/yihsuan.jpg",
      },
      { en: "I-Chun Tsai", zh: "蔡怡君", img: "assets/imgs/team/yijun.jpg" },
      { en: "Yi-Chen Chang", zh: "張宜榛", img: "assets/imgs/team/yaka.png" },
      { en: "王筱君", zh: "", img: "assets/imgs/team/xiaojun.jpg" },
      { en: "Angela Kuo", zh: "郭晏昀", img: "assets/imgs/team/yianyun.jpeg" },
      {
        en: "Chao-Ju Chen",
        zh: "陳昭汝",
        img: "assets/imgs/team/chaorui.jpeg",
      },
      { en: "黃筠蘋", zh: "", img: "assets/imgs/team/yunpin.png" },
      { en: "蕭皓隆", zh: "", img: "assets/imgs/team/hao.jpg" },
      { en: "彭馨屏", zh: "", img: "assets/imgs/team/xinpin.jpeg" },
      { en: "Zih-Jyun Lin", zh: "林子竣", img: "assets/imgs/team/zih.jpg" },
      { en: "Kevin Richardson", zh: "", img: "assets/imgs/team/kevin.jpg" },
      { en: "Kevin Karnadi", zh: "", img: "assets/imgs/team/karna.jpg" },
      { en: "Chia-En Lu", zh: "呂佳恩", img: "assets/imgs/team/chiaen.jpg" },
      { en: "Audrey Chung", zh: "", img: "assets/imgs/team/Audrey Chung.jpg" },
      { en: "Ivan Lim", zh: "林家合", img: "assets/imgs/team/ivan.jpeg" },
      { en: "Chia-Yun Lee", zh: "李佳芸", img: "assets/imgs/team/chiayun.jpg" },
      { en: "Venesia", zh: "邱琬晶", img: "assets/imgs/team/venesia.jpg" },
      { en: "JungWoo Nam", zh: "南政佑", img: "assets/imgs/team/jungwoo.jpeg" },
      { en: "Yi-Ju Chen", zh: "陳怡汝", img: "assets/imgs/team/lulu.jpeg" },
      { en: "Enchi Chen", zh: "陳恩琦", img: "assets/imgs/team/enchi.png" },
      { en: "Bao-Hsuan Huang", zh: "黃寶萱", img: "assets/imgs/team/bao.jpg" },
      {
        en: "Hsi-Chen Wang",
        zh: "王熙貞",
        img: "assets/imgs/team/Hsi-Chen.jpg",
      },
      { en: "Ivy Lin", zh: "林亞葶", img: "assets/imgs/team/Ivy.jpg" },
      {
        en: "Chia-Suan Yu",
        zh: "余佳軒",
        img: "assets/imgs/team/Chia-Suan.jpg",
      },
      { en: "Michelle Grace", zh: "", img: "assets/imgs/team/Michelle.jpg" },
      {
        en: "Angeline Aurelia Waly",
        zh: "",
        img: "assets/imgs/team/Angeline.jpg",
      },
      { en: "Felix Anthony", zh: "張偉漢", img: "assets/imgs/team/Felix.jpg" },
      { en: "Jill Chao", zh: "趙婕宇", img: "assets/imgs/team/Jill.jpg" },
      { en: "Chin-Wei Huang", zh: "黃謹緯", img: "assets/imgs/team/wei.jpeg" },
      { en: "Ya-Hsi Chang", zh: "張亞錫", img: "assets/imgs/team/yahsi.JPG" },
      { en: "Grace Chan", zh: "曾微絲", img: "assets/imgs/team/grace.JPG" },
      { en: "Pei-Lien Wu", zh: "吳佩蓮", img: "assets/imgs/team/peilien.jpg" },
      {
        en: "Chen-Ying Chien",
        zh: "簡辰穎",
        img: "assets/imgs/team/chenying.jpg",
      },
      { en: "Eric Mao", zh: "毛柏毅", img: "assets/imgs/team/Eric Mao.jpg" },
      {
        en: "Achita Chitraphan",
        zh: "曾裕興",
        img: "assets/imgs/team/Achita Chitraphan.jpg",
      },
      { en: "Stephanie", zh: "陳姵妏", img: "assets/imgs/team/Stephanie.png" },
      {
        en: "Nattapat Ittikosil",
        zh: "許裕華",
        img: "assets/imgs/team/Nattapat Ittikosil.png",
      },
      { en: "Joan Tsai", zh: "蔡杰恩", img: "assets/imgs/team/Joan Tsai.jpg" },
      {
        en: "Nico Alexander Malik Oei",
        zh: "黃子振",
        img: "assets/imgs/team/Nico Alexander Malik Oei.jpg",
      },
      { en: "Tobby", zh: "簡聖祐", img: "assets/imgs/team/Tobby.jpg" },
      {
        en: "Yi-Ning Chang",
        zh: "張以寧",
        img: "assets/imgs/team/Yi-Ning Chang.jpg",
      },
      {
        en: "Grayson Alroy Liko",
        zh: "莊誌強",
        img: "assets/imgs/team/Grayson Alroy Liko.jpg",
      },
      {
        en: "Brandon Louis Chiender",
        zh: "周遠雄",
        img: "assets/imgs/team/Brandon Louis Chiender.png",
      },
      {
        en: "Cappi Wong",
        zh: "黃少鋒",
        img: "assets/imgs/team/Cappi Wong.jpg",
      },
      {
        en: "Jonathan Sutedjo",
        zh: "鄭安良",
        img: "assets/imgs/team/Jonathan Sutedjo.jpg",
      },
      {
        en: "Vaness Asman",
        zh: "張嘉成",
        img: "assets/imgs/team/Vaness Asman.jpg",
      },
      { en: "Atticus", zh: "林家宇", img: "assets/imgs/team/Atticus.jpg" },
      {
        en: "Shem Lawalata",
        zh: "劉天恩",
        img: "assets/imgs/team/Shem Lawalata.jpg",
      },
      {
        en: "Richard Kesumah",
        zh: "郭汶翰",
        img: "assets/imgs/team/Richard Kesumah.jpg",
      },
    ],
  };

  function createMemberCard(member) {
    const zhHtml = member.zh
      ? `<p class="team-name-zh" lang="zh-TW">${member.zh}</p>`
      : "";

    return `
      <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6">
        <div class="team-card">
          <div class="team-photo-wrapper">
            <img
              class="team-photo"
              src="${member.img}"
              alt="${member.en}"
              loading="lazy"
              decoding="async"
              onerror="this.onerror=null;this.src='assets/imgs/team/nophoto.png';"
            >
          </div>
          <div class="team-card-body">
            <h6 class="team-name-en">${member.en}</h6>
            ${zhHtml}
          </div>
        </div>
      </div>
    `;
  }

  function renderMembers(targetId, members) {
    const container = document.getElementById(targetId);
    if (!container) return;
    container.innerHTML = members.map(createMemberCard).join("");
  }

  renderMembers("pi-list", teamData.pi);
  renderMembers("phd-list", teamData.phd);
  renderMembers("graduate-list", teamData.graduate);
  renderMembers("undergraduate-list", teamData.undergraduate);
  renderMembers("ra-list", teamData.ra);
  renderMembers("alumni-list", teamData.alumni);
});

/* =========================
   Scroll Progress Bar
========================= */
(function () {
  var bar = document.getElementById("scroll-progress");
  if (!bar) return;

  var ticking = false;
  function updateBar() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + "%";
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(updateBar);
        ticking = true;
      }
    },
    { passive: true },
  );
})();

/* =========================
   Nav Click-to-Open
========================= */
(function () {
  var dropdowns = Array.prototype.slice.call(
    document.querySelectorAll(".custom-navbar .nav-item.has-dropdown"),
  );

  function closeAll() {
    dropdowns.forEach(function (item) {
      item.classList.remove("is-open");
      var trigger = item.querySelector(".nav-link");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
  }

  dropdowns.forEach(function (item) {
    var trigger = item.querySelector(".nav-link");
    if (!trigger) return;

    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var isOpen = item.classList.contains("is-open");
      closeAll();
      if (!isOpen) {
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });

    var panel = item.querySelector(".dropdown-panel");
    if (panel) {
      panel.addEventListener("click", function (e) {
        var link = e.target.closest("a[href]");
        if (!link) return;
        closeAll();
        var hash = link.getAttribute("href");
        if (hash && hash.charAt(0) === "#") {
          e.preventDefault();
          var target = document.querySelector(hash);
          if (target) {
            var top = target.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: top, behavior: "smooth" });
          }
        }
      });
    }
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".custom-navbar .nav-item.has-dropdown")) {
      closeAll();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      var openTrigger = null;
      dropdowns.forEach(function (item) {
        if (item.classList.contains("is-open"))
          openTrigger = item.querySelector(".nav-link");
      });
      closeAll();
      if (openTrigger) openTrigger.focus();
    }
  });
})();

/* =========================
   Album Archive
========================= */
(function () {
  var pageSize = 9;
  var albumData = [
    {
      year: "2026",
      src: "assets/imgs/album/photo32.jpg",
      alt: "2026 AAAI at Singapore",
      caption: "2026 AAAI @ Singapore",
    },
    {
      year: "2025",
      src: "assets/imgs/album/photo31.jpg",
      alt: "2025 Hiking",
      caption: "2025 Hiking",
    },
    {
      year: "2025",
      src: "assets/imgs/album/photo30.jpg",
      alt: "2025 Banquet 2",
      caption: "2025 Banquet 2",
    },
    {
      year: "2025",
      src: "assets/imgs/album/photo29.jpg",
      alt: "2025 Teacher's Day",
      caption: "2025 Teacher's Day",
    },
    {
      year: "2025",
      src: "assets/imgs/album/photo28.jpg",
      alt: "First Place at Health AI Datathon 2025 in Atlanta",
      caption: "First Place at Health AI DATATHON '25 @ Atlanta",
    },
    {
      year: "2025",
      src: "assets/imgs/album/photo27.jpg",
      alt: "2025 Banquet 1",
      caption: "2025 Banquet 1",
    },
    {
      year: "2025",
      src: "assets/imgs/album/photo26.jpg",
      alt: "2025 Graduation",
      caption: "2025 Graduation!",
    },
    {
      year: "2025",
      src: "assets/imgs/album/photo25.jpg",
      alt: "2025 Graduation",
      caption: "2025 Graduation!",
    },
    {
      year: "2025",
      src: "assets/imgs/album/photo24.jpg",
      alt: "2025 Graduation",
      caption: "2025 Graduation!",
    },
    {
      year: "2024",
      src: "assets/imgs/album/photo23.jpg",
      alt: "TSECC Datathon First Place",
      caption: "TSECC Datathon First Place",
    },
    {
      year: "2024",
      src: "assets/imgs/album/photo22.jpg",
      alt: "TSECC Datathon Third Place",
      caption: "TSECC Datathon Third Place",
    },
    {
      year: "2024",
      src: "assets/imgs/album/photo21.jpg",
      alt: "TSECC Datathon Best Team Award",
      caption: "TSECC Datathon Best Team Award",
    },
    {
      year: "2024",
      src: "assets/imgs/album/photo20.jpg",
      alt: "TSECC Taiwan Datathon 2024",
      caption: "TSECC Taiwan Datathon 2024",
    },
    {
      year: "2024",
      src: "assets/imgs/album/photo19.jpg",
      alt: "2024 Banquet 2",
      caption: "2024 Banquet 2",
    },
    {
      year: "2024",
      src: "assets/imgs/album/photo18.jpg",
      alt: "2024 EMBS in Orlando Florida",
      caption: "2024 EMBS @ Orlando, Florida",
    },
    {
      year: "2024",
      src: "assets/imgs/album/photo17.JPG",
      alt: "2024 Graduation",
      caption: "2024 Graduation!",
    },
    {
      year: "2024",
      src: "assets/imgs/album/photo16.jpg",
      alt: "2024 Graduation",
      caption: "2024 Graduation!",
    },
    {
      year: "2024",
      src: "assets/imgs/album/photo15.jpg",
      alt: "2024 Graduation",
      caption: "2024 Graduation!",
    },
    {
      year: "2024",
      src: "assets/imgs/album/photo14.jpg",
      alt: "2024 ICASSP in Korea",
      caption: "2024 ICASSP @ Korea",
    },
    {
      year: "2024",
      src: "assets/imgs/album/photo13.jpg",
      alt: "2024 ICASSP in Korea",
      caption: "2024 ICASSP @ Korea",
    },
    {
      year: "2024",
      src: "assets/imgs/album/photo11.jpg",
      alt: "2024 Birthday celebration",
      caption: "2024 Birthday Celebration!",
    },
    {
      year: "2024",
      src: "assets/imgs/album/photo10.jpg",
      alt: "2024 Banquet 1",
      caption: "2024 Banquet 1",
    },
    {
      year: "2023",
      src: "assets/imgs/album/photo9.jpg",
      alt: "2023 Banquet 3",
      caption: "2023 Banquet 3",
    },
    {
      year: "2023",
      src: "assets/imgs/album/photo6.JPG",
      alt: "2023 Banquet 2",
      caption: "2023 Banquet 2",
    },
    {
      year: "2023",
      src: "assets/imgs/album/photo7.JPG",
      alt: "2023 Graduation",
      caption: "2023 Graduation!",
    },
    {
      year: "2023",
      src: "assets/imgs/album/photo0.jpg",
      alt: "2023 Banquet 1",
      caption: "2023 Banquet 1",
    },
    {
      year: "2022",
      src: "assets/imgs/album/photo8.jpg",
      alt: "2022 September Banquet",
      caption: "2022.09 Banquet",
    },
    {
      year: "2022",
      src: "assets/imgs/album/photo1.png",
      alt: "2022 Summer NTHU HMIers at MIT LCP",
      caption: "2022 Summer NTHU HMIers at MIT LCP",
    },
    {
      year: "2022",
      src: "assets/imgs/album/photo2.jpg",
      alt: "2022 Graduation",
      caption: "2022 Graduation!",
    },
    {
      year: "2022",
      src: "assets/imgs/album/photo3.jpg",
      alt: "2022 January Year end banquet",
      caption: "2022.01 Year End Banquet",
    },
    {
      year: "2021",
      src: "assets/imgs/album/photo4.jpg",
      alt: "2021 January Year end banquet",
      caption: "2021.01 Year End Banquet",
    },
    {
      year: "2020",
      src: "assets/imgs/album/photo5.jpg",
      alt: "2020 September Teacher's Day",
      caption: "2020.09 Teacher's Day",
    },
  ];

  var archiveEl = document.getElementById("albumArchive");
  var loadMoreBtn = document.querySelector(".album-load-more");
  var lightbox = document.querySelector(".album-lightbox");
  var lightboxImage = document.querySelector(".album-lightbox-image");
  var lightboxCaption = document.querySelector(".album-lightbox-caption");
  var lightboxCount = document.querySelector(".album-lightbox-count");
  var prevBtn = document.querySelector(".album-lightbox-prev");
  var nextBtn = document.querySelector(".album-lightbox-next");

  if (!archiveEl) return;

  var activeYear = null;
  var activePanel = null;
  var visibleLimit = pageSize;
  var currentItems = [];
  var currentIndex = 0;
  var lightboxOpener = null;

  // Derive ordered unique years, explicitly sorted descending
  var seen = {};
  albumData.forEach(function (item) {
    seen[item.year] = true;
  });
  var years = Object.keys(seen).sort(function (a, b) {
    return b - a;
  });

  var recentYears = years.slice(0, 3);
  var olderYears = years.slice(3);

  // Build and append a single archive row
  function buildRow(year) {
    var row = document.createElement("div");
    row.className = "archive-row";
    row.dataset.year = year;
    row.id = "arc-" + year;
    row.innerHTML = [
      '<button class="archive-btn" type="button"',
      ' aria-expanded="false" aria-controls="arcpanel-' + year + '">',
      '<span class="archive-year">' + year + "</span>",
      '<span class="archive-chevron" aria-hidden="true">▾</span>',
      "</button>",
      '<div class="archive-panel" id="arcpanel-' + year + '" hidden>',
      '<div class="row justify-content-center g-3 archive-grid"></div>',
      "</div>",
    ].join("");
    archiveEl.appendChild(row);

    row.querySelector(".archive-btn").addEventListener("click", function () {
      if (activeYear === year) {
        closeYear();
      } else {
        if (activeYear) closeYear();
        openYear(year, row);
      }
    });

    return row;
  }

  // Render recent years
  recentYears.forEach(buildRow);

  // "View older archives" toggle
  var olderToggle = null;
  if (olderYears.length > 0) {
    olderToggle = document.createElement("button");
    olderToggle.className = "archive-older-toggle";
    olderToggle.type = "button";
    olderToggle.textContent = "View older archives →";
    archiveEl.appendChild(olderToggle);

    olderToggle.addEventListener("click", function () {
      olderToggle.hidden = true;
      olderYears.forEach(buildRow);
    });
  }

  // Photo item factory
  function createPhotoItem(item) {
    var col = document.createElement("div");
    col.className = "col-xl-4 col-md-6";
    col.innerHTML = [
      '<figure class="album-card" role="button" tabindex="0"',
      ' aria-label="">',
      '<div class="album-img-wrap">',
      '<img src="" alt="" loading="lazy" decoding="async">',
      "</div>",
      "<figcaption></figcaption>",
      "</figure>",
    ].join("");
    var figure = col.querySelector("figure");
    var img = col.querySelector("img");
    var caption = col.querySelector("figcaption");
    figure.setAttribute("aria-label", "Open " + item.caption);
    img.setAttribute("src", item.src);
    img.setAttribute("alt", item.alt);
    caption.textContent = item.caption;
    var card = col.querySelector(".album-card");
    card.addEventListener("click", function () {
      var idx = currentItems.indexOf(item);
      if (idx !== -1) openLightbox(idx);
    });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        var idx = currentItems.indexOf(item);
        if (idx !== -1) openLightbox(idx);
      }
    });
    return col;
  }

  function renderPhotos() {
    if (!activePanel) return;
    var yearItems = albumData.filter(function (item) {
      return item.year === activeYear;
    });
    var visible = yearItems.slice(0, visibleLimit);
    currentItems = visible;
    var grid = activePanel.querySelector(".archive-grid");
    grid.innerHTML = "";
    visible.forEach(function (item) {
      grid.appendChild(createPhotoItem(item));
    });
    if (loadMoreBtn) {
      loadMoreBtn.hidden = visibleLimit >= yearItems.length;
    }
  }

  function openYear(year, row) {
    activeYear = year;
    visibleLimit = pageSize;
    activePanel = row.querySelector(".archive-panel");
    row.classList.add("open");
    row.querySelector(".archive-btn").setAttribute("aria-expanded", "true");
    activePanel.hidden = false;
    renderPhotos();
  }

  function closeYear() {
    if (!activeYear) return;
    var row = document.getElementById("arc-" + activeYear);
    if (row) {
      row.classList.remove("open");
      row.querySelector(".archive-btn").setAttribute("aria-expanded", "false");
      var panel = row.querySelector(".archive-panel");
      if (panel) {
        panel.hidden = true;
        var grid = panel.querySelector(".archive-grid");
        if (grid) grid.innerHTML = "";
      }
    }
    activeYear = null;
    activePanel = null;
    currentItems = [];
    closeLightbox();
    if (loadMoreBtn) loadMoreBtn.hidden = true;
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      visibleLimit += pageSize;
      renderPhotos();
    });
  }

  function openLightbox(index) {
    if (!lightbox || !lightboxImage || !currentItems.length) return;
    lightboxOpener = document.activeElement;
    currentIndex = (index + currentItems.length) % currentItems.length;
    var data = currentItems[currentIndex];
    lightboxImage.setAttribute("src", data.src);
    lightboxImage.setAttribute("alt", data.alt);
    if (lightboxCaption) lightboxCaption.textContent = data.caption;
    if (lightboxCount)
      lightboxCount.textContent =
        currentIndex + 1 + " / " + currentItems.length;
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    var closeBtn = lightbox.querySelector(".album-lightbox-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    if (lightboxImage) lightboxImage.setAttribute("src", "");
    if (lightboxOpener && lightboxOpener.focus) {
      lightboxOpener.focus();
      lightboxOpener = null;
    }
  }

  function showAdjacent(offset) {
    openLightbox(currentIndex + offset);
  }

  if (prevBtn)
    prevBtn.addEventListener("click", function () {
      showAdjacent(-1);
    });
  if (nextBtn)
    nextBtn.addEventListener("click", function () {
      showAdjacent(1);
    });

  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target.closest("[data-lightbox-close]")) closeLightbox();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (!lightbox || lightbox.hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showAdjacent(-1);
    if (event.key === "ArrowRight") showAdjacent(1);
  });
})();

/* =========================
   News Expand
========================= */
(function () {
  var newsItems = document.querySelectorAll("#blog .col-md-6.col-lg-4");
  var expandBtn = document.querySelector(".news-expand-btn");
  if (!newsItems.length || !expandBtn) return;

  for (var i = 3; i < newsItems.length; i++) {
    newsItems[i].classList.add("news-item-hidden");
  }

  if (newsItems.length <= 3) {
    if (expandBtn.parentElement) expandBtn.parentElement.hidden = true;
    return;
  }

  expandBtn.addEventListener("click", function () {
    document.querySelectorAll(".news-item-hidden").forEach(function (el) {
      el.classList.remove("news-item-hidden");
    });
    if (expandBtn.parentElement) expandBtn.parentElement.hidden = true;
  });
})();
