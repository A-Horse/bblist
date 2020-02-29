pipeline {
    agent none
    triggers {
        pollSCM('*/1 * * * *')
    }
    environment {
        CI = 'true'
        DOCKER_REGISTER = credentials('octopus-docker-register')
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
                        sh "docker build . -t $DOCKER_REGISTER/octopus-web:latest"
                    }
                }
                stage('Publish image') {
                    steps {
                        sh 'docker push $DOCKER_REGISTER/octopus-web:latest'
                        sh 'echo "$DOCKER_REGISTER/octopus-web:latest" > .artifacts'
                        archiveArtifacts(artifacts: '.artifacts')
                    }
                }
                stage('Remove image') {
                    steps {
                        sh "docker image rm $DOCKER_REGISTER/octopus-web:latest"
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