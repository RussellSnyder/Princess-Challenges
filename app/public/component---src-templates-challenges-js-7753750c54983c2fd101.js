(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{183:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(190),c=t(193),s=t(188),i=t(211),o=function(e){var a=e.slug,t=e.title,n=e.featuredImage;return r.a.createElement(i.a,{className:"challenge-preview card"},r.a.createElement(i.a.Img,{variant:"top",src:n.url,fluid:"true"}),r.a.createElement(i.a.Body,null,r.a.createElement(i.a.Title,null,t),r.a.createElement(s.a,{to:"challenge/"+a,className:"btn btn-primary"},"To Challenge")))},u=t(213),m=t(214);a.default=function(e){var a=e.pageContext.allChallenges;return r.a.createElement(l.a,null,r.a.createElement(c.a,null),r.a.createElement("section",{className:"challenges"},r.a.createElement(u.a,null,a.map(function(e){return r.a.createElement(m.a,{xs:12,sm:6,md:4,key:e.slug},r.a.createElement(o,e))}))))}},185:function(e,a,t){var n;e.exports=(n=t(191))&&n.default||n},188:function(e,a,t){"use strict";var n=t(0),r=t.n(n),l=t(12),c=t.n(l),s=t(57),i=t.n(s);t.d(a,"a",function(){return i.a});t(185),r.a.createContext({});c.a.object,c.a.string.isRequired,c.a.func,c.a.func},190:function(e,a,t){"use strict";var n=t(0),r=t.n(n),l=t(188),c=t(212),s=t(213),i=t(214),o=t(215);a.a=function(e){var a=e.children,t=e.footerScripts,n=e.className;return r.a.createElement(c.a,{className:n},r.a.createElement(s.a,null,r.a.createElement(i.a,null,r.a.createElement(o.a,{className:"justify-content-start",activeKey:"/"},r.a.createElement(o.a.Item,null,r.a.createElement(l.a,{className:"nav-link",to:"/"},r.a.createElement("h3",null,"Princess Challenges")))),r.a.createElement(o.a,{className:"justify-content-end",activeKey:"/"},r.a.createElement(o.a.Item,null,r.a.createElement(l.a,{className:"nav-link",to:"/challenges/"},"Challenges")),r.a.createElement(o.a.Item,null,r.a.createElement(l.a,{className:"nav-link",to:"/blog/"},"Blog")),r.a.createElement(o.a.Item,null,r.a.createElement(l.a,{className:"nav-link",to:"/contact/"},"Contact"))))),a,t&&t.map(function(e){return r.a.createElement("script",{key:e,async:!0,defer:!0,src:e})}))}},191:function(e,a,t){"use strict";t.r(a);t(16);var n=t(0),r=t.n(n),l=t(12),c=t.n(l),s=t(82),i=function(e){var a=e.location,t=e.pageResources;return t?r.a.createElement(s.a,Object.assign({location:a,pageResources:t},t.json)):null};i.propTypes={location:c.a.shape({pathname:c.a.string.isRequired}).isRequired},a.default=i},193:function(e,a,t){"use strict";var n=t(0),r=t.n(n);a.a=function(e){e.children;return r.a.createElement("h1",null,"This is a header.")}},196:function(e,a,t){"use strict";t(13),a.__esModule=!0,a.default=function(e){return e.replace(n,function(e,a){return a.toUpperCase()})};var n=/-(.)/g;e.exports=a.default},211:function(e,a,t){"use strict";var n=t(184),r=t(186),l=t(187),c=t.n(l),s=t(0),i=t.n(s),o=t(189),u=t(196),m=t.n(u),d=function(e){return e[0].toUpperCase()+m()(e).slice(1)};function f(e,a){var t=void 0===a?{}:a,l=t.displayName,s=void 0===l?d(e):l,u=t.Component,m=void 0===u?"div":u,f=t.defaultProps,v=i.a.forwardRef(function(a,t){var l=a.className,s=a.bsPrefix,u=a.as,d=void 0===u?m:u,f=Object(r.a)(a,["className","bsPrefix","as"]),v=Object(o.b)(s,e);return i.a.createElement(d,Object(n.a)({ref:t,className:c()(l,v)},f))});return v.defaultProps=f,v.displayName=s,v}var v=function(e){return i.a.forwardRef(function(a,t){return i.a.createElement("div",Object(n.a)({},a,{ref:t,className:c()(a.className,e)}))})},p=t(195),b=i.a.forwardRef(function(e,a){var t=e.bsPrefix,l=e.className,s=e.variant,u=e.as,m=void 0===u?"img":u,d=Object(r.a)(e,["bsPrefix","className","variant","as"]),f=Object(o.b)(t,"card-img");return i.a.createElement(m,Object(n.a)({ref:a,className:c()(s?f+"-"+s:f,l)},d))});b.displayName="CardImg",b.defaultProps={variant:null};var E=b,g=v("h5"),N=v("h6"),h=f("card-body"),y=i.a.forwardRef(function(e,a){var t=e.bsPrefix,l=e.className,u=e.bg,m=e.text,d=e.border,f=e.body,v=e.children,b=e.as,E=void 0===b?"div":b,g=Object(r.a)(e,["bsPrefix","className","bg","text","border","body","children","as"]),N=Object(o.b)(t,"card"),y=Object(s.useMemo)(function(){return{cardHeaderBsPrefix:N+"-header"}},[N]);return i.a.createElement(p.a.Provider,{value:y},i.a.createElement(E,Object(n.a)({ref:a},g,{className:c()(l,N,u&&"bg-"+u,m&&"text-"+m,d&&"border-"+d)}),f?i.a.createElement(h,null,v):v))});y.displayName="Card",y.defaultProps={body:!1},y.Img=E,y.Title=f("card-title",{Component:g}),y.Subtitle=f("card-subtitle",{Component:N}),y.Body=h,y.Link=f("card-link",{Component:"a"}),y.Text=f("card-text",{Component:"p"}),y.Header=f("card-header"),y.Footer=f("card-footer"),y.ImgOverlay=f("card-img-overlay");a.a=y}}]);
//# sourceMappingURL=component---src-templates-challenges-js-7753750c54983c2fd101.js.map