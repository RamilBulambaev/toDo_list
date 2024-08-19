import { themeSwitcher } from "../themeSwitcher";

describe("themeSwitcher function", () => {
  // 1. Проверка корректного переключения тем
  test("should switch from light to dark theme", () => {
    const initialTheme = "light";
    const newTheme = themeSwitcher(initialTheme);
    expect(newTheme).toBe("dark");
  });

  test("should switch from dark to light theme", () => {
    const initialTheme = "dark";
    const newTheme = themeSwitcher(initialTheme);
    expect(newTheme).toBe("light");
  });

  // 2. Проверка сохранения текущей темы в локальном хранилище
  test("should save the new theme in localStorage", () => {
    const initialTheme = "light";
    themeSwitcher(initialTheme);
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  test("should retrieve the theme from localStorage on initialization", () => {
    localStorage.setItem("theme", "dark");
    const theme = themeSwitcher();
    expect(theme).toBe("dark");
  });

  // 3. Проверка на обработку некорректных данных
  test("should return default theme if an invalid theme is passed", () => {
    const invalidTheme = "blue";
    const defaultTheme = themeSwitcher(invalidTheme);
    expect(defaultTheme).toBe("light"); // Предполагается, что 'light' — это тема по умолчанию
  });

  test("should return default theme if no theme is passed", () => {
    const defaultTheme = themeSwitcher();
    expect(defaultTheme).toBe("light");
  });

  // 4. Проверка корректного применения темы к элементам интерфейса
  test("should apply dark theme to body element", () => {
    document.body.className = "light";
    themeSwitcher("light");
    expect(document.body.className).toBe("dark");
  });

  test("should apply light theme to body element", () => {
    document.body.className = "dark";
    themeSwitcher("dark");
    expect(document.body.className).toBe("light");
  });

  // 5. Проверка совместимости с различными браузерами или окружениями
  test("should handle the absence of localStorage gracefully", () => {
    const originalLocalStorage = global.localStorage;
    delete global.localStorage;

    const theme = themeSwitcher("light");
    expect(theme).toBe("dark"); // Без сохранения в localStorage, тема должна переключаться корректно

    global.localStorage = originalLocalStorage;
  });

  // 6. Проверка при запуске на основе системных настроек пользователя
  test("should use system preference if no theme is set", () => {
    jest.spyOn(window, "matchMedia").mockReturnValue({
      matches: true, // Темная тема по умолчанию в системе
      addListener: jest.fn(),
      removeListener: jest.fn(),
    });

    const theme = themeSwitcher();
    expect(theme).toBe("dark");
  });
});
