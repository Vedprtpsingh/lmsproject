#!/bin/bash

echo "🚀 Starting LMS Pro Backend..."
echo ""
echo "Building and running Spring Boot application..."
echo "Backend will be available at: http://localhost:8080"
echo ""

cd "$(dirname "$0")"
mvn spring-boot:run
