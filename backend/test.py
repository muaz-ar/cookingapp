
import unittest
from app import generate_recipe
class TestGenerateRecipeFunction(unittest.TestCase):
    def test_generate_recipe(self):
        # Beispiel-Event-Daten
        event = {
            'body': '{"Rezeptname":"Spaghetti Carbonara","Mealtype":"Hauptgericht","Coursetype":"Hauptgang","Peoplecount":2,"Specialty":"nicht spezifiziert","Region":"Italien","Country":"Italien","Zutaten":[{"zutat":"Spaghetti","menge":200,"mengeneinheit":"g"},{"zutat":"Speck","menge":100,"mengeneinheit":"g"}]}'
        }
        context = {}
        response = generate_recipe(event, context)
        self.assertEqual(response['statusCode'], 200)
        # Fügen Sie weitere Assertions hinzu, um die Korrektheit der 'body'-Daten zu überprüfen.

if __name__ == '__main__':
    unittest.main()
