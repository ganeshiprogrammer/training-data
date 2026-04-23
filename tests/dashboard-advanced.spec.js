// tests/dashboard-advanced.spec.js
// ─────────────────────────────────────────────────────────────────────────────
// ADVANCED PATTERNS: Page Object Model (POM)
//
// The Page Object Model is the recommended design pattern for large test suites.
// It separates the "how to find elements" from the "what to test".
//
// Benefits:
//   - Single place to update selectors if the UI changes
//   - Tests read like plain English
//   - Reusable across many test files
// ─────────────────────────────────────────────────────────────────────────────

import { test, expect } from "@playwright/test";

// ─── PAGE OBJECT: DashboardPage ───────────────────────────────────────────────
// Encapsulates all locators and actions for the Dashboard page.
// Tests interact with the page through this class, not raw selectors.

class DashboardPage {
  constructor(page) {
    this.page = page;

    // ── Locators (defined once, reused everywhere) ──────────────────────────
    this.dashboardContainer = page.getByTestId("dashboard-page");
    this.dashboardTitle = page.getByTestId("dashboard-title");
    this.sidebar = page.getByTestId("sidebar");
    this.searchInput = page.getByTestId("search-input");
    this.notificationBell = page.getByTestId("notification-bell");
    this.notificationBadge = page.getByTestId("notification-badge");
    this.notificationDropdown = page.getByTestId("notification-dropdown");
    this.statsGrid = page.getByTestId("stats-grid");
    this.activityList = page.getByTestId("activity-list");
    this.activityEmpty = page.getByTestId("activity-empty");
    this.searchResultsCount = page.getByTestId("search-results-count");
  }

  // ── Actions (methods that do things on the page) ──────────────────────────

  async navigate() {
    await this.page.goto("/dashboard");
  }

  async search(query) {
    await this.searchInput.fill(query);
  }

  async clearSearch() {
    await this.searchInput.clear();
  }

  async openNotifications() {
    await this.notificationBell.click();
  }

  async closeNotifications() {
    await this.notificationBell.click();
  }

  // Helper: get a specific stat card element
  statCard(id) {
    return this.page.getByTestId(`stat-card-${id}`);
  }

  statValue(id) {
    return this.page.getByTestId(`stat-value-${id}`);
  }

  statChange(id) {
    return this.page.getByTestId(`stat-change-${id}`);
  }

  // Helper: get all activity items
  activityItems() {
    return this.page.locator('[data-testid^="activity-item-"]');
  }

  activityUser(id) {
    return this.page.getByTestId(`activity-user-${id}`);
  }
}

// ─── TESTS USING PAGE OBJECT MODEL ───────────────────────────────────────────

test.describe("Dashboard - Page Object Model Tests", () => {
  let dashboard; // Shared POM instance

  test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    await dashboard.navigate(); // Navigate using the POM
  });

  test("page loads correctly (POM style)", async () => {
    // Notice how readable this is — reads like English!
    await expect(dashboard.dashboardContainer).toBeVisible();
    await expect(dashboard.dashboardTitle).toHaveText("Dashboard");
    await expect(dashboard.sidebar).toBeVisible();
  });

  test("all stat cards are visible with correct values", async () => {
    const expectedStats = [
      { id: "revenue", value: "$48,295", change: "+12.5%" },
      { id: "users", value: "3,842", change: "+8.1%" },
      { id: "orders", value: "1,204", change: "-3.2%" },
      { id: "conversion", value: "5.27%", change: "+1.4%" },
    ];

    for (const stat of expectedStats) {
      await expect(dashboard.statCard(stat.id)).toBeVisible();
      await expect(dashboard.statValue(stat.id)).toHaveText(stat.value);
      await expect(dashboard.statChange(stat.id)).toContainText(stat.change);
    }
  });

  test("search filters activity list", async () => {
    await dashboard.search("Bob");
    await expect(dashboard.searchResultsCount).toContainText("1 result(s)");
    await expect(dashboard.activityItems()).toHaveCount(1);
  });

  test("notification bell opens and closes", async () => {
    // Initially closed
    await expect(dashboard.notificationDropdown).not.toBeVisible();

    // Open
    await dashboard.openNotifications();
    await expect(dashboard.notificationDropdown).toBeVisible();

    // Close
    await dashboard.closeNotifications();
    await expect(dashboard.notificationDropdown).not.toBeVisible();
  });
});

// ─── ADVANCED: API Mocking ────────────────────────────────────────────────────
// If your dashboard fetches data from an API, you can mock the responses.
// This makes tests faster and independent of the backend.

test.describe("Dashboard - API Mocking (Example Pattern)", () => {
  test("how to mock an API route", async ({ page }) => {
    // Intercept any request to /api/stats and return fake data
    await page.route("**/api/stats", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          revenue: "$99,999",
          users: 9999,
          orders: 500,
          conversion: "10%",
        }),
      });
    });

    await page.goto("/dashboard");
    // The dashboard would now render with the mocked data
    // await expect(page.getByTestId('stat-value-revenue')).toHaveText('$99,999');
  });

  test("how to simulate a network failure", async ({ page }) => {
    // Abort requests to simulate offline/error state
    await page.route("**/api/stats", (route) => route.abort());

    await page.goto("/dashboard");
    // Dashboard should show an error state
    // await expect(page.getByTestId('error-message')).toBeVisible();
  });
});

// ─── ADVANCED: Keyboard Navigation ───────────────────────────────────────────
test.describe("Dashboard - Keyboard Interactions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
  });

  test("can type in search input using keyboard", async ({ page }) => {
    // Click the search input first to focus it
    await page.getByTestId("search-input").click();

    // Type character by character
    await page.keyboard.type("Alice");

    // Verify the value
    await expect(page.getByTestId("search-input")).toHaveValue("Alice");
  });

  test("can clear search with Escape-like action (clear)", async ({ page }) => {
    const input = page.getByTestId("search-input");
    await input.fill("Alice");

    // Select all and delete
    await input.selectText();
    await page.keyboard.press("Backspace");

    await expect(input).toHaveValue("");
  });
});

// ─── ADVANCED: Mobile Viewport ────────────────────────────────────────────────
test.describe("Dashboard - Responsive (Mobile)", () => {
  test("dashboard renders on mobile viewport", async ({ page }) => {
    // Set mobile viewport size
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/dashboard");

    // The page should still render without crashing
    await expect(page.getByTestId("dashboard-page")).toBeVisible();
    await expect(page.getByTestId("dashboard-title")).toHaveText("Dashboard");
  });
});

// ─── ADVANCED: Accessibility ──────────────────────────────────────────────────
test.describe("Dashboard - Accessibility", () => {
  test("notification bell has aria-label", async ({ page }) => {
    await page.goto("/dashboard");
    const bell = page.getByTestId("notification-bell");

    // Good practice: buttons should have accessible labels
    await expect(bell).toHaveAttribute("aria-label", "Notifications");
  });

  test("search input has correct placeholder", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByTestId("search-input")).toHaveAttribute(
      "placeholder",
      "Search activity..."
    );
  });
});