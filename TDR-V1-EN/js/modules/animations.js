CNVS.Animations=function(){var a=SEMICOLON.Core;return{init:function(t){var e,n;return a.getSelector(t,!1,!1).length<1||(a.initFunction({class:"has-plugin-animations",event:"pluginAnimationsReady"}),(t=a.getSelector(t,!1)).length<1)||(e="animated",n=new IntersectionObserver(function(t,u){t.forEach(function(t){var e=t.target,n=e.getAttribute("data-animate"),a=e.getAttribute("data-animate-out"),i=e.getAttribute("data-delay"),s=e.getAttribute("data-delay-out"),o=0,r=3e3,c=n.split(" ");return!!e.closest(".fslider.no-thumbs-animate")||!!e.closest(".swiper-slide")||(o=i?Number(i)+500:500,a&&s&&(r=Number(s)+o),e.classList.contains("animated")||(e.classList.add("not-animated"),0<t.intersectionRatio&&(setTimeout(function(){e.classList.remove("not-animated"),c.forEach(function(t){e.classList.add(t)}),e.classList.add("animated")},o),a)&&setTimeout(function(){c.forEach(function(t){e.classList.remove(t)}),a.split(" ").forEach(function(t){e.classList.add(t)})},r)),void(e.classList.contains("not-animated")||u.unobserve(e)))})}),void[].filter.call(document.querySelectorAll("[data-animate]"),function(t){return!void t.classList.contains(e)}).forEach(function(t){return n.observe(t)}))}}}();