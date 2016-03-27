var Food = require('./models/food');

function getFood(res) {
    Food.find(function (err, food) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(food); // return all food in JSON format
    });
}
;

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all food
    app.get('/api/food', function (req, res) {
        // use mongoose to get all food in the database
        getFood(res);
    });

    // create food and send back all food after creation
    app.post('/api/food', function (req, res) {

        // create a food, information comes from AJAX request from Angular
        Food.create({
            foodName: req.body.foodName,
            foodPrice:req.body.foodPrice,
            done: false
        }, function (err, food) {
            if (err)
                res.send(err);

            // get and return all the food after you create another
            getFood(res);
        });

    });

    // delete a food
    app.delete('/api/food/:food_id', function (req, res) {
        Food.remove({
            _id: req.params.food_id
        }, function (err, food) {
            if (err)
                res.send(err);

            getFood(res);
        });
    });
  // Get Total of All Food Items
    app.get('/api/total', function(req, res){
        Food.find(function (err, food) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        var subTotal = 0,
            total = 0,
            taxCount =0,
            tax = 7.5;
        for (var i in food) {
            subTotal += food[i].foodPrice;

        }

        taxCount =((subTotal * tax) / 100);
        total = subTotal + taxCount ;


        res.json({
            subTotal : subTotal,
            tax : taxCount,
        total : total}
        ); // return all food total in JSON format
    });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};