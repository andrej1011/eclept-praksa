import {p}from'./chunk-C6YOlgHS.js';import {c as ci,l as li,I as Ii}from'./chunk-BbuX91JR.js';import {C,A as Ao,V as VD,K as KI,aZ as W,c as ci$1,a as yD,R as Rc,d as Ap,M as ME,T as TE,E as Ev,i as Cp,N as NE,f as CE,J as XI,L as Bl,z as kn,ac as mF,aj as pe,a_ as Nn,ap as IF,ah as Fe,U as A,a$ as Pt,a3 as vF,b0 as Cu,h as bp,b1 as bu,F as Fc,a6 as Tp,aF as OE,aG as du,B as BE,aI as fu,b2 as MD,b3 as jt,b4 as ye$1,O as us,b5 as yt,Z as te,b6 as dr,aY as _E,aH as ZE,aq as wp,H as zp}from'./main-U55BM6BW.js';import {M}from'./chunk-DL5mTlMD.js';import {Q as Qt,P as Pe,B}from'./chunk-BhD-0UvN.js';import'./chunk-CweUnAlQ.js';import {m}from'./chunk-44w8hIbl.js';import'./chunk-CY7PMOFa.js';var me=(()=>{class t{static \u0275fac=function(a){return new(a||t)};static \u0275mod=XI({type:t});static \u0275inj=Bl({imports:[jt,ye$1,us,yt]})}return t})();function _e(t,o){if(t&1&&(ci$1(0,"mat-option",17),yD(1),Rc()),t&2){let e=o.$implicit;Cp("value",e),Ev(),Fc(" ",e," ");}}function ve(t,o){if(t&1){let e=OE();ci$1(0,"mat-form-field",14)(1,"mat-select",16,0),Ap("selectionChange",function(i){du(e);let l=BE(2);return fu(l._changePageSize(i.value))}),ME(3,_e,2,2,"mat-option",17,_E),Rc(),ci$1(5,"div",18),Ap("click",function(){du(e);let i=ZE(2);return fu(i.open())}),Rc()();}if(t&2){let e=BE(2);Cp("appearance",e._formFieldAppearance)("color",e.color),Ev(),Cp("value",e.pageSize)("disabled",e.disabled),wp("aria-labelledby",e._pageSizeLabelId),Cp("panelClass",e.selectConfig.panelClass||"")("disableOptionCentering",e.selectConfig.disableOptionCentering),Ev(2),NE(e._displayedPageSizeOptions);}}function he(t,o){if(t&1&&(ci$1(0,"div",15),yD(1),Rc()),t&2){let e=BE(2);Ev(),zp(e.pageSize);}}function fe(t,o){if(t&1&&(ci$1(0,"div",3)(1,"div",13),yD(2),Rc(),TE(3,ve,6,7,"mat-form-field",14),TE(4,he,2,1,"div",15),Rc()),t&2){let e=BE();Ev(),Tp("id",e._pageSizeLabelId),Ev(),Fc(" ",e._intl.itemsPerPageLabel," "),Ev(),CE(e._displayedPageSizeOptions.length>1?3:-1),Ev(),CE(e._displayedPageSizeOptions.length<=1?4:-1);}}function be(t,o){if(t&1){let e=OE();ci$1(0,"button",19),Ap("click",function(){du(e);let i=BE();return fu(i._buttonClicked(0,i._previousButtonsDisabled()))}),Cu(),ci$1(1,"svg",8),bp(2,"path",20),Rc()();}if(t&2){let e=BE();Cp("matTooltip",e._intl.firstPageLabel)("matTooltipDisabled",e._previousButtonsDisabled())("disabled",e._previousButtonsDisabled())("tabindex",e._previousButtonsDisabled()?-1:null),Tp("aria-label",e._intl.firstPageLabel);}}function xe(t,o){if(t&1){let e=OE();ci$1(0,"button",21),Ap("click",function(){du(e);let i=BE();return fu(i._buttonClicked(i.getNumberOfPages()-1,i._nextButtonsDisabled()))}),Cu(),ci$1(1,"svg",8),bp(2,"path",22),Rc()();}if(t&2){let e=BE();Cp("matTooltip",e._intl.lastPageLabel)("matTooltipDisabled",e._nextButtonsDisabled())("disabled",e._nextButtonsDisabled())("tabindex",e._nextButtonsDisabled()?-1:null),Tp("aria-label",e._intl.lastPageLabel);}}var Se=(()=>{class t{changes=new te;itemsPerPageLabel="Items per page:";nextPageLabel="Next page";previousPageLabel="Previous page";firstPageLabel="First page";lastPageLabel="Last page";getRangeLabel=(e,a,i)=>{if(i==0||a==0)return `0 of ${i}`;i=Math.max(i,0);let l=e*a,C=l<i?Math.min(l+a,i):l+a;return `${l+1} \u2013 ${C} of ${i}`};static \u0275fac=function(a){return new(a||t)};static \u0275prov=dr({token:t,factory:t.\u0275fac})}return t})(),ye=50;var Me=new A("MAT_PAGINATOR_DEFAULT_OPTIONS"),N=(()=>{class t{_intl=C(Se);_changeDetectorRef=C(mF);_formFieldAppearance;_pageSizeLabelId=C(pe).getId("mat-paginator-page-size-label-");_intlChanges;_isInitialized=false;_initializedStream=new Nn(1);color;get pageIndex(){return this._pageIndex}set pageIndex(e){this._pageIndex=Math.max(e||0,0),this._changeDetectorRef.markForCheck();}_pageIndex=0;get length(){return this._length}set length(e){this._length=e||0,this._changeDetectorRef.markForCheck();}_length=0;get pageSize(){return this._pageSize}set pageSize(e){this._pageSize=Math.max(e||0,0),this._updateDisplayedPageSizeOptions();}_pageSize;get pageSizeOptions(){return this._pageSizeOptions}set pageSizeOptions(e){this._pageSizeOptions=(e||[]).map(a=>IF(a,0)),this._updateDisplayedPageSizeOptions();}_pageSizeOptions=[];hidePageSize=false;showFirstLastButtons=false;selectConfig={};disabled=false;page=new Fe;_displayedPageSizeOptions;initialized=this._initializedStream;constructor(){let e=this._intl,a=C(Me,{optional:true});if(this._intlChanges=e.changes.subscribe(()=>this._changeDetectorRef.markForCheck()),a){let{pageSize:i,pageSizeOptions:l,hidePageSize:C,showFirstLastButtons:A}=a;i!=null&&(this._pageSize=i),l!=null&&(this._pageSizeOptions=l),C!=null&&(this.hidePageSize=C),A!=null&&(this.showFirstLastButtons=A);}this._formFieldAppearance=a?.formFieldAppearance||"outline";}ngOnInit(){this._isInitialized=true,this._updateDisplayedPageSizeOptions(),this._initializedStream.next();}ngOnDestroy(){this._initializedStream.complete(),this._intlChanges.unsubscribe();}nextPage(){this.hasNextPage()&&this._navigate(this.pageIndex+1);}previousPage(){this.hasPreviousPage()&&this._navigate(this.pageIndex-1);}firstPage(){this.hasPreviousPage()&&this._navigate(0);}lastPage(){this.hasNextPage()&&this._navigate(this.getNumberOfPages()-1);}hasPreviousPage(){return this.pageIndex>=1&&this.pageSize!=0}hasNextPage(){let e=this.getNumberOfPages()-1;return this.pageIndex<e&&this.pageSize!=0}getNumberOfPages(){return this.pageSize?Math.ceil(this.length/this.pageSize):0}_changePageSize(e){let a=this.pageIndex*this.pageSize,i=this.pageIndex;this.pageIndex=Math.floor(a/e)||0,this.pageSize=e,this._emitPageEvent(i);}_nextButtonsDisabled(){return this.disabled||!this.hasNextPage()}_previousButtonsDisabled(){return this.disabled||!this.hasPreviousPage()}_updateDisplayedPageSizeOptions(){this._isInitialized&&(this.pageSize||(this._pageSize=this.pageSizeOptions.length!=0?this.pageSizeOptions[0]:ye),this._displayedPageSizeOptions=this.pageSizeOptions.slice(),this._displayedPageSizeOptions.indexOf(this.pageSize)===-1&&this._displayedPageSizeOptions.push(this.pageSize),this._displayedPageSizeOptions.sort((e,a)=>e-a),this._changeDetectorRef.markForCheck());}_emitPageEvent(e){this.page.emit({previousPageIndex:e,pageIndex:this.pageIndex,pageSize:this.pageSize,length:this.length});}_navigate(e){let a=this.pageIndex;e!==a&&(this.pageIndex=e,this._emitPageEvent(a));}_buttonClicked(e,a){a||this._navigate(e);}static \u0275fac=function(a){return new(a||t)};static \u0275cmp=KI({type:t,selectors:[["mat-paginator"]],hostAttrs:["role","group",1,"mat-mdc-paginator"],inputs:{color:"color",pageIndex:[2,"pageIndex","pageIndex",IF],length:[2,"length","length",IF],pageSize:[2,"pageSize","pageSize",IF],pageSizeOptions:"pageSizeOptions",hidePageSize:[2,"hidePageSize","hidePageSize",vF],showFirstLastButtons:[2,"showFirstLastButtons","showFirstLastButtons",vF],selectConfig:"selectConfig",disabled:[2,"disabled","disabled",vF]},outputs:{page:"page"},exportAs:["matPaginator"],decls:14,vars:14,consts:[["selectRef",""],[1,"mat-mdc-paginator-outer-container"],[1,"mat-mdc-paginator-container"],[1,"mat-mdc-paginator-page-size"],[1,"mat-mdc-paginator-range-actions"],["aria-atomic","true","aria-live","polite","role","status",1,"mat-mdc-paginator-range-label"],["matIconButton","","type","button","matTooltipPosition","above","disabledInteractive","",1,"mat-mdc-paginator-navigation-first",3,"matTooltip","matTooltipDisabled","disabled","tabindex"],["matIconButton","","type","button","matTooltipPosition","above","disabledInteractive","",1,"mat-mdc-paginator-navigation-previous",3,"click","matTooltip","matTooltipDisabled","disabled","tabindex"],["viewBox","0 0 24 24","focusable","false","aria-hidden","true",1,"mat-mdc-paginator-icon"],["d","M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"],["matIconButton","","type","button","matTooltipPosition","above","disabledInteractive","",1,"mat-mdc-paginator-navigation-next",3,"click","matTooltip","matTooltipDisabled","disabled","tabindex"],["d","M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"],["matIconButton","","type","button","matTooltipPosition","above","disabledInteractive","",1,"mat-mdc-paginator-navigation-last",3,"matTooltip","matTooltipDisabled","disabled","tabindex"],["aria-hidden","true",1,"mat-mdc-paginator-page-size-label"],[1,"mat-mdc-paginator-page-size-select",3,"appearance","color"],[1,"mat-mdc-paginator-page-size-value"],["hideSingleSelectionIndicator","",3,"selectionChange","value","disabled","aria-labelledby","panelClass","disableOptionCentering"],[3,"value"],[1,"mat-mdc-paginator-touch-target",3,"click"],["matIconButton","","type","button","matTooltipPosition","above","disabledInteractive","",1,"mat-mdc-paginator-navigation-first",3,"click","matTooltip","matTooltipDisabled","disabled","tabindex"],["d","M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"],["matIconButton","","type","button","matTooltipPosition","above","disabledInteractive","",1,"mat-mdc-paginator-navigation-last",3,"click","matTooltip","matTooltipDisabled","disabled","tabindex"],["d","M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"]],template:function(a,i){a&1&&(ci$1(0,"div",1)(1,"div",2),TE(2,fe,5,4,"div",3),ci$1(3,"div",4)(4,"div",5),yD(5),Rc(),TE(6,be,3,5,"button",6),ci$1(7,"button",7),Ap("click",function(){return i._buttonClicked(i.pageIndex-1,i._previousButtonsDisabled())}),Cu(),ci$1(8,"svg",8),bp(9,"path",9),Rc()(),bu(),ci$1(10,"button",10),Ap("click",function(){return i._buttonClicked(i.pageIndex+1,i._nextButtonsDisabled())}),Cu(),ci$1(11,"svg",8),bp(12,"path",11),Rc()(),TE(13,xe,3,5,"button",12),Rc()()()),a&2&&(Ev(2),CE(i.hidePageSize?-1:2),Ev(3),Fc(" ",i._intl.getRangeLabel(i.pageIndex,i.pageSize,i.length)," "),Ev(),CE(i.showFirstLastButtons?6:-1),Ev(),Cp("matTooltip",i._intl.previousPageLabel)("matTooltipDisabled",i._previousButtonsDisabled())("disabled",i._previousButtonsDisabled())("tabindex",i._previousButtonsDisabled()?-1:null),Tp("aria-label",i._intl.previousPageLabel),Ev(3),Cp("matTooltip",i._intl.nextPageLabel)("matTooltipDisabled",i._nextButtonsDisabled())("disabled",i._nextButtonsDisabled())("tabindex",i._nextButtonsDisabled()?-1:null),Tp("aria-label",i._intl.nextPageLabel),Ev(3),CE(i.showFirstLastButtons?13:-1));},dependencies:[Pe,li,W,Pt,Ii],styles:[`.mat-mdc-paginator {
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
`],encapsulation:2})}return t})(),ge=(()=>{class t{static \u0275fac=function(a){return new(a||t)};static \u0275mod=XI({type:t});static \u0275inj=Bl({imports:[kn,ci,me,N]})}return t})();var ze=()=>[8,12,24],ue=(t,o)=>o.id;function Ce(t,o){if(t&1&&(ci$1(0,"mat-option",3),yD(1),Rc()),t&2){let e=o.$implicit;Cp("value",e.id),Ev(),zp(e.name);}}function Ie(t,o){t&1&&(ci$1(0,"p",9),yD(1,"Loading\u2026"),Rc());}function Te(t,o){t&1&&(ci$1(0,"p",9),yD(1,"No movies found."),Rc());}function Oe(t,o){if(t&1&&bp(0,"app-movie-card",11),t&2){let e=o.$implicit;Cp("movie",e);}}function De(t,o){if(t&1){let e=OE();ci$1(0,"div",10),ME(1,Oe,1,1,"app-movie-card",11,ue),Rc(),ci$1(3,"mat-paginator",12),Ap("page",function(i){du(e);let l=BE();return fu(l.onPage(i))}),Rc();}if(t&2){let e=BE();Ev(),NE(e.paged()),Ev(2),Cp("length",e.movies().length)("pageSize",e.pageSize())("pageSizeOptions",MD(4,ze))("pageIndex",e.pageIndex());}}var ce=class t{movieSvc=C(m);genreSvc=C(p);genres=Ao([]);movies=Ao([]);loading=Ao(true);genreId=Ao(null);sortBy=Ao("name");order=Ao("asc");pageIndex=Ao(0);pageSize=Ao(12);paged=VD(()=>{let o=this.pageIndex()*this.pageSize();return this.movies().slice(o,o+this.pageSize())});constructor(){this.genreSvc.list().then(o=>this.genres.set(o)),this.load();}async load(){this.loading.set(true);try{this.movies.set(await this.movieSvc.list({genre_id:this.genreId()??void 0,sort_by:this.sortBy(),order:this.order(),limit:100})),this.pageIndex.set(0);}finally{this.loading.set(false);}}setGenre(o){this.genreId.set(o),this.load();}setSort(o){this.sortBy.set(o),this.load();}setOrder(o){this.order.set(o),this.load();}onPage(o){this.pageIndex.set(o.pageIndex),this.pageSize.set(o.pageSize);}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=KI({type:t,selectors:[["app-movie-list"]],decls:30,vars:5,consts:[[1,"filters"],["appearance","outline"],[3,"selectionChange","value"],[3,"value"],["value","name"],["value","release_date"],["value","duration"],["value","asc"],["value","desc"],[1,"muted"],[1,"grid"],[3,"movie"],[3,"page","length","pageSize","pageSizeOptions","pageIndex"]],template:function(e,a){e&1&&(ci$1(0,"div",0)(1,"mat-form-field",1)(2,"mat-label"),yD(3,"Genre"),Rc(),ci$1(4,"mat-select",2),Ap("selectionChange",function(l){return a.setGenre(l.value)}),ci$1(5,"mat-option",3),yD(6,"All"),Rc(),ME(7,Ce,2,2,"mat-option",3,ue),Rc()(),ci$1(9,"mat-form-field",1)(10,"mat-label"),yD(11,"Sort by"),Rc(),ci$1(12,"mat-select",2),Ap("selectionChange",function(l){return a.setSort(l.value)}),ci$1(13,"mat-option",4),yD(14,"Name"),Rc(),ci$1(15,"mat-option",5),yD(16,"Release date"),Rc(),ci$1(17,"mat-option",6),yD(18,"Duration"),Rc()()(),ci$1(19,"mat-form-field",1)(20,"mat-label"),yD(21,"Order"),Rc(),ci$1(22,"mat-select",2),Ap("selectionChange",function(l){return a.setOrder(l.value)}),ci$1(23,"mat-option",7),yD(24,"Ascending"),Rc(),ci$1(25,"mat-option",8),yD(26,"Descending"),Rc()()()(),TE(27,Ie,2,0,"p",9)(28,Te,2,0,"p",9)(29,De,4,5)),e&2&&(Ev(4),Cp("value",a.genreId()),Ev(),Cp("value",null),Ev(2),NE(a.genres()),Ev(5),Cp("value",a.sortBy()),Ev(10),Cp("value",a.order()),Ev(5),CE(a.loading()?27:a.movies().length===0?28:29));},dependencies:[Qt,Pe,B,ci,li,W,ge,N,M],styles:[".filters[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:16px;padding:24px 24px 0}.muted[_ngcontent-%COMP%]{padding:24px;color:var(--mat-sys-on-surface-variant)}.grid[_ngcontent-%COMP%]{display:grid;gap:20px;padding:16px 24px;grid-template-columns:repeat(auto-fill,minmax(180px,1fr))}mat-paginator[_ngcontent-%COMP%]{background:transparent}"]})};export{ce as MovieList};