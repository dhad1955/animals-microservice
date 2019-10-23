const express = require('express');
const app = express();
const AnimalService = require('./AnimalService');

const PORT = 3000;
let server;
(async() => {
    app.use(express.json());
    server = app.listen(PORT);
    console.log(`Server started, listening on  http://localhost:${PORT}`);

    app.get('/animals', async(request, res, next) => {
        const results = await Promise.all([
            AnimalService.getDogs(),  AnimalService.getCats(), AnimalService.getHamsters()
        ]);

        let output = [];
        results.forEach(o => {
            if(o.success && o.status === 200) {
                output = output.concat(o.result);
            }
        });

        if(output.length === 0) {
            res.status(500);
            res.json({});
        } else {
            res.status(200);
            res.json(output);
        }
    });
})();

module.exports = server;