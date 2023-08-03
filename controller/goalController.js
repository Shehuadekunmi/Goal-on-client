const Goal = require('../models/goal')


// get all goals
const getAllGoals = async (req, res) =>{
   try {
    const goals = await Goal.find();
        res.status(200).json({ success: true, goals})
    
   } catch (error) {
    res.json(error)
   }
}


// get a single goal
const getGoal = async (req, res)=>{
    const {goalId} = req.params;
    try {
       const goal = await Goal.findById({_id: goalId });
       res.status(200).json({ success: true, goal});
    } catch (error) {
        res.json(error)
    }
};

// create goal
const createGoal = async (req, res) =>{
    const { title, description } = req.body 
    console.log(req.body);

    if(!title || !description){
        return res.status(400).json({success: false, mesaage: 'Please fill all the input fields'})
    }
    try {
       const goal = await Goal.create({...req.body})
       
       res.status(201).json({success: true, goal})
    } catch (error) {
        res.json(error)
    }
}

// update a goal
const updateGoal = async (req, res)=>{
    const { goalId } = req.params;
    try {
        const goal = await Goal.findByIdAndUpdate({_id: goalId}, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ success: true, goal});
    } catch (error) {
        res.json(error)
    }
};

// delete goal
const deleteGoal = async (req, res)=>{
    const { goalId } = req.params;
    try {
       const goal = await Goal.findByIdAndDelete({_id: goalId});
       res.status(200).json({ success: true}); 
    } catch (error) {
       res.json(error) 
    }
};


module.exports = { getGoal, getAllGoals, createGoal, updateGoal, deleteGoal}