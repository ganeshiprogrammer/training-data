// tests/Users.spec.ts
// ─────────────────────────────────────────────────────────────────────────────
// Playwright E2E tests for the Users page.
// Uses data-testid locators exclusively — no CSS selectors or DOM-structure queries.
// ─────────────────────────────────────────────────────────────────────────────

import { test, expect } from "@playwright/test";

test.describe("Users Page", () => {
  // ── Test 1: Table Content ──────────────────────────────────────────────────
  test.beforeEach(async ({ page }) => {
    await page.goto("/users");
  });

  test("should display the users page with table", async ({ page }) => {
    // The main page container should be visible
    const usersPage = page.getByTestId("users-page");
    await expect(usersPage).toBeVisible();

    // The title should be present
    const title = page.getByTestId("users-title");
    await expect(title).toHaveText("Users");
  });

  test("should display table headers correctly", async ({ page }) => {
    await expect(page.getByTestId("table-header-name")).toHaveText("Name");
    await expect(page.getByTestId("table-header-email")).toHaveText("Email");
    await expect(page.getByTestId("table-header-role")).toHaveText("Role");
  });

  test("should display first user row with correct data", async ({ page }) => {
    // Check the first row is visible
    await expect(page.getByTestId("user-row-0")).toBeVisible();

    // Check each cell contains the expected mock data
    await expect(page.getByTestId("user-name-0")).toHaveText("Alice Johnson");
    await expect(page.getByTestId("user-email-0")).toHaveText("alice@example.com");
    await expect(page.getByTestId("user-role-0")).toHaveText("Admin");
  });

  test("should display all user rows", async ({ page }) => {
    // Count all rows matching the testid pattern
    const rows = page.locator('[data-testid^="user-row-"]');
    await expect(rows).toHaveCount(5);
  });

  // ── Test 2: Sidebar Navigation ─────────────────────────────────────────────
  test("should have Users link in sidebar that navigates to /users", async ({ page }) => {
    // Navigate to dashboard first (where sidebar is visible)
    await page.goto("/dashboard");

    // Assert the Users nav link is visible
    const navUsers = page.getByTestId("nav-users");
    await expect(navUsers).toBeVisible();

    // Assert the link has href="/users"
    await expect(navUsers).toHaveAttribute("href", "/users");

    // Click the link and assert URL changes to /users
    await navUsers.click();
    await expect(page).toHaveURL("/users");
  });
});