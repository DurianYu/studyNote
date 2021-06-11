//网页懒加载lazyloading
//获取图片
var imgs = document.querySelectorAll('img'),
  //获取 浏览器可视区域高度
  H = window.innerHeight;
window.onload = window.onscroll = function() {
  //获取 滚动条滚过的高度
  S = document.documentElement.scrollTop || document.body.scrollTop;
  //。call的首个参数替换forEach左边的空数组,function(对应索引的值，下标索引)
  [].forEach.call(imgs, function(img) {
    if (!img.getAttribute('data-src')) {
      return;
    }
    //getTop(img) 获取图片距离顶部的距离
    if (getTop(img) < (H + S)) {
      img.src = img.getAttribute("data-src");
      img.removeAttribute("data-src");
    }
  });
};
//获取元素距离顶部高度的方法
function getTop(e) {
  var t = e.offsetTop; //真正获取的函数
  while (e = e.offsetParent) {
    t += e.offsetTop;
  }
  return t;
}
// <!-- 文章栏按钮 -->
  var articleBtn = document.getElementById('article-module-tab');
  var allBtn = articleBtn.getElementsByTagName('a');
  // 申请变量获得文章栏下面的所有div标签
  var allContType = document.getElementById('article-module-cont').getElementsByTagName('div');
  allBtn[0].style.color = "#09f";
  allBtn[0].style.borderBottom = "3px solid #09f";

  function articleOver(aBtn) {
    //申请变量获得文章栏下div的data-id的值
    var aId = aBtn.dataset.id;

    for (var i = 0; i < allBtn.length; i++) {
      allContType[i].style.display = "none";
      allContType[aId].style.display = "";
      allBtn[i].style.color = "#222";
      allBtn[i].style.border = "transparent";
      aBtn.style.color = "#09F";
      aBtn.style.borderBottom = "3px solid #09f";
    }
    return aId;
    console.log(1);
  }


// <!-- 日、周榜点击事件 -->
  var dRank = document.getElementById('day-rank');
  var wRank = document.getElementById('week-rank');
  var dayShow = document.getElementById('ranking-box1');
  var weekShow = document.getElementById('ranking-box2');
  showdRank();

  function showdRank() {
    dRank.style.background = 'lightblue';
    dRank.style.color = '#09f';
    wRank.style.background = '';
    wRank.style.color = '';
    dayShow.style.display = "";
    weekShow.style.display = "none";
  }

  function showwRank() {
    wRank.style.background = 'lightblue';
    wRank.style.color = '#09f';
    dRank.style.background = '';
    dRank.style.color = '';
    dayShow.style.display = "none";
    weekShow.style.display = "";
  }

// <!-- 轮播图 -->
  var oBox = document.getElementById('carousel-box');
  var oUl = document.getElementById('inner-box');
  var oRight = document.getElementById('right');
  var oLeft = document.getElementById('left');

  // 使用一个变量设置left的值
  var count = 0;
  var timer = null;
  var target = 0;
  var timer1 = null;
  var i = 0;
  timer = setInterval(autoPlay, 5000);

  function autoPlay() {
    if (target <= -400) {
      count = 0;
      target = -100;
    } else {
      target -= 100;
    }
    running(target);
    btnshow();
  }

  oRight.onclick = function(argument) {
    if (target <= -400) {
      count = 0;
      target = -100;
    } else {
      target -= 100;
    }
    running(target);
    btnshow();
  };

  oLeft.onclick = function(argument) {
    if (target > -100) {
      count -= 400;
      target = -300;
    } else {
      target += 100;
    }
    running(target);
    btnshow();
  };

  btnshow(i);
  //圆点显示部分
  function btnshow() {
    i = -(target / 100);
    i == 4 ? i = 0 : i;
    var oOl = document.getElementById('carousel-ol');
    var oLi = oOl.getElementsByTagName('li');
    for (var j = 0; j < oLi.length; j++) {
      oLi[j].style.background = "";
      oLi[j].style.width = "12px";
    }
    oLi[i].style.background = "#09f";
    oLi[i].style.width = "18px";
  }

  //圆点点击事件
  var oOl = document.getElementById('carousel-ol');
  var oLi = oOl.getElementsByTagName('li');
  for (var j = 0; j < oLi.length; j++) {
    oLi[j].index = j;
    oLi[j].onclick = function() {
      target = -(this.index * 100);
      running(target);
      btnshow();
    };
  }
  // 切换
  function running(target) {
    clearInterval(timer1);
    timer1 = setInterval(autoPlay, 25);

    function autoPlay() {
      if (count == target) {
        clearInterval(timer1);
      } else {
        speed = (target - count) / 6; //计算速度，过速期间的速率
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //ceil上取整，floor下降到最近的整数
        count = count + speed;
        oUl.style.left = count + "%";
      }
    }
  }
  //鼠标移入，清除定时器
  oBox.onmouseover = function() {
    clearInterval(timer);
  };
  //鼠标离开,开始定时器
  oBox.onmouseout = function() {
    timer = setInterval(autoPlay, 5000);
  };

// <!-- login窗口部分 -->
  var Pop = document.getElementById("Pop");
  var lowerScreen = document.getElementById("lowerScreen");
  var btn_x = document.getElementById("btn_x");

  function showPop() {
    Pop.style.display = "inline";
    lowerScreen.style.display = "inline";
  }

  function closePop() {
    Pop.style.display = "";
    lowerScreen.style.display = "";
  }

// <!-- 登陆验证部分 -->
  window.onload = function() {
    var Username = document.getElementById("username");
    var Password = document.getElementById("password");
    var Login = document.getElementById("btn_login");
    // 输入判定
    Login.onclick = function() {
      var uname = Username.value;
      var pword = Password.value;
      if (uname == "") {
        alert("请输入用户名");
      } else if (pword == "") {
        alert("请输入密码");
      } else {
        deliverData(uname, pword);
      }
    };
  };

  //串联数据
  function deliverData(uname, pword) {
    var data = "username=" + uname + "&password=" + pword;
    ajax("get", "Logindata.php", data, function(responseData) {
      alert(responseData);
      //服务器返回success的话就用新页面替换当前页面
      if(responseData == 'success') {
        location.replace("home.html");
      }
    });
  }

  //ajax封装
  function ajax(method, url, data, fn) {
    var xhr = null;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject('Micrisoft.XMLHttp');
    }
    if (method == "get" && data) {
      url += "?" + data;
    }
    //发送请求
    xhr.open(method, url, true);
    if (method == "get") {
      xhr.send();
    } else if (method == "post") {
      xhr.setRequestHeader("content-type", "applicaton/x-www-form-urlencoded");
      xhr.send(data);
    }

    //实时监听
    xhr.onreadystatechange = function() {
      //4请求已完成且响应已经就绪，200服务器响应正常
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
        	//服务器返回信息xhr.responseText
          fn && fn(xhr.responseText);
        } else {
          alert("发生错误，error：" + xhr.statusText);
        }
      }
    };
  }
