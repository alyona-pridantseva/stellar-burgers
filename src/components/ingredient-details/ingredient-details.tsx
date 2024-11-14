import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIngredientsSelector } from '../../services/ingredients/ingredientsSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  // Получаем параметр id из URL
  const { id } = useParams();
  const ingredients = useSelector(getIngredientsSelector);
  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
