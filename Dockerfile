# Stage 1: build the Java application using Maven and JDK 17
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy only the pom.xml first to cache Maven dependency downloads
COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline

# Copy the application source code and build the jar
COPY src ./src
RUN mvn -q -DskipTests clean package

# Stage 2: runtime image with a lightweight Java 17 JRE
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Backend application will listen on port 8080
EXPOSE 8080

# Optional health check for Docker
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
