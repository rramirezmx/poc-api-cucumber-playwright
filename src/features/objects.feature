Feature: CRUD tests for api.restful-api.dev endpoints

  Scenario: Get list of objects
    When I send a GET request to "/objects"
    Then the response status should be 200
    And the response should contain a list of objects

  Scenario: Create a new object
    When I send a POST request to "/objects" with body:
      """
      {
        "name": "My Device Rulas",
        "data": { "year": 2025, "price": 1000 }
      }
      """
    Then the response status should be 200
    And the response should contain "My Device Rulas"
    And I save the "id" from the response

  Scenario: Get object by id
    When I send a GET request to "/objects/${id}"
    Then the response status should be 200
    And the response should contain "My Device Rulas"

  Scenario: Update object by id
    When I send a PUT request to "/objects/${id}" with body:
      """
      {
        "name": "My Device Rulas Updated",
        "data": { "year": 2026, "price": 1500 }
      }
      """
    Then the response status should be 200
    And the response should contain "Updated"

  Scenario: Delete object by id
    When I send a DELETE request to "/objects/${id}"
    Then the response status should be 200

