pipeline {
    agent none
    triggers {
        pollSCM('*/1 * * * *')
    }
    environment {
        CI = 'true'
        docker_hub_username = credentials('docker_hub_username')
        docker_hub_password = credentials('docker_hub_password')
        REACT_APP_OCTOPUS_WEB_SENTRY_DSN = credentials('REACT_APP_OCTOPUS_WEB_SENTRY_DSN')
    }
    stages {
        stage('AutoCheck') {
            agent {
                docker {
                    image 'node:12.14.0-stretch'
                }
            }
            stages {
                stage('Install') {
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
        }
        stage('Dockerize') {
            agent {
                docker {
                    image 'docker:19.03.5'
                    args '-v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            stages {
                stage('Build Image') {
                    steps {
                        sh "docker build . -t fwchen/octopus-web:v0.0.$BUILD_NUMBER"
                    }
                }
                stage('Registry Login') {
                    steps {
                        sh "echo $docker_hub_password | docker login -u $docker_hub_username --password-stdin"
                    }
                }
                stage('Publish image') {
                    steps {
                        sh 'docker push fwchen/octopus-web:v0.0.$BUILD_NUMBER'
                        sh 'echo "fwchen/octopus-web:v0.0.$BUILD_NUMBER" > .artifacts'
                        archiveArtifacts(artifacts: '.artifacts')
                    }
                }
                stage('Remove image') {
                    steps {
                        sh "docker image rm fwchen/octopus-web:v0.0.$BUILD_NUMBER"
                    }
                }
            }
        }
    }
    post {
        always {
            rocketSend currentBuild.currentResult
        }
    }
}