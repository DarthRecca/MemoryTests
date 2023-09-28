import{u as M}from"./tests-7fa75cfb.js";import{_ as f}from"./_plugin-vue_export-helper-c27b6911.js";import{V as p}from"./VBtn-07ada711.js";import{V as b}from"./VTable-80d1b801.js";import{o as r,az as a,aB as e,aA as n,b as t,a as l,w as u,d as i,F as _,aK as C,aL as B,aC as P}from"./index-4660cc02.js";const D={data(){return{maxIterations:50,currentIteration:0,prompt:"",sequence:[],turnsTillRepeat:0,n:2,result:"",showResult:!1,showPrompt:!0,promptTime:"",resposeTime:"",nBackTestData:{individualPromptData:[],nBackTestScore:0,performanceParameters:{matchTrialsTotal:0,matchTrialsCorrect:0,matchTrialsIncorrect:0,nonMatchTrialsTotal:0,nonMatchTrialsCorrect:0,nonMatchTrialsIncorrect:0}},score:0,inputReceived:!1,repeatFlag:!1,completed:!1}},methods:{generatePrompt(){this.showResult=!1,this.checkMiss(),this.turnsTillRepeat==0?(this.sequence.length-this.n>=0?(this.prompt=this.sequence[this.sequence.length-1-(this.n-1)],this.sequence.push(this.prompt),this.repeatFlag=!0,this.nBackTestData.performanceParameters.matchTrialsTotal+=1):(this.prompt=String.fromCharCode(65+Math.floor(Math.random()*26)),this.sequence.push(this.prompt),this.nBackTestData.performanceParameters.nonMatchTrialsTotal+=1),this.turnsTillRepeat=Math.floor(Math.random()*8)):(this.prompt=String.fromCharCode(65+Math.floor(Math.random()*26)),this.sequence.push(this.prompt),this.turnsTillRepeat=this.turnsTillRepeat-1,this.nBackTestData.performanceParameters.nonMatchTrialsTotal+=1),setTimeout(()=>{this.showPrompt=!0},2500),setTimeout(()=>{this.showPrompt=!1},1e3),this.sequence.length>7&&this.sequence.shift(),this.currentIteration+=1,this.promptTime=Date.now(),this.currentIteration==this.maxIterations?this.testCompleted():setTimeout(()=>{this.generatePrompt()},2e3)},checkMiss(){if(this.inputReceived==!1)if(this.repeatFlag==!0){this.score=this.score-1;const s={prompt:this.prompt,answer:"",result:"Miss",timeTaken:""};this.nBackTestData.individualPromptData.push(s),this.nBackTestData.performanceParameters.matchTrialsIncorrect+=1}else this.nBackTestData.performanceParameters.nonMatchTrialsCorrect+=1,this.score+=1;else this.repeatFlag==!1?(this.nBackTestData.performanceParameters.nonMatchTrialsIncorrect+=1,this.score=this.score-1):this.nBackTestData.performanceParameters.matchTrialsCorrect+=1;this.repeatFlag=!1,this.inputReceived=!1},checkAnswer(){this.responseTime=Date.now();const s=this.sequence[this.sequence.length-1-this.n];this.inputReceived=!0,this.prompt===s.toString()?(this.score+=1,this.result="Correct"):this.result="Incorrect";const o=this.responseTime-this.promptTime,m={prompt:this.prompt,answer:s.toString(),result:this.result,timeTaken:o};this.nBackTestData.individualPromptData.push(m),this.showResult=!0},testCompleted(){this.nBackTestData.nBackTestScore=this.score,M().addNBackTestData(this.nBackTestData),this.completed=!0}},computed:{matchTrialsCorrectPercent(){return Math.floor(this.nBackTestData.performanceParameters.matchTrialsCorrect/this.nBackTestData.performanceParameters.matchTrialsTotal*100)},matchTrialsIncorrectPercent(){return Math.floor(this.nBackTestData.performanceParameters.matchTrialsIncorrect/this.nBackTestData.performanceParameters.matchTrialsTotal*100)},nonMatchTrialsCorrectPercent(){return Math.floor(this.nBackTestData.performanceParameters.nonMatchTrialsCorrect/this.nBackTestData.performanceParameters.nonMatchTrialsTotal*100)},nonMatchTrialsIncorrectPercent(){return Math.floor(this.nBackTestData.performanceParameters.nonMatchTrialsIncorrect/this.nBackTestData.performanceParameters.nonMatchTrialsTotal*100)},totalTasks(){return this.nBackTestData.performanceParameters.matchTrialsTotal+this.nBackTestData.performanceParameters.nonMatchTrialsTotal},totalCorrect(){return this.nBackTestData.performanceParameters.matchTrialsCorrect+this.nBackTestData.performanceParameters.nonMatchTrialsCorrect},totalCorrectPercent(){return Math.floor(this.totalCorrect/this.totalTasks*100)},totalIncorrect(){return this.nBackTestData.performanceParameters.matchTrialsIncorrect+this.nBackTestData.performanceParameters.nonMatchTrialsIncorrect},totalIncorrectPercent(){return Math.floor(this.totalIncorrect/this.totalTasks*100)}},mounted(){this.generatePrompt()}},h=s=>(C("data-v-3b3ad732"),s=s(),B(),s),I={key:0,class:"n-back-container"},v={key:0,class:"n-back-prompt"},y={class:"n-back-input-container"},$={key:1,class:"result"},S={key:1},R=h(()=>t("p",{class:"completed"},"Test Completed",-1)),N=h(()=>t("br",null,null,-1)),q=h(()=>t("caption",null," Your Performance ",-1)),F=h(()=>t("thead",null,[t("tr",null,[t("th",null,"Parameter"),t("th",null,"Quantity"),t("th",null,"No. of correct tasks"),t("th",null,"%age of correct tasks"),t("th",null,"No. of incorrect tasks"),t("th",null,"%age of incorrect tasks")])],-1)),x=h(()=>t("td",null,[t("b",null,"Trials that had match")],-1)),V=h(()=>t("td",null,[t("b",null,"Trials that had no match")],-1)),z=h(()=>t("td",null,[t("b",null,"Total of trials")],-1)),A=h(()=>t("br",null,null,-1));function Y(s,o,m,k,c,d){return r(),a(_,null,[this.completed?n("",!0):(r(),a("div",I,[this.showPrompt?(r(),a("h1",v,e(c.prompt),1)):n("",!0),t("div",y,[l(p,{onClick:o[0]||(o[0]=T=>this.checkAnswer()),color:"green",size:"large"},{default:u(()=>[i("Matches")]),_:1})]),c.showResult?(r(),a("p",$,"Your answer is "+e(c.result)+"!",1)):n("",!0)])),this.completed?(r(),a("div",S,[R,N,l(b,{class:"performance-table"},{default:u(()=>[q,F,t("tbody",null,[t("tr",null,[x,t("td",null,e(this.nBackTestData.performanceParameters.matchTrialsTotal),1),t("td",null,e(this.nBackTestData.performanceParameters.matchTrialsCorrect),1),t("td",null,e(this.matchTrialsCorrectPercent),1),t("td",null,e(this.nBackTestData.performanceParameters.matchTrialsIncorrect),1),t("td",null,e(this.matchTrialsIncorrectPercent),1)]),t("tr",null,[V,t("td",null,e(this.nBackTestData.performanceParameters.nonMatchTrialsTotal),1),t("td",null,e(this.nBackTestData.performanceParameters.nonMatchTrialsCorrect),1),t("td",null,e(this.nonMatchTrialsCorrectPercent),1),t("td",null,e(this.nBackTestData.performanceParameters.nonMatchTrialsIncorrect),1),t("td",null,e(this.nonMatchTrialsIncorrectPercent),1)]),t("tr",null,[z,t("td",null,e(this.totalTasks),1),t("td",null,e(this.totalCorrect),1),t("td",null,e(this.totalCorrectPercent),1),t("td",null,e(this.totalIncorrect),1),t("td",null,e(this.totalIncorrectPercent),1)])])]),_:1}),A,l(p,{to:"/longtermmemorytest/long",size:"x-large",block:"",color:"red-lighten-3",rounded:"lg"},{default:u(()=>[i("Next")]),_:1})])):n("",!0)],64)}const E=f(D,[["render",Y],["__scopeId","data-v-3b3ad732"]]);const H={data(){return{maxIterations:20,currentIteration:0,prompt:"",sequence:[],turnsTillRepeat:0,n:2,result:"",showResult:!1,showPrompt:!0,inputReceived:!1,repeatFlag:!1,completed:!1}},methods:{generatePrompt(){this.showResult=!1,this.checkMiss(),this.turnsTillRepeat==0?(this.sequence.length-this.n>=0?(this.prompt=this.sequence[this.sequence.length-1-(this.n-1)],this.sequence.push(this.prompt),this.repeatFlag=!0):(this.prompt=String.fromCharCode(65+Math.floor(Math.random()*26)),this.sequence.push(this.prompt)),this.turnsTillRepeat=Math.floor(Math.random()*8)):(this.prompt=String.fromCharCode(65+Math.floor(Math.random()*26)),this.sequence.push(this.prompt),this.turnsTillRepeat=this.turnsTillRepeat-1),setTimeout(()=>{this.showPrompt=!0},2500),setTimeout(()=>{this.showPrompt=!1},1e3),this.sequence.length>7&&this.sequence.shift(),this.currentIteration+=1,this.currentIteration==this.maxIterations?this.testCompleted():setTimeout(()=>{this.generatePrompt()},2e3)},checkMiss(){this.repeatFlag=!1,this.inputReceived=!1},checkAnswer(){const s=this.sequence[this.sequence.length-1-this.n];this.inputReceived=!0,this.prompt===s.toString()?this.result="Correct":this.result="Incorrect",this.showResult=!0},testCompleted(){this.completed=!0}},mounted(){this.generatePrompt()}},K=s=>(C("data-v-f2f70582"),s=s(),B(),s),L={key:0,class:"n-back-container"},Q={key:0,class:"n-back-prompt"},j={class:"n-back-input-container"},G={key:1,class:"result"},J={key:1,class:"completed"},O=K(()=>t("p",null,"Trial Completed",-1));function U(s,o,m,k,c,d){return r(),a(_,null,[this.completed?n("",!0):(r(),a("div",L,[this.showPrompt?(r(),a("h1",Q,e(c.prompt),1)):n("",!0),t("div",j,[l(p,{onClick:d.checkAnswer,color:"green",block:"",size:"large"},{default:u(()=>[i("Matches")]),_:1},8,["onClick"])]),c.showResult?(r(),a("p",G,"Your answer is "+e(c.result)+"!",1)):n("",!0)])),this.completed?(r(),a("div",J,[O,l(p,{onClick:o[0]||(o[0]=T=>s.$emit("trialCompleted")),size:"x-large",block:"",color:"red-lighten-3",rounded:"lg"},{default:u(()=>[i("Next")]),_:1})])):n("",!0)],64)}const W=f(H,[["render",U],["__scopeId","data-v-f2f70582"]]);const X={name:"NBackTestView",data(){return{testStartFlag:!1,trialStartFlag:!1,trialCompleted:!1}},components:{NBackTest:E,NBackTrial:W},methods:{startTest(){this.testStartFlag=!0},startTrial(){this.trialStartFlag=!0},completedTrial(){this.trialCompleted=!0}}},Z=t("div",{class:"nback-title"},[t("h1",null,"N-Back Test")],-1),tt={key:0,class:"instructions"},et=t("h2",{class:"instructions-title"},"Instructions",-1),st=t("p",null,[i(" In this task, you will see letters displayed on the screen one at a time."),t("br"),i(" Each letter will be displayed for a few seconds, and then the next letter will be displayed."),t("br"),i(" You need to remember the last two letters that were displayed, and compare the current letter to the letter that was displayed two letters ago."),t("br"),i(" If the current letter is the same as the letter that was displayed two letters ago, press the MATCHES button."),t("br"),i(" If the current letter is different from the letter that was displayed two letters ago, do not press anything."),t("br"),i(" This is called the N=2 back test, because you are comparing the current letter to the letter that was displayed two letters ago."),t("br")],-1),rt=t("br",null,null,-1),at=[et,st,rt],ot={key:1,class:"real-test-indicator"},nt=t("h2",null,[t("p",null,"Your Real Test Starts Now!")],-1),it=t("br",null,null,-1),lt={key:0,class:"start-button"},ct={key:2,class:"start-button"},ht=t("br",null,null,-1),ut={key:3},pt={key:4};function mt(s,o,m,k,c,d){const T=P("NBackTrial"),w=P("NBackTest");return r(),a(_,null,[Z,!this.trialStartFlag&&!this.testStartFlag&&!this.trialCompleted?(r(),a("div",tt,at)):n("",!0),this.trialCompleted&&!this.testStartFlag?(r(),a("div",ot,[nt,it,!this.testStartFlag&&this.trialCompleted?(r(),a("div",lt,[l(p,{onClick:o[0]||(o[0]=g=>this.startTest()),size:"x-large",block:"",color:"red-lighten-3",rounded:"lg"},{default:u(()=>[i("Click Here to Start Test")]),_:1})])):n("",!0)])):n("",!0),!this.testStartFlag&&!this.trialStartFlag?(r(),a("div",ct,[l(p,{onClick:o[1]||(o[1]=g=>this.startTrial()),size:"x-large",block:"",color:"red-lighten-3",rounded:"lg"},{default:u(()=>[i(" Start Trial ")]),_:1})])):n("",!0),ht,this.trialStartFlag&&!this.trialCompleted?(r(),a("div",ut,[l(T,{onTrialCompleted:o[2]||(o[2]=g=>this.completedTrial())})])):n("",!0),this.trialCompleted&&this.testStartFlag?(r(),a("div",pt,[l(w)])):n("",!0)],64)}const gt=f(X,[["render",mt]]);export{gt as default};