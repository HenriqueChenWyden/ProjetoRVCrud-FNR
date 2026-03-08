function getItems(){
return JSON.parse(localStorage.getItem("items")) || [];
}

function renderItemsList(){
  const list = document.getElementById("itemsList");
  list.innerHTML = "";

  const items = getItems();
  if(items.length === 0){
    list.innerHTML = "<p>Nenhum item</p>";
    return;
  }

  const ul = document.createElement("ul");
  items.forEach(it => {
    const li = document.createElement("li");
    li.innerHTML = `<span style="color:${it.color};margin-right:6px">■</span> ${it.nome} (ID: ${it.id} Categoria: ${it.categoria} )`;
    ul.appendChild(li);
  });
  list.appendChild(ul);
}

function saveItems(items){
localStorage.setItem("items",JSON.stringify(items));
}

function createItem(){

  const nome = document.getElementById("nomeObjeto").value
  const categoria = document.getElementById("categoria").value
  const colorInput = document.getElementById("cor").value.trim()

  if(!nome || !categoria) return

  const items = getItems()

  let chosenColor
  if(colorInput){
    if(isValidColor(colorInput)){
      chosenColor = colorInput
    } else {
      alert("Cor inválida — será usada uma cor aleatória.")
      chosenColor = randomColor()
    }
  } else {
    chosenColor = randomColor()
  }

  const item = {
    id: Date.now(),
    nome: nome,
    categoria: categoria,
    color: chosenColor
  }

  items.push(item)

  saveItems(items)

  document.getElementById("nomeObjeto").value=""
  document.getElementById("cor").value=""

  renderItems()
  renderItemsList()

}

function renderItems(){

const container = document.querySelector("#container")

container.innerHTML=""

const items = getItems()

items.forEach((item,index)=>{

const x = (index % 5) * 2 - 4
const z = Math.floor(index / 5) * -2 - 3

const box = document.createElement("a-box")

box.setAttribute("position",`${x} 1 ${z}`)
box.setAttribute("color",item.color)
box.setAttribute("depth","1")
box.setAttribute("height","1")
box.setAttribute("width","1")
box.setAttribute("shadow","cast:true")

box.setAttribute("animation",
"property: rotation; to: 0 360 0; loop:true; dur:8000")

box.addEventListener("click",()=>{
alert("Objeto: "+item.nome+"\nID: "+item.id)
})

container.appendChild(box)

const label = document.createElement("a-text")

label.setAttribute("value",item.nome)
label.setAttribute("position",`${x} 2 ${z}`)
label.setAttribute("align","center")
label.setAttribute("color","#ffffff")
label.setAttribute("scale","2 2 2")

container.appendChild(label)

})

}

function updateItemPrompt(){

const id = parseInt(prompt("ID do objeto para atualizar"))

const items = getItems()

const item = items.find(i => i.id === id)

if(!item){
alert("Objeto não encontrado")
return
}

const newColor = prompt("Nova cor (hex ou nome). Deixe vazio para cancelar:", item.color)
if(newColor === null) return // usuário cancelou
const value = newColor.trim()
if(value === "") return // não atualiza

if(isValidColor(value)){
  item.color = value
} else {
  alert("Cor inválida — nenhuma alteração feita.")
}

saveItems(items)

renderItems()
renderItemsList()

}

function isValidColor(value){
  const s = document.createElement('div').style
  s.color = ''
  s.color = value
  return s.color !== ''
}

function setColor(hex){
  const el = document.getElementById('cor')
  if(!el) return
  el.value = hex
}

function deleteItemPrompt(){

const id = parseInt(prompt("ID do objeto para deletar"))

const items = getItems().filter(i => i.id !== id)

saveItems(items)

renderItems()
renderItemsList()

}

function randomColor(){

const colors=[
"#ef4444",
"#3b82f6",
"#22c55e",
"#eab308",
"#a855f7",
"#f97316"
]

return colors[Math.floor(Math.random()*colors.length)]

}

renderItems()
renderItemsList()