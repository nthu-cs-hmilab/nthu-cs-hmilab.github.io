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
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        }
    });
});

/* =========================
   Team Render Script
========================= */

document.addEventListener("DOMContentLoaded", function () {
  const teamData = {
    pi: [
      { en: "Po-Chih Kuo", zh: "郭柏志", img: "assets/imgs/team/prof.jpg" }
    ],

    phd: [
      { en: "Yueh-Chun Liu", zh: "劉岳濬", img: "assets/imgs/team/yuehchun.jpeg" }
    ],

    graduate: [
      { en: "Chao-Hsuan Lin", zh: "林晁璿", img: "assets/imgs/team/ray.jpg" },
      { en: "Wen-Yen Chung", zh: "鍾汶諺", img: "assets/imgs/team/wen.JPG" },
      { en: "Jui-Yun Su", zh: "蘇芮筠", img: "assets/imgs/team/juiyun.jpg" },
      { en: "Yu-Chieh Lin", zh: "林育頡", img: "assets/imgs/team/yuchieh.jpg" },
      { en: "Chien-Hui Su", zh: "蘇芊卉", img: "assets/imgs/team/chienhui.jpg" },
      { en: "Sung-Wei Yu", zh: "游松偉", img: "assets/imgs/team/sungwei.jpg" },
      { en: "Erich Wu", zh: "吳聲宏", img: "assets/imgs/team/Erich_Wu.png" },
      { en: "Shu-Yuu Luo", zh: "駱書宇", img: "assets/imgs/team/Shu-Yuu Luo.jpg" },
      { en: "Hsi-Yu Ho", zh: "何習與", img: "assets/imgs/team/Hsi-Yu Ho.jpg" },
      { en: "Yang-Chen Lin", zh: "林泱辰", img: "assets/imgs/team/yc.jpg" },
      { en: "Wen-Hsuan Lin", zh: "林玟萱", img: "assets/imgs/team/Wen-Hsuan Lin.JPG" },
      { en: "Pin-Shun Wang", zh: "王品舜", img: "assets/imgs/team/Pin-Shun.jpg" },
      { en: "Cathy Hou", zh: "侯凱馨", img: "assets/imgs/team/cathy.jpg" },
      { en: "Yu-Chieh Wu", zh: "吳昱潔", img: "assets/imgs/team/Yu-Chieh.jpg" },
      { en: "Humam Arshad Mustagfirin", zh: "胡紹良", img: "assets/imgs/team/Humam.jpg" },
      { en: "Kai-Sheng Chong", zh: "張凱盛", img: "assets/imgs/team/kaisheng.jpg" },
      { en: "Wen-Ting Chen", zh: "陳玟廷", img: "assets/imgs/team/wenting.jpg" },
      { en: "Hsiang-Ling Hsu", zh: "許香羚", img: "assets/imgs/team/hsiangling.jpg" },
      { en: "Yan-Rong Chen", zh: "陳彥蓉", img: "assets/imgs/team/yan_rong.jpeg" }
    ],

    undergraduate: [
      { en: "Eric Mao", zh: "毛柏毅", img: "assets/imgs/team/Eric Mao.jpg" },
      { en: "Achita Chitraphan", zh: "曾裕興", img: "assets/imgs/team/Achita Chitraphan.jpg" },
      { en: "Stephanie", zh: "陳姵妏", img: "assets/imgs/team/Stephanie.png" },
      { en: "Nattapat Ittikosil", zh: "許裕華", img: "assets/imgs/team/Nattapat Ittikosil.png" },
      { en: "Joan Tsai", zh: "蔡杰恩", img: "assets/imgs/team/Joan Tsai.jpg" },
      { en: "Nico Alexander Malik Oei", zh: "黃子振", img: "assets/imgs/team/Nico Alexander Malik Oei.jpg" },
      { en: "Tobby", zh: "簡聖祐", img: "assets/imgs/team/Tobby.jpg" },
      { en: "Yi-Ning Chang", zh: "張以寧", img: "assets/imgs/team/Yi-Ning Chang.jpg" },
      { en: "Grayson Alroy Liko", zh: "莊誌強", img: "assets/imgs/team/Grayson Alroy Liko.jpg" },
      { en: "Brandon Louis Chiender", zh: "周遠雄", img: "assets/imgs/team/Brandon Louis Chiender.png" },
      { en: "Cappi Wong", zh: "黃少鋒", img: "assets/imgs/team/Cappi Wong.jpg" },
      { en: "Jonathan Sutedjo", zh: "鄭安良", img: "assets/imgs/team/Jonathan Sutedjo.jpg" },
      { en: "Vaness Asman", zh: "張嘉成", img: "assets/imgs/team/Vaness Asman.jpg" },
      { en: "Atticus", zh: "林家宇", img: "assets/imgs/team/Atticus.jpg" },
      { en: "Shem Lawalata", zh: "劉天恩", img: "assets/imgs/team/Shem Lawalata.jpg" },
      { en: "Richard Kesumah", zh: "郭汶翰", img: "assets/imgs/team/Richard Kesumah.jpg" }
    ],

    ra: [
      { en: "Han-Jay Hsu", zh: "許瀚杰", img: "assets/imgs/team/hanjay.jpg" }
    ],

    alumni: [
      { en: "Pei-Chuan Lin", zh: "林培權", img: "assets/imgs/team/pei.jpg" },
      { en: "Ching-Yuan Chen", zh: "陳靖元", img: "assets/imgs/team/chin.png" },
      { en: "Chang-Hsien Hsieh", zh: "謝昌賢", img: "assets/imgs/team/xian.jpg" },
      { en: "Debra Liu", zh: "劉采渝", img: "assets/imgs/team/debra.jpg" },
      { en: "Chien-Hung Lee", zh: "李健鴻", img: "assets/imgs/team/hon.png" },
      { en: "Li-Ming Chang", zh: "張立明", img: "assets/imgs/team/lm.jpg" },
      { en: "Shang-Lin Yu", zh: "游尚霖", img: "assets/imgs/team/shan.jpg" },
      { en: "An-Yu Chuang", zh: "莊安鈺", img: "assets/imgs/team/ann.jpeg" },
      { en: "Ryan Wang", zh: "王瑞恩", img: "assets/imgs/team/ryan.jpeg" },
      { en: "Li-Ching Chen", zh: "陳立晴", img: "assets/imgs/team/liching.jpg" },
      { en: "Chun-Yi Lee", zh: "李俊逸", img: "assets/imgs/team/yi.png" },
      { en: "Kuan-Ting Kuo", zh: "郭冠廷", img: "assets/imgs/team/kuan.jpg" },
      { en: "Li-Cheng Chien", zh: "簡立誠", img: "assets/imgs/team/licheng.jpg" },
      { en: "Yi-Jen Ju", zh: "朱以箴", img: "assets/imgs/team/yijenju.jpeg" },
      { en: "Fang-Chen Tu", zh: "杜方辰", img: "assets/imgs/team/tu.png" },
      { en: "Yuan-Ting Chen", zh: "陳媛婷", img: "assets/imgs/team/ting.jpg" },
      { en: "Yun-Yang Huang", zh: "黃允暘", img: "assets/imgs/team/yunyang.jpg" },
      { en: "林雨宣", zh: "", img: "assets/imgs/team/yuhsuan.jpg" },
      { en: "Po-Chun Lin", zh: "林柏均", img: "assets/imgs/team/pochun.jpg" },
      { en: "Shao-Ni Shih", zh: "施少旎", img: "assets/imgs/team/nophoto.png" },
      { en: "Yu-Shu Huang", zh: "黃鈺舒", img: "assets/imgs/team/nophoto.png" },
      { en: "Meng-Chien Lin", zh: "林孟謙", img: "assets/imgs/team/meng_chien_lin.jpg" },
      { en: "You-Qi Chang-Liao", zh: "張廖祐祺", img: "assets/imgs/team/liao.jpg" },
      { en: "De-Shiuan Chang", zh: "張德萱", img: "assets/imgs/team/de.jpg" },
      { en: "Yi-Shiuan Tseng", zh: "曾怡瑄", img: "assets/imgs/team/yihsuan.jpg" },
      { en: "I-Chun Tsai", zh: "蔡怡君", img: "assets/imgs/team/yijun.jpg" },
      { en: "Yi-Chen Chang", zh: "張宜榛", img: "assets/imgs/team/yaka.png" },
      { en: "王筱君", zh: "", img: "assets/imgs/team/xiaojun.jpg" },
      { en: "Angela Kuo", zh: "郭晏昀", img: "assets/imgs/team/yianyun.jpeg" },
      { en: "Chao-Ju Chen", zh: "陳昭汝", img: "assets/imgs/team/chaorui.jpeg" },
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
      { en: "Hsi-Chen Wang", zh: "王熙貞", img: "assets/imgs/team/Hsi-Chen.jpg" },
      { en: "Ivy Lin", zh: "林亞葶", img: "assets/imgs/team/Ivy.jpg" },
      { en: "Chia-Suan Yu", zh: "余佳軒", img: "assets/imgs/team/Chia-Suan.jpg" },
      { en: "Michelle Grace", zh: "", img: "assets/imgs/team/Michelle.jpg" },
      { en: "Angeline Aurelia Waly", zh: "", img: "assets/imgs/team/Angeline.jpg" },
      { en: "Felix Anthony", zh: "張偉漢", img: "assets/imgs/team/Felix.jpg" },
      { en: "Jill Chao", zh: "趙婕宇", img: "assets/imgs/team/Jill.jpg" },
      { en: "Chin-Wei Huang", zh: "黃謹緯", img: "assets/imgs/team/wei.jpeg" },
      { en: "Ya-Hsi Chang", zh: "張亞錫", img: "assets/imgs/team/yahsi.JPG" },
      { en: "Grace Chan", zh: "曾微絲", img: "assets/imgs/team/grace.JPG" },
      { en: "Pei-Lien Wu", zh: "吳佩蓮", img: "assets/imgs/team/peilien.jpg" },
      { en: "Chen-Ying Chien", zh: "簡辰穎", img: "assets/imgs/team/chenying.jpg" }
    ]
  };

  function createMemberCard(member) {
    const zhHtml = member.zh ? `<p class="team-name-zh">${member.zh}</p>` : "";

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
