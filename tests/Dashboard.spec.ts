// tests/dashboard.spec.js
// ─────────────────────────────────────────────────────────────────────────────
// STEP-BY-STEP GUIDE: Playwright Test for Dashboard Page
//
// Structure of a Playwright test:
//   1. import { test, expect } from '@playwright/test'
//   2. test.describe() — group related tests
//   3. test.beforeEach() — runs before every test in the group
//   4. test() — individual test case
//   5. Inside each test: Navigate → Locate → Act → Assert
// ─────────────────────────────────────────────────────────────────────────────

import { test, expect } from "@playwright/test";

// ─── GROUP 1: Page Load & Visibility ─────────────────────────────────────────
test.describe("Dashboard - Page Load", () => {
  // beforeEach: runs before EVERY test inside this describe block
  test.beforeEach(async ({ page }) => {
    // STEP: Navigate to the dashboard page
    // baseURL is set in playwright.config.js, so '/dashboard' = 'http://localhost:5173/dashboard'
    await page.goto("/dashboard");
  });

  test("should load the dashboard page successfully", async ({ page }) => {
    // STEP 1: Check the page title (browser tab title)
    // await expect(page).toHaveTitle(/Vite \+ React/);
    await expect(page).toHaveTitle("Dashboard");

    // STEP 2: Check the main dashboard container is visible
    // We use data-testid — the most reliable locator strategy
    const dashboardPage = page.getByTestId("dashboard-page");
    await expect(dashboardPage).toBeVisible();

    // STEP 3: Check the heading text
    const title = page.getByTestId("dashboard-title");
    await expect(title).toHaveText("Dashboard");
  });

  test("should display the sidebar with all navigation items", async ({ page }) => {
    // STEP 1: Find the sidebar
    const sidebar = page.getByTestId("sidebar");
    await expect(sidebar).toBeVisible();

    // STEP 2: Check the logo text
    await expect(page.getByTestId("sidebar-logo")).toContainText("AdminPro");

    // STEP 3: Verify each nav link exists
    const navLinks = [
      "nav-dashboard",
      "nav-analytics",
      "nav-orders",
      "nav-customers",
      "nav-settings",
    ];

    for (const testId of navLinks) {
      await expect(page.getByTestId(testId)).toBeVisible();
    }
  });

  test("should show user info at the bottom of the sidebar", async ({ page }) => {
    const userInfo = page.getByTestId("sidebar-user");
    await expect(userInfo).toBeVisible();
    await expect(userInfo).toContainText("Jane Doe");
    await expect(userInfo).toContainText("Admin");
  });
});

// ─── GROUP 2: Stat Cards ──────────────────────────────────────────────────────
test.describe("Dashboard - Stat Cards", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
  });

  test("should display all 4 stat cards", async ({ page }) => {
    // Check the grid container
    const statsGrid = page.getByTestId("stats-grid");
    await expect(statsGrid).toBeVisible();

    // Each card should be visible
    const cardIds = ["revenue", "users", "orders", "conversion"];
    for (const id of cardIds) {
      await expect(page.getByTestId(`stat-card-${id}`)).toBeVisible();
    }
  });

  test("should display correct revenue data", async ({ page }) => {
    // Check label
    await expect(page.getByTestId("stat-label-revenue")).toHaveText("Total Revenue");

    // Check value
    await expect(page.getByTestId("stat-value-revenue")).toHaveText("$48,295");

    // Check the change indicator
    const changeEl = page.getByTestId("stat-change-revenue");
    await expect(changeEl).toContainText("+12.5%");
    // Revenue is trending up, so text should be green (we check for the content)
    await expect(changeEl).toContainText("▲");
  });

  test("should display correct users data", async ({ page }) => {
    await expect(page.getByTestId("stat-value-users")).toHaveText("3,842");
    await expect(page.getByTestId("stat-change-users")).toContainText("+8.1%");
  });

  test("should display orders with a negative trend", async ({ page }) => {
    const orderChange = page.getByTestId("stat-change-orders");
    await expect(orderChange).toContainText("-3.2%");
    // Negative trend shows a downward arrow
    await expect(orderChange).toContainText("▼");
  });

  test("should have correct count of stat cards", async ({ page }) => {
    // Count all elements matching the testid pattern using locator
    const cards = page.locator('[data-testid^="stat-card-"]');
    await expect(cards).toHaveCount(4);
  });
});

