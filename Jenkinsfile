pipeline {
    agent none

    environment {
        DOCKER_REGISTRY = 'docker.io'
        KUBERNETES_NAMESPACE = 'ticketing-app'
    }
    triggers {
        pollSCM '*/5 * * * *'
    }
    stages {
        stage('Checkout') {
            agent {
                docker {
                    image 'node:18-bullseye-slim'
                }
            }
            steps {
                checkout scm
            }
        }

        stage('Run Tests') {
             agent {
                  docker {
                   image 'asmitsharp/custom-node'
                   args '-u root:root'
                   reuseNode true
                 }
             }
             steps {
                dir('auth') {
                    sh 'rm -rf node_modules'
                    sh 'rm package-lock.json'
                    sh 'npm install --omit-dev=mongodb-memory-server'
                    sh 'npm test'
                }
                script {
                    exit 0
                }
                }
        }   

        stage('Build and Push Docker Images') {
            agent any
            steps {
                script {
                    def services = ['auth', 'client']
                    for (service in services) {
                        dir(service) {
                            docker.withRegistry("https://${DOCKER_REGISTRY}", 'acr-credentials') {
                                def appImage = docker.build("${DOCKER_REGISTRY}/${service}:${env.BUILD_ID}", ".")
                                appImage.push()
                            }
                        }
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            agent any
            steps {
                script {
                   sh "sed -i 's/BUILD_ID/${env.BUILD_ID}/g' infra/k8s/*"
                   sh "kubectl create secret generic jwt-secret --from-literal=JWT_KEY=your_jwt_secret_key --dry-run=client -o yaml | kubectl apply -f -"
                   sh "kubectl apply -f infra/k8s/"
                 }
             }
        }
    }
}
