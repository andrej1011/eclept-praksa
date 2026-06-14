import {p}from'./chunk-BZTwhqpn.js';import {c as ci,l as li,I as Ii}from'./chunk-uYFLgSy3.js';import {C,x as xo,L as LD,Z as ZI,aZ as W,b as ai,g as gD,R as Rc,N as Np,f as bE,D as DE,v as vv,h as wp,_ as _E,e as wE,K as KI,I as Bl,z as kn,ac as pF,aj as pe,a_ as Mn,ap as mF,ah as Fe,S as A,a$ as Pt,a3 as gF,b0 as Cu,T as Tp,b1 as bu,F as Fc,a6 as Dp,aF as RE,aG as du,V as VE,aI as fu,b2 as bD,b3 as jt,b4 as ye$1,J as us,b5 as yt,Y as te,b6 as ur,aY as CE,aH as zE,aq as Ep,W as Wp}from'./main-WH5KSRWR.js';import {M}from'./chunk-C702IN4T.js';import {Q as Qt,P as Pe,B}from'./chunk-BT5WmAmC.js';import'./chunk-DuEWoJYx.js';import {m}from'./chunk-oAsQiUp2.js';import'./chunk-C2FgesFg.js';var me=(()=>{class t{static \u0275fac=function(a){return new(a||t)};static \u0275mod=KI({type:t});static \u0275inj=Bl({imports:[jt,ye$1,us,yt]})}return t})();function _e(t,o){if(t&1&&(ai(0,"mat-option",17),gD(1),Rc()),t&2){let e=o.$implicit;wp("value",e),vv(),Fc(" ",e," ");}}function ve(t,o){if(t&1){let e=RE();ai(0,"mat-form-field",14)(1,"mat-select",16,0),Np("selectionChange",function(i){du(e);let l=VE(2);return fu(l._changePageSize(i.value))}),bE(3,_e,2,2,"mat-option",17,CE),Rc(),ai(5,"div",18),Np("click",function(){du(e);let i=zE(2);return fu(i.open())}),Rc()();}if(t&2){let e=VE(2);wp("appearance",e._formFieldAppearance)("color",e.color),vv(),wp("value",e.pageSize)("disabled",e.disabled),Ep("aria-labelledby",e._pageSizeLabelId),wp("panelClass",e.selectConfig.panelClass||"")("disableOptionCentering",e.selectConfig.disableOptionCentering),vv(2),_E(e._displayedPageSizeOptions);}}function he(t,o){if(t&1&&(ai(0,"div",15),gD(1),Rc()),t&2){let e=VE(2);vv(),Wp(e.pageSize);}}function fe(t,o){if(t&1&&(ai(0,"div",3)(1,"div",13),gD(2),Rc(),DE(3,ve,6,7,"mat-form-field",14),DE(4,he,2,1,"div",15),Rc()),t&2){let e=VE();vv(),Dp("id",e._pageSizeLabelId),vv(),Fc(" ",e._intl.itemsPerPageLabel," "),vv(),wE(e._displayedPageSizeOptions.length>1?3:-1),vv(),wE(e._displayedPageSizeOptions.length<=1?4:-1);}}function be(t,o){if(t&1){let e=RE();ai(0,"button",19),Np("click",function(){du(e);let i=VE();return fu(i._buttonClicked(0,i._previousButtonsDisabled()))}),Cu(),ai(1,"svg",8),Tp(2,"path",20),Rc()();}if(t&2){let e=VE();wp("matTooltip",e._intl.firstPageLabel)("matTooltipDisabled",e._previousButtonsDisabled())("disabled",e._previousButtonsDisabled())("tabindex",e._previousButtonsDisabled()?-1:null),Dp("aria-label",e._intl.firstPageLabel);}}function xe(t,o){if(t&1){let e=RE();ai(0,"button",21),Np("click",function(){du(e);let i=VE();return fu(i._buttonClicked(i.getNumberOfPages()-1,i._nextButtonsDisabled()))}),Cu(),ai(1,"svg",8),Tp(2,"path",22),Rc()();}if(t&2){let e=VE();wp("matTooltip",e._intl.lastPageLabel)("matTooltipDisabled",e._nextButtonsDisabled())("disabled",e._nextButtonsDisabled())("tabindex",e._nextButtonsDisabled()?-1:null),Dp("aria-label",e._intl.lastPageLabel);}}var Se=(()=>{class t{changes=new te;itemsPerPageLabel="Items per page:";nextPageLabel="Next page";previousPageLabel="Previous page";firstPageLabel="First page";lastPageLabel="Last page";getRangeLabel=(e,a,i)=>{if(i==0||a==0)return `0 of ${i}`;i=Math.max(i,0);let l=e*a,C=l<i?Math.min(l+a,i):l+a;return `${l+1} \u2013 ${C} of ${i}`};static \u0275fac=function(a){return new(a||t)};static \u0275prov=ur({token:t,factory:t.\u0275fac})}return t})(),ye=50;var Me=new A("MAT_PAGINATOR_DEFAULT_OPTIONS"),N=(()=>{class t{_intl=C(Se);_changeDetectorRef=C(pF);_formFieldAppearance;_pageSizeLabelId=C(pe).getId("mat-paginator-page-size-label-");_intlChanges;_isInitialized=false;_initializedStream=new Mn(1);color;get pageIndex(){return this._pageIndex}set pageIndex(e){this._pageIndex=Math.max(e||0,0),this._changeDetectorRef.markForCheck();}_pageIndex=0;get length(){return this._length}set length(e){this._length=e||0,this._changeDetectorRef.markForCheck();}_length=0;get pageSize(){return this._pageSize}set pageSize(e){this._pageSize=Math.max(e||0,0),this._updateDisplayedPageSizeOptions();}_pageSize;get pageSizeOptions(){return this._pageSizeOptions}set pageSizeOptions(e){this._pageSizeOptions=(e||[]).map(a=>mF(a,0)),this._updateDisplayedPageSizeOptions();}_pageSizeOptions=[];hidePageSize=false;showFirstLastButtons=false;selectConfig={};disabled=false;page=new Fe;_displayedPageSizeOptions;initialized=this._initializedStream;constructor(){let e=this._intl,a=C(Me,{optional:true});if(this._intlChanges=e.changes.subscribe(()=>this._changeDetectorRef.markForCheck()),a){let{pageSize:i,pageSizeOptions:l,hidePageSize:C,showFirstLastButtons:A}=a;i!=null&&(this._pageSize=i),l!=null&&(this._pageSizeOptions=l),C!=null&&(this.hidePageSize=C),A!=null&&(this.showFirstLastButtons=A);}this._formFieldAppearance=a?.formFieldAppearance||"outline";}ngOnInit(){this._isInitialized=true,this._updateDisplayedPageSizeOptions(),this._initializedStream.next();}ngOnDestroy(){this._initializedStream.complete(),this._intlChanges.unsubscribe();}nextPage(){this.hasNextPage()&&this._navigate(this.pageIndex+1);}previousPage(){this.hasPreviousPage()&&this._navigate(this.pageIndex-1);}firstPage(){this.hasPreviousPage()&&this._navigate(0);}lastPage(){this.hasNextPage()&&this._navigate(this.getNumberOfPages()-1);}hasPreviousPage(){return this.pageIndex>=1&&this.pageSize!=0}hasNextPage(){let e=this.getNumberOfPages()-1;return this.pageIndex<e&&this.pageSize!=0}getNumberOfPages(){return this.pageSize?Math.ceil(this.length/this.pageSize):0}_changePageSize(e){let a=this.pageIndex*this.pageSize,i=this.pageIndex;this.pageIndex=Math.floor(a/e)||0,this.pageSize=e,this._emitPageEvent(i);}_nextButtonsDisabled(){return this.disabled||!this.hasNextPage()}_previousButtonsDisabled(){return this.disabled||!this.hasPreviousPage()}_updateDisplayedPageSizeOptions(){this._isInitialized&&(this.pageSize||(this._pageSize=this.pageSizeOptions.length!=0?this.pageSizeOptions[0]:ye),this._displayedPageSizeOptions=this.pageSizeOptions.slice(),this._displayedPageSizeOptions.indexOf(this.pageSize)===-1&&this._displayedPageSizeOptions.push(this.pageSize),this._displayedPageSizeOptions.sort((e,a)=>e-a),this._changeDetectorRef.markForCheck());}_emitPageEvent(e){this.page.emit({previousPageIndex:e,pageIndex:this.pageIndex,pageSize:this.pageSize,length:this.length});}_navigate(e){let a=this.pageIndex;e!==a&&(this.pageIndex=e,this._emitPageEvent(a));}_buttonClicked(e,a){a||this._navigate(e);}static \u0275fac=function(a){return new(a||t)};static \u0275cmp=ZI({type:t,selectors:[["mat-paginator"]],hostAttrs:["role","group",1,"mat-mdc-paginator"],inputs:{color:"color",pageIndex:[2,"pageIndex","pageIndex",mF],length:[2,"length","length",mF],pageSize:[2,"pageSize","pageSize",mF],pageSizeOptions:"pageSizeOptions",hidePageSize:[2,"hidePageSize","hidePageSize",gF],showFirstLastButtons:[2,"showFirstLastButtons","showFirstLastButtons",gF],selectConfig:"selectConfig",disabled:[2,"disabled","disabled",gF]},outputs:{page:"page"},exportAs:["matPaginator"],decls:14,vars:14,consts:[["selectRef",""],[1,"mat-mdc-paginator-outer-container"],[1,"mat-mdc-paginator-container"],[1,"mat-mdc-paginator-page-size"],[1,"mat-mdc-paginator-range-actions"],["aria-atomic","true","aria-live","polite","role","status",1,"mat-mdc-paginator-range-label"],["matIconButton","","type","button","matTooltipPosition","above","disabledInteractive","",1,"mat-mdc-paginator-navigation-first",3,"matTooltip","matTooltipDisabled","disabled","tabindex"],["matIconButton","","type","button","matTooltipPosition","above","disabledInteractive","",1,"mat-mdc-paginator-navigation-previous",3,"click","matTooltip","matTooltipDisabled","disabled","tabindex"],["viewBox","0 0 24 24","focusable","false","aria-hidden","true",1,"mat-mdc-paginator-icon"],["d","M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"],["matIconButton","","type","button","matTooltipPosition","above","disabledInteractive","",1,"mat-mdc-paginator-navigation-next",3,"click","matTooltip","matTooltipDisabled","disabled","tabindex"],["d","M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"],["matIconButton","","type","button","matTooltipPosition","above","disabledInteractive","",1,"mat-mdc-paginator-navigation-last",3,"matTooltip","matTooltipDisabled","disabled","tabindex"],["aria-hidden","true",1,"mat-mdc-paginator-page-size-label"],[1,"mat-mdc-paginator-page-size-select",3,"appearance","color"],[1,"mat-mdc-paginator-page-size-value"],["hideSingleSelectionIndicator","",3,"selectionChange","value","disabled","aria-labelledby","panelClass","disableOptionCentering"],[3,"value"],[1,"mat-mdc-paginator-touch-target",3,"click"],["matIconButton","","type","button","matTooltipPosition","above","disabledInteractive","",1,"mat-mdc-paginator-navigation-first",3,"click","matTooltip","matTooltipDisabled","disabled","tabindex"],["d","M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"],["matIconButton","","type","button","matTooltipPosition","above","disabledInteractive","",1,"mat-mdc-paginator-navigation-last",3,"click","matTooltip","matTooltipDisabled","disabled","tabindex"],["d","M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"]],template:function(a,i){a&1&&(ai(0,"div",1)(1,"div",2),DE(2,fe,5,4,"div",3),ai(3,"div",4)(4,"div",5),gD(5),Rc(),DE(6,be,3,5,"button",6),ai(7,"button",7),Np("click",function(){return i._buttonClicked(i.pageIndex-1,i._previousButtonsDisabled())}),Cu(),ai(8,"svg",8),Tp(9,"path",9),Rc()(),bu(),ai(10,"button",10),Np("click",function(){return i._buttonClicked(i.pageIndex+1,i._nextButtonsDisabled())}),Cu(),ai(11,"svg",8),Tp(12,"path",11),Rc()(),DE(13,xe,3,5,"button",12),Rc()()()),a&2&&(vv(2),wE(i.hidePageSize?-1:2),vv(3),Fc(" ",i._intl.getRangeLabel(i.pageIndex,i.pageSize,i.length)," "),vv(),wE(i.showFirstLastButtons?6:-1),vv(),wp("matTooltip",i._intl.previousPageLabel)("matTooltipDisabled",i._previousButtonsDisabled())("disabled",i._previousButtonsDisabled())("tabindex",i._previousButtonsDisabled()?-1:null),Dp("aria-label",i._intl.previousPageLabel),vv(3),wp("matTooltip",i._intl.nextPageLabel)("matTooltipDisabled",i._nextButtonsDisabled())("disabled",i._nextButtonsDisabled())("tabindex",i._nextButtonsDisabled()?-1:null),Dp("aria-label",i._intl.nextPageLabel),vv(3),wE(i.showFirstLastButtons?13:-1));},dependencies:[Pe,li,W,Pt,Ii],styles:[`.mat-mdc-paginator {
  display: block;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--mat-paginator-container-text-color, var(--mat-sys-on-surface));
  background-color: var(--mat-paginator-container-background-color, var(--mat-sys-surface));
  font-family: var(--mat-paginator-container-text-font, var(--mat-sys-body-small-font));
  line-height: var(--mat-paginator-container-text-line-height, var(--mat-sys-body-small-line-height));
  font-size: var(--mat-paginator-container-text-size, var(--mat-sys-body-small-size));
  font-weight: var(--mat-paginator-container-text-weight, var(--mat-sys-body-small-weight));
  letter-spacing: var(--mat-paginator-container-text-tracking, var(--mat-sys-body-small-tracking));
  --mat-form-field-container-height: var(--mat-paginator-form-field-container-height, 40px);
  --mat-form-field-container-vertical-padding: var(--mat-paginator-form-field-container-vertical-padding, 8px);
}
.mat-mdc-paginator .mat-mdc-select-value {
  font-size: var(--mat-paginator-select-trigger-text-size, var(--mat-sys-body-small-size));
}
.mat-mdc-paginator .mat-mdc-form-field-subscript-wrapper {
  display: none;
}
.mat-mdc-paginator .mat-mdc-select {
  line-height: 1.5;
}

.mat-mdc-paginator-outer-container {
  display: flex;
}

.mat-mdc-paginator-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 8px;
  flex-wrap: wrap;
  width: 100%;
  min-height: var(--mat-paginator-container-size, 56px);
}

.mat-mdc-paginator-page-size {
  display: flex;
  align-items: baseline;
  margin-right: 8px;
}
[dir=rtl] .mat-mdc-paginator-page-size {
  margin-right: 0;
  margin-left: 8px;
}

.mat-mdc-paginator-page-size-label {
  margin: 0 4px;
}

.mat-mdc-paginator-page-size-select {
  margin: 0 4px;
  width: var(--mat-paginator-page-size-select-width, 84px);
}

.mat-mdc-paginator-range-label {
  margin: 0 32px 0 24px;
}

.mat-mdc-paginator-range-actions {
  display: flex;
  align-items: center;
}

.mat-mdc-paginator-icon {
  display: inline-block;
  width: 28px;
  fill: var(--mat-paginator-enabled-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon {
  fill: var(--mat-paginator-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
[dir=rtl] .mat-mdc-paginator-icon {
  transform: rotate(180deg);
}

@media (forced-colors: active) {
  .mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon,
  .mat-mdc-paginator-icon {
    fill: currentColor;
  }
  .mat-mdc-paginator-range-actions .mat-mdc-icon-button {
    outline: solid 1px;
  }
  .mat-mdc-paginator-range-actions .mat-mdc-icon-button[aria-disabled] {
    color: GrayText;
  }
}
.mat-mdc-paginator-touch-target {
  display: var(--mat-paginator-touch-target-display, block);
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--mat-paginator-page-size-select-width, 84px);
  height: var(--mat-paginator-page-size-select-touch-target-height, 48px);
  background-color: transparent;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
`],encapsulation:2})}return t})(),ge=(()=>{class t{static \u0275fac=function(a){return new(a||t)};static \u0275mod=KI({type:t});static \u0275inj=Bl({imports:[kn,ci,me,N]})}return t})();var ze=()=>[8,12,24],ue=(t,o)=>o.id;function Ce(t,o){if(t&1&&(ai(0,"mat-option",3),gD(1),Rc()),t&2){let e=o.$implicit;wp("value",e.id),vv(),Wp(e.name);}}function Ie(t,o){t&1&&(ai(0,"p",9),gD(1,"Loading\u2026"),Rc());}function Te(t,o){t&1&&(ai(0,"p",9),gD(1,"No movies found."),Rc());}function Oe(t,o){if(t&1&&Tp(0,"app-movie-card",11),t&2){let e=o.$implicit;wp("movie",e);}}function De(t,o){if(t&1){let e=RE();ai(0,"div",10),bE(1,Oe,1,1,"app-movie-card",11,ue),Rc(),ai(3,"mat-paginator",12),Np("page",function(i){du(e);let l=VE();return fu(l.onPage(i))}),Rc();}if(t&2){let e=VE();vv(),_E(e.paged()),vv(2),wp("length",e.movies().length)("pageSize",e.pageSize())("pageSizeOptions",bD(4,ze))("pageIndex",e.pageIndex());}}var ce=class t{movieSvc=C(m);genreSvc=C(p);genres=xo([]);movies=xo([]);loading=xo(true);genreId=xo(null);sortBy=xo("name");order=xo("asc");pageIndex=xo(0);pageSize=xo(12);paged=LD(()=>{let o=this.pageIndex()*this.pageSize();return this.movies().slice(o,o+this.pageSize())});constructor(){this.genreSvc.list().then(o=>this.genres.set(o)),this.load();}async load(){this.loading.set(true);try{this.movies.set(await this.movieSvc.list({genre_id:this.genreId()??void 0,sort_by:this.sortBy(),order:this.order(),limit:100})),this.pageIndex.set(0);}finally{this.loading.set(false);}}setGenre(o){this.genreId.set(o),this.load();}setSort(o){this.sortBy.set(o),this.load();}setOrder(o){this.order.set(o),this.load();}onPage(o){this.pageIndex.set(o.pageIndex),this.pageSize.set(o.pageSize);}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=ZI({type:t,selectors:[["app-movie-list"]],decls:30,vars:5,consts:[[1,"filters"],["appearance","outline"],[3,"selectionChange","value"],[3,"value"],["value","name"],["value","release_date"],["value","duration"],["value","asc"],["value","desc"],[1,"muted"],[1,"grid"],[3,"movie"],[3,"page","length","pageSize","pageSizeOptions","pageIndex"]],template:function(e,a){e&1&&(ai(0,"div",0)(1,"mat-form-field",1)(2,"mat-label"),gD(3,"Genre"),Rc(),ai(4,"mat-select",2),Np("selectionChange",function(l){return a.setGenre(l.value)}),ai(5,"mat-option",3),gD(6,"All"),Rc(),bE(7,Ce,2,2,"mat-option",3,ue),Rc()(),ai(9,"mat-form-field",1)(10,"mat-label"),gD(11,"Sort by"),Rc(),ai(12,"mat-select",2),Np("selectionChange",function(l){return a.setSort(l.value)}),ai(13,"mat-option",4),gD(14,"Name"),Rc(),ai(15,"mat-option",5),gD(16,"Release date"),Rc(),ai(17,"mat-option",6),gD(18,"Duration"),Rc()()(),ai(19,"mat-form-field",1)(20,"mat-label"),gD(21,"Order"),Rc(),ai(22,"mat-select",2),Np("selectionChange",function(l){return a.setOrder(l.value)}),ai(23,"mat-option",7),gD(24,"Ascending"),Rc(),ai(25,"mat-option",8),gD(26,"Descending"),Rc()()()(),DE(27,Ie,2,0,"p",9)(28,Te,2,0,"p",9)(29,De,4,5)),e&2&&(vv(4),wp("value",a.genreId()),vv(),wp("value",null),vv(2),_E(a.genres()),vv(5),wp("value",a.sortBy()),vv(10),wp("value",a.order()),vv(5),wE(a.loading()?27:a.movies().length===0?28:29));},dependencies:[Qt,Pe,B,ci,li,W,ge,N,M],styles:[".filters[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:16px;padding:24px 24px 0}.muted[_ngcontent-%COMP%]{padding:24px;color:var(--mat-sys-on-surface-variant)}.grid[_ngcontent-%COMP%]{display:grid;gap:20px;padding:16px 24px;grid-template-columns:repeat(auto-fill,minmax(180px,1fr))}mat-paginator[_ngcontent-%COMP%]{background:transparent}"]})};export{ce as MovieList};