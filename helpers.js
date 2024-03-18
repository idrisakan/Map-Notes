//Tipi analiz edilip ona göre fonksiyonun çağrıldığı yere
//tipe denk gelen aıklamayı gönderme
export const detecType = (type) => {
    switch (type) {
        case "park":
            return "park Yeri";
        case "home":
            return "Ev";
        case "job":
            return "iş";
        case "goto":
            return "Ziyaret";
    }
};
export const setStorage = (data) => {
    //veriyi locale göndermek için stringe çevirme
    const strData = JSON.stringify(data);
    //localStorage güncelleme
    localStorage.setItem("notes", strData);
};

var carIcon = L.icon({
iconUrl: "car.png",
iconSize: [50, 50],
})

var homeIcon = L.icon({
    iconUrl : "home.png",
    iconSize : [50, 50],
})

var jopIcon = L.icon ({
    iconUrl : "job.png",
    iconSize : [50, 50],
})
var visitIcon = L.icon({
    iconUrl : "visit.png",
    iconSize : [50, 50],
})

export function detecIcon(type) {
    switch (type){
        case"park":
        return carIcon;
        case"home":
        return homeIcon;
        case"job":
        return jopIcon;
        case"goto":
        return visitIcon;
    }
}
