class SEventManager{
    constructor(){
        this.events = {};
    }
    on(eventName, handler){
        if (this.events[eventName] == undefined)
            this.events[eventName] = [];

        this.events[eventName].push(handler);
    }
    un(eventName, refHandler){
        if (this.events[eventName] != undefined){
            let ind = this.events[eventName].indexOf(refHandler);
        if(ind >= 0)
            this.events[eventName].splice(ind, 1);
        }
    }
    trigger(eventName){
        if (this.event[eventName] != undefined)
        for(let eventFunction of this.events[eventName])
            eventFunction.apply(this);
    }
}
class Lista extends SEventManager{
    static tpl(title){
        return `
        <div class="listPanel">
            <div class="listTitle">
                <span>${title}</span><span class="delList">X</span>
            </div>
            <div class="listContent">
                <div class="listCPanel">
                    <input type="text"><button>+</button>
                </div>
                <ul></ul>
            </div>
        </div>`;
    }
    constructor(sel, title = "Lista", list = []){
        super();
        this.parentElement = document.querySelector(sel);
        this.title = title;

        this.render();
        
        this.val = list;
         

    }
    getECt(s){ //get evalCt
        return this.evalCt.querySelector(s);
    }

    build(){
        const D = document;
        const _this = this;

        this.getECt(".delList").addEventListener("click", function(){
          _this.remove();
        });
        this.cpanel = this.getECt(".listCPanel");
        this.getECt(".listCPanel button").addEventListener("click", function(){
            _this.#addEvent();
        });

        this.input = this.getECt(".listCPanel input");
        
        this.input.addEventListener("keypress", function(event){
            if(event.key == "Enter")
            _this.#addEvent();
        });

        this.list = this.getECt(".listContent ul");
    }
    #addEvent(){ // # "operátorral" létrehozott függvény az osztály privát függvénye lesz
        this.addToList(this.input.value.trim());
        this.input.value = "";
    }
    remove(){
        this.ct.remove();
        this.trigger("remove");
    }
    addToList(text, active = true){
        const D = document;
        if (text){
            const li = D.createElement("li");
            const span = D.createElement("span");
            span.innerText = text;

            li.appendChild(span);

            const del = D.createElement("span");
            del.innerText = "X";
            del.classList.add("delbutton");

            li.appendChild(del);
            if (!active)
            li.classList.add("pullout");

            li.addEventListener("click", function(){
                li.classList.toggle("pullout")
            })
                del.onclick = function(){
                    li.remove();
                }

            this.list.appendChild(li);
            return true;
        }
        return false;
    }
    render(){
        this.evalCt = document.createElement("div");
        this.evalCt.innerHTML = Lista.tpl(this.title);
        this.ct = this.evalCt.querySelector(".listPanel"); //vagy .firstElementChild

        this.build();

        this.parentElement.appendChild(this.ct);
    }
    clear(){
        while (this.list.firstElementChild) {
            this.list.firstElementChild.remove();
        }
    }
    set val(list){
        if (Array.isArray(list))
        this.clear();
        for (const li of list)
            if (li.text)
        this.addToList(li.text, li.active);
        else this.addToList(li, true);
    }
    get val(){
        var t = [];
            this.list.querySelectorAll("li").forEach(li => {
                t.push({
                    text: li.firstElementChild.innerText,
                    active: li.classList.contains("pullout") ? false : true
                })
            })
            return t;
    }
}
class ListGroupManager{
    constructor(renderSelector, groupName = "listak"){
        this.groupName = groupName;
        this.group = []; // Ez tartalmazza a listákat
        this.renderSelector = renderSelector; //ide fognak betöltődni a listák
    }
    newList(title){ //a newList a method/metódus
        const LIST = new Lista(this.renderSelector, title);
        const _this = this;
        this.group.push(LIST);
        LIST.index = this.group.length-1;
        LIST.on("remove", function(){
            _this.group.splice(this.index, 1);
        });
        /*
        this.group[this.group.length-1].index = this.group.length-1;

        var _this = this;

        this.group[this.group.length-1].on("remove", function(){
            _this.group.splice(this.index, 1);
        });*/
    }
    save(){
        window.localStorage.setItem(this.groupName, JSON.stringify(this.val));
    }
    restore(){
        const _this = this;
        if (localStorage[this.groupName])
            JSON.parse(localStorage[this.groupName]).forEach( l => {
                _this.group.push(
                    new Lista(_this.renderSelector, l.title, l.items)
                );
            });
    }
    get val(){
        var tmp = [];
        this.group.forEach(lo => {
            tmp.push({
                title: lo.title,
                items: lo.val
            });
        });

        return tmp;
    }
}