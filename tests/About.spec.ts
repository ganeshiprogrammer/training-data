// tests/About.spec.ts
import { test, expect } from "@playwright/test";

// ─── GROUP 1: Page Load & Visibility ─────────────────────────────────────────
test.describe("About - Page Load", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("should load the about page successfully", async ({ page }) => {
    await expect(page).toHaveTitle("About");
    const aboutPage = page.getByTestId("about-page");
    await expect(aboutPage).toBeVisible();
  });

  test("should display the sidebar with all navigation items", async ({ page }) => {
    const sidebar = page.getByTestId("sidebar");
    await expect(sidebar).toBeVisible();

    await expect(page.getByTestId("sidebar-logo")).toContainText("AdminPro");

    const navLinks = [
      "nav-dashboard",
      "nav-analytics",
      "nav-orders",
      "nav-customers",
      "nav-settings",
      "nav-about",
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

// ─── GROUP 2: System Info Card ───────────────────────────────────────────────
test.describe("About - System Info Card", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("should display system info card with correct data", async ({ page }) => {
    const systemCard = page.getByTestId("about-system-card");
    await expect(systemCard).toBeVisible();

    await expect(page.getByTestId("about-system-name")).toHaveText("AdminPro Portal");
    await expect(page.getByTestId("about-system-version")).toHaveText("v2.4.0-stable");
    await expect(page.getByTestId("about-system-updated")).toHaveText("May 2026");
  });
});

// ─── GROUP 3: Team Grid ──────────────────────────────────────────────────────
test.describe("About - Team Grid", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("should display the team grid section", async ({ page }) => {
    const grid = page.getByTestId("about-team-grid");
    await expect(grid).toBeVisible();
  });

  test("should render exactly 3 team member cards", async ({ page }) => {
    const cards = page.locator('[data-testid^="about-team-card-"]');
    await expect(cards).toHaveCount(3);
  });

  test("should display correct data for card 1 (Sarah Johnson)", async ({ page }) => {
    await expect(page.getByTestId("about-team-initials-1")).toHaveText("SJ");
    await expect(page.getByTestId("about-team-name-1")).toHaveText("Sarah Johnson");
    await expect(page.getByTestId("about-team-role-1")).toHaveText("Lead Developer");
  });

  test("should display correct data for card 2 (Marcus Chen)", async ({ page }) => {
    await expect(page.getByTestId("about-team-initials-2")).toHaveText("MC");
    await expect(page.getByTestId("about-team-name-2")).toHaveText("Marcus Chen");
    await expect(page.getByTestId("about-team-role-2")).toHaveText("UX Designer");
  });

  test("should display correct data for card 3 (Elena Rodriguez)", async ({ page }) => {
    await expect(page.getByTestId("about-team-initials-3")).toHaveText("ER");
    await expect(page.getByTestId("about-team-name-3")).toHaveText("Elena Rodriguez");
    await expect(page.getByTestId("about-team-role-3")).toHaveText("Product Manager");
  });

  test("should have circular avatar for each team card", async ({ page }) => {
    for (let i = 1; i <= 3; i++) {
      const avatar = page.getByTestId(`about-team-initials-${i}`);
      await expect(avatar).toHaveCSS("border-radius", "50%");
      await expect(avatar).toHaveCSS("background-color", "rgb(79, 70, 229)");
      await expect(avatar).toHaveCSS("color", "rgb(255, 255, 255)");
    }
  });
});

// ─── GROUP 4: Sidebar Navigation ─────────────────────────────────────────────
test.describe("About - Sidebar Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
  });

  test("should navigate to /about when About link is clicked", async ({ page }) => {
    await page.getByTestId("nav-about").click();
    await expect(page).toHaveURL("/about");
    await expect(page).toHaveTitle("About");
  });

  test("should highlight About link when on /about page", async ({ page }) => {
    await page.getByTestId("nav-about").click();
    const aboutLink = page.getByTestId("nav-about");
    await expect(aboutLink).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(aboutLink).toHaveCSS("background-color", "rgba(79, 70, 229, 0.3)");
  });

  test("should highlight Dashboard link when on /dashboard page", async ({ page }) => {
    const dashboardLink = page.getByTestId("nav-dashboard");
    await expect(dashboardLink).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(dashboardLink).toHaveCSS("background-color", "rgba(79, 70, 229, 0.3)");
  });

  test("should navigate back to dashboard from about page", async ({ page }) => {
    await page.goto("/about");
    await page.getByTestId("nav-dashboard").click();
    await expect(page).toHaveURL("/dashboard");
    await expect(page).toHaveTitle("Dashboard");
  });
});

// ─── GROUP 5: Screenshots ─────────────────────────────────────────────────────
test.describe("About - Screenshots", () => {
  test("take a full page screenshot of the about page", async ({ page }) => {
    await page.goto("/about");

    await expect(page.getByTestId("about-system-card")).toBeVisible();
    await expect(page.getByTestId("about-team-grid")).toBeVisible();

    await page.screenshot({
      path: "tests/screenshots/about-full.png",
      fullPage: true,
    });
  });
});
