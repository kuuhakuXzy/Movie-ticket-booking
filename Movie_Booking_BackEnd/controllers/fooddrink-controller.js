import FoodDrink from "../models/FoodDrink.js";

export const addFoodDrink = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    const foodDrink = new FoodDrink({
      name,
      description,
      price,
      category,
      image
    });

    await foodDrink.save();
    res.status(201).json({ foodDrink });
  } catch (error) {
    res.status(500).json({ message: "Error creating food/drink item", error: error.message });
  }
};

export const getFoodDrinks = async (req, res) => {
  try {
    const { category } = req.query;
    let query = { isAvailable: true };

    if (category) {
      query.category = category;
    }

    const foodDrinks = await FoodDrink.find(query);
    res.status(200).json({ foodDrinks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching food/drink items", error: error.message });
  }
};

export const updateFoodDrink = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const foodDrink = await FoodDrink.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );

    if (!foodDrink) {
      return res.status(404).json({ message: "Food/drink item not found" });
    }

    res.status(200).json({ foodDrink });
  } catch (error) {
    res.status(500).json({ message: "Error updating food/drink item", error: error.message });
  }
};

export const deleteFoodDrink = async (req, res) => {
  try {
    const { id } = req.params;
    const foodDrink = await FoodDrink.findByIdAndDelete(id);

    if (!foodDrink) {
      return res.status(404).json({ message: "Food/drink item not found" });
    }

    res.status(200).json({ message: "Food/drink item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting food/drink item", error: error.message });
  }
}; 