# Cities API

## Project Overview

This project provides a RESTful API to manage a collection of cities. It includes endpoints for adding, updating, deleting, and retrieving cities with support for pagination, filtering, sorting, searching, and projection.

## Setup and Run Instructions

1. **Install Dependencies**:
    ```bash
    npm install
    ```

2. **Run the Server**:
    ```bash
    node server.js
    ```

## API Endpoints

### Add City
- **URL**: `/cities`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
      "name": "CityName",
      "population": "Population",
      "country": "Country",
      "latitude": "Latitude",
      "longitude": "Longitude"
    }
    ```
- **Response**:
    ```json
    {
      "message": "City added successfully",
      "city": {
        "name": "CityName",
        "population": "Population",
        "country": "Country",
        "latitude": "Latitude",
        "longitude": "Longitude"
      }
    }
    ```

### Update City
- **URL**: `/cities/:id`
- **Method**: `PUT`
- **Request Body**:
    ```json
    {
      "name": "NewCityName",
      "population": "NewPopulation",
      "country": "NewCountry",
      "latitude": "NewLatitude",
      "longitude": "NewLongitude"
    }
    ```
- **Response**:
    ```json
    {
      "message": "City updated successfully",
      "city": {
        "id": 1,
        "name": "NewCityName",
        "population": "NewPopulation",
        "country": "NewCountry",
        "latitude": "NewLatitude",
        "longitude": "NewLongitude"
      }
    }
    ```

### Delete City
- **URL**: `/cities/:id`
- **Method**: `DELETE`
- **Request Body** (optional):
    ```json
    {
      "name": "CityName"
    }
    ```
- **Response**:
    ```json
    {
      "message": "City deleted successfully"
    }
    ```

### Get Cities
- **URL**: `/cities`
- **Method**: `GET`
- **Query Parameters**:
    - `page`: Page number for pagination (default is 1)
    - `limit`: Maximum number of cities per page (default is 10)
    - `filter`: Filter cities based on specified criteria (JSON string)
    - `sort`: Field to sort by (default is 'id')
    - `order`: Sort order ('ASC' or 'DESC', default is 'ASC')
    - `search`: Search term for city names
    - `projection`: Fields to include or exclude in the response (default is '*')
- **Response**:
    ```json
    [
      {
        "id": 1,
        "name": "CityName",
        "population": "Population",
        "country": "Country",
        "latitude": "Latitude",
        "longitude": "Longitude"
      }
    ]
    ```

## Testing Instructions

1. **Import the Postman Collection**:
    - Open Postman.
    - Go to "Import" and select the Postman collection file from this repository.

2. **Run Tests**:
    - Execute requests in Postman to test all endpoints.

## Additional Information

- Ensure the database is set up correctly and contains the required schema.
- Modify configuration files as needed.