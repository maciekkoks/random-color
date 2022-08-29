const hexTxt = document.getElementById("txt") as HTMLDivElement;
const rgbTxt = document.getElementById("divrgb") as HTMLDivElement;
const nameTxt = document.getElementById("name") as HTMLDivElement;
const moreInfoBtn = document.getElementById("moreinfo") as HTMLButtonElement;
const copyBtn = document.getElementById("copy") as HTMLButtonElement;
const refreshBtn = document.getElementById("refresh") as HTMLButtonElement;
const githubBtn = document.getElementById("github");
const mainContent = document.getElementById("main") as HTMLDivElement;

const back = document.getElementById("back") as HTMLSpanElement;
const forward = document.getElementById("forward") as HTMLSpanElement;

const colorInput = document.getElementById("color_input") as HTMLInputElement;
const historyBtn = document.getElementById("hbutton") as HTMLButtonElement;
const shortcutsBtn = document.getElementById("shortcuts") as HTMLButtonElement;
const darkModeToggle = document.getElementById("dark-mode-toggle") as HTMLButtonElement;
const likeBtn = document.getElementById("fav") as HTMLButtonElement;
const likeIcon = document.getElementById("like") as HTMLButtonElement;
const fullscreenBtn = document.getElementById("fullscreen") as HTMLButtonElement;
const shareBtn = document.getElementById("share") as HTMLButtonElement;
const shareIcon = document.getElementById("shareIcon");
const themeColor = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;

const historyBackToTop = document.getElementById("h-back-to-top") as HTMLButtonElement;

const historyDiv = document.getElementById("history") as HTMLDivElement;
const historyList = document.getElementById("historylist") as HTMLOListElement;
const historyClose = document.getElementById("closeHistory") as HTMLSpanElement;

const popup = document.getElementById("shortcuts-popup") as HTMLDivElement as HTMLDivElement;
const popupClose = document.getElementById("closeShortcuts") as HTMLButtonElement;
const popupDeleteAll = document.getElementById("s-delete") as HTMLButtonElement;
const modalTxt = document.getElementById("modaltext") as HTMLDivElement;

const messageAlert = document.getElementById("alert") as HTMLDivElement;
const alertClose = document.getElementById("closeAlert") as HTMLSpanElement;

let counter: number = 0;
let like: number = 0;

