build(){
    const D = document;
    const _this = this;

    this.ct = D.createElement("div");
    this.ct.classList.add("listPanel");

    this.cpanel = D.createElement("div");
    this.cpanel.classList.add("listCPanel");
    
    this.title = D.createElement("div");
    this.title.classList.add("listTitle");
    var listTitle = D.querySelector("#list-title").value.trim();
       this.title.innerText = listTitle;
    

    this.button = D.createElement("button");
    this.button.innerText = "+";

    this.button.addEventListener("click", function(){
        _this.#addEvent();
    });

    this.input = D.createElement("input");
    this.input.type = "text";
    
    this.input.addEventListener("keypress", function(event){
        if(event.key == "Enter")
        _this.#addEvent();
    });

    this.list = D.createElement("ul");
    this.cpanel.appendChild(this.input);
    this.cpanel.appendChild(this.button);

    this.ct.appendChild(this.title);
    this.ct.appendChild(this.cpanel);
    this.ct.appendChild(this.list);
}