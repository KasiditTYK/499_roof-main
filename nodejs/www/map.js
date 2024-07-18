var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var map = L.map('map', {
    center: [13.736717, 100.523186], // ตั้งค่าพิกัดศูนย์กลางของแผนที่
    zoom: 12, // ตั้งค่าระดับซูมเริ่มต้น
    layers: [Esri_WorldImagery] // เพิ่ม Tile Layer เป็นภาพถ่ายจาก Esri
});

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
    draw: {
        polygon: false,
        polyline: false,
        rectangle: true,
        circle: false,
        marker: false,
        circlemarker: false // ปิดการใช้งานการวาด CircleMarker
    },
    edit: {
        featureGroup: drawnItems,
        remove: true
    }
});
map.addControl(drawControl);

var polygonCount = 0;

map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    drawnItems.addLayer(layer);

    var geoJSON = layer.toGeoJSON();
    var coordinates = geoJSON.geometry.coordinates[0]; // สมมติว่าเป็น polygon เดียว
    // console.log(coordinates);
    polygonCount++;
    var polygonName = "Polygon ลำดับที่: " + polygonCount;
    layer.bindTooltip(polygonName).openTooltip();

    console.log(polygonName);

    // แสดงพิกัดพร้อมกับป้ายกำกับ
    coordinates.forEach(function (coord, index) {
        var corner = "";
        switch (index) {
            case 0: corner = "มุมบนซ้าย"; break;
            case 1: corner = "มุมบนขวา"; break;
            case 2: corner = "มุมล่างขวา"; break;
            case 3: corner = "มุมล่างซ้าย"; break;
            case 4: corner = "จุดปิดท้าย (เหมือนกับมุมบนซ้าย)"; break;
        }
        console.log(corner + ": [" + coord[1] + ", " + coord[0] + "]");
    });



});

// เพิ่ม event listener เพื่อ enable/disable การแก้ไขรูปสี่เหลี่ยม
map.on('layeradd', function (event) {
    if (event.layer instanceof L.Rectangle) {
        event.layer.on('mouseover', function () {
            event.layer.editing.enable();
        });
        event.layer.on('mouseout', function () {
            event.layer.editing.disable();
        });
    }
});

drawnItems.addTo(map);
