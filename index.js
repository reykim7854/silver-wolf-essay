let globalColorScheme = "auto";
let isDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

const setColorScheme = (colorScheme = "light", isAuto = false) => {
  const root = document.querySelector("html");
  document
    .querySelector(`.toggle-theme__button .icon.${colorScheme}-mode`)
    .classList.add("active");

  if (colorScheme === "dark") {
    root.classList.add("dark-mode");
    document
      .querySelector(`.toggle-theme__button .icon.light-mode`)
      .classList.remove("active");
  } else if (colorScheme === "light" || colorScheme === "auto") {
    root.classList.remove("dark-mode");
    document
      .querySelector(`.toggle-theme__button .icon.dark-mode`)
      .classList.remove("active");
  }

  globalColorScheme = !isAuto ? colorScheme : "auto";
  localStorage.setItem("colorScheme", globalColorScheme);
};

const handleChangeColorScheme = (colorScheme) => {
  if (colorScheme !== "auto") {
    setColorScheme(colorScheme);
  } else {
    setColorScheme(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
      true,
    );
  }
};

document.addEventListener("DOMContentLoaded", () => {
  globalColorScheme = localStorage.getItem("colorScheme") ?? "auto";
  const toggleThemeButton = document.querySelector("#toggle-theme__button");

  handleChangeColorScheme(globalColorScheme);
  document
    .querySelector(
      `#toggle-theme__menu .menu__item .item__button[data-color-scheme=${globalColorScheme}]`,
    )
    .classList.add("active");

  toggleThemeButton.addEventListener("click", () => {
    const toggleThemeMenu = document.querySelector("#toggle-theme__menu");

    if (toggleThemeMenu.classList.contains("active")) {
      toggleThemeMenu.classList.remove("active");
      toggleThemeButton.classList.remove("active");
    } else {
      toggleThemeMenu.classList.add("active");
      toggleThemeButton.classList.add("active");
    }
  });

  document
    .querySelectorAll("#toggle-theme__menu .menu__item .item__button")
    .forEach((themeModeButton) => {
      themeModeButton.addEventListener("click", () => {
        const colorScheme = themeModeButton.dataset.colorScheme;
        handleChangeColorScheme(colorScheme);

        document
          .querySelector(`#toggle-theme__menu .menu__item .item__button.active`)
          .classList.remove("active");
        themeModeButton.classList.add("active");
        toggleThemeButton.click();
      });
    });

  document
    .querySelector("#toggle-table-of-content")
    .addEventListener("click", () => {
      document
        .querySelector(".table-of-content__nav")
        .classList.toggle("active");
      document
        .querySelector(".table-of-content .menu")
        .classList.toggle("active");
      document
        .querySelector(".table-of-content .menu-open")
        .classList.toggle("active");
    });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (globalColorScheme === "auto") {
        if (e.matches) {
          setColorScheme("dark", true);
        } else {
          setColorScheme("light", true);
        }
      }
    });
});
