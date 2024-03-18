import { detecType, setStorage, detecIcon} from "./helpers.js";

//html den gelenler
const form = document.querySelector("form");
const list = document.querySelector("ul")

//olay izleyicileri
form.addEventListener("submit", handleSubmit);
list.addEventListener("click", handleClick);

//! ortak alan
var map;
var notes = JSON.parse(localStorage.getItem("notes")) || [];
var coords = [];
var layerGroup = [];

navigator.geolocation.getCurrentPosition(loadMap,console.log("kullanici kabul etmedi")
);
//haritaya tıklanınca çalışır
function onMapClick(e) {
    form.style.display = "flex";
    coords = [e.latlng.lat, e.latlng.lng]
    console.log(coords);
}
//kullanıcının konumuna göre ekrana haritayı getirme
function loadMap(e) {
    //console.log(e);
    //haritanın kurulumu
    map = new L.map('map').setView([e.coords.latitude, e.coords.longitude], 10);
    L.control
    //haritanın nasıl gözükeceğini belirler
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    layerGroup = L.layerGroup().addTo(map);
    //haritada bir tıklanma olduğunda çalışacak fonksiyon
    map.on("click", onMapClick);
}

function renderMarker(item) {
    //markeri oluturur
L.marker(item.coords, { icon: detecIcon(item.status) })
//imleçlerin olduğu katmanı ekler
.addTo(layerGroup)
//üzerine tıklanıca popups açılması
.bindPopup(`${item.desc}`)
}

//formun gönderilmesi olayında çalışır
function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    const desc = e.target[0].value;
    if (!desc) return;
    const date = e.target[1].value;
    const status = e.target[2].value;
    //notes dizisine eleman ekleme
    notes.push({ id: new Date().getTime(), desc, date, status, coords });
    console.log(notes);
    //local storage güncelleme
    setStorage(notes);
    //local gelen notları harita geldiğinde ekran renderleme
    renderNoteList(notes);
    //formu kapatma
    form.style.display = "none"
}
//ekrana notları basma
function renderNoteList(item) {
    //notlar alanını temizler
    list.innerHTML = ""; 
    //markerleri temizle
    layerGroup.clearLayers();

    //her bir not iin diziyi dönüp notları aktarma
      item.forEach((item) => {
        const listElement = document.createElement("li");
        //datasına sahip olduğu id yi ekleme
        listElement.dataset.id = item.id;
        listElement;
        listElement.innerHTML = `
        <div>
            <p>${item.desc}</p>
            <p><span>Tarih:</span>${item.date}</p>
            <p><span>Durum:</span>${detecType(item.status)}</p>
    
            <i class="bi bi-x"  id="delete"></i>
            <i class="bi bi-airplane-fill" id="fly"></i>
         </div>
        `;
list.insertAdjacentElement("afterbegin", listElement);
renderMarker(item);
 });
}

//güncellenecek elemanın id sini basma
function handleClick(e){
const id = e.target.parentElement.parentElement.dataset.id;

if(e.target.id === "delete") {
    console.log(notes);
    //id sini bildiğimiz elemenı diziden kaldırma
    notes = notes.filter((note) => note.id !=id);
    //lokali güncelleme
  setStorage(notes);
//ekranı güncelleme
    renderNoteList(notes);
}

if (e.target.id === "fly") {
    const note = notes.find((note) => note.id== id);
    console.log(note);
    map.flyTo(note.coords)
   }

}