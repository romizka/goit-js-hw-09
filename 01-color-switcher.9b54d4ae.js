const e=document.querySelectorAll("button")[0],t=document.querySelectorAll("button")[1];let l;e.addEventListener("click",(function(){l=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),e.disabled=!0,t.disabled=!1})),t.addEventListener("click",(function(){clearInterval(l),e.disabled=!1,t.disabled=!0}));
//# sourceMappingURL=01-color-switcher.9b54d4ae.js.map