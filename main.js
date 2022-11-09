const D = document;
const LGP = new ListGroupManager("#content", "listaim");

LGP.restore();

D.querySelector("#new-list").onclick = function(){
    LGP.newList(
        D.querySelector("#list-title").value.trim()
    );
}
window.addEventListener('beforeunload', function (e) {
    LGP.save();
});