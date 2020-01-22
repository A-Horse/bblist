pipeline {
    agent {
        docker {
            image 'node:12.14.0-stretch'
        }
    }
    triggers {
        pollSCM('*/1 * * * *')
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Npm install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }
        stage('Build') {
            environment {
                CI = 'false'
            }
            steps {
                sh 'npm run build'
            }
        }
    }
    post {
        always {
            rocketSend currentBuild.currentResult
        }
    }
}