// ─── GROUP 3: Search Functionality ───────────────────────────────────────────
test.describe("Dashboard - Search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
  });

  test("should show search input in the header", async ({ page }) => {
    const searchInput = page.getByTestId("search-input");
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute("placeholder", "Search activity...");
  });

  test("should filter activity list when searching", async ({ page }) => {
    const searchInput = page.getByTestId("search-input");

    // STEP 1: Type in the search box
    await searchInput.fill("Alice");

    // STEP 2: The results count text should appear
    const resultsCount = page.getByTestId("search-results-count");
    await expect(resultsCount).toBeVisible();
    await expect(resultsCount).toContainText('1 result(s) for "Alice"');

    // STEP 3: Only the matching activity should be in the list
    const activityList = page.getByTestId("activity-list");
    const items = activityList.locator('[data-testid^="activity-item-"]');
    await expect(items).toHaveCount(1);

    // STEP 4: Verify the correct activity is shown
    await expect(page.getByTestId("activity-user-1")).toHaveText("Alice Johnson");
  });

  test("should show empty state when no results match search", async ({ page }) => {
    const searchInput = page.getByTestId("search-input");

    // Search for something that doesn't exist
    await searchInput.fill("XYZ_NONEXISTENT_USER");

    // The activity list should be gone
    await expect(page.getByTestId("activity-list")).not.toBeVisible();

    // The empty state should appear
    await expect(page.getByTestId("activity-empty")).toBeVisible();
    await expect(page.getByTestId("activity-empty")).toContainText("No activities found.");
  });

  test("should clear search and restore full activity list", async ({ page }) => {
    const searchInput = page.getByTestId("search-input");

    // Type then clear
    await searchInput.fill("Alice");
    await searchInput.clear();

    // All 5 activities should be back
    const items = page.locator('[data-testid^="activity-item-"]');
    await expect(items).toHaveCount(5);
  });

  test("should be case-insensitive search", async ({ page }) => {
    const searchInput = page.getByTestId("search-input");

    // Search with lowercase
    await searchInput.fill("alice");
    const resultsCount = page.getByTestId("search-results-count");
    await expect(resultsCount).toContainText("1 result(s)");
  });
});

// ─── GROUP 4: Notification Bell ───────────────────────────────────────────────
test.describe("Dashboard - Notifications", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
  });

  test("should show notification bell with badge", async ({ page }) => {
    const bell = page.getByTestId("notification-bell");
    await expect(bell).toBeVisible();

    // Badge should show count = 3
    const badge = page.getByTestId("notification-badge");
    await expect(badge).toHaveText("3");
  });

  test("should open notification dropdown on click", async ({ page }) => {
    // Dropdown should NOT be visible initially
    await expect(page.getByTestId("notification-dropdown")).not.toBeVisible();

    // Click the bell
    await page.getByTestId("notification-bell").click();

    // Dropdown should NOW be visible
    await expect(page.getByTestId("notification-dropdown")).toBeVisible();
    await expect(page.getByTestId("notification-dropdown")).toContainText("Notifications (3)");
  });

  test("should toggle notification dropdown on repeated clicks", async ({ page }) => {
    const bell = page.getByTestId("notification-bell");

    // Click once — open
    await bell.click();
    await expect(page.getByTestId("notification-dropdown")).toBeVisible();

    // Click again — close
    await bell.click();
    await expect(page.getByTestId("notification-dropdown")).not.toBeVisible();
  });
});

