window.onload=function(){	


	let currentChangedDom=[]
	let word=""
	let DomClicked=""

document.getElementsByTagName("body")[0].addEventListener("mouseup",(e)=>{
DomClicked=e.target
	chrome.runtime.sendMessage({type:"toggle"},function(res){
		if(res.toggle=="true"){
	if(e.which==1){



		word=window.getSelection().toString().trim()
	if(document.getElementById("FMCdiv")!=null ){

		document.getElementById("FMCdiv").remove()

	}
	if(currentChangedDom.length>0)	{
	ClearColor()


	}

	if(word.trim().length>0&&!word.match(/^\.+/)&&!word.match(/\|/)){
	
	document.execCommand('copy')
	let tree=document.getElementsByTagName("body")[0]



	// console.log(window.getSelection().toString())
		// if(word!=""){				//what the fuck why  empty happen????
				let st=new SearchText(word)
			if(word.length<300){

				st.dfs(tree)
				// }else{
					// console.log("謝謝")
				// }

				createSearchDom()
			}

	}





	}




		}
	})

})
function SearchText(text){
	this.text=text
}
function ClearColor(){
	for(let i=0;i<currentChangedDom.length;i++){
							
		currentChangedDom[i].textContent=currentChangedDom[i].textContent.replace(/❤\s/g,"")

	}
	currentChangedDom=[]
	return 
}

let count=0

SearchText.prototype.littleSearch=function(node){
	if(node.nextSibling!==null){
	if(node.nextSibling.textContent.match(/\w+/)){return node.textContent+node.nextSibling.textContent}

		return node.textContent+(node.nextSibling!==null?this.littleSearch(node.nextSibling):"")
	}

	return ""
}
SearchText.prototype.dfs=function(tree){


	if(tree.childNodes.length>0){
		for(let i=0;i<tree.childNodes.length;i++){

				this.dfs(tree.childNodes[i])

		}

	}else{
		if(tree.parentNode.nodeName.match(/^(SPAN|P|TD|PRE|EM|CODE|STRONG|SMALL|A|B|H1|H2|FONT)$/) ){
			// 可能td會直接寫文字，然後再夾雜span，然後td的text和td裡span的text都可能有要找的字
			// tree.nextSibling==null 過濾眾多兒子下只挑最後一個出來做處理
			// tree.parentNode.nodeName 不處理nodeName為text，因為爸爸的兒子還可能有孫子
					let re=""
						let language=""
						let testEnglish=new RegExp(/^\w+$/)
						let testPhp=new RegExp(/^\\\$.+/)
						let testArrow=new RegExp(/\w+->\w+/)
						let testC=new RegExp(/\w+::\w+/)
						let testSpecial=new  RegExp(/^(\\\*|\&)/)
						let testCommonProgramLanguage=new RegExp(/\w+\.\w/)
						let protectParenthesis= new RegExp(/(\(|\)|\*|\+|\$|\[|\])/g)
						afterParenthesisProtect=this.text.replace(protectParenthesis,"\\$1")
						if(testEnglish.test(afterParenthesisProtect)){
							 language="english"
							 re=new RegExp("\\b"+afterParenthesisProtect+"\\b","gi")

						}else if(testCommonProgramLanguage.test(afterParenthesisProtect)){

							 re=new RegExp(afterParenthesisProtect,"gi")
							 language="common"
						}
						else if(testPhp.test(afterParenthesisProtect)&&afterParenthesisProtect.match(/\$\w+/)){

							 re=new RegExp(afterParenthesisProtect,"gi")
							 language="php"
						}else if(testC.test(afterParenthesisProtect)){
							 re=new RegExp(afterParenthesisProtect,"gi")
							 language="c"
						}
						else{

							 re=new RegExp(afterParenthesisProtect,"gi")
						}

						if(language=="english"&&tree.textContent.match(re) ){
							console.log("en")

							if(tree.parentNode!==DomClicked){
								tree.textContent=tree.textContent.replace(re,"❤ "+word)
							}
						
							currentChangedDom.push(tree)
						}else if(language=="common"&&tree.textContent.match(this.text.split('.')[0])&&tree.textContent.length>=1){
							console.log("common")

							if(tree.parentNode.nextSibling!==undefined){
								if(this.littleSearch(tree.parentNode).match(re)){
								tree.textContent=tree.textContent.replace(this.text.split('.')[0],"❤ "+this.text.split('.')[0])
								currentChangedDom.push(tree)
								console.log(currentChangedDom)

								}
							}
						}
						else if(language=="php" &&tree.textContent==this.text.slice(0,tree.textContent.length)&&tree.textContent.length>=1){
							console.log("php")

								// console.log(this.text.split("->"))
								if(this.text.length==tree.textContent.length){
									console.log("sd")
									tree.textContent=tree.textContent.replace(tree.textContent,"❤ "+tree.textContent)
									currentChangedDom.push(tree)
								}else{
									// if(tree.parentNode.parentNode.textContent.trim().slice(0,this.text.length)==this.text){
									if(tree.parentNode.parentNode.textContent.trim().match(re)){
									tree.textContent=tree.textContent.replace(tree.textContent,"❤ "+tree.textContent)
									currentChangedDom.push(tree)
									}
								}

							// if(this.text.length>=tree.textContent.length){

							// }else{

							}else if(language=="c"&&tree.textContent==this.text.slice(0,tree.textContent.length)&&tree.textContent.length>=1){

								if(this.littleSearch(tree.parentNode).match(re)){
								tree.textContent=tree.textContent.replace(this.text.split('::')[0],"❤ "+tree.textContent)
								currentChangedDom.push(tree)
								}


							}
							else if(tree.textContent.match(re) ){
							console.log("toher")

							if(tree.parentNode!==DomClicked){
								tree.textContent=tree.textContent.replace(re,"❤ "+word)
							}
						
							currentChangedDom.push(tree)
							}

							// if(this.github_judgeNextSibling_recursive(tree).match(re)){
							// 	tree.textContent=tree.textContent.replace("$this","❤ $this")

							// }



						// else if(language=="php" &&tree.parentNode.nextSibling!=null ){

						// 	if(tree.parentNode.nextSibling.nextSibling!=null){
						// 		if((tree.textContent+tree.parentNode.nextSibling.textContent+tree.parentNode.nextSibling.nextSibling.textContent).match(re) && tree.parentNode!=DomClicked){



						// 	if(tree.parentNode!==DomClicked){
						// 			tree.textContent=tree.textContent.replace("$this","❤ $this")
						// 	}

						// 			currentChangedDom.push(tree)
						// 			}
						// 	}


						// }










						// 處理 $xx->xx->ffhdr 和xxx.fff
						// else  if(language=="common" &&tree.parentNode.nextSibling!=null ){

						// 	if(tree.parentNode.nextSibling.nextSibling!=null){
						// 		if((tree.textContent+tree.parentNode.nextSibling.textContent+tree.parentNode.nextSibling.nextSibling.textContent).match(re) && tree.parentNode!=DomClicked){



						// 	if(tree.parentNode!==DomClicked){
						// 			tree.textContent=tree.textContent.replace("$this","❤ $this")
						// 	}

						// 			currentChangedDom.push(tree)
						// 			}
						// 	}


						// }


					// if(tree.parentNode.textContent.match(re)){

					// 		beforeChangeDomInnerHTML.push(tree.parentNode.innerHTML)
					// 		currentChangedDom.push(tree.parentNode)
					// 		console.log(currentChangedDom.length)
					// 		console.log(tree.parentNode)
					// 		console.log(tree.parentNode.textContent)

					// 		let re2=new RegExp(this.text,"ig")
					// 		// let rep1=tree.parentNode.textContent.replace(re2,'<span style="color:yellow;background-color:red">'+this.text+'</span>')
					// 		// console.log(rep1)
					// 		// tree.parentNode.innerHTML=tree.parentNode.innerHTML.replace(tree.parentNode.textContent,rep1)
					// 		console.log("-------after-------")
					// 		// 遇到 <span class=""  剛好又找class會取代錯誤變成<span <span style....= ""
					// }

		}
	}


}	

function createSearchDom(){
	let searchDiv= document.createElement("DIV")
	let WrapTextImg= document.createElement("DIV")
	let TextDiv= document.createElement("DIV")

	let Searchlink= document.createElement("A")
	let searchImg= document.createElement("IMG")
	let Searchtext=document.createTextNode("Total:"+currentChangedDom.length)

	searchDiv.style.position="fixed"
	searchDiv.style.top=window.innerHeight/2+"px"
	searchDiv.id="FMCdiv"
	searchImg.src=chrome.extension.getURL("searchButton2.gif")
	WrapTextImg.appendChild(searchImg)
	TextDiv.appendChild(Searchtext)
	WrapTextImg.appendChild(TextDiv)
	TextDiv.style.backgroundColor="#5FBA7D"
	TextDiv.style.color="#E6FFEA"
	TextDiv.style.padding="3px";
    TextDiv.style.borderRadius="11px";
    TextDiv.style.fontSize= "6px";

	Searchlink.innerHTML=WrapTextImg.outerHTML
	Searchlink.setAttribute('href',`https://www.google.com.tw/search?q=${word}`)
	Searchlink.setAttribute('target',"_blank")
	Searchlink.style.textDecoration="none"

	searchDiv.appendChild(Searchlink)
	searchDiv.style.zIndex=10000
	document.body.appendChild(searchDiv)
}



}

