(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{182:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(191),l=t(193),s=t(188),i=t(239),o=t(238),u=function(e){var a=e.slug,t=e.short,n=e.title,c=e.tags;return r.a.createElement(i.a,{className:"blog-post-preview card"},r.a.createElement(i.a.Body,null,r.a.createElement(i.a.Title,null,n),r.a.createElement("div",{className:"tags"},c.map(function(e){return r.a.createElement(o.a,{variant:"secondary mr-2"},e)})),r.a.createElement(i.a.Text,null,t),r.a.createElement(s.a,{to:"blog/"+a,className:"btn btn-primary"},"To Post")))},m=t(242),d=t(243);a.default=function(e){var a=e.pageContext.allBlogPosts;return r.a.createElement(c.a,null,r.a.createElement(l.a,null),r.a.createElement("section",{className:"blog"},r.a.createElement(m.a,null,a.map(function(e){return r.a.createElement(d.a,{xs:12,sm:6,md:4,key:e.slug},r.a.createElement(u,e))}))))}},186:function(e,a,t){var n;e.exports=(n=t(192))&&n.default||n},188:function(e,a,t){"use strict";var n=t(0),r=t.n(n),c=t(12),l=t.n(c),s=t(57),i=t.n(s);t.d(a,"a",function(){return i.a});t(186),r.a.createContext({});l.a.object,l.a.string.isRequired,l.a.func,l.a.func},191:function(e,a,t){"use strict";var n=t(0),r=t.n(n),c=t(188),l=t(241),s=t(242),i=t(243),o=t(245);a.a=function(e){var a=e.children,t=e.footerScripts,n=e.className;return r.a.createElement(l.a,{className:n},r.a.createElement(s.a,{className:"no-print"},r.a.createElement(i.a,null,r.a.createElement(o.a,{className:"justify-content-start",activeKey:"/"},r.a.createElement(o.a.Item,null,r.a.createElement(c.a,{className:"nav-link",to:"/"},r.a.createElement("h3",null,"Princess Challenges")))),r.a.createElement(o.a,{className:"justify-content-end",activeKey:"/"},r.a.createElement(o.a.Item,null,r.a.createElement(c.a,{className:"nav-link",to:"/challenges/"},"Challenges")),r.a.createElement(o.a.Item,null,r.a.createElement(c.a,{className:"nav-link",to:"/blog/"},"Blog")),r.a.createElement(o.a.Item,null,r.a.createElement(c.a,{className:"nav-link",to:"/contact/"},"Contact"))))),a,t&&t.map(function(e){return r.a.createElement("script",{key:e,async:!0,defer:!0,src:e})}))}},192:function(e,a,t){"use strict";t.r(a);t(17);var n=t(0),r=t.n(n),c=t(12),l=t.n(c),s=t(82),i=function(e){var a=e.location,t=e.pageResources;return t?r.a.createElement(s.a,Object.assign({location:a,pageResources:t},t.json)):null};i.propTypes={location:l.a.shape({pathname:l.a.string.isRequired}).isRequired},a.default=i},193:function(e,a,t){"use strict";var n=t(0),r=t.n(n);a.a=function(e){e.children;return r.a.createElement("h1",null,"This is a header.")}},196:function(e,a,t){"use strict";t(13),a.__esModule=!0,a.default=function(e){return e.replace(n,function(e,a){return a.toUpperCase()})};var n=/-(.)/g;e.exports=a.default},238:function(e,a,t){"use strict";var n=t(185),r=t(187),c=t(184),l=t.n(c),s=t(0),i=t.n(s),o=t(189),u=i.a.forwardRef(function(e,a){var t=e.bsPrefix,c=e.variant,s=e.pill,u=e.className,m=Object(r.a)(e,["bsPrefix","variant","pill","className"]),d=Object(o.b)(t,"badge");return i.a.createElement("span",Object(n.a)({ref:a},m,{className:l()(u,d,s&&d+"-pill",c&&d+"-"+c)}))});u.displayName="Badge",u.defaultProps={pill:!1},a.a=u},239:function(e,a,t){"use strict";var n=t(185),r=t(187),c=t(184),l=t.n(c),s=t(0),i=t.n(s),o=t(189),u=t(196),m=t.n(u),d=function(e){return e[0].toUpperCase()+m()(e).slice(1)};function f(e,a){var t=void 0===a?{}:a,c=t.displayName,s=void 0===c?d(e):c,u=t.Component,m=void 0===u?"div":u,f=t.defaultProps,p=i.a.forwardRef(function(a,t){var c=a.className,s=a.bsPrefix,u=a.as,d=void 0===u?m:u,f=Object(r.a)(a,["className","bsPrefix","as"]),p=Object(o.b)(s,e);return i.a.createElement(d,Object(n.a)({ref:t,className:l()(c,p)},f))});return p.defaultProps=f,p.displayName=s,p}var p=function(e){return i.a.forwardRef(function(a,t){return i.a.createElement("div",Object(n.a)({},a,{ref:t,className:l()(a.className,e)}))})},b=t(201),v=i.a.forwardRef(function(e,a){var t=e.bsPrefix,c=e.className,s=e.variant,u=e.as,m=void 0===u?"img":u,d=Object(r.a)(e,["bsPrefix","className","variant","as"]),f=Object(o.b)(t,"card-img");return i.a.createElement(m,Object(n.a)({ref:a,className:l()(s?f+"-"+s:f,c)},d))});v.displayName="CardImg",v.defaultProps={variant:null};var E=v,N=p("h5"),g=p("h6"),y=f("card-body"),x=i.a.forwardRef(function(e,a){var t=e.bsPrefix,c=e.className,u=e.bg,m=e.text,d=e.border,f=e.body,p=e.children,v=e.as,E=void 0===v?"div":v,N=Object(r.a)(e,["bsPrefix","className","bg","text","border","body","children","as"]),g=Object(o.b)(t,"card"),x=Object(s.useMemo)(function(){return{cardHeaderBsPrefix:g+"-header"}},[g]);return i.a.createElement(b.a.Provider,{value:x},i.a.createElement(E,Object(n.a)({ref:a},N,{className:l()(c,g,u&&"bg-"+u,m&&"text-"+m,d&&"border-"+d)}),f?i.a.createElement(y,null,p):p))});x.displayName="Card",x.defaultProps={body:!1},x.Img=E,x.Title=f("card-title",{Component:N}),x.Subtitle=f("card-subtitle",{Component:g}),x.Body=y,x.Link=f("card-link",{Component:"a"}),x.Text=f("card-text",{Component:"p"}),x.Header=f("card-header"),x.Footer=f("card-footer"),x.ImgOverlay=f("card-img-overlay");a.a=x}}]);
//# sourceMappingURL=component---src-templates-blog-js-7ad5e173bbef5ba6c36f.js.map