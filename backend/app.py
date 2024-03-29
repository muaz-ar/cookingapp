import openai
from dotenv import load_dotenv
import os
import json

load_dotenv()  # Lade Umgebungsvariablen aus .env-Datei

openai.api_key = os.getenv('OPENAI_API_KEY')

def generate_recipe(event, context):
    data = json.loads(event['body'])
    prompt = f"""Please create a recipe with the available ingredients at home. 
    It's not necessary to use all ingredients exactly; 
    the quantity should be sufficient for the specified number of people, and leftovers are welcome. 
    The recipe name is of secondary importance; the focus is on the ingredients and the instructions.
    please answer only in German with the following information:
    Rezeptname:
    Erforderliche Zutaten für 2 Personen:
    Zubereitungsschritte:
    - Rezeptname: {data.get('Rezeptname')}
    - Mealtype: {data.get('Mealtype')}
    - Gang: {data.get('Coursetype')}
    - Peoplecount: {data.get('Peoplecount')}
    - Specialty: {data.get('Specialty')}
    - Region: {data.get('Region')}
    - Country: {data.get('Country', 'nicht spezifiziert')}
    - Ingredients: {', '.join([f"{z['zutat']}: {z['menge']} {z.get('mengeneinheit', '')}" for z in data.get('Zutaten', [])])}."""

    try:
        response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Das folgende ist ein Rezeptvorschlag basierend auf den gegebenen Kriterien."},
            {"role": "user", "content": prompt}
        ]
    )
        
        return {
            'statusCode': 200,
            'body': json.dumps({'recipe': response['choices'][0]['message']['content']}),
            "headers" : {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
            }
        }
    except Exception as e:
        print(f"Fehler beim Abrufen der Daten von OpenAI: {e}")
        print(f"Fehlerdetails: {e.args}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)}),
            'headers': {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : True
            },
        }