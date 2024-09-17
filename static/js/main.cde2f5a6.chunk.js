(this["webpackJsonpdigital-trace-data"]=this["webpackJsonpdigital-trace-data"]||[]).push([[0],{38:function(e,t,i){},62:function(e,t,i){},80:function(e,t,i){"use strict";i.r(t);var s=i(2),n=i(1),a=i.n(n),c=i(20),r=i.n(c),o=(i(62),i(30)),l=i(28),d=i.n(l),p=i(33),u=i(22),h=i(23),j=i(24),b=i(27),m=i(25),g=i(54),v=i(6),f=i(42);i(81);f.a.initializeApp({apiKey:"AIzaSyCkJZaaXU2FqdsvHOhfCwSyQAmBl96GjAQ",authDomain:"tier1-testing.firebaseapp.com",projectId:"tier1-testing",storageBucket:"tier1-testing.appspot.com",messagingSenderId:"1046739624981",appId:"1:1046739624981:web:26ddf0d0a3a19ad0e5da1c",measurementId:"G-B5RW7FTVVQ"});var O=f.a,x=i(26),y=(i(38),i(16)),S=i(32),_=i(13),N=i(29),w=i.n(N),A=function(e){Object(b.a)(i,e);var t=Object(m.a)(i);function i(e){var s;Object(u.a)(this,i),(s=t.call(this,e)).state={positionList:[]},s.recordActivity=s.props.recordActivity;var n=O.firestore();return s.db=n,s.collapsibleOpened=s.collapsibleToggled.bind(Object(j.a)(s)),s}return Object(h.a)(i,[{key:"componentDidMount",value:function(){var e=this;this.setState({applicantNumber:this.props.applicantNumber,tierNumber:this.props.tierNumber},(function(){e.parseCandidateData((function(){e.getResumeValues()}))})),this.props.qualtricsUserId.startsWith("${e:")||this.db.collection("responseIDs").doc(this.props.qualtricsUserId+"_tier"+this.props.tierNumber).set({}),this.setState({appStartTime:w()().tz("America/New_York")}),window.addEventListener("blur",(function(t){t.preventDefault(),console.log("blur..."),e.state.activeSection&&(e[e.state.activeSection].click(),e.setState({activeSection:void 0,activeStartTime:void 0}))})),window.addEventListener("pagehide",(function(t){t.preventDefault(),console.log("pagehide...");var i=w()().tz("America/New_York");e.recordActivity("appTime","accessed",i.diff(e.state.appStartTime,"milliseconds")+" msec spent on app"),e.recordActivity("unloading","accessed","App unmounted")}))}},{key:"getResumeValues",value:function(){var e,t,i,s=this.state.applicants[this.state.applicantNumber-1],n=this.state.tiers[(e=this.state.tierNumber,t=this.state.applicantNumber,4*(e-1)+(t-1))];this.setState({personal_address:s.a_personal_address,name:s.a_personal_legal_name,citizenship:s.b_demographics_citizenship,gender:s.b_demographics_gender,hispanic:s.b_demographics_hispanic,racial:s.b_demographics_racial,fedu:s.c_family_fedu,medu:s.c_family_medu,gpa:n.d_gpa,courses_taken:(i=n.d_courses_taken,i.split(", ")),sat_rw:n.e_sat_rw,sat_math:n.e_sat_math,ap_subject1:n.e_ap_subject1,ap_subject2:n.e_ap_subject2})}},{key:"componentDidUpdate",value:function(e,t){if(t.activeSection&&t.activeSection!==this.state.activeSection){var i=w()().tz("America/New_York");this.recordActivity("collapsibleTime",t.activeSection,i.diff(t.activeStartTime,"milliseconds")+" msec spent on "+t.activeSection+" section")}}},{key:"collapsibleToggled",value:function(e,t){this.state[e+"SectionOpened"]?this.setState({activeSection:e,activeStartTime:w()().tz("America/New_York")}):this.setState({activeSection:void 0,activeStartTime:void 0}),this.recordActivity("collapsibleToggled",e,(this.state[e+"SectionOpened"]?"opened":"closed")+" "+e+" section"+(t.isTrusted?"":" (auto)"))}},{key:"parseCandidateData",value:function(e){var t=this,i=this.db.collection("Applicants"),s=this.db.collection("Tiers"),n=[],a=[];s.get().then((function(e){e.forEach((function(e){a.push(e.data())}))})).then((function(){t.setState({tiers:a})})).catch((function(e){console.error("Error getting tiers: ",e)})),i.get().then((function(e){e.forEach((function(e){n.push(e.data())}))})).then((function(){t.setState({applicants:n},e)})).catch((function(e){console.error("Error getting applicants:",e)}))}},{key:"addPositionToList",value:function(e){this.setState((function(t){return{positionList:[].concat(Object(x.a)(t.positionList),[e])}}))}},{key:"_onMouseMove",value:function(e){}},{key:"render",value:function(){var e=this,t=k("1_hsprofile","profile_app"+this.state.applicantNumber),i=k("2_transcripts","transcript_t"+this.state.tierNumber+"_app"+this.state.applicantNumber),n=k("3_activities","activities_t"+this.state.tierNumber+"_app"+this.state.applicantNumber),a=k("4_essay","essay_app"+this.state.applicantNumber);return this.state.name?Object(s.jsx)("div",{className:"overall",children:Object(s.jsx)("div",{className:"App",onMouseMove:this._onMouseMove.bind(this),children:Object(s.jsxs)("div",{className:"resume",children:[Object(s.jsxs)("div",{children:[Object(s.jsxs)("div",{className:"header",children:[Object(s.jsx)("span",{style:{fontWeight:"bold"},children:"Applicant #"}),": ",Object(s.jsx)("span",{children:"Engineering Undeclared"})]}),Object(s.jsx)("div",{className:"header",style:{marginTop:"20px"},children:"Student Information"}),Object(s.jsx)("p",{className:"content",style:{fontWeight:"bold"},children:"Personal Information"}),Object(s.jsxs)("p",{className:"content",children:["Legal name: ",this.state.name]}),Object(s.jsxs)("p",{className:"content",children:["Permanent home address: ",this.state.personal_address]}),Object(s.jsx)("p",{className:"content",style:{marginTop:"12px",marginBottom:"12px"}})," ",Object(s.jsx)("p",{className:"content",style:{fontWeight:"bold"},children:"Demographics"}),Object(s.jsxs)("p",{className:"content",children:["Gender: ",this.state.gender]}),Object(s.jsxs)("p",{className:"content",children:["Citizenship status: ",this.state.citizenship]}),Object(s.jsxs)("p",{className:"content",children:["Hispanic/Latino/a/x: ",this.state.hispanic]}),Object(s.jsxs)("p",{className:"content",children:["Racial identity: ",this.state.racial]}),Object(s.jsx)("p",{className:"content",style:{marginTop:"12px",marginBottom:"12px"}}),Object(s.jsx)("p",{className:"content",style:{fontWeight:"bold"},children:"Family"}),Object(s.jsxs)("p",{className:"content",children:["Father\u2019s education: ",this.state.fedu]}),Object(s.jsxs)("p",{className:"content",children:["Mother\u2019s education: ",this.state.medu]})]}),Object(s.jsx)("div",{className:"section",children:Object(s.jsx)("div",{className:"header",style:{marginTop:"20px"},children:"Education"})}),Object(s.jsxs)("div",{className:"section",children:[Object(s.jsx)("div",{className:"content",style:{fontWeight:"bold"},children:"Grades"}),Object(s.jsxs)("p",{className:"content",children:["Cumulative GPA: ",this.state.gpa]})]}),Object(s.jsxs)("div",{className:"section",children:[Object(s.jsx)("div",{className:"content",style:{marginTop:"12px",fontWeight:"bold"},children:"Courses taken in current or most recent year"}),Object(s.jsxs)("table",{className:"course-table",children:[Object(s.jsx)("thead",{}),Object(s.jsx)("tbody",{children:this.state.courses_taken.map((function(e){return Object(s.jsx)("tr",{children:Object(s.jsx)("td",{className:"courses_taken_style underline",children:e})},e)}))})]})]}),Object(s.jsxs)("div",{className:"section",children:[Object(s.jsx)("div",{className:"header",style:{marginTop:"20px"},children:"Testing"}),Object(s.jsx)("p",{className:"content",style:{fontWeight:"bold"},children:"SAT"}),this.state.sat_rw||this.state.sat_math?Object(s.jsxs)("div",{children:[Object(s.jsxs)("p",{className:"content",children:["Evidence-Based Reading and Writing: ",this.state.sat_rw]}),Object(s.jsxs)("p",{className:"content",children:["Mathematics: ",this.state.sat_math]})]}):Object(s.jsx)("p",{className:"content",children:"Not Submitted"}),Object(s.jsx)("p",{className:"content",style:{fontWeight:"bold"},children:"AP"}),Object(s.jsxs)("p",{className:"content",children:[" ",this.state.ap_subject1]}),Object(s.jsxs)("p",{className:"content",children:[" ",this.state.ap_subject2]})]}),Object(s.jsxs)(y.a,{children:[Object(s.jsxs)(_.a,{children:[Object(s.jsx)(_.a.Header,{style:{background:"white",paddingLeft:0,paddingRight:0},children:Object(s.jsxs)(y.a.Toggle,{as:S.a,style:{color:"black",width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between",fontSize:"18px",alignItems:"center"},variant:"link",eventKey:"0",ref:function(t){return e.hsprofile=t},onClick:function(t){return e.setState({hsprofileSectionOpened:!e.state.hsprofileSectionOpened},(function(){e.collapsibleToggled("hsprofile",t),e.state.hsprofileSectionOpened&&e.setState({transcriptSectionOpened:!1,activitiesSectionOpened:!1,essaySectionOpened:!1})}))},children:["High School Profile"," ",Object(s.jsx)("img",{id:"toggle_icon",src:this.state.hsprofileSectionOpened?C("minus_icon"):C("plus_icon"),alt:"toggle icon"})]})}),Object(s.jsx)(y.a.Collapse,{eventKey:"0",style:{marginTop:0},children:Object(s.jsx)(_.a.Body,{children:Object(s.jsx)("img",{src:t,className:"hsprofile-picture",alt:"High School Profile"})})})]}),Object(s.jsxs)(_.a,{children:[Object(s.jsx)(_.a.Header,{style:{background:"white",paddingLeft:0,paddingRight:0,borderTop:"1px solid black"},children:Object(s.jsxs)(y.a.Toggle,{as:S.a,style:{color:"black",width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between",fontSize:"18px",alignItems:"center"},variant:"link",eventKey:"1",ref:function(t){return e.transcript=t},onClick:function(t){return e.setState({transcriptSectionOpened:!e.state.transcriptSectionOpened},(function(){e.collapsibleToggled("transcript",t),e.state.transcriptSectionOpened&&e.setState({hsprofileSectionOpened:!1,activitiesSectionOpened:!1,essaySectionOpened:!1})}))},children:["Transcript"," ",Object(s.jsx)("img",{id:"toggle_icon",src:this.state.transcriptSectionOpened?C("minus_icon"):C("plus_icon"),alt:"toggle icon"})]})}),Object(s.jsx)(y.a.Collapse,{eventKey:"1",children:Object(s.jsx)(_.a.Body,{children:Object(s.jsx)("img",{src:i,className:"image_togglefit",alt:"Transcript"})})})]}),Object(s.jsxs)(_.a,{children:[Object(s.jsx)(_.a.Header,{style:{background:"white",paddingLeft:0,paddingRight:0,borderTop:"1px solid black"},children:Object(s.jsxs)(y.a.Toggle,{as:S.a,style:{color:"black",width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between",fontSize:"18px",alignItems:"center"},variant:"link",eventKey:"2",ref:function(t){return e.activities=t},onClick:function(t){return e.setState({activitiesSectionOpened:!e.state.activitiesSectionOpened},(function(){e.collapsibleToggled("activities",t),e.state.activitiesSectionOpened&&e.setState({hsprofileSectionOpened:!1,transcriptSectionOpened:!1,essaySectionOpened:!1})}))},children:["Activities "," ",Object(s.jsx)("img",{id:"toggle_icon",src:this.state.activitiesSectionOpened?C("minus_icon"):C("plus_icon"),alt:"toggle icon"})]})}),Object(s.jsx)(y.a.Collapse,{eventKey:"2",children:Object(s.jsx)(_.a.Body,{children:Object(s.jsx)("img",{src:n,className:"image_togglefit",alt:"Transcript"})})})]}),Object(s.jsxs)(_.a,{children:[Object(s.jsx)(_.a.Header,{style:{background:"white",paddingLeft:0,paddingRight:0,borderTop:"1px solid black"},children:Object(s.jsxs)(y.a.Toggle,{as:S.a,style:{color:"black",width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between",fontSize:"18px",alignItems:"center"},variant:"link",eventKey:"3",ref:function(t){return e.essay=t},onClick:function(t){return e.setState({essaySectionOpened:!e.state.essaySectionOpened},(function(){e.collapsibleToggled("essay",t),e.state.essaySectionOpened&&e.setState({hsprofileSectionOpened:!1,transcriptSectionOpened:!1,activitiesSectionOpened:!1})}))},children:["Personal Essay"," ",Object(s.jsx)("img",{id:"toggle_icon",src:this.state.essaySectionOpened?C("minus_icon"):C("plus_icon"),alt:"toggle icon"})]})}),Object(s.jsx)(y.a.Collapse,{eventKey:"3",children:Object(s.jsx)(_.a.Body,{children:Object(s.jsx)("img",{src:a,className:"image_togglefit",alt:"Transcript"})})})]})]})]})})}):Object(s.jsx)("h1",{children:"Loading..."})}}]),i}(a.a.Component);function C(e){return"".concat("/online-survey-digital-trace-data","/images/").concat(e,".png")}function k(e,t){return"".concat("/online-survey-digital-trace-data","/application_components/").concat(e,"/").concat(t,".png")}var T=i(56);function D(){var e=Object(n.useState)([]),t=Object(T.a)(e,2),i=t[0],a=t[1],c=function(e,t){var n="/online-survey-digital-trace-data/#/".concat(e,"/").concat(t,"/0sampleResponseIDstudy").concat(e),c="".concat(e).concat(t),r=Object(s.jsx)("iframe",{height:"630px",width:"100%",src:n,title:c},c);a([].concat(Object(x.a)(i),[r]))};return Object(s.jsxs)("div",{className:"LandingPage container",children:[Object(s.jsx)("h1",{children:"Pretend this is the Qualtrics Survey"}),Object(s.jsx)("h2",{children:"You'll have some questions"}),Object(s.jsx)("p",{children:"And information and such"}),Object(s.jsx)("p",{children:"And then you can embed the Digital Trace Data page."}),Object(s.jsx)("p",{children:"By default, we are manipulating candidate gender and parenthood status."}),Object(s.jsx)("p",{children:"There are two resumes. Here's Candidate 1."}),Object(s.jsx)("h3",{children:"First Resume"}),Object(s.jsx)("button",{onClick:function(){return c(1,1)},children:"Generate Candidate 1 resume"}),i.length>=1&&i[0],Object(s.jsx)("h3",{children:"Second Resume"}),Object(s.jsx)("p",{children:"And now Candidate 2."}),Object(s.jsx)("button",{onClick:function(){return c(1,2)},children:"Generate Candidate 2 resume"}),i.length>=2&&i[1],Object(s.jsx)("h2",{children:"Downloading the Data"}),Object(s.jsxs)("p",{children:["Once you've run your study, you can download the data in CSV format at"," ",Object(s.jsx)("a",{href:"#/admin",children:"/admin"}),". In this demo, you can download the data no matter what password you put in."]})]})}var I=i(53),E=i.n(I),P=i(44),B=i.n(P),R=(i(51),function(e){Object(b.a)(i,e);var t=Object(m.a)(i);function i(e){var s;Object(u.a)(this,i),(s=t.call(this,e)).state={showPasswordErrorMessage:!1,isAuthenticated:!1,typedText:"",userIDs:[],resumeCSVurl:null,activitiesCSVurl:null},s.DATABASE=O.firestore(),s.resumeContent=[],s.activityContent=[];var n=document.getElementById("root");return B.a.setAppElement(n),s}return Object(h.a)(i,[{key:"handleChange",value:function(e){this.setState({showPasswordErrorMessage:!1}),this.setState({typedText:e.target.value})}},{key:"submitPassword",value:function(){"it's so so secret"===this.state.typedText?(this.setState({isAuthenticated:!0}),this.fetchData()):this.setState({showPasswordErrorMessage:!0,isAuthenticated:!1})}},{key:"fetchData",value:function(){var e=Object(p.a)(d.a.mark((function e(){var t,i,s=this;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=null,e.next=5;break;case 5:return e.next=7,this.DATABASE.collection("responseIDs").get();case 7:i=e.sent,t=i.docs.map((function(e){return e.id}));case 9:t.length>0&&this.setState({userIDs:t},(function(){var e=t.map((function(e){return Promise.all([s.getResumeContent(e,1),s.getResumeContent(e,2)])}));Promise.all(e).then((function(){s.setState({resumeCSVurl:s.createCSV(s.resumeContent)})})).catch((function(e){console.error("Error fetching resumes:",e)}));var i=t.map((function(e){return Promise.all(Object(x.a)(Array(4).keys()).map((function(e){return++e})).map((function(t){return s.getActivityContent(e.split("_tier")[0],e.split("_tier")[1],t)})))}));Promise.all(i).then((function(){s.setState({activitiesCSVurl:s.createCSV(s.activityContent)})})).catch((function(e){console.error("Error fetching activity:",e)}))}));case 10:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getResumeContent",value:function(e,t){var i=this;return this.DATABASE.collection("responseIDs").doc(e).collection("values shown").doc("resume ".concat(t)).get().then((function(s){s.exists?i.resumeContent.push(Object(o.a)({responseID:e,resumeNum:t},s.data())):console.log("No such document!")})).catch((function(e){console.error("Error getting document:",e)}))}},{key:"getActivityContent",value:function(e,t,i){var s=this;return this.DATABASE.collection("responseIDs").doc("".concat(e,"_tier").concat(t)).collection("app".concat(i)).get().then((function(n){n.forEach((function(n){s.activityContent.push(Object(o.a)({responseID:e,tierNum:t,appNum:i,activityID:n.id},n.data()))}))}))}},{key:"createCSV",value:function(e){var t=E.a.unparse(e),i=new Blob([t],{type:"text/csv"});return URL.createObjectURL(i)}},{key:"render",value:function(){var e=this;return this.state.isAuthenticated?Object(s.jsx)("div",{className:"overall",children:Object(s.jsxs)("div",{className:"container",children:[Object(s.jsx)("div",{className:"title",children:"Download Data"}),!this.state.activitiesCSVurl&&!this.state.resumeCSVurl&&Object(s.jsx)("p",{children:"Processing..."}),this.state.activitiesCSVurl&&Object(s.jsx)("div",{className:"horizontal",id:"big",children:Object(s.jsx)("a",{href:this.state.activitiesCSVurl,download:"activity_data.csv",children:"Activity Data"})}),this.state.resumeCSVurl&&Object(s.jsx)("div",{className:"horizontal",id:"big",children:Object(s.jsx)("a",{href:this.state.resumeCSVurl,download:"resume_data.csv",children:"Resume Data"})})]})}):Object(s.jsx)(B.a,{className:"modal_dtp",isOpen:!this.state.isAuthenticated,children:Object(s.jsxs)("form",{onSubmit:function(t){t.preventDefault(),e.submitPassword()},children:[Object(s.jsxs)("div",{children:[Object(s.jsx)("label",{htmlFor:"password",children:"Enter Password:"}),Object(s.jsx)("input",{type:"password",id:"password",onChange:this.handleChange.bind(this),value:this.state.typedText,autoFocus:!0}),Object(s.jsx)("button",{type:"submit",children:"Submit"})]}),this.state.showPasswordErrorMessage&&Object(s.jsx)("div",{id:"red",children:"Invalid password. Please re-enter."})]})})}}]),i}(a.a.Component)),z=R,V=i(29),L=function(e){Object(b.a)(i,e);var t=Object(m.a)(i);function i(e){var s;Object(u.a)(this,i),(s=t.call(this,e)).activityCounter=1,s.recordActivity=s.recordActivity.bind(Object(j.a)(s)),s.DATABASE=O.firestore();var n=document.location.hash;return s.applicantNumber=parseInt(n.split("/")[1]),s.tierNumber=parseInt(n.split("/")[2]),s.qualtricsUserId=n.split("/")[3],console.log("qualtricsUserId: "+s.qualtricsUserId),s}return Object(h.a)(i,[{key:"recordActivity",value:function(){var e=Object(p.a)(d.a.mark((function e(t,i,s){var n,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0!==this.qualtricsUserId&&!this.qualtricsUserId.startsWith("${e:")){e.next=2;break}return e.abrupt("return");case 2:n=this.activityCounter.toString().padStart(5,"0"),this.activityCounter=this.activityCounter+1,a=V(),this.DATABASE.collection("responseIDs").doc(this.qualtricsUserId+"_tier"+this.tierNumber.toString()).collection("app"+this.applicantNumber.toString()).doc(n).set({category:t,description:s,value:i,timestamp:new Date(a),timeEpoch:Number(a.format("x")),timeReadable:a.tz("America/Los_Angeles").format("M-D-YY h:mm:ssa")}),console.log(n+" "+t+": "+i+" -- "+s);case 7:case"end":return e.stop()}}),e,this)})));return function(t,i,s){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){var e=this;this.DATABASE.collection("responseIDs").doc(this.qualtricsUserId+"_tier"+this.tierNumber.toString()).collection("app"+this.applicantNumber.toString()).get().then((function(t){e.activityCounter=t.size+1,e.recordActivity("loading","accessed","App mounted")}))}},{key:"render",value:function(){var e=this;return Object(s.jsx)("div",{children:Object(s.jsxs)(g.a,{children:[Object(s.jsx)(v.a,{path:"/:applicantNumber/:tierNumber/:qualtricsUserId",render:function(t){return Object(s.jsx)(A,Object(o.a)(Object(o.a)({},t),{},{applicantNumber:e.applicantNumber,tierNumber:e.tierNumber,recordActivity:e.recordActivity,qualtricsUserId:e.qualtricsUserId}))}}),Object(s.jsx)(v.a,{path:"/admin",render:function(){return Object(s.jsx)(z,{})}}),Object(s.jsx)(v.a,{path:"/",exact:!0,render:function(){return Object(s.jsx)(D,{})}})]})})}}]),i}(a.a.Component);r.a.render(Object(s.jsx)(a.a.StrictMode,{children:Object(s.jsx)(L,{})}),document.getElementById("root"))}},[[80,1,2]]]);
//# sourceMappingURL=main.cde2f5a6.chunk.js.map