const hexToRgb = (hex: string) => {
  const int = parseInt(hex, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `${r} ${g} ${b}`;
};

const isHexColor = (hex: string) => typeof hex === "string" && hex.length === 6 && !isNaN(Number("0x" + hex));

const loadColor = (hex: string) => {
  document.body.style.backgroundColor = hex;
  document.fgColor = hex;
  hexTxt.innerHTML = hex;
  rgbTxt.innerHTML = `RGB ${hexToRgb(hex.replace("#", ""))}`;
  colorInput.value = hex;
  themeColor.setAttribute("content", hex);
  // document.querySelector(":root").style.setProperty("--color", hex);
};

const main = () => {
  counter++;
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  randomColor = "#" + ("000000" + randomColor).slice(-6);
  loadColor(randomColor);
  console.log(`%c${counter}. | ${hexTxt.textContent} | ${nameTxt.textContent} | RGB ${hexToRgb(hexTxt.textContent.replace("#", ""))}`, `color:${randomColor}`);
  if (counter > 3) {
    historyBackToTop.style.display = "block";
  }
};

mainContent.classList.add("animate__animated", "animate__headShake");
setTimeout(() => {
  mainContent.classList.remove("animate__animated", "animate__headShake");
}, 1000);

window.onblur = () => {
  document.title = `Random Color - ${colorInput.value}`;
}; //title
window.onfocus = () => {
  document.title = "Random Color Tool";
};

messageAlert.style.setProperty("--animate-duration", "0.6s");
const showAlert = (start: number, end: number, emoji: string, text: string) => {
  hideAlert();
  document.getElementById("alertspan").innerHTML = `<span class='alert-emoji'>${emoji}</span> ${text}`;
  messageAlert.style.display = "block";
  messageAlert.classList.add("animate__animated", "animate__fadeInDown");
  messageAlert.addEventListener("animationend", () => {
    messageAlert.classList.remove("animate__animated", "animate__fadeInDown");
    setTimeout(() => {
      messageAlert.classList.add("animate__animated", "animate__fadeOut");
    }, start);
    setTimeout(() => {
      hideAlert();
      messageAlert.classList.remove("animate__animated", "animate__fadeOut");
    }, end);
  });
  popup.classList.remove("show");
};

const hideAlert = () => {
  //hide alert
  messageAlert.style.display = "none";
  messageAlert.classList.remove("animate__animated", "animate__fadeInDown", "animate__faster");
  messageAlert.classList.remove("animate__animated", "animate__fadeOut");
};

let hclrx: Array<string> = [];
const addToHistoryList = () => {
  document.getElementById("historylist").innerHTML +=
    "<li>" +
    "<span id='historyhex' onclick='hclrx.push(this.textContent);changeColorFromHistory();hideAlert()'>" +
    "<img loading=lazy class='hclrimg' src='https://singlecolorimage.com/get/" +
    hexTxt.textContent.replace("#", "") +
    "/25x25'/>" +
    hexTxt.textContent +
    "</span>" +
    " | " +
    nameTxt.textContent +
    "<hr><br></li>";
};

const changeColorFromHistory = () => {
  loadColor(hclrx[hclrx.length - 1]);
  locals();
  urlChange();
};

historyDiv.style.display = "none";

const showHistory = () => {
  historyDiv.style.display === "none" ? (historyDiv.style.display = "block") : (historyDiv.style.display = "none");
};

shortcutsBtn.addEventListener("click", () => {
  popupDeleteAll.style.display = "none";
  historyDiv.style.display = "none";
  popup.className == "shortcuts-popup" ? popup.classList.add("show") : popup.classList.remove("show");

  modalTxt.innerHTML =
    '<h1 class="s-header"><i class="twa twa-lg twa-keyboard"></i> Keyboard Shortcuts</h1><br> <table> <tr> <td> <p class="s-p">Generate Random Color </p> </td> <td><span class="key">R</span></td> </tr> <tr> <td> <p class="s-p">Change Theme Color </p> </td> <td><span class="key">T</span></td> </tr> <tr> <td> <p class="s-p">Copy Text </p> </td> <td><span class="key">C</span></td> </tr> <tr> <td> <p class="s-p">Open Eye Dropper </p> </td> <td><span class="key">P</span></td> </tr> <tr> <td> <p class="s-p">Toggle Fullscreen </p> </td> <td><span class="key">F</span></td> </tr> <tr> <td> <p class="s-p">Show More Info </p> </td> <td><span class="key">M</span></td> </tr> <tr> <td> <p class="s-p">Show History List </p> </td> <td><span class="key">H</span></td> </tr> <td> <p class="s-p">Like Color </p> </td> <td><span class="key">L</span></td> </tr><tr> <td> <p class="s-p">Liked Colors List </p> </td> <td><span class="key">O</span></td> </tr><tr> <td> <p class="s-p">Show Shortcuts </p> </td> <td><span class="key">/</span></td><tr></tr></table>';
});

popupClose.addEventListener("click", () => {
  popup.classList.remove("show");
});

const copyToClipboard = (txt: string) => navigator.clipboard.writeText(txt);

const clrpicker = () => {
  colorInput.addEventListener("input", () => {
    hideAlert();
    loadColor(colorInput.value);
  });
};

if (document.location.search.match(/type=embed/gi)) {
  window.parent.postMessage("resize", "*");
}

darkModeToggle.addEventListener("click", () => {
  hideAlert();
  popup.classList.remove("show");
});

let rpt: number = 0;

colorInput.addEventListener("change", () => {
  locals();
  urlChange();
  isFavColor();
  like = 0;
});

colorInput.addEventListener("click", () => {
  isFavColor();
  like = 0;
  if (rpt == 0) {
    //bug fix for color picker
    colorInput.click();
    document.getElementById("db").click();
  }
  rpt++;
  clrpicker();
  locals();
  popup.classList.remove("show");
});

historyBtn.addEventListener("click", () => {
  showHistory();
  popup.classList.remove("show");
});

moreInfoBtn.addEventListener("click", () => {
  window.open(`https://www.color-hex.com/color/${colorInput.value.replace("#", "")}`);
  popup.classList.remove("show");
});

setTimeout(() => {
  sessionStorage.setItem("firstSessionClr", colorInput.value);
}, 50);

back.addEventListener("click", () => {
  if (sessionStorage.getItem("firstSessionClr") != colorInput.value) {
    history.go(-1);
    isFavColor();
  }
});
forward.addEventListener("click", () => {
  history.go(1);
  isFavColor();
});

copyBtn.addEventListener("click", () => {
  copyToClipboard(colorInput.value);
  console.log(`Copied to clipboard ${colorInput.value}`);
  document.getElementById("alertspan").innerHTML = `<i class='twa twa-lg twa-clipboard'></i> Copied to clipboard: ${colorInput.value}`;
  showAlert(800, 1300, "<i class='twa twa-lg twa-clipboard'></i>", `Copied to clipboard: ${colorInput.value}`);
});

const removeFromFavs = (arr: Array<string>, item: string) => {
  let newArray = [...arr];
  const index = newArray.findIndex((element) => element === item);
  if (index !== -1) {
    newArray.splice(index, 1);
    return newArray;
  }
};

const uniqueFavs = (array: Array<string>) => array.filter((currentValue: string, index: number, arr: Array<string>) => arr.indexOf(currentValue) === index);

const addToFavs = () => {
  let new_favs = colorInput.value;
  if (localStorage.getItem("favs") == null) {
    localStorage.setItem("favs", "[]");
  }
  let old_favs = JSON.parse(localStorage.getItem("favs"));
  old_favs.push(new_favs);
  localStorage.setItem("favs", JSON.stringify(uniqueFavs(old_favs)));
};

const isFavColor = () => {
  if (localStorage.getItem("favs") !== null) {
    if (localStorage.getItem("favs").includes(hexTxt.textContent)) {
      likeIcon.style.color = "#FF2E78";
      like = 1;
      likeBtn.setAttribute("title", "Remove From Favorites");
    } else {
      likeIcon.style.color = "currentColor";
      like = 2;
      likeBtn.setAttribute("title", "Add To Favorites");
    }
  }
};

const removeItemFromFavs = (item: string) => {
  //remove from favs
  let favsNew = JSON.parse(localStorage.getItem("favs"));
  localStorage.removeItem("favs");
  if (localStorage.getItem("favs") == null) {
    localStorage.setItem("favs", "[]");
  }
  localStorage.setItem("favs", JSON.stringify(removeFromFavs(favsNew, item)));
  isFavColor();
  showAlert(800, 1300, "💔", `Removed from favorites: ${item}`);
};

likeBtn.addEventListener("click", () => {
  addToFavs();
  like++;
  navigator.vibrate(150);
  if (like % 2 != 0) {
    likeIcon.style.color = "#FF2E78";
    document.getElementById("alertspan").innerHTML = `<span class='alert-emoji'>❤️</span> Added to favorites: ${colorInput.value}`;
    showAlert(800, 1300, "❤️", `Added to favorites: ${colorInput.value}`);
    likeIcon.classList.add("fa-beat");
    setTimeout(() => {
      likeIcon.classList.remove("fa-beat");
    }, 2050);
  } else {
    removeItemFromFavs(colorInput.value);
    likeIcon.classList.remove("fa-beat");
    likeIcon.style.color = "currentColor";
    likeIcon.classList.add("fa-shake");
    setTimeout(() => {
      likeIcon.classList.remove("fa-shake");
    }, 600);
  }
});

const locals = () => {
  if (isHexColor(hexTxt.textContent.replace("#", ""))) {
    localStorage.setItem("clr", hexTxt.textContent);
  }
};

if (localStorage.getItem("clr") != null) {
  counter++;
  like = 1;

  loadColor(localStorage.getItem("clr"));
  setTimeout(() => {
    console.log(`%c${counter}. | ${hexTxt.textContent} | ${nameTxt.textContent} | RGB ${hexToRgb(hexTxt.textContent.replace("#", ""))}`, `color:${localStorage.getItem("clr")}`);
    addToHistoryList();
  }, 500);
} else {
  likeBtn.click();
  hideAlert();
  document.getElementById("s-delete").click();
  likeBtn.click();
  hideAlert();
  main();
  setTimeout(() => {
    addToHistoryList();
  }, 800);
  like++;
}
locals();

let darkMode = localStorage.getItem("darkMode");
const enableDarkMode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkMode", "enabled");
};
const disableDarkMode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkMode", null);
};
if (darkMode === "enabled") {
  enableDarkMode();
  console.log("%cDarkmode Enabled! 🌙", "color:#bd9ff5;");
}
darkModeToggle.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
    enableDarkMode();
    console.log("%cDarkmode Enabled! 🌙", "color:#bd9ff5;");
    showAlert(800, 1300, "🌙", "Darkmode Enabled!");
  } else {
    disableDarkMode();
    console.log("%cDarkmode Disabled! ☀️", "color:#bd9ff5;");
    showAlert(800, 1300, "☀️", "Darkmode Disabled!");
    document.querySelector('meta[name="theme-color"]').setAttribute("content", colorInput.value);
  }
});

