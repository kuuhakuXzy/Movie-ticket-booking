import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  email:{
    type:String,
    unique:true,
    require:true
  },
  password:{
    type:String,
    minLength:6,
    require:true
  },
  addedmovies:[{
    type:mongoose.Types.ObjectId,
    ref:"Movie"
  }],
  addedFoodDrinks:[{
    type:mongoose.Types.ObjectId,
    ref:"FoodDrink"
  }]
})

export default mongoose.model('admin',adminSchema);