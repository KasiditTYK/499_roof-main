const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let polygons = [];

// // API เพื่อรับค่าพิกัดจาก URL parameter
// app.get('/api/test/:lat1/:long1', (req, res) => {
//     const { lat1, long1 } = req.params; // รับค่าพิกัดจาก URL parameter
//     const data = {
//         btl: [lat1, long1]
//     };
//     res.json(data);
// });

// // API เพื่อรับค่าพิกัดจากการร้องขอแบบ POST
// app.post('/api/sendCoordinates', (req, res) => {
//     const { coordinates } = req.body; // รับค่าพิกัดจาก body ของ request
//     console.log('Received coordinates:', coordinates);

//     // เพิ่มข้อมูลพิกัดลงใน polygons array
//     polygons.push(coordinates);

//     // ส่งค่าพิกัดกลับไปยัง client
//     res.json({ message: 'Coordinates received', coordinates });
// });

// ใช้ static middleware สำหรับการเสิร์ฟไฟล์ในโฟลเดอร์ 'www'
app.use('/', express.static('www'));

app.listen(port, () => {
    console.log(` http://localhost:${port}`);
});
