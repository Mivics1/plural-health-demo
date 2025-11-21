Feature: Sauce Demo Login Functionality
  As a user of the Sauce Demo application,
  I want to log in with different accounts
  So that I can access the product inventory.

  Background:
    # This step will load the page before every scenario
    Given I am on the login page

  @smoke @standard
  Scenario: 1. Standard User - Successful Login
    When I log in as "standardUser"
    Then I should be redirected to the product inventory page
    And I should see the product title "Products"

  @locked
  Scenario: 2. Locked Out User - Login Failure
    When I log in as "lockedOutUser"
    Then I should see the error message "Epic sadface: Sorry, this user has been locked out."

  @problem
  Scenario: 3. Problem User - UI Inconsistencies
    When I log in as "problemUser"
    Then I should be redirected to the product inventory page
    And all product images should show the same image