const delClick = () => {
  setTimeout(() => {
    history.back();
  }, 25);
  setTimeout(() => {
    document.getElementById("favlist").click();
  }, 50);
};

let favsChangeClr: any = null;
document.getElementById("favlist").addEventListener("click", () => {
  hideAlert();
  document.getElementById("history").style.display = "none";
  const favsarr = JSON.parse(localStorage.getItem("favs"));
  popup.className == "shortcuts-popup" ? popup.classList.add("show") : popup.classList.remove("show");
  document.getElementById("modaltext").innerHTML = `<h1 class='favsheader' style=cursor:default><i class='twa twa-1x twa-artist-palette' style='cursor:default'></i> Your Favourite Colors List</h1></br><h1 class='favsheader' style='font-size:20px'>Liked Colors:
    ${favsarr.length}
    </h1>`;
  const ul = document.createElement("div");
  ul.setAttribute("style", "cursor:default");
  document.getElementById("modaltext").appendChild(ul);
  favsarr.forEach((item: number) => {
    let p = document.createElement("p");
    const del = `<i id="delFromFavs" onclick="removeItemFromFavs('${item}');delClick()" title="Delete From Favs: ${item}" class="fa-solid fa-trash-can fa-sm"></i>`;
    const img = `<img loading='lazy' class='favsimg' align='left' src='https://singlecolorimage.com/get/${item}/29x44'/>`.replace("#", "");
    p.setAttribute("id", "favsli");
    ul.appendChild(p);
    //@ts-ignore
    p.innerHTML += `${img}<div style="margin-left:65px">${item}</br>${del} <span class='favsclrname'>${ntc.name(item)[1]}</span></div>`;
    p.setAttribute("onclick", "favsChangeClr = this.textContent.split(' ')[0];ChangeToFav()");
    //@ts-ignore
    p.setAttribute("title", `Change Color To: ${item} (${ntc.name(item)[1]})`);
  });
  const delAll = document.getElementById("s-delete");
  favsarr.length > 0 ? (delAll.style.display = "block") : (delAll.style.display = "none");
  delAll.addEventListener("click", () => {
    like = 2;
    popup.classList.remove("show");
    likeIcon.style.color = "currentColor";
    localStorage.setItem("favs", "[]");
  });
});

