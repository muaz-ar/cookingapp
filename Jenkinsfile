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
        stage('build') {
            steps {
                dir('frontend/out') {
                    sh 'aws s3 sync . s3://homepage-static1 --delete'
                }
            }
        }
        stage('Zip Function') {
            steps {
                dir('backend') {
                    sh 'source venv/bin/activate'
                    sh 'cd venv/lib/python3.8/site-packages'
                    sh 'zip -r9 ../../../../function.zip .'
                    sh 'cd ../../../../'
                    sh 'zip -g function.zip app.py'
                }
            }
        }   steps {
                dir('backend') {
                    sh 'aws lambda update-function-code --function-name POST_save --zip-file fileb://function.zip'
                }
            }
        }
    }
}