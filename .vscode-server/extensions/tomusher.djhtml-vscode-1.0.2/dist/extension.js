(()=>{var t={27:t=>{var e=function(){this.Diff_Timeout=1,this.Diff_EditCost=4,this.Match_Threshold=.5,this.Match_Distance=1e3,this.Patch_DeleteThreshold=.5,this.Patch_Margin=4,this.Match_MaxBits=32},n=-1;e.Diff=function(t,e){return[t,e]},e.prototype.diff_main=function(t,n,i,r){void 0===r&&(r=this.Diff_Timeout<=0?Number.MAX_VALUE:(new Date).getTime()+1e3*this.Diff_Timeout);var s=r;if(null==t||null==n)throw new Error("Null input. (diff_main)");if(t==n)return t?[new e.Diff(0,t)]:[];void 0===i&&(i=!0);var h=i,f=this.diff_commonPrefix(t,n),a=t.substring(0,f);t=t.substring(f),n=n.substring(f),f=this.diff_commonSuffix(t,n);var l=t.substring(t.length-f);t=t.substring(0,t.length-f),n=n.substring(0,n.length-f);var o=this.diff_compute_(t,n,h,s);return a&&o.unshift(new e.Diff(0,a)),l&&o.push(new e.Diff(0,l)),this.diff_cleanupMerge(o),o},e.prototype.diff_compute_=function(t,i,r,s){var h;if(!t)return[new e.Diff(1,i)];if(!i)return[new e.Diff(n,t)];var f=t.length>i.length?t:i,a=t.length>i.length?i:t,l=f.indexOf(a);if(-1!=l)return h=[new e.Diff(1,f.substring(0,l)),new e.Diff(0,a),new e.Diff(1,f.substring(l+a.length))],t.length>i.length&&(h[0][0]=h[2][0]=n),h;if(1==a.length)return[new e.Diff(n,t),new e.Diff(1,i)];var o=this.diff_halfMatch_(t,i);if(o){var g=o[0],c=o[1],u=o[2],d=o[3],p=o[4],_=this.diff_main(g,u,r,s),v=this.diff_main(c,d,r,s);return _.concat([new e.Diff(0,p)],v)}return r&&t.length>100&&i.length>100?this.diff_lineMode_(t,i,s):this.diff_bisect_(t,i,s)},e.prototype.diff_lineMode_=function(t,i,r){var s=this.diff_linesToChars_(t,i);t=s.chars1,i=s.chars2;var h=s.lineArray,f=this.diff_main(t,i,!1,r);this.diff_charsToLines_(f,h),this.diff_cleanupSemantic(f),f.push(new e.Diff(0,""));for(var a=0,l=0,o=0,g="",c="";a<f.length;){switch(f[a][0]){case 1:o++,c+=f[a][1];break;case n:l++,g+=f[a][1];break;case 0:if(l>=1&&o>=1){f.splice(a-l-o,l+o),a=a-l-o;for(var u=this.diff_main(g,c,!1,r),d=u.length-1;d>=0;d--)f.splice(a,0,u[d]);a+=u.length}o=0,l=0,g="",c=""}a++}return f.pop(),f},e.prototype.diff_bisect_=function(t,i,r){for(var s=t.length,h=i.length,f=Math.ceil((s+h)/2),a=f,l=2*f,o=new Array(l),g=new Array(l),c=0;c<l;c++)o[c]=-1,g[c]=-1;o[a+1]=0,g[a+1]=0;for(var u=s-h,d=u%2!=0,p=0,_=0,v=0,b=0,m=0;m<f&&!((new Date).getTime()>r);m++){for(var w=-m+p;w<=m-_;w+=2){for(var x=a+w,M=(A=w==-m||w!=m&&o[x-1]<o[x+1]?o[x+1]:o[x-1]+1)-w;A<s&&M<h&&t.charAt(A)==i.charAt(M);)A++,M++;if(o[x]=A,A>s)_+=2;else if(M>h)p+=2;else if(d&&(E=a+u-w)>=0&&E<l&&-1!=g[E]&&A>=(D=s-g[E]))return this.diff_bisectSplit_(t,i,A,M,r)}for(var y=-m+v;y<=m-b;y+=2){for(var D,E=a+y,P=(D=y==-m||y!=m&&g[E-1]<g[E+1]?g[E+1]:g[E-1]+1)-y;D<s&&P<h&&t.charAt(s-D-1)==i.charAt(h-P-1);)D++,P++;if(g[E]=D,D>s)b+=2;else if(P>h)v+=2;else if(!d){var A;if((x=a+u-y)>=0&&x<l&&-1!=o[x])if(M=a+(A=o[x])-x,A>=(D=s-D))return this.diff_bisectSplit_(t,i,A,M,r)}}}return[new e.Diff(n,t),new e.Diff(1,i)]},e.prototype.diff_bisectSplit_=function(t,e,n,i,r){var s=t.substring(0,n),h=e.substring(0,i),f=t.substring(n),a=e.substring(i),l=this.diff_main(s,h,!1,r),o=this.diff_main(f,a,!1,r);return l.concat(o)},e.prototype.diff_linesToChars_=function(t,e){var n=[],i={};function r(t){for(var e="",r=0,h=-1,f=n.length;h<t.length-1;){-1==(h=t.indexOf("\n",r))&&(h=t.length-1);var a=t.substring(r,h+1);(i.hasOwnProperty?i.hasOwnProperty(a):void 0!==i[a])?e+=String.fromCharCode(i[a]):(f==s&&(a=t.substring(r),h=t.length),e+=String.fromCharCode(f),i[a]=f,n[f++]=a),r=h+1}return e}n[0]="";var s=4e4,h=r(t);return s=65535,{chars1:h,chars2:r(e),lineArray:n}},e.prototype.diff_charsToLines_=function(t,e){for(var n=0;n<t.length;n++){for(var i=t[n][1],r=[],s=0;s<i.length;s++)r[s]=e[i.charCodeAt(s)];t[n][1]=r.join("")}},e.prototype.diff_commonPrefix=function(t,e){if(!t||!e||t.charAt(0)!=e.charAt(0))return 0;for(var n=0,i=Math.min(t.length,e.length),r=i,s=0;n<r;)t.substring(s,r)==e.substring(s,r)?s=n=r:i=r,r=Math.floor((i-n)/2+n);return r},e.prototype.diff_commonSuffix=function(t,e){if(!t||!e||t.charAt(t.length-1)!=e.charAt(e.length-1))return 0;for(var n=0,i=Math.min(t.length,e.length),r=i,s=0;n<r;)t.substring(t.length-r,t.length-s)==e.substring(e.length-r,e.length-s)?s=n=r:i=r,r=Math.floor((i-n)/2+n);return r},e.prototype.diff_commonOverlap_=function(t,e){var n=t.length,i=e.length;if(0==n||0==i)return 0;n>i?t=t.substring(n-i):n<i&&(e=e.substring(0,n));var r=Math.min(n,i);if(t==e)return r;for(var s=0,h=1;;){var f=t.substring(r-h),a=e.indexOf(f);if(-1==a)return s;h+=a,0!=a&&t.substring(r-h)!=e.substring(0,h)||(s=h,h++)}},e.prototype.diff_halfMatch_=function(t,e){if(this.Diff_Timeout<=0)return null;var n=t.length>e.length?t:e,i=t.length>e.length?e:t;if(n.length<4||2*i.length<n.length)return null;var r=this;function s(t,e,n){for(var i,s,h,f,a=t.substring(n,n+Math.floor(t.length/4)),l=-1,o="";-1!=(l=e.indexOf(a,l+1));){var g=r.diff_commonPrefix(t.substring(n),e.substring(l)),c=r.diff_commonSuffix(t.substring(0,n),e.substring(0,l));o.length<c+g&&(o=e.substring(l-c,l)+e.substring(l,l+g),i=t.substring(0,n-c),s=t.substring(n+g),h=e.substring(0,l-c),f=e.substring(l+g))}return 2*o.length>=t.length?[i,s,h,f,o]:null}var h,f,a,l,o,g=s(n,i,Math.ceil(n.length/4)),c=s(n,i,Math.ceil(n.length/2));return g||c?(h=c?g&&g[4].length>c[4].length?g:c:g,t.length>e.length?(f=h[0],a=h[1],l=h[2],o=h[3]):(l=h[0],o=h[1],f=h[2],a=h[3]),[f,a,l,o,h[4]]):null},e.prototype.diff_cleanupSemantic=function(t){for(var i=!1,r=[],s=0,h=null,f=0,a=0,l=0,o=0,g=0;f<t.length;)0==t[f][0]?(r[s++]=f,a=o,l=g,o=0,g=0,h=t[f][1]):(1==t[f][0]?o+=t[f][1].length:g+=t[f][1].length,h&&h.length<=Math.max(a,l)&&h.length<=Math.max(o,g)&&(t.splice(r[s-1],0,new e.Diff(n,h)),t[r[s-1]+1][0]=1,s--,f=--s>0?r[s-1]:-1,a=0,l=0,o=0,g=0,h=null,i=!0)),f++;for(i&&this.diff_cleanupMerge(t),this.diff_cleanupSemanticLossless(t),f=1;f<t.length;){if(t[f-1][0]==n&&1==t[f][0]){var c=t[f-1][1],u=t[f][1],d=this.diff_commonOverlap_(c,u),p=this.diff_commonOverlap_(u,c);d>=p?(d>=c.length/2||d>=u.length/2)&&(t.splice(f,0,new e.Diff(0,u.substring(0,d))),t[f-1][1]=c.substring(0,c.length-d),t[f+1][1]=u.substring(d),f++):(p>=c.length/2||p>=u.length/2)&&(t.splice(f,0,new e.Diff(0,c.substring(0,p))),t[f-1][0]=1,t[f-1][1]=u.substring(0,u.length-p),t[f+1][0]=n,t[f+1][1]=c.substring(p),f++),f++}f++}},e.prototype.diff_cleanupSemanticLossless=function(t){function n(t,n){if(!t||!n)return 6;var i=t.charAt(t.length-1),r=n.charAt(0),s=i.match(e.nonAlphaNumericRegex_),h=r.match(e.nonAlphaNumericRegex_),f=s&&i.match(e.whitespaceRegex_),a=h&&r.match(e.whitespaceRegex_),l=f&&i.match(e.linebreakRegex_),o=a&&r.match(e.linebreakRegex_),g=l&&t.match(e.blanklineEndRegex_),c=o&&n.match(e.blanklineStartRegex_);return g||c?5:l||o?4:s&&!f&&a?3:f||a?2:s||h?1:0}for(var i=1;i<t.length-1;){if(0==t[i-1][0]&&0==t[i+1][0]){var r=t[i-1][1],s=t[i][1],h=t[i+1][1],f=this.diff_commonSuffix(r,s);if(f){var a=s.substring(s.length-f);r=r.substring(0,r.length-f),s=a+s.substring(0,s.length-f),h=a+h}for(var l=r,o=s,g=h,c=n(r,s)+n(s,h);s.charAt(0)===h.charAt(0);){r+=s.charAt(0),s=s.substring(1)+h.charAt(0),h=h.substring(1);var u=n(r,s)+n(s,h);u>=c&&(c=u,l=r,o=s,g=h)}t[i-1][1]!=l&&(l?t[i-1][1]=l:(t.splice(i-1,1),i--),t[i][1]=o,g?t[i+1][1]=g:(t.splice(i+1,1),i--))}i++}},e.nonAlphaNumericRegex_=/[^a-zA-Z0-9]/,e.whitespaceRegex_=/\s/,e.linebreakRegex_=/[\r\n]/,e.blanklineEndRegex_=/\n\r?\n$/,e.blanklineStartRegex_=/^\r?\n\r?\n/,e.prototype.diff_cleanupEfficiency=function(t){for(var i=!1,r=[],s=0,h=null,f=0,a=!1,l=!1,o=!1,g=!1;f<t.length;)0==t[f][0]?(t[f][1].length<this.Diff_EditCost&&(o||g)?(r[s++]=f,a=o,l=g,h=t[f][1]):(s=0,h=null),o=g=!1):(t[f][0]==n?g=!0:o=!0,h&&(a&&l&&o&&g||h.length<this.Diff_EditCost/2&&a+l+o+g==3)&&(t.splice(r[s-1],0,new e.Diff(n,h)),t[r[s-1]+1][0]=1,s--,h=null,a&&l?(o=g=!0,s=0):(f=--s>0?r[s-1]:-1,o=g=!1),i=!0)),f++;i&&this.diff_cleanupMerge(t)},e.prototype.diff_cleanupMerge=function(t){t.push(new e.Diff(0,""));for(var i,r=0,s=0,h=0,f="",a="";r<t.length;)switch(t[r][0]){case 1:h++,a+=t[r][1],r++;break;case n:s++,f+=t[r][1],r++;break;case 0:s+h>1?(0!==s&&0!==h&&(0!==(i=this.diff_commonPrefix(a,f))&&(r-s-h>0&&0==t[r-s-h-1][0]?t[r-s-h-1][1]+=a.substring(0,i):(t.splice(0,0,new e.Diff(0,a.substring(0,i))),r++),a=a.substring(i),f=f.substring(i)),0!==(i=this.diff_commonSuffix(a,f))&&(t[r][1]=a.substring(a.length-i)+t[r][1],a=a.substring(0,a.length-i),f=f.substring(0,f.length-i))),r-=s+h,t.splice(r,s+h),f.length&&(t.splice(r,0,new e.Diff(n,f)),r++),a.length&&(t.splice(r,0,new e.Diff(1,a)),r++),r++):0!==r&&0==t[r-1][0]?(t[r-1][1]+=t[r][1],t.splice(r,1)):r++,h=0,s=0,f="",a=""}""===t[t.length-1][1]&&t.pop();var l=!1;for(r=1;r<t.length-1;)0==t[r-1][0]&&0==t[r+1][0]&&(t[r][1].substring(t[r][1].length-t[r-1][1].length)==t[r-1][1]?(t[r][1]=t[r-1][1]+t[r][1].substring(0,t[r][1].length-t[r-1][1].length),t[r+1][1]=t[r-1][1]+t[r+1][1],t.splice(r-1,1),l=!0):t[r][1].substring(0,t[r+1][1].length)==t[r+1][1]&&(t[r-1][1]+=t[r+1][1],t[r][1]=t[r][1].substring(t[r+1][1].length)+t[r+1][1],t.splice(r+1,1),l=!0)),r++;l&&this.diff_cleanupMerge(t)},e.prototype.diff_xIndex=function(t,e){var i,r=0,s=0,h=0,f=0;for(i=0;i<t.length&&(1!==t[i][0]&&(r+=t[i][1].length),t[i][0]!==n&&(s+=t[i][1].length),!(r>e));i++)h=r,f=s;return t.length!=i&&t[i][0]===n?f:f+(e-h)},e.prototype.diff_prettyHtml=function(t){for(var e=[],i=/&/g,r=/</g,s=/>/g,h=/\n/g,f=0;f<t.length;f++){var a=t[f][0],l=t[f][1].replace(i,"&amp;").replace(r,"&lt;").replace(s,"&gt;").replace(h,"&para;<br>");switch(a){case 1:e[f]='<ins style="background:#e6ffe6;">'+l+"</ins>";break;case n:e[f]='<del style="background:#ffe6e6;">'+l+"</del>";break;case 0:e[f]="<span>"+l+"</span>"}}return e.join("")},e.prototype.diff_text1=function(t){for(var e=[],n=0;n<t.length;n++)1!==t[n][0]&&(e[n]=t[n][1]);return e.join("")},e.prototype.diff_text2=function(t){for(var e=[],i=0;i<t.length;i++)t[i][0]!==n&&(e[i]=t[i][1]);return e.join("")},e.prototype.diff_levenshtein=function(t){for(var e=0,i=0,r=0,s=0;s<t.length;s++){var h=t[s][0],f=t[s][1];switch(h){case 1:i+=f.length;break;case n:r+=f.length;break;case 0:e+=Math.max(i,r),i=0,r=0}}return e+Math.max(i,r)},e.prototype.diff_toDelta=function(t){for(var e=[],i=0;i<t.length;i++)switch(t[i][0]){case 1:e[i]="+"+encodeURI(t[i][1]);break;case n:e[i]="-"+t[i][1].length;break;case 0:e[i]="="+t[i][1].length}return e.join("\t").replace(/%20/g," ")},e.prototype.diff_fromDelta=function(t,i){for(var r=[],s=0,h=0,f=i.split(/\t/g),a=0;a<f.length;a++){var l=f[a].substring(1);switch(f[a].charAt(0)){case"+":try{r[s++]=new e.Diff(1,decodeURI(l))}catch(t){throw new Error("Illegal escape in diff_fromDelta: "+l)}break;case"-":case"=":var o=parseInt(l,10);if(isNaN(o)||o<0)throw new Error("Invalid number in diff_fromDelta: "+l);var g=t.substring(h,h+=o);"="==f[a].charAt(0)?r[s++]=new e.Diff(0,g):r[s++]=new e.Diff(n,g);break;default:if(f[a])throw new Error("Invalid diff operation in diff_fromDelta: "+f[a])}}if(h!=t.length)throw new Error("Delta length ("+h+") does not equal source text length ("+t.length+").");return r},e.prototype.match_main=function(t,e,n){if(null==t||null==e||null==n)throw new Error("Null input. (match_main)");return n=Math.max(0,Math.min(n,t.length)),t==e?0:t.length?t.substring(n,n+e.length)==e?n:this.match_bitap_(t,e,n):-1},e.prototype.match_bitap_=function(t,e,n){if(e.length>this.Match_MaxBits)throw new Error("Pattern too long for this browser.");var i=this.match_alphabet_(e),r=this;function s(t,i){var s=t/e.length,h=Math.abs(n-i);return r.Match_Distance?s+h/r.Match_Distance:h?1:s}var h=this.Match_Threshold,f=t.indexOf(e,n);-1!=f&&(h=Math.min(s(0,f),h),-1!=(f=t.lastIndexOf(e,n+e.length))&&(h=Math.min(s(0,f),h)));var a,l,o=1<<e.length-1;f=-1;for(var g,c=e.length+t.length,u=0;u<e.length;u++){for(a=0,l=c;a<l;)s(u,n+l)<=h?a=l:c=l,l=Math.floor((c-a)/2+a);c=l;var d=Math.max(1,n-l+1),p=Math.min(n+l,t.length)+e.length,_=Array(p+2);_[p+1]=(1<<u)-1;for(var v=p;v>=d;v--){var b=i[t.charAt(v-1)];if(_[v]=0===u?(_[v+1]<<1|1)&b:(_[v+1]<<1|1)&b|(g[v+1]|g[v])<<1|1|g[v+1],_[v]&o){var m=s(u,v-1);if(m<=h){if(h=m,!((f=v-1)>n))break;d=Math.max(1,2*n-f)}}}if(s(u+1,n)>h)break;g=_}return f},e.prototype.match_alphabet_=function(t){for(var e={},n=0;n<t.length;n++)e[t.charAt(n)]=0;for(n=0;n<t.length;n++)e[t.charAt(n)]|=1<<t.length-n-1;return e},e.prototype.patch_addContext_=function(t,n){if(0!=n.length){if(null===t.start2)throw Error("patch not initialized");for(var i=n.substring(t.start2,t.start2+t.length1),r=0;n.indexOf(i)!=n.lastIndexOf(i)&&i.length<this.Match_MaxBits-this.Patch_Margin-this.Patch_Margin;)r+=this.Patch_Margin,i=n.substring(t.start2-r,t.start2+t.length1+r);r+=this.Patch_Margin;var s=n.substring(t.start2-r,t.start2);s&&t.diffs.unshift(new e.Diff(0,s));var h=n.substring(t.start2+t.length1,t.start2+t.length1+r);h&&t.diffs.push(new e.Diff(0,h)),t.start1-=s.length,t.start2-=s.length,t.length1+=s.length+h.length,t.length2+=s.length+h.length}},e.prototype.patch_make=function(t,i,r){var s,h;if("string"==typeof t&&"string"==typeof i&&void 0===r)s=t,(h=this.diff_main(s,i,!0)).length>2&&(this.diff_cleanupSemantic(h),this.diff_cleanupEfficiency(h));else if(t&&"object"==typeof t&&void 0===i&&void 0===r)h=t,s=this.diff_text1(h);else if("string"==typeof t&&i&&"object"==typeof i&&void 0===r)s=t,h=i;else{if("string"!=typeof t||"string"!=typeof i||!r||"object"!=typeof r)throw new Error("Unknown call format to patch_make.");s=t,h=r}if(0===h.length)return[];for(var f=[],a=new e.patch_obj,l=0,o=0,g=0,c=s,u=s,d=0;d<h.length;d++){var p=h[d][0],_=h[d][1];switch(l||0===p||(a.start1=o,a.start2=g),p){case 1:a.diffs[l++]=h[d],a.length2+=_.length,u=u.substring(0,g)+_+u.substring(g);break;case n:a.length1+=_.length,a.diffs[l++]=h[d],u=u.substring(0,g)+u.substring(g+_.length);break;case 0:_.length<=2*this.Patch_Margin&&l&&h.length!=d+1?(a.diffs[l++]=h[d],a.length1+=_.length,a.length2+=_.length):_.length>=2*this.Patch_Margin&&l&&(this.patch_addContext_(a,c),f.push(a),a=new e.patch_obj,l=0,c=u,o=g)}1!==p&&(o+=_.length),p!==n&&(g+=_.length)}return l&&(this.patch_addContext_(a,c),f.push(a)),f},e.prototype.patch_deepCopy=function(t){for(var n=[],i=0;i<t.length;i++){var r=t[i],s=new e.patch_obj;s.diffs=[];for(var h=0;h<r.diffs.length;h++)s.diffs[h]=new e.Diff(r.diffs[h][0],r.diffs[h][1]);s.start1=r.start1,s.start2=r.start2,s.length1=r.length1,s.length2=r.length2,n[i]=s}return n},e.prototype.patch_apply=function(t,e){if(0==t.length)return[e,[]];t=this.patch_deepCopy(t);var i=this.patch_addPadding(t);e=i+e+i,this.patch_splitMax(t);for(var r=0,s=[],h=0;h<t.length;h++){var f,a,l=t[h].start2+r,o=this.diff_text1(t[h].diffs),g=-1;if(o.length>this.Match_MaxBits?-1!=(f=this.match_main(e,o.substring(0,this.Match_MaxBits),l))&&(-1==(g=this.match_main(e,o.substring(o.length-this.Match_MaxBits),l+o.length-this.Match_MaxBits))||f>=g)&&(f=-1):f=this.match_main(e,o,l),-1==f)s[h]=!1,r-=t[h].length2-t[h].length1;else if(s[h]=!0,r=f-l,o==(a=-1==g?e.substring(f,f+o.length):e.substring(f,g+this.Match_MaxBits)))e=e.substring(0,f)+this.diff_text2(t[h].diffs)+e.substring(f+o.length);else{var c=this.diff_main(o,a,!1);if(o.length>this.Match_MaxBits&&this.diff_levenshtein(c)/o.length>this.Patch_DeleteThreshold)s[h]=!1;else{this.diff_cleanupSemanticLossless(c);for(var u,d=0,p=0;p<t[h].diffs.length;p++){var _=t[h].diffs[p];0!==_[0]&&(u=this.diff_xIndex(c,d)),1===_[0]?e=e.substring(0,f+u)+_[1]+e.substring(f+u):_[0]===n&&(e=e.substring(0,f+u)+e.substring(f+this.diff_xIndex(c,d+_[1].length))),_[0]!==n&&(d+=_[1].length)}}}}return[e=e.substring(i.length,e.length-i.length),s]},e.prototype.patch_addPadding=function(t){for(var n=this.Patch_Margin,i="",r=1;r<=n;r++)i+=String.fromCharCode(r);for(r=0;r<t.length;r++)t[r].start1+=n,t[r].start2+=n;var s=t[0],h=s.diffs;if(0==h.length||0!=h[0][0])h.unshift(new e.Diff(0,i)),s.start1-=n,s.start2-=n,s.length1+=n,s.length2+=n;else if(n>h[0][1].length){var f=n-h[0][1].length;h[0][1]=i.substring(h[0][1].length)+h[0][1],s.start1-=f,s.start2-=f,s.length1+=f,s.length2+=f}return 0==(h=(s=t[t.length-1]).diffs).length||0!=h[h.length-1][0]?(h.push(new e.Diff(0,i)),s.length1+=n,s.length2+=n):n>h[h.length-1][1].length&&(f=n-h[h.length-1][1].length,h[h.length-1][1]+=i.substring(0,f),s.length1+=f,s.length2+=f),i},e.prototype.patch_splitMax=function(t){for(var i=this.Match_MaxBits,r=0;r<t.length;r++)if(!(t[r].length1<=i)){var s=t[r];t.splice(r--,1);for(var h=s.start1,f=s.start2,a="";0!==s.diffs.length;){var l=new e.patch_obj,o=!0;for(l.start1=h-a.length,l.start2=f-a.length,""!==a&&(l.length1=l.length2=a.length,l.diffs.push(new e.Diff(0,a)));0!==s.diffs.length&&l.length1<i-this.Patch_Margin;){var g=s.diffs[0][0],c=s.diffs[0][1];1===g?(l.length2+=c.length,f+=c.length,l.diffs.push(s.diffs.shift()),o=!1):g===n&&1==l.diffs.length&&0==l.diffs[0][0]&&c.length>2*i?(l.length1+=c.length,h+=c.length,o=!1,l.diffs.push(new e.Diff(g,c)),s.diffs.shift()):(c=c.substring(0,i-l.length1-this.Patch_Margin),l.length1+=c.length,h+=c.length,0===g?(l.length2+=c.length,f+=c.length):o=!1,l.diffs.push(new e.Diff(g,c)),c==s.diffs[0][1]?s.diffs.shift():s.diffs[0][1]=s.diffs[0][1].substring(c.length))}a=(a=this.diff_text2(l.diffs)).substring(a.length-this.Patch_Margin);var u=this.diff_text1(s.diffs).substring(0,this.Patch_Margin);""!==u&&(l.length1+=u.length,l.length2+=u.length,0!==l.diffs.length&&0===l.diffs[l.diffs.length-1][0]?l.diffs[l.diffs.length-1][1]+=u:l.diffs.push(new e.Diff(0,u))),o||t.splice(++r,0,l)}}},e.prototype.patch_toText=function(t){for(var e=[],n=0;n<t.length;n++)e[n]=t[n];return e.join("")},e.prototype.patch_fromText=function(t){var i=[];if(!t)return i;for(var r=t.split("\n"),s=0,h=/^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;s<r.length;){var f=r[s].match(h);if(!f)throw new Error("Invalid patch string: "+r[s]);var a=new e.patch_obj;for(i.push(a),a.start1=parseInt(f[1],10),""===f[2]?(a.start1--,a.length1=1):"0"==f[2]?a.length1=0:(a.start1--,a.length1=parseInt(f[2],10)),a.start2=parseInt(f[3],10),""===f[4]?(a.start2--,a.length2=1):"0"==f[4]?a.length2=0:(a.start2--,a.length2=parseInt(f[4],10)),s++;s<r.length;){var l=r[s].charAt(0);try{var o=decodeURI(r[s].substring(1))}catch(t){throw new Error("Illegal escape in patch_fromText: "+o)}if("-"==l)a.diffs.push(new e.Diff(n,o));else if("+"==l)a.diffs.push(new e.Diff(1,o));else if(" "==l)a.diffs.push(new e.Diff(0,o));else{if("@"==l)break;if(""!==l)throw new Error('Invalid patch mode "'+l+'" in: '+o)}s++}}return i},(e.patch_obj=function(){this.diffs=[],this.start1=null,this.start2=null,this.length1=0,this.length2=0}).prototype.toString=function(){for(var t,e=["@@ -"+(0===this.length1?this.start1+",0":1==this.length1?this.start1+1:this.start1+1+","+this.length1)+" +"+(0===this.length2?this.start2+",0":1==this.length2?this.start2+1:this.start2+1+","+this.length2)+" @@\n"],i=0;i<this.diffs.length;i++){switch(this.diffs[i][0]){case 1:t="+";break;case n:t="-";break;case 0:t=" "}e[i+1]=t+encodeURI(this.diffs[i][1])+"\n"}return e.join("").replace(/%20/g," ")},t.exports=e,t.exports.diff_match_patch=e,t.exports.DIFF_DELETE=n,t.exports.DIFF_INSERT=1,t.exports.DIFF_EQUAL=0},921:(t,e,n)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getTextEdits=void 0;const i=n(87),r=n(549);var s;!function(t){t[t.Delete=0]="Delete",t[t.Insert=1]="Insert",t[t.Replace=2]="Replace"}(s||(s={}));const h=i.EOL.length;class f{constructor(t,e){this.action=t,this.start=e,this.text=""}apply(){switch(this.action){case s.Insert:return r.TextEdit.insert(this.start,this.text);case s.Delete:return r.TextEdit.delete(new r.Range(this.start,this.end));case s.Replace:return r.TextEdit.replace(new r.Range(this.start,this.end),this.text);default:return new r.TextEdit(new r.Range(new r.Position(0,0),new r.Position(0,0)),"")}}}e.getTextEdits=function(t,e){return function(t,e,i=0){let a=i,l=0;const o=t.split(/\r?\n/g);a>0&&o.filter(((t,e)=>e<a)).forEach((t=>l+=t.length+h));const g=[];let c,u=null;for(let t=0;t<e.length;t+=1){let i=new r.Position(a,l);for(let n=0;n<e[t][1].length;n+=1)"\n"!==e[t][1][n]?l+=1:(l=0,a+=1);const h=n(27);switch(e[t][0]){case h.DIFF_DELETE:if(0===o[a-1].length&&o[i.line-1]&&0===o[i.line-1].length?(i=new r.Position(i.line-1,0),c=new r.Position(a-1,0)):c=new r.Position(a,l),null===u)u=new f(s.Delete,i);else if(u.action!==s.Delete)throw new Error("cannot format due to an internal error.");u.end=c;break;case h.DIFF_INSERT:null===u?u=new f(s.Insert,i):u.action===s.Delete&&(u.action=s.Replace),a=i.line,l=i.character,u.text+=e[t][1];break;case h.DIFF_EQUAL:null!==u&&(g.push(u),u=null)}}return null!==u&&g.push(u),g}(t,(new(n(27).diff_match_patch)).diff_main(t,e)).map((t=>t.apply()))}},112:function(t,e,n){"use strict";var i=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(r,s){function h(t){try{a(i.next(t))}catch(t){s(t)}}function f(t){try{a(i.throw(t))}catch(t){s(t)}}function a(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(h,f)}a((i=i.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.activate=void 0;const r=n(549),s=n(129),h=n(921),f=n(614),a=["django-html","jinja"];e.activate=function(t){return i(this,void 0,void 0,(function*(){const t=r.extensions.getExtension("ms-python.python");if(!t)return void r.window.showErrorMessage("Failed to activate ms-python.python extension");t.isActive||(yield t.activate());const e=t.exports;r.languages.registerDocumentFormattingEditProvider(a,{provideDocumentFormattingEdits(t){return i(this,void 0,void 0,(function*(){const n=e.environments.getActiveEnvironmentPath(),i=yield e.environments.resolveEnvironment(n);if(i&&i.path){let e="",n=[];const a=s.spawn(i.path,["-m","djhtml",t.uri.fsPath]);return a.stderr.on("data",(t=>{t.includes("No module named djhtml")?r.window.showErrorMessage("djhtml is not installed in the current Python environment"):r.window.showErrorMessage(`djhtml failed with error: ${t}`)})),a.stdout.on("data",(t=>{e+=t})),a.on("close",(i=>{0===i&&(n=h.getTextEdits(t.getText(),e))})),yield f.once(a,"close"),n}return r.window.showErrorMessage("No Python environment selected"),[]}))}})}))}},129:t=>{"use strict";t.exports=require("child_process")},614:t=>{"use strict";t.exports=require("events")},87:t=>{"use strict";t.exports=require("os")},549:t=>{"use strict";t.exports=require("vscode")}},e={},n=function n(i){var r=e[i];if(void 0!==r)return r.exports;var s=e[i]={exports:{}};return t[i].call(s.exports,s,s.exports,n),s.exports}(112);module.exports=n})();