const ChangeToFav = () => {
  popup.classList.remove("show");
  loadColor(favsChangeClr);
  locals();
  urlChange();
};

refreshBtn.addEventListener("click", () => {
  setTimeout(() => {
    addToHistoryList();
  }, 100);
  main();
  hideAlert();
  locals();
  urlChange();
  popup.classList.remove("show");
  like = 0;
});

githubBtn.addEventListener("click", () => {
  window.open("https://github.com/maciekt07", "_blank");
  popup.classList.remove("show");
});

historyClose.addEventListener("click", () => {
  showHistory();
});

historyBackToTop.addEventListener("click", () => {
  document.getElementById("h").scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

alertClose.addEventListener("click", () => {
  hideAlert();
});

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    if (window.screen.width > 1024) {
      showAlert(800, 1300, "<i class='twa twa-lg twa-desktop-computer'></i>", "Fullscreen Enabled!");
      console.log("Fullscreen enabled");
    }
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
    if (window.screen.width > 1024) {
      showAlert(800, 1300, "<i class='twa twa-lg twa-desktop-computer'></i>", "Fullscreen Disabled!");
      console.log("Fullscreen disabled");
    }
  }
};
fullscreenBtn.addEventListener("click", () => {
  toggleFullScreen();
});

shareBtn.addEventListener("click", async () => {
  navigator.vibrate(150);
  shareIcon.classList.add("fa-flip");
  shareIcon.style.color = "#48b4ea";
  setTimeout(() => {
    shareIcon.classList.remove("fa-flip");
    shareIcon.style.color = "var(--foreground)";
  }, 2000);

  let shareData = {
    title: "Random Color Tool By maciekt07",
    text: `Check out this cool color: ${colorInput.value}`,
    url: location.toString(),
  };
  try {
    await navigator.share(shareData);
    console.log("Shared color successfully");
  } catch (err) {
    console.log(`Share Error: ${err}`);
    if (err != "AbortError: Share canceled") {
      copyToClipboard(location.toString());
      showAlert(800, 1300, "<i class='twa twa-lg twa-clipboard'></i>", "Copied URL to clipboard!");
    }
  }
});
const appUrl = `${location.origin}/`;
const urlChange = () => {
  (<any>window).location = `${appUrl}?${colorInput.value}`;
};
const urlError = () => {
  //change url to previous
  (<any>window).location = `${appUrl}?${localStorage.getItem("clr")}`;
  setTimeout(() => {
    console.error("ERROR: Invalid Color in URL");
    showAlert(800, 1300, "❌", "Invalid Color in URL");
  }, 300);
};