// ─── GROUP 5: Recent Activity List ───────────────────────────────────────────
test.describe("Dashboard - Recent Activity", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
  });

  test("should display activity section heading", async ({ page }) => {
    const section = page.getByTestId("activity-section");
    await expect(section).toContainText("Recent Activity");
  });

  test("should show 5 activity items by default", async ({ page }) => {
    const list = page.getByTestId("activity-list");
    await expect(list).toBeVisible();

    const items = list.locator('[data-testid^="activity-item-"]');
    await expect(items).toHaveCount(5);
  });

  test("should display correct details for the first activity", async ({ page }) => {
    // Check user name
    await expect(page.getByTestId("activity-user-1")).toHaveText("Alice Johnson");

    // Check action text
    await expect(page.getByTestId("activity-action-1")).toHaveText("Placed a new order");

    // Check time
    await expect(page.getByTestId("activity-time-1")).toHaveText("2 min ago");

    // Check avatar initials
    await expect(page.getByTestId("activity-avatar-1")).toHaveText("AJ");
  });

  test("should display all activity avatars", async ({ page }) => {
    const avatars = ["AJ", "BS", "CW", "DL", "EM"];
    for (let i = 0; i < avatars.length; i++) {
      await expect(page.getByTestId(`activity-avatar-${i + 1}`)).toHaveText(avatars[i]);
    }
  });
});

// ─── GROUP 6: Recent Customers Widget ─────────────────────────────────────────
test.describe("Dashboard - Recent Customers", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
  });

  test("should display Recent Customers section title", async ({ page }) => {
    await expect(page.getByTestId("customers-section")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Recent Customers" })).toBeVisible();
  });

  test("should render exactly 3 customer rows", async ({ page }) => {
    await expect(page.getByTestId("customer-list")).toBeVisible();
    await expect(page.getByTestId("customer-item-1")).toBeVisible();
    await expect(page.getByTestId("customer-item-2")).toBeVisible();
    await expect(page.getByTestId("customer-item-3")).toBeVisible();
    await expect(page.locator('[data-testid^="customer-item-"]')).toHaveCount(3);
  });

  test("should show customer details and status badges", async ({ page }) => {
    await expect(page.getByTestId("customer-name-1")).toHaveText("David Jones");
    await expect(page.getByTestId("customer-email-1")).toHaveText("david.j@example.com");
    await expect(page.getByTestId("customer-avatar-1")).toHaveText("DJ");
    await expect(page.getByTestId("customer-status-1")).toHaveText("Active");

    await expect(page.getByTestId("customer-name-3")).toHaveText("Frank Miller");
    await expect(page.getByTestId("customer-status-3")).toHaveText("Pending");
  });

  test("should style Active and Pending status badges", async ({ page }) => {
    const activeStatus = page.getByTestId("customer-status-1");
    const pendingStatus = page.getByTestId("customer-status-3");

    await expect(activeStatus).toHaveCSS("color", "rgb(22, 101, 52)");
    await expect(activeStatus).toHaveCSS("background-color", "rgb(220, 252, 231)");
    await expect(pendingStatus).toHaveCSS("color", "rgb(146, 64, 14)");
    await expect(pendingStatus).toHaveCSS("background-color", "rgb(254, 243, 199)");
  });
});

// ─── GROUP 7: Screenshots ─────────────────────────────────────────────────────
test.describe("Dashboard - Screenshots", () => {
  test("take a full page screenshot of the dashboard", async ({ page }) => {
    await page.goto("/dashboard");

    // Wait for all content to be visible before screenshotting
    await expect(page.getByTestId("activity-list")).toBeVisible();

    // Take a screenshot — useful for visual regression testing
    await page.screenshot({
      path: "tests/screenshots/dashboard-full.png",
      fullPage: true,
    });
  });

  test("take a screenshot of a specific stat card", async ({ page }) => {
    await page.goto("/dashboard");
    const revenueCard = page.getByTestId("stat-card-revenue");
    await expect(revenueCard).toBeVisible();

    await revenueCard.screenshot({
      path: "tests/screenshots/stat-card-revenue.png",
    });
  });
});