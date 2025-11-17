FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy POM first for better caching
COPY pom.xml .
# Download dependencies first (cached unless POM changes)
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]