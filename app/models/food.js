var mongoose = require('mongoose');

module.exports = mongoose.model('Food', {
    foodName: {
        type: String,
        default :''
   
    },
    foodPrice :{
    	type:Number,
    	default: 0,
    }
});