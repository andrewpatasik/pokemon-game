import "./styles/style.css";

const app = () => {
    const root = document.getElementById("app");
    const element = document.createElement("h1");
    element.classList.add("heading");
    element.innerText = "Welcome To Pokemon Game";

    root.appendChild(element);
}

app();