const urlLoad = () => {
  const urlhex = location.toString().replace(`${appUrl}?`, "").toLowerCase();
  const urlhexnumber = urlhex.replace("#", "").toLowerCase();
  if (isHexColor(urlhexnumber)) {
    loadColor(urlhex);
    locals();
    urlChange();
    isFavColor();
  } else {
    urlError();
  }
};
urlLoad();

if ((<any>window).location != `${appUrl}?${colorInput.value}`) {
  urlError();
}

window.addEventListener("hashchange", () => {
  urlLoad();
  isFavColor();
});

document.addEventListener("keyup", (event) => {
  if (event.keyCode == 80) {
    //@ts-ignore
    const picker = new EyeDropper();
    picker
      .open()
      .then((result: any) => {
        loadColor(result.sRGBHex);
        urlChange();
      })
      .catch((error: string) => {
        console.log(error);
        showAlert(800, 1300, "🚫", "Your browser does not support eye dropper.");
      });
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((reg) => console.log("Service Worker: Registered"))
      .catch((err) => console.log(`Service Worker: Error ${err}`));
  });
}

window.addEventListener("offline", () => {
  showAlert(800, 1300, "📴", `You're offline`);
  window.addEventListener("online", () => {
    showAlert(800, 1300, "🌐", `You're online again`);
  });
});