import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */const t=document.querySelector("[data-start]"),r=document.querySelector("[data-stop]");let e;function o(){return`#${Math.floor(Math.random()*16777215).toString(16).padStart(6,0)}`}t.addEventListener("click",n=>{e=setInterval(()=>{document.body.style.backgroundColor=o()},1e3),t.setAttribute("disabled",!0)});r.addEventListener("click",n=>{e!==void 0&&(clearInterval(e),t.removeAttribute("disabled",!1))});
//# sourceMappingURL=commonHelpers.js.map
