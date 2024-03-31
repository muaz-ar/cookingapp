pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Klont das GitHub-Repository
                git branch: 'main', url: 'https://github.com/muaz-ar/cookingapp.git', credentialsId: 'muaz-ar'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Wechselt in das Verzeichnis 'frontend'
                dir('frontend') {
                    // Führt 'npm install' aus
                    sh 'npm install'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }
        
        stage('Deploy Frontend') {
            steps {
                dir('frontend/out') {
                    sh 'aws s3 sync . s3://homepage-static1 --delete'
                }
            }
        }
        stage('Zip Function') {
            steps {
                dir('backend') {
                    sh '''
                        . venv/bin/activate
                        cd venv/lib/python3.10/site-packages
                        zip -r9 ../../../../function.zip .
                        cd ../../../../
                        zip -g function.zip app.py
                        aws lambda update-function-code --function-name post_save --zip-file fileb://function.zip
                    '''
                }
            }
        }
        stage('Lambda_test') {
            steps {
                dir('backend') {
                    script {
                        // Aufruf der Lambda-Funktion mit der korrekten Behandlung des Payload-Formats
                        sh "aws lambda invoke --function-name post_save --payload file://test.json --cli-binary-format raw-in-base64-out response.json"

                        // Optional: Inhalt der Antwort anzeigen
                        sh "cat response.json"
                    }
                }
            }
        }
    }
}  